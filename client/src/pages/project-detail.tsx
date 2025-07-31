import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MarkdownRenderer } from "@/lib/markdown-parser";
import { ArrowLeft, Github, ExternalLink, Calendar, Tag } from "lucide-react";
import { Link, useParams } from "wouter";
import type { Project } from "@shared/schema";

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  
  const { data: project, isLoading, error } = useQuery<Project>({
    queryKey: ['/api/projects', slug],
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="skeleton w-24 h-10 mb-8 rounded-lg"></div>
          <div className="skeleton-title w-3/4 mb-4"></div>
          <div className="skeleton-text w-full mb-2"></div>
          <div className="skeleton-text w-2/3 mb-8"></div>
          <div className="skeleton w-full h-64 rounded-lg mb-8"></div>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="skeleton-text w-full"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-gray-50 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardContent className="p-12 text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Project Not Found</h1>
              <p className="text-gray-600 mb-8">
                The project you're looking for doesn't exist or has been moved.
              </p>
              <Link href="/projects">
                <Button>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Projects
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'working': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed': return project.type === 'professional' ? 'Completed' : 'Working';
      case 'working': return 'Working';
      case 'failed': return 'Failed Experiment';
      default: return status;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'professional': return 'bg-blue-100 text-blue-800';
      case 'personal': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/projects">
          <Button variant="ghost" className="mb-8 p-0">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Projects
          </Button>
        </Link>

        <article className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="px-8 py-8 border-b border-gray-200">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <Badge className={getTypeColor(project.type)}>
                {project.type === 'professional' ? 'Professional' : 'Personal'}
              </Badge>
              <Badge className={getStatusColor(project.status)}>
                {getStatusLabel(project.status)}
              </Badge>
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="w-4 h-4 mr-1" />
                {new Date(project.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            </div>

            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {project.title}
            </h1>
            
            <p className="text-xl text-gray-600 mb-6">
              {project.description}
            </p>

            {/* Technologies */}
            <div className="flex items-center gap-2 mb-6">
              <Tag className="w-4 h-4 text-gray-500" />
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <Badge key={tech} variant="secondary" className="bg-gray-100 text-gray-700">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="flex gap-4">
              {project.githubUrl && (
                <a 
                  href={project.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <Button variant="outline">
                    <Github className="w-4 h-4 mr-2" />
                    View Code
                  </Button>
                </a>
              )}
              {project.liveUrl && (
                <a 
                  href={project.liveUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <Button>
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Live Demo
                  </Button>
                </a>
              )}
            </div>
          </div>

          {/* Project Image */}
          {project.imageUrl && (
            <div className="px-8 py-6">
              <img 
                src={project.imageUrl} 
                alt={project.title}
                className="w-full rounded-lg shadow-md" 
              />
            </div>
          )}

          {/* Content */}
          <div className="px-8 py-8">
            <MarkdownRenderer content={project.content} />
          </div>

          {/* Footer */}
          <div className="px-8 py-6 bg-gray-50 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <p className="text-sm text-gray-600">
                  Like this project? Check out my other work or get in touch.
                </p>
              </div>
              <div className="flex gap-3">
                <Link href="/projects">
                  <Button variant="outline">More Projects</Button>
                </Link>
                <a href="/#contact">
                  <Button>Get in Touch</Button>
                </a>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
