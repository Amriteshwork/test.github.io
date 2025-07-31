import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, MessageCircle, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import type { BlogPost } from "@shared/schema";

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'machine learning': return 'bg-blue-100 text-blue-800';
      case 'career': return 'bg-emerald-100 text-emerald-800';
      case 'tutorial': return 'bg-amber-100 text-amber-800';
      case 'opinion': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="blog-card bg-white rounded-xl shadow-lg hover:shadow-xl cursor-pointer overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <Badge className={getCategoryColor(post.category)}>
            {post.category}
          </Badge>
          <time className="text-sm text-gray-500">
            {formatDate(post.publishedAt)}
          </time>
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
          {post.title}
        </h3>
        
        <p className="text-gray-600 mb-4 line-clamp-3">
          {post.excerpt}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">AC</span>
            </div>
            <span className="text-sm text-gray-600">{post.author}</span>
          </div>
          <Link href={`/blog/${post.slug}`}>
            <Button variant="ghost" className="text-blue-600 hover:text-blue-800 p-0 h-auto font-medium">
              Read More <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </div>
        
        <div className="flex items-center mt-4 text-sm text-gray-500">
          <Clock className="w-4 h-4 mr-1" />
          <span>{post.readTime}</span>
          <span className="mx-2">•</span>
          <MessageCircle className="w-4 h-4 mr-1" />
          <span>Comments</span>
        </div>
      </CardContent>
    </Card>
  );
}
