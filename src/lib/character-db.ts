
import type { Character } from '@/types';

// Initial data for Eternal Characters
const initialEternalCharacters: Character[] = [
  { id: 'e1', name: 'Archon Valerius', title: 'The First Flame', story: 'A beacon of hope in the darkest age...', race: 'Aasimar', characterClass: 'Celestial Warlock', description: 'Radiant and powerful, Valerius is said to be a direct servant of a benevolent solar deity, his presence alone can turn the tide of despair.', category: 'eternal', imageUrl: 'https://placehold.co/600x400.png' },
  { id: 'e2', name: 'Lyra Nightwind', title: 'The Star-Singer', story: 'Her melodies shaped mountains and calmed seas...', race: 'Elf', characterClass: 'Bard (College of Creation)', description: 'An ancient elven enchantress whose songs are woven into the very fabric of the world, rumored to still wander hidden groves.', category: 'eternal', imageUrl: 'https://placehold.co/600x400.png' },
  { id: 'e3', name: 'King Borin Stonebeard', title: 'The Unbreakable Mountain', story: 'Forged the great dwarven alliance...', race: 'Dwarf', characterClass: 'Battle Master Fighter', description: 'The legendary dwarven king who united the clans against the subterranean horrors, his axe and shield are relics of immense power.', category: 'eternal', imageUrl: 'https://placehold.co/600x400.png' },
];

// Initial data for Forgotten Characters
const initialForgottenCharacters: Character[] = [
  { id: 'f1', name: 'Seraphina "Spark" Quickfoot', title: 'The Vanished Tinker', story: 'Her inventions could change the world, if only anyone remembered her...', race: 'Gnome', characterClass: 'Artificer (Armorer)', description: 'A brilliant gnome whose workshop disappeared overnight, leaving behind only rumors of incredible clockwork devices.', category: 'forgotten', imageUrl: 'https://placehold.co/600x400.png' },
  { id: 'f2', name: 'Kaelen of the Wastes', title: 'The Last Guardian', story: 'He stood alone against the blight, his sacrifice unrecorded...', race: 'Human', characterClass: 'Oath of the Ancients Paladin', description: 'A solitary knight who defended a now-lost kingdom from a creeping corruption. His name is only found in fragmented, weathered texts.', category: 'forgotten', imageUrl: 'https://placehold.co/600x400.png' },
];

// Initial data for Rumored Characters
const initialRumoredCharacters: Character[] = [
  { id: 'r1', name: 'The Hooded Cartographer', title: 'Mapper of a Thousand Worlds', story: 'They say he possesses maps to realms beyond mortal ken...', race: 'Unknown', characterClass: 'Wizard (School of Scribing?)', description: 'A mysterious figure seen only at twilight in ancient libraries, always seeking forgotten charts and star-maps.', category: 'rumor', imageUrl: 'https://placehold.co/600x400.png' },
  { id: 'r2', name: 'Lady of the Obsidian Mirror', story: 'Said to grant glimpses of the future, for a terrible price...', race: 'Tiefling (Suspected)', characterClass: 'Sorcerer (Shadow Magic)', description: 'A recluse dwelling in a shattered citadel, her name is whispered in hushed tones by those seeking forbidden knowledge.', category: 'rumor', imageUrl: 'https://placehold.co/600x400.png' },
  { id: 'r3', name: 'Gronk the Undefeated', title: 'Pit Fighter Extraordinaire', story: 'Legend says no blade has ever drawn his blood...', race: 'Goliath', characterClass: 'Path of the Totem Warrior Barbarian', description: 'A champion of clandestine fighting pits, some say he is more beast than man, fueled by an unyielding rage.', category: 'rumor', imageUrl: 'https://placehold.co/600x400.png' },
];

// In-memory store
export let eternalCharactersDB: Character[] = [...initialEternalCharacters];
export let forgottenCharactersDB: Character[] = [...initialForgottenCharacters];
export let rumoredCharactersDB: Character[] = [...initialRumoredCharacters];

export function getEternalCharacters(): Character[] {
  return eternalCharactersDB;
}
export function getForgottenCharacters(): Character[] {
  return forgottenCharactersDB;
}
export function getRumoredCharacters(): Character[] {
  return rumoredCharactersDB;
}

export const addEternalCharacterToDB = (char: Character) => {
  if (!eternalCharactersDB.find(c => c.id === char.id)) {
    eternalCharactersDB = [char, ...eternalCharactersDB];
  }
};

export const addForgottenCharacterToDB = (char: Character) => {
  if (!forgottenCharactersDB.find(c => c.id === char.id)) {
    forgottenCharactersDB = [char, ...forgottenCharactersDB];
  }
};

export const addRumoredCharacterToDB = (char: Character) => {
  if (!rumoredCharactersDB.find(c => c.id === char.id)) {
    rumoredCharactersDB = [char, ...rumoredCharactersDB];
  }
};
