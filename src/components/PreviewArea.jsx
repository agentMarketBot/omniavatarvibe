import React, { useState, useRef } from 'react'
import { Play, Pause, Volume2, VolumeX, Maximize, Download } from 'lucide-react'

const PreviewArea = ({ 
  isGenerating, 
  progress, 
  generatedVideo, 
  onExport,
  isExporting 
}) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const videoRef = useRef(null)
  const containerRef = useRef(null)

  const togglePlay = () => {
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

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen()
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      }
    }
    setIsFullscreen(!isFullscreen)
  }

  const handleVideoEnded = () => {
    setIsPlaying(false)
  }

  const renderPlaceholder = () => (
    <div className="flex flex-col items-center justify-center h-full text-gray-400">
      <div className="w-24 h-24 border-2 border-dashed border-gray-600 rounded-lg flex items-center justify-center mb-4">
        <Play size={32} />
      </div>
      <p className="text-lg font-medium">No avatar generated yet</p>
      <p className="text-sm text-gray-500 mt-1">
        Upload files and click generate to see your avatar
      </p>
    </div>
  )

  const renderProgress = () => (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="w-32 h-32 relative mb-6">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
          <path
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="#374151"
            strokeWidth="2"
          />
          <path
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="#646cff"
            strokeWidth="2"
            strokeDasharray={`${progress}, 100`}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-white">{Math.round(progress)}%</span>
        </div>
      </div>
      <p className="text-lg font-medium text-white mb-2">Generating Avatar</p>
      <p className="text-sm text-gray-400 text-center">
        Processing your reference image and audio...
        <br />
        This may take a few minutes
      </p>
    </div>
  )

  const renderVideo = () => (
    <div className="relative h-full group">
      <video
        ref={videoRef}
        src={generatedVideo}
        className="w-full h-full object-contain rounded-lg"
        onEnded={handleVideoEnded}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      
      {/* Video Controls Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center">
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex space-x-4">
          <button
            onClick={togglePlay}
            className="bg-black bg-opacity-70 text-white p-3 rounded-full hover:bg-opacity-90 transition-all"
          >
            {isPlaying ? <Pause size={24} /> : <Play size={24} />}
          </button>
          
          <button
            onClick={toggleMute}
            className="bg-black bg-opacity-70 text-white p-3 rounded-full hover:bg-opacity-90 transition-all"
          >
            {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
          </button>
          
          <button
            onClick={toggleFullscreen}
            className="bg-black bg-opacity-70 text-white p-3 rounded-full hover:bg-opacity-90 transition-all"
          >
            <Maximize size={24} />
          </button>
        </div>
      </div>

      {/* Export Button */}
      <div className="absolute top-4 right-4">
        <button
          onClick={onExport}
          disabled={isExporting}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 disabled:opacity-50"
        >
          <Download size={16} />
          <span>{isExporting ? 'Exporting...' : 'Export'}</span>
        </button>
      </div>
    </div>
  )

  return (
    <div ref={containerRef} className="preview-area">
      {isGenerating ? renderProgress() : generatedVideo ? renderVideo() : renderPlaceholder()}
    </div>
  )
}

export default PreviewArea