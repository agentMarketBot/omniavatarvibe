import React from 'react'
import { Mic, Presentation, Coffee, Briefcase, Palette, Zap } from 'lucide-react'

const StyleSelection = ({ selectedStyle, onStyleChange }) => {
  const styles = [
    {
      id: 'podcast_host',
      name: 'Podcast Host',
      icon: Mic,
      description: 'Professional broadcaster with engaging personality',
      characteristics: ['Confident posture', 'Clear articulation', 'Engaging gestures', 'Eye contact']
    },
    {
      id: 'presenter',
      name: 'Presenter',
      icon: Presentation,
      description: 'Business presenter for meetings and conferences',
      characteristics: ['Formal posture', 'Clear delivery', 'Professional gestures', 'Authoritative presence']
    },
    {
      id: 'casual_speaker',
      name: 'Casual Speaker',
      icon: Coffee,
      description: 'Friendly conversationalist for informal content',
      characteristics: ['Relaxed posture', 'Natural gestures', 'Warm expressions', 'Approachable demeanor']
    },
    {
      id: 'corporate_executive',
      name: 'Corporate Executive',
      icon: Briefcase,
      description: 'Executive presence for business communications',
      characteristics: ['Commanding posture', 'Strategic gestures', 'Confident delivery', 'Leadership presence']
    },
    {
      id: 'creative_storyteller',
      name: 'Creative Storyteller',
      icon: Palette,
      description: 'Expressive narrator for creative content',
      characteristics: ['Dynamic movements', 'Expressive gestures', 'Emotional range', 'Animated delivery']
    },
    {
      id: 'energetic_motivator',
      name: 'Energetic Motivator',
      icon: Zap,
      description: 'High-energy speaker for motivational content',
      characteristics: ['Dynamic posture', 'Enthusiastic gestures', 'Inspiring presence', 'High energy']
    }
  ]

  return (
    <div className="space-y-4">
      <h3 className="section-title">Avatar Style</h3>
      
      <div className="grid grid-cols-1 gap-3">
        {styles.map((style) => {
          const Icon = style.icon
          const isSelected = selectedStyle === style.id
          
          return (
            <div
              key={style.id}
              onClick={() => onStyleChange(style.id)}
              className={`cursor-pointer p-4 border rounded-lg transition-all ${
                isSelected 
                  ? 'border-blue-500 bg-blue-500 bg-opacity-10' 
                  : 'border-gray-600 hover:border-gray-500'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded ${isSelected ? 'bg-blue-500' : 'bg-gray-700'}`}>
                  <Icon size={20} className="text-white" />
                </div>
                
                <div className="flex-1">
                  <h4 className="font-medium text-white mb-1">{style.name}</h4>
                  <p className="text-sm text-gray-400 mb-2">{style.description}</p>
                  
                  <div className="flex flex-wrap gap-1">
                    {style.characteristics.map((char, index) => (
                      <span
                        key={index}
                        className="text-xs px-2 py-1 bg-gray-700 text-gray-300 rounded"
                      >
                        {char}
                      </span>
                    ))}
                  </div>
                </div>
                
                {isSelected && (
                  <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      <div className="control-group">
        <label className="control-label">Custom Style Notes</label>
        <textarea
          placeholder="Add specific style preferences or modifications..."
          className="control-input h-20 text-sm"
        />
        <p className="text-xs text-gray-500 mt-1">
          Optional: Describe any specific modifications to the selected style
        </p>
      </div>
    </div>
  )
}

export default StyleSelection