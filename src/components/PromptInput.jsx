import React, { useState } from 'react'
import { MessageSquare, Sparkles, RotateCcw } from 'lucide-react'
import './PromptInput.css'

const PromptInput = ({ prompt, setPrompt }) => {
  const [charCount, setCharCount] = useState(prompt.length)
  const maxChars = 500

  const promptSuggestions = [
    "Professional presenter speaking with confident gestures and warm expressions",
    "Casual podcast host with animated hand movements and friendly demeanor", 
    "Energetic speaker with expressive facial movements and dynamic posture",
    "Calm and composed instructor with subtle gestures and focused expression",
    "Enthusiastic content creator with vibrant expressions and engaging movements",
    "Executive giving a boardroom presentation with authoritative presence"
  ]

  const handlePromptChange = (e) => {
    const value = e.target.value
    if (value.length <= maxChars) {
      setPrompt(value)
      setCharCount(value.length)
    }
  }

  const useSuggestion = (suggestion) => {
    setPrompt(suggestion)
    setCharCount(suggestion.length)
  }

  const clearPrompt = () => {
    setPrompt('')
    setCharCount(0)
  }

  return (
    <div className="prompt-input">
      <div className="prompt-header">
        <h2><MessageSquare size={20} /> Prompt Input</h2>
        <p>Describe the avatar's expressions, gestures, and background scene</p>
      </div>

      <div className="input-container">
        <textarea
          value={prompt}
          onChange={handlePromptChange}
          placeholder="Describe how you want your avatar to behave... e.g., 'Professional presenter with confident gestures, warm smile, standing in a modern office background with soft lighting'"
          className="prompt-textarea"
          rows={4}
        />
        
        <div className="input-footer">
          <span className={`char-count ${charCount > maxChars * 0.9 ? 'warning' : ''}`}>
            {charCount}/{maxChars}
          </span>
          {prompt && (
            <button 
              onClick={clearPrompt}
              className="clear-btn"
              title="Clear prompt"
            >
              <RotateCcw size={16} />
            </button>
          )}
        </div>
      </div>

      <div className="suggestions-section">
        <h3><Sparkles size={16} /> Quick Suggestions</h3>
        <div className="suggestions-grid">
          {promptSuggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => useSuggestion(suggestion)}
              className="suggestion-chip"
              title="Click to use this suggestion"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>

      <div className="prompt-tips">
        <h4>🎯 Effective Prompt Tips:</h4>
        <div className="tips-grid">
          <div className="tip-category">
            <strong>Expressions:</strong>
            <span>confident, warm, enthusiastic, calm, focused, friendly</span>
          </div>
          <div className="tip-category">
            <strong>Gestures:</strong>
            <span>animated hands, subtle movements, pointing, open palms</span>
          </div>
          <div className="tip-category">
            <strong>Backgrounds:</strong>
            <span>office, studio, home, outdoor, minimalist, colorful</span>
          </div>
          <div className="tip-category">
            <strong>Lighting:</strong>
            <span>soft, bright, dramatic, natural, warm, professional</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PromptInput