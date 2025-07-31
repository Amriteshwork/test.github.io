// This file contains static blog post metadata and utilities
// Used for client-side operations and enhancements

export interface BlogPostMeta {
  featured: boolean;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedViews?: number;
  relatedTopics: string[];
}

export const blogPostMeta: Record<string, BlogPostMeta> = {
  'neural-network-overfitting-life-lessons': {
    featured: true,
    difficulty: 'intermediate',
    estimatedViews: 2500,
    relatedTopics: ['overfitting', 'model-validation', 'machine-learning-basics']
  },
  'jupyter-notebooks-to-production-survival-guide': {
    featured: true,
    difficulty: 'advanced',
    estimatedViews: 4200,
    relatedTopics: ['mlops', 'deployment', 'production', 'docker']
  },
  'building-rest-api-ml-model': {
    featured: false,
    difficulty: 'intermediate',
    estimatedViews: 1800,
    relatedTopics: ['api-development', 'fastapi', 'model-serving']
  }
};

export const blogCategories = [
  'Machine Learning',
  'Career',
  'Tutorial',
  'Opinion',
  'Technical Deep Dive',
  'Industry Insights',
  'Tools & Frameworks'
];

export const popularTags = [
  'machine-learning',
  'python',
  'tensorflow',
  'pytorch',
  'data-science',
  'mlops',
  'career-advice',
  'deep-learning',
  'computer-vision',
  'nlp',
  'deployment',
  'docker',
  'aws',
  'api-development',
  'model-optimization',
  'data-preprocessing',
  'feature-engineering',
  'hyperparameter-tuning',
  'model-validation',
  'production-ml'
];

export const readingTimeEstimate = (content: string): string => {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
};

export const wittyBlogQuotes = [
  "Writing about ML is like explaining why your model works to your manager at 5 PM on Friday.",
  "The real machine learning was the documentation we wrote along the way.",
  "Blog posts: Where I pretend to know what I'm talking about.",
  "These posts are 90% accurate, 10% coffee-induced hallucinations.",
  "Warning: May contain traces of imposter syndrome.",
  "Side effects may include: sudden urge to refactor all your code.",
  "Powered by midnight coding sessions and existential dread.",
  "No neural networks were harmed in the making of this blog."
];

export const getRandomQuote = (): string => {
  return wittyBlogQuotes[Math.floor(Math.random() * wittyBlogQuotes.length)];
};

export const formatBlogDate = (date: Date): string => {
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 1) {
    return 'Yesterday';
  } else if (diffDays < 7) {
    return `${diffDays} days ago`;
  } else if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return weeks === 1 ? '1 week ago' : `${weeks} weeks ago`;
  } else {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }
};
