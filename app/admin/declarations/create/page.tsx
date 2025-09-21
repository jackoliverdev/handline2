"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Download, FileText, Loader2, Save, Trash, Upload, ArrowLeft } from "lucide-react";
import type { Product } from "@/lib/products-service";
import { getProductById, updateProduct } from "@/lib/products-service";
import { supabase } from "@/lib/supabase";

type DocEntry = { url: string; kind: "eu" | "uk"; locale?: string };

const DECLARATION_FILTERS: { value: string; label: string }[] = [
  { value: 'en-GB', label: 'GB English' },
  { value: 'de-DE', label: 'DE Deutsch' },
  { value: 'fr-FR', label: 'FR Français' },
  { value: 'it-IT', label: 'IT Italiano' },
  { value: 'lv-LV', label: 'LV Latviešu' },
  { value: 'hu-HU', label: 'HU Magyar' },
  { value: 'bg-BG', label: 'BG Български' },
  { value: 'cs-CZ', label: 'CS Čeština' },
  { value: 'da-DK', label: 'DA Dansk' },
  { value: 'el-GR', label: 'EL Ελληνικά' },
  { value: 'es-ES', label: 'ES Español' },
  { value: 'et-EE', label: 'ET Eesti' },
  { value: 'fi-FI', label: 'FI Suomi' },
  { value: 'hr-HR', label: 'HR Hrvatski' },
  { value: 'lt-LT', label: 'LT Lietuvių' },
  { value: 'nl-NL', label: 'NL Nederlands' },
  { value: 'pl-PL', label: 'PL Polski' },
  { value: 'pt-PT', label: 'PT Português' },
  { value: 'ro-RO', label: 'RO Română' },
  { value: 'sk-SK', label: 'SK Slovenčina' },
  { value: 'sl-SI', label: 'SL Slovenščina' },
  { value: 'sv-SE', label: 'SV Svenska' },
];

