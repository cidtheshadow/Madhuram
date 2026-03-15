import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const Sponsors = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
    const yParallaxFast = useTransform(scrollYProgress, [0, 1], [0, -200]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            style={{ paddingBottom: '100px', textAlign: 'center' }}
            ref={containerRef}
        >
            <motion.div style={{ margin: '60px 0 100px', y: yParallaxFast }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--pink)', border: '1px solid var(--pink)', padding: '6px 20px', borderRadius: '30px', fontSize: '0.8rem', fontWeight: 'bold', letterSpacing: '2px', marginBottom: '24px', fontFamily: 'var(--font-sub)' }}>
                    <span>⚡</span> POWER THE PULSE
                </div>
                <h1 style={{ margin: 0, fontSize: '6rem', color: 'var(--pink)', textShadow: '0 0 20px var(--pink)', lineHeight: 1, fontFamily: 'var(--font-display)' }}>SPONSORS</h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '600px', margin: '24px auto 0' }}>
                    Level up your brand at the biggest vibe-fest of the year. Choose your tier and dominate the digital & physical space.
                </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                style={{ textAlign: 'center', marginBottom: '60px' }}
            >
                <h2 style={{ color: '#fff', fontSize: '2.5rem', marginBottom: '8px', fontFamily: 'var(--font-display)' }}>THE HALL OF FAME</h2>
                <div style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-sub)' }}>Legends who powered our previous editions</div>
            </motion.div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px', marginBottom: '80px' }}>
                {[
                    { name: "RRP", logo: "/idk/RAM PRATHAP 1.png" },
                    { name: "Beyond Snacks", logo: "/idk/beyound snaks 1.jpg" },
                    { name: "Baskin Robbins", logo: "/idk/baskin.png" },
                    { name: "Care", logo: "/idk/care.png" },
                    { name: "Coca-Cola", logo: "/idk/coco cola logo 1.jpg" },
                    { name: "Costa Coffee", logo: "/idk/cost.png" },
                    { name: "Domino's", logo: "/idk/dominos.jpg" },
                    { name: "Garnier", logo: "/idk/Garnier-Logo-Vector 1.png" },
                    { name: "HDFC Bank", logo: "/idk/hdfc logo 1.jpg" },
                    { name: "Oppo", logo: "/idk/oppo 1.jpg" },
                    { name: "Red Bull", logo: "/idk/red bull.jpg" },
                    { name: "Sponsor 11", logo: "/idk/download (8) 1.png" },
                ].map((sponsor, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ delay: (i % 4) * 0.1 }}
                        whileHover={{ scale: 1.05, borderColor: 'var(--pink)', boxShadow: '0 0 15px rgba(255,0,255,0.3)' }}
                        style={{
                            height: '120px',
                            border: '1px solid rgba(255,255,255,0.1)',
                            background: 'rgba(255,255,255,0.02)',
                            borderRadius: '12px',
                            position: 'relative',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'var(--text-muted)',
                            cursor: 'pointer',
                            overflow: 'hidden'
                        }}
                        title={sponsor.name}
                    >
                        <img
                            src={sponsor.logo}
                            alt={sponsor.name}
                            style={{ maxWidth: '70%', maxHeight: '70%', objectFit: 'contain', filter: 'grayscale(100%) brightness(200%) transition 0.3s' }}
                            onMouseOver={e => e.target.style.filter = 'none'}
                            onMouseOut={e => e.target.style.filter = 'grayscale(100%) brightness(200%)'}
                            onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }}
                        />
                        <span style={{ display: 'none', fontWeight: 'bold', fontFamily: 'var(--font-heading)', color: '#fff', fontSize: '1.2rem', textAlign: 'center', padding: '10px' }}>
                            {sponsor.name}
                        </span>
                    </motion.div>
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                style={{
                    background: 'rgba(255,0,255,0.05)',
                    border: '1px solid rgba(255,0,255,0.2)',
                    borderRadius: '16px',
                    padding: '60px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    position: 'relative',
                    overflow: 'hidden'
                }}
            >
                {/* Background icon watermark */}
                <motion.div
                    animate={{ rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                    style={{ position: 'absolute', right: '40px', top: '20px', fontSize: '12rem', color: 'rgba(255,0,255,0.05)', pointerEvents: 'none', lineHeight: 1 }}
                >
                    🤝
                </motion.div>

                <div style={{ textAlign: 'left', flex: 1, zIndex: 1 }}>
                    <h2 style={{ color: '#fff', fontSize: '2.5rem', marginBottom: '16px' }}>READY TO BOOST THE MOOD?</h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '500px', marginBottom: '40px' }}>
                        Download our complete sponsorship prospectus for detailed demographics and engagement metrics.
                    </p>
                    <div style={{ display: 'flex', gap: '16px' }}>
                        <a href="/MADM2026.pdf" download="MADM2026.pdf" className="btn-primary" style={{ padding: '16px 32px', textDecoration: 'none' }}>DOWNLOAD BROCHURE</a>
                        <a href="mailto:madhuram@sliet.ac.in" className="btn-outline" style={{ padding: '16px 32px', textDecoration: 'none' }}>TALK TO US</a>
                    </div>
                </div>

                <div style={{ flex: 1, borderLeft: '1px solid rgba(255,255,255,0.1)', paddingLeft: '40px', textAlign: 'left' }}>
                    <div style={{ marginBottom: '24px', display: 'flex', gap: '16px' }}>
                        <div style={{ color: 'var(--pink)', fontSize: '1.5rem' }}>✉️</div>
                        <div>
                            <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', letterSpacing: '1px' }}>INQUIRIES</div>
                            <div style={{ color: '#fff', fontSize: '1.1rem' }}>madhuram@sliet.ac.in</div>
                        </div>
                    </div>
                    <div style={{ marginBottom: '24px', display: 'flex', gap: '16px' }}>
                        <div style={{ color: 'var(--pink)', fontSize: '1.5rem' }}>📞</div>
                        <div>
                            <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', letterSpacing: '1px' }}>PHONE</div>
                            <div style={{ color: '#fff', fontSize: '0.9rem', lineHeight: '1.4' }}>Naman Sinha: +91 7856893952<br />Shubham Singh: +91 9771174465</div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '16px' }}>
                        <div style={{ color: 'var(--pink)', fontSize: '1.5rem' }}>📍</div>
                        <div>
                            <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', letterSpacing: '1px' }}>OFFICE</div>
                            <div style={{ color: '#fff', fontSize: '1.1rem' }}>Longowal, Punjab</div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Infinite Contact Marquee Footer */}
            <div style={{ marginTop: '100px', width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: 'var(--yellow)', borderTop: '2px solid var(--pink)', borderBottom: '2px solid var(--pink)', padding: '16px 0', overflow: 'hidden', position: 'relative' }}>
                <motion.div
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    style={{ display: 'flex', whiteSpace: 'nowrap', width: '200%' }}
                >
                    {[...Array(2)].map((_, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '40px', paddingRight: '40px', width: '50%', justifyContent: 'space-around', fontFamily: 'var(--font-heading)', fontSize: '1.1rem', color: '#000', fontWeight: 'bold' }}>
                            <span>📞 Naman: +91 7856893952 / Shubham: +91 9771174465</span>
                            <span style={{ color: 'var(--pink)' }}>//</span>
                            <span>✉️  madhuram@sliet.ac.in </span>
                            <span style={{ color: 'var(--pink)' }}>//</span>
                            <span>📍 SLIET, PUNJAB</span>
                            <span style={{ color: 'var(--pink)' }}>//</span>
                            <span>MADHURAM '26 ⚡</span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </motion.div>
    );
};

export default Sponsors;
