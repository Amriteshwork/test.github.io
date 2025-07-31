import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import type { Project } from "@shared/schema";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
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
    <Card className="project-card bg-white rounded-xl shadow-lg hover:shadow-xl cursor-pointer overflow-hidden">
      <CardContent className="p-6">
        {project.imageUrl && (
          <img 
            src={project.imageUrl} 
            alt={project.title}
            className="w-full h-48 object-cover rounded-lg mb-4" 
          />
        )}
        
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-xl font-bold text-gray-900 line-clamp-1">{project.title}</h4>
          <Badge className={getStatusColor(project.status)}>
            {getStatusLabel(project.status)}
          </Badge>
        </div>
        
        <p className="text-gray-600 mb-4 line-clamp-3">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, 4).map((tech) => (
            <Badge key={tech} variant="secondary" className="bg-gray-100 text-gray-700 text-xs">
              {tech}
            </Badge>
          ))}
          {project.technologies.length > 4 && (
            <Badge variant="secondary" className="bg-gray-100 text-gray-700 text-xs">
              +{project.technologies.length - 4} more
            </Badge>
          )}
        </div>
        
        <div className="flex justify-between items-center">
          <Link href={`/projects/${project.slug}`}>
            <Button variant="ghost" className="text-blue-600 hover:text-blue-800 p-0 h-auto font-medium">
              {project.type === 'professional' ? 'Read Case Study' : 'Read About It'} 
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
          <div className="flex space-x-3">
            {project.githubUrl && (
              <a 
                href={project.githubUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                onClick={(e) => e.stopPropagation()}
              >
                <Github className="w-5 h-5" />
              </a>
            )}
            {project.liveUrl && (
              <a 
                href={project.liveUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
