"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/use-toast";
import { Briefcase, Plus, Edit, Trash, MapPin, Building, Calendar, Eye } from "lucide-react";
import { getAllCareerPosts, toggleCareerFeatured, toggleCareerPublished, deleteCareer } from "@/lib/career-service";
import type { CareerPost } from "@/lib/career-service";

export default function CareersManagementPage() {
  const [careers, setCareers] = useState<CareerPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [careerToDelete, setCareerToDelete] = useState<CareerPost | null>(null);

  // Load careers on mount
  useEffect(() => {
    async function load() {
      try {
        const data = await getAllCareerPosts({});
        setCareers(data as CareerPost[]);
      } catch (error) {
        console.error("Error loading careers:", error);
        toast({ title: "Error", description: "Failed to load careers.", variant: "destructive" });
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // Filter careers
  const filtered = careers.filter((c) => {
    const hay = `${c.title} ${c.department} ${c.location}`.toLowerCase();
    return hay.includes(searchTerm.toLowerCase());
  });

  const handleTogglePublished = async (id: string) => {
    try {
      const updated = await toggleCareerPublished(id);
      setCareers((prev) => prev.map((c) => (c.id === id ? { ...c, is_published: updated.is_published, published_at: updated.published_at } : c)));
      toast({ title: "Success", description: `Role ${updated.is_published ? "published" : "unpublished"}.` });
    } catch (error) {
      console.error("Error toggling publish:", error);
      toast({ title: "Error", description: "Could not update publish status.", variant: "destructive" });
    }
  };

  const handleToggleFeatured = async (id: string) => {
    try {
      const updated = await toggleCareerFeatured(id);
      setCareers((prev) => prev.map((c) => (c.id === id ? { ...c, is_featured: updated.is_featured } : c)));
      toast({ title: "Success", description: `Role ${updated.is_featured ? "marked as featured" : "removed from featured"}.` });
    } catch (error) {
      console.error("Error toggling featured:", error);
      toast({ title: "Error", description: "Could not update featured status.", variant: "destructive" });
    }
  };

  const confirmDelete = (career: CareerPost) => {
    setCareerToDelete(career);
    setDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!careerToDelete?.id) return;
    try {
      await deleteCareer(careerToDelete.id);
      setCareers((prev) => prev.filter((c) => c.id !== careerToDelete.id));
      toast({ title: "Success", description: "Role deleted." });
    } catch (error) {
      console.error("Error deleting career:", error);
      toast({ title: "Error", description: "Failed to delete role.", variant: "destructive" });
    } finally {
      setDeleteDialogOpen(false);
      setCareerToDelete(null);
    }
  };

  const formatDate = (date?: string | null) => {
    if (!date) return "Not published";
    return new Date(date).toLocaleDateString("en-GB", { year: "numeric", month: "short", day: "numeric" });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
        <div className="flex-1 min-w-[180px]">
          <Input
            placeholder="Search roles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-full sm:max-w-sm text-xs sm:text-sm h-8 sm:h-10"
          />
        </div>
        <Button asChild className="w-full sm:w-auto">
          <Link href="/admin/careers/create">
            <Plus className="mr-2 h-4 w-4" />
            Create New Role
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Careers</CardTitle>
          <CardDescription>Manage open roles and control visibility.</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-10">
              <Briefcase className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
              <h3 className="mt-4 text-lg font-semibold">No roles yet</h3>
              <p className="mt-2 text-sm text-muted-foreground">Create your first job posting.</p>
              <Button className="mt-4" asChild>
                <Link href="/admin/careers/create">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Role
                </Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((c) => (
                <Card key={c.id} className="overflow-hidden transition-all hover:shadow-md">
                  <div className="p-3 border-b space-y-1">
                    <h3 className="font-medium text-sm sm:text-base line-clamp-1">{c.title}</h3>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Building className="h-3.5 w-3.5" />
                      <span>{c.department}</span>
                      <MapPin className="h-3.5 w-3.5 ml-2" />
                      <span>{c.location}</span>
                    </div>
                    <div className="flex items-center text-[10px] sm:text-xs text-muted-foreground gap-2">
                      <Calendar className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                      <span>{formatDate(c.published_at || c.created_at || undefined)}</span>
                    </div>
                  </div>
                  <div className="flex items-center px-3 py-2 bg-muted/20 gap-2">
                    <div className="flex items-center gap-1 sm:gap-2">
                      <Button variant="ghost" size="icon" className="h-7 w-7 p-0" asChild>
                        <Link href={`/admin/careers/${c.id}`}>
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Link>
                      </Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7 p-0 text-destructive hover:bg-destructive/10" onClick={() => confirmDelete(c)}>
                        <Trash className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                      <div className="flex items-center gap-2 pl-2">
                        <span className="text-xs">Published</span>
                        <Switch checked={!!c.is_published} onCheckedChange={() => handleTogglePublished(c.id as string)} className="h-5 w-9 data-[state=checked]:bg-green-500" />
                        <Eye className={`h-4 w-4 ${c.is_published ? 'text-green-600' : 'text-muted-foreground'}`} />
                      </div>
                      <div className="flex items-center gap-2 pl-2">
                        <span className="text-xs">Featured</span>
                        <Switch checked={!!c.is_featured} onCheckedChange={() => handleToggleFeatured(c.id as string)} className="h-5 w-9" />
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete this role?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete "{careerToDelete?.title}".
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}


