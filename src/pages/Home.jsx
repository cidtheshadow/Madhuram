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
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

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
        { title: 'Devine Divas', subtitle: 'Wall of Fame', img: '/wall-of-fame/Devine Divas.jpeg', color: '#f700ff' },
        { title: 'Khasa Ala Chahar', subtitle: 'Wall of Fame', img: '/wall-of-fame/Khasa Ala.jpeg', color: '#ebff00' },
        { title: 'Modelling', subtitle: 'Wall of Fame', img: '/wall-of-fame/Modelling.jpeg', color: '#00f0ff' },
        { title: 'Highlights', subtitle: 'Wall of Fame', img: '/wall-of-fame/WhatsApp Image 2026-03-14 at 11.34.22.jpeg', color: '#f700ff' },
    ];

    const faqs = [
        { q: "What is Madhuram?", a: "Madhuram is the Annual Cultural Fest of SLIET, an expression of euphoria with over 1.5M+ students from 7000+ colleges." },
        { q: "When was Madhuram established?", a: "Madhuram was established in 1989 with a vision to revolutionize technical education in the region." },
        { q: "What is the mission of Madhuram?", a: "To serve as a dynamic catalyst for cultural integration, bridging the gap between technical innovation and human expression through inclusive excellence." },
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

        const resizeCanvas = () => {
            const currentCanvas = canvasRef.current;
            if (!currentCanvas) return;
            currentCanvas.width = window.innerWidth;
            currentCanvas.height = window.innerHeight;
            // Drawers and render will use currentCanvas.width directly
        };
        window.addEventListener('resize', resizeCanvas);

        const numParticles = Math.min(Math.floor(width / 50), 30);
        const particles = [];
        const tapFlowers = []; // interactive spawned flowers
        const colors = ['#D1FF00', '#f700ff', '#00f0ff', '#FF0055'];

        for (let i = 0; i < numParticles; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.8,
                vy: (Math.random() - 0.5) * 0.8,
                radius: 12 + Math.random() * 20,
                color: colors[Math.floor(Math.random() * colors.length)],
                type: Math.floor(Math.random() * 4)
            });
        }

        const drawStarburst = (x, y, r, c, alpha = 1) => {
            ctx.save();
            ctx.globalAlpha = alpha;
            ctx.strokeStyle = c; ctx.lineWidth = 1.5; ctx.beginPath();
            for (let i = 0; i < 8; i++) {
                const a = (Math.PI / 4) * i;
                ctx.moveTo(x, y); ctx.lineTo(x + Math.cos(a) * r, y + Math.sin(a) * r);
            }
            ctx.stroke();
            ctx.beginPath(); ctx.arc(x, y, r * 0.3, 0, Math.PI * 2); ctx.stroke();
            ctx.restore();
        };

        const drawFlower = (x, y, r, c, alpha = 1) => {
            ctx.save();
            ctx.globalAlpha = alpha;
            ctx.fillStyle = 'transparent'; ctx.strokeStyle = c; ctx.lineWidth = 1.5; ctx.beginPath();
            for (let i = 0; i < 6; i++) {
                const a = (Math.PI / 3) * i;
                ctx.moveTo(x, y);
                ctx.ellipse(x + Math.cos(a) * r * 0.6, y + Math.sin(a) * r * 0.6, r * 0.6, r * 0.2, a, 0, Math.PI * 2);
            }
            ctx.stroke();
            // glowing dot in center
            ctx.beginPath(); ctx.arc(x, y, r * 0.18, 0, Math.PI * 2);
            ctx.fillStyle = c; ctx.fill();
            ctx.restore();
        };

        const drawDiamondCircle = (x, y, r, c, alpha = 1) => {
            ctx.save();
            ctx.globalAlpha = alpha;
            ctx.strokeStyle = c; ctx.lineWidth = 1.5;
            ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.stroke();
            const d = r * 0.6;
            ctx.beginPath(); ctx.moveTo(x, y - d); ctx.lineTo(x + d, y); ctx.lineTo(x, y + d); ctx.lineTo(x - d, y); ctx.closePath(); ctx.stroke();
            ctx.beginPath(); ctx.arc(x, y, r * 0.1, 0, Math.PI * 2); ctx.stroke();
            ctx.restore();
        };

        const drawEye = (x, y, r, c, alpha = 1) => {
            ctx.save();
            ctx.globalAlpha = alpha;
            ctx.strokeStyle = c; ctx.lineWidth = 1.5; ctx.beginPath();
            ctx.moveTo(x - r, y);
            ctx.quadraticCurveTo(x, y - r * 1.2, x + r, y);
            ctx.quadraticCurveTo(x, y + r * 1.2, x - r, y);
            ctx.stroke();
            ctx.fillStyle = '#D1FF00'; ctx.beginPath(); ctx.arc(x, y, r * 0.2, 0, Math.PI * 2); ctx.fill();
            ctx.restore();
        };

        const DRAWERS = [drawStarburst, drawFlower, drawDiamondCircle, drawEye];
        const ripples = []; // expanding rings on spawn

        // Spawn a flower + burst ripple at click/touch position
        const spawnFlower = (x, y) => {
            const color = colors[Math.floor(Math.random() * colors.length)];
            tapFlowers.push({
                x, y,
                radius: 18 + Math.random() * 14,
                color,
                type: Math.floor(Math.random() * 4),
                born: performance.now(),
                life: 2800,
            });
            // spawn 3 offset ripple rings
            for (let k = 0; k < 3; k++) {
                ripples.push({ x, y, color, born: performance.now() + k * 80, life: 700, maxR: 55 + k * 20 });
            }
        };

        const hero = heroRef.current;
        if (!hero) return;

        const onPointerDown = (e) => {
            const rect = canvas.getBoundingClientRect();
            const touches = e.touches || [e];
            Array.from(touches).forEach(t => {
                spawnFlower(t.clientX - rect.left, t.clientY - rect.top);
            });
        };

        hero.addEventListener('mousedown', onPointerDown);
        hero.addEventListener('touchstart', onPointerDown, { passive: true });

        let animationId;
        const render = () => {
            ctx.clearRect(0, 0, width, height);
            const now = performance.now();

            // ── ambient particles ──
            particles.forEach(p => {
                p.x += p.vx; p.y += p.vy;
                if (p.x < -p.radius) p.x = width + p.radius;
                if (p.x > width + p.radius) p.x = -p.radius;
                if (p.y < -p.radius) p.y = height + p.radius;
                if (p.y > height + p.radius) p.y = -p.radius;
                DRAWERS[p.type](p.x, p.y, p.radius, p.color, 1);
            });

            // ── ambient connection lines ──
            ctx.lineWidth = 1;
            for (let i = 0; i < numParticles; i++) {
                for (let j = i + 1; j < numParticles; j++) {
                    const p1 = particles[i], p2 = particles[j];
                    const dx = p1.x - p2.x, dy = p1.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 220) {
                        ctx.save();
                        ctx.strokeStyle = p1.color;
                        ctx.globalAlpha = 1 - dist / 220;
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.quadraticCurveTo(p1.x + dx * 0.1, p1.y - dy * 0.1, p2.x, p2.y);
                        ctx.stroke();
                        ctx.restore();
                    }
                }
            }

            // ── tap flowers ──
            for (let i = tapFlowers.length - 1; i >= 0; i--) {
                const f = tapFlowers[i];
                const age = now - f.born;
                if (age > f.life) { tapFlowers.splice(i, 1); continue; }

                // fade: full for first 40%, then fade out
                const t = age / f.life;
                const alpha = t < 0.4 ? 1 : 1 - (t - 0.4) / 0.6;

                // draw the flower slightly larger
                DRAWERS[f.type](f.x, f.y, f.radius * (1 + t * 0.4), f.color, alpha);

                // connection lines to nearby ambient particles
                particles.forEach(p => {
                    const dx = f.x - p.x, dy = f.y - p.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 320) {
                        ctx.save();
                        ctx.strokeStyle = f.color;
                        ctx.lineWidth = 1.2;
                        ctx.globalAlpha = alpha * (1 - dist / 320) * 0.9;
                        ctx.beginPath();
                        ctx.moveTo(f.x, f.y);
                        ctx.lineTo(p.x, p.y);
                        ctx.stroke();
                        ctx.restore();
                    }
                });

                // connection lines to other tap flowers
                tapFlowers.forEach((f2, j) => {
                    if (j >= i) return;
                    const dx = f.x - f2.x, dy = f.y - f2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 400) {
                        ctx.save();
                        ctx.strokeStyle = f.color;
                        ctx.lineWidth = 1;
                        ctx.globalAlpha = alpha * (1 - dist / 400) * 0.7;
                        ctx.setLineDash([4, 4]);
                        ctx.beginPath();
                        ctx.moveTo(f.x, f.y); ctx.lineTo(f2.x, f2.y);
                        ctx.stroke();
                        ctx.setLineDash([]);
                        ctx.restore();
                    }
                });
            }

            // ── ripple burst rings ──
            for (let i = ripples.length - 1; i >= 0; i--) {
                const rip = ripples[i];
                const age = now - rip.born;
                if (age < 0) continue; // staggered start
                if (age > rip.life) { ripples.splice(i, 1); continue; }
                const t = age / rip.life;
                const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
                const r = eased * rip.maxR;
                const alpha = (1 - t) * 0.75;
                ctx.save();
                ctx.globalAlpha = alpha;
                ctx.strokeStyle = rip.color;
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.arc(rip.x, rip.y, r, 0, Math.PI * 2);
                ctx.stroke();
                ctx.restore();
            }

            animationId = requestAnimationFrame(render);
        };
        render();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            hero.removeEventListener('mousedown', onPointerDown);
            hero.removeEventListener('touchstart', onPointerDown);
            cancelAnimationFrame(animationId);
        };
    }, []);

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
                    backgroundImage: `linear-gradient(rgba(42, 12, 36, 0.4), rgba(42, 12, 36, 0.7)), url("${heroBg}")`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    overflow: 'hidden',
                    cursor: 'crosshair',
                }}
            >
                <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }} />

                <div style={{ position: 'relative', zIndex: 2, textAlign: isMobile ? 'center' : 'left' }}>
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        style={{ color: '#ebff00', fontSize: isMobile ? '1.2rem' : 'clamp(1.2rem, 3vw, 2.5rem)', margin: 0, fontFamily: 'Montserrat, sans-serif', fontWeight: 800, textTransform: 'uppercase' }}
                    >
                        The ANNUAL CULTURAL{!isMobile && <br />}FEST OF SLIET
                    </motion.h2>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, delay: 0.4 }}
                        style={{ color: '#ebff00', fontSize: isMobile ? '4rem' : 'clamp(4rem, 12vw, 9rem)', margin: '10px 0 30px 0', fontFamily: '"Mystery Quest", system-ui', fontWeight: 'normal', textShadow: '4px 4px 0 rgba(0,0,0,0.5)' }}
                    >
                        mADHURAM'26
                    </motion.h1>

                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}>
                        <button
                            onClick={(e) => { e.stopPropagation(); navigate('/register'); }}
                            style={{ background: '#ebff00', color: '#000', padding: '12px 36px', fontSize: isMobile ? '1.1rem' : '1.4rem', fontWeight: 900, borderRadius: '8px', cursor: 'pointer', fontFamily: 'Montserrat, sans-serif', transition: 'transform 0.2s', border: 'none' }}
                            onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                            onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                        >
                            REGISTER
                        </button>
                    </motion.div>
                </div>

                {/* TAP ANYWHERE hint */}
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
                    }}
                >
                    <div style={{
                        fontFamily: 'VT323, monospace',
                        fontSize: isMobile ? '1.1rem' : '1.35rem',
                        color: '#f700ff',
                        letterSpacing: '3px',
                        textShadow: '0 0 12px rgba(247,0,255,0.7)',
                        lineHeight: 1,
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
                    padding: isMobile ? '80px 8vw' : '60px 10vw 0',
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
                    <div style={{ color: '#e0d6e6', fontSize: '1.05rem', lineHeight: 1.8, fontFamily: 'Montserrat, sans-serif', opacity: 0.95, maxWidth: isMobile ? '100%' : '750px', marginTop: '40px', textAlign: 'justify' }}>
                        <p style={{ marginBottom: '16px' }}>Best Day of your life</p>
                        <p style={{ marginBottom: '16px' }}>Madhuram is not a fest, it's a feeling. The cultural heartbeat of SLIET Longowal, where music, art, and raw talent collide into something unforgettable.</p>
                        <p style={{ marginBottom: '16px' }}>What started as a spark has grown into Punjab's most electrifying celebration of student culture. Every edition, thousands pour in from colleges across the country — not just to compete, but to experience something that can't be replicated anywhere else.</p>
                        <p style={{ marginBottom: '25px' }}>Decades in. Still setting the standard.</p>
                        <p style={{ fontWeight: 600 }}>Don't miss your moment. Register Now.</p>
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
                    <img src={borderCloud} alt="Cloud Border" style={{ width: '100%', height: 'auto', maxHeight: isMobile ? '135px' : '480px', objectFit: 'fill', display: 'block' }} />
                </div>
            </motion.section>

            <motion.section
                variants={scrollReveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                style={{ padding: isMobile ? '60px 5vw' : '80px 10vw' }}
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
                            transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
                            whileHover={{ scale: 1.03 }}
                            style={{ cursor: 'pointer' }}
                        >
                            <div style={{ height: isMobile ? '160px' : '300px', background: `url("${item.img}") center/cover`, border: `3px solid ${item.color}`, borderRadius: '10px', marginBottom: '10px' }}></div>
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
                        src="https://www.youtube.com/embed/b31xOodlcxg"
                        title="Madhuram 2026 Trailer"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
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
                                    backdropFilter: 'blur(10px)',
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
