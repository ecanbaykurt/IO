import { Octokit } from '@octokit/rest';
import { RedditPainPoint, GitHubRepo, HuggingFaceModel, KaggleDataset, TechNeed, SectorConfig } from '../types/inspireMe';
import { extractKeywords, isPainPoint, generateAppIdea } from '../utils/nlpHelpers';

// Initialize GitHub API
const octokit = new Octokit({
  auth: process.env.REACT_APP_GITHUB_TOKEN,
});

// Sector configurations
export const SECTOR_CONFIGS: Record<string, SectorConfig> = {
  finance: {
    id: 'finance',
    name: 'Finance',
    icon: '💰',
    subreddits: ['personalfinance', 'investing', 'financialindependence', 'stocks', 'cryptocurrency'],
    keywords: ['money', 'budget', 'investment', 'trading', 'expense', 'savings', 'debt', 'credit'],
    githubTopics: ['finance', 'trading', 'investment', 'budget', 'fintech'],
    huggingFaceTags: ['finance', 'financial', 'trading', 'economics'],
    kaggleTags: ['finance', 'financial', 'trading', 'investment']
  },
  'supply chain': {
    id: 'supply chain',
    name: 'Supply Chain',
    icon: '🚚',
    subreddits: ['supplychain', 'logistics', 'shipping', 'procurement', 'operations'],
    keywords: ['logistics', 'shipping', 'inventory', 'procurement', 'warehouse', 'distribution'],
    githubTopics: ['logistics', 'supply-chain', 'shipping', 'inventory'],
    huggingFaceTags: ['logistics', 'supply-chain', 'operations'],
    kaggleTags: ['logistics', 'supply-chain', 'shipping']
  },
  healthcare: {
    id: 'healthcare',
    name: 'Healthcare',
    icon: '🏥',
    subreddits: ['healthcare', 'medicine', 'nursing', 'pharmacy', 'medical'],
    keywords: ['health', 'medical', 'patient', 'treatment', 'diagnosis', 'hospital', 'clinic'],
    githubTopics: ['healthcare', 'medical', 'health', 'hospital'],
    huggingFaceTags: ['medical', 'healthcare', 'clinical', 'health'],
    kaggleTags: ['healthcare', 'medical', 'health']
  },
  technology: {
    id: 'technology',
    name: 'Technology',
    icon: '💻',
    subreddits: ['technology', 'programming', 'webdev', 'MachineLearning', 'artificial'],
    keywords: ['software', 'development', 'programming', 'ai', 'machine learning', 'data', 'algorithm'],
    githubTopics: ['software', 'development', 'ai', 'machine-learning', 'data-science'],
    huggingFaceTags: ['nlp', 'computer-vision', 'machine-learning', 'ai'],
    kaggleTags: ['technology', 'software', 'ai', 'data-science']
  }
};

// Reddit API functions (using Reddit JSON API - browser compatible)
export async function fetchRedditPosts(sector: string, limit: number = 10): Promise<RedditPainPoint[]> {
  try {
    const config = SECTOR_CONFIGS[sector];
    if (!config) throw new Error(`Unknown sector: ${sector}`);

    // For now, always use mock data since Reddit API requires server-side implementation
    // In production, you would implement a backend API endpoint to fetch Reddit data
    console.log('Using mock Reddit data for sector:', sector);
    return getMockRedditPosts(sector, limit);

    // Future implementation would use Reddit's JSON API:
    // const response = await fetch(`https://www.reddit.com/r/${subreddit}/hot.json?limit=${limit}`);
    // const data = await response.json();
    // Process Reddit JSON response...
  } catch (error) {
    console.error('Reddit API error:', error);
    return getMockRedditPosts(sector, limit);
  }
}

