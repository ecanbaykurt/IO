import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Code, 
  Database, 
  Eye, 
  Save, 
  Download, 
  RefreshCw, 
  CheckCircle, 
  Clock,
  ArrowRight,
  FileText,
  Settings
} from 'lucide-react';
import toast from 'react-hot-toast';

interface GenerationStep {
  id: string;
  name: string;
  status: 'pending' | 'in-progress' | 'completed';
  description: string;
}

const PromptWorkspace: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState(location.state?.prompt || 'Build me a calendar + notes app');
  const [isGenerating, setIsGenerating] = useState(false);
  const [activePanel, setActivePanel] = useState<'ui' | 'api' | 'preview'>('ui');
  const [generationSteps, setGenerationSteps] = useState<GenerationStep[]>([
    { id: 'ui', name: 'UI Generation', status: 'pending', description: 'Creating React components with Tailwind' },
    { id: 'api', name: 'API Logic', status: 'pending', description: 'Building backend endpoints and data flow' },
    { id: 'preview', name: 'Live Preview', status: 'pending', description: 'Setting up hot-reload environment' }
  ]);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error('Please enter a prompt');
      return;
    }

    setIsGenerating(true);
    
    // Simulate generation steps
    for (let i = 0; i < generationSteps.length; i++) {
      setGenerationSteps(prev => 
        prev.map((step, index) => ({
          ...step,
          status: index === i ? 'in-progress' : index < i ? 'completed' : 'pending'
        }))
      );
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setGenerationSteps(prev => 
        prev.map((step, index) => ({
          ...step,
          status: index <= i ? 'completed' : 'pending'
        }))
      );
    }
    
    setIsGenerating(false);
    toast.success('App generated successfully!');
  };

  const handleSave = () => {
    toast.success('App saved to My Apps');
    navigate('/my-apps');
  };

  const handleExport = () => {
    toast.success('Exporting to GitHub...');
  };

  const panels = [
    {
      id: 'ui' as const,
      title: 'UI Skeleton',
      icon: Code,
      content: (
        <div className="space-y-4">
          <div className="bg-gray-900 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-3">
              <FileText className="w-4 h-4 text-green-400" />
              <span className="text-sm text-gray-300">src/components/Calendar.tsx</span>
            </div>
            <pre className="text-sm text-gray-300 overflow-x-auto">
{`import React from 'react';

export default function Calendar() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Calendar</h2>
      <div className="grid grid-cols-7 gap-2">
        {/* Calendar grid */}
      </div>
    </div>
  );
}`}
            </pre>
          </div>
        </div>
      )
    },
    {
      id: 'api' as const,
      title: 'API Suggestions',
      icon: Database,
      content: (
        <div className="space-y-4">
          <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
            <h4 className="text-blue-300 font-semibold mb-2">Recommended Endpoints</h4>
            <ul className="space-y-2 text-sm">
              <li className="text-blue-200">• GET /api/events - List calendar events</li>
              <li className="text-blue-200">• POST /api/events - Create new event</li>
              <li className="text-blue-200">• GET /api/notes - List notes</li>
              <li className="text-blue-200">• POST /api/notes - Create note</li>
            </ul>
          </div>
          
          <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
            <h4 className="text-green-300 font-semibold mb-2">Third-party Integrations</h4>
            <ul className="space-y-2 text-sm">
              <li className="text-green-200">• Google Calendar API</li>
              <li className="text-green-200">• Notion API for notes</li>
              <li className="text-green-200">• Auth0 for authentication</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'preview' as const,
      title: 'Live Preview',
      icon: Eye,
      content: (
        <div className="bg-white rounded-lg shadow-lg">
          <div className="border-b border-gray-200 p-3">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600 ml-2">localhost:3000</span>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800">Calendar + Notes App</h3>
                <p className="text-gray-600 text-sm mt-1">Your personal productivity hub</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-lg p-3">
                  <h4 className="font-medium text-gray-700">Today's Events</h4>
                  <p className="text-sm text-gray-500 mt-1">No events scheduled</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-3">
                  <h4 className="font-medium text-gray-700">Quick Notes</h4>
                  <p className="text-sm text-gray-500 mt-1">Add a note...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gradient-from to-gradient-to">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex-1">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="input-field text-lg"
                placeholder="Describe your app idea..."
              />
            </div>
            <div className="flex space-x-3">
              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="btn-primary flex items-center space-x-2"
              >
                {isGenerating ? (
                  <RefreshCw className="w-5 h-5 animate-spin" />
                ) : (
                  <RefreshCw className="w-5 h-5" />
                )}
                <span>{isGenerating ? 'Generating...' : 'Generate'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Generation Progress */}
        {isGenerating && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="card">
              <h3 className="text-white font-semibold mb-4">Generation Progress</h3>
              <div className="space-y-3">
                {generationSteps.map((step) => (
                  <div key={step.id} className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      {step.status === 'completed' && <CheckCircle className="w-5 h-5 text-green-400" />}
                      {step.status === 'in-progress' && <Clock className="w-5 h-5 text-blue-400 animate-pulse" />}
                      {step.status === 'pending' && <div className="w-5 h-5 rounded-full border-2 border-white/30" />}
                    </div>
                    <div className="flex-1">
                      <div className="text-white font-medium">{step.name}</div>
                      <div className="text-white/60 text-sm">{step.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Panel Tabs */}
        <div className="mb-6">
          <div className="flex space-x-1 bg-white/10 rounded-lg p-1">
            {panels.map((panel) => {
              const Icon = panel.icon;
              return (
                <button
                  key={panel.id}
                  onClick={() => setActivePanel(panel.id)}
                  className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md transition-all duration-200 ${
                    activePanel === panel.id
                      ? 'bg-white/20 text-white'
                      : 'text-white/60 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{panel.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Panel Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activePanel}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="mb-8"
          >
            <div className="card">
              {panels.find(p => p.id === activePanel)?.content}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleSave}
            className="btn-primary flex items-center justify-center space-x-2"
          >
            <Save className="w-5 h-5" />
            <span>Save to My Apps</span>
          </button>
          
          <button
            onClick={handleExport}
            className="btn-secondary flex items-center justify-center space-x-2"
          >
            <Download className="w-5 h-5" />
            <span>Export</span>
          </button>
          
          <button
            onClick={() => setPrompt('')}
            className="btn-secondary flex items-center justify-center space-x-2"
          >
            <RefreshCw className="w-5 h-5" />
            <span>Tweak Prompt</span>
          </button>
        </div>

        {/* Guidance Checklist */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8"
        >
          <div className="card">
            <h3 className="text-white font-semibold mb-4">Next Steps</h3>
            <div className="space-y-2">
              <label className="flex items-center space-x-3 text-white/80">
                <input type="checkbox" className="rounded" />
                <span>Add date picker to calendar</span>
              </label>
              <label className="flex items-center space-x-3 text-white/80">
                <input type="checkbox" className="rounded" />
                <span>Implement note tagging system</span>
              </label>
              <label className="flex items-center space-x-3 text-white/80">
                <input type="checkbox" className="rounded" />
                <span>Connect to your API keys</span>
              </label>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PromptWorkspace;
