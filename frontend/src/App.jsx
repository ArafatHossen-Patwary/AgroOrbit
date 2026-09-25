import { useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ToastViewport } from './components/ui/Toast'
import Home from './pages/Home'
import DesignSystem from './pages/DesignSystem'
import AppLayout from './layouts/AppLayout'
import {
  Compare,
  CropLibrary,
  DataSources,
  FarmerPriorities,
  FieldTimeMachine,
  MyField,
  NasaIntelligence,
  Overview,
  RotationDna,
  RotationLab,
  Settings,
  SoilProfile,
  WhatIf,
} from './pages/app'

export default function App() {
  const [toasts, setToasts] = useState([
    {
      id: 1,
      title: 'Demo Mode active',
      message: 'This walkthrough uses sample field and scenario data for presentation purposes only.',
      variant: 'info',
    },
  ])

  useEffect(() => {
    if (toasts.length === 0) return undefined
    const timer = window.setTimeout(() => {
      setToasts((current) => current.slice(1))
    }, 5000)
    return () => window.clearTimeout(timer)
  }, [toasts])

  return (
    <>
      <ToastViewport
        toasts={toasts}
        onDismiss={(id) => setToasts((current) => current.filter((toast) => toast.id !== id))}
      />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/design-system" element={<DesignSystem />} />

          <Route path="/app" element={<AppLayout />}>
            <Route index element={<Navigate to="overview" replace />} />
            <Route path="overview" element={<Overview />} />
            <Route path="nasa-intelligence" element={<NasaIntelligence />} />
            <Route path="my-field" element={<MyField />} />
            <Route path="soil-profile" element={<SoilProfile />} />
            <Route path="crop-library" element={<CropLibrary />} />
            <Route path="farmer-priorities" element={<FarmerPriorities />} />
            <Route path="rotation-lab" element={<RotationLab />} />
            <Route path="what-if" element={<WhatIf />} />
            <Route path="rotation-dna" element={<RotationDna />} />
            <Route path="field-time-machine" element={<FieldTimeMachine />} />
            <Route path="compare" element={<Compare />} />
            <Route path="data-sources" element={<DataSources />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
