import React from 'react'
import { Check, Clock, AlertCircle, Loader } from 'lucide-react'

const ProgressIndicator = ({ 
  isGenerating, 
  progress, 
  stage, 
  estimatedTime,
  error 
}) => {
  const stages = [
    { 
      id: 'upload', 
      name: 'Processing Files', 
      description: 'Uploading and analyzing your reference image and audio'
    },
    { 
      id: 'analysis', 
      name: 'AI Analysis', 
      description: 'Understanding facial features and voice characteristics'
    },
    { 
      id: 'generation', 
      name: 'Avatar Generation', 
      description: 'Creating your personalized avatar with animations'
    },
    { 
      id: 'synthesis', 
      name: 'Video Synthesis', 
      description: 'Combining audio with lip-sync and body movements'
    },
    { 
      id: 'finalization', 
      name: 'Finalizing', 
      description: 'Rendering final video and preparing for preview'
    }
  ]

  const getStageStatus = (stageId) => {
    const stageIndex = stages.findIndex(s => s.id === stageId)
    const currentIndex = stages.findIndex(s => s.id === stage)
    
    if (error) return 'error'
    if (stageIndex < currentIndex) return 'completed'
    if (stageIndex === currentIndex) return 'active'
    return 'pending'
  }

  const getStageIcon = (status) => {
    switch (status) {
      case 'completed':
        return <Check size={16} className="text-green-400" />
      case 'active':
        return <Loader size={16} className="text-blue-400 animate-spin" />
      case 'error':
        return <AlertCircle size={16} className="text-red-400" />
      default:
        return <Clock size={16} className="text-gray-400" />
    }
  }

  if (!isGenerating && !error) {
    return null
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="section-title">Generation Progress</h3>
        {estimatedTime && (
          <span className="text-sm text-gray-400">
            Est. {estimatedTime} remaining
          </span>
        )}
      </div>

      {error && (
        <div className="bg-red-900 bg-opacity-20 border border-red-500 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <AlertCircle size={20} className="text-red-400" />
            <span className="text-red-400 font-medium">Generation Failed</span>
          </div>
          <p className="text-red-300 text-sm">{error}</p>
          <button className="button-secondary mt-3 text-sm">
            Try Again
          </button>
        </div>
      )}

      {isGenerating && (
        <>
          {/* Overall Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-white">Overall Progress</span>
              <span className="text-gray-400">{Math.round(progress)}%</span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Stage Progress */}
          <div className="space-y-3">
            {stages.map((stageItem, index) => {
              const status = getStageStatus(stageItem.id)
              
              return (
                <div
                  key={stageItem.id}
                  className={`flex items-start space-x-3 p-3 rounded-lg transition-colors ${
                    status === 'active' 
                      ? 'bg-blue-900 bg-opacity-20 border border-blue-500 border-opacity-30' 
                      : status === 'completed'
                      ? 'bg-green-900 bg-opacity-20'
                      : status === 'error'
                      ? 'bg-red-900 bg-opacity-20'
                      : 'bg-gray-800'
                  }`}
                >
                  <div className="mt-0.5">
                    {getStageIcon(status)}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className={`font-medium ${
                        status === 'active' ? 'text-blue-400' :
                        status === 'completed' ? 'text-green-400' :
                        status === 'error' ? 'text-red-400' :
                        'text-gray-400'
                      }`}>
                        {stageItem.name}
                      </span>
                      
                      {status === 'active' && (
                        <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded">
                          Active
                        </span>
                      )}
                    </div>
                    
                    <p className="text-sm text-gray-500 mt-1">
                      {stageItem.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Current Stage Details */}
          {stage && (
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-600">
              <div className="flex items-center space-x-2 mb-2">
                <Loader size={16} className="text-blue-400 animate-spin" />
                <span className="text-blue-400 font-medium">
                  {stages.find(s => s.id === stage)?.name}
                </span>
              </div>
              <p className="text-sm text-gray-400">
                {stages.find(s => s.id === stage)?.description}
              </p>
              
              {/* Stage-specific progress */}
              <div className="mt-3">
                <div className="progress-bar h-1">
                  <div 
                    className="progress-fill h-full" 
                    style={{ 
                      width: `${((progress % 20) / 20) * 100}%`,
                      background: 'linear-gradient(90deg, #3b82f6, #1d4ed8)'
                    }}
                  ></div>
                </div>
              </div>
            </div>
          )}

          {/* Tips */}
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-600">
            <h4 className="text-sm font-medium text-white mb-2">💡 Tips while you wait</h4>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>• Higher quality settings take longer but produce better results</li>
              <li>• Clear audio files with minimal background noise work best</li>
              <li>• High-resolution reference images improve avatar quality</li>
            </ul>
          </div>
        </>
      )}
    </div>
  )
}

export default ProgressIndicator