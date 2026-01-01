import React, { useState, useEffect } from 'react';

// Çapraz karışım için bağımsız havuzlar
const names = ["Alex M.", "Sarah", "Julian", "M. Rossi", "Elena", "David S.", "Chloe", "Hiroshi", "Thomas", "Linda"];
const cities = ["London", "Austin", "Berlin", "Milan", "Toronto", "Sydney", "Paris", "Tokyo", "Seattle", "Oslo"];
const actions = [
  "remastered a complex foliage",
  "applied stencil bridging to a logo",
  "cleared 450+ floating islands",
  "optimized vectors for laser cutting",
  "generated a production-ready DXF",
  "smoothed paths for a mandala design"
];

const LiveTicker = () => {
  const [notification, setNotification] = useState(null);

  const generateRandomAction = () => {
    // Havuzlardan tamamen bağımsız rastgele seçim (Cross-mixing)
    const name = names[Math.floor(Math.random() * names.length)];
    const city = cities[Math.floor(Math.random() * cities.length)];
    const action = actions[Math.floor(Math.random() * actions.length)];
    
    const randomId = Math.floor(Math.random() * 70);
    const avatar = `https://i.pravatar.cc/100?u=${randomId}`;
    
    setNotification({
      user: `${name} from ${city}`,
      event: action,
      img: avatar
    });

    // 6 saniye sonra bildirimi kaldır
    setTimeout(() => setNotification(null), 6000);
  };

  useEffect(() => {
    // 25 ile 55 saniye arası düzensiz aralıklarla tetiklenir (Robotik durmaz)
    const interval = setInterval(generateRandomAction, Math.random() * (55000 - 25000) + 25000);
    return () => clearInterval(interval);
  }, []);

  if (!notification) return null;

  return (
    <div className="fixed bottom-6 left-6 z-[9999] w-[310px] bg-slate-900/95 border border-slate-800 p-4 rounded-2xl shadow-2xl backdrop-blur-xl animate-fade-in flex items-center gap-4">
      <div className="relative flex-shrink-0">
        <img src={notification.img} className="w-10 h-10 rounded-full border border-slate-700" alt="u" />
        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-slate-900 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
      </div>
      
      <div className="flex flex-col overflow-hidden">
        <div className="flex items-center gap-2">
           <span className="text-[12px] font-bold text-slate-100 truncate">
            {notification.user}
          </span>
          <span className="text-[8px] text-green-500 font-black uppercase bg-green-500/10 px-1.5 py-0.5 rounded">Live</span>
        </div>
        <span className="text-[11px] text-slate-400 font-medium leading-tight mt-1">
          {notification.event}
        </span>
      </div>
    </div>
  );
};

export default LiveTicker;