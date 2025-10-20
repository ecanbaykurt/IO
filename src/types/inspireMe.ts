export interface RedditPainPoint {
  id: string;
  title: string;
  description: string;
  subreddit: string;
  score: number;
  keywords: string[];
  sector: string;
  url: string;
  author: string;
  created: number;
}

export interface GitHubRepo {
  name: string;
  description: string;
  url: string;
  stars: number;
  language: string;
  fullName: string;
  topics: string[];
  updatedAt: string;
}

export interface HuggingFaceModel {
  modelId: string;
  name: string;
  description: string;
  downloads: number;
  tags: string[];
  url: string;
  author: string;
  likes: number;
  pipelineTag: string;
}

export interface KaggleDataset {
  ref: string;
  title: string;
  description: string;
  url: string;
  downloadCount: number;
  size: number;
  tags: string[];
  owner: string;
}

export interface TechNeed {
  painPoint: RedditPainPoint;
  githubRepo: GitHubRepo | null;
  huggingFaceModel: HuggingFaceModel | null;
  kaggleDataset: KaggleDataset | null;
  appIdea: string;
  confidence: number;
}

export interface SectorConfig {
  id: string;
  name: string;
  icon: string;
  subreddits: string[];
  keywords: string[];
  githubTopics: string[];
  huggingFaceTags: string[];
  kaggleTags: string[];
}

export interface InspireMeState {
  isLoading: boolean;
  techNeeds: TechNeed[];
  selectedSector: string;
  error: string | null;
}
