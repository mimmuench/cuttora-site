import React, { useState, useEffect, useRef } from 'react';

// Render Backend URL
const API_URL = "https://cuttora-backend.onrender.com"; 

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
const Minus = (props) => (<IconWrapper {...props}><line x1="5" y1="12" x2="19" y2="12" /></IconWrapper>);
const ArrowLeft = (props) => (<IconWrapper {...props}><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></IconWrapper>);

// --- Styles & Animations ---
const GlobalStyles = () => (
  <style>{`
    @keyframes laser-scan { 0% { top: 0%; opacity: 0; } 50% { opacity: 1; } 100% { top: 100%; opacity: 0; } }
    @keyframes text-shimmer { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
    @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
    @keyframes blink-slow { 0%, 100% { opacity: 0.3; } 50% { opacity: 0.8; } }
    @keyframes scroll-left { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
    .animate-text-shimmer { background-size: 200% auto; animation: text-shimmer 3s linear infinite; }
    .animate-float { animation: float 6s ease-in-out infinite; }
    .animate-float-delayed { animation: float 6s ease-in-out 3s infinite; }
    .laser-line { box-shadow: 0 0 15px #06b6d4, 0 0 30px #3b82f6; }
    .animate-scroll { animation: scroll-left 60s linear infinite; }
    .animate-scroll:hover { animation-play-state: paused; }
    .no-scrollbar::-webkit-scrollbar { display: none; }
    .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
  `}</style>
);

// --- Helper Components ---
const Reveal = ({ children, delay = 0, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setIsVisible(true); }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
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

const TechBackground = () => (
  <div className="fixed inset-0 z-0 pointer-events-none bg-[#020617] overflow-hidden">
    <div className="absolute inset-0" style={{ backgroundImage: `linear-gradient(to right, rgba(51, 65, 85, 0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(51, 65, 85, 0.4) 1px, transparent 1px)`, backgroundSize: '100px 100px', maskImage: 'radial-gradient(circle at 50% 50%, black 40%, transparent 100%)' }} />
    <div className="absolute top-[15%] left-[10%] text-cyan-500/40 font-mono text-xs flex items-center gap-2 animate-[blink-slow_4s_infinite]"><div className="w-4 h-4 border-l border-t border-cyan-500/60 relative"><div className="absolute -top-[1px] -left-[1px] w-1 h-1 bg-cyan-400"></div></div><span>X: 1024.05</span></div>
    <div className="absolute bottom-[10%] right-[5%] text-cyan-500/40 font-mono text-xs flex items-center gap-2 animate-[blink-slow_7s_infinite]"><span>SCALE: 1:1</span></div>
    <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#020617]/50 to-[#020617]" />
  </div>
);

const Button = ({ children, variant = 'primary', className = '', onClick, ...props }) => {
  const baseStyle = "px-6 py-3 rounded-lg font-bold transition-all duration-300 flex items-center gap-2 group relative overflow-hidden cursor-pointer";
  const variants = {
    primary: "bg-white text-slate-950 hover:bg-cyan-50 hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.4)]",
    gradient: "bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 bg-[length:200%_auto] animate-text-shimmer text-white hover:shadow-[0_0_40px_rgba(6,182,212,0.6)] border border-transparent hover:scale-105",
    outline: "border border-slate-600 text-slate-200 hover:border-cyan-400 hover:text-white bg-transparent hover:bg-slate-800/50 backdrop-blur-sm",
  };
  return <button className={`${baseStyle} ${variants[variant]} ${className}`} onClick={onClick} {...props}><span className="relative z-10 flex items-center gap-2">{children}</span></button>;
};

// --- Modals & Content ---
const WaitlistModal = ({ isOpen, onClose }) => {
  const [status, setStatus] = useState('idle');
  const [email, setEmail] = useState("");
  useEffect(() => { if(isOpen) { setStatus('idle'); setEmail(""); } }, [isOpen]);
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
            <div className="text-center py-8"><div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-500/30"><Check className="w-8 h-8 text-green-400" /></div><h3 className="text-2xl font-bold text-white mb-2">You're on the list!</h3></div>
        ) : (
            <>
              <div className="text-center mb-6"><div className="w-12 h-12 bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-cyan-500/30"><Sparkles className="w-6 h-6 text-cyan-400" /></div><h3 className="text-2xl font-bold text-white mb-2">Join the Waitlist</h3></div>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div><label className="block text-sm font-medium text-slate-300 mb-1">Email Address</label><input type="email" placeholder="you@company.com" className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors" required value={email} onChange={(e) => setEmail(e.target.value)} disabled={status === 'submitting'} /></div>
                <Button variant="gradient" className="w-full justify-center" disabled={status === 'submitting'}>{status === 'submitting' ? 'Joining...' : 'Get Early Access'}</Button>
              </form>
            </>
        )}
      </div>
    </div>
  );
};

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-slate-800 last:border-0">
      <button className="w-full py-6 flex items-center justify-between text-left group" onClick={() => setIsOpen(!isOpen)}>
        <span className="text-lg font-medium text-slate-200 group-hover:text-cyan-400 transition-colors">{question}</span>
        {isOpen ? <Minus className="w-5 h-5 text-cyan-400" /> : <Plus className="w-5 h-5 text-slate-500 group-hover:text-cyan-400" />}
      </button>
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100 pb-6' : 'max-h-0 opacity-0'}`}><p className="text-slate-400 leading-relaxed">{answer}</p></div>
    </div>
  );
};

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

