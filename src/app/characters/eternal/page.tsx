
import CharacterCard from "@/components/characters/character-card";
import { siteConfig } from "@/config/site";
import { Shield } from "lucide-react";
import { getEternalCharacters } from "@/lib/character-db"; // Import from DB

export const metadata = {
  title: "Eternal Characters",
  description: siteConfig.mainNav.find(item => item.href === "/characters/eternal")?.description,
};

export default async function EternalCharactersPage() {
  const eternalCharacters = getEternalCharacters(); // Fetch from DB

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <div className="inline-block p-3 bg-accent/10 rounded-full mb-4">
            <Shield className="h-12 w-12 text-accent" />
        </div>
        <h1 className="font-headline text-5xl font-bold text-primary mb-4">Eternal Characters</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {metadata.description} These are the titans of history, whose sagas are sung by bards and studied by scholars.
        </p>
      </div>
      
      {eternalCharacters.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {eternalCharacters.map((character) => (
            <CharacterCard key={character.id} character={character} />
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground text-lg">No eternal characters found in the archives yet. The legends sleep.</p>
      )}
    </div>
  );
}
