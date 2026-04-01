import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const img1 = "https://i.ibb.co/ymzc1Sss/Untitled-design-1.png"; // Guy with mic
const img2 = "https://i.ibb.co/Kjx5vDZ1/Untitled-design-3.png"; // Guitarist
const img3 = "https://i.ibb.co/zHQKK2Jx/Untitled-design.png";   // Girls dancing
const borderCloud = "https://i.ibb.co/Wpv1n0GT/Group-1410103901.png"; // Fluffy section connector
const heroBg = "https://i.ibb.co/r2VjGb6B/DSC-4435.jpg"; // Updated hero background

const Home = () => {
    const navigate = useNavigate();
    const [openFaq, setOpenFaq] = useState(null);
    const canvasRef = useRef(null);
    const heroRef = useRef(null);
    const mouseRef = useRef({ x: -1000, y: -1000, active: false });
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
    const [isHeartsMode, setIsHeartsMode] = useState(false);
    const heartsRef = useRef(false);

    useEffect(() => {
        let typed = "";
        const handleKeys = (e) => {
            typed = (typed + e.key.toLowerCase()).slice(-20);
            if (typed.includes("suman")) {
                setIsHeartsMode(true);
                heartsRef.current = true;
                // Maybe a little console hint?
                console.log("%c💖 HEARTS MODE ENGAGED 💖", "color: #f700ff; font-weight: bold; font-size: 20px;");
            }
        };
        window.addEventListener("keydown", handleKeys);
        return () => window.removeEventListener("keydown", handleKeys);
    }, []);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 1024);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const scrollReveal = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" }
        }
    };

    const gallery = [
        { title: 'Team Devine Divas', subtitle: 'Wall of Fame', img: '/wall-of-fame/devine_divas_opt.jpeg', color: '#f700ff' },
        { title: 'Khasa Ala Chahar', subtitle: 'Wall of Fame', img: '/wall-of-fame/khasa_ala_opt.jpeg', color: '#ebff00' },
        { title: 'Team Walk It', subtitle: 'Wall of Fame', img: '/wall-of-fame/modelling_opt.jpeg', color: '#00f0ff' },
        { title: 'Highlights', subtitle: 'Wall of Fame', img: '/wall-of-fame/highlights_opt.jpeg', color: '#f700ff' },
    ];

    const faqs = [
        { q: "What is Madhuram?", a: "Madhuram is the Annual Cultural Fest of SLIET, an expression of euphoria with over 5000+ students and 10000+ footfall across India." },
        { q: "When was Madhuram established?", a: "Madhuram was established in 1989 with a vision to revolutionize social education in the region." },
        { q: "What is the mission of Madhuram?", a: "To serve as a dynamic catalyst for cultural integration, bridging the gap between social innovation and human expression through inclusive excellence." },
        { q: "Where is SLIET located?", a: "SLIET is located in Longowal, Sangrur, Punjab, India on a 451-Acre Eco scale." },
        { q: "What is the SLIET rank and accreditation?", a: "SLIET achieved NIRF Rank 79 and NAAC A-Grade accreditation, recognized among the elite engineering institutions in the nation." },
        { q: "How can I contact the Madhuram team?", a: "You can reach out via email at madhuram@sliet.ac.in or check our Instagram @madhuramsliet." }
    ];

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let width = window.innerWidth;
        let height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        const colors = ['#D1FF00', '#f700ff', '#00f0ff', '#FF0055'];
        
        let particles = [];
        const initializeParticles = () => {
            const count = isMobile ? 12 : 32;
            particles = [];
            for (let i = 0; i < count; i++) {
                particles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    vx: (Math.random() - 0.5) * 0.15,
                    vy: (Math.random() - 0.5) * 0.15,
                    radius: Math.random() * (isMobile ? 12 : 20) + 5,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    type: Math.floor(Math.random() * 3), // 0: Flower, 1: Starburst, 2: Orbit
                    angle: Math.random() * Math.PI * 2,
                    spin: (Math.random() - 0.5) * 0.02
                });
            }
        };

        const drawPremiumFlower = (x, y, r, c, alpha, angle) => {
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(angle);
            // Glow - much faster than RadialGradient
            ctx.beginPath();
            ctx.fillStyle = c;
            ctx.globalAlpha = alpha * 0.2;
            ctx.arc(0, 0, r * 1.6, 0, Math.PI * 2);
            ctx.fill();

            ctx.globalAlpha = alpha;
            ctx.strokeStyle = c;
            ctx.lineWidth = 1.2;
            
            const petals = 8;
            for (let i = 0; i < petals; i++) {
                ctx.beginPath();
                ctx.rotate((Math.PI * 2) / petals);
                ctx.ellipse(r * 0.45, 0, r * 0.55, r * 0.18, 0, 0, Math.PI * 2);
                ctx.stroke();
            }
            
            ctx.beginPath();
            ctx.fillStyle = c;
            ctx.arc(0, 0, r * 0.15, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        };

        const drawPremiumStarburst = (x, y, r, c, alpha, angle) => {
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(angle);
            
            // Star Glow
            ctx.beginPath();
            ctx.fillStyle = c;
            ctx.globalAlpha = alpha * 0.25;
            ctx.arc(0, 0, r * 2.2, 0, Math.PI * 2);
            ctx.fill();

            ctx.globalAlpha = alpha;
            ctx.fillStyle = c;
            
            for (let j = 0; j < 2; j++) {
                if (j === 1) ctx.rotate(Math.PI / 4);
                const stretch = j === 0 ? r : r * 0.45;
                for (let i = 0; i < 4; i++) {
                    ctx.rotate(Math.PI / 2);
                    ctx.beginPath();
                    ctx.moveTo(0, r * 0.05);
                    ctx.quadraticCurveTo(r * 0.1, r * 0.1, stretch, 0);
                    ctx.quadraticCurveTo(r * 0.1, -r * 0.1, 0, -r * 0.05);
                    ctx.fill();
                }
            }
            
            ctx.beginPath();
            ctx.arc(0, 0, r * 0.1, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        };

        const drawPremiumOrbit = (x, y, r, c, alpha, angle) => {
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(angle);
            ctx.globalAlpha = alpha;
            ctx.strokeStyle = c;
            ctx.lineWidth = 1;

            // Orbit Glow
            ctx.beginPath();
            ctx.arc(0, 0, r * 0.7, 0, Math.PI * 2);
            ctx.strokeStyle = c;
            ctx.globalAlpha = alpha * 0.5;
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(0, 0, r * 0.35, 0, Math.PI * 2);
            ctx.stroke();
            
            ctx.fillStyle = c;
            for(let i=0; i<3; i++) {
                ctx.rotate((Math.PI * 2) / 3);
                ctx.beginPath();
                ctx.arc(r * 0.7, 0, r * 0.08, 0, Math.PI * 2);
                ctx.fill();
            }
            
            ctx.beginPath();
            ctx.moveTo(0, -r * 0.15);
            ctx.lineTo(r * 0.15, 0);
            ctx.lineTo(0, r * 0.15);
            ctx.lineTo(-r * 0.15, 0);
            ctx.closePath();
            ctx.stroke();
            
            ctx.restore();
        };

        const drawHeart = (x, y, size, c, alpha) => {
            ctx.save();
            ctx.globalAlpha = alpha;
            ctx.strokeStyle = c;
            ctx.lineWidth = 1;
            const ty = y - size * 0.4;
            ctx.beginPath();
            ctx.moveTo(x, ty + size * 0.3);
            ctx.bezierCurveTo(x, ty, x - size, ty, x - size, ty + size * 0.6);
            ctx.bezierCurveTo(x - size, ty + size, x, ty + size * 1.3, x, ty + size * 1.6);
            ctx.bezierCurveTo(x, ty + size * 1.3, x + size, ty + size, x + size, ty + size * 0.6);
            ctx.bezierCurveTo(x + size, ty, x, ty, x, ty + size * 0.3);
            ctx.stroke();
            ctx.restore();
        };

        const tapParticles = [];
        const spawnTap = (x, y) => {
            const color = colors[Math.floor(Math.random() * colors.length)];
            const angle = Math.random() * Math.PI * 2;
            tapParticles.push({
                x, y,
                vx: Math.cos(angle) * 0.2,
                vy: Math.sin(angle) * 0.2,
                life: 1,
                decay: 0.012,
                color,
                size: 30 + Math.random() * 20, // Single decently sized flower
                angle: Math.random() * Math.PI * 2,
                spin: (Math.random() - 0.5) * 0.05
            });
        };

        const onResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            initializeParticles();
        };

        const onMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top, active: true };
        };

        const onMouseLeave = () => {
            mouseRef.current.active = false;
        };

        const onPointerDown = (e) => {
            const rect = canvas.getBoundingClientRect();
            const clientX = e.clientX || (e.touches && e.touches[0].clientX);
            const clientY = e.clientY || (e.touches && e.touches[0].clientY);
            if (clientX !== undefined) {
                spawnTap(clientX - rect.left, clientY - rect.top);
            }
        };

        window.addEventListener('resize', onResize);
        const hero = heroRef.current;
        if (hero) {
            hero.addEventListener('mousemove', onMouseMove);
            hero.addEventListener('mouseleave', onMouseLeave);
            hero.addEventListener('mousedown', onPointerDown);
            hero.addEventListener('touchstart', onPointerDown, { passive: true });
        }

        initializeParticles();

        let animationId;
        const render = () => {
            ctx.clearRect(0, 0, width, height);
            ctx.globalCompositeOperation = 'lighter';
            
            const mouse = mouseRef.current;

            // Update & Draw Ambient
            particles.forEach((p, i) => {
                // Physics
                p.x += p.vx;
                p.y += p.vy;
                p.angle += p.spin;

                // (Mouse attraction Jazz removed for a calmer floating effect)
                // We keep mouse.active check but don't apply forces here
                
                // Friction
                p.vx *= 0.995;
                p.vy *= 0.995;

                // Wrap
                if (p.x < -100) p.x = width + 100;
                if (p.x > width + 100) p.x = -100;
                if (p.y < -100) p.y = height + 100;
                if (p.y > height + 100) p.y = -100;

                // Draw
                const alpha = isMobile ? 0.35 : 0.25;
                if (heartsRef.current) {
                    drawHeart(p.x, p.y, p.radius, p.color, alpha);
                } else {
                    if (p.type === 0) drawPremiumFlower(p.x, p.y, p.radius, p.color, alpha, p.angle);
                    else if (p.type === 1) drawPremiumStarburst(p.x, p.y, p.radius, p.color, alpha, p.angle);
                    else drawPremiumOrbit(p.x, p.y, p.radius, p.color, alpha, p.angle);
                }

                // Connections (DISABLED ON MOBILE FOR BUTTERY SMOOTH PERFORMANCE)
                if (!isMobile) {
                    for (let j = i + 1; j < particles.length; j++) {
                        const p2 = particles[j];
                        const dx = p.x - p2.x;
                        const dy = p.y - p2.y;
                        
                        // Fast distance check
                        const distSq = dx * dx + dy * dy;
                        if (distSq < 48400) { // 220^2
                            const d = Math.sqrt(distSq);
                            ctx.beginPath();
                            ctx.strokeStyle = p.color;
                            ctx.globalAlpha = (1 - d / 220) * 0.18;
                            ctx.lineWidth = 0.6;
                            ctx.moveTo(p.x, p.y);
                            
                            // Concentrated curvature
                            const cpX = (p.x + p2.x) / 2 + (p.y - p2.y) * 0.1;
                            const cpY = (p.y + p2.y) / 2 + (p2.x - p.x) * 0.1;
                            ctx.quadraticCurveTo(cpX, cpY, p2.x, p2.y);
                            ctx.stroke();
                        }
                    }
                }
            });

            // Tap Particles (Beautiful little flowers blooming)
            for (let i = tapParticles.length - 1; i >= 0; i--) {
                const tp = tapParticles[i];
                tp.life -= tp.decay;
                if (tp.life <= 0) {
                    tapParticles.splice(i, 1);
                    continue;
                }
                
                tp.x += tp.vx;
                tp.y += tp.vy;
                tp.angle += tp.spin;
                
                const progress = 1 - tp.life; // 0 to 1
                const alpha = Math.min(1, tp.life * 1.5); // Fades out smoothly at the end
                
                let currentScale = 1;
                // Pop in quickly, then shrink slightly
                if (progress < 0.2) {
                    currentScale = progress / 0.2; // 0 to 1
                } else {
                    currentScale = 1 + (progress - 0.2) * 0.5; // slow drift larger
                }
                
                // Draw little flower
                drawPremiumFlower(tp.x, tp.y, tp.size * currentScale, tp.color, alpha * 0.8, tp.angle);
                
                // Draw a small flare star inside it for extra cuteness
                drawPremiumStarburst(tp.x, tp.y, (tp.size * currentScale) * 0.5, '#fff', alpha * 0.5, -tp.angle * 2);
            }

            animationId = requestAnimationFrame(render);
        };
        render();

        return () => {
            window.removeEventListener('resize', onResize);
            if (hero) {
                hero.removeEventListener('mousemove', onMouseMove);
                hero.removeEventListener('mouseleave', onMouseLeave);
                hero.removeEventListener('mousedown', onPointerDown);
                hero.removeEventListener('touchstart', onPointerDown);
            }
            cancelAnimationFrame(animationId);
        };
    }, [isMobile]);

    return (
        <div style={{ backgroundColor: '#2a0c24', minHeight: '100vh', color: '#fff', overflowX: 'hidden', fontFamily: 'Montserrat, sans-serif' }}>

            {/* HERO SECTION */}
            <section
                ref={heroRef}
                style={{
                    position: 'relative',
                    marginTop: isMobile ? '-60px' : '-68px',
                    height: isMobile ? 'calc(100vh + 60px)' : 'calc(100vh + 68px)',
                    display: 'flex', flexDirection: 'column', justifyContent: 'center',
                    padding: isMobile ? '0 5vw' : '0 10vw',
                    paddingTop: isMobile ? '60px' : '68px',
                    overflow: 'hidden',
                    cursor: 'crosshair',
                }}
            >
                {/* Immediate IMG tag ensures browser preloader picks this up instantly for LCP */}
                <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
                    <img src={heroBg} alt="" fetchpriority="high" decoding="async" style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0 }} />
                    <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, background: 'linear-gradient(rgba(42, 12, 36, 0.4), rgba(42, 12, 36, 0.7))' }} />
                </div>
                <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }} />

                <div style={{ position: 'relative', zIndex: 2, textAlign: isMobile ? 'center' : 'left' }}>
                    <motion.h2
                        initial={{ opacity: 0.01, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: isMobile ? 0.6 : 1, delay: isMobile ? 0 : 0.2 }}
                        style={{ color: '#ebff00', fontSize: isMobile ? '1.1rem' : 'clamp(1.2rem, 3vw, 2.5rem)', margin: 0, fontFamily: 'Montserrat, sans-serif', fontWeight: 800, textTransform: 'uppercase', letterSpacing: isMobile ? '1px' : 'normal' }}
                    >
                        THE ANNUAL SOCIO-CULTURAL<br />FEST OF SLIET
                    </motion.h2>

                    <motion.h1
                        initial={{ opacity: 0.01, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: isMobile ? 0.8 : 1.2, delay: isMobile ? 0.1 : 0.4 }}
                        style={{ color: '#ebff00', fontSize: isMobile ? '3.2rem' : 'clamp(4rem, 12vw, 9rem)', margin: '15px 0 35px 0', fontFamily: '"Mystery Quest", system-ui', fontWeight: 'normal', textShadow: '4px 4px 0 rgba(0,0,0,0.5)', wordBreak: 'break-word', lineHeight: 1 }}
                    >
                        mADHURAM'26
                    </motion.h1>

                    <motion.div initial={{ opacity: 0.01, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: isMobile ? 0.6 : 0.8, delay: isMobile ? 0.2 : 0.6 }}>
                        <button
                            onClick={(e) => { e.stopPropagation(); navigate('/register'); }}
                            className="register-glimmer-btn"
                            style={{
                                background: '#bfff00',
                                color: '#000',
                                padding: '14px 40px',
                                fontSize: isMobile ? '1.1rem' : '1.35rem',
                                fontWeight: 900,
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontFamily: 'Montserrat, sans-serif',
                                transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                                border: 'none',
                                position: 'relative',
                                overflow: 'hidden'
                            }}
                            onMouseOver={(e) => {
                                e.target.style.transform = 'scale(1.03) translateY(-2px)';
                                e.target.style.boxShadow = '0 12px 30px rgba(191, 255, 0, 0.4)';
                            }}
                            onMouseOut={(e) => {
                                e.target.style.transform = 'scale(1) translateY(0)';
                                e.target.style.boxShadow = 'none';
                            }}
                        >
                            REGISTER
                            <style>{`
                                .register-glimmer-btn::after {
                                    content: '';
                                    position: absolute;
                                    top: 0;
                                    left: -150%;
                                    width: 150%;
                                    height: 100%;
                                    background: linear-gradient(
                                        90deg,
                                        rgba(255, 255, 255, 0) 0%,
                                        rgba(255, 255, 255, 0.5) 50%,
                                        rgba(255, 255, 255, 0) 100%
                                    );
                                    transform: skewX(-20deg);
                                    animation: elegant-glimmer 7s infinite;
                                }
                                @keyframes elegant-glimmer {
                                    0%, 10% { left: -150%; }
                                    45%, 100% { left: 150%; }
                                }
                            `}</style>
                        </button>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0.5, 1] }}
                    transition={{ delay: 1.5, duration: 2.5, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
                    style={{
                        position: 'absolute',
                        bottom: isMobile ? '28px' : '36px',
                        right: isMobile ? '20px' : '48px',
                        zIndex: 3,
                        textAlign: 'right',
                        pointerEvents: 'none',
                        backdropFilter: isMobile ? 'blur(8px)' : 'blur(12px)',
                        WebkitBackdropFilter: isMobile ? 'blur(8px)' : 'blur(12px)',
                    }}
                >
                    <div style={{
                        fontFamily: 'VT323, monospace',
                        fontSize: isMobile ? '1.1rem' : '1.35rem',
                        color: '#f700ff',
                        letterSpacing: '3px',
                        textShadow: '0 0 10px rgba(247,0,255,0.6)',
                        lineHeight: 1
                    }}>
                        ✦ {isMobile ? 'TOUCH' : 'TAP'} ANYWHERE
                    </div>
                    <div style={{
                        width: '100%',
                        height: '1px',
                        background: 'linear-gradient(to right, transparent, rgba(247,0,255,0.5))',
                        marginTop: '6px',
                    }} />
                </motion.div>
            </section>

            {/* ── WHAT IS MADHURAM ── */}
            <motion.section
                variants={scrollReveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
                style={{
                    padding: isMobile ? '120px 8vw 60px' : '60px 10vw 0',
                    position: 'relative',
                    overflow: 'visible',
                    zIndex: 2,
                    minHeight: isMobile ? 'auto' : '850px',
                    display: 'flex',
                    flexDirection: isMobile ? 'column' : 'row',
                    alignItems: isMobile ? 'center' : 'center',
                    justifyContent: 'space-between',
                }}
            >
                {/* 1. TEXT CONTENT (LEFT) */}
                <div style={{
                    flex: isMobile ? '0 0 auto' : '0 1 700px',
                    textAlign: isMobile ? 'center' : 'left',
                    zIndex: 11,
                    position: 'relative',
                    paddingBottom: isMobile ? '60px' : '200px',
                    marginTop: isMobile ? '0' : '-100px'
                }}>
                    <h2 style={{ margin: 0, textTransform: 'none' }}>
                        <span style={{
                            display: 'block',
                            color: '#ebff00',
                            fontSize: isMobile ? '3rem' : '4rem',
                            fontFamily: 'Montserrat, sans-serif',
                            fontWeight: 900,
                            lineHeight: 1
                        }}>
                            What is
                        </span>
                        <span style={{
                            display: 'block',
                            color: '#ebff00',
                            fontSize: isMobile ? '3rem' : '4.5rem',
                            fontFamily: '"Mystery Quest", system-ui',
                            fontWeight: 'normal',
                            lineHeight: 1,
                            marginLeft: isMobile ? '0' : '80px',
                            marginTop: '10px'
                        }}>
                            mADHURAM'26?
                        </span>
                    </h2>
                    <div style={{ color: '#e0d6e6', fontSize: '1.05rem', lineHeight: 1.8, fontFamily: 'Montserrat, sans-serif', opacity: 0.95, maxWidth: isMobile ? '100%' : '750px', marginTop: '40px', textAlign: isMobile ? 'left' : 'justify' }}>
                        <p style={{ marginBottom: '16px', fontWeight: 700, color: '#ebff00' }}>EVERY EDITION A NEW LEGEND.</p>
                        <p style={{ marginBottom: '16px' }}>Madhuram is not just a fest; it's the cultural heartbeat of SLIET Longowal. It's where social precision meets artistic explosion.</p>
                        <p style={{ marginBottom: '16px' }}>For over three decades, we've set the gold standard for North India's student celebrations. Join thousands in experiencing the pulse.</p>
                    </div>
                </div>

                {/* 2. PERFORMERS CONTAINER (DESKTOP ONLY) */}
                {!isMobile && (
                    <div style={{
                        flex: '1 1 auto',
                        position: 'relative',
                        width: 'auto',
                        height: '650px',
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'flex-end',
                        overflow: 'visible',
                        zIndex: 2,
                        marginRight: '-8vw',
                    }}>
                        <div style={{ position: 'relative', width: 'auto', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'flex-end', bottom: '-75px' }}>
                            {/* Guitarist */}
                            <motion.img initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}
                                src={img2} alt="Guitarist"
                                style={{ height: '450px', width: 'auto', marginRight: '-120px', zIndex: 1, filter: 'drop-shadow(0 15px 30px rgba(0,0,0,0.8))' }} />

                            {/* Main Singer */}
                            <motion.img initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
                                src={img1} alt="Main Singer"
                                style={{ height: '620px', width: 'auto', zIndex: 3, filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.9))' }} />

                            {/* Dancers */}
                            <motion.img initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
                                src={img3} alt="Dancers"
                                style={{ height: '480px', width: 'auto', marginLeft: '-150px', zIndex: 2, filter: 'drop-shadow(0 15px 30px rgba(0,0,0,0.8))' }} />
                        </div>
                    </div>
                )}

                {/* 3. CLOUD BORDER (SHARED) */}
                <div style={{
                    position: 'absolute',
                    bottom: isMobile ? '-25px' : '-165px',
                    left: 0,
                    width: '100vw',
                    zIndex: 4,
                    pointerEvents: 'none'
                }}>
                    <img src={borderCloud} alt="Cloud Border" loading="lazy" style={{ width: '100%', height: 'auto', maxHeight: isMobile ? '135px' : '480px', objectFit: 'fill', display: 'block' }} />
                </div>
            </motion.section>

            <motion.section
                variants={scrollReveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                style={{ padding: isMobile ? '80px 5vw' : '120px 10vw' }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px', justifyContent: isMobile ? 'center' : 'flex-start', flexWrap: 'wrap' }}>
                    <div style={{ background: '#fff', color: '#000', padding: '8px 20px', fontSize: isMobile ? '1.5rem' : '2rem', fontWeight: 900, fontFamily: 'Montserrat, sans-serif' }}>MOOD</div>
                    <div style={{ background: '#f700ff', color: '#fff', padding: '8px 20px', fontSize: isMobile ? '1.5rem' : '2rem', fontWeight: 900, fontFamily: 'Montserrat, sans-serif' }}>GALLERY</div>
                </div>
                <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '50px', textAlign: isMobile ? 'center' : 'left' }}>Explore the sonic and visual landscapes of our flagship events</p>

                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(auto-fit, minmax(250px, 1fr))', gap: isMobile ? '14px' : '24px' }}>
                    {gallery.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: i * 0.05, ease: "easeOut" }}
                            whileHover={{ scale: 1.03 }}
                            style={{ cursor: 'pointer' }}
                        >
                            <div style={{
                                height: isMobile ? '160px' : '300px',
                                background: `url("${item.img}") center/cover`,
                                border: `3px solid ${item.color}`,
                                borderRadius: '10px',
                                marginBottom: '10px',
                                position: 'relative'
                            }}>
                                <img
                                    src={item.img}
                                    style={{ display: 'none' }}
                                    loading="lazy"
                                    alt={item.title}
                                />
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#fff', fontFamily: 'Montserrat, sans-serif' }}>{item.title}</h3>
                                    <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>{item.subtitle}</div>
                                </div>
                                <div style={{ color: item.color, fontWeight: 'bold' }}>2025</div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.section>

            {/* TRAILER SECTION */}
            <motion.section
                variants={scrollReveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                style={{ padding: isMobile ? '60px 5vw' : '80px 10vw', textAlign: 'center' }}
            >
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px', marginBottom: '40px', flexWrap: 'wrap' }}>
                    <div style={{ background: '#00f0ff', color: '#000', padding: '8px 20px', fontSize: isMobile ? '1.5rem' : '2rem', fontWeight: 900, fontFamily: 'Montserrat, sans-serif' }}>OFFICIAL</div>
                    <div style={{ background: '#f700ff', color: '#fff', padding: '8px 20px', fontSize: isMobile ? '1.5rem' : '2rem', fontWeight: 900, fontFamily: 'Montserrat, sans-serif' }}>TRAILER</div>
                </div>

                <div style={{
                    position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden',
                    maxWidth: '100%', borderRadius: '16px', border: '4px solid rgba(0, 240, 255, 0.3)',
                    boxShadow: '0 0 40px rgba(0, 240, 255, 0.2)'
                }}>
                    <iframe
                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                        src="https://www.youtube.com/embed/AcsTzvBQmqE?si=usN0NXXLHh5v5pzL&mute=1"
                        title="Madhuram 2026 Trailer"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        loading="lazy"
                    ></iframe>
                </div>
            </motion.section>

            {/* FAQ SECTION */}
            <motion.section
                variants={scrollReveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                style={{ padding: isMobile ? '80px 6vw' : '150px 10vw 250px', background: 'transparent', position: 'relative', zIndex: 5 }}
            >
                <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? '60px' : '100px', alignItems: 'flex-start' }}>
                    {/* LEFT COLUMN: TITLE */}
                    <div style={{
                        flex: isMobile ? 'unset' : '0 0 380px',
                        position: isMobile ? 'relative' : 'sticky',
                        top: '120px',
                        height: 'fit-content',
                        marginBottom: isMobile ? '80px' : '0',
                        zIndex: 10
                    }}>
                        <div style={{ display: 'inline-block', padding: '8px 20px', background: 'rgba(247, 0, 255, 0.1)', border: '1px solid rgba(247, 0, 255, 0.3)', borderRadius: '30px', color: '#f700ff', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '2px', marginBottom: '24px', fontFamily: 'Montserrat, sans-serif' }}>SUPPORT CENTER</div>
                        <h2 style={{
                            color: '#ebff00',
                            fontSize: isMobile ? '3.2rem' : '4rem',
                            fontFamily: 'Montserrat, sans-serif',
                            fontWeight: 900,
                            lineHeight: '0.9',
                            margin: 0,
                            letterSpacing: '-2px'
                        }}>
                            ANY QUESTIONS?<br />
                            <span style={{ fontFamily: '"Mystery Quest", system-ui', fontWeight: 'normal', fontSize: '0.85em', color: '#fff', display: 'block', marginTop: '10px' }}>WE GOT YOU.</span>
                        </h2>
                    </div>

                    {/* RIGHT COLUMN: QUESTIONS */}
                    <div style={{ flex: '1 1 auto', display: 'flex', flexDirection: 'column', gap: '24px', width: '100%', zIndex: 1 }}>
                        {faqs.map((faq, index) => (
                            <motion.div
                                key={index}
                                initial={false}
                                whileHover={{ scale: 1.01, background: 'rgba(255,255,255,0.05)' }}
                                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                style={{
                                    background: openFaq === index ? 'rgba(235, 255, 0, 0.05)' : 'rgba(255,255,255,0.03)',
                                    backgroundImage: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 100%)',
                                    border: `1px solid ${openFaq === index ? '#ebff00' : 'rgba(255,255,255,0.1)'}`,
                                    borderRadius: '24px',
                                    padding: isMobile ? '24px' : '32px',
                                    cursor: 'pointer',
                                    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    backdropFilter: 'blur(12px)',
                                    WebkitBackdropFilter: 'blur(12px)',
                                    boxShadow: openFaq === index ? '0 10px 30px rgba(235, 255, 0, 0.1)' : 'none'
                                }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{
                                        fontSize: isMobile ? '1.1rem' : '1.3rem',
                                        color: openFaq === index ? '#ebff00' : '#fff',
                                        fontFamily: 'Montserrat, sans-serif',
                                        fontWeight: 800,
                                        transition: 'color 0.3s ease'
                                    }}>{faq.q}</span>
                                    <div style={{
                                        width: '40px', height: '40px', borderRadius: '50%',
                                        background: openFaq === index ? '#ebff00' : 'rgba(255,255,255,0.05)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        transition: 'all 0.3s ease',
                                        flexShrink: 0
                                    }}>
                                        <motion.span
                                            animate={{ rotate: openFaq === index ? 135 : 0 }}
                                            style={{
                                                fontSize: '24px',
                                                fontWeight: '300',
                                                color: openFaq === index ? '#000' : '#fff',
                                                lineHeight: '1',
                                                display: 'block',
                                                marginTop: '-2px'
                                            }}
                                        >+</motion.span>
                                    </div>
                                </div>
                                <AnimatePresence>
                                    {openFaq === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0, marginTop: 0 }}
                                            animate={{ height: 'auto', opacity: 1, marginTop: '24px' }}
                                            exit={{ height: 0, opacity: 0, marginTop: 0 }}
                                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                            style={{ overflow: 'hidden' }}
                                        >
                                            <div style={{
                                                color: 'rgba(255,255,255,0.7)',
                                                fontSize: '1rem',
                                                lineHeight: '1.8',
                                                fontFamily: 'Montserrat, sans-serif',
                                                borderTop: '1px solid rgba(255,255,255,0.1)',
                                                paddingTop: '24px'
                                            }}>
                                                {faq.a}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>
        </div >
    );
};

export default Home;
