
import React from 'react';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import Landing from './pages/Landing';
import Explore from './pages/Explore';
import NFTDetail from './pages/NFTDetail';
import Mint from './pages/Mint';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import ActivityFeed from './components/ActivityFeed';
import { WalletProvider } from './contexts/WalletContext';

const App: React.FC = () => {
  return (
    <WalletProvider>
      <HashRouter>
        <div className="min-h-screen bg-[#050505] text-white selection:bg-[#ff00ff] selection:text-white">
          <Navbar />
        
        <main className="relative z-10 pt-20">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/nft/:id" element={<NFTDetail />} />
            <Route path="/mint" element={<Mint />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>

        <ActivityFeed />

        <footer className="relative z-10 border-t border-zinc-800 bg-[#080808] py-12 px-6 mt-20">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500">
                NEON CHAOS
              </h2>
              <p className="text-zinc-500 font-mono text-xs leading-relaxed">
                THE DIGITAL UNDERGROUND IS HERE. MINT YOUR CHAOS. OWN THE CULTURE. NO RULES, JUST ART.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400 mb-4">Marketplace</h3>
              <ul className="space-y-2 text-zinc-500 font-mono text-xs">
                <li><Link to="/explore" className="hover:text-pink-500 transition-colors">ALL NFTS</Link></li>
                <li><Link to="/explore" className="hover:text-cyan-500 transition-colors">ART</Link></li>
                <li><Link to="/explore" className="hover:text-lime-500 transition-colors">COLLECTIBLES</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400 mb-4">My Account</h3>
              <ul className="space-y-2 text-zinc-500 font-mono text-xs">
                <li><Link to="/mint" className="hover:text-violet-500 transition-colors">PROFILE</Link></li>
                <li><Link to="/mint" className="hover:text-pink-500 transition-colors">FAVORITES</Link></li>
                <li><Link to="/mint" className="hover:text-cyan-500 transition-colors">MY COLLECTIONS</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400 mb-4">Newsletter</h3>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="EMAIL@CHAOS.COM" 
                  className="bg-zinc-900 border border-zinc-800 px-4 py-2 text-xs font-mono outline-none focus:border-pink-500 flex-1"
                />
                <button className="bg-white text-black font-black px-4 py-2 text-xs hover:bg-pink-500 transition-colors">JOIN</button>
              </div>
            </div>
          </div>
          <div className="max-w-7xl mx-auto border-t border-zinc-900 mt-12 pt-8 flex justify-between items-center text-[10px] font-mono text-zinc-600">
            <p>© 2024 NEON CHAOS STUDIOS. ALL RIGHTS RESERVED.</p>
            <div className="flex gap-4">
              <span>PRIVACY</span>
              <span>TERMS</span>
            </div>
          </div>
        </footer>
      </div>
    </HashRouter>
    </WalletProvider>
  );
};

export default App;
