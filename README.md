# VibeCode - Instant Vibe-Coding System

> **Turn prompts into apps—instantly.**

A revolutionary platform that transforms your ideas into working applications in seconds. No code, no setup, just ship.

## ✨ Vision Statement

Type an idea, instantly launch a working app—fast, creative, empowering.

## 🚀 Core Features

- **Prompt→UI + API logic**: Turn ideas into runnable `React` + API blueprints in seconds
- **Real-time Preview**: See changes instantly with hot-reloading and interactive state
- **Save & Export**: Keep projects, download code, or push to GitHub/GCP with one click
- **API Key Management**: Securely connect personal keys for real data and testing
- **Community Sharing**: Publish, like, and clone apps to accelerate learning and iteration
- **Fail-Fast Flow**: Rapid retries and variations to converge on the right build fast

## 🛣️ User Journey

### Landing / Home Page
- **Tagline**: "Turn prompts into apps—instantly."
- **Layout**: Full-bleed minimal header; central single-line prompt bar; large primary "Create App" button; three tappable example chips
- **Examples**: "Weather App", "Habit Tracker", "AI Chatbot"
- **Mobile-first**: Single-column, generous spacing, 44px+ targets, subtle gradient background

### Prompt Workspace (Main Page)
- **Header**: Prompt field with edit + regenerate controls
- **Output Panels**: UI Skeleton, API Suggestions, Live Preview
- **Actions**: Save to My Apps, Export, Tweak Prompt, Retry with Variations
- **Guidance**: Inline checklists for next steps

### My Apps (Library Page)
- **Layout**: Responsive card grid (1-column mobile, 2–3 columns tablet+)
- **Card**: App name, last updated, tech badges, preview thumbnail
- **Actions**: Primary "Open", secondary "Edit", tertiary "Export"
- **Filters**: Search by name; sort by Recent, Name, Most Run

### App Runner (Sandbox Page)
- **Isolation**: Each app executes in a sandboxed container with resource boundaries
- **Inputs Panel**: Dynamic fields with validation and presets
- **Keys Panel**: Connect personal API keys per app; scoped and masked
- **Runner Console**: Logs, network calls, error surfacing
- **Safety**: Badge indicating isolation; "Stop App" control

### Profile & API Keys
- **Profile**: Avatar, name, email, usage stats
- **API Key Manager**: Providers: OpenWeather, Maps, Finance, OpenAI
- **Actions**: Add Key, Delete Key, Safe Storage notice
- **Storage**: Keys encrypted at rest, stored via GCP Secret Manager

### Innovation Hub (Explore Page)
- **Feed**: Modern, scrollable grid of public app cards with tags and creator
- **Actions**: Like, Clone, Fork, and "Inspire Me" (random idea generator)
- **Discovery**: Filters by category (Productivity, Weather, Finance, AI), trending, latest

## 🎨 Design Principles

- **Simplicity**: Prioritize a single action per screen; hide advanced options until needed
- **Mobile-first**: Design core flows for thumbs and small screens first
- **Visionary Feel**: Employ subtle gradients, motion, and crisp typography to convey magic
- **Minimal Navigation**: Favor contextual actions over deep menus

## 🔧 Technology Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Animations**: Framer Motion for smooth transitions
- **Routing**: React Router v6
- **Notifications**: React Hot Toast
- **Icons**: Lucide React
- **HTTP Client**: Axios

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd instant-vibe-coding
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

## 📱 Pages & Features

### 🏠 Landing Page (`/`)
- Hero section with animated tagline
- Central prompt input with examples
- Feature preview cards
- Mobile-first responsive design

### 🛠️ Prompt Workspace (`/workspace`)
- Split-panel interface for UI, API, and Preview
- Real-time generation progress
- Interactive code examples
- Action buttons for save/export

### 📚 My Apps (`/my-apps`)
- Card-based app library
- Search and filter functionality
- App statistics and metadata
- Quick actions (Open, Edit, Export)

### 🏃 App Runner (`/runner/:appId`)
- Isolated sandbox environment
- API key management per app
- Real-time console logs
- Input parameter controls

### 👤 Profile (`/profile`)
- User profile management
- Secure API key storage
- Usage statistics
- Account settings

### 🌟 Innovation Hub (`/explore`)
- Community app discovery
- Like, clone, and fork functionality
- Category filtering
- "Inspire Me" random idea generator

## 🔐 Security Features

- **API Key Encryption**: All keys stored via GCP Secret Manager
- **Sandbox Isolation**: Apps run in isolated containers
- **No Cross-App Access**: Complete separation between applications
- **Secure Storage**: Keys never shared without explicit consent

## 🎯 Innovation Edge

- **Live APIs, not static mockups**: Real data flows with user-connected keys from day one
- **Instant personal testing**: Plug in your own credentials to validate real-world behavior immediately
- **Production-ready exports**: One-click GitHub repo and GCP pipeline setup for deployment
- **Creativity engine**: "Inspire Me" generates high-quality ideas and jumpstarts experimentation

## 🛠️ Development

### Project Structure

```
src/
├── components/          # Reusable UI components
│   └── Navigation.tsx
├── pages/              # Page components
│   ├── LandingPage.tsx
│   ├── PromptWorkspace.tsx
│   ├── MyApps.tsx
│   ├── AppRunner.tsx
│   ├── Profile.tsx
│   └── InnovationHub.tsx
├── App.tsx             # Main app component
├── index.tsx           # App entry point
└── index.css           # Global styles
```

### Key Dependencies

- `react`: ^18.2.0
- `react-dom`: ^18.2.0
- `react-router-dom`: ^6.8.0
- `typescript`: ^4.9.0
- `tailwindcss`: ^3.3.0
- `framer-motion`: ^10.16.0
- `lucide-react`: ^0.263.0
- `react-hot-toast`: ^2.4.0

## 🎨 Design System

### Colors
- **Primary**: Blue gradient (`#0ea5e9` to `#0284c7`)
- **Background**: Purple gradient (`#667eea` to `#764ba2`)
- **Cards**: White with 10% opacity and backdrop blur
- **Text**: White with various opacity levels

### Typography
- **Font**: Inter (Google Fonts)
- **Headings**: Bold, large sizes
- **Body**: Medium weight, readable sizes
- **Code**: Monospace for technical content

### Components
- **Buttons**: Primary (blue), Secondary (white/transparent)
- **Cards**: Glassmorphism effect with backdrop blur
- **Inputs**: Transparent with white borders
- **Animations**: Smooth transitions with Framer Motion

## 🚀 Deployment

The app is built with Create React App and can be deployed to any static hosting service:

- **Vercel**: `vercel --prod`
- **Netlify**: Connect GitHub repository
- **GitHub Pages**: `npm run build && gh-pages -d build`
- **AWS S3**: Upload build folder to S3 bucket

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Design Inspiration**: Modern glassmorphism and gradient trends
- **Icons**: Lucide React icon library
- **Animations**: Framer Motion for smooth interactions
- **Community**: Open source React ecosystem

---

**Built with ❤️ for creators who ship fast**

*Turn your ideas into reality, one prompt at a time.*
