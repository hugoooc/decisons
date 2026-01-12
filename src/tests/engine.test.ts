import { describe, it, expect } from 'vitest'
import {
  mulberry32,
  createSeed,
  calculateCompoundInterest,
  calculateSimpleInterest,
  adjustForInflation,
  calculateRealPurchasingPower,
  calculateTotalDebt,
  calculateNetWorth,
  calculateInvestmentGrowth,
  applyEffects,
  runTimeStep,
  createSnapshot,
  checkBadges,
  initializeBadges,
  getChapterFromDecision,
  isChapterBoundary,
  formatCurrency,
  formatPercentage,
} from '../features/sim/engine'
import type { GameState, DebtBalances, Effects } from '../types'

// Helper to create a minimal valid GameState for testing
function createTestState(overrides: Partial<GameState> = {}): GameState {
  return {
    sessionId: 'test-session-123',
    startedAt: Date.now(),
    profile: 'scratch',
    goal: 'stability',
    educatorMode: false,
    currentDecision: 0,
    age: 22,
    year: 0,
    cash: 5000,
    monthly_income: 3000,
    monthly_expenses: 2000,
    debt: {
      creditCard: 0,
      studentLoan: 0,
      autoLoan: 0,
      mortgage: 0,
    },
    interest_rates: {
      creditCard: 0.1999,
      studentLoan: 0.055,
      autoLoan: 0.065,
      mortgage: 0.065,
    },
    credit_score: 700,
    investments: 1000,
    stress: 30,
    inflation_rate: 0.03,
    risk_level: 30,
    net_worth: 6000,
    real_purchasing_power: 100,
    badges: initializeBadges(),
    history: [],
    choices_made: [],
    long_term_choices: 0,
    xp: 0,
    level: 1,
    recession_active: false,
    inflation_spike_active: false,
    completed: false,
    ...overrides,
  }
}

describe('Seeded PRNG (mulberry32)', () => {
  it('should produce deterministic results for the same seed', () => {
    const rng1 = mulberry32(12345)
    const rng2 = mulberry32(12345)

    const results1 = [rng1(), rng1(), rng1()]
    const results2 = [rng2(), rng2(), rng2()]

    expect(results1).toEqual(results2)
  })

  it('should produce different results for different seeds', () => {
    const rng1 = mulberry32(12345)
    const rng2 = mulberry32(54321)

    expect(rng1()).not.toBe(rng2())
  })

  it('should produce values between 0 and 1', () => {
    const rng = mulberry32(12345)
    for (let i = 0; i < 100; i++) {
      const value = rng()
      expect(value).toBeGreaterThanOrEqual(0)
      expect(value).toBeLessThan(1)
    }
  })
})

describe('createSeed', () => {
  it('should create consistent seeds from same inputs', () => {
    const seed1 = createSeed('session-abc', 5)
    const seed2 = createSeed('session-abc', 5)
    expect(seed1).toBe(seed2)
  })

  it('should create different seeds for different sessions', () => {
    const seed1 = createSeed('session-abc', 5)
    const seed2 = createSeed('session-xyz', 5)
    expect(seed1).not.toBe(seed2)
  })

  it('should create different seeds for different decision counts', () => {
    const seed1 = createSeed('session-abc', 5)
    const seed2 = createSeed('session-abc', 6)
    expect(seed1).not.toBe(seed2)
  })
})

describe('calculateCompoundInterest', () => {
  it('should calculate compound interest correctly', () => {
    // $1000 at 12% APR for 12 months should be about $1126.83
    const result = calculateCompoundInterest(1000, 0.12, 12)
    expect(result).toBeCloseTo(1126.83, 1)
  })

  it('should return principal when rate is 0', () => {
    const result = calculateCompoundInterest(1000, 0, 12)
    expect(result).toBe(1000)
  })

  it('should return principal when months is 0', () => {
    const result = calculateCompoundInterest(1000, 0.12, 0)
    expect(result).toBe(1000)
  })

  it('should handle high interest rates (credit cards)', () => {
    // $3000 at 19.99% APR for 12 months
    const result = calculateCompoundInterest(3000, 0.1999, 12)
    expect(result).toBeGreaterThan(3600) // Should be significantly more
  })
})

describe('calculateSimpleInterest', () => {
  it('should calculate simple interest correctly', () => {
    // $10,000 at 5.5% APR for 12 months = $550
    const result = calculateSimpleInterest(10000, 0.055, 12)
    expect(result).toBeCloseTo(550, 2)
  })

  it('should return 0 when principal is 0', () => {
    const result = calculateSimpleInterest(0, 0.055, 12)
    expect(result).toBe(0)
  })

  it('should return 0 when rate is 0', () => {
    const result = calculateSimpleInterest(10000, 0, 12)
    expect(result).toBe(0)
  })
})

