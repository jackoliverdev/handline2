import { FC, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { sendPasswordResetEmail } from "firebase/auth";
import { useAuth } from "reactfire";
import { useLanguage } from '@/lib/context/language-context';

interface ModalChangePasswordProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const ModalForgotPassword: FC<ModalChangePasswordProps> = ({
  isOpen,
  setIsOpen,
}) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const auth = useAuth();
  const { t } = useLanguage();

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      await sendPasswordResetEmail(auth, email);
      toast({
        title: t('auth.successSignIn'),
        description: t('auth.forgotPasswordHelp'),
      });
      setIsOpen(false);
    } catch (error) {
      toast({ title: t('auth.errorSignIn'), description: `${error}` });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="bg-white dark:bg-gray-900">
          <DialogHeader>
            <DialogTitle>{t('auth.forgotPasswordTitle')}</DialogTitle>
            <DialogDescription>
              {t('auth.forgotPasswordDesc')}
            </DialogDescription>
          </DialogHeader>

          <Label htmlFor="email">{t('auth.email')}</Label>
          <Input
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
            disabled={isLoading}
            name="email"
            type="email"
            required
            placeholder={t('auth.emailPlaceholder')}
          />

          <p className="text-[0.8rem] text-white/60 -mt-3">
            {t('auth.forgotPasswordHelp')}
          </p>
          <Button disabled={isLoading} onClick={() => onSubmit()}>
            {t('auth.submit')}
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};
