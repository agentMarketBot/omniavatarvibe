import React, { useState } from 'react'
import { Wand2, RotateCcw } from 'lucide-react'

const PromptInput = ({ prompt, onPromptChange, onGenerate, isGenerating }) => {
  const [suggestions] = useState([
    "Professional podcast host with confident gestures",
    "Friendly presenter with warm smile and open body language",
    "Casual speaker with relaxed posture and animated expressions",
    "Corporate executive with formal posture and subtle movements",
    "Creative storyteller with expressive hand gestures",
    "Energetic motivational speaker with dynamic movements"
  ])

  const handleSuggestionClick = (suggestion) => {
    onPromptChange(suggestion)
  }

  const clearPrompt = () => {
    onPromptChange('')
  }

  return (
    <div className="space-y-4">
      <h3 className="section-title">Avatar Prompt</h3>
      
      <div className="control-group">
        <label className="control-label">
          Describe your avatar's expressions, gestures, and scene
        </label>
        <div className="relative">
          <textarea
            value={prompt}
            onChange={(e) => onPromptChange(e.target.value)}
            placeholder="e.g., Professional podcast host with confident gestures, warm smile, sitting in a modern studio with soft lighting..."
            className="control-input h-32 resize-none"
          />
          {prompt && (
            <button
              onClick={clearPrompt}
              className="absolute top-2 right-2 text-gray-400 hover:text-white"
            >
              <RotateCcw size={16} />
            </button>
          )}
        </div>
        <div className="text-sm text-gray-400 mt-1">
          {prompt.length}/500 characters
        </div>
      </div>

      <div className="control-group">
        <label className="control-label">Quick Suggestions</label>
        <div className="grid grid-cols-1 gap-2">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="text-left p-2 text-sm bg-gray-700 hover:bg-gray-600 rounded border border-gray-600 transition-colors"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={onGenerate}
        disabled={isGenerating || !prompt.trim()}
        className={`button w-full flex items-center justify-center space-x-2 ${
          isGenerating ? 'opacity-50' : ''
        }`}
      >
        <Wand2 size={20} />
        <span>{isGenerating ? 'Generating Avatar...' : 'Generate Avatar'}</span>
      </button>
    </div>
  )
}

export default PromptInput