describe('adjustForInflation', () => {
  it('should adjust values for inflation correctly', () => {
    // $1000 with 3% annual inflation for 12 months
    const result = adjustForInflation(1000, 0.03, 12)
    expect(result).toBeCloseTo(1030.42, 1)
  })

  it('should return original value with 0% inflation', () => {
    const result = adjustForInflation(1000, 0, 12)
    expect(result).toBe(1000)
  })

  it('should handle high inflation scenarios', () => {
    // $1000 with 8% annual inflation for 12 months
    const result = adjustForInflation(1000, 0.08, 12)
    expect(result).toBeGreaterThan(1080)
  })
})

describe('calculateRealPurchasingPower', () => {
  it('should calculate real purchasing power correctly', () => {
    // $110,000 nominal with 1.1 cumulative inflation (10% total)
    const result = calculateRealPurchasingPower(110000, 1.1)
    expect(result).toBeCloseTo(100000, 2)
  })

  it('should return nominal value when no inflation', () => {
    const result = calculateRealPurchasingPower(100000, 1)
    expect(result).toBe(100000)
  })
})

describe('calculateTotalDebt', () => {
  it('should sum all debt types', () => {
    const debt: DebtBalances = {
      creditCard: 5000,
      studentLoan: 20000,
      autoLoan: 10000,
      mortgage: 200000,
    }
    expect(calculateTotalDebt(debt)).toBe(235000)
  })

  it('should return 0 when no debt', () => {
    const debt: DebtBalances = {
      creditCard: 0,
      studentLoan: 0,
      autoLoan: 0,
      mortgage: 0,
    }
    expect(calculateTotalDebt(debt)).toBe(0)
  })
})

describe('calculateNetWorth', () => {
  it('should calculate positive net worth correctly', () => {
    const debt: DebtBalances = {
      creditCard: 0,
      studentLoan: 10000,
      autoLoan: 0,
      mortgage: 0,
    }
    expect(calculateNetWorth(5000, 15000, debt)).toBe(10000)
  })

  it('should calculate negative net worth correctly', () => {
    const debt: DebtBalances = {
      creditCard: 5000,
      studentLoan: 30000,
      autoLoan: 0,
      mortgage: 0,
    }
    expect(calculateNetWorth(1000, 0, debt)).toBe(-34000)
  })
})

describe('calculateInvestmentGrowth', () => {
  it('should grow investments based on risk level', () => {
    const rng = mulberry32(12345)
    const result = calculateInvestmentGrowth(10000, 50, 6, rng, false)
    expect(result).toBeGreaterThan(10000) // Should grow in normal conditions
  })

  it('should produce deterministic results', () => {
    const rng1 = mulberry32(12345)
    const rng2 = mulberry32(12345)
    const result1 = calculateInvestmentGrowth(10000, 50, 6, rng1, false)
    const result2 = calculateInvestmentGrowth(10000, 50, 6, rng2, false)
    expect(result1).toBe(result2)
  })

  it('should apply recession penalty', () => {
    const seed = 12345
    const rng1 = mulberry32(seed)
    const rng2 = mulberry32(seed)
    const normalResult = calculateInvestmentGrowth(10000, 50, 6, rng1, false)
    const recessionResult = calculateInvestmentGrowth(10000, 50, 6, rng2, true)
    expect(recessionResult).toBeLessThan(normalResult)
  })
})

describe('applyEffects', () => {
  it('should apply cash effects', () => {
    const state = createTestState({ cash: 5000 })
    const effects: Effects = { cash: 1000 }
    const newState = applyEffects(state, effects)
    expect(newState.cash).toBe(6000)
  })

  it('should not allow negative cash', () => {
    const state = createTestState({ cash: 500 })
    const effects: Effects = { cash: -1000 }
    const newState = applyEffects(state, effects)
    expect(newState.cash).toBe(0)
  })

  it('should apply credit score changes with limits', () => {
    const state = createTestState({ credit_score: 700 })
    const effects: Effects = { credit_score: 200 }
    const newState = applyEffects(state, effects)
    expect(newState.credit_score).toBe(850) // Max is 850
  })

  it('should apply stress changes with limits', () => {
    const state = createTestState({ stress: 90 })
    const effects: Effects = { stress: 20 }
    const newState = applyEffects(state, effects)
    expect(newState.stress).toBe(100) // Max is 100
  })

  it('should track long-term choices', () => {
    const state = createTestState({ long_term_choices: 2 })
    const effects: Effects = { long_term_choice: true }
    const newState = applyEffects(state, effects)
    expect(newState.long_term_choices).toBe(3)
  })

  it('should trigger recession flag', () => {
    const state = createTestState({ recession_active: false })
    const effects: Effects = { trigger_recession: true }
    const newState = applyEffects(state, effects)
    expect(newState.recession_active).toBe(true)
  })

  it('should trigger inflation spike', () => {
    const state = createTestState({ inflation_spike_active: false, inflation_rate: 0.03 })
    const effects: Effects = { trigger_inflation_spike: true }
    const newState = applyEffects(state, effects)
    expect(newState.inflation_spike_active).toBe(true)
    expect(newState.inflation_rate).toBe(0.08)
  })
})

