import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { GameState, StartingProfile, Goal, Effects, Badge, Takeaway } from '@/types'
import {
  initializeBadges,
  applyEffects,
  runTimeStep,
  createSnapshot,
  checkBadges,
  calculateNetWorth,
  createSeed,
  mulberry32,
} from './engine'
import { decisions } from '@/data/decisions'

// Starting profiles configuration
const startingProfiles: Record<StartingProfile, Partial<GameState>> = {
  scratch: {
    cash: 1000,
    monthly_income: 2800,
    monthly_expenses: 2200,
    debt: {
      creditCard: 0,
      studentLoan: 0,
      autoLoan: 0,
      mortgage: 0,
    },
    credit_score: 650,
    investments: 0,
    stress: 30,
  },
  safety_net: {
    cash: 5000,
    monthly_income: 3200,
    monthly_expenses: 2400,
    debt: {
      creditCard: 0,
      studentLoan: 0,
      autoLoan: 0,
      mortgage: 0,
    },
    credit_score: 700,
    investments: 2000,
    stress: 20,
  },
  debt_start: {
    cash: 500,
    monthly_income: 2800,
    monthly_expenses: 2300,
    debt: {
      creditCard: 2000,
      studentLoan: 28000,
      autoLoan: 0,
      mortgage: 0,
    },
    credit_score: 620,
    investments: 0,
    stress: 45,
  },
}

// Goal configurations
const goalConfigs: Record<Goal, { risk_level: number }> = {
  stability: { risk_level: 20 },
  growth: { risk_level: 50 },
  freedom: { risk_level: 35 },
}

// Generate unique session ID
function generateSessionId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
}

// Initial state factory
function createInitialState(): GameState {
  return {
    sessionId: generateSessionId(),
    startedAt: Date.now(),
    profile: null,
    goal: null,
    educatorMode: false,
    currentDecision: 0,
    age: 22,
    year: 0,
    cash: 1000,
    monthly_income: 2800,
    monthly_expenses: 2200,
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
    credit_score: 650,
    investments: 0,
    stress: 30,
    inflation_rate: 0.03,
    risk_level: 30,
    net_worth: 1000,
    real_purchasing_power: 100,
    badges: initializeBadges(),
    history: [],
    choices_made: [],
    long_term_choices: 0,
    recession_active: false,
    inflation_spike_active: false,
    completed: false,
  }
}