export default function CreateDeclarationsPage() {
  const router = useRouter();
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [selectedId, setSelectedId] = useState<string>("");
  const [product, setProduct] = useState<Product | null>(null);
  const [docs, setDocs] = useState<DocEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  // New EU entry
  const [newLocale, setNewLocale] = useState<string>("");
  const [newFile, setNewFile] = useState<File | null>(null);
  // UK entry
  const [ukFile, setUkFile] = useState<File | null>(null);
  const [ukcaUrl, setUkcaUrl] = useState<string | null>(null);

  // Load products for selector
  useEffect(() => {
    (async () => {
      const res = await fetch('/api/products');
      const data = res.ok ? await res.json() : [];
      setAllProducts(data);
      setLoading(false);
    })();
  }, []);

  // Load product when selected
  useEffect(() => {
    (async () => {
      if (!selectedId) return;
      const { product } = await getProductById(selectedId);
      setProduct(product);
      const entries: DocEntry[] = Array.isArray((product as any)?.declaration_docs_locales)
        ? (product as any).declaration_docs_locales.map((e: any) => ({ url: e.url, kind: e.kind, locale: e.locale }))
        : [];
      setDocs(entries);
      setUkcaUrl((product as any)?.ukca_declaration_url || null);
    })();
  }, [selectedId]);

  const euDocs = useMemo(() => docs.filter((d) => d.kind === 'eu'), [docs]);
  const ukDoc = useMemo(() => {
    if (ukcaUrl) return { kind: 'uk', url: ukcaUrl } as DocEntry;
    return docs.find((d) => d.kind === 'uk') || null;
  }, [docs, ukcaUrl]);

  const countryFromLocale = (loc: string): string => {
    const parts = loc.split('-');
    return (parts[1] || parts[0] || '').toUpperCase().slice(0,2);
  };

  const uploadToStorage = async (file: File, locale?: string): Promise<string | null> => {
    if (!product) return null;
    const ext = file.name.split('.').pop() || 'pdf';
    const dateStr = new Date().toISOString().slice(0,10).replace(/-/g, '');
    const country = locale ? countryFromLocale(locale) : 'EN';
    const safeName = product.name;
    const filename = `HLC_${dateStr}_${country}_DoC_${safeName}.${ext}`;
    const path = `DOCs/${safeName}/${filename}`;
    const { error } = await supabase.storage.from('technical-sheets').upload(path, file, { upsert: true });
    if (error) {
      console.error('Upload error', error);
      return null;
    }
    const { data: { publicUrl } } = supabase.storage.from('technical-sheets').getPublicUrl(path);
    return publicUrl;
  };

  const availableLocales = useMemo(() => {
    const used = new Set(euDocs.map((d) => d.locale));
    return DECLARATION_FILTERS.filter((opt) => !used.has(opt.value));
  }, [euDocs]);

  useEffect(() => {
    if (!availableLocales.find((o) => o.value === newLocale)) {
      setNewLocale(availableLocales[0]?.value || "");
    }
  }, [availableLocales]);

  const handleAddEu = async () => {
    if (!newFile || !newLocale) return;
    const url = await uploadToStorage(newFile, newLocale);
    if (!url) return;
    setDocs((prev) => {
      const without = prev.filter((d) => !(d.kind === 'eu' && d.locale === newLocale));
      return [...without, { kind: 'eu', locale: newLocale, url }];
    });
    setNewFile(null);
  };

  const handleAddUk = async () => {
    if (!ukFile) return;
    const url = await uploadToStorage(ukFile);
    if (!url) return;
    setUkcaUrl(url);
    setUkFile(null);
  };

  const removeEu = (locale: string) => setDocs((prev) => prev.filter((d) => !(d.kind === 'eu' && d.locale === locale)));
  const removeUk = () => setUkcaUrl(null);

  const handleSave = async () => {
    if (!product) return;
    setSaving(true);
    try {
      await updateProduct(product.id, { declaration_docs_locales: docs as any, ukca_declaration_url: ukcaUrl } as any);
      router.push('/admin/declarations');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" asChild>
          <Link href="/admin/declarations"><ArrowLeft className="h-4 w-4 mr-1" /> Back</Link>
        </Button>
        <Button onClick={handleSave} disabled={saving || !product}>
          {saving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />} Save changes
        </Button>
      </div>

      {/* Product selector */}
      <Card>
        <CardHeader>
          <CardTitle>Select product</CardTitle>
          <CardDescription>Choose the product to manage declarations for.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
            <div className="sm:col-span-2">
              <Label>Product</Label>
              <Select value={selectedId} onValueChange={setSelectedId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select product" />
                </SelectTrigger>
                <SelectContent className="max-h-80 overflow-y-auto">
                  {allProducts.map((p) => (
                    <SelectItem key={p.id} value={p.id}>
                      {p.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {product && (
              <div className="flex items-center gap-3">
                <div className="relative h-12 w-12 overflow-hidden rounded-md bg-muted border">
                  {product.image_url ? (
                    <Image src={product.image_url} alt={product.name} fill className="object-contain p-2" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                      <FileText className="h-5 w-5" />
                    </div>
                  )}
                </div>
                <div>
                  <div className="text-sm font-medium">{product.name}</div>
                  {product.category && <div className="text-xs text-muted-foreground">{product.category}</div>}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {product && (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="relative h-16 w-16 overflow-hidden rounded-md bg-muted border">
                {product.image_url ? (
                  <Image src={product.image_url} alt={product.name} fill className="object-contain p-2" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                    <FileText className="h-6 w-6" />
                  </div>
                )}
              </div>
              <div>
                <CardTitle className="text-xl">{product.name}</CardTitle>
                {product.category && <CardDescription>{product.category}</CardDescription>}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              {/* EU DoCs */}
              <div className="space-y-4">
                <h3 className="font-semibold">EU Declarations</h3>
                <div className="flex flex-wrap gap-2">
                  {euDocs.length === 0 && (
                    <p className="text-sm text-muted-foreground">No EU declarations yet.</p>
                  )}
                  {euDocs
                    .sort((a, b) => (a.locale || '').localeCompare(b.locale || ''))
                    .map((d) => (
                      <div key={d.locale} className="flex items-center gap-2 rounded-md border px-2 py-1 text-sm">
                        <Badge variant="outline">{d.locale}</Badge>
                        <a href={d.url} target="_blank" rel="noreferrer" className="text-brand-primary underline">Open</a>
                        <Button variant="ghost" size="sm" onClick={() => removeEu(d.locale!)} className="h-7 px-2 text-destructive">
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 items-end">
                  <div className="sm:col-span-2">
                    <Label>Language</Label>
                    <Select value={newLocale} onValueChange={setNewLocale}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableLocales.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="sm:col-span-2">
                    <Label>PDF file</Label>
                    <Input type="file" accept="application/pdf" onChange={(e) => setNewFile(e.target.files?.[0] || null)} />
                  </div>
                  <div>
                    <Button onClick={handleAddEu} disabled={!newFile || !newLocale}><Upload className="h-4 w-4 mr-1" /> Upload</Button>
                  </div>
                </div>
              </div>

              {/* UKCA */}
              <div className="space-y-4">
                <h3 className="font-semibold">UKCA Declaration</h3>
                <div className="flex items-center gap-2">
                  {ukDoc ? (
                    <div className="flex items-center gap-2 rounded-md border px-2 py-1 text-sm">
                      <Badge variant="outline">UKCA</Badge>
                      <a href={ukDoc.url} target="_blank" rel="noreferrer" className="text-brand-primary underline">Open</a>
                      <Button variant="ghost" size="sm" onClick={removeUk} className="h-7 px-2 text-destructive">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">No UKCA declaration yet.</p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 items-end">
                  <div className="sm:col-span-4">
                    <Label>PDF file</Label>
                    <Input type="file" accept="application/pdf" onChange={(e) => setUkFile(e.target.files?.[0] || null)} />
                  </div>
                  <div>
                    <Button onClick={handleAddUk} disabled={!ukFile}><Upload className="h-4 w-4 mr-1" /> Upload</Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}


