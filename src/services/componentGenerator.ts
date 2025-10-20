import { TechNeed } from '../types/inspireMe';

export interface GeneratedComponent {
  id: string;
  name: string;
  description: string;
  sector: string;
  features: string[];
  inputFields: InputField[];
  processingLogic: ProcessingLogic;
  outputFormat: OutputFormat;
  apiEndpoints: ApiEndpoint[];
  uiComponents: UIComponent[];
}

export interface InputField {
  id: string;
  label: string;
  type: 'text' | 'textarea' | 'file' | 'number' | 'select' | 'date';
  placeholder: string;
  required: boolean;
  validation?: string;
  options?: string[];
}

export interface ProcessingLogic {
  model: string;
  algorithm: string;
  parameters: Record<string, any>;
  expectedOutput: string;
}

export interface OutputFormat {
  type: 'chart' | 'table' | 'text' | 'json' | 'list';
  visualization: string;
  dataFields: string[];
}

export interface ApiEndpoint {
  name: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  url: string;
  description: string;
  parameters: Record<string, string>;
}

export interface UIComponent {
  type: 'form' | 'chart' | 'table' | 'card' | 'button' | 'input';
  props: Record<string, any>;
  styling: Record<string, string>;
}

/**
 * Dynamic Component Generator Service
 * Creates functional React components based on tech needs and sector requirements
 */
export class ComponentGenerator {
  private static instance: ComponentGenerator;

  public static getInstance(): ComponentGenerator {
    if (!ComponentGenerator.instance) {
      ComponentGenerator.instance = new ComponentGenerator();
    }
    return ComponentGenerator.instance;
  }

  /**
   * Generate a complete app prototype based on tech need
   */
  public generatePrototype(techNeed: TechNeed): GeneratedComponent {
    const sector = techNeed.painPoint.sector;
    const painPoint = techNeed.painPoint;
    const model = techNeed.huggingFaceModel;
    const repo = techNeed.githubRepo;

    return {
      id: `prototype_${Date.now()}`,
      name: this.generateAppName(painPoint.title, sector),
      description: techNeed.appIdea,
      sector: sector,
      features: this.generateFeatures(sector, painPoint),
      inputFields: this.generateInputFields(sector, painPoint),
      processingLogic: this.generateProcessingLogic(sector, model, repo),
      outputFormat: this.generateOutputFormat(sector, painPoint),
      apiEndpoints: this.generateApiEndpoints(sector, model, repo),
      uiComponents: this.generateUIComponents(sector, painPoint)
    };
  }

  /**
   * Generate app name based on pain point and sector
   */
  private generateAppName(painPointTitle: string, sector: string): string {
    const sectorNames: Record<string, string> = {
      'finance': 'Finance',
      'healthcare': 'Health',
      'supply chain': 'Supply',
      'technology': 'Tech'
    };

    const keywords = this.extractKeywords(painPointTitle);
    const primaryKeyword = keywords[0] || 'Solution';
    
    return `${sectorNames[sector] || 'Smart'} ${primaryKeyword} App`;
  }

  /**
   * Generate features based on sector and pain point
   */
  private generateFeatures(sector: string, painPoint: any): string[] {
    const baseFeatures = ['Real-time Processing', 'AI Analysis', 'Data Visualization', 'Export Results'];
    
    const sectorFeatures: Record<string, string[]> = {
      'finance': [
        'Expense Tracking',
        'Budget Analysis',
        'Spending Insights',
        'Financial Reports',
        'AI Categorization'
      ],
      'healthcare': [
        'Patient Management',
        'Health Monitoring',
        'Appointment Scheduling',
        'Medical Records',
        'Symptom Analysis'
      ],
      'supply chain': [
        'Inventory Tracking',
        'Demand Forecasting',
        'Supplier Management',
        'Logistics Optimization',
        'Real-time Updates'
      ],
      'technology': [
        'Project Management',
        'Code Analysis',
        'Performance Monitoring',
        'Team Collaboration',
        'Automated Testing'
      ]
    };

    return [...baseFeatures, ...(sectorFeatures[sector] || [])];
  }

