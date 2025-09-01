"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { getCareerById, updateCareer, deleteCareer, toggleCareerFeatured, toggleCareerPublished } from "@/lib/career-service";
import { ArrowLeft, Save, Trash, X } from "lucide-react";
import type { CareerPost } from "@/lib/career-service";

interface PageProps { params: { id: string } }

export default function EditCareerPage({ params }: PageProps) {
  const router = useRouter();
  const { id } = params;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  // Fields
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [department, setDepartment] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");
  const [responsibilities, setResponsibilities] = useState<string[]>([]);
  const [requirements, setRequirements] = useState<string[]>([]);
  const [benefits, setBenefits] = useState<string[]>([]);
  const [salaryRange, setSalaryRange] = useState<string>("");
  const [isPublished, setIsPublished] = useState(false);
  const [isFeatured, setIsFeatured] = useState(false);

  const [currentArrayItem, setCurrentArrayItem] = useState("");
  const [arrayTarget, setArrayTarget] = useState<'resp' | 'req' | 'ben'>('resp');

  useEffect(() => {
    async function load() {
      try {
        const post = await getCareerById(id);
        if (!post) throw new Error("Not found");
        setTitle(post.title);
        setSlug(post.slug);
        setDepartment(post.department);
        setLocation(post.location);
        setJobType(post.job_type);
        setSummary(post.summary);
        setDescription(post.description);
        setResponsibilities(post.responsibilities || []);
        setRequirements(post.requirements || []);
        setBenefits(post.benefits || []);
        setSalaryRange(post.salary_range || "");
        setIsPublished(!!post.is_published);
        setIsFeatured(!!post.is_featured);
      } catch (error) {
        console.error("Error loading role:", error);
        toast({ title: "Error", description: "Failed to load role.", variant: "destructive" });
        router.push("/admin/careers");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id, router]);

  const addArrayItem = () => {
    const value = currentArrayItem.trim();
    if (!value) return;
    if (arrayTarget === 'resp') setResponsibilities((prev) => [...prev, value]);
    if (arrayTarget === 'req') setRequirements((prev) => [...prev, value]);
    if (arrayTarget === 'ben') setBenefits((prev) => [...prev, value]);
    setCurrentArrayItem("");
  };

  const removeFrom = (type: 'resp' | 'req' | 'ben', value: string) => {
    if (type === 'resp') setResponsibilities((prev) => prev.filter((x) => x !== value));
    if (type === 'req') setRequirements((prev) => prev.filter((x) => x !== value));
    if (type === 'ben') setBenefits((prev) => prev.filter((x) => x !== value));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      await updateCareer(id, {
        title, slug, department, location, job_type: jobType,
        summary, description, responsibilities, requirements, benefits,
        salary_range: salaryRange || null, is_published: isPublished, is_featured: isFeatured,
      });
      toast({ title: "Saved", description: "Role updated." });
    } catch (error) {
      console.error("Error saving role:", error);
      toast({ title: "Error", description: "Failed to save role.", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteCareer(id);
      toast({ title: "Deleted", description: "Role removed." });
      router.push("/admin/careers");
    } catch (error) {
      console.error("Error deleting role:", error);
      toast({ title: "Error", description: "Failed to delete role.", variant: "destructive" });
    } finally {
      setDeleteOpen(false);
    }
  };

  if (loading) {
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
          <Link href="/admin/careers">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Careers
          </Link>
        </Button>
        <div className="flex items-center justify-between gap-2 w-full sm:w-auto">
          <h1 className="text-2xl font-bold tracking-tight">Edit Role</h1>
          <Button variant="destructive" onClick={() => setDeleteOpen(true)} className="w-auto">
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>

      <form onSubmit={handleSave}>
        <div className="grid gap-4 sm:gap-6 md:grid-cols-6">
          <div className="md:col-span-4 space-y-4 sm:space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">Role Details</CardTitle>
                <CardDescription className="text-xs sm:text-sm">Edit the job information.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 sm:space-y-4">
                  <div className="space-y-1 sm:space-y-2">
                    <Label htmlFor="title" className="text-xs sm:text-sm">Title</Label>
                    <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required className="text-xs sm:text-sm h-8 sm:h-10" />
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <Label htmlFor="slug" className="text-xs sm:text-sm">Slug</Label>
                    <Input id="slug" value={slug} onChange={(e) => setSlug(e.target.value)} className="text-xs sm:text-sm h-8 sm:h-10" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="space-y-1 sm:space-y-2">
                      <Label htmlFor="department" className="text-xs sm:text-sm">Department</Label>
                      <Input id="department" value={department} onChange={(e) => setDepartment(e.target.value)} required className="text-xs sm:text-sm h-8 sm:h-10" />
                    </div>
                    <div className="space-y-1 sm:space-y-2">
                      <Label htmlFor="location" className="text-xs sm:text-sm">Location</Label>
                      <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} required className="text-xs sm:text-sm h-8 sm:h-10" />
                    </div>
                    <div className="space-y-1 sm:space-y-2">
                      <Label htmlFor="jobType" className="text-xs sm:text-sm">Job Type</Label>
                      <Input id="jobType" value={jobType} onChange={(e) => setJobType(e.target.value)} required className="text-xs sm:text-sm h-8 sm:h-10" />
                    </div>
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <Label htmlFor="summary" className="text-xs sm:text-sm">Summary</Label>
                    <Textarea id="summary" value={summary} onChange={(e) => setSummary(e.target.value)} rows={3} required className="text-xs sm:text-sm" />
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <Label htmlFor="description" className="text-xs sm:text-sm">Description</Label>
                    <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows={10} required className="text-xs sm:text-sm font-mono" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-2 space-y-4 sm:space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">Settings</CardTitle>
                <CardDescription className="text-xs sm:text-sm">Visibility and details.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 sm:space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-xs sm:text-sm">Published</Label>
                  </div>
                  <Switch checked={isPublished} onCheckedChange={setIsPublished} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-xs sm:text-sm">Featured</Label>
                  </div>
                  <Switch checked={isFeatured} onCheckedChange={setIsFeatured} />
                </div>
                <div className="space-y-1 sm:space-y-2">
                  <Label htmlFor="salary" className="text-xs sm:text-sm">Salary Range</Label>
                  <Input id="salary" value={salaryRange} onChange={(e) => setSalaryRange(e.target.value)} placeholder="Optional" className="text-xs sm:text-sm h-8 sm:h-10" />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col sm:flex-row sm:justify-between gap-2 sm:gap-0">
                <Button variant="outline" type="button" asChild className="w-full sm:w-auto">
                  <Link href="/admin/careers">Cancel</Link>
                </Button>
                <Button type="submit" disabled={saving} className="w-full sm:w-auto">
                  {saving ? "Saving..." : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">Responsibilities / Requirements / Benefits</CardTitle>
                <CardDescription className="text-xs sm:text-sm">Manage bullet points.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex gap-2">
                  <select value={arrayTarget} onChange={(e) => setArrayTarget(e.target.value as any)} className="border rounded px-2 text-xs">
                    <option value="resp">Responsibilities</option>
                    <option value="req">Requirements</option>
                    <option value="ben">Benefits</option>
                  </select>
                  <Input value={currentArrayItem} onChange={(e) => setCurrentArrayItem(e.target.value)} placeholder="Type item and press Add" className="h-8 text-xs" />
                  <Button type="button" variant="outline" onClick={addArrayItem} className="h-8 text-xs">Add</Button>
                </div>
                <div className="space-y-2">
                  {[{ label: 'Responsibilities', items: responsibilities, key: 'resp' }, { label: 'Requirements', items: requirements, key: 'req' }, { label: 'Benefits', items: benefits, key: 'ben' }].map(({ label, items, key }) => (
                    <div key={label}>
                      <p className="text-xs font-medium mb-1">{label}</p>
                      <div className="flex flex-wrap gap-2">
                        {items.map((it) => (
                          <Badge key={it} variant="secondary" className="flex items-center gap-1 px-2 py-1 text-xs">
                            {it}
                            <button type="button" onClick={() => removeFrom(key as any, it)} className="ml-1 rounded-full hover:bg-accent/80 p-0.5">
                              <X className="h-3 w-3" />
                              <span className="sr-only">Remove</span>
                            </button>
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>

      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete this role?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the role "{title}".
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}


