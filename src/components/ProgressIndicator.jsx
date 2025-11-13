import React from 'react'
import { Loader, CheckCircle, AlertCircle } from 'lucide-react'
import './ProgressIndicator.css'

const ProgressIndicator = ({ progress, status = 'processing', currentStep = 'Initializing' }) => {
  const steps = [
    { id: 'upload', name: 'Processing Files', description: 'Analyzing reference image and audio' },
    { id: 'analysis', name: 'AI Analysis', description: 'Extracting facial features and voice patterns' },
    { id: 'generation', name: 'Avatar Generation', description: 'Creating your talking avatar' },
    { id: 'rendering', name: 'Final Rendering', description: 'Applying effects and optimizations' },
    { id: 'complete', name: 'Complete', description: 'Your avatar is ready!' }
  ]

  const getStepStatus = (stepIndex, currentProgress) => {
    const stepProgress = (stepIndex + 1) * 20
    if (currentProgress >= stepProgress) return 'completed'
    if (currentProgress >= stepProgress - 20) return 'active'
    return 'pending'
  }

  const getCurrentStepIndex = (progress) => {
    return Math.floor(progress / 20)
  }

  return (
    <div className="progress-indicator">
      <div className="progress-header">
        <h3>🚀 Generating Your Avatar</h3>
        <div className="progress-stats">
          <span className="progress-percentage">{progress}%</span>
          <span className="progress-status">{status}</span>
        </div>
      </div>

      <div className="progress-bar-container">
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${progress}%` }}
          >
            <div className="progress-shine"></div>
          </div>
        </div>
      </div>

      <div className="steps-container">
        {steps.map((step, index) => {
          const stepStatus = getStepStatus(index, progress)
          const isCurrentStep = getCurrentStepIndex(progress) === index && progress < 100
          
          return (
            <div 
              key={step.id} 
              className={`step-item ${stepStatus} ${isCurrentStep ? 'current' : ''}`}
            >
              <div className="step-indicator">
                {stepStatus === 'completed' ? (
                  <CheckCircle size={20} className="step-icon completed" />
                ) : stepStatus === 'active' ? (
                  <Loader size={20} className="step-icon active spinning" />
                ) : (
                  <div className="step-number">{index + 1}</div>
                )}
              </div>
              
              <div className="step-content">
                <h4 className="step-name">{step.name}</h4>
                <p className="step-description">{step.description}</p>
                
                {isCurrentStep && (
                  <div className="step-progress">
                    <div className="step-progress-bar">
                      <div 
                        className="step-progress-fill" 
                        style={{ width: `${((progress % 20) / 20) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      <div className="progress-details">
        <div className="detail-item">
          <span className="detail-label">Estimated time remaining:</span>
          <span className="detail-value">
            {progress < 100 ? `${Math.max(1, Math.ceil((100 - progress) / 10))} minutes` : 'Complete!'}
          </span>
        </div>
        
        <div className="detail-item">
          <span className="detail-label">Current operation:</span>
          <span className="detail-value">
            {progress < 100 ? steps[getCurrentStepIndex(progress)]?.name || 'Processing...' : 'Finished'}
          </span>
        </div>
      </div>

      {progress === 100 && (
        <div className="completion-message">
          <CheckCircle size={24} className="completion-icon" />
          <div className="completion-text">
            <h4>Avatar Generated Successfully!</h4>
            <p>Your talking avatar is ready. You can now preview, download, or generate another one.</p>
          </div>
        </div>
      )}

      {status === 'error' && (
        <div className="error-message">
          <AlertCircle size={24} className="error-icon" />
          <div className="error-text">
            <h4>Generation Failed</h4>
            <p>There was an error generating your avatar. Please try again or check your files.</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProgressIndicator