
'use server';

import { revalidatePath } from 'next/cache';
import type { CharacterApplication, Character } from '@/types';
import { 
  addEternalCharacterToDB, 
  addForgottenCharacterToDB, 
  addRumoredCharacterToDB 
} from '@/lib/character-db';

export async function approveCharacter(application: CharacterApplication): Promise<{success: boolean, message?: string}> {
  if (!application.category) {
    console.error("Application is missing category:", application);
    return { success: false, message: "Application is missing a category." };
  }

  const newCharacter: Character = {
    id: `char-approved-${application.id}-${Date.now()}`, // Ensure unique ID for the character
    name: application.characterName,
    title: application.title,
    story: application.story,
    race: application.race,
    characterClass: application.characterClass,
    description: application.description,
    category: application.category,
    imageUrl: 'https://placehold.co/600x400.png', // Default image, could be enhanced
    submittedBy: application.userName || application.userId,
  };

  try {
    switch (application.category) {
      case 'eternal':
        addEternalCharacterToDB(newCharacter);
        revalidatePath('/characters/eternal');
        break;
      case 'forgotten':
        addForgottenCharacterToDB(newCharacter);
        revalidatePath('/characters/forgotten');
        break;
      case 'rumor':
        addRumoredCharacterToDB(newCharacter);
        revalidatePath('/characters/rumors');
        break;
      default:
        console.warn(`Unknown category: ${application.category}`);
        return { success: false, message: `Unknown category: ${application.category}` };
    }
    revalidatePath('/'); // Revalidate home page if it shows characters
    return { success: true };
  } catch (error) {
    console.error("Error approving character:", error);
    return { success: false, message: "Failed to approve character." };
  }
}
