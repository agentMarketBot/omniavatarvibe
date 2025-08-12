import React, { useState, useRef, useEffect } from 'react'
import { Play, Pause, Volume2, VolumeX, Monitor, Maximize, Download } from 'lucide-react'
import './PreviewArea.css'

const PreviewArea = ({ referenceImage, isGenerating, progress }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [generatedVideo, setGeneratedVideo] = useState(null)
  const videoRef = useRef(null)
  const previewRef = useRef(null)

  useEffect(() => {
    if (progress === 100 && !generatedVideo) {
      // Simulate generated video (in real app, this would come from AI service)
      setGeneratedVideo('/api/placeholder-video.mp4')
    }
  }, [progress, generatedVideo])

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) {
      await previewRef.current.requestFullscreen()
      setIsFullscreen(true)
    } else {
      await document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  const downloadVideo = () => {
    if (generatedVideo) {
      const link = document.createElement('a')
      link.href = generatedVideo
      link.download = 'omniavatar-generated.mp4'
      link.click()
    }
  }

  return (
    <div className="preview-area" ref={previewRef}>
      <div className="preview-header">
        <h2><Monitor size={20} /> Real-time Preview</h2>
        <div className="preview-controls">
          {generatedVideo && (
            <>
              <button onClick={downloadVideo} className="control-btn" title="Download video">
                <Download size={18} />
              </button>
              <button onClick={toggleFullscreen} className="control-btn" title="Fullscreen">
                <Maximize size={18} />
              </button>
            </>
          )}
        </div>
      </div>

      <div className="preview-container">
        {!referenceImage && !isGenerating && !generatedVideo && (
          <div className="preview-placeholder">
            <Monitor size={64} />
            <h3>Preview Area</h3>
            <p>Upload a reference image to see your avatar preview</p>
          </div>
        )}

        {referenceImage && !isGenerating && !generatedVideo && (
          <div className="reference-preview">
            <img 
              src={URL.createObjectURL(referenceImage)} 
              alt="Reference" 
              className="reference-image"
            />
            <div className="preview-overlay">
              <h4>Reference Image</h4>
              <p>Ready for avatar generation</p>
            </div>
          </div>
        )}

        {isGenerating && (
          <div className="generation-preview">
            <div className="generation-animation">
              <div className="pulse-ring"></div>
              <div className="pulse-ring delay-1"></div>
              <div className="pulse-ring delay-2"></div>
              <Monitor size={48} />
            </div>
            <h4>Generating Avatar...</h4>
            <p>AI is creating your talking avatar</p>
            <div className="generation-progress">
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <span className="progress-text">{progress}%</span>
            </div>
          </div>
        )}

        {generatedVideo && (
          <div className="video-preview">
            <video
              ref={videoRef}
              src={generatedVideo}
              className="generated-video"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              loop
            />
            
            <div className="video-controls">
              <button onClick={togglePlayPause} className="play-btn">
                {isPlaying ? <Pause size={24} /> : <Play size={24} />}
              </button>
              
              <button onClick={toggleMute} className="mute-btn">
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>

              <div className="video-info">
                <span>Generated Avatar</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="preview-features">
        <div className="feature-item">
          <div className="feature-icon">🎭</div>
          <div className="feature-text">
            <strong>Full-body Animation</strong>
            <p>Complete avatar with facial expressions and gestures</p>
          </div>
        </div>
        
        <div className="feature-item">
          <div className="feature-icon">🗣️</div>
          <div className="feature-text">
            <strong>Lip-sync Technology</strong>
            <p>Precise mouth movements matching audio</p>
          </div>
        </div>
        
        <div className="feature-item">
          <div className="feature-icon">🎬</div>
          <div className="feature-text">
            <strong>Studio Quality</strong>
            <p>Professional-grade avatar generation</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PreviewArea