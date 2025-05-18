"use client";

import { useState, useEffect } from "react";
import { getAllHelpArticles } from "@/lib/help-service";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { HelpCircle, Search, FileText, Film } from "lucide-react";
import Link from "next/link";
import { HelpArticle } from "@/lib/help-service";

export default function HelpCenterPage() {
  const [articles, setArticles] = useState<HelpArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  
  useEffect(() => {
    async function loadArticles() {
      try {
        setLoading(true);
        
        // Fetch only published articles for the user-facing help center
        const { data } = await getAllHelpArticles({ published: true });
        
        if (data) {
          setArticles(data as HelpArticle[]);
        }
      } catch (error) {
        console.error("Error loading help articles:", error);
      } finally {
        setLoading(false);
      }
    }
    
    loadArticles();
  }, []);

  // Filter articles based on search term
  const filteredArticles = articles.filter(article => 
    searchTerm ? 
      (article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
       article.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
       article.type.toLowerCase().includes(searchTerm.toLowerCase())) 
      : true
  );

  // Get unique article types
  const articleTypes = Array.from(new Set(articles.map(article => article.type)));

  // Render article card with appropriate icon
  const renderArticleCard = (article: HelpArticle) => {
    const getArticleIcon = () => {
      switch (article.type) {
        case 'guide': 
          return <FileText className="h-5 w-5 text-blue-500" />;
        case 'video': 
          return <Film className="h-5 w-5 text-purple-500" />;
        case 'faq': 
          return <HelpCircle className="h-5 w-5 text-green-500" />;
        default: 
          return <FileText className="h-5 w-5 text-blue-500" />;
      }
    };

    return (
      <Link href={`/dashboard/help/${article.slug}`} key={article.id}>
        <Card className="hover:bg-muted/50 transition-colors h-full">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              {getArticleIcon()}
              {article.has_video && (
                <Badge variant="outline" className="bg-purple-50 text-purple-700 ml-2">
                  <Film className="h-3 w-3 mr-1" />
                  Video
                </Badge>
              )}
            </div>
            <CardTitle className="text-lg">{article.title}</CardTitle>
            <CardDescription className="line-clamp-2">
              {article.summary}
            </CardDescription>
          </CardHeader>
          <CardFooter className="pt-2 text-xs text-muted-foreground">
            <Badge variant="outline" className="capitalize">
              {article.category?.replace(/-/g, ' ')}
            </Badge>
          </CardFooter>
        </Card>
      </Link>
    );
  };

  return (
    <div className="container py-6">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold mb-2">Help Center</h1>
        <p className="text-muted-foreground">
          Find answers to common questions and learn how to get the most out of our platform.
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-xl mx-auto w-full mb-8">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search for help articles..."
          className="pl-10"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <Tabs defaultValue="all">
          <TabsList className="mb-6 flex flex-wrap justify-center w-full max-w-md mx-auto">
            <TabsTrigger value="all" className="flex-1">
              All
            </TabsTrigger>
            {articleTypes.includes('guide') && (
              <TabsTrigger value="guide" className="flex-1">
                Guides
              </TabsTrigger>
            )}
            {articleTypes.includes('video') && (
              <TabsTrigger value="video" className="flex-1">
                Videos
              </TabsTrigger>
            )}
            {articleTypes.includes('faq') && (
              <TabsTrigger value="faq" className="flex-1">
                FAQs
              </TabsTrigger>
            )}
          </TabsList>

          {/* All articles tab */}
          <TabsContent value="all">
            {filteredArticles.length > 0 ? (
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {filteredArticles.map(article => renderArticleCard(article))}
              </div>
            ) : (
              <div className="text-center py-12">
                <HelpCircle className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                <h3 className="mt-4 text-lg font-semibold">No articles found</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Try adjusting your search criteria.
                </p>
              </div>
            )}
          </TabsContent>

          {/* Type-specific tabs */}
          <TabsContent value="guide">
            {filteredArticles.filter(article => article.type === 'guide').length > 0 ? (
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {filteredArticles
                  .filter(article => article.type === 'guide')
                  .map(article => renderArticleCard(article))}
              </div>
            ) : (
              <div className="text-center py-12">
                <HelpCircle className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                <h3 className="mt-4 text-lg font-semibold">No guides found</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Try adjusting your search criteria.
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="video">
            {filteredArticles.filter(article => article.type === 'video').length > 0 ? (
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {filteredArticles
                  .filter(article => article.type === 'video')
                  .map(article => renderArticleCard(article))}
              </div>
            ) : (
              <div className="text-center py-12">
                <HelpCircle className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                <h3 className="mt-4 text-lg font-semibold">No videos found</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Try adjusting your search criteria.
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="faq">
            {filteredArticles.filter(article => article.type === 'faq').length > 0 ? (
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {filteredArticles
                  .filter(article => article.type === 'faq')
                  .map(article => renderArticleCard(article))}
              </div>
            ) : (
              <div className="text-center py-12">
                <HelpCircle className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                <h3 className="mt-4 text-lg font-semibold">No FAQs found</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Try adjusting your search criteria.
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
} 