// Mock Reddit data for when API fails
function getMockRedditPosts(sector: string, limit: number): RedditPainPoint[] {
  const mockPosts = {
    finance: [
      {
        id: 'mock1',
        title: 'Struggling with expense tracking - need a better solution',
        description: 'I\'m having trouble keeping track of my daily expenses. Looking for an app that can categorize automatically.',
        subreddit: 'personalfinance',
        score: 45,
        keywords: ['expense', 'tracking', 'categorize', 'budget'],
        sector: sector,
        url: 'https://reddit.com/r/personalfinance/mock1',
        author: 'user123',
        created: Date.now() / 1000 - 86400
      },
      {
        id: 'mock2',
        title: 'Investment portfolio management is overwhelming',
        description: 'I have multiple investment accounts and it\'s hard to track performance across all of them.',
        subreddit: 'investing',
        score: 32,
        keywords: ['investment', 'portfolio', 'tracking', 'performance'],
        sector: sector,
        url: 'https://reddit.com/r/investing/mock2',
        author: 'investor456',
        created: Date.now() / 1000 - 172800
      }
    ],
    'supply chain': [
      {
        id: 'mock3',
        title: 'Inventory management system is outdated',
        description: 'Our current system doesn\'t provide real-time updates and we\'re losing track of stock levels.',
        subreddit: 'supplychain',
        score: 28,
        keywords: ['inventory', 'management', 'real-time', 'tracking'],
        sector: sector,
        url: 'https://reddit.com/r/supplychain/mock3',
        author: 'logistics_pro',
        created: Date.now() / 1000 - 259200
      }
    ],
    healthcare: [
      {
        id: 'mock4',
        title: 'Patient scheduling system needs improvement',
        description: 'Our clinic is struggling with appointment scheduling and patient communication.',
        subreddit: 'healthcare',
        score: 41,
        keywords: ['patient', 'scheduling', 'communication', 'appointment'],
        sector: sector,
        url: 'https://reddit.com/r/healthcare/mock4',
        author: 'healthcare_worker',
        created: Date.now() / 1000 - 345600
      }
    ],
    technology: [
      {
        id: 'mock5',
        title: 'Need better project management for development teams',
        description: 'Our current tools don\'t integrate well with our development workflow.',
        subreddit: 'programming',
        score: 67,
        keywords: ['project', 'management', 'development', 'workflow'],
        sector: sector,
        url: 'https://reddit.com/r/programming/mock5',
        author: 'dev_lead',
        created: Date.now() / 1000 - 432000
      }
    ]
  };

  return mockPosts[sector as keyof typeof mockPosts] || mockPosts.technology;
}

// GitHub API functions
export async function searchGitHubRepos(keywords: string[], sector: string, limit: number = 5): Promise<GitHubRepo[]> {
  try {
    // Check if we have valid GitHub token
    if (!process.env.REACT_APP_GITHUB_TOKEN || process.env.REACT_APP_GITHUB_TOKEN === 'your_github_token_here') {
      console.warn('GitHub token not configured, using mock data');
      return getMockGitHubRepos(sector, limit);
    }

    const config = SECTOR_CONFIGS[sector];
    const searchQuery = keywords.slice(0, 3).join(' ') + ` topic:${config.githubTopics.join(' topic:')}`;
    
    const response = await octokit.rest.search.repos({
      q: searchQuery,
      sort: 'stars',
      order: 'desc',
      per_page: limit
    });

    const repos = response.data.items.map(repo => ({
      name: repo.name,
      description: repo.description || '',
      url: repo.html_url,
      stars: repo.stargazers_count,
      language: repo.language || '',
      fullName: repo.full_name,
      topics: repo.topics || [],
      updatedAt: repo.updated_at
    }));

    // If no results, return mock data
    if (repos.length === 0) {
      return getMockGitHubRepos(sector, limit);
    }

    return repos;
  } catch (error) {
    console.error('GitHub API error:', error);
    return getMockGitHubRepos(sector, limit);
  }
}

