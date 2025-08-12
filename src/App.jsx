import React, { useState } from 'react'
import './App.css'
import FileUpload from './components/FileUpload'
import PromptInput from './components/PromptInput'
import PreviewArea from './components/PreviewArea'
import ControlPanel from './components/ControlPanel'
import StyleSelector from './components/StyleSelector'
import ExportOptions from './components/ExportOptions'
import ProgressIndicator from './components/ProgressIndicator'
import SettingsPanel from './components/SettingsPanel'
import Gallery from './components/Gallery'

function App() {
  const [referenceImage, setReferenceImage] = useState(null)
  const [audioFile, setAudioFile] = useState(null)
  const [prompt, setPrompt] = useState('')
  const [avatarSettings, setAvatarSettings] = useState({
    expressions: 50,
    gestures: 50,
    movement: 50,
    style: 'podcast-host',
    lipSyncAccuracy: 80,
    animationNaturalness: 75
  })
  const [isGenerating, setIsGenerating] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentTab, setCurrentTab] = useState('create')

  const handleFileUpload = (type, file) => {
    if (type === 'image') {
      setReferenceImage(file)
    } else if (type === 'audio') {
      setAudioFile(file)
    }
  }

  const handleGeneration = async () => {
    if (!referenceImage || !audioFile) {
      alert('Please upload both reference image and audio file')
      return
    }
    
    setIsGenerating(true)
    setProgress(0)
    
    // Simulate generation process
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200))
      setProgress(i)
    }
    
    setIsGenerating(false)
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>🎭 OmniAvatar</h1>
        <p>Create stunning talking avatars for podcasts, videos, and presentations</p>
      </header>

      <nav className="app-nav">
        <button 
          className={currentTab === 'create' ? 'active' : ''} 
          onClick={() => setCurrentTab('create')}
        >
          Create Avatar
        </button>
        <button 
          className={currentTab === 'gallery' ? 'active' : ''} 
          onClick={() => setCurrentTab('gallery')}
        >
          Gallery
        </button>
        <button 
          className={currentTab === 'settings' ? 'active' : ''} 
          onClick={() => setCurrentTab('settings')}
        >
          Settings
        </button>
      </nav>

      <main className="app-content">
        {currentTab === 'create' && (
          <div className="create-tab">
            <div className="left-panel">
              <FileUpload onFileUpload={handleFileUpload} />
              <PromptInput prompt={prompt} setPrompt={setPrompt} />
              <StyleSelector 
                selectedStyle={avatarSettings.style} 
                onStyleChange={(style) => setAvatarSettings(prev => ({ ...prev, style }))} 
              />
              <ControlPanel 
                settings={avatarSettings} 
                onSettingsChange={setAvatarSettings} 
              />
              <ExportOptions />
              {isGenerating && <ProgressIndicator progress={progress} />}
              <button 
                className="generate-btn" 
                onClick={handleGeneration}
                disabled={isGenerating || !referenceImage || !audioFile}
              >
                {isGenerating ? 'Generating...' : 'Generate Avatar'}
              </button>
            </div>
            
            <div className="right-panel">
              <PreviewArea 
                referenceImage={referenceImage}
                isGenerating={isGenerating}
                progress={progress}
              />
            </div>
          </div>
        )}

        {currentTab === 'gallery' && <Gallery />}
        
        {currentTab === 'settings' && (
          <SettingsPanel 
            settings={avatarSettings} 
            onSettingsChange={setAvatarSettings} 
          />
        )}
      </main>
    </div>
  )
}

export default App