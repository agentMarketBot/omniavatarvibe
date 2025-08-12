# 🎭 OmniAvatar App

A powerful podcast/video avatar generation application that creates realistic talking avatars from reference images and audio inputs. Perfect for content creators, podcasters, presenters, and anyone looking to create engaging video content with AI-generated avatars.

## ✨ Features

### 🎯 Core Functionality
- **File Upload Interface**: Upload reference images (JPG, PNG, WebP) and audio files (MP3, WAV, M4A)
- **Smart Prompt System**: Control avatar expressions, gestures, and background scenes with text prompts
- **Real-time Preview**: See your avatar come to life with live preview functionality
- **Advanced Controls**: Fine-tune facial expressions, hand gestures, and body movement intensity
- **Style Selection**: Choose from 6 different avatar types (Podcast Host, Presenter, Casual Speaker, etc.)
- **Export Options**: Multiple video formats and resolutions (4K, 1080p, 720p, 480p)
- **Progress Tracking**: Real-time AI generation progress with detailed status updates
- **Settings Panel**: Advanced tuning for lip-sync accuracy and animation naturalness
- **Gallery Management**: Browse, organize, and reuse previously generated avatars

### 🎨 Avatar Styles
1. **Podcast Host** - Casual, conversational style
2. **Professional Presenter** - Polished, authoritative presence
3. **Casual Speaker** - Friendly, approachable demeanor
4. **Educator/Instructor** - Clear, engaging teaching style
5. **Executive Speaker** - Leadership presence for corporate communications
6. **Content Creator** - Dynamic, engaging style for social media

### 💾 Data Management
- **Supabase Integration**: Secure cloud database for project storage
- **User Authentication**: Secure login and user management
- **Project History**: Track all your avatar generations
- **Settings Presets**: Save and share your favorite configurations
- **Usage Analytics**: Monitor your app usage and performance

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account (for database)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/omniavatar-app.git
   cd omniavatar-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

4. **Database Setup**
   
   Run the migration file in your Supabase SQL editor:
   ```sql
   -- Copy and paste the content from supabase/migrations/001_initial_schema.sql
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:5173`

## 🏗️ Project Structure

```
omniavatar-app/
├── src/
│   ├── components/           # React components
│   │   ├── FileUpload.jsx   # File upload interface
│   │   ├── PromptInput.jsx  # Text prompt controls
│   │   ├── PreviewArea.jsx  # Real-time preview
│   │   ├── ControlPanel.jsx # Avatar movement controls
│   │   ├── StyleSelector.jsx# Avatar style selection
│   │   ├── ExportOptions.jsx# Video export settings
│   │   ├── ProgressIndicator.jsx # Generation progress
│   │   ├── SettingsPanel.jsx# Advanced settings
│   │   └── Gallery.jsx      # Avatar gallery
│   ├── lib/
│   │   └── supabase.js      # Database service functions
│   ├── App.jsx              # Main application component
│   ├── App.css              # Global styles
│   └── main.jsx             # Application entry point
├── supabase/
│   └── migrations/          # Database schema
├── public/                  # Static assets
└── package.json            # Dependencies and scripts
```

## 🎮 Usage Guide

### 1. **Upload Files**
   - Select a clear reference image (preferably 1024x1024+)
   - Upload audio file with clear speech
   - Supported formats: Images (JPG, PNG, WebP), Audio (MP3, WAV, M4A)

### 2. **Configure Settings**
   - Enter descriptive prompts for avatar behavior
   - Choose avatar style that fits your content
   - Adjust facial expressions, gestures, and movement intensity
   - Fine-tune lip-sync accuracy and animation naturalness

### 3. **Generate Avatar**
   - Click "Generate Avatar" to start the AI process
   - Monitor real-time progress through 5 generation steps
   - Preview your avatar when generation completes

### 4. **Export & Save**
   - Choose video format and resolution
   - Download your generated avatar video
   - Save project to gallery for future use

### 5. **Manage Gallery**
   - Browse all your generated avatars
   - Filter by style, favorites, or date
   - Reuse settings from previous projects
   - Download or delete avatars as needed

## ⚙️ Configuration

### Avatar Control Settings
- **Expressions (0-100%)**: Controls facial expression intensity
- **Gestures (0-100%)**: Adjusts hand movement and gestures
- **Movement (0-100%)**: Sets overall body language dynamics

### Export Options
- **Formats**: MP4, MOV, WebM, GIF
- **Resolutions**: 4K (3840×2160), 1080p, 720p, 480p
- **Quality**: Ultra, High, Medium, Low
- **Frame Rates**: 24fps, 30fps, 60fps

### Advanced Settings
- **Lip-Sync Accuracy**: Fine-tune mouth movement precision
- **Animation Naturalness**: Control movement fluidity
- **Voice Clarity Enhancement**: Improve audio quality
- **Background Blur**: Focus attention on avatar

## 🗄️ Database Schema

The app uses Supabase with the following main tables:

- **users**: User profiles and authentication
- **avatar_projects**: Generated avatar projects and metadata
- **avatar_settings_presets**: Saved configuration presets
- **generation_history**: AI generation tracking and logs
- **usage_analytics**: User activity and app usage metrics

## 🔒 Security & Privacy

- **Row Level Security (RLS)**: Users can only access their own data
- **Secure Authentication**: Powered by Supabase Auth
- **File Storage**: Secure cloud storage for uploads and generated content
- **API Key Management**: Environment-based configuration

## 🎯 Use Cases

### Content Creation
- **Podcasters**: Create visual avatars for audio-only content
- **YouTubers**: Generate avatars for faceless channels
- **Social Media**: Create engaging posts and stories

### Business & Education
- **Corporate Communications**: Professional presentations
- **Training Materials**: Educational content with virtual instructors
- **Marketing**: Product demonstrations and explainer videos

### Entertainment
- **Storytelling**: Character-based narratives
- **Voice Acting**: Visual representation of voice performances
- **Creative Projects**: Artistic and experimental content

## 🛠️ Technology Stack

- **Frontend**: React 18, Vite, Lucide React Icons
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **Styling**: CSS3 with CSS Grid and Flexbox
- **Build Tool**: Vite for fast development and building
- **Database**: PostgreSQL with Row Level Security

## 📈 Performance Features

- **Real-time Updates**: Live preview and progress tracking
- **Optimized Rendering**: Efficient video processing
- **Caching**: Smart caching for faster load times
- **Responsive Design**: Works on desktop, tablet, and mobile
- **GPU Acceleration**: Hardware acceleration when available

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Vite](https://vitejs.dev/) for lightning-fast development
- Database and authentication powered by [Supabase](https://supabase.com/)
- Icons provided by [Lucide React](https://lucide.dev/)
- Inspired by the growing need for accessible avatar generation tools

## 📞 Support

For support, email support@omniavatar.app or create an issue in this repository.

---

**🎭 Create stunning talking avatars with OmniAvatar - where AI meets creativity!**