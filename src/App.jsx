import React, { useState, useEffect, useRef } from 'react';

// --- DATASET: 3 Ürünlü + Hız Verisi ---
const SHOWCASE_DATA = [
  {
    title: "Festive Jingle - Bells",
    description: "Sharp decorative vectors with production-ready closed paths.",
    before: "https://cuttora-backend-production.up.railway.app/files/SAMPLES/bells_raster.png",
    svg: "https://cuttora-backend-production.up.railway.app/files/SAMPLES/bells_svg.png",
    dxf: "https://cuttora-backend-production.up.railway.app/files/SAMPLES/bells_dxf.png",
    stats: { nodes: "850 → 180", resolution: "Excellent", speed: "0.8s" }
  },
  {
    title: "Zenith Bloom - Mandala",
    description: "Complex geometry optimized for high-precision laser cutting.",
    before: "https://cuttora-backend-production.up.railway.app/files/SAMPLES/mandala_raster.png",
    svg: "https://cuttora-backend-production.up.railway.app/files/SAMPLES/mandala_svg.png",
    dxf: "https://cuttora-backend-production.up.railway.app/files/SAMPLES/mandala_dxf.png",
    stats: { nodes: "1,120 → 245", resolution: "Excellent", speed: "1.2s" }
  },
  {
    title: "Harvest Haven - Tree of Life",
    description: "Intricate technical lines processed with advanced smoothing.",
    before: "https://cuttora-backend-production.up.railway.app/files/SAMPLES/tree_raster.jpg",
    svg: "https://cuttora-backend-production.up.railway.app/files/SAMPLES/tree_svg.png",
    dxf: "https://cuttora-backend-production.up.railway.app/files/SAMPLES/tree_dxf.png",
    stats: { nodes: "2,840 → 612", resolution: "Excellent", speed: "1.5s" }
  }
];

