import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

interface StatBarProps {
  value: number
  maxValue: number
  label: string
  icon: ReactNode
  color: 'green' | 'blue' | 'yellow' | 'red' | 'purple' | 'orange'
  showValue?: boolean
  valueFormatter?: (value: number) => string
  className?: string
  size?: 'sm' | 'md' | 'lg'
  animated?: boolean
}

const colorClasses = {
  green: {
    bar: 'from-green-400 to-emerald-500',
    glow: 'shadow-green-500/50',
    bg: 'bg-green-950/50',
    text: 'text-green-400',
  },
  blue: {
    bar: 'from-blue-400 to-cyan-500',
    glow: 'shadow-blue-500/50',
    bg: 'bg-blue-950/50',
    text: 'text-blue-400',
  },
  yellow: {
    bar: 'from-yellow-400 to-amber-500',
    glow: 'shadow-yellow-500/50',
    bg: 'bg-yellow-950/50',
    text: 'text-yellow-400',
  },
  red: {
    bar: 'from-red-400 to-rose-500',
    glow: 'shadow-red-500/50',
    bg: 'bg-red-950/50',
    text: 'text-red-400',
  },
  purple: {
    bar: 'from-purple-400 to-violet-500',
    glow: 'shadow-purple-500/50',
    bg: 'bg-purple-950/50',
    text: 'text-purple-400',
  },
  orange: {
    bar: 'from-orange-400 to-amber-500',
    glow: 'shadow-orange-500/50',
    bg: 'bg-orange-950/50',
    text: 'text-orange-400',
  },
}

const sizeClasses = {
  sm: { height: 'h-3', text: 'text-xs', icon: 'w-4 h-4' },
  md: { height: 'h-4', text: 'text-sm', icon: 'w-5 h-5' },
  lg: { height: 'h-6', text: 'text-base', icon: 'w-6 h-6' },
}

export function StatBar({
  value,
  maxValue,
  label,
  icon,
  color,
  showValue = true,
  valueFormatter,
  className,
  size = 'md',
  animated = true,
}: StatBarProps) {
  const percentage = Math.min(100, Math.max(0, (value / maxValue) * 100))
  const colors = colorClasses[color]
  const sizes = sizeClasses[size]

  return (
    <div className={cn('space-y-1', className)}>
      <div className="flex items-center justify-between">
        <div className={cn('flex items-center gap-2', colors.text)}>
          <span className={sizes.icon}>{icon}</span>
          <span className={cn('font-medium', sizes.text)}>{label}</span>
        </div>
        {showValue && (
          <span className={cn('font-bold tabular-nums', colors.text, sizes.text)}>
            {valueFormatter ? valueFormatter(value) : value}
          </span>
        )}
      </div>
      <div
        className={cn(
          'relative rounded-full overflow-hidden border border-white/10',
          colors.bg,
          sizes.height
        )}
      >
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-30">
          <div
            className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)]"
            style={{ backgroundSize: '10px 10px' }}
          />
        </div>

        {/* Progress bar */}
        <motion.div
          className={cn(
            'absolute inset-y-0 left-0 rounded-full bg-gradient-to-r shadow-lg',
            colors.bar,
            colors.glow
          )}
          initial={animated ? { width: 0 } : { width: `${percentage}%` }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />

        {/* Shine effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent rounded-full" />

        {/* Animated pulse for low values */}
        {percentage < 20 && (
          <motion.div
            className={cn(
              'absolute inset-0 rounded-full bg-gradient-to-r opacity-50',
              colors.bar
            )}
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        )}
      </div>
    </div>
  )
}

interface CircularStatProps {
  value: number
  maxValue: number
  label: string
  icon: ReactNode
  color: 'green' | 'blue' | 'yellow' | 'red' | 'purple' | 'orange'
  size?: number
  strokeWidth?: number
}

export function CircularStat({
  value,
  maxValue,
  label,
  icon,
  color,
  size = 80,
  strokeWidth = 8,
}: CircularStatProps) {
  const percentage = Math.min(100, Math.max(0, (value / maxValue) * 100))
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (percentage / 100) * circumference
  const colors = colorClasses[color]

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        {/* Background circle */}
        <svg className="absolute inset-0 -rotate-90" width={size} height={size}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className="text-white/10"
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="url(#gradient)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className={cn('drop-shadow-lg', colors.glow)}
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" className={cn(colors.bar.includes('green') ? 'text-green-400' : colors.bar.includes('blue') ? 'text-blue-400' : 'text-purple-400')} stopColor="currentColor" />
              <stop offset="100%" className={cn(colors.bar.includes('emerald') ? 'text-emerald-500' : colors.bar.includes('cyan') ? 'text-cyan-500' : 'text-violet-500')} stopColor="currentColor" />
            </linearGradient>
          </defs>
        </svg>

        {/* Center content */}
        <div className={cn('absolute inset-0 flex items-center justify-center', colors.text)}>
          {icon}
        </div>
      </div>
      <div className="text-center">
        <div className={cn('font-bold text-lg', colors.text)}>{Math.round(value)}</div>
        <div className="text-xs text-muted-foreground">{label}</div>
      </div>
    </div>
  )
}
