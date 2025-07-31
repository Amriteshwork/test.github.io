import { Button } from "@/components/ui/button";
import { ArrowRight, Download, Coffee, Brain, TrendingUp } from "lucide-react";
import { Link } from "wouter";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden hero-gradient py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-slide-up">
            <div className="text-sm font-medium text-blue-600 mb-4 flex items-center">
              <span className="mr-2">👋</span>
              Hello, I'm Alex Chen
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              Machine Learning Engineer
              <span className="text-blue-600 block">Who Actually Ships</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              I turn caffeine into neural networks and transform business problems into algorithmic solutions. 
              Currently making machines smarter than my previous job interviews.
            </p>
            
            {/* Witty Quote */}
            <div className="bg-white rounded-lg p-6 mb-8 shadow-sm border-l-4 border-blue-600">
              <p className="text-gray-700 italic mb-2">
                "I don't always debug my models, but when I do, I prefer to blame the data."
              </p>
              <p className="text-sm text-gray-500">- Every ML Engineer Ever</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link href="/projects">
                <Button className="bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 group">
                  View My Work
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                <Download className="w-4 h-4 mr-2" />
                Download Resume
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 mb-1">15+</div>
                <div className="text-sm text-gray-600">ML Projects</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 mb-1">3+</div>
                <div className="text-sm text-gray-600">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 mb-1">50+</div>
                <div className="text-sm text-gray-600">Models Deployed</div>
              </div>
            </div>
          </div>

          <div className="relative animate-fade-in">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&h=600" 
                alt="Alex Chen - ML Engineer" 
                className="rounded-2xl shadow-2xl w-full max-w-md mx-auto"
              />
              
              {/* Floating Tech Icons */}
              <div className="absolute -top-4 -right-4 bg-white rounded-full p-3 shadow-lg animate-pulse-slow">
                <Coffee className="text-2xl text-blue-600 w-6 h-6" />
              </div>
              <div className="absolute top-1/4 -left-4 bg-white rounded-full p-3 shadow-lg animate-pulse-slow" style={{animationDelay: '1s'}}>
                <Brain className="text-2xl text-emerald-500 w-6 h-6" />
              </div>
              <div className="absolute -bottom-4 left-1/4 bg-white rounded-full p-3 shadow-lg animate-pulse-slow" style={{animationDelay: '2s'}}>
                <TrendingUp className="text-2xl text-amber-500 w-6 h-6" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
