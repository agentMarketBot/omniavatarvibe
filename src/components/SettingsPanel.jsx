import React, { useState } from 'react'
import { Settings, Volume2, Target, Zap, RotateCw, Save } from 'lucide-react'

const SettingsPanel = ({ settings, onSettingsChange, onSavePreset }) => {
  const [presetName, setPresetName] = useState('')
  const [showPresetForm, setShowPresetForm] = useState(false)

  const updateSetting = (key, value) => {
    onSettingsChange({
      ...settings,
      [key]: value
    })
  }

  const resetToDefaults = () => {
    onSettingsChange({
      lipSyncAccuracy: 85,
      animationNaturalness: 75,
      responseSpeed: 60,
      breathingIntensity: 30,
      microExpressions: 50,
      gestureDelay: 20,
      eyeTrackingMode: 'natural',
      voiceEmotion: 'auto',
      postureStability: 70,
      backgroundStability: 90
    })
  }

  const savePreset = () => {
    if (presetName.trim()) {
      onSavePreset(presetName, settings)
      setPresetName('')
      setShowPresetForm(false)
    }
  }

  const SliderSetting = ({ 
    label, 
    description, 
    value, 
    onChange, 
    min = 0, 
    max = 100, 
    icon: Icon,
    unit = '%' 
  }) => (
    <div className="space-y-3">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-2 flex-1">
          <Icon size={16} className="text-blue-400 mt-1" />
          <div>
            <label className="text-sm font-medium text-white">{label}</label>
            <p className="text-xs text-gray-400 mt-1">{description}</p>
          </div>
        </div>
        <span className="text-sm text-gray-400 min-w-[3rem] text-right">
          {value}{unit}
        </span>
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
        <h3 className="section-title">Advanced Settings</h3>
        <div className="flex space-x-2">
          <button
            onClick={resetToDefaults}
            className="button-secondary text-sm px-3 py-1 flex items-center space-x-1"
          >
            <RotateCw size={14} />
            <span>Reset</span>
          </button>
          <button
            onClick={() => setShowPresetForm(!showPresetForm)}
            className="button-secondary text-sm px-3 py-1 flex items-center space-x-1"
          >
            <Save size={14} />
            <span>Save Preset</span>
          </button>
        </div>
      </div>

      {showPresetForm && (
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
          <div className="flex space-x-2">
            <input
              type="text"
              value={presetName}
              onChange={(e) => setPresetName(e.target.value)}
              placeholder="Enter preset name..."
              className="control-input flex-1"
            />
            <button
              onClick={savePreset}
              disabled={!presetName.trim()}
              className="button px-4"
            >
              Save
            </button>
          </div>
        </div>
      )}

      <div className="space-y-6">
        {/* Lip Sync & Audio */}
        <div className="space-y-4">
          <h4 className="text-lg font-medium text-white border-b border-gray-600 pb-2">
            Lip Sync & Audio
          </h4>
          
          <SliderSetting
            label="Lip Sync Accuracy"
            description="How precisely lip movements match the audio"
            value={settings.lipSyncAccuracy || 85}
            onChange={(value) => updateSetting('lipSyncAccuracy', value)}
            icon={Volume2}
          />

          <SliderSetting
            label="Voice Emotion Detection"
            description="How much facial expressions respond to voice tone"
            value={settings.voiceEmotionResponse || 70}
            onChange={(value) => updateSetting('voiceEmotionResponse', value)}
            icon={Target}
          />

          <div className="space-y-2">
            <label className="text-sm font-medium text-white flex items-center space-x-2">
              <Volume2 size={16} className="text-blue-400" />
              <span>Audio Processing Mode</span>
            </label>
            <select
              value={settings.audioProcessingMode || 'balanced'}
              onChange={(e) => updateSetting('audioProcessingMode', e.target.value)}
              className="control-input"
            >
              <option value="fast">Fast (Lower quality)</option>
              <option value="balanced">Balanced</option>
              <option value="precise">Precise (Higher quality)</option>
            </select>
          </div>
        </div>

        {/* Animation Quality */}
        <div className="space-y-4">
          <h4 className="text-lg font-medium text-white border-b border-gray-600 pb-2">
            Animation Quality
          </h4>

          <SliderSetting
            label="Animation Naturalness"
            description="How smooth and natural movements appear"
            value={settings.animationNaturalness || 75}
            onChange={(value) => updateSetting('animationNaturalness', value)}
            icon={Zap}
          />

          <SliderSetting
            label="Micro Expressions"
            description="Subtle facial expressions and emotion details"
            value={settings.microExpressions || 50}
            onChange={(value) => updateSetting('microExpressions', value)}
            icon={Target}
          />

          <SliderSetting
            label="Breathing Intensity"
            description="Natural breathing motion visibility"
            value={settings.breathingIntensity || 30}
            onChange={(value) => updateSetting('breathingIntensity', value)}
            icon={Zap}
          />

          <SliderSetting
            label="Posture Stability"
            description="How stable the overall body position remains"
            value={settings.postureStability || 70}
            onChange={(value) => updateSetting('postureStability', value)}
            icon={Target}
          />
        </div>

        {/* Timing & Response */}
        <div className="space-y-4">
          <h4 className="text-lg font-medium text-white border-b border-gray-600 pb-2">
            Timing & Response
          </h4>

          <SliderSetting
            label="Response Speed"
            description="How quickly avatar reacts to audio changes"
            value={settings.responseSpeed || 60}
            onChange={(value) => updateSetting('responseSpeed', value)}
            icon={Zap}
            unit="ms"
            min={10}
            max={200}
          />

          <SliderSetting
            label="Gesture Delay"
            description="Delay between audio cues and gesture responses"
            value={settings.gestureDelay || 20}
            onChange={(value) => updateSetting('gestureDelay', value)}
            icon={Target}
            unit="ms"
            min={0}
            max={100}
          />
        </div>

        {/* Advanced Options */}
        <div className="space-y-4">
          <h4 className="text-lg font-medium text-white border-b border-gray-600 pb-2">
            Advanced Options
          </h4>

          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="text-sm font-medium text-white flex items-center space-x-2 mb-2">
                <Target size={16} className="text-blue-400" />
                <span>Eye Tracking Mode</span>
              </label>
              <select
                value={settings.eyeTrackingMode || 'natural'}
                onChange={(e) => updateSetting('eyeTrackingMode', e.target.value)}
                className="control-input"
              >
                <option value="direct">Direct Camera Gaze</option>
                <option value="natural">Natural Eye Movement</option>
                <option value="audience">Audience Scanning</option>
                <option value="content">Content-Aware</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-white flex items-center space-x-2 mb-2">
                <Settings size={16} className="text-blue-400" />
                <span>Background Stability</span>
              </label>
              <select
                value={settings.backgroundStability || 'high'}
                onChange={(e) => updateSetting('backgroundStability', e.target.value)}
                className="control-input"
              >
                <option value="low">Low (More dynamic)</option>
                <option value="medium">Medium</option>
                <option value="high">High (Very stable)</option>
                <option value="locked">Locked (No movement)</option>
              </select>
            </div>
          </div>

          <SliderSetting
            label="Background Stability"
            description="How stable the background remains during animation"
            value={settings.backgroundStability || 90}
            onChange={(value) => updateSetting('backgroundStability', value)}
            icon={Settings}
          />
        </div>

        {/* Performance Options */}
        <div className="space-y-4">
          <h4 className="text-lg font-medium text-white border-b border-gray-600 pb-2">
            Performance
          </h4>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-white">
                GPU Acceleration
              </label>
              <input
                type="checkbox"
                checked={settings.gpuAcceleration || true}
                onChange={(e) => updateSetting('gpuAcceleration', e.target.checked)}
                className="w-4 h-4"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-white">
                Real-time Preview
              </label>
              <input
                type="checkbox"
                checked={settings.realtimePreview || false}
                onChange={(e) => updateSetting('realtimePreview', e.target.checked)}
                className="w-4 h-4"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-white">
                High Quality Mode
              </label>
              <input
                type="checkbox"
                checked={settings.highQualityMode || true}
                onChange={(e) => updateSetting('highQualityMode', e.target.checked)}
                className="w-4 h-4"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Current Settings Summary */}
      <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
        <h4 className="text-sm font-medium text-white mb-2">Current Configuration</h4>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>Lip Sync: {settings.lipSyncAccuracy || 85}%</div>
          <div>Naturalness: {settings.animationNaturalness || 75}%</div>
          <div>Response: {settings.responseSpeed || 60}ms</div>
          <div>Eye Mode: {settings.eyeTrackingMode || 'natural'}</div>
        </div>
      </div>
    </div>
  )
}

export default SettingsPanel