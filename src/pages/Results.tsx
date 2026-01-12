import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import {
  Download,
  Trophy,
  TrendingUp,
  CreditCard,
  Heart,
  DollarSign,
  RefreshCw,
  GraduationCap,
  Lock,
  Star,
  Zap,
} from 'lucide-react'
import { toPng } from 'html-to-image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useGameStore, selectTotalDebt, selectUnlockedBadges } from '@/features/sim/store'
import { cn, formatCurrencyFull, formatCurrency } from '@/lib/utils'
import { toast } from '@/hooks/use-toast'
import { Character, getMoodFromState, Confetti, ProgressRing } from '@/components/game'

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

export function Results() {
  const navigate = useNavigate()
  const shareCardRef = useRef<HTMLDivElement>(null)
  const [isGeneratingImage, setIsGeneratingImage] = useState(false)
  const [showConfetti, setShowConfetti] = useState(true)

  const {
    net_worth,
    credit_score,
    stress,
    real_purchasing_power,
    history,
    badges,
    resetGame,
    generateTakeaways,
    completed,
    level,
    xp,
  } = useGameStore()

  const totalDebt = useGameStore(selectTotalDebt)
  const unlockedBadges = useGameStore(selectUnlockedBadges)

  // Redirect if not completed
  useEffect(() => {
    if (!completed && history.length === 0) {
      navigate('/')
    }
  }, [completed, history.length, navigate])

  // Hide confetti after a while
  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 5000)
    return () => clearTimeout(timer)
  }, [])

  const takeaways = generateTakeaways()
  const mood = getMoodFromState(stress, net_worth)

  // Prepare chart data
  const netWorthData = history.map((snapshot, index) => ({
    decision: index + 1,
    netWorth: snapshot.net_worth,
    name: `Decision ${index + 1}`,
  }))

  const debtVsInvestmentsData = history.map((snapshot, index) => ({
    decision: index + 1,
    debt:
      snapshot.debt.creditCard +
      snapshot.debt.studentLoan +
      snapshot.debt.autoLoan +
      snapshot.debt.mortgage,
    investments: snapshot.investments,
    name: `Decision ${index + 1}`,
  }))

  const stressData = history.map((snapshot, index) => ({
    decision: index + 1,
    stress: snapshot.stress,
    name: `Decision ${index + 1}`,
  }))

  const handleTryAgain = () => {
    resetGame()
    navigate('/onboarding')
  }

  const handleEducatorMode = () => {
    navigate('/educator')
  }

  const handleDownloadShareCard = async () => {
    if (!shareCardRef.current) return

    setIsGeneratingImage(true)
    try {
      const dataUrl = await toPng(shareCardRef.current, {
        quality: 0.95,
        backgroundColor: '#0a0a0f',
      })

      const link = document.createElement('a')
      link.download = 'decisions-results.png'
      link.href = dataUrl
      link.click()

      toast({
        title: 'Share card downloaded!',
        description: 'Share your financial journey on social media.',
      })
    } catch {
      toast({
        title: 'Failed to generate image',
        description: 'Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsGeneratingImage(false)
    }
  }

  const getScoreGrade = (score: number) => {
    if (score >= 750) return { grade: 'Excellent', color: 'text-green-400', emoji: '🌟' }
    if (score >= 700) return { grade: 'Good', color: 'text-blue-400', emoji: '⭐' }
    if (score >= 650) return { grade: 'Fair', color: 'text-yellow-400', emoji: '✨' }
    return { grade: 'Needs Work', color: 'text-red-400', emoji: '💪' }
  }

  const getOverallGrade = () => {
    let score = 0
    if (net_worth > 50000) score += 3
    else if (net_worth > 10000) score += 2
    else if (net_worth > 0) score += 1

    if (credit_score >= 750) score += 3
    else if (credit_score >= 700) score += 2
    else if (credit_score >= 650) score += 1

    if (stress < 30) score += 2
    else if (stress < 50) score += 1

    if (unlockedBadges.length >= 4) score += 2
    else if (unlockedBadges.length >= 2) score += 1

    if (score >= 9) return { grade: 'S', title: 'Financial Genius!', color: 'from-yellow-400 to-amber-500' }
    if (score >= 7) return { grade: 'A', title: 'Excellent Work!', color: 'from-green-400 to-emerald-500' }
    if (score >= 5) return { grade: 'B', title: 'Great Progress!', color: 'from-blue-400 to-cyan-500' }
    if (score >= 3) return { grade: 'C', title: 'Keep Learning!', color: 'from-purple-400 to-pink-500' }
    return { grade: 'D', title: 'Room to Grow!', color: 'from-orange-400 to-red-500' }
  }

  const scoreGrade = getScoreGrade(credit_score)
  const overallGrade = getOverallGrade()
  const completionPercentage = (history.length / 30) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Confetti celebration */}
      <Confetti active={showConfetti} duration={5000} />

      <div className="container mx-auto px-4 py-12">
        {/* Hero Section with Grade */}
        <motion.div {...fadeIn} className="text-center mb-12 relative">
          {/* Floating emojis */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {['🎉', '🏆', '⭐', '💰', '📈'].map((emoji, i) => (
              <motion.div
                key={i}
                className="absolute text-4xl"
                style={{
                  left: `${10 + i * 20}%`,
                  top: `${Math.random() * 50}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              >
                {emoji}
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', duration: 0.8 }}
            className="mb-6"
          >
            <Character mood={mood} size="lg" animate />
          </motion.div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring' }}
            className={`inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-gradient-to-br ${overallGrade.color} text-white text-5xl font-black shadow-2xl mb-4`}
          >
            {overallGrade.grade}
          </motion.div>

          <h1 className="text-4xl md:text-5xl font-black mb-2">
            {overallGrade.title}
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            After 30 key decisions across 15 simulated years, here's your financial journey summary.
          </p>

          {/* Level & XP Display */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex justify-center gap-6 mt-6"
          >
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30">
              <Star className="w-5 h-5 text-amber-400" />
              <span className="font-bold text-amber-400">Level {level}</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/30">
              <Zap className="w-5 h-5 text-purple-400" />
              <span className="font-bold text-purple-400">{xp} XP Earned</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/30">
              <Trophy className="w-5 h-5 text-green-400" />
              <span className="font-bold text-green-400">{unlockedBadges.length} Badges</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Key Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12"
        >
          <Card className="border-2 border-primary/10 bg-gradient-to-br from-card to-green-500/5 hover:border-green-500/30 transition-colors">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-green-400" />
                </div>
                <span className="text-sm text-muted-foreground">Net Worth</span>
              </div>
              <div className={cn('text-2xl font-black', net_worth >= 0 ? 'text-green-400' : 'text-red-400')}>
                {formatCurrency(net_worth)}
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-primary/10 bg-gradient-to-br from-card to-red-500/5 hover:border-red-500/30 transition-colors">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center">
                  <CreditCard className="w-4 h-4 text-red-400" />
                </div>
                <span className="text-sm text-muted-foreground">Total Debt</span>
              </div>
              <div className="text-2xl font-black text-red-400">{formatCurrency(totalDebt)}</div>
            </CardContent>
          </Card>

          <Card className="border-2 border-primary/10 bg-gradient-to-br from-card to-blue-500/5 hover:border-blue-500/30 transition-colors">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <Trophy className="w-4 h-4 text-blue-400" />
                </div>
                <span className="text-sm text-muted-foreground">Credit Score</span>
              </div>
              <div className={cn('text-2xl font-black', scoreGrade.color)}>
                {Math.round(credit_score)}
              </div>
              <div className="flex items-center gap-1 text-xs">
                <span>{scoreGrade.emoji}</span>
                <span className={scoreGrade.color}>{scoreGrade.grade}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-primary/10 bg-gradient-to-br from-card to-purple-500/5 hover:border-purple-500/30 transition-colors">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                  <Heart className="w-4 h-4 text-purple-400" />
                </div>
                <span className="text-sm text-muted-foreground">Stress</span>
              </div>
              <div
                className={cn(
                  'text-2xl font-black',
                  stress > 60 ? 'text-red-400' : stress > 30 ? 'text-yellow-400' : 'text-green-400'
                )}
              >
                {Math.round(stress)}%
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-primary/10 bg-gradient-to-br from-card to-amber-500/5 hover:border-amber-500/30 transition-colors">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
                  <DollarSign className="w-4 h-4 text-amber-400" />
                </div>
                <span className="text-sm text-muted-foreground">Purchasing Power</span>
              </div>
              <div className="text-2xl font-black text-amber-400">{Math.round(real_purchasing_power)}</div>
              <div className="text-xs text-muted-foreground">Index (started at 100)</div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Progress Ring & Badges Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid md:grid-cols-2 gap-8 mb-12"
        >
          {/* Progress Ring */}
          <Card className="border-2 border-primary/20 bg-gradient-to-br from-card to-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">📊</span> Journey Completion
              </CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-center py-8">
              <ProgressRing progress={completionPercentage} size={180} strokeWidth={12} />
            </CardContent>
          </Card>

          {/* Badges */}
          <Card className="border-2 border-amber-500/20 bg-gradient-to-br from-card to-amber-500/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">🏆</span> Badges Earned
              </CardTitle>
              <CardDescription>{unlockedBadges.length} of {badges.length} unlocked</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-5 gap-3">
                {badges.map((badge, index) => (
                  <motion.div
                    key={badge.id}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1, type: 'spring' }}
                    className={cn(
                      'relative flex flex-col items-center justify-center p-3 rounded-xl transition-all',
                      badge.unlocked
                        ? 'bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30'
                        : 'bg-muted/30 opacity-50'
                    )}
                  >
                    <div className="text-3xl">
                      {badge.unlocked ? badge.icon : <Lock className="w-6 h-6 text-muted-foreground" />}
                    </div>
                    <div className="text-[10px] text-center mt-1 font-medium truncate w-full">
                      {badge.name}
                    </div>
                    {badge.unlocked && (
                      <motion.div
                        className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-green-500 flex items-center justify-center"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.7 + index * 0.1, type: 'spring' }}
                      >
                        <span className="text-[8px]">✓</span>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Charts Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <Tabs defaultValue="networth" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
              <TabsTrigger value="networth">Net Worth</TabsTrigger>
              <TabsTrigger value="debtinvest">Debt vs Invest</TabsTrigger>
              <TabsTrigger value="stress">Stress</TabsTrigger>
            </TabsList>

            <TabsContent value="networth">
              <Card className="border-2 border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-xl">📈</span> Net Worth Over Time
                  </CardTitle>
                  <CardDescription>How your wealth changed with each decision</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={netWorthData}>
                        <defs>
                          <linearGradient id="netWorthGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis
                          dataKey="decision"
                          stroke="hsl(var(--muted-foreground))"
                          tick={{ fill: 'hsl(var(--muted-foreground))' }}
                        />
                        <YAxis
                          stroke="hsl(var(--muted-foreground))"
                          tick={{ fill: 'hsl(var(--muted-foreground))' }}
                          tickFormatter={(value) => formatCurrency(value)}
                        />
                        <RechartsTooltip
                          contentStyle={{
                            backgroundColor: 'hsl(var(--card))',
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px',
                          }}
                          formatter={(value: number) => [formatCurrencyFull(value), 'Net Worth']}
                        />
                        <Area
                          type="monotone"
                          dataKey="netWorth"
                          stroke="hsl(var(--primary))"
                          fill="url(#netWorthGradient)"
                          strokeWidth={2}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="debtinvest">
              <Card className="border-2 border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-xl">⚖️</span> Debt vs Investments
                  </CardTitle>
                  <CardDescription>
                    The balance between what you owe and what you've grown
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={debtVsInvestmentsData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis
                          dataKey="decision"
                          stroke="hsl(var(--muted-foreground))"
                          tick={{ fill: 'hsl(var(--muted-foreground))' }}
                        />
                        <YAxis
                          stroke="hsl(var(--muted-foreground))"
                          tick={{ fill: 'hsl(var(--muted-foreground))' }}
                          tickFormatter={(value) => formatCurrency(value)}
                        />
                        <RechartsTooltip
                          contentStyle={{
                            backgroundColor: 'hsl(var(--card))',
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px',
                          }}
                          formatter={(value: number, name: string) => [
                            formatCurrencyFull(value),
                            name === 'debt' ? 'Total Debt' : 'Investments',
                          ]}
                        />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="debt"
                          stroke="#ef4444"
                          strokeWidth={2}
                          dot={false}
                          name="Debt"
                        />
                        <Line
                          type="monotone"
                          dataKey="investments"
                          stroke="#22c55e"
                          strokeWidth={2}
                          dot={false}
                          name="Investments"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="stress">
              <Card className="border-2 border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-xl">💆</span> Stress Levels
                  </CardTitle>
                  <CardDescription>Your financial stress throughout the journey</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={stressData}>
                        <defs>
                          <linearGradient id="stressGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis
                          dataKey="decision"
                          stroke="hsl(var(--muted-foreground))"
                          tick={{ fill: 'hsl(var(--muted-foreground))' }}
                        />
                        <YAxis
                          stroke="hsl(var(--muted-foreground))"
                          tick={{ fill: 'hsl(var(--muted-foreground))' }}
                          domain={[0, 100]}
                        />
                        <RechartsTooltip
                          contentStyle={{
                            backgroundColor: 'hsl(var(--card))',
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px',
                          }}
                          formatter={(value: number) => [`${value}%`, 'Stress Level']}
                        />
                        <Area
                          type="monotone"
                          dataKey="stress"
                          stroke="#ef4444"
                          fill="url(#stressGradient)"
                          strokeWidth={2}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Takeaways Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-black mb-6 text-center flex items-center justify-center gap-2">
            <span className="text-2xl">💡</span> What You Learned
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {takeaways.map((takeaway, index) => (
              <motion.div
                key={takeaway.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <Card className="h-full border-primary/10 hover:border-primary/30 transition-colors">
                  <CardHeader className="pb-2">
                    <Badge variant="outline" className="w-fit mb-2 bg-primary/5">
                      {takeaway.conceptTag}
                    </Badge>
                    <CardTitle className="text-lg">{takeaway.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{takeaway.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Share Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-black mb-6 text-center flex items-center justify-center gap-2">
            <span className="text-2xl">📤</span> Share Your Results
          </h2>
          <div className="flex justify-center">
            <div
              ref={shareCardRef}
              className="w-full max-w-md p-8 rounded-2xl bg-gradient-to-br from-card via-card to-primary/10 border-2 border-primary/20"
            >
              <div className="text-center mb-6">
                <div className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-pink-500 mb-2">
                  Decisions
                </div>
                <div className="text-sm text-muted-foreground">Financial Life Simulator</div>
              </div>

              {/* Grade display */}
              <div className="flex justify-center mb-6">
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${overallGrade.color} flex items-center justify-center text-white text-4xl font-black shadow-lg`}>
                  {overallGrade.grade}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-4 bg-muted/50 rounded-xl">
                  <div className={cn('text-2xl font-black', net_worth >= 0 ? 'text-green-400' : 'text-red-400')}>
                    {formatCurrency(net_worth)}
                  </div>
                  <div className="text-xs text-muted-foreground">Net Worth</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-xl">
                  <div className={cn('text-2xl font-black', scoreGrade.color)}>
                    {Math.round(credit_score)}
                  </div>
                  <div className="text-xs text-muted-foreground">Credit Score</div>
                </div>
              </div>

              <div className="flex justify-center gap-3 mb-6">
                <div className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm font-bold">
                  Level {level}
                </div>
                <div className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-sm font-bold">
                  {unlockedBadges.length} Badges
                </div>
              </div>

              {unlockedBadges.length > 0 && (
                <div className="flex justify-center gap-2 mb-4">
                  {unlockedBadges.slice(0, 5).map((badge) => (
                    <div key={badge.id} className="text-2xl" title={badge.name}>
                      {badge.icon}
                    </div>
                  ))}
                </div>
              )}

              {takeaways[0] && (
                <div className="text-center text-sm text-muted-foreground italic">
                  "{takeaways[0].title}"
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-center mt-4">
            <Button
              onClick={handleDownloadShareCard}
              disabled={isGeneratingImage}
              className="bg-gradient-to-r from-primary to-purple-500 hover:scale-105 transition-transform"
            >
              <Download className="w-4 h-4 mr-2" />
              {isGeneratingImage ? 'Generating...' : 'Download Share Card'}
            </Button>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-center"
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={handleTryAgain}
              className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 hover:scale-105 transition-transform font-bold"
            >
              <RefreshCw className="w-5 h-5 mr-2" />
              Try Another Profile
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={handleEducatorMode}
              className="border-primary/30 hover:bg-primary/10"
            >
              <GraduationCap className="w-5 h-5 mr-2" />
              Educator Mode
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
