
export interface UserTier {
  level: number;
  title: string;
}

export function calculateLevel(points: number): UserTier {
  if (points < 80) return { level: 1, title: 'Novice Saver' };
  if (points < 170) return { level: 2, title: 'Bronze Scout' };
  if (points < 270) return { level: 3, title: 'Silver Strategist' };
  if (points < 380) return { level: 4, title: 'Gold Architect' };
  if (points < 500) return { level: 5, title: 'Platinum Commander' };
  if (points < 630) return { level: 6, title: 'Diamond Vanguard' };
  if (points < 770) return { level: 7, title: 'Master Sovereign' };
  
  // Lvl 8+ logic: starts at 770, +150 each level
  const basePoints = 770;
  const additionalLevels = Math.floor((points - basePoints) / 150);
  const finalLevel = 8 + additionalLevels;
  
  return { 
    level: finalLevel, 
    title: `Sovereign Sage (Level ${finalLevel})` 
  };
}
