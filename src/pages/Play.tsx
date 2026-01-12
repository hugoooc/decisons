import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Undo2,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Sparkles,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import {
  useGameStore,
  selectChapter,
  selectTotalDebt,
  selectMonthlyCashFlow,
  selectMaxXP,
} from '@/features/sim/store'
import { decisions, chapters } from '@/data/decisions'
import { cn, formatCurrency } from '@/lib/utils'
import type { Choice } from '@/types'

// Game components
import {
  GameHUD,
  DecisionCard,
  ScenarioCard,
  Confetti,
  LevelUpEffect,
  BadgeUnlockEffect,
  FloatingCoins,
} from '@/components/game'

export function Play() {
  const navigate = useNavigate()
  const [selectedChoice, setSelectedChoice] = useState<Choice | null>(null)
  const [showImpactModal, setShowImpactModal] = useState(false)
  const [showChapterRecap, setShowChapterRecap] = useState(false)
  const [showUndoWarning, setShowUndoWarning] = useState(false)
  const [impactResult, setImpactResult] = useState<{
    newBadges: { name: string; icon: string }[]
    xpGained: number
    leveledUp: boolean
    newLevel: number
  } | null>(null)
  const [showConfetti, setShowConfetti] = useState(false)
  const [showLevelUp, setShowLevelUp] = useState(false)
  const [showBadgeUnlock, setShowBadgeUnlock] = useState(false)
  const [currentBadge, setCurrentBadge] = useState<{ icon: string; name: string } | null>(null)
  const [showFloatingCoins, setShowFloatingCoins] = useState(false)

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
    educatorMode,
    goToDecision,
    level,
    xp,
  } = useGameStore()

  const chapter = useGameStore(selectChapter)
  const totalDebt = useGameStore(selectTotalDebt)
  const monthlyCashFlow = useGameStore(selectMonthlyCashFlow)
  const maxXP = useGameStore(selectMaxXP)

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
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 3000)
    }
  }, [currentDecision])

  // Handle badge unlock queue
  useEffect(() => {
    if (impactResult?.newBadges && impactResult.newBadges.length > 0 && !showBadgeUnlock) {
      const badge = impactResult.newBadges[0]
      setCurrentBadge(badge)
      setShowBadgeUnlock(true)
    }
  }, [impactResult, showBadgeUnlock])

  // Handle level up effect
  useEffect(() => {
    if (impactResult?.leveledUp) {
      setShowLevelUp(true)
      setTimeout(() => setShowLevelUp(false), 2500)
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

    // Show floating coins for cash changes
    if (selectedChoice.effects.cash && selectedChoice.effects.cash > 0) {
      setShowFloatingCoins(true)
      setTimeout(() => setShowFloatingCoins(false), 2000)
    }
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

  const handleBadgeComplete = () => {
    setShowBadgeUnlock(false)
    setCurrentBadge(null)
    // Check if there are more badges to show
    if (impactResult?.newBadges && impactResult.newBadges.length > 1) {
      const remaining = impactResult.newBadges.slice(1)
      setImpactResult({ ...impactResult, newBadges: remaining })
    }
  }

  const handleDecisionClick = (index: number) => {
    if (educatorMode) {
      goToDecision(index)
    }
  }

  const getImpactIcon = (value: number) => {
    if (value > 0) return <TrendingUp className="w-4 h-4" />
    if (value < 0) return <TrendingDown className="w-4 h-4" />
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Particle Effects */}
      <Confetti active={showConfetti} />
      <LevelUpEffect show={showLevelUp} level={impactResult?.newLevel || level} />
      <BadgeUnlockEffect show={showBadgeUnlock} badge={currentBadge} onComplete={handleBadgeComplete} />
      <FloatingCoins active={showFloatingCoins} amount={8} />

      {/* Top Progress Bar - Minimal */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-primary/10">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center font-black text-white text-sm">
                  {level}
                </div>
                <span className="font-bold text-lg">Level {level}</span>
              </div>
              <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span className="text-sm font-medium text-amber-400">
                  {xp}/{maxXP} XP
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge
                variant="outline"
                className="bg-primary/5 border-primary/20"
              >
                Chapter {chapter}: {currentChapter?.title}
              </Badge>
              {history.length > 0 && (
                <Button variant="ghost" size="sm" onClick={handleUndo} className="text-muted-foreground">
                  <Undo2 className="w-4 h-4 mr-1" />
                  Undo
                </Button>
              )}
            </div>
          </div>
          {/* XP Progress bar */}
          <div className="mt-2 h-1.5 rounded-full bg-muted/50 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500"
              initial={{ width: 0 }}
              animate={{ width: `${(xp / maxXP) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
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
              {/* Scenario Card */}
              <ScenarioCard
                title={decision.title}
                scenario={decision.scenario_text}
                conceptTags={decision.concept_tags}
                chapter={chapter}
                biasNudge={decision.bias_nudge}
              />

              {/* Decision Cards */}
              <div className="mt-6 space-y-4">
                <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                  <span className="text-2xl">🎯</span> What will you do?
                </h3>
                {decision.choices.map((choice, index) => (
                  <DecisionCard
                    key={choice.id}
                    choice={choice}
                    index={index}
                    isSelected={selectedChoice?.id === choice.id}
                    onSelect={() => handleChoiceSelect(choice)}
                  />
                ))}
              </div>

              {/* Confirm Button */}
              <motion.div
                className="mt-8 flex justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Button
                  size="lg"
                  onClick={handleConfirmChoice}
                  disabled={!selectedChoice}
                  className={cn(
                    'min-w-[250px] h-14 text-lg font-bold rounded-xl transition-all duration-300',
                    selectedChoice
                      ? 'bg-gradient-to-r from-primary via-purple-500 to-pink-500 hover:scale-105 shadow-lg shadow-primary/25'
                      : ''
                  )}
                >
                  {selectedChoice ? (
                    <>
                      Confirm Choice
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </>
                  ) : (
                    'Select an option above'
                  )}
                </Button>
              </motion.div>
            </motion.div>
          </div>

          {/* Game HUD Sidebar */}
          <div className="space-y-4">
            <GameHUD
              cash={cash}
              investments={investments}
              totalDebt={totalDebt}
              creditScore={credit_score}
              stress={stress}
              netWorth={net_worth}
              monthlyCashFlow={monthlyCashFlow}
              currentDecision={currentDecision}
              totalDecisions={decisions.length}
              level={level}
              xp={xp}
              maxXP={maxXP}
              educatorMode={educatorMode}
              onDecisionClick={handleDecisionClick}
            />
          </div>
        </div>
      </div>

      {/* Impact Modal */}
      <Dialog open={showImpactModal} onOpenChange={setShowImpactModal}>
        <DialogContent className="max-w-lg border-primary/20 bg-gradient-to-br from-card via-card to-primary/5">
          <DialogHeader>
            <DialogTitle className="text-2xl flex items-center gap-3">
              <span className="text-3xl">✨</span> Decision Impact
            </DialogTitle>
          </DialogHeader>
          {selectedChoice && (
            <div className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">{selectedChoice.explanation}</p>

              {/* XP Gained */}
              {impactResult && (
                <motion.div
                  className="flex items-center gap-3 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="text-2xl">⭐</div>
                  <div>
                    <div className="font-bold text-amber-400">+{impactResult.xpGained} XP</div>
                    {impactResult.leveledUp && (
                      <div className="text-sm text-amber-200">Level Up! You're now Level {impactResult.newLevel}!</div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Impact Chips */}
              <div className="flex flex-wrap gap-2">
                {selectedChoice.effects.cash !== undefined && selectedChoice.effects.cash !== 0 && (
                  <Badge variant={selectedChoice.effects.cash > 0 ? 'success' : 'destructive'} className="py-1.5 px-3">
                    {getImpactIcon(selectedChoice.effects.cash)}
                    <span className="ml-1">Cash: {selectedChoice.effects.cash > 0 ? '+' : ''}{formatCurrency(selectedChoice.effects.cash)}</span>
                  </Badge>
                )}
                {selectedChoice.effects.credit_score !== undefined && selectedChoice.effects.credit_score !== 0 && (
                  <Badge variant={selectedChoice.effects.credit_score > 0 ? 'success' : 'destructive'} className="py-1.5 px-3">
                    {getImpactIcon(selectedChoice.effects.credit_score)}
                    <span className="ml-1">Credit: {selectedChoice.effects.credit_score > 0 ? '+' : ''}{selectedChoice.effects.credit_score}</span>
                  </Badge>
                )}
                {selectedChoice.effects.stress !== undefined && selectedChoice.effects.stress !== 0 && (
                  <Badge variant={selectedChoice.effects.stress < 0 ? 'success' : 'destructive'} className="py-1.5 px-3">
                    {getImpactIcon(-selectedChoice.effects.stress)}
                    <span className="ml-1">Stress: {selectedChoice.effects.stress > 0 ? '+' : ''}{selectedChoice.effects.stress}</span>
                  </Badge>
                )}
              </div>

              {/* Hidden Cost Reveal */}
              {selectedChoice.hidden_cost && (
                <motion.div
                  className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/30"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5" />
                    <div>
                      <div className="font-bold text-orange-400 mb-1">Hidden Cost Revealed</div>
                      <p className="text-sm text-orange-200/80">{selectedChoice.hidden_cost}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button
              onClick={handleContinue}
              className="w-full h-12 text-lg font-bold bg-gradient-to-r from-primary to-purple-500 hover:scale-[1.02] transition-transform"
            >
              Continue
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Chapter Recap Modal */}
      <Dialog open={showChapterRecap} onOpenChange={setShowChapterRecap}>
        <DialogContent className="max-w-lg border-primary/20 bg-gradient-to-br from-card via-card to-green-500/5">
          <DialogHeader>
            <DialogTitle className="text-2xl flex items-center gap-3">
              <span className="text-4xl">🎉</span> Chapter {chapter - 1} Complete!
            </DialogTitle>
            <DialogDescription className="text-lg">
              {chapters[chapter - 2]?.title}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <motion.div
              className="p-4 rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
            >
              <h4 className="font-bold text-green-400 mb-3">Your Progress</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="p-3 rounded-lg bg-background/50">
                  <span className="text-muted-foreground block text-xs">Net Worth</span>
                  <span className={cn('text-xl font-bold', net_worth >= 0 ? 'text-green-400' : 'text-red-400')}>
                    {formatCurrency(net_worth)}
                  </span>
                </div>
                <div className="p-3 rounded-lg bg-background/50">
                  <span className="text-muted-foreground block text-xs">Credit Score</span>
                  <span className="text-xl font-bold text-blue-400">{Math.round(credit_score)}</span>
                </div>
                <div className="p-3 rounded-lg bg-background/50">
                  <span className="text-muted-foreground block text-xs">Level</span>
                  <span className="text-xl font-bold text-amber-400">{level}</span>
                </div>
                <div className="p-3 rounded-lg bg-background/50">
                  <span className="text-muted-foreground block text-xs">Stress</span>
                  <span className={cn(
                    'text-xl font-bold',
                    stress > 60 ? 'text-red-400' : stress > 30 ? 'text-yellow-400' : 'text-green-400'
                  )}>{Math.round(stress)}%</span>
                </div>
              </div>
            </motion.div>

            <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
              <h4 className="font-bold text-primary mb-2 flex items-center gap-2">
                <span className="text-xl">🚀</span> Up Next: Chapter {chapter}
              </h4>
              <p className="text-sm text-muted-foreground">{currentChapter?.description}</p>
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={() => setShowChapterRecap(false)}
              className="w-full h-12 text-lg font-bold bg-gradient-to-r from-green-500 to-emerald-500 hover:scale-[1.02] transition-transform"
            >
              Continue to Chapter {chapter}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Undo Warning Modal */}
      <Dialog open={showUndoWarning} onOpenChange={setShowUndoWarning}>
        <DialogContent className="max-w-md border-orange-500/30 bg-gradient-to-br from-card to-orange-500/5">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-orange-400">
              <AlertTriangle className="w-6 h-6" />
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
            <Button onClick={confirmUndo} variant="destructive">
              <Undo2 className="w-4 h-4 mr-2" />
              Undo Anyway
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
