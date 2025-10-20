import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Play, 
  Square, 
  Settings, 
  Key, 
  Terminal, 
  AlertCircle,
  CheckCircle,
  RefreshCw,
  Eye,
  EyeOff,
  Copy,
  ExternalLink
} from 'lucide-react';
import toast from 'react-hot-toast';

interface ApiKey {
  id: string;
  name: string;
  value: string;
  provider: string;
  isConnected: boolean;
}

interface LogEntry {
  id: string;
  timestamp: string;
  type: 'info' | 'success' | 'error' | 'warning';
  message: string;
}

const AppRunner: React.FC = () => {
  const { appId } = useParams<{ appId: string }>();
  const navigate = useNavigate();
  const [isRunning, setIsRunning] = useState(false);
  const [activeTab, setActiveTab] = useState<'inputs' | 'keys' | 'console'>('inputs');
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([
    {
      id: '1',
      name: 'OpenWeather API',
      value: 'ow_****_****_****',
      provider: 'OpenWeather',
      isConnected: false
    },
    {
      id: '2',
      name: 'Google Maps API',
      value: 'gm_****_****_****',
      provider: 'Google',
      isConnected: false
    }
  ]);
  const [logs, setLogs] = useState<LogEntry[]>([
    {
      id: '1',
      timestamp: '14:32:15',
      type: 'info',
      message: 'App initialized successfully'
    },
    {
      id: '2',
      timestamp: '14:32:16',
      type: 'success',
      message: 'Connected to OpenWeather API'
    }
  ]);
  const [inputs, setInputs] = useState({
    city: 'San Francisco',
    units: 'metric',
    theme: 'light'
  });

  const handleStartApp = () => {
    setIsRunning(true);
    setLogs(prev => [...prev, {
      id: Date.now().toString(),
      timestamp: new Date().toLocaleTimeString(),
      type: 'info',
      message: 'Starting app execution...'
    }]);
    toast.success('App started successfully');
  };

  const handleStopApp = () => {
    setIsRunning(false);
    setLogs(prev => [...prev, {
      id: Date.now().toString(),
      timestamp: new Date().toLocaleTimeString(),
      type: 'warning',
      message: 'App stopped by user'
    }]);
    toast('App stopped', {
      icon: 'ℹ️',
      style: {
        background: '#3B82F6',
        color: '#fff',
      },
    });
  };

  const handleConnectKey = (keyId: string) => {
    setApiKeys(prev => prev.map(key => 
      key.id === keyId 
        ? { ...key, isConnected: !key.isConnected }
        : key
    ));
    
    const key = apiKeys.find(k => k.id === keyId);
    if (key) {
      setLogs(prev => [...prev, {
        id: Date.now().toString(),
        timestamp: new Date().toLocaleTimeString(),
        type: key.isConnected ? 'warning' : 'success',
        message: `${key.isConnected ? 'Disconnected' : 'Connected'} ${key.name}`
      }]);
    }
  };

  const handleCopyKey = (key: ApiKey) => {
    navigator.clipboard.writeText(key.value);
    toast.success('API key copied to clipboard');
  };

  const getLogIcon = (type: LogEntry['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-400" />;
      case 'warning':
        return <AlertCircle className="w-4 h-4 text-yellow-400" />;
      default:
        return <Terminal className="w-4 h-4 text-blue-400" />;
    }
  };

  const getLogColor = (type: LogEntry['type']) => {
    switch (type) {
      case 'success':
        return 'text-green-300';
      case 'error':
        return 'text-red-300';
      case 'warning':
        return 'text-yellow-300';
      default:
        return 'text-white/80';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gradient-from to-gradient-to">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">App Runner</h1>
              <p className="text-white/70">Test your app in an isolated sandbox environment</p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={isRunning ? handleStopApp : handleStartApp}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  isRunning
                    ? 'bg-red-600 hover:bg-red-700 text-white'
                    : 'bg-green-600 hover:bg-green-700 text-white'
                }`}
              >
                {isRunning ? (
                  <>
                    <Square className="w-5 h-5" />
                    <span>Stop App</span>
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5" />
                    <span>Start App</span>
                  </>
                )}
              </button>
              
              <div className="flex items-center space-x-2 bg-white/10 rounded-lg px-3 py-2">
                <div className={`w-2 h-2 rounded-full ${isRunning ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}></div>
                <span className="text-white/80 text-sm">
                  {isRunning ? 'Running' : 'Stopped'}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main App Preview */}
          <div className="lg:col-span-2">
            <div className="card mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-semibold">Live Preview</h3>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-400 text-sm">Live</span>
                </div>
              </div>
              
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
                      <h3 className="font-semibold text-gray-800">Weather Dashboard</h3>
                      <p className="text-gray-600 text-sm mt-1">Current weather for {inputs.city}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="border border-gray-200 rounded-lg p-3">
                        <h4 className="font-medium text-gray-700">Temperature</h4>
                        <p className="text-2xl font-bold text-blue-600">22°C</p>
                      </div>
                      <div className="border border-gray-200 rounded-lg p-3">
                        <h4 className="font-medium text-gray-700">Condition</h4>
                        <p className="text-sm text-gray-600">Partly Cloudy</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Control Panel */}
          <div className="space-y-6">
            {/* Tabs */}
            <div className="card">
              <div className="flex space-x-1 bg-white/10 rounded-lg p-1 mb-4">
                <button
                  onClick={() => setActiveTab('inputs')}
                  className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all duration-200 ${
                    activeTab === 'inputs'
                      ? 'bg-white/20 text-white'
                      : 'text-white/60 hover:text-white hover:bg-white/10'
                  }`}
                >
                  Inputs
                </button>
                <button
                  onClick={() => setActiveTab('keys')}
                  className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all duration-200 ${
                    activeTab === 'keys'
                      ? 'bg-white/20 text-white'
                      : 'text-white/60 hover:text-white hover:bg-white/10'
                  }`}
                >
                  Keys
                </button>
                <button
                  onClick={() => setActiveTab('console')}
                  className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all duration-200 ${
                    activeTab === 'console'
                      ? 'bg-white/20 text-white'
                      : 'text-white/60 hover:text-white hover:bg-white/10'
                  }`}
                >
                  Console
                </button>
              </div>

              {/* Tab Content */}
              {activeTab === 'inputs' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      value={inputs.city}
                      onChange={(e) => setInputs(prev => ({ ...prev, city: e.target.value }))}
                      className="input-field"
                      placeholder="Enter city name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">
                      Units
                    </label>
                    <select
                      value={inputs.units}
                      onChange={(e) => setInputs(prev => ({ ...prev, units: e.target.value }))}
                      className="input-field"
                    >
                      <option value="metric">Metric (°C)</option>
                      <option value="imperial">Imperial (°F)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">
                      Theme
                    </label>
                    <select
                      value={inputs.theme}
                      onChange={(e) => setInputs(prev => ({ ...prev, theme: e.target.value }))}
                      className="input-field"
                    >
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                    </select>
                  </div>
                </div>
              )}

              {activeTab === 'keys' && (
                <div className="space-y-4">
                  <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-3">
                    <p className="text-blue-300 text-sm">
                      Keys are stored securely with GCP Secret Manager. Never shared across apps without consent.
                    </p>
                  </div>
                  
                  {apiKeys.map((key) => (
                    <div key={key.id} className="bg-white/5 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-white font-medium">{key.name}</h4>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleConnectKey(key.id)}
                            className={`px-3 py-1 rounded text-xs font-medium transition-all duration-200 ${
                              key.isConnected
                                ? 'bg-green-600 text-white'
                                : 'bg-white/10 text-white/80 hover:bg-white/20'
                            }`}
                          >
                            {key.isConnected ? 'Connected' : 'Connect'}
                          </button>
                          <button
                            onClick={() => handleCopyKey(key)}
                            className="p-1 text-white/60 hover:text-white transition-colors"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <p className="text-white/60 text-sm font-mono">{key.value}</p>
                      <p className="text-white/40 text-xs mt-1">Provider: {key.provider}</p>
                    </div>
                  ))}
                  
                  <button className="btn-secondary w-full flex items-center justify-center space-x-2">
                    <Key className="w-4 h-4" />
                    <span>Add New Key</span>
                  </button>
                </div>
              )}

              {activeTab === 'console' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-white font-medium">Execution Logs</h4>
                    <button className="text-white/60 hover:text-white transition-colors">
                      <RefreshCw className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="bg-gray-900 rounded-lg p-4 max-h-64 overflow-y-auto">
                    <div className="space-y-2">
                      {logs.map((log) => (
                        <div key={log.id} className="flex items-start space-x-3">
                          <div className="flex-shrink-0 mt-0.5">
                            {getLogIcon(log.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2">
                              <span className="text-white/40 text-xs font-mono">
                                {log.timestamp}
                              </span>
                            </div>
                            <p className={`text-sm ${getLogColor(log.type)}`}>
                              {log.message}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <button className="btn-secondary w-full flex items-center justify-center space-x-2">
                    <Terminal className="w-4 h-4" />
                    <span>Clear Logs</span>
                  </button>
                </div>
              )}
            </div>

            {/* Safety Notice */}
            <div className="card">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-white font-medium mb-1">Sandbox Environment</h4>
                  <p className="text-white/70 text-sm">
                    This app runs in complete isolation. No cross-app data access is possible.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppRunner;
