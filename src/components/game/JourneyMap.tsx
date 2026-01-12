import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Check, Lock } from 'lucide-react'

interface JourneyMapProps {
  currentDecision: number
  totalDecisions: number
  educatorMode?: boolean
  onDecisionClick?: (index: number) => void
}

const chapterInfo = [
  { name: 'Starting Out', emoji: '🚀', color: 'from-blue-500 to-cyan-500' },
  { name: 'Debt & Credit', emoji: '💳', color: 'from-purple-500 to-pink-500' },
  { name: 'Investing', emoji: '📈', color: 'from-green-500 to-emerald-500' },
  { name: 'Big Choices', emoji: '🏠', color: 'from-orange-500 to-amber-500' },
  { name: 'Long Run', emoji: '🎯', color: 'from-red-500 to-rose-500' },
]

export function JourneyMap({
  currentDecision,
  totalDecisions,
  educatorMode = false,
  onDecisionClick,
}: JourneyMapProps) {
  const decisionsPerChapter = 6
  const chapters = 5

  return (
    <div className="bg-card/50 backdrop-blur-sm rounded-2xl border border-border p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-lg">Your Journey</h3>
        <span className="text-sm text-muted-foreground">
          {currentDecision}/{totalDecisions}
        </span>
      </div>

      <div className="space-y-3">
        {chapterInfo.map((chapter, chapterIndex) => {
          const chapterStart = chapterIndex * decisionsPerChapter
          const chapterEnd = chapterStart + decisionsPerChapter
          const isCurrentChapter =
            currentDecision >= chapterStart && currentDecision < chapterEnd
          const isCompletedChapter = currentDecision >= chapterEnd

          return (
            <div key={chapter.name} className="relative">
              {/* Chapter header */}
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">{chapter.emoji}</span>
                <span
                  className={cn(
                    'text-sm font-medium',
                    isCurrentChapter
                      ? 'text-foreground'
                      : isCompletedChapter
                      ? 'text-green-400'
                      : 'text-muted-foreground'
                  )}
                >
                  {chapter.name}
                </span>
                {isCompletedChapter && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="ml-auto text-green-400"
                  >
                    <Check className="w-4 h-4" />
                  </motion.span>
                )}
              </div>

              {/* Decision dots */}
              <div className="flex gap-1.5 ml-7">
                {[...Array(decisionsPerChapter)].map((_, i) => {
                  const decisionIndex = chapterStart + i
                  const isCompleted = decisionIndex < currentDecision
                  const isCurrent = decisionIndex === currentDecision
                  const isLocked = decisionIndex > currentDecision

                  return (
                    <motion.button
                      key={i}
                      className={cn(
                        'relative w-6 h-6 rounded-full flex items-center justify-center transition-all',
                        isCompleted
                          ? 'bg-gradient-to-br ' + chapter.color
                          : isCurrent
                          ? 'bg-primary ring-2 ring-primary ring-offset-2 ring-offset-background'
                          : 'bg-muted/50'
                      )}
                      whileHover={
                        educatorMode && !isLocked ? { scale: 1.2 } : {}
                      }
                      whileTap={
                        educatorMode && !isLocked ? { scale: 0.9 } : {}
                      }
                      onClick={() => {
                        if (educatorMode && onDecisionClick && !isLocked) {
                          onDecisionClick(decisionIndex)
                        }
                      }}
                      disabled={!educatorMode || isLocked}
                    >
                      {isCompleted && (
                        <Check className="w-3 h-3 text-white" />
                      )}
                      {isCurrent && (
                        <motion.div
                          className="w-2 h-2 rounded-full bg-primary-foreground"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        />
                      )}
                      {isLocked && (
                        <Lock className="w-3 h-3 text-muted-foreground" />
                      )}
                    </motion.button>
                  )
                })}
              </div>

              {/* Connecting line */}
              {chapterIndex < chapters - 1 && (
                <div className="absolute left-[14px] top-10 w-0.5 h-4 bg-border" />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

interface ProgressRingProps {
  progress: number
  size?: number
  strokeWidth?: number
}

export function ProgressRing({ progress, size = 120, strokeWidth = 8 }: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (progress / 100) * circumference

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="absolute inset-0 -rotate-90" width={size} height={size}>
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-muted/30"
        />
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#progressGradient)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="drop-shadow-lg"
        />
        <defs>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="50%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
        </defs>
      </svg>

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-black">{Math.round(progress)}%</span>
        <span className="text-xs text-muted-foreground">Complete</span>
      </div>
    </div>
  )
}

interface XPBarProps {
  currentXP: number
  maxXP: number
  level: number
}

export function XPBar({ currentXP, maxXP, level }: XPBarProps) {
  const percentage = (currentXP / maxXP) * 100

  return (
    <div className="relative">
      {/* Level badge */}
      <div className="absolute -left-2 -top-2 z-10">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center font-black text-lg text-white shadow-lg">
          {level}
        </div>
      </div>

      {/* XP bar container */}
      <div className="ml-6 pl-4">
        <div className="flex justify-between text-xs mb-1">
          <span className="text-muted-foreground">Level {level}</span>
          <span className="text-amber-400 font-medium">
            {currentXP.toLocaleString()} / {maxXP.toLocaleString()} XP
          </span>
        </div>

        {/* Bar */}
        <div className="h-4 rounded-full bg-muted/50 overflow-hidden border border-amber-500/20">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500"
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            {/* Shine effect */}
            <div className="h-full w-full bg-gradient-to-b from-white/30 to-transparent" />
          </motion.div>
        </div>
      </div>
    </div>
  )
}
