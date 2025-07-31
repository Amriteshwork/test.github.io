import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import BlogCard from "@/components/blog-card";
import type { BlogPost } from "@shared/schema";

export default function BlogSection() {
  const { data: posts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ['/api/blog'],
  });

  const recentPosts = posts?.slice(0, 3) || [];

  if (isLoading) {
    return (
      <section id="blog" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="skeleton-title w-80 mx-auto mb-4"></div>
            <div className="skeleton-text w-96 mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="skeleton w-20 h-6 rounded"></div>
                  <div className="skeleton w-16 h-4 rounded"></div>
                </div>
                <div className="skeleton-title w-full mb-3"></div>
                <div className="skeleton-text w-full mb-2"></div>
                <div className="skeleton-text w-3/4 mb-4"></div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="skeleton-avatar"></div>
                    <div className="skeleton w-16 h-4 rounded"></div>
                  </div>
                  <div className="skeleton w-20 h-6 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="blog" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Random Thoughts & Technical Rants
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Where I document my journey from "it works on my machine" to "it actually works in production." 
            Plus occasional existential crises about gradient descent.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recentPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        {recentPosts.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <p className="text-gray-500">No blog posts available yet. Check back soon!</p>
          </div>
        )}

        <div className="text-center mt-12">
          <Link href="/blog">
            <Button className="bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200">
              View All Posts
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
