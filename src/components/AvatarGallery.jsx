import React, { useState, useEffect } from 'react'
import { Play, Download, Copy, Trash2, Clock, Search, Filter } from 'lucide-react'
import { avatarService } from '../lib/supabase'

const AvatarGallery = ({ onReuseSettings, onLoadAvatar }) => {
  const [avatars, setAvatars] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [sortBy, setSortBy] = useState('created_at')

  useEffect(() => {
    loadAvatars()
  }, [])

  const loadAvatars = async () => {
    try {
      setLoading(true)
      const data = await avatarService.getAvatars()
      setAvatars(data)
    } catch (error) {
      console.error('Error loading avatars:', error)
    } finally {
      setLoading(false)
    }
  }

  const deleteAvatar = async (id) => {
    if (confirm('Are you sure you want to delete this avatar?')) {
      try {
        await avatarService.deleteAvatar(id)
        setAvatars(prev => prev.filter(avatar => avatar.id !== id))
      } catch (error) {
        console.error('Error deleting avatar:', error)
      }
    }
  }

  const copySettings = (avatar) => {
    onReuseSettings({
      prompt: avatar.prompt,
      style: avatar.style,
      settings: avatar.settings
    })
  }

  const filteredAvatars = avatars
    .filter(avatar => {
      const matchesSearch = avatar.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           avatar.prompt?.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesFilter = filterStatus === 'all' || avatar.status === filterStatus
      return matchesSearch && matchesFilter
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name)
        case 'status':
          return a.status.localeCompare(b.status)
        case 'created_at':
        default:
          return new Date(b.created_at) - new Date(a.created_at)
      }
    })

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-green-400'
      case 'processing':
        return 'text-blue-400'
      case 'failed':
        return 'text-red-400'
      default:
        return 'text-gray-400'
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <h3 className="section-title">Avatar Gallery</h3>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin w-8 h-8 border-2 border-blue-400 border-t-transparent rounded-full"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="section-title">Avatar Gallery</h3>
        <span className="text-sm text-gray-400">{avatars.length} avatars</span>
      </div>

      {/* Search and Filters */}
      <div className="space-y-3">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search avatars..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="control-input pl-10"
          />
        </div>

        <div className="flex space-x-2">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="control-input flex-1 text-sm"
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="processing">Processing</option>
            <option value="failed">Failed</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="control-input flex-1 text-sm"
          >
            <option value="created_at">Latest First</option>
            <option value="name">Name A-Z</option>
            <option value="status">Status</option>
          </select>
        </div>
      </div>

      {/* Gallery Grid */}
      {filteredAvatars.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <div className="w-24 h-24 mx-auto mb-4 bg-gray-700 rounded-lg flex items-center justify-center">
            <Play size={32} className="text-gray-500" />
          </div>
          <p className="text-lg font-medium">No avatars found</p>
          <p className="text-sm mt-1">
            {searchTerm || filterStatus !== 'all' 
              ? 'Try adjusting your search or filters' 
              : 'Generate your first avatar to see it here'
            }
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredAvatars.map((avatar) => (
            <div
              key={avatar.id}
              className="bg-gray-800 rounded-lg border border-gray-600 p-4 hover:border-gray-500 transition-colors"
            >
              <div className="flex items-start space-x-4">
                {/* Thumbnail */}
                <div className="w-24 h-16 bg-gray-700 rounded-lg flex items-center justify-center flex-shrink-0">
                  {avatar.thumbnail_url ? (
                    <img 
                      src={avatar.thumbnail_url} 
                      alt={avatar.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <Play size={20} className="text-gray-400" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-white truncate">{avatar.name}</h4>
                      <p className="text-sm text-gray-400 mt-1 line-clamp-2">
                        {avatar.prompt || 'No prompt provided'}
                      </p>
                      
                      <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                        <span className="flex items-center space-x-1">
                          <Clock size={12} />
                          <span>{formatDate(avatar.created_at)}</span>
                        </span>
                        <span className={`capitalize ${getStatusColor(avatar.status)}`}>
                          {avatar.status}
                        </span>
                        {avatar.style && (
                          <span className="bg-gray-700 px-2 py-1 rounded text-xs">
                            {avatar.style.replace('_', ' ')}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-1 ml-4">
                      {avatar.status === 'completed' && avatar.video_url && (
                        <button
                          onClick={() => onLoadAvatar(avatar)}
                          className="p-2 text-blue-400 hover:bg-blue-400 hover:bg-opacity-20 rounded"
                          title="Load in preview"
                        >
                          <Play size={16} />
                        </button>
                      )}

                      <button
                        onClick={() => copySettings(avatar)}
                        className="p-2 text-green-400 hover:bg-green-400 hover:bg-opacity-20 rounded"
                        title="Copy settings"
                      >
                        <Copy size={16} />
                      </button>

                      {avatar.status === 'completed' && avatar.video_url && (
                        <a
                          href={avatar.video_url}
                          download={avatar.name}
                          className="p-2 text-purple-400 hover:bg-purple-400 hover:bg-opacity-20 rounded"
                          title="Download video"
                        >
                          <Download size={16} />
                        </a>
                      )}

                      <button
                        onClick={() => deleteAvatar(avatar.id)}
                        className="p-2 text-red-400 hover:bg-red-400 hover:bg-opacity-20 rounded"
                        title="Delete avatar"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Progress bar for processing avatars */}
                  {avatar.status === 'processing' && (
                    <div className="mt-3">
                      <div className="flex justify-between text-xs text-gray-400 mb-1">
                        <span>Processing...</span>
                        <span>{avatar.progress || 0}%</span>
                      </div>
                      <div className="progress-bar h-1">
                        <div 
                          className="progress-fill h-full" 
                          style={{ width: `${avatar.progress || 0}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Quick Stats */}
      {avatars.length > 0 && (
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-600">
          <h4 className="text-sm font-medium text-white mb-2">Gallery Stats</h4>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-green-400">
                {avatars.filter(a => a.status === 'completed').length}
              </div>
              <div className="text-xs text-gray-400">Completed</div>
            </div>
            <div>
              <div className="text-lg font-bold text-blue-400">
                {avatars.filter(a => a.status === 'processing').length}
              </div>
              <div className="text-xs text-gray-400">Processing</div>
            </div>
            <div>
              <div className="text-lg font-bold text-red-400">
                {avatars.filter(a => a.status === 'failed').length}
              </div>
              <div className="text-xs text-gray-400">Failed</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AvatarGallery