import LoginClient from '@/components/website/login/LoginClient';
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | HandLine Company",
  description: "Sign in to your HandLine Company account",
};

export default function LoginPage() {
  return <LoginClient />;
}
