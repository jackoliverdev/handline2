"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useLanguage } from "@/lib/context/language-context";
import type { PPESectionRecord } from "@/lib/ppe-standards/types";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { toast } from "@/components/ui/use-toast";
import { MiniProductCard } from "@/components/app/mini-product-card";

import { ArrowLeft, Save, Eye, Trash, Upload, Plus, Shield, AlertCircle } from "lucide-react";

interface Product { id: string; name: string; image_url?: string | null; category?: string | null; }

type Locales = Record<string, string>;

export default function EditPPECategoryPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { language } = useLanguage();

  // Category core
  const [category, setCategory] = useState<any>({
    id: params.id,
    slug: "",
    title_locales: {} as Locales,
    summary_locales: {} as Locales,
    hero_image_url: "",
    card_image_url: "",
    created_at: "",
    updated_at: "",
  });
  const [sections, setSections] = useState<PPESectionRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<'en' | 'it'>('en');
  const [availableProducts, setAvailableProducts] = useState<Product[]>([]);

  // Image previews
  const [previewHero, setPreviewHero] = useState<string | null>(null);
  const [previewCard, setPreviewCard] = useState<string | null>(null);
  const heroInputRef = useRef<HTMLInputElement>(null);
  const cardInputRef = useRef<HTMLInputElement>(null);
  const [heroFocus, setHeroFocus] = useState<number>(50);

  // Derive current-localised strings
  const currentTitle = useMemo(() => category.title_locales?.[currentLanguage] || "", [category, currentLanguage]);
  const currentSummary = useMemo(() => category.summary_locales?.[currentLanguage] || "", [category, currentLanguage]);

  // Load category, sections, products
  useEffect(() => {
    async function load() {
      try {
        setIsLoading(true);
        // Category by ID
        const { data: cat, error: catErr } = await supabase
          .from('ppe_categories')
          .select('*')
          .eq('id', params.id)
          .single();
        if (catErr) throw catErr;
        setCategory(cat);
        setPreviewHero(cat.hero_image_url || null);
        setPreviewCard(cat.card_image_url || null);
        setHeroFocus(cat.hero_focus_y ?? 50);

        // Sections
        const { data: secs, error: secErr } = await supabase
          .from('ppe_sections')
          .select('*')
          .eq('category_id', params.id)
          .order('sort_order', { ascending: true });
        if (secErr) throw secErr;
        setSections(secs || []);

        // Products
        try {
          const res = await fetch('/api/products');
          if (res.ok) {
            const products = await res.json();
            setAvailableProducts(products);
          }
        } catch {}
      } catch (e) {
        console.error('Failed to load PPE category', e);
        toast({ title: 'Error', description: 'Failed to load PPE category', variant: 'destructive' });
        router.push('/admin/ppe-hub');
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, [params.id, router]);

  // Helpers to update locales
  const setTitleForLang = (lang: 'en' | 'it', value: string) => {
    setCategory((prev: any) => ({ ...prev, title_locales: { ...(prev.title_locales || {}), [lang]: value } }));
  };
  const setSummaryForLang = (lang: 'en' | 'it', value: string) => {
    setCategory((prev: any) => ({ ...prev, summary_locales: { ...(prev.summary_locales || {}), [lang]: value } }));
  };

  // Section helpers
  const addSection = () => {
    setSections((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        category_id: category.id,
        slug: `new-${prev.length + 1}`,
        code: '',
        title_locales: { [currentLanguage]: '' } as any,
        intro_locales: { [currentLanguage]: '' } as any,
        bullets_locales: { [currentLanguage]: [] } as any,
        image_url: '',
        related_product_ids: [],
        sort_order: (prev.length + 1) * 10,
        published: true,
      } as any,
    ]);
  };

  const updateSectionField = (index: number, field: keyof PPESectionRecord, value: any) => {
    setSections((prev) => {
      const copy = [...prev];
      (copy[index] as any)[field] = value;
      return copy;
    });
  };

  const setSectionLocale = (index: number, key: 'title_locales' | 'intro_locales', value: string) => {
    setSections((prev) => {
      const copy = [...prev];
      const m = { ...((copy[index] as any)[key] || {}) };
      m[currentLanguage] = value;
      (copy[index] as any)[key] = m;
      return copy;
    });
  };

  const addBullet = (idx: number) => {
    setSections((prev) => {
      const copy = JSON.parse(JSON.stringify(prev));
      const m = (copy[idx] as any).bullets_locales || {};
      const arr: string[] = Array.isArray(m[currentLanguage]) ? [...m[currentLanguage]] : [];
      // Avoid adding another empty placeholder
      if (arr.length === 0 || (arr[arr.length - 1] || '').trim() !== '') {
        arr.push('');
      }
      m[currentLanguage] = arr;
      (copy[idx] as any).bullets_locales = m;
      return copy;
    });
  };

  const updateBullet = (idx: number, bulletIdx: number, text: string) => {
    setSections((prev) => {
      const copy = [...prev];
      const m = { ...((copy[idx] as any).bullets_locales || {}) };
      const arr = Array.isArray(m[currentLanguage]) ? [...m[currentLanguage]] : [];
      arr[bulletIdx] = text;
      m[currentLanguage] = arr;
      (copy[idx] as any).bullets_locales = m;
      return copy;
    });
  };

  const removeBullet = (idx: number, bulletIdx: number) => {
    setSections((prev) => {
      const copy = [...prev];
      const m = { ...((copy[idx] as any).bullets_locales || {}) };
      const arr = Array.isArray(m[currentLanguage]) ? [...m[currentLanguage]] : [];
      m[currentLanguage] = arr.filter((_: any, i: number) => i !== bulletIdx);
      (copy[idx] as any).bullets_locales = m;
      return copy;
    });
  };

  // Related products in a section
  const getAvailableForSection = (s: PPESectionRecord) => {
    const selected = (s.related_product_ids || []) as string[];
    return availableProducts.filter((p) => !selected.includes(p.id));
  };

  const addRelatedProductToSection = (idx: number, productId: string) => {
    setSections((prev) => {
      const copy = [...prev];
      const selected: string[] = Array.isArray(copy[idx].related_product_ids) ? [...(copy[idx].related_product_ids as any)] : [];
      if (!selected.includes(productId)) selected.push(productId);
      copy[idx].related_product_ids = selected as any;
      return copy;
    });
  };

  const removeRelatedProductFromSection = (idx: number, productId: string) => {
    setSections((prev) => {
      const copy = [...prev];
      const selected: string[] = Array.isArray(copy[idx].related_product_ids) ? [...(copy[idx].related_product_ids as any)] : [];
      copy[idx].related_product_ids = selected.filter((id) => id !== productId) as any;
      return copy;
    });
  };

  // Image handlers (UI only for now)
  const handleHeroChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setPreviewHero(reader.result as string);
      reader.readAsDataURL(file);
    }
  };
  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setPreviewCard(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const uploadToBucket = async (bucket: string, folder: string, file: File): Promise<string | null> => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${category.id}/${folder}/${Date.now()}.${fileExt}`;
      const { error } = await supabase.storage.from(bucket).upload(fileName, file, { upsert: true });
      if (error) throw error;
      const { data: { publicUrl } } = supabase.storage.from(bucket).getPublicUrl(fileName);
      return publicUrl;
    } catch (e) {
      console.error('Upload failed', e);
      return null;
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      // Upload hero/card images if new previews were selected (if File present in inputs)
      let heroUrl = category.hero_image_url || null;
      if (heroInputRef.current?.files && heroInputRef.current.files[0]) {
        const url = await uploadToBucket('ppehub', 'hero', heroInputRef.current.files[0]);
        if (url) {
          heroUrl = url;
          setCategory((prev: any) => ({ ...prev, hero_image_url: url }));
        }
      }
      let cardUrl = category.card_image_url || null;
      if (cardInputRef.current?.files && cardInputRef.current.files[0]) {
        const url = await uploadToBucket('ppehub', 'card', cardInputRef.current.files[0]);
        if (url) {
          cardUrl = url;
          setCategory((prev: any) => ({ ...prev, card_image_url: url }));
        }
      }

      // Persist category
      const { error: catErr } = await supabase
        .from('ppe_categories')
        .update({
          title_locales: category.title_locales || {},
          summary_locales: category.summary_locales || {},
          hero_image_url: heroUrl,
          card_image_url: cardUrl,
          hero_focus_y: heroFocus,
        })
        .eq('id', category.id);
      if (catErr) throw catErr;

      // Before persisting sections, delete any that were removed in the UI
      const { data: existingSectionRows, error: existingFetchErr } = await supabase
        .from('ppe_sections')
        .select('id')
        .eq('category_id', category.id);
      if (existingFetchErr) throw existingFetchErr;

      const existingIds = (existingSectionRows || []).map((row: any) => row.id as string);
      const currentIds = sections.map((s) => (s as any).id as string);
      const idsToDelete = existingIds.filter((id) => !currentIds.includes(id));

      if (idsToDelete.length > 0) {
        const { error: deleteErr } = await supabase
          .from('ppe_sections')
          .delete()
          .in('id', idsToDelete);
        if (deleteErr) throw deleteErr;
      }

      // Persist sections (upsert existing/new)
      const upsertPayload = sections.map((s) => ({
        id: (s as any).id,
        category_id: category.id,
        slug: s.slug,
        code: s.code || null,
        title_locales: (s as any).title_locales || {},
        intro_locales: (s as any).intro_locales || {},
        bullets_locales: (s as any).bullets_locales || {},
        image_url: s.image_url || null,
        related_product_ids: s.related_product_ids || [],
        sort_order: s.sort_order || 0,
        published: s.published ?? true,
      }));
      const { error: secErr } = await supabase.from('ppe_sections').upsert(upsertPayload, { onConflict: 'id' });
      if (secErr) throw secErr;

      toast({ title: 'Saved', description: 'PPE Hub category updated.' });
    } catch (e) {
      console.error('Save failed', e);
      toast({ title: 'Error', description: 'Failed to save changes', variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-col sm:flex-row gap-2 sm:gap-0">
        <Button variant="outline" size="sm" asChild className="w-full sm:w-auto order-2 sm:order-1">
          <Link href="/admin/ppe-hub" className="flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" />
            Back to PPE Hub
          </Link>
        </Button>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto order-1 sm:order-2">
          <Button variant="outline" size="sm" asChild className="w-full sm:w-auto">
            <Link href={`/resources/en-resource-centre/${category.slug}`} target="_blank" className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              Preview
            </Link>
          </Button>
          <Button onClick={handleSave} disabled={saving} className="flex items-center gap-1 w-full sm:w-auto">
            {saving ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Main column */}
        <div className="md:col-span-2 space-y-6">
          {/* Category details */}
          <Card className="p-2 sm:p-0">
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">Category Details</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Basic information for this PPE Hub category</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Label className="text-xs sm:text-sm">Language:</Label>
                <Select value={currentLanguage} onValueChange={(v: 'en' | 'it') => setCurrentLanguage(v)}>
                  <SelectTrigger className="w-32 text-xs sm:text-sm h-8 sm:h-10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="it">Italian</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-xs sm:text-sm">Title</Label>
                <Input
                  value={currentTitle}
                  onChange={(e) => setTitleForLang(currentLanguage, e.target.value)}
                  placeholder="e.g., Hand and arm protection"
                  className="text-xs sm:text-sm h-8 sm:h-10"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs sm:text-sm">Summary</Label>
                <Textarea
                  value={currentSummary}
                  onChange={(e) => setSummaryForLang(currentLanguage, e.target.value)}
                  placeholder="Short summary for the category"
                  className="min-h-[80px] text-xs sm:text-sm"
                />
              </div>
            </CardContent>
          </Card>

          {/* Sections manager */}
          <Card className="p-2 sm:p-0">
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">Sections</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Add standards/sections and their bullets</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Label className="text-xs sm:text-sm">Language:</Label>
                  <Select value={currentLanguage} onValueChange={(v: 'en' | 'it') => setCurrentLanguage(v)}>
                    <SelectTrigger className="w-32 text-xs sm:text-sm h-8 sm:h-10">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="it">Italian</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button variant="outline" size="sm" type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); addSection(); }} className="text-xs">Add Section</Button>
              </div>

              {sections.map((s, idx) => {
                const titleLocales = (s as any).title_locales || {};
                const introLocales = (s as any).intro_locales || {};
                const bulletsLocales = (s as any).bullets_locales || {};
                const bullets: string[] = Array.isArray(bulletsLocales[currentLanguage]) ? bulletsLocales[currentLanguage] : [];
                return (
                  <Card key={(s as any).id || idx} className="p-4 border-dashed">
                    <div className="space-y-3">
                      <div className="flex justify-between items-start">
                        <Label className="text-xs sm:text-sm font-medium">Section {idx + 1}</Label>
                        <Button type="button" variant="destructive" size="sm" onClick={() => setSections((prev) => prev.filter((_, i) => i !== idx))} className="text-xs">
                          <Trash className="h-3 w-3" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <Label className="text-xs">Code</Label>
                          <Input value={s.code || ''} onChange={(e) => updateSectionField(idx, 'code', e.target.value)} className="text-xs h-8" />
                        </div>
                        <div>
                          <Label className="text-xs">Title</Label>
                          <Input value={titleLocales[currentLanguage] || ''} onChange={(e) => setSectionLocale(idx, 'title_locales', e.target.value)} className="text-xs h-8" />
                        </div>
                      </div>
                      <div>
                        <Label className="text-xs">Intro</Label>
                        <Textarea value={introLocales[currentLanguage] || ''} onChange={(e) => setSectionLocale(idx, 'intro_locales', e.target.value)} className="min-h-[60px] text-xs" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <Label className="text-xs">Bullets</Label>
                          <Button type="button" variant="outline" size="sm" className="text-xs h-6" onClick={(e) => { e.preventDefault(); e.stopPropagation(); addBullet(idx); }}>Add bullet</Button>
                        </div>
                        {bullets.map((b, bIdx) => (
                          <div key={bIdx} className="flex gap-2 mb-2">
                            <Input value={b} onChange={(e) => updateBullet(idx, bIdx, e.target.value)} className="text-xs h-7" />
                            <Button variant="destructive" size="sm" onClick={() => removeBullet(idx, bIdx)} className="text-xs h-7 w-7 p-0">
                              <Trash className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                      </div>

                      {/* Section related products */}
                      <div className="space-y-2">
                        <Label className="text-xs">Related Products</Label>
                        <div className="grid gap-2">
                          {(s.related_product_ids || []).map((pid: string) => {
                            const product = availableProducts.find((p) => p.id === pid);
                            return product ? (
                              <MiniProductCard key={pid} product={{ id: product.id, name: product.name, category: product.category || undefined, image_url: product.image_url || undefined }} showRemoveButton onRemove={() => removeRelatedProductFromSection(idx, pid)} />
                            ) : null;
                          })}
                          {(!s.related_product_ids || (s.related_product_ids as any).length === 0) && (
                            <p className="text-xs text-muted-foreground">No related products selected.</p>
                          )}
                        </div>
                        {getAvailableForSection(s).length > 0 && (
                          <Select onValueChange={(value) => addRelatedProductToSection(idx, value)}>
                            <SelectTrigger className="text-xs sm:text-sm h-8 sm:h-10">
                              <SelectValue placeholder="Select a product to add..." />
                            </SelectTrigger>
                            <SelectContent>
                              {getAvailableForSection(s).map((p) => (
                                <SelectItem key={p.id} value={p.id} className="text-xs sm:text-sm">{p.name}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      </div>
                    </div>
                  </Card>
                );
              })}

              {sections.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <p className="text-xs sm:text-sm">No sections added yet. Click "Add Section" to create your first section.</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Hero focus slider */}
          <Card className="p-2 sm:p-0">
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">Hero Vertical Focus</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Set which vertical portion of the hero image is centred (0% top, 100% bottom).</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <input type="range" min={0} max={100} value={heroFocus} onChange={(e) => setHeroFocus(parseInt(e.target.value))} className="w-full" />
                <span className="text-xs w-10 text-right">{heroFocus}%</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar column */}
        <div className="space-y-6">
          {/* Hero Image */}
          <Card className="p-2 sm:p-0">
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">Hero Image</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Image used in the category hero</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border-2 border-dashed border-gray-300 p-2 sm:p-4 text-center">
                {previewHero ? (
                  <div className="relative aspect-video w-full overflow-hidden rounded-md">
                    <Image src={previewHero} alt="Hero preview" fill className="object-cover" />
                    <Button type="button" variant="destructive" size="sm" className="absolute top-2 right-2" onClick={() => { setPreviewHero(null); if (heroInputRef.current) heroInputRef.current.value = ""; }}>
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="py-2 sm:py-4">
                    <Shield className="mx-auto h-8 w-8 sm:h-12 sm:w-12 text-gray-400" />
                    <p className="mt-2 text-xs sm:text-sm text-gray-500">Recommended size: 1600 x 900</p>
                  </div>
                )}
                <input ref={heroInputRef} type="file" accept="image/*" onChange={handleHeroChange} className="hidden" />
                <Button type="button" variant="outline" onClick={() => heroInputRef.current?.click()} className="mt-2 sm:mt-4 w-full">
                  <Upload className="h-4 w-4 mr-2" />
                  {previewHero ? 'Change Image' : 'Upload Image'}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">Maximum file size: 5MB. Supported formats: JPEG, PNG, WebP.</p>
            </CardContent>
          </Card>

          {/* Hero focus slider */}
          <Card className="p-2 sm:p-0">
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">Hero Vertical Focus</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Set which vertical portion of the hero image is centred (0% top, 100% bottom).</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <input type="range" min={0} max={100} value={heroFocus} onChange={(e) => setHeroFocus(parseInt(e.target.value))} className="w-full" />
                <span className="text-xs w-10 text-right">{heroFocus}%</span>
              </div>
            </CardContent>
          </Card>

          {/* Card Image */}
          <Card className="p-2 sm:p-0">
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">Card Image</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Image used on hub grid cards</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border-2 border-dashed border-gray-300 p-2 sm:p-4 text-center">
                {previewCard ? (
                  <div className="relative aspect-video w-full overflow-hidden rounded-md">
                    <Image src={previewCard} alt="Card preview" fill className="object-cover" />
                    <Button type="button" variant="destructive" size="sm" className="absolute top-2 right-2" onClick={() => { setPreviewCard(null); if (cardInputRef.current) cardInputRef.current.value = ""; }}>
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="py-2 sm:py-4">
                    <Shield className="mx-auto h-8 w-8 sm:h-12 sm:w-12 text-gray-400" />
                    <p className="mt-2 text-xs sm:text-sm text-gray-500">Recommended size: 1200 x 630</p>
                  </div>
                )}
                <input ref={cardInputRef} type="file" accept="image/*" onChange={handleCardChange} className="hidden" />
                <Button type="button" variant="outline" onClick={() => cardInputRef.current?.click()} className="mt-2 sm:mt-4 w-full">
                  <Upload className="h-4 w-4 mr-2" />
                  {previewCard ? 'Change Image' : 'Upload Image'}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">Maximum file size: 5MB. Supported formats: JPEG, PNG, WebP.</p>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}


