import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  TrendingUp,
  Target,
  Brain,
  GraduationCap,
  Users,
  BarChart3,
  Zap,
  Trophy,
  Star,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useGameStore } from '@/features/sim/store'
import { Character } from '@/components/game'
import { Sparkles } from '@/components/game/Particles'

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const floatAnimation = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
}

export function Landing() {
  const navigate = useNavigate()
  const resetGame = useGameStore((state) => state.resetGame)

  const handleStart = () => {
    resetGame()
    navigate('/onboarding')
  }

  const handleEducator = () => {
    resetGame()
    navigate('/educator')
  }

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-purple-900/20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-primary/20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                fontSize: `${12 + Math.random() * 20}px`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.5, 0.2],
                rotate: [0, 360],
              }}
              transition={{
                duration: 5 + Math.random() * 5,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "easeInOut",
              }}
            >
              {['$', '%', '+', '*'][Math.floor(Math.random() * 4)]}
            </motion.div>
          ))}
        </div>

        <div className="relative container mx-auto px-4 py-24 sm:py-32">
          <motion.div
            initial="initial"
            animate="animate"
            variants={stagger}
            className="text-center max-w-4xl mx-auto"
          >
            {/* Animated character mascot */}
            <motion.div
              variants={fadeIn}
              className="flex justify-center mb-8"
            >
              <motion.div {...floatAnimation}>
                <Character mood="excited" size="lg" animate />
              </motion.div>
            </motion.div>

            <motion.div variants={fadeIn} className="mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/20 to-purple-500/20 border border-primary/30 text-primary text-sm font-medium">
                <Zap className="w-4 h-4 text-yellow-400" />
                Learn by Playing
                <Star className="w-4 h-4 text-yellow-400" />
              </span>
            </motion.div>

            <motion.h1
              variants={fadeIn}
              className="text-5xl sm:text-7xl font-black tracking-tight mb-6"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-pink-500">
                Decisions
              </span>
            </motion.h1>

            <motion.p
              variants={fadeIn}
              className="text-xl sm:text-2xl text-muted-foreground mb-4"
            >
              The Financial Life Simulator Game
            </motion.p>

            <motion.p
              variants={fadeIn}
              className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10"
            >
              Level up your financial IQ! Make 30 life-changing decisions, earn XP, unlock badges,
              and discover how compound interest shapes your destiny.
            </motion.p>

            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="xl"
                onClick={handleStart}
                className="group bg-gradient-to-r from-primary via-purple-500 to-pink-500 hover:scale-105 transition-all duration-300 shadow-lg shadow-primary/25 font-bold text-lg"
              >
                <Trophy className="w-5 h-5 mr-2" />
                Start Your Adventure
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="xl" variant="outline" onClick={handleEducator} className="border-primary/30 hover:bg-primary/10">
                <GraduationCap className="w-5 h-5 mr-2" />
                Educator Mode
              </Button>
            </motion.div>

            {/* Quick stats */}
            <motion.div
              variants={fadeIn}
              className="mt-12 flex justify-center gap-8 text-sm text-muted-foreground"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                Free to Play
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                ~10 Minutes
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                No Sign-up
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Game Features Section */}
      <section className="py-20 bg-gradient-to-b from-background to-muted/30 relative">
        <Sparkles className="absolute inset-0 pointer-events-none opacity-30" />
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-black mb-4 flex items-center justify-center gap-3">
              <span className="text-3xl">🎮</span> Game Features
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Not just another boring finance lesson
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: '⭐',
                iconBg: 'from-yellow-500 to-amber-500',
                title: 'XP & Leveling',
                description: 'Earn experience points for every smart decision. Level up as you master financial concepts!',
              },
              {
                icon: '🏆',
                iconBg: 'from-purple-500 to-pink-500',
                title: 'Unlock Badges',
                description: 'Collect achievements like "Debt Slayer" and "Credit Builder" as you hit milestones.',
              },
              {
                icon: '🎯',
                iconBg: 'from-blue-500 to-cyan-500',
                title: 'Real Consequences',
                description: 'Watch your choices compound over time. Every decision affects your financial future.',
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full border-2 border-primary/10 bg-gradient-to-br from-card to-primary/5 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                  <CardContent className="pt-6">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.iconBg} flex items-center justify-center mb-4 text-3xl shadow-lg`}>
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-black mb-4 flex items-center justify-center gap-3">
              <span className="text-3xl">🧠</span> Learn by Doing
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Experience the consequences of financial choices without the real-world risk
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: Brain,
                color: 'text-purple-400',
                bg: 'bg-purple-500/10',
                title: 'Learn by Consequence',
                description:
                  'See the real impact of your choices through compound effects, not just abstract numbers.',
              },
              {
                icon: TrendingUp,
                color: 'text-green-400',
                bg: 'bg-green-500/10',
                title: 'Master Key Concepts',
                description:
                  'Compound interest, inflation, opportunity cost, and more through hands-on experience.',
              },
              {
                icon: Target,
                color: 'text-blue-400',
                bg: 'bg-blue-500/10',
                title: 'Safe to Fail',
                description:
                  'Make mistakes and learn from them without risking your real financial future.',
              },
            ].map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full border-0 bg-card/50 hover:bg-card transition-colors">
                  <CardContent className="pt-6">
                    <div className={`w-12 h-12 rounded-xl ${benefit.bg} flex items-center justify-center mb-4`}>
                      <benefit.icon className={`w-6 h-6 ${benefit.color}`} />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Preview Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-black mb-4 flex items-center justify-center gap-3">
              <span className="text-3xl">🗺️</span> Your Journey Awaits
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Navigate through 5 life chapters, from your first paycheck to retirement planning
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <Card className="overflow-hidden border-2 border-primary/20 bg-gradient-to-br from-card to-primary/5">
              <div className="p-8">
                <div className="grid grid-cols-5 gap-4">
                  {[
                    { chapter: 1, title: 'Starting Out', icon: '🚀', color: 'from-blue-500 to-cyan-500' },
                    { chapter: 2, title: 'Debt & Credit', icon: '💳', color: 'from-purple-500 to-pink-500' },
                    { chapter: 3, title: 'Investing', icon: '📈', color: 'from-green-500 to-emerald-500' },
                    { chapter: 4, title: 'Big Choices', icon: '🏠', color: 'from-orange-500 to-amber-500' },
                    { chapter: 5, title: 'Long Run', icon: '🎯', color: 'from-red-500 to-rose-500' },
                  ].map((ch, index) => (
                    <motion.div
                      key={ch.chapter}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="text-center"
                    >
                      <motion.div
                        className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${ch.color} flex items-center justify-center text-3xl shadow-lg mb-3`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {ch.icon}
                      </motion.div>
                      <div className="text-xs text-muted-foreground">Chapter {ch.chapter}</div>
                      <div className="text-sm font-bold">{ch.title}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
              <div className="border-t border-primary/10 bg-card/50 p-8">
                <div className="flex items-center justify-center gap-12 text-center">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="p-4 rounded-xl bg-primary/5"
                  >
                    <BarChart3 className="w-8 h-8 text-primary mx-auto mb-2" />
                    <div className="text-3xl font-black text-primary">30</div>
                    <div className="text-sm text-muted-foreground">Decisions</div>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="p-4 rounded-xl bg-purple-500/5"
                  >
                    <TrendingUp className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                    <div className="text-3xl font-black text-purple-400">16</div>
                    <div className="text-sm text-muted-foreground">Concepts</div>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="p-4 rounded-xl bg-amber-500/5"
                  >
                    <Trophy className="w-8 h-8 text-amber-400 mx-auto mb-2" />
                    <div className="text-3xl font-black text-amber-400">5</div>
                    <div className="text-sm text-muted-foreground">Badges</div>
                  </motion.div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-black mb-4 flex items-center justify-center gap-3">
              <span className="text-3xl">💬</span> Player Reviews
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                quote: 'Finally understood why my parents always talked about compound interest. This game made it click!',
                author: 'Sarah K.',
                role: 'College Student',
                avatar: '👩‍🎓',
                rating: 5,
              },
              {
                quote: 'I use this in my economics class. Students are actually excited to learn about financial concepts.',
                author: 'Mr. Thompson',
                role: 'High School Teacher',
                avatar: '👨‍🏫',
                rating: 5,
              },
              {
                quote: 'The badges and XP system kept me hooked. Learned more in 10 minutes than months of reading!',
                author: 'Jake M.',
                role: 'Recent Graduate',
                avatar: '👨‍💼',
                rating: 5,
              },
            ].map((testimonial, index) => (
              <motion.div
                key={testimonial.author}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full border-primary/10 hover:border-primary/30 transition-colors">
                  <CardContent className="pt-6">
                    <div className="flex gap-1 mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-4">"{testimonial.quote}"</p>
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">{testimonial.avatar}</div>
                      <div>
                        <div className="font-bold">{testimonial.author}</div>
                        <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/20 via-background to-purple-900/20 relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-4xl"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            >
              {['💰', '📈', '🎯', '⭐', '🏆'][Math.floor(Math.random() * 5)]}
            </motion.div>
          ))}
        </div>
        <div className="container mx-auto px-4 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="mb-6"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-6xl">🚀</span>
            </motion.div>
            <h2 className="text-4xl font-black mb-4">Ready to Level Up Your Finances?</h2>
            <p className="text-xl text-muted-foreground max-w-xl mx-auto mb-8">
              Start your journey in under a minute. No sign-up required.
            </p>
            <Button
              size="xl"
              onClick={handleStart}
              className="group bg-gradient-to-r from-primary via-purple-500 to-pink-500 hover:scale-105 transition-all duration-300 shadow-xl shadow-primary/30 font-bold text-lg px-8"
            >
              <Zap className="w-5 h-5 mr-2" />
              Play Now
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-primary/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center">
                <span className="text-primary-foreground font-black text-lg">D</span>
              </div>
              <span className="font-bold text-lg">Decisions</span>
            </div>
            <div className="text-sm text-muted-foreground">
              Built for Hackonomics 2026
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={handleEducator} className="text-muted-foreground hover:text-foreground">
                <Users className="w-4 h-4 mr-2" />
                For Educators
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
