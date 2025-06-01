import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { siteConfig } from "@/config/site";
import { ArrowRight, BookOpen, Shield, Users, ScrollText, Wand2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const features = [
    {
      title: "Eternal Characters",
      description: "Legends whose tales are etched in the stars, their valor echoing through ages.",
      icon: Shield,
      href: "/characters/eternal",
      imageHint: "epic knight"
    },
    {
      title: "Forgotten Heroes",
      description: "Brave souls whose stories faded into mist, awaiting rediscovery.",
      icon: Users,
      href: "/characters/forgotten",
      imageHint: "ancient ruins"
    },
    {
      title: "Whispers & Rumors",
      description: "Myths and whispers of characters yet unproven, their legends in the making.",
      icon: ScrollText,
      href: "/characters/rumors",
      imageHint: "mysterious figure"
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <section className="text-center mb-16 md:mb-24">
        <div className="inline-block p-4 bg-accent/10 rounded-lg mb-6">
          <Wand2 className="h-16 w-16 text-accent" />
        </div>
        <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tight text-primary mb-6">
          {siteConfig.name}
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
          {siteConfig.description} Step into a realm where every character has a story, every legend a beginning. Archive your heroes, explore ancient lore, and let the sagas unfold.
        </p>
        <div className="space-x-4">
          <Button size="lg" asChild className="font-semibold text-base px-8 py-6 bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="/characters/new">
              Weave a New Legend
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild className="font-semibold text-base px-8 py-6">
            <Link href="/lore">
              Explore the Lore
              <BookOpen className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      <section className="mb-16 md:mb-24">
        <h2 className="font-headline text-4xl md:text-5xl font-semibold text-center text-primary mb-12">
          Discover the Archives
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <Card key={feature.title} className="bg-card/80 hover:shadow-2xl hover:border-accent transition-all duration-300 ease-in-out transform hover:-translate-y-1">
              <CardHeader className="items-center text-center">
                <div className="p-3 bg-accent/10 rounded-full mb-3">
                  <feature.icon className="h-10 w-10 text-accent" />
                </div>
                <CardTitle className="font-headline text-2xl text-primary">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                 <Image 
                  src={`https://placehold.co/600x400.png`} 
                  alt={feature.title} 
                  width={600} 
                  height={400} 
                  className="rounded-md mb-4 object-cover aspect-[3/2]"
                  data-ai-hint={feature.imageHint}
                />
                <CardDescription className="text-muted-foreground">{feature.description}</CardDescription>
              </CardContent>
              <CardFooter className="justify-center">
                <Button variant="link" asChild className="text-accent hover:text-primary">
                  <Link href={feature.href}>
                    Explore {feature.title} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <section className="text-center py-12 bg-card/50 rounded-lg">
        <h2 className="font-headline text-4xl md:text-5xl font-semibold text-primary mb-6">Ready to Begin Your Journey?</h2>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
          Join the Wanderer's Archive today. Create your characters, share their tales, and become part of a growing tapestry of legends.
        </p>
        <Button size="lg" asChild className="font-semibold text-base px-8 py-6 bg-primary text-primary-foreground hover:bg-primary/90">
          <Link href="/auth/register">
            Register Your Account
          </Link>
        </Button>
      </section>
    </div>
  );
}
