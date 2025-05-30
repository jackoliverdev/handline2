"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";
import { createBlog, uploadBlogCoverImage } from "@/lib/blog-service";
import { ArrowLeft, Upload, X, Tag as TagIcon } from "lucide-react";
import Link from "next/link";

export default function CreateBlogPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [currentTag, setCurrentTag] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [isPublished, setIsPublished] = useState(false);
  const [previewTab, setPreviewTab] = useState("edit");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .replace(/\s+/g, '-')
      .replace(/--+/g, '-')
      .trim();
  };
  
  const handleTitleChange = (value: string) => {
    setTitle(value);
    setSlug(generateSlug(value));
  };

  const addTag = () => {
    if (currentTag.trim() !== '' && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()]);
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && currentTag.trim() !== '') {
      e.preventDefault();
      addTag();
    }
  };
  
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    try {
      setIsUploading(true);
      
      // Generate a temporary ID for the blog post
      const tempId = `temp-${Date.now()}`;
      
      const { url } = await uploadBlogCoverImage(tempId, file);
      
      if (url) {
        setImageUrl(url);
        toast({
          title: "Success",
          description: "Cover image uploaded successfully!"
        });
      } else {
        throw new Error("Failed to upload image");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      toast({
        title: "Error",
        description: "Failed to upload cover image. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };
  
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !summary || !content) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      const blogData = {
        title,
        slug: slug || generateSlug(title),
        summary,
        content,
        tags,
        is_published: isPublished,
        author: "HandLine Team", // Default author, can be updated later
        image_url: imageUrl
      };
      
      const newBlog = await createBlog(blogData);
      
      toast({
        title: "Success",
        description: "Blog post created successfully!"
      });
      
      // Redirect to the blog list page
      router.push("/admin/blogs");
    } catch (error) {
      console.error("Error creating blog post:", error);
      toast({
        title: "Error",
        description: "Failed to create blog post. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Render markdown preview
  const renderMarkdown = (content: string) => {
    return { __html: content };
  };
  
  const suggestedTags = [
    "heat resistant", "cut resistance", "safety standards", 
    "industrial safety", "PPE", "thermal protection", 
    "manufacturing", "innovation", "regulations",
    "compliance", "industry 4.0"
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-2">
        <Button variant="ghost" asChild className="w-full sm:w-auto">
          <Link href="/admin/blogs">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blogs
          </Link>
        </Button>
        <h1 className="text-2xl font-bold tracking-tight">Create New Blog Post</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4 sm:gap-6 md:grid-cols-6">
          {/* Main content area - 4 columns */}
          <div className="md:col-span-4 space-y-4 sm:space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">Blog Content</CardTitle>
                <CardDescription className="text-xs sm:text-sm">Write your blog post content here.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 sm:space-y-4">
                  <div className="space-y-1 sm:space-y-2">
                    <Label htmlFor="title" className="text-xs sm:text-sm">Title</Label>
                    <Input
                      id="title"
                      placeholder="Enter blog post title"
                      value={title}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      required
                      className="text-xs sm:text-sm h-8 sm:h-10"
                    />
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <Label htmlFor="slug" className="text-xs sm:text-sm">Slug</Label>
                    <Input
                      id="slug"
                      placeholder="Enter URL slug"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      className="text-xs sm:text-sm h-8 sm:h-10"
                    />
                    <p className="text-xs text-muted-foreground">
                      The URL-friendly version of the title. Leave blank to generate automatically.
                    </p>
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <Label htmlFor="summary" className="text-xs sm:text-sm">Summary</Label>
                    <Textarea
                      id="summary"
                      placeholder="Enter a short summary of your blog post"
                      value={summary}
                      onChange={(e) => setSummary(e.target.value)}
                      rows={3}
                      required
                      className="text-xs sm:text-sm"
                    />
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <Label htmlFor="content" className="text-xs sm:text-sm">Content (Markdown)</Label>
                    <Tabs
                      defaultValue="edit"
                      value={previewTab}
                      onValueChange={setPreviewTab}
                      className="w-full"
                    >
                      <TabsList className="flex overflow-x-auto whitespace-nowrap flex-nowrap scrollbar-hide px-1 sm:px-0">
                        <TabsTrigger value="edit">Edit</TabsTrigger>
                        <TabsTrigger value="preview">Preview</TabsTrigger>
                      </TabsList>
                      <TabsContent value="edit" className="p-0 border-0">
                        <Textarea
                          id="content"
                          placeholder="Write your content in Markdown format"
                          value={content}
                          onChange={(e) => setContent(e.target.value)}
                          rows={10}
                          required
                          className="font-mono text-xs sm:text-sm"
                        />
                      </TabsContent>
                      <TabsContent value="preview" className="p-4 border rounded-md min-h-[200px] sm:min-h-[300px] markdown-preview text-xs sm:text-sm">
                        {content ? (
                          <div dangerouslySetInnerHTML={renderMarkdown(content)} />
                        ) : (
                          <p className="text-muted-foreground">Nothing to preview yet...</p>
                        )}
                      </TabsContent>
                    </Tabs>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          {/* Sidebar - 2 columns */}
          <div className="md:col-span-2 space-y-4 sm:space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">Publication Settings</CardTitle>
                <CardDescription className="text-xs sm:text-sm">Configure how your blog post appears.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 sm:space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="tags" className="text-xs sm:text-sm">Tags</Label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="flex items-center gap-1 px-3 py-1 text-xs sm:text-sm">
                          {tag}
                          <button 
                            type="button" 
                            onClick={() => removeTag(tag)}
                            className="ml-1 rounded-full hover:bg-accent/80 p-0.5"
                          >
                            <X className="h-3 w-3" />
                            <span className="sr-only">Remove</span>
                          </button>
                        </Badge>
                      ))}
                    </div>
                    <div className="flex space-x-2">
                      <Input
                        id="tag-input"
                        placeholder="Add a tag"
                        value={currentTag}
                        onChange={(e) => setCurrentTag(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="flex-grow text-xs sm:text-sm h-8 sm:h-10"
                      />
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={addTag}
                        disabled={!currentTag.trim()}
                        className="text-xs sm:text-sm h-8 sm:h-10"
                      >
                        Add
                      </Button>
                    </div>
                    <div className="mt-2">
                      <p className="text-xs text-muted-foreground mb-1">Suggested tags:</p>
                      <div className="flex flex-wrap gap-1">
                        {suggestedTags.map((tag) => (
                          <Badge 
                            key={tag} 
                            variant="outline" 
                            className="cursor-pointer hover:bg-accent text-xs sm:text-sm"
                            onClick={() => {
                              if (!tags.includes(tag)) {
                                setTags([...tags, tag]);
                              }
                            }}
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="published" className="text-xs sm:text-sm">Published</Label>
                      <p className="text-xs text-muted-foreground">
                        Make this blog post visible to the public.
                      </p>
                    </div>
                    <Switch
                      id="published"
                      checked={isPublished}
                      onCheckedChange={setIsPublished}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="image-url" className="text-xs sm:text-sm">Cover Image URL</Label>
                    <Input
                      id="image-url"
                      placeholder="Enter image URL"
                      value={imageUrl || ''}
                      onChange={(e) => setImageUrl(e.target.value || null)}
                      className="text-xs sm:text-sm h-8 sm:h-10"
                    />
                    {imageUrl && (
                      <div className="mt-2 relative rounded-md overflow-hidden h-32 sm:h-40">
                        <img
                          src={imageUrl}
                          alt="Cover preview"
                          className="object-cover w-full h-full"
                        />
                      </div>
                    )}
                    <p className="text-xs text-muted-foreground">
                      Enter a URL to use for the blog cover image or upload a new image below.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cover" className="text-xs sm:text-sm">Upload Cover Image</Label>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <div 
                      className="border-2 border-dashed rounded-md p-4 text-center cursor-pointer hover:bg-muted/50 transition-colors"
                      onClick={triggerFileInput}
                    >
                      {isUploading ? (
                        <div className="flex flex-col items-center">
                          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-brand-primary"></div>
                          <p className="mt-2 text-xs sm:text-sm text-muted-foreground">Uploading...</p>
                        </div>
                      ) : (
                        <>
                          <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                          <p className="mt-2 text-xs sm:text-sm text-muted-foreground">
                            Click to upload a cover image
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col sm:flex-row sm:justify-between gap-2 sm:gap-0">
                <Button variant="outline" type="button" asChild className="w-full sm:w-auto">
                  <Link href="/admin/blogs">Cancel</Link>
                </Button>
                <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
                  {isSubmitting ? "Creating..." : "Create Blog Post"}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
} 