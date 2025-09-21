"use client";

import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/context/language-context";
import { supabase } from "@/lib/supabase";
import type { Product } from "@/lib/products-service";
import { Download, Edit, Trash, FileText } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";

export default function DeclarationsManagementPage() {
  const { language } = useLanguage();
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [target, setTarget] = useState<Product | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/products');
        const data = res.ok ? await res.json() : [];
        setProducts(data);
      } finally {
        setLoading(false);
      }
    })();
  }, [language]);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matches =
        search.trim() === '' ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        (p.short_description || '').toLowerCase().includes(search.toLowerCase());
      const entries = Array.isArray((p as any).declaration_docs_locales) ? (p as any).declaration_docs_locales : [];
      const hasEU = entries.some((e: any) => e && e.kind === 'eu');
      return matches && hasEU;
    });
  }, [products, search]);

  async function handleDelete() {
    if (!target) return;
    try {
      setDeleting(true);
      const { data, error } = await supabase
        .from('products')
        .update({ declaration_docs_locales: [] })
        .eq('id', target.id)
        .select('id')
        .single();
      if (error) throw error;
      setProducts((prev) => prev.map((p) => p.id === target.id ? { ...p, declaration_docs_locales: [] as any } : p));
      toast({ title: 'Cleared', description: 'Declarations cleared for this product.' });
      setConfirmOpen(false);
      setTarget(null);
    } catch (err) {
      console.error('Failed to clear declarations', err);
      toast({ title: 'Error', description: 'Failed to clear declarations.', variant: 'destructive' });
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 sm:flex-nowrap sm:gap-4 sm:mb-0 flex-col sm:flex-row">
        <div className="flex-1 min-w-[240px] w-full sm:w-auto mb-2 sm:mb-0">
          <Input
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-full sm:max-w-sm text-xs sm:text-sm h-8 sm:h-10"
          />
        </div>
        <Button asChild className="w-full sm:w-auto">
          <Link href="/admin/declarations/create">
            Create New Declaration
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Declaration Management</CardTitle>
          <CardDescription>Manage product declarations and downloadable DoCs.</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-14 border border-brand-primary/10 dark:border-brand-primary/20 rounded-xl bg-white/50 dark:bg-gray-800/30">
              <FileText className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
              <h3 className="mt-4 text-lg font-semibold">No products with declarations</h3>
              <p className="mt-2 text-sm text-muted-foreground">Add declaration entries on products to manage them here.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3">
              {filtered.map((p) => (
                <Card key={p.id} className="overflow-hidden transition-all hover:shadow-md p-2 sm:p-0">
                  <div className="flex items-center gap-4 p-3 sm:p-4">
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md bg-muted border">
                      {p.image_url ? (
                        <Image src={p.image_url} alt={p.name} fill className="object-contain p-2" />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                          <FileText className="h-6 w-6" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-4">
                        <div className="min-w-0">
                          <h3 className="font-medium truncate">{p.name}</h3>
                          {p.category && <p className="text-xs text-muted-foreground truncate">{p.category}</p>}
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/admin/declarations/${p.id}`}> <Edit className="h-4 w-4 mr-1" /> Edit</Link>
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive"
                            onClick={() => { setTarget(p); setConfirmOpen(true); }}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      {/* Locales badges */}
                      <div className="mt-2 flex flex-wrap gap-1">
                        {Array.isArray((p as any).declaration_docs_locales)
                          ? (p as any).declaration_docs_locales
                              .filter((e: any) => e && e.kind === 'eu')
                              .map((e: any) => (
                                <Badge key={e.locale} variant="outline" className="text-xs">
                                  EU {e.locale}
                                </Badge>
                              ))
                          : null}
                        {(() => {
                          const entries = Array.isArray((p as any).declaration_docs_locales) ? (p as any).declaration_docs_locales : [];
                          const hasUkJson = entries.some((e: any) => e && e.kind === 'uk');
                          const hasUkca = Boolean((p as any).ukca_declaration_url) || hasUkJson;
                          return (
                            <Badge
                              variant="outline"
                              className={`text-xs ${hasUkca ? 'border-green-300 text-green-700' : 'border-red-300 text-red-600'}`}
                            >
                              UKCA {hasUkca ? '✓' : '×'}
                            </Badge>
                          );
                        })()}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Clear declarations</DialogTitle>
            <DialogDescription>
              This will remove all EU and UKCA declaration links for "{target?.name}". You can re-add them later. Continue?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmOpen(false)}>Close</Button>
            <Button variant="destructive" onClick={handleDelete} disabled={deleting}>
              {deleting ? 'Clearing…' : 'Clear'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}


