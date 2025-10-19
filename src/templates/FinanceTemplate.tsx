import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, TrendingUp, PieChart, AlertCircle, CheckCircle } from 'lucide-react';

interface FinanceTemplateProps {
  onDataProcessed: (results: any) => void;
  isLoading: boolean;
}

const FinanceTemplate: React.FC<FinanceTemplateProps> = ({ onDataProcessed, isLoading }) => {
  const [expenseData, setExpenseData] = useState({
    description: '',
    amount: '',
    category: '',
    date: new Date().toISOString().split('T')[0]
  });

  const [results, setResults] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate AI processing
    const mockResults = {
      totalAmount: parseFloat(expenseData.amount) || 0,
      category: expenseData.category || 'Uncategorized',
      aiAnalysis: {
        confidence: 0.89,
        insights: [
          'Expense categorized as Food & Dining with 89% confidence',
          'Spending pattern shows 15% increase from last month',
          'Budget impact: Moderate - within monthly limits'
        ],
        recommendations: [
          'Consider meal planning to reduce food expenses',
          'Set up automatic savings for surplus amounts',
          'Review subscription services for potential savings'
        ]
      },
      spendingTrends: {
        monthly: '$1,245.67',
        weekly: '$311.42',
        daily: '$44.49',
        trend: 'increasing'
      },
      budgetStatus: {
        remaining: '$754.33',
        percentage: 60.5,
        status: 'on_track'
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
          <DollarSign className="w-6 h-6" />
          Expense Analysis
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white/80 text-sm mb-2">Expense Description</label>
            <textarea
              value={expenseData.description}
              onChange={(e) => setExpenseData({...expenseData, description: e.target.value})}
              placeholder="Enter expense details (e.g., 'Coffee at Starbucks - $4.50')"
              className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
              rows={3}
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-white/80 text-sm mb-2">Amount</label>
              <input
                type="number"
                value={expenseData.amount}
                onChange={(e) => setExpenseData({...expenseData, amount: e.target.value})}
                placeholder="Enter amount"
                className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-white/80 text-sm mb-2">Category</label>
              <select
                value={expenseData.category}
                onChange={(e) => setExpenseData({...expenseData, category: e.target.value})}
                className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Select category</option>
                <option value="Food & Dining">Food & Dining</option>
                <option value="Transportation">Transportation</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Utilities">Utilities</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-4 px-8 rounded-xl hover:opacity-90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Analyzing...
              </>
            ) : (
              <>
                <TrendingUp className="w-5 h-5" />
                Analyze Expense
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
          {/* AI Analysis */}
          <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="w-6 h-6 text-green-400" />
              <h3 className="text-xl font-bold text-green-300">AI Analysis Complete</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-white font-semibold mb-3">Key Insights</h4>
                <ul className="space-y-2">
                  {results.aiAnalysis.insights.map((insight: string, index: number) => (
                    <li key={index} className="flex items-start gap-2 text-white/80 text-sm">
                      <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>{insight}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="text-white font-semibold mb-3">Recommendations</h4>
                <ul className="space-y-2">
                  {results.aiAnalysis.recommendations.map((rec: string, index: number) => (
                    <li key={index} className="flex items-start gap-2 text-white/80 text-sm">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Spending Trends */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
              <PieChart className="w-6 h-6" />
              Spending Trends
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/5 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-white">${results.spendingTrends.monthly}</div>
                <div className="text-white/60 text-sm">Monthly</div>
              </div>
              <div className="bg-white/5 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-white">${results.spendingTrends.weekly}</div>
                <div className="text-white/60 text-sm">Weekly</div>
              </div>
              <div className="bg-white/5 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-white">${results.spendingTrends.daily}</div>
                <div className="text-white/60 text-sm">Daily</div>
              </div>
              <div className="bg-white/5 rounded-lg p-4 text-center">
                <div className={`text-2xl font-bold ${results.spendingTrends.trend === 'increasing' ? 'text-red-400' : 'text-green-400'}`}>
                  {results.spendingTrends.trend === 'increasing' ? '↗' : '↘'}
                </div>
                <div className="text-white/60 text-sm">Trend</div>
              </div>
            </div>
          </div>

          {/* Budget Status */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">Budget Status</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-white/80">Remaining Budget</span>
                <span className="text-2xl font-bold text-white">${results.budgetStatus.remaining}</span>
              </div>
              
              <div className="w-full bg-white/10 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-green-500 to-emerald-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${results.budgetStatus.percentage}%` }}
                ></div>
              </div>
              
              <div className="flex justify-between text-sm text-white/60">
                <span>0%</span>
                <span>{results.budgetStatus.percentage}% used</span>
                <span>100%</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default FinanceTemplate;
