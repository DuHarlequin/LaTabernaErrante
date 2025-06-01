
import CharacterCard from "@/components/characters/character-card";
import { siteConfig } from "@/config/site";
import { ScrollText } from "lucide-react";
import { getRumoredCharacters } from "@/lib/character-db"; // Import from DB

export const metadata = {
  title: "Rumored Characters",
  description: siteConfig.mainNav.find(item => item.href === "/characters/rumors")?.description,
};

export default async function RumoredCharactersPage() {
  const rumoredCharacters = getRumoredCharacters(); // Fetch from DB
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <div className="inline-block p-3 bg-accent/10 rounded-full mb-4">
            <ScrollText className="h-12 w-12 text-accent" />
        </div>
        <h1 className="font-headline text-5xl font-bold text-primary mb-4">Rumored Characters</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
         {metadata.description} These are the whispers on the wind, the tales told in hushed tones. Are they real, or mere figments of imagination?
        </p>
      </div>

      {rumoredCharacters.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rumoredCharacters.map((character) => (
            <CharacterCard key={character.id} character={character} />
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground text-lg">The winds carry no new rumors today. The archives are quiet.</p>
      )}
    </div>
  );
}
