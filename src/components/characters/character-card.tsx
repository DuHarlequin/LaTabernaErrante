import type { Character } from "@/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ScrollText } from "lucide-react";

interface CharacterCardProps {
  character: Character;
}

export default function CharacterCard({ character }: CharacterCardProps) {
  const imageHintMap: Record<Character['category'], string> = {
    eternal: "epic fantasy hero",
    forgotten: "ancient warrior ghost",
    rumor: "mysterious cloaked figure"
  }
  return (
    <Card className="flex flex-col h-full bg-card/80 hover:shadow-2xl hover:border-accent transition-all duration-300 ease-in-out transform hover:-translate-y-1">
      <CardHeader>
        {character.imageUrl && (
          <div className="aspect-[4/3] relative w-full mb-4 rounded-t-lg overflow-hidden">
            <Image
              src={character.imageUrl}
              alt={character.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              data-ai-hint={imageHintMap[character.category] || "fantasy character"}
            />
          </div>
        )}
        <CardTitle className="font-headline text-2xl text-primary">{character.name}</CardTitle>
        {character.title && <CardDescription className="text-accent font-semibold">{character.title}</CardDescription>}
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-muted-foreground text-sm mb-2">
          <span className="font-semibold text-foreground">Race:</span> {character.race} | <span className="font-semibold text-foreground">Class:</span> {character.characterClass}
        </p>
        <p className="text-sm text-muted-foreground line-clamp-4">
          {character.description}
        </p>
      </CardContent>
      <CardFooter>
        {/* In a real app, this link would go to a character detail page */}
        <Button variant="link" asChild className="text-accent hover:text-primary p-0">
          <Link href={`/characters/${character.category}/${character.id}`}> {/* Assuming dynamic routes like this */}
            Read Full Saga <ScrollText className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
