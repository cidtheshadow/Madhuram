import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const TeamCard = ({ tag, role, name, desc, color, btnColor = 'var(--pink)', img, linkedin }) => (
    <motion.div
        whileHover={{ y: -5, boxShadow: `0 10px 30px ${color}` }}
        style={{ border: `1px solid ${color}`, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(10px)', borderRadius: '16px', padding: '2px', position: 'relative', overflow: 'hidden' }}
    >
        <div style={{ padding: '24px' }}>
            <div style={{ color, fontSize: '0.8rem', fontWeight: 'bold', letterSpacing: '2px', marginBottom: '12px', fontFamily: 'var(--font-sub)' }}>{tag} // {role}</div>
            <h3 style={{ color: '#fff', fontSize: '1.6rem', marginBottom: '16px', fontFamily: 'var(--font-display)', textShadow: '2px 2px 0 #000' }}>{name}</h3>
            <div style={{ height: '400px', background: 'rgba(0,0,0,0.8)', borderRadius: '12px', marginBottom: '20px', overflow: 'hidden', border: `1px solid rgba(255,255,255,0.1)` }}>
                <img src={img || "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&q=80"} style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center', filter: 'grayscale(10%) sepia(10%)' }} alt={name} />
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '24px', minHeight: '60px', lineHeight: '1.6' }}>{desc}</p>
            <button onClick={() => linkedin ? window.open(linkedin, '_blank') : alert(`Accessing restricted records for ${name}...`)} style={{ background: btnColor, color: '#000', width: '100%', padding: '16px', fontSize: '1rem', fontWeight: 900, borderRadius: '6px', cursor: 'pointer', transition: 'all 0.3s' }}>
                {linkedin ? 'ACCESS RECORDS 🔗' : 'INITIALIZE SECURE BIO 🗂️'}
            </button>
        </div>
    </motion.div>
);

const SmallCard = ({ name, role, color, textCol, img, linkedin }) => (
    <motion.div whileHover={{ scale: 1.03, boxShadow: `0 0 25px ${color}` }} style={{ border: `1px solid ${color}`, borderRadius: '16px', padding: '16px', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(10px)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ height: '320px', background: 'var(--bg-darker)', borderRadius: '12px', marginBottom: '16px', overflow: 'hidden', border: `1px solid rgba(255,255,255,0.1)` }}>
            <img src={img || "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&q=80"} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} alt={name} />
        </div>
        <div style={{ color: textCol, fontSize: '0.8rem', fontWeight: 'bold', letterSpacing: '2px', marginBottom: '8px', fontFamily: 'var(--font-sub)' }}>{role}</div>
        <div style={{ color: '#fff', fontSize: '1.2rem', fontWeight: 'bold', fontFamily: 'var(--font-display)', flex: 1, marginBottom: '20px' }}>{name}</div>
        <button onClick={() => linkedin && linkedin !== '#' ? window.open(linkedin, '_blank') : alert('System Link Unavailable')} style={{ background: textCol, color: '#000', width: '100%', padding: '12px', fontSize: '0.9rem', fontWeight: 900, marginTop: 'auto', borderRadius: '6px', cursor: 'pointer', transition: 'transform 0.2s', border: 'none' }} onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'} onMouseOut={(e) => e.target.style.transform = 'scale(1)'}>
            {linkedin && linkedin !== '#' ? 'CONNECT LINKEDIN 🔗' : 'ACCESS NODES 🗂️'}
        </button>
    </motion.div>
);

