"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";
import { createCareer } from "@/lib/career-service";
import { ArrowLeft, Save, X } from "lucide-react";
import { LanguageSwitcher } from "@/components/ui/language-switcher";

function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim();
}

export default function CreateCareerPage() {
  const router = useRouter();
  const [currentLanguage, setCurrentLanguage] = useState<'en' | 'it'>('en');
  const [titleLocales, setTitleLocales] = useState<{en: string, it: string}>({ en: "", it: "" });
  const [slug, setSlug] = useState("");
  const [department, setDepartment] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");
  // Locale-aware simple fields
  const [departmentLocales, setDepartmentLocales] = useState<{en: string, it: string}>({ en: "", it: "" });
  const [locationLocales, setLocationLocales] = useState<{en: string, it: string}>({ en: "", it: "" });
  const [jobTypeLocales, setJobTypeLocales] = useState<{en: string, it: string}>({ en: "", it: "" });
  const [workSiteLocales, setWorkSiteLocales] = useState<{en: string, it: string}>({ en: "", it: "" });
  const [workSite, setWorkSite] = useState("");
  const [summaryLocales, setSummaryLocales] = useState<{en: string, it: string}>({ en: "", it: "" });
  const [descriptionLocales, setDescriptionLocales] = useState<{en: string, it: string}>({ en: "", it: "" });
  const [responsibilitiesLocales, setResponsibilitiesLocales] = useState<{en: string[], it: string[]}>({ en: [], it: [] });
  const [requirementsLocales, setRequirementsLocales] = useState<{en: string[], it: string[]}>({ en: [], it: [] });
  const [benefitsLocales, setBenefitsLocales] = useState<{en: string[], it: string[]}>({ en: [], it: [] });
  const [salaryRangeLocales, setSalaryRangeLocales] = useState<{en: string, it: string}>({ en: "", it: "" });
  const [isPublished, setIsPublished] = useState(false);
  const [isFeatured, setIsFeatured] = useState(false);
  const [currentArrayItem, setCurrentArrayItem] = useState("");
  const [arrayTarget, setArrayTarget] = useState<'resp' | 'req' | 'ben'>('resp');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addArrayItem = () => {
    const value = currentArrayItem.trim();
    if (!value) return;
    if (arrayTarget === 'resp') setResponsibilitiesLocales(prev => ({ ...prev, [currentLanguage]: [...prev[currentLanguage], value] }));
    if (arrayTarget === 'req') setRequirementsLocales(prev => ({ ...prev, [currentLanguage]: [...prev[currentLanguage], value] }));
    if (arrayTarget === 'ben') setBenefitsLocales(prev => ({ ...prev, [currentLanguage]: [...prev[currentLanguage], value] }));
    setCurrentArrayItem("");
  };

  const removeFrom = (type: 'resp' | 'req' | 'ben', value: string) => {
    if (type === 'resp') setResponsibilitiesLocales(prev => ({ ...prev, [currentLanguage]: prev[currentLanguage].filter(x => x !== value) }));
    if (type === 'req') setRequirementsLocales(prev => ({ ...prev, [currentLanguage]: prev[currentLanguage].filter(x => x !== value) }));
    if (type === 'ben') setBenefitsLocales(prev => ({ ...prev, [currentLanguage]: prev[currentLanguage].filter(x => x !== value) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!titleLocales.en || !departmentLocales.en || !locationLocales.en || !jobTypeLocales.en || !summaryLocales.en || !descriptionLocales.en) {
      toast({ title: "Validation error", description: "Please fill all required fields.", variant: "destructive" });
      return;
    }
    try {
      setIsSubmitting(true);
      const payload: any = {
        title: titleLocales.en,
        slug: slug || slugify(titleLocales.en),
        department: departmentLocales.en,
        location: locationLocales.en,
        job_type: jobTypeLocales.en,
        work_site_locales: (workSiteLocales.en || workSiteLocales.it) ? workSiteLocales : undefined,
        summary: summaryLocales.en,
        description: descriptionLocales.en,
        responsibilities: responsibilitiesLocales.en,
        requirements: requirementsLocales.en,
        benefits: benefitsLocales.en,
        department_locales: (departmentLocales.en || departmentLocales.it) ? departmentLocales : undefined,
        location_locales: (locationLocales.en || locationLocales.it) ? locationLocales : undefined,
        job_type_locales: (jobTypeLocales.en || jobTypeLocales.it) ? jobTypeLocales : undefined,
        // locales payloads
        title_locales: (titleLocales.en || titleLocales.it) ? titleLocales : undefined,
        summary_locales: (summaryLocales.en || summaryLocales.it) ? summaryLocales : undefined,
        description_locales: (descriptionLocales.en || descriptionLocales.it) ? descriptionLocales : undefined,
        responsibilities_locales: (responsibilitiesLocales.en.length || responsibilitiesLocales.it.length) ? responsibilitiesLocales : undefined,
        requirements_locales: (requirementsLocales.en.length || requirementsLocales.it.length) ? requirementsLocales : undefined,
        benefits_locales: (benefitsLocales.en.length || benefitsLocales.it.length) ? benefitsLocales : undefined,
        salary_range_locales: (salaryRangeLocales.en || salaryRangeLocales.it) ? salaryRangeLocales : undefined,
        salary_range: salaryRangeLocales.en || null,
        is_published: isPublished,
        is_featured: isFeatured,
      };
      try {
        await createCareer(payload);
      } catch (err: any) {
        const msg = String(err?.message || err);
        // If insert fails due to unknown locale columns, retry without them (DB mismatch safety)
        if (/column\s+.*_locales\s+does not exist/i.test(msg) || /invalid input value for enum|json|jsonb/i.test(msg)) {
          const fallback = { ...payload };
          delete fallback.department_locales;
          delete fallback.location_locales;
          delete fallback.job_type_locales;
          delete fallback.title_locales;
          delete fallback.summary_locales;
          delete fallback.description_locales;
          delete fallback.responsibilities_locales;
          delete fallback.requirements_locales;
          delete fallback.benefits_locales;
          delete fallback.salary_range_locales;
          await createCareer(fallback);
        } else {
          throw err;
        }
      }
      toast({ title: "Success", description: "Role created." });
      router.push("/admin/careers");
    } catch (error) {
      console.error("Error creating role:", error);
      toast({ title: "Error", description: String((error as any)?.message || error) || "Failed to create role.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-2">
        <Button variant="ghost" asChild className="w-full sm:w-auto">
          <Link href="/admin/careers">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Careers
          </Link>
        </Button>
        <div className="flex items-center justify-between gap-3 w-full sm:w-auto">
          <h1 className="text-2xl font-bold tracking-tight">Create Role</h1>
          <LanguageSwitcher currentLanguage={currentLanguage} onLanguageChange={setCurrentLanguage} />
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-4 sm:gap-6 md:grid-cols-6">
          <div className="md:col-span-4 space-y-4 sm:space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">Role Details</CardTitle>
                <CardDescription className="text-xs sm:text-sm">Fill the job information.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 sm:space-y-4">
                  <div className="space-y-1 sm:space-y-2">
                    <Label htmlFor="title" className="text-xs sm:text-sm">Title</Label>
                    <Input id="title" value={titleLocales[currentLanguage]} onChange={(e) => { setTitleLocales(prev => ({ ...prev, [currentLanguage]: e.target.value })); if (currentLanguage === 'en') setSlug(slugify(e.target.value)); }} required className="text-xs sm:text-sm h-8 sm:h-10" />
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <Label htmlFor="slug" className="text-xs sm:text-sm">Slug</Label>
                    <Input id="slug" value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="auto-generated" className="text-xs sm:text-sm h-8 sm:h-10" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="space-y-1 sm:space-y-2">
                      <Label htmlFor="department" className="text-xs sm:text-sm">Department</Label>
                      <Input id="department" value={departmentLocales[currentLanguage]} onChange={(e) => setDepartmentLocales(prev => ({ ...prev, [currentLanguage]: e.target.value }))} required className="text-xs sm:text-sm h-8 sm:h-10" />
                    </div>
                    <div className="space-y-1 sm:space-y-2">
                      <Label htmlFor="location" className="text-xs sm:text-sm">Location</Label>
                      <Input id="location" value={locationLocales[currentLanguage]} onChange={(e) => setLocationLocales(prev => ({ ...prev, [currentLanguage]: e.target.value }))} required className="text-xs sm:text-sm h-8 sm:h-10" />
                    </div>
                    <div className="space-y-1 sm:space-y-2">
                      <Label htmlFor="jobType" className="text-xs sm:text-sm">Job Type</Label>
                      <Input id="jobType" value={jobTypeLocales[currentLanguage]} onChange={(e) => setJobTypeLocales(prev => ({ ...prev, [currentLanguage]: e.target.value }))} required className="text-xs sm:text-sm h-8 sm:h-10" />
                    </div>
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <Label htmlFor="workSite" className="text-xs sm:text-sm">Work Site</Label>
                    <Input id="workSite" value={workSiteLocales[currentLanguage]} onChange={(e) => setWorkSiteLocales(prev => ({ ...prev, [currentLanguage]: e.target.value }))} placeholder="on-site only, travel 50%, hybrid, remote..." className="text-xs sm:text-sm h-8 sm:h-10" />
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <Label htmlFor="summary" className="text-xs sm:text-sm">Summary</Label>
                    <Textarea id="summary" value={summaryLocales[currentLanguage]} onChange={(e) => setSummaryLocales({ ...summaryLocales, [currentLanguage]: e.target.value })} rows={3} required className="text-xs sm:text-sm" />
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <Label htmlFor="description" className="text-xs sm:text-sm">Description</Label>
                    <Textarea id="description" value={descriptionLocales[currentLanguage]} onChange={(e) => setDescriptionLocales({ ...descriptionLocales, [currentLanguage]: e.target.value })} rows={10} required className="text-xs sm:text-sm font-mono" />
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
                  <Input id="salary" value={salaryRangeLocales[currentLanguage]} onChange={(e) => setSalaryRangeLocales(prev => ({ ...prev, [currentLanguage]: e.target.value }))} placeholder="Optional" className="text-xs sm:text-sm h-8 sm:h-10" />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col sm:flex-row sm:justify-between gap-2 sm:gap-0">
                <Button variant="outline" type="button" asChild className="w-full sm:w-auto">
                  <Link href="/admin/careers">Cancel</Link>
                </Button>
                <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
                  {isSubmitting ? "Creating..." : "Create Role"}
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">Responsibilities / Requirements / Benefits</CardTitle>
                <CardDescription className="text-xs sm:text-sm">Add bullet points.</CardDescription>
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
                  {[{ label: 'Responsibilities', items: responsibilitiesLocales[currentLanguage], key: 'resp' }, { label: 'Requirements', items: requirementsLocales[currentLanguage], key: 'req' }, { label: 'Benefits', items: benefitsLocales[currentLanguage], key: 'ben' }].map(({ label, items, key }) => (
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
    </div>
  );
}


