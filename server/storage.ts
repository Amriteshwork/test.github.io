import { type BlogPost, type InsertBlogPost, type Project, type InsertProject } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Blog posts
  getAllBlogPosts(): Promise<BlogPost[]>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  
  // Projects
  getAllProjects(): Promise<Project[]>;
  getProjectsByType(type: 'professional' | 'personal'): Promise<Project[]>;
  getProjectBySlug(slug: string): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
}

export class MemStorage implements IStorage {
  private blogPosts: Map<string, BlogPost> = new Map();
  private projects: Map<string, Project> = new Map();

  constructor() {
    this.seedData();
  }

  private seedData() {
    // Seed with sample blog posts
    const sampleBlogPosts: BlogPost[] = [
      {
        id: "1",
        title: "Why Your Neural Network is Probably Overfitting (And Other Life Lessons)",
        slug: "neural-network-overfitting-life-lessons",
        excerpt: "A deep dive into the most common pitfalls in machine learning model development. Spoiler: Your model isn't as smart as you think it is, and neither are you.",
        content: `# Why Your Neural Network is Probably Overfitting (And Other Life Lessons)

Let's be honest here. That neural network you're so proud of? The one that's achieving 99.9% accuracy on your training set? Yeah, it's probably overfitting harder than a bodybuilder in a too-small tank top.

## The Signs You're In Denial

1. **Your training accuracy is suspiciously high**: If your model is performing better than a human expert, either you've achieved AGI or you're overfitting. Guess which one is more likely.

2. **Your validation loss is climbing faster than your caffeine addiction**: When your validation loss starts going up while training loss keeps going down, that's not a feature - it's a bug in your approach to life.

3. **Your model memorized the training data**: If your model can tell you what you had for lunch three Tuesdays ago based on pixel 47,231, you might have a problem.

## How to Fix It (Without Therapy)

- **Regularization**: Add some L2 regularization. Think of it as meditation for your neural network.
- **Dropout**: Randomly ignore some neurons. It's like selective hearing, but for AI.
- **Early stopping**: Know when to quit. A life lesson that extends beyond machine learning.
- **More data**: The solution to most ML problems is more data. The solution to most life problems is also more data (or coffee).

Remember, the goal is to build a model that generalizes well, not one that has memorized your entire dataset like that one kid in school who memorized the dictionary.

*Next week: "Why Your Gradient is Vanishing (And How to Find It Again)"*`,
        category: "Machine Learning",
        tags: ["overfitting", "neural-networks", "debugging"],
        publishedAt: new Date("2023-12-15"),
        readTime: "5 min read",
        author: "Alex Chen"
      },
      {
        id: "2",
        title: "From Jupyter Notebooks to Production: A Survival Guide",
        slug: "jupyter-notebooks-to-production-survival-guide",
        excerpt: "The journey from 'it works in my notebook' to 'it actually serves users' is filled with tears, Docker files, and questioning your life choices.",
        content: `# From Jupyter Notebooks to Production: A Survival Guide

Ah, the classic journey every ML engineer knows by heart. One day you're happily prototyping in Jupyter notebooks, the next day your manager is asking when your "little experiment" will be ready for production. 

Spoiler alert: It's never as simple as just copying your notebook code.

## Stage 1: Denial

"It works in my notebook, so it should work everywhere, right?"

Wrong. So very wrong. Your notebook is a controlled environment, like a nature preserve for code. Production is the wild west.

## Stage 2: The Refactoring Nightmare

Time to turn those 47 cells of exploratory code into actual functions. You'll discover:

- Variables you defined 20 cells ago
- Magic numbers everywhere
- Functions that only work because you ran cells in a specific order
- That one cell you commented out but forgot why

## Stage 3: Containerization Hell

Enter Docker. Because if it works on your machine, it should work in a container, right?

\`\`\`dockerfile
# Your first attempt
FROM python:3.9
COPY . .
RUN pip install -r requirements.txt
# Spoiler: This won't work
\`\`\`

Three days and 47 failed builds later:

\`\`\`dockerfile
# Your battle-tested Dockerfile
FROM python:3.9-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
# This might actually work
\`\`\`

## Stage 4: The API Wrapper

Your beautiful ML model needs to talk to the outside world. Time to wrap it in FastAPI:

\`\`\`python
from fastapi import FastAPI
import pickle
import pandas as pd

app = FastAPI()

# Load your model (pray it works)
model = pickle.load(open('model.pkl', 'rb'))

@app.post("/predict")
async def predict(data: dict):
    # Convert dict to DataFrame
    # Handle missing features
    # Validate input
    # Make prediction
    # Return JSON
    # Profit???
\`\`\`

## Stage 5: Monitoring and Alerting

Your model is live! Time to watch it fail in real-time. Set up monitoring for:

- Prediction latency (because users hate waiting)
- Model drift (because the real world doesn't match your training data)
- Error rates (because Murphy's law applies to ML too)
- Your sanity levels (optional but recommended)

## Survival Tips

1. **Version everything**: Code, data, models, your emotional state
2. **Test everything**: Unit tests, integration tests, sanity tests
3. **Monitor everything**: Logs, metrics, your coffee consumption
4. **Document everything**: Future you will thank present you
5. **Keep your notebook**: You'll need it for debugging in production

Remember, production is not about having perfect code. It's about having code that fails gracefully and gives you enough information to fix it at 3 AM.

*Coming up next: "Why Your Model Works in Production but Not in the Demo"*`,
        category: "Career",
        tags: ["production", "mlops", "deployment"],
        publishedAt: new Date("2023-12-08"),
        readTime: "8 min read",
        author: "Alex Chen"
      }
    ];

    const sampleProjects: Project[] = [
      {
        id: "1",
        title: "Customer Churn Prediction",
        slug: "customer-churn-prediction",
        description: "Built a machine learning model that predicts customer churn with 94% accuracy. Saved the company $2M annually by identifying at-risk customers.",
        content: `# Customer Churn Prediction System

## The Problem

Our telecom client was hemorrhaging customers faster than a leaky bucket. They needed to identify customers who were likely to churn before they actually did, so they could take proactive measures to retain them.

## The Approach

Built a comprehensive machine learning pipeline that analyzes customer behavior patterns, usage statistics, and interaction history to predict churn probability.

### Features Used:
- Monthly charges and total charges
- Contract type and tenure
- Service usage patterns
- Customer support interactions
- Payment method and history

### Model Architecture:
- **Primary Model**: Random Forest Classifier
- **Secondary Model**: XGBoost for comparison
- **Feature Engineering**: Created interaction features and temporal patterns
- **Validation**: Time-series cross-validation to prevent data leakage

## Results

- **94% Accuracy** on test set
- **$2M Annual Savings** through targeted retention campaigns
- **35% Reduction** in churn rate for high-risk customers
- **ROI**: 15x return on investment in first year

## Technical Implementation

\`\`\`python
# Feature engineering pipeline
def create_features(df):
    # Calculate customer lifetime value
    df['clv'] = df['tenure'] * df['monthly_charges']
    
    # Usage pattern features
    df['avg_monthly_usage'] = df['total_usage'] / df['tenure']
    
    # Support interaction features
    df['support_calls_per_month'] = df['support_calls'] / df['tenure']
    
    return df

# Model training
rf_model = RandomForestClassifier(
    n_estimators=200,
    max_depth=15,
    min_samples_split=10,
    random_state=42
)

# Cross-validation with time awareness
tscv = TimeSeriesSplit(n_splits=5)
scores = cross_val_score(rf_model, X, y, cv=tscv, scoring='roc_auc')
\`\`\`

## Deployment

- **Infrastructure**: AWS SageMaker for model hosting
- **API**: FastAPI with automatic input validation
- **Monitoring**: CloudWatch for model performance tracking
- **Retraining**: Automated monthly retraining pipeline

## Business Impact

The model enabled the business to:
1. **Proactive Retention**: Contact at-risk customers before they churn
2. **Targeted Offers**: Customize retention offers based on churn probability
3. **Resource Optimization**: Focus retention efforts on high-value customers
4. **Process Improvement**: Identify root causes of churn

## Lessons Learned

- **Data Quality Matters**: Spent 60% of time on data cleaning and validation
- **Feature Engineering > Model Complexity**: Simple features often outperform complex ones
- **Business Context is Key**: Understanding why customers churn is as important as predicting it
- **Monitoring is Critical**: Model performance degrades over time without proper monitoring

*This project taught me that the most sophisticated model is useless if the business can't act on its predictions.*`,
        type: "professional",
        status: "completed",
        technologies: ["Python", "Scikit-learn", "PostgreSQL", "Docker", "AWS SageMaker"],
        githubUrl: null, // Proprietary
        liveUrl: null,
        imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=240",
        createdAt: new Date("2023-06-15")
      },
      {
        id: "2",
        title: "AI Music Recommender",
        slug: "ai-music-recommender",
        description: "Because Spotify's algorithm wasn't weird enough. Built a music recommender that actually understands my terrible taste in music. Now I can blame AI for my playlists.",
        content: `# AI Music Recommender: Because Spotify Wasn't Weird Enough

## The Motivation

Ever listened to Spotify's "Discover Weekly" and wondered who trained their algorithm? Me too. So I decided to build my own music recommendation system that would understand my uniquely terrible taste in music.

## The Journey

What started as a weekend project turned into a 3-month deep dive into collaborative filtering, matrix factorization, and the existential question: "What is good music, anyway?"

### The Dataset

- **Source**: Spotify Web API + Last.fm dataset
- **Size**: 50k users, 500k tracks, 2M listening events
- **Features**: Audio features, user demographics, listening history
- **Challenge**: Cold start problem for new users/tracks

### The Approach

#### 1. Collaborative Filtering
Started with the classic user-item matrix approach:

\`\`\`python
from surprise import SVD, Dataset, Reader
from surprise.model_selection import cross_validate

# Basic collaborative filtering
algo = SVD(n_factors=100, n_epochs=20, lr_all=0.005, reg_all=0.02)
cross_validate(algo, data, measures=['RMSE', 'MAE'], cv=5)
\`\`\`

**Result**: Decent recommendations but suffered from the cold start problem.

#### 2. Content-Based Filtering
Added audio feature analysis:

\`\`\`python
# Audio feature analysis
features = ['danceability', 'energy', 'speechiness', 'acousticness', 
           'instrumentalness', 'liveness', 'valence', 'tempo']

# Calculate user preferences
user_profile = user_tracks[features].mean()

# Find similar tracks
similarities = cosine_similarity([user_profile], track_features)
\`\`\`

**Result**: Better for new users, but recommendations felt robotic.

#### 3. Hybrid Approach
Combined both methods with neural networks:

\`\`\`python
import tensorflow as tf

class HybridRecommender(tf.keras.Model):
    def __init__(self, num_users, num_items, embedding_dim=50):
        super().__init__()
        self.user_embedding = tf.keras.layers.Embedding(num_users, embedding_dim)
        self.item_embedding = tf.keras.layers.Embedding(num_items, embedding_dim)
        self.content_dense = tf.keras.layers.Dense(embedding_dim)
        self.output_layer = tf.keras.layers.Dense(1, activation='sigmoid')
    
    def call(self, inputs):
        user_id, item_id, content_features = inputs
        user_vec = self.user_embedding(user_id)
        item_vec = self.item_embedding(item_id)
        content_vec = self.content_dense(content_features)
        
        # Combine all features
        combined = tf.concat([user_vec, item_vec, content_vec], axis=-1)
        return self.output_layer(combined)
\`\`\`

## The Results

### Metrics
- **Precision@10**: 0.15 (better than random!)
- **Recall@10**: 0.08 (room for improvement)
- **User Satisfaction**: "Your AI has questionable taste, but so do I" - Beta tester

### Real-World Testing
Deployed as a simple Flask web app and tested on friends and family:

- **Positive**: Found some genuinely good hidden gems
- **Negative**: Occasionally recommended death metal to my grandmother
- **Funny**: Created a playlist called "Songs for Debugging at 3 AM"

## Technical Architecture

\`\`\`
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Spotify API   │    │   Data Store    │    │  ML Pipeline    │
│                 │───▶│   PostgreSQL    │───▶│   Training      │
│ Audio Features  │    │ User Listening  │    │   Inference     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                                       │
                                                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Web Interface │◀───│   Flask API     │◀───│  Recommendations│
│   React SPA     │    │   REST Endpoints│    │    Service      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
\`\`\`

## Lessons Learned

### Technical
1. **Data Quality > Algorithm Complexity**: Spent more time cleaning listening data than tuning models
2. **Cold Start is Hard**: New users and tracks remain a challenge
3. **Context Matters**: Time of day, mood, activity all affect music preferences
4. **Evaluation is Subjective**: How do you measure if a recommendation is "good"?

### Personal
1. **My Music Taste is Weird**: The algorithm confirmed what my friends always said
2. **Rabbit Holes are Real**: Started with simple collaborative filtering, ended with deep learning
3. **Perfect is the Enemy of Good**: Spent weeks optimizing for marginal improvements
4. **Users are Forgiving**: People are surprisingly tolerant of weird recommendations

## Future Improvements

- **Multi-Armed Bandits**: For exploration vs exploitation
- **Sequential Models**: Account for listening session context
- **Social Features**: Friend recommendations and social proof
- **Real-time Learning**: Update preferences based on skips/likes

## The Verdict

Did I build a better Spotify? No. Did I learn a ton about recommendation systems? Absolutely. Did I discover that I have terrible taste in music? That was confirmed within the first week.

The system works well enough that I still use it occasionally, especially when I want to rediscover old songs or find music for specific moods. Sometimes the best projects are the ones that solve your own problems, even if no one else has those problems.

*Fun fact: The algorithm once recommended a 10-hour loop of coding music. It wasn't wrong.*`,
        type: "personal",
        status: "working",
        technologies: ["Python", "Spotify API", "Flask", "Collaborative Filtering", "TensorFlow"],
        githubUrl: "https://github.com/alexchen/music-recommender",
        liveUrl: "https://music-rec.alexchen.dev",
        imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=240",
        createdAt: new Date("2023-09-01")
      }
    ];

    // Seed the data
    sampleBlogPosts.forEach(post => this.blogPosts.set(post.id, post));
    sampleProjects.forEach(project => this.projects.set(project.id, project));
  }

  async getAllBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values()).sort((a, b) => 
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    return Array.from(this.blogPosts.values()).find(post => post.slug === slug);
  }

  async createBlogPost(insertPost: InsertBlogPost): Promise<BlogPost> {
    const id = randomUUID();
    const post: BlogPost = {
      ...insertPost,
      id,
      publishedAt: new Date(),
    };
    this.blogPosts.set(id, post);
    return post;
  }

  async getAllProjects(): Promise<Project[]> {
    return Array.from(this.projects.values()).sort((a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async getProjectsByType(type: 'professional' | 'personal'): Promise<Project[]> {
    return Array.from(this.projects.values())
      .filter(project => project.type === type)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async getProjectBySlug(slug: string): Promise<Project | undefined> {
    return Array.from(this.projects.values()).find(project => project.slug === slug);
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = randomUUID();
    const project: Project = {
      ...insertProject,
      id,
      createdAt: new Date(),
    };
    this.projects.set(id, project);
    return project;
  }
}

export const storage = new MemStorage();