const Team = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
    const yParallaxFast = useTransform(scrollYProgress, [0, 1], [0, -200]);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.5 }}
            style={{ paddingBottom: '100px' }}
            ref={containerRef}
        >
            <motion.div style={{ y: yParallaxFast, textAlign: 'center', margin: '40px 0 80px' }}>
                <div style={{ display: 'inline-block', background: 'rgba(255,0,255,0.1)', border: '1px solid var(--pink)', padding: '8px 24px', borderRadius: '30px', color: 'var(--pink)', fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '32px', fontFamily: 'var(--font-sub)', letterSpacing: '2px' }}>
                    <span style={{ display: 'inline-block', width: '10px', height: '10px', background: 'var(--pink)', borderRadius: '50%', marginRight: '12px', boxShadow: '0 0 15px var(--pink)', animation: 'pulse 1.5s infinite' }}></span>
                    SYSTEM ONLINE
                </div>

                <h1 style={{ color: '#fff', fontSize: '4.5rem', margin: '0 0 24px', lineHeight: 1, fontFamily: 'var(--font-display)', textShadow: '0 0 30px rgba(255,0,255,0.4)' }}>THE ARCHITECTS</h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.3rem', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>
                    The visionary force orchestrating the synthwave revival of Madhuram '26. Engineering the future through pure neon and sound.
                </p>
                <style>{`
                    @keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.4; } 100% { opacity: 1; } }
                `}</style>
            </motion.div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '40px', maxWidth: '1200px', margin: '0 auto 100px' }}>
                <TeamCard
                    tag="01" role="Patron-In-Chief" name="DR. MANI KANT PASWAN" color="var(--pink)" btnColor="var(--pink)"
                    desc="Pioneer of structural aesthetics and the lead mastermind directing the overall vision of Madhuram'26."
                    img="/team/1.png"
                    linkedin="https://www.linkedin.com/in/mani-kant-paswan-3359b314a/"
                />
                <TeamCard
                    tag="02" role="Patron" name="PROF. V.K. KUKREJA" color="var(--cyan)" btnColor="var(--cyan)"
                    desc="Strategic synchronization lead ensuring seamless execution of cross-departmental operations and relays."
                    img="/team/2.png"
                    linkedin="https://www.linkedin.com/in/vijay-kukreja-7a001120/?originalSubdomain=in"
                />
                <TeamCard
                    tag="03" role="Chairman" name="PROF. INDRAJ SINGH" color="var(--yellow)" btnColor="var(--yellow)"
                    desc="Scaling the logistics infrastructure and mapping out the logistical networks driving the core engine."
                    img="/team/3.png"
                    linkedin="https://www.linkedin.com/in/indraj-singh-3b88831a3/"
                />
                <TeamCard
                    tag="04" role="Vice-Chairman" name="ER. ANSHUKA BANSAL" color="#00ff88" btnColor="#00ff88"
                    desc="Master of aesthetics and cultural programming dictating the atmosphere and soul of the event."
                    img="/team/4.png"
                    linkedin="https://sliet.ac.in/people/anshuka/"
                />
                <TeamCard
                    tag="05" role="Vice-Chairman" name="PROF. MOHD. MAJID" color="var(--pink)" btnColor="var(--pink)"
                    desc="Driving innovation and overseeing the execution of specialized technical frameworks."
                    img="/team/5.jpeg"
                    linkedin="#"
                />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                style={{ textAlign: 'center', marginBottom: '60px', marginTop: '120px' }}
            >
                <div style={{ width: '2px', height: '60px', background: 'linear-gradient(to bottom, transparent, var(--pink))', margin: '0 auto 40px' }} />
                <h2 style={{ fontSize: '4rem', color: '#fff', fontFamily: 'var(--font-display)', textShadow: '0 0 20px rgba(0,240,255,0.4)', margin: 0 }}>THE BUILDERS</h2>
                <div style={{ color: 'var(--cyan)', marginTop: '16px', letterSpacing: '4px', fontWeight: 'bold' }}>Executing the codebase of the festival</div>
            </motion.div>

            {/* Changed from 5 columns to auto-fit with minmax(280px) so the pictures are larger */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px', marginBottom: '120px' }}>
                {[
                    { name: "Anmol Singh", img: "/team/Anmol Singh.jpeg", role: "CORE MEMBER", linkedin: "https://www.linkedin.com/in/anmol-mehrok-266667258?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" },
                    { name: "Anshuli Jha", img: "/team/Anshuli Jha.jpeg", role: "CORE MEMBER", linkedin: "https://www.linkedin.com/in/anshuli-jha-1a5160271/" },
                    { name: "Gaurav Rai", img: "/team/Gaurav Rai.jpeg", role: "CORE MEMBER", linkedin: "#" },
                    { name: "Gaurav Kumar", img: "/team/Gaurav Kumar.jpeg", role: "CORE MEMBER", linkedin: "https://www.linkedin.com/in/gaurav-kumar-882476226?utm_source=share_via&utm_content=profile&utm_medium=member_ios" },
                    { name: "Kaushal Kumar", img: "/team/Kaushal Kumar.jpeg", role: "CORE MEMBER", linkedin: "https://www.linkedin.com/in/kaushal-kumar-10904b227?utm_source=share_via&utm_content=profile&utm_medium=member_ios" },
                    { name: "Naman Sinha", img: "/team/Naman Sinha.jpeg", role: "CORE MEMBER", linkedin: "https://www.linkedin.com/in/naman-kumar-sinha-7856893952-08-writer?utm_source=share_via&utm_content=profile&utm_medium=member_ios" },
                    { name: "Satyam Kumar", img: "/team/Satyam Kumar.jpeg", role: "CORE MEMBER", linkedin: "#" },
                    { name: "Shakshi Singh", img: "/team/Shakshi Singh.jpeg", role: "CORE MEMBER", linkedin: "https://www.linkedin.com/in/shakshi-singh-596053227?utm_source=share_via&utm_content=profile&utm_medium=member_ios" },
                    { name: "Shubham Singh", img: "/team/Shubham Singh.jpeg", role: "CORE MEMBER", linkedin: "https://www.linkedin.com/in/shubhammech01/" },
                    { name: "Sundram Shandilya", img: "/team/Sundaram Shandilya.jpeg", role: "CORE MEMBER", linkedin: "https://www.linkedin.com/in/sundram-shandilya-380b7b364?utm_source=share_via&utm_content=profile&utm_medium=member_android" }
                ].map((member, i) => (
                    <SmallCard
                        key={i}
                        name={member.name}
                        role={member.role}
                        color={i % 2 === 0 ? "var(--pink)" : "var(--cyan)"}
                        textCol={i % 2 === 0 ? "var(--pink)" : "var(--cyan)"}
                        img={member.img}
                        linkedin={member.linkedin}
                    />
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                style={{ textAlign: 'center', marginBottom: '60px' }}
            >
                <div style={{ width: '2px', height: '60px', background: 'linear-gradient(to bottom, transparent, var(--yellow))', margin: '0 auto 40px' }} />
                <h2 style={{ fontSize: '4rem', color: '#fff', fontFamily: 'var(--font-display)', textShadow: '0 0 20px rgba(255,255,0,0.4)', margin: 0 }}>THE CREATIVES</h2>
                <div style={{ color: 'var(--yellow)', marginTop: '16px', letterSpacing: '4px', fontWeight: 'bold' }}>The masters of visual and digital arts</div>
            </motion.div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px', maxWidth: '700px', margin: '0 auto 120px' }}>
                <SmallCard
                    name="Tanush Singla"
                    role="CREATIVE LEAD"
                    color="var(--yellow)"
                    textCol="var(--yellow)"
                    img="/team/Tanush Singla.jpeg"
                    linkedin="https://www.linkedin.com/in/tanush-singla-330a27281/"
                />
                <SmallCard
                    name="Namit Mehta"
                    role="DESIGN HEAD"
                    color="var(--pink)"
                    textCol="var(--pink)"
                    img="/team/Namit Mehta.jpeg"
                    linkedin="https://www.linkedin.com/in/namit-mehta-374244287/"
                />
            </div>

            {/* TRANSMISSION RELAY */}
            <motion.div
                initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '80px', display: 'flex', gap: '60px', flexWrap: 'wrap', maxWidth: '1000px', margin: '0 auto', paddingLeft: '20px', paddingRight: '20px' }}
            >
                <div style={{ flex: '1 1 500px' }}>
                    <h2 style={{ color: '#fff', fontSize: '3rem', marginBottom: '12px', fontFamily: 'var(--font-display)', textShadow: '0 0 10px rgba(255,0,255,0.3)' }}>TRANSMISSION RELAY</h2>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '40px', fontSize: '1.1rem' }}>Establish connection with the neural network</p>

                    <form onSubmit={(e) => { e.preventDefault(); alert('Transmission sequence executed securely.'); }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
                            <div>
                                <div style={{ color: 'var(--pink)', fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '8px', letterSpacing: '1px' }}>SIGNAL SOURCE</div>
                                <input type="text" required placeholder="YOUR_IDENTIFIER" style={{ width: '100%', background: 'rgba(255,255,255,0.05)', color: '#fff', padding: '16px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', outline: 'none', fontWeight: 'bold', transition: 'all 0.3s' }} onFocus={e => e.target.style.borderColor = 'var(--pink)'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'} />
                            </div>
                            <div>
                                <div style={{ color: 'var(--pink)', fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '8px', letterSpacing: '1px' }}>FREQUENCY LINK</div>
                                <input type="email" required placeholder="COMM_CHANNEL@NET" style={{ width: '100%', background: 'rgba(255,255,255,0.05)', color: '#fff', padding: '16px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', outline: 'none', fontWeight: 'bold', transition: 'all 0.3s' }} onFocus={e => e.target.style.borderColor = 'var(--pink)'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'} />
                            </div>
                        </div>
                        <div style={{ marginBottom: '32px' }}>
                            <div style={{ color: 'var(--pink)', fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '8px', letterSpacing: '1px' }}>ENCRYPTED PAYLOAD</div>
                            <textarea required placeholder="ENTER_TRANSMISSION_DATA..." rows="6" style={{ width: '100%', background: 'rgba(255,255,255,0.05)', color: '#fff', padding: '16px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', outline: 'none', resize: 'none', transition: 'all 0.3s' }} onFocus={e => e.target.style.borderColor = 'var(--pink)'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}></textarea>
                        </div>
                        <button type="submit" style={{ width: '100%', background: 'var(--pink)', color: '#fff', padding: '20px', fontSize: '1.3rem', fontWeight: 900, borderRadius: '8px', letterSpacing: '2px', cursor: 'pointer', transition: 'all 0.3s', border: 'none', boxShadow: '0 10px 20px rgba(255,0,255,0.3)' }} onMouseOver={(e) => e.target.style.transform = 'translateY(-3px)'} onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}>
                            EXECUTE TRANSMISSION
                        </button>
                    </form>
                </div>

                <div style={{ flex: '1 1 300px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '24px', padding: '50px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <a href="https://www.instagram.com/madhuramsliet/?hl=en" target="_blank" rel="noopener noreferrer" style={{ border: '2px solid var(--pink)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '12px', padding: '12px 24px', borderRadius: '30px', color: '#fff', marginBottom: '40px', textDecoration: 'none', transition: 'all 0.3s', fontWeight: 'bold', letterSpacing: '1px', background: 'rgba(255,0,255,0.1)' }} onMouseOver={(e) => { e.target.style.background = 'var(--pink)'; e.target.style.color = '#fff' }} onMouseOut={(e) => { e.target.style.background = 'rgba(255,0,255,0.1)'; e.target.style.color = '#fff' }}>
                        <span>⚡</span> @madhuramsliet
                    </a>
                    <h3 style={{ color: '#fff', marginBottom: '40px', fontSize: '1.5rem', fontFamily: 'var(--font-display)', textShadow: '0 0 10px rgba(255,255,255,0.2)' }}>NETWORK NODES</h3>

                    <div style={{ display: 'flex', gap: '20px', marginBottom: '40px', alignItems: 'center' }}>
                        <div style={{ color: 'var(--pink)', fontSize: '2rem', textShadow: '0 0 10px var(--pink)' }}>📍</div>
                        <div>
                            <div style={{ color: '#fff', fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '4px' }}>BASE OPS</div>
                            <div style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: '1.4' }}>SLIET Longowal, Sangrur,<br />Punjab, India</div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                        <div style={{ color: 'var(--pink)', fontSize: '2rem', textShadow: '0 0 10px var(--pink)' }}>✉️</div>
                        <div>
                            <div style={{ color: '#fff', fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '4px' }}>RELAY PATH</div>
                            <div style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>madhuram@sliet.ac.in</div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default Team;
