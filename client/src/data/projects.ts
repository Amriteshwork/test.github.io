// This file contains static project data that complements the server-side storage
// Used for any client-side operations or fallback content

export interface ProjectMeta {
  featured: boolean;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  impact?: string;
}

export const projectMeta: Record<string, ProjectMeta> = {
  'customer-churn-prediction': {
    featured: true,
    difficulty: 'advanced',
    duration: '3 months',
    impact: '$2M annual savings'
  },
  'real-time-object-detection': {
    featured: true,
    difficulty: 'advanced',
    duration: '4 months',
    impact: '40% cost reduction'
  },
  'smart-document-processing': {
    featured: true,
    difficulty: 'intermediate',
    duration: '2 months',
    impact: '96% accuracy improvement'
  },
  'ai-music-recommender': {
    featured: false,
    difficulty: 'intermediate',
    duration: '3 months'
  },
  'stock-prediction-bot': {
    featured: false,
    difficulty: 'advanced',
    duration: '1 month'
  },
  'emotion-detection-app': {
    featured: false,
    difficulty: 'beginner',
    duration: '2 weeks'
  }
};

export const projectCategories = [
  'Machine Learning',
  'Computer Vision',
  'Natural Language Processing',
  'Recommendation Systems',
  'Time Series Analysis',
  'Deep Learning'
];

export const technologyCategories = {
  'Machine Learning': ['Python', 'Scikit-learn', 'XGBoost', 'LightGBM'],
  'Deep Learning': ['TensorFlow', 'PyTorch', 'Keras', 'Neural Networks'],
  'Computer Vision': ['OpenCV', 'YOLO', 'CNN', 'Image Processing'],
  'NLP': ['spaCy', 'NLTK', 'Transformers', 'BERT', 'GPT'],
  'Data': ['Pandas', 'NumPy', 'PostgreSQL', 'MongoDB', 'Redis'],
  'Deployment': ['Docker', 'AWS', 'FastAPI', 'Flask', 'Kubernetes'],
  'Frontend': ['React', 'TypeScript', 'Tailwind CSS', 'Next.js'],
  'Tools': ['Git', 'Jupyter', 'MLflow', 'Weights & Biases']
};

export const wittyProjectQuotes = [
  "This project taught me that the real treasure was the bugs we made along the way.",
  "Accuracy: 99.9%. Confidence in production: 12%.",
  "Built with love, caffeine, and questionable architectural decisions.",
  "It works on my machine, and that's what matters.",
  "Powered by Stack Overflow and pure determination.",
  "This model is so good, it's basically cheating (legally).",
  "Debugging this was more complex than the actual algorithm.",
  "The dataset was clean. The code was not."
];
