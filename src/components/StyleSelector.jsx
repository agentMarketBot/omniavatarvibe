import React from 'react'
import { Mic, Monitor, Users, Coffee, Briefcase, Video } from 'lucide-react'
import './StyleSelector.css'

const StyleSelector = ({ selectedStyle, onStyleChange }) => {
  const avatarStyles = [
    {
      id: 'podcast-host',
      name: 'Podcast Host',
      icon: <Mic size={24} />,
      description: 'Casual, conversational style perfect for podcasting',
      features: ['Relaxed posture', 'Natural gestures', 'Warm expressions'],
      background: 'Studio or home office setting',
      lighting: 'Warm, intimate lighting'
    },
    {
      id: 'presenter',
      name: 'Professional Presenter',
      icon: <Monitor size={24} />,
      description: 'Polished, authoritative style for business presentations',
      features: ['Confident stance', 'Purposeful gestures', 'Professional attire'],
      background: 'Corporate or conference setting',
      lighting: 'Bright, professional lighting'
    },
    {
      id: 'casual-speaker',
      name: 'Casual Speaker',
      icon: <Coffee size={24} />,
      description: 'Friendly, approachable style for informal content',
      features: ['Relaxed demeanor', 'Animated expressions', 'Comfortable clothing'],
      background: 'Casual indoor environment',
      lighting: 'Natural, soft lighting'
    },
    {
      id: 'educator',
      name: 'Educator/Instructor',
      icon: <Users size={24} />,
      description: 'Clear, engaging style optimized for teaching',
      features: ['Clear articulation', 'Educational gestures', 'Encouraging expressions'],
      background: 'Classroom or educational setting',
      lighting: 'Even, clear lighting'
    },
    {
      id: 'executive',
      name: 'Executive Speaker',
      icon: <Briefcase size={24} />,
      description: 'Leadership presence for corporate communications',
      features: ['Authoritative posture', 'Strategic gestures', 'Executive presence'],
      background: 'Boardroom or office environment',
      lighting: 'Professional studio lighting'
    },
    {
      id: 'content-creator',
      name: 'Content Creator',
      icon: <Video size={24} />,
      description: 'Dynamic, engaging style for social media content',
      features: ['Energetic movements', 'Expressive gestures', 'Trendy appearance'],
      background: 'Creative or colorful setting',
      lighting: 'Vibrant, dynamic lighting'
    }
  ]

  return (
    <div className="style-selector">
      <h2>🎨 Avatar Style</h2>
      <p>Choose the presentation style that best fits your content</p>

      <div className="styles-grid">
        {avatarStyles.map((style) => (
          <div
            key={style.id}
            className={`style-card ${selectedStyle === style.id ? 'selected' : ''}`}
            onClick={() => onStyleChange(style.id)}
          >
            <div className="style-header">
              <div className="style-icon">{style.icon}</div>
              <div className="style-name">{style.name}</div>
              {selectedStyle === style.id && (
                <div className="selected-indicator">✓</div>
              )}
            </div>

            <p className="style-description">{style.description}</p>

            <div className="style-features">
              <h4>Key Features:</h4>
              <ul>
                {style.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>

            <div className="style-details">
              <div className="detail-item">
                <strong>Background:</strong>
                <span>{style.background}</span>
              </div>
              <div className="detail-item">
                <strong>Lighting:</strong>
                <span>{style.lighting}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="style-comparison">
        <h3>📊 Style Comparison</h3>
        <div className="comparison-table">
          <div className="comparison-header">
            <div>Style</div>
            <div>Formality</div>
            <div>Energy Level</div>
            <div>Best For</div>
          </div>
          
          <div className="comparison-row">
            <div>Podcast Host</div>
            <div className="level casual">Casual</div>
            <div className="level medium">Medium</div>
            <div>Audio content, interviews</div>
          </div>
          
          <div className="comparison-row">
            <div>Professional Presenter</div>
            <div className="level formal">Formal</div>
            <div className="level medium">Medium</div>
            <div>Business presentations</div>
          </div>
          
          <div className="comparison-row">
            <div>Casual Speaker</div>
            <div className="level casual">Casual</div>
            <div className="level low">Low</div>
            <div>Informal videos, tutorials</div>
          </div>
          
          <div className="comparison-row">
            <div>Educator</div>
            <div className="level semi-formal">Semi-formal</div>
            <div className="level medium">Medium</div>
            <div>Training, educational content</div>
          </div>
          
          <div className="comparison-row">
            <div>Executive</div>
            <div className="level formal">Formal</div>
            <div className="level low">Low</div>
            <div>Corporate communications</div>
          </div>
          
          <div className="comparison-row">
            <div>Content Creator</div>
            <div className="level casual">Casual</div>
            <div className="level high">High</div>
            <div>Social media, entertainment</div>
          </div>
        </div>
      </div>

      <div className="style-preview">
        <h3>🔍 Selected Style Preview</h3>
        <div className="selected-style-info">
          {avatarStyles.find(style => style.id === selectedStyle) && (
            <div className="style-preview-card">
              <div className="preview-header">
                {avatarStyles.find(style => style.id === selectedStyle).icon}
                <h4>{avatarStyles.find(style => style.id === selectedStyle).name}</h4>
              </div>
              <p>{avatarStyles.find(style => style.id === selectedStyle).description}</p>
              <div className="preview-settings">
                <span>This style will influence gesture patterns, facial expressions, and overall avatar behavior.</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default StyleSelector