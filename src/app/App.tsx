import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Toaster } from '@/components/ui/toaster'
import { Landing } from '@/pages/Landing'
import { Onboarding } from '@/pages/Onboarding'
import { Play } from '@/pages/Play'
import { Results } from '@/pages/Results'
import { Educator } from '@/pages/Educator'

export function App() {
  return (
    <TooltipProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-background">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/play" element={<Play />} />
            <Route path="/results" element={<Results />} />
            <Route path="/educator" element={<Educator />} />
          </Routes>
        </div>
        <Toaster />
      </BrowserRouter>
    </TooltipProvider>
  )
}
