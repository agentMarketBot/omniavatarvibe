import React, { useState, useEffect } from 'react'
import { Play, Download, Trash2, Copy, Filter, Search, Calendar, Star } from 'lucide-react'
import './Gallery.css'

const Gallery = () => {
  const [avatars, setAvatars] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterBy, setFilterBy] = useState('all')
  const [sortBy, setSortBy] = useState('newest')
  const [selectedAvatar, setSelectedAvatar] = useState(null)

  // Mock data for demonstration
  useEffect(() => {
    const mockAvatars = [
      {
        id: 1,
        name: 'Professional Presenter',
        thumbnail: '/api/placeholder/300/200',
        videoUrl: '/api/placeholder-video.mp4',
        createdAt: '2024-01-15',
        duration: '2:34',
        style: 'presenter',
        resolution: '1080p',
        fileSize: '45.2 MB',
        isFavorite: true,
        settings: {
          expressions: 60,
          gestures: 55,
          movement: 40,
          style: 'presenter'
        }
      },
      {
        id: 2,
        name: 'Casual Podcast Host',
        thumbnail: '/api/placeholder/300/200',
        videoUrl: '/api/placeholder-video.mp4',
        createdAt: '2024-01-12',
        duration: '4:18',
        style: 'podcast-host',
        resolution: '720p',
        fileSize: '28.7 MB',
        isFavorite: false,
        settings: {
          expressions: 70,
          gestures: 80,
          movement: 60,
          style: 'podcast-host'
        }
      },
      {
        id: 3,
        name: 'Content Creator',
        thumbnail: '/api/placeholder/300/200',
        videoUrl: '/api/placeholder-video.mp4',
        createdAt: '2024-01-10',
        duration: '1:42',
        style: 'content-creator',
        resolution: '4k',
        fileSize: '89.1 MB',
        isFavorite: true,
        settings: {
          expressions: 85,
          gestures: 90,
          movement: 75,
          style: 'content-creator'
        }
      }
    ]
    setAvatars(mockAvatars)
  }, [])

  const filteredAndSortedAvatars = avatars
    .filter(avatar => {
      const matchesSearch = avatar.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesFilter = filterBy === 'all' || avatar.style === filterBy || 
                           (filterBy === 'favorites' && avatar.isFavorite)
      return matchesSearch && matchesFilter
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt)
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt)
        case 'name':
          return a.name.localeCompare(b.name)
        case 'duration':
          return parseFloat(b.duration) - parseFloat(a.duration)
        default:
          return 0
      }
    })

  const toggleFavorite = (id) => {
    setAvatars(prev => prev.map(avatar => 
      avatar.id === id ? { ...avatar, isFavorite: !avatar.isFavorite } : avatar
    ))
  }

  const deleteAvatar = (id) => {
    if (confirm('Are you sure you want to delete this avatar?')) {
      setAvatars(prev => prev.filter(avatar => avatar.id !== id))
    }
  }

  const duplicateSettings = (avatar) => {
    // In a real app, this would apply the settings to the creation form
    alert(`Settings for "${avatar.name}" copied to creation form!`)
  }

  const downloadVideo = (avatar) => {
    // In a real app, this would trigger the download
    const link = document.createElement('a')
    link.href = avatar.videoUrl
    link.download = `${avatar.name}.mp4`
    link.click()
  }

  return (
    <div className="gallery">
      <div className="gallery-header">
        <h2>🖼️ Avatar Gallery</h2>
        <p>Manage and reuse your generated avatars</p>
      </div>

      <div className="gallery-controls">
        <div className="search-bar">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search avatars..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filters">
          <div className="filter-group">
            <Filter size={16} />
            <select 
              value={filterBy} 
              onChange={(e) => setFilterBy(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Styles</option>
              <option value="favorites">Favorites</option>
              <option value="podcast-host">Podcast Host</option>
              <option value="presenter">Presenter</option>
              <option value="content-creator">Content Creator</option>
              <option value="educator">Educator</option>
            </select>
          </div>

          <div className="sort-group">
            <Calendar size={16} />
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="name">Name (A-Z)</option>
              <option value="duration">Duration</option>
            </select>
          </div>
        </div>
      </div>

      <div className="gallery-stats">
        <div className="stat-item">
          <span className="stat-number">{avatars.length}</span>
          <span className="stat-label">Total Avatars</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{avatars.filter(a => a.isFavorite).length}</span>
          <span className="stat-label">Favorites</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">
            {(avatars.reduce((sum, a) => sum + parseFloat(a.fileSize), 0)).toFixed(1)} MB
          </span>
          <span className="stat-label">Storage Used</span>
        </div>
      </div>

      {filteredAndSortedAvatars.length === 0 ? (
        <div className="empty-gallery">
          <div className="empty-icon">🎭</div>
          <h3>No avatars found</h3>
          <p>
            {searchTerm || filterBy !== 'all' 
              ? 'Try adjusting your search or filter criteria'
              : 'Start creating your first avatar to see it here!'
            }
          </p>
        </div>
      ) : (
        <div className="avatars-grid">
          {filteredAndSortedAvatars.map(avatar => (
            <div key={avatar.id} className="avatar-card">
              <div className="avatar-thumbnail">
                <img src={avatar.thumbnail} alt={avatar.name} />
                <div className="thumbnail-overlay">
                  <button 
                    className="play-btn"
                    onClick={() => setSelectedAvatar(avatar)}
                  >
                    <Play size={24} />
                  </button>
                  <div className="duration-badge">{avatar.duration}</div>
                </div>
                <button 
                  className={`favorite-btn ${avatar.isFavorite ? 'active' : ''}`}
                  onClick={() => toggleFavorite(avatar.id)}
                >
                  <Star size={16} />
                </button>
              </div>

              <div className="avatar-info">
                <h4 className="avatar-name">{avatar.name}</h4>
                <div className="avatar-meta">
                  <span className="meta-item">{avatar.resolution}</span>
                  <span className="meta-item">{avatar.fileSize}</span>
                  <span className="meta-item">{avatar.createdAt}</span>
                </div>
                <div className="style-tag">{avatar.style.replace('-', ' ')}</div>
              </div>

              <div className="avatar-actions">
                <button 
                  className="action-btn primary"
                  onClick={() => setSelectedAvatar(avatar)}
                  title="Preview"
                >
                  <Play size={16} />
                </button>
                <button 
                  className="action-btn secondary"
                  onClick={() => downloadVideo(avatar)}
                  title="Download"
                >
                  <Download size={16} />
                </button>
                <button 
                  className="action-btn secondary"
                  onClick={() => duplicateSettings(avatar)}
                  title="Copy Settings"
                >
                  <Copy size={16} />
                </button>
                <button 
                  className="action-btn danger"
                  onClick={() => deleteAvatar(avatar.id)}
                  title="Delete"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedAvatar && (
        <div className="modal-overlay" onClick={() => setSelectedAvatar(null)}>
          <div className="avatar-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{selectedAvatar.name}</h3>
              <button 
                className="close-btn"
                onClick={() => setSelectedAvatar(null)}
              >
                ×
              </button>
            </div>
            
            <div className="modal-content">
              <div className="video-container">
                <video 
                  src={selectedAvatar.videoUrl} 
                  controls 
                  autoPlay
                  className="modal-video"
                />
              </div>
              
              <div className="modal-info">
                <div className="info-section">
                  <h4>Details</h4>
                  <div className="info-grid">
                    <div className="info-item">
                      <strong>Created:</strong>
                      <span>{selectedAvatar.createdAt}</span>
                    </div>
                    <div className="info-item">
                      <strong>Duration:</strong>
                      <span>{selectedAvatar.duration}</span>
                    </div>
                    <div className="info-item">
                      <strong>Resolution:</strong>
                      <span>{selectedAvatar.resolution}</span>
                    </div>
                    <div className="info-item">
                      <strong>File Size:</strong>
                      <span>{selectedAvatar.fileSize}</span>
                    </div>
                  </div>
                </div>

                <div className="info-section">
                  <h4>Settings Used</h4>
                  <div className="settings-preview">
                    <div className="setting-item">
                      <span>Expressions: {selectedAvatar.settings.expressions}%</span>
                    </div>
                    <div className="setting-item">
                      <span>Gestures: {selectedAvatar.settings.gestures}%</span>
                    </div>
                    <div className="setting-item">
                      <span>Movement: {selectedAvatar.settings.movement}%</span>
                    </div>
                    <div className="setting-item">
                      <span>Style: {selectedAvatar.settings.style}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-actions">
              <button 
                className="modal-btn primary"
                onClick={() => downloadVideo(selectedAvatar)}
              >
                <Download size={16} />
                Download
              </button>
              <button 
                className="modal-btn secondary"
                onClick={() => duplicateSettings(selectedAvatar)}
              >
                <Copy size={16} />
                Use These Settings
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Gallery