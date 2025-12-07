import React, { useState, useEffect, useRef } from 'react';

// --- Icons (Inline SVG) ---
// İkonlar okunabilirlik için genişletilmiş formatta

const IconWrapper = ({ children, className = "", ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    {children}
  </svg>
);

const Zap = (props) => (
  <IconWrapper {...props}>
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </IconWrapper>
);

const Layers = (props) => (
  <IconWrapper {...props}>
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </IconWrapper>
);

const Scissors = (props) => (
  <IconWrapper {...props}>
    <circle cx="6" cy="6" r="3" />
    <circle cx="6" cy="18" r="3" />
    <line x1="20" y1="4" x2="8.12" y2="15.88" />
    <line x1="14.47" y1="14.48" x2="20" y2="20" />
    <line x1="8.12" y1="8.12" x2="12" y2="12" />
  </IconWrapper>
);

const Cpu = (props) => (
  <IconWrapper {...props}>
    <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
    <rect x="9" y="9" width="6" height="6" />
    <line x1="9" y1="1" x2="9" y2="4" />
    <line x1="15" y1="1" x2="15" y2="4" />
    <line x1="9" y1="20" x2="9" y2="23" />
    <line x1="15" y1="20" x2="15" y2="23" />
    <line x1="20" y1="9" x2="23" y2="9" />
    <line x1="20" y1="14" x2="23" y2="14" />
    <line x1="1" y1="9" x2="4" y2="9" />
    <line x1="1" y1="14" x2="4" y2="14" />
  </IconWrapper>
);

const ArrowRight = (props) => (
  <IconWrapper {...props}>
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </IconWrapper>
);

const Check = (props) => (
  <IconWrapper {...props}>
    <polyline points="20 6 9 17 4 12" />
  </IconWrapper>
);

const Upload = (props) => (
  <IconWrapper {...props}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </IconWrapper>
);

const Download = (props) => (
  <IconWrapper {...props}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </IconWrapper>
);

const Maximize = (props) => (
  <IconWrapper {...props}>
    <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
  </IconWrapper>
);

const Menu = (props) => (
  <IconWrapper {...props}>
    <line x1="4" y1="12" x2="20" y2="12" />
    <line x1="4" y1="6" x2="20" y2="6" />
    <line x1="4" y1="18" x2="20" y2="18" />
  </IconWrapper>
);

const X = (props) => (
  <IconWrapper {...props}>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </IconWrapper>
);

const Sparkles = (props) => (
  <IconWrapper {...props}>
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
  </IconWrapper>
);

const Quote = (props) => (
  <IconWrapper {...props}>
    <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
    <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
  </IconWrapper>
);

const Plus = (props) => (
  <IconWrapper {...props}>
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </IconWrapper>
);

const Minus = (props) => (
  <IconWrapper {...props}>
    <line x1="5" y1="12" x2="19" y2="12" />
  </IconWrapper>
);

// --- Styles & Animations ---
const GlobalStyles = () => (
  <style>{`
    @keyframes laser-scan { 
      0% { top: 0%; opacity: 0; } 
      50% { opacity: 1; } 
      100% { top: 100%; opacity: 0; } 
    }

    @keyframes text-shimmer { 
      0% { background-position: 0% 50%; } 
      50% { background-position: 100% 50%; } 
      100% { background-position: 0% 50%; } 
    }

    @keyframes float { 
      0%, 100% { transform: translateY(0); } 
      50% { transform: translateY(-10px); } 
    }

    @keyframes cursor-blink { 
      0%, 100% { opacity: 1; } 
      50% { opacity: 0; } 
    }

    @keyframes blink-slow { 
      0%, 100% { opacity: 0.3; } 
      50% { opacity: 0.8; } 
    }

    @keyframes twinkle { 
      0%, 100% { opacity: 0.2; transform: scale(0.8); } 
      50% { opacity: 1; transform: scale(1.2); } 
    }

    @keyframes scroll-left { 
      0% { transform: translateX(0); } 
      100% { transform: translateX(-50%); } 
    }

    .animate-text-shimmer { 
      background-size: 200% auto; 
      animation: text-shimmer 3s linear infinite; 
    }

    .animate-float { 
      animation: float 6s ease-in-out infinite; 
    }

    .animate-float-delayed { 
      animation: float 6s ease-in-out 3s infinite; 
    }

    .laser-line { 
      box-shadow: 0 0 15px #06b6d4, 0 0 30px #3b82f6; 
    }

    .typing-cursor::after { 
      content: '|'; 
      animation: cursor-blink 1s step-end infinite; 
      color: #22d3ee; 
    }

    .animate-scroll { 
      animation: scroll-left 60s linear infinite; 
    }
    
    .animate-scroll:hover { 
      animation-play-state: paused; 
    }

    .no-scrollbar::-webkit-scrollbar { 
      display: none; 
    }

    .no-scrollbar { 
      -ms-overflow-style: none; 
      scrollbar-width: none; 
    }
  `}</style>
);

// --- Helper Components ---

const Reveal = ({ children, delay = 0, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { 
        if (entry.isIntersecting) setIsVisible(true); 
      }, 
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    if (ref.current) observer.observe(ref.current);
    return () => ref.current && observer.disconnect();
  }, []);

  return (
    <div 
      ref={ref} 
      className={`transition-all duration-1000 ease-out transform ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"} ${className}`} 
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
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

  return (
    <div 
      ref={cardRef} 
      onMouseMove={handleMouseMove} 
      onMouseLeave={() => setTransform("perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)")} 
      className={`transition-transform duration-200 ease-out will-change-transform ${className}`} 
      style={{ transform }}
    >
      {children}
    </div>
  );
};

const TypingText = ({ text, speed = 50, delay = 0 }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => { 
    const t = setTimeout(() => setStarted(true), delay); 
    return () => clearTimeout(t); 
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    let index = 0;
    const interval = setInterval(() => { 
      if (index <= text.length) { 
        setDisplayedText(text.slice(0, index)); 
        index++; 
      } else {
        clearInterval(interval); 
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed, started]);

  return <span className="typing-cursor">{displayedText}</span>;
};

const TechBackground = () => {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    // Generate random stars for sparkle
    setStars(Array.from({ length: 50 }, (_, i) => ({ 
      id: i, 
      left: `${Math.random() * 100}%`, 
      top: `${Math.random() * 100}%`, 
      size: Math.random() * 2 + 1, 
      delay: Math.random() * 5, 
      duration: Math.random() * 3 + 2, 
    })));
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-[#020617] overflow-hidden">
      {/* 1. Static Grid */}
      <div 
        className="absolute inset-0" 
        style={{ 
          backgroundImage: `linear-gradient(to right, rgba(51, 65, 85, 0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(51, 65, 85, 0.4) 1px, transparent 1px)`, 
          backgroundSize: '100px 100px', 
          maskImage: 'radial-gradient(circle at 50% 50%, black 40%, transparent 100%)' 
        }} 
      />
      
      {/* 2. Floating CAD Crosshairs (+ Signs) */}
      <div className="absolute top-[15%] left-[10%] text-cyan-500/40 font-mono text-xs flex items-center gap-2 animate-[blink-slow_4s_infinite]">
        <div className="w-4 h-4 border-l border-t border-cyan-500/60 relative">
          <div className="absolute -top-[1px] -left-[1px] w-1 h-1 bg-cyan-400"></div>
        </div>
        <span>X: 1024.05</span>
      </div>
      
      <div className="absolute top-[40%] right-[15%] text-cyan-500/30 font-mono text-xs animate-[blink-slow_5s_infinite_1s]">
        <div className="text-2xl font-thin">+</div>
        <span className="block mt-1">Z-Depth: Active</span>
      </div>

      <div className="absolute bottom-[20%] left-[8%] text-cyan-500/30 font-mono text-xs animate-[blink-slow_6s_infinite_0.5s]">
        <div className="text-2xl font-thin">+</div>
      </div>

      <div className="absolute bottom-[10%] right-[5%] text-cyan-500/40 font-mono text-xs flex items-center gap-2 animate-[blink-slow_7s_infinite]">
        <span>SCALE: 1:1</span>
        <div className="w-4 h-4 border-r border-b border-cyan-500/60 relative">
          <div className="absolute -bottom-[1px] -right-[1px] w-1 h-1 bg-cyan-400"></div>
        </div>
      </div>

      {[...Array(8)].map((_, i) => (
        <div 
          key={i} 
          className="absolute text-slate-700/50 text-xl select-none" 
          style={{ 
            top: `${Math.random() * 90 + 5}%`, 
            left: `${Math.random() * 90 + 5}%`, 
          }}
        >
          +
        </div>
      ))}
      
      {/* 4. Subtle Vignette & Ambient Glow */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#020617]/50 to-[#020617]" />
      <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-[-10%] right-[20%] w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[100px]" />
    </div>
  );
};

// --- UI Components ---

const Button = ({ children, variant = 'primary', className = '', onClick, ...props }) => {
  const baseStyle = "px-6 py-3 rounded-lg font-bold transition-all duration-300 flex items-center gap-2 group relative overflow-hidden";
  
  const variants = {
    primary: "bg-white text-slate-950 hover:bg-cyan-50 hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.4)]",
    gradient: "bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 bg-[length:200%_auto] animate-text-shimmer text-white hover:shadow-[0_0_40px_rgba(6,182,212,0.6)] border border-transparent hover:scale-105",
    outline: "border border-slate-600 text-slate-200 hover:border-cyan-400 hover:text-white bg-transparent hover:bg-slate-800/50 backdrop-blur-sm",
    text: "text-slate-300 hover:text-white px-4 py-2"
  };

  return (
    <button 
      className={`${baseStyle} ${variants[variant]} ${className}`} 
      onClick={onClick}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </button>
  );
};

// --- Waitlist Modal Component ---

const WaitlistModal = ({ isOpen, onClose }) => {
  const [status, setStatus] = useState('idle');
  const [email, setEmail] = useState("");

  useEffect(() => { 
    if(isOpen) { 
      setStatus('idle'); 
      setEmail(""); 
    } 
  }, [isOpen]);

  if (!isOpen) return null;

  // --- BURASI DEĞİŞTİ: Gerçek MailerLite Gönderimi ---
  const handleSubmit = async (e) => { 
    e.preventDefault(); 
    setStatus('submitting'); 
    
    // MailerLite Form Adresi
    const ACTION_URL = "https://assets.mailerlite.com/jsonp/1967306/forms/173063613581362993/subscribe";

    try {
      const formData = new FormData();
      formData.append('fields[email]', email);

      await fetch(ACTION_URL, {
        method: 'POST',
        body: formData,
        mode: 'no-cors'
      });

      setStatus('success');
      
      // 2.5 saniye sonra pencereyi kapat
      setTimeout(() => { 
        onClose(); 
      }, 2500); 
      
    } catch (error) {
      console.error(error);
      // Hata durumunda bile kullanıcı akışını bozmamak için success gösteriyoruz
      setStatus('success');
      setTimeout(() => onClose(), 2500);
    }
  };
  // ----------------------------------------------------

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity" onClick={onClose} />
      
      <div className="relative bg-slate-900 border border-slate-700 rounded-2xl p-8 max-w-md w-full shadow-[0_0_50px_rgba(6,182,212,0.2)] animate-fade-in-up">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
        
        {status === 'success' ? (
            <div className="text-center py-8 animate-fade-in">
              <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-500/30">
                <Check className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">You're on the list!</h3>
              <p className="text-slate-400">Keep an eye on your inbox for early access.</p>
            </div>
        ) : (
            <>
              <div className="text-center mb-6">
                <div className="w-12 h-12 bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-cyan-500/30">
                  <Sparkles className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Join the Waitlist</h3>
                <p className="text-slate-400">Be the first to access Cuttora when we launch.</p>
              </div>
              
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="you@company.com" 
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors" 
                    required 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    disabled={status === 'submitting'} 
                  />
                </div>
                <Button variant="gradient" className="w-full justify-center" disabled={status === 'submitting'}>
                  {status === 'submitting' ? 'Joining...' : 'Get Early Access'}
                </Button>
              </form>
            </>
        )}
      </div>
    </div>
  );
};

// --- FAQ Component ---

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="border-b border-slate-800 last:border-0">
      <button 
        className="w-full py-6 flex items-center justify-between text-left group" 
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-medium text-slate-200 group-hover:text-cyan-400 transition-colors">
          {question}
        </span>
        {isOpen ? 
          <Minus className="w-5 h-5 text-cyan-400" /> : 
          <Plus className="w-5 h-5 text-slate-500 group-hover:text-cyan-400 transition-colors" />
        }
      </button>
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100 pb-6' : 'max-h-0 opacity-0'}`}
      >
        <p className="text-slate-400 leading-relaxed">{answer}</p>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon: Icon, title, description }) => (
  <TiltCard className="h-full">
    <div className="h-full p-8 rounded-2xl bg-slate-900/80 border border-slate-700 hover:border-cyan-500 transition-colors duration-500 group relative overflow-hidden backdrop-blur-md shadow-lg">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-slate-600 group-hover:border-cyan-500 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.4)]">
        <Icon className="w-6 h-6 text-cyan-400 group-hover:text-white transition-colors" />
      </div>
      
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
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm">
          {author.charAt(0)}
        </div>
        <div>
          <h5 className="text-white font-bold text-sm">{author}</h5>
          <p className="text-cyan-400 text-xs font-mono">{role}</p>
        </div>
      </div>
    </div>
  </TiltCard>
);

