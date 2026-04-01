import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const About = () => {
    const navigate = useNavigate();
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
    const yParallax = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 1024);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const timeline = [
        { title: 'FOUNDING', desc: 'The journey began with a vision to revolutionize social education in the region.', tag: '1989 ORIGINS', color: 'var(--yellow)', icon: '🏛️' },
        { title: 'NAAC A-GRADE', desc: 'Achieved pinnacle accreditation, signifying excellence in academic and cultural infrastructure.', tag: 'QUALITY BENCHMARK', color: 'var(--cyan)', icon: '⭐' },
        { title: '451-ACRE ECO', desc: 'Evolution into a massive self-sustaining green ecosystem fostering innovation and life.', tag: 'SUSTAINABLE GROWTH', color: '#0f0', icon: '🌿' },
        { title: 'NIRF RANK 79', desc: 'Recognized among the elite engineering institutions in the nation for research and impact.', tag: 'NATIONAL MERIT', color: 'var(--pink)', icon: '🏆' }
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
            style={{
                padding: isMobile ? '30px 20px' : '60px',
                margin: isMobile ? '20px 10px' : '40px',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '24px',
                background: 'rgba(255,255,255,0.02)',
                overflow: 'hidden'
            }}
            ref={containerRef}
        >
            {/* HERO SECTION */}
            <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '40px', alignItems: 'center', marginBottom: '80px' }}>
                <div style={{ flex: 1, textAlign: isMobile ? 'center' : 'left' }}>
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                        style={{ background: 'var(--pink)', color: '#fff', fontSize: '0.7rem', padding: '4px 12px', display: 'inline-block', fontWeight: 900, borderRadius: '4px', marginBottom: '20px', letterSpacing: '2px' }}>
                        ESTABLISHED 1989
                    </motion.div>
                    <motion.h1 style={{ fontSize: isMobile ? '3rem' : '4.5rem', color: '#fff', margin: 0, lineHeight: 1, fontFamily: 'var(--font-logo)', y: yParallax }}>THE</motion.h1>
                    <motion.h1 style={{ fontSize: isMobile ? '4rem' : '6rem', WebkitTextStroke: '1px var(--pink)', color: 'transparent', margin: 0, lineHeight: 1, fontFamily: 'var(--font-logo)', x: isMobile ? 0 : 20 }}>MADHURAM</motion.h1>
                    <motion.h1 style={{ fontSize: isMobile ? '5rem' : '7.5rem', color: 'var(--yellow)', margin: 0, lineHeight: 1, textShadow: '0 0 20px rgba(252, 238, 10, 0.3)', fontFamily: 'var(--font-logo)' }}>LEGACY</motion.h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginTop: '30px', marginBottom: '40px', maxWidth: '450px', marginLeft: isMobile ? 'auto' : '0', marginRight: isMobile ? 'auto' : '0' }}>
                        Forging inclusive cultural bridges through cultural excellence and artistic expression in the heart of Punjab.
                    </p>
                    <button className="btn-primary" onClick={() => navigate('/events')}>EXPLORE ARCHIVE</button>
                </div>
                {!isMobile && (
                    <div style={{ flex: 1, height: '500px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)', background: 'url(https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=1000&q=80) center/cover', position: 'relative', overflow: 'hidden' }}>
                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(transparent, rgba(18, 9, 33, 0.8))' }} />
                        <div style={{ position: 'absolute', bottom: '30px', left: '30px', color: 'var(--yellow)', fontSize: '3rem', fontWeight: 900, fontFamily: 'var(--font-logo)' }}>मधुरम्</div>
                    </div>
                )}
            </div>

            {/* MISSION */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                style={{ background: 'rgba(255,255,255,0.03)', padding: isMobile ? '40px 20px' : '80px', borderRadius: '20px', borderLeft: '6px solid var(--pink)', marginBottom: '100px', textAlign: 'center' }}>
                <div style={{ color: 'var(--cyan)', fontWeight: 900, letterSpacing: '4px', marginBottom: '30px', fontSize: '0.8rem' }}>OUR MISSION</div>
                <div style={{ fontSize: isMobile ? '1.8rem' : '3.2rem', lineHeight: 1.3, color: '#fff', fontWeight: 900 }}>
                    "Bridging the gap between <span style={{ color: 'var(--yellow)' }}>social innovation</span> and human expression through <span style={{ color: 'var(--pink)' }}>inclusive excellence</span>."
                </div>
            </motion.div>

            {/* TIMELINE */}
            <div style={{ marginBottom: '60px', textAlign: isMobile ? 'center' : 'left' }}>
                <h2 style={{ fontSize: isMobile ? '2.5rem' : '4rem', margin: 0, color: '#fff', fontFamily: 'var(--font-logo)' }}>SLIET TIMELINE</h2>
                <div style={{ color: 'var(--yellow)', marginTop: '10px', fontSize: '1rem', fontWeight: 700, letterSpacing: '2px' }}>A JOURNEY OF GROWTH</div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '100px' }}>
                {timeline.map((item, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                        style={{ background: 'rgba(255,255,255,0.02)', padding: '35px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', position: 'relative' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '20px' }}>{item.icon}</div>
                        <h3 style={{ color: item.color, fontSize: '1.6rem', fontWeight: 900, marginBottom: '15px' }}>{item.title}</h3>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '25px' }}>{item.desc}</p>
                        <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.05)', color: '#fff', padding: '6px 16px', fontSize: '0.75rem', fontWeight: 900, borderRadius: '4px' }}>{item.tag}</div>
                    </motion.div>
                ))}
            </div>

            {/* GALLERIES */}
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr', gap: '30px', marginBottom: '30px' }}>
                <div style={{ height: isMobile ? '300px' : '450px', borderRadius: '20px', overflow: 'hidden', position: 'relative' }}>
                    <div style={{ position: 'absolute', inset: 0, background: 'url(/wall-of-fame/Devine Divas 2.jpeg) center/cover' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(transparent, rgba(0,0,0,0.8))' }} />
                    <div style={{ position: 'absolute', bottom: '30px', left: '30px' }}>
                        <h3 style={{ color: '#fff', fontSize: '2.5rem', margin: 0, fontWeight: 900 }}>FUTURE READY</h3>
                        <div style={{ color: 'var(--pink)', fontWeight: 800, letterSpacing: '2px' }}>TRADITION MEETS INNOVATION</div>
                    </div>
                </div>
                <div style={{ height: isMobile ? '300px' : '450px', borderRadius: '20px', overflow: 'hidden', position: 'relative' }}>
                    <div style={{ position: 'absolute', inset: 0, background: 'url(https://images.unsplash.com/photo-1540039155732-6808545362ba?w=800&q=80) center/cover' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(transparent, rgba(0,0,0,0.8))' }} />
                    <div style={{ position: 'absolute', bottom: '30px', left: '30px' }}>
                        <h3 style={{ color: '#fff', fontSize: '2rem', margin: 0, fontWeight: 900 }}>VIBRANT</h3>
                        <div style={{ color: 'var(--yellow)', fontWeight: 800, letterSpacing: '2px' }}>CULTURE</div>
                    </div>
                </div>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 2fr', gap: '30px' }}>
                <div style={{ height: isMobile ? '300px' : '400px', borderRadius: '20px', overflow: 'hidden', position: 'relative' }}>
                    <div style={{ position: 'absolute', inset: 0, background: 'url(https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&q=80) center/cover' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(transparent, rgba(0,0,0,0.8))' }} />
                    <div style={{ position: 'absolute', bottom: '30px', left: '30px' }}>
                        <h3 style={{ color: '#fff', fontSize: '2rem', margin: 0, fontWeight: 900 }}>NIGHTS</h3>
                        <div style={{ color: 'var(--cyan)', fontWeight: 800, letterSpacing: '2px' }}>UNFORGETTABLE</div>
                    </div>
                </div>
                <div style={{ height: isMobile ? '300px' : '400px', borderRadius: '20px', overflow: 'hidden', position: 'relative' }}>
                    <div style={{ position: 'absolute', inset: 0, background: 'url(https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80) center/cover' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(transparent, rgba(0,0,0,0.8))' }} />
                    <div style={{ position: 'absolute', bottom: '30px', left: '30px', right: '30px' }}>
                        <h3 style={{ color: '#fff', fontSize: '2.5rem', margin: 0, fontWeight: 900 }}>THE STAGE IS YOURS</h3>
                        <div style={{ color: 'var(--pink)', fontWeight: 800, letterSpacing: '2px' }}>ARTISTIC EXPRESSION</div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default About;
