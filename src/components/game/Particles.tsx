import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

interface Particle {
  id: number
  x: number
  y: number
  emoji: string
  size: number
  rotation: number
}

interface ConfettiProps {
  active: boolean
  duration?: number
}

const confettiEmojis = ['🎉', '🎊', '✨', '⭐', '💫', '🌟', '💰', '💵', '💎', '🏆']

export function Confetti({ active, duration = 3000 }: ConfettiProps) {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    if (active) {
      const newParticles: Particle[] = []
      for (let i = 0; i < 50; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: -10,
          emoji: confettiEmojis[Math.floor(Math.random() * confettiEmojis.length)],
          size: 16 + Math.random() * 16,
          rotation: Math.random() * 360,
        })
      }
      setParticles(newParticles)

      const timer = setTimeout(() => {
        setParticles([])
      }, duration)

      return () => clearTimeout(timer)
    }
  }, [active, duration])

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute"
            style={{
              left: `${particle.x}%`,
              fontSize: particle.size,
            }}
            initial={{
              y: '-10%',
              rotate: particle.rotation,
              opacity: 1,
            }}
            animate={{
              y: '110vh',
              rotate: particle.rotation + 360 * (Math.random() > 0.5 ? 1 : -1),
              x: `${(Math.random() - 0.5) * 100}px`,
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 2 + Math.random() * 2,
              ease: 'easeIn',
            }}
          >
            {particle.emoji}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

interface FloatingCoinsProps {
  active: boolean
  amount?: number
}

export function FloatingCoins({ active, amount = 5 }: FloatingCoinsProps) {
  const [coins, setCoins] = useState<Particle[]>([])

  useEffect(() => {
    if (active) {
      const newCoins: Particle[] = []
      for (let i = 0; i < amount; i++) {
        newCoins.push({
          id: Date.now() + i,
          x: 40 + Math.random() * 20,
          y: 50,
          emoji: '💰',
          size: 24 + Math.random() * 12,
          rotation: 0,
        })
      }
      setCoins(newCoins)

      const timer = setTimeout(() => {
        setCoins([])
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [active, amount])

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <AnimatePresence>
        {coins.map((coin, index) => (
          <motion.div
            key={coin.id}
            className="absolute"
            style={{
              left: `${coin.x}%`,
              top: `${coin.y}%`,
              fontSize: coin.size,
            }}
            initial={{ opacity: 0, scale: 0, y: 0 }}
            animate={{
              opacity: [0, 1, 1, 0],
              scale: [0.5, 1.2, 1, 0.8],
              y: -100 - index * 20,
            }}
            transition={{
              duration: 1.5,
              delay: index * 0.1,
              ease: 'easeOut',
            }}
          >
            {coin.emoji}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

interface SparklesProps {
  className?: string
}

export function Sparkles({ className }: SparklesProps) {
  return (
    <div className={className}>
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-yellow-400"
          style={{
            top: `${20 + Math.random() * 60}%`,
            left: `${10 + Math.random() * 80}%`,
          }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
            rotate: [0, 180],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.3,
            ease: 'easeInOut',
          }}
        >
          ✦
        </motion.div>
      ))}
    </div>
  )
}

interface LevelUpEffectProps {
  show: boolean
  level: number
}

export function LevelUpEffect({ show, level }: LevelUpEffectProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Radial burst */}
          <motion.div
            className="absolute w-96 h-96 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(147,51,234,0.3) 0%, transparent 70%)',
            }}
            initial={{ scale: 0 }}
            animate={{ scale: [0, 2, 2.5], opacity: [1, 0.5, 0] }}
            transition={{ duration: 1 }}
          />

          {/* Level text */}
          <motion.div
            className="relative text-center"
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: [0, 1.2, 1], rotate: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.5, type: 'spring' }}
          >
            <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-purple-500 to-pink-500 drop-shadow-2xl">
              LEVEL UP!
            </div>
            <motion.div
              className="text-8xl font-black text-white mt-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {level}
            </motion.div>
          </motion.div>

          {/* Floating stars */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-4xl"
              style={{
                top: '50%',
                left: '50%',
              }}
              initial={{ x: 0, y: 0, opacity: 1 }}
              animate={{
                x: Math.cos((i * 30 * Math.PI) / 180) * 200,
                y: Math.sin((i * 30 * Math.PI) / 180) * 200,
                opacity: 0,
                scale: [1, 1.5, 0],
              }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              ⭐
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

interface BadgeUnlockEffectProps {
  show: boolean
  badge: { icon: string; name: string } | null
  onComplete?: () => void
}

export function BadgeUnlockEffect({ show, badge, onComplete }: BadgeUnlockEffectProps) {
  useEffect(() => {
    if (show && onComplete) {
      const timer = setTimeout(onComplete, 3000)
      return () => clearTimeout(timer)
    }
  }, [show, onComplete])

  return (
    <AnimatePresence>
      {show && badge && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', duration: 0.8 }}
          >
            {/* Glow ring */}
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 blur-2xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />

            {/* Badge container */}
            <div className="relative bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-500 rounded-3xl p-8 shadow-2xl">
              <div className="text-8xl text-center mb-4">{badge.icon}</div>
              <div className="text-2xl font-bold text-white text-center">{badge.name}</div>
              <div className="text-sm text-white/80 text-center mt-2">Achievement Unlocked!</div>
            </div>

            {/* Orbiting stars */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-2xl"
                style={{
                  top: '50%',
                  left: '50%',
                }}
                animate={{
                  x: [
                    Math.cos((i * 45 * Math.PI) / 180) * 120,
                    Math.cos(((i * 45 + 360) * Math.PI) / 180) * 120,
                  ],
                  y: [
                    Math.sin((i * 45 * Math.PI) / 180) * 120,
                    Math.sin(((i * 45 + 360) * Math.PI) / 180) * 120,
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              >
                ✨
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
