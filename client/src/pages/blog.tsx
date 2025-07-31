import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import BlogCard from "@/components/blog-card";
import { Search } from "lucide-react";
import type { BlogPost } from "@shared/schema";

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const { data: posts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ['/api/blog'],
  });

  // Get unique categories
  const categories = posts ? ['all', ...new Set(posts.map(post => post.category))] : ['all'];

  const filteredPosts = posts?.filter(post => {
    const matchesSearch = !searchTerm || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  }) || [];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="skeleton-title w-64 mx-auto mb-4"></div>
            <div className="skeleton-text w-96 mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="skeleton w-20 h-6 rounded"></div>
                  <div className="skeleton w-16 h-4 rounded"></div>
                </div>
                <div className="skeleton-title w-full mb-3"></div>
                <div className="skeleton-text w-full mb-2"></div>
                <div className="skeleton-text w-3/4"></div>
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
            Blog & Technical Writings
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Deep dives into machine learning, career insights, and occasional existential crises 
            about whether my neural networks are actually learning anything useful.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-12">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search posts by title, content, or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 py-3"
            />
          </div>
          
          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? 'default' : 'secondary'}
                className={`cursor-pointer transition-colors duration-200 ${
                  selectedCategory === category 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category === 'all' ? 'All' : category} 
                ({category === 'all' ? posts?.length || 0 : posts?.filter(p => p.category === category).length || 0})
              </Badge>
            ))}
          </div>
        </div>

        {/* Results */}
        {filteredPosts.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              {searchTerm 
                ? `No posts found matching "${searchTerm}". Try a different search term.`
                : "No posts found for the selected category."
              }
            </p>
          </div>
        )}

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        {/* Empty State */}
        {posts && posts.length === 0 && !isLoading && (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No Posts Yet</h2>
            <p className="text-gray-600 mb-8">
              I'm working on some amazing content about machine learning, career tips, and tech insights. 
              Check back soon!
            </p>
          </div>
        )}

        {/* Witty Footer Quote */}
        {filteredPosts.length > 0 && (
          <div className="mt-20 text-center">
            <div className="bg-white rounded-lg p-6 max-w-2xl mx-auto shadow-sm border-l-4 border-blue-600">
              <p className="text-gray-700 italic">
                "Writing about machine learning is like debugging code - you think you understand it 
                until you try to explain it to someone else."
              </p>
              <p className="text-sm text-gray-500 mt-2">- Why I started this blog</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
