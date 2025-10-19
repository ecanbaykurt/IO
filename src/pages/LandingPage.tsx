import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Zap } from 'lucide-react';
import toast from 'react-hot-toast';

const LandingPage: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const navigate = useNavigate();

  const examplePrompts = [
    'Weather App',
    'Habit Tracker', 
    'AI Chatbot'
  ];

  const handleCreateApp = () => {
    if (!prompt.trim()) {
      toast.error('Please describe your app idea');
      return;
    }
    
    // Navigate to workspace with the prompt
    navigate('/workspace', { state: { prompt } });
  };

  const handleExampleClick = (example: string) => {
    setPrompt(example);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Turn prompts into apps—
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                instantly
              </span>
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              No code. No setup. Just ship.
            </p>
          </motion.div>

          {/* Input Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleCreateApp()}
                  placeholder="Describe your app idea..."
                  className="input-field text-lg pr-12"
                />
                <button
                  onClick={handleCreateApp}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary-600 hover:bg-primary-700 text-white p-2 rounded-lg transition-all duration-200"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
              
              {/* Create App Button */}
              <button
                onClick={handleCreateApp}
                className="btn-primary w-full mt-4 text-lg py-4 flex items-center justify-center space-x-2"
              >
                <Zap className="w-6 h-6" />
                <span>Create App</span>
              </button>
            </div>
          </motion.div>

          {/* Example Prompts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-12"
          >
            <p className="text-white/60 mb-4">Try these examples:</p>
            <div className="flex flex-wrap justify-center gap-3">
              {examplePrompts.map((example, index) => (
                <button
                  key={index}
                  onClick={() => handleExampleClick(example)}
                  className="example-chip hover:scale-105 transform transition-all duration-200"
                >
                  {example}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Features Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
          >
            <div className="card text-center">
              <div className="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-primary-400" />
              </div>
              <h3 className="text-white font-semibold mb-2">Instant Generation</h3>
              <p className="text-white/70 text-sm">Turn ideas into React + API blueprints in seconds</p>
            </div>
            
            <div className="card text-center">
              <div className="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6 text-primary-400" />
              </div>
              <h3 className="text-white font-semibold mb-2">Real-time Preview</h3>
              <p className="text-white/70 text-sm">See changes instantly with hot-reloading</p>
            </div>
            
            <div className="card text-center">
              <div className="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <ArrowRight className="w-6 h-6 text-primary-400" />
              </div>
              <h3 className="text-white font-semibold mb-2">One-Click Export</h3>
              <p className="text-white/70 text-sm">Deploy to GitHub/GCP with a single click</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="py-8 px-4 text-center"
      >
        <p className="text-white/60 text-sm">
          Built with ❤️ for creators who ship fast
        </p>
      </motion.footer>
    </div>
  );
};

export default LandingPage;
