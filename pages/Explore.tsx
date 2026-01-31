
import React, { useState, useMemo } from 'react';
import { Search, Filter, SlidersHorizontal, Sparkles } from 'lucide-react';
import { MOCK_NFTS } from '../constants';
import NFTCard from '../components/NFTCard';
import VibeBadge from '../components/VibeBadge';

const Explore: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [activeVibe, setActiveVibe] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'low' | 'high'>('high');

  const filters = ['All', 'Art', 'Collectibles', 'Gaming', 'Cyberpunk'];
  const vibes = ['🔥 Chaotic', '🧠 Brainrot', '🕶️ Dark Flex', '💜 Cyber Romantic', '👁️ Glitchcore'];

  const filteredNFTs = useMemo(() => {
    let result = MOCK_NFTS.filter(nft => 
      nft.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      nft.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
      nft.vibeTags?.some(v => v.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    if (activeFilter !== 'All') {
      result = result.filter(nft => nft.tags.includes(activeFilter));
    }

    if (activeVibe) {
      result = result.filter(nft => nft.vibeTags?.includes(activeVibe));
    }

    return result.sort((a, b) => sortOrder === 'low' ? a.price - b.price : b.price - a.price);
  }, [searchQuery, activeFilter, activeVibe, sortOrder]);

  return (
    <div className="px-6 py-12 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-5xl font-black italic uppercase tracking-tighter mb-4">
          Explore the <span className="text-pink-500">Void</span>
        </h1>
        <div className="h-1 w-24 bg-gradient-to-r from-pink-500 to-transparent"></div>
      </div>

      {/* Filters Bar */}
      <div className="space-y-6 mb-12">
        <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
          <div className="relative w-full lg:max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
            <input 
              type="text" 
              placeholder="SEARCH BY TITLE, CREATOR, TAGS, VIBES..."
              className="w-full bg-zinc-900/50 border border-zinc-800 rounded-full py-4 pl-12 pr-6 text-xs font-mono outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {filters.map(f => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-5 py-2 rounded-full text-[10px] font-mono transition-all border ${
                  activeFilter === f 
                  ? 'bg-white text-black border-white' 
                  : 'bg-transparent text-zinc-400 border-zinc-800 hover:border-zinc-500'
                }`}
              >
                {f.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="flex gap-4 items-center">
            <div className="flex bg-zinc-900 border border-zinc-800 rounded-lg p-1">
              <button 
                onClick={() => setSortOrder('high')}
                className={`p-2 rounded ${sortOrder === 'high' ? 'bg-zinc-800 text-white' : 'text-zinc-500'}`}
              >
                <SlidersHorizontal size={18} />
              </button>
              <button 
                 onClick={() => setSortOrder('low')}
                 className={`p-2 rounded ${sortOrder === 'low' ? 'bg-zinc-800 text-white' : 'text-zinc-500'}`}
              >
                <Filter size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Vibe Selector */}
        <div className="flex flex-wrap gap-3 items-center">
          <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest mr-2">VIBE CHECK:</span>
          {vibes.map(v => (
            <VibeBadge 
              key={v} 
              label={v} 
              className={activeVibe === v ? 'scale-110' : 'opacity-40 grayscale hover:opacity-100 hover:grayscale-0'}
              onClick={() => setActiveVibe(activeVibe === v ? null : v)}
            />
          ))}
          {activeVibe && (
            <button 
              onClick={() => setActiveVibe(null)}
              className="text-[9px] font-mono text-zinc-500 hover:text-white underline underline-offset-4"
            >
              CLEAR VIBE
            </button>
          )}
        </div>
      </div>

      {/* Grid */}
      {filteredNFTs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredNFTs.map(nft => (
            <NFTCard key={nft.id} nft={nft} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-32 border-2 border-dashed border-zinc-900 rounded-3xl">
          <Sparkles size={48} className="text-zinc-700 mb-4 animate-pulse" />
          <p className="font-mono text-sm text-zinc-500 uppercase">Nothing found in this reality.</p>
        </div>
      )}

      {/* Load More */}
      <div className="mt-12 flex justify-center">
        <button className="px-12 py-4 border border-zinc-800 text-zinc-400 font-mono text-xs hover:text-white hover:border-white transition-all uppercase">
          Load More Chaos
        </button>
      </div>
    </div>
  );
};

export default Explore;
