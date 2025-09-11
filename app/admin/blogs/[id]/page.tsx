"use client";

import { useState, useEffect, useRef } from "react";
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
import { getBlogById, updateBlog, deleteBlog, uploadBlogCoverImage } from "@/lib/blog-service";
import { ArrowLeft, Save, Trash, Upload, X, Tag as TagIcon } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MiniProductCard } from "@/components/app/mini-product-card";
import type { Product } from "@/lib/products-service";
import Link from "next/link";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { LanguageSwitcher } from "@/components/ui/language-switcher";

interface BlogEditPageProps {
  params: {
    id: string;
  };
}

export default function BlogEditPage({ params }: BlogEditPageProps) {
  const router = useRouter();
  const { id } = params;
  
  const [currentLanguage, setCurrentLanguage] = useState<'en' | 'it'>('en');
  const [titleLocales, setTitleLocales] = useState<{en: string, it: string}>({ en: "", it: "" });
  const [slug, setSlug] = useState("");
  const [summaryLocales, setSummaryLocales] = useState<{en: string, it: string}>({ en: "", it: "" });
  const [contentLocales, setContentLocales] = useState<{en: string, it: string}>({ en: "", it: "" });
  const [currentTag, setCurrentTag] = useState("");
  const [tagsLocales, setTagsLocales] = useState<{en: string[], it: string[]}>({ en: [], it: [] });
  const [isPublished, setIsPublished] = useState(false);
  const [author, setAuthor] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [previewTab, setPreviewTab] = useState("edit");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  // Related products state
  const [relatedProductId1, setRelatedProductId1] = useState<string | null>(null);
  const [relatedProductId2, setRelatedProductId2] = useState<string | null>(null);
  const [relatedProductId3, setRelatedProductId3] = useState<string | null>(null);
  const [relatedProductId4, setRelatedProductId4] = useState<string | null>(null);
  const [availableProducts, setAvailableProducts] = useState<Product[]>([]);
  
  // Load blog post data
  useEffect(() => {
    async function loadBlog() {
      try {
        const blog = await getBlogById(id);
        if (blog) {
          setTitleLocales({ en: blog.title_locales?.en || blog.title || '', it: blog.title_locales?.it || '' });
          setSlug(blog.slug);
          setSummaryLocales({ en: blog.summary_locales?.en || blog.summary || '', it: blog.summary_locales?.it || '' });
          setContentLocales({ en: blog.content_locales?.en || blog.content || '', it: blog.content_locales?.it || '' });
          setTagsLocales({ en: blog.tags_locales?.en || blog.tags || [], it: blog.tags_locales?.it || [] });
          setIsPublished(blog.is_published || false);
          setAuthor(blog.author || "Hand Line Team");
          setImageUrl(blog.image_url);
          setRelatedProductId1(blog.related_product_id_1 || null);
          setRelatedProductId2(blog.related_product_id_2 || null);
          setRelatedProductId3(blog.related_product_id_3 || null);
          setRelatedProductId4(blog.related_product_id_4 || null);
        } else {
          toast({
            title: "Error",
            description: "Blog post not found",
            variant: "destructive"
          });
          router.push("/admin/blogs");
        }
      } catch (error) {
        console.error("Error loading blog post:", error);
        toast({
          title: "Error",
          description: "Failed to load blog post. Please try again.",
          variant: "destructive"
        });
        router.push("/admin/blogs");
      } finally {
        setIsLoading(false);
      }
    }
    
    loadBlog();
  }, [id, router]);
  
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
    setTitleLocales(prev => ({ ...prev, [currentLanguage]: value }));
    if (!slug && currentLanguage === 'en') setSlug(generateSlug(value));
  };
  
  const addTag = () => {
    const trimmed = currentTag.trim();
    if (trimmed !== '' && !tagsLocales[currentLanguage].includes(trimmed)) {
      setTagsLocales(prev => ({ ...prev, [currentLanguage]: [...prev[currentLanguage], trimmed] }));
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTagsLocales(prev => ({ ...prev, [currentLanguage]: prev[currentLanguage].filter(t => t !== tagToRemove) }));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && currentTag.trim() !== '') {
      e.preventDefault();
      addTag();
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!titleLocales.en || !summaryLocales.en || !contentLocales.en) {
      toast({
        title: "Validation Error",
        description: "Please complete Title, Summary and Content in English.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setIsSaving(true);
      
      const blogData = {
        title: titleLocales.en,
        slug: slug || generateSlug(titleLocales.en),
        summary: summaryLocales.en,
        content: contentLocales.en,
        tags: tagsLocales.en,
        title_locales: (titleLocales.en || titleLocales.it) ? titleLocales : undefined,
        summary_locales: (summaryLocales.en || summaryLocales.it) ? summaryLocales : undefined,
        content_locales: (contentLocales.en || contentLocales.it) ? contentLocales : undefined,
        tags_locales: (tagsLocales.en.length > 0 || tagsLocales.it.length > 0) ? tagsLocales : undefined,
        is_published: isPublished,
        author,
        image_url: imageUrl
      };
      
      const updatedBlog = await updateBlog(id, blogData);
      
      toast({
        title: "Success",
        description: "Blog post updated successfully!"
      });
    } catch (error) {
      console.error("Error updating blog post:", error);
      toast({
        title: "Error",
        description: "Failed to update blog post. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };
  
  const handleDelete = async () => {
    try {
      await deleteBlog(id);
      
      toast({
        title: "Success",
        description: "Blog post deleted successfully."
      });
      
      router.push("/admin/blogs");
    } catch (error) {
      console.error("Error deleting blog post:", error);
      toast({
        title: "Error",
        description: "Failed to delete blog post. Please try again.",
        variant: "destructive"
      });
    } finally {
      setDeleteDialogOpen(false);
    }
  };
  
  // Suggested tags for easy selection
  const suggestedTags = [
    "heat resistant", "cut resistance", "safety standards", 
    "industrial safety", "PPE", "thermal protection", 
    "manufacturing", "innovation", "regulations",
    "compliance", "industry 4.0"
  ];
  
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !id) return;
    
    try {
      setIsUploading(true);
      
      const { url } = await uploadBlogCoverImage(id, file);
      
      if (url) {
        setImageUrl(url);
        
        // Update the blog post with the new image URL
        await updateBlog(id, { image_url: url });
        
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

  // Fetch products for related selection
  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await fetch('/api/products');
        if (!response.ok) throw new Error(`Error fetching products: ${response.status}`);
        const data = await response.json();
        setAvailableProducts(data);
      } catch (error) {
        console.error("Error loading products:", error);
        toast({ title: "Warning", description: "Failed to load products for selection", variant: "destructive" });
      }
    }
    loadProducts();
  }, []);

  const getRelatedProductIds = () => [relatedProductId1, relatedProductId2, relatedProductId3, relatedProductId4].filter(Boolean) as string[];
  const addRelatedProduct = async (productId: string) => {
    // Build an ordered list of IDs and place the new one in the first empty slot
    const ids = [relatedProductId1, relatedProductId2, relatedProductId3, relatedProductId4];
    const firstEmpty = ids.findIndex((v) => !v);
    if (firstEmpty === -1) {
      toast({ title: "Error", description: "You can only add up to 4 related products", variant: "destructive" });
      return;
    }
    const newIds = [...ids];
    newIds[firstEmpty] = productId;
    setRelatedProductId1(newIds[0] || null);
    setRelatedProductId2(newIds[1] || null);
    setRelatedProductId3(newIds[2] || null);
    setRelatedProductId4(newIds[3] || null);
    await updateBlog(id, {
      related_product_id_1: newIds[0] || null,
      related_product_id_2: newIds[1] || null,
      related_product_id_3: newIds[2] || null,
      related_product_id_4: newIds[3] || null,
    });
  };
  const removeRelatedProduct = async (productId: string) => {
    const ids = getRelatedProductIds().filter(pid => pid !== productId);
    setRelatedProductId1(ids[0] || null);
    setRelatedProductId2(ids[1] || null);
    setRelatedProductId3(ids[2] || null);
    setRelatedProductId4(ids[3] || null);
    await updateBlog(id, {
      related_product_id_1: ids[0] || null,
      related_product_id_2: ids[1] || null,
      related_product_id_3: ids[2] || null,
      related_product_id_4: ids[3] || null,
    });
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-2">
        <Button variant="ghost" asChild className="w-full sm:w-auto">
          <Link href="/admin/blogs">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blogs
          </Link>
        </Button>
        <div className="flex items-center justify-between gap-3 w-full sm:w-auto">
          <h1 className="text-2xl font-bold tracking-tight">Edit Blog Post</h1>
          <Button variant="destructive" onClick={() => setDeleteDialogOpen(true)} className="w-auto">
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </Button>
          <LanguageSwitcher currentLanguage={currentLanguage} onLanguageChange={setCurrentLanguage} />
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4 sm:gap-6 md:grid-cols-6">
          {/* Main content area - 4 columns */}
          <div className="md:col-span-4 space-y-4 sm:space-y-6">
            <Tabs defaultValue="content" className="w-full">
              <TabsList>
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="related">Related Products</TabsTrigger>
              </TabsList>
              <TabsContent value="content">
              <Card>
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">Blog Content</CardTitle>
                <CardDescription className="text-xs sm:text-sm">Edit your blog post content here.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 sm:space-y-4">
                  <div className="space-y-1 sm:space-y-2">
                    <Label htmlFor="title" className="text-xs sm:text-sm">Title</Label>
                    <Input
                      id="title"
                      placeholder="Enter blog post title"
                      value={titleLocales[currentLanguage]}
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
                    <Label htmlFor="author" className="text-xs sm:text-sm">Author</Label>
                    <Input
                      id="author"
                      placeholder="Author name"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      className="text-xs sm:text-sm h-8 sm:h-10"
                    />
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <Label htmlFor="summary" className="text-xs sm:text-sm">Summary</Label>
                    <Textarea
                      id="summary"
                      placeholder="Enter a short summary of your blog post"
                      value={summaryLocales[currentLanguage]}
                      onChange={(e) => setSummaryLocales({ ...summaryLocales, [currentLanguage]: e.target.value })}
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
                          value={contentLocales[currentLanguage]}
                          onChange={(e) => setContentLocales({ ...contentLocales, [currentLanguage]: e.target.value })}
                          rows={10}
                          required
                          className="font-mono text-xs sm:text-sm"
                        />
                      </TabsContent>
                      <TabsContent value="preview" className="p-4 border rounded-md min-h-[200px] sm:min-h-[300px] markdown-preview text-xs sm:text-sm prose prose-sm max-w-none">
                        {contentLocales[currentLanguage] ? (
                          <ReactMarkdown 
                            remarkPlugins={[remarkGfm]}
                            components={{
                              a: ({ node, ...props }) => <a className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer" {...props} />,
                              img: ({ node, ...props }) => <img className="max-w-full h-auto rounded-md" alt={props.alt || ''} {...props} />,
                              h1: ({ node, ...props }) => <h1 className="text-2xl font-bold mb-4 mt-6" {...props} />,
                              h2: ({ node, ...props }) => <h2 className="text-xl font-bold mb-3 mt-5" {...props} />,
                              h3: ({ node, ...props }) => <h3 className="text-lg font-bold mb-2 mt-4" {...props} />,
                              p: ({ node, ...props }) => <p className="mb-4 leading-relaxed" {...props} />,
                              ul: ({ node, ...props }) => <ul className="list-disc pl-6 mb-4 space-y-1" {...props} />,
                              ol: ({ node, ...props }) => <ol className="list-decimal pl-6 mb-4 space-y-1" {...props} />,
                              blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-4" {...props} />,
                              code: ({ node, ...props }) => 
                                <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono" {...props} />
                            }}
                          >
                            {contentLocales[currentLanguage]}
                          </ReactMarkdown>
                        ) : (
                          <p className="text-muted-foreground">Nothing to preview yet...</p>
                        )}
                      </TabsContent>
                    </Tabs>
                  </div>
                </div>
              </CardContent>
            </Card>
              </TabsContent>
              <TabsContent value="related" className="mt-4 space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Related Products</CardTitle>
                    <CardDescription>Link this blog post to up to 4 products.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <Label>Currently Selected Related Products</Label>
                        <div className="grid gap-2">
                          {getRelatedProductIds().length > 0 ? (
                            getRelatedProductIds().map(productId => {
                              const product = availableProducts.find(p => p.id === productId);
                              return product ? (
                                <MiniProductCard key={productId} product={product} onRemove={removeRelatedProduct} />
                              ) : null;
                            })
                          ) : (
                            <p className="text-sm text-muted-foreground">No related products selected. Add some below.</p>
                          )}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="product-select">Add a related product:</Label>
                        <Select onValueChange={(value) => addRelatedProduct(value)}>
                          <SelectTrigger id="product-select" className="w-full">
                            <SelectValue placeholder="Select a product" />
                          </SelectTrigger>
                          <SelectContent>
                            {availableProducts
                              .filter(product => !getRelatedProductIds().includes(product.id))
                              .map((product) => (
                                <SelectItem key={product.id} value={product.id}>{product.name}</SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
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
                      {tagsLocales[currentLanguage].map((tag) => (
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
                              if (!tagsLocales[currentLanguage].includes(tag)) {
                                setTagsLocales(prev => ({ ...prev, [currentLanguage]: [...prev[currentLanguage], tag] }));
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
                <Button type="submit" disabled={isSaving} className="w-full sm:w-auto">
                  {isSaving ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </form>
      
      {/* Delete confirmation dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure you want to delete this blog post?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the blog post
              &quot;{titleLocales.en}&quot; and remove it from our servers.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 