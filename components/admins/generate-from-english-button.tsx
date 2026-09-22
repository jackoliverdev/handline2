"use client";

import { useState } from "react";
import { getAuth } from "firebase/auth";
import { Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "@/components/ui/use-toast";
import { LANGUAGE_META, type Language } from "@/lib/i18n/config";
import { localeHasContent, type GenerateApplyMode } from "@/lib/i18n/admin-locales";

interface GenerateFromEnglishButtonProps {
  currentLanguage: Language;
  getSource: () => Record<string, unknown>;
  hasTargetContent: () => boolean;
  applyFields: (fields: Record<string, unknown>, mode: GenerateApplyMode) => void;
}

export function GenerateFromEnglishButton({
  currentLanguage,
  getSource,
  hasTargetContent,
  applyFields,
}: GenerateFromEnglishButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  if (currentLanguage === 'en') return null;

  const generate = async (mode: GenerateApplyMode) => {
    setConfirmOpen(false);
    const source = getSource();
    if (!localeHasContent(source)) {
      toast({
        title: "English required",
        description: "Fill the English tab first.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsGenerating(true);
      const token = await getAuth().currentUser?.getIdToken();
      if (!token) {
        toast({
          title: "Session expired",
          description: "Please sign in again.",
          variant: "destructive",
        });
        return;
      }

      const response = await fetch('/api/admin/translate-from-english', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          targetLanguage: currentLanguage,
          source,
        }),
      });

      const result = await response.json().catch(() => ({}));

      if (response.status === 401 || response.status === 403) {
        toast({
          title: "Session expired",
          description: "Please sign in again.",
          variant: "destructive",
        });
        return;
      }

      if (response.status === 503) {
        toast({
          title: "Not configured",
          description: "AI translation is not configured on this environment.",
          variant: "destructive",
        });
        return;
      }

      if (response.status === 400 && result.error === 'EMPTY_SOURCE') {
        toast({
          title: "English required",
          description: "Fill the English tab first.",
          variant: "destructive",
        });
        return;
      }

      if (!response.ok || !result.fields || typeof result.fields !== 'object') {
        toast({
          title: "Generation failed",
          description: "Could not generate a draft. Try again.",
          variant: "destructive",
        });
        return;
      }

      applyFields(result.fields as Record<string, unknown>, mode);
      toast({
        title: "Draft ready",
        description: `${LANGUAGE_META[currentLanguage].nativeName} draft filled. Review it, then Save.`,
      });
    } catch {
      toast({
        title: "Generation failed",
        description: "Could not generate a draft. Try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleClick = () => {
    const source = getSource();
    if (!localeHasContent(source)) {
      toast({
        title: "English required",
        description: "Fill the English tab first.",
        variant: "destructive",
      });
      return;
    }

    if (hasTargetContent()) {
      setConfirmOpen(true);
      return;
    }

    void generate('replace');
  };

  return (
    <>
      <Button
        type="button"
        size="sm"
        variant="outline"
        disabled={isGenerating}
        onClick={handleClick}
        className="w-full sm:w-auto"
      >
        {isGenerating ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Sparkles className="mr-2 h-4 w-4" />
        )}
        Generate from English
      </Button>
      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>This language already has copy</AlertDialogTitle>
            <AlertDialogDescription>
              Generating a draft can overwrite the current {LANGUAGE_META[currentLanguage].nativeName} fields. Choose how to apply it. English and other languages are left unchanged.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="sm:flex-col sm:space-x-0 gap-2">
            <AlertDialogCancel disabled={isGenerating}>Cancel</AlertDialogCancel>
            <Button
              type="button"
              variant="outline"
              disabled={isGenerating}
              onClick={() => void generate('fill-empty')}
            >
              Fill empty fields only
            </Button>
            <Button
              type="button"
              disabled={isGenerating}
              onClick={() => void generate('replace')}
            >
              Replace this language
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
