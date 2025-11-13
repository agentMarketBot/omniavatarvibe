-- Enable Row Level Security
ALTER DEFAULT PRIVILEGES REVOKE EXECUTE ON FUNCTIONS FROM PUBLIC;

-- Create extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  username VARCHAR(50) UNIQUE,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create avatar_projects table
CREATE TABLE IF NOT EXISTS avatar_projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  reference_image_url TEXT,
  audio_file_url TEXT,
  generated_video_url TEXT,
  thumbnail_url TEXT,
  prompt TEXT,
  style VARCHAR(50) NOT NULL DEFAULT 'podcast-host',
  settings JSONB NOT NULL DEFAULT '{}',
  metadata JSONB DEFAULT '{}',
  status VARCHAR(20) NOT NULL DEFAULT 'draft',
  is_favorite BOOLEAN DEFAULT FALSE,
  duration INTEGER, -- in seconds
  file_size BIGINT, -- in bytes
  resolution VARCHAR(20) DEFAULT '1080p',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create avatar_settings_presets table
CREATE TABLE IF NOT EXISTS avatar_settings_presets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  settings JSONB NOT NULL,
  is_public BOOLEAN DEFAULT FALSE,
  usage_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create generation_history table
CREATE TABLE IF NOT EXISTS generation_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  project_id UUID REFERENCES avatar_projects(id) ON DELETE CASCADE,
  status VARCHAR(20) NOT NULL DEFAULT 'pending',
  progress INTEGER DEFAULT 0,
  error_message TEXT,
  processing_time INTEGER, -- in seconds
  ai_model_version VARCHAR(50),
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Create usage_analytics table
CREATE TABLE IF NOT EXISTS usage_analytics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  action VARCHAR(50) NOT NULL,
  resource_type VARCHAR(50),
  resource_id UUID,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_avatar_projects_user_id ON avatar_projects(user_id);
CREATE INDEX IF NOT EXISTS idx_avatar_projects_status ON avatar_projects(status);
CREATE INDEX IF NOT EXISTS idx_avatar_projects_created_at ON avatar_projects(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_avatar_projects_style ON avatar_projects(style);
CREATE INDEX IF NOT EXISTS idx_avatar_projects_is_favorite ON avatar_projects(is_favorite);

CREATE INDEX IF NOT EXISTS idx_avatar_settings_presets_user_id ON avatar_settings_presets(user_id);
CREATE INDEX IF NOT EXISTS idx_avatar_settings_presets_is_public ON avatar_settings_presets(is_public);

CREATE INDEX IF NOT EXISTS idx_generation_history_user_id ON generation_history(user_id);
CREATE INDEX IF NOT EXISTS idx_generation_history_project_id ON generation_history(project_id);
CREATE INDEX IF NOT EXISTS idx_generation_history_status ON generation_history(status);

CREATE INDEX IF NOT EXISTS idx_usage_analytics_user_id ON usage_analytics(user_id);
CREATE INDEX IF NOT EXISTS idx_usage_analytics_action ON usage_analytics(action);
CREATE INDEX IF NOT EXISTS idx_usage_analytics_created_at ON usage_analytics(created_at DESC);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE avatar_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE avatar_settings_presets ENABLE ROW LEVEL SECURITY;
ALTER TABLE generation_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE usage_analytics ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Users can only see and modify their own data
CREATE POLICY "Users can view own profile" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (auth.uid() = id);

-- Avatar projects policies
CREATE POLICY "Users can view own avatar projects" ON avatar_projects 
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create avatar projects" ON avatar_projects 
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own avatar projects" ON avatar_projects 
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own avatar projects" ON avatar_projects 
  FOR DELETE USING (auth.uid() = user_id);

-- Settings presets policies
CREATE POLICY "Users can view own and public presets" ON avatar_settings_presets 
  FOR SELECT USING (auth.uid() = user_id OR is_public = true);
CREATE POLICY "Users can create settings presets" ON avatar_settings_presets 
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own settings presets" ON avatar_settings_presets 
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own settings presets" ON avatar_settings_presets 
  FOR DELETE USING (auth.uid() = user_id);

-- Generation history policies
CREATE POLICY "Users can view own generation history" ON generation_history 
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create generation history" ON generation_history 
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own generation history" ON generation_history 
  FOR UPDATE USING (auth.uid() = user_id);

-- Usage analytics policies
CREATE POLICY "Users can view own analytics" ON usage_analytics 
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create analytics" ON usage_analytics 
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create functions for updating timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_avatar_projects_updated_at BEFORE UPDATE ON avatar_projects 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_avatar_settings_presets_updated_at BEFORE UPDATE ON avatar_settings_presets 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create function to get user avatar projects with stats
CREATE OR REPLACE FUNCTION get_user_avatar_stats(user_uuid UUID)
RETURNS TABLE (
  total_projects BIGINT,
  favorite_projects BIGINT,
  total_storage_mb NUMERIC,
  recent_projects BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COUNT(*) as total_projects,
    COUNT(*) FILTER (WHERE is_favorite = true) as favorite_projects,
    COALESCE(SUM(file_size), 0)::NUMERIC / (1024 * 1024) as total_storage_mb,
    COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '7 days') as recent_projects
  FROM avatar_projects 
  WHERE user_id = user_uuid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to log user actions
CREATE OR REPLACE FUNCTION log_user_action(
  action_name VARCHAR(50),
  resource_type_name VARCHAR(50) DEFAULT NULL,
  resource_uuid UUID DEFAULT NULL,
  action_metadata JSONB DEFAULT '{}'
)
RETURNS UUID AS $$
DECLARE
  new_id UUID;
BEGIN
  INSERT INTO usage_analytics (user_id, action, resource_type, resource_id, metadata)
  VALUES (auth.uid(), action_name, resource_type_name, resource_uuid, action_metadata)
  RETURNING id INTO new_id;
  
  RETURN new_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;