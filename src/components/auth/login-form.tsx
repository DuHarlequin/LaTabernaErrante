"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/auth-context";
import Link from "next/link";
import { Wand2 } from "lucide-react";
import { useState } from "react";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

export default function LoginForm() {
  const { login, loading } = useAuth();
  const [isLoggingInAsAdmin, setIsLoggingInAsAdmin] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // In a real app, you'd send values.email and values.password to your auth endpoint
    // For this mock, we just call login. For admin login, we pass 'admin' role.
    console.log("Login attempt with:", values);
    if (values.email.toLowerCase() === 'admin@wanderersarchive.com') {
      setIsLoggingInAsAdmin(true);
      login('admin');
    } else {
      setIsLoggingInAsAdmin(false);
      login('player');
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto shadow-xl">
      <CardHeader className="text-center">
        <div className="inline-block p-3 bg-accent/10 rounded-full mb-4 mx-auto w-fit">
          <Wand2 className="h-10 w-10 text-accent" />
        </div>
        <CardTitle className="font-headline text-3xl text-primary">Welcome Back, Wanderer</CardTitle>
        <CardDescription>Enter your credentials to access your archive.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="your.email@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={loading || isLoggingInAsAdmin}>
              {loading && !isLoggingInAsAdmin ? "Signing In..." : isLoggingInAsAdmin ? "Signing In as Admin..." : "Sign In"}
            </Button>
            <Button type="button" variant="secondary" className="w-full" onClick={() => {
              form.setValue("email", "admin@wanderersarchive.com");
              form.setValue("password", "password"); // Mock password for admin
              setIsLoggingInAsAdmin(true);
              login('admin');
            }} disabled={loading}>
              {loading && isLoggingInAsAdmin ? "Signing In as Admin..." : "Quick Sign In as Admin"}
            </Button>
          </form>
        </Form>
        <p className="mt-6 text-center text-sm text-muted-foreground">
          New to the Archive?{" "}
          <Button variant="link" asChild className="p-0 text-accent hover:text-primary">
            <Link href="/auth/register">
              Create an account
            </Link>
          </Button>
        </p>
      </CardContent>
    </Card>
  );
}
