import React from 'react'
import { Smile, Hand, User, RotateCcw } from 'lucide-react'
import './ControlPanel.css'

const ControlPanel = ({ settings, onSettingsChange }) => {
  const handleSliderChange = (key, value) => {
    onSettingsChange(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const resetToDefaults = () => {
    onSettingsChange(prev => ({
      ...prev,
      expressions: 50,
      gestures: 50,
      movement: 50
    }))
  }

  const presetConfigs = [
    {
      name: 'Subtle & Professional',
      icon: '👔',
      values: { expressions: 30, gestures: 25, movement: 20 }
    },
    {
      name: 'Balanced & Natural',
      icon: '😊',
      values: { expressions: 50, gestures: 50, movement: 50 }
    },
    {
      name: 'Animated & Engaging',
      icon: '🎭',
      values: { expressions: 75, gestures: 80, movement: 70 }
    },
    {
      name: 'Dynamic & Energetic',
      icon: '⚡',
      values: { expressions: 90, gestures: 95, movement: 85 }
    }
  ]

  const applyPreset = (preset) => {
    onSettingsChange(prev => ({
      ...prev,
      ...preset.values
    }))
  }

  const renderSlider = (key, label, icon, description) => (
    <div className="control-group">
      <div className="control-header">
        <div className="control-label">
          {icon}
          <span>{label}</span>
        </div>
        <span className="control-value">{settings[key]}%</span>
      </div>
      
      <div className="slider-container">
        <input
          type="range"
          min="0"
          max="100"
          value={settings[key]}
          onChange={(e) => handleSliderChange(key, parseInt(e.target.value))}
          className="control-slider"
        />
        <div className="slider-track">
          <div 
            className="slider-fill" 
            style={{ width: `${settings[key]}%` }}
          ></div>
        </div>
      </div>
      
      <p className="control-description">{description}</p>
    </div>
  )

  return (
    <div className="control-panel">
      <div className="panel-header">
        <h2>🎛️ Avatar Controls</h2>
        <button 
          onClick={resetToDefaults}
          className="reset-btn"
          title="Reset to defaults"
        >
          <RotateCcw size={16} />
        </button>
      </div>

      <div className="controls-grid">
        {renderSlider(
          'expressions',
          'Facial Expressions',
          <Smile size={18} />,
          'Control the intensity and frequency of facial expressions'
        )}

        {renderSlider(
          'gestures',
          'Hand Gestures',
          <Hand size={18} />,
          'Adjust hand movement and gesture animation intensity'
        )}

        {renderSlider(
          'movement',
          'Body Movement',
          <User size={18} />,
          'Set overall body language and posture dynamics'
        )}
      </div>

      <div className="presets-section">
        <h3>Quick Presets</h3>
        <div className="presets-grid">
          {presetConfigs.map((preset, index) => (
            <button
              key={index}
              onClick={() => applyPreset(preset)}
              className="preset-btn"
              title={`Apply ${preset.name} settings`}
            >
              <span className="preset-icon">{preset.icon}</span>
              <span className="preset-name">{preset.name}</span>
              <div className="preset-values">
                {preset.values.expressions}% • {preset.values.gestures}% • {preset.values.movement}%
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="control-tips">
        <h4>💡 Control Tips:</h4>
        <div className="tips-list">
          <div className="tip-item">
            <strong>Low Values (0-30%):</strong> Subtle, professional appearance
          </div>
          <div className="tip-item">
            <strong>Medium Values (40-60%):</strong> Natural, conversational style
          </div>
          <div className="tip-item">
            <strong>High Values (70-100%):</strong> Energetic, engaging presentation
          </div>
        </div>
      </div>

      <div className="real-time-preview">
        <h4>Current Settings Preview:</h4>
        <div className="settings-visualization">
          <div className="viz-item">
            <span>Expressions</span>
            <div className="viz-bar">
              <div 
                className="viz-fill expressions" 
                style={{ width: `${settings.expressions}%` }}
              ></div>
            </div>
          </div>
          <div className="viz-item">
            <span>Gestures</span>
            <div className="viz-bar">
              <div 
                className="viz-fill gestures" 
                style={{ width: `${settings.gestures}%` }}
              ></div>
            </div>
          </div>
          <div className="viz-item">
            <span>Movement</span>
            <div className="viz-bar">
              <div 
                className="viz-fill movement" 
                style={{ width: `${settings.movement}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ControlPanel