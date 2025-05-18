"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { getHelpArticleBySlug } from "@/lib/help-service";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Film, FileText, HelpCircle, Calendar } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import "../markdown.css"; // Import the markdown CSS
import { parseMarkdown } from "@/lib/markdown-utils";

export default function HelpArticleDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const slug = params?.slug ? (typeof params.slug === 'string' ? params.slug : params.slug[0]) : "";

  useEffect(() => {
    async function loadArticle() {
      if (!slug) return;
      
      try {
        setLoading(true);
        const articleData = await getHelpArticleBySlug(slug);
        
        if (articleData) {
          // Only show published articles to users
          if (!articleData.published) {
            router.push("/dashboard/help");
            return;
          }
          setArticle(articleData);
        } else {
          setError("Article not found");
          setTimeout(() => {
            router.push("/dashboard/help");
          }, 3000);
        }
      } catch (err) {
        console.error("Error loading article:", err);
        setError("Failed to load article");
      } finally {
        setLoading(false);
      }
    }
    
    loadArticle();
  }, [slug, router]);

  // Get article type icon
  const getArticleIcon = () => {
    if (!article) return null;
    
    switch (article.type) {
      case 'guide': 
        return <FileText className="h-6 w-6 text-blue-500" />;
      case 'video': 
        return <Film className="h-6 w-6 text-purple-500" />;
      case 'faq': 
        return <HelpCircle className="h-6 w-6 text-green-500" />;
      default: 
        return <FileText className="h-6 w-6 text-blue-500" />;
    }
  };
  
  // Format date for display
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMMM d, yyyy');
  };
  
  // Function to render markdown content
  const renderContent = (content: string) => {
    return { __html: parseMarkdown(content) };
  };

  if (loading) {
    return (
      <div className="container max-w-4xl py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container max-w-4xl py-8">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-12">
              <h3 className="text-lg font-semibold text-red-500">{error}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Redirecting to Help Center...
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container max-w-4xl py-8">
      <div className="mb-6">
        <Button variant="ghost" asChild className="pl-0">
          <Link href="/dashboard/help">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Help Center
          </Link>
        </Button>
      </div>

      {article && (
        <article className="space-y-8">
          <div className="flex items-start space-x-4">
            <div className="bg-muted rounded-lg p-3">
              {getArticleIcon()}
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-3">{article.title}</h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <Badge variant="outline" className="capitalize">
                  {article.category?.replace(/-/g, ' ')}
                </Badge>
                {article.has_video && (
                  <Badge variant="outline" className="bg-purple-50 text-purple-700">
                    <Film className="h-3 w-3 mr-1" />
                    Video
                  </Badge>
                )}
                {article.created_at && (
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    {formatDate(article.created_at)}
                  </div>
                )}
              </div>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardDescription>{article.summary}</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Render article content with markdown styling */}
              <div className="prose prose-blue max-w-none markdown-content">
                <div dangerouslySetInnerHTML={renderContent(article.content)} />
              </div>
              
              {/* Display video embed if available */}
              {article.has_video && article.video_url && (
                <div className="mt-8">
                  <h3 className="text-xl font-semibold mb-4">Video Tutorial</h3>
                  <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-lg">
                    <iframe 
                      className="absolute top-0 left-0 w-full h-full"
                      src={article.video_url}
                      title={article.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              )}
              
              {/* Tags */}
              {article.tags && article.tags.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-2">Related Topics</h3>
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag: string) => (
                      <Badge key={tag} variant="secondary" className="capitalize">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </article>
      )}
    </div>
  );
} 