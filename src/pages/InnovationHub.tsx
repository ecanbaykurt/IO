import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  Copy, 
  GitFork, 
  Sparkles, 
  Search, 
  Filter,
  TrendingUp,
  Clock,
  User,
  Tag,
  Star,
  RefreshCw,
  Zap,
  AlertCircle,
  Lightbulb,
  Github,
  ExternalLink,
  Download,
  Users,
  MessageCircle,
  ThumbsUp,
  Wifi,
  Nfc,
  ArrowRight,
  Activity,
  Target,
  Brain,
  Flame,
  X,
  Play,
  Code,
  FileText,
  Settings,
  Layers,
  ChevronRight,
  Calendar,
  Globe,
  Shield,
  Zap as Lightning,
  CheckCircle,
  Info,
  Eye,
  Plus,
  Minus
} from 'lucide-react';
import toast from 'react-hot-toast';

// Trend Intelligence Data Types
interface TrendingModel {
  id: string;
  name: string;
  description: string;
  downloads: number;
  stars: number;
  forks: number;
  lastUpdated: string;
  category: string;
  source: 'huggingface' | 'github';
  url: string;
  tags: string[];
}

// Pain Point Mining Data Types
interface PainPoint {
  id: string;
  title: string;
  description: string;
  upvotes: number;
  comments: number;
  source: 'reddit' | 'stackoverflow';
  subreddit?: string;
  tags: string[];
  createdAt: string;
  url: string;
}

// NFC Social Signal Data Types
interface CreatorProfile {
  id: string;
  name: string;
  avatar: string;
  topPrompts: string[];
  interests: string[];
  nfcTag: string;
  lastActive: string;
}

interface IdeaMerge {
  id: string;
  creator1: CreatorProfile;
  creator2: CreatorProfile;
  mergedIdeas: string[];
  generatedApp: string;
  createdAt: string;
}

// Detailed Project Information
interface ProjectDetails {
  id: string;
  name: string;
  description: string;
  requirements: string[];
  techStack: string[];
  estimatedTime: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  features: string[];
  preview: string;
  resources: {
    documentation: string;
    tutorials: string[];
    examples: string[];
  };
  generatedCode?: string;
  deploymentGuide?: string;
}

const InnovationHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'trends' | 'pain' | 'social' | 'ecosystem'>('trends');
  const [trendingModels, setTrendingModels] = useState<TrendingModel[]>([]);
  const [painPoints, setPainPoints] = useState<PainPoint[]>([]);
  const [creatorProfiles, setCreatorProfiles] = useState<CreatorProfile[]>([]);
  const [ideaMerges, setIdeaMerges] = useState<IdeaMerge[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // Modal states
  const [selectedModel, setSelectedModel] = useState<TrendingModel | null>(null);
  const [selectedPainPoint, setSelectedPainPoint] = useState<PainPoint | null>(null);
  const [selectedCreator, setSelectedCreator] = useState<CreatorProfile | null>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectDetails | null>(null);
  const [showProjectGenerator, setShowProjectGenerator] = useState(false);
  const [generatedProject, setGeneratedProject] = useState<ProjectDetails | null>(null);

  // Mock data for demonstration
  useEffect(() => {
    // Simulate loading trending models
    setTrendingModels([
      {
        id: '1',
        name: 'Stable Diffusion XL',
        description: 'Latest text-to-image model with improved quality',
        downloads: 1250000,
        stars: 45000,
        forks: 3200,
        lastUpdated: '2 hours ago',
        category: 'Computer Vision',
        source: 'huggingface',
        url: 'https://huggingface.co/stabilityai/stable-diffusion-xl-base-1.0',
        tags: ['AI', 'Image Generation', 'Diffusion']
      },
      {
        id: '2',
        name: 'GPT-4 Vision',
        description: 'Multimodal model for image and text understanding',
        downloads: 890000,
        stars: 28000,
        forks: 1800,
        lastUpdated: '5 hours ago',
        category: 'NLP',
        source: 'github',
        url: 'https://github.com/openai/gpt-4-vision',
        tags: ['AI', 'Vision', 'Language Model']
      },
      {
        id: '3',
        name: 'Whisper Large V3',
        description: 'State-of-the-art speech recognition model',
        downloads: 2100000,
        stars: 52000,
        forks: 4500,
        lastUpdated: '1 day ago',
        category: 'Audio',
        source: 'huggingface',
        url: 'https://huggingface.co/openai/whisper-large-v3',
        tags: ['Speech', 'Audio', 'Transcription']
      }
    ]);

    // Simulate loading pain points
    setPainPoints([
    {
      id: '1',
        title: 'How to automatically categorize expenses from receipts?',
        description: 'I have hundreds of receipts and need to categorize them automatically. Any AI solutions?',
        upvotes: 127,
        comments: 23,
        source: 'reddit',
        subreddit: 'r/MachineLearning',
        tags: ['OCR', 'Expense Tracking', 'Automation'],
        createdAt: '3 hours ago',
        url: 'https://reddit.com/r/MachineLearning/comments/...'
    },
    {
      id: '2',
        title: 'Best way to convert speech to text in real-time?',
        description: 'Need to build a real-time transcription app for meetings. What APIs work best?',
        upvotes: 89,
        comments: 15,
        source: 'stackoverflow',
        tags: ['Speech-to-Text', 'Real-time', 'API'],
        createdAt: '6 hours ago',
        url: 'https://stackoverflow.com/questions/...'
    },
    {
      id: '3',
        title: 'Creating a habit tracker with streak visualization',
        description: 'Want to build a habit tracker but struggling with the streak calculation logic.',
        upvotes: 156,
        comments: 31,
        source: 'reddit',
        subreddit: 'r/webdev',
        tags: ['Habit Tracking', 'Data Visualization', 'Streaks'],
        createdAt: '1 day ago',
        url: 'https://reddit.com/r/webdev/comments/...'
      }
    ]);

    // Simulate loading creator profiles
    setCreatorProfiles([
      {
        id: '1',
        name: 'Alex Chen',
        avatar: '👨‍💻',
        topPrompts: ['Build a habit tracker', 'Create a weather dashboard', 'Make a budget app'],
        interests: ['Productivity', 'AI', 'Data Visualization'],
        nfcTag: 'NFC-001',
        lastActive: '2 hours ago'
      },
      {
        id: '2',
        name: 'Sarah Kim',
      avatar: '👩‍🎨',
        topPrompts: ['Design a mood journal', 'Create a recipe finder', 'Build a meditation app'],
        interests: ['Wellness', 'Design', 'Mobile Apps'],
        nfcTag: 'NFC-002',
        lastActive: '5 hours ago'
      }
    ]);

    // Simulate loading idea merges
    setIdeaMerges([
      {
        id: '1',
        creator1: {
          id: '1',
          name: 'Alex Chen',
          avatar: '👨‍💻',
          topPrompts: ['Build a habit tracker'],
          interests: ['Productivity'],
          nfcTag: 'NFC-001',
          lastActive: '2 hours ago'
        },
        creator2: {
          id: '2',
          name: 'Sarah Kim',
          avatar: '👩‍🎨',
          topPrompts: ['Design a mood journal'],
          interests: ['Wellness'],
          nfcTag: 'NFC-002',
          lastActive: '5 hours ago'
        },
        mergedIdeas: ['Habit tracker with mood correlation', 'Wellness dashboard with streaks'],
        generatedApp: 'Mood & Habit Tracker Pro',
        createdAt: '1 hour ago'
      }
    ]);
  }, []);

  const handleMakeAppFromTrend = (model: TrendingModel) => {
    setSelectedModel(model);
    // Generate project details based on the model
    const projectDetails: ProjectDetails = {
      id: `project-${model.id}`,
      name: `AI-Powered App with ${model.name}`,
      description: `Build a cutting-edge application leveraging ${model.name} for innovative solutions.`,
      requirements: [
        'Basic understanding of AI/ML concepts',
        'Familiarity with Python or JavaScript',
        'API integration experience',
        'Frontend development skills'
      ],
      techStack: ['React', 'Node.js', 'Python', 'TensorFlow', 'OpenAI API'],
      estimatedTime: '2-4 weeks',
      difficulty: 'Intermediate',
      features: [
        'Real-time AI processing',
        'User-friendly interface',
        'Data visualization',
        'Export functionality',
        'Cloud deployment ready'
      ],
      preview: 'A modern web application with AI integration, featuring real-time processing and intuitive user interface.',
      resources: {
        documentation: model.url,
        tutorials: [
          'Getting started with AI models',
          'API integration best practices',
          'Deployment strategies'
        ],
        examples: [
          'Sample implementation code',
          'UI/UX design templates',
          'Database schemas'
        ]
      },
      generatedCode: `// Sample implementation for ${model.name}
import { useState, useEffect } from 'react';

const AIApp = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);
  
  const processWithAI = async () => {
    // AI processing logic here
    const response = await fetch('/api/process', {
      method: 'POST',
      body: JSON.stringify({ input, model: '${model.name}' })
    });
    const data = await response.json();
    setResult(data);
  };
  
  return (
    <div className="ai-app">
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={processWithAI}>Process</button>
      {result && <div>{result}</div>}
    </div>
  );
};`,
      deploymentGuide: 'Deploy to Vercel, Netlify, or AWS with environment variables for API keys.'
    };
    
    setGeneratedProject(projectDetails);
    setShowProjectGenerator(true);
  };

  const handleTurnIntoApp = (painPoint: PainPoint) => {
    setSelectedPainPoint(painPoint);
    // Generate solution project
    const solutionProject: ProjectDetails = {
      id: `solution-${painPoint.id}`,
      name: `Solution for: ${painPoint.title}`,
      description: `A comprehensive solution addressing the pain point: ${painPoint.description}`,
      requirements: [
        'Problem analysis and solution design',
        'User research and validation',
        'Technical implementation',
        'Testing and iteration'
      ],
      techStack: ['React', 'Node.js', 'Database', 'Authentication', 'Payment Processing'],
      estimatedTime: '3-6 weeks',
      difficulty: 'Intermediate',
      features: [
        'User authentication',
        'Core functionality',
        'Data management',
        'User feedback system',
        'Analytics dashboard'
      ],
      preview: 'A complete web application that solves the identified problem with modern UI/UX.',
      resources: {
        documentation: painPoint.url,
        tutorials: [
          'Problem-solving methodology',
          'User-centered design',
          'Agile development'
        ],
        examples: [
          'Similar successful solutions',
          'User journey maps',
          'Technical architecture'
        ]
      }
    };
    
    setGeneratedProject(solutionProject);
    setShowProjectGenerator(true);
  };

  const handleNfcTap = () => {
    toast.success('🔗 NFC tags detected! Merging ideas...');
    // Simulate NFC tap and idea merge
  };

  const handleViewModelDetails = (model: TrendingModel) => {
    setSelectedModel(model);
  };

  const handleViewPainPointDetails = (painPoint: PainPoint) => {
    setSelectedPainPoint(painPoint);
  };

  const handleViewCreatorDetails = (creator: CreatorProfile) => {
    setSelectedCreator(creator);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gradient-from to-gradient-to">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">
              Innovation Hub
            </h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              A living ecosystem of ideas powered by trends, pain points, and social collaboration
            </p>
        </div>

          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {[
              { id: 'trends', label: 'Trend Intelligence', icon: Flame, color: 'from-orange-500 to-red-500' },
              { id: 'pain', label: 'Pain Point Mining', icon: AlertCircle, color: 'from-blue-500 to-purple-500' },
              { id: 'social', label: 'NFC Social Signal', icon: Nfc, color: 'from-green-500 to-teal-500' },
              { id: 'ecosystem', label: 'Combined Edge', icon: Brain, color: 'from-purple-500 to-pink-500' }
            ].map((tab) => (
                <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-300 ${
                  activeTab === tab.id
                    ? `bg-gradient-to-r ${tab.color} text-white shadow-lg`
                    : 'bg-white/10 text-white/80 hover:bg-white/20'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span className="font-medium">{tab.label}</span>
                </button>
              ))}
          </div>
        </motion.div>

        {/* Content based on active tab */}
        <AnimatePresence mode="wait">
          {activeTab === 'trends' && (
            <motion.div
              key="trends"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-white mb-2 flex items-center space-x-2">
                  <Flame className="w-6 h-6 text-orange-400" />
                  <span>What's Exploding Right Now</span>
                </h2>
                <p className="text-white/70">Trending ML models, datasets, and GitHub repos with real-time metrics</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {trendingModels.map((model, index) => (
                  <motion.div
                    key={model.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="card hover:scale-105 transform transition-all duration-200 cursor-pointer"
                    onClick={() => handleViewModelDetails(model)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        {model.source === 'huggingface' ? (
                          <div className="w-8 h-8 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                            <Brain className="w-4 h-4 text-yellow-400" />
                          </div>
                        ) : (
                          <Github className="w-8 h-8 text-white/60" />
                        )}
                        <div>
                          <h3 className="text-white font-semibold">{model.name}</h3>
                          <p className="text-white/60 text-sm">{model.category}</p>
                        </div>
                      </div>
                      <span className="bg-orange-500/20 text-orange-300 text-xs px-2 py-1 rounded-full">
                        {model.source}
                      </span>
                </div>

                    <p className="text-white/70 text-sm mb-4">{model.description}</p>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {model.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="bg-white/10 text-white/80 text-xs px-2 py-1 rounded"
                    >
                          {tag}
                    </span>
                  ))}
                </div>

                    <div className="flex items-center justify-between text-sm text-white/60 mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Download className="w-4 h-4" />
                          <span>{model.downloads.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4" />
                          <span>{model.stars.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <GitFork className="w-4 h-4" />
                          <span>{model.forks.toLocaleString()}</span>
                        </div>
                      </div>
                      <span className="text-xs">{model.lastUpdated}</span>
                    </div>

                    <div className="flex space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewModelDetails(model);
                        }}
                        className="flex-1 bg-white/10 text-white/80 py-2 px-4 rounded-lg hover:bg-white/20 transition-all duration-200 flex items-center justify-center space-x-2"
                      >
                        <Eye className="w-4 h-4" />
                        <span>View Details</span>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMakeAppFromTrend(model);
                        }}
                        className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 px-4 rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-200 flex items-center justify-center space-x-2"
                      >
                        <Zap className="w-4 h-4" />
                        <span>Make App</span>
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'pain' && (
            <motion.div
              key="pain"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-white mb-2 flex items-center space-x-2">
                  <AlertCircle className="w-6 h-6 text-blue-400" />
                  <span>What People Struggle With</span>
                </h2>
                <p className="text-white/70">Real-time pain points from Reddit and Stack Overflow</p>
              </div>

              <div className="space-y-4">
                {painPoints.map((pain, index) => (
                  <motion.div
                    key={pain.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="card cursor-pointer hover:scale-[1.02] transform transition-all duration-200"
                    onClick={() => handleViewPainPointDetails(pain)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        {pain.source === 'reddit' ? (
                          <div className="w-6 h-6 bg-orange-500/20 rounded-full flex items-center justify-center">
                            <span className="text-orange-400 text-xs font-bold">R</span>
                          </div>
                        ) : (
                          <div className="w-6 h-6 bg-orange-600/20 rounded-full flex items-center justify-center">
                            <span className="text-orange-400 text-xs font-bold">S</span>
                          </div>
                        )}
                        <div>
                          <h3 className="text-white font-semibold">{pain.title}</h3>
                          {pain.subreddit && (
                            <p className="text-white/60 text-sm">{pain.subreddit}</p>
                          )}
                        </div>
                      </div>
                      <span className="bg-blue-500/20 text-blue-300 text-xs px-2 py-1 rounded-full">
                        {pain.source}
                      </span>
                    </div>

                    <p className="text-white/70 text-sm mb-4">{pain.description}</p>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {pain.tags.map((tag, idx) => (
                    <span
                      key={idx}
                          className="bg-white/10 text-white/80 text-xs px-2 py-1 rounded"
                    >
                          {tag}
                    </span>
                  ))}
                </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-white/60">
                    <div className="flex items-center space-x-1">
                          <ThumbsUp className="w-4 h-4" />
                          <span>{pain.upvotes}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                          <MessageCircle className="w-4 h-4" />
                          <span>{pain.comments}</span>
                        </div>
                        <span>{pain.createdAt}</span>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewPainPointDetails(pain);
                          }}
                          className="bg-white/10 text-white/80 py-2 px-4 rounded-lg hover:bg-white/20 transition-all duration-200 flex items-center space-x-2"
                        >
                          <Eye className="w-4 h-4" />
                          <span>Details</span>
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleTurnIntoApp(pain);
                          }}
                          className="bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 px-4 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200 flex items-center space-x-2"
                        >
                          <Lightbulb className="w-4 h-4" />
                          <span>Turn Into App</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'social' && (
            <motion.div
              key="social"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-white mb-2 flex items-center space-x-2">
                  <Nfc className="w-6 h-6 text-green-400" />
                  <span>Tap to Merge Ideas</span>
                </h2>
                <p className="text-white/70">Physical co-creation through NFC tag interactions</p>
                  </div>

              {/* NFC Tap Simulation */}
              <div className="card mb-8">
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Nfc className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-2">NFC Tag Ready</h3>
                  <p className="text-white/70 mb-4">Tap your NFC tag with another creator to merge ideas</p>
                  <button
                    onClick={handleNfcTap}
                    className="bg-gradient-to-r from-green-500 to-teal-500 text-white py-3 px-6 rounded-lg hover:from-green-600 hover:to-teal-600 transition-all duration-200 flex items-center space-x-2 mx-auto"
                  >
                    <Wifi className="w-5 h-5" />
                    <span>Simulate NFC Tap</span>
                  </button>
                </div>
              </div>

              {/* Creator Profiles */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {creatorProfiles.map((creator, index) => (
                  <motion.div
                    key={creator.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="card cursor-pointer hover:scale-[1.02] transform transition-all duration-200"
                    onClick={() => handleViewCreatorDetails(creator)}
                  >
                    <div className="flex items-center space-x-3 mb-4">
                      <span className="text-2xl">{creator.avatar}</span>
                      <div>
                        <h3 className="text-white font-semibold">{creator.name}</h3>
                        <p className="text-white/60 text-sm">Tag: {creator.nfcTag}</p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="text-white font-medium mb-2">Top Prompts:</h4>
                      <div className="space-y-1">
                        {creator.topPrompts.slice(0, 2).map((prompt, idx) => (
                          <div key={idx} className="bg-white/5 text-white/80 text-sm p-2 rounded">
                            {prompt}
                          </div>
                        ))}
                        {creator.topPrompts.length > 2 && (
                          <div className="text-white/60 text-sm">+{creator.topPrompts.length - 2} more...</div>
                        )}
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="text-white font-medium mb-2">Interests:</h4>
                      <div className="flex flex-wrap gap-1">
                        {creator.interests.map((interest, idx) => (
                          <span
                            key={idx}
                            className="bg-green-500/20 text-green-300 text-xs px-2 py-1 rounded"
                          >
                            {interest}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-sm text-white/60">
                        Last active: {creator.lastActive}
                      </div>
                <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewCreatorDetails(creator);
                        }}
                        className="bg-white/10 text-white/80 py-2 px-4 rounded-lg hover:bg-white/20 transition-all duration-200 flex items-center space-x-2"
                      >
                        <Eye className="w-4 h-4" />
                        <span>View Profile</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

              {/* Recent Idea Merges */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Recent Idea Merges</h3>
                <div className="space-y-4">
                  {ideaMerges.map((merge, index) => (
                    <motion.div
                      key={merge.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="card"
                    >
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">{merge.creator1.avatar}</span>
                          <span className="text-white/80 text-sm">{merge.creator1.name}</span>
                        </div>
                        <div className="flex items-center space-x-1 text-white/60">
                          <span>+</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">{merge.creator2.avatar}</span>
                          <span className="text-white/80 text-sm">{merge.creator2.name}</span>
                        </div>
                        <div className="flex items-center space-x-1 text-white/60">
                          <ArrowRight className="w-4 h-4" />
                        </div>
                        <div className="bg-green-500/20 text-green-300 text-sm px-2 py-1 rounded">
                          {merge.generatedApp}
                        </div>
                      </div>

                      <div className="mb-3">
                        <h4 className="text-white font-medium mb-2">Merged Ideas:</h4>
                        <div className="space-y-1">
                          {merge.mergedIdeas.map((idea, idx) => (
                            <div key={idx} className="bg-white/5 text-white/80 text-sm p-2 rounded">
                              {idea}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="text-sm text-white/60">
                        Merged {merge.createdAt}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'ecosystem' && (
            <motion.div
              key="ecosystem"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-2 flex items-center space-x-2">
                  <Brain className="w-6 h-6 text-purple-400" />
                  <span>The Combined Edge</span>
                </h2>
                <p className="text-white/70">A living ecosystem where trends, pain points, and social signals converge</p>
              </div>

              {/* Ecosystem Overview */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="card"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                      <Flame className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">Trend Radar</h3>
                      <p className="text-white/60 text-sm">Hot tech sparks creation</p>
                    </div>
            </div>
                  <p className="text-white/70 text-sm">
                    Real-time monitoring of trending ML models, datasets, and GitHub repositories. 
                    Convert developer momentum into working apps instantly.
                  </p>
          </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="card"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                      <Target className="w-6 h-6 text-white" />
            </div>
                    <div>
                      <h3 className="text-white font-semibold">Pain Scanner</h3>
                      <p className="text-white/60 text-sm">Real frustrations → opportunities</p>
                    </div>
                  </div>
                  <p className="text-white/70 text-sm">
                    Mining Reddit and Stack Overflow for genuine pain points. 
                    Turn community struggles into demand-driven app ideas.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="card"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">Social Idea Matchmaker</h3>
                      <p className="text-white/60 text-sm">Physical co-creation</p>
                    </div>
                  </div>
                  <p className="text-white/70 text-sm">
                    NFC-enabled physical interactions between creators. 
                    Merge ideas through serendipitous encounters and collaborative magic.
                  </p>
                </motion.div>
              </div>

              {/* Live Ecosystem Stats */}
              <div className="card">
                <h3 className="text-white font-semibold text-lg mb-6">Live Ecosystem Activity</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Activity className="w-5 h-5 text-orange-400" />
                      <span className="text-white font-medium">Trending Models</span>
                    </div>
                    <div className="text-2xl font-bold text-white">{trendingModels.length}</div>
                    <div className="text-white/60 text-sm">Active today</div>
                  </div>

                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <AlertCircle className="w-5 h-5 text-blue-400" />
                      <span className="text-white font-medium">Pain Points</span>
                    </div>
                    <div className="text-2xl font-bold text-white">{painPoints.length}</div>
                    <div className="text-white/60 text-sm">Identified today</div>
                  </div>

                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Users className="w-5 h-5 text-green-400" />
                      <span className="text-white font-medium">Active Creators</span>
                    </div>
                    <div className="text-2xl font-bold text-white">{creatorProfiles.length}</div>
                    <div className="text-white/60 text-sm">With NFC tags</div>
                  </div>

                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Sparkles className="w-5 h-5 text-purple-400" />
                      <span className="text-white font-medium">Idea Merges</span>
                    </div>
                    <div className="text-2xl font-bold text-white">{ideaMerges.length}</div>
                    <div className="text-white/60 text-sm">This week</div>
                  </div>
            </div>
          </div>
        </motion.div>
          )}
        </AnimatePresence>

        {/* Model Details Modal */}
        <AnimatePresence>
          {selectedModel && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedModel(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    {selectedModel.source === 'huggingface' ? (
                      <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                        <Brain className="w-6 h-6 text-yellow-400" />
                      </div>
                    ) : (
                      <Github className="w-12 h-12 text-white/60" />
                    )}
                    <div>
                      <h2 className="text-2xl font-bold text-white">{selectedModel.name}</h2>
                      <p className="text-white/60">{selectedModel.category}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedModel(null)}
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-white font-semibold mb-2">Description</h3>
                    <p className="text-white/70">{selectedModel.description}</p>
                  </div>

                  <div>
                    <h3 className="text-white font-semibold mb-2">Metrics</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-white/5 rounded-lg p-4 text-center">
                        <Download className="w-6 h-6 text-orange-400 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-white">{selectedModel.downloads.toLocaleString()}</div>
                        <div className="text-white/60 text-sm">Downloads</div>
                      </div>
                      <div className="bg-white/5 rounded-lg p-4 text-center">
                        <Star className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-white">{selectedModel.stars.toLocaleString()}</div>
                        <div className="text-white/60 text-sm">Stars</div>
                      </div>
                      <div className="bg-white/5 rounded-lg p-4 text-center">
                        <GitFork className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-white">{selectedModel.forks.toLocaleString()}</div>
                        <div className="text-white/60 text-sm">Forks</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-white font-semibold mb-2">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedModel.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="bg-white/10 text-white/80 text-sm px-3 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <button
                      onClick={() => {
                        setSelectedModel(null);
                        handleMakeAppFromTrend(selectedModel);
                      }}
                      className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-6 rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-200 flex items-center justify-center space-x-2"
                    >
                      <Zap className="w-5 h-5" />
                      <span>Make App From This</span>
                    </button>
                    <button
                      onClick={() => window.open(selectedModel.url, '_blank')}
                      className="flex-1 bg-white/10 text-white/80 py-3 px-6 rounded-lg hover:bg-white/20 transition-all duration-200 flex items-center justify-center space-x-2"
                    >
                      <ExternalLink className="w-5 h-5" />
                      <span>View Source</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pain Point Details Modal */}
        <AnimatePresence>
          {selectedPainPoint && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedPainPoint(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    {selectedPainPoint.source === 'reddit' ? (
                      <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center">
                        <span className="text-orange-400 text-lg font-bold">R</span>
                      </div>
                    ) : (
                      <div className="w-12 h-12 bg-orange-600/20 rounded-full flex items-center justify-center">
                        <span className="text-orange-400 text-lg font-bold">S</span>
                      </div>
                    )}
                    <div>
                      <h2 className="text-2xl font-bold text-white">{selectedPainPoint.title}</h2>
                      {selectedPainPoint.subreddit && (
                        <p className="text-white/60">{selectedPainPoint.subreddit}</p>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedPainPoint(null)}
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-white font-semibold mb-2">Problem Description</h3>
                    <p className="text-white/70">{selectedPainPoint.description}</p>
                  </div>

                  <div>
                    <h3 className="text-white font-semibold mb-2">Engagement</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/5 rounded-lg p-4 text-center">
                        <ThumbsUp className="w-6 h-6 text-green-400 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-white">{selectedPainPoint.upvotes}</div>
                        <div className="text-white/60 text-sm">Upvotes</div>
                      </div>
                      <div className="bg-white/5 rounded-lg p-4 text-center">
                        <MessageCircle className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-white">{selectedPainPoint.comments}</div>
                        <div className="text-white/60 text-sm">Comments</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-white font-semibold mb-2">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedPainPoint.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="bg-white/10 text-white/80 text-sm px-3 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <button
                      onClick={() => {
                        setSelectedPainPoint(null);
                        handleTurnIntoApp(selectedPainPoint);
                      }}
                      className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-6 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200 flex items-center justify-center space-x-2"
                    >
                      <Lightbulb className="w-5 h-5" />
                      <span>Turn Into App</span>
                    </button>
                    <button
                      onClick={() => window.open(selectedPainPoint.url, '_blank')}
                      className="flex-1 bg-white/10 text-white/80 py-3 px-6 rounded-lg hover:bg-white/20 transition-all duration-200 flex items-center justify-center space-x-2"
                    >
                      <ExternalLink className="w-5 h-5" />
                      <span>View Original</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Creator Profile Modal */}
        <AnimatePresence>
          {selectedCreator && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedCreator(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <span className="text-4xl">{selectedCreator.avatar}</span>
                    <div>
                      <h2 className="text-2xl font-bold text-white">{selectedCreator.name}</h2>
                      <p className="text-white/60">NFC Tag: {selectedCreator.nfcTag}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedCreator(null)}
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-white font-semibold mb-3">Top Prompts</h3>
                    <div className="space-y-2">
                      {selectedCreator.topPrompts.map((prompt, idx) => (
                        <div key={idx} className="bg-white/5 text-white/80 p-3 rounded-lg">
                          {prompt}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-white font-semibold mb-3">Interests</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedCreator.interests.map((interest, idx) => (
                        <span
                          key={idx}
                          className="bg-green-500/20 text-green-300 text-sm px-3 py-1 rounded-full"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Clock className="w-5 h-5 text-white/60" />
                      <span className="text-white font-medium">Activity</span>
                    </div>
                    <p className="text-white/70">Last active: {selectedCreator.lastActive}</p>
                  </div>

                  <div className="flex space-x-4">
                    <button
                      onClick={() => handleNfcTap()}
                      className="flex-1 bg-gradient-to-r from-green-500 to-teal-500 text-white py-3 px-6 rounded-lg hover:from-green-600 hover:to-teal-600 transition-all duration-200 flex items-center justify-center space-x-2"
                    >
                      <Nfc className="w-5 h-5" />
                      <span>Tap to Merge Ideas</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Project Generator Modal */}
        <AnimatePresence>
          {showProjectGenerator && generatedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setShowProjectGenerator(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white">{generatedProject.name}</h2>
                    <p className="text-white/60">{generatedProject.description}</p>
                  </div>
                  <button
                    onClick={() => setShowProjectGenerator(false)}
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Project Overview */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-white font-semibold mb-3 flex items-center space-x-2">
                        <Info className="w-5 h-5" />
                        <span>Project Overview</span>
                      </h3>
                      <div className="bg-white/5 rounded-lg p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-white/70">Difficulty:</span>
                          <span className={`px-2 py-1 rounded text-sm ${
                            generatedProject.difficulty === 'Beginner' ? 'bg-green-500/20 text-green-300' :
                            generatedProject.difficulty === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-300' :
                            'bg-red-500/20 text-red-300'
                          }`}>
                            {generatedProject.difficulty}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-white/70">Estimated Time:</span>
                          <span className="text-white">{generatedProject.estimatedTime}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-white/70">Preview:</span>
                          <span className="text-white/80 text-sm">{generatedProject.preview}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-white font-semibold mb-3 flex items-center space-x-2">
                        <CheckCircle className="w-5 h-5" />
                        <span>Requirements</span>
                      </h3>
                      <div className="space-y-2">
                        {generatedProject.requirements.map((req, idx) => (
                          <div key={idx} className="flex items-start space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                            <span className="text-white/80 text-sm">{req}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-white font-semibold mb-3 flex items-center space-x-2">
                        <Layers className="w-5 h-5" />
                        <span>Tech Stack</span>
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {generatedProject.techStack.map((tech, idx) => (
                          <span
                            key={idx}
                            className="bg-white/10 text-white/80 text-sm px-3 py-1 rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Features and Code */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-white font-semibold mb-3 flex items-center space-x-2">
                        <Sparkles className="w-5 h-5" />
                        <span>Features</span>
                      </h3>
                      <div className="space-y-2">
                        {generatedProject.features.map((feature, idx) => (
                          <div key={idx} className="flex items-start space-x-2">
                            <Plus className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                            <span className="text-white/80 text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {generatedProject.generatedCode && (
                      <div>
                        <h3 className="text-white font-semibold mb-3 flex items-center space-x-2">
                          <Code className="w-5 h-5" />
                          <span>Generated Code</span>
                        </h3>
                        <div className="bg-black/20 rounded-lg p-4 overflow-x-auto">
                          <pre className="text-green-400 text-sm">
                            <code>{generatedProject.generatedCode}</code>
                          </pre>
                        </div>
                      </div>
                    )}

                    <div className="flex space-x-4">
                      <button
                        onClick={() => {
                          toast.success('🚀 Project started! Opening workspace...');
                          setShowProjectGenerator(false);
                        }}
                        className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-6 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 flex items-center justify-center space-x-2"
                      >
                        <Play className="w-5 h-5" />
                        <span>Start Project</span>
                      </button>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(generatedProject.generatedCode || '');
                          toast.success('📋 Code copied to clipboard!');
                        }}
                        className="flex-1 bg-white/10 text-white/80 py-3 px-6 rounded-lg hover:bg-white/20 transition-all duration-200 flex items-center justify-center space-x-2"
                      >
                        <Copy className="w-5 h-5" />
                        <span>Copy Code</span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default InnovationHub;
