import { z } from 'zod'

// Concept tags for educational content
export const ConceptTag = z.enum([
  'Compound Interest',
  'Inflation',
  'Opportunity Cost',
  'Risk-Return',
  'Diversification',
  'APR vs APY',
  'Minimum Payments',
  'Credit Utilization',
  'Emergency Fund',
  'Insurance',
  'Taxes',
  'Lifestyle Inflation',
  'Present Bias',
  'Loss Aversion',
  'Unemployment',
  'Recession',
  'Budgeting',
  'Debt Management',
  'Investment Growth',
  'Credit Score',
])
export type ConceptTag = z.infer<typeof ConceptTag>

// Effects schema for decision choices
export const EffectsSchema = z.object({
  cash: z.number().optional(),
  monthly_income: z.number().optional(),
  monthly_expenses: z.number().optional(),
  credit_card_debt: z.number().optional(),
  student_loan: z.number().optional(),
  auto_loan: z.number().optional(),
  mortgage: z.number().optional(),
  credit_score: z.number().optional(),
  investments: z.number().optional(),
  stress: z.number().optional(),
  risk_level: z.number().optional(),
  inflation_rate: z.number().optional(),
  trigger_recession: z.boolean().optional(),
  trigger_inflation_spike: z.boolean().optional(),
  long_term_choice: z.boolean().optional(), // For anti-present bias badge
})
export type Effects = z.infer<typeof EffectsSchema>

// Choice schema
export const ChoiceSchema = z.object({
  id: z.string(),
  label: z.string(),
  short_tradeoff: z.string(),
  effects: EffectsSchema,
  explanation: z.string().max(400), // Max ~80 words
  hidden_cost: z.string().optional(),
  educator_note: z.string().optional(),
})
export type Choice = z.infer<typeof ChoiceSchema>

// Decision schema
export const DecisionSchema = z.object({
  id: z.string(),
  chapter: z.number().min(1).max(5),
  title: z.string(),
  scenario_text: z.string(),
  concept_tags: z.array(ConceptTag),
  why_it_matters: z.string(),
  bias_nudge: z.string().optional(),
  choices: z.array(ChoiceSchema).length(3),
})
export type Decision = z.infer<typeof DecisionSchema>

// Full decisions array schema
export const DecisionsSchema = z.array(DecisionSchema)

// Starting profile type
export type StartingProfile = 'scratch' | 'safety_net' | 'debt_start'

// Goal type
export type Goal = 'stability' | 'growth' | 'freedom'

// Debt balances
export interface DebtBalances {
  creditCard: number
  studentLoan: number
  autoLoan: number
  mortgage: number
}

// Interest rates per debt type
export interface InterestRates {
  creditCard: number // APR
  studentLoan: number
  autoLoan: number
  mortgage: number
}

// User state snapshot for history
export interface StateSnapshot {
  decisionId: string
  age: number
  year: number
  cash: number
  monthly_income: number
  monthly_expenses: number
  debt: DebtBalances
  credit_score: number
  investments: number
  net_worth: number
  stress: number
  inflation_rate: number
  real_purchasing_power: number
}

// Badge types
export type BadgeId =
  | 'emergency_ready'
  | 'debt_slayer'
  | 'investor'
  | 'credit_builder'
  | 'anti_present_bias'

export interface Badge {
  id: BadgeId
  name: string
  description: string
  icon: string
  unlocked: boolean
  unlockedAt?: number // Decision index when unlocked
}

// Main game state
export interface GameState {
  // Session info
  sessionId: string
  startedAt: number
  profile: StartingProfile | null
  goal: Goal | null
  educatorMode: boolean

  // Current state
  currentDecision: number
  age: number
  year: number
  cash: number
  monthly_income: number
  monthly_expenses: number
  debt: DebtBalances
  interest_rates: InterestRates
  credit_score: number
  investments: number
  stress: number
  inflation_rate: number
  risk_level: number

  // Computed
  net_worth: number
  real_purchasing_power: number

  // Tracking
  badges: Badge[]
  history: StateSnapshot[]
  choices_made: { decisionId: string; choiceId: string }[]
  long_term_choices: number

  // XP & Leveling
  xp: number
  level: number

  // Scenario flags
  recession_active: boolean
  inflation_spike_active: boolean

  // Game state
  completed: boolean
}

// Chapter info
export interface ChapterInfo {
  number: number
  title: string
  description: string
  decisions: number[]
}

// Takeaway for results
export interface Takeaway {
  title: string
  description: string
  conceptTag: ConceptTag
}

// Share card data
export interface ShareCardData {
  netWorth: number
  creditScore: number
  badges: Badge[]
  topTakeaway: string
  profile: StartingProfile
}
