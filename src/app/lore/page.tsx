import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { siteConfig } from "@/config/site";
import { BookOpen, Feather, Map, Shield } from "lucide-react";
import Image from "next/image";

export const metadata = {
  title: "Lore of the Realms",
  description: siteConfig.mainNav.find(item => item.href === "/lore")?.description,
};

const loreSections = [
  {
    title: "The Sundering Ages",
    icon: Shield,
    summary: "Chronicles of ancient wars that shaped the continents and scattered the elder races.",
    imageHint: "epic battle fantasy",
  },
  {
    title: "Myths of Creation",
    icon: Feather, // Using Feather as a quill, representing writing/creation stories
    summary: "Diverse tales from various cultures describing the birth of the cosmos and the first gods.",
    imageHint: "cosmic creation fantasy",
  },
  {
    title: "Forgotten Empires",
    icon: Map,
    summary: "The rise and fall of mighty empires whose ruins now dot the landscapes, their secrets waiting to be unearthed.",
    imageHint: "ancient ruins fantasy",
  },
  {
    title: "The Nature of Magic",
    icon: BookOpen,
    summary: "Treatises on the arcane arts, the sources of magical power, and the great schools of wizardry.",
    imageHint: "magic spell book",
  }
];

export default function LorePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <div className="inline-block p-3 bg-accent/10 rounded-full mb-4">
          <BookOpen className="h-12 w-12 text-accent" />
        </div>
        <h1 className="font-headline text-5xl font-bold text-primary mb-4">The Great Library of Lore</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {metadata.description} Uncover the rich history, ancient myths, and foundational truths of the myriad realms cataloged within the Wanderer's Archive.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {loreSections.map((section, index) => (
          <Card key={index} className="bg-card/80 hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center space-x-4">
              <div className="p-3 bg-accent/10 rounded-full">
                <section.icon className="h-8 w-8 text-accent" />
              </div>
              <div>
                <CardTitle className="font-headline text-2xl text-primary">{section.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
               <Image 
                  src={`https://placehold.co/700x400.png`} 
                  alt={section.title} 
                  width={700} 
                  height={400} 
                  className="rounded-md mb-4 object-cover aspect-video"
                  data-ai-hint={section.imageHint}
                />
              <CardDescription className="text-muted-foreground leading-relaxed">
                {section.summary} This section is currently under development. More detailed chronicles will be added soon by our dedicated archivists.
              </CardDescription>
              {/* Future: Link to detailed lore page for this section */}
              {/* <Button variant="link" className="text-accent hover:text-primary p-0">Explore Further <ArrowRight className="ml-2 h-4 w-4" /></Button> */}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-16 text-center p-8 bg-card/50 rounded-lg">
        <h2 className="font-headline text-3xl text-primary mb-4">The Library Grows</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          The Lore section is a constantly expanding repository. Our scribes and explorers are always uncovering new fragments of history and forgotten tales. Check back often as more chapters of the world's saga are revealed.
        </p>
      </div>
    </div>
  );
}
