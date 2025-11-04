"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { Plus, Edit, Trash, Eye, Calendar, Shield } from "lucide-react";
import { useLanguage } from "@/lib/context/language-context";
import { getService } from "@/lib/ppe-standards/service";
import type { PPECategory } from "@/lib/ppe-standards/types";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";

export default function PPEHubManagementPage() {
  const { language } = useLanguage();
  const [categories, setCategories] = useState<PPECategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [targetCategory, setTargetCategory] = useState<PPECategory | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const svc = getService();
        const data = await svc.getCategories(language);
        setCategories(data);
      } catch (err) {
        console.error("Failed to load PPE categories", err);
        toast({ title: "Error", description: "Failed to load PPE Hub categories.", variant: "destructive" });
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [language]);

  const filtered = categories.filter((c) => {
    const name = (c as any).titleLocales?.[language] || c.title || "";
    const summary = (c as any).summaryLocales?.[language] || c.summary || "";
    return name.toLowerCase().includes(searchTerm.toLowerCase()) || summary.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const formatDate = (date?: string) => {
    if (!date) return "Not available";
    return new Date(date).toLocaleDateString("en-GB", { year: "numeric", month: "short", day: "numeric" });
  };

  async function handleDelete() {
    if (!targetCategory) return;
    try {
      setDeleting(true);
      const { error } = await supabase
        .from('ppe_categories')
        .delete()
        .eq('id', targetCategory.id);
      if (error) throw error;

      setCategories((prev) => prev.filter((c) => c.id !== targetCategory.id));
      toast({ title: 'Deleted', description: 'Category removed successfully.' });
      setConfirmOpen(false);
      setTargetCategory(null);
    } catch (err) {
      console.error('Failed to delete category', err);
      toast({ title: 'Error', description: 'Failed to delete category.', variant: 'destructive' });
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Header with search and create button */}
      <div className="flex flex-wrap items-center justify-between gap-4 sm:flex-nowrap sm:gap-4 sm:mb-0 flex-col sm:flex-row">
        <div className="flex-1 min-w-[240px] w-full sm:w-auto mb-2 sm:mb-0">
          <Input
            placeholder="Search PPE Hub categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-full sm:max-w-sm text-xs sm:text-sm h-8 sm:h-10"
          />
        </div>
        <Button asChild className="w-full sm:w-auto">
          <Link href="/admin/ppe-hub/create">
            <Plus className="mr-2 h-4 w-4" />
            Create New Category
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>PPE Hub Categories</CardTitle>
          <CardDescription>Manage categories for the PPE Standards Hub.</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-10">
              <Shield className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
              <h3 className="mt-4 text-lg font-semibold">No categories yet</h3>
              <p className="mt-2 text-sm text-muted-foreground">Get started by creating your first PPE Hub category.</p>
              <Button className="mt-4" asChild>
                <Link href="/admin/ppe-hub/create">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Category
                </Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((c) => {
                const title = (c as any).titleLocales?.[language] || c.title;
                const summary = (c as any).summaryLocales?.[language] || c.summary;
                const image = (c as any).cardImageUrl || c.heroImageUrl || null;
                return (
                  <Card key={c.id} className="overflow-hidden transition-all hover:shadow-md p-2 sm:p-0">
                    <div className="relative h-[120px] sm:h-[180px] w-full overflow-hidden bg-muted rounded-md">
                      {image ? (
                        <Image src={image} alt={title} fill className="object-cover transition-transform duration-300 hover:scale-105" />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-muted">
                          <Shield className="h-10 w-10 sm:h-16 sm:w-16 text-muted-foreground/40" />
                        </div>
                      )}
                    </div>
                    <div className="p-2 sm:p-4 border-b">
                      <div className="mb-1 sm:mb-2">
                        <h3 className="font-medium text-xs sm:text-base line-clamp-1">{title}</h3>
                      </div>
                      {summary && (
                        <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 mb-2 sm:mb-3">{summary}</p>
                      )}
                      <div className="flex items-center text-[10px] sm:text-xs text-muted-foreground gap-2">
                        <Calendar className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                        <span>Updated: {formatDate((c as any).updated_at)}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center px-2 sm:px-4 py-2 sm:py-3 bg-muted/20">
                      <div className="flex space-x-1 sm:space-x-2">
                        <Button variant="ghost" size="icon" className="h-7 w-7 p-0" asChild>
                          <Link href={`/admin/ppe-hub/${c.id}`}>
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Link>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 p-0 text-destructive hover:bg-destructive/10"
                          onClick={() => {
                            setTargetCategory(c);
                            setConfirmOpen(true);
                          }}
                        >
                          <Trash className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                      <div className="flex items-center space-x-1 sm:space-x-2">
                        <Button variant="outline" size="icon" className="h-7 w-7 p-0" asChild>
                          <Link href={`/resources/en-resource-centre/${c.slug}`} target="_blank">
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">View</span>
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete category</DialogTitle>
            <DialogDescription>
              Delete "{(targetCategory as any)?.title}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmOpen(false)}>Close</Button>
            <Button variant="destructive" onClick={handleDelete} disabled={deleting}>
              {deleting ? 'Deleting…' : 'Delete'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}


