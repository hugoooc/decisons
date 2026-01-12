import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Zap, AlertTriangle, TrendingUp, Shield, Coins } from 'lucide-react'
import type { Choice } from '@/types'

interface DecisionCardProps {
  choice: Choice
  index: number
  isSelected: boolean
  onSelect: () => void
}

const cardColors = [
  'from-blue-500 to-cyan-400',
  'from-purple-500 to-pink-400',
  'from-amber-500 to-orange-400',
]

const cardBgColors = [
  'bg-blue-500/10 border-blue-500/30 hover:border-blue-400',
  'bg-purple-500/10 border-purple-500/30 hover:border-purple-400',
  'bg-amber-500/10 border-amber-500/30 hover:border-amber-400',
]

const letters = ['A', 'B', 'C']

export function DecisionCard({ choice, index, isSelected, onSelect }: DecisionCardProps) {
  // Determine card traits
  const hasPositiveCash = choice.effects.cash && choice.effects.cash > 0
  const hasNegativeCash = choice.effects.cash && choice.effects.cash < 0
  const hasRisk = choice.effects.stress && choice.effects.stress > 0
  const isLongTerm = choice.effects.long_term_choice

  return (
    <motion.button
      onClick={onSelect}
      className={cn(
        'relative w-full text-left rounded-2xl border-2 p-5 transition-all duration-300',
        cardBgColors[index],
        isSelected
          ? 'ring-4 ring-primary ring-offset-2 ring-offset-background scale-[1.02] shadow-xl'
          : 'hover:scale-[1.01] hover:shadow-lg'
      )}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      {/* Card glow effect when selected */}
      {isSelected && (
        <motion.div
          className={cn(
            'absolute inset-0 rounded-2xl bg-gradient-to-br opacity-20 blur-sm -z-10',
            cardColors[index]
          )}
          animate={{ opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}

      {/* Letter badge */}
      <div
        className={cn(
          'absolute -top-3 -left-3 w-10 h-10 rounded-xl flex items-center justify-center font-black text-lg text-white shadow-lg bg-gradient-to-br',
          cardColors[index]
        )}
      >
        {letters[index]}
      </div>

      {/* Trait indicators */}
      <div className="absolute -top-3 right-3 flex gap-2">
        {hasPositiveCash && (
          <div className="w-8 h-8 rounded-full bg-green-500/20 border border-green-500/50 flex items-center justify-center">
            <Coins className="w-4 h-4 text-green-400" />
          </div>
        )}
        {hasNegativeCash && (
          <div className="w-8 h-8 rounded-full bg-red-500/20 border border-red-500/50 flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-red-400 rotate-180" />
          </div>
        )}
        {hasRisk && (
          <div className="w-8 h-8 rounded-full bg-orange-500/20 border border-orange-500/50 flex items-center justify-center">
            <AlertTriangle className="w-4 h-4 text-orange-400" />
          </div>
        )}
        {isLongTerm && (
          <div className="w-8 h-8 rounded-full bg-purple-500/20 border border-purple-500/50 flex items-center justify-center">
            <Shield className="w-4 h-4 text-purple-400" />
          </div>
        )}
      </div>

      <div className="mt-4">
        {/* Choice label */}
        <h3 className="text-lg font-bold text-foreground mb-2">{choice.label}</h3>

        {/* Tradeoff */}
        <p className="text-sm text-muted-foreground">{choice.short_tradeoff}</p>

        {/* Quick stats preview */}
        <div className="flex flex-wrap gap-2 mt-3">
          {choice.effects.cash !== undefined && choice.effects.cash !== 0 && (
            <span
              className={cn(
                'text-xs px-2 py-1 rounded-full font-medium',
                choice.effects.cash > 0
                  ? 'bg-green-500/20 text-green-400'
                  : 'bg-red-500/20 text-red-400'
              )}
            >
              {choice.effects.cash > 0 ? '+' : ''}${Math.abs(choice.effects.cash).toLocaleString()}
            </span>
          )}
          {choice.effects.credit_score !== undefined && choice.effects.credit_score !== 0 && (
            <span
              className={cn(
                'text-xs px-2 py-1 rounded-full font-medium',
                choice.effects.credit_score > 0
                  ? 'bg-blue-500/20 text-blue-400'
                  : 'bg-orange-500/20 text-orange-400'
              )}
            >
              Credit {choice.effects.credit_score > 0 ? '+' : ''}{choice.effects.credit_score}
            </span>
          )}
          {choice.effects.stress !== undefined && choice.effects.stress !== 0 && (
            <span
              className={cn(
                'text-xs px-2 py-1 rounded-full font-medium',
                choice.effects.stress < 0
                  ? 'bg-green-500/20 text-green-400'
                  : 'bg-red-500/20 text-red-400'
              )}
            >
              Stress {choice.effects.stress > 0 ? '+' : ''}{choice.effects.stress}
            </span>
          )}
        </div>
      </div>

      {/* Selection indicator */}
      {isSelected && (
        <motion.div
          className="absolute bottom-3 right-3"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring' }}
        >
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <Zap className="w-4 h-4 text-primary-foreground" />
          </div>
        </motion.div>
      )}
    </motion.button>
  )
}

interface ScenarioCardProps {
  title: string
  scenario: string
  conceptTags: string[]
  chapter: number
  biasNudge?: string
}

export function ScenarioCard({ title, scenario, conceptTags, chapter, biasNudge }: ScenarioCardProps) {
  const chapterEmojis = ['🚀', '💳', '📈', '🏠', '🎯']

  return (
    <motion.div
      className="relative bg-gradient-to-br from-card via-card to-primary/5 rounded-3xl border border-primary/20 p-6 shadow-xl overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-2xl" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-500/20 to-transparent rounded-full blur-2xl" />

      {/* Chapter indicator */}
      <div className="flex items-center gap-3 mb-4">
        <div className="text-3xl">{chapterEmojis[chapter - 1]}</div>
        <div>
          <div className="text-xs text-muted-foreground uppercase tracking-wide">Chapter {chapter}</div>
          <h2 className="text-2xl font-black text-foreground">{title}</h2>
        </div>
      </div>

      {/* Scenario text */}
      <p className="text-base text-muted-foreground leading-relaxed mb-4">{scenario}</p>

      {/* Concept tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {conceptTags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium border border-primary/20"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Bias nudge */}
      {biasNudge && (
        <motion.div
          className="mt-4 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-start gap-3">
            <div className="text-2xl">🧠</div>
            <div>
              <div className="text-xs font-bold text-amber-400 uppercase tracking-wide mb-1">
                Mind Trap Alert
              </div>
              <p className="text-sm text-amber-200/80">{biasNudge}</p>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}
