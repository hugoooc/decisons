import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface CharacterProps {
  mood: 'happy' | 'neutral' | 'worried' | 'stressed' | 'excited'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  animate?: boolean
}

const moodColors = {
  happy: 'from-green-400 to-emerald-500',
  neutral: 'from-blue-400 to-indigo-500',
  worried: 'from-yellow-400 to-orange-500',
  stressed: 'from-orange-400 to-red-500',
  excited: 'from-purple-400 to-pink-500',
}

const moodExpressions = {
  happy: { eyes: '◠', mouth: '◡', eyebrows: '' },
  neutral: { eyes: '•', mouth: '—', eyebrows: '' },
  worried: { eyes: '•', mouth: '︿', eyebrows: '︵' },
  stressed: { eyes: '×', mouth: '﹏', eyebrows: '︵' },
  excited: { eyes: '★', mouth: 'ᗜ', eyebrows: '' },
}

const sizeClasses = {
  sm: 'w-16 h-16',
  md: 'w-24 h-24',
  lg: 'w-32 h-32',
}

const fontSizes = {
  sm: { eyes: 'text-lg', mouth: 'text-sm' },
  md: { eyes: 'text-2xl', mouth: 'text-lg' },
  lg: { eyes: 'text-3xl', mouth: 'text-xl' },
}

export function Character({ mood, size = 'md', className, animate = true }: CharacterProps) {
  const expression = moodExpressions[mood]
  const colorClass = moodColors[mood]
  const sizeClass = sizeClasses[size]
  const fontSize = fontSizes[size]

  return (
    <motion.div
      className={cn('relative', className)}
      animate={animate ? {
        y: [0, -4, 0],
      } : {}}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {/* Glow effect */}
      <div
        className={cn(
          'absolute inset-0 rounded-full blur-xl opacity-50 bg-gradient-to-br',
          colorClass
        )}
      />

      {/* Character body */}
      <motion.div
        className={cn(
          'relative rounded-full bg-gradient-to-br flex flex-col items-center justify-center',
          colorClass,
          sizeClass
        )}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Face */}
        <div className="flex flex-col items-center justify-center text-white">
          {/* Eyebrows */}
          {expression.eyebrows && (
            <div className={cn('opacity-80', fontSize.mouth)}>
              {expression.eyebrows} {expression.eyebrows}
            </div>
          )}
          {/* Eyes */}
          <div className={cn('flex gap-2', fontSize.eyes)}>
            <motion.span
              animate={mood === 'excited' ? { rotate: [0, 15, -15, 0] } : {}}
              transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
            >
              {expression.eyes}
            </motion.span>
            <motion.span
              animate={mood === 'excited' ? { rotate: [0, -15, 15, 0] } : {}}
              transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
            >
              {expression.eyes}
            </motion.span>
          </div>
          {/* Mouth */}
          <div className={cn('mt-1', fontSize.mouth)}>{expression.mouth}</div>
        </div>

        {/* Sparkles for excited mood */}
        <AnimatePresence>
          {mood === 'excited' && (
            <>
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-yellow-300"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0.5, 1, 0.5],
                    x: [0, (i - 1) * 20],
                    y: [0, -20 - i * 10],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                >
                  ✦
                </motion.div>
              ))}
            </>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Shadow */}
      <div
        className={cn(
          'absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-2 rounded-full bg-black/20 blur-sm',
          size === 'sm' ? 'w-12 h-2' : size === 'md' ? 'w-16 h-3' : 'w-20 h-4'
        )}
      />
    </motion.div>
  )
}

export function getMoodFromState(stress: number, netWorth: number): CharacterProps['mood'] {
  if (stress > 70) return 'stressed'
  if (stress > 50) return 'worried'
  if (netWorth > 50000) return 'excited'
  if (netWorth > 10000) return 'happy'
  return 'neutral'
}
