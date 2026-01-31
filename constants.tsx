
import { NFT, ActivityEvent } from './types';

export const MOCK_NFTS: NFT[] = [
  {
    id: '1',
    title: 'GLITCHED SOUL #04',
    creator: 'Cyb3rPunk',
    price: 1.25,
    image: 'https://picsum.photos/seed/cyber1/800/800',
    rarity: 'Legendary',
    tags: ['Abstract', 'Neon'],
    vibeTags: ['🔥 Chaotic', '👁️ Glitchcore'],
    trending: true,
    aiPriced: true,
    aiConfidence: 92,
    aiDemand: 'High',
    creatorScore: 98,
    authenticityStatus: 'Verified',
    matchmakingPersonas: ['Hyper-Trend Spotters', 'Long-term HODLers'],
    aiExplanation: [
      "Visual complexity matches top 1% of secondary market performers.",
      "Creator momentum is vertical right now.",
      "Scarcity of 'Glitchcore' assets is peaking."
    ],
    projectedPrices: [
      { name: '7d', min: 1.3, max: 1.5 },
      { name: '30d', min: 1.4, max: 1.9 },
      { name: '90d', min: 1.6, max: 2.8 }
    ]
  },
  {
    id: '2',
    title: 'ACID RAIN DREAMS',
    creator: 'AcidBurn',
    price: 0.88,
    image: 'https://picsum.photos/seed/cyber2/800/800',
    rarity: 'Rare',
    tags: ['3D', 'Psychedelic'],
    vibeTags: ['🧠 Brainrot', '💜 Cyber Romantic'],
    trending: false,
    aiPriced: true,
    aiConfidence: 74,
    aiDemand: 'Medium',
    creatorScore: 85,
    authenticityStatus: 'Verified',
    matchmakingPersonas: ['Aesthetic Curators', 'Vibe Chasers'],
    aiExplanation: [
      "Secondary floor sweep in similar 3D categories suggests support.",
      "Vibe matches current high-engagement social trends.",
      "Medium liquidity score for this specific collection."
    ],
    projectedPrices: [
      { name: '7d', min: 0.85, max: 0.95 },
      { name: '30d', min: 0.9, max: 1.2 },
      { name: '90d', min: 1.1, max: 1.6 }
    ]
  },
  {
    id: '3',
    title: 'TOKYO NIGHTWALK',
    creator: 'NeonGhost',
    price: 2.1,
    image: 'https://picsum.photos/seed/cyber3/800/800',
    rarity: 'Artifact',
    tags: ['Cyberpunk'],
    vibeTags: ['🕶️ Dark Flex'],
    trending: true,
    aiPriced: false,
    aiConfidence: 88,
    aiDemand: 'High',
    creatorScore: 92,
    authenticityStatus: 'Verified',
    matchmakingPersonas: ['Alpha Hunters', 'Whales'],
    projectedPrices: [
      { name: '7d', min: 2.0, max: 2.4 },
      { name: '30d', min: 2.2, max: 3.1 },
      { name: '90d', min: 2.5, max: 4.5 }
    ]
  },
  {
    id: '4',
    title: 'DIGITAL ANARCHY',
    creator: 'SystemError',
    price: 0.45,
    image: 'https://picsum.photos/seed/cyber4/800/800',
    rarity: 'Common',
    tags: ['Graffiti'],
    vibeTags: ['🔥 Chaotic'],
    trending: true,
    aiPriced: true,
    aiConfidence: 61,
    aiDemand: 'Low',
    creatorScore: 40,
    authenticityStatus: 'Warning',
    matchmakingPersonas: ['Degens', 'Chaos Lovers'],
    projectedPrices: [
      { name: '7d', min: 0.4, max: 0.5 },
      { name: '30d', min: 0.35, max: 0.6 },
      { name: '90d', min: 0.4, max: 0.9 }
    ]
  }
];

export const MOCK_ACTIVITY: ActivityEvent[] = [
  { id: 'a1', type: 'SALE', user: 'rekt_saver', nftTitle: 'VOID_01', price: 0.5, timestamp: '2m' },
  { id: 'a2', type: 'MINT', user: 'pixel_drifter', nftTitle: 'NEON_LUNG', timestamp: '5m' },
  { id: 'a3', type: 'BID', user: 'whale_hunter', nftTitle: 'ARTIFACT_Z', price: 4.2, timestamp: '12m' },
  { id: 'a4', type: 'SALE', user: 'ghost_cat', nftTitle: 'PINK_NOISE', price: 0.12, timestamp: '22m' },
];
