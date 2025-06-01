"use client";

import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit3, Mail, Shield, User as UserIcon, Wand2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login?redirect=/profile");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center space-y-4">
          <Skeleton className="h-32 w-32 rounded-full" />
          <Skeleton className="h-8 w-1/2" />
          <Skeleton className="h-6 w-1/3" />
        </div>
        <div className="mt-10 grid md:grid-cols-2 gap-6">
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-40 w-full" />
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center items-center min-h-[calc(100vh-10rem)]">
        <Alert variant="destructive" className="max-w-lg">
          <Terminal className="h-4 w-4" />
          <AlertTitle className="font-headline">Access Denied</AlertTitle>
          <AlertDescription>
            You must be logged in to view your profile. Please log in or create an account.
          </AlertDescription>
        </Alert>
      </div>
    );
  }
  
  const getInitials = (name?: string) => {
    if (!name) return "U";
    const names = name.split(' ');
    if (names.length === 1) return names[0][0].toUpperCase();
    return names[0][0].toUpperCase() + names[names.length - 1][0].toUpperCase();
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="max-w-3xl mx-auto shadow-xl">
        <CardHeader className="text-center">
          <Avatar className="h-32 w-32 mx-auto mb-4 border-4 border-accent shadow-lg">
            <AvatarImage src={user.avatarUrl} alt={user.name || user.email} data-ai-hint="fantasy portrait" />
            <AvatarFallback className="text-4xl font-headline bg-muted-foreground text-background">{getInitials(user.name)}</AvatarFallback>
          </Avatar>
          <CardTitle className="font-headline text-4xl text-primary">{user.name || "Wanderer"}</CardTitle>
          <CardDescription className="text-lg text-muted-foreground">{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-3 p-3 bg-card-foreground/5 rounded-md">
            <Mail className="h-5 w-5 text-accent" />
            <span className="text-muted-foreground">Email:</span>
            <span className="font-medium">{user.email}</span>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-card-foreground/5 rounded-md">
            <UserIcon className="h-5 w-5 text-accent" />
            <span className="text-muted-foreground">User ID:</span>
            <span className="font-medium text-xs">{user.id}</span>
          </div>

          {user.role === 'admin' && (
            <div className="flex items-center space-x-3 p-3 bg-accent/10 rounded-md border border-accent">
              <Shield className="h-5 w-5 text-accent" />
              <span className="font-semibold text-accent">You have Administrator privileges.</span>
            </div>
          )}

          <div className="mt-8 text-center space-y-3">
            <Button variant="outline" className="w-full md:w-auto md:mr-2">
              <Edit3 className="mr-2 h-4 w-4" /> Edit Profile
            </Button>
             <Button asChild className="w-full md:w-auto bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="/characters/new">
                <Wand2 className="mr-2 h-4 w-4" /> Submit New Character
              </Link>
            </Button>
          </div>
          
          <div className="mt-8 border-t border-border pt-6">
            <h3 className="font-headline text-xl text-primary mb-3">Your Character Submissions</h3>
            {/* This would list user's submitted characters. For now, a placeholder. */}
            <p className="text-muted-foreground text-sm">
              You have not submitted any characters yet. Start by {" "}
              <Button variant="link" asChild className="p-0 text-accent hover:text-primary"><Link href="/characters/new">submitting a new character</Link></Button>.
            </p>
          </div>

        </CardContent>
      </Card>
    </div>
  );
}
