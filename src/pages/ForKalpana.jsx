import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const ForKalpana = () => {
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
        const deadline = new Date('2026-03-22T23:50:00');
        const now = new Date();
        const params = new URLSearchParams(location.search);
        const isBypass = params.get('bypass') === 'true' || params.get('dev') === 'true';

        if (now > deadline && !isBypass) navigate('/', { replace: true });

        // --- ENHANCED SECURITY (Anti-Screenshot/Recording) ---
        const preventOps = (e) => { e.preventDefault(); return false; };
        const handleKeys = (e) => {
            if (e.key === 'PrintScreen' || (e.metaKey && e.shiftKey) || (e.ctrlKey && e.key === 'p') || (e.metaKey && e.key === 'p')) {
                setPageBlur(true);
                if (e.key === 'p') e.preventDefault();
            }
        };

        document.addEventListener('contextmenu', preventOps);
        document.addEventListener('copy', preventOps);
        document.addEventListener('keydown', handleKeys);

        const handleTouchStart = (e) => { if (e.touches.length > 1) setPageBlur(true); };
        window.addEventListener('touchstart', handleTouchStart);
        window.addEventListener('blur', () => setPageBlur(true));
        window.addEventListener('focus', () => setPageBlur(false));

        return () => {
            window.removeEventListener('resize', handleResize);
            document.removeEventListener('contextmenu', preventOps);
            document.removeEventListener('copy', preventOps);
            document.removeEventListener('keydown', handleKeys);
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('blur', () => setPageBlur(true));
            window.removeEventListener('focus', () => setPageBlur(false));
        };
    }, [navigate, location, isMobileScreen]);

    // Floating Dairy Milk wrapper / chocolate pieces canvas
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Dairy Milk Silk "Heart Blush" Particle Design
        const particles = Array.from({ length: 45 }, () => ({
            x: Math.random() * canvas.width,
            y: canvas.height + Math.random() * 200,
            size: Math.random() * 12 + 8,
            speed: Math.random() * 1.5 + 0.5,
            opacity: Math.random() * 0.8 + 0.2,
            wobble: Math.random() * Math.PI * 2,
            wobbleSpeed: Math.random() * 0.02 + 0.01,
            // Silk Colors: Silk Gold, Blush Pink, Hot Pink, Red-Pink, Foil Yellow
            color: ['#FFD700', '#FFB6C1', '#FF69B4', '#FF1493', '#FBC02D'][Math.floor(Math.random() * 5)],
            type: Math.random() > 0.6 ? 'filled' : 'hollow' // Lots of hollow heart outlines like the wrapper
        }));

        const drawHeart = (cx, cy, size, color, opacity, type) => {
            ctx.save();
            ctx.globalAlpha = opacity;
            ctx.translate(cx, cy);
            ctx.rotate(cx * 0.01); // Randomish rotation
            
            ctx.beginPath();
            ctx.moveTo(0, size * -0.25);
            ctx.bezierCurveTo(0, size * -1, size * -1, size * -1, size * -1, size * -0.25);
            ctx.bezierCurveTo(size * -1, size * 0.1, 0, size * 0.6, 0, size * 0.75);
            ctx.bezierCurveTo(0, size * 0.6, size, size * 0.1, size, size * -0.25);
            ctx.bezierCurveTo(size, size * -1, 0, size * -1, 0, size * -0.25);
            ctx.closePath();

            if (type === 'hollow') {
                ctx.lineWidth = 1.5;
                ctx.strokeStyle = color;
                ctx.stroke();
            } else {
                ctx.fillStyle = color;
                ctx.fill();
            }
            ctx.restore();
        };

        let frame;
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(h => {
                h.y -= h.speed;
                h.wobble += h.wobbleSpeed;
                h.x += Math.sin(h.wobble) * 0.5;
                if (h.y < -50) {
                    h.y = canvas.height + 50;
                    h.x = Math.random() * canvas.width;
                }
                drawHeart(h.x, h.y, h.size, h.color, h.opacity, h.type);
            });
            frame = requestAnimationFrame(animate);
        };
        animate();
        const onResize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
        window.addEventListener('resize', onResize);
        return () => { cancelAnimationFrame(frame); window.removeEventListener('resize', onResize); };
    }, []);

    useEffect(() => {
        if (phase === 0) {
            const t = setTimeout(() => setPhase(1), 3500);
            return () => clearTimeout(t);
        }
    }, [phase]);

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(to bottom, rgba(74, 14, 78, 0.4), rgba(48, 0, 91, 0.85)), url("https://i.ibb.co/fYNhqJGw/PHOTO-2026-03-22-02-09-21.jpg") center 15%/cover fixed no-repeat',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            overflow: 'hidden', position: 'relative', fontFamily: 'Montserrat, sans-serif',
            padding: '40px 20px', userSelect: 'none', WebkitUserSelect: 'none',
            filter: pageBlur ? 'blur(100px) brightness(0.1)' : 'none',
            transition: 'filter 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
            pointerEvents: pageBlur ? 'none' : 'auto'
        }}>
            {pageBlur && (
                <div style={{
                    position: 'fixed', inset: 0, zIndex: 99999, background: '#000', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.4)', textAlign: 'center', padding: '20px'
                }}>
                    <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🔒</div>
                    <div style={{ fontSize: '0.9rem', letterSpacing: '4px', fontWeight: 900 }}>CONTENT_PROTECTED</div>
                </div>
            )}

            <style>{`@media print { body { display: none !important; } }`}</style>

            <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 0 }} />

            <div style={{
                position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(212,175,55,0.1) 0%, transparent 70%)',
                borderRadius: '50%', pointerEvents: 'none', zIndex: 0,
            }} />

            <div style={{ position: 'relative', zIndex: 2, maxWidth: '720px', textAlign: 'center' }}>
                <AnimatePresence>
                    {phase === -1 && (
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, filter: 'blur(10px)', y: -50 }} transition={{ duration: 1 }}
                            style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}
                        >
                            <motion.div
                                animate={{ boxShadow: ['0 0 20px rgba(212,175,55,0.4)', '0 0 70px rgba(212,175,55,0.8)', '0 0 20px rgba(212,175,55,0.4)'] }}
                                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                                style={{ borderRadius: '16px', padding: '4px', background: 'linear-gradient(135deg, #d4af37, #FFD700)', marginBottom: '30px', cursor: 'pointer' }}
                                onClick={() => setPhase(0)}
                            >
                                <motion.div whileHover={{ y: 5 }} whileTap={{ y: 15 }}
                                    style={{ background: '#31005b', width: '120px', height: '40px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '4px solid #1a0033' }}>
                                    <div style={{ color: '#d4af37', fontWeight: 900, letterSpacing: '4px', fontSize: '0.9rem' }}>PULL</div>
                                </motion.div>
                            </motion.div>
                            <motion.h2 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                                style={{ color: '#FFB6C1', fontSize: '1.8rem', fontFamily: 'serif', fontStyle: 'italic', fontWeight: 600, letterSpacing: '2px', textTransform: 'capitalize', margin: '0 0 8px 0', textShadow: '0 2px 10px rgba(255,182,193,0.5)' }}> Heart Blush </motion.h2>
                            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
                                style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem', letterSpacing: '2px', textTransform: 'uppercase' }}> Sound On </motion.p>
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: phase >= 0 ? 1 : 0, scale: phase >= 0 ? 1 : 0.5 }} transition={{ type: 'spring', stiffness: 180, damping: 18 }} style={{ pointerEvents: phase >= 0 ? 'auto' : 'none', position: 'relative' }}>
                    <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }} style={{ fontSize: '8rem', marginBottom: '8px', lineHeight: 1, opacity: 0.1, position: 'absolute', top: -40, left: '50%', transform: 'translateX(-50%)', fontFamily: 'serif', fontStyle: 'italic', color: '#d4af37' }}> S </motion.div>
                    <motion.div animate={{ y: [-3, 3, -3] }} transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }} style={{ fontSize: '4rem', marginBottom: '16px', lineHeight: 1, position: 'relative', zIndex: 1 }}> 💗 </motion.div>
                    <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }}
                        style={{ fontSize: 'clamp(2.4rem, 6vw, 4rem)', fontWeight: 900, color: '#fff', textShadow: '0 4px 20px rgba(0,0,0,0.5)', margin: '0 0 12px', lineHeight: 1.1, position: 'relative', zIndex: 1 }}>
                        Hey, Kalpana
                    </motion.h1>
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
                        style={{ color: '#FFB6C1', fontSize: '1.2rem', letterSpacing: '1px',fontFamily: 'serif', fontStyle: 'italic', fontWeight: 600 }}>
                        Sweeter than Dairy Milk
                    </motion.p>
                </motion.div>

                {phase >= 1 && (
                    <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: 'easeOut' }} style={{ marginTop: '48px' }}>
                        <div style={{
                            background: 'rgba(75,0,130,0.15)', border: '1px solid rgba(212,175,55,0.3)', borderRadius: '24px', padding: '48px 40px',
                            backdropFilter: 'blur(20px)', boxShadow: '0 0 80px rgba(75,0,130,0.4), inset 0 1px 0 rgba(255,255,255,0.1)', textAlign: 'left',
                        }}>
                            <p style={{ color: 'rgba(255,255,255,0.95)', fontSize: '1.05rem', lineHeight: 2, marginBottom: '24px' }}>
                                This is a secret page just for you! It's basically here to tell you something directly from my heart...
                            </p>
                            <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.05rem', lineHeight: 2, marginBottom: '24px' }}>
                                I know things might be confusing or take time to figure out. But I want you to know that I am in no rush. I'll be right here.
                            </p>
                            
                            <p style={{ color: '#d4af37', fontSize: '1.2rem', lineHeight: 2, fontWeight: 700, marginBottom: '0', marginTop: '32px' }}>
                                Take your time Baba, I can wait! 🍫
                            </p>

                            <div style={{ marginTop: '36px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{ width: '40px', height: '1px', background: 'rgba(212,175,55,0.5)' }} />
                                <span style={{ color: 'rgba(212,175,55,0.9)', fontSize: '0.95rem', fontStyle: 'italic', letterSpacing: '1px' }}> Dheeresh</span>
                            </div>
                        </div>

                        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.9, ease: 'easeOut' }} style={{ marginTop: '48px' }}>
                            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                                <p style={{ color: 'rgba(212,175,55,0.5)', fontSize: '0.78rem', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '12px' }}>
                                    ♪ Until I Found You  Stephen Sanchez
                                </p>
                            </div>

                            <p style={{ color: 'rgba(212,175,55,0.8)', fontSize: '0.75rem', letterSpacing: '4px', textTransform: 'uppercase', textAlign: 'center', marginBottom: '24px' }}> Golden Memories </p>
                            
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', justifyContent: 'center' }}>
                                {[
                                    { emoji: '👑', text: 'That magical night when we were crowned Mr. and Ms. Freshers — a golden memory forever.' },
                                    { emoji: '🌟', text: 'You can add another custom memory text here to make her smile!' },
                                    { emoji: '🍫', text: 'Another sweet reminder of something nice that happened between you two.' },
                                ].map((m, i) => (
                                    <motion.div key={i} initial={{ opacity: 0, scale: 0.85, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ delay: 0.7 + i * 0.12, duration: 0.5, ease: 'easeOut' }}
                                        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(212,175,55,0.2)', borderRadius: '16px', padding: '16px 20px', maxWidth: '300px', display: 'flex', gap: '12px', alignItems: 'flex-start', textAlign: 'left', boxShadow: '0 4px 24px rgba(0,0,0,0.2)' }}>
                                        <span style={{ fontSize: '1.5rem', lineHeight: 1, flexShrink: 0, marginTop: '2px' }}>{m.emoji}</span>
                                        <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.88rem', lineHeight: 1.7, margin: 0 }}> {m.text} </p>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} style={{ marginTop: '36px', display: 'flex', justifyContent: 'center' }}>
                            <button onClick={() => navigate('/')}
                                style={{ background: 'none', border: '1px solid rgba(212,175,55,0.4)', borderRadius: '50px', color: 'rgba(212,175,55,0.9)', padding: '12px 28px', cursor: 'pointer', fontSize: '0.9rem', fontFamily: 'Montserrat, sans-serif', transition: 'all 0.3s' }}
                                onMouseOver={e => { e.target.style.background = 'rgba(212,175,55,0.1)'; e.target.style.color = '#fff'; }} onMouseOut={e => { e.target.style.background = 'none'; e.target.style.color = 'rgba(212,175,55,0.9)'; }}>
                                ← Back to Madhuram
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default ForKalpana;