  /**
   * Generate input fields based on sector requirements
   */
  private generateInputFields(sector: string, painPoint: any): InputField[] {
    const sectorFields: Record<string, InputField[]> = {
      'finance': [
        {
          id: 'expense_description',
          label: 'Expense Description',
          type: 'textarea',
          placeholder: 'Enter expense details (e.g., "Coffee at Starbucks - $4.50")',
          required: true,
          validation: 'min:10'
        },
        {
          id: 'amount',
          label: 'Amount',
          type: 'number',
          placeholder: 'Enter amount',
          required: true,
          validation: 'min:0'
        },
        {
          id: 'category',
          label: 'Category',
          type: 'select',
          placeholder: 'Select category',
          required: false,
          options: ['Food', 'Transport', 'Entertainment', 'Utilities', 'Healthcare', 'Other']
        }
      ],
      'healthcare': [
        {
          id: 'patient_info',
          label: 'Patient Information',
          type: 'textarea',
          placeholder: 'Enter patient details or symptoms',
          required: true,
          validation: 'min:20'
        },
        {
          id: 'age',
          label: 'Age',
          type: 'number',
          placeholder: 'Enter age',
          required: false,
          validation: 'min:0,max:120'
        },
        {
          id: 'symptoms',
          label: 'Symptoms',
          type: 'textarea',
          placeholder: 'Describe symptoms in detail',
          required: false
        }
      ],
      'supply chain': [
        {
          id: 'inventory_data',
          label: 'Inventory Data',
          type: 'textarea',
          placeholder: 'Enter inventory items and quantities',
          required: true,
          validation: 'min:10'
        },
        {
          id: 'supplier',
          label: 'Supplier',
          type: 'text',
          placeholder: 'Enter supplier name',
          required: false
        },
        {
          id: 'location',
          label: 'Location',
          type: 'text',
          placeholder: 'Enter warehouse location',
          required: false
        }
      ],
      'technology': [
        {
          id: 'project_details',
          label: 'Project Details',
          type: 'textarea',
          placeholder: 'Enter project requirements or code snippets',
          required: true,
          validation: 'min:20'
        },
        {
          id: 'technology_stack',
          label: 'Technology Stack',
          type: 'text',
          placeholder: 'Enter tech stack (e.g., React, Node.js)',
          required: false
        },
        {
          id: 'priority',
          label: 'Priority',
          type: 'select',
          placeholder: 'Select priority',
          required: false,
          options: ['Low', 'Medium', 'High', 'Critical']
        }
      ]
    };

    return sectorFields[sector] || sectorFields['technology'];
  }

  /**
   * Generate processing logic based on sector and AI model
   */
  private generateProcessingLogic(sector: string, model: any, repo: any): ProcessingLogic {
    const modelName = model?.name || 'default-model';
    const repoLanguage = repo?.language || 'JavaScript';

    const sectorLogic: Record<string, ProcessingLogic> = {
      'finance': {
        model: modelName,
        algorithm: 'expense-categorization',
        parameters: {
          confidence_threshold: 0.8,
          categories: ['food', 'transport', 'entertainment', 'utilities'],
          currency: 'USD'
        },
        expectedOutput: 'Categorized expenses with spending insights'
      },
      'healthcare': {
        model: modelName,
        algorithm: 'symptom-analysis',
        parameters: {
          confidence_threshold: 0.7,
          medical_categories: ['respiratory', 'cardiovascular', 'neurological'],
          urgency_levels: ['low', 'medium', 'high']
        },
        expectedOutput: 'Health insights with recommended actions'
      },
      'supply chain': {
        model: modelName,
        algorithm: 'inventory-optimization',
        parameters: {
          confidence_threshold: 0.75,
          optimization_goals: ['cost', 'efficiency', 'availability'],
          time_horizon: '30_days'
        },
        expectedOutput: 'Optimized inventory recommendations'
      },
      'technology': {
        model: modelName,
        algorithm: 'code-analysis',
        parameters: {
          confidence_threshold: 0.8,
          analysis_types: ['complexity', 'performance', 'security'],
          language: repoLanguage
        },
        expectedOutput: 'Code analysis with improvement suggestions'
      }
    };

    return sectorLogic[sector] || sectorLogic['technology'];
  }