interface GameStore extends GameState {
  // Actions
  setProfile: (profile: StartingProfile) => void
  setGoal: (goal: Goal) => void
  setEducatorMode: (enabled: boolean) => void
  makeChoice: (decisionId: string, choiceId: string) => { newBadges: Badge[] }
  undoLastChoice: () => boolean
  resetGame: () => void
  goToDecision: (index: number) => void // Educator mode only
  generateTakeaways: () => Takeaway[]
}

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      ...createInitialState(),

      setProfile: (profile: StartingProfile) => {
        const profileConfig = startingProfiles[profile]
        set((state) => ({
          ...state,
          profile,
          ...profileConfig,
          net_worth: calculateNetWorth(
            profileConfig.cash || state.cash,
            profileConfig.investments || state.investments,
            profileConfig.debt || state.debt
          ),
        }))
      },

      setGoal: (goal: Goal) => {
        const goalConfig = goalConfigs[goal]
        set((state) => ({
          ...state,
          goal,
          risk_level: goalConfig.risk_level,
        }))
      },

      setEducatorMode: (enabled: boolean) => {
        set({ educatorMode: enabled })
      },

      makeChoice: (decisionId: string, choiceId: string) => {
        const state = get()
        const decision = decisions.find((d) => d.id === decisionId)
        const choice = decision?.choices.find((c) => c.id === choiceId)

        if (!decision || !choice) {
          return { newBadges: [] }
        }

        // Create snapshot before changes
        const snapshot = createSnapshot(state, decisionId)

        // Apply immediate effects
        let newState = applyEffects(state, choice.effects as Effects)

        // Create RNG for time step
        const seed = createSeed(state.sessionId, state.currentDecision)
        const rng = mulberry32(seed)

        // Run time step (6 months pass)
        newState = runTimeStep(newState, rng)

        // Check for special scenarios at chapter boundaries
        const nextDecision = state.currentDecision + 1
        if (nextDecision === 24 && !state.inflation_spike_active) {
          // Chapter 5 starts - trigger inflation spike if not already prepared
          const hasEmergencyFund = newState.cash >= newState.monthly_expenses * 3
          if (!hasEmergencyFund) {
            newState.inflation_spike_active = true
            newState.inflation_rate = 0.08
          }
        }

        // Check and update badges
        const oldBadges = state.badges
        const updatedBadges = checkBadges({
          ...newState,
          currentDecision: nextDecision,
          badges: state.badges,
          long_term_choices: choice.effects.long_term_choice
            ? state.long_term_choices + 1
            : state.long_term_choices,
        })

        // Find newly unlocked badges
        const newBadges = updatedBadges.filter(
          (b) => b.unlocked && !oldBadges.find((ob) => ob.id === b.id)?.unlocked
        )

        // Update state
        set({
          ...newState,
          currentDecision: nextDecision,
          history: [...state.history, snapshot],
          choices_made: [...state.choices_made, { decisionId, choiceId }],
          badges: updatedBadges,
          long_term_choices: choice.effects.long_term_choice
            ? state.long_term_choices + 1
            : state.long_term_choices,
          completed: nextDecision >= decisions.length,
        })

        return { newBadges }
      },

      undoLastChoice: () => {
        const state = get()
        if (state.history.length === 0) return false

        const previousSnapshot = state.history[state.history.length - 1]
        const newHistory = state.history.slice(0, -1)
        const newChoicesMade = state.choices_made.slice(0, -1)

        set({
          currentDecision: state.currentDecision - 1,
          age: previousSnapshot.age,
          year: previousSnapshot.year,
          cash: previousSnapshot.cash,
          monthly_income: previousSnapshot.monthly_income,
          monthly_expenses: previousSnapshot.monthly_expenses,
          debt: previousSnapshot.debt,
          credit_score: previousSnapshot.credit_score,
          investments: previousSnapshot.investments,
          net_worth: previousSnapshot.net_worth,
          stress: previousSnapshot.stress,
          inflation_rate: previousSnapshot.inflation_rate,
          real_purchasing_power: previousSnapshot.real_purchasing_power,
          history: newHistory,
          choices_made: newChoicesMade,
          completed: false,
        })

        return true
      },

      resetGame: () => {
        set({
          ...createInitialState(),
          sessionId: generateSessionId(),
          startedAt: Date.now(),
        })
      },

      goToDecision: (index: number) => {
        const state = get()
        if (!state.educatorMode) return
        if (index < 0 || index >= decisions.length) return

        // Can only go to decisions we've already made or the current one
        if (index <= state.currentDecision) {
          set({ currentDecision: index })
        }
      },

      generateTakeaways: () => {
        const state = get()
        const takeaways: Takeaway[] = []

        // Check for compound interest learning
        if (state.investments > 5000) {
          takeaways.push({
            title: 'The Power of Compound Growth',
            description: `Your investments grew to ${formatCurrency(state.investments)}. Starting early and staying invested lets compound interest work its magic over time.`,
            conceptTag: 'Compound Interest',
          })
        }

        // Check for debt management
        const totalDebt =
          state.debt.creditCard + state.debt.studentLoan + state.debt.autoLoan + state.debt.mortgage
        if (totalDebt < 10000 && state.profile === 'debt_start') {
          takeaways.push({
            title: 'Debt Freedom Achieved',
            description:
              'You started with significant debt but made choices that prioritized paying it down. High-interest debt is a wealth destroyer.',
            conceptTag: 'Debt Management',
          })
        } else if (totalDebt > 50000) {
          takeaways.push({
            title: 'The Weight of Debt',
            description: `You accumulated ${formatCurrency(totalDebt)} in debt. Remember: compound interest works against you with debt, especially at high rates.`,
            conceptTag: 'Minimum Payments',
          })
        }

        // Check for credit score journey
        if (state.credit_score >= 720) {
          takeaways.push({
            title: 'Credit Builder Success',
            description:
              'Your credit score reached excellent status. Good credit opens doors to better rates on mortgages, cars, and more.',
            conceptTag: 'Credit Score',
          })
        }

        // Check for emergency fund
        const hasEmergencyFund = state.cash >= state.monthly_expenses * 3
        if (hasEmergencyFund) {
          takeaways.push({
            title: 'Emergency Fund Protected You',
            description:
              "Having 3+ months of expenses saved provided a safety net during life's uncertainties. This is foundational to financial security.",
            conceptTag: 'Emergency Fund',
          })
        } else {
          takeaways.push({
            title: 'Emergency Fund Lesson',
            description:
              "Without adequate savings, unexpected expenses forced you into debt. An emergency fund is your first line of financial defense.",
            conceptTag: 'Emergency Fund',
          })
        }

        // Check for stress management
        if (state.stress > 60) {
          takeaways.push({
            title: 'Financial Stress Takes a Toll',
            description:
              'High financial stress affects health, relationships, and decision-making. Building security reduces this burden over time.',
            conceptTag: 'Budgeting',
          })
        }

        // Check for long-term thinking
        if (state.long_term_choices >= 5) {
          takeaways.push({
            title: 'Future-Focused Mindset',
            description:
              "You consistently chose long-term benefits over immediate gratification. This anti-present-bias thinking is key to building wealth.",
            conceptTag: 'Present Bias',
          })
        }

        // Add inflation takeaway if experienced
        if (state.inflation_spike_active) {
          takeaways.push({
            title: 'Inflation: The Silent Tax',
            description:
              "You experienced how inflation erodes purchasing power. Investments in stocks historically beat inflation; cash loses value over time.",
            conceptTag: 'Inflation',
          })
        }

        // Ensure we have at least 6 takeaways
        const defaultTakeaways: Takeaway[] = [
          {
            title: 'Pay Yourself First',
            description:
              'Automating savings before spending ensures you build wealth consistently. Even small amounts compound significantly over decades.',
            conceptTag: 'Budgeting',
          },
          {
            title: 'Understand Your Risk Tolerance',
            description:
              'Your investment strategy should match your ability to handle volatility. Higher returns require accepting higher short-term risk.',
            conceptTag: 'Risk-Return',
          },
          {
            title: 'Insurance Protects What You Build',
            description:
              "Proper insurance coverage transfers catastrophic risks to insurance companies. Protect against disasters, not minor inconveniences.",
            conceptTag: 'Insurance',
          },
        ]

        while (takeaways.length < 6 && defaultTakeaways.length > 0) {
          const takeaway = defaultTakeaways.shift()
          if (takeaway && !takeaways.find((t) => t.conceptTag === takeaway.conceptTag)) {
            takeaways.push(takeaway)
          }
        }

        return takeaways.slice(0, 6)
      },
    }),
    {
      name: 'decisions-game-storage',
      partialize: (state) => ({
        sessionId: state.sessionId,
        startedAt: state.startedAt,
        profile: state.profile,
        goal: state.goal,
        educatorMode: state.educatorMode,
        currentDecision: state.currentDecision,
        age: state.age,
        year: state.year,
        cash: state.cash,
        monthly_income: state.monthly_income,
        monthly_expenses: state.monthly_expenses,
        debt: state.debt,
        interest_rates: state.interest_rates,
        credit_score: state.credit_score,
        investments: state.investments,
        stress: state.stress,
        inflation_rate: state.inflation_rate,
        risk_level: state.risk_level,
        net_worth: state.net_worth,
        real_purchasing_power: state.real_purchasing_power,
        badges: state.badges,
        history: state.history,
        choices_made: state.choices_made,
        long_term_choices: state.long_term_choices,
        recession_active: state.recession_active,
        inflation_spike_active: state.inflation_spike_active,
        completed: state.completed,
      }),
    }
  )
)

// Helper function for formatting currency
function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

// Selectors
export const selectCurrentDecision = (state: GameState) => decisions[state.currentDecision]
export const selectProgress = (state: GameState) => (state.currentDecision / decisions.length) * 100
export const selectChapter = (state: GameState) => Math.floor(state.currentDecision / 6) + 1
export const selectTotalDebt = (state: GameState) =>
  state.debt.creditCard + state.debt.studentLoan + state.debt.autoLoan + state.debt.mortgage
export const selectMonthlyCashFlow = (state: GameState) =>
  state.monthly_income - state.monthly_expenses
export const selectUnlockedBadges = (state: GameState) => state.badges.filter((b) => b.unlocked)
