import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ProjectCard from "@/components/project-card";
import { Briefcase, Lightbulb } from "lucide-react";
import type { Project } from "@shared/schema";

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'professional' | 'personal'>('all');

  const { data: projects, isLoading } = useQuery<Project[]>({
    queryKey: ['/api/projects'],
  });

  const filteredProjects = projects?.filter(project => 
    activeFilter === 'all' || project.type === activeFilter
  ) || [];

  const professionalProjects = projects?.filter(p => p.type === 'professional') || [];
  const personalProjects = projects?.filter(p => p.type === 'personal') || [];

  if (isLoading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="skeleton-title w-64 mx-auto mb-4"></div>
            <div className="skeleton-text w-96 mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-xl shadow-lg p-6">
                <div className="skeleton w-full h-48 mb-4 rounded-lg"></div>
                <div className="skeleton-title w-3/4 mb-3"></div>
                <div className="skeleton-text w-full mb-2"></div>
                <div className="skeleton-text w-2/3 mb-4"></div>
                <div className="flex gap-2 mb-4">
                  <div className="skeleton w-16 h-6 rounded"></div>
                  <div className="skeleton w-20 h-6 rounded"></div>
                  <div className="skeleton w-18 h-6 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Projects That Actually Work
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A collection of ML projects that survived production deployment. 
            Some even handle real user traffic without catching fire.
          </p>
        </div>

        {/* Project Filter Tabs */}
        <div className="flex justify-center mb-12">
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
              All Projects
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
              Professional
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
              Personal
            </Button>
          </div>
        </div>

        {/* Professional Projects */}
        {(activeFilter === 'all' || activeFilter === 'professional') && professionalProjects.length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
              <Briefcase className="text-blue-600 mr-3 w-6 h-6" />
              Professional Projects
            </h3>
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
            <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
              <Lightbulb className="text-emerald-600 mr-3 w-6 h-6" />
              Personal Projects & Experiments
            </h3>
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

        {filteredProjects.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <p className="text-gray-500">No projects found for the selected filter.</p>
          </div>
        )}
      </div>
    </section>
  );
}
