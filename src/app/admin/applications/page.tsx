
"use client";

import ApplicationsTable from "@/components/admin/applications-table";
import type { CharacterApplication } from "@/types";
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";
import { approveCharacter } from "../actions"; // Import server action
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

// Mock data - updated to include 'category'
const initialApplications: CharacterApplication[] = [
  { id: 'app1', userId: 'player1', userName: 'Brave Wanderer', characterName: 'Lyra Nightingale', title: 'Songstress of the Vale', story: 'Her voice can soothe the savage beast or rally armies. She seeks forgotten melodies to restore balance to the land.', race: 'Half-elf', characterClass: 'Bard', description: 'A charismatic performer with a mysterious past and a lute that seems to hum with ancient power.', category: 'eternal', status: 'pending', submissionDate: new Date(Date.now() - 86400000 * 2).toISOString() },
  { id: 'app2', userId: 'player2', userName: 'Grim Storyteller', characterName: 'Vorlag Ironhide', story: 'A stoic dwarf warrior who lost his clan and now seeks to etch their memory into legend through his deeds.', race: 'Dwarf', characterClass: 'Fighter', description: 'Clad in heavy plate, Vorlag is a mountain of a dwarf, his eyes holding a deep sorrow and unyielding determination.', category: 'forgotten', status: 'pending', submissionDate: new Date(Date.now() - 86400000 * 1).toISOString() },
  { id: 'app3', userId: 'player3', userName: 'Mystic Seeker', characterName: 'Zephyr Quickpaw', title: 'The Silent Shadow', story: 'Orphaned and raised by a secretive order, Zephyr moves unseen, righting wrongs from the darkness.', race: 'Kenku', characterClass: 'Rogue (Assassin)', description: 'A small, nimble figure often mistaken for a common crow, but deadly with daggers and whispers.', category: 'rumor', status: 'accepted', submissionDate: new Date(Date.now() - 86400000 * 5).toISOString(), reviewedBy: 'admin1', reviewDate: new Date(Date.now() - 86400000 * 4).toISOString() },
  { id: 'app4', userId: 'player4', userName: 'Arcane Scholar', characterName: 'Malakor the Mad', story: 'Obsessed with forbidden lore, Malakor delved too deep and now wields chaotic magic he barely controls.', race: 'Human', characterClass: 'Sorcerer (Wild Magic)', description: 'Eyes crackling with untamed energy, Malakor is as dangerous to his allies as his foes. His intentions are inscrutable.', category: 'rumor', status: 'rejected', rejectionReason: 'Character concept too disruptive for current campaign setting. Potential for excessive friendly fire.', submissionDate: new Date(Date.now() - 86400000 * 7).toISOString(), reviewedBy: 'admin1', reviewDate: new Date(Date.now() - 86400000 * 6).toISOString() },
];


export default function AdminApplicationsPage() {
  const [applications, setApplications] = useState<CharacterApplication[]>(initialApplications);
  const [filter, setFilter] = useState<'all' | 'pending' | 'accepted' | 'rejected'>('pending');
  const router = useRouter();
  const { toast } = useToast();

  // In a real app, you'd fetch this data
  useEffect(() => {
    // fetchApplications().then(setApplications);
  }, []);

  const handleUpdateApplication = async (id: string, status: 'accepted' | 'rejected', reason?: string) => {
    const appToUpdate = applications.find(app => app.id === id);
    if (!appToUpdate) return;

    if (status === 'accepted') {
      const result = await approveCharacter(appToUpdate); // Call server action
      if (result.success) {
        toast({
          title: "Character Approved & Published!",
          description: `${appToUpdate.characterName} is now live in the ${appToUpdate.category} archives.`,
        });
        router.refresh(); // Refresh server components
      } else {
        toast({
          title: "Approval Failed",
          description: result.message || "Could not publish the character.",
          variant: "destructive",
        });
        return; // Don't update local state if server action fails
      }
    }
    
    setApplications(prevApps => 
      prevApps.map(app => 
        app.id === id 
        ? { ...app, status, rejectionReason: reason, reviewedBy: 'admin1', reviewDate: new Date().toISOString() } 
        : app
      )
    );
    
    if (status === 'rejected') {
        toast({
          title: "Application Rejected",
          description: `${appToUpdate.characterName}'s application has been rejected.`,
        });
    }
  };
  
  const filteredApplications = applications.filter(app => {
    if (filter === 'all') return true;
    return app.status === filter;
  });

  return (
    <Card className="shadow-xl">
      <CardHeader>
        <div className="flex items-center space-x-3 mb-2">
            <FileText className="h-8 w-8 text-accent" />
            <CardTitle className="font-headline text-3xl text-primary">Character Applications</CardTitle>
        </div>
        <CardDescription>
          Review and manage submitted character applications. Accept or reject them with appropriate reasoning. Accepted characters will be published.
        </CardDescription>
        {/* Add filter buttons here for 'all', 'pending', 'accepted', 'rejected' */}
         <div className="flex space-x-2 mt-4">
          {(['pending', 'accepted', 'rejected', 'all'] as const).map(f => (
            <Button
              key={f}
              variant={filter === f ? 'default' : 'outline'}
              onClick={() => setFilter(f)}
              className="capitalize"
            >
              {f}
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <ApplicationsTable applications={filteredApplications} onUpdateApplication={handleUpdateApplication} />
      </CardContent>
    </Card>
  );
}
