
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Wand2 } from "lucide-react";
import type { Character } from "@/types";


const formSchema = z.object({
  characterName: z.string().min(2, { message: "Character name must be at least 2 characters." }).max(50, { message: "Character name must be 50 characters or less." }),
  title: z.string().max(50, { message: "Title must be 50 characters or less." }).optional(),
  race: z.string().min(2, { message: "Race must be at least 2 characters." }).max(30, { message: "Race must be 30 characters or less." }),
  characterClass: z.string().min(2, { message: "Class must be at least 2 characters." }).max(30, { message: "Class must be 30 characters or less." }),
  category: z.enum(['eternal', 'forgotten', 'rumor'], { required_error: "Please select a category." }),
  story: z.string().min(50, { message: "Story must be at least 50 characters." }).max(5000, { message: "Story must be 5000 characters or less." }),
  description: z.string().min(20, { message: "Description must be at least 20 characters." }).max(1000, { message: "Description must be 1000 characters or less." }),
});

export default function CharacterSubmissionForm() {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      characterName: "",
      title: "",
      race: "",
      characterClass: "",
      story: "",
      description: "",
      category: undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    console.log("Character application submitted:", values);
    // Simulate API call to submit application.
    // In a real app, this would go to your backend.
    // For this prototype, we'll assume it creates an application that an admin can see.
    // The actual addition to public lists happens upon admin approval.
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Application Submitted!",
      description: `Your character, ${values.characterName}, in category ${values.category} has been submitted for review.`,
      variant: "default", 
    });
    form.reset();
    setIsLoading(false);
    // Consider redirecting to a page where user sees their submissions or back to home.
    router.push("/"); 
  }

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-xl">
      <CardHeader>
        <div className="flex items-center space-x-3 mb-3">
          <div className="p-3 bg-accent/10 rounded-full">
            <Wand2 className="h-8 w-8 text-accent" />
          </div>
          <CardTitle className="font-headline text-3xl text-primary">Weave a New Legend</CardTitle>
        </div>
        <CardDescription>
          Complete the form below to submit your character for inclusion in the Wanderer's Archive. Share their epic tales and defining traits.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="characterName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Character Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Elara Meadowlight" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., The Shadow Whisper" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="race"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Race</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Elf, Dwarf, Human" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="characterClass"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Class</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Paladin, Rogue, Sorcerer" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category for your character" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="eternal">Eternal (Legends of great renown)</SelectItem>
                      <SelectItem value="forgotten">Forgotten (Heroes lost to time)</SelectItem>
                      <SelectItem value="rumor">Rumor (Whispers and myths)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Choose the category that best fits your character's story.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="story"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Character Story / Backstory</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us about your character's journey, their motivations, significant events..."
                      className="min-h-[150px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    A compelling narrative that brings your character to life.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brief Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="A short summary of your character's appearance, personality, and notable traits."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This will be shown on character listings.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <CardFooter className="px-0 pt-6">
              <Button type="submit" className="w-full md:w-auto bg-accent text-accent-foreground hover:bg-accent/90" disabled={isLoading}>
                {isLoading ? "Submitting..." : "Submit Character Application"}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