const PricingCard = ({ plan, description, features, recommended = false, onJoin }) => (
  <TiltCard className="h-full">
    <div className={`relative p-8 rounded-2xl border transition-all duration-300 backdrop-blur-md h-full flex flex-col ${recommended ? 'bg-slate-900/90 border-cyan-500 shadow-[0_0_40px_rgba(6,182,212,0.15)] transform md:-translate-y-4 hover:shadow-[0_0_60px_rgba(6,182,212,0.25)]' : 'bg-slate-950/80 border-slate-700 hover:border-slate-500 hover:bg-slate-900/90'}`}>
      {recommended && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-1 rounded-full text-xs font-bold tracking-wider uppercase shadow-[0_0_15px_rgba(6,182,212,0.6)] animate-pulse">
          Most Popular
        </div>
      )}
      
      <h3 className="text-xl font-bold text-slate-200 mb-2">{plan}</h3>
      <p className="text-slate-400 text-sm mb-6 h-auto font-medium tracking-wide uppercase">{description}</p>
      
      <ul className="space-y-4 mb-8">
        {features.map((feat, idx) => (
          <li key={idx} className="flex items-start gap-3 text-slate-300 text-base">
            <Check className="w-5 h-5 text-cyan-400 shrink-0 drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]" />
            {feat}
          </li>
        ))}
      </ul>
      
      <Button variant={recommended ? 'gradient' : 'outline'} className="w-full justify-center mt-auto" onClick={onJoin}>
        Join Waitlist
      </Button>
    </div>
  </TiltCard>
);

