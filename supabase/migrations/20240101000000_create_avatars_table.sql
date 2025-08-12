-- Create avatars table for storing avatar generation data
CREATE TABLE IF NOT EXISTS public.avatars (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    reference_image_url TEXT,
    audio_file_url TEXT,
    prompt TEXT,
    style VARCHAR(100) DEFAULT 'podcast_host',
    settings JSONB DEFAULT '{}',
    video_url TEXT,
    thumbnail_url TEXT,
    status VARCHAR(50) DEFAULT 'pending',
    progress INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create storage buckets
INSERT INTO storage.buckets (id, name, public) VALUES 
    ('reference-images', 'reference-images', true),
    ('audio-files', 'audio-files', true),
    ('generated-videos', 'generated-videos', true)
ON CONFLICT (id) DO NOTHING;

-- Enable RLS (Row Level Security)
ALTER TABLE public.avatars ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (adjust based on your auth requirements)
CREATE POLICY "Allow public read access" ON public.avatars
    FOR SELECT USING (true);

CREATE POLICY "Allow public insert access" ON public.avatars
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update access" ON public.avatars
    FOR UPDATE USING (true);

CREATE POLICY "Allow public delete access" ON public.avatars
    FOR DELETE USING (true);

-- Create storage policies
CREATE POLICY "Allow public uploads" ON storage.objects
    FOR INSERT WITH CHECK (bucket_id IN ('reference-images', 'audio-files', 'generated-videos'));

CREATE POLICY "Allow public downloads" ON storage.objects
    FOR SELECT USING (bucket_id IN ('reference-images', 'audio-files', 'generated-videos'));

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_avatars_updated_at
    BEFORE UPDATE ON public.avatars
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();