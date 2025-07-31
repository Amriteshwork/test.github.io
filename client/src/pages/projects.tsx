import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ProjectCard from "@/components/project-card";
import { Search, Briefcase, Lightbulb } from "lucide-react";
import type { Project } from "@shared/schema";

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'professional' | 'personal'>('all');
  const [searchTerm, setSearchTerm] = useState("");

  const { data: projects, isLoading } = useQuery<Project[]>({
    queryKey: ['/api/projects'],
  });

  const filteredProjects = projects?.filter(project => {
    const matchesFilter = activeFilter === 'all' || project.type === activeFilter;
    const matchesSearch = !searchTerm || 
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesFilter && matchesSearch;
  }) || [];

  const professionalProjects = filteredProjects.filter(p => p.type === 'professional');
  const personalProjects = filteredProjects.filter(p => p.type === 'personal');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="skeleton-title w-80 mx-auto mb-4"></div>
            <div className="skeleton-text w-96 mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-xl shadow-lg p-6">
                <div className="skeleton w-full h-48 mb-4 rounded-lg"></div>
                <div className="skeleton-title w-3/4 mb-3"></div>
                <div className="skeleton-text w-full mb-2"></div>
                <div className="skeleton-text w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            All Projects
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A comprehensive collection of my machine learning projects, from production systems 
            that handle millions of requests to weekend experiments that barely work.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-12">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search projects by name, description, or technology..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 py-3"
            />
          </div>
          
          <div className="bg-gray-100 p-1 rounded-lg">
            <Button
              variant={activeFilter === 'all' ? 'default' : 'ghost'}
              onClick={() => setActiveFilter('all')}
              className={`px-6 py-2 rounded-md font-medium transition-all duration-200 ${
                activeFilter === 'all' 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              All ({projects?.length || 0})
            </Button>
            <Button
              variant={activeFilter === 'professional' ? 'default' : 'ghost'}
              onClick={() => setActiveFilter('professional')}
              className={`px-6 py-2 rounded-md font-medium transition-all duration-200 ${
                activeFilter === 'professional' 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Professional ({projects?.filter(p => p.type === 'professional').length || 0})
            </Button>
            <Button
              variant={activeFilter === 'personal' ? 'default' : 'ghost'}
              onClick={() => setActiveFilter('personal')}
              className={`px-6 py-2 rounded-md font-medium transition-all duration-200 ${
                activeFilter === 'personal' 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Personal ({projects?.filter(p => p.type === 'personal').length || 0})
            </Button>
          </div>
        </div>

        {/* Results */}
        {filteredProjects.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              {searchTerm 
                ? `No projects found matching "${searchTerm}". Try a different search term.`
                : "No projects found for the selected filter."
              }
            </p>
          </div>
        )}

        {/* Professional Projects */}
        {(activeFilter === 'all' || activeFilter === 'professional') && professionalProjects.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
              <Briefcase className="text-blue-600 mr-3 w-6 h-6" />
              Professional Projects ({professionalProjects.length})
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {professionalProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        )}

        {/* Personal Projects */}
        {(activeFilter === 'all' || activeFilter === 'personal') && personalProjects.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
              <Lightbulb className="text-emerald-600 mr-3 w-6 h-6" />
              Personal Projects & Experiments ({personalProjects.length})
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {personalProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        )}

        {/* Single filter view */}
        {activeFilter !== 'all' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