describe('runTimeStep', () => {
  it('should update age and year', () => {
    const state = createTestState({ age: 22, year: 0 })
    const rng = mulberry32(12345)
    const newState = runTimeStep(state, rng)
    expect(newState.age).toBe(22.5)
    expect(newState.year).toBe(0.5)
  })

  it('should apply cash flow', () => {
    const state = createTestState({
      cash: 5000,
      monthly_income: 3000,
      monthly_expenses: 2000,
    })
    const rng = mulberry32(12345)
    const newState = runTimeStep(state, rng)
    // Net cash flow = $1000/month * 6 months = $6000
    expect(newState.cash).toBeGreaterThan(state.cash)
  })

  it('should apply debt interest', () => {
    const state = createTestState({
      debt: {
        creditCard: 5000,
        studentLoan: 0,
        autoLoan: 0,
        mortgage: 0,
      },
    })
    const rng = mulberry32(12345)
    const newState = runTimeStep(state, rng)
    expect(newState.debt.creditCard).toBeGreaterThan(5000)
  })

  it('should handle negative cash by adding to credit card debt', () => {
    const state = createTestState({
      cash: 100,
      monthly_income: 1000,
      monthly_expenses: 2000, // Will go negative
      debt: { creditCard: 0, studentLoan: 0, autoLoan: 0, mortgage: 0 },
    })
    const rng = mulberry32(12345)
    const newState = runTimeStep(state, rng)
    expect(newState.cash).toBe(0)
    expect(newState.debt.creditCard).toBeGreaterThan(0)
    expect(newState.credit_score).toBeLessThan(state.credit_score)
    expect(newState.stress).toBeGreaterThan(state.stress)
  })
})

describe('createSnapshot', () => {
  it('should create a complete snapshot', () => {
    const state = createTestState()
    const snapshot = createSnapshot(state, 'test-decision')
    expect(snapshot.decisionId).toBe('test-decision')
    expect(snapshot.age).toBe(state.age)
    expect(snapshot.net_worth).toBe(Math.round(state.net_worth))
    expect(snapshot.debt.creditCard).toBe(Math.round(state.debt.creditCard))
  })
})

describe('checkBadges', () => {
  it('should unlock emergency_ready badge', () => {
    const state = createTestState({
      cash: 10000,
      monthly_expenses: 2000, // 5 months saved
    })
    const badges = checkBadges(state)
    const emergencyBadge = badges.find((b) => b.id === 'emergency_ready')
    expect(emergencyBadge?.unlocked).toBe(true)
  })

  it('should unlock investor badge', () => {
    const state = createTestState({
      investments: 1500,
    })
    const badges = checkBadges(state)
    const investorBadge = badges.find((b) => b.id === 'investor')
    expect(investorBadge?.unlocked).toBe(true)
  })

  it('should unlock credit_builder badge', () => {
    const state = createTestState({
      credit_score: 750,
    })
    const badges = checkBadges(state)
    const creditBadge = badges.find((b) => b.id === 'credit_builder')
    expect(creditBadge?.unlocked).toBe(true)
  })

  it('should unlock anti_present_bias badge', () => {
    const state = createTestState({
      long_term_choices: 5,
    })
    const badges = checkBadges(state)
    const biasBadge = badges.find((b) => b.id === 'anti_present_bias')
    expect(biasBadge?.unlocked).toBe(true)
  })
})

describe('getChapterFromDecision', () => {
  it('should return correct chapter for each decision', () => {
    expect(getChapterFromDecision(0)).toBe(1)
    expect(getChapterFromDecision(5)).toBe(1)
    expect(getChapterFromDecision(6)).toBe(2)
    expect(getChapterFromDecision(11)).toBe(2)
    expect(getChapterFromDecision(29)).toBe(5)
  })
})

describe('isChapterBoundary', () => {
  it('should identify chapter boundaries', () => {
    expect(isChapterBoundary(0)).toBe(false)
    expect(isChapterBoundary(6)).toBe(true)
    expect(isChapterBoundary(12)).toBe(true)
    expect(isChapterBoundary(7)).toBe(false)
  })
})

describe('formatCurrency', () => {
  it('should format small amounts', () => {
    expect(formatCurrency(500)).toBe('$500')
    expect(formatCurrency(999)).toBe('$999')
  })

  it('should format thousands', () => {
    expect(formatCurrency(5000)).toBe('$5.0K')
    expect(formatCurrency(15500)).toBe('$15.5K')
  })

  it('should format millions', () => {
    expect(formatCurrency(1500000)).toBe('$1.5M')
  })

  it('should handle negative amounts', () => {
    expect(formatCurrency(-5000)).toBe('-$5.0K')
  })
})

describe('formatPercentage', () => {
  it('should format percentages correctly', () => {
    expect(formatPercentage(0.05)).toBe('5.0%')
    expect(formatPercentage(0.123)).toBe('12.3%')
  })
})
