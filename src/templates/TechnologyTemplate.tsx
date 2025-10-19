import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code, GitBranch, Shield, Zap, AlertCircle, CheckCircle } from 'lucide-react';

interface TechnologyTemplateProps {
  onDataProcessed: (results: any) => void;
  isLoading: boolean;
}

const TechnologyTemplate: React.FC<TechnologyTemplateProps> = ({ onDataProcessed, isLoading }) => {
  const [projectData, setProjectData] = useState({
    code: '',
    language: '',
    framework: '',
    requirements: '',
    priority: ''
  });

  const [results, setResults] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate code analysis
    const mockResults = {
      analysis: {
        complexity: 7.2,
        performance: 6.8,
        security: 8.1,
        maintainability: 7.5,
        testCoverage: 65
      },
      issues: [
        'High cyclomatic complexity in main function (15 branches)',
        'Potential memory leak in data processing module',
        'Missing input validation on user inputs',
        'Deprecated API usage detected'
      ],
      recommendations: [
        'Refactor complex functions into smaller, focused units',
        'Implement proper memory management for large datasets',
        'Add comprehensive input validation and sanitization',
        'Update to latest API versions and remove deprecated calls'
      ],
      codeQuality: {
        score: 7.2,
        grade: 'B+',
        improvements: [
          'Reduce function complexity',
          'Add error handling',
          'Improve documentation',
          'Increase test coverage'
        ]
      },
      performance: {
        responseTime: '245ms',
        memoryUsage: '78MB',
        cpuUsage: '45%',
        bottlenecks: ['Database queries', 'Image processing', 'API calls']
      },
      security: {
        vulnerabilities: 3,
        riskLevel: 'medium',
        issues: [
          'SQL injection vulnerability in user input',
          'Missing CSRF protection',
          'Insecure password hashing'
        ],
        fixes: [
          'Use parameterized queries',
          'Implement CSRF tokens',
          'Use bcrypt for password hashing'
        ]
      },
      technicalDebt: {
        hours: 24,
        priority: 'high',
        areas: ['Code refactoring', 'Security fixes', 'Performance optimization']
      }
    };

    setResults(mockResults);
    onDataProcessed(mockResults);
  };

  return (
    <div className="space-y-6">
      {/* Input Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6"
      >
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <Code className="w-6 h-6" />
          Code Analysis
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white/80 text-sm mb-2">Code/Project Description</label>
            <textarea
              value={projectData.code}
              onChange={(e) => setProjectData({...projectData, code: e.target.value})}
              placeholder="Enter code snippets, project requirements, or technical details"
              className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
              rows={4}
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-white/80 text-sm mb-2">Programming Language</label>
              <select
                value={projectData.language}
                onChange={(e) => setProjectData({...projectData, language: e.target.value})}
                className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Select language</option>
                <option value="JavaScript">JavaScript</option>
                <option value="TypeScript">TypeScript</option>
                <option value="Python">Python</option>
                <option value="Java">Java</option>
                <option value="C#">C#</option>
                <option value="Go">Go</option>
                <option value="Rust">Rust</option>
              </select>
            </div>
            
            <div>
              <label className="block text-white/80 text-sm mb-2">Framework</label>
              <input
                type="text"
                value={projectData.framework}
                onChange={(e) => setProjectData({...projectData, framework: e.target.value})}
                placeholder="Enter framework (e.g., React, Django, Spring)"
                className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-white/80 text-sm mb-2">Requirements</label>
            <textarea
              value={projectData.requirements}
              onChange={(e) => setProjectData({...projectData, requirements: e.target.value})}
              placeholder="Enter specific requirements or constraints"
              className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
              rows={2}
            />
          </div>
          
          <div>
            <label className="block text-white/80 text-sm mb-2">Priority Level</label>
            <select
              value={projectData.priority}
              onChange={(e) => setProjectData({...projectData, priority: e.target.value})}
              className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">Select priority</option>
              <option value="low">Low - Nice to have</option>
              <option value="medium">Medium - Should have</option>
              <option value="high">High - Must have</option>
              <option value="critical">Critical - Blocking</option>
            </select>
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white font-bold py-4 px-8 rounded-xl hover:opacity-90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Analyzing...
              </>
            ) : (
              <>
                <GitBranch className="w-5 h-5" />
                Analyze Code
              </>
            )}
          </button>
        </form>
      </motion.div>

      {/* Results Display */}
      {results && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Analysis Overview */}
          <div className="bg-purple-500/10 border border-purple-500/30 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="w-6 h-6 text-purple-400" />
              <h3 className="text-xl font-bold text-purple-300">Code Analysis Complete</h3>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="bg-white/5 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-white">{results.analysis.complexity}/10</div>
                <div className="text-white/60 text-sm">Complexity</div>
              </div>
              <div className="bg-white/5 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-white">{results.analysis.performance}/10</div>
                <div className="text-white/60 text-sm">Performance</div>
              </div>
              <div className="bg-white/5 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-white">{results.analysis.security}/10</div>
                <div className="text-white/60 text-sm">Security</div>
              </div>
              <div className="bg-white/5 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-white">{results.analysis.maintainability}/10</div>
                <div className="text-white/60 text-sm">Maintainability</div>
              </div>
              <div className="bg-white/5 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-white">{results.analysis.testCoverage}%</div>
                <div className="text-white/60 text-sm">Test Coverage</div>
              </div>
            </div>
          </div>

          {/* Issues & Recommendations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                <AlertCircle className="w-6 h-6" />
                Issues Found
              </h3>
              <ul className="space-y-3">
                {results.issues.map((issue: string, index: number) => (
                  <li key={index} className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-white/80 text-sm">{issue}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Recommendations</h3>
              <ul className="space-y-3">
                {results.recommendations.map((rec: string, index: number) => (
                  <li key={index} className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-white/80 text-sm">{rec}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Performance Analysis */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
              <Zap className="w-6 h-6" />
              Performance Analysis
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white/5 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-white">{results.performance.responseTime}</div>
                <div className="text-white/60 text-sm">Response Time</div>
              </div>
              <div className="bg-white/5 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-white">{results.performance.memoryUsage}</div>
                <div className="text-white/60 text-sm">Memory Usage</div>
              </div>
              <div className="bg-white/5 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-white">{results.performance.cpuUsage}</div>
                <div className="text-white/60 text-sm">CPU Usage</div>
              </div>
              <div className="bg-white/5 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-white">{results.performance.bottlenecks.length}</div>
                <div className="text-white/60 text-sm">Bottlenecks</div>
              </div>
            </div>
          </div>

          {/* Security Analysis */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
              <Shield className="w-6 h-6" />
              Security Analysis
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-white/80">Vulnerabilities:</span>
                  <span className="text-2xl font-bold text-red-400">{results.security.vulnerabilities}</span>
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-white/80">Risk Level:</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    results.security.riskLevel === 'low' 
                      ? 'bg-green-500/20 text-green-300' 
                      : results.security.riskLevel === 'medium'
                      ? 'bg-yellow-500/20 text-yellow-300'
                      : 'bg-red-500/20 text-red-300'
                  }`}>
                    {results.security.riskLevel.toUpperCase()}
                  </span>
                </div>
              </div>
              
              <div>
                <h4 className="text-white font-semibold mb-3">Security Issues</h4>
                <ul className="space-y-2">
                  {results.security.issues.map((issue: string, index: number) => (
                    <li key={index} className="text-white/80 text-sm flex items-start gap-2">
                      <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>{issue}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Technical Debt */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">Technical Debt</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                <div className="text-2xl font-bold text-yellow-300 mb-2">{results.technicalDebt.hours}h</div>
                <div className="text-white/80 text-sm">Estimated Time to Fix</div>
              </div>
              
              <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
                <div className="text-2xl font-bold text-orange-300 mb-2 capitalize">{results.technicalDebt.priority}</div>
                <div className="text-white/80 text-sm">Priority Level</div>
              </div>
              
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                <div className="text-2xl font-bold text-red-300 mb-2">{results.technicalDebt.areas.length}</div>
                <div className="text-white/80 text-sm">Areas to Address</div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default TechnologyTemplate;
