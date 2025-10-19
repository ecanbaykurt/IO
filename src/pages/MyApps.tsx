import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Play, 
  Edit, 
  Download, 
  Search, 
  Plus,
  Calendar,
  TrendingUp,
  Clock,
  Tag,
  MoreVertical,
  Sparkles,
  Brain,
  Github
} from 'lucide-react';

interface App {
  id: string;
  name: string;
  description: string;
  lastUpdated: string;
  techStack: string[];
  thumbnail: string;
  runCount: number;
  tags: string[];
  isGenerated?: boolean;
  sector?: string;
  painPoint?: any;
  githubRepo?: any;
  huggingFaceModel?: any;
}

const MyApps: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'recent' | 'name' | 'runs'>('recent');
  const [apps, setApps] = useState<App[]>([]);

  useEffect(() => {
    // Load apps from localStorage (both manual and generated)
    const savedApps = JSON.parse(localStorage.getItem('savedApps') || '[]');
    const prototypes = JSON.parse(localStorage.getItem('appPrototypes') || '[]');
    
    // Combine both sources
    const allApps = [...savedApps, ...prototypes];
    setApps(allApps);
  }, []);

  const filteredApps = apps.filter(app =>
    app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const sortedApps = [...filteredApps].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'runs':
        return b.runCount - a.runCount;
      case 'recent':
      default:
        return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
    }
  });

  const handleOpenApp = (app: App) => {
    if (app.isGenerated) {
      // Navigate to prototype page for generated apps
      navigate(`/prototype/${app.id}`);
    } else {
      // Navigate to runner for manual apps
      navigate(`/runner/${app.id}`);
    }
  };

  const handleEditApp = (appId: string) => {
    navigate('/workspace', { state: { appId } });
  };

  const handleExportApp = (appId: string) => {
    // Export logic
    console.log('Exporting app:', appId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gradient-from to-gradient-to">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">My Apps</h1>
              <p className="text-white/70">Manage and run your created applications</p>
            </div>
            <button
              onClick={() => navigate('/workspace')}
              className="btn-primary flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Create New App</span>
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
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
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="recent" className="bg-gray-800">Recent</option>
              <option value="name" className="bg-gray-800">Name</option>
              <option value="runs" className="bg-gray-800">Most Run</option>
            </select>
          </div>
        </div>

        {/* Apps Grid */}
        {sortedApps.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Plus className="w-12 h-12 text-white/60" />
            </div>
            <h3 className="text-2xl font-semibold text-white mb-4">No apps yet</h3>
            <p className="text-white/70 mb-8 max-w-md mx-auto">
              Create your first app by describing what you want to build. It's that simple!
            </p>
            <button
              onClick={() => navigate('/workspace')}
              className="btn-primary"
            >
              Create Your First App
            </button>
          </motion.div>
        ) : (
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
                <div className="w-full h-32 bg-gradient-to-br from-primary-500/20 to-primary-600/20 rounded-lg flex items-center justify-center mb-4 relative">
                  <span className="text-4xl">{app.thumbnail}</span>
                  {app.isGenerated && (
                    <div className="absolute top-2 right-2 bg-purple-500/20 backdrop-blur-md border border-purple-500/30 rounded-full p-1">
                      <Sparkles className="w-4 h-4 text-purple-300" />
                    </div>
                  )}
                </div>

                {/* App Info */}
                <div className="mb-4">
                  <h3 className="text-white font-semibold text-lg mb-2">{app.name}</h3>
                  <p className="text-white/70 text-sm mb-3">{app.description}</p>
                  
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

                  {/* Generated App Indicators */}
                  {app.isGenerated && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {app.githubRepo && (
                        <div className="flex items-center gap-1 bg-green-500/20 text-green-300 text-xs px-2 py-1 rounded">
                          <Github className="w-3 h-3" />
                          <span>GitHub</span>
                        </div>
                      )}
                      {app.huggingFaceModel && (
                        <div className="flex items-center gap-1 bg-blue-500/20 text-blue-300 text-xs px-2 py-1 rounded">
                          <Brain className="w-3 h-3" />
                          <span>AI Model</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1 bg-purple-500/20 text-purple-300 text-xs px-2 py-1 rounded">
                        <Sparkles className="w-3 h-3" />
                        <span>Generated</span>
                      </div>
                    </div>
                  )}

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
                  <div className="flex items-center justify-between text-sm text-white/60">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{app.lastUpdated}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <TrendingUp className="w-4 h-4" />
                      <span>{app.runCount} runs</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleOpenApp(app)}
                    className="flex-1 btn-primary flex items-center justify-center space-x-2 py-2"
                  >
                    <Play className="w-4 h-4" />
                    <span>{app.isGenerated ? 'Run Prototype' : 'Open'}</span>
                  </button>
                  
                  <button
                    onClick={() => handleEditApp(app.id)}
                    className="btn-secondary flex items-center justify-center space-x-2 py-2 px-3"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  
                  <button
                    onClick={() => handleExportApp(app.id)}
                    className="btn-secondary flex items-center justify-center space-x-2 py-2 px-3"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyApps;