  /**
   * Generate output format based on sector requirements
   */
  private generateOutputFormat(sector: string, painPoint: any): OutputFormat {
    const sectorFormats: Record<string, OutputFormat> = {
      'finance': {
        type: 'chart',
        visualization: 'pie_chart',
        dataFields: ['amount', 'category', 'date', 'insights']
      },
      'healthcare': {
        type: 'table',
        visualization: 'data_table',
        dataFields: ['symptoms', 'analysis', 'recommendations', 'urgency']
      },
      'supply chain': {
        type: 'table',
        visualization: 'inventory_table',
        dataFields: ['item', 'quantity', 'status', 'recommendations']
      },
      'technology': {
        type: 'json',
        visualization: 'code_analysis',
        dataFields: ['complexity', 'performance', 'security', 'suggestions']
      }
    };

    return sectorFormats[sector] || sectorFormats['technology'];
  }

  /**
   * Generate API endpoints based on sector and resources
   */
  private generateApiEndpoints(sector: string, model: any, repo: any): ApiEndpoint[] {
    const baseEndpoints: ApiEndpoint[] = [
      {
        name: 'Process Data',
        method: 'POST',
        url: '/api/process',
        description: 'Process input data using AI model',
        parameters: {
          data: 'string',
          model: 'string',
          format: 'string'
        }
      },
      {
        name: 'Get Results',
        method: 'GET',
        url: '/api/results',
        description: 'Retrieve processed results',
        parameters: {
          id: 'string',
          format: 'string'
        }
      }
    ];

    const sectorEndpoints: Record<string, ApiEndpoint[]> = {
      'finance': [
        ...baseEndpoints,
        {
          name: 'Categorize Expenses',
          method: 'POST',
          url: '/api/categorize',
          description: 'Categorize expenses using AI',
          parameters: {
            description: 'string',
            amount: 'number',
            date: 'string'
          }
        }
      ],
      'healthcare': [
        ...baseEndpoints,
        {
          name: 'Analyze Symptoms',
          method: 'POST',
          url: '/api/analyze',
          description: 'Analyze patient symptoms',
          parameters: {
            symptoms: 'string',
            age: 'number',
            history: 'string'
          }
        }
      ],
      'supply chain': [
        ...baseEndpoints,
        {
          name: 'Optimize Inventory',
          method: 'POST',
          url: '/api/optimize',
          description: 'Optimize inventory levels',
          parameters: {
            items: 'array',
            demand: 'number',
            lead_time: 'number'
          }
        }
      ],
      'technology': [
        ...baseEndpoints,
        {
          name: 'Analyze Code',
          method: 'POST',
          url: '/api/analyze',
          description: 'Analyze code quality and performance',
          parameters: {
            code: 'string',
            language: 'string',
            framework: 'string'
          }
        }
      ]
    };

    return sectorEndpoints[sector] || sectorEndpoints['technology'];
  }

  /**
   * Generate UI components based on sector requirements
   */
  private generateUIComponents(sector: string, painPoint: any): UIComponent[] {
    const baseComponents: UIComponent[] = [
      {
        type: 'form',
        props: {
          className: 'w-full space-y-4',
          onSubmit: 'handleSubmit'
        },
        styling: {
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '0.5rem',
          padding: '1rem'
        }
      },
      {
        type: 'button',
        props: {
          type: 'submit',
          className: 'w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-4 px-8 rounded-xl'
        },
        styling: {
          transition: 'all 0.3s ease',
          transform: 'hover:scale-1.02'
        }
      }
    ];

    const sectorComponents: Record<string, UIComponent[]> = {
      'finance': [
        ...baseComponents,
        {
          type: 'chart',
          props: {
            type: 'pie',
            data: 'expenseData',
            className: 'w-full h-64'
          },
          styling: {
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '0.5rem'
          }
        }
      ],
      'healthcare': [
        ...baseComponents,
        {
          type: 'table',
          props: {
            data: 'analysisResults',
            columns: ['symptom', 'analysis', 'recommendation'],
            className: 'w-full'
          },
          styling: {
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '0.5rem'
          }
        }
      ],
      'supply chain': [
        ...baseComponents,
        {
          type: 'table',
          props: {
            data: 'inventoryData',
            columns: ['item', 'quantity', 'status', 'recommendation'],
            className: 'w-full'
          },
          styling: {
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '0.5rem'
          }
        }
      ],
      'technology': [
        ...baseComponents,
        {
          type: 'card',
          props: {
            title: 'Analysis Results',
            content: 'analysisData',
            className: 'w-full'
          },
          styling: {
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '0.5rem',
            padding: '1rem'
          }
        }
      ]
    };

    return sectorComponents[sector] || sectorComponents['technology'];
  }

