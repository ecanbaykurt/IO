import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Truck, Package, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';

interface SupplyChainTemplateProps {
  onDataProcessed: (results: any) => void;
  isLoading: boolean;
}

const SupplyChainTemplate: React.FC<SupplyChainTemplateProps> = ({ onDataProcessed, isLoading }) => {
  const [inventoryData, setInventoryData] = useState({
    items: '',
    quantities: '',
    supplier: '',
    location: '',
    demand: ''
  });

  const [results, setResults] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate supply chain optimization
    const mockResults = {
      optimization: {
        currentStock: 85,
        recommendedStock: 95,
        reorderPoint: 20,
        leadTime: 7,
        efficiency: 0.87
      },
      analysis: {
        stockLevels: 'adequate',
        demandForecast: 'increasing',
        supplierPerformance: 'above_average',
        riskFactors: ['seasonal_demand', 'supplier_reliability']
      },
      insights: [
        'Current stock levels are adequate for 2-week demand',
        'Seasonal items show 25% increase in demand',
        'Supplier A has 98% on-time delivery rate',
        'Warehouse capacity utilization at 78%'
      ],
      recommendations: [
        'Increase order quantity for high-demand items by 15%',
        'Negotiate better terms with top-performing suppliers',
        'Implement just-in-time inventory for slow-moving items',
        'Set up automated reorder alerts for critical items'
      ],
      costOptimization: {
        potentialSavings: '$12,450',
        areas: ['Reduced holding costs', 'Better supplier terms', 'Optimized reorder points'],
        roi: '23%'
      },
      supplierAnalysis: {
        topPerformers: ['Supplier A', 'Supplier C'],
        underPerformers: ['Supplier B'],
        recommendations: ['Renew contracts with top performers', 'Review Supplier B performance']
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
          <Package className="w-6 h-6" />
          Inventory Optimization
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white/80 text-sm mb-2">Inventory Items</label>
            <textarea
              value={inventoryData.items}
              onChange={(e) => setInventoryData({...inventoryData, items: e.target.value})}
              placeholder="Enter inventory items and current quantities"
              className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
              rows={3}
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-white/80 text-sm mb-2">Supplier</label>
              <input
                type="text"
                value={inventoryData.supplier}
                onChange={(e) => setInventoryData({...inventoryData, supplier: e.target.value})}
                placeholder="Enter supplier name"
                className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            
            <div>
              <label className="block text-white/80 text-sm mb-2">Warehouse Location</label>
              <input
                type="text"
                value={inventoryData.location}
                onChange={(e) => setInventoryData({...inventoryData, location: e.target.value})}
                placeholder="Enter warehouse location"
                className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-white/80 text-sm mb-2">Expected Demand</label>
            <input
              type="text"
              value={inventoryData.demand}
              onChange={(e) => setInventoryData({...inventoryData, demand: e.target.value})}
              placeholder="Enter expected demand forecast"
              className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-orange-500 to-amber-600 text-white font-bold py-4 px-8 rounded-xl hover:opacity-90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Optimizing...
              </>
            ) : (
              <>
                <TrendingUp className="w-5 h-5" />
                Optimize Inventory
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
          {/* Optimization Results */}
          <div className="bg-orange-500/10 border border-orange-500/30 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="w-6 h-6 text-orange-400" />
              <h3 className="text-xl font-bold text-orange-300">Optimization Complete</h3>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/5 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-white">{results.optimization.currentStock}%</div>
                <div className="text-white/60 text-sm">Current Stock</div>
              </div>
              <div className="bg-white/5 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-white">{results.optimization.recommendedStock}%</div>
                <div className="text-white/60 text-sm">Recommended</div>
              </div>
              <div className="bg-white/5 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-white">{results.optimization.reorderPoint}</div>
                <div className="text-white/60 text-sm">Reorder Point</div>
              </div>
              <div className="bg-white/5 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-white">{results.optimization.leadTime} days</div>
                <div className="text-white/60 text-sm">Lead Time</div>
              </div>
            </div>
          </div>

          {/* Analysis & Insights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                <Truck className="w-6 h-6" />
                Analysis Summary
              </h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-white/80">Stock Levels:</span>
                  <span className="text-white capitalize">{results.analysis.stockLevels}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/80">Demand Forecast:</span>
                  <span className="text-white capitalize">{results.analysis.demandForecast}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/80">Supplier Performance:</span>
                  <span className="text-white capitalize">{results.analysis.supplierPerformance}</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Key Insights</h3>
              <ul className="space-y-2">
                {results.insights.map((insight: string, index: number) => (
                  <li key={index} className="text-white/80 text-sm flex items-start gap-2">
                    <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>{insight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">Optimization Recommendations</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {results.recommendations.map((rec: string, index: number) => (
                <div key={index} className="bg-white/5 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-white/80 text-sm">{rec}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cost Optimization */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
              <TrendingUp className="w-6 h-6" />
              Cost Optimization
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <div className="text-2xl font-bold text-green-300 mb-2">{results.costOptimization.potentialSavings}</div>
                <div className="text-white/80 text-sm">Potential Annual Savings</div>
              </div>
              
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <div className="text-2xl font-bold text-blue-300 mb-2">{results.costOptimization.roi}</div>
                <div className="text-white/80 text-sm">Expected ROI</div>
              </div>
              
              <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                <div className="text-2xl font-bold text-purple-300 mb-2">{results.costOptimization.areas.length}</div>
                <div className="text-white/80 text-sm">Optimization Areas</div>
              </div>
            </div>
          </div>

          {/* Supplier Analysis */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">Supplier Performance</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-white font-semibold mb-3">Top Performers</h4>
                <ul className="space-y-2">
                  {results.supplierAnalysis.topPerformers.map((supplier: string, index: number) => (
                    <li key={index} className="text-white/80 text-sm flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span>{supplier}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="text-white font-semibold mb-3">Recommendations</h4>
                <ul className="space-y-2">
                  {results.supplierAnalysis.recommendations.map((rec: string, index: number) => (
                    <li key={index} className="text-white/80 text-sm flex items-start gap-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default SupplyChainTemplate;
