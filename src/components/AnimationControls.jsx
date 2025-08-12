import React from 'react'
import { Smile, Hand, User, RotateCw } from 'lucide-react'

const AnimationControls = ({ settings, onSettingsChange }) => {
  const updateSetting = (key, value) => {
    onSettingsChange({
      ...settings,
      [key]: value
    })
  }

  const resetToDefaults = () => {
    onSettingsChange({
      facialExpression: 50,
      handGestures: 30,
      bodyMovement: 40,
      headMovement: 35,
      eyeContact: 80,
      blinkRate: 25
    })
  }

  const SliderControl = ({ label, value, onChange, min = 0, max = 100, icon: Icon }) => (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Icon size={16} className="text-blue-400" />
          <label className="text-sm font-medium text-white">{label}</label>
        </div>
        <span className="text-sm text-gray-400">{value}%</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="slider w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
      />
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="section-title">Animation Controls</h3>
        <button
          onClick={resetToDefaults}
          className="button-secondary text-sm px-3 py-1 flex items-center space-x-1"
        >
          <RotateCw size={14} />
          <span>Reset</span>
        </button>
      </div>

      <div className="space-y-4">
        <SliderControl
          label="Facial Expression Intensity"
          value={settings.facialExpression || 50}
          onChange={(value) => updateSetting('facialExpression', value)}
          icon={Smile}
        />

        <SliderControl
          label="Hand Gestures"
          value={settings.handGestures || 30}
          onChange={(value) => updateSetting('handGestures', value)}
          icon={Hand}
        />

        <SliderControl
          label="Body Movement"
          value={settings.bodyMovement || 40}
          onChange={(value) => updateSetting('bodyMovement', value)}
          icon={User}
        />

        <SliderControl
          label="Head Movement"
          value={settings.headMovement || 35}
          onChange={(value) => updateSetting('headMovement', value)}
          icon={User}
        />

        <SliderControl
          label="Eye Contact"
          value={settings.eyeContact || 80}
          onChange={(value) => updateSetting('eyeContact', value)}
          icon={Smile}
        />

        <SliderControl
          label="Blink Rate"
          value={settings.blinkRate || 25}
          onChange={(value) => updateSetting('blinkRate', value)}
          icon={Smile}
        />
      </div>

      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-600">
        <div>
          <label className="control-label text-sm">Emotion Style</label>
          <select
            value={settings.emotionStyle || 'neutral'}
            onChange={(e) => updateSetting('emotionStyle', e.target.value)}
            className="control-input text-sm"
          >
            <option value="neutral">Neutral</option>
            <option value="happy">Happy</option>
            <option value="confident">Confident</option>
            <option value="serious">Serious</option>
            <option value="friendly">Friendly</option>
            <option value="enthusiastic">Enthusiastic</option>
          </select>
        </div>

        <div>
          <label className="control-label text-sm">Movement Style</label>
          <select
            value={settings.movementStyle || 'natural'}
            onChange={(e) => updateSetting('movementStyle', e.target.value)}
            className="control-input text-sm"
          >
            <option value="minimal">Minimal</option>
            <option value="natural">Natural</option>
            <option value="animated">Animated</option>
            <option value="dynamic">Dynamic</option>
          </select>
        </div>
      </div>

      <div className="control-group">
        <label className="control-label text-sm">Background Setting</label>
        <select
          value={settings.background || 'studio'}
          onChange={(e) => updateSetting('background', e.target.value)}
          className="control-input"
        >
          <option value="studio">Professional Studio</option>
          <option value="office">Modern Office</option>
          <option value="home">Home Office</option>
          <option value="outdoor">Outdoor Setting</option>
          <option value="abstract">Abstract Background</option>
          <option value="green-screen">Green Screen</option>
        </select>
      </div>
    </div>
  )
}

export default AnimationControls