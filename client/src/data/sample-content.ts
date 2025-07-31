// This file contains sample content and utilities for the portfolio
// Used for demonstrations, fallbacks, and development

export const personalInfo = {
  name: "Alex Chen",
  title: "Machine Learning Engineer",
  tagline: "Who Actually Ships",
  location: "San Francisco, CA",
  email: "alex.chen@example.com",
  phone: "+1 (555) 123-4567",
  github: "https://github.com/alexchen",
  linkedin: "https://linkedin.com/in/alexchen",
  twitter: "https://twitter.com/alexchen",
  website: "https://alexchen.dev"
};

export const heroQuotes = [
  {
    text: "I don't always debug my models, but when I do, I prefer to blame the data.",
    author: "Every ML Engineer Ever"
  },
  {
    text: "My code works perfectly in Jupyter notebooks. Production is just a minor implementation detail.",
    author: "Famous Last Words"
  },
  {
    text: "I solve problems you didn't know you had, in ways you don't understand.",
    author: "ML Engineer's Motto"
  },
  {
    text: "Training models is 10% science, 90% waiting for epochs to complete.",
    author: "The Hard Truth"
  }
];

export const skills = {
  'Machine Learning': [
    'Supervised Learning',
    'Unsupervised Learning',
    'Deep Learning',
    'Reinforcement Learning',
    'Feature Engineering',
    'Model Selection'
  ],
  'Programming': [
    'Python',
    'R',
    'SQL',
    'JavaScript',
    'TypeScript',
    'Bash'
  ],
  'Frameworks & Libraries': [
    'TensorFlow',
    'PyTorch',
    'Scikit-learn',
    'Pandas',
    'NumPy',
    'Matplotlib'
  ],
  'MLOps & Deployment': [
    'Docker',
    'Kubernetes',
    'AWS',
    'GCP',
    'MLflow',
    'Weights & Biases'
  ],
  'Databases': [
    'PostgreSQL',
    'MongoDB',
    'Redis',
    'Elasticsearch',
    'InfluxDB',
    'Neo4j'
  ],
  'Web Development': [
    'React',
    'Node.js',
    'FastAPI',
    'Flask',
    'Express',
    'Next.js'
  ]
};

export const achievements = [
  {
    metric: "15+",
    label: "ML Projects",
    description: "From prototype to production"
  },
  {
    metric: "3+",
    label: "Years Experience",
    description: "In machine learning and data science"
  },
  {
    metric: "50+",
    label: "Models Deployed",
    description: "Successfully serving users"
  },
  {
    metric: "94%",
    label: "Average Accuracy",
    description: "Across classification models"
  }
];

export const testimonials = [
  {
    text: "Alex built a recommendation system that actually works. I'm suspicious.",
    author: "Senior Product Manager",
    company: "TechCorp"
  },
  {
    text: "His models are so good, they make our data scientists question their life choices.",
    author: "Head of Data Science",
    company: "DataCorp"
  },
  {
    text: "Alex explained machine learning to our CEO in terms she understood. We promoted him immediately.",
    author: "CTO",
    company: "StartupCorp"
  }
];

export const contactReasons = [
  "Hire me for your ML project",
  "Collaboration opportunity",
  "Speaking engagement",
  "Technical consultation",
  "Career advice",
  "Just want to chat about AI",
  "Found a bug in my code",
  "Other"
];

export const footerQuotes = [
  "Built with too much coffee and questionable life choices.",
  "Powered by imposter syndrome and Stack Overflow.",
  "No neural networks were harmed in making this website.",
  "This site uses cookies. The chocolate chip kind would be better.",
  "Code quality varies by caffeine level.",
  "100% organic, locally-sourced HTML and CSS.",
  "Warning: May contain traces of perfectionism.",
  "Side effects may include sudden urge to optimize everything."
];

export const getRandomFooterQuote = (): string => {
  return footerQuotes[Math.floor(Math.random() * footerQuotes.length)];
};

export const navigationItems = [
  { href: "/", label: "Home", description: "Welcome to my digital playground" },
  { href: "/projects", label: "Projects", description: "Things I've built that actually work" },
  { href: "/blog", label: "Blog", description: "Thoughts on ML, code, and life" },
  { href: "/#contact", label: "Contact", description: "Let's build something amazing" }
];

export const socialLinks = [
  {
    name: "GitHub",
    url: "https://github.com/alexchen",
    icon: "github",
    description: "Check out my code"
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/alexchen",
    icon: "linkedin", 
    description: "Professional connections"
  },
  {
    name: "Twitter",
    url: "https://twitter.com/alexchen",
    icon: "twitter",
    description: "Hot takes and tech thoughts"
  },
  {
    name: "RSS",
    url: "/blog/rss.xml",
    icon: "rss",
    description: "Subscribe to my blog"
  }
];
