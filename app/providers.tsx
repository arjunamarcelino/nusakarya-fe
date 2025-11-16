import AuthProviders from "./_providers/AuthProviders";

export function Providers({ children }: { children: React.ReactNode }) {
  return <AuthProviders>{children}</AuthProviders>;
}