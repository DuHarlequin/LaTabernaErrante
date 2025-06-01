import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { siteConfig } from "@/config/site";
import { Milestone, BookHeart, Users } from "lucide-react";
import Image from "next/image";

export const metadata = {
  title: "About the Tavern",
  description: siteConfig.mainNav.find(item => item.href === "/about")?.description,
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <div className="inline-block p-3 bg-accent/10 rounded-full mb-4">
          <Milestone className="h-12 w-12 text-accent" />
        </div>
        <h1 className="font-headline text-5xl font-bold text-primary mb-4">About the Wanderer's Archive</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Discover the story behind this mystical repository of legends and tales.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <Image 
            src="https://placehold.co/800x600.png" 
            alt="Mystical Tavern Interior" 
            width={800} 
            height={600} 
            className="rounded-lg shadow-xl object-cover"
            data-ai-hint="fantasy tavern interior"
          />
        </div>
        <div className="space-y-6">
          <h2 className="font-headline text-3xl text-primary">A Haven for Stories</h2>
          <p className="text-muted-foreground leading-relaxed">
            The Wanderer's Archive, often referred to as 'The Tavern at the Crossroads of Worlds', is more than just a collection of names and deeds. 
            It is a living, breathing sanctuary for the stories that shape realities. Here, amidst the scent of old parchment and spiced ale, 
            the sagas of heroes, villains, and enigmatic figures from countless realms are preserved and celebrated.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Founded by an enigmatic figure known only as 'The First Archivist', its purpose is to ensure that no tale of significance is ever truly lost to the mists of time or the indifference of mortals.
          </p>
        </div>
      </div>

      <Card className="mb-16 bg-card/80">
        <CardHeader>
          <CardTitle className="font-headline text-center text-3xl text-primary">Our Mission</CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-8 text-center">
          <div className="space-y-3 p-4">
            <div className="inline-block p-3 bg-accent/10 rounded-full">
              <BookHeart className="h-10 w-10 text-accent" />
            </div>
            <h3 className="font-headline text-xl text-primary">Preserve Every Legend</h3>
            <p className="text-muted-foreground">
              To diligently collect, verify, and safeguard the stories of all significant individuals, ensuring their legacies endure for eons.
            </p>
          </div>
          <div className="space-y-3 p-4">
            <div className="inline-block p-3 bg-accent/10 rounded-full">
              <Users className="h-10 w-10 text-accent" />
            </div>
            <h3 className="font-headline text-xl text-primary">Connect the Chroniclers</h3>
            <p className="text-muted-foreground">
              To provide a space for wanderers, adventurers, and storytellers to share their encounters and contribute to the ever-growing tapestry of lore.
            </p>
          </div>
        </CardContent>
      </Card>
      
      <div className="text-center">
        <h2 className="font-headline text-3xl text-primary mb-4">The Archivists</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          A dedicated order of scribes, scholars, and mystics, the Archivists are sworn to uphold the sanctity of the stories within. They are the unseen hands that guide the quill, the watchful eyes that discern truth from fabrication, and the solemn voices that recite the ancient sagas. 
          Perhaps, you too, will join their ranks or contribute a legend worthy of their scrolls.
        </p>
      </div>
    </div>
  );
}
