import React, { useState } from 'react'
import FileUpload from './components/FileUpload'
import PromptInput from './components/PromptInput'
import PreviewArea from './components/PreviewArea'
import AnimationControls from './components/AnimationControls'
import StyleSelection from './components/StyleSelection'
import ExportOptions from './components/ExportOptions'
import ProgressIndicator from './components/ProgressIndicator'
import SettingsPanel from './components/SettingsPanel'
import AvatarGallery from './components/AvatarGallery'
import { avatarService, storageService } from './lib/supabase'

function App() {
  // File uploads
  const [referenceImage, setReferenceImage] = useState(null)
  const [audioFile, setAudioFile] = useState(null)
  
  // Avatar configuration
  const [prompt, setPrompt] = useState('')
  const [selectedStyle, setSelectedStyle] = useState('podcast_host')
  const [animationSettings, setAnimationSettings] = useState({
    facialExpression: 50,
    handGestures: 30,
    bodyMovement: 40,
    headMovement: 35,
    eyeContact: 80,
    blinkRate: 25,
    emotionStyle: 'neutral',
    movementStyle: 'natural',
    background: 'studio'
  })
  
  // Advanced settings
  const [advancedSettings, setAdvancedSettings] = useState({
    lipSyncAccuracy: 85,
    animationNaturalness: 75,
    responseSpeed: 60,
    breathingIntensity: 30,
    microExpressions: 50,
    gestureDelay: 20,
    eyeTrackingMode: 'natural',
    voiceEmotion: 'auto',
    postureStability: 70,
    backgroundStability: 90,
    gpuAcceleration: true,
    realtimePreview: false,
    highQualityMode: true
  })

  // Generation state
  const [isGenerating, setIsGenerating] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentStage, setCurrentStage] = useState('')
  const [generatedVideo, setGeneratedVideo] = useState(null)
  const [isExporting, setIsExporting] = useState(false)
  const [error, setError] = useState(null)

  // UI state
  const [activeTab, setActiveTab] = useState('create')

  const simulateGeneration = async () => {
    setIsGenerating(true)
    setProgress(0)
    setError(null)
    
    const stages = ['upload', 'analysis', 'generation', 'synthesis', 'finalization']
    
    try {
      for (let i = 0; i < stages.length; i++) {
        setCurrentStage(stages[i])
        
        // Simulate stage progress
        for (let j = 0; j <= 100; j += 5) {
          await new Promise(resolve => setTimeout(resolve, 50))
          setProgress((i * 20) + (j * 0.2))
        }
      }
      
      // Simulate successful generation
      setGeneratedVideo('/demo-video.mp4') // This would be the actual generated video URL
      
      // Save to database
      if (referenceImage && audioFile) {
        await avatarService.saveAvatar({
          name: `Avatar ${new Date().toLocaleDateString()}`,
          referenceImageUrl: referenceImage ? URL.createObjectURL(referenceImage) : null,
          audioFileUrl: audioFile ? URL.createObjectURL(audioFile) : null,
          prompt,
          style: selectedStyle,
          settings: { ...animationSettings, ...advancedSettings },
          videoUrl: '/demo-video.mp4',
          thumbnailUrl: '/demo-thumbnail.jpg',
          status: 'completed'
        })
      }
      
    } catch (err) {
      setError('Generation failed. Please try again.')
      console.error('Generation error:', err)
    } finally {
      setIsGenerating(false)
      setCurrentStage('')
    }
  }

  const handleGenerate = () => {
    if (!referenceImage || !audioFile || !prompt.trim()) {
      alert('Please upload both reference image and audio file, and provide a prompt.')
      return
    }
    
    simulateGeneration()
  }

  const handleExport = async (exportSettings) => {
    setIsExporting(true)
    
    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    // In a real implementation, this would trigger the actual export
    const link = document.createElement('a')
    link.href = generatedVideo
    link.download = `avatar-${Date.now()}.${exportSettings.format}`
    link.click()
    
    setIsExporting(false)
  }

  const handleReuseSettings = (settings) => {
    setPrompt(settings.prompt || '')
    setSelectedStyle(settings.style || 'podcast_host')
    if (settings.settings) {
      setAnimationSettings(prev => ({ ...prev, ...settings.settings }))
      setAdvancedSettings(prev => ({ ...prev, ...settings.settings }))
    }
    setActiveTab('create')
  }

  const handleLoadAvatar = (avatar) => {
    setGeneratedVideo(avatar.video_url)
    setActiveTab('create')
  }

  const savePreset = (name, settings) => {
    // In a real implementation, save to localStorage or database
    const presets = JSON.parse(localStorage.getItem('avatarPresets') || '[]')
    presets.push({ name, settings, createdAt: new Date().toISOString() })
    localStorage.setItem('avatarPresets', JSON.stringify(presets))
  }

  const tabs = [
    { id: 'create', name: 'Create Avatar' },
    { id: 'gallery', name: 'Gallery' }
  ]

  return (
    <div className="app-container">
      {/* Header */}
      <header className="header">
        <div>
          <h1 className="text-2xl font-bold text-white">OmniAvatar</h1>
          <p className="text-gray-400 text-sm">AI-Powered Avatar Generation</p>
        </div>
        
        <div className="flex space-x-1">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`tab ${activeTab === tab.id ? 'active' : ''}`}
            >
              {tab.name}
            </button>
          ))}
        </div>
      </header>

      {activeTab === 'create' ? (
        <>
          {/* Left Sidebar - File Upload & Prompt */}
          <div className="sidebar-left">
            <FileUpload
              onImageUpload={setReferenceImage}
              onAudioUpload={setAudioFile}
              referenceImage={referenceImage}
              audioFile={audioFile}
            />
            
            <div className="mt-6">
              <PromptInput
                prompt={prompt}
                onPromptChange={setPrompt}
                onGenerate={handleGenerate}
                isGenerating={isGenerating}
              />
            </div>
            
            <div className="mt-6">
              <StyleSelection
                selectedStyle={selectedStyle}
                onStyleChange={setSelectedStyle}
              />
            </div>
          </div>

          {/* Main Content - Preview Area */}
          <div className="main-content">
            <PreviewArea
              isGenerating={isGenerating}
              progress={progress}
              generatedVideo={generatedVideo}
              onExport={() => handleExport({ format: 'mp4', resolution: '1080p', quality: 'high' })}
              isExporting={isExporting}
            />
            
            {(isGenerating || error) && (
              <ProgressIndicator
                isGenerating={isGenerating}
                progress={progress}
                stage={currentStage}
                estimatedTime={isGenerating ? `${Math.max(1, Math.ceil((100 - progress) / 10))} min` : null}
                error={error}
              />
            )}
          </div>

          {/* Right Sidebar - Controls & Export */}
          <div className="sidebar-right">
            <div className="tabs border-b border-gray-600 mb-4">
              <button className="tab active">Controls</button>
              <button className="tab">Export</button>
              <button className="tab">Settings</button>
            </div>

            <AnimationControls
              settings={animationSettings}
              onSettingsChange={setAnimationSettings}
            />
            
            <div className="mt-6">
              <ExportOptions
                onExport={handleExport}
                isExporting={isExporting}
                generatedVideo={generatedVideo}
              />
            </div>
            
            <div className="mt-6">
              <SettingsPanel
                settings={advancedSettings}
                onSettingsChange={setAdvancedSettings}
                onSavePreset={savePreset}
              />
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Gallery View */}
          <div className="sidebar-left">
            <div className="space-y-4">
              <h3 className="section-title">Quick Actions</h3>
              <button
                onClick={() => setActiveTab('create')}
                className="button w-full"
              >
                Create New Avatar
              </button>
              
              <div className="control-group">
                <label className="control-label">Export All</label>
                <p className="text-sm text-gray-400 mb-2">
                  Export all completed avatars as a batch
                </p>
                <button className="button-secondary w-full text-sm">
                  Batch Export
                </button>
              </div>
            </div>
          </div>

          <div className="main-content">
            <AvatarGallery
              onReuseSettings={handleReuseSettings}
              onLoadAvatar={handleLoadAvatar}
            />
          </div>

          <div className="sidebar-right">
            <div className="space-y-4">
              <h3 className="section-title">Gallery Tools</h3>
              
              <div className="control-group">
                <label className="control-label">Bulk Actions</label>
                <div className="space-y-2">
                  <button className="button-secondary w-full text-sm">
                    Select Multiple
                  </button>
                  <button className="button-secondary w-full text-sm">
                    Export Selected
                  </button>
                  <button className="button-secondary w-full text-sm text-red-400">
                    Delete Selected
                  </button>
                </div>
              </div>

              <div className="control-group">
                <label className="control-label">Storage</label>
                <div className="bg-gray-700 p-3 rounded text-sm">
                  <div className="flex justify-between mb-1">
                    <span>Used</span>
                    <span>1.2 GB</span>
                  </div>
                  <div className="progress-bar h-2">
                    <div className="progress-fill" style={{ width: '30%' }}></div>
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    30% of 4 GB used
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default App