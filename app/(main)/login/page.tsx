import LoginClient from '@/components/website/login/LoginClient';
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | Hand Line Company",
  description: "Sign in to your Hand Line Company account",
};

export default function LoginPage() {
  return <LoginClient />;
}
