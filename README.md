# OmniAvatar App

A powerful podcast/video avatar generation application that creates AI-powered talking avatars from reference images and audio input.

## Features

- **File Upload Interface**: Easy drag-and-drop upload for reference images and audio files
- **Text Prompt Control**: Detailed prompts for controlling avatar expressions, gestures, and background scenes
- **Real-time Preview**: Live preview area showing generated talking avatars with full-body animation
- **Animation Controls**: Fine-tune facial expressions, hand gestures, and body movement intensity
- **Style Selection**: Multiple avatar styles (podcast host, presenter, casual speaker, etc.)
- **Export Options**: Multiple video formats and resolutions with quality settings
- **Progress Indicators**: Real-time feedback during AI generation process
- **Advanced Settings**: Lip-sync accuracy and animation naturalness controls
- **Avatar Gallery**: Browse and reuse previously generated avatars
- **Supabase Integration**: Persistent storage for avatars and settings

## Tech Stack

- **Frontend**: React 18 + Vite
- **Database**: Supabase (PostgreSQL)
- **File Storage**: Supabase Storage
- **UI Components**: Custom components with Lucide React icons
- **File Handling**: React Dropzone
- **Styling**: CSS with custom properties

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account (for database and storage)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/agentMarketBot/omniavatarvibe.git
cd omniavatarvibe
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```
Edit `.env` and add your Supabase credentials:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Set up the database:
   - Create a new Supabase project
   - Run the migration file in `supabase/migrations/20240101000000_create_avatars_table.sql`
   - Set up storage buckets as defined in the migration

5. Start the development server:
```bash
npm run dev
```

## Usage

1. **Upload Files**: Drag and drop or select a reference image and audio file
2. **Set Prompt**: Describe the desired avatar behavior and scene
3. **Choose Style**: Select from predefined avatar styles or customize
4. **Adjust Settings**: Fine-tune animation controls and advanced settings
5. **Generate**: Click generate to create your avatar
6. **Export**: Choose format and quality settings to download your video

## Avatar Styles

- **Podcast Host**: Professional broadcaster with engaging personality
- **Presenter**: Business presenter for meetings and conferences  
- **Casual Speaker**: Friendly conversationalist for informal content
- **Corporate Executive**: Executive presence for business communications
- **Creative Storyteller**: Expressive narrator for creative content
- **Energetic Motivator**: High-energy speaker for motivational content

## Database Schema

The app uses Supabase with the following main table:

```sql
avatars (
  id UUID PRIMARY KEY,
  name VARCHAR(255),
  reference_image_url TEXT,
  audio_file_url TEXT,
  prompt TEXT,
  style VARCHAR(100),
  settings JSONB,
  video_url TEXT,
  thumbnail_url TEXT,
  status VARCHAR(50),
  progress INTEGER,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
)
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests (when available)
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions, please open an issue on GitHub.
