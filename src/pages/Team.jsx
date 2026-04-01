import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Linkedin, Mail, MapPin, Send, Zap } from 'lucide-react';

const TeamCard = ({ tag, role, name, desc, color, btnColor = 'var(--pink)', img, linkedin, isMobile }) => (
    <motion.div whileHover={{ y: -10 }}
        style={{ border: `1px solid ${color}`, background: 'rgba(255,255,255,0.02)', backdropFilter: 'blur(10px)', borderRadius: '24px', overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column' }}>
        <div style={{ height: isMobile ? '350px' : '450px', position: 'relative', overflow: 'hidden', background: 'var(--bg-darker)' }}>
            <img src={img || "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&q=80"}
                style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center', filter: 'grayscale(10%) contrast(1.1)' }} alt={name} />
            <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(transparent, ${color}22)` }} />
            <div style={{ position: 'absolute', top: '20px', left: '20px', background: color, color: '#000', padding: '4px 12px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 900 }}>{tag}</div>
        </div>
        <div style={{ padding: '30px', flex: 1, display: 'flex', flexDirection: 'column' }}>
            <div style={{ color, fontSize: '0.75rem', fontWeight: 900, letterSpacing: '2px', marginBottom: '10px' }}>{role}</div>
            <h3 style={{ color: '#fff', fontSize: '1.8rem', fontWeight: 900, marginBottom: '15px', lineHeight: 1.1 }}>{name}</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '25px', flex: 1 }}>{desc}</p>
            <button onClick={() => linkedin && linkedin !== '#' ? window.open(linkedin, '_blank') : null}
                style={{ background: btnColor, color: '#000', width: '100%', padding: '16px', fontSize: '1rem', fontWeight: 900, borderRadius: '8px', border: 'none', cursor: 'pointer', transition: '0.3s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                CONNECT <Linkedin size={18} />
            </button>
        </div>
    </motion.div>
);

const SmallCard = ({ name, role, color, textCol, img, linkedin, isMobile }) => (
    <motion.div whileHover={{ y: -8 }}
        style={{ border: `1px solid ${color}`, borderRadius: '24px', padding: '20px', background: 'rgba(255,255,255,0.01)', display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div style={{ height: isMobile ? '300px' : '350px', background: 'var(--bg-darker)', borderRadius: '16px', marginBottom: '20px', overflow: 'hidden' }}>
            <img src={img} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} alt={name} />
        </div>
        <div style={{ color: textCol, fontSize: '0.7rem', fontWeight: 900, letterSpacing: '1px', marginBottom: '10px' }}>{role}</div>
        <h3 style={{ color: '#fff', fontSize: '1.4rem', fontWeight: 900, marginBottom: '20px', flex: 1 }}>{name}</h3>
        <button onClick={() => linkedin && linkedin !== '#' ? window.open(linkedin, '_blank') : null}
            style={{ background: 'rgba(255,255,255,0.05)', color: '#fff', width: '100%', padding: '12px', fontSize: '0.8rem', fontWeight: 900, borderRadius: '6px', border: `1px solid ${color}`, cursor: 'pointer' }}>
            VIEW PROFILE
        </button>
    </motion.div>
);

const Team = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
    const yParallax = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 1024);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const architects = [
        { tag: "01", role: "Patron-In-Chief", name: "PROF. MANI KANT PASWAN (Director SLIET)", color: "var(--pink)", desc: "Lead mastermind directing the overall vision and academic alignment of Madhuram'26.", img: "/team/1.png", linkedin: "https://www.linkedin.com/in/mani-kant-paswan-3359b314a/" },
        { tag: "02", role: "Patron", name: "PROF. V.K. KUKREJA (Dean SW)", color: "var(--cyan)", desc: "Strategic lead ensuring seamless execution of cross-departmental operations.", img: "/team/2.png", linkedin: "https://www.linkedin.com/in/vijay-kukreja-7a001120/" },
        { tag: "03", role: "Chairman", name: "PROF. INDRAJ  (Prof. ME)", color: "var(--yellow)", desc: "Scaling the logistical networks and core operational engine of the festival.", img: "/team/3.png", linkedin: "https://www.linkedin.com/in/indraj-singh-3b88831a3/" },
        { tag: "04", role: "Vice-Chairman", name: "ER. ANSHUKA BANSAL (AsP EIE)", color: "#00ff88", desc: "Curator of aesthetics and cultural programming dictating the soul of the event.", img: "/team/4.png", linkedin: "https://sliet.ac.in/people/anshuka/" },
        { tag: "05", role: "Vice-Chairman", name: "DR. MOHD. MAJID (AsP ME)", color: "var(--pink)", desc: "Driving innovation and oversight of specialized social frameworks.", img: "/team/5.jpeg", linkedin: "#" }
    ];

    const coreTeam = [
        { name: "Anmol Singh", img: "/team/Anmol Singh.jpeg", role: "CORE MEMBER", linkedin: "https://www.linkedin.com/in/anmol-mehrok-266667258" },
        { name: "Anshuli Jha", img: "/team/Anshuli Jha.jpeg", role: "CORE MEMBER", linkedin: "https://www.linkedin.com/in/anshuli-jha-1a5160271/" },
        { name: "Gaurav Rai", img: "/team/Gaurav Rai.jpeg", role: "CORE MEMBER", linkedin: "#" },
        { name: "Gaurav Kumar", img: "/team/Gaurav Kumar.jpeg", role: "CORE MEMBER", linkedin: "https://www.linkedin.com/in/gaurav-kumar-882476226" },
        { name: "Kaushal Kumar", img: "/team/Kaushal Kumar.jpeg", role: "CORE MEMBER", linkedin: "https://www.linkedin.com/in/kaushal-kumar-10904b227" },
        { name: "Naman Sinha", img: "/team/Naman Sinha.jpeg", role: "CORE MEMBER", linkedin: "https://www.linkedin.com/in/naman-kumar-sinha-7856893952" },
        { name: "Satyam Kumar", img: "/team/Satyam Kumar.jpeg", role: "CORE MEMBER", linkedin: "#" },
        { name: "Shakshi Singh", img: "/team/Shakshi Singh.jpeg", role: "CORE MEMBER", linkedin: "https://www.linkedin.com/in/shakshi-singh-596053227" },
        { name: "Shubham Singh", img: "/team/Shubham Singh.jpeg", role: "CORE MEMBER", linkedin: "https://www.linkedin.com/in/shubhammech01/" },
        { name: "Sundram Shandilya", img: "/team/Sundaram Shandilya.jpeg", role: "CORE MEMBER", linkedin: "https://www.linkedin.com/in/sundram-shandilya-380b7b364" }
    ];

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}
            style={{ padding: isMobile ? '20px' : '60px 10vw', overflowX: 'hidden' }} ref={containerRef}
        >
            {/* HERO */}
            <motion.div style={{ textAlign: 'center', marginBottom: isMobile ? '60px' : '100px', y: yParallax }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', color: 'var(--cyan)', border: '1px solid var(--cyan)', padding: '8px 24px', borderRadius: '50px', fontSize: '0.85rem', fontWeight: 900, letterSpacing: '2px', marginBottom: '30px' }}>
                    <Zap size={16} fill="var(--cyan)" /> SYSTEM ONLINE
                </div>
                <h1 style={{ color: '#fff', fontSize: isMobile ? '3.5rem' : '7rem', fontWeight: 900, lineHeight: 1, fontFamily: 'var(--font-logo)', textShadow: '0 0 30px rgba(0,240,255,0.4)' }}>
                    ARCHITECTS
                </h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '750px', margin: '30px auto 0', lineHeight: 1.6 }}>
                    The visionary force orchestrating the revival. Engineering the future through innovation and artistic synergy.
                </p>
            </motion.div>

            {/* ARTICHTECTS GRID */}
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '40px', marginBottom: '120px' }}>
                {architects.map((arc, i) => (
                    <div key={i} style={{ flex: isMobile ? '1 1 100%' : '1 1 400px', maxWidth: isMobile ? '100%' : '450px' }}>
                        <TeamCard {...arc} isMobile={isMobile} />
                    </div>
                ))}
            </div>

            {/* BUILDERS */}
            <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                <h2 style={{ fontSize: isMobile ? '2.5rem' : '4.5rem', fontWeight: 900, color: '#fff' }}>THE <span style={{ color: 'var(--pink)' }}>BUILDERS</span></h2>
                <p style={{ color: 'var(--cyan)', fontWeight: 900, letterSpacing: '4px', marginTop: '10px' }}>EXECUTING THE CORE SEQUENCE</p>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '30px', marginBottom: '120px' }}>
                {coreTeam.map((member, i) => (
                    <div key={i} style={{ flex: isMobile ? '1 1 100%' : '1 1 280px', maxWidth: isMobile ? '100%' : '350px' }}>
                        <SmallCard {...member} color={i % 2 === 0 ? "var(--pink)" : "var(--cyan)"} textCol={i % 2 === 0 ? "var(--pink)" : "var(--cyan)"} isMobile={isMobile} />
                    </div>
                ))}
            </div>

            {/* CREATIVES */}
            <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                <h2 style={{ fontSize: isMobile ? '2.5rem' : '4.5rem', fontWeight: 900, color: '#fff' }}>THE <span style={{ color: 'var(--yellow)' }}>CREATIVES</span></h2>
                <p style={{ color: 'var(--yellow)', fontWeight: 900, letterSpacing: '4px', marginTop: '10px' }}>DESIGNING THE IMMERSION</p>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', maxWidth: '800px', margin: '0 auto 150px', gap: '30px' }}>
                <div style={{ flex: isMobile ? '1 1 100%' : '1 1 250px', maxWidth: isMobile ? '100%' : '400px' }}>
                    <SmallCard name="Tanush Singla" role="CREATIVE LEAD" color="var(--yellow)" textCol="var(--yellow)" img="/team/Tanush Singla.jpeg" linkedin="https://www.linkedin.com/in/tanush-singla-330a27281/" isMobile={isMobile} />
                </div>
                <div style={{ flex: isMobile ? '1 1 100%' : '1 1 250px', maxWidth: isMobile ? '100%' : '400px' }}>
                    <SmallCard name="Namit Mehta" role="DESIGN HEAD" color="var(--pink)" textCol="var(--pink)" img="/team/Namit Mehta.jpeg" linkedin="https://www.linkedin.com/in/namit-mehta-374244287/" isMobile={isMobile} />
                </div>
            </div>

            {/* CONTACT SECTION */}
            <motion.section initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '40px', padding: isMobile ? '40px 20px' : '80px', display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '60px' }}>
                <div style={{ flex: 1.5 }}>
                    <h2 style={{ color: '#fff', fontSize: isMobile ? '2.5rem' : '4rem', fontWeight: 900, lineHeight: 1.1, marginBottom: '20px' }}>ESTABLISH <br /><span style={{ color: 'var(--pink)' }}>CONNECTION</span></h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', marginBottom: '50px' }}>Relay your transmission directly to the neural core.</p>

                    <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '20px' }}>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: '0.65rem', fontWeight: 900, color: 'var(--pink)', letterSpacing: '2px', marginBottom: '8px' }}>IDENTIFIER</div>
                                <input type="text" placeholder="NAME / CODENAME" style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: isMobile ? '16px' : '20px', borderRadius: '12px', color: '#fff', outline: 'none', fontSize: '0.9rem' }} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: '0.65rem', fontWeight: 900, color: 'var(--pink)', letterSpacing: '2px', marginBottom: '8px' }}>COMM_CHANNEL</div>
                                <input type="email" placeholder="EMAIL_ID" style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: isMobile ? '16px' : '20px', borderRadius: '12px', color: '#fff', outline: 'none', fontSize: '0.9rem' }} />
                            </div>
                        </div>
                        <div>
                            <div style={{ fontSize: '0.65rem', fontWeight: 900, color: 'var(--pink)', letterSpacing: '2px', marginBottom: '8px' }}>TRANSMISSION_DATA</div>
                            <textarea placeholder="ENTER_MESSAGE..." rows="5" style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: isMobile ? '16px' : '20px', borderRadius: '12px', color: '#fff', outline: 'none', resize: 'none', fontSize: '0.9rem' }} />
                        </div>
                        <button className="btn-primary" style={{ padding: isMobile ? '16px' : '20px', fontSize: isMobile ? '1rem' : '1.1rem', letterSpacing: '4px', width: '100%' }}>
                            EXECUTE TRANSMISSION <Send size={20} style={{ marginLeft: '10px' }} />
                        </button>
                    </form>
                </div>

                <div style={{
                    flex: 1,
                    background: 'rgba(255,255,255,0.03)',
                    borderRadius: '32px',
                    padding: isMobile ? '30px' : '40px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: isMobile ? '30px' : '40px',
                    border: '1px solid rgba(255,255,255,0.02)'
                }}>
                    <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                        <div style={{ background: 'rgba(247,0,255,0.1)', padding: '12px', borderRadius: '12px' }}>
                            <MapPin color="var(--pink)" size={24} />
                        </div>
                        <div>
                            <div style={{ color: 'var(--pink)', fontWeight: 900, fontSize: '0.7rem', letterSpacing: '2px', marginBottom: '4px' }}>BASE OPS</div>
                            <div style={{ color: '#fff', fontSize: '1rem', fontWeight: 600, lineHeight: 1.4 }}>SLIET Longowal,<br />Punjab, India</div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                        <div style={{ background: 'rgba(247,0,255,0.1)', padding: '12px', borderRadius: '12px' }}>
                            <Mail color="var(--pink)" size={24} />
                        </div>
                        <div>
                            <div style={{ color: 'var(--pink)', fontWeight: 900, fontSize: '0.7rem', letterSpacing: '2px', marginBottom: '4px' }}>RELAY PATH</div>
                            <div style={{ color: '#fff', fontSize: '1.12rem', fontWeight: 600 }}>madhuram@sliet.ac.in</div>
                        </div>
                    </div>
                    <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', marginTop: isMobile ? '10px' : '20px', paddingTop: '30px', textAlign: 'center' }}>
                        <a href="https://instagram.com/madhuramsliet" style={{ color: '#fff', textDecoration: 'none', fontSize: '1.4rem', fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px', color: '#ebff00' }}>
                            <Zap fill="#ebff00" size={24} /> @madhuramsliet
                        </a>
                    </div>
                </div>
            </motion.section>
        </motion.div>
    );
};

export default Team;
