import { motion } from 'framer-motion'
import { DollarSign, TrendingUp, CreditCard, Heart, PiggyBank, Flame } from 'lucide-react'
import { StatBar } from './StatBar'
import { Character, getMoodFromState } from './Character'
import { JourneyMap, XPBar } from './JourneyMap'
import { formatCurrency } from '@/lib/utils'
import { cn } from '@/lib/utils'

interface GameHUDProps {
  cash: number
  investments: number
  totalDebt: number
  creditScore: number
  stress: number
  netWorth: number
  monthlyCashFlow: number
  currentDecision: number
  totalDecisions: number
  level: number
  xp: number
  maxXP: number
  educatorMode?: boolean
  onDecisionClick?: (index: number) => void
}

export function GameHUD({
  cash,
  investments,
  totalDebt,
  creditScore,
  stress,
  netWorth,
  monthlyCashFlow,
  currentDecision,
  totalDecisions,
  level,
  xp,
  maxXP,
  educatorMode,
  onDecisionClick,
}: GameHUDProps) {
  const mood = getMoodFromState(stress, netWorth)

  return (
    <div className="space-y-4">
      {/* Character & Net Worth Card */}
      <motion.div
        className="bg-gradient-to-br from-card via-card to-primary/5 rounded-2xl border border-primary/20 p-5 shadow-xl"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <div className="flex items-center gap-4 mb-4">
          <Character mood={mood} size="md" />
          <div className="flex-1">
            <div className="text-sm text-muted-foreground">Net Worth</div>
            <div
              className={cn(
                'text-3xl font-black',
                netWorth >= 0 ? 'text-green-400' : 'text-red-400'
              )}
            >
              {formatCurrency(netWorth)}
            </div>
            <div
              className={cn(
                'text-sm flex items-center gap-1',
                monthlyCashFlow >= 0 ? 'text-green-400' : 'text-red-400'
              )}
            >
              {monthlyCashFlow >= 0 ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingUp className="w-3 h-3 rotate-180" />
              )}
              {formatCurrency(monthlyCashFlow)}/mo
            </div>
          </div>
        </div>

        {/* XP Bar */}
        <XPBar currentXP={xp} maxXP={maxXP} level={level} />
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        className="bg-card/80 backdrop-blur-sm rounded-2xl border border-border p-4 space-y-4"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
      >
        <StatBar
          value={cash}
          maxValue={Math.max(50000, cash)}
          label="Cash"
          icon={<DollarSign className="w-full h-full" />}
          color="green"
          valueFormatter={formatCurrency}
        />

        <StatBar
          value={investments}
          maxValue={Math.max(100000, investments)}
          label="Investments"
          icon={<PiggyBank className="w-full h-full" />}
          color="blue"
          valueFormatter={formatCurrency}
        />

        <StatBar
          value={totalDebt}
          maxValue={Math.max(100000, totalDebt)}
          label="Total Debt"
          icon={<CreditCard className="w-full h-full" />}
          color="red"
          valueFormatter={formatCurrency}
        />

        <StatBar
          value={creditScore}
          maxValue={850}
          label="Credit Score"
          icon={<Flame className="w-full h-full" />}
          color={creditScore >= 720 ? 'green' : creditScore >= 650 ? 'yellow' : 'red'}
          valueFormatter={(v) => Math.round(v).toString()}
        />

        <StatBar
          value={stress}
          maxValue={100}
          label="Stress"
          icon={<Heart className="w-full h-full" />}
          color={stress > 60 ? 'red' : stress > 30 ? 'yellow' : 'green'}
          valueFormatter={(v) => `${Math.round(v)}%`}
        />
      </motion.div>

      {/* Journey Map */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <JourneyMap
          currentDecision={currentDecision}
          totalDecisions={totalDecisions}
          educatorMode={educatorMode}
          onDecisionClick={onDecisionClick}
        />
      </motion.div>
    </div>
  )
}

interface MinimalHUDProps {
  cash: number
  netWorth: number
  creditScore: number
  stress: number
}

export function MinimalHUD({ cash, netWorth, creditScore, stress }: MinimalHUDProps) {
  const mood = getMoodFromState(stress, netWorth)

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 z-40">
      <motion.div
        className="bg-card/95 backdrop-blur-lg rounded-2xl border border-border p-4 shadow-2xl"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <div className="flex items-center gap-4">
          <Character mood={mood} size="sm" />
          <div className="flex-1 grid grid-cols-2 gap-2 text-sm">
            <div>
              <div className="text-muted-foreground text-xs">Net Worth</div>
              <div
                className={cn(
                  'font-bold',
                  netWorth >= 0 ? 'text-green-400' : 'text-red-400'
                )}
              >
                {formatCurrency(netWorth)}
              </div>
            </div>
            <div>
              <div className="text-muted-foreground text-xs">Cash</div>
              <div className="font-bold text-green-400">{formatCurrency(cash)}</div>
            </div>
            <div>
              <div className="text-muted-foreground text-xs">Credit</div>
              <div className="font-bold text-blue-400">{Math.round(creditScore)}</div>
            </div>
            <div>
              <div className="text-muted-foreground text-xs">Stress</div>
              <div
                className={cn(
                  'font-bold',
                  stress > 60
                    ? 'text-red-400'
                    : stress > 30
                    ? 'text-yellow-400'
                    : 'text-green-400'
                )}
              >
                {Math.round(stress)}%
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
