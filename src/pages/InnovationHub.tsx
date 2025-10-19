import React, { useState } from 'react';
import { motion } from 'framer-motion';
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
  RefreshCw
} from 'lucide-react';
import toast from 'react-hot-toast';

interface PublicApp {
  id: string;
  name: string;
  description: string;
  creator: string;
  avatar: string;
  thumbnail: string;
  likes: number;
  forks: number;
  tags: string[];
  createdAt: string;
  isLiked: boolean;
  techStack: string[];
}

const InnovationHub: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState<'trending' | 'latest' | 'likes'>('trending');
  const [showInspireMe, setShowInspireMe] = useState(false);

  const categories = [
    { id: 'all', label: 'All', icon: '🌟' },
    { id: 'productivity', label: 'Productivity', icon: '📊' },
    { id: 'weather', label: 'Weather', icon: '🌤️' },
    { id: 'finance', label: 'Finance', icon: '💰' },
    { id: 'ai', label: 'AI', icon: '🤖' },
    { id: 'social', label: 'Social', icon: '👥' }
  ];

  const [publicApps] = useState<PublicApp[]>([
    {
      id: '1',
      name: 'Smart Expense Tracker',
      description: 'AI-powered expense categorization with receipt scanning',
      creator: 'Sarah Kim',
      avatar: '👩‍💼',
      thumbnail: '💰',
      likes: 124,
      forks: 23,
      tags: ['Finance', 'AI', 'Productivity'],
      createdAt: '2 days ago',
      isLiked: false,
      techStack: ['React', 'OpenAI', 'Tailwind']
    },
    {
      id: '2',
      name: 'Weather Dashboard Pro',
      description: 'Advanced weather visualization with 10-day forecasts',
      creator: 'Mike Chen',
      avatar: '👨‍💻',
      thumbnail: '🌤️',
      likes: 89,
      forks: 15,
      tags: ['Weather', 'Dashboard'],
      createdAt: '1 week ago',
      isLiked: true,
      techStack: ['React', 'OpenWeather', 'Chart.js']
    },
    {
      id: '3',
      name: 'AI Writing Assistant',
      description: 'GPT-powered writing tool with style suggestions',
      creator: 'Alex Rivera',
      avatar: '👨‍🎨',
      thumbnail: '✍️',
      likes: 156,
      forks: 31,
      tags: ['AI', 'Writing', 'Productivity'],
      createdAt: '3 days ago',
      isLiked: false,
      techStack: ['React', 'OpenAI', 'Tailwind']
    },
    {
      id: '4',
      name: 'Social Media Scheduler',
      description: 'Multi-platform social media management tool',
      creator: 'Emma Wilson',
      avatar: '👩‍🎨',
      thumbnail: '📱',
      likes: 67,
      forks: 12,
      tags: ['Social', 'Productivity'],
      createdAt: '5 days ago',
      isLiked: false,
      techStack: ['React', 'Twitter API', 'Instagram API']
    }
  ]);

  const inspireMeIdeas = [
    'Build a habit tracker with streak visualization',
    'Create a recipe finder with dietary filters',
    'Design a mood journal with analytics',
    'Make a workout planner with progress tracking',
    'Build a language learning flashcard app',
    'Create a plant care reminder system',
    'Design a budget tracker with categories',
    'Make a meditation timer with ambient sounds'
  ];

  const filteredApps = publicApps.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || 
                           app.tags.some(tag => tag.toLowerCase().includes(selectedCategory));
    
    return matchesSearch && matchesCategory;
  });

  const sortedApps = [...filteredApps].sort((a, b) => {
    switch (sortBy) {
      case 'likes':
        return b.likes - a.likes;
      case 'latest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'trending':
      default:
        return (b.likes + b.forks) - (a.likes + a.forks);
    }
  });

  const handleLike = (appId: string) => {
    // In real app, this would update the backend
    toast.success('App liked!');
  };

  const handleClone = (appId: string) => {
    toast.success('App cloned to your workspace!');
  };

  const handleFork = (appId: string) => {
    toast.success('App forked! You can now customize it.');
  };

  const handleInspireMe = () => {
    const randomIdea = inspireMeIdeas[Math.floor(Math.random() * inspireMeIdeas.length)];
    setSearchTerm(randomIdea);
    toast.success(`Inspired: ${randomIdea}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gradient-from to-gradient-to">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Innovation Hub</h1>
              <p className="text-white/70">Discover, like, and clone amazing apps from the community</p>
            </div>
            <button
              onClick={handleInspireMe}
              className="btn-primary flex items-center space-x-2"
            >
              <Sparkles className="w-5 h-5" />
              <span>Inspire Me</span>
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search apps..."
                className="input-field pl-10"
              />
            </div>

            {/* Category Filter */}
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all duration-200 ${
                    selectedCategory === category.id
                      ? 'bg-white/20 text-white'
                      : 'bg-white/10 text-white/80 hover:bg-white/20 hover:text-white'
                  }`}
                >
                  <span>{category.icon}</span>
                  <span>{category.label}</span>
                </button>
              ))}
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="trending">Trending</option>
              <option value="latest">Latest</option>
              <option value="likes">Most Liked</option>
            </select>
          </div>
        </div>

        {/* Apps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedApps.map((app, index) => (
            <motion.div
              key={app.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card hover:scale-105 transform transition-all duration-200"
            >
              {/* App Thumbnail */}
              <div className="w-full h-32 bg-gradient-to-br from-primary-500/20 to-primary-600/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-4xl">{app.thumbnail}</span>
              </div>

              {/* App Info */}
              <div className="mb-4">
                <h3 className="text-white font-semibold text-lg mb-2">{app.name}</h3>
                <p className="text-white/70 text-sm mb-3">{app.description}</p>
                
                {/* Creator */}
                <div className="flex items-center space-x-2 mb-3">
                  <span className="text-lg">{app.avatar}</span>
                  <span className="text-white/80 text-sm">{app.creator}</span>
                </div>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {app.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="bg-white/10 text-white/80 text-xs px-2 py-1 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {app.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="bg-primary-500/20 text-primary-300 text-xs px-2 py-1 rounded-full flex items-center space-x-1"
                    >
                      <Tag className="w-3 h-3" />
                      <span>{tag}</span>
                    </span>
                  ))}
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-white/60 mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Heart className="w-4 h-4" />
                      <span>{app.likes}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <GitFork className="w-4 h-4" />
                      <span>{app.forks}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{app.createdAt}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-2">
                <button
                  onClick={() => handleLike(app.id)}
                  className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-lg transition-all duration-200 ${
                    app.isLiked
                      ? 'bg-red-600 text-white'
                      : 'bg-white/10 text-white/80 hover:bg-white/20 hover:text-white'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${app.isLiked ? 'fill-current' : ''}`} />
                  <span>Like</span>
                </button>
                
                <button
                  onClick={() => handleClone(app.id)}
                  className="btn-secondary flex items-center justify-center space-x-2 py-2 px-3"
                >
                  <Copy className="w-4 h-4" />
                </button>
                
                <button
                  onClick={() => handleFork(app.id)}
                  className="btn-secondary flex items-center justify-center space-x-2 py-2 px-3"
                >
                  <GitFork className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {sortedApps.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-12 h-12 text-white/60" />
            </div>
            <h3 className="text-2xl font-semibold text-white mb-4">No apps found</h3>
            <p className="text-white/70 mb-8 max-w-md mx-auto">
              Try adjusting your search terms or browse different categories to discover amazing apps.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              className="btn-primary"
            >
              Clear Filters
            </button>
          </motion.div>
        )}

        {/* Trending Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16"
        >
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white font-semibold text-lg">Trending This Week</h3>
              <TrendingUp className="w-5 h-5 text-primary-400" />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {publicApps.slice(0, 4).map((app, index) => (
                <div key={app.id} className="bg-white/5 rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <span className="text-2xl">{app.thumbnail}</span>
                    <div>
                      <h4 className="text-white font-medium text-sm">{app.name}</h4>
                      <p className="text-white/60 text-xs">{app.creator}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-white/60">
                    <span>#{index + 1}</span>
                    <div className="flex items-center space-x-2">
                      <Heart className="w-3 h-3" />
                      <span>{app.likes}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default InnovationHub;
