# Decisions - Financial Life Simulator

A hackathon-ready web application that teaches financial literacy and economics through an interactive life simulation. Make 30 key decisions and discover how compound interest, inflation, and your choices shape your financial future.

**Built for Hackonomics 2026**

## Features

- **30 Interactive Decisions** across 5 life chapters
- **Real-time Simulation Engine** with deterministic calculations
- **16 Financial Concepts** including compound interest, inflation, credit scores, and more
- **Behavioral Economics Nudges** highlighting present bias, loss aversion, and hidden costs
- **Beautiful Dashboard** with Recharts visualizations
- **Educator Mode** with lesson plans and discussion questions
- **Shareable Results** with downloadable share cards
- **5 Achievement Badges** for different financial behaviors
- **3 Starting Profiles** for different life situations
- **Mobile Responsive** with premium dark mode UI

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Build for production
npm run build
```

## Project Structure

```
src/
├── app/                 # App router and providers
│   └── App.tsx
├── components/          # Reusable UI components
│   └── ui/             # shadcn/ui components
├── data/               # Decision data and content
│   └── decisions.ts    # All 30 decisions with choices
├── features/           # Feature modules
│   └── sim/           # Simulation engine and state
│       ├── engine.ts   # Core calculations
│       └── store.ts    # Zustand store
├── hooks/              # Custom React hooks
├── lib/                # Utilities
├── pages/              # Route pages
│   ├── Landing.tsx
│   ├── Onboarding.tsx
│   ├── Play.tsx
│   ├── Results.tsx
│   └── Educator.tsx
├── styles/             # Global styles
├── tests/              # Unit tests
└── types/              # TypeScript interfaces
```

## How the Simulation Works

### State Model

The simulation tracks a comprehensive financial state:

```typescript
interface GameState {
  // Demographics
  age: number          // Starts at 22
  year: number         // Years elapsed

  // Finances
  cash: number         // Liquid savings
  monthly_income: number
  monthly_expenses: number
  debt: {
    creditCard: number
    studentLoan: number
    autoLoan: number
    mortgage: number
  }
  investments: number
  credit_score: number  // 300-850

  // Wellness
  stress: number       // 0-100

  // Computed
  net_worth: number
  real_purchasing_power: number
}
```

### Time Steps

After each decision, 6 simulated months pass:

1. **Cash Flow**: Apply income minus expenses
2. **Inflation**: Adjust expenses upward
3. **Debt Interest**:
   - Credit card: Compound interest (19.99% APR)
   - Student loans: Simple interest (5.5% APR)
   - Auto loans: Simple interest (6.5% APR)
   - Mortgage: Compound interest (6.5% APR)
4. **Investment Growth**: Based on risk level with deterministic randomness
5. **Negative Cash Handling**: Auto-borrow from credit card if cash goes negative

### Deterministic Randomness

The simulation uses a seeded PRNG (mulberry32) for reproducible results:

```typescript
const seed = createSeed(sessionId, decisionCount)
const rng = mulberry32(seed)
```

This ensures the same choices always produce the same outcomes, making it suitable for educational settings.

## Editing Decisions

Decisions are defined in `src/data/decisions.ts`. Each decision has:

```typescript
{
  id: string,
  chapter: number,           // 1-5
  title: string,
  scenario_text: string,
  concept_tags: ConceptTag[],
  why_it_matters: string,
  bias_nudge?: string,       // Behavioral economics hint
  choices: [
    {
      id: string,
      label: string,
      short_tradeoff: string,
      effects: Effects,       // Financial impacts
      explanation: string,
      hidden_cost?: string,   // Opportunity cost reveal
      educator_note?: string
    },
    // ... 3 choices total
  ]
}
```

### Available Effects

```typescript
interface Effects {
  cash?: number
  monthly_income?: number
  monthly_expenses?: number
  credit_card_debt?: number
  student_loan?: number
  auto_loan?: number
  mortgage?: number
  credit_score?: number
  investments?: number
  stress?: number
  risk_level?: number
  long_term_choice?: boolean  // For anti-present-bias badge
  trigger_recession?: boolean
  trigger_inflation_spike?: boolean
}
```

## Testing

Unit tests cover the simulation engine:

```bash
# Run tests once
npm run test:run

# Run tests in watch mode
npm test
```

Tests verify:
- Seeded PRNG reproducibility
- Interest calculations
- Net worth computation
- Badge unlocking
- State transitions

## Demo Video Script

**Suggested 2-minute flow:**

0:00-0:10 - Landing page overview, "Learn by living"
0:10-0:25 - Quick onboarding: select "Debt Head Start" profile
0:25-0:45 - Decision 1: Show scenario, choices, make selection
0:45-1:00 - Impact modal with "Hidden Cost Revealed"
1:00-1:15 - Dashboard sidebar showing metrics changing
1:15-1:30 - Skip to Chapter 3, show investment decision
1:30-1:45 - Results page: net worth chart, badges earned
1:45-2:00 - Download share card, mention Educator mode

## Tech Stack

- **Framework**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + shadcn/ui components
- **State**: Zustand with localStorage persistence
- **Charts**: Recharts
- **Animations**: Framer Motion
- **Validation**: Zod
- **Testing**: Vitest

## Key Design Decisions

1. **No Backend Required**: All simulation runs client-side with localStorage persistence
2. **Deterministic Simulation**: Same inputs always produce same outputs
3. **Educational First**: Every decision teaches a concept; hidden costs reveal opportunity costs
4. **Behavioral Economics**: Bias nudges highlight psychological traps
5. **Educator Support**: Built-in lesson plans and discussion questions

## Deployment

The app is static and can be deployed to any hosting:

```bash
npm run build
# Deploy the 'dist' folder
```

Compatible with: Vercel, Netlify, GitHub Pages, Cloudflare Pages, etc.

## Financial Concepts Covered

| Chapter | Concepts |
|---------|----------|
| 1: Starting Out | Budgeting, Emergency Fund, Lifestyle Inflation, Taxes, Insurance |
| 2: Debt & Credit | APR vs APY, Minimum Payments, Credit Utilization, Credit Score |
| 3: Investing | Compound Interest, Diversification, Risk-Return, Investment Fees |
| 4: Big Choices | Opportunity Cost, Rent vs Buy, Depreciation |
| 5: Long Run | Recession, Inflation, Unemployment, Retirement Planning |

## Behavioral Economics Topics

- Present Bias
- Loss Aversion
- Lifestyle Inflation Awareness
- Social Comparison Traps
- Hidden Cost Recognition

## License

MIT

---

Built with care for financial literacy education.