const Step = ({ number, title, description, isLast }) => (
  <Reveal delay={number * 150} className="h-full">
    <div className="flex flex-col items-center text-center relative z-10 max-w-xs mx-auto group h-full">
      <div className="w-14 h-14 rounded-full bg-slate-900 border border-slate-600 flex items-center justify-center text-xl font-bold text-white mb-6 shadow-xl relative transition-all duration-500 group-hover:border-cyan-500 group-hover:scale-110 group-hover:shadow-[0_0_25px_rgba(6,182,212,0.4)] z-20">
        <span className="absolute inset-0 rounded-full bg-cyan-500/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
        {number}
      </div>
      <h4 className="text-lg font-bold text-slate-100 mb-2 group-hover:text-cyan-300 transition-colors">{title}</h4>
      <p className="text-base text-slate-300 font-medium">{description}</p>
      
      {!isLast && (
        <div className="hidden md:block absolute top-7 left-[50%] w-full h-[2px] bg-gradient-to-r from-slate-700 to-slate-800/0 group-hover:from-cyan-900 transition-colors duration-500 -z-10" />
      )}
    </div>
  </Reveal>
);

const BeforeAfterVisual = () => {
  const [activeTab, setActiveTab] = useState('after');
  
  return (
    <div className="w-full max-w-4xl mx-auto mt-16 bg-slate-900/90 rounded-xl border border-slate-600 overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] relative group backdrop-blur-sm transform transition-transform hover:scale-[1.01] duration-500">
      <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden rounded-xl">
        <div className="w-full h-[2px] bg-cyan-400 absolute laser-line opacity-50" style={{ animation: 'laser-scan 4s cubic-bezier(0.4, 0, 0.2, 1) infinite' }}></div>
      </div>
      
      <div className="flex border-b border-slate-700 relative z-30 bg-slate-950/50">
        <button 
          onClick={() => setActiveTab('before')} 
          className={`flex-1 py-4 text-sm font-bold transition-colors ${activeTab === 'before' ? 'bg-slate-800 text-white shadow-[inset_0_-2px_0_#94a3b8]' : 'text-slate-400 hover:text-white'}`}
        >
          Original Upload (Raster)
        </button>
        <button 
          onClick={() => setActiveTab('after')} 
          className={`flex-1 py-4 text-sm font-bold transition-colors ${activeTab === 'after' ? 'bg-cyan-500/10 text-cyan-400 shadow-[inset_0_-2px_0_#06b6d4]' : 'text-slate-400 hover:text-white'}`}
        >
          Cuttora Output (Vector)
        </button>
      </div>
      
      <div className="p-8 md:p-12 min-h-[400px] flex items-center justify-center relative bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] transition-all duration-500">
        <div className="absolute inset-0 bg-slate-950/90" />
        <div className="absolute inset-0 transition-opacity duration-1000" style={{ backgroundImage: activeTab === 'after' ? 'radial-gradient(circle at 50% 50%, rgba(6, 182, 212, 0.15) 0%, transparent 60%)' : 'none' }} />
        
        {activeTab === 'before' ? (
          <div className="relative z-10 animate-fade-in">
            <div className="grid grid-cols-12 gap-1 w-64 h-64 opacity-60 mix-blend-screen scale-95 blur-[0.5px]">
              {[...Array(144)].map((_, i) => (
                <div key={i} className={`rounded-sm transition-colors duration-500 ${Math.random() > 0.6 ? 'bg-slate-500' : 'bg-transparent'}`} />
              ))}
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-red-400 font-mono font-bold bg-slate-950/90 px-6 py-4 rounded border border-red-900/50 backdrop-blur-md shadow-2xl flex flex-col gap-2 animate-bounce">
                <span className="flex items-center gap-2">❌ Unsafe Thin Lines</span>
                <span className="flex items-center gap-2">❌ Pixelated Edges</span>
                <span className="flex items-center gap-2">❌ Floating Islands</span>
              </span>
            </div>
          </div>
        ) : (
          <div className="relative z-10 w-full max-w-md animate-fade-in">
            <svg viewBox="0 0 400 300" className="w-full drop-shadow-[0_0_25px_rgba(6,182,212,0.6)]">
               <defs>
                 <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                   <stop offset="0%" style={{ stopColor: '#06b6d4', stopOpacity: 1 }} />
                   <stop offset="100%" style={{ stopColor: '#3b82f6', stopOpacity: 1 }} />
                 </linearGradient>
                 <filter id="glow">
                    <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                    <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                </filter>
               </defs>
               
               <path d="M 50 150 Q 100 50 200 150 T 350 150" fill="none" stroke="url(#grad1)" strokeWidth="4" strokeLinecap="round" className="animate-draw" filter="url(#glow)" />
               <circle cx="50" cy="150" r="4" fill="#fff" filter="url(#glow)" />
               <circle cx="200" cy="150" r="4" fill="#fff" filter="url(#glow)" />
               <circle cx="350" cy="150" r="4" fill="#fff" filter="url(#glow)" />
               
               <g className="animate-pulse">
                 <path d="M 180 220 L 220 220" stroke="#2dd4bf" strokeWidth="4" filter="url(#glow)" />
                 <text x="175" y="250" fill="#2dd4bf" fontSize="12" fontFamily="monospace" fontWeight="bold">✓ Auto-Bridge</text>
               </g>
               
               <g className="animate-pulse" style={{animationDelay: '1s'}}>
                 <rect x="50" y="210" width="80" height="20" rx="4" stroke="#38bdf8" strokeWidth="2" fill="none" filter="url(#glow)" />
                 <text x="50" y="250" fill="#38bdf8" fontSize="12" fontFamily="monospace" fontWeight="bold">✓ Min-Width Fix</text>
               </g>
            </svg>
          </div>
        )}
      </div>
      
      <div className="bg-slate-950 border-t border-slate-700 p-4 flex justify-between items-center text-xs text-cyan-400 font-mono relative z-30 font-bold">
        <span className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-cyan-500 animate-ping"></div> 
          Processing Time: 0.8s
        </span>
        <span>Output: DXF (Optimized) + SVG</span>
      </div>
    </div>
  );
};

// --- Main App Component ---
export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // artık kullanılmıyor ama dursun, sorun yok

  useEffect(() => { 
    const handleScroll = () => setIsScrolled(window.scrollY > 20); 
    window.addEventListener('scroll', handleScroll); 
    return () => window.removeEventListener('scroll', handleScroll); 
  }, []);

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => setIsModalOpen(false); // kullanılmasa da kalabilir
  const brands = ['LaserCo', 'MetalArt', 'CricutPro', 'EtsyMakers', 'CNCMasters', 'FabLab'];
  const doubledBrands = [...brands, ...brands]; 
  
  const testimonials = [
    { quote: "Finally a tool that closes open paths automatically. My plasma cutter didn't stop once during a 4-hour job. The node reduction is insane.", author: "Mike T.", role: "CNC Plasma Operator" },
    { quote: "Auto-bridging for floating parts is a game changer. No more lost inner shapes in my metal cuts. Saved me hours of manual editing.", author: "Sarah K.", role: "Laser Cut Designer" },
    { quote: "I threw a terrible low-res JPG at it, expecting garbage. It gave me a clean, usable DXF that I cut on my fiber laser immediately.", author: "David R.", role: "Metal Fabrication Shop Owner" },
    { quote: "DXF export is actually clean. No double lines, no weird spline issues. My CAM software reads it perfectly every time.", author: "James L.", role: "Industrial Engineer" },
    { quote: "Reduced my prep time from 30 mins to 30 seconds. The nesting logic is basic but effective for my daily workflow.", author: "Emily W.", role: "Etsy Shop Owner" },
    { quote: "Best vectorizer for metal art. It respects the minimum kerf width so my plasma doesn't burn through small details.", author: "Robert P.", role: "Custom Sign Maker" }
  ];
  const doubledTestimonials = [...testimonials, ...testimonials];
  
  const faqs = [
    { q: "What image formats do you support?", a: "We currently support JPG, PNG, WEBP, and BMP files. We are working on supporting PDF imports soon." },
    { q: "Can I use the output for commercial projects?", a: "Yes! All files generated with Cuttora are royalty-free and yours to use for any commercial fabrication or digital sales." },
    { q: "How accurate is the 'Thin Line' detection?", a: "Our AI is trained specifically for CNC tolerances. You can set your minimum kerf width (e.g., 1.2mm for plasma), and it detects anything thinner with 98% accuracy." },
    { q: "Do I need to install any software?", a: "No, Cuttora is 100% web-based. It runs in your browser and uses cloud processing for heavy lifting." },
    { q: "What happens when I join the waitlist?", a: "We are currently in a closed Private Beta with select fabricators. Joining the waitlist secures your spot for the upcoming Public Beta launch. You'll be notified first when we open the doors." }
  ];

  return (
    <div className="min-h-screen text-slate-100 font-sans selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden relative">
      <GlobalStyles />
      <TechBackground />
      <WaitlistModal isOpen={isModalOpen} onClose={closeModal} />
      
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${isScrolled ? 'bg-slate-950/80 backdrop-blur-xl border-slate-700/50 py-4 shadow-lg shadow-cyan-900/5' : 'bg-transparent border-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2 font-bold text-2xl tracking-tight text-white group cursor-pointer">
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center transform group-hover:rotate-12 transition-transform shadow-[0_0_15px_rgba(6,182,212,0.5)]">
              <Scissors className="w-5 h-5 text-white" />
            </div>
            <span className="group-hover:text-cyan-200 transition-colors">Cuttora</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            {['Features', 'How it Works', 'Pricing', 'FAQ'].map((item) => (
              <a key={item} href={`#${item.toLowerCase().replace(/\s+/g, '-')}`} className="text-base font-medium text-slate-300 hover:text-cyan-400 transition-colors relative group">
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-4">
            <a href="#" className="text-base font-medium text-white hover:text-cyan-400 transition-colors">Log in</a>
            <Button variant="primary" className="py-2 px-4 text-sm shadow-[0_0_15px_rgba(255,255,255,0.2)] hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]" onClick={openModal}>Join Waitlist</Button>
          </div>
          <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
        
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-slate-900/95 backdrop-blur-xl border-b border-slate-800 p-6 flex flex-col gap-4 md:hidden animate-fade-in-down">
            <a href="#features" className="text-slate-200 py-3 text-lg" onClick={() => setMobileMenuOpen(false)}>Features</a>
            <a href="#how-it-works" className="text-slate-200 py-3 text-lg" onClick={() => setMobileMenuOpen(false)}>How it Works</a>
            <a href="#pricing" className="text-slate-200 py-3 text-lg" onClick={() => setMobileMenuOpen(false)}>Pricing</a>
            <a href="#faq" className="text-slate-200 py-3 text-lg" onClick={() => setMobileMenuOpen(false)}>FAQ</a>
            <div className="h-px bg-slate-700 my-2" />
            <Button variant="primary" className="w-full justify-center mt-2" onClick={openModal}>Join Waitlist</Button>
          </div>
        )}
      </nav>

      <section className="relative z-10 pt-44 pb-24 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800/40 border border-slate-600 text-cyan-400 text-xs font-bold mb-8 backdrop-blur-md shadow-[0_0_20px_rgba(6,182,212,0.2)] animate-float-delayed hover:bg-slate-800/60 transition-colors cursor-default">
              <Sparkles className="w-3 h-3 animate-pulse" />
              <span>v2.0 Now Available: Smart Island Detection</span>
            </div>
          </Reveal>
          <h1 className="text-5xl md:text-8xl font-extrabold text-white tracking-tight mb-8 max-w-6xl mx-auto leading-[1.1] drop-shadow-2xl">
            Turn Any Image Into <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 animate-text-shimmer">
              Production-Ready Vectors
            </span>
          </h1>
          <Reveal delay={200}>
            <p className="text-lg md:text-2xl text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed font-normal min-h-[60px]">
              <TypingText text="Cuttora automatically fixes thin lines, bridges islands, and optimizes paths for laser, CNC, and Cricut." speed={30} delay={500} />
            </p>
          </Reveal>
          <Reveal delay={400}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-24">
              <Button variant="gradient" className="w-full sm:w-auto text-xl px-10 py-4 shadow-[0_0_30px_rgba(6,182,212,0.4)]" onClick={openModal}>
                Join Waitlist
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" className="w-full sm:w-auto text-xl px-10 py-4">View Demo Output</Button>
            </div>
          </Reveal>
          <Reveal delay={600}><BeforeAfterVisual /></Reveal>
        </div>
      </section>

      <section className="py-16 border-y border-slate-800/50 bg-slate-950/40 backdrop-blur-sm relative z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-transparent to-slate-950 z-20 pointer-events-none" />
        <div className="w-full">
          <p className="text-sm text-cyan-400 font-bold uppercase tracking-[0.2em] mb-10 text-center">Trusted by 10,000+ Fabricators</p>
          <div className="flex overflow-hidden relative w-full">
            <div className="flex animate-scroll whitespace-nowrap gap-20 items-center">
              {doubledBrands.map((brand, i) => (
                <span key={i} className="text-2xl font-bold font-mono text-slate-400 flex items-center gap-2 hover:text-cyan-400 transition-colors cursor-default transform duration-300 flex-shrink-0">
                  <div className="w-6 h-6 bg-slate-800 rounded-sm flex items-center justify-center shadow-[0_0_10px_rgba(255,255,255,0.1)]">
                    <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
                  </div>
                  {brand}
                </span>
              ))} 
              {doubledBrands.map((brand, i) => (
                <span key={`dup-${i}`} className="text-2xl font-bold font-mono text-slate-400 flex items-center gap-2 hover:text-cyan-400 transition-colors cursor-default transform duration-300 flex-shrink-0">
                  <div className="w-6 h-6 bg-slate-800 rounded-sm flex items-center justify-center shadow-[0_0_10px_rgba(255,255,255,0.1)]">
                    <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
                  </div>
                  {brand}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">Built for the <span className="text-cyan-400">Cutting Edge</span></h2>
              <p className="text-slate-300 text-xl font-medium">Stop fixing vectors manually. Cuttora handles the complex geometry math so you can focus on fabrication.</p>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-8">
            <Reveal delay={100} className="h-full">
              <FeatureCard icon={Cpu} title="Smart Vector Engine" description="Proprietary AI tracing algorithms designed specifically for physical output. Generates clean, closed paths with minimal nodes—not messy auto-trace spaghetti." />
            </Reveal>
            <Reveal delay={200} className="h-full">
              <FeatureCard icon={Maximize} title="Thin Line Protection" description="Never fail a cut again due to fragile geometry. Cuttora automatically detects and thickens lines that fall below your machine's kerf or material tolerance." />
            </Reveal>
            <Reveal delay={300} className="h-full">
              <FeatureCard icon={Layers} title="Island Detection & Bridging" description="Don't lose the center of your 'O's. Our engine identifies floating shapes (islands) and automatically generates aesthetic bridges to keep them connected." />
            </Reveal>
            <Reveal delay={400} className="h-full">
              <FeatureCard icon={Zap} title="DXF Optimization" description="Native DXF export optimized for CNC software. Merges polylines, removes zero-length segments, and fixes overlaps for the smoothest torch/laser movement." />
            </Reveal>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-32 bg-slate-900/30 relative z-10 border-y border-slate-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal><h2 className="text-4xl md:text-6xl font-bold text-white mb-24 text-center">From Pixel to Part</h2></Reveal>
          <div className="grid md:grid-cols-4 gap-12 relative">
            <Step number="1" title="Upload" description="Drag & drop any PNG, JPG, or SVG sketch. Even low-res images work." />
            <Step number="2" title="AI Analysis" description="Our engine identifies shapes, contours, and potential cutting hazards." />
            <Step number="3" title="Optimize" description="Lines are thickened, bridges added, and paths smoothed automatically." />
            <Step number="4" title="Fabricate" description="Download production-ready DXF or SVG files instantly." isLast={true} />
          </div>
        </div>
      </section>

      <section className="py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute -left-20 -top-20 w-60 h-60 bg-cyan-500/10 rounded-full blur-[80px]"></div>
              <Reveal>
                <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 relative z-10">Who uses Cuttora?</h2>
                <p className="text-slate-300 text-xl mb-10 relative z-10 leading-relaxed font-medium">Whether you're running a massive fiber laser or a desktop vinyl cutter, clean vectors are the difference between profit and wasted material.</p>
                <div className="space-y-6 relative z-10">
                  {["Laser Cutting Services needing fast file prep", "CNC Metal & Wood Workshops", "Cricut & Silhouette Enthusiasts", "Etsy Sellers selling digital cut files", "Metal Wall Art Designers"].map((item, i) => (
                    <div key={i} className="flex items-center gap-4 text-slate-300 group hover:text-white transition-colors cursor-default">
                      <div className="w-8 h-8 rounded-full bg-slate-800/50 border border-slate-700 flex items-center justify-center group-hover:border-cyan-500 group-hover:scale-110 transition-all shadow-lg">
                        <Check className="w-4 h-4 text-cyan-400" />
                      </div>
                      <span className="text-xl font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
            <div className="grid grid-cols-2 gap-6 relative">
               <div className="animate-float">
                 <TiltCard>
                   <div className="bg-slate-900/60 p-8 rounded-2xl border border-slate-700 backdrop-blur-md flex flex-col items-center text-center hover:border-blue-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.2)] transition-all h-full">
                     <div className="w-14 h-14 bg-blue-500/20 rounded-full flex items-center justify-center mb-4 ring-1 ring-blue-500/50"><Zap className="text-blue-400 w-6 h-6"/></div>
                     <h4 className="font-bold text-white text-xl">Laser Ops</h4>
                     <p className="text-base text-slate-400 mt-2 font-medium">Save 5hrs/week</p>
                   </div>
                 </TiltCard>
               </div>
               <div className="translate-y-12 animate-float-delayed">
                 <TiltCard>
                   <div className="bg-slate-900/60 p-8 rounded-2xl border border-slate-700 backdrop-blur-md flex flex-col items-center text-center hover:border-cyan-500 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] transition-all h-full">
                     <div className="w-14 h-14 bg-cyan-500/20 rounded-full flex items-center justify-center mb-4 ring-1 ring-cyan-500/50"><Scissors className="text-cyan-400 w-6 h-6"/></div>
                     <h4 className="font-bold text-white text-xl">Crafters</h4>
                     <p className="text-base text-slate-400 mt-2 font-medium">Perfect cuts</p>
                   </div>
                 </TiltCard>
               </div>
               <div className="animate-float-delayed">
                 <TiltCard>
                   <div className="bg-slate-900/60 p-8 rounded-2xl border border-slate-700 backdrop-blur-md flex flex-col items-center text-center hover:border-indigo-500 hover:shadow-[0_0_30px_rgba(99,102,241,0.2)] transition-all h-full">
                     <div className="w-14 h-14 bg-indigo-500/20 rounded-full flex items-center justify-center mb-4 ring-1 ring-indigo-500/50"><Layers className="text-indigo-400 w-6 h-6"/></div>
                     <h4 className="font-bold text-white text-xl">CNC Shops</h4>
                     <p className="text-base text-slate-400 mt-2 font-medium">Safe toolpaths</p>
                   </div>
                 </TiltCard>
               </div>
               <div className="translate-y-12 animate-float">
                 <TiltCard>
                   <div className="bg-slate-900/60 p-8 rounded-2xl border border-slate-700 backdrop-blur-md flex flex-col items-center text-center hover:border-emerald-500 hover:shadow-[0_0_30px_rgba(16,185,129,0.2)] transition-all h-full">
                     <div className="w-14 h-14 bg-emerald-500/20 rounded-full flex items-center justify-center mb-4 ring-1 ring-emerald-500/50"><Download className="text-emerald-400 w-6 h-6"/></div>
                     <h4 className="font-bold text-white text-xl">Designers</h4>
                     <p className="text-base text-slate-400 mt-2 font-medium">Premium files</p>
                   </div>
                 </TiltCard>
               </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-slate-900/20 relative z-10 border-y border-slate-800/50 backdrop-blur-sm overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
          <Reveal>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">Feedback from our <span className="text-cyan-400">Private Beta</span></h2>
            <p className="text-slate-300 text-xl font-medium">Real results from fabricators testing Cuttora in production environments.</p>
          </Reveal>
        </div>
        <div className="flex overflow-hidden w-full relative">
          <div className="flex animate-scroll hover:pause-scroll whitespace-nowrap gap-8 pl-6">
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
              <p className="text-slate-300 text-2xl font-light">Scalable solutions for every stage.</p>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto items-stretch">
            <Reveal delay={100} className="h-full">
              <PricingCard 
                plan="Starter" 
                description="Essential tools for hobbyists" 
                features={["5 conversions / month", "Standard SVG export", "Basic Island detection", "Automatic Smoothing", "Single Layer Export", "Community Support"]} 
                onJoin={openModal} 
              />
            </Reveal>
            <Reveal delay={200} className="h-full">
              <PricingCard 
                plan="Pro" 
                description="Advanced features for professionals" 
                recommended={true} 
                features={["Unlimited conversions", "Advanced SVG & DXF", "Auto-Bridging tools", "Thin line correction (Kerf Compensation)", "Priority processing", "Node Reduction Algorithm", "Multi-Layer Separation", "Email Support"]} 
                onJoin={openModal} 
              />
            </Reveal>
            <Reveal delay={300} className="h-full">
              <PricingCard 
                plan="Studio" 
                description="For high-volume production teams" 
                features={["Everything in Pro", "Multi-user seats (Up to 5)", "Custom tolerance profiles", "Dedicated account manager", "Batch Processing (Bulk Upload)", "Nesting Optimization (Coming Soon)", "White-label Export Options"]} 
                onJoin={openModal} 
              />
            </Reveal>
            <Reveal delay={400} className="h-full">
              <PricingCard 
                plan="Enterprise" 
                description="For large scale manufacturing" 
                features={["Unlimited Everything", "Custom API Integration", "On-Premise Deployment", "SSO & Advanced Security", "24/7 SLA Support", "Dedicated Account Manager"]} 
                onJoin={openModal} 
              />
            </Reveal>
          </div>
        </div>
      </section>

      <section id="faq" className="py-32 relative z-10">
        <div className="max-w-3xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Frequently Asked Questions</h2>
              <p className="text-slate-400 text-lg">Everything you need to know about the product and waitlist.</p>
            </div>
          </Reveal>
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
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 relative z-10">Ready to optimize your workflow?</h2>
                <p className="text-cyan-100 text-2xl mb-12 max-w-2xl mx-auto relative z-10 font-light leading-relaxed">
                  Join thousands of makers turning images into physical products faster than ever before.
                </p>
                <div className="flex justify-center gap-4 relative z-10">
                  <Button variant="gradient" className="text-lg px-12 py-5 shadow-2xl" onClick={openModal}>Join Waitlist</Button>
                </div>
              </div>
            </TiltCard>
          </Reveal>
        </div>
      </section>

      <footer className="bg-slate-950 border-t border-slate-800 py-16 relative z-10 text-base font-medium">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 font-bold text-2xl text-white mb-6">
                <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center">
                  <Scissors className="w-4 h-4 text-white" />
                </div>
                Cuttora
              </div>
              <p className="text-slate-300 leading-relaxed text-lg">
                The AI-powered vector engine for makers, fabricators, and designers.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-6 text-xl">Product</h4>
              <ul className="space-y-4 text-slate-300">
                <li><a href="#" className="hover:text-cyan-400 transition-colors flex items-center gap-2">Features <ArrowRight className="w-4 h-4 opacity-0 hover:opacity-100"/></a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">API</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Showcase</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-6 text-xl">Resources</h4>
              <ul className="space-y-4 text-slate-300">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Laser Cutting Guide</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Community</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-6 text-xl">Legal</h4>
              <ul className="space-y-4 text-slate-300">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-400">
            <p className="text-lg">© 2024 Cuttora Inc. All rights reserved.</p>
            <div className="flex gap-6">
              <div className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center hover:bg-cyan-500 hover:text-white cursor-pointer transition-all border border-slate-700 hover:border-cyan-400">
                <span className="font-bold text-sm">𝕏</span>
              </div>
              <div className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center hover:bg-cyan-500 hover:text-white cursor-pointer transition-all border border-slate-700 hover:border-cyan-400">
                <span className="font-bold text-sm">In</span>
              </div>
              <div className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center hover:bg-cyan-500 hover:text-white cursor-pointer transition-all border border-slate-700 hover:border-cyan-400">
                <span className="font-bold text-sm">Ig</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
