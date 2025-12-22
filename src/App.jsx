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

const QualityWarningModal = ({ isOpen, onClose, report, startFinalProcessing, pendingFile }) => {
    if (!isOpen || !report) return null;
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-md" onClick={onClose} />
        <div className="relative bg-slate-900 border border-yellow-500/40 rounded-3xl p-8 max-w-md w-full shadow-[0_0_50px_rgba(234,179,8,0.2)] animate-float">
          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-yellow-500/30">
              <AlertCircle className="w-10 h-10 text-yellow-500" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">{report.status}</h3>
            <p className="text-slate-300 text-sm leading-relaxed">{report.message}</p>
          </div>
          
          <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-800 mb-8">
            <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-slate-500 font-mono uppercase">Edge Sharpness Score</span>
                <span className={`font-mono font-bold ${report.energy < 150 ? 'text-red-500' : 'text-yellow-500'}`}>{report.energy}</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-yellow-500 h-full transition-all duration-1000" style={{ width: `${Math.min(report.energy / 5, 100)}%` }} />
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
            I Understand & Accept (-1 Credit)
          </Button>
          <p className="text-[10px] text-slate-500 text-center mt-4 uppercase tracking-widest">Quality Assurance Shield Active</p>
        </div>
      </div>
    );
};



const API_URL = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
  ? "http://127.0.0.1:8000"
  : "https://cuttora-backend-production.up.railway.app";

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

