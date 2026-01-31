
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceArea } from 'recharts';
import { 
  Heart, Share2, Zap, Flame, User, Globe, Info, 
  ChevronDown, ChevronUp, Star, ShieldCheck, 
  ShieldAlert, BrainCircuit, Sparkles, Download, 
  Target, TrendingUp, AlertCircle
} from 'lucide-react';
import { MOCK_NFTS } from '../constants';
import HUDGauge from '../components/HUDGauge';
import VibeBadge from '../components/VibeBadge';
import CreatorCredBadge from '../components/CreatorCredBadge';
import { GoogleGenAI } from "@google/genai";

const PRICE_DATA = [
  { name: 'Feb 1', price: 0.8 },
  { name: 'Feb 3', price: 1.1 },
  { name: 'Feb 5', price: 1.05 },
  { name: 'Feb 7', price: 1.4 },
  { name: 'Feb 10', price: 1.25 },
  { name: 'Feb 12', price: 1.8 },
  { name: 'Now', price: 1.25 },
];

const NFTDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [showAiExplanation, setShowAiExplanation] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);
  const [isExplaining, setIsExplaining] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  
  const nft = MOCK_NFTS.find(n => n.id === id) || MOCK_NFTS[0];

  const gasFeeEmoji = () => ({ emoji: '😎', label: 'Low Gas', val: '0.002' });
  const gas = gasFeeEmoji();

  const handleExplainAI = async () => {
    if (aiAnalysis) return;
    setIsExplaining(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Explain this NFT asset like a high-end cyberpunk art curator. 
                  Title: ${nft.title}
                  Vibes: ${nft.vibeTags.join(', ')}
                  Creator: ${nft.creator}
                  Price: ${nft.price} ETH
                  Include style analysis, cultural vibe, and why collectors might want this. Keep it under 100 words, use Gen-Z slang but stay professional.`,
      });
      setAiAnalysis(response.text || "This piece is literally hitting different. The visual entropy combined with creator momentum creates a unique floor value. It's giving main character energy.");
    } catch (err) {
      setAiAnalysis("Analysis server is slightly glitched. But trust—this piece has zero-latency drip and high floor potential.");
    } finally {
      setIsExplaining(false);
    }
  };

  const playClick = () => {
    const audio = new Audio('https://www.soundjay.com/buttons/sounds/button-20.mp3');
    audio.volume = 0.05;
    audio.play().catch(() => {});
  };

  return (
    <div className="min-h-screen pt-12 pb-24 px-6 max-w-7xl mx-auto relative">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left: Artwork & HUDs */}
        <div className="space-y-6">
          <div className="relative group rounded-3xl overflow-hidden neon-border">
            <img 
              src={nft.image} 
              alt={nft.title} 
              className="w-full aspect-square object-cover"
            />
            
            {/* Authenticity Badge */}
            <div className="absolute top-6 left-6 z-20">
              {nft.authenticityStatus === 'Verified' ? (
                <div className="flex items-center gap-2 bg-emerald-500/20 backdrop-blur-xl border border-emerald-500/50 px-4 py-2 rounded-xl text-emerald-400 group/auth">
                   <ShieldCheck size={16} fill="currentColor" className="text-emerald-500" />
                   <span className="font-mono text-[10px] uppercase font-bold">Authenticity Verified</span>
                   <div className="absolute bottom-full left-0 mb-2 w-48 p-3 bg-black border border-white/10 rounded-xl opacity-0 group-hover/auth:opacity-100 pointer-events-none transition-opacity text-[8px] uppercase font-mono">
                     AI verified uniqueness, metadata integrity & wallet history.
                   </div>
                </div>
              ) : (
                <div className="flex items-center gap-2 bg-amber-500/20 backdrop-blur-xl border border-amber-500/50 px-4 py-2 rounded-xl text-amber-400">
                   <ShieldAlert size={16} fill="currentColor" className="text-amber-500" />
                   <span className="font-mono text-[10px] uppercase font-bold">Similarity Detected</span>
                </div>
              )}
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="absolute bottom-6 left-6 flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/20 px-4 py-2 rounded-xl">
               <span className="w-2 h-2 rounded-full bg-violet-500 shadow-[0_0_8px_#8b5cf6]"></span>
               <span className="font-mono text-[10px] uppercase font-bold tracking-widest">{nft.rarity}</span>
            </div>
          </div>

          {/* AI Confidence HUD */}
          {nft.aiPriced && (
            <HUDGauge value={nft.aiConfidence || 85} demand={nft.aiDemand || 'Medium'} />
          )}

          {/* Price History / Simulation Chart */}
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-8 group overflow-hidden">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-black italic uppercase flex items-center gap-2">
                <Zap size={20} className="text-cyan-500 group-hover:animate-pulse" /> Price Dynamics
              </h3>
              <button 
                onClick={() => { setIsSimulating(!isSimulating); playClick(); }}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-mono border transition-all ${
                  isSimulating ? 'bg-pink-500 border-pink-500 text-white' : 'border-zinc-800 text-zinc-500 hover:border-zinc-500'
                }`}
              >
                <BrainCircuit size={12} />
                {isSimulating ? 'SIMULATING...' : '🔮 SIMULATE FUTURE'}
              </button>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={[...PRICE_DATA, ...(isSimulating ? [
                  { name: '7d', price: 1.4, max: 1.6, min: 1.2 },
                  { name: '30d', price: 1.7, max: 2.2, min: 1.3 },
                  { name: '90d', price: 2.1, max: 3.5, min: 1.5 },
                ] : [])]}>
                  <defs>
                    <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ec4899" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#ec4899" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorFuture" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Tooltip 
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-black/90 border border-pink-500/50 p-4 rounded-xl backdrop-blur-md shadow-[0_0_20px_rgba(236,72,153,0.3)]">
                            <p className="text-[10px] font-mono text-zinc-500 uppercase">{payload[0].payload.name}</p>
                            <p className="text-lg font-black italic text-pink-500">{payload[0].value} ETH</p>
                            {payload[0].payload.max && (
                              <p className="text-[8px] font-mono text-cyan-400 mt-1 uppercase">Projected: {payload[0].payload.min} - {payload[0].payload.max} ETH</p>
                            )}
                          </div>
                        );
                      }
                      return null;
                    }}
                    cursor={{ stroke: '#ec4899', strokeWidth: 2, strokeDasharray: '4 4' }}
                  />
                  {isSimulating && (
                    <Area 
                      type="monotone" 
                      dataKey="max" 
                      stroke="transparent" 
                      fill="url(#colorFuture)" 
                      animationDuration={1500}
                    />
                  )}
                  <Area 
                    type="monotone" 
                    dataKey="price" 
                    stroke="#ec4899" 
                    strokeWidth={4} 
                    fillOpacity={1} 
                    fill="url(#colorPrice)"
                    animationDuration={1500}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            {isSimulating && (
               <div className="mt-4 p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-xl">
                 <p className="text-[9px] font-mono text-cyan-400 uppercase italic leading-tight">
                    Disclaimer: AI simulation based on current market velocity. Not financial advice. Dyor or get rekt.
                 </p>
               </div>
            )}
          </div>
        </div>

        {/* Right: Info */}
        <div className="space-y-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-5xl md:text-6xl font-black italic tracking-tighter uppercase leading-none mb-4">
                {nft.title}
              </h1>
              <div className="flex flex-wrap gap-2 mb-6">
                {nft.vibeTags?.map(vibe => (
                  <VibeBadge key={vibe} label={vibe} />
                ))}
              </div>
              <div className="flex flex-wrap gap-4 items-center">
                 <div className="flex items-center gap-2">
                    <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-violet-500 p-[1px]">
                      <div className="w-full h-full rounded-full bg-zinc-900 flex items-center justify-center overflow-hidden">
                         <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${nft.creator}`} alt="avatar" />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        <p className="text-[10px] text-zinc-500 font-mono">CREATOR</p>
                        <Star size={8} className="text-amber-500 fill-amber-500" />
                      </div>
                      <p className="text-xs font-bold hover:text-pink-500 cursor-pointer">@{nft.creator}</p>
                    </div>
                 </div>
                 <CreatorCredBadge score={nft.creatorScore || 90} />
              </div>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => { setIsShareModalOpen(true); playClick(); }}
                className="p-3 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-pink-500 hover:text-pink-500 transition-all" 
                title="Share Personality Card"
              >
                <Download size={20} />
              </button>
              <button className="p-3 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-pink-500 transition-colors">
                <Heart size={20} />
              </button>
              <button className="p-3 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-cyan-500 transition-colors">
                <Share2 size={20} />
              </button>
            </div>
          </div>

          {/* AI Explain Button & Analysis */}
          <div className="space-y-4">
            <button 
              onClick={() => { handleExplainAI(); playClick(); }}
              disabled={isExplaining}
              className="group flex items-center gap-3 px-6 py-3 bg-zinc-900 border border-white/10 rounded-2xl hover:border-cyan-500 transition-all text-sm font-bold italic uppercase"
            >
              <BrainCircuit size={18} className={`text-cyan-500 ${isExplaining ? 'animate-spin' : 'group-hover:scale-110'}`} />
              {isExplaining ? 'Processing Brainwaves...' : '🧠 Explain This NFT'}
            </button>
            
            {aiAnalysis && (
               <div className="p-6 bg-cyan-500/5 border border-cyan-500/20 rounded-3xl animate-in slide-in-from-top duration-500">
                  <h4 className="text-[10px] font-black italic text-cyan-500 mb-2 uppercase flex items-center gap-2">
                    <Sparkles size={12} /> Curator Analysis
                  </h4>
                  <p className="text-sm font-mono text-zinc-300 leading-relaxed">
                    {aiAnalysis}
                  </p>
               </div>
            )}
          </div>

          {/* AI Buyer Matchmaking */}
          <div className="bg-zinc-900/30 border border-zinc-800 p-6 rounded-3xl">
             <h4 className="text-[10px] font-black italic text-zinc-500 mb-4 uppercase flex items-center gap-2">
               <Target size={14} /> Who is this for? (AI Matchmaking)
             </h4>
             <div className="flex flex-wrap gap-2">
                {nft.matchmakingPersonas?.map(p => (
                  <span key={p} className="px-3 py-1.5 bg-zinc-800 border border-white/5 rounded-lg text-[10px] font-mono text-zinc-400 uppercase">
                    {p}
                  </span>
                ))}
             </div>
          </div>

          {/* AI Explanation Panel */}
          {nft.aiPriced && (
            <div className="border border-white/5 rounded-2xl bg-zinc-900/30 overflow-hidden">
               <button 
                onClick={() => { setShowAiExplanation(!showAiExplanation); playClick(); }}
                className="w-full flex justify-between items-center p-4 hover:bg-white/5 transition-colors"
               >
                 <div className="flex items-center gap-2">
                    <TrendingUp size={14} className="text-cyan-500" />
                    <span className="text-[10px] font-black italic uppercase tracking-widest">Pricing Rationalization</span>
                 </div>
                 {showAiExplanation ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
               </button>
               
               {showAiExplanation && (
                 <div className="p-4 pt-0 animate-in slide-in-from-top duration-300">
                    <ul className="space-y-3">
                      {(nft.aiExplanation || [
                        "Social sentiment score is currently over-indexed.",
                        "Visual pattern analysis suggests high long-term retention.",
                        "Secondary floor is firming up across the collection."
                      ]).map((point, idx) => (
                        <li key={idx} className="flex gap-2 text-[10px] font-mono text-zinc-400 uppercase leading-relaxed">
                          <span className="text-cyan-500">→</span> {point}
                        </li>
                      ))}
                    </ul>
                 </div>
               )}
            </div>
          )}

          {/* Pricing Section */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-4">
               {nft.aiPriced && (
                 <div className="flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/50 rounded-full text-[10px] font-mono text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.2)]">
                   <Zap size={10} fill="currentColor" className="animate-pulse" /> AI VALUATED
                 </div>
               )}
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                   <p className="text-xs font-mono text-zinc-500 mb-2 uppercase flex items-center gap-1">
                    Price <span title="Gas fees and market taxes included in estimates"><Info size={10} className="cursor-help" /></span>
                   </p>
                   <div className="flex items-baseline gap-3">
                      <span className="text-5xl font-black italic group-hover:text-pink-500 transition-colors">{nft.price} ETH</span>
                      <span className="text-zinc-500 font-mono text-sm">$ {(nft.price * 2450.21).toLocaleString()}</span>
                   </div>
                   
                   {/* Gas UX Improvement */}
                   <div className="mt-4 flex items-center gap-2 bg-black/40 border border-white/5 w-fit px-3 py-1.5 rounded-full group/gas cursor-help">
                      <span className="text-sm">{gas.emoji}</span>
                      <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest">Est. Gas: <span className="text-emerald-400">{gas.val} ETH</span></span>
                      <div className="absolute bottom-full left-0 mb-2 w-48 p-3 bg-black border border-white/10 rounded-xl opacity-0 group-hover/gas:opacity-100 pointer-events-none transition-opacity text-[8px] uppercase font-mono z-50">
                        Low network congestion detected. Minting is cheap right now.
                      </div>
                   </div>
                </div>
                <div className="flex flex-col gap-3">
                   <button className="w-full py-5 bg-white text-black font-black italic text-xl skew-x-[-12deg] hover:bg-pink-500 hover:text-white transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(236,72,153,0.4)]">
                     <span className="inline-block skew-x-[12deg]">BUY NOW</span>
                   </button>
                   <button className="w-full py-5 border-2 border-white/20 text-white font-black italic text-xl skew-x-[-12deg] hover:border-cyan-500 transition-all">
                     <span className="inline-block skew-x-[12deg]">PLACE BID</span>
                   </button>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Personality Share Modal */}
      {isShareModalOpen && (
        <div className="fixed inset-0 z-[500] flex items-center justify-center p-6 bg-black/90 backdrop-blur-sm animate-in fade-in duration-300">
           <div className="max-w-md w-full bg-[#080808] border border-white/10 rounded-[3rem] p-8 shadow-[0_0_50px_rgba(0,0,0,1)] relative overflow-hidden group">
              <div className="absolute inset-0 bg-grid-white/[0.02] -z-10"></div>
              <button onClick={() => setIsShareModalOpen(false)} className="absolute top-6 right-6 text-zinc-500 hover:text-white">
                <X size={24} />
              </button>
              
              <div className="aspect-square rounded-2xl overflow-hidden mb-6 neon-border">
                <img src={nft.image} className="w-full h-full object-cover" />
              </div>
              
              <div className="text-center space-y-4">
                 <h2 className="text-3xl font-black italic uppercase tracking-tighter">{nft.title}</h2>
                 <div className="flex justify-center gap-2">
                    {nft.vibeTags.map(v => <VibeBadge key={v} label={v} />)}
                 </div>
                 
                 <div className="grid grid-cols-2 gap-4 mt-8">
                    <div className="bg-zinc-900/50 p-4 rounded-2xl border border-white/5">
                       <p className="text-[10px] font-mono text-zinc-500 uppercase">AI CONFIDENCE</p>
                       <p className="text-xl font-black italic text-pink-500">{nft.aiConfidence}%</p>
                    </div>
                    <div className="bg-zinc-900/50 p-4 rounded-2xl border border-white/5">
                       <p className="text-[10px] font-mono text-zinc-500 uppercase">CREATOR CRED</p>
                       <p className="text-xl font-black italic text-cyan-500">{nft.creatorScore}</p>
                    </div>
                 </div>

                 <button className="w-full py-4 mt-6 bg-white text-black font-black italic uppercase rounded-xl hover:bg-pink-500 hover:text-white transition-all flex items-center justify-center gap-2">
                    <Download size={18} /> Download Share Card
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

// Dummy X for the modal close
const X = ({ size, className }: { size: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

export default NFTDetail;
