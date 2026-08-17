import AuthForm from "@/components/auth/AuthForm";

export default function LoginPage() {
  return (
    <main className="h-screen w-full flex items-center justify-center bg-[#f8f9fa] p-4 overflow-hidden">
      <AuthForm initialMode="login" />
    </main>
  );
}
