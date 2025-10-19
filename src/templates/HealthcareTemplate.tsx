import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Stethoscope, Calendar, AlertTriangle, CheckCircle } from 'lucide-react';

interface HealthcareTemplateProps {
  onDataProcessed: (results: any) => void;
  isLoading: boolean;
}

const HealthcareTemplate: React.FC<HealthcareTemplateProps> = ({ onDataProcessed, isLoading }) => {
  const [patientData, setPatientData] = useState({
    symptoms: '',
    age: '',
    medicalHistory: '',
    duration: '',
    severity: ''
  });

  const [results, setResults] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate AI medical analysis
    const mockResults = {
      analysis: {
        primarySymptoms: patientData.symptoms.split(',').map(s => s.trim()).filter(s => s),
        severity: patientData.severity || 'mild',
        urgency: 'low',
        confidence: 0.87
      },
      diagnosis: {
        possibleConditions: [
          'Seasonal allergies',
          'Common cold',
          'Mild viral infection'
        ],
        recommendedTests: [
          'Basic vital signs check',
          'Allergy panel (if symptoms persist)'
        ]
      },
      treatment: {
        immediate: [
          'Rest and adequate sleep',
          'Stay hydrated',
          'Monitor symptoms'
        ],
        medications: [
          'Over-the-counter antihistamines (if allergies)',
          'Pain relievers if needed',
          'Nasal decongestants'
        ],
        followUp: 'Schedule appointment if symptoms worsen or persist beyond 7 days'
      },
      recommendations: [
        'Maintain good hygiene practices',
        'Avoid known allergens if applicable',
        'Keep a symptom diary',
        'Seek immediate care if symptoms worsen'
      ],
      riskAssessment: {
        level: 'low',
        factors: ['Age', 'Symptom severity', 'Duration'],
        monitoring: 'Daily symptom check recommended'
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
          <Stethoscope className="w-6 h-6" />
          Health Assessment
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white/80 text-sm mb-2">Symptoms</label>
            <textarea
              value={patientData.symptoms}
              onChange={(e) => setPatientData({...patientData, symptoms: e.target.value})}
              placeholder="Describe your symptoms (e.g., headache, fatigue, fever)"
              className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
              rows={3}
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-white/80 text-sm mb-2">Age</label>
              <input
                type="number"
                value={patientData.age}
                onChange={(e) => setPatientData({...patientData, age: e.target.value})}
                placeholder="Enter age"
                className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                min="0"
                max="120"
              />
            </div>
            
            <div>
              <label className="block text-white/80 text-sm mb-2">Symptom Duration</label>
              <select
                value={patientData.duration}
                onChange={(e) => setPatientData({...patientData, duration: e.target.value})}
                className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Select duration</option>
                <option value="less than 24 hours">Less than 24 hours</option>
                <option value="1-3 days">1-3 days</option>
                <option value="4-7 days">4-7 days</option>
                <option value="more than 1 week">More than 1 week</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-white/80 text-sm mb-2">Medical History</label>
            <textarea
              value={patientData.medicalHistory}
              onChange={(e) => setPatientData({...patientData, medicalHistory: e.target.value})}
              placeholder="Any relevant medical history or current medications"
              className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
              rows={2}
            />
          </div>
          
          <div>
            <label className="block text-white/80 text-sm mb-2">Severity Level</label>
            <select
              value={patientData.severity}
              onChange={(e) => setPatientData({...patientData, severity: e.target.value})}
              className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">Select severity</option>
              <option value="mild">Mild - Minor discomfort</option>
              <option value="moderate">Moderate - Noticeable impact</option>
              <option value="severe">Severe - Significant impact</option>
            </select>
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 text-white font-bold py-4 px-8 rounded-xl hover:opacity-90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Analyzing...
              </>
            ) : (
              <>
                <Heart className="w-5 h-5" />
                Analyze Symptoms
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
          {/* Analysis Results */}
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="w-6 h-6 text-blue-400" />
              <h3 className="text-xl font-bold text-blue-300">Health Analysis Complete</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-white font-semibold mb-3">Analysis Summary</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-white/80">Severity:</span>
                    <span className="text-white capitalize">{results.analysis.severity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/80">Urgency:</span>
                    <span className="text-white capitalize">{results.analysis.urgency}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/80">Confidence:</span>
                    <span className="text-white">{(results.analysis.confidence * 100).toFixed(0)}%</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-white font-semibold mb-3">Possible Conditions</h4>
                <ul className="space-y-1">
                  {results.diagnosis.possibleConditions.map((condition: string, index: number) => (
                    <li key={index} className="text-white/80 text-sm flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span>{condition}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Treatment Plan */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
              <Heart className="w-6 h-6" />
              Treatment Plan
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="text-white font-semibold mb-3">Immediate Care</h4>
                <ul className="space-y-2">
                  {results.treatment.immediate.map((action: string, index: number) => (
                    <li key={index} className="text-white/80 text-sm flex items-start gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>{action}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="text-white font-semibold mb-3">Medications</h4>
                <ul className="space-y-2">
                  {results.treatment.medications.map((med: string, index: number) => (
                    <li key={index} className="text-white/80 text-sm flex items-start gap-2">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>{med}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="text-white font-semibold mb-3">Follow-up</h4>
                <p className="text-white/80 text-sm">{results.treatment.followUp}</p>
              </div>
            </div>
          </div>

          {/* Risk Assessment */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
              <AlertTriangle className="w-6 h-6" />
              Risk Assessment
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-white/80">Risk Level:</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    results.riskAssessment.level === 'low' 
                      ? 'bg-green-500/20 text-green-300' 
                      : results.riskAssessment.level === 'medium'
                      ? 'bg-yellow-500/20 text-yellow-300'
                      : 'bg-red-500/20 text-red-300'
                  }`}>
                    {results.riskAssessment.level.toUpperCase()}
                  </span>
                </div>
                <p className="text-white/80 text-sm">{results.riskAssessment.monitoring}</p>
              </div>
              
              <div>
                <h4 className="text-white font-semibold mb-3">Recommendations</h4>
                <ul className="space-y-2">
                  {results.recommendations.map((rec: string, index: number) => (
                    <li key={index} className="text-white/80 text-sm flex items-start gap-2">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
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

export default HealthcareTemplate;
