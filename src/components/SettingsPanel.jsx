import React from 'react'
import { Settings, Volume2, Zap, Eye, RotateCcw, Save } from 'lucide-react'
import './SettingsPanel.css'

const SettingsPanel = ({ settings, onSettingsChange }) => {
  const handleSliderChange = (key, value) => {
    onSettingsChange(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const resetToDefaults = () => {
    onSettingsChange(prev => ({
      ...prev,
      lipSyncAccuracy: 80,
      animationNaturalness: 75,
      voiceClarity: 85,
      gestureResponsiveness: 70,
      facialDetailLevel: 80,
      backgroundBlur: 20,
      audioNoiseReduction: 60,
      renderQuality: 90
    }))
  }

  const saveSettings = () => {
    localStorage.setItem('omniavatar-settings', JSON.stringify(settings))
    alert('Settings saved successfully!')
  }

  const renderSlider = (key, label, icon, description, min = 0, max = 100) => (
    <div className="setting-group">
      <div className="setting-header">
        <div className="setting-label">
          {icon}
          <span>{label}</span>
        </div>
        <span className="setting-value">{settings[key] || 50}%</span>
      </div>
      
      <div className="slider-container">
        <input
          type="range"
          min={min}
          max={max}
          value={settings[key] || 50}
          onChange={(e) => handleSliderChange(key, parseInt(e.target.value))}
          className="setting-slider"
        />
        <div className="slider-track">
          <div 
            className="slider-fill" 
            style={{ width: `${(settings[key] || 50)}%` }}
          ></div>
        </div>
      </div>
      
      <p className="setting-description">{description}</p>
    </div>
  )

  return (
    <div className="settings-panel">
      <div className="panel-header">
        <h2><Settings size={24} /> Advanced Settings</h2>
        <div className="header-actions">
          <button 
            onClick={resetToDefaults}
            className="action-btn reset"
            title="Reset to defaults"
          >
            <RotateCcw size={16} />
            Reset
          </button>
          <button 
            onClick={saveSettings}
            className="action-btn save"
            title="Save settings"
          >
            <Save size={16} />
            Save
          </button>
        </div>
      </div>

      <div className="settings-tabs">
        <div className="settings-section">
          <h3>🎤 Audio & Lip-Sync</h3>
          <div className="settings-grid">
            {renderSlider(
              'lipSyncAccuracy',
              'Lip-Sync Accuracy',
              <Volume2 size={18} />,
              'Fine-tune how precisely mouth movements match the audio'
            )}

            {renderSlider(
              'voiceClarity',
              'Voice Clarity Enhancement',
              <Volume2 size={18} />,
              'Enhance audio clarity and reduce background noise'
            )}

            {renderSlider(
              'audioNoiseReduction',
              'Audio Noise Reduction',
              <Volume2 size={18} />,
              'Remove background noise and improve audio quality'
            )}
          </div>
        </div>

        <div className="settings-section">
          <h3>🎭 Animation & Movement</h3>
          <div className="settings-grid">
            {renderSlider(
              'animationNaturalness',
              'Animation Naturalness',
              <Zap size={18} />,
              'Control how natural and fluid avatar movements appear'
            )}

            {renderSlider(
              'gestureResponsiveness',
              'Gesture Responsiveness',
              <Zap size={18} />,
              'Adjust how quickly gestures respond to speech patterns'
            )}

            {renderSlider(
              'facialDetailLevel',
              'Facial Detail Level',
              <Eye size={18} />,
              'Set the level of detail in facial expressions and micro-movements'
            )}
          </div>
        </div>

        <div className="settings-section">
          <h3>🎨 Visual & Rendering</h3>
          <div className="settings-grid">
            {renderSlider(
              'renderQuality',
              'Render Quality',
              <Eye size={18} />,
              'Overall rendering quality and detail level'
            )}

            {renderSlider(
              'backgroundBlur',
              'Background Blur',
              <Eye size={18} />,
              'Apply blur effect to background to focus on the avatar'
            )}

            {renderSlider(
              'lightingIntensity',
              'Lighting Intensity',
              <Eye size={18} />,
              'Adjust the intensity and quality of avatar lighting'
            )}
          </div>
        </div>
      </div>

      <div className="advanced-options">
        <h3>⚙️ Advanced Options</h3>
        
        <div className="options-grid">
          <div className="option-group">
            <label className="checkbox-option">
              <input type="checkbox" defaultChecked />
              <span>Enable Real-time Preview</span>
            </label>
            <p>Show live updates while adjusting settings</p>
          </div>

          <div className="option-group">
            <label className="checkbox-option">
              <input type="checkbox" defaultChecked />
              <span>GPU Acceleration</span>
            </label>
            <p>Use hardware acceleration for faster processing</p>
          </div>

          <div className="option-group">
            <label className="checkbox-option">
              <input type="checkbox" />
              <span>High-DPI Rendering</span>
            </label>
            <p>Enable high-resolution rendering for 4K+ displays</p>
          </div>

          <div className="option-group">
            <label className="checkbox-option">
              <input type="checkbox" defaultChecked />
              <span>Auto-Save Projects</span>
            </label>
            <p>Automatically save work every 5 minutes</p>
          </div>
        </div>
      </div>

      <div className="performance-monitor">
        <h3>📊 Performance Monitor</h3>
        <div className="performance-grid">
          <div className="performance-item">
            <span className="perf-label">CPU Usage:</span>
            <div className="perf-bar">
              <div className="perf-fill cpu" style={{ width: '45%' }}></div>
            </div>
            <span className="perf-value">45%</span>
          </div>

          <div className="performance-item">
            <span className="perf-label">GPU Usage:</span>
            <div className="perf-bar">
              <div className="perf-fill gpu" style={{ width: '72%' }}></div>
            </div>
            <span className="perf-value">72%</span>
          </div>

          <div className="performance-item">
            <span className="perf-label">Memory:</span>
            <div className="perf-bar">
              <div className="perf-fill memory" style={{ width: '58%' }}></div>
            </div>
            <span className="perf-value">58%</span>
          </div>
        </div>
      </div>

      <div className="settings-info">
        <h4>💡 Settings Tips:</h4>
        <div className="tips-list">
          <div className="tip-item">
            <strong>Lip-Sync Accuracy:</strong> Higher values provide more precise mouth movements but may increase processing time.
          </div>
          <div className="tip-item">
            <strong>Animation Naturalness:</strong> Balanced settings (70-80%) usually provide the most realistic results.
          </div>
          <div className="tip-item">
            <strong>Render Quality:</strong> High quality settings require more powerful hardware but produce better results.
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsPanel