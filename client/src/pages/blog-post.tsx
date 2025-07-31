import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MarkdownRenderer } from "@/lib/markdown-parser";
import { ArrowLeft, Calendar, Clock, Tag, Share2 } from "lucide-react";
import { Link, useParams } from "wouter";
import type { BlogPost } from "@shared/schema";

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  
  const { data: post, isLoading, error } = useQuery<BlogPost>({
    queryKey: ['/api/blog', slug],
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
          <div className="space-y-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="skeleton-text w-full"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gray-50 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardContent className="p-12 text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Post Not Found</h1>
              <p className="text-gray-600 mb-8">
                The blog post you're looking for doesn't exist or has been moved.
              </p>
              <Link href="/blog">
                <Button>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Blog
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'machine learning': return 'bg-blue-100 text-blue-800';
      case 'career': return 'bg-emerald-100 text-emerald-800';
      case 'tutorial': return 'bg-amber-100 text-amber-800';
      case 'opinion': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        });
      } catch (err) {
        // Fallback to copying URL
        navigator.clipboard.writeText(window.location.href);
      }
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/blog">
          <Button variant="ghost" className="mb-8 p-0">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Button>
        </Link>

        <article className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="px-8 py-8 border-b border-gray-200">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <Badge className={getCategoryColor(post.category)}>
                {post.category}
              </Badge>
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="w-4 h-4 mr-1" />
                {formatDate(post.publishedAt)}
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="w-4 h-4 mr-1" />
                {post.readTime}
              </div>
            </div>

            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {post.title}
            </h1>
            
            <p className="text-xl text-gray-600 mb-6">
              {post.excerpt}
            </p>

            {/* Author and Share */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">AC</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{post.author}</p>
                  <p className="text-sm text-gray-500">Machine Learning Engineer</p>
                </div>
              </div>
              
              <Button variant="outline" onClick={handleShare}>
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>

            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="flex items-center gap-2 mt-6">
                <Tag className="w-4 h-4 text-gray-500" />
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="bg-gray-100 text-gray-700">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="px-8 py-8">
            <MarkdownRenderer content={post.content} />
          </div>

          {/* Footer */}
          <div className="px-8 py-6 bg-gray-50 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <p className="text-sm text-gray-600">
                  Enjoyed this post? Subscribe to my newsletter for more ML insights and career tips.
                </p>
              </div>
              <div className="flex gap-3">
                <Link href="/blog">
                  <Button variant="outline">More Posts</Button>
                </Link>
                <a href="/#contact">
                  <Button>Get in Touch</Button>
                </a>
              </div>
            </div>
          </div>
        </article>

        {/* Witty Footer Quote */}
        <div className="mt-12 text-center">
          <div className="bg-white rounded-lg p-6 max-w-2xl mx-auto shadow-sm border-l-4 border-blue-600">
            <p className="text-gray-700 italic">
              "If you made it this far, you either really enjoyed the post or you're procrastinating. 
              Either way, thanks for reading!"
            </p>
            <p className="text-sm text-gray-500 mt-2">- Alex Chen</p>
          </div>
        </div>
      </div>
    </div>
  );
}
