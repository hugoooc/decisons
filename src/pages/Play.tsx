import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Undo2,
  AlertTriangle,
  Info,
  DollarSign,
  TrendingUp,
  TrendingDown,
  CreditCard,
  PiggyBank,
  Heart,
  Zap,
  ChevronRight,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { useGameStore, selectProgress, selectChapter, selectTotalDebt, selectMonthlyCashFlow } from '@/features/sim/store'
import { decisions, chapters } from '@/data/decisions'
import { cn, formatCurrency } from '@/lib/utils'
import type { Choice } from '@/types'
import { toast } from '@/hooks/use-toast'

export function Play() {
  const navigate = useNavigate()
  const [selectedChoice, setSelectedChoice] = useState<Choice | null>(null)
  const [showImpactModal, setShowImpactModal] = useState(false)
  const [showChapterRecap, setShowChapterRecap] = useState(false)
  const [showUndoWarning, setShowUndoWarning] = useState(false)
  const [impactResult, setImpactResult] = useState<{ newBadges: { name: string; icon: string }[] } | null>(null)

  const {
    currentDecision,
    cash,
    credit_score,
    investments,
    stress,
    net_worth,
    profile,
    completed,
    makeChoice,
    undoLastChoice,
    history,
  } = useGameStore()

  const progress = useGameStore(selectProgress)
  const chapter = useGameStore(selectChapter)
  const totalDebt = useGameStore(selectTotalDebt)
  const monthlyCashFlow = useGameStore(selectMonthlyCashFlow)

  const decision = decisions[currentDecision]
  const currentChapter = chapters[chapter - 1]

  // Redirect if no profile selected
  useEffect(() => {
    if (!profile) {
      navigate('/onboarding')
    }
  }, [profile, navigate])

  // Redirect if completed
  useEffect(() => {
    if (completed) {
      navigate('/results')
    }
  }, [completed, navigate])

  // Check for chapter boundary
  useEffect(() => {
    if (currentDecision > 0 && currentDecision % 6 === 0) {
      setShowChapterRecap(true)
    }
  }, [currentDecision])

  // Show toast for new badges
  useEffect(() => {
    if (impactResult?.newBadges && impactResult.newBadges.length > 0) {
      impactResult.newBadges.forEach((badge) => {
        toast({
          title: `${badge.icon} Badge Unlocked!`,
          description: badge.name,
          variant: 'success',
        })
      })
    }
  }, [impactResult])

  if (!decision) {
    return null
  }

  const handleChoiceSelect = (choice: Choice) => {
    setSelectedChoice(choice)
  }

  const handleConfirmChoice = () => {
    if (!selectedChoice) return

    const result = makeChoice(decision.id, selectedChoice.id)
    setImpactResult(result)
    setShowImpactModal(true)
  }

  const handleContinue = () => {
    setShowImpactModal(false)
    setSelectedChoice(null)
    setImpactResult(null)
  }

  const handleUndo = () => {
    setShowUndoWarning(true)
  }

  const confirmUndo = () => {
    undoLastChoice()
    setShowUndoWarning(false)
    setSelectedChoice(null)
  }

  const getImpactIcon = (value: number) => {
    if (value > 0) return <TrendingUp className="w-4 h-4" />
    if (value < 0) return <TrendingDown className="w-4 h-4" />
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Top Progress Bar */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">
                Decision {currentDecision + 1} of {decisions.length}
              </span>
              <Badge variant="secondary">
                Chapter {chapter}: {currentChapter?.title}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              {history.length > 0 && (
                <Button variant="ghost" size="sm" onClick={handleUndo}>
                  <Undo2 className="w-4 h-4 mr-1" />
                  Undo
                </Button>
              )}
            </div>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Decision Area */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              key={decision.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* Bias Nudge */}
              {decision.bias_nudge && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="mb-4"
                >
                  <div className="flex items-start gap-3 p-4 rounded-lg bg-warning/10 border border-warning/20">
                    <Zap className="w-5 h-5 text-warning mt-0.5" />
                    <div>
                      <div className="font-medium text-warning mb-1">Behavioral Nudge</div>
                      <p className="text-sm text-muted-foreground">{decision.bias_nudge}</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Scenario Card */}
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-2xl mb-2">{decision.title}</CardTitle>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {decision.concept_tags.map((tag) => (
                          <Badge key={tag} variant="outline">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Info className="w-5 h-5" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="left" className="max-w-xs">
                        <p className="font-medium mb-1">Why It Matters</p>
                        <p className="text-sm">{decision.why_it_matters}</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <CardDescription className="text-base leading-relaxed">
                    {decision.scenario_text}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {decision.choices.map((choice, index) => (
                      <motion.div
                        key={choice.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Card
                          className={cn(
                            'cursor-pointer transition-all duration-200',
                            selectedChoice?.id === choice.id
                              ? 'ring-2 ring-primary shadow-lg'
                              : 'hover:shadow-md hover:border-primary/50'
                          )}
                          onClick={() => handleChoiceSelect(choice)}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-start gap-4">
                              <div
                                className={cn(
                                  'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium shrink-0',
                                  selectedChoice?.id === choice.id
                                    ? 'bg-primary text-primary-foreground'
                                    : 'bg-muted'
                                )}
                              >
                                {String.fromCharCode(65 + index)}
                              </div>
                              <div className="flex-1">
                                <div className="font-medium mb-1">{choice.label}</div>
                                <div className="text-sm text-muted-foreground">
                                  {choice.short_tradeoff}
                                </div>
                              </div>
                              <ChevronRight
                                className={cn(
                                  'w-5 h-5 transition-transform',
                                  selectedChoice?.id === choice.id
                                    ? 'text-primary translate-x-1'
                                    : 'text-muted-foreground'
                                )}
                              />
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-6 flex justify-end">
                    <Button
                      size="lg"
                      onClick={handleConfirmChoice}
                      disabled={!selectedChoice}
                      className="min-w-[200px]"
                    >
                      Confirm Choice
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Dashboard Sidebar */}
          <div className="space-y-4">
            <Card className="sticky top-24">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Your Dashboard</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Net Worth */}
                <div className="p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-muted-foreground">Net Worth</span>
                    <TrendingUp className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div className={cn('text-2xl font-bold', net_worth >= 0 ? 'text-green-500' : 'text-red-500')}>
                    {formatCurrency(net_worth)}
                  </div>
                </div>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-2 mb-1">
                      <DollarSign className="w-4 h-4 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">Cash</span>
                    </div>
                    <div className="font-semibold">{formatCurrency(cash)}</div>
                  </div>

                  <div className="p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-2 mb-1">
                      <PiggyBank className="w-4 h-4 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">Investments</span>
                    </div>
                    <div className="font-semibold">{formatCurrency(investments)}</div>
                  </div>

                  <div className="p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-2 mb-1">
                      <CreditCard className="w-4 h-4 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">Total Debt</span>
                    </div>
                    <div className="font-semibold text-red-500">{formatCurrency(totalDebt)}</div>
                  </div>

                  <div className="p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-2 mb-1">
                      <TrendingUp className="w-4 h-4 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">Cash Flow</span>
                    </div>
                    <div className={cn('font-semibold', monthlyCashFlow >= 0 ? 'text-green-500' : 'text-red-500')}>
                      {formatCurrency(monthlyCashFlow)}/mo
                    </div>
                  </div>
                </div>

                {/* Credit Score */}
                <div className="p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Credit Score</span>
                    <span className="font-semibold">{Math.round(credit_score)}</span>
                  </div>
                  <Progress
                    value={((credit_score - 300) / 550) * 100}
                    className="h-2"
                  />
                  <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                    <span>300</span>
                    <span>850</span>
                  </div>
                </div>

                {/* Stress Level */}
                <div className="p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Heart className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Stress Level</span>
                    </div>
                    <span className="font-semibold">{Math.round(stress)}%</span>
                  </div>
                  <Progress
                    value={stress}
                    className={cn(
                      'h-2',
                      stress > 60 ? '[&>div]:bg-red-500' : stress > 30 ? '[&>div]:bg-yellow-500' : '[&>div]:bg-green-500'
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Impact Modal */}
      <Dialog open={showImpactModal} onOpenChange={setShowImpactModal}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Decision Impact</DialogTitle>
          </DialogHeader>
          {selectedChoice && (
            <div className="space-y-4">
              <p className="text-muted-foreground">{selectedChoice.explanation}</p>

              {/* Impact Chips */}
              <div className="flex flex-wrap gap-2">
                {selectedChoice.effects.cash !== undefined && selectedChoice.effects.cash !== 0 && (
                  <Badge variant={selectedChoice.effects.cash > 0 ? 'success' : 'destructive'}>
                    {getImpactIcon(selectedChoice.effects.cash)}
                    Cash: {selectedChoice.effects.cash > 0 ? '+' : ''}{formatCurrency(selectedChoice.effects.cash)}
                  </Badge>
                )}
                {selectedChoice.effects.credit_score !== undefined && selectedChoice.effects.credit_score !== 0 && (
                  <Badge variant={selectedChoice.effects.credit_score > 0 ? 'success' : 'destructive'}>
                    {getImpactIcon(selectedChoice.effects.credit_score)}
                    Credit: {selectedChoice.effects.credit_score > 0 ? '+' : ''}{selectedChoice.effects.credit_score}
                  </Badge>
                )}
                {selectedChoice.effects.stress !== undefined && selectedChoice.effects.stress !== 0 && (
                  <Badge variant={selectedChoice.effects.stress < 0 ? 'success' : 'destructive'}>
                    {getImpactIcon(-selectedChoice.effects.stress)}
                    Stress: {selectedChoice.effects.stress > 0 ? '+' : ''}{selectedChoice.effects.stress}
                  </Badge>
                )}
              </div>

              {/* Hidden Cost Reveal */}
              {selectedChoice.hidden_cost && (
                <div className="p-4 rounded-lg bg-warning/10 border border-warning/20">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-warning mt-0.5" />
                    <div>
                      <div className="font-medium text-warning mb-1">Hidden Cost Revealed</div>
                      <p className="text-sm text-muted-foreground">{selectedChoice.hidden_cost}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button onClick={handleContinue} className="w-full">
              Continue
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Chapter Recap Modal */}
      <Dialog open={showChapterRecap} onOpenChange={setShowChapterRecap}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Chapter {chapter - 1} Complete!</DialogTitle>
            <DialogDescription>
              {chapters[chapter - 2]?.title}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-muted/50">
              <h4 className="font-medium mb-2">Your Progress</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Net Worth:</span>
                  <span className={cn('ml-2 font-medium', net_worth >= 0 ? 'text-green-500' : 'text-red-500')}>
                    {formatCurrency(net_worth)}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">Credit Score:</span>
                  <span className="ml-2 font-medium">{Math.round(credit_score)}</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-primary/10">
              <h4 className="font-medium mb-2">Up Next: Chapter {chapter}</h4>
              <p className="text-sm text-muted-foreground">{currentChapter?.description}</p>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setShowChapterRecap(false)} className="w-full">
              Continue to Chapter {chapter}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Undo Warning Modal */}
      <Dialog open={showUndoWarning} onOpenChange={setShowUndoWarning}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-warning" />
              Undo Last Decision?
            </DialogTitle>
          </DialogHeader>
          <p className="text-muted-foreground">
            In real life, you can't undo financial decisions. This feature is for learning purposes
            only. Use it wisely to explore different outcomes.
          </p>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setShowUndoWarning(false)}>
              Cancel
            </Button>
            <Button onClick={confirmUndo}>
              <Undo2 className="w-4 h-4 mr-2" />
              Undo Anyway
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
