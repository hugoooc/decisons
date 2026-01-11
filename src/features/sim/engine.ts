import type { GameState, Effects, DebtBalances, Badge, BadgeId, StateSnapshot } from '@/types'

/**
 * Seeded PRNG using mulberry32 algorithm
 * Produces deterministic pseudo-random numbers given a seed
 */
export function mulberry32(seed: number): () => number {
  return function () {
    let t = (seed += 0x6d2b79f5)
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/**
 * Create a seed from session ID and decision count
 */
export function createSeed(sessionId: string, decisionCount: number): number {
  let hash = 0
  const str = `${sessionId}-${decisionCount}`
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash
  }
  return Math.abs(hash)
}

/**
 * Calculate compound interest over a period
 * @param principal - Initial amount
 * @param annualRate - Annual interest rate (as decimal, e.g., 0.18 for 18%)
 * @param months - Number of months
 * @returns New balance after interest
 */
export function calculateCompoundInterest(
  principal: number,
  annualRate: number,
  months: number
): number {
  const monthlyRate = annualRate / 12
  return principal * Math.pow(1 + monthlyRate, months)
}

/**
 * Calculate simple interest for a period
 * @param principal - Initial amount
 * @param annualRate - Annual interest rate (as decimal)
 * @param months - Number of months
 * @returns Interest amount (not principal + interest)
 */
export function calculateSimpleInterest(
  principal: number,
  annualRate: number,
  months: number
): number {
  return principal * (annualRate / 12) * months
}

/**
 * Adjust a value for inflation
 * @param value - Original value
 * @param inflationRate - Annual inflation rate (as decimal)
 * @param months - Number of months
 * @returns Inflation-adjusted value
 */
export function adjustForInflation(value: number, inflationRate: number, months: number): number {
  const monthlyRate = inflationRate / 12
  return value * Math.pow(1 + monthlyRate, months)
}

/**
 * Calculate real purchasing power
 * @param nominalValue - Current nominal value
 * @param cumulativeInflation - Cumulative inflation factor (e.g., 1.05 means 5% total inflation)
 * @returns Real purchasing power
 */
export function calculateRealPurchasingPower(
  nominalValue: number,
  cumulativeInflation: number
): number {
  return nominalValue / cumulativeInflation
}

/**
 * Calculate total debt from debt balances
 */
export function calculateTotalDebt(debt: DebtBalances): number {
  return debt.creditCard + debt.studentLoan + debt.autoLoan + debt.mortgage
}

/**
 * Calculate net worth
 */
export function calculateNetWorth(cash: number, investments: number, debt: DebtBalances): number {
  return cash + investments - calculateTotalDebt(debt)
}

/**
 * Calculate investment returns for a period
 * Uses risk level to determine volatility and expected return
 */
export function calculateInvestmentGrowth(
  principal: number,
  riskLevel: number, // 0-100
  months: number,
  rng: () => number,
  recessionActive: boolean
): number {
  // Base annual return: 4% for low risk, up to 10% for high risk
  const baseAnnualReturn = 0.04 + (riskLevel / 100) * 0.06

  // Volatility: higher risk = more variance
  const volatility = (riskLevel / 100) * 0.15

  // Generate deterministic "random" factor
  const randomFactor = (rng() - 0.5) * 2 * volatility

  // Recession penalty
  const recessionPenalty = recessionActive ? -0.08 : 0

  // Calculate monthly return
  const annualReturn = baseAnnualReturn + randomFactor + recessionPenalty
  const monthlyReturn = annualReturn / 12

  // Calculate growth
  return principal * Math.pow(1 + monthlyReturn, months)
}

/**
 * Apply immediate effects from a decision choice
 */
export function applyEffects(state: GameState, effects: Effects): GameState {
  const newState = { ...state }

  if (effects.cash !== undefined) {
    newState.cash = Math.max(0, state.cash + effects.cash)
  }
  if (effects.monthly_income !== undefined) {
    newState.monthly_income = Math.max(0, state.monthly_income + effects.monthly_income)
  }
  if (effects.monthly_expenses !== undefined) {
    newState.monthly_expenses = Math.max(0, state.monthly_expenses + effects.monthly_expenses)
  }
  if (effects.credit_card_debt !== undefined) {
    newState.debt = {
      ...state.debt,
      creditCard: Math.max(0, state.debt.creditCard + effects.credit_card_debt),
    }
  }
  if (effects.student_loan !== undefined) {
    newState.debt = {
      ...state.debt,
      studentLoan: Math.max(0, state.debt.studentLoan + effects.student_loan),
    }
  }
  if (effects.auto_loan !== undefined) {
    newState.debt = {
      ...state.debt,
      autoLoan: Math.max(0, state.debt.autoLoan + effects.auto_loan),
    }
  }
  if (effects.mortgage !== undefined) {
    newState.debt = {
      ...state.debt,
      mortgage: Math.max(0, state.debt.mortgage + effects.mortgage),
    }
  }
  if (effects.credit_score !== undefined) {
    newState.credit_score = Math.max(300, Math.min(850, state.credit_score + effects.credit_score))
  }
  if (effects.investments !== undefined) {
    newState.investments = Math.max(0, state.investments + effects.investments)
  }
  if (effects.stress !== undefined) {
    newState.stress = Math.max(0, Math.min(100, state.stress + effects.stress))
  }
  if (effects.risk_level !== undefined) {
    newState.risk_level = Math.max(0, Math.min(100, state.risk_level + effects.risk_level))
  }
  if (effects.inflation_rate !== undefined) {
    newState.inflation_rate = Math.max(0, effects.inflation_rate)
  }
  if (effects.trigger_recession) {
    newState.recession_active = true
  }
  if (effects.trigger_inflation_spike) {
    newState.inflation_spike_active = true
    newState.inflation_rate = 0.08 // 8% inflation
  }
  if (effects.long_term_choice) {
    newState.long_term_choices += 1
  }

  // Recalculate net worth
  newState.net_worth = calculateNetWorth(newState.cash, newState.investments, newState.debt)

  return newState
}

/**
 * Run a time step of 6 months
 * This simulates 6 months passing after each decision
 */
export function runTimeStep(state: GameState, rng: () => number): GameState {
  const MONTHS = 6
  const newState = { ...state }

  // 1. Apply income and expenses to cash (6 months)
  const netMonthlyCashFlow = state.monthly_income - state.monthly_expenses
  const cashFlowTotal = netMonthlyCashFlow * MONTHS
  newState.cash = state.cash + cashFlowTotal

  // 2. Apply inflation to expenses
  newState.monthly_expenses = adjustForInflation(state.monthly_expenses, state.inflation_rate, MONTHS)

  // 3. Apply interest to debts

  // Credit card: compound interest (typically 18-24% APR)
  if (state.debt.creditCard > 0) {
    newState.debt = {
      ...newState.debt,
      creditCard: calculateCompoundInterest(
        state.debt.creditCard,
        state.interest_rates.creditCard,
        MONTHS
      ),
    }
  }

  // Student loan: simple interest (typically 5-7% APR)
  if (state.debt.studentLoan > 0) {
    const interest = calculateSimpleInterest(
      state.debt.studentLoan,
      state.interest_rates.studentLoan,
      MONTHS
    )
    newState.debt = {
      ...newState.debt,
      studentLoan: state.debt.studentLoan + interest,
    }
  }

  // Auto loan: simple interest (typically 6-8% APR)
  if (state.debt.autoLoan > 0) {
    const interest = calculateSimpleInterest(state.debt.autoLoan, state.interest_rates.autoLoan, MONTHS)
    newState.debt = {
      ...newState.debt,
      autoLoan: state.debt.autoLoan + interest,
    }
  }

  // Mortgage: compound interest (typically 6-7% APR)
  if (state.debt.mortgage > 0) {
    newState.debt = {
      ...newState.debt,
      mortgage: calculateCompoundInterest(state.debt.mortgage, state.interest_rates.mortgage, MONTHS),
    }
  }

  // 4. Apply investment growth
  if (state.investments > 0) {
    newState.investments = calculateInvestmentGrowth(
      state.investments,
      state.risk_level,
      MONTHS,
      rng,
      state.recession_active
    )
  }

  // 5. Handle negative cash - auto-add to credit card debt
  if (newState.cash < 0) {
    newState.debt = {
      ...newState.debt,
      creditCard: newState.debt.creditCard + Math.abs(newState.cash),
    }
    newState.cash = 0
    newState.credit_score = Math.max(300, newState.credit_score - 15)
    newState.stress = Math.min(100, newState.stress + 10)
  }

  // 6. Update age and year
  newState.age = state.age + 0.5
  newState.year = state.year + 0.5

  // 7. Recalculate net worth
  newState.net_worth = calculateNetWorth(newState.cash, newState.investments, newState.debt)

  // 8. Calculate real purchasing power (index starting at 100)
  const yearsElapsed = newState.year
  const cumulativeInflation = Math.pow(1 + state.inflation_rate, yearsElapsed)
  newState.real_purchasing_power = calculateRealPurchasingPower(100 * (newState.net_worth / 10000), cumulativeInflation)

  return newState
}

/**
 * Create a state snapshot for history
 */
export function createSnapshot(state: GameState, decisionId: string): StateSnapshot {
  return {
    decisionId,
    age: state.age,
    year: state.year,
    cash: Math.round(state.cash),
    monthly_income: Math.round(state.monthly_income),
    monthly_expenses: Math.round(state.monthly_expenses),
    debt: {
      creditCard: Math.round(state.debt.creditCard),
      studentLoan: Math.round(state.debt.studentLoan),
      autoLoan: Math.round(state.debt.autoLoan),
      mortgage: Math.round(state.debt.mortgage),
    },
    credit_score: Math.round(state.credit_score),
    investments: Math.round(state.investments),
    net_worth: Math.round(state.net_worth),
    stress: Math.round(state.stress),
    inflation_rate: state.inflation_rate,
    real_purchasing_power: Math.round(state.real_purchasing_power * 100) / 100,
  }
}

/**
 * Check and award badges based on current state
 */
export function checkBadges(state: GameState): Badge[] {
  const badges: Badge[] = [...state.badges]
  const monthlyExpenses = state.monthly_expenses || 1

  const updateBadge = (id: BadgeId, condition: boolean) => {
    const badgeIndex = badges.findIndex((b) => b.id === id)
    if (badgeIndex !== -1 && !badges[badgeIndex].unlocked && condition) {
      badges[badgeIndex] = {
        ...badges[badgeIndex],
        unlocked: true,
        unlockedAt: state.currentDecision,
      }
    }
  }

  // Emergency Ready: >= 3 months expenses in cash
  updateBadge('emergency_ready', state.cash >= monthlyExpenses * 3)

  // Debt Slayer: credit card debt to 0
  updateBadge('debt_slayer', state.debt.creditCard === 0 && state.currentDecision > 0)

  // Investor: investments > $1,000
  updateBadge('investor', state.investments >= 1000)

  // Credit Builder: credit score >= 720
  updateBadge('credit_builder', state.credit_score >= 720)

  // Anti-Present Bias: choose long-term option 5 times
  updateBadge('anti_present_bias', state.long_term_choices >= 5)

  return badges
}

/**
 * Initialize badges
 */
export function initializeBadges(): Badge[] {
  return [
    {
      id: 'emergency_ready',
      name: 'Emergency Ready',
      description: 'Built an emergency fund covering 3+ months of expenses',
      icon: '🛡️',
      unlocked: false,
    },
    {
      id: 'debt_slayer',
      name: 'Debt Slayer',
      description: 'Paid off all credit card debt',
      icon: '⚔️',
      unlocked: false,
    },
    {
      id: 'investor',
      name: 'Investor',
      description: 'Grew investments to over $1,000',
      icon: '📈',
      unlocked: false,
    },
    {
      id: 'credit_builder',
      name: 'Credit Builder',
      description: 'Achieved a credit score of 720 or higher',
      icon: '⭐',
      unlocked: false,
    },
    {
      id: 'anti_present_bias',
      name: 'Future Thinker',
      description: 'Chose long-term benefits over immediate gratification 5 times',
      icon: '🔮',
      unlocked: false,
    },
  ]
}

/**
 * Get chapter number from decision index (0-based)
 */
export function getChapterFromDecision(decisionIndex: number): number {
  return Math.floor(decisionIndex / 6) + 1
}

/**
 * Check if we're at a chapter boundary
 */
export function isChapterBoundary(decisionIndex: number): boolean {
  return decisionIndex > 0 && decisionIndex % 6 === 0
}

/**
 * Format currency for display
 */
export function formatCurrency(amount: number): string {
  const absAmount = Math.abs(amount)
  const formatted =
    absAmount >= 1000000
      ? `$${(absAmount / 1000000).toFixed(1)}M`
      : absAmount >= 1000
        ? `$${(absAmount / 1000).toFixed(1)}K`
        : `$${Math.round(absAmount)}`
  return amount < 0 ? `-${formatted}` : formatted
}

/**
 * Format percentage for display
 */
export function formatPercentage(decimal: number): string {
  return `${(decimal * 100).toFixed(1)}%`
}