  /**
   * Extract keywords from text
   */
  private extractKeywords(text: string): string[] {
    return text
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(word => word.length > 3)
      .slice(0, 3);
  }

  /**
   * Generate React component code for the prototype
   */
  public generateReactComponent(component: GeneratedComponent): string {
    const { name, sector, inputFields, processingLogic, outputFormat } = component;
    
    return `
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ${name.replace(/\s+/g, '')}Component: React.FC = () => {
  const [inputData, setInputData] = useState({});
  const [results, setResults] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    try {
      // Process data using ${processingLogic.algorithm}
      const response = await fetch('/api/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          data: inputData,
          model: '${processingLogic.model}',
          algorithm: '${processingLogic.algorithm}'
        })
      });
      
      const result = await response.json();
      setResults(result);
    } catch (error) {
      console.error('Processing failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-4xl font-bold text-white mb-8 text-center">
          ${name}
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          ${inputFields.map(field => this.generateInputFieldJSX(field)).join('\n')}
          
          <button
            type="submit"
            disabled={isProcessing}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-4 px-8 rounded-xl hover:opacity-90 transition-all duration-300 disabled:opacity-50"
          >
            {isProcessing ? 'Processing...' : 'Analyze Data'}
          </button>
        </form>
        
        {results && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8"
          >
            <h2 className="text-2xl font-bold text-white mb-4">Results</h2>
            ${this.generateOutputJSX(outputFormat)}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default ${name.replace(/\s+/g, '')}Component;
    `.trim();
  }

  /**
   * Generate JSX for input fields
   */
  private generateInputFieldJSX(field: InputField): string {
    const baseClasses = "w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500";
    
    switch (field.type) {
      case 'textarea':
        return `
          <div>
            <label className="block text-white/80 text-sm mb-2">${field.label}</label>
            <textarea
              value={inputData.${field.id} || ''}
              onChange={(e) => setInputData({...inputData, ${field.id}: e.target.value})}
              placeholder="${field.placeholder}"
              className="${baseClasses}"
              rows={4}
              required={${field.required}}
            />
          </div>
        `;
      case 'select':
        return `
          <div>
            <label className="block text-white/80 text-sm mb-2">${field.label}</label>
            <select
              value={inputData.${field.id} || ''}
              onChange={(e) => setInputData({...inputData, ${field.id}: e.target.value})}
              className="${baseClasses}"
              required={${field.required}}
            >
              <option value="">${field.placeholder}</option>
              ${field.options?.map(option => `<option value="${option}">${option}</option>`).join('')}
            </select>
          </div>
        `;
      default:
        return `
          <div>
            <label className="block text-white/80 text-sm mb-2">${field.label}</label>
            <input
              type="${field.type}"
              value={inputData.${field.id} || ''}
              onChange={(e) => setInputData({...inputData, ${field.id}: e.target.value})}
              placeholder="${field.placeholder}"
              className="${baseClasses}"
              required={${field.required}}
            />
          </div>
        `;
    }
  }

  /**
   * Generate JSX for output display
   */
  private generateOutputJSX(outputFormat: OutputFormat): string {
    switch (outputFormat.type) {
      case 'chart':
        return `
          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <h3 className="text-white font-semibold mb-3">Data Visualization</h3>
            <div className="w-full h-64 bg-white/5 rounded-lg flex items-center justify-center">
              <span className="text-white/60">Chart visualization would go here</span>
            </div>
          </div>
        `;
      case 'table':
        return `
          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <h3 className="text-white font-semibold mb-3">Analysis Results</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-white/80 text-sm">
                <thead>
                  <tr className="border-b border-white/20">
                    ${outputFormat.dataFields.map(field => `<th className="text-left py-2">${field}</th>`).join('')}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    ${outputFormat.dataFields.map(field => `<td className="py-2">Sample data</td>`).join('')}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        `;
      default:
        return `
          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <h3 className="text-white font-semibold mb-3">Results</h3>
            <pre className="text-green-400 text-sm overflow-x-auto">
              {JSON.stringify(results, null, 2)}
            </pre>
          </div>
        `;
    }
  }
}

export default ComponentGenerator;
