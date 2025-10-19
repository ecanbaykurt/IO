import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Key, 
  Plus, 
  Trash2, 
  Eye, 
  EyeOff, 
  Copy, 
  Shield, 
  Clock,
  CheckCircle,
  AlertTriangle,
  Settings,
  Download
} from 'lucide-react';
import toast from 'react-hot-toast';

interface ApiKey {
  id: string;
  name: string;
  provider: string;
  value: string;
  isVisible: boolean;
  lastUsed: string;
  createdAt: string;
  scope: string[];
}

interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  totalApps: number;
  totalRuns: number;
  memberSince: string;
}

const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'keys' | 'settings'>('profile');
  const [showAddKeyModal, setShowAddKeyModal] = useState(false);
  const [newKey, setNewKey] = useState({
    name: '',
    provider: '',
    value: '',
    scope: ''
  });

  const [userProfile] = useState<UserProfile>({
    name: 'Alex Chen',
    email: 'alex@example.com',
    avatar: '👨‍💻',
    totalApps: 12,
    totalRuns: 156,
    memberSince: 'January 2024'
  });

  const [apiKeys, setApiKeys] = useState<ApiKey[]>([
    {
      id: '1',
      name: 'OpenWeather API',
      provider: 'OpenWeather',
      value: 'ow_1234567890abcdef',
      isVisible: false,
      lastUsed: '2 hours ago',
      createdAt: 'Jan 15, 2024',
      scope: ['weather', 'forecast']
    },
    {
      id: '2',
      name: 'Google Maps API',
      provider: 'Google',
      value: 'gm_abcdef1234567890',
      isVisible: false,
      lastUsed: '1 day ago',
      createdAt: 'Jan 10, 2024',
      scope: ['maps', 'geocoding']
    },
    {
      id: '3',
      name: 'OpenAI API',
      provider: 'OpenAI',
      value: 'sk-1234567890abcdef',
      isVisible: false,
      lastUsed: '3 days ago',
      createdAt: 'Jan 5, 2024',
      scope: ['chat', 'completion']
    }
  ]);

  const handleToggleVisibility = (keyId: string) => {
    setApiKeys(prev => prev.map(key => 
      key.id === keyId ? { ...key, isVisible: !key.isVisible } : key
    ));
  };

  const handleCopyKey = (key: ApiKey) => {
    navigator.clipboard.writeText(key.value);
    toast.success('API key copied to clipboard');
  };

  const handleDeleteKey = (keyId: string) => {
    setApiKeys(prev => prev.filter(key => key.id !== keyId));
    toast.success('API key deleted');
  };

  const handleAddKey = () => {
    if (!newKey.name || !newKey.provider || !newKey.value) {
      toast.error('Please fill in all fields');
      return;
    }

    const key: ApiKey = {
      id: Date.now().toString(),
      name: newKey.name,
      provider: newKey.provider,
      value: newKey.value,
      isVisible: false,
      lastUsed: 'Never',
      createdAt: new Date().toLocaleDateString(),
      scope: newKey.scope.split(',').map(s => s.trim())
    };

    setApiKeys(prev => [...prev, key]);
    setNewKey({ name: '', provider: '', value: '', scope: '' });
    setShowAddKeyModal(false);
    toast.success('API key added successfully');
  };

  const maskKey = (key: string) => {
    if (key.length <= 8) return '*'.repeat(key.length);
    return key.substring(0, 4) + '*'.repeat(key.length - 8) + key.substring(key.length - 4);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gradient-from to-gradient-to">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Profile & Settings</h1>
          <p className="text-white/70">Manage your account and API keys</p>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-white/10 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex items-center space-x-2 py-2 px-4 rounded-md transition-all duration-200 ${
                activeTab === 'profile'
                  ? 'bg-white/20 text-white'
                  : 'text-white/60 hover:text-white hover:bg-white/10'
              }`}
            >
              <User className="w-4 h-4" />
              <span>Profile</span>
            </button>
            <button
              onClick={() => setActiveTab('keys')}
              className={`flex items-center space-x-2 py-2 px-4 rounded-md transition-all duration-200 ${
                activeTab === 'keys'
                  ? 'bg-white/20 text-white'
                  : 'text-white/60 hover:text-white hover:bg-white/10'
              }`}
            >
              <Key className="w-4 h-4" />
              <span>API Keys</span>
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`flex items-center space-x-2 py-2 px-4 rounded-md transition-all duration-200 ${
                activeTab === 'settings'
                  ? 'bg-white/20 text-white'
                  : 'text-white/60 hover:text-white hover:bg-white/10'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'profile' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            {/* Profile Info */}
            <div className="lg:col-span-2">
              <div className="card">
                <h3 className="text-white font-semibold text-lg mb-6">Profile Information</h3>
                
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-2xl">
                      {userProfile.avatar}
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-xl">{userProfile.name}</h4>
                      <p className="text-white/70">{userProfile.email}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white/80 text-sm font-medium mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={userProfile.name}
                        className="input-field"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-white/80 text-sm font-medium mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={userProfile.email}
                        className="input-field"
                        readOnly
                      />
                    </div>
                  </div>
                  
                  <button className="btn-primary">
                    Update Profile
                  </button>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="space-y-6">
              <div className="card">
                <h4 className="text-white font-semibold mb-4">Usage Statistics</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-white/70">Total Apps</span>
                    <span className="text-white font-semibold">{userProfile.totalApps}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/70">Total Runs</span>
                    <span className="text-white font-semibold">{userProfile.totalRuns}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/70">Member Since</span>
                    <span className="text-white font-semibold">{userProfile.memberSince}</span>
                  </div>
                </div>
              </div>

              <div className="card">
                <h4 className="text-white font-semibold mb-4">Quick Actions</h4>
                <div className="space-y-3">
                  <button className="btn-secondary w-full flex items-center justify-center space-x-2">
                    <Download className="w-4 h-4" />
                    <span>Export Data</span>
                  </button>
                  <button className="btn-secondary w-full flex items-center justify-center space-x-2">
                    <Settings className="w-4 h-4" />
                    <span>Account Settings</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'keys' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Security Notice */}
            <div className="card">
              <div className="flex items-start space-x-3">
                <Shield className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-white font-medium mb-1">Secure Storage</h4>
                  <p className="text-white/70 text-sm">
                    Keys are stored securely with GCP Secret Manager. Never shared across apps without consent.
                  </p>
                </div>
              </div>
            </div>

            {/* API Keys List */}
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-white font-semibold text-lg">API Keys</h3>
                <button
                  onClick={() => setShowAddKeyModal(true)}
                  className="btn-primary flex items-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Key</span>
                </button>
              </div>

              <div className="space-y-4">
                {apiKeys.map((key) => (
                  <div key={key.id} className="bg-white/5 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="text-white font-medium">{key.name}</h4>
                        <p className="text-white/60 text-sm">Provider: {key.provider}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleToggleVisibility(key.id)}
                          className="p-2 text-white/60 hover:text-white transition-colors"
                        >
                          {key.isVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={() => handleCopyKey(key)}
                          className="p-2 text-white/60 hover:text-white transition-colors"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteKey(key.id)}
                          className="p-2 text-red-400 hover:text-red-300 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="bg-gray-900 rounded p-3 mb-3">
                      <code className="text-white/80 font-mono text-sm">
                        {key.isVisible ? key.value : maskKey(key.value)}
                      </code>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-4">
                        <span className="text-white/60">
                          Last used: {key.lastUsed}
                        </span>
                        <span className="text-white/60">
                          Created: {key.createdAt}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        {key.scope.map((scope, idx) => (
                          <span
                            key={idx}
                            className="bg-primary-500/20 text-primary-300 text-xs px-2 py-1 rounded"
                          >
                            {scope}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'settings' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="card">
              <h3 className="text-white font-semibold text-lg mb-6">Account Settings</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">
                    Email Notifications
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" className="rounded" defaultChecked />
                      <span className="text-white/80">App generation updates</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" className="rounded" defaultChecked />
                      <span className="text-white/80">API key security alerts</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" className="rounded" />
                      <span className="text-white/80">Community updates</span>
                    </label>
                  </div>
                </div>
                
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">
                    Privacy Settings
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" className="rounded" defaultChecked />
                      <span className="text-white/80">Make apps public by default</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" className="rounded" />
                      <span className="text-white/80">Allow app analytics</span>
                    </label>
                  </div>
                </div>
                
                <button className="btn-primary">
                  Save Settings
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Add Key Modal */}
        {showAddKeyModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="card max-w-md w-full"
            >
              <h3 className="text-white font-semibold text-lg mb-6">Add New API Key</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">
                    Key Name
                  </label>
                  <input
                    type="text"
                    value={newKey.name}
                    onChange={(e) => setNewKey(prev => ({ ...prev, name: e.target.value }))}
                    className="input-field"
                    placeholder="e.g., My Weather API"
                  />
                </div>
                
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">
                    Provider
                  </label>
                  <select
                    value={newKey.provider}
                    onChange={(e) => setNewKey(prev => ({ ...prev, provider: e.target.value }))}
                    className="input-field"
                  >
                    <option value="">Select Provider</option>
                    <option value="OpenWeather">OpenWeather</option>
                    <option value="Google">Google</option>
                    <option value="OpenAI">OpenAI</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">
                    API Key
                  </label>
                  <input
                    type="text"
                    value={newKey.value}
                    onChange={(e) => setNewKey(prev => ({ ...prev, value: e.target.value }))}
                    className="input-field"
                    placeholder="Enter your API key"
                  />
                </div>
                
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">
                    Scope (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={newKey.scope}
                    onChange={(e) => setNewKey(prev => ({ ...prev, scope: e.target.value }))}
                    className="input-field"
                    placeholder="e.g., weather, forecast"
                  />
                </div>
              </div>
              
              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => setShowAddKeyModal(false)}
                  className="btn-secondary flex-1"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddKey}
                  className="btn-primary flex-1"
                >
                  Add Key
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
