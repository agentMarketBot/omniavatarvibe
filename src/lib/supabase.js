import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key'

export const supabase = createClient(supabaseUrl, supabaseKey)

// Database operations for avatars
export const avatarService = {
  // Save generated avatar
  async saveAvatar(avatarData) {
    const { data, error } = await supabase
      .from('avatars')
      .insert({
        name: avatarData.name,
        reference_image_url: avatarData.referenceImageUrl,
        audio_file_url: avatarData.audioFileUrl,
        prompt: avatarData.prompt,
        style: avatarData.style,
        settings: avatarData.settings,
        video_url: avatarData.videoUrl,
        thumbnail_url: avatarData.thumbnailUrl,
        status: avatarData.status || 'processing'
      })
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Get all avatars for gallery
  async getAvatars() {
    const { data, error } = await supabase
      .from('avatars')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  // Get avatar by ID
  async getAvatar(id) {
    const { data, error } = await supabase
      .from('avatars')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  },

  // Update avatar status/progress
  async updateAvatar(id, updates) {
    const { data, error } = await supabase
      .from('avatars')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Delete avatar
  async deleteAvatar(id) {
    const { error } = await supabase
      .from('avatars')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}

// File storage operations
export const storageService = {
  // Upload reference image
  async uploadImage(file, fileName) {
    const { data, error } = await supabase.storage
      .from('reference-images')
      .upload(fileName, file)
    
    if (error) throw error
    
    const { data: { publicUrl } } = supabase.storage
      .from('reference-images')
      .getPublicUrl(fileName)
    
    return publicUrl
  },

  // Upload audio file
  async uploadAudio(file, fileName) {
    const { data, error } = await supabase.storage
      .from('audio-files')
      .upload(fileName, file)
    
    if (error) throw error
    
    const { data: { publicUrl } } = supabase.storage
      .from('audio-files')
      .getPublicUrl(fileName)
    
    return publicUrl
  },

  // Upload generated video
  async uploadVideo(file, fileName) {
    const { data, error } = await supabase.storage
      .from('generated-videos')
      .upload(fileName, file)
    
    if (error) throw error
    
    const { data: { publicUrl } } = supabase.storage
      .from('generated-videos')
      .getPublicUrl(fileName)
    
    return publicUrl
  }
}