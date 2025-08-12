import React, { useState } from 'react'
import { Download, Video, Image, Settings, Check } from 'lucide-react'

const ExportOptions = ({ onExport, isExporting, generatedVideo }) => {
  const [exportSettings, setExportSettings] = useState({
    format: 'mp4',
    resolution: '1080p',
    quality: 'high',
    framerate: '30',
    includeAudio: true,
    duration: 'full'
  })

  const [showAdvanced, setShowAdvanced] = useState(false)

  const formats = [
    { id: 'mp4', name: 'MP4', description: 'Best for most platforms' },
    { id: 'webm', name: 'WebM', description: 'Optimized for web' },
    { id: 'mov', name: 'MOV', description: 'Best for editing' },
    { id: 'avi', name: 'AVI', description: 'Universal compatibility' }
  ]

  const resolutions = [
    { id: '4k', name: '4K (3840×2160)', size: '~100MB/min' },
    { id: '1080p', name: '1080p (1920×1080)', size: '~50MB/min' },
    { id: '720p', name: '720p (1280×720)', size: '~25MB/min' },
    { id: '480p', name: '480p (854×480)', size: '~15MB/min' }
  ]

  const qualities = [
    { id: 'ultra', name: 'Ultra High', description: 'Best quality, largest file' },
    { id: 'high', name: 'High', description: 'Great quality, balanced size' },
    { id: 'medium', name: 'Medium', description: 'Good quality, smaller size' },
    { id: 'low', name: 'Low', description: 'Basic quality, smallest size' }
  ]

  const handleExport = () => {
    onExport(exportSettings)
  }

  const updateSetting = (key, value) => {
    setExportSettings(prev => ({
      ...prev,
      [key]: value
    }))
  }

  return (
    <div className="space-y-6">
      <h3 className="section-title">Export Options</h3>

      {!generatedVideo && (
        <div className="text-center py-8 text-gray-500">
          <Video size={48} className="mx-auto mb-2 opacity-50" />
          <p>Generate an avatar first to enable export options</p>
        </div>
      )}

      {generatedVideo && (
        <>
          {/* Quick Export Presets */}
          <div className="grid grid-cols-1 gap-3">
            <h4 className="text-sm font-medium text-white mb-2">Quick Presets</h4>
            
            <button
              onClick={() => setExportSettings({
                format: 'mp4', resolution: '1080p', quality: 'high', 
                framerate: '30', includeAudio: true, duration: 'full'
              })}
              className="text-left p-3 bg-gray-700 hover:bg-gray-600 rounded border border-gray-600 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-white">Social Media Ready</div>
                  <div className="text-sm text-gray-400">1080p MP4, optimized for platforms</div>
                </div>
                <Video size={20} className="text-blue-400" />
              </div>
            </button>

            <button
              onClick={() => setExportSettings({
                format: 'mp4', resolution: '4k', quality: 'ultra', 
                framerate: '30', includeAudio: true, duration: 'full'
              })}
              className="text-left p-3 bg-gray-700 hover:bg-gray-600 rounded border border-gray-600 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-white">Professional Quality</div>
                  <div className="text-sm text-gray-400">4K MP4, highest quality</div>
                </div>
                <Image size={20} className="text-green-400" />
              </div>
            </button>

            <button
              onClick={() => setExportSettings({
                format: 'webm', resolution: '720p', quality: 'medium', 
                framerate: '30', includeAudio: true, duration: 'full'
              })}
              className="text-left p-3 bg-gray-700 hover:bg-gray-600 rounded border border-gray-600 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-white">Web Optimized</div>
                  <div className="text-sm text-gray-400">720p WebM, fast loading</div>
                </div>
                <Download size={20} className="text-purple-400" />
              </div>
            </button>
          </div>

          {/* Advanced Settings Toggle */}
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center space-x-2 text-blue-400 hover:text-blue-300"
          >
            <Settings size={16} />
            <span>Advanced Settings</span>
          </button>

          {showAdvanced && (
            <div className="space-y-4 p-4 bg-gray-800 rounded-lg border border-gray-600">
              {/* Format Selection */}
              <div>
                <label className="control-label">Format</label>
                <div className="grid grid-cols-2 gap-2">
                  {formats.map(format => (
                    <button
                      key={format.id}
                      onClick={() => updateSetting('format', format.id)}
                      className={`p-3 text-left rounded border transition-colors ${
                        exportSettings.format === format.id
                          ? 'border-blue-500 bg-blue-500 bg-opacity-10'
                          : 'border-gray-600 hover:border-gray-500'
                      }`}
                    >
                      <div className="font-medium text-white">{format.name}</div>
                      <div className="text-xs text-gray-400">{format.description}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Resolution Selection */}
              <div>
                <label className="control-label">Resolution</label>
                <div className="space-y-2">
                  {resolutions.map(res => (
                    <button
                      key={res.id}
                      onClick={() => updateSetting('resolution', res.id)}
                      className={`w-full p-3 text-left rounded border transition-colors ${
                        exportSettings.resolution === res.id
                          ? 'border-blue-500 bg-blue-500 bg-opacity-10'
                          : 'border-gray-600 hover:border-gray-500'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-medium text-white">{res.name}</div>
                        </div>
                        <div className="text-sm text-gray-400">{res.size}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quality Selection */}
              <div>
                <label className="control-label">Quality</label>
                <div className="space-y-2">
                  {qualities.map(quality => (
                    <button
                      key={quality.id}
                      onClick={() => updateSetting('quality', quality.id)}
                      className={`w-full p-3 text-left rounded border transition-colors ${
                        exportSettings.quality === quality.id
                          ? 'border-blue-500 bg-blue-500 bg-opacity-10'
                          : 'border-gray-600 hover:border-gray-500'
                      }`}
                    >
                      <div className="font-medium text-white">{quality.name}</div>
                      <div className="text-sm text-gray-400">{quality.description}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Other Settings */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="control-label">Frame Rate</label>
                  <select
                    value={exportSettings.framerate}
                    onChange={(e) => updateSetting('framerate', e.target.value)}
                    className="control-input"
                  >
                    <option value="24">24 FPS</option>
                    <option value="30">30 FPS</option>
                    <option value="60">60 FPS</option>
                  </select>
                </div>

                <div>
                  <label className="control-label">Duration</label>
                  <select
                    value={exportSettings.duration}
                    onChange={(e) => updateSetting('duration', e.target.value)}
                    className="control-input"
                  >
                    <option value="full">Full Length</option>
                    <option value="30s">First 30 seconds</option>
                    <option value="60s">First 60 seconds</option>
                    <option value="custom">Custom Range</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="includeAudio"
                  checked={exportSettings.includeAudio}
                  onChange={(e) => updateSetting('includeAudio', e.target.checked)}
                  className="w-4 h-4"
                />
                <label htmlFor="includeAudio" className="text-white">Include audio</label>
              </div>
            </div>
          )}

          {/* Export Button */}
          <button
            onClick={handleExport}
            disabled={isExporting}
            className="button w-full flex items-center justify-center space-x-2 py-3"
          >
            {isExporting ? (
              <>
                <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                <span>Exporting...</span>
              </>
            ) : (
              <>
                <Download size={20} />
                <span>Export Video</span>
              </>
            )}
          </button>

          {/* Export Info */}
          <div className="text-sm text-gray-400 space-y-1">
            <div>Format: {exportSettings.format.toUpperCase()}</div>
            <div>Resolution: {exportSettings.resolution}</div>
            <div>Quality: {exportSettings.quality}</div>
            <div>Estimated size: {exportSettings.resolution === '4k' ? '~100MB/min' : 
                                  exportSettings.resolution === '1080p' ? '~50MB/min' : 
                                  exportSettings.resolution === '720p' ? '~25MB/min' : '~15MB/min'}</div>
          </div>
        </>
      )}
    </div>
  )
}

export default ExportOptions