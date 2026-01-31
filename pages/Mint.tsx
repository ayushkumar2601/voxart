
import React, { useState, useRef } from 'react';
import { Upload, X, Zap, Sparkles, Info, Heart } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import HUDGauge from '../components/HUDGauge';

const Mint: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('0.1');
  const [isEstimating, setIsEstimating] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState<string | null>(null);
  const [aiConfidence, setAiConfidence] = useState<number | null>(null);
  const [mintStatus, setMintStatus] = useState<'idle' | 'minting' | 'success'>('idle');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(selectedFile);
    }
  };

  const getAIPricingSuggestion = async () => {
    if (!title) return;
    setIsEstimating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Analyze this NFT metadata and suggest a realistic floor price in ETH for an underground marketplace. 
                  Title: ${title}
                  Description: ${description}
                  Be humorous, use Gen-Z crypto slang, and return a single number as the recommended price followed by a one-sentence vibe-check.`,
        config: {
          thinkingConfig: { thinkingBudget: 0 }
        }
      });
      
      const text = response.text || "0.5 | This vibe is immaculate, definitely floor-breaker material.";
      setAiSuggestion(text);
      // Try to extract the number
      const match = text.match(/\d+(\.\d+)?/);
      if (match) setPrice(match[0]);
      setAiConfidence(Math.floor(Math.random() * (98 - 85 + 1)) + 85); // Simulated confidence
    } catch (err) {
      console.error("AI Pricing failed:", err);
      setAiSuggestion("1.0 | Our AI servers are fried from too much drip. Just guess it.");
      setAiConfidence(60);
    } finally {
      setIsEstimating(false);
    }
  };

  const handleMint = () => {
    setMintStatus('minting');
    setTimeout(() => setMintStatus('success'), 3000);
  };

  if (mintStatus === 'success') {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center animate-in fade-in zoom-in duration-500">
        <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center mb-8 shadow-[0_0_50px_#10b981]">
          <Zap size={48} className="text-white" fill="currentColor" />
        </div>
        <h1 className="text-6xl font-black italic uppercase mb-4 tracking-tighter">SUCCESS!</h1>
        <p className="text-zinc-400 font-mono text-sm max-w-md mb-8 uppercase tracking-widest">
          YOUR CHAOS HAS BEEN RECORDED ON THE BLOCKCHAIN FOREVER. WELCOME TO THE UNDERGROUND.
        </p>
        <button 
          onClick={() => window.location.hash = '#/explore'}
          className="px-12 py-4 bg-white text-black font-black italic text-lg skew-x-[-12deg] hover:bg-pink-500 hover:text-white transition-all"
        >
          <span className="inline-block skew-x-[12deg]">VIEW IN EXPLORE</span>
        </button>
      </div>
    );
  }

  return (
    <div className="px-6 py-12 max-w-4xl mx-auto">
      <div className="mb-12">
        <h1 className="text-5xl font-black italic uppercase tracking-tighter mb-4">
          Mint New <span className="text-lime-500">Chaos</span>
        </h1>
        <p className="text-zinc-500 font-mono text-xs uppercase">Transform your digital energy into an immutable asset.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Upload Area */}
        <div className="space-y-6">
          <div 
            onClick={() => fileInputRef.current?.click()}
            className={`relative aspect-square rounded-3xl border-2 border-dashed transition-all cursor-pointer overflow-hidden flex flex-col items-center justify-center group ${
              preview ? 'border-zinc-800' : 'border-zinc-800 hover:border-pink-500 hover:bg-pink-500/5'
            }`}
          >
            {preview ? (
              <>
                <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                <button 
                  onClick={(e) => { e.stopPropagation(); setPreview(null); setFile(null); }}
                  className="absolute top-4 right-4 p-2 bg-black/50 backdrop-blur-md rounded-full hover:bg-red-500 transition-colors"
                >
                  <X size={20} />
                </button>
              </>
            ) : (
              <div className="text-center p-8">
                <div className="w-16 h-16 bg-zinc-900 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                   <Upload className="text-zinc-500 group-hover:text-pink-500" />
                </div>
                <p className="font-black italic text-sm mb-1 uppercase tracking-tighter">Drag & Drop Art</p>
                <p className="text-[10px] font-mono text-zinc-600 uppercase">PNG, JPG, GIF (MAX 100MB)</p>
              </div>
            )}
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              className="hidden" 
              accept="image/*"
            />
          </div>

          {/* AI Preview HUD if available */}
          {aiConfidence && (
            <div className="animate-in slide-in-from-bottom duration-500">
               <HUDGauge value={aiConfidence} demand="High" />
            </div>
          )}

          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 flex gap-4">
            <Info className="text-zinc-500 shrink-0" size={20} />
            <p className="text-[10px] font-mono text-zinc-500 leading-relaxed uppercase">
              YOU ARE ABOUT TO MINT A NEW TOKEN ON THE ETHEREUM NETWORK. THIS ACTION IS IRREVERSIBLE. 
              ESTIMATED GAS: <span className="text-emerald-400 font-bold">0.005 ETH</span>.
            </p>
          </div>
        </div>

        {/* Form Area */}
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Artwork Title</label>
            <input 
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. CYBER_DEMON_01"
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-4 text-xs font-mono focus:border-pink-500 outline-none transition-all uppercase"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Description</label>
            <textarea 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              placeholder="THE LORE BEHIND THIS PIECE..."
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-4 text-xs font-mono focus:border-pink-500 outline-none transition-all uppercase resize-none"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center mb-1">
              <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">List Price (ETH)</label>
              <button 
                onClick={getAIPricingSuggestion}
                disabled={!title || isEstimating}
                className="flex items-center gap-1 text-[10px] font-mono text-cyan-500 hover:text-cyan-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isEstimating ? <Sparkles size={12} className="animate-spin" /> : <Zap size={12} fill="currentColor" />}
                {isEstimating ? 'AI VALUATING...' : 'GET AI VALUATION'}
              </button>
            </div>
            
            {aiSuggestion && (
              <div className="bg-cyan-500/10 border border-cyan-500/30 p-3 rounded-xl mb-4 animate-in slide-in-from-top duration-300">
                <p className="text-[10px] font-mono text-cyan-400 leading-tight">
                  <span className="font-bold">AI SAYS:</span> {aiSuggestion}
                </p>
              </div>
            )}

            <div className="relative">
              <input 
                type="number" 
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-4 text-xl font-black italic focus:border-pink-500 outline-none transition-all"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 font-mono text-xs text-zinc-600">ETH</span>
            </div>
          </div>

          {/* Gas Fee UX Indicator */}
          <div className="flex items-center justify-between p-4 bg-zinc-900 border border-zinc-800 rounded-xl">
             <div className="flex items-center gap-2">
               <span className="text-lg">😎</span>
               <span className="text-[10px] font-mono text-zinc-500 uppercase">Network Status: <span className="text-emerald-400">Low Congestion</span></span>
             </div>
             <span className="text-[10px] font-mono text-zinc-400">GAS: 12 GWEI</span>
          </div>

          <div className="pt-6">
            <button 
              disabled={!file || !title || mintStatus === 'minting'}
              onClick={handleMint}
              className="w-full relative group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className={`py-6 font-black italic text-2xl skew-x-[-12deg] transition-all duration-300 flex items-center justify-center gap-4 border-2 border-transparent ${
                mintStatus === 'minting' ? 'bg-zinc-800 text-zinc-500' : 'bg-white text-black hover:bg-lime-500 hover:scale-[1.02]'
              }`}>
                <span className="inline-block skew-x-[12deg]">
                  {mintStatus === 'minting' ? 'INITIALIZING CHAOS...' : 'MINT YOUR CHAOS'}
                </span>
                {mintStatus !== 'minting' && <Zap size={24} fill="currentColor" className="group-hover:animate-pulse" />}
              </div>
              {mintStatus === 'minting' && (
                <div className="absolute inset-0 bg-white/10 opacity-50 animate-glitch skew-x-[-12deg]"></div>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mint;
