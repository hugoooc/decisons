import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight,
  ArrowLeft,
  Rocket,
  Shield,
  AlertTriangle,
  TrendingUp,
  Heart,
  CheckCircle2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useGameStore } from '@/features/sim/store'
import type { StartingProfile, Goal } from '@/types'
import { cn } from '@/lib/utils'

const profiles: {
  id: StartingProfile
  title: string
  description: string
  icon: React.ElementType
  stats: { label: string; value: string }[]
  color: string
}[] = [
  {
    id: 'scratch',
    title: 'Starting from Scratch',
    description: 'Fresh out of school with minimal savings but no debt. A clean slate.',
    icon: Rocket,
    stats: [
      { label: 'Cash', value: '$1,000' },
      { label: 'Income', value: '$2,800/mo' },
      { label: 'Debt', value: '$0' },
      { label: 'Credit Score', value: '650' },
    ],
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'safety_net',
    title: 'Supportive Safety Net',
    description: "Family support gave you a head start. Higher savings and some investments.",
    icon: Shield,
    stats: [
      { label: 'Cash', value: '$5,000' },
      { label: 'Income', value: '$3,200/mo' },
      { label: 'Investments', value: '$2,000' },
      { label: 'Credit Score', value: '700' },
    ],
    color: 'from-green-500 to-emerald-500',
  },
  {
    id: 'debt_start',
    title: 'Debt Head Start',
    description: 'Student loans and credit card debt from college. Starting in the red.',
    icon: AlertTriangle,
    stats: [
      { label: 'Cash', value: '$500' },
      { label: 'Income', value: '$2,800/mo' },
      { label: 'Total Debt', value: '$30,000' },
      { label: 'Credit Score', value: '620' },
    ],
    color: 'from-orange-500 to-red-500',
  },
]

const goals: {
  id: Goal
  title: string
  description: string
  icon: React.ElementType
}[] = [
  {
    id: 'stability',
    title: 'Financial Stability',
    description: 'Focus on building a solid foundation with emergency savings and low debt.',
    icon: Shield,
  },
  {
    id: 'growth',
    title: 'Wealth Growth',
    description: 'Prioritize investing and building long-term wealth through compound returns.',
    icon: TrendingUp,
  },
  {
    id: 'freedom',
    title: 'Financial Freedom',
    description: 'Balance between stability and growth, aiming for flexibility and options.',
    icon: Heart,
  },
]

export function Onboarding() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const { setProfile, setGoal, profile: selectedProfile, goal: selectedGoal } = useGameStore()

  const handleProfileSelect = (profile: StartingProfile) => {
    setProfile(profile)
  }

  const handleGoalSelect = (goal: Goal) => {
    setGoal(goal)
  }

  const handleNext = () => {
    if (step === 1 && selectedProfile) {
      setStep(2)
    } else if (step === 2 && selectedGoal) {
      navigate('/play')
    }
  }

  const handleBack = () => {
    if (step === 2) {
      setStep(1)
    } else {
      navigate('/')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <Button variant="ghost" onClick={handleBack} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          {/* Progress indicator */}
          <div className="flex items-center gap-4 mb-8">
            <div
              className={cn(
                'flex items-center gap-2',
                step >= 1 ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              <div
                className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium',
                  step >= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted'
                )}
              >
                {step > 1 ? <CheckCircle2 className="w-5 h-5" /> : '1'}
              </div>
              <span className="hidden sm:inline">Choose Profile</span>
            </div>
            <div className="flex-1 h-1 bg-muted rounded-full max-w-[100px]">
              <div
                className={cn(
                  'h-full rounded-full bg-primary transition-all duration-300',
                  step >= 2 ? 'w-full' : 'w-0'
                )}
              />
            </div>
            <div
              className={cn(
                'flex items-center gap-2',
                step >= 2 ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              <div
                className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium',
                  step >= 2 ? 'bg-primary text-primary-foreground' : 'bg-muted'
                )}
              >
                2
              </div>
              <span className="hidden sm:inline">Set Goal</span>
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4">Choose Your Starting Point</h1>
                <p className="text-muted-foreground max-w-xl mx-auto">
                  Everyone starts their financial journey differently. Select the profile that
                  best represents where you want to begin.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
                {profiles.map((profile) => (
                  <motion.div
                    key={profile.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Card
                      className={cn(
                        'cursor-pointer transition-all duration-300 h-full',
                        selectedProfile === profile.id
                          ? 'ring-2 ring-primary shadow-lg shadow-primary/20'
                          : 'hover:shadow-md'
                      )}
                      onClick={() => handleProfileSelect(profile.id)}
                    >
                      <CardHeader>
                        <div
                          className={cn(
                            'w-12 h-12 rounded-lg bg-gradient-to-br flex items-center justify-center mb-4',
                            profile.color
                          )}
                        >
                          <profile.icon className="w-6 h-6 text-white" />
                        </div>
                        <CardTitle className="text-xl">{profile.title}</CardTitle>
                        <CardDescription>{profile.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-3">
                          {profile.stats.map((stat) => (
                            <div key={stat.label} className="bg-muted/50 rounded-lg p-3">
                              <div className="text-xs text-muted-foreground">{stat.label}</div>
                              <div className="font-semibold">{stat.value}</div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4">What's Your Goal?</h1>
                <p className="text-muted-foreground max-w-xl mx-auto">
                  Your goal influences your starting risk tolerance and the insights you'll
                  receive at the end.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
                {goals.map((goal) => (
                  <motion.div
                    key={goal.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Card
                      className={cn(
                        'cursor-pointer transition-all duration-300 h-full',
                        selectedGoal === goal.id
                          ? 'ring-2 ring-primary shadow-lg shadow-primary/20'
                          : 'hover:shadow-md'
                      )}
                      onClick={() => handleGoalSelect(goal.id)}
                    >
                      <CardHeader className="text-center">
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                          <goal.icon className="w-8 h-8 text-primary" />
                        </div>
                        <CardTitle className="text-xl">{goal.title}</CardTitle>
                        <CardDescription className="text-sm">{goal.description}</CardDescription>
                      </CardHeader>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-center">
          <Button
            size="lg"
            onClick={handleNext}
            disabled={(step === 1 && !selectedProfile) || (step === 2 && !selectedGoal)}
            className="min-w-[200px]"
          >
            {step === 2 ? 'Start Simulation' : 'Continue'}
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  )
}
