// Simple NLP utilities for keyword extraction and sentiment analysis

const STOP_WORDS = new Set([
  'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by',
  'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did',
  'will', 'would', 'could', 'should', 'may', 'might', 'must', 'can', 'this', 'that', 'these',
  'those', 'i', 'you', 'he', 'she', 'it', 'we', 'they', 'me', 'him', 'her', 'us', 'them',
  'my', 'your', 'his', 'her', 'its', 'our', 'their', 'mine', 'yours', 'hers', 'ours', 'theirs'
]);

const PROBLEM_INDICATORS = [
  'struggling', 'problem', 'issue', 'difficulty', 'challenge', 'trouble', 'help', 'need',
  'want', 'looking', 'trying', 'failing', 'broken', 'not working', 'error', 'bug',
  'confused', 'lost', 'stuck', 'frustrated', 'annoying', 'terrible', 'awful', 'worst',
  'hate', 'dislike', 'sucks', 'sucks', 'pain', 'headache', 'nightmare', 'disaster'
];

const QUESTION_WORDS = ['what', 'how', 'why', 'when', 'where', 'who', 'which', 'can', 'should', 'would', 'could'];

export function extractKeywords(text: string): string[] {
  // Convert to lowercase and split into words
  const words = text.toLowerCase()
    .replace(/[^\w\s]/g, ' ') // Remove punctuation
    .split(/\s+/)
    .filter(word => word.length > 2) // Filter out short words
    .filter(word => !STOP_WORDS.has(word)); // Remove stop words

  // Count word frequency
  const wordCount = new Map<string, number>();
  words.forEach(word => {
    wordCount.set(word, (wordCount.get(word) || 0) + 1);
  });

  // Sort by frequency and return top keywords
  return Array.from(wordCount.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([word]) => word);
}

export function isPainPoint(text: string): boolean {
  const lowerText = text.toLowerCase();
  
  // Check for problem indicators
  const hasProblemIndicators = PROBLEM_INDICATORS.some(indicator => 
    lowerText.includes(indicator)
  );
  
  // Check for question words (often indicate seeking help)
  const hasQuestionWords = QUESTION_WORDS.some(word => 
    lowerText.startsWith(word) || lowerText.includes(` ${word}`)
  );
  
  // Check for negative sentiment indicators
  const negativeWords = ['not', 'no', 'never', 'nothing', 'nobody', 'nowhere', 'neither', 'nor'];
  const hasNegativeSentiment = negativeWords.some(word => 
    lowerText.includes(word)
  );
  
  return hasProblemIndicators || hasQuestionWords || hasNegativeSentiment;
}

export function calculateSentimentScore(text: string): number {
  const words = text.toLowerCase().split(/\s+/);
  
  const positiveWords = ['good', 'great', 'excellent', 'amazing', 'wonderful', 'fantastic', 'love', 'like', 'enjoy', 'happy', 'satisfied'];
  const negativeWords = ['bad', 'terrible', 'awful', 'hate', 'dislike', 'angry', 'frustrated', 'sad', 'disappointed', 'upset'];
  
  let score = 0;
  
  words.forEach(word => {
    if (positiveWords.includes(word)) score += 1;
    if (negativeWords.includes(word)) score -= 1;
  });
  
  return score;
}

export function generateAppIdea(painPoint: string, sector: string, githubRepo?: any, huggingFaceModel?: any, kaggleDataset?: any): string {
  const baseIdeas = {
    finance: [
      `Build a ${sector.toLowerCase()} app that helps users ${painPoint.toLowerCase()} with smart analytics`,
      `Create a financial tool that solves ${painPoint.toLowerCase()} using AI insights`,
      `Develop a ${sector.toLowerCase()} dashboard for ${painPoint.toLowerCase()} management`
    ],
    'supply chain': [
      `Build a ${sector.toLowerCase()} optimization app that addresses ${painPoint.toLowerCase()}`,
      `Create a logistics tool that solves ${painPoint.toLowerCase()} with real-time tracking`,
      `Develop a supply chain analytics platform for ${painPoint.toLowerCase()} insights`
    ],
    healthcare: [
      `Build a ${sector.toLowerCase()} app that helps with ${painPoint.toLowerCase()} using patient data`,
      `Create a medical tool that addresses ${painPoint.toLowerCase()} with AI assistance`,
      `Develop a healthcare platform for ${painPoint.toLowerCase()} management`
    ],
    technology: [
      `Build a ${sector.toLowerCase()} app that solves ${painPoint.toLowerCase()} with automation`,
      `Create a tech tool that addresses ${painPoint.toLowerCase()} using modern frameworks`,
      `Develop a software solution for ${painPoint.toLowerCase()} optimization`
    ]
  };
  
  const ideas = baseIdeas[sector.toLowerCase() as keyof typeof baseIdeas] || baseIdeas.technology;
  const randomIdea = ideas[Math.floor(Math.random() * ideas.length)];
  
  // Enhance with specific technologies if available
  let enhancedIdea = randomIdea;
  
  if (githubRepo) {
    enhancedIdea += ` (Built with ${githubRepo.language})`;
  }
  
  if (huggingFaceModel) {
    enhancedIdea += ` (Powered by ${huggingFaceModel.name})`;
  }
  
  if (kaggleDataset) {
    enhancedIdea += ` (Data from ${kaggleDataset.title})`;
  }
  
  return enhancedIdea;
}

export function cleanText(text: string): string {
  return text
    .replace(/[^\w\s]/g, ' ') // Remove special characters
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .trim();
}
