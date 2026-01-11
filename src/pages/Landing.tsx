import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  TrendingUp,
  Target,
  Brain,
  Sparkles,
  GraduationCap,
  Users,
  BarChart3,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useGameStore } from '@/features/sim/store'

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
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-purple-900/20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />

        <div className="relative container mx-auto px-4 py-24 sm:py-32">
          <motion.div
            initial="initial"
            animate="animate"
            variants={stagger}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div variants={fadeIn} className="mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <Sparkles className="w-4 h-4" />
                Learn by Living
              </span>
            </motion.div>

            <motion.h1
              variants={fadeIn}
              className="text-5xl sm:text-7xl font-bold tracking-tight mb-6"
            >
              <span className="gradient-text">Decisions</span>
            </motion.h1>

            <motion.p
              variants={fadeIn}
              className="text-xl sm:text-2xl text-muted-foreground mb-4"
            >
              A Financial Life Simulator
            </motion.p>

            <motion.p
              variants={fadeIn}
              className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10"
            >
              Live a financial life in 10 minutes. Make 30 key decisions and discover how compound
              interest, inflation, and your choices shape your future.
            </motion.p>

            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="xl" onClick={handleStart} className="group">
                Start Your Journey
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="xl" variant="outline" onClick={handleEducator}>
                <GraduationCap className="w-5 h-5 mr-2" />
                Educator Mode
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">Why Decisions Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Experience the consequences of financial choices without the real-world risk
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: Brain,
                title: 'Learn by Consequence',
                description:
                  'See the real impact of your choices through compound effects, not just abstract numbers.',
              },
              {
                icon: TrendingUp,
                title: 'Understand Key Concepts',
                description:
                  'Master compound interest, inflation, opportunity cost, and more through hands-on experience.',
              },
              {
                icon: Target,
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
                <Card className="h-full card-hover border-0 bg-card/50">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <benefit.icon className="w-6 h-6 text-primary" />
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

      {/* How It Works Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Three simple steps to financial enlightenment
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                step: '01',
                title: 'Choose Your Starting Point',
                description:
                  'Select from different life situations: starting from scratch, having a safety net, or beginning with debt.',
              },
              {
                step: '02',
                title: 'Make 30 Key Decisions',
                description:
                  'Navigate through budgeting, debt, investing, housing, and life shocks. Each choice has real consequences.',
              },
              {
                step: '03',
                title: 'See Your Financial Future',
                description:
                  'Review your outcome with detailed charts, personalized takeaways, and share your results.',
              },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="text-6xl font-bold text-primary/10 absolute -top-4 -left-2">
                  {item.step}
                </div>
                <div className="relative pt-8">
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Preview Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Experience the Journey</h2>
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
            <Card className="overflow-hidden border-2 border-primary/20">
              <div className="bg-gradient-to-r from-primary/10 to-purple-500/10 p-8">
                <div className="grid grid-cols-5 gap-4">
                  {[
                    { chapter: 1, title: 'Starting Out', icon: '🚀' },
                    { chapter: 2, title: 'Debt & Credit', icon: '💳' },
                    { chapter: 3, title: 'Investing', icon: '📈' },
                    { chapter: 4, title: 'Big Choices', icon: '🏠' },
                    { chapter: 5, title: 'Long Run', icon: '🎯' },
                  ].map((ch) => (
                    <div key={ch.chapter} className="text-center">
                      <div className="text-3xl mb-2">{ch.icon}</div>
                      <div className="text-xs text-muted-foreground">Chapter {ch.chapter}</div>
                      <div className="text-sm font-medium">{ch.title}</div>
                    </div>
                  ))}
                </div>
              </div>
              <CardContent className="p-8">
                <div className="flex items-center justify-center gap-8 text-center">
                  <div>
                    <BarChart3 className="w-8 h-8 text-primary mx-auto mb-2" />
                    <div className="text-2xl font-bold">30</div>
                    <div className="text-sm text-muted-foreground">Decisions</div>
                  </div>
                  <div className="h-12 w-px bg-border" />
                  <div>
                    <TrendingUp className="w-8 h-8 text-primary mx-auto mb-2" />
                    <div className="text-2xl font-bold">16</div>
                    <div className="text-sm text-muted-foreground">Key Concepts</div>
                  </div>
                  <div className="h-12 w-px bg-border" />
                  <div>
                    <Target className="w-8 h-8 text-primary mx-auto mb-2" />
                    <div className="text-2xl font-bold">5</div>
                    <div className="text-sm text-muted-foreground">Badges to Earn</div>
                  </div>
                </div>
              </CardContent>
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
            <h2 className="text-3xl font-bold mb-4">What People Are Saying</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                quote:
                  'Finally understood why my parents always talked about compound interest. This made it click!',
                author: 'College Student',
                role: 'First-time Investor',
              },
              {
                quote:
                  'I use this in my economics class. Students are actually excited to learn about financial concepts.',
                author: 'High School Teacher',
                role: 'Economics Educator',
              },
              {
                quote:
                  "Wish I had this before making real financial mistakes. The 'hidden cost' reveals were eye-opening.",
                author: 'Young Professional',
                role: 'Recent Graduate',
              },
            ].map((testimonial, index) => (
              <motion.div
                key={testimonial.author}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardContent className="pt-6">
                    <p className="text-muted-foreground mb-4 italic">"{testimonial.quote}"</p>
                    <div>
                      <div className="font-semibold">{testimonial.author}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/20 via-background to-purple-900/20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">Ready to Shape Your Financial Future?</h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8">
              Start your journey in under a minute. No sign-up required.
            </p>
            <Button size="xl" onClick={handleStart} className="group">
              Begin Simulation
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold">D</span>
              </div>
              <span className="font-semibold">Decisions</span>
            </div>
            <div className="text-sm text-muted-foreground">
              Built for Hackonomics 2026
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={handleEducator}>
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