// Mock GitHub data
function getMockGitHubRepos(sector: string, limit: number): GitHubRepo[] {
  const mockRepos = {
    finance: [
      {
        name: 'expense-tracker',
        description: 'A modern expense tracking application with AI-powered categorization',
        url: 'https://github.com/mock/expense-tracker',
        stars: 1234,
        language: 'TypeScript',
        fullName: 'mock/expense-tracker',
        topics: ['finance', 'expense', 'tracking', 'ai'],
        updatedAt: new Date().toISOString()
      }
    ],
    'supply chain': [
      {
        name: 'inventory-manager',
        description: 'Real-time inventory management system with supply chain optimization',
        url: 'https://github.com/mock/inventory-manager',
        stars: 856,
        language: 'Python',
        fullName: 'mock/inventory-manager',
        topics: ['supply-chain', 'inventory', 'logistics'],
        updatedAt: new Date().toISOString()
      }
    ],
    healthcare: [
      {
        name: 'patient-scheduler',
        description: 'Healthcare appointment scheduling system with patient communication',
        url: 'https://github.com/mock/patient-scheduler',
        stars: 2341,
        language: 'React',
        fullName: 'mock/patient-scheduler',
        topics: ['healthcare', 'scheduling', 'patient'],
        updatedAt: new Date().toISOString()
      }
    ],
    technology: [
      {
        name: 'project-manager',
        description: 'Advanced project management tool for development teams',
        url: 'https://github.com/mock/project-manager',
        stars: 3456,
        language: 'JavaScript',
        fullName: 'mock/project-manager',
        topics: ['project-management', 'development', 'team'],
        updatedAt: new Date().toISOString()
      }
    ]
  };

  return mockRepos[sector as keyof typeof mockRepos] || mockRepos.technology;
}

// HuggingFace API functions
export async function searchHuggingFaceModels(keywords: string[], sector: string, limit: number = 5): Promise<HuggingFaceModel[]> {
  try {
    // Check if we have valid HuggingFace token
    if (!process.env.REACT_APP_HUGGINGFACE_API_KEY || process.env.REACT_APP_HUGGINGFACE_API_KEY === 'your_huggingface_token_here') {
      console.warn('HuggingFace token not configured, using mock data');
      return getMockHuggingFaceModels(sector, limit);
    }

    const config = SECTOR_CONFIGS[sector];
    const searchQuery = keywords.slice(0, 2).join(' ') + ' ' + config.huggingFaceTags.join(' ');
    
    const response = await fetch(`https://huggingface.co/api/models?search=${encodeURIComponent(searchQuery)}&limit=${limit}&sort=downloads&direction=-1`, {
      headers: {
        'Authorization': `Bearer ${process.env.REACT_APP_HUGGINGFACE_API_KEY}`
      }
    });

    if (!response.ok) throw new Error('HuggingFace API error');

    const data = await response.json();
    
    const models = data.map((model: any) => ({
      modelId: model.modelId,
      name: model.modelId,
      description: model.pipeline_tag || 'Machine learning model',
      downloads: model.downloads || 0,
      tags: model.tags || [],
      url: `https://huggingface.co/${model.modelId}`,
      author: model.author || 'Unknown',
      likes: model.likes || 0,
      pipelineTag: model.pipeline_tag || 'unknown'
    }));

    // If no results, return mock data
    if (models.length === 0) {
      return getMockHuggingFaceModels(sector, limit);
    }

    return models;
  } catch (error) {
    console.error('HuggingFace API error:', error);
    return getMockHuggingFaceModels(sector, limit);
  }
}