// --- PRICING CARDS (TEMİZLENDİ) ---
const PricingCard = ({ plan, price, description, features, recommended = false, onJoin }) => (
  <TiltCard className="h-full">
    <div className={`relative p-8 rounded-2xl border transition-all duration-300 backdrop-blur-md h-full flex flex-col ${recommended ? 'bg-slate-900/90 border-cyan-500 shadow-[0_0_40px_rgba(6,182,212,0.15)] transform md:-translate-y-4' : 'bg-slate-950/80 border-slate-700'}`}>
      {recommended && <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-1 rounded-full text-xs font-bold tracking-wider uppercase shadow-[0_0_15px_rgba(6,182,212,0.6)] animate-pulse">Most Popular</div>}
      <h3 className="text-xl font-bold text-slate-200 mb-2">{plan}</h3>
      <div className="text-3xl font-bold text-white mb-2">{price}</div>
      <p className="text-slate-400 text-sm mb-6 uppercase">{description}</p>
      <ul className="space-y-4 mb-8">{features.map((feat, idx) => (<li key={idx} className="flex items-start gap-3 text-slate-300 text-base"><Check className="w-5 h-5 text-cyan-400 shrink-0" />{feat}</li>))}</ul>
      <Button variant={recommended ? 'gradient' : 'outline'} className="w-full justify-center mt-auto" onClick={onJoin}>{plan === 'Enterprise' ? 'Contact Sales' : 'Buy Now'}</Button>
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

// --- VISUAL COMPARISON ---
const BeforeAfterVisual = () => {
    const [activeTab, setActiveTab] = useState('after');
    return (
      <div className="w-full max-w-4xl mx-auto mt-16 bg-slate-900/90 rounded-xl border border-slate-600 overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] relative group backdrop-blur-sm transform transition-transform hover:scale-[1.01] duration-500">
        <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden rounded-xl">
          <div className="w-full h-[2px] bg-cyan-400 absolute laser-line opacity-50" style={{ animation: 'laser-scan 4s cubic-bezier(0.4, 0, 0.2, 1) infinite' }}></div>
        </div>
        <div className="flex border-b border-slate-700 relative z-30 bg-slate-950/50">
          <button onClick={() => setActiveTab('before')} className={`flex-1 py-4 text-sm font-bold transition-colors ${activeTab === 'before' ? 'bg-slate-800 text-white shadow-[inset_0_-2px_0_#94a3b8]' : 'text-slate-400 hover:text-white'}`}>Original Upload (Raster)</button>
          <button onClick={() => setActiveTab('after')} className={`flex-1 py-4 text-sm font-bold transition-colors ${activeTab === 'after' ? 'bg-cyan-500/10 text-cyan-400 shadow-[inset_0_-2px_0_#06b6d4]' : 'text-slate-400 hover:text-white'}`}>Cuttora Output (Vector)</button>
        </div>
        <div className="p-8 md:p-12 min-h-[400px] flex items-center justify-center relative bg-slate-950 transition-all duration-500">
           <div className="absolute inset-0 opacity-20" style={{backgroundImage: 'linear-gradient(#334155 1px, transparent 1px), linear-gradient(90deg, #334155 1px, transparent 1px)', backgroundSize: '40px 40px'}}></div>
          {activeTab === 'before' ? (
            <div className="relative z-10 animate-fade-in text-center text-red-400 font-mono font-bold bg-slate-950/90 px-6 py-4 rounded border border-red-900/50 backdrop-blur-md shadow-2xl flex flex-col gap-2"><span>❌ Pixelated (Raster)</span><span>❌ Unsafe Lines</span></div>
          ) : (
             <div className="relative z-10 text-center text-cyan-400 font-mono font-bold bg-slate-950/90 px-6 py-4 rounded border border-cyan-900/50 backdrop-blur-md shadow-2xl flex flex-col gap-2"><span>✓ Vector Ready (SVG)</span><span>✓ Cut Safe</span></div>
          )}
        </div>
      </div>
    );
};

// --- MAIN APP ---
export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Logic States
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('cuttora_key') || '');
  const [credits, setCredits] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => { 
    const handleScroll = () => setIsScrolled(window.scrollY > 20); 
    window.addEventListener('scroll', handleScroll); 
    
    // Check for Payment Success URL
    const p = new URLSearchParams(window.location.search);
    if (p.get('success') === 'true' && p.get('key')) {
      const newKey = p.get('key');
      localStorage.setItem('cuttora_key', newKey);
      setApiKey(newKey);
      alert(`🎉 Payment Successful! \n\nYour License Key: ${newKey}\n\nPlease save this key safely!`);
      window.history.replaceState({}, '', window.location.pathname);
    }
    
    // Fetch Credits (Error handling for sleeping server)
    if(apiKey) {
       fetch(`${API_URL}/api/credits/${apiKey}`)
        .then(r => { if(!r.ok) throw new Error("Server sleeping"); return r.json(); })
        .then(d=>setCredits(d.credits))
        .catch(e => { console.log("Server might be waking up:", e); });
    }
    return () => window.removeEventListener('scroll', handleScroll); 
  }, [apiKey]);

  const handleBuy = async (packageType, price) => {
    if(packageType === 'Enterprise') { setIsModalOpen(true); return; }
    
    const email = prompt(`Secure Payment for ${packageType} ($${price})\n\nPlease enter your email to receive the checkout link:`);
    if(!email) return;
    
    const fd = new FormData();
    fd.append("email", email);
    fd.append("package_type", packageType.toLowerCase()); 
    
    try {
        const res = await fetch(`${API_URL}/api/create-checkout`, { method: "POST", body: fd });
        if(!res.ok) { alert("Server is waking up (approx. 1 min). Please try again."); return; }
        const data = await res.json();
        if(data.url) window.location.href = data.url; 
        else alert("Error: " + data.error);
    } catch(e) { alert("Server is waking up from sleep mode. Please wait 1 minute and try again."); }
  };

  const handleUpload = async (e) => {
      const file = e.target.files[0];
      if(!file) return;
      if(!apiKey) { alert("Please buy a package first."); return; }
      
      setIsProcessing(true);
      const fd = new FormData();
      fd.append("file", file);
      fd.append("api_key", apiKey);

      try {
          const res = await fetch(`${API_URL}/process`, { method: "POST", body: fd });
          if(res.ok) {
              const data = await res.json();
              if(data.status === "success") {
                  setResult(data);
                  fetch(`${API_URL}/api/credits/${apiKey}`).then(r=>r.json()).then(d=>setCredits(d.credits));
              } else { alert("Error: " + data.detail); }
          } else { alert("Server Error (Check Credits or File Type)."); }
      } catch(e) { alert("Connection Error. Server might be sleeping."); }
      setIsProcessing(false);
  };

  const manualLogin = () => {
      const k = prompt("Enter your License Key:");
      if(k) { localStorage.setItem('cuttora_key', k); setApiKey(k); window.location.reload(); }
  };
  
  // LOGOUT
  const logout = () => {
      localStorage.removeItem('cuttora_key');
      setApiKey('');
      setResult(null);
      window.location.reload();
  };

  // --- STATIC DATA ---
  const brands = ['LaserCo', 'MetalArt', 'CricutPro', 'EtsyMakers', 'CNCMasters', 'FabLab'];
  const doubledBrands = [...brands, ...brands]; 
  const testimonials = [
    { quote: "Finally a tool that closes open paths automatically. My plasma cutter didn't stop once.", author: "Mike T.", role: "CNC Plasma Operator" },
    { quote: "The node reduction is a game changer. No more messy double lines in my metal cuts.", author: "Sarah K.", role: "Laser Cut Designer" },
    { quote: "I threw a terrible low-res JPG at it, expecting garbage. It gave me a clean, usable DXF.", author: "David R.", role: "Shop Owner" },
    { quote: "DXF export is actually clean. No double lines, no weird spline issues.", author: "James L.", role: "Industrial Engineer" }
  ];
  const doubledTestimonials = [...testimonials, ...testimonials];
  const faqs = [
    { q: "What image formats do you support?", a: "We currently support JPG, PNG, WEBP, and BMP files." },
    { q: "Can I use the output for commercial projects?", a: "Yes! All files generated with Cuttora are royalty-free." },
    { q: "Do I need to install any software?", a: "No, Cuttora is 100% web-based." },
    { q: "How do credits work?", a: "You pay once for a package. Credits never expire. Use them whenever you want." }
  ];

  return (
    <div className="min-h-screen text-slate-100 font-sans selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden relative">
      <GlobalStyles />
      <TechBackground />
      <WaitlistModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${isScrolled ? 'bg-slate-950/80 backdrop-blur-xl border-slate-700/50 py-4 shadow-lg shadow-cyan-900/5' : 'bg-transparent border-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2 font-bold text-2xl tracking-tight text-white group cursor-pointer">
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center transform group-hover:rotate-12 transition-transform shadow-[0_0_15px_rgba(6,182,212,0.5)]"><Scissors className="w-5 h-5 text-white" /></div>
            <span className="group-hover:text-cyan-200 transition-colors">Cuttora</span>
          </div>
          <div className="hidden md:flex items-center gap-4">
             {apiKey ? (
                 <div className="flex items-center gap-4">
                     <span className="text-cyan-400 font-mono font-bold border border-cyan-500/30 px-3 py-1 rounded bg-cyan-900/20">Credits: {credits}</span>
                     <Button variant="outline" className="py-2 px-4 text-sm bg-red-500/10 border-red-500/50 hover:bg-red-500 hover:text-white" onClick={logout}>Log Out</Button>
                 </div>
             ) : (
                 <>
                    <div className="hidden md:flex items-center gap-8">
                        {['Features', 'How it Works', 'Pricing', 'FAQ'].map((item) => (
                        <a key={item} href={`#${item.toLowerCase().replace(/\s+/g, '-')}`} className="text-base font-medium text-slate-300 hover:text-cyan-400 transition-colors relative group">{item}<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full"></span></a>
                        ))}
                    </div>
                    <Button variant="outline" className="py-2 px-4 text-sm border-slate-500 ml-4" onClick={manualLogin}>I have a Key</Button>
                 </>
             )}
          </div>
          <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>{mobileMenuOpen ? <X /> : <Menu />}</button>
        </div>
        
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-slate-900/95 backdrop-blur-xl border-b border-slate-800 p-6 flex flex-col gap-4 md:hidden animate-fade-in-down">
            <a href="#features" className="text-slate-200 py-3 text-lg" onClick={() => setMobileMenuOpen(false)}>Features</a>
            <a href="#how-it-works" className="text-slate-200 py-3 text-lg" onClick={() => setMobileMenuOpen(false)}>How it Works</a>
            <a href="#pricing" className="text-slate-200 py-3 text-lg" onClick={() => setMobileMenuOpen(false)}>Pricing</a>
            <Button variant="primary" className="w-full justify-center mt-2" onClick={manualLogin}>Login with Key</Button>
          </div>
        )}
      </nav>

      {apiKey ? (
        // --- WORKSPACE (LOGGED IN) ---
        <section className="pt-44 pb-24 px-6 min-h-screen relative">
            {/* BACK TO HOME BUTTON */}
            <div className="absolute top-24 left-6 md:left-20 z-50">
                <button onClick={logout} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors bg-slate-900/50 px-4 py-2 rounded-full border border-slate-700 hover:border-cyan-500">
                    <ArrowLeft className="w-4 h-4"/> Back to Home / Logout
                </button>
            </div>

             <div className="max-w-4xl mx-auto">
                 <Reveal>
                     <div className="bg-slate-900/80 border border-slate-700 rounded-2xl p-8 backdrop-blur-md shadow-2xl">
                         <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3"><Zap className="text-cyan-400"/> Cuttora Workshop</h2>
                         
                         <div className="mb-8 p-6 border-2 border-dashed border-slate-700 rounded-xl hover:border-cyan-500 hover:bg-slate-800/50 transition-all text-center group cursor-pointer relative">
                             <input type="file" onChange={handleUpload} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                             <Upload className="w-12 h-12 text-slate-500 mx-auto mb-4 group-hover:text-cyan-400 transition-colors" />
                             <p className="text-xl font-bold text-slate-300">Click to Upload Image</p>
                             <p className="text-sm text-slate-500">JPG, PNG or WEBP</p>
                         </div>

                         {isProcessing && (
                             <div className="text-center py-8 animate-pulse">
                                 <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                                 <p className="text-cyan-400 font-mono">Processing Geometry...</p>
                                 <p className="text-slate-500 text-xs mt-2">Connecting to Vector Engine...</p>
                             </div>
                         )}

                         {result && (
                             <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6 animate-fade-in">
                                 <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><Check className="text-green-400"/> Conversion Complete!</h3>
                                 <div className="grid md:grid-cols-2 gap-4">
                                     <img src={`${API_URL}${result.preview_url}`} alt="Preview" className="rounded-lg border border-slate-700 bg-white" />
                                     <div className="flex flex-col justify-center gap-4">
                                         <a href={`${API_URL}${result.files.zip}`} className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors">
                                             <Download className="w-5 h-5"/> Download ZIP Bundle
                                         </a>
                                         <a href={`${API_URL}${result.files.svg}`} target="_blank" className="w-full border border-slate-600 hover:border-white text-slate-300 hover:text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors">
                                             View SVG
                                         </a>
                                     </div>
                                 </div>
                             </div>
                         )}
                     </div>
                 </Reveal>
             </div>
        </section>
      ) : (
        // --- LANDING PAGE (LOGGED OUT) ---
        <>
            <section className="relative z-10 pt-44 pb-24 px-6">
                <div className="max-w-7xl mx-auto text-center">
                <Reveal><div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800/40 border border-slate-600 text-cyan-400 text-xs font-bold mb-8 backdrop-blur-md shadow-[0_0_20px_rgba(6,182,212,0.2)] animate-float-delayed hover:bg-slate-800/60 transition-colors cursor-default"><Sparkles className="w-3 h-3 animate-pulse" /><span>v1.0 Live: AI Vector Engine</span></div></Reveal>
                <h1 className="text-5xl md:text-8xl font-extrabold text-white tracking-tight mb-8 max-w-6xl mx-auto leading-[1.1] drop-shadow-2xl">Turn Any Image Into <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 animate-text-shimmer">Production-Ready Vectors</span></h1>
                <Reveal delay={200}><p className="text-lg md:text-2xl text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed font-normal min-h-[60px]"><TypingText text="Cuttora automatically analyzes geometry and optimizes paths for laser, CNC, and Cricut." speed={30} delay={500} /></p></Reveal>
                <Reveal delay={400}><div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-24"><Button variant="gradient" className="w-full sm:w-auto text-xl px-10 py-4 shadow-[0_0_30px_rgba(6,182,212,0.4)]" onClick={() => document.getElementById('pricing').scrollIntoView()}>Get Started Now <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></Button></div></Reveal>
                <Reveal delay={600}><BeforeAfterVisual /></Reveal>
                </div>
            </section>
            
            <section className="py-16 border-y border-slate-800/50 bg-slate-950/40 backdrop-blur-sm relative z-10 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-transparent to-slate-950 z-20 pointer-events-none" />
                <div className="w-full">
                <p className="text-sm text-cyan-400 font-bold uppercase tracking-[0.2em] mb-10 text-center">Trusted by 10,000+ Fabricators</p>
                <div className="flex overflow-hidden relative w-full">
                    <div className="flex animate-scroll whitespace-nowrap gap-20 items-center">
                    {doubledBrands.map((brand, i) => (<span key={i} className="text-2xl font-bold font-mono text-slate-400 flex items-center gap-2 hover:text-cyan-400 transition-colors cursor-default transform duration-300 flex-shrink-0"><div className="w-6 h-6 bg-slate-800 rounded-sm flex items-center justify-center shadow-[0_0_10px_rgba(255,255,255,0.1)]"><div className="w-2 h-2 bg-slate-400 rounded-full"></div></div>{brand}</span>))} 
                    </div>
                </div>
                </div>
            </section>

            <section id="features" className="py-32 relative z-10">
                <div className="max-w-7xl mx-auto px-6">
                <div className="grid md:grid-cols-2 gap-8">
                    <Reveal delay={100}><FeatureCard icon={Cpu} title="Smart Vector Engine" description="Proprietary AI tracing algorithms designed specifically for physical output." /></Reveal>
                    <Reveal delay={200}><FeatureCard icon={Maximize} title="Cut-Safe Analysis" description="Never fail a cut again. Cuttora automatically analyzes lines that fall below your machine's tolerance." /></Reveal>
                    <Reveal delay={300}><FeatureCard icon={Layers} title="Smart Auto-Bridging" description="Automatically connect floating islands to prevent lost parts." badge="Beta" /></Reveal>
                    <Reveal delay={400}><FeatureCard icon={Zap} title="DXF Optimization" description="Native DXF export optimized for CNC software. Merges polylines and removes zero-length segments." /></Reveal>
                </div>
                </div>
            </section>
            
            <section id="how-it-works" className="py-32 bg-slate-900/30 relative z-10 border-y border-slate-800/50 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-6">
                <Reveal><h2 className="text-4xl md:text-6xl font-bold text-white mb-24 text-center">From Pixel to Part</h2></Reveal>
                <div className="grid md:grid-cols-4 gap-12 relative">
                    <Step number="1" title="Upload" description="Drag & drop any PNG, JPG, or SVG sketch." />
                    <Step number="2" title="AI Analysis" description="Our engine identifies shapes, contours, and potential cutting hazards." />
                    <Step number="3" title="Optimize" description="Paths are smoothed, nodes reduced, and errors highlighted." />
                    <Step number="4" title="Fabricate" description="Download production-ready DXF or SVG files instantly." isLast={true} />
                </div>
                </div>
            </section>
            
            <section className="py-32 relative z-10">
                <div className="max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div className="relative"><div className="absolute -left-20 -top-20 w-60 h-60 bg-cyan-500/10 rounded-full blur-[80px]"></div><Reveal><h2 className="text-4xl md:text-6xl font-bold text-white mb-8 relative z-10">Who uses Cuttora?</h2><p className="text-slate-300 text-xl mb-10 relative z-10 leading-relaxed font-medium">Whether you're running a massive fiber laser or a desktop vinyl cutter, clean vectors are the difference between profit and wasted material.</p><div className="space-y-6 relative z-10">{["Laser Cutting Services", "CNC Metal & Wood Workshops", "Cricut & Silhouette Enthusiasts", "Etsy Sellers"].map((item, i) => (<div key={i} className="flex items-center gap-4 text-slate-300 group hover:text-white transition-colors cursor-default"><div className="w-8 h-8 rounded-full bg-slate-800/50 border border-slate-700 flex items-center justify-center group-hover:border-cyan-500 group-hover:scale-110 transition-all shadow-lg"><Check className="w-4 h-4 text-cyan-400" /></div><span className="text-xl font-medium">{item}</span></div>))}</div></Reveal></div>
                    <div className="grid grid-cols-2 gap-6 relative">
                    <div className="animate-float"><TiltCard><div className="bg-slate-900/60 p-8 rounded-2xl border border-slate-700 backdrop-blur-md flex flex-col items-center text-center hover:border-blue-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.2)] transition-all h-full"><div className="w-14 h-14 bg-blue-500/20 rounded-full flex items-center justify-center mb-4 ring-1 ring-blue-500/50"><Zap className="text-blue-400 w-6 h-6"/></div><h4 className="font-bold text-white text-xl">Laser Ops</h4></div></TiltCard></div>
                    <div className="translate-y-12 animate-float-delayed"><TiltCard><div className="bg-slate-900/60 p-8 rounded-2xl border border-slate-700 backdrop-blur-md flex flex-col items-center text-center hover:border-cyan-500 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] transition-all h-full"><div className="w-14 h-14 bg-cyan-500/20 rounded-full flex items-center justify-center mb-4 ring-1 ring-cyan-500/50"><Scissors className="text-cyan-400 w-6 h-6"/></div><h4 className="font-bold text-white text-xl">Crafters</h4></div></TiltCard></div>
                    </div>
                </div>
                </div>
            </section>
            
            <section className="py-32 bg-slate-900/20 relative z-10 border-y border-slate-800/50 backdrop-blur-sm overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 mb-16 text-center"><Reveal><h2 className="text-4xl md:text-6xl font-bold text-white mb-6">Feedback from our <span className="text-cyan-400">Private Beta</span></h2></Reveal></div>
                <div className="flex overflow-hidden w-full relative">
                <div className="flex animate-scroll hover:pause-scroll whitespace-nowrap gap-8 pl-6">
                    {doubledTestimonials.map((t, i) => (<div key={i} className="inline-block transform transition-transform hover:scale-105 duration-300"><TestimonialCard quote={t.quote} author={t.author} role={t.role} /></div>))}
                </div>
                </div>
            </section>

            <section id="pricing" className="py-32 relative z-10">
                <div className="max-w-7xl mx-auto px-6">
                <Reveal><div className="text-center mb-20"><h2 className="text-4xl md:text-6xl font-bold text-white mb-6">Choose Your Plan</h2><p className="text-slate-300 text-2xl font-light">Pay once. Credits never expire.</p></div></Reveal>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto items-stretch">
                    {/* DÜZELTİLDİ: "5 High-Res" yerine daha net maddeler */}
                    <Reveal delay={100} className="h-full"><PricingCard plan="Starter" price="$10" description="5 Credits" features={["No Expiration Date", "Standard & High-Res", "Basic Optimization"]} onJoin={() => handleBuy('starter', 10)} /></Reveal>
                    <Reveal delay={200} className="h-full"><PricingCard plan="Pro" price="$40" description="50 Credits" recommended={true} features={["Save 20% Per File", "Advanced DXF & SVG", "Priority Processing", "Node Reduction"]} onJoin={() => handleBuy('pro', 40)} /></Reveal>
                    <Reveal delay={300} className="h-full"><PricingCard plan="Agency" price="$90" description="150 Credits" features={["Best Value: $0.60/file", "Commercial License", "Bulk Processing Tools"]} onJoin={() => handleBuy('agency', 90)} /></Reveal>
                    <Reveal delay={400} className="h-full"><PricingCard plan="Enterprise" price="Custom" description="Custom Solutions" features={["Unlimited API Access", "Custom Integration", "Dedicated Support"]} onJoin={() => handleBuy('Enterprise', 'Custom')} /></Reveal>
                </div>
                </div>
            </section>
            
            <section id="faq" className="py-32 relative z-10">
                <div className="max-w-3xl mx-auto px-6">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-10 text-center">FAQ</h2>
                <div className="space-y-4">
                    <FAQItem question="How do credits work?" answer="1 Credit = 1 Successful Conversion. If the AI fails, you don't pay. Credits never expire." />
                    <FAQItem question="What files do I get?" answer="You get a ZIP file containing an optimized DXF for CNC/Laser and a clean SVG for design software." />
                    <FAQItem question="Can I use this commercially?" answer="Yes! All files generated with Cuttora are royalty-free for your products." />
                </div>
                </div>
            </section>
        </>
      )}

      <footer className="bg-slate-950 border-t border-slate-800 py-16 relative z-10 text-base font-medium">
        <div className="max-w-7xl mx-auto px-6 text-center text-slate-400">
            <p>© 2024 Cuttora Inc. Built for Makers.</p>
        </div>
      </footer>
    </div>
  );
}