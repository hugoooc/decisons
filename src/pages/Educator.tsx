import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Clock,
  Users,
  MessageSquare,
  Lightbulb,
  BookOpen,
  GraduationCap,
  CheckCircle2,
  PlayCircle,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { useGameStore } from '@/features/sim/store'
import { chapters, decisions } from '@/data/decisions'

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

const lessonPlan = [
  {
    time: '0-2 min',
    activity: 'Introduction',
    description:
      'Introduce the simulation concept: students will live a financial life in 10 minutes through 30 decisions.',
  },
  {
    time: '2-8 min',
    activity: 'Simulation',
    description:
      'Students go through the simulation individually or in pairs, making decisions and seeing consequences.',
  },
  {
    time: '8-10 min',
    activity: 'Debrief',
    description:
      'Compare outcomes. Discuss key decisions that led to different results. Review takeaways.',
  },
]

const discussionQuestions: Record<number, string[]> = {
  1: [
    'Why is the 50/30/20 rule a good starting framework for budgeting?',
    'How does lifestyle inflation sneak up on people even as their income grows?',
    'What are the true costs of not having an emergency fund?',
  ],
  2: [
    'Why do credit card companies only require minimum payments?',
    'How can building good credit early save you money over your lifetime?',
    'What is the "debt avalanche" method and why is it mathematically optimal?',
  ],
  3: [
    'Why do most actively managed funds underperform index funds over 15+ years?',
    'How does compound interest work both for and against you?',
    'What is the psychological trap of loss aversion and how does it affect investment decisions?',
  ],
  4: [
    'What hidden costs do first-time homebuyers often underestimate?',
    'Why might leasing a car be the most expensive option over time?',
    'How should you think about insurance as risk transfer?',
  ],
  5: [
    'Why is having an emergency fund so critical during economic downturns?',
    'How does inflation erode purchasing power over time?',
    "What is the '4% rule' for retirement and what are its limitations?",
  ],
}

const facilitationTips = [
  {
    title: 'Encourage Mistakes',
    tip: 'Let students make "bad" choices without judgment. The simulation safely demonstrates consequences.',
  },
  {
    title: 'Compare Outcomes',
    tip: "Have students with different outcomes share their decision paths. Why did one approach work better?",
  },
  {
    title: 'Connect to Real Life',
    tip: "Ask students: 'Have you seen family members face similar decisions? What happened?'",
  },
  {
    title: 'Focus on Concepts',
    tip: 'Use the concept tags to reinforce learning. Each decision maps to specific financial literacy concepts.',
  },
  {
    title: 'Discuss Hidden Costs',
    tip: 'The "Hidden Cost Revealed" moments are key teaching opportunities. Why are these costs often invisible?',
  },
]

export function Educator() {
  const navigate = useNavigate()
  const { resetGame, setEducatorMode } = useGameStore()

  const handleStartEducatorMode = () => {
    resetGame()
    setEducatorMode(true)
    navigate('/onboarding')
  }

  const handleStartRegularMode = () => {
    resetGame()
    setEducatorMode(false)
    navigate('/onboarding')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div {...fadeIn} className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <GraduationCap className="w-8 h-8 text-primary" />
            <h1 className="text-4xl font-bold">Educator Mode</h1>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Everything you need to use Decisions in your classroom. 10-minute lesson plan,
            discussion questions, and facilitation tips.
          </p>
        </motion.div>

        {/* Quick Start */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PlayCircle className="w-5 h-5 text-primary" />
                Quick Start
              </CardTitle>
              <CardDescription>Choose how to run the simulation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button size="lg" className="w-full" onClick={handleStartEducatorMode}>
                <Users className="w-5 h-5 mr-2" />
                Start Educator Mode
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <p className="text-sm text-muted-foreground text-center">
                Educator mode enables timeline navigation and deterministic scenarios for consistent
                classroom discussions.
              </p>
              <div className="flex justify-center">
                <Button variant="link" onClick={handleStartRegularMode}>
                  Or start regular simulation
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Lesson Plan */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                10-Minute Lesson Plan
              </CardTitle>
              <CardDescription>A complete lesson structure for classroom use</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {lessonPlan.map((item) => (
                  <div
                    key={item.time}
                    className="flex gap-4 items-start p-4 rounded-lg bg-muted/50"
                  >
                    <div className="shrink-0 w-20 font-mono text-sm font-medium text-primary">
                      {item.time}
                    </div>
                    <div>
                      <div className="font-medium mb-1">{item.activity}</div>
                      <div className="text-sm text-muted-foreground">{item.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Discussion Questions by Chapter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-primary" />
            Discussion Questions
          </h2>

          <Tabs defaultValue="1" className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-6">
              {chapters.map((chapter) => (
                <TabsTrigger key={chapter.number} value={chapter.number.toString()}>
                  Ch. {chapter.number}
                </TabsTrigger>
              ))}
            </TabsList>

            {chapters.map((chapter) => (
              <TabsContent key={chapter.number} value={chapter.number.toString()}>
                <Card>
                  <CardHeader>
                    <CardTitle>
                      Chapter {chapter.number}: {chapter.title}
                    </CardTitle>
                    <CardDescription>{chapter.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {discussionQuestions[chapter.number]?.map((question, index) => (
                        <div
                          key={index}
                          className="flex gap-3 items-start p-3 rounded-lg bg-muted/50"
                        >
                          <div className="shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium text-primary">
                            {index + 1}
                          </div>
                          <p className="text-sm">{question}</p>
                        </div>
                      ))}
                    </div>

                    {/* Key Concepts for this chapter */}
                    <div className="mt-6">
                      <h4 className="font-medium mb-3">Key Concepts in This Chapter</h4>
                      <div className="flex flex-wrap gap-2">
                        {Array.from(
                          new Set(
                            decisions
                              .slice((chapter.number - 1) * 6, chapter.number * 6)
                              .flatMap((d) => d.concept_tags)
                          )
                        ).map((tag) => (
                          <Badge key={tag} variant="outline">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>

        {/* Facilitation Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Lightbulb className="w-6 h-6 text-primary" />
            Facilitation Tips
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {facilitationTips.map((item) => (
              <Card key={item.title} className="h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{item.tip}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Curriculum Alignment */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-12"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                Curriculum Alignment
              </CardTitle>
              <CardDescription>
                How Decisions aligns with financial literacy education standards
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Concepts Covered</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      Budgeting and the 50/30/20 rule
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      Compound interest (for savings and debt)
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      Credit scores and credit building
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      Investment basics and diversification
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      Risk management and insurance
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      Inflation and purchasing power
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-3">Behavioral Economics Topics</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      Present bias and delayed gratification
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      Loss aversion in investing
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      Lifestyle inflation awareness
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      Opportunity cost recognition
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      Social comparison traps
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      Hidden costs and fee awareness
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Decision Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold mb-6">All 30 Decisions Overview</h2>
          <div className="space-y-6">
            {chapters.map((chapter) => (
              <Card key={chapter.number}>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Chapter {chapter.number}: {chapter.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {decisions
                      .slice((chapter.number - 1) * 6, chapter.number * 6)
                      .map((decision, index) => (
                        <div
                          key={decision.id}
                          className="p-3 rounded-lg bg-muted/50 text-sm"
                        >
                          <div className="font-medium mb-1">
                            {(chapter.number - 1) * 6 + index + 1}. {decision.title}
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {decision.concept_tags.slice(0, 2).map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-center"
        >
          <Button size="lg" onClick={handleStartEducatorMode}>
            <GraduationCap className="w-5 h-5 mr-2" />
            Launch Educator Mode
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
