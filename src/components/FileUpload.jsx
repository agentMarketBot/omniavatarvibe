import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, Image, Music, X } from 'lucide-react'

const FileUpload = ({ onImageUpload, onAudioUpload, referenceImage, audioFile }) => {
  const [draggedType, setDraggedType] = useState(null)

  const onImageDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0]
    if (file) {
      onImageUpload(file)
    }
  }, [onImageUpload])

  const onAudioDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0]
    if (file) {
      onAudioUpload(file)
    }
  }, [onAudioUpload])

  const {
    getRootProps: getImageRootProps,
    getInputProps: getImageInputProps,
    isDragActive: isImageDragActive
  } = useDropzone({
    onDrop: onImageDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    multiple: false
  })

  const {
    getRootProps: getAudioRootProps,
    getInputProps: getAudioInputProps,
    isDragActive: isAudioDragActive
  } = useDropzone({
    onDrop: onAudioDrop,
    accept: {
      'audio/*': ['.mp3', '.wav', '.m4a', '.ogg']
    },
    multiple: false
  })

  const removeImage = () => {
    onImageUpload(null)
  }

  const removeAudio = () => {
    onAudioUpload(null)
  }

  return (
    <div className="space-y-4">
      <h3 className="section-title">Upload Files</h3>
      
      {/* Reference Image Upload */}
      <div className="control-group">
        <label className="control-label">Reference Image</label>
        {referenceImage ? (
          <div className="relative">
            <img 
              src={URL.createObjectURL(referenceImage)} 
              alt="Reference" 
              className="w-full h-32 object-cover rounded border"
            />
            <button 
              onClick={removeImage}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
            >
              <X size={16} />
            </button>
            <p className="text-sm text-gray-400 mt-2">{referenceImage.name}</p>
          </div>
        ) : (
          <div 
            {...getImageRootProps()} 
            className={`upload-zone ${isImageDragActive ? 'dragover' : ''}`}
          >
            <input {...getImageInputProps()} />
            <Image size={48} className="mx-auto mb-2 text-gray-400" />
            <p className="text-gray-300">
              {isImageDragActive 
                ? 'Drop image here...' 
                : 'Drag & drop a reference image, or click to select'
              }
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Supports: JPG, PNG, GIF, WebP
            </p>
          </div>
        )}
      </div>

      {/* Audio File Upload */}
      <div className="control-group">
        <label className="control-label">Audio File</label>
        {audioFile ? (
          <div className="relative">
            <div className="bg-gray-700 p-4 rounded border">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Music size={20} className="text-blue-400" />
                  <span className="text-white">{audioFile.name}</span>
                </div>
                <button 
                  onClick={removeAudio}
                  className="bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                >
                  <X size={16} />
                </button>
              </div>
              <audio controls className="w-full mt-2">
                <source src={URL.createObjectURL(audioFile)} type={audioFile.type} />
                Your browser does not support the audio element.
              </audio>
            </div>
          </div>
        ) : (
          <div 
            {...getAudioRootProps()} 
            className={`upload-zone ${isAudioDragActive ? 'dragover' : ''}`}
          >
            <input {...getAudioInputProps()} />
            <Music size={48} className="mx-auto mb-2 text-gray-400" />
            <p className="text-gray-300">
              {isAudioDragActive 
                ? 'Drop audio file here...' 
                : 'Drag & drop an audio file, or click to select'
              }
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Supports: MP3, WAV, M4A, OGG
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default FileUpload