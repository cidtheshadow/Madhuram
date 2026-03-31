import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Download } from 'lucide-react';

const Sponsors = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
    const yParallaxFast = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 1024);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const pastSponsors = [
        { name: "RRP", logo: "/idk/RAM PRATHAP 1.png", url: "https://www.rrp.co.in" },
        { name: "Beyond Snacks", logo: "/idk/beyound snaks 1.jpg", url: "https://beyondsnack.in" },
        { name: "Baskin Robbins", logo: "/idk/baskin.png", url: "https://baskinrobbinsindia.com" },
        { name: "Care", logo: "/idk/care.png", url: "https://www.careinsurance.com" },
        { name: "Coca-Cola", logo: "/idk/coco cola logo 1.jpg", url: "https://www.coca-colacompany.com" },
        { name: "Costa Coffee", logo: "/idk/cost.png", url: "https://cosmetify.in/" },
        { name: "Domino's", logo: "/idk/dominos.jpg", url: "https://www.dominos.co.in" },
        { name: "Garnier", logo: "/idk/Garnier-Logo-Vector 1.png", url: "https://www.garnier.in" },
        { name: "HDFC Bank", logo: "/idk/hdfc logo 1.jpg", url: "https://www.hdfcbank.com" },
        { name: "Oppo", logo: "/idk/oppo 1.jpg", url: "https://www.oppo.com" },
        { name: "Red Bull", logo: "/idk/red bull.jpg", url: "https://www.redbull.com" },
        { name: "Sponsor 11", logo: "/idk/download (8) 1.png", url: "#" },
    ];

    const currentSponsors = [
        { name: "Amy Soul", logo: "/sponsors/Amy Soul.png", url: "https://amysoul.com" },
        { name: "Flake", logo: "/sponsors/Flake - Beverage Partner.png", url: "https://www.flakebeverage.com/" },
        { name: "Gobind Greens", logo: "/sponsors/Gobind Greens - Housing Partner.png", url: "#" },
        { name: "Verka", logo: "/sponsors/Verka - Beverage Partner.png", url: "https://verka.coop" },
    ];

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}
            style={{ padding: isMobile ? '20px' : '60px 10vw', textAlign: 'center', overflowX: 'hidden' }} ref={containerRef}
        >
            {/* HERO */}
            <motion.div style={{ margin: isMobile ? '40px 0' : '80px 0 120px', y: yParallaxFast, textAlign: 'center' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--pink)', border: '1px solid var(--pink)', padding: '8px 24px', borderRadius: '50px', fontSize: '0.8rem', fontWeight: 900, letterSpacing: '4px', marginBottom: '30px' }}>
                    ⚡ POWER THE PULSE
                </div>
                <h1 style={{ margin: 0, fontSize: isMobile ? '3.5rem' : '7.5rem', color: '#fff', lineHeight: 1, fontFamily: 'var(--font-logo)', textShadow: '0 0 30px rgba(247,0,255,0.4)' }}>
                    SPONSORS
                </h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '650px', margin: '30px auto 0', lineHeight: 1.6 }}>
                    Elevate your brand at the biggest vibe-fest of the year. Choose your tier and dominate the digital & physical space.
                </p>
            </motion.div>

            {/* CURRENT SPONSORS GRID */}
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} style={{ marginBottom: '60px' }}>
                <h2 style={{ color: '#ebff00', fontSize: isMobile ? '2rem' : '3.5rem', fontWeight: 900, marginBottom: '10px' }}>PARTNERS</h2>
                <p style={{ color: 'var(--pink)', fontWeight: 800, letterSpacing: '2px' }}>POWERING MADHURAM '26</p>
            </motion.div>

            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '100px' }}>
                {currentSponsors.map((sponsor, i) => (
                    <motion.a key={i} href={sponsor.url || '#'} target={sponsor.url && sponsor.url !== '#' ? "_blank" : "_self"} rel="noopener noreferrer"
                        whileHover={{ y: -5, borderColor: '#ebff00', boxShadow: '0 0 20px rgba(235, 255, 0, 0.2)' }}
                        style={{ height: '140px', border: '1px solid rgba(235, 255, 0, 0.3)', background: 'rgba(235, 255, 0, 0.05)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: '0.3s', padding: '20px', textDecoration: 'none' }}
                    >
                        <img src={sponsor.logo} alt={sponsor.name} style={{ maxWidth: '85%', maxHeight: '85%', objectFit: 'contain', transition: '0.4s' }}
                            onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }} />
                        <span style={{ display: 'none', fontWeight: 900, color: '#fff' }}>{sponsor.name}</span>
                    </motion.a>
                ))}
            </div>

            {/* PAST PATRONS GRID */}
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} style={{ marginBottom: '60px' }}>
                <h2 style={{ color: '#fff', fontSize: isMobile ? '1.5rem' : '2.5rem', fontWeight: 900, marginBottom: '10px' }}>HALL OF LEGENDS</h2>
                <p style={{ color: 'var(--text-muted)', fontWeight: 800, letterSpacing: '2px' }}>PAST PATRONS OF EXCELLENCE</p>
            </motion.div>

            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '15px', marginBottom: '100px', opacity: 0.6 }}>
                {pastSponsors.map((sponsor, i) => (
                    <motion.a key={i} href={sponsor.url || '#'} target={sponsor.url && sponsor.url !== '#' ? "_blank" : "_self"} rel="noopener noreferrer"
                        whileHover={{ y: -5, opacity: 1, borderColor: 'var(--pink)' }}
                        style={{ width: isMobile ? 'calc(33.33% - 10px)' : '160px', height: '100px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: '0.3s', padding: '15px', textDecoration: 'none' }}
                    >
                        <img src={sponsor.logo} alt={sponsor.name} style={{ maxWidth: '85%', maxHeight: '85%', objectFit: 'contain', transition: '0.4s' }}
                            onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }} />
                        <span style={{ display: 'none', fontWeight: 900, color: '#fff', fontSize: '0.8rem' }}>{sponsor.name}</span>
                    </motion.a>
                ))}
            </div>

            {/* CTA SECTION */}
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                style={{ background: 'rgba(255,0,255,0.05)', border: '1px solid rgba(255,0,255,0.1)', borderRadius: '30px', padding: isMobile ? '40px 20px' : '80px', textAlign: 'left', position: 'relative', overflow: 'hidden' }}>
                <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '60px', position: 'relative', zIndex: 2 }}>
                    <div style={{ flex: 1.5 }}>
                        <h2 style={{ color: '#fff', fontSize: isMobile ? '2.5rem' : '4rem', fontWeight: 900, lineHeight: 1.1, marginBottom: '24px' }}>READY TO <br /><span style={{ color: 'var(--pink)' }}>BOOST THE MOOD?</span></h2>
                        <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', marginBottom: '40px', maxWidth: '500px' }}>Download our sponsorship prospectus for detailed demographics and engagement metrics.</p>
                        <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '15px' }}>
                            <a href="/MADM2026.pdf" download style={{ textDecoration: 'none' }} className="btn-primary">DOWNLOAD BROCHURE <Download size={20} style={{ marginLeft: '10px' }} /></a>
                            <a href="mailto:madhuram@sliet.ac.in" style={{ textDecoration: 'none' }} className="btn-outline">TALK TO US <Mail size={20} style={{ marginLeft: '10px' }} /></a>
                        </div>
                    </div>
                    <div style={{ flex: 1, borderLeft: isMobile ? 'none' : '1px solid rgba(255,255,255,0.1)', paddingLeft: isMobile ? '0' : '40px', borderTop: isMobile ? '1px solid rgba(255,255,255,0.1)' : 'none', paddingTop: isMobile ? '40px' : '0' }}>
                        <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
                            <Phone color="var(--pink)" size={28} />
                            <div>
                                <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 900, letterSpacing: '1px' }}>HOTLINE</div>
                                <div style={{ color: '#fff', marginTop: '5px' }}>Naman: +91 7856893952<br />Shubham: +91 9771174465</div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
                            <Mail color="var(--pink)" size={28} />
                            <div>
                                <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 900, letterSpacing: '1px' }}>EMAIL TRANSIT</div>
                                <div style={{ color: '#fff', marginTop: '5px' }}>madhuram@sliet.ac.in</div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '20px' }}>
                            <MapPin color="var(--pink)" size={28} />
                            <div>
                                <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 900, letterSpacing: '1px' }}>HEADQUARTERS</div>
                                <div style={{ color: '#fff', marginTop: '5px' }}>SLIET, Longowal, Punjab</div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* MARQUEE */}
            {!isMobile && (
                <div style={{
                    marginTop: '100px',
                    width: '100vw',
                    position: 'relative',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: '#000',
                    borderTop: '1px solid rgba(252, 238, 10, 0.3)',
                    borderBottom: '1px solid rgba(252, 238, 10, 0.3)',
                    padding: '24px 0',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap'
                }}>
                    <motion.div animate={{ x: ["0%", "-50%"] }} transition={{ duration: 35, repeat: Infinity, ease: "linear" }} style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
                        {[...Array(6)].map((_, i) => (
                            <span key={i} style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
                                <span style={{ display: 'inline-block', color: 'var(--yellow)', fontWeight: 900, fontSize: '1.1rem', letterSpacing: '4px', padding: '0 60px', whiteSpace: 'nowrap' }}>
                                    📞&nbsp;&nbsp;+91 7856893952
                                </span>
                                <span style={{ display: 'inline-block', color: 'var(--pink)', opacity: 0.5 }}>//</span>
                                <span style={{ display: 'inline-block', color: 'var(--yellow)', fontWeight: 900, fontSize: '1.1rem', letterSpacing: '4px', padding: '0 60px' }}>
                                    📧&nbsp;&nbsp;MADHURAM@SLIET.AC.IN
                                </span>
                                <span style={{ display: 'inline-block', color: 'var(--pink)', opacity: 0.5 }}>//</span>
                                <span style={{ display: 'inline-block', color: 'var(--yellow)', fontWeight: 900, fontSize: '1.1rem', letterSpacing: '4px', padding: '0 60px' }}>
                                    📍&nbsp;&nbsp;SLIET, PUNJAB
                                </span>
                                <span style={{ display: 'inline-block', color: 'var(--pink)', opacity: 0.5 }}>//</span>
                                <span style={{ display: 'inline-block', color: '#fff', fontWeight: 900, fontSize: '1.1rem', letterSpacing: '4px', padding: '0 60px' }}>
                                    MADHURAM '26 EXCLUSIVE
                                </span>
                                <span style={{ display: 'inline-block', color: 'var(--pink)', opacity: 0.5 }}>//</span>
                            </span>
                        ))}
                    </motion.div>
                </div>
            )}
        </motion.div>
    );
};

export default Sponsors;
