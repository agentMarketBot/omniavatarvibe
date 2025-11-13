import React, { useState } from 'react'
import { Download, Video, Image, Settings } from 'lucide-react'
import './ExportOptions.css'

const ExportOptions = () => {
  const [exportSettings, setExportSettings] = useState({
    format: 'mp4',
    resolution: '1080p',
    frameRate: '30fps',
    quality: 'high',
    duration: 'full'
  })

  const formatOptions = [
    { id: 'mp4', name: 'MP4', description: 'Best for most platforms', icon: '🎬' },
    { id: 'mov', name: 'MOV', description: 'Apple/Mac compatible', icon: '🍎' },
    { id: 'webm', name: 'WebM', description: 'Web optimized', icon: '🌐' },
    { id: 'gif', name: 'GIF', description: 'Animated image', icon: '📱' }
  ]

  const resolutionOptions = [
    { id: '4k', name: '4K (3840×2160)', description: 'Ultra HD quality', size: '~500MB' },
    { id: '1080p', name: '1080p (1920×1080)', description: 'Full HD quality', size: '~200MB' },
    { id: '720p', name: '720p (1280×720)', description: 'HD quality', size: '~100MB' },
    { id: '480p', name: '480p (854×480)', description: 'Standard quality', size: '~50MB' }
  ]

  const qualityOptions = [
    { id: 'ultra', name: 'Ultra', description: 'Maximum quality, larger file' },
    { id: 'high', name: 'High', description: 'Great quality, balanced size' },
    { id: 'medium', name: 'Medium', description: 'Good quality, smaller size' },
    { id: 'low', name: 'Low', description: 'Basic quality, minimal size' }
  ]

  const presetConfigs = [
    {
      name: 'Social Media',
      icon: '📱',
      settings: { format: 'mp4', resolution: '1080p', frameRate: '30fps', quality: 'high' },
      description: 'Optimized for Instagram, TikTok, YouTube Shorts'
    },
    {
      name: 'Presentation',
      icon: '💼',
      settings: { format: 'mp4', resolution: '1080p', frameRate: '24fps', quality: 'ultra' },
      description: 'High quality for business presentations'
    },
    {
      name: 'Web/Email',
      icon: '📧',
      settings: { format: 'webm', resolution: '720p', frameRate: '24fps', quality: 'medium' },
      description: 'Smaller files for web embedding and email'
    },
    {
      name: 'Archive',
      icon: '💾',
      settings: { format: 'mov', resolution: '4k', frameRate: '30fps', quality: 'ultra' },
      description: 'Maximum quality for long-term storage'
    }
  ]

  const handleSettingChange = (key, value) => {
    setExportSettings(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const applyPreset = (preset) => {
    setExportSettings(prev => ({
      ...prev,
      ...preset.settings
    }))
  }

  return (
    <div className="export-options">
      <h2><Download size={20} /> Export Options</h2>
      <p>Configure your video output settings</p>

      <div className="presets-section">
        <h3>Quick Presets</h3>
        <div className="presets-grid">
          {presetConfigs.map((preset, index) => (
            <button
              key={index}
              onClick={() => applyPreset(preset)}
              className="preset-card"
            >
              <span className="preset-icon">{preset.icon}</span>
              <div className="preset-info">
                <h4>{preset.name}</h4>
                <p>{preset.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="settings-section">
        <h3><Settings size={16} /> Custom Settings</h3>
        
        <div className="setting-group">
          <label>Video Format</label>
          <div className="options-grid">
            {formatOptions.map(format => (
              <button
                key={format.id}
                className={`option-btn ${exportSettings.format === format.id ? 'selected' : ''}`}
                onClick={() => handleSettingChange('format', format.id)}
              >
                <span className="option-icon">{format.icon}</span>
                <div className="option-text">
                  <strong>{format.name}</strong>
                  <span>{format.description}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="setting-group">
          <label>Resolution</label>
          <div className="options-list">
            {resolutionOptions.map(resolution => (
              <button
                key={resolution.id}
                className={`option-row ${exportSettings.resolution === resolution.id ? 'selected' : ''}`}
                onClick={() => handleSettingChange('resolution', resolution.id)}
              >
                <div className="option-info">
                  <strong>{resolution.name}</strong>
                  <span>{resolution.description}</span>
                </div>
                <span className="file-size">{resolution.size}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="setting-group">
          <label>Frame Rate</label>
          <div className="radio-group">
            {['24fps', '30fps', '60fps'].map(fps => (
              <label key={fps} className="radio-option">
                <input
                  type="radio"
                  name="frameRate"
                  value={fps}
                  checked={exportSettings.frameRate === fps}
                  onChange={(e) => handleSettingChange('frameRate', e.target.value)}
                />
                <span>{fps}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="setting-group">
          <label>Quality</label>
          <div className="quality-slider">
            {qualityOptions.map(quality => (
              <button
                key={quality.id}
                className={`quality-btn ${exportSettings.quality === quality.id ? 'selected' : ''}`}
                onClick={() => handleSettingChange('quality', quality.id)}
              >
                <strong>{quality.name}</strong>
                <span>{quality.description}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="export-summary">
        <h3>📋 Export Summary</h3>
        <div className="summary-card">
          <div className="summary-item">
            <Video size={16} />
            <span>Format: {exportSettings.format.toUpperCase()}</span>
          </div>
          <div className="summary-item">
            <Image size={16} />
            <span>Resolution: {exportSettings.resolution}</span>
          </div>
          <div className="summary-item">
            <Settings size={16} />
            <span>Quality: {exportSettings.quality}</span>
          </div>
          <div className="summary-item">
            <span>📺</span>
            <span>Frame Rate: {exportSettings.frameRate}</span>
          </div>
        </div>
        
        <div className="export-note">
          <strong>Note:</strong> Higher quality settings will result in larger file sizes and longer processing times.
        </div>
      </div>
    </div>
  )
}

export default ExportOptions