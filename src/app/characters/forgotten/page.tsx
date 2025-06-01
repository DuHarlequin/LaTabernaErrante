
import CharacterCard from "@/components/characters/character-card";
import { siteConfig } from "@/config/site";
import { Users } from "lucide-react";
import { getForgottenCharacters } from "@/lib/character-db"; // Import from DB

export const metadata = {
  title: "Forgotten Characters",
  description: siteConfig.mainNav.find(item => item.href === "/characters/forgotten")?.description,
};

export default async function ForgottenCharactersPage() {
  const forgottenCharacters = getForgottenCharacters(); // Fetch from DB
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <div className="inline-block p-3 bg-accent/10 rounded-full mb-4">
            <Users className="h-12 w-12 text-accent" />
        </div>
        <h1 className="font-headline text-5xl font-bold text-primary mb-4">Forgotten Characters</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {metadata.description} Their deeds were mighty, their names lost to the winds of time, yet fragments of their tales linger.
        </p>
      </div>
      
      {forgottenCharacters.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {forgottenCharacters.map((character) => (
            <CharacterCard key={character.id} character={character} />
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground text-lg">The mists of time have claimed all forgotten heroes for now. Their stories await rediscovery.</p>
      )}
    </div>
  );
}
