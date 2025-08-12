import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database service functions
export const avatarService = {
  // Get all avatar projects for the current user
  async getUserProjects() {
    const { data, error } = await supabase
      .from('avatar_projects')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  // Create a new avatar project
  async createProject(projectData) {
    const { data, error } = await supabase
      .from('avatar_projects')
      .insert([{
        ...projectData,
        user_id: (await supabase.auth.getUser()).data.user?.id
      }])
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Update an existing avatar project
  async updateProject(id, updates) {
    const { data, error } = await supabase
      .from('avatar_projects')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Delete an avatar project
  async deleteProject(id) {
    const { error } = await supabase
      .from('avatar_projects')
      .delete()
      .eq('id', id)
    
    if (error) throw error
    return true
  },

  // Toggle favorite status
  async toggleFavorite(id, isFavorite) {
    const { data, error } = await supabase
      .from('avatar_projects')
      .update({ is_favorite: isFavorite })
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Get user statistics
  async getUserStats() {
    const { data, error } = await supabase
      .rpc('get_user_avatar_stats', {
        user_uuid: (await supabase.auth.getUser()).data.user?.id
      })
    
    if (error) throw error
    return data[0] || { total_projects: 0, favorite_projects: 0, total_storage_mb: 0, recent_projects: 0 }
  }
}

export const settingsService = {
  // Get all settings presets for the current user
  async getUserPresets() {
    const { data, error } = await supabase
      .from('avatar_settings_presets')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  // Get public settings presets
  async getPublicPresets() {
    const { data, error } = await supabase
      .from('avatar_settings_presets')
      .select('*')
      .eq('is_public', true)
      .order('usage_count', { ascending: false })
    
    if (error) throw error
    return data
  },

  // Create a new settings preset
  async createPreset(presetData) {
    const { data, error } = await supabase
      .from('avatar_settings_presets')
      .insert([{
        ...presetData,
        user_id: (await supabase.auth.getUser()).data.user?.id
      }])
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Update usage count for a preset
  async incrementUsage(id) {
    const { data, error } = await supabase
      .rpc('increment_preset_usage', { preset_id: id })
    
    if (error) throw error
    return data
  }
}

export const generationService = {
  // Create a new generation history entry
  async createGenerationHistory(projectId, aiModelVersion = 'v1.0') {
    const { data, error } = await supabase
      .from('generation_history')
      .insert([{
        user_id: (await supabase.auth.getUser()).data.user?.id,
        project_id: projectId,
        ai_model_version: aiModelVersion,
        status: 'pending',
        progress: 0
      }])
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Update generation progress
  async updateProgress(historyId, progress, status = 'processing') {
    const { data, error } = await supabase
      .from('generation_history')
      .update({ 
        progress, 
        status,
        ...(status === 'completed' && { completed_at: new Date().toISOString() })
      })
      .eq('id', historyId)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Mark generation as failed
  async markFailed(historyId, errorMessage) {
    const { data, error } = await supabase
      .from('generation_history')
      .update({ 
        status: 'failed',
        error_message: errorMessage,
        completed_at: new Date().toISOString()
      })
      .eq('id', historyId)
      .select()
      .single()
    
    if (error) throw error
    return data
  }
}

export const analyticsService = {
  // Log user action
  async logAction(action, resourceType = null, resourceId = null, metadata = {}) {
    const { data, error } = await supabase
      .rpc('log_user_action', {
        action_name: action,
        resource_type_name: resourceType,
        resource_uuid: resourceId,
        action_metadata: metadata
      })
    
    if (error) throw error
    return data
  },

  // Get user analytics
  async getUserAnalytics(limit = 100) {
    const { data, error } = await supabase
      .from('usage_analytics')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit)
    
    if (error) throw error
    return data
  }
}

// File storage helpers
export const storageService = {
  // Upload file to Supabase storage
  async uploadFile(bucket, filePath, file) {
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      })
    
    if (error) throw error
    return data
  },

  // Get public URL for uploaded file
  getPublicUrl(bucket, filePath) {
    const { data } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath)
    
    return data.publicUrl
  },

  // Delete file from storage
  async deleteFile(bucket, filePath) {
    const { error } = await supabase.storage
      .from(bucket)
      .remove([filePath])
    
    if (error) throw error
    return true
  }
}

// Authentication helpers
export const authService = {
  // Sign up new user
  async signUp(email, password, userData = {}) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData
      }
    })
    
    if (error) throw error
    return data
  },

  // Sign in user
  async signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    
    if (error) throw error
    return data
  },

  // Sign out user
  async signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    return true
  },

  // Get current user
  async getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser()
    return user
  },

  // Listen to auth changes
  onAuthStateChange(callback) {
    return supabase.auth.onAuthStateChange(callback)
  }
}