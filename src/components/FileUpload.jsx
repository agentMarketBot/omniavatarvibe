import React, { useState, useRef } from 'react'
import { Upload, Image, Music, X } from 'lucide-react'
import './FileUpload.css'

const FileUpload = ({ onFileUpload }) => {
  const [dragActive, setDragActive] = useState({ image: false, audio: false })
  const [uploadedFiles, setUploadedFiles] = useState({ image: null, audio: null })
  const imageInputRef = useRef(null)
  const audioInputRef = useRef(null)

  const handleDrag = (e, type) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(prev => ({ ...prev, [type]: true }))
    } else if (e.type === 'dragleave') {
      setDragActive(prev => ({ ...prev, [type]: false }))
    }
  }

  const handleDrop = (e, type) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(prev => ({ ...prev, [type]: false }))
    
    const files = e.dataTransfer.files
    if (files && files[0]) {
      handleFileSelect(files[0], type)
    }
  }

  const handleFileSelect = (file, type) => {
    const allowedTypes = {
      image: ['image/jpeg', 'image/png', 'image/webp'],
      audio: ['audio/mpeg', 'audio/wav', 'audio/mp3', 'audio/m4a']
    }

    if (!allowedTypes[type].includes(file.type)) {
      alert(`Please select a valid ${type} file`)
      return
    }

    const maxSize = type === 'image' ? 10 * 1024 * 1024 : 50 * 1024 * 1024 // 10MB for images, 50MB for audio
    if (file.size > maxSize) {
      alert(`File size too large. Maximum ${type === 'image' ? '10MB' : '50MB'} allowed.`)
      return
    }

    setUploadedFiles(prev => ({ ...prev, [type]: file }))
    onFileUpload(type, file)
  }

  const removeFile = (type) => {
    setUploadedFiles(prev => ({ ...prev, [type]: null }))
    onFileUpload(type, null)
    if (type === 'image' && imageInputRef.current) {
      imageInputRef.current.value = ''
    }
    if (type === 'audio' && audioInputRef.current) {
      audioInputRef.current.value = ''
    }
  }

  const renderUploadArea = (type, icon, title, description, acceptTypes) => (
    <div className="upload-section">
      <h3>{title}</h3>
      <div
        className={`upload-area ${dragActive[type] ? 'drag-active' : ''} ${uploadedFiles[type] ? 'has-file' : ''}`}
        onDragEnter={(e) => handleDrag(e, type)}
        onDragLeave={(e) => handleDrag(e, type)}
        onDragOver={(e) => handleDrag(e, type)}
        onDrop={(e) => handleDrop(e, type)}
        onClick={() => type === 'image' ? imageInputRef.current?.click() : audioInputRef.current?.click()}
      >
        {uploadedFiles[type] ? (
          <div className="file-preview">
            {type === 'image' ? (
              <img 
                src={URL.createObjectURL(uploadedFiles[type])} 
                alt="Preview" 
                className="image-preview"
              />
            ) : (
              <div className="audio-preview">
                <Music className="audio-icon" />
                <audio controls src={URL.createObjectURL(uploadedFiles[type])} />
              </div>
            )}
            <div className="file-info">
              <span className="file-name">{uploadedFiles[type].name}</span>
              <span className="file-size">
                {(uploadedFiles[type].size / 1024 / 1024).toFixed(2)} MB
              </span>
            </div>
            <button 
              className="remove-file"
              onClick={(e) => {
                e.stopPropagation()
                removeFile(type)
              }}
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <div className="upload-placeholder">
            {icon}
            <p>{description}</p>
            <span className="upload-hint">Click to browse or drag & drop</span>
          </div>
        )}
        
        <input
          ref={type === 'image' ? imageInputRef : audioInputRef}
          type="file"
          accept={acceptTypes}
          onChange={(e) => e.target.files[0] && handleFileSelect(e.target.files[0], type)}
          style={{ display: 'none' }}
        />
      </div>
    </div>
  )

  return (
    <div className="file-upload">
      <h2>📁 Upload Files</h2>
      
      {renderUploadArea(
        'image',
        <Image size={48} />,
        'Reference Image',
        'Upload a clear photo of the person for avatar generation',
        'image/*'
      )}

      {renderUploadArea(
        'audio',
        <Music size={48} />,
        'Audio File',
        'Upload audio for the avatar to speak',
        'audio/*'
      )}

      <div className="upload-tips">
        <h4>💡 Tips for best results:</h4>
        <ul>
          <li>Use high-quality images (preferably 1024x1024 or higher)</li>
          <li>Ensure clear facial features and good lighting</li>
          <li>Audio should be clear with minimal background noise</li>
          <li>Supported formats: JPG, PNG, WebP for images; MP3, WAV, M4A for audio</li>
        </ul>
      </div>
    </div>
  )
}

export default FileUpload