// Mock HuggingFace data
function getMockHuggingFaceModels(sector: string, limit: number): HuggingFaceModel[] {
  const mockModels = {
    finance: [
      {
        modelId: 'finance-analyzer',
        name: 'finance-analyzer',
        description: 'Financial data analysis and prediction model',
        downloads: 15420,
        tags: ['finance', 'analysis', 'prediction'],
        url: 'https://huggingface.co/finance-analyzer',
        author: 'finance-ai',
        likes: 234,
        pipelineTag: 'text-classification'
      }
    ],
    'supply chain': [
      {
        modelId: 'supply-chain-optimizer',
        name: 'supply-chain-optimizer',
        description: 'Supply chain optimization and demand forecasting model',
        downloads: 8932,
        tags: ['supply-chain', 'optimization', 'forecasting'],
        url: 'https://huggingface.co/supply-chain-optimizer',
        author: 'logistics-ai',
        likes: 156,
        pipelineTag: 'text-generation'
      }
    ],
    healthcare: [
      {
        modelId: 'healthcare-assistant',
        name: 'healthcare-assistant',
        description: 'Medical text analysis and patient care assistance model',
        downloads: 23456,
        tags: ['healthcare', 'medical', 'nlp'],
        url: 'https://huggingface.co/healthcare-assistant',
        author: 'medical-ai',
        likes: 445,
        pipelineTag: 'question-answering'
      }
    ],
    technology: [
      {
        modelId: 'code-assistant',
        name: 'code-assistant',
        description: 'AI-powered code generation and analysis model',
        downloads: 45678,
        tags: ['code', 'generation', 'programming'],
        url: 'https://huggingface.co/code-assistant',
        author: 'tech-ai',
        likes: 789,
        pipelineTag: 'text-generation'
      }
    ]
  };

  return mockModels[sector as keyof typeof mockModels] || mockModels.technology;
}

// Kaggle API functions (mock implementation - requires Kaggle API setup)
export async function searchKaggleDatasets(keywords: string[], sector: string, limit: number = 5): Promise<KaggleDataset[]> {
  try {
    // Mock implementation - in production, use Kaggle API
    const config = SECTOR_CONFIGS[sector];
    const mockDatasets: KaggleDataset[] = [
      {
        ref: `${config.kaggleTags[0]}-dataset-1`,
        title: `${sector} Dataset - ${keywords[0]} Analysis`,
        description: `Comprehensive dataset for ${sector} analysis with ${keywords[0]} insights`,
        url: `https://kaggle.com/datasets/${config.kaggleTags[0]}-dataset-1`,
        downloadCount: Math.floor(Math.random() * 10000) + 1000,
        size: Math.floor(Math.random() * 100) + 10,
        tags: config.kaggleTags,
        owner: 'kaggle-user'
      },
      {
        ref: `${config.kaggleTags[0]}-dataset-2`,
        title: `${sector} Trends Dataset`,
        description: `Historical trends and patterns in ${sector} industry`,
        url: `https://kaggle.com/datasets/${config.kaggleTags[0]}-dataset-2`,
        downloadCount: Math.floor(Math.random() * 5000) + 500,
        size: Math.floor(Math.random() * 50) + 5,
        tags: config.kaggleTags,
        owner: 'kaggle-user'
      }
    ];

    return mockDatasets.slice(0, limit);
  } catch (error) {
    console.error('Kaggle API error:', error);
    return [];
  }
}

// Main function to generate tech needs
export async function generateTechNeeds(sector: string): Promise<TechNeed[]> {
  try {
    // Fetch Reddit pain points
    const painPoints = await fetchRedditPosts(sector, 5);
    
    const techNeeds: TechNeed[] = [];

    for (const painPoint of painPoints) {
      try {
        // Fetch matching resources in parallel
        const [githubRepos, huggingFaceModels, kaggleDatasets] = await Promise.all([
          searchGitHubRepos(painPoint.keywords, sector, 1),
          searchHuggingFaceModels(painPoint.keywords, sector, 1),
          searchKaggleDatasets(painPoint.keywords, sector, 1)
        ]);

        const techNeed: TechNeed = {
          painPoint,
          githubRepo: githubRepos[0] || null,
          huggingFaceModel: huggingFaceModels[0] || null,
          kaggleDataset: kaggleDatasets[0] || null,
          appIdea: generateAppIdea(
            painPoint.title,
            sector,
            githubRepos[0],
            huggingFaceModels[0],
            kaggleDatasets[0]
          ),
          confidence: Math.random() * 0.4 + 0.6 // 60-100% confidence
        };

        techNeeds.push(techNeed);
      } catch (error) {
        console.error(`Error processing pain point ${painPoint.id}:`, error);
      }
    }

    return techNeeds;
  } catch (error) {
    console.error('Error generating tech needs:', error);
    return [];
  }
}
