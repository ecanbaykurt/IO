import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Github, 
  Brain, 
  Download, 
  Play, 
  Save, 
  RefreshCw,
  CheckCircle,
  AlertCircle,
  BarChart3,
  Upload,
  Settings
} from 'lucide-react';
import toast from 'react-hot-toast';

interface AppPrototype {
  id: string;
  name: string;
  description: string;
  painPoint: any;
  githubRepo: any;
  huggingFaceModel: any;
  kaggleDataset: any;
  sector: string;
  features: string[];
  createdAt: string;
}

interface PrototypeResults {
  status: 'idle' | 'processing' | 'success' | 'error';
  data?: any;
  insights?: string[];
  recommendations?: string[];
  timestamp?: string;
}

const AppPrototype: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [app, setApp] = useState<AppPrototype | null>(null);
  const [results, setResults] = useState<PrototypeResults>({ status: 'idle' });
  const [inputData, setInputData] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    // Get app data from location state or localStorage
    const appData = location.state?.appData || 
                   JSON.parse(localStorage.getItem('appPrototypes') || '[]')
                     .find((app: AppPrototype) => app.id === id);
    
    if (appData) {
      setApp(appData);
    } else {
      // If no app found, redirect to Innovation Hub
      navigate('/explore');
      toast.error('App prototype not found');
    }
  }, [id, location.state, navigate]);

  const handleBackToHub = () => {
    navigate('/explore', { 
      state: { 
        preserveState: true,
        returnFromPrototype: true 
      } 
    });
  };

  const handleRunPrototype = async () => {
    if (!app) return;

    setIsProcessing(true);
    setResults({ status: 'processing' });

    try {
      // Simulate API processing based on sector and model
      const mockResults = await simulateAPIProcessing(app, inputData);
      setResults({
        status: 'success',
        data: mockResults.data,
        insights: mockResults.insights,
        recommendations: mockResults.recommendations,
        timestamp: new Date().toISOString()
      });
      
      toast.success('Prototype executed successfully!');
    } catch (error) {
      setResults({
        status: 'error',
        data: null
      });
      toast.error('Failed to process data');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSaveToMyApps = () => {
    if (!app) return;

    const savedApps = JSON.parse(localStorage.getItem('savedApps') || '[]');
    const appToSave = {
      ...app,
      id: `saved_${Date.now()}`,
      lastUpdated: new Date().toISOString(),
      runCount: 1,
      thumbnail: getSectorIcon(app.sector),
      tags: [app.sector, 'Generated', 'Prototype']
    };

    savedApps.push(appToSave);
    localStorage.setItem('savedApps', JSON.stringify(savedApps));
    
    toast.success('App saved to My Apps!');
  };

  const getSectorIcon = (sector: string): string => {
    const icons: Record<string, string> = {
      'finance': '💰',
      'healthcare': '🏥',
      'supply chain': '🚚',
      'technology': '💻'
    };
    return icons[sector] || '🚀';
  };

  const getSectorColor = (sector: string): string => {
    const colors: Record<string, string> = {
      'finance': 'from-green-500 to-emerald-600',
      'healthcare': 'from-blue-500 to-cyan-600',
      'supply chain': 'from-orange-500 to-amber-600',
      'technology': 'from-purple-500 to-pink-600'
    };
    return colors[sector] || 'from-purple-500 to-pink-600';
  };

  if (!app) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading app prototype...</div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900"
    >
      {/* Floating Back Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleBackToHub}
        className="fixed top-6 left-6 z-50 bg-white/10 backdrop-blur-md border border-white/20 rounded-full p-3 text-white hover:bg-white/20 transition-all duration-300"
      >
        <ArrowLeft className="w-6 h-6" />
      </motion.button>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center mb-4">
            <span className="text-6xl mr-4">{getSectorIcon(app.sector)}</span>
            <div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">
                {app.name}
              </h1>
              <p className="text-xl text-purple-200">{app.description}</p>
            </div>
          </div>
          
          {/* Source Links */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {app.githubRepo && (
              <a
                href={app.githubRepo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-4 py-2 text-white hover:bg-white/20 transition-all"
              >
                <Github className="w-5 h-5" />
                GitHub Repo
              </a>
            )}
            {app.huggingFaceModel && (
              <a
                href={app.huggingFaceModel.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-4 py-2 text-white hover:bg-white/20 transition-all"
              >
                <Brain className="w-5 h-5" />
                AI Model
              </a>
            )}
          </div>
        </motion.div>

        {/* Main App Interface */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-6xl mx-auto"
        >
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Upload className="w-6 h-6" />
                Input Data
              </h2>
              
              {/* Sector-specific input */}
              {app.sector === 'finance' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-white/80 text-sm mb-2">Expense Description</label>
                    <textarea
                      value={inputData}
                      onChange={(e) => setInputData(e.target.value)}
                      placeholder="Enter expense details (e.g., 'Coffee at Starbucks - $4.50')"
                      className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      rows={4}
                    />
                  </div>
                </div>
              )}

              {app.sector === 'healthcare' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-white/80 text-sm mb-2">Patient Information</label>
                    <textarea
                      value={inputData}
                      onChange={(e) => setInputData(e.target.value)}
                      placeholder="Enter patient details or symptoms"
                      className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      rows={4}
                    />
                  </div>
                </div>
              )}

              {app.sector === 'supply chain' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-white/80 text-sm mb-2">Inventory Data</label>
                    <textarea
                      value={inputData}
                      onChange={(e) => setInputData(e.target.value)}
                      placeholder="Enter inventory items and quantities"
                      className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      rows={4}
                    />
                  </div>
                </div>
              )}

              {app.sector === 'technology' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-white/80 text-sm mb-2">Project Details</label>
                    <textarea
                      value={inputData}
                      onChange={(e) => setInputData(e.target.value)}
                      placeholder="Enter project requirements or code snippets"
                      className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      rows={4}
                    />
                  </div>
                </div>
              )}

              {/* Run Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleRunPrototype}
                disabled={isProcessing || !inputData.trim()}
                className={`w-full bg-gradient-to-r ${getSectorColor(app.sector)} text-white font-bold py-4 px-8 rounded-xl hover:opacity-90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 mt-6`}
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5" />
                    Run Analysis
                  </>
                )}
              </motion.button>
            </div>

            {/* Results Section */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <BarChart3 className="w-6 h-6" />
                Results
              </h2>

              {results.status === 'idle' && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Settings className="w-8 h-8 text-white/60" />
                  </div>
                  <p className="text-white/80 text-lg">Enter data and click "Run Analysis" to see results</p>
                </div>
              )}

              {results.status === 'processing' && (
                <div className="text-center py-12">
                  <RefreshCw className="w-12 h-12 text-white/60 animate-spin mx-auto mb-4" />
                  <p className="text-white/80 text-lg">Processing your data...</p>
                  <p className="text-white/60 text-sm mt-2">This may take a moment</p>
                </div>
              )}

              {results.status === 'success' && results.data && (
                <div className="space-y-6">
                  {/* AI Insights */}
                  <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <h3 className="text-green-300 font-semibold">AI Analysis Complete</h3>
                    </div>
                    <p className="text-white/80 text-sm">{results.data.summary}</p>
                  </div>

                  {/* Insights */}
                  {results.insights && results.insights.length > 0 && (
                    <div>
                      <h4 className="text-white font-semibold mb-3">Key Insights</h4>
                      <ul className="space-y-2">
                        {results.insights.map((insight, index) => (
                          <li key={index} className="flex items-start gap-2 text-white/80 text-sm">
                            <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                            <span>{insight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Recommendations */}
                  {results.recommendations && results.recommendations.length > 0 && (
                    <div>
                      <h4 className="text-white font-semibold mb-3">Recommendations</h4>
                      <ul className="space-y-2">
                        {results.recommendations.map((rec, index) => (
                          <li key={index} className="flex items-start gap-2 text-white/80 text-sm">
                            <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Data Visualization */}
                  <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                    <h4 className="text-white font-semibold mb-3">Data Summary</h4>
                    <pre className="text-green-400 text-xs overflow-x-auto">
                      {JSON.stringify(results.data, null, 2)}
                    </pre>
                  </div>
                </div>
              )}

              {results.status === 'error' && (
                <div className="text-center py-12">
                  <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
                  <p className="text-white/80 text-lg">Failed to process data</p>
                  <p className="text-white/60 text-sm mt-2">Please try again</p>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 justify-center mt-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSaveToMyApps}
              className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-6 py-3 text-white hover:bg-white/20 transition-all"
            >
              <Save className="w-5 h-5" />
              Save to My Apps
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.print()}
              className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-6 py-3 text-white hover:bg-white/20 transition-all"
            >
              <Download className="w-5 h-5" />
              Export Results
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

// Simulate API processing based on sector and model
const simulateAPIProcessing = async (app: AppPrototype, inputData: string): Promise<any> => {
  // Simulate processing delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  const sector = app.sector;
  const model = app.huggingFaceModel?.name || 'default-model';

  // Generate sector-specific results
  const results: Record<string, any> = {
    finance: {
      summary: `AI analysis of your expense data using ${model}: Detected spending patterns and categorized expenses automatically.`,
      insights: [
        'Coffee expenses are 15% higher than last month',
        'Food spending is within budget limits',
        'Transportation costs decreased by 20%'
      ],
      recommendations: [
        'Consider reducing coffee purchases to save $50/month',
        'Set up automatic savings for the transportation surplus',
        'Review subscription services for potential savings'
      ],
      data: {
        totalAmount: '$245.67',
        categories: { food: '$120.50', transport: '$45.20', coffee: '$80.00' },
        trends: 'increasing'
      }
    },
    healthcare: {
      summary: `Medical analysis using ${model}: Processed patient information and provided health insights.`,
      insights: [
        'Symptoms suggest seasonal allergies',
        'No immediate medical attention required',
        'Consider allergy testing for confirmation'
      ],
      recommendations: [
        'Schedule follow-up appointment in 2 weeks',
        'Monitor symptoms and keep a health journal',
        'Consider over-the-counter allergy medication'
      ],
      data: {
        riskLevel: 'low',
        suggestedActions: ['monitor', 'follow-up'],
        urgency: 'routine'
      }
    },
    'supply chain': {
      summary: `Supply chain optimization using ${model}: Analyzed inventory levels and demand patterns.`,
      insights: [
        'Stock levels are optimal for current demand',
        'Seasonal items need restocking',
        'Supplier performance is above average'
      ],
      recommendations: [
        'Increase order quantity for high-demand items',
        'Negotiate better terms with top-performing suppliers',
        'Implement just-in-time inventory for slow-moving items'
      ],
      data: {
        stockLevel: '85%',
        turnoverRate: '2.3x',
        efficiency: 'good'
      }
    },
    technology: {
      summary: `Code analysis using ${model}: Reviewed project requirements and provided technical insights.`,
      insights: [
        'Code complexity is manageable',
        'Performance bottlenecks identified',
        'Security vulnerabilities need attention'
      ],
      recommendations: [
        'Refactor complex functions for better maintainability',
        'Implement caching for performance optimization',
        'Add input validation and error handling'
      ],
      data: {
        complexity: 'medium',
        performance: 'needs optimization',
        security: 'requires review'
      }
    }
  };

  return results[sector] || results.technology;
};

export default AppPrototype;