// --- ICONS ---
const IconWrapper = ({ children, className = "", ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>{children}</svg>
);
const Zap = (props) => (<IconWrapper {...props}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></IconWrapper>);
const Layers = (props) => (<IconWrapper {...props}><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></IconWrapper>);
const Scissors = (props) => (<IconWrapper {...props}><circle cx="6" cy="6" r="3" /><circle cx="6" cy="18" r="3" /><line x1="20" y1="4" x2="8.12" y2="15.88" /><line x1="14.47" y1="14.48" x2="20" y2="20" /><line x1="8.12" y1="8.12" x2="12" y2="12" /></IconWrapper>);
const Cpu = (props) => (<IconWrapper {...props}><rect x="4" y="4" width="16" height="16" rx="2" ry="2" /><rect x="9" y="9" width="6" height="6" /><line x1="9" y1="1" x2="9" y2="4" /><line x1="15" y1="1" x2="15" y2="4" /><line x1="9" y1="20" x2="9" y2="23" /><line x1="15" y1="20" x2="15" y2="23" /><line x1="20" y1="9" x2="23" y2="9" /><line x1="20" y1="14" x2="23" y2="14" /><line x1="1" y1="9" x2="4" y2="9" /><line x1="1" y1="14" x2="4" y2="14" /></IconWrapper>);
const ArrowRight = (props) => (<IconWrapper {...props}><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></IconWrapper>);
const Check = (props) => (<IconWrapper {...props}><polyline points="20 6 9 17 4 12" /></IconWrapper>);
const Upload = (props) => (<IconWrapper {...props}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></IconWrapper>);
const Download = (props) => (<IconWrapper {...props}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></IconWrapper>);
const Maximize = (props) => (<IconWrapper {...props}><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" /></IconWrapper>);
const Menu = (props) => (<IconWrapper {...props}><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="6" x2="20" y2="6" /><line x1="4" y1="18" x2="20" y2="18" /></IconWrapper>);
const X = (props) => (<IconWrapper {...props}><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></IconWrapper>);
const Sparkles = (props) => (<IconWrapper {...props}><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L12 3Z" /></IconWrapper>);
const Quote = (props) => (<IconWrapper {...props}><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" /><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" /></IconWrapper>);
const Plus = (props) => (<IconWrapper {...props}><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></IconWrapper>);
const Minus = (props) => (<IconWrapper {...props}><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></IconWrapper>);
const ArrowLeft = (props) => (<IconWrapper {...props}><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></IconWrapper>);
const Lock = (props) => (<IconWrapper {...props}><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></IconWrapper>);
const Server = (props) => (<IconWrapper {...props}><rect width="20" height="8" x="2" y="2" rx="2" ry="2"/><rect width="20" height="8" x="2" y="14" rx="2" ry="2"/><line x1="6" x2="6.01" y1="6" y2="6"/><line x1="6" x2="6.01" y1="18" y2="18"/></IconWrapper>);
const AlertCircle = (props) => (<IconWrapper {...props}><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></IconWrapper>);
const FileText = (props) => (<IconWrapper {...props}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></IconWrapper>);

const QualityWarningModal = ({ isOpen, onClose, report, startFinalProcessing, pendingFile }) => {
    if (!isOpen || !report) return null;

    // --- RENK VE DURUM MANTIĞI ---
    // Eğer durum "Excellent" ise YEŞİL tema, değilse SARI/TURUNCU tema
    const isSuccess = report.status === "Excellent";
    
    // Renk sınıflarını duruma göre seçiyoruz
    const theme = isSuccess ? {
        border: "border-green-500/40",
        iconBg: "bg-green-500/10",
        iconBorder: "border-green-500/30",
        iconColor: "text-green-500",
        barColor: "bg-green-500",
        shadow: "shadow-[0_0_50px_rgba(34,197,94,0.2)]"
    } : {
        border: "border-yellow-500/40",
        iconBg: "bg-yellow-500/10",
        iconBorder: "border-yellow-500/30",
        iconColor: "text-yellow-500",
        barColor: "bg-yellow-500",
        shadow: "shadow-[0_0_50px_rgba(234,179,8,0.2)]"
    };

    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-md" onClick={onClose} />
        
        {/* DİNAMİK KENAR VE GÖLGE RENGİ */}
        <div className={`relative bg-slate-900 border ${theme.border} rounded-3xl p-8 max-w-md w-full ${theme.shadow} animate-float`}>
          <div className="text-center mb-6">
            
            {/* DİNAMİK İKON RENGİ - DÜZELTİLMİŞ HALİ */}
            <div className={`w-20 h-20 ${theme.iconBg} rounded-full flex items-center justify-center mx-auto mb-4 border ${theme.iconBorder}`}>
              {isSuccess ? (
                  Check({ className: `w-10 h-10 ${theme.iconColor}` })
              ) : (
                  AlertCircle({ className: `w-10 h-10 ${theme.iconColor}` })
              )}
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-2">{report.status}</h3>
            <p className="text-slate-300 text-sm leading-relaxed">{report.message}</p>
          </div>
          
          <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-800 mb-8">
            <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-slate-500 font-mono uppercase">Edge Sharpness Score</span>
                {/* SKOR RENGİ */}
                <span className={`font-mono font-bold ${theme.iconColor}`}>{report.energy}</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                {/* PROGRESS BAR RENGİ */}
                <div className={`${theme.barColor} h-full transition-all duration-1000`} style={{ width: `${Math.min(report.energy / 5, 100)}%` }} />
            </div>
          </div>

          <Button 
            variant="gradient" 
            className="w-full justify-center py-4 text-lg" 
            onClick={() => {
                onClose(); 
                startFinalProcessing(pendingFile); 
            }}
          >
            {isSuccess ? "Start Production (-1 Credit)" : "I Understand & Accept (-1 Credit)"}
          </Button>
          <p className="text-[10px] text-slate-500 text-center mt-4 uppercase tracking-widest">Quality Assurance Shield Active</p>
        </div>
      </div>
    );
};

const API_URL = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
  ? "http://127.0.0.1:8000"
  : "https://cuttora-backend-production.up.railway.app";


// --- Styles & Animations ---
const GlobalStyles = () => (
  <style>{`
    @keyframes laser-scan { 0% { top: 0%; opacity: 0; } 50% { opacity: 1; } 100% { top: 100%; opacity: 0; } }
    @keyframes text-shimmer { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
    @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
    @keyframes blink-slow { 0%, 100% { opacity: 0.3; } 50% { opacity: 0.8; } }
    @keyframes twinkle { 0%, 100% { opacity: 0.2; transform: scale(0.8); } 50% { opacity: 1; transform: scale(1.2); } }
    @keyframes scroll-left { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
    @keyframes pulse-green { 0% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7); } 70% { box-shadow: 0 0 0 10px rgba(34, 197, 94, 0); } 100% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0); } }
    
    .animate-text-shimmer { background-size: 200% auto; animation: text-shimmer 3s linear infinite; }
    .animate-float { animation: float 6s ease-in-out infinite; }
    .animate-pulse-green { animation: pulse-green 2s infinite; }
    .animate-float-delayed { animation: float 6s ease-in-out 3s infinite; }
    .laser-line { box-shadow: 0 0 15px #06b6d4, 0 0 30px #3b82f6; }
    .animate-scroll { animation: scroll-left 60s linear infinite; }
    .animate-scroll:hover { animation-play-state: paused; }
    .no-scrollbar::-webkit-scrollbar { display: none; }
    .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

    /* --- YENİ: ENDÜSTRİYEL DASHBOARD AYDINLATMALARI --- */
    .workshop-panel {
      background: rgba(15, 23, 42, 0.85) !important;
      border: 1px solid rgba(6, 182, 212, 0.2) !important;
      box-shadow: 0 0 40px rgba(6, 182, 212, 0.07), inset 0 0 25px rgba(6, 182, 212, 0.05) !important;
    }

    .cyber-grid {
      background-image: 
        linear-gradient(rgba(6, 182, 212, 0.07) 1px, transparent 1px), 
        linear-gradient(90deg, rgba(6, 182, 212, 0.07) 1px, transparent 1px);
      background-size: 40px 40px;
      background-position: center center;
    }

    /* Durum geçişleri için yumuşak aydınlatma efekti */
    .animate-fade-in { animation: fadeIn 0.5s ease-out forwards; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
  `}</style>
);

// --- Helpers ---
const Reveal = ({ children, delay = 0, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setIsVisible(true); }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => ref.current && observer.disconnect();
  }, []);
  return <div ref={ref} className={`transition-all duration-1000 ease-out transform ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"} ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
};

const TiltCard = ({ children, className = "" }) => {
  const [transform, setTransform] = useState("perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)");
  const cardRef = useRef(null);
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    setTransform(`perspective(1000px) rotateX(${-y * 5}deg) rotateY(${x * 5}deg) scale(1.01)`);
  };
  return <div ref={cardRef} onMouseMove={handleMouseMove} onMouseLeave={() => setTransform("perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)")} className={`transition-transform duration-200 ease-out will-change-transform ${className}`} style={{ transform }}>{children}</div>;
};

const TypingText = ({ text, speed = 50, delay = 0 }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [started, setStarted] = useState(false);
  useEffect(() => { const t = setTimeout(() => setStarted(true), delay); return () => clearTimeout(t); }, [delay]);
  useEffect(() => {
    if (!started) return;
    let index = 0;
    const interval = setInterval(() => { if (index <= text.length) { setDisplayedText(text.slice(0, index)); index++; } else { clearInterval(interval); } }, speed);
    return () => clearInterval(interval);
  }, [text, speed, started]);
  return <span className="typing-cursor">{displayedText}</span>;
};

// --- TECH BACKGROUND (Stars) ---
const TechBackground = () => {
  const [stars, setStars] = useState([]);
  useEffect(() => {
    setStars(Array.from({ length: 50 }, (_, i) => ({ 
      id: i, left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, 
      size: Math.random() * 2 + 1, delay: Math.random() * 5, duration: Math.random() * 3 + 2 
    })));
  }, []);
  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-[#020617] overflow-hidden">
      <div className="absolute inset-0" style={{ backgroundImage: `linear-gradient(to right, rgba(51, 65, 85, 0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(51, 65, 85, 0.4) 1px, transparent 1px)`, backgroundSize: '100px 100px', maskImage: 'radial-gradient(circle at 50% 50%, black 40%, transparent 100%)' }} />
      {stars.map((star) => (<div key={star.id} className="absolute bg-white rounded-full animate-[twinkle_3s_infinite]" style={{ left: star.left, top: star.top, width: `${star.size}px`, height: `${star.size}px`, animationDelay: `${star.delay}s`, animationDuration: `${star.duration}s` }} />))}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#020617]/50 to-[#020617]" />
    </div>
  );
};

const Button = ({ children, variant = 'primary', className = '', onClick, ...props }) => {
  const baseStyle = "px-6 py-3 rounded-lg font-bold transition-all duration-300 flex items-center gap-2 group relative overflow-hidden cursor-pointer";
  const variants = {
    primary: "bg-white text-slate-950 hover:bg-cyan-50 hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.4)]",
    gradient: "bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 bg-[length:200%_auto] animate-text-shimmer text-white hover:shadow-[0_0_40px_rgba(6,182,212,0.6)] border border-transparent hover:scale-105",
    outline: "border border-slate-600 text-slate-200 hover:border-cyan-400 hover:text-white bg-transparent hover:bg-slate-800/50 backdrop-blur-sm",
  };
  return <button className={`${baseStyle} ${variants[variant]} ${className}`} onClick={onClick} {...props}><span className="relative z-10 flex items-center gap-2">{children}</span></button>;
};

// --- ANNOUNCEMENT BAR (Kayan Yazı - Çift Mesaj) ---
const AnnouncementBar = () => (
  <div className="bg-gradient-to-r from-blue-900 via-slate-900 to-blue-900 border-b border-white/10 text-white py-2.5 relative z-[60] overflow-hidden flex items-center">
    <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-blue-900 to-transparent z-10"></div>
    <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-blue-900 to-transparent z-10"></div>

    <div className="flex animate-scroll hover:pause-scroll whitespace-nowrap items-center gap-16 pl-4">
      {/* 1. BLOK */}
      <div className="flex items-center gap-3">
        <span className="bg-cyan-500 text-slate-900 text-[10px] font-black px-2 py-0.5 rounded uppercase">NEW UPDATE v1.2</span>
        <span className="text-sm font-bold tracking-wide text-cyan-100">Batch Processing Engine is Live! Convert 100+ files at once.</span>
      </div>

      <div className="text-slate-600">✦</div>

      <div className="flex items-center gap-3">
        <span className="bg-yellow-500 text-slate-900 text-[10px] font-black px-2 py-0.5 rounded uppercase">NEW YEAR TRIAL</span>
        <span className="text-sm font-bold tracking-wide text-yellow-100">
          Use code <span className="text-white underline decoration-yellow-500 decoration-2 font-black">LAUNCHFREE</span> for 1 Free AI-to-CNC credit!
        </span>
      </div>
      
      <div className="text-slate-600">✦</div>

      {/* 2. BLOK (Sonsuz döngü için tekrar) */}
      <div className="flex items-center gap-3">
        <span className="bg-cyan-500 text-slate-900 text-[10px] font-black px-2 py-0.5 rounded uppercase">NEW UPDATE v1.2</span>
        <span className="text-sm font-bold tracking-wide text-cyan-100">Batch Processing Engine is Live! Convert 100+ files at once.</span>
      </div>

      <div className="text-slate-600">✦</div>

      <div className="flex items-center gap-3">
        <span className="bg-yellow-500 text-slate-900 text-[10px] font-black px-2 py-0.5 rounded uppercase">NEW YEAR TRIAL</span>
        <span className="text-sm font-bold tracking-wide text-yellow-100">
          Use code <span className="text-white underline decoration-yellow-500 decoration-2 font-black">LAUNCHFREE</span> for 1 Free AI-to-CNC credit!
        </span>
      </div>
    </div>
  </div>
);

// --- LEGAL MODALS ---
const LegalModal = ({ isOpen, onClose, title, content }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md" onClick={onClose} />
            <div className="relative bg-slate-900 border border-slate-700 rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl animate-float">
                <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white"><X className="w-6 h-6" /></button>
                <div className="text-center mb-6">
                    <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-600"><FileText className="w-6 h-6 text-slate-300" /></div>
                    <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
                </div>
                <div className="text-slate-300 space-y-4 text-sm leading-relaxed whitespace-pre-line">
                    {content}
                </div>
                <div className="mt-8 pt-4 border-t border-slate-800 text-center">
                    <Button variant="outline" className="justify-center w-full" onClick={onClose}>Close</Button>
                </div>
            </div>
        </div>
    );
};

// --- PAYMENT MODAL ---
const PaymentModal = ({ isOpen, onClose, plan, price, onSubmit }) => {
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    if (!isOpen) return null;
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        await onSubmit(email, plan);
        setIsSubmitting(false); 
    };
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={!isSubmitting ? onClose : undefined} />
            <div className="relative bg-slate-900 border border-slate-700 rounded-2xl p-8 max-w-md w-full shadow-[0_0_50px_rgba(6,182,212,0.2)] animate-float">
                {!isSubmitting && <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white"><X className="w-6 h-6" /></button>}
                <div className="text-center mb-6">
                    <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-500/30"><Lock className="w-6 h-6 text-blue-400" /></div>
                    <h3 className="text-2xl font-bold text-white mb-1">Secure Checkout</h3>
                    <p className="text-slate-400">You are choosing the <span className="text-cyan-400 font-bold">{plan}</span> plan for <span className="text-white font-bold">${price}</span>.</p>
                </div>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div><label className="block text-sm font-medium text-slate-300 mb-1">Email Address for Receipt</label><input type="email" placeholder="you@company.com" className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors" required value={email} onChange={(e) => setEmail(e.target.value)} disabled={isSubmitting} /></div>
                    {isSubmitting ? (
                        <div className="w-full bg-slate-800 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 cursor-wait border border-slate-600"><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>Processing Securely...</div>
                    ) : (
                        <Button variant="gradient" className="w-full justify-center">Proceed to Payment</Button>
                    )}
                    <p className="text-xs text-center text-slate-500 mt-4">Payments processed securely by Stripe.</p>
                </form>
            </div>
        </div>
    );
};

// --- WAITLIST MODAL ---
const WaitlistModal = ({ isOpen, onClose }) => {
  const [status, setStatus] = useState('idle');
  const [email, setEmail] = useState("");
  if (!isOpen) return null;
  const handleSubmit = async (e) => { 
    e.preventDefault(); setStatus('submitting'); 
    try {
      const formData = new FormData(); formData.append('fields[email]', email);
      await fetch("https://assets.mailerlite.com/jsonp/1967306/forms/173063613581362993/subscribe", { method: 'POST', body: formData, mode: 'no-cors' });
      setStatus('success'); setTimeout(() => { onClose(); }, 2500); 
    } catch (error) { setStatus('success'); setTimeout(() => onClose(), 2500); }
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-slate-900 border border-slate-700 rounded-2xl p-8 max-w-md w-full shadow-[0_0_50px_rgba(6,182,212,0.2)]">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white"><X className="w-6 h-6" /></button>
        {status === 'success' ? (
            <div className="text-center py-8"><div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-500/30"><Check className="w-8 h-8 text-green-400" /></div><h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3></div>
        ) : (
            <>
              <div className="text-center mb-6"><div className="w-12 h-12 bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-cyan-500/30"><Sparkles className="w-6 h-6 text-cyan-400" /></div><h3 className="text-2xl font-bold text-white mb-2">Contact Sales</h3></div>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div><label className="block text-sm font-medium text-slate-300 mb-1">Email Address</label><input type="email" placeholder="you@company.com" className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors" required value={email} onChange={(e) => setEmail(e.target.value)} disabled={status === 'submitting'} /></div>
                <Button variant="gradient" className="w-full justify-center" disabled={status === 'submitting'}>{status === 'submitting' ? 'Send Request' : 'Send Request'}</Button>
              </form>
            </>
        )}
      </div>
    </div>
  );
};

// --- PRICING CARDS (REVISED) ---
const PricingCard = ({ plan, price, originalPrice, description, features, recommended = false, onJoin }) => (
  <TiltCard className="h-full">
    <div className={`relative p-8 rounded-3xl border transition-all duration-300 backdrop-blur-md h-full flex flex-col ${recommended ? 'bg-slate-900 border-cyan-500 shadow-[0_0_50px_rgba(6,182,212,0.15)] transform md:-translate-y-4' : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'}`}>
      
      {/* POPULAR BADGE (Sadece Pro kartta sağ üstte) */}
      {recommended && (
        <div className="absolute top-0 right-0">
          <div className="bg-gradient-to-l from-cyan-600 to-blue-600 text-white text-[10px] font-black px-3 py-1 rounded-bl-xl rounded-tr-2xl shadow-lg">
            MOST POPULAR
          </div>
        </div>
      )}

      {/* HEADER KISMI */}
      <div className="mb-6">
        {/* İndirim Etiketi - Artık başlığın hemen üzerinde, kibar bir "Chip" şeklinde */}
        <div className="inline-flex items-center gap-2 mb-3 px-2.5 py-1 rounded-md bg-green-500/10 border border-green-500/20">
             <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
             <span className="text-[10px] font-bold text-green-400 uppercase tracking-wider">Launch Offer: 50% Off</span>
        </div>

        <h3 className={`text-3xl font-bold mb-2 ${recommended ? 'text-white' : 'text-slate-300'}`}>{plan}</h3>
        <p className="text-slate-500 text-sm font-medium uppercase tracking-wide">{description}</p>
      </div>

      {/* FİYAT KISMI - Kırmızı çizgi gitti, gri ve silik oldu */}
      <div className="flex items-end gap-3 mb-8 pb-8 border-b border-slate-800/50">
        <div className="text-5xl font-black text-white tracking-tight">{price}</div>
        <div className="flex flex-col justify-end mb-1">
            <span className="text-sm text-slate-500 line-through font-mono decoration-slate-600">{originalPrice}</span>
            <span className="text-[10px] text-slate-600 font-bold uppercase">USD / One-time</span>
        </div>
      </div>

      {/* ÖZELLİKLER LİSTESİ */}
      <ul className="space-y-4 mb-8 flex-grow">
        {features.map((feat, idx) => (
          <li key={idx} className="flex items-start gap-3 text-slate-300 text-sm font-medium leading-relaxed">
            <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${recommended ? 'bg-cyan-500/20 text-cyan-400' : 'bg-slate-800 text-slate-500'}`}>
                <Check className="w-3 h-3" />
            </div>
            {feat}
          </li>
        ))}
      </ul>

      {/* BUTON - En alta sabitlendi */}
      <Button 
        variant={recommended ? 'gradient' : 'outline'} 
        className={`w-full justify-center py-4 text-sm font-bold uppercase tracking-widest mt-auto ${!recommended && 'border-slate-700 text-slate-400 hover:text-white hover:border-white'}`} 
        onClick={onJoin}
      >
        Choose {plan}
      </Button>
    </div>
  </TiltCard>
);

const FeatureCard = ({ icon: Icon, title, description, badge }) => (
  <TiltCard className="h-full">
    <div className="h-full p-8 rounded-2xl bg-slate-900/80 border border-slate-700 hover:border-cyan-500 transition-colors duration-500 group relative overflow-hidden backdrop-blur-md shadow-lg">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      {badge && <div className="absolute top-4 right-4 bg-cyan-900/40 border border-cyan-500/40 text-cyan-300 px-3 py-1 rounded-full text-xs font-bold tracking-wide">{badge}</div>}
      <div className="w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-slate-600 group-hover:border-cyan-500 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.4)]"><Icon className="w-6 h-6 text-cyan-400 group-hover:text-white transition-colors" /></div>
      <h3 className="text-xl font-bold text-slate-100 mb-3 group-hover:text-cyan-300 transition-colors">{title}</h3>
      <p className="text-slate-300 leading-relaxed font-medium">{description}</p>
    </div>
  </TiltCard>
);

const Step = ({ number, title, description, isLast }) => (
  <Reveal delay={number * 150} className="h-full">
    <div className="flex flex-col items-center text-center relative z-10 max-w-xs mx-auto group h-full">
      <div className="w-14 h-14 rounded-full bg-slate-900 border border-slate-600 flex items-center justify-center text-xl font-bold text-white mb-6 shadow-xl relative transition-all duration-500 group-hover:border-cyan-500 group-hover:scale-110 group-hover:shadow-[0_0_25px_rgba(6,182,212,0.4)] z-20"><span className="absolute inset-0 rounded-full bg-cyan-500/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />{number}</div>
      <h4 className="text-lg font-bold text-slate-100 mb-2 group-hover:text-cyan-300 transition-colors">{title}</h4>
      <p className="text-base text-slate-300 font-medium">{description}</p>
      {!isLast && <div className="hidden md:block absolute top-7 left-[50%] w-full h-[2px] bg-gradient-to-r from-slate-700 to-slate-800/0 group-hover:from-cyan-900 transition-colors duration-500 -z-10" />}
    </div>
  </Reveal>
);

const TestimonialCard = ({ quote, author, role }) => (
  <TiltCard className="h-full w-[400px] flex-shrink-0">
    <div className="h-full p-8 rounded-2xl bg-slate-900/60 border border-slate-700 hover:border-cyan-500/50 transition-colors duration-500 relative backdrop-blur-sm flex flex-col whitespace-normal">
      <Quote className="w-8 h-8 text-slate-600 mb-4 opacity-50" />
      <p className="text-slate-200 text-lg italic mb-6 leading-relaxed">"{quote}"</p>
      <div className="mt-auto flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm">{author.charAt(0)}</div>
        <div><h5 className="text-white font-bold text-sm">{author}</h5><p className="text-cyan-400 text-xs font-mono">{role}</p></div>
      </div>
    </div>
  </TiltCard>
);

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-slate-800 last:border-0">
      <button className="w-full py-8 flex items-center justify-between text-left group" onClick={() => setIsOpen(!isOpen)}>
        <span className="text-xl md:text-2xl font-medium text-slate-200 group-hover:text-cyan-400 transition-colors">{question}</span>
        {isOpen ? <Minus className="w-6 h-6 text-cyan-400" /> : <Plus className="w-6 h-6 text-slate-500 group-hover:text-cyan-400" />}
      </button>
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100 pb-8' : 'max-h-0 opacity-0'}`}><p className="text-slate-400 leading-relaxed text-lg">{answer}</p></div>
    </div>
  );
};

// --- SHOWCASE SECTION (Profesyonel Galeri) ---
const ShowcaseSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('svg'); 
  const item = SHOWCASE_DATA[currentIndex];

  const next = () => { setCurrentIndex((prev) => (prev + 1) % SHOWCASE_DATA.length); setActiveTab('svg'); };
  const prev = () => { setCurrentIndex((prev) => (prev === 0 ? SHOWCASE_DATA.length - 1 : prev - 1)); setActiveTab('svg'); };

  return (
    <div className="max-w-6xl mx-auto mt-20 px-4">
      {/* BAŞLIK ALANI */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Production Gallery</h2>
        <div className="h-1 w-20 bg-cyan-500 mx-auto rounded-full shadow-[0_0_10px_rgba(6,182,212,0.8)]"></div>
      </div>

      <div className="bg-slate-900/60 border border-slate-700 rounded-[2.5rem] overflow-hidden shadow-2xl backdrop-blur-xl relative">
        {/* ÜST SEKME NAVİGASYONU */}
        <div className="flex border-b border-slate-800 bg-slate-950/40">
          {['before', 'svg', 'dxf'].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`flex-1 py-5 text-xs font-bold uppercase tracking-[0.2em] transition-all relative overflow-hidden ${activeTab === tab ? 'text-cyan-400' : 'text-slate-500 hover:text-slate-300'}`}
            >
              {tab === 'before' ? 'Original Raster' : (tab === 'svg' ? 'Clean SVG' : 'CNC DXF Output')}
              {activeTab === tab && <div className="absolute bottom-0 left-0 w-full h-1 bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,1)]"></div>}
            </button>
          ))}
        </div>

        {/* ANA İÇERİK */}
        <div className="grid lg:grid-cols-2 gap-0 min-h-[500px]">
          {/* SOL: GÖRSEL */}
          <div className="bg-black/40 flex items-center justify-center p-12 relative group border-r border-slate-800">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent h-20 w-full top-0 animate-[laser-scan_4s_linear_infinite] pointer-events-none opacity-50"></div>
            <img 
              src={activeTab === 'before' ? item.before : (activeTab === 'svg' ? item.svg : item.dxf)} 
              className="max-w-full max-h-[380px] object-contain transition-all duration-700 transform group-hover:scale-105" 
              alt={item.title}
            />
            <div className="absolute top-6 left-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Live View: {activeTab}</span>
            </div>
          </div>

          {/* SAĞ: TEKNİK VERİLER */}
          <div className="p-12 flex flex-col justify-center bg-slate-900/40 relative">
            <div className="mb-8">
              <h3 className="text-3xl font-bold text-white mb-3">{item.title}</h3>
              <p className="text-slate-400 leading-relaxed text-sm italic">"{item.description}"</p>
            </div>

            {/* İSTATİSTİKLER (3 KUTU: Nodes, Quality, Speed) */}
            <div className="grid grid-cols-3 gap-3 mb-10">
              <div className="bg-slate-950/80 p-3 rounded-2xl border border-slate-800">
                <div className="text-[9px] text-slate-500 uppercase font-bold mb-1 tracking-tighter">Optimization</div>
                <div className="text-lg font-mono text-cyan-400">{item.stats.nodes}</div>
              </div>
              <div className="bg-slate-950/80 p-3 rounded-2xl border border-slate-800">
                <div className="text-[9px] text-slate-500 uppercase font-bold mb-1 tracking-tighter">Quality</div>
                <div className="text-lg font-mono text-green-400">{item.stats.resolution}</div>
              </div>
              <div className="bg-slate-950/80 p-3 rounded-2xl border border-slate-800">
                <div className="text-[9px] text-slate-500 uppercase font-bold mb-1 tracking-tighter">Speed</div>
                <div className="text-lg font-mono text-yellow-400">{item.stats.speed}</div>
              </div>
            </div>

            {/* OKLAR */}
            <div className="flex items-center gap-6">
              <button onClick={prev} className="w-12 h-12 rounded-full border border-slate-700 flex items-center justify-center hover:border-cyan-500 text-white transition-all bg-slate-950/50 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)]"><ArrowLeft className="w-5 h-5" /></button>
              <div className="text-xs font-mono text-slate-500 tracking-widest">ITEM <span className="text-white font-bold">{currentIndex + 1}</span> / {SHOWCASE_DATA.length}</div>
              <button onClick={next} className="w-12 h-12 rounded-full border border-slate-700 flex items-center justify-center hover:border-cyan-500 text-white transition-all bg-slate-950/50 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)]"><ArrowRight className="w-5 h-5" /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- MAIN APP ---
export default function App() {
  const [showFreeTrialPopup, setShowFreeTrialPopup] = useState(false);
  const [logs, setLogs] = useState([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState({ name: '', price: 0 });
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);

  const [processStatus, setProcessStatus] = useState("");
  const [pendingFile, setPendingFile] = useState(null);
  const [qualityModalOpen, setQualityModalOpen] = useState(false);
  const [qualityReport, setQualityReport] = useState(null);
 
  // LEGAL MODALS STATE
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);
  const [cookieOpen, setCookieOpen] = useState(false); 
  const [apiKey, setApiKey] = useState(() => sessionStorage.getItem('cuttora_auth_key') || '');  
  const [credits, setCredits] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState(null);
  const [serverStatus, setServerStatus] = useState('checking'); 

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20); 
    window.addEventListener('scroll', handleScroll); 
    
    // --- TAWK.TO CANLI DESTEK ENTEGRASYONU ---
    var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
    (function() {
      var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
      s1.async = true;
      s1.src = 'https://embed.tawk.to/69505961096840197e575756/1jdgtq9b9';
      s1.charset = 'UTF-8';
      s1.setAttribute('crossorigin', '*');
      s0.parentNode.insertBefore(s1, s0);
    })();

    // --- 5 SANİYE SONRA POP-UP GÖSTERİMİ ---
    const hasSeenPopup = sessionStorage.getItem('cuttora_trial_popup');
    if (!hasSeenPopup && !apiKey) {
      const timer = setTimeout(() => setShowFreeTrialPopup(true), 5000);
      // Temizlik aşamasında timer'ı temizle
    }

    const p = new URLSearchParams(window.location.search);
    if (p.get('success') === 'true' && p.get('key')) {
      const newKey = p.get('key');
      localStorage.setItem('cuttora_key', newKey);
      setApiKey(newKey);
      alert(`🎉 Payment Successful! \n\nLicense Key: ${newKey}\n\nSave this key!`);
      window.history.replaceState({}, '', window.location.pathname);
    }
    
    if(apiKey) {
       if (apiKey === "cuttora_admin_master") {
           setCredits(999999);
       } else {
           fetch(`${API_URL}/api/credits/${apiKey}`)
            .then(r => r.json())
            .then(d=>setCredits(d.credits))
            .catch(e => console.log(e));
       }
    }
    return () => {
        window.removeEventListener('scroll', handleScroll);
    };
  }, [apiKey]);

  const openPaymentModal = (plan, price) => {
      setSelectedPlan({ name: plan, price: price });
      setPaymentModalOpen(true);
  };

  const handlePaymentSubmit = async (email, plan) => {
    try {
        const fd = new FormData();
        fd.append("email", email);
        fd.append("package_type", plan.toLowerCase()); 
        
        const res = await fetch(`${API_URL}/api/create-checkout`, { method: "POST", body: fd });
        
        if(!res.ok) { 
            return; 
        }
        
        const data = await res.json();
        if(data.url) window.location.href = data.url; 
        else alert("Error: " + data.error);
    } catch(e) { }
  };

  // --- 1. AŞAMA: AKILLI YÜKLEME YÖNETİCİSİ (HER ZAMAN RAPOR GÖSTERİR) ---
  const handleUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    if (!apiKey) { alert("Please login with a key."); return; }

    // --- SENARYO A: TEK DOSYA (Kullanıcı Raporu Görmek İstiyor!) ---
    if (files.length === 1) {
        const file = files[0];
        setIsProcessing(true);
        setProcessStatus("Scanning Image Quality..."); 
        
        const fd = new FormData();
        fd.append("file", file);

        try {
            const res = await fetch(`${API_URL}/analyze`, { method: "POST", body: fd });
            const data = await res.json();
            const report = data.quality_report;
            
            // --- KRİTİK DEĞİŞİKLİK BURADA ---
            // Eskiden: "Sadece Warning varsa aç" diyorduk.
            // Şimdi: Koşulsuz şartsız modalı açıyoruz.
            // Böylece Excellent ise YEŞİL kutuyu görüp mutlu olacak.
            
            setQualityReport(report);
            setPendingFile(file);
            setQualityModalOpen(true); // <-- ARTIK HER ZAMAN AÇILACAK!
            setIsProcessing(false);

        } catch (err) {
            console.error("Analysis failed, proceeding direct.");
            startFinalProcessing(file);
        }
    } 
    // --- SENARYO B: TOPLU İŞLEM (Batch - Burası Hızlı Geçer) ---
    else {
        if(!confirm(`Start batch processing for ${files.length} files?\n\nThis will consume ${files.length} credits.`)) return;

        setIsProcessing(true);
        let completed = 0;

        for (const file of files) {
            setProcessStatus(`Batch Processing: ${completed + 1}/${files.length} \nFile: ${file.name}`);
            try {
                await startFinalProcessing(file, true); 
            } catch (error) {
                console.error(`Error processing ${file.name}`, error);
            }
            completed++;
        }
        setIsProcessing(false);
        setProcessStatus("Batch Completed!");
        e.target.value = null; 
        alert(`All ${files.length} files processed! Check your downloads folder.`);
    }
  };
  
  // --- 2. AŞAMA: ASIL VEKTÖRLEŞTİRME (Batch Destekli) ---
  const startFinalProcessing = async (file, isBatch = false) => {
    if(!isBatch) setIsProcessing(true);
    
    // Simülasyon metinleri (Sadece tekli işlemde veya batch'in içinde döner)
    const statusMessages = ["Analyzing Geometry...", "Optimizing Nodes...", "Closing Open Paths...", "Generating Production DXF..."];
    let i = 0;
    const interval = setInterval(() => { 
        if(!isBatch) setProcessStatus(statusMessages[i % 4]); 
        i++; 
    }, 2000);

    const fd = new FormData();
    fd.append("file", file);
    fd.append("api_key", apiKey);

    try {
        const res = await fetch(`${API_URL}/process`, { method: "POST", body: fd });
        const data = await res.json();
        
        if (data.status === "success") {
            if (!isBatch) {
                // Tekli işlemse sonucu ekrana bas (Eski usül)
                setResult(data); 
            } else {
                // Batch ise sonucu ekrana basma, OTOMATİK İNDİR (Yeni usül)
                const link = document.createElement('a');
                link.href = `${API_URL}${data.files.zip}`;
                link.setAttribute('download', '');
                document.body.appendChild(link);
                link.click();
                link.remove();
            }
            
            // Krediyi anlık güncelle
            if (apiKey !== "cuttora_admin_master") {
                fetch(`${API_URL}/api/credits/${apiKey}`)
                  .then(r => r.json())
                  .then(d => setCredits(d.credits));
            }
        } else { 
            if(!isBatch) alert(data.detail || "Processing failed"); 
        }
    } catch (e) { 
        if(!isBatch) alert("Connection error during processing."); 
    } finally {
        clearInterval(interval);
        if(!isBatch) setIsProcessing(false);
    }
  };
  
  // --- AUTHENTICATION MODULE ---
  const manualLogin = async () => {
    // 1. Lisans anahtarı veya deneme kodu iste
    const k = prompt("Please enter your License Key or type 'LAUNCHFREE' for a trial:");
    if (!k) return;

    try {
      // 2. Anahtarı backend ile doğrula (LAUNCHFREE dahil)
      const res = await fetch(`${API_URL}/api/credits/${k.trim()}`);
      const data = await res.json();

      if (res.ok) {
        // 3. Başarılı: Backend'den dönen özel key'i (FREE_IP gibi) veya girilen k'yı sakla
        const finalKey = data.key || k.trim();
        sessionStorage.setItem('cuttora_auth_key', finalKey);
        setApiKey(finalKey);
        setCredits(data.credits);

        // 4. Bilgilendirme mesajı
        alert(`Success! You have ${data.credits === 999999 ? 'Unlimited' : data.credits} credit(s) available.`);
      } else {
        // 5. Hata mesajı (Backend'den gelen detayı göster)
        alert("Error: " + (data.detail || "Invalid License Key or No Credits Left."));
      }
    } catch (e) {
      alert("Connection Error: Could not reach the server. Please try again later.");
    }
  };
  
  const logout = () => {
    sessionStorage.removeItem('cuttora_auth_key');
    setApiKey('');
    setResult(null);
    window.location.reload(); // Refresh to lock the site again
  };

  const brands = ['LaserCo', 'MetalArt', 'CricutPro', 'EtsyMakers', 'CNCMasters', 'FabLab'];
  const doubledBrands = [...brands, ...brands]; 
   
  const testimonials = [
    { 
      quote: "Finally a tool that closes open paths automatically. My plasma cutter didn't stop once during complex cuts.", 
      author: "Mike T.", 
      role: "Industrial CNC Operator" 
    },
    { 
      quote: "The node reduction is a total game changer. Cuttora eliminated all messy double lines in my metal art designs.", 
      author: "Sarah K.", 
      role: "Laser Design Specialist" 
    },
    { 
      quote: "DXF export is exceptionally clean. No double nodes or spline issues even in high-detail geometric patterns.", 
      author: "James L.", 
      role: "Industrial Manufacturing Engineer" 
    },
    { 
      quote: "Batch processing 50+ files saved me hours of manual cleanup. Essential tool for any serious production shop.", 
      author: "Elena M.", 
      role: "Workshop Owner & Maker" 
    }
  ];
  
  const doubledTestimonials = [...testimonials, ...testimonials];
  const faqs = [
    { q: "Does it work with angled mockup photos?", a: "V1 is engineered for front-facing, high-contrast technical assets. While mockups can be processed, angled perspectives may lead to geometric distortion. For production-ready precision, we recommend using flat, isolated artwork." },
    { q: "Do I spend a credit for every upload?", a: "No. Our Pre-Production Diagnostic Scan analyzes your asset's quality first. You only authorize credit usage after reviewing the technical report, ensuring you don't pay for low-resolution or incompatible files." },
    { q: "What do I get in the Master Bundle?", a: "Every successful conversion delivers a secure ZIP containing Raw and Smooth DXF files, a production-ready SVG, an EPS file for legacy software, and a Technical README for machine setup." },
    { q: "Can I use the output for commercial projects?", a: "Yes. All fabrication-ready files are royalty-free and yours to use for physical production, Etsy sales, or custom client commissions." },
    { q: "What is on the V2 roadmap?", a: "V2 (January 2026) will introduce Smart Island Detection, Automatic Bridging, and AI Perspective Correction to handle complex mockup photos automatically." }
  ];

  return (
    <div className="min-h-screen text-slate-100 font-sans selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden relative">
      <GlobalStyles />
      <TechBackground />
      <AnnouncementBar />
      <PaymentModal isOpen={paymentModalOpen} onClose={() => setPaymentModalOpen(false)} plan={selectedPlan.name} price={selectedPlan.price} onSubmit={handlePaymentSubmit} />
      <WaitlistModal isOpen={isWaitlistOpen} onClose={() => setIsWaitlistOpen(false)} />
      
      {/* --- LEGAL MODALS (GÜNCELLENMİŞ & GÜVENLİ) --- */}
      <LegalModal 
        isOpen={privacyOpen} 
        onClose={() => setPrivacyOpen(false)} 
        title="Privacy Policy" 
        content={`Last Updated: December 2025\n\n1. Data Collection & Usage: We collect only your email address to manage your license key and credit balance. We do not sell your data to third parties.\n\n2. File Privacy: Your uploaded technical assets are processed on secure, temporary servers. Files are automatically deleted from our production cache 24 hours after processing to ensure your design IP remains private.\n\n3. Payment Security: All transactions are processed through Stripe’s Tier-1 secure infrastructure. Cuttora never sees or stores your credit card information.\n\n4. Data Security: We use industry-standard SSL encryption for all data transfers between your machine and our AI engine.`} 
      />
      
      <LegalModal 
        isOpen={termsOpen} 
        onClose={() => setTermsOpen(false)} 
        title="Terms of Service" 
        content={`Last Updated: December 2025\n\n1. Usage Rights: Upon purchasing credits, Cuttora grants you a non-exclusive, perpetual license to use the generated vector files (DXF, SVG, EPS) for both personal and commercial projects.\n\n2. Content Responsibility: You represent that you own or have the necessary licenses for the images you upload. Cuttora does not claim ownership over your uploaded assets or resulting vectors.\n\n3. Refund Policy: Due to the nature of digital goods, credits are generally non-refundable once consumed. However, if a conversion is technically unusable due to an engine error, we provide a "Satisfaction Guarantee" to fix your file or refund the credit.\n\n4. Service Limitation: Users are responsible for verifying all dimensions and path integrity in their CAD/CAM software before physical production.`} 
      />
      
      <LegalModal 
        isOpen={cookieOpen} 
        onClose={() => setCookieOpen(false)} 
        title="Cookie Policy" 
        content={`Last Updated: December 2025\n\n1. Essential Cookies: We use only strictly necessary cookies to maintain your secure login session and manage your license key authentication.\n\n2. No Tracking: Cuttora does not use any third-party tracking, advertising, or analytics cookies. We do not follow your behavior across other websites.\n\n3. Storage: Session data is stored locally on your browser to ensure you don't have to re-enter your license key every time you refresh the workspace.`} 
      />

	  {/* --- FREE TRIAL POPUP --- */}
      {showFreeTrialPopup && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md" onClick={() => setShowFreeTrialPopup(false)} />
          <div className="relative bg-slate-900 border-2 border-cyan-500/50 rounded-[2.5rem] p-10 max-w-md w-full shadow-[0_0_60px_rgba(6,182,212,0.3)] animate-float text-center">
            <h3 className="text-3xl font-black text-white mb-4 uppercase tracking-tighter">FROM AI TO CNC 🎨⚡</h3>
            <p className="text-slate-300 mb-8 font-medium italic">"Stop manual tracing. Upload your AI art or photo and get a production-ready DXF instantly."</p>
            <div className="bg-slate-950 border-2 border-dashed border-slate-700 p-4 rounded-2xl mb-8 font-mono text-2xl text-cyan-400 font-black tracking-widest">
              LAUNCHFREE
            </div>
            <Button variant="gradient" className="w-full justify-center py-4" onClick={() => { setShowFreeTrialPopup(false); manualLogin(); }}>
              CLAIM FREE TRIAL
            </Button>
            <button onClick={() => { setShowFreeTrialPopup(false); sessionStorage.setItem('cuttora_trial_popup', 'true'); }} className="mt-6 text-[10px] text-slate-500 font-bold uppercase tracking-widest hover:text-white transition-colors">Maybe later</button>
          </div>
        </div>
      )}

      {/* --- NAVIGATION (TEK KONTROL NOKTASI) --- */}
      <nav className={`w-full z-50 transition-all duration-300 border-b ${isScrolled ? 'fixed top-0 bg-slate-950/80 backdrop-blur-xl border-slate-700/50 py-4 shadow-lg' : 'relative bg-transparent border-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2 font-bold text-2xl tracking-tight text-white group cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center transform group-hover:rotate-12 transition-transform shadow-[0_0_15px_rgba(6,182,212,0.5)]">
              <Scissors className="w-5 h-5 text-white" />
            </div>
            <span className="group-hover:text-cyan-200 transition-colors">Cuttora</span>
          </div>

          <div className="hidden md:flex items-center gap-4">
            {apiKey ? (
              <div className="flex items-center gap-4">
                <span className="text-cyan-400 font-mono font-black border border-cyan-500/30 px-4 py-1.5 rounded-lg bg-cyan-900/20 shadow-inner uppercase">Credits: {credits}</span>
                <Button variant="outline" className="py-2 px-5 text-xs font-black uppercase tracking-widest" onClick={logout}>Log Out</Button>
              </div>
            ) : (
              <div className="flex items-center gap-8">
                {['Features', 'How it Works', 'Pricing', 'FAQ'].map((item) => (
                  <a key={item} href={`#${item.toLowerCase().replace(/\s+/g, '-')}`} className="text-sm font-black text-slate-300 hover:text-cyan-400 transition-colors uppercase tracking-widest">{item}</a>
                ))}
                <Button variant="outline" className="py-2 px-5 text-xs font-black uppercase tracking-widest border-slate-700" onClick={manualLogin}>Enter License Key</Button>
              </div>
            )}
          </div>
          <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>{mobileMenuOpen ? <X /> : <Menu />}</button>
        </div>
      </nav>

      {/* --- GATEWAY: WORKSPACE OR LANDING --- */}
      {apiKey ? (
        <>
          {/* 1. İSTASYON: INDUSTRIAL WORKSPACE PANEL (MOBİL UYUMLU) */}
          <section className="pt-4 md:pt-8 pb-12 px-4 md:px-6 min-h-screen relative z-10 bg-[#020617] cyber-grid">
            <div className="max-w-7xl mx-auto space-y-6">

              {/* ÜST DURUM BANDI: İŞLEM BAŞARILI BİLGİSİ */}
              {result && (
                <div className="animate-fade-in flex justify-center">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/30 shadow-[0_0_20px_rgba(34,197,94,0.1)]">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-[10px] font-black text-green-400 uppercase tracking-widest">Production Assets Ready</span>
                  </div>
                </div>
              )}

              {/* ANA DASHBOARD GRID: ITEMS-STRETCH İLE SÜTUNLAR EŞİTLENDİ */}
              <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6 lg:items-stretch">
                
                {/* SOL SIDEBAR: KONTROL VE KREDİ ÜNİTESİ */}
                <div className="flex flex-col gap-6 h-full">
                  <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800/50 rounded-2xl p-6 shadow-xl relative overflow-hidden border-t-cyan-500/40 backdrop-blur-md">
                    <div className="flex items-center justify-between">
                      <div className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">Engine Online</div>
                      <div className="text-cyan-400 font-mono font-black text-xl">
                          {credits === 999999 ? '∞ CREDITS' : `${credits} CREDITS`}
                      </div>
                    </div>
                  </div>

                  <div className="relative group/upload h-40 lg:flex-1">
                    <input type="file" multiple onChange={handleUpload} className="absolute inset-0 opacity-0 cursor-pointer z-20" />
                    <div className="h-full border-2 border-dashed border-slate-800 rounded-2xl bg-slate-900/40 group-hover/upload:border-cyan-500/50 transition-all text-center flex flex-col justify-center items-center backdrop-blur-sm">
                      <Upload className="w-10 h-10 text-cyan-500/30 mb-3" />
                      <span className="text-[11px] text-white font-black uppercase tracking-[0.2em]">Drop Technical Assets</span>
                      <span className="text-[9px] text-slate-500 uppercase mt-2 font-bold italic tracking-widest">Supports PNG/JPG</span>
                    </div>
                  </div>

                  {/* REFUEL STATION (ZARİF PAKETLER) */}
                  <div className="bg-slate-900/60 border border-slate-800/50 rounded-2xl p-6 space-y-3 shadow-xl">
                    <h4 className="text-[9px] text-slate-500 font-black uppercase tracking-widest mb-2 px-1 flex items-center gap-2"><Zap className="w-3 h-3" /> Quick Refueling</h4>
                    {[{id: 'extra_10', c: 10, p: 15, l: 'Quick Fix'}, {id: 'extra_50', c: 50, p: 50, l: 'Project Pack', b: true}, {id: 'extra_100', c: 100, p: 90, l: 'Studio Bulk'}].map(pkg => (
                      <button key={pkg.id} onClick={() => openPaymentModal(pkg.id, pkg.p)} className={`w-full p-4 rounded-xl text-left transition-all flex justify-between items-center border ${pkg.b ? 'bg-cyan-500/5 border-cyan-500/30 hover:border-cyan-400' : 'bg-slate-950/50 border-slate-800/50 hover:border-slate-700'}`}>
                        <div><div className={`text-lg font-black ${pkg.b ? 'text-cyan-400' : 'text-white'}`}>+{pkg.c}</div><div className="text-[9px] text-slate-500 font-black uppercase tracking-tighter">{pkg.l}</div></div>
                        <div className="text-slate-300 font-mono text-xs font-bold">${pkg.p}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* SAĞ ANA PANEL: ÜRETİM TERMİNALİ VE AKILLI ANALİZ RAPORU */}
                <div className="flex flex-col gap-6">
                  <div className="bg-gradient-to-br from-slate-900/60 to-slate-950/60 border border-slate-800/50 rounded-[2.5rem] p-10 backdrop-blur-xl shadow-2xl workshop-panel flex-1 flex flex-col min-h-[650px]">
                    <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-800/50">
                      <div>
                        <h2 className="text-white font-black text-2xl uppercase tracking-tight">Production Terminal</h2>
                        <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em]">AI Core v1.2.4 Active</p>
                      </div>
                      <div className="flex items-center gap-3"><div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(6,182,212,0.8)]"></div><span className="text-[10px] text-slate-400 font-mono uppercase italic tracking-widest">Live Feed</span></div>
                    </div>

                    <div className="flex-1 flex flex-col justify-center">
                      <div className="bg-black/40 border border-slate-800/50 rounded-[2.5rem] p-8 flex-1 flex items-center justify-center relative overflow-hidden shadow-inner group mb-8">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.03),transparent_70%)]"></div>
                        {result ? (
                          <img src={`${API_URL}${result.files.svg}?v=${new Date().getTime()}`} className="max-w-full max-h-[450px] object-contain drop-shadow-[0_0_40px_rgba(6,182,212,0.2)] brightness-125 transition-all duration-700" alt="Output" style={{ filter: 'invert(0.9) hue-rotate(180deg)' }} />
                        ) : pendingFile ? (
                          <div className="relative w-full h-full flex items-center justify-center">
                            <img src={URL.createObjectURL(pendingFile)} className="max-w-full max-h-[450px] object-contain opacity-70" alt="Input Source" />
                            {isProcessing && (
                                <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center z-50 text-center px-12">
                                    <div className="text-cyan-400 text-3xl font-black uppercase tracking-[0.5em] animate-pulse mb-4">{processStatus}</div>
                                    <div className="text-[11px] text-slate-400 font-bold uppercase tracking-[0.3em] mb-10 leading-relaxed">Analyzing image quality & technical edge sharpness...</div>
                                    <div className="w-72 h-1 bg-slate-800 rounded-full overflow-hidden relative">
                                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 animate-[laser-scan_2s_linear_infinite]" />
                                    </div>
                                </div>
                            )}
                          </div>
                        ) : (
                          <div className="text-center opacity-20 group-hover:opacity-30 transition-opacity"><Layers className="w-20 h-20 text-slate-400 mx-auto mb-6" /><p className="text-slate-400 text-xs font-black uppercase tracking-[0.5em]">Awaiting Technical Input</p></div>
                        )}
                      </div>

                      {/* --- ONAY PANELİ: ANALİZ BİTİNCE MERKEZDE ÇIKAR --- */}
                      {qualityReport && !result && !isProcessing && (
                        <div className={`animate-fade-in p-8 rounded-[2.5rem] border-2 transition-all mx-auto w-full ${qualityReport.status === 'Excellent' ? 'border-green-500/40 bg-green-950/20' : 'border-red-500/40 bg-red-950/20 shadow-[0_0_50px_rgba(239,68,68,0.1)]'}`}>
                          <div className="flex flex-col items-center text-center gap-6">
                            <div className={`w-16 h-16 rounded-full flex items-center justify-center border-4 ${qualityReport.status === 'Excellent' ? 'border-green-500 bg-green-500/20' : 'border-red-500 bg-red-500/20 animate-pulse'}`}>
                              {qualityReport.status === 'Excellent' ? <Check className="w-8 h-8 text-green-500" /> : <AlertCircle className="w-8 h-8 text-red-500" />}
                            </div>
                            <div className="max-w-xl">
                              <h4 className="text-2xl font-black text-white uppercase tracking-tighter">Diagnostic Result: {qualityReport.status}</h4>
                              <p className="text-slate-300 text-sm mt-2 leading-relaxed italic tracking-wide">"{qualityReport.message}"</p>
                              {qualityReport.status !== 'Excellent' && (
                                <div className="mt-6 flex flex-wrap justify-center gap-3 animate-fade-in">
                                  <span className="text-[9px] px-3 py-1.5 bg-slate-800/80 rounded-full border border-slate-700 text-slate-400 uppercase font-black tracking-widest shadow-lg">💡 Tip: Upscale Image</span>
                                  <span className="text-[9px] px-3 py-1.5 bg-slate-800/80 rounded-full border border-slate-700 text-slate-400 uppercase font-black tracking-widest shadow-lg">💡 Tip: Remove Perspective</span>
                                  <span className="text-[9px] px-3 py-1.5 bg-slate-800/80 rounded-full border border-slate-700 text-slate-400 uppercase font-black tracking-widest shadow-lg">💡 Tip: Use Flat Photos</span>
                                </div>
                              )}
                            </div>
                            <Button variant="gradient" className="w-full py-5 text-lg uppercase tracking-[0.2em] shadow-[0_0_60px_rgba(6,182,212,0.4)] active:scale-95 transition-all" onClick={() => startFinalProcessing(pendingFile)}>
                              {qualityReport.status === 'Excellent' ? "Start Production & Generate Bundle (-1 Credit)" : "I Accept Risks & Generate Bundle (-1 Credit)"}
                            </Button>
                            {qualityReport.status !== 'Excellent' && ( <button onClick={() => {setPendingFile(null); setQualityReport(null);}} className="text-[10px] text-slate-500 font-bold uppercase tracking-widest hover:text-white transition-colors underline decoration-dotted">Or upload a flat front-facing version</button> )}
                          </div>
                        </div>
                      )}

                      {/* --- SONUÇ PANELİ: MM ÖLÇÜLERİ KALDIRILDI, SADECE BUTONLAR KALDI --- */}
                      {result && (
                        <div className="animate-fade-in flex flex-col items-center w-full mx-auto space-y-8">
                          <a href={`${API_URL}${result.files.zip}`} download className="flex items-center justify-between w-full bg-cyan-600 hover:bg-cyan-500 text-white p-8 rounded-[2rem] font-black uppercase tracking-widest text-2xl transition-all shadow-[0_10px_60px_rgba(6,182,212,0.4)] group active:scale-95 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                            <div className="flex flex-col items-start text-left leading-tight">
                              <span>Download Master Bundle (ZIP)</span>
                              <span className="text-[10px] opacity-70 mt-1 uppercase font-bold tracking-tighter">Includes Raw/Smooth DXF, SVG, EPS, PNG & README</span>
                            </div>
                            <Download className="w-12 h-12 group-hover:translate-y-1 transition-all" />
                          </a>
                          
                          <div className="flex flex-col items-center w-full border-t border-slate-800/50 pt-8">
                             <button onClick={() => {setResult(null); setQualityReport(null); setPendingFile(null); window.scrollTo({top: 0, behavior: 'smooth'})}} className="text-[12px] text-slate-500 font-black uppercase tracking-[0.4em] hover:text-cyan-400 transition-colors flex items-center justify-center gap-4 py-4 px-12 border border-slate-800 rounded-full hover:border-cyan-500/50 active:scale-95 shadow-inner bg-slate-950/40">
                                <Plus className="w-4 h-4" /> New Production Cycle
                             </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* 🛡️ KRİTİK PROTOKOL VE DISCLAIMER (PERSPEKTİF UYARISI DAHİL) */}
              <div className="bg-[#0f172a] border-2 border-slate-800 rounded-[2.5rem] p-12 shadow-2xl relative overflow-hidden workshop-panel">
                <div className="absolute top-0 right-0 p-8 opacity-5"><Scissors className="w-32 h-32 text-white" /></div>
                <h4 className="text-3xl font-black text-white mb-10 border-b-2 border-slate-800 pb-6 flex items-center gap-5 tracking-tighter uppercase">
                  <AlertCircle className="w-10 h-10 text-yellow-500" /> Production Safety Protocol
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-[13px] leading-relaxed tracking-wide font-bold uppercase text-slate-300">
                  <div className="space-y-10">
                    <div className="border-l-4 border-red-500 pl-6 py-2 bg-red-500/5 transition-all hover:bg-red-500/10 shadow-lg">
                      <h5 className="text-red-500 mb-3 tracking-[0.2em] text-[15px] font-black">1. PERSPECTIVE & SCENE CLEANUP (MANDATORY):</h5>
                      <p className="leading-relaxed font-bold italic">The AI engine processes pixels based on canvas coordinates. <span className="text-white underline decoration-red-500 decoration-2">DELETE ALL FURNITURE, MOCKUPS, OR BACKGROUNDS</span> before uploading. Angled photos result in skewed vector geometry. Upload <span className="text-cyan-400 underline decoration-2">FLAT, FRONT-FACING</span> original artwork only.</p>
                    </div>
                    <div className="border-l-4 border-slate-700 pl-6 py-2">
                      <h5 className="text-slate-400 mb-3 tracking-[0.2em] text-[15px] font-black">2. QUALITY ACKNOWLEDGMENT:</h5>
                      <p className="italic opacity-80 text-[12px]">Technical precision is directly linked to source resolution. Processing low-res mockup backgrounds will result in skewed and degraded fabrication accuracy.</p>
                    </div>
                  </div>
                  <div className="space-y-10">
                    <div className="border-l-4 border-cyan-500 pl-6 py-2 transition-all hover:bg-cyan-500/5 shadow-lg">
                      <h5 className="text-cyan-500 mb-3 tracking-[0.2em] text-[15px] font-black">3. PRE-CUT VERIFICATION:</h5>
                      <p className="leading-relaxed font-bold uppercase">ALWAYS verify dimensions and path integrity in technical CAD software (AutoCAD, LightBurn, RDWorks) <span className="text-white underline">BEFORE</span> sending files to your machine.</p>
                    </div>
                    <div className="bg-green-500/10 border border-green-500/30 p-8 rounded-3xl shadow-inner relative transition-all hover:bg-green-500/20">
                      <div className="absolute top-4 right-4"><Check className="text-green-500 w-6 h-6 opacity-50" /></div>
                      <h5 className="text-green-400 mb-3 tracking-[0.2em] text-[15px] font-black">4. SATISFACTION GUARANTEE:</h5>
                      <p className="text-green-200 font-medium lowercase italic tracking-normal leading-relaxed leading-relaxed">Conversion unusable? <span className="underline cursor-pointer hover:text-green-400 transition-colors" onClick={() => setIsWaitlistOpen(true)}>Contact support@cuttora.com</span>. We will refund credits instantly or fix technical paths manually.</p>
                    </div>
                  </div>
                </div>
                <div className="mt-12 text-center border-t border-slate-800 pt-8 opacity-50"><p className="text-[10px] text-slate-500 font-black tracking-[0.5em] uppercase">CUTTORA SECURE FABRICATION PROTOCOL — REV 1.2.0</p></div>
              </div>
            </div>
          </section>
        </>
      ) : (
		// --- LANDING PAGE (LOGGED OUT) ---
        <>
            <section className="relative z-10 pt-32 pb-24 px-6">
                <div className="max-w-7xl mx-auto text-center">				
				<Reveal>
					<div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800/40 border border-cyan-500/30 text-cyan-400 text-xs font-bold mb-8 backdrop-blur-md shadow-[0_0_20px_rgba(6,182,212,0.2)] animate-float-delayed hover:bg-slate-800/60 transition-colors cursor-default">
						<span className="flex h-2 w-2 relative">
							<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
							<span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
						</span>
						<span>v1.2 Update: Batch Processing Engine Online</span>
					</div>
				</Reveal>				
                
				<h1 className="text-5xl md:text-8xl font-extrabold text-white tracking-tight mb-8 max-w-6xl mx-auto leading-[1.1] drop-shadow-2xl">
				  Transform AI Art & Images into Precision <br/>
				  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 animate-text-shimmer">
					CNC Vectors
				  </span>
				</h1>

				<Reveal delay={200}>
				  <p className="text-lg md:text-2xl text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed font-normal min-h-[60px]">
					<TypingText 
					  text="From Midjourney to Metal. Automatically convert WebP, photos, and AI-generated art into production-ready DXF & SVG files. No manual tracing required." 
					  speed={30} 
					  delay={500} 
					/>
				  </p>
				</Reveal>
								
				{/* --- ACİL GİRİŞ BUTONU (BURASI YENİ!) --- */}
                <Reveal delay={400}>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-24">
                        <Button variant="gradient" className="w-full sm:w-auto text-xl px-10 py-4 shadow-[0_0_30px_rgba(6,182,212,0.4)]" onClick={() => document.getElementById('pricing').scrollIntoView()}>Get Started Now <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></Button>
                        <Button variant="outline" className="w-full sm:w-auto text-xl px-10 py-4" onClick={manualLogin}>I have a Key</Button>
                    </div>					
				{/* BURAYA EKLE: */}
				<p className="mt-[-4rem] mb-12 text-[10px] text-slate-500 font-black uppercase tracking-[0.3em] flex items-center justify-center gap-2 animate-fade-in">
				  <Lock className="w-3 h-3" /> Risk-Free Trial • 30 Day Money Back Guarantee
				</p>										
                </Reveal>
               
                <Reveal delay={600}><ShowcaseSection /></Reveal>
                
                </div>
            </section>
            
            {/* YENİ VE SINIRLANDIRILMIŞ LOGO BÖLÜMÜ */}
			<section className="py-16 border-y border-slate-800/50 bg-slate-950/40 backdrop-blur-sm relative z-10 overflow-hidden">
			  <div className="max-w-7xl mx-auto overflow-hidden relative px-6">
				{/* Kenar Yumuşatma Maskeleri */}
				<div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-slate-950 to-transparent z-20 pointer-events-none" />
				<div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-slate-950 to-transparent z-20 pointer-events-none" />
				
				<div className="flex animate-scroll whitespace-nowrap gap-20 items-center">
				  {doubledBrands.map((brand, i) => (
					<span key={i} className="text-2xl font-bold font-mono text-slate-400 flex items-center gap-2 hover:text-cyan-400 transition-colors cursor-default flex-shrink-0">
					  <div className="w-6 h-6 bg-slate-800 rounded-sm flex items-center justify-center shadow-[0_0_10px_rgba(255,255,255,0.1)]">
						<div className="w-2 h-2 bg-slate-400 rounded-full"></div>
					  </div>
					  {brand}
					</span>
				  ))}
				</div>
			  </div>
			</section>

            <section id="features" className="py-32 relative z-10">
                <div className="max-w-7xl mx-auto px-6">
                <div className="grid md:grid-cols-2 gap-8">
					<Reveal delay={100}><FeatureCard icon={Cpu} title="Industrial Conversion Pipeline" description="Optimized toolpaths designed specifically for physical output. No double lines or messy nodes." /></Reveal>                    					
					<Reveal delay={200}><FeatureCard icon={Maximize} title="Pre-Production Diagnostic Scan" description="Get a detailed quality report and action plan before you authorize credit usage. Avoid wasted material." /></Reveal>                    					
					<Reveal delay={300}><FeatureCard icon={Layers} title="Smart Auto-Bridging (V2)" description="AI-powered connection for floating islands. Coming in January 2026." badge="Roadmap" /></Reveal>                    	
					<Reveal delay={400}><FeatureCard icon={Zap} title="Industrial Batch Processing" description="Simultaneously process up to 100 designs. Get your entire production library optimized in minutes." /></Reveal>                
					<Reveal delay={500}><FeatureCard icon={Maximize} title="AI Perspective Correction (V2)" description="Automatically flatten angled mockup photos into perfect 2D planes for precise cutting geometry." badge="Roadmap" /></Reveal>
					<Reveal delay={600}><FeatureCard icon={AlertCircle} title="Smart Island Detection (V2)" description="Identify 'islands' or closed paths that would fall out during the cutting process before production." badge="Roadmap" /></Reveal>
				</div>
                </div>
            </section>
            			
			<section id="how-it-works" className="py-32 bg-slate-900/30 relative z-10 border-y border-slate-800/50 backdrop-blur-sm">
				<div className="max-w-7xl mx-auto px-6">
				<Reveal><h2 className="text-5xl md:text-7xl font-extrabold text-white mb-24 text-center tracking-tight">Industrial <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Workflow</span>
				</h2>
				</Reveal>
				<div className="grid md:grid-cols-4 gap-12 relative">
				<Step 
					number="1" 
					title="Asset Ingestion" 
					description="Submit high-contrast PNG/JPG files. Use front-facing artwork to ensure perfect vector geometry." 
				/>
				<Step 
					number="2" 
					title="Batch Pipeline" 
					description="Deploy up to 100 designs simultaneously. Our engine handles mass-optimization in minutes." 
				/>
				<Step 
					number="3" 
					title="Integrity Audit" 
					description="AI scans for resolution and cutting hazards. View your diagnostic report before processing." 
				/>
				<Step 
					number="4" 
					title="Master Bundle" 
					description="Download a secure ZIP containing Raw/Smooth DXF, SVG, EPS, and a Technical README." 
					isLast={true} 
				/>
				</div>
			</div>
			</section>
			
            <section className="py-32 relative z-10">
                <div className="max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div className="relative"><div className="absolute -left-20 -top-20 w-60 h-60 bg-cyan-500/10 rounded-full blur-[80px]"></div><Reveal><h2 className="text-4xl md:text-6xl font-bold text-white mb-8 relative z-10">Who uses Cuttora?</h2><p className="text-slate-300 text-xl mb-10 relative z-10 leading-relaxed font-medium">Whether you're running a massive fiber laser or a desktop vinyl cutter, clean vectors are the difference between profit and wasted material.</p><div className="space-y-6 relative z-10">{["Laser Cutting Services needing fast file prep", "CNC Metal & Wood Workshops", "Cricut & Silhouette Enthusiasts", "Etsy Sellers selling digital cut files"].map((item, i) => (<div key={i} className="flex items-center gap-4 text-slate-300 group hover:text-white transition-colors cursor-default"><div className="w-8 h-8 rounded-full bg-slate-800/50 border border-slate-700 flex items-center justify-center group-hover:border-cyan-500 group-hover:scale-110 transition-all shadow-lg"><Check className="w-4 h-4 text-cyan-400" /></div><span className="text-xl font-medium">{item}</span></div>))}</div></Reveal></div>
                    <div className="grid grid-cols-2 gap-6 relative">
                    <div className="animate-float"><TiltCard><div className="bg-slate-900/60 p-8 rounded-2xl border border-slate-700 backdrop-blur-md flex flex-col items-center text-center hover:border-blue-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.2)] transition-all h-full"><div className="w-14 h-14 bg-blue-500/20 rounded-full flex items-center justify-center mb-4 ring-1 ring-blue-500/50"><Zap className="text-blue-400 w-6 h-6"/></div><h4 className="font-bold text-white text-xl">Laser Ops</h4><p className="text-base text-slate-400 mt-2 font-medium">Save 5hrs/week</p></div></TiltCard></div>
                    <div className="translate-y-12 animate-float-delayed"><TiltCard><div className="bg-slate-900/60 p-8 rounded-2xl border border-slate-700 backdrop-blur-md flex flex-col items-center text-center hover:border-cyan-500 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] transition-all h-full"><div className="w-14 h-14 bg-cyan-500/20 rounded-full flex items-center justify-center mb-4 ring-1 ring-cyan-500/50"><Scissors className="text-cyan-400 w-6 h-6"/></div><h4 className="font-bold text-white text-xl">Crafters</h4><p className="text-base text-slate-400 mt-2 font-medium">Perfect cuts</p></div></TiltCard></div>
                    <div className="animate-float-delayed"><TiltCard><div className="bg-slate-900/60 p-8 rounded-2xl border border-slate-700 backdrop-blur-md flex flex-col items-center text-center hover:border-indigo-500 hover:shadow-[0_0_30px_rgba(99,102,241,0.2)] transition-all h-full"><div className="w-14 h-14 bg-indigo-500/20 rounded-full flex items-center justify-center mb-4 ring-1 ring-indigo-500/50"><Layers className="text-indigo-400 w-6 h-6"/></div><h4 className="font-bold text-white text-xl">CNC Shops</h4><p className="text-base text-slate-400 mt-2 font-medium">Safe toolpaths</p></div></TiltCard></div>
                    <div className="translate-y-12 animate-float"><TiltCard><div className="bg-slate-900/60 p-8 rounded-2xl border border-slate-700 backdrop-blur-md flex flex-col items-center text-center hover:border-emerald-500 hover:shadow-[0_0_30px_rgba(16,185,129,0.2)] transition-all h-full"><div className="w-14 h-14 bg-emerald-500/20 rounded-full flex items-center justify-center mb-4 ring-1 ring-emerald-500/50"><Download className="text-emerald-400 w-6 h-6"/></div><h4 className="font-bold text-white text-xl">Designers</h4><p className="text-base text-slate-400 mt-2 font-medium">Premium files</p></div></TiltCard></div>
                    </div>
                </div>
                </div>
            </section>
            
            <section className="py-32 bg-slate-900/20 relative z-10 border-y border-slate-800/50 backdrop-blur-sm overflow-hidden">
			  <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
				<Reveal>
				  <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
					Feedback from our <span className="text-cyan-400">Private Beta</span>
				  </h2>
				</Reveal>
			  </div>
			  
			  {/* Sınırlandırılmış ve Maskelenmiş Kaydırma Alanı */}
			  <div className="max-w-7xl mx-auto overflow-hidden relative px-6">
				<div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-slate-950 to-transparent z-20 pointer-events-none md:block hidden" />
				<div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-slate-950 to-transparent z-20 pointer-events-none md:block hidden" />
				
				<div className="flex animate-scroll hover:pause-scroll whitespace-nowrap gap-8">
				  {doubledTestimonials.map((t, i) => (
					<div key={i} className="inline-block transform transition-transform hover:scale-105 duration-300">
					  <TestimonialCard quote={t.quote} author={t.author} role={t.role} />
					</div>
				  ))}
				</div>
			  </div>
			</section>

            <section id="pricing" className="py-32 relative z-10">
			  <div className="max-w-7xl mx-auto px-6">
				<Reveal>
				  <div className="text-center mb-20">
					<h2 className="text-4xl md:text-6xl font-bold text-white mb-6">Choose Your Plan</h2>
					<p className="text-slate-300 text-2xl font-light">🔥 Limited offer for the first 500 users.</p>
				  </div>
				</Reveal>
				
				{/* PRICING CARDS LISTER (GÜNCELLENMİŞ VE ZENGİNLEŞTİRİLMİŞ İÇERİK) */}
				<div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
				  
				  {/* 1. STARTER PLAN - HOBİCİLER İÇİN */}
				  <Reveal delay={100} className="h-full">
				    <PricingCard 
				      plan="Starter" 
				      price="$10" 
				      originalPrice="$20" 
				      description="Perfect for testing & hobby projects." 
				      features={[
				        "5 Credits (No Expiration)",
				        "Clean SVG & DXF Export",
				        "Smart Path Closing",
				        "Standard Node Optimization",
				        "Personal Use License"
				      ]} 
				      onJoin={() => openPaymentModal('starter', 10)} 
				    />
				  </Reveal>

				  {/* 2. PRO PLAN - ETSY/SATICILAR İÇİN (En Önemlisi) */}
				  <Reveal delay={200} className="h-full">
				    <PricingCard 
				      plan="Pro" 
				      price="$40" 
				      originalPrice="$80" 
				      description="For Etsy sellers & small workshops." 
				      recommended={true} 
				      features={[
				        "50 Credits ($0.80 / file)",
				        "✨ Batch Processing (NEW)",
				        "Commercial Use License",
				        "Advanced Node Reduction",
				        "Thin Line Safety Check"
				      ]} 
				      onJoin={() => openPaymentModal('pro', 40)} 
				    />
				  </Reveal>

				  {/* 3. AGENCY PLAN - ATÖLYELER İÇİN */}
				  <Reveal delay={300} className="h-full">
				    <PricingCard 
				      plan="Agency" 
				      price="$90" 
				      originalPrice="$180" 
				      description="High volume production ready." 
				      features={[
				        "150 Credits ($0.60 / file)",
				        "Unlimited Batch Size",
				        "Lifetime Commercial Rights",
				        "Priority Server Queue",
				        "Direct Engineer Support"
				      ]} 
				      onJoin={() => openPaymentModal('agency', 90)} 
				    />
				  </Reveal>

				</div>

				{/* ✅ GÜVEN BANDI (DOĞRU HİYERARŞİ) */}
                    <Reveal delay={400}>
                        <div className="mt-16 flex flex-col items-center justify-center">
                            <div className="flex items-center gap-4 px-8 py-5 bg-slate-900/40 border border-green-500/20 rounded-[2rem] backdrop-blur-md shadow-[0_0_40px_rgba(34,197,94,0.1)] group hover:border-green-500/40 transition-all">
                                <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center border border-green-500/30 group-hover:scale-110 transition-transform">
                                    <Check className="w-6 h-6 text-green-400" />
                                </div>
                                <div className="text-left">
                                    <h4 className="text-white font-black uppercase tracking-widest text-xs">30-Day Satisfaction Guarantee</h4>
                                    <p className="text-slate-400 text-[10px] uppercase font-bold mt-1 tracking-tight">
                                        Not satisfied with the vectors? We'll refund your credits or manually fix your file.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Reveal>

                    <div className="text-center mt-12">
                        <p className="text-slate-400 text-lg">
                            Have custom requirements or high volume needs? 
                            <a href="mailto:contact@cuttora.com" className="text-cyan-400 hover:text-cyan-300 font-bold underline transition-colors" onClick={(e) => { e.preventDefault(); setIsWaitlistOpen(true); }}> Contact us</a> for enterprise solutions.
                        </p>
                    </div>
                </div>
            </section>
            
            <section id="faq" className="py-32 relative z-10">
                <div className="max-w-4xl mx-auto px-6">
                    <h2 className="text-5xl md:text-6xl font-bold text-white mb-16 text-center">FAQ</h2>
                    <div className="space-y-4">
                        {faqs.map((item, i) => (
                            <Reveal key={i} delay={i * 100}>
                                <FAQItem question={item.q} answer={item.a} />
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-32 relative z-10">
                <div className="max-w-5xl mx-auto px-6">
                    <Reveal>
                        <TiltCard>
                            <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-cyan-900/30 rounded-[3rem] p-16 text-center border border-slate-600 hover:border-cyan-500/50 transition-all duration-700 overflow-hidden relative group shadow-2xl">
                                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                                <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 relative z-10">Ready to optimize your workflow?</h2>
                                <div className="flex justify-center gap-4 relative z-10">
                                    <Button variant="gradient" className="text-lg px-12 py-5 shadow-2xl" onClick={() => document.getElementById('pricing').scrollIntoView()}>Get Started</Button>
                                </div>
                            </div>
                        </TiltCard>
                    </Reveal>
                </div>
            </section>
        </>
      )}

      <footer className="bg-slate-950 border-t border-slate-800 py-16 relative z-10 text-base font-medium">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-1"><div className="flex items-center gap-2 font-bold text-2xl text-white mb-6"><div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center"><Scissors className="w-4 h-4 text-white" /></div>Cuttora</div><p className="text-slate-300 leading-relaxed text-lg">The AI-powered vector engine for makers, fabricators, and designers.</p></div>
            <div><h4 className="font-bold text-white mb-6 text-xl">Product</h4><ul className="space-y-4 text-slate-300"><li>Features</li><li>Pricing</li><li>API</li><li>Showcase</li></ul></div>
            <div><h4 className="font-bold text-white mb-6 text-xl">Resources</h4><ul className="space-y-4 text-slate-300"><li>Documentation</li><li>Laser Cutting Guide</li><li>Blog</li><li>Community</li></ul></div>
            <div><h4 className="font-bold text-white mb-6 text-xl">Legal</h4><ul className="space-y-4 text-slate-300"><li><button onClick={() => setPrivacyOpen(true)} className="hover:text-cyan-400 transition-colors">Privacy Policy</button></li><li><button onClick={() => setTermsOpen(true)} className="hover:text-cyan-400 transition-colors">Terms of Service</button></li><li><button onClick={() => setCookieOpen(true)} className="hover:text-cyan-400 transition-colors">Cookie Policy</button></li></ul></div>
          </div>
         		  
		  <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-400">
            <p className="text-lg">© 2025 Cuttora Inc. All rights reserved.</p>
            <div className="flex gap-6 items-center">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-500/50 flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse" />
                Community hubs launching Jan 2026
              </span>
            </div>
          </div>
        </div>
      </footer>     
    </div>
  );
}