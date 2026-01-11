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
} from 'lucide-react'
import { toPng } from 'html-to-image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useGameStore, selectTotalDebt, selectUnlockedBadges } from '@/features/sim/store'
import { cn, formatCurrencyFull, formatCurrency } from '@/lib/utils'
import { toast } from '@/hooks/use-toast'

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

export function Results() {
  const navigate = useNavigate()
  const shareCardRef = useRef<HTMLDivElement>(null)
  const [isGeneratingImage, setIsGeneratingImage] = useState(false)

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
  } = useGameStore()

  const totalDebt = useGameStore(selectTotalDebt)
  const unlockedBadges = useGameStore(selectUnlockedBadges)

  // Redirect if not completed
  useEffect(() => {
    if (!completed && history.length === 0) {
      navigate('/')
    }
  }, [completed, history.length, navigate])

  const takeaways = generateTakeaways()

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
    } catch (error) {
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
    if (score >= 750) return { grade: 'Excellent', color: 'text-green-500' }
    if (score >= 700) return { grade: 'Good', color: 'text-blue-500' }
    if (score >= 650) return { grade: 'Fair', color: 'text-yellow-500' }
    return { grade: 'Needs Work', color: 'text-red-500' }
  }

  const scoreGrade = getScoreGrade(credit_score)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <motion.div {...fadeIn} className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Your Financial Life Outcome
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            After 30 key decisions across 15 simulated years, here's where you ended up.
          </p>
        </motion.div>

        {/* Key Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12"
        >
          <Card className="card-hover">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted-foreground">Net Worth</span>
              </div>
              <div className={cn('text-2xl font-bold', net_worth >= 0 ? 'text-green-500' : 'text-red-500')}>
                {formatCurrency(net_worth)}
              </div>
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-2">
                <CreditCard className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted-foreground">Total Debt</span>
              </div>
              <div className="text-2xl font-bold text-red-500">{formatCurrency(totalDebt)}</div>
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-2">
                <Trophy className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted-foreground">Credit Score</span>
              </div>
              <div className={cn('text-2xl font-bold', scoreGrade.color)}>
                {Math.round(credit_score)}
              </div>
              <div className={cn('text-xs', scoreGrade.color)}>{scoreGrade.grade}</div>
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-2">
                <Heart className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted-foreground">Stress</span>
              </div>
              <div
                className={cn(
                  'text-2xl font-bold',
                  stress > 60 ? 'text-red-500' : stress > 30 ? 'text-yellow-500' : 'text-green-500'
                )}
              >
                {Math.round(stress)}%
              </div>
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted-foreground">Purchasing Power</span>
              </div>
              <div className="text-2xl font-bold">{Math.round(real_purchasing_power)}</div>
              <div className="text-xs text-muted-foreground">Index (started at 100)</div>
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
              <Card>
                <CardHeader>
                  <CardTitle>Net Worth Over Time</CardTitle>
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
              <Card>
                <CardHeader>
                  <CardTitle>Debt vs Investments</CardTitle>
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
              <Card>
                <CardHeader>
                  <CardTitle>Stress Levels</CardTitle>
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

        {/* Badges Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Badges Earned</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {badges.map((badge) => (
              <Card
                key={badge.id}
                className={cn(
                  'w-40 text-center transition-all',
                  badge.unlocked ? 'card-hover' : 'opacity-50'
                )}
              >
                <CardContent className="pt-6">
                  <div className="text-4xl mb-2">{badge.unlocked ? badge.icon : <Lock className="w-8 h-8 mx-auto text-muted-foreground" />}</div>
                  <div className="font-medium text-sm">{badge.name}</div>
                  {badge.unlocked && (
                    <div className="text-xs text-muted-foreground mt-1">
                      Unlocked at decision {badge.unlockedAt! + 1}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Takeaways Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">What You Learned</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {takeaways.map((takeaway, index) => (
              <motion.div
                key={takeaway.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <Card className="h-full">
                  <CardHeader className="pb-2">
                    <Badge variant="outline" className="w-fit mb-2">
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
          <h2 className="text-2xl font-bold mb-6 text-center">Share Your Results</h2>
          <div className="flex justify-center">
            <div
              ref={shareCardRef}
              className="w-full max-w-md p-6 rounded-xl bg-gradient-to-br from-card via-card to-primary/10 border"
            >
              <div className="text-center mb-6">
                <div className="text-3xl font-bold gradient-text mb-2">Decisions</div>
                <div className="text-sm text-muted-foreground">Financial Life Simulator</div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className={cn('text-2xl font-bold', net_worth >= 0 ? 'text-green-500' : 'text-red-500')}>
                    {formatCurrency(net_worth)}
                  </div>
                  <div className="text-xs text-muted-foreground">Net Worth</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className={cn('text-2xl font-bold', scoreGrade.color)}>
                    {Math.round(credit_score)}
                  </div>
                  <div className="text-xs text-muted-foreground">Credit Score</div>
                </div>
              </div>

              {unlockedBadges.length > 0 && (
                <div className="flex justify-center gap-2 mb-6">
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
            <Button onClick={handleDownloadShareCard} disabled={isGeneratingImage}>
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
            <Button size="lg" onClick={handleTryAgain}>
              <RefreshCw className="w-5 h-5 mr-2" />
              Try Another Profile
            </Button>
            <Button size="lg" variant="outline" onClick={handleEducatorMode}>
              <GraduationCap className="w-5 h-5 mr-2" />
              Educator Mode
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
