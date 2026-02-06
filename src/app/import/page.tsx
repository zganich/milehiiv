'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  MapPin, 
  Camera, 
  FileSpreadsheet, 
  PenLine,
  Upload,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Clock,
  DollarSign,
  Car
} from 'lucide-react'

type ImportMethod = 'timeline' | 'screenshot' | 'csv' | 'quick' | null

interface ImportResult {
  success: boolean
  message: string
  data?: any
}

export default function ImportPage() {
  const [selectedMethod, setSelectedMethod] = useState<ImportMethod>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [result, setResult] = useState<ImportResult | null>(null)
  const [quickLogMiles, setQuickLogMiles] = useState('')
  const [quickLogDate, setQuickLogDate] = useState(new Date().toISOString().split('T')[0])

  const importMethods = [
    {
      id: 'timeline' as const,
      icon: MapPin,
      title: 'Google Timeline',
      description: 'Import ALL your driving automatically',
      detail: 'Best for calculating deadhead miles',
      badge: '⭐ Recommended',
      color: 'bg-blue-500'
    },
    {
      id: 'screenshot' as const,
      icon: Camera,
      title: 'Screenshot OCR',
      description: 'Take a photo of your earnings',
      detail: 'Works with any gig app',
      badge: 'AI Powered',
      color: 'bg-purple-500'
    },
    {
      id: 'csv' as const,
      icon: FileSpreadsheet,
      title: 'Import CSV',
      description: 'Upload Uber or Lyft exports',
      detail: 'Direct from driver dashboard',
      badge: null,
      color: 'bg-green-500'
    },
    {
      id: 'quick' as const,
      icon: PenLine,
      title: 'Quick Log',
      description: '"I drove 45 miles today"',
      detail: 'Fast end-of-day entry',
      badge: null,
      color: 'bg-orange-500'
    }
  ]

  const handleFileUpload = async (file: File, endpoint: string) => {
    setIsUploading(true)
    setResult(null)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const token = localStorage.getItem('auth_token')
      const response = await fetch(`/api/import/${endpoint}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      })

      const data = await response.json()

      if (data.success) {
        setResult({
          success: true,
          message: data.message || 'Import successful!',
          data: data.data
        })
      } else {
        setResult({
          success: false,
          message: data.error || 'Import failed'
        })
      }
    } catch (error) {
      setResult({
        success: false,
        message: 'Upload failed. Please try again.'
      })
    } finally {
      setIsUploading(false)
    }
  }

  const handleQuickLog = async () => {
    if (!quickLogMiles) return

    setIsUploading(true)
    setResult(null)

    try {
      const token = localStorage.getItem('auth_token')
      const response = await fetch('/api/trips/quick-log', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          miles: parseFloat(quickLogMiles),
          date: quickLogDate,
          business: true
        })
      })

      const data = await response.json()

      if (data.success) {
        setResult({
          success: true,
          message: data.message || `Logged ${quickLogMiles} miles!`,
          data: data.data
        })
        setQuickLogMiles('')
      } else {
        setResult({
          success: false,
          message: data.error || 'Failed to log miles'
        })
      }
    } catch (error) {
      setResult({
        success: false,
        message: 'Failed to log miles. Please try again.'
      })
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      {/* Header */}
      <header className="border-b border-white/10 backdrop-blur-lg bg-white/5">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/dashboard" className="text-xl font-bold">
            MileHiiv
          </Link>
          <Link href="/dashboard" className="text-sm text-white/60 hover:text-white">
            ← Back to Dashboard
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-3">Add Your Miles</h1>
          <p className="text-white/60">
            Choose how you want to import your mileage data
          </p>
        </div>

        {/* Import Method Selection */}
        {!selectedMethod && (
          <div className="grid md:grid-cols-2 gap-4">
            {importMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => setSelectedMethod(method.id)}
                className="group relative p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all text-left"
              >
                {method.badge && (
                  <span className="absolute top-4 right-4 text-xs px-2 py-1 rounded-full bg-white/10">
                    {method.badge}
                  </span>
                )}
                <div className={`w-12 h-12 rounded-xl ${method.color} flex items-center justify-center mb-4`}>
                  <method.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-1">{method.title}</h3>
                <p className="text-white/60 text-sm mb-2">{method.description}</p>
                <p className="text-white/40 text-xs">{method.detail}</p>
                <ArrowRight className="absolute bottom-6 right-6 w-5 h-5 text-white/20 group-hover:text-white/60 transition-colors" />
              </button>
            ))}
          </div>
        )}

        {/* Google Timeline Import */}
        {selectedMethod === 'timeline' && (
          <div className="bg-white/5 rounded-2xl border border-white/10 p-8">
            <button 
              onClick={() => setSelectedMethod(null)}
              className="text-sm text-white/60 hover:text-white mb-6"
            >
              ← Back to options
            </button>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Import Google Timeline</h2>
                <p className="text-white/60 text-sm">Get ALL your driving data automatically</p>
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 mb-6">
              <h4 className="font-medium mb-2">Why this matters for taxes:</h4>
              <p className="text-sm text-white/70">
                Google Timeline captures ALL your driving - not just gig trips. 
                This reveals your <strong>deadhead miles</strong> (driving to pickups, between deliveries, home).
                Deadhead can be 30-50% of your total driving - and it's all deductible!
              </p>
            </div>

            <div className="mb-6">
              <h4 className="font-medium mb-3">How to export your Timeline:</h4>
              <ol className="space-y-2 text-sm text-white/70">
                <li>1. Go to <a href="https://takeout.google.com" target="_blank" rel="noopener" className="text-blue-400 hover:underline">takeout.google.com</a></li>
                <li>2. Click "Deselect all"</li>
                <li>3. Scroll down and select only "Location History"</li>
                <li>4. Choose JSON format</li>
                <li>5. Click "Create export" and download</li>
                <li>6. Upload the JSON file here</li>
              </ol>
            </div>

            <label className="block">
              <div className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center hover:border-white/40 cursor-pointer transition-colors">
                <Upload className="w-8 h-8 mx-auto mb-3 text-white/40" />
                <p className="font-medium mb-1">Drop your Timeline JSON here</p>
                <p className="text-sm text-white/40">or click to browse</p>
                <input
                  type="file"
                  accept=".json"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) handleFileUpload(file, 'timeline')
                  }}
                  disabled={isUploading}
                />
              </div>
            </label>
          </div>
        )}

        {/* Screenshot OCR */}
        {selectedMethod === 'screenshot' && (
          <div className="bg-white/5 rounded-2xl border border-white/10 p-8">
            <button 
              onClick={() => setSelectedMethod(null)}
              className="text-sm text-white/60 hover:text-white mb-6"
            >
              ← Back to options
            </button>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-purple-500 flex items-center justify-center">
                <Camera className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Screenshot OCR</h2>
                <p className="text-white/60 text-sm">AI extracts data from any gig app screenshot</p>
              </div>
            </div>

            <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-4 mb-6">
              <p className="text-sm text-white/70">
                Take a screenshot of your Uber, Lyft, DoorDash, or any gig app earnings screen.
                Our AI will extract the mileage and trip data automatically.
              </p>
            </div>

            <label className="block">
              <div className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center hover:border-white/40 cursor-pointer transition-colors">
                <Camera className="w-8 h-8 mx-auto mb-3 text-white/40" />
                <p className="font-medium mb-1">Upload screenshot</p>
                <p className="text-sm text-white/40">PNG, JPG, or WebP</p>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) handleFileUpload(file, 'screenshot')
                  }}
                  disabled={isUploading}
                />
              </div>
            </label>
          </div>
        )}

        {/* CSV Import */}
        {selectedMethod === 'csv' && (
          <div className="bg-white/5 rounded-2xl border border-white/10 p-8">
            <button 
              onClick={() => setSelectedMethod(null)}
              className="text-sm text-white/60 hover:text-white mb-6"
            >
              ← Back to options
            </button>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-green-500 flex items-center justify-center">
                <FileSpreadsheet className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Import CSV</h2>
                <p className="text-white/60 text-sm">Upload exports from Uber or Lyft</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-white/5 rounded-xl p-4">
                <h4 className="font-medium mb-2">Uber</h4>
                <p className="text-xs text-white/60">
                  Driver Dashboard → Tax Information → Download CSV
                </p>
              </div>
              <div className="bg-white/5 rounded-xl p-4">
                <h4 className="font-medium mb-2">Lyft</h4>
                <p className="text-xs text-white/60">
                  Driver Dashboard → Ride History → Export
                </p>
              </div>
            </div>

            <label className="block">
              <div className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center hover:border-white/40 cursor-pointer transition-colors">
                <FileSpreadsheet className="w-8 h-8 mx-auto mb-3 text-white/40" />
                <p className="font-medium mb-1">Upload CSV file</p>
                <p className="text-sm text-white/40">We'll auto-detect Uber or Lyft format</p>
                <input
                  type="file"
                  accept=".csv"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) handleFileUpload(file, 'csv')
                  }}
                  disabled={isUploading}
                />
              </div>
            </label>
          </div>
        )}

        {/* Quick Log */}
        {selectedMethod === 'quick' && (
          <div className="bg-white/5 rounded-2xl border border-white/10 p-8">
            <button 
              onClick={() => setSelectedMethod(null)}
              className="text-sm text-white/60 hover:text-white mb-6"
            >
              ← Back to options
            </button>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-orange-500 flex items-center justify-center">
                <PenLine className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Quick Log</h2>
                <p className="text-white/60 text-sm">Fast daily mileage entry</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-white/60 mb-2">Miles driven</label>
                <input
                  type="number"
                  value={quickLogMiles}
                  onChange={(e) => setQuickLogMiles(e.target.value)}
                  placeholder="45"
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 focus:border-white/40 focus:outline-none text-xl"
                />
              </div>
              
              <div>
                <label className="block text-sm text-white/60 mb-2">Date</label>
                <input
                  type="date"
                  value={quickLogDate}
                  onChange={(e) => setQuickLogDate(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 focus:border-white/40 focus:outline-none"
                />
              </div>

              <button
                onClick={handleQuickLog}
                disabled={!quickLogMiles || isUploading}
                className="w-full py-3 rounded-xl bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors"
              >
                {isUploading ? 'Logging...' : 'Log Miles'}
              </button>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isUploading && (
          <div className="mt-6 text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/10">
              <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              <span>Processing...</span>
            </div>
          </div>
        )}

        {/* Result */}
        {result && (
          <div className={`mt-6 p-4 rounded-xl flex items-start gap-3 ${
            result.success 
              ? 'bg-green-500/10 border border-green-500/20' 
              : 'bg-red-500/10 border border-red-500/20'
          }`}>
            {result.success ? (
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-400 mt-0.5" />
            )}
            <div>
              <p className="font-medium">{result.message}</p>
              {result.data && (
                <div className="mt-2 text-sm text-white/60">
                  {result.data.totalMiles && (
                    <p>Total miles: {result.data.totalMiles}</p>
                  )}
                  {result.data.tripsImported && (
                    <p>Trips imported: {result.data.tripsImported}</p>
                  )}
                  {result.data.totalDrivingMiles && (
                    <p>Driving miles: {result.data.totalDrivingMiles}</p>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tax Tip */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-white/10">
          <div className="flex items-start gap-4">
            <DollarSign className="w-8 h-8 text-green-400" />
            <div>
              <h3 className="font-bold mb-2">Maximize Your Deductions</h3>
              <p className="text-sm text-white/70">
                Import your <strong>Google Timeline</strong> AND your <strong>gig app data</strong>.
                MileHiiv will automatically calculate your deadhead miles - 
                the driving that gig companies don't report but you CAN deduct.
              </p>
              <p className="text-sm text-white/50 mt-2">
                At $0.67/mile (2024 IRS rate), every unreported mile is money left on the table.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
