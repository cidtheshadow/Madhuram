import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const About = () => {
    const navigate = useNavigate();
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
    const yParallax = useTransform(scrollYProgress, [0, 1], [0, -150]);
    const scaleParallax = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

    const timeline = [
        { title: 'FOUNDING', desc: 'The journey began with a vision to revolutionize technical education in the region.', tag: '1989 ORIGINS', color: 'var(--yellow)', icon: '🏛️' },
        { title: 'NAAC A-GRADE', desc: 'Achieved pinnacle accreditation, signifying excellence in academic and cultural infrastructure.', tag: 'QUALITY BENCHMARK', color: 'var(--cyan)', icon: '⭐' },
        { title: '451-ACRE ECO', desc: 'Evolution into a massive self-sustaining green ecosystem fostering innovation and life.', tag: 'SUSTAINABLE GROWTH', color: '#0f0', icon: '🌿' },
        { title: 'NIRF RANK 79', desc: 'Recognized among the elite engineering institutions in the nation for research and impact.', tag: 'NATIONAL MERIT', color: 'var(--pink)', icon: '🏆' }
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{ padding: '60px', margin: '40px', border: '2px solid var(--pink)', borderRadius: '24px', background: 'rgba(255,255,255,0.02)' }}
            ref={containerRef}
        >
            <div style={{ display: 'flex', gap: '40px', alignItems: 'center', marginBottom: '80px' }}>
                <div style={{ flex: 1 }}>
                    <motion.div
                        initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}
                        style={{ background: 'var(--pink)', color: '#fff', fontSize: '0.8rem', padding: '4px 16px', display: 'inline-block', fontWeight: 'bold', borderRadius: '4px', marginBottom: '24px' }}>
                        ESTABLISHED 1989
                    </motion.div>
                    <motion.h1 style={{ fontSize: '4rem', color: '#fff', margin: 0, lineHeight: 1, fontFamily: 'var(--font-display)', y: yParallax }}>THE</motion.h1>
                    <motion.h1 style={{ fontSize: '5rem', WebkitTextStroke: '2px var(--pink)', color: 'transparent', margin: 0, lineHeight: 1, fontFamily: 'var(--font-display)', y: useTransform(scrollYProgress, [0, 1], [0, -200]) }}>MADHURAM</motion.h1>
                    <motion.h1 style={{ fontSize: '6rem', color: 'var(--yellow)', margin: 0, lineHeight: 1, textShadow: '0 0 20px var(--yellow)', fontFamily: 'var(--font-display)', y: useTransform(scrollYProgress, [0, 1], [0, -250]) }}>LEGACY</motion.h1>

                    <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginTop: '24px', marginBottom: '32px', maxWidth: '400px' }}>
                        Forging inclusive cultural bridges through technical excellence and artistic expression in the heart of Punjab.
                    </p>

                    <button className="btn-primary" onClick={() => navigate('/events')} style={{ transition: 'all 0.3s' }}>EXPLORE ARCHIVE</button>
                </div>

                <div style={{ flex: 1, height: '400px', borderRadius: '12px', border: '2px solid var(--pink)', background: 'url(https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=1000&q=80) center/cover', position: 'relative', boxShadow: '0 0 30px rgba(247,0,255,0.3)', filter: 'sepia(30%) hue-rotate(-30deg)' }}>
                    <div style={{ position: 'absolute', bottom: '20px', left: '20px', color: 'var(--yellow)', fontSize: '2.5rem', fontWeight: 900, fontFamily: 'var(--font-heading)' }}>
                        मधुरम्
                    </div>
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                style={{ background: 'var(--bg-card)', padding: '60px', borderRadius: '16px', borderLeft: '4px solid var(--yellow)', marginBottom: '100px' }}
            >
                <div style={{ color: 'var(--pink)', fontWeight: 'bold', letterSpacing: '4px', marginBottom: '24px', fontSize: '0.9rem', fontFamily: 'var(--font-sub)' }}>OUR MISSION</div>
                <div style={{ fontSize: '2.5rem', lineHeight: 1.4, color: '#fff', fontFamily: 'var(--font-sub)' }}>
                    "To serve as a <span style={{ color: 'var(--yellow)', fontFamily: 'var(--font-display)', textTransform: 'uppercase' }}>dynamic catalyst</span> for cultural integration, bridging the gap between technical innovation and human expression through <span style={{ color: 'var(--pink)', borderBottom: '4px solid var(--pink)' }}>inclusive excellence</span>."
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: '2px solid var(--pink)', paddingBottom: '16px', marginBottom: '40px' }}
            >
                <h2 style={{ fontSize: '3rem', margin: 0, color: '#fff', fontFamily: 'var(--font-display)' }}>SLIET TIMELINE</h2>
                <div style={{ color: 'var(--yellow)', textAlign: 'right' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', letterSpacing: '8px' }}>::::::</div>
                    <div style={{ fontSize: '0.8rem', letterSpacing: '2px', fontFamily: 'var(--font-sub)' }}>HISTORICAL PROGRESS</div>
                </div>
            </motion.div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '80px' }}>
                {timeline.map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ delay: i * 0.15 }}
                        whileHover={{ y: -10 }}
                        style={{ border: '1px solid rgba(255,255,255,0.1)', background: 'var(--bg-card)', padding: '32px', borderRadius: '12px', position: 'relative', overflow: 'hidden' }}
                    >
                        <div style={{ position: 'absolute', top: '-10px', right: '-10px', fontSize: '8rem', color: 'rgba(255,255,255,0.03)', fontWeight: 900, pointerEvents: 'none', fontFamily: 'var(--font-display)' }}>
                            {item.title.split(' ')[0]}
                        </div>
                        <div style={{ color: item.color, fontSize: '2rem', marginBottom: '16px' }}>{item.icon}</div>
                        <h3 style={{ color: item.color, fontSize: '1.5rem', marginBottom: '16px', fontFamily: 'var(--font-sub)' }}>{item.title}</h3>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '24px', minHeight: '80px' }}>{item.desc}</p>
                        <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.1)', color: '#fff', padding: '4px 12px', fontSize: '0.7rem', fontWeight: 'bold' }}>
                            {item.tag}
                        </div>
                    </motion.div>
                ))}
            </div>

            <div style={{ display: 'flex', gap: '24px' }}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                    style={{ flex: 2, height: '400px', borderRadius: '12px', position: 'relative', overflow: 'hidden' }}
                >
                    <motion.div style={{ position: 'absolute', inset: 0, originY: 0.5, background: 'url("/wall-of-fame/Devine Divas 2.jpeg") center/cover', scale: scaleParallax }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(transparent, #000 90%)' }}></div>
                    <div style={{ position: 'absolute', bottom: '30px', left: '30px' }}>
                        <h3 style={{ color: '#fff', fontSize: '2.5rem', margin: 0, fontFamily: 'var(--font-display)' }}>FUTURE READY</h3>
                        <div style={{ color: 'var(--pink)', fontWeight: 'bold', fontFamily: 'var(--font-sub)' }}>Blending Tradition with Tomorrow</div>
                    </div>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
                    style={{ flex: 1, height: '400px', borderRadius: '12px', background: 'radial-gradient(circle, var(--yellow), #ffa500)', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '32px' }}
                >
                    <div style={{ fontSize: '4rem', color: '#000', marginBottom: '16px' }}>⚡</div>
                    <h3 style={{ color: '#000', fontSize: '2rem', margin: 0, lineHeight: 1.1, fontFamily: 'var(--font-display)' }}>HIGH CONTRAST<br />CULTURE</h3>
                    <p style={{ color: '#000', fontWeight: 'bold', marginTop: '16px', fontSize: '0.9rem' }}>Where static meets dynamic in an explosion of creativity.</p>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default About;