// --- ANNOUNCEMENT BAR ---
const AnnouncementBar = () => (
  <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 text-white py-2 text-center text-sm font-bold tracking-wider animate-text-shimmer bg-[length:200%_auto] relative z-[60]">
    🚀 WE ARE LIVE! <span className="hidden md:inline">- </span> <span className="text-yellow-300">50% OFF</span> LAUNCH SALE FOR THE FIRST 500 USERS
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

// --- PRICING CARDS ---
const PricingCard = ({ plan, price, originalPrice, description, features, recommended = false, onJoin }) => (
  <TiltCard className="h-full">
    <div className={`relative p-10 rounded-3xl border transition-all duration-300 backdrop-blur-md h-full flex flex-col ${recommended ? 'bg-slate-900/90 border-cyan-500 shadow-[0_0_40px_rgba(6,182,212,0.15)] transform md:-translate-y-4' : 'bg-slate-950/80 border-slate-700'}`}>
      <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-1 rounded-full text-xs font-bold tracking-wider uppercase shadow-[0_0_15px_rgba(34,197,94,0.6)] animate-pulse border border-green-400">50% OFF LAUNCH OFFER</div>
      {recommended && <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs px-3 py-1 rounded-bl-xl rounded-tr-xl font-bold">POPULAR</div>}
      <h3 className="text-3xl font-bold text-slate-200 mb-2">{plan}</h3>
      <div className="flex items-baseline gap-3 mb-4"><div className="text-5xl font-bold text-white">{price}</div><div className="text-2xl text-slate-500 line-through decoration-red-500 decoration-2">{originalPrice}</div></div>
      <p className="text-slate-400 text-sm mb-8 uppercase tracking-wider font-semibold">{description}</p>
      <ul className="space-y-5 mb-10">{features.map((feat, idx) => (<li key={idx} className="flex items-start gap-3 text-slate-300 text-lg"><Check className="w-6 h-6 text-cyan-400 shrink-0" />{feat}</li>))}</ul>
      <Button variant={recommended ? 'gradient' : 'outline'} className="w-full justify-center py-4 text-lg mt-auto" onClick={onJoin}>Buy Now</Button>
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
  
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('cuttora_key') || '');
  const [credits, setCredits] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState(null);
  const [serverStatus, setServerStatus] = useState('checking'); 

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20); 
    window.addEventListener('scroll', handleScroll); 
    
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
    return () => window.removeEventListener('scroll', handleScroll); 
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

  // --- 1. AŞAMA: KALİTE ANALİZİ (Kredi Harcamaz) ---
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!apiKey) { alert("Please login with a key."); return; }

    setIsProcessing(true);
    setProcessStatus("Scanning Image Quality..."); // UI'da görünecek ilk mesaj
    
    const fd = new FormData();
    fd.append("file", file);

    try {
        // Backend'deki analiz merkezine gidiyoruz
        const res = await fetch(`${API_URL}/analyze`, { method: "POST", body: fd });
        const data = await res.json();
        const report = data.quality_report; // Backend'den gelen rapor
        
        // Eğer kalite düşükse veya risk varsa modalı aç ve dosyayı hafızaya al
        if (report.status.includes("Warning") || report.energy < 300) {
            setQualityReport(report);
            setPendingFile(file); // Onay verirse kullanmak üzere dosyayı sakla
            setQualityModalOpen(true);
            setIsProcessing(false);
        } else {
            // Kalite "Excellent" ise hiç sormadan asıl işleme geç
            startFinalProcessing(file);
        }
    } catch (err) {
        console.error("Analysis failed, proceeding to direct processing");
        startFinalProcessing(file); // Analiz çökerse kullanıcıyı bekletme, devam et
    }
  };
  
  // --- 2. AŞAMA: ASIL VEKTÖRLEŞTİRME (Kredi Burada Düşer) ---
  const startFinalProcessing = async (file) => {
    setIsProcessing(true);
    
    // Kullanıcıya işlemin aşamalarını hissettiren simülasyon metinleri
    const statusMessages = [
        "Analyzing Geometry...", 
        "Optimizing Nodes...", 
        "Closing Open Paths...", 
        "Generating Production DXF..."
    ];
    let i = 0;
    const interval = setInterval(() => { 
        setProcessStatus(statusMessages[i % 4]); 
        i++; 
    }, 2000);

    const fd = new FormData();
    fd.append("file", file);
    fd.append("api_key", apiKey);

    try {
        const res = await fetch(`${API_URL}/process`, { method: "POST", body: fd });
        const data = await res.json();
        
        if (data.status === "success") {
            setResult(data);
            // Başarılıysa krediyi güncelle
            if (apiKey !== "cuttora_admin_master") {
                fetch(`${API_URL}/api/credits/${apiKey}`)
                  .then(r => r.json())
                  .then(d => setCredits(d.credits));
            }
        } else { 
            alert(data.detail || "Processing failed"); 
        }
    } catch (e) { 
        alert("Connection error during processing."); 
    } finally {
        clearInterval(interval);
        setIsProcessing(false);
    }
  };
  
  const manualLogin = () => {
      const k = prompt("Enter your License Key:");
      if(k) { localStorage.setItem('cuttora_key', k); setApiKey(k); window.location.reload(); }
  };
  
  const logout = () => { localStorage.removeItem('cuttora_key'); setApiKey(''); setResult(null); window.location.reload(); };

  const brands = ['LaserCo', 'MetalArt', 'CricutPro', 'EtsyMakers', 'CNCMasters', 'FabLab'];
  const doubledBrands = [...brands, ...brands]; 
  const testimonials = [
    { quote: "Finally a tool that closes open paths automatically. My plasma cutter didn't stop once.", author: "Mike T.", role: "CNC Operator" },
    { quote: "The node reduction is a game changer. No more messy double lines in my metal cuts.", author: "Sarah K.", role: "Laser Designer" },
    { quote: "DXF export is actually clean. No double lines, no weird spline issues.", author: "James L.", role: "Industrial Engineer" }
  ];
  const doubledTestimonials = [...testimonials, ...testimonials];
  const faqs = [
    { q: "What image formats do you support?", a: "We currently support JPG, PNG, WEBP, and BMP files. We are working on supporting PDF imports soon." },
    { q: "Can I use the output for commercial projects?", a: "Yes! All files generated with Cuttora are royalty-free and yours to use for any commercial fabrication or digital sales." },
    { q: "How accurate is the 'Thin Line' detection?", a: "Our AI is trained specifically for CNC tolerances. It highlights areas that might be too thin for standard plasma or laser kerfs." },
    { q: "Do I need to install any software?", a: "No, Cuttora is 100% web-based. It runs in your browser and uses cloud processing for heavy lifting." },
    { q: "What is coming in Version 2.0?", a: "We are building the future of fabrication! V2 will include Smart Island Detection, Automatic Bridging, Line Thickening tools, and detailed Risk Analysis Reports to ensure perfect cuts every time." }
  ];

  return (
    <div className="min-h-screen text-slate-100 font-sans selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden relative">
      <GlobalStyles />
      <TechBackground />
      <AnnouncementBar />
      <PaymentModal isOpen={paymentModalOpen} onClose={() => setPaymentModalOpen(false)} plan={selectedPlan.name} price={selectedPlan.price} onSubmit={handlePaymentSubmit} />
      <WaitlistModal isOpen={isWaitlistOpen} onClose={() => setIsWaitlistOpen(false)} />
      
      {/* --- LEGAL MODALS (İNGİLİZCE PROTOKOLLER) --- */}
      <LegalModal isOpen={privacyOpen} onClose={() => setPrivacyOpen(false)} title="Privacy Policy" content={`Last Updated: December 2025\n\n1. Data Collection\nWe collect your email address solely for account management and transactional purposes. We do not sell your data.\n\n2. Image Processing\nImages uploaded to Cuttora are processed temporarily on our secure servers to generate vector files. Source files are automatically deleted after 24 hours.\n\n3. Security\nWe implement SSL encryption and use Stripe for secure payment processing.`} />
      <LegalModal isOpen={termsOpen} onClose={() => setTermsOpen(false)} title="Terms of Service" content={`Last Updated: December 2025\n\n1. Usage License\nCuttora grants you a non-exclusive, non-transferable license to use our software for converting raster images to vector formats.\n\n2. User Responsibility\nYou represent that you have the right to use the images you upload.\n\n3. Refund Policy\nDue to the nature of digital goods (API credits), refunds are generally not provided once credits have been utilized.`} />
      <LegalModal isOpen={cookieOpen} onClose={() => setCookieOpen(false)} title="Cookie Policy" content={`Last Updated: December 2025\n\n1. Essential Cookies\nWe use essential cookies to maintain your login session (License Key) and ensure the site functions correctly.`} />

      {/* --- NAVIGATION (TEK KONTROL NOKTASI) --- */}
      <nav className={`w-full z-50 transition-all duration-300 border-b ${isScrolled ? 'fixed top-0 bg-slate-950/80 backdrop-blur-xl border-slate-700/50 py-4 shadow-lg shadow-cyan-900/5' : 'relative bg-transparent border-transparent py-6'}`}>
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
                <span className="text-cyan-400 font-mono font-black border border-cyan-500/30 px-4 py-1.5 rounded-lg bg-cyan-900/20 shadow-inner">CREDITS: {credits}</span>
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
        <section className="pt-8 pb-24 px-6 min-h-screen relative z-10 bg-[#020617] cyber-grid">
          <div className="max-w-6xl mx-auto space-y-8">

            {/* 1. İSTASYON: VARLIK YÜKLEME VE KİMLİK (SABİT ÜST PANEL) */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-[2.5rem] p-10 backdrop-blur-xl shadow-2xl relative overflow-hidden">
              <div className="grid md:grid-cols-3 gap-10 items-center">
                <div className="relative group/upload h-full">
                  <input type="file" onChange={handleUpload} className="absolute inset-0 opacity-0 cursor-pointer z-20" multiple />
                  <div className="border-2 border-dashed border-slate-700 rounded-3xl p-12 bg-black/40 group-hover/upload:border-cyan-500 transition-all text-center h-full flex flex-col justify-center items-center">
                    <Upload className="w-12 h-12 text-cyan-500 mb-4" />
                    <span className="text-xs text-white font-black uppercase tracking-[0.2em]">New Production Asset</span>
                  </div>
                </div>

                <div className="md:col-span-2 bg-black/60 rounded-3xl border border-slate-800 p-8 flex items-center gap-10 min-h-[250px] shadow-inner relative">
                  <div className="w-44 h-44 bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-center overflow-hidden shrink-0 shadow-2xl">
                    {/* CANLI ÖNİZLEME: SVG VARSA SVG, YOKSA PENDING, O DA YOKSA ICON */}
                    {result ? (
                      <img src={`${API_URL}${result.files.svg}`} className="max-w-full max-h-full object-contain" alt="SVG Master" />
                    ) : pendingFile ? (
                      <img src={URL.createObjectURL(pendingFile)} className="max-w-full max-h-full object-contain" alt="Pending" />
                    ) : (
                      <Layers className="w-12 h-12 text-slate-800" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-6">
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full">
                        <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></div>
                        <span className="text-[10px] font-black text-cyan-400 uppercase tracking-widest">System Online</span>
                      </div>
                      <div className="flex flex-col items-end gap-3">
                        <div className="text-cyan-400 font-mono font-black text-2xl tracking-tighter">CREDITS: {credits}</div>
                        {/* ZENGİNLEŞTİRİLMİŞ KREDİ BUTONU */}
                        <button onClick={() => setPaymentModalOpen(true)} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-3 px-6 rounded-xl text-xs uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all">
                          🚀 Add More Credits
                        </button>
                      </div>
                    </div>
                    <h3 className="text-white font-black text-3xl uppercase tracking-tighter truncate max-w-md">
                      {pendingFile ? pendingFile.name : "Waiting for Input..."}
                    </h3>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. İSTASYON: DİAGNOSTİK ANALİZ VE KREDİ ONAYI (SABİT PANEL) */}
            <div className={`transition-all duration-700 ${qualityReport ? 'opacity-100' : 'opacity-40 grayscale pointer-events-none'}`}>
              <div className={`p-10 rounded-[2.5rem] border-l-[16px] flex flex-col lg:flex-row items-center justify-between shadow-2xl ${qualityReport?.energy < 300 ? 'bg-orange-950/40 border-orange-600' : 'bg-slate-900/60 border-slate-700'}`}>
                <div className="flex items-center gap-10">
                  <div className={`w-20 h-20 rounded-full flex items-center justify-center border shadow-2xl ${qualityReport?.energy < 300 ? 'bg-orange-500/20 border-orange-500/40' : 'bg-green-500/20 border-green-500/40'}`}>
                    {qualityReport?.energy < 300 ? <AlertCircle className="w-10 h-10 text-orange-500" /> : <Check className="w-10 h-10 text-green-500" />}
                  </div>
                  <div className="max-w-2xl">
                    <h4 className="text-3xl font-black text-white uppercase tracking-tighter mb-2">
                      Diagnostic Report: {qualityReport ? qualityReport.status : "Awaiting Scan"}
                    </h4>
                    <p className="text-slate-300 text-sm font-bold uppercase tracking-tight leading-relaxed">
                      {qualityReport ? `"${qualityReport.message}"` : "Please upload a file to begin automated technical analysis."}
                      {qualityReport && <span className="block mt-2 text-orange-400">⚠️ IMPORTANT: Authorization will consume 1 credit. Low resolution may affect precision.</span>}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-4 mt-8 lg:mt-0 min-w-[300px]">
                  {qualityReport && !result && (
                    <Button variant="gradient" className="py-6 px-12 text-sm font-black uppercase shadow-2xl" onClick={() => startFinalProcessing(pendingFile)}>
                      Authorize Fabrication (-1 Credit)
                    </Button>
                  )}
                  {result && (
                    <div className="bg-green-500/20 border border-green-500/40 p-5 rounded-2xl text-center shadow-inner">
                      <span className="text-green-400 font-black uppercase text-xs tracking-widest flex items-center justify-center gap-2">
                        <Check className="w-4 h-4" /> Scan Authorized & Successfully Processed
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* 3. İSTASYON: ÜRETİM MERKEZİ VE ONAYLANMIŞ ÇIKTI PAKETİ */}
			<div className={`transition-all duration-700 ${result || isProcessing ? 'opacity-100 scale-100' : 'opacity-20 scale-[0.98] pointer-events-none'}`}>
			  <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-12 shadow-2xl">
				<div className="grid lg:grid-cols-2 gap-16">
				  
				  {/* SOL: ÜRETİLEN SVG ÖNİZLEMESİ (SADECE GÖRÜNÜR YAPILDI) */}
				  <div className="space-y-6">
					<div className="bg-white/5 rounded-[3rem] border border-slate-800 p-10 relative aspect-square flex items-center justify-center shadow-inner overflow-hidden">
					  {isProcessing ? (
						<div className="text-center">
						  <div className="text-cyan-400 text-3xl font-black uppercase tracking-widest animate-pulse mb-4">{processStatus}</div>
						  <div className="w-64 h-1 bg-slate-800 rounded-full overflow-hidden mx-auto"><div className="h-full bg-cyan-500 animate-[laser-scan_2s_linear_infinite]"></div></div>
						</div>
					  ) : (
						<img 
						  src={result ? `${API_URL}${result.files.svg}` : ''} 
						  className="max-w-full max-h-full drop-shadow-[0_0_30px_rgba(255,255,255,0.1)] brightness-125" 
						  alt="Final Production Preview" 
						  style={{ filter: 'invert(0.9) hue-rotate(180deg)' }}
						/>
					  )}
					</div>
				  </div>

				  {/* SAĞ: BACKEND'DEN GELEN TÜM DOSYALARIN LİSTESİ */}
				  <div className="flex flex-col justify-center gap-6">
					{result && (
					  <>
						<div className="bg-slate-950 p-8 rounded-3xl border border-slate-800 mb-4 shadow-xl">
						  <h5 className="text-[11px] text-slate-500 uppercase font-black mb-6 tracking-[0.4em] border-b border-slate-900 pb-3">Technical Specifications</h5>
						  <div className="grid grid-cols-3 gap-8 font-mono text-sm">
							<div><span className="text-slate-600 block mb-2 font-black uppercase text-[10px]">Width</span><span className="text-cyan-400 font-black text-xl">{result.width_mm}mm</span></div>
							<div><span className="text-slate-600 block mb-2 font-black uppercase text-[10px]">Height</span><span className="text-cyan-400 font-black text-xl">{result.height_mm}mm</span></div>
							<div><span className="text-slate-600 block mb-2 font-black uppercase text-[10px]">Nodes</span><span className="text-white font-black text-xl">{result.node_count || 128}</span></div>
						  </div>
						</div>

						<div className="grid gap-4">
						  {/* ANA DXF BUTONU */}
						  <a href={`${API_URL}${result.files.dxf}`} download className="group p-6 bg-slate-950 border border-slate-800 rounded-2xl hover:border-cyan-500 transition-all flex items-center justify-between shadow-xl">
							<span className="font-black text-white text-base uppercase tracking-widest">Industrial DXF Export</span>
							<Download className="w-6 h-6 text-slate-700 group-hover:text-cyan-400" />
						  </a>

						  {/* FULL BUNDLE (LOCAL'DE ÇALIŞAN 7 DOSYALIK SET) */}
						  <a href={`${API_URL}${result.files.zip}`} download className="group p-10 bg-gradient-to-br from-cyan-600/30 to-blue-600/30 border border-cyan-500/40 rounded-[2rem] hover:shadow-[0_0_60px_rgba(6,182,212,0.3)] transition-all flex items-center justify-between border-l-[16px] border-l-cyan-500 shadow-2xl mt-4">
							<div>
							  <div className="font-black text-white text-3xl tracking-tighter uppercase italic">Download Full Bundle</div>
							  <div className="text-[11px] text-cyan-300 font-bold uppercase mt-2 tracking-widest">7 Files: DXF, SVG, EPS, PDF & Assets Included</div>
							</div>
							<Download className="w-12 h-12 text-white shadow-lg" />
						  </a>
						</div>
						
						<button onClick={() => {setResult(null); setQualityReport(null); setPendingFile(null); window.scrollTo({top: 0, behavior: 'smooth'})}} className="w-full py-5 text-[10px] text-slate-600 font-black uppercase tracking-[0.3em] hover:text-cyan-400 transition-all border border-slate-800 rounded-2xl mt-4">
						  Initialize New Production Cycle
						</button>
					  </>
					)}
				  </div>
				</div>
			  </div>
			</div>
			
            {/* 4. İSTASYON: DISCLAIMER & PROTOKOL (SABİT EN ALTA) */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 shadow-2xl">
              <h4 className="text-2xl font-black text-white mb-10 border-b border-slate-800 pb-6 flex items-center gap-4 tracking-tighter uppercase">
                <AlertCircle className="w-8 h-8 text-yellow-500" /> Production Disclaimer & Safety Protocol
              </h4>
              <div className="grid md:grid-cols-2 gap-12 text-[12px] leading-relaxed tracking-wider">
                <div className="space-y-8">
                  <div>
                    <h5 className="text-yellow-500 font-black uppercase mb-3 tracking-[0.2em] text-[13px]">1. Quality Acknowledgment:</h5>
                    <p className="text-slate-300 font-bold uppercase opacity-70">The analysis indicates the source quality of your upload. If "Warning" is displayed, the input image was identified as low-resolution. You acknowledge that output precision is directly linked to input quality.</p>
                  </div>
                  <div>
                    <h5 className="text-yellow-500 font-black uppercase mb-3 tracking-[0.2em] text-[13px]">2. Check Before Cutting:</h5>
                    <p className="text-slate-300 font-bold uppercase opacity-70">Cuttora uses automated AI tools. ALWAYS verify dimensions, curves, and cut paths in your CAD software (AutoCAD, LightBurn, etc.) BEFORE sending files to your machine.</p>
                  </div>
                </div>
                <div className="space-y-8">
                  <div>
                    <h5 className="text-yellow-500 font-black uppercase mb-3 tracking-[0.2em] text-[13px]">3. Liability Limitation:</h5>
                    <p className="text-slate-300 font-bold uppercase opacity-70">Cuttora is NOT responsible for any wasted materials, machine time, or production errors. User assumes full responsibility for the final manufacturing output.</p>
                  </div>
                  <div className="bg-green-500/5 border border-green-500/20 p-8 rounded-2xl shadow-inner">
                    <h5 className="text-green-500 font-black uppercase mb-3 tracking-[0.2em] text-[13px]">4. 100% Satisfaction Guarantee:</h5>
                    <p className="text-green-200 font-bold uppercase opacity-70">If this conversion is not usable: DO NOT cut the material. Contact us immediately at support@cuttora.com. We will refund your credits or manually fix the file.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
						  
		// --- LANDING PAGE (LOGGED OUT) ---
        <>
            <section className="relative z-10 pt-32 pb-24 px-6">
                <div className="max-w-7xl mx-auto text-center">
                <Reveal><div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800/40 border border-slate-600 text-cyan-400 text-xs font-bold mb-8 backdrop-blur-md shadow-[0_0_20px_rgba(6,182,212,0.2)] animate-float-delayed hover:bg-slate-800/60 transition-colors cursor-default"><Sparkles className="w-3 h-3 animate-pulse" /><span>v1.0 Live: AI Vector Engine</span></div></Reveal>
                <h1 className="text-5xl md:text-8xl font-extrabold text-white tracking-tight mb-8 max-w-6xl mx-auto leading-[1.1] drop-shadow-2xl">Turn Any Image Into <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 animate-text-shimmer">Production-Ready Vectors</span></h1>
                <Reveal delay={200}><p className="text-lg md:text-2xl text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed font-normal min-h-[60px]"><TypingText text="Cuttora automatically analyzes geometry and optimizes paths for laser, CNC, and Cricut." speed={30} delay={500} /></p></Reveal>
                
                {/* --- ACİL GİRİŞ BUTONU (BURASI YENİ!) --- */}
                <Reveal delay={400}>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-24">
                        <Button variant="gradient" className="w-full sm:w-auto text-xl px-10 py-4 shadow-[0_0_30px_rgba(6,182,212,0.4)]" onClick={() => document.getElementById('pricing').scrollIntoView()}>Get Started Now <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></Button>
                        <Button variant="outline" className="w-full sm:w-auto text-xl px-10 py-4" onClick={manualLogin}>I have a Key</Button>
                    </div>
                </Reveal>
                
                <Reveal delay={600}><ShowcaseSection /></Reveal>
                
                </div>
            </section>
            
            <section className="py-16 border-y border-slate-800/50 bg-slate-950/40 backdrop-blur-sm relative z-10 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-transparent to-slate-950 z-20 pointer-events-none" /><div className="w-full"><div className="flex overflow-hidden relative w-full"><div className="flex animate-scroll whitespace-nowrap gap-20 items-center">{doubledBrands.map((brand, i) => (<span key={i} className="text-2xl font-bold font-mono text-slate-400 flex items-center gap-2 hover:text-cyan-400 transition-colors cursor-default transform duration-300 flex-shrink-0"><div className="w-6 h-6 bg-slate-800 rounded-sm flex items-center justify-center shadow-[0_0_10px_rgba(255,255,255,0.1)]"><div className="w-2 h-2 bg-slate-400 rounded-full"></div></div>{brand}</span>))} </div></div></div>
            </section>

            <section id="features" className="py-32 relative z-10">
                <div className="max-w-7xl mx-auto px-6">
                <div className="grid md:grid-cols-2 gap-8">
                    <Reveal delay={100}><FeatureCard icon={Cpu} title="Smart Vector Engine" description="Proprietary AI tracing algorithms designed specifically for physical output." /></Reveal>
                    <Reveal delay={200}><FeatureCard icon={Maximize} title="Cut-Safe Analysis" description="Never fail a cut again. Cuttora identifies lines that fall below standard tolerances so you can fix them before cutting." /></Reveal>
                    <Reveal delay={300}><FeatureCard icon={Layers} title="Smart Auto-Bridging" description="Experimental feature to help connect floating islands. Great for stencil fonts and simple shapes." badge="Beta" /></Reveal>
                    <Reveal delay={400}><FeatureCard icon={Zap} title="DXF Optimization" description="Native DXF export optimized for CNC software. Merges polylines and removes zero-length segments for smoothest movement." /></Reveal>
                </div>
                </div>
            </section>
            
            <section id="how-it-works" className="py-32 bg-slate-900/30 relative z-10 border-y border-slate-800/50 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-6">
                <Reveal><h2 className="text-4xl md:text-6xl font-bold text-white mb-24 text-center">From Pixel to Part</h2></Reveal>
                <div className="grid md:grid-cols-4 gap-12 relative"><Step number="1" title="Upload" description="Upload your design (PNG/JPG). Black & white or high-contrast images yield the best results." /><Step number="2" title="AI Analysis" description="Our engine identifies shapes, contours, and potential cutting hazards." /><Step number="3" title="Optimize" description="Paths are smoothed, nodes are reduced, and geometry is cleaned for faster machining." /><Step number="4" title="Fabricate" description="Download production-ready DXF or SVG files instantly." isLast={true} /></div>
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
                <div className="max-w-7xl mx-auto px-6 mb-16 text-center"><Reveal><h2 className="text-4xl md:text-6xl font-bold text-white mb-6">Feedback from our <span className="text-cyan-400">Private Beta</span></h2></Reveal></div>
                <div className="flex overflow-hidden w-full relative"><div className="flex animate-scroll hover:pause-scroll whitespace-nowrap gap-8 pl-6">{doubledTestimonials.map((t, i) => (<div key={i} className="inline-block transform transition-transform hover:scale-105 duration-300"><TestimonialCard quote={t.quote} author={t.author} role={t.role} /></div>))}</div></div>
            </section>

            <section id="pricing" className="py-32 relative z-10">
                <div className="max-w-7xl mx-auto px-6">
                <Reveal><div className="text-center mb-20"><h2 className="text-4xl md:text-6xl font-bold text-white mb-6">Choose Your Plan</h2><p className="text-slate-300 text-2xl font-light">Limited offer for the first 500 users.</p></div></Reveal>
                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto items-stretch">
                    <Reveal delay={100} className="h-full"><PricingCard plan="Starter" price="$10" originalPrice="$20" description="5 Credits" features={["No Expiration Date", "Standard & High-Res", "Basic Optimization", "Community Support"]} onJoin={() => openPaymentModal('starter', 10)} /></Reveal>
                    <Reveal delay={200} className="h-full"><PricingCard plan="Pro" price="$40" originalPrice="$80" description="50 Credits" recommended={true} features={["Save 20% Per File", "Advanced DXF & SVG", "Priority Processing", "Node Reduction", "Email Support"]} onJoin={() => openPaymentModal('pro', 40)} /></Reveal>
                    <Reveal delay={300} className="h-full"><PricingCard plan="Agency" price="$90" originalPrice="$180" description="150 Credits" features={["Best Value: $0.60/file", "Commercial License", "Bulk Processing Tools", "White-label Options"]} onJoin={() => openPaymentModal('agency', 90)} /></Reveal>
                </div>
                <div className="text-center mt-12"><p className="text-slate-400 text-lg">Have custom requirements or high volume needs? <a href="mailto:contact@cuttora.com" className="text-cyan-400 hover:text-cyan-300 font-bold underline transition-colors" onClick={(e) => { e.preventDefault(); setIsWaitlistOpen(true); }}>Contact us</a> for enterprise solutions.</p></div>
                </div>
            </section>
            
            <section id="faq" className="py-32 relative z-10">
                <div className="max-w-4xl mx-auto px-6">
                <h2 className="text-5xl md:text-6xl font-bold text-white mb-16 text-center">FAQ</h2>
                <div className="space-y-4">{faqs.map((item, i) => (<Reveal key={i} delay={i * 100}><FAQItem question={item.q} answer={item.a} /></Reveal>))}</div>
                </div>
            </section>

            <section className="py-32 relative z-10">
                <div className="max-w-5xl mx-auto px-6">
                <Reveal>
                    <TiltCard>
                    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-cyan-900/30 rounded-[3rem] p-16 text-center border border-slate-600 hover:border-cyan-500/50 transition-all duration-700 overflow-hidden relative group shadow-2xl">
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                        <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 relative z-10">Ready to optimize your workflow?</h2>
                        <div className="flex justify-center gap-4 relative z-10"><Button variant="gradient" className="text-lg px-12 py-5 shadow-2xl" onClick={() => document.getElementById('pricing').scrollIntoView()}>Get Started</Button></div>
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
            <div className="flex gap-6">
              <div className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center hover:bg-cyan-500 hover:text-white cursor-pointer transition-all border border-slate-700 hover:border-cyan-400"><span className="font-bold text-sm">𝕏</span></div>
              <div className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center hover:bg-cyan-500 hover:text-white cursor-pointer transition-all border border-slate-700 hover:border-cyan-400"><span className="font-bold text-sm">In</span></div>
              <div className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center hover:bg-cyan-500 hover:text-white cursor-pointer transition-all border border-slate-700 hover:border-cyan-400"><span className="font-bold text-sm">Ig</span></div>
            </div>
          </div>
        </div>
      </footer>     
    </div>
  );
}