# Portfolio Website - replit.md

## Overview

This is a modern portfolio website for "Alex Chen," a Machine Learning Engineer, built with a full-stack architecture featuring React frontend and Express.js backend. The site showcases professional projects, personal experiments, and technical blog posts with a focus on machine learning and software engineering content.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **Routing**: Wouter (lightweight React router)
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: TanStack Query (React Query) for server state
- **Build Tool**: Vite with custom configuration for development and production

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **API Pattern**: RESTful API with JSON responses
- **Middleware**: Custom logging, JSON parsing, and error handling
- **Storage**: In-memory storage with interface for future database integration

### Database Design
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema**: Two main entities - blog posts and projects
- **Migrations**: Managed through Drizzle Kit
- **Database Provider**: Configured for Neon Database (serverless PostgreSQL)

## Key Components

### Data Models
1. **Blog Posts**: Title, slug, content, category, tags, publish date, read time
2. **Projects**: Title, slug, description, type (professional/personal), status, technologies, URLs

### UI Components
- **Component Library**: shadcn/ui with Radix UI primitives
- **Cards**: Specialized blog and project cards with metadata display
- **Navigation**: Sticky header with smooth scroll navigation
- **Forms**: Contact forms with validation and toast notifications
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints

### Page Structure
- **Home**: Hero section, featured projects, recent blog posts, contact form
- **Projects**: Filterable grid of professional and personal projects
- **Blog**: Searchable blog posts with category filtering
- **Detail Pages**: Individual project and blog post pages with rich content

## Data Flow

### API Endpoints
- `GET /api/blog` - Fetch all blog posts
- `GET /api/blog/:slug` - Fetch specific blog post
- `GET /api/projects` - Fetch all projects (with optional type filtering)
- `GET /api/projects/:slug` - Fetch specific project

### State Management
- **Server State**: TanStack Query manages API data with caching and background updates
- **Local State**: React hooks for form inputs, filters, and UI state
- **URL State**: Wouter manages routing and navigation state

### Content Rendering
- **Markdown**: Blog posts and project content rendered with ReactMarkdown
- **Syntax Highlighting**: Code blocks highlighted with Prism.js
- **Rich Media**: Support for images, links, and embedded content

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL client
- **drizzle-orm**: Type-safe ORM with PostgreSQL support
- **@tanstack/react-query**: Server state management
- **react-markdown**: Markdown rendering with syntax highlighting
- **@radix-ui/***: Accessible UI component primitives

### Development Tools
- **Vite**: Fast build tool with HMR and TypeScript support
- **ESBuild**: Production bundling for server code
- **Drizzle Kit**: Database schema management and migrations
- **Tailwind CSS**: Utility-first styling framework

### UI Enhancement
- **class-variance-authority**: Component variant management
- **clsx**: Conditional className utilities
- **lucide-react**: Icon library
- **date-fns**: Date formatting utilities

## Deployment Strategy

### Build Process
- **Frontend**: Vite builds React app to `dist/public`
- **Backend**: ESBuild bundles Express server to `dist/index.js`
- **Database**: Drizzle migrations ensure schema consistency

### Environment Configuration
- **Development**: Node.js with tsx for TypeScript execution
- **Production**: Compiled JavaScript with optimized assets
- **Database**: Environment variable-based connection string

### Development Features
- **Hot Module Replacement**: Vite provides instant updates during development
- **Error Overlay**: Runtime error modal for debugging
- **Development Banner**: Replit-specific development indicators
- **TypeScript Checking**: Continuous type checking without compilation

### Current Storage Implementation
The application currently uses in-memory storage with sample data, but is architected with a storage interface (`IStorage`) that makes it easy to swap in a real database implementation using the configured Drizzle ORM and PostgreSQL setup.