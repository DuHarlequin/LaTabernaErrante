"use client";

import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal, Settings, Shield } from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const { user, loading, isAdmin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login?redirect=/admin/applications");
    } else if (!loading && user && !isAdmin) {
      router.push("/"); // Redirect to home if not admin
    }
  }, [user, loading, isAdmin, router]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Skeleton className="h-10 w-1/4 mb-6" />
        <Skeleton className="h-8 w-1/2 mb-8" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (!user || !isAdmin) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center items-center min-h-[calc(100vh-10rem)]">
        <Alert variant="destructive" className="max-w-lg text-center">
          <div className="flex justify-center mb-3">
            <Shield className="h-10 w-10" />
          </div>
          <AlertTitle className="font-headline text-2xl">Access Denied</AlertTitle>
          <AlertDescription>
            You do not have permission to view this page. This area is restricted to administrators.
            <br />
            <Button variant="link" asChild className="mt-4 text-accent hover:text-primary">
              <Link href="/">Return to Homepage</Link>
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  // Basic admin layout, can be expanded with sidebar navigation for admin sections
  return (
    <div className="container mx-auto px-4 py-12">
       <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 pb-4 border-b border-border">
        <div>
          <h1 className="font-headline text-4xl text-primary flex items-center">
            <Settings className="mr-3 h-10 w-10 text-accent" />
            Admin Panel
          </h1>
          <p className="text-muted-foreground">Manage character applications and site settings.</p>
        </div>
        {/* Add admin navigation links if there are multiple admin pages */}
        {siteConfig.adminNav && siteConfig.adminNav.length > 0 && (
           <nav className="mt-4 md:mt-0 flex space-x-2">
            {siteConfig.adminNav.map(item => (
              <Button variant="ghost" asChild key={item.href} className="text-muted-foreground hover:text-primary">
                <Link href={item.href}>
                  {item.icon && <item.icon className="mr-2 h-4 w-4" />}
                  {item.title}
                </Link>
              </Button>
            ))}
           </nav>
        )}
      </div>
      {children}
    </div>
  );
}
