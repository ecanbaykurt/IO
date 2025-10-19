import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  ExternalLink, 
  Star, 
  Download, 
  Github, 
  Brain, 
  Database,
  TrendingUp,
  Loader2,
  AlertCircle,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { TechNeed, SectorConfig } from '../types/inspireMe';
import { generateTechNeeds, SECTOR_CONFIGS } from '../services/apiService';
import toast from 'react-hot-toast';

interface InspireMeModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedSector: string;
}

const InspireMeModal: React.FC<InspireMeModalProps> = ({ isOpen, onClose, selectedSector }) => {
  const navigate = useNavigate();
  const [techNeeds, setTechNeeds] = useState<TechNeed[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeSector, setActiveSector] = useState(selectedSector);

  useEffect(() => {
    if (isOpen && selectedSector) {
      setActiveSector(selectedSector);
      fetchTechNeeds(selectedSector);
    }
  }, [isOpen, selectedSector]);

  const fetchTechNeeds = async (sector: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const needs = await generateTechNeeds(sector);
      setTechNeeds(needs);
      
      if (needs.length === 0) {
        setError('No tech needs found for this sector. Try a different sector or check back later.');
      }
    } catch (err) {
      setError('Failed to fetch tech needs. Please try again.');
      console.error('Error fetching tech needs:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateApp = (techNeed: TechNeed) => {
    // Create a structured app prototype
    const appPrototype = {
      id: `prototype_${Date.now()}`,
      name: `${activeSector} Solution - ${techNeed.painPoint.title.slice(0, 30)}`,
      description: techNeed.appIdea,
      painPoint: techNeed.painPoint,
      githubRepo: techNeed.githubRepo,
      huggingFaceModel: techNeed.huggingFaceModel,
      kaggleDataset: techNeed.kaggleDataset,
      sector: activeSector,
      features: generateAppFeatures(activeSector),
      createdAt: new Date().toISOString()
    };

    // Navigate to prototype page with app data
    navigate(`/prototype/${appPrototype.id}`, { 
      state: { 
        appData: appPrototype,
        preserveInspireMeState: true 
      } 
    });

    toast.success('App prototype generated! Opening interactive prototype...');
    onClose();
  };

  const generateAppFeatures = (sector: string): string[] => {
    const features: Record<string, string[]> = {
      'finance': ['Expense Tracking', 'AI Categorization', 'Budget Analysis', 'Spending Insights'],
      'healthcare': ['Patient Management', 'Health Monitoring', 'Appointment Scheduling', 'Medical Records'],
      'supply chain': ['Inventory Tracking', 'Demand Forecasting', 'Supplier Management', 'Logistics Optimization'],
      'technology': ['Project Management', 'Code Analysis', 'Performance Monitoring', 'Team Collaboration']
    };
    return features[sector] || ['Data Processing', 'AI Analysis', 'Results Visualization', 'Export Functionality'];
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString();
  };

  const getSectorIcon = (sector: string) => {
    return SECTOR_CONFIGS[sector]?.icon || '💡';
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-gradient-to-br from-gradient-from to-gradient-to rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-6 border-b border-white/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Inspire Me</h2>
                    <p className="text-white/70">Discover trending tech needs in {activeSector}</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Sector Tabs */}
              <div className="flex space-x-2 mt-4 overflow-x-auto">
                {Object.values(SECTOR_CONFIGS).map((sector) => (
                  <button
                    key={sector.id}
                    onClick={() => {
                      setActiveSector(sector.id);
                      fetchTechNeeds(sector.id);
                    }}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all duration-200 ${
                      activeSector === sector.id
                        ? 'bg-white/20 text-white'
                        : 'bg-white/10 text-white/80 hover:bg-white/20 hover:text-white'
                    }`}
                  >
                    <span>{sector.icon}</span>
                    <span>{sector.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <Loader2 className="w-12 h-12 text-white/60 animate-spin mb-4" />
                  <p className="text-white/80 text-lg">Analyzing trending needs...</p>
                  <p className="text-white/60 text-sm mt-2">This may take a moment</p>
                </div>
              ) : error ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <AlertCircle className="w-12 h-12 text-red-400 mb-4" />
                  <p className="text-white/80 text-lg mb-4">{error}</p>
                  <button
                    onClick={() => fetchTechNeeds(activeSector)}
                    className="btn-primary"
                  >
                    Try Again
                  </button>
                </div>
              ) : techNeeds.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <TrendingUp className="w-12 h-12 text-white/60 mb-4" />
                  <p className="text-white/80 text-lg">No trending needs found</p>
                  <p className="text-white/60 text-sm mt-2">Try a different sector</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {techNeeds.map((techNeed, index) => (
                    <motion.div
                      key={techNeed.painPoint.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="card"
                    >
                      {/* Pain Point Header */}
                      <div className="mb-4">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-white font-semibold text-lg leading-tight">
                            {techNeed.painPoint.title}
                          </h3>
                          <span className="bg-red-500/20 text-red-300 text-xs px-2 py-1 rounded-full">
                            r/{techNeed.painPoint.subreddit}
                          </span>
                        </div>
                        <p className="text-white/70 text-sm mb-3">
                          {techNeed.painPoint.description.slice(0, 200)}
                          {techNeed.painPoint.description.length > 200 && '...'}
                        </p>
                        <div className="flex items-center space-x-4 text-xs text-white/60">
                          <span>Score: {techNeed.painPoint.score}</span>
                          <span>Author: u/{techNeed.painPoint.author}</span>
                          <span>{formatDate(techNeed.painPoint.created)}</span>
                        </div>
                      </div>

                      {/* Matched Resources */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        {/* GitHub Repo */}
                        {techNeed.githubRepo && (
                          <div className="bg-white/5 rounded-lg p-4">
                            <div className="flex items-center space-x-2 mb-2">
                              <Github className="w-4 h-4 text-white/80" />
                              <span className="text-white/80 font-medium text-sm">GitHub Repo</span>
                            </div>
                            <h4 className="text-white font-medium text-sm mb-1">
                              {techNeed.githubRepo.name}
                            </h4>
                            <p className="text-white/60 text-xs mb-2">
                              {techNeed.githubRepo.description.slice(0, 100)}...
                            </p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2 text-xs text-white/60">
                                <Star className="w-3 h-3" />
                                <span>{techNeed.githubRepo.stars}</span>
                                <span>{techNeed.githubRepo.language}</span>
                              </div>
                              <a
                                href={techNeed.githubRepo.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary-400 hover:text-primary-300"
                              >
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            </div>
                          </div>
                        )}

                        {/* HuggingFace Model */}
                        {techNeed.huggingFaceModel && (
                          <div className="bg-white/5 rounded-lg p-4">
                            <div className="flex items-center space-x-2 mb-2">
                              <Brain className="w-4 h-4 text-white/80" />
                              <span className="text-white/80 font-medium text-sm">AI Model</span>
                            </div>
                            <h4 className="text-white font-medium text-sm mb-1">
                              {techNeed.huggingFaceModel.name}
                            </h4>
                            <p className="text-white/60 text-xs mb-2">
                              {techNeed.huggingFaceModel.description.slice(0, 100)}...
                            </p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2 text-xs text-white/60">
                                <Download className="w-3 h-3" />
                                <span>{techNeed.huggingFaceModel.downloads.toLocaleString()}</span>
                              </div>
                              <a
                                href={techNeed.huggingFaceModel.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary-400 hover:text-primary-300"
                              >
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            </div>
                          </div>
                        )}

                        {/* Kaggle Dataset */}
                        {techNeed.kaggleDataset && (
                          <div className="bg-white/5 rounded-lg p-4">
                            <div className="flex items-center space-x-2 mb-2">
                              <Database className="w-4 h-4 text-white/80" />
                              <span className="text-white/80 font-medium text-sm">Dataset</span>
                            </div>
                            <h4 className="text-white font-medium text-sm mb-1">
                              {techNeed.kaggleDataset.title}
                            </h4>
                            <p className="text-white/60 text-xs mb-2">
                              {techNeed.kaggleDataset.description.slice(0, 100)}...
                            </p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2 text-xs text-white/60">
                                <Download className="w-3 h-3" />
                                <span>{techNeed.kaggleDataset.downloadCount.toLocaleString()}</span>
                              </div>
                              <a
                                href={techNeed.kaggleDataset.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary-400 hover:text-primary-300"
                              >
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* App Idea */}
                      <div className="bg-primary-500/10 border border-primary-500/30 rounded-lg p-4 mb-4">
                        <h4 className="text-primary-300 font-medium text-sm mb-2">Generated App Idea</h4>
                        <p className="text-white/80 text-sm">{techNeed.appIdea}</p>
                      </div>

                      {/* Generate Button */}
                      <button
                        onClick={() => handleGenerateApp(techNeed)}
                        className="btn-primary w-full flex items-center justify-center space-x-2"
                      >
                        <Sparkles className="w-4 h-4" />
                        <span>Generate App Prototype</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InspireMeModal;
