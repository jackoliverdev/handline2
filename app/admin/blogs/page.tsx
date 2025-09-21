"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { getAllBlogs, deleteBlog, toggleBlogPublished, toggleBlogFeatured } from "@/lib/blog-service";
import { FileText, Plus, Edit, Trash, Star, Eye, EyeOff, Calendar, Image as ImageIcon, Tag } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Blog post type definition
interface BlogPost {
  id: string;
  title: string;
  slug: string;
  summary: string;
  author: string;
  tags: string[];
  is_published: boolean;
  is_featured?: boolean;
  image_url?: string | null;
  published_at?: string;
  created_at: string;
  updated_at: string;
}

export default function BlogManagementPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState<BlogPost | null>(null);
  
  // Load blogs on mount
  useEffect(() => {
    async function loadBlogs() {
      try {
        // Then fetch all blogs
        const { data } = await getAllBlogs();
        if (data) {
          setBlogs(data as BlogPost[]);
        }
      } catch (error) {
        console.error("Error loading blogs:", error);
        toast({
          title: "Error",
          description: "Failed to load blog posts. Please try again.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    }
    
    loadBlogs();
  }, []);
  
  // Filter blogs based on search term
  const filteredBlogs = blogs.filter(blog => 
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (blog.tags && blog.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))) ||
    blog.summary.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Handle toggling publish status
  const handleTogglePublished = async (id: string) => {
    try {
      const updatedBlog = await toggleBlogPublished(id);
      
      // Update the blogs list with the new data
      setBlogs(blogs.map(blog => 
        blog.id === id ? { ...blog, is_published: updatedBlog.is_published } : blog
      ));
      
      toast({
        title: "Success",
        description: `Blog post ${updatedBlog.is_published ? 'published' : 'unpublished'}.`,
      });
    } catch (error) {
      console.error("Error toggling publish status:", error);
      toast({
        title: "Error",
        description: "Failed to update publish status. Please try again.",
        variant: "destructive"
      });
    }
  };

  // Handle toggling featured status
  const handleToggleFeatured = async (id: string) => {
    try {
      const updatedBlog = await toggleBlogFeatured(id);
      setBlogs(blogs.map(blog => 
        blog.id === id ? { ...blog, is_featured: updatedBlog.is_featured } : blog
      ));
      toast({
        title: "Success",
        description: `Blog post ${updatedBlog.is_featured ? 'marked as featured' : 'unfeatured'}.`,
      });
    } catch (error) {
      console.error("Error toggling featured status:", error);
      toast({ title: "Error", description: "Failed to update featured status.", variant: "destructive" });
    }
  };
  
  // Handle confirming delete
  const confirmDelete = (blog: BlogPost) => {
    setBlogToDelete(blog);
    setDeleteDialogOpen(true);
  };
  
  // Handle deleting a blog
  const handleDeleteBlog = async () => {
    if (!blogToDelete) return;
    
    try {
      await deleteBlog(blogToDelete.id);
      
      // Remove the deleted blog from the state
      setBlogs(blogs.filter(blog => blog.id !== blogToDelete.id));
      
      toast({
        title: "Success",
        description: "Blog post deleted successfully.",
      });
    } catch (error) {
      console.error("Error deleting blog:", error);
      toast({
        title: "Error",
        description: "Failed to delete blog post. Please try again.",
        variant: "destructive"
      });
    } finally {
      setDeleteDialogOpen(false);
      setBlogToDelete(null);
    }
  };
  
  // Format date for display
  const formatDate = (dateString?: string) => {
    if (!dateString) return "Not published";
    return new Date(dateString).toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  return (
    <div className="space-y-6">
      {/* Header with search and create button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
        <div className="flex-1 min-w-[180px]">
          <Input
            placeholder="Search blogs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-full sm:max-w-sm text-xs sm:text-sm h-8 sm:h-10"
          />
        </div>
        <Button asChild className="w-full sm:w-auto">
          <Link href="/admin/blogs/create">
            <Plus className="mr-2 h-4 w-4" />
            Create New Blog Post
          </Link>
        </Button>
      </div>
      
      {/* Blog posts cards */}
      <Card>
        <CardHeader>
          <CardTitle>Blog Posts</CardTitle>
          <CardDescription>Manage your blog posts and control visibility.</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-10">
              <FileText className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
              <h3 className="mt-4 text-lg font-semibold">No blog posts yet</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Get started by creating your first blog post.
              </p>
              <Button className="mt-4" asChild>
                <Link href="/admin/blogs/create">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Blog Post
                </Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {filteredBlogs.map((blog) => (
                <Card key={blog.id} className="overflow-hidden transition-all hover:shadow-md p-2 sm:p-0">
                  {/* Image Section */}
                  <div className="relative h-[120px] sm:h-[180px] w-full overflow-hidden bg-muted rounded-md">
                    {blog.image_url ? (
                      <Image
                        src={blog.image_url}
                        alt={blog.title}
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-muted">
                        <ImageIcon className="h-10 w-10 sm:h-16 sm:w-16 text-muted-foreground/40" />
                      </div>
                    )}
                    <div className="absolute bottom-2 left-2">
                      {blog.tags && blog.tags.length > 0 && (
                        <Badge variant="secondary" className="bg-brand-primary/80 text-white text-[10px] sm:text-xs">
                          {blog.tags[0]}
                          {blog.tags.length > 1 && ` +${blog.tags.length - 1}`}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="p-2 sm:p-4 border-b">
                    <div className="mb-1 sm:mb-2">
                      <h3 className="font-medium text-xs sm:text-base line-clamp-1">{blog.title}</h3>
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 mb-2 sm:mb-3">
                      {blog.summary}
                    </p>
                    <div className="flex items-center text-[10px] sm:text-xs text-muted-foreground gap-2">
                      <Calendar className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                      <span>{formatDate(blog.published_at || blog.created_at)}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center px-2 sm:px-4 py-2 sm:py-3 bg-muted/20">
                    <div className="flex space-x-1 sm:space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 p-0"
                        asChild
                      >
                        <Link href={`/admin/blogs/${blog.id}`}>
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Link>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 p-0 text-destructive hover:bg-destructive/10"
                        onClick={() => confirmDelete(blog)}
                      >
                        <Trash className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1">
                        <Switch
                          checked={blog.is_published}
                          onCheckedChange={() => handleTogglePublished(blog.id)}
                          className="data-[state=checked]:bg-green-500 h-5 w-9"
                        />
                        <Eye className={`h-4 w-4 ${blog.is_published ? 'text-green-600' : 'text-muted-foreground'}`} />
                      </div>
                      <div className="flex items-center space-x-1">
                        <Switch
                          checked={!!blog.is_featured}
                          onCheckedChange={() => handleToggleFeatured(blog.id)}
                          className="data-[state=checked]:bg-yellow-400 h-5 w-9"
                        />
                        <Star className={`h-4 w-4 ${blog.is_featured ? 'text-yellow-500' : 'text-muted-foreground'}`} />
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Delete confirmation dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure you want to delete this blog post?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the blog post
              &quot;{blogToDelete?.title}&quot; and remove it from our servers.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteBlog}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 