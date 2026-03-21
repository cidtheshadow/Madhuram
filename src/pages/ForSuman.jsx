import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// "Ik Vaari Aa"  Arijit Singh
const SONG_ID = 'fk_KvUijS8M';

const ForSuman = () => {
    const canvasRef = useRef(null);
    const navigate = useNavigate();
    const [phase, setPhase] = useState(-1); // -1: lock screen, 0: initial, 1: message

    const location = useLocation();

    const [isMobileScreen, setIsMobileScreen] = useState(window.innerWidth < 1024);

    const [pageBlur, setPageBlur] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsMobileScreen(window.innerWidth < 1024);
        window.addEventListener('resize', handleResize);
        
        // --- DEADLINE LOGIC ---
        // March 22, 2026 at 11:50 PM
        const deadline = new Date('2026-03-22T23:50:00');
        const now = new Date();
        const params = new URLSearchParams(location.search);
        const isBypass = params.get('bypass') === 'true' || params.get('dev') === 'true';

        if (now > deadline && !isBypass) {
            navigate('/', { replace: true });
        }

        // --- ENHANCED SECURITY (Anti-Screenshot/Recording) ---
        const preventOps = (e) => {
            e.preventDefault();
            return false;
        };

        const handleKeys = (e) => {
            // PrintScreen, Cmd+Shift+3/4/5 (Mac), Win+Shift+S (Windows)
            if (
                e.key === 'PrintScreen' || 
                (e.metaKey && e.shiftKey) || 
                (e.ctrlKey && e.key === 'p') ||
                (e.metaKey && e.key === 'p')
            ) {
                setPageBlur(true);
                // Also prevent the default browser behavior
                if (e.key === 'p') e.preventDefault();
            }
        };

        document.addEventListener('contextmenu', preventOps);
        document.addEventListener('copy', preventOps);
        document.addEventListener('keydown', handleKeys);
        
        // Mobile-first protection: Blur on any multi-touch (screenshot gestures)
        const handleTouchStart = (e) => {
            if (e.touches.length > 1) setPageBlur(true);
        };
        const handleTouchEnd = () => {
            // Optional: reset after clear touch, but better to stay safe
        };

        window.addEventListener('touchstart', handleTouchStart);
        window.addEventListener('touchend', handleTouchEnd);
        window.addEventListener('blur', () => setPageBlur(true));
        window.addEventListener('focus', () => setPageBlur(false));

        return () => {
            window.removeEventListener('resize', handleResize);
            document.removeEventListener('contextmenu', preventOps);
            document.removeEventListener('copy', preventOps);
            document.removeEventListener('keydown', handleKeys);
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchend', handleTouchEnd);
            window.removeEventListener('blur', () => setPageBlur(true));
            window.removeEventListener('focus', () => setPageBlur(false));
        };
    }, [navigate, location, isMobileScreen]);

    // Floating hearts canvas
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const hearts = Array.from({ length: 40 }, () => ({
            x: Math.random() * canvas.width,
            y: canvas.height + Math.random() * 200,
            size: Math.random() * 20 + 8,
            speed: Math.random() * 1.2 + 0.4,
            opacity: Math.random() * 0.6 + 0.2,
            wobble: Math.random() * Math.PI * 2,
            wobbleSpeed: Math.random() * 0.03 + 0.01,
            color: ['#f700ff', '#ff69b4', '#ff1493', '#ff6eb4', '#ffa0d0'][Math.floor(Math.random() * 5)],
        }));

        const drawHeart = (cx, cy, size, color, opacity) => {
            ctx.save();
            ctx.globalAlpha = opacity;
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.moveTo(cx, cy - size * 0.25);
            ctx.bezierCurveTo(cx, cy - size, cx - size, cy - size, cx - size, cy - size * 0.25);
            ctx.bezierCurveTo(cx - size, cy + size * 0.1, cx, cy + size * 0.6, cx, cy + size * 0.75);
            ctx.bezierCurveTo(cx, cy + size * 0.6, cx + size, cy + size * 0.1, cx + size, cy - size * 0.25);
            ctx.bezierCurveTo(cx + size, cy - size, cx, cy - size, cx, cy - size * 0.25);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        };

        let frame;
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            hearts.forEach(h => {
                h.y -= h.speed;
                h.wobble += h.wobbleSpeed;
                h.x += Math.sin(h.wobble) * 0.5;
                if (h.y < -50) {
                    h.y = canvas.height + 50;
                    h.x = Math.random() * canvas.width;
                }
                drawHeart(h.x, h.y, h.size, h.color, h.opacity);
            });
            frame = requestAnimationFrame(animate);
        };
        animate();
        const onResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', onResize);
        return () => { cancelAnimationFrame(frame); window.removeEventListener('resize', onResize); };
    }, []);

    // Auto-advance to full message ONLY AFTER interaction occurs (phase 0 -> 1)
    useEffect(() => {
        if (phase === 0) {
            const t = setTimeout(() => {
                setPhase(1);
            }, 3500); // 3.5s delay before message reveal
            return () => clearTimeout(t);
        }
    }, [phase]);

    return (
        <div style={{
            minHeight: '100vh',
            background: 'radial-gradient(ellipse at 50% 30%, #2a0030 0%, #12001a 60%, #000 100%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            position: 'relative',
            fontFamily: 'Montserrat, sans-serif',
            padding: '40px 20px',
            userSelect: 'none',
            WebkitUserSelect: 'none',
            filter: pageBlur ? 'blur(100px) brightness(0.1)' : 'none',
            transition: 'filter 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
            pointerEvents: pageBlur ? 'none' : 'auto'
        }}>
            {/* Kill-switch overlay for screen recording/multitasking */}
            {pageBlur && (
                <div style={{
                    position: 'fixed', inset: 0, zIndex: 99999, background: '#000',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    color: 'rgba(255,255,255,0.4)', textAlign: 'center', padding: '20px'
                }}>
                    <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🔒</div>
                    <div style={{ fontSize: '0.9rem', letterSpacing: '4px', fontWeight: 900 }}>CONTENT_PROTECTED</div>
                    <div style={{ fontSize: '0.7rem', marginTop: '10px', color: 'rgba(255,100,200,0.5)' }}>Recording or Multitasking Detected</div>
                </div>
            )}
            {/* Print protection */}
            <style>{`
                @media print { body { display: none !important; } }
            `}</style>
            {/* 🎵 Hidden autoplay player  Ik Vaari Aa */}
            {/* Floating hearts canvas */}
            <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 0 }} />

            {/* Glowing orb */}
            <div style={{
                position: 'fixed', top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '600px', height: '600px',
                background: 'radial-gradient(circle, rgba(247,0,255,0.08) 0%, transparent 70%)',
                borderRadius: '50%',
                pointerEvents: 'none', zIndex: 0,
            }} />

            {/* Content */}
            <div style={{ position: 'relative', zIndex: 2, maxWidth: '720px', textAlign: 'center' }}>

                {/* Phase -1: Interaction Lock for Autoplay */}
                <AnimatePresence>
                    {phase === -1 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, filter: 'blur(10px)' }}
                            transition={{ duration: 1 }}
                            style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}
                        >
                            <motion.div
                                animate={{ boxShadow: ['0 0 20px rgba(247,0,255,0.2)', '0 0 60px rgba(247,0,255,0.6)', '0 0 20px rgba(247,0,255,0.2)'] }}
                                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                                style={{
                                    borderRadius: '50%',
                                    padding: '4px',
                                    background: 'linear-gradient(135deg, rgba(247,0,255,0.5), rgba(0,240,255,0.5))',
                                    marginBottom: '30px',
                                    cursor: 'pointer'
                                }}
                                onClick={() => setPhase(0)}
                            >
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    style={{
                                        background: 'rgba(10, 0, 15, 0.9)',
                                        width: '80px',
                                        height: '80px',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backdropFilter: 'blur(10px)',
                                    }}
                                >
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="url(#gradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <defs>
                                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                                <stop offset="0%" stopColor="#f700ff" />
                                                <stop offset="100%" stopColor="#ff69b4" />
                                            </linearGradient>
                                        </defs>
                                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                                    </svg>
                                </motion.div>
                            </motion.div>

                            <motion.h2 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                style={{
                                    color: '#fff',
                                    fontSize: '1.2rem',
                                    fontFamily: 'Montserrat, sans-serif',
                                    fontWeight: 300,
                                    letterSpacing: '4px',
                                    textTransform: 'uppercase',
                                    margin: '0 0 8px 0'
                                }}
                            >
                                Tap to Unlock
                            </motion.h2>
                            
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.6 }}
                                style={{
                                    color: 'rgba(255,255,255,0.4)',
                                    fontSize: '0.8rem',
                                    letterSpacing: '2px',
                                    textTransform: 'uppercase',
                                    fontFamily: 'Montserrat, sans-serif'
                                }}
                            >
                                Sound On
                            </motion.p>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Phase 0: Surprise reveal */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: phase >= 0 ? 1 : 0, scale: phase >= 0 ? 1 : 0.5 }}
                    transition={{ type: 'spring', stiffness: 180, damping: 18 }}
                    style={{ pointerEvents: phase >= 0 ? 'auto' : 'none' }}
                >
                    {/* Heart emoji giant */}
                    <motion.div
                        animate={{ scale: [1, 1.15, 1], rotate: [-3, 3, -3] }}
                        transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
                        style={{ fontSize: '5rem', display: 'block', marginBottom: '16px', lineHeight: 1 }}
                    >
                        🌸
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        style={{
                            fontSize: 'clamp(2.4rem, 6vw, 4rem)',
                            fontWeight: 900,
                            background: 'linear-gradient(135deg, #ff69b4, #f700ff, #ff1493)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            margin: '0 0 12px',
                            lineHeight: 1.1,
                        }}
                    >
                        Hey, Suman 🌸
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                        style={{ color: 'rgba(255,200,230,0.7)', fontSize: '1rem', letterSpacing: '3px', textTransform: 'uppercase' }}
                    >
                        This was meant only for you
                    </motion.p>
                </motion.div>

                {/* Phase 1: Full message */}
                {phase >= 1 && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        style={{ marginTop: '48px' }}
                    >
                        {/* Message card */}
                        <div style={{
                            background: 'rgba(247,0,255,0.04)',
                            border: '1px solid rgba(247,0,255,0.2)',
                            borderRadius: '24px',
                            padding: '48px 40px',
                            backdropFilter: 'blur(20px)',
                            boxShadow: '0 0 80px rgba(247,0,255,0.08), inset 0 1px 0 rgba(255,255,255,0.05)',
                            textAlign: 'left',
                        }}>
                            <p style={{ color: 'rgba(255,220,240,0.95)', fontSize: '1.05rem', lineHeight: 2, marginBottom: '24px' }}>
                                Jo maine breakup ke baad kiya, woh sab theek nahi tha. Distractions, other people, sab kuch. Khud ko numb karna zyada easy tha. That's not something I'm proud of, and I'm not going to justify it.
                            </p>
                            <p style={{ color: 'rgba(255,220,240,0.9)', fontSize: '1.05rem', lineHeight: 2, marginBottom: '24px' }}>
                                But yeh bhi sach hai  main isliye nahi gaya kyunki mujhe parwah nahi thi. Main gaya kyunki main thak gaya tha. Thak gaya tha uss feeling se jahan main akela lad raha hoon aur phir bhi main hi galat hoon. Aap online hoti thi, stories daalta thi, aur mere messages ka koi jawab nahi. Chhoti si baat hoti thi aur seedha "pyar khatam ho rha hai" aa jaata tha. Har baar argument ke baad main hi sorry bolta tha  not because I was wrong, but because it was the only way to stop the bleeding. Itna exhausting tha.
                            </p>
                            <p style={{ color: 'rgba(255,220,240,0.9)', fontSize: '1.05rem', lineHeight: 2, marginBottom: '24px' }}>
                                Meri galtiyan bhi thi. The anxiety, the clinginess, the way main spiral karta tha jab aap reply nahi karti thi. Woh sab mujhe pata tha aur main uspe kaam kar raha tha. Ab bhi kar raha hoon.
                            </p>
                            <p style={{ color: 'rgba(255,220,240,0.9)', fontSize: '1.05rem', lineHeight: 2, marginBottom: '24px' }}>
                                Lekin yeh sab bolne ke baad bhi, sach yeh hai ki aapko miss karta hoon. "Someone" ko nahi  aapko. Specifically. Jab cheezein easy hoti thi humare beech, us waqt ki feeling. Hum dono jaante hain ki kuch real tha wahan, sab mess ke neeche. Mujhse convince nahi hua khud ko ki nahi tha, aur try kiya maine.
                            </p>
                            <p style={{ color: 'rgba(255,220,240,0.9)', fontSize: '1.05rem', lineHeight: 2, marginBottom: '24px' }}>
                                Main yeh nahi keh raha ki sab bhool jao ya pretend karo ki bura hua hi nahi. Main sirf yeh pooch raha hoon  kya ek version exist karta hai jahan hum actually baat karte hain? Jahan chhoti cheez nuclear nahi banti. Jahan main low priority nahi hoon aur aap constantly attacked feel nahi karti. I think that version always existed. We just never chose it on purpose.
                            </p>
                            <p style={{ color: '#ff9ecf', fontSize: '1.05rem', lineHeight: 2, marginBottom: '0' }}>
                                Agar aap wahan nahi hain, theek hai. Main Madhuram weird nahi karunga, I promise. But agar aapke andar bhi kuch hai jo abhi bhi hold on kar raha hai
                            </p>
                            <p style={{ color: '#ff69b4', fontSize: '1.1rem', lineHeight: 2, fontWeight: 600, marginBottom: '0', marginTop: '8px' }}>
                                Mera bhi hai. 💌
                            </p>

                            {/* Signature */}
                            <div style={{ marginTop: '36px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{ width: '40px', height: '1px', background: 'rgba(247,0,255,0.3)' }} />
                                <span style={{
                                    color: 'rgba(247,0,255,0.7)', fontSize: '0.95rem', fontStyle: 'italic', letterSpacing: '1px'
                                }}> Tanush</span>
                            </div>
                        </div>

                        {/* ── Jo cheezein dil mein reh gayi ── */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.9, ease: 'easeOut' }}
                            style={{ marginTop: '48px' }}
                        >
                            {/* Lyric quote  most fitting line from Ik Vaari Aa */}
                            <div style={{
                                textAlign: 'center',
                                marginBottom: '32px',
                            }}>
                                <p style={{
                                    color: 'rgba(255,150,200,0.5)',
                                    fontSize: '0.78rem',
                                    letterSpacing: '3px',
                                    textTransform: 'uppercase',
                                    marginBottom: '12px',
                                }}>
                                    ♪ Ik Vaari Aa  Arijit Singh
                                </p>
                                <p style={{
                                    color: 'rgba(255,180,220,0.85)',
                                    fontSize: '1.15rem',
                                    fontStyle: 'italic',
                                    lineHeight: 1.8,
                                    fontWeight: 500,
                                }}>
                                    "Dil dhadakna band ho jaayega,<br />
                                    Ik baar aa, mere paas aa..."
                                </p>
                            </div>

                            {/* Section title */}
                            <p style={{
                                color: 'rgba(247,0,255,0.6)',
                                fontSize: '0.75rem',
                                letterSpacing: '4px',
                                textTransform: 'uppercase',
                                textAlign: 'center',
                                marginBottom: '24px',
                            }}>
                                Jo cheezein dil mein reh gayi
                            </p>

                            {/* Memory chips */}
                            <div style={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: '14px',
                                justifyContent: 'center',
                            }}>
                                {[
                                    { emoji: '🌶️', text: 'Gol gappe khaate hue woh reaction  puri duniya ek second ke liye ruk jaati thi' },
                                    { emoji: '🎵', text: 'Woh ek Darshan Raval ka song jo aap repeat karte the  main jaanta hoon aapko yaad hai konsa' },
                                    { emoji: '🗺️', text: 'Travel plans jo kabhi poore nahi hue  lekin planning karte waqt jo excitement thi, woh real thi' },
                                    { emoji: '✨', text: 'Jab aap dress up karti thi  aur phir mirror dekh ke khud hi muskurati thi' },
                                    { emoji: '🐾', text: '"Otto"  aaj bhi samajh nahi aaya itna cute kyun lagta tha, but it really did' },
                                    { emoji: '🕚', text: '11:11 pe aapki aankhein  main wish nahi karta tha, main bas aapko dekha karta tha' },
                                ].map((m, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, scale: 0.85, y: 20 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        transition={{ delay: 0.7 + i * 0.12, duration: 0.5, ease: 'easeOut' }}
                                        style={{
                                            background: 'rgba(247,0,255,0.05)',
                                            border: '1px solid rgba(247,0,255,0.18)',
                                            borderRadius: '16px',
                                            padding: '16px 20px',
                                            maxWidth: '300px',
                                            backdropFilter: 'blur(12px)',
                                            display: 'flex',
                                            gap: '12px',
                                            alignItems: 'flex-start',
                                            textAlign: 'left',
                                            boxShadow: '0 4px 24px rgba(247,0,255,0.05)',
                                            transition: 'border-color 0.3s, box-shadow 0.3s',
                                            cursor: 'default',
                                        }}
                                        whileHover={{
                                            borderColor: 'rgba(247,0,255,0.45)',
                                            boxShadow: '0 8px 32px rgba(247,0,255,0.15)',
                                            scale: 1.02,
                                        }}
                                    >
                                        <span style={{ fontSize: '1.5rem', lineHeight: 1, flexShrink: 0, marginTop: '2px' }}>{m.emoji}</span>
                                        <p style={{
                                            color: 'rgba(255,210,235,0.85)',
                                            fontSize: '0.88rem',
                                            lineHeight: 1.7,
                                            margin: 0,
                                            fontFamily: 'Montserrat, sans-serif',
                                        }}>
                                            {m.text}
                                        </p>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* CTA  go back */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            style={{ marginTop: '36px', display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}
                        >
                            <button
                                onClick={() => navigate('/')}
                                style={{
                                    background: 'none',
                                    border: '1px solid rgba(247,0,255,0.3)',
                                    borderRadius: '50px',
                                    color: 'rgba(255,200,230,0.7)',
                                    padding: '12px 28px',
                                    cursor: 'pointer',
                                    fontSize: '0.9rem',
                                    fontFamily: 'Montserrat, sans-serif',
                                    transition: 'all 0.3s',
                                }}
                                onMouseOver={e => { e.target.style.background = 'rgba(247,0,255,0.1)'; e.target.style.color = '#fff'; }}
                                onMouseOut={e => { e.target.style.background = 'none'; e.target.style.color = 'rgba(255,200,230,0.7)'; }}
                            >
                                ← Back to Madhuram
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default ForSuman;
