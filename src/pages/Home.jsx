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

    // High performance UI reveal without heavy CSS blurs
    const scrollReveal = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" }
        }
    };

    const gallery = [
        { title: 'Devine Divas Modelling', subtitle: 'Wall of Fame', img: '/wall-of-fame/Devine Divas.jpeg', color: '#00f0ff' },
        { title: 'Khasa Ala Chahar', subtitle: 'Wall of Fame', img: '/wall-of-fame/Khasa Ala.jpeg', color: '#ebff00' },
        { title: 'Walk it Modelling', subtitle: 'Wall of Fame', img: '/wall-of-fame/Modelling.jpeg', color: '#ebff00' },
        { title: 'The Glory', subtitle: 'Wall of Fame', img: '/wall-of-fame/WhatsApp Image 2026-03-14 at 11.34.22.jpeg', color: '#00f0ff' }
    ];

    const faqs = [
        { q: "What is Madhuram?", a: "Madhuram is the Annual Cultural Fest of SLIET, an expression of euphoria with over 1.5M+ students from 7000+ colleges." },
        { q: "When was Madhuram established?", a: "Madhuram was established in 1989 with a vision to revolutionize technical education in the region." },
        { q: "What is the mission of Madhuram?", a: "To serve as a dynamic catalyst for cultural integration, bridging the gap between technical innovation and human expression through inclusive excellence." },
        { q: "Where is SLIET located?", a: "SLIET is located in Longowal, Sangrur, Punjab, India on a 451-Acre Eco scale." },
        { q: "What is the SLIET rank and accreditation?", a: "SLIET achieved NIRF Rank 79 and NAAC A-Grade accreditation, recognized among the elite engineering institutions in the nation." },
        { q: "How can I contact the Madhuram team?", a: "You can reach out via email at madhuram@sliet.ac.in or check our Instagram @madhuramsliet." }
    ];

    // Smooth Canvas Geometric Particle Constellation Effect
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let width = window.innerWidth;
        let height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };
        window.addEventListener('resize', handleResize);

        const numParticles = Math.min(Math.floor(width / 40), 40); // responsive density
        const particles = [];
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

        const drawStarburst = (x, y, r, c) => {
            ctx.strokeStyle = c; ctx.lineWidth = 1.5; ctx.beginPath();
            for (let i = 0; i < 8; i++) {
                const a = (Math.PI / 4) * i;
                ctx.moveTo(x, y); ctx.lineTo(x + Math.cos(a) * r, y + Math.sin(a) * r);
            }
            ctx.stroke();
            ctx.beginPath(); ctx.arc(x, y, r * 0.3, 0, Math.PI * 2); ctx.stroke();
        };

        const drawFlower = (x, y, r, c) => {
            ctx.fillStyle = 'transparent'; ctx.strokeStyle = c; ctx.lineWidth = 1.5; ctx.beginPath();
            for (let i = 0; i < 6; i++) {
                const a = (Math.PI / 3) * i;
                ctx.moveTo(x, y);
                ctx.ellipse(x + Math.cos(a) * r * 0.6, y + Math.sin(a) * r * 0.6, r * 0.6, r * 0.2, a, 0, Math.PI * 2);
            }
            ctx.stroke();
        };

        const drawDiamondCircle = (x, y, r, c) => {
            ctx.strokeStyle = c; ctx.lineWidth = 1.5;
            ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.stroke();
            const d = r * 0.6;
            ctx.beginPath(); ctx.moveTo(x, y - d); ctx.lineTo(x + d, y); ctx.lineTo(x, y + d); ctx.lineTo(x - d, y); ctx.closePath(); ctx.stroke();
            ctx.beginPath(); ctx.arc(x, y, r * 0.1, 0, Math.PI * 2); ctx.stroke();
        };

        const drawEye = (x, y, r, c) => {
            ctx.strokeStyle = c; ctx.lineWidth = 1.5; ctx.beginPath();
            ctx.moveTo(x - r, y);
            ctx.quadraticCurveTo(x, y - r * 1.2, x + r, y);
            ctx.quadraticCurveTo(x, y + r * 1.2, x - r, y);
            ctx.stroke();
            ctx.fillStyle = '#D1FF00'; ctx.beginPath(); ctx.arc(x, y, r * 0.2, 0, Math.PI * 2); ctx.fill();
        };

        let animationId;
        const render = () => {
            ctx.clearRect(0, 0, width, height);

            // Movement
            particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;
                if (p.x < -p.radius) p.x = width + p.radius;
                if (p.x > width + p.radius) p.x = -p.radius;
                if (p.y < -p.radius) p.y = height + p.radius;
                if (p.y > height + p.radius) p.y = -p.radius;

                // Draw nodes
                if (p.type === 0) drawStarburst(p.x, p.y, p.radius, p.color);
                else if (p.type === 1) drawFlower(p.x, p.y, p.radius, p.color);
                else if (p.type === 2) drawDiamondCircle(p.x, p.y, p.radius, p.color);
                else drawEye(p.x, p.y, p.radius, p.color);
            });

            // Constellation Lines
            ctx.lineWidth = 1;
            for (let i = 0; i < numParticles; i++) {
                for (let j = i + 1; j < numParticles; j++) {
                    const p1 = particles[i];
                    const p2 = particles[j];
                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 220) {
                        ctx.strokeStyle = p1.color;
                        ctx.globalAlpha = 1 - (dist / 220); // fade out naturally
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        // Curved lines for an organic connection feel
                        ctx.quadraticCurveTo(p1.x + dx * 0.1, p1.y - dy * 0.1, p2.x, p2.y);
                        ctx.stroke();
                    }
                }
            }
            ctx.globalAlpha = 1;

            animationId = requestAnimationFrame(render);
        };
        render();

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        // Unified full-page background color - cleanly removes borders between sections
        <div style={{ backgroundColor: '#2a0c24', minHeight: '100vh', color: '#fff', overflowX: 'hidden', fontFamily: 'Montserrat, sans-serif' }}>

            {/* HERO SECTION WITH CANVAS PARTICLES */}
            <section
                style={{
                    position: 'relative',
                    height: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    padding: '0 10vw',
                    backgroundImage: `linear-gradient(rgba(42, 12, 36, 0.4), rgba(42, 12, 36, 0.7)), url("${heroBg}")`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    overflow: 'hidden'
                }}
            >
                {/* Canvas covers the hero background cleanly */}
                <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }} />

                <div style={{ position: 'relative', zIndex: 2 }}>
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        style={{ color: '#ebff00', fontSize: 'clamp(1.2rem, 3vw, 2.5rem)', margin: 0, fontFamily: 'Montserrat, sans-serif', fontWeight: 800, textTransform: 'uppercase' }}
                    >
                        The ANNUAL CULTURAL<br />FEST OF SLIET
                    </motion.h2>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, delay: 0.4 }}
                        style={{ color: '#ebff00', fontSize: 'clamp(4rem, 12vw, 9rem)', margin: '10px 0 30px 0', fontFamily: '"Mystery Quest", system-ui', fontWeight: 'normal', textShadow: '4px 4px 0 rgba(0,0,0,0.5)' }}
                    >
                        mADHURAM'26
                    </motion.h1>

                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}>
                        <button
                            onClick={(e) => { e.stopPropagation(); navigate('/register'); }}
                            style={{ background: '#ebff00', color: '#000', padding: '12px 36px', fontSize: '1.4rem', fontWeight: 900, borderRadius: '8px', cursor: 'pointer', fontFamily: 'Montserrat, sans-serif', transition: 'transform 0.2s', border: 'none' }}
                            onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                            onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                        >
                            REGISTER
                        </button>
                    </motion.div>
                </div>
            </section>

            {/* WHAT IS MADHURAM */}
            <motion.section
                variants={scrollReveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                style={{ padding: '120px 10vw 80px 10vw', display: 'flex', gap: '60px', alignItems: 'center' }}
            >
                {/* TEXT CONTENT - Guaranteed to sit beside the images */}
                <div style={{ flex: '0 0 45%', zIndex: 5 }}>
                    <h2 style={{ color: '#ebff00', fontSize: 'clamp(3rem, 6vw, 5rem)', fontFamily: 'Montserrat, sans-serif', fontWeight: 900, lineHeight: '1', margin: 0, letterSpacing: '-2px', textShadow: '2px 2px 4px rgba(0,0,0,0.4)' }}>
                        What is
                        <br />
                        <span style={{ fontFamily: '"Mystery Quest", system-ui', fontSize: '1.2em', fontWeight: 'normal', display: 'inline-block', marginLeft: '40px', marginTop: '-15px', color: '#ebff00' }}>mADHURAM'26?</span>
                    </h2>
                    <div style={{ marginTop: '40px', color: '#e0d6e6', fontSize: '0.95rem', opacity: 0.9, lineHeight: '1.8', fontFamily: 'Montserrat, sans-serif' }}>
                        <p style={{ marginBottom: '20px' }}>Best days of your life!</p>
                        <p style={{ marginBottom: '20px' }}>
                            Madhuram is not a fest but an emotion, an expression of euphoria,
                            with a footfall of over 1.5M+ students from over 7000+ colleges.
                            Started long ago, attracting people from all over the globe ever since.
                            Madhuram has lived through decades of musical and cultural change, not
                            only keeping up with the times but setting new standards for cultural
                            fests each year, and this time we are back with the 26th edition.
                        </p>
                        <p>Don't wait anymore, Register Now!</p>
                    </div>
                </div>

                {/* DYNAMIC, OVER-THE-TOP LAYOUT: IMAGES SCALED UP AND BREAKING OUT */}
                <div style={{ flex: '1 1 auto', position: 'relative', height: '650px', display: 'flex', justifyContent: 'center', alignItems: 'flex-end', marginLeft: '10px' }}>

                    {/* IMAGE 2 (GUITARIST - Left/Back Layer) */}
                    <motion.img
                        initial={{ opacity: 0, x: -50, y: 40 }}
                        whileInView={{ opacity: 1, x: 0, y: 0 }}
                        transition={{ duration: 0.8 }}
                        src={img2}
                        style={{ height: '100%', position: 'absolute', left: '-15%', bottom: '-20%', zIndex: 1, objectFit: 'contain', filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.6))' }}
                        alt="Guitarist"
                    />

                    {/* IMAGE 3 (GIRLS DANCING - Far Right/Back Layer) */}
                    <motion.img
                        initial={{ opacity: 0, x: 50, y: 10 }}
                        whileInView={{ opacity: 1, x: 0, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        src={img3}
                        style={{ height: '110%', position: 'absolute', right: '-15%', bottom: '-22%', zIndex: 2, objectFit: 'contain', filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.6))' }}
                        alt="Dancers"
                    />

                    {/* IMAGE 1 (MAIN SINGER - Right Foreground layer, HUGE) */}
                    <motion.img
                        initial={{ opacity: 0, scale: 0.8, y: 80 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        src={img1}
                        style={{ height: '110%', position: 'absolute', right: '5%', bottom: '-35%', zIndex: 3, objectFit: 'contain', filter: 'drop-shadow(-20px 20px 40px rgba(0,0,0,0.8))' }}
                        alt="Main Singer"
                    />
                </div>
            </motion.section>

            {/* SEPARATOR CLOUD BORDER - FULL WIDTH OUTSIDE THE PADDING LIMITS */}
            <div style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', position: 'relative', zIndex: 4, marginTop: '-250px', pointerEvents: 'none', filter: 'drop-shadow(0 -10px 20px rgba(247,0,255,0.2))' }}>
                <img
                    src={borderCloud}
                    alt="Cloud Border separator"
                    style={{ width: '100%', height: 'auto', display: 'block', border: 'none' }}
                />
            </div>

            {/* MOOD GALLERY */}
            <motion.section
                variants={scrollReveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                style={{ padding: '80px 10vw' }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                    <div style={{ background: '#fff', color: '#000', padding: '8px 20px', fontSize: '2rem', fontWeight: 900, fontFamily: 'Montserrat, sans-serif' }}>MOOD</div>
                    <div style={{ background: '#f700ff', color: '#fff', padding: '8px 20px', fontSize: '2rem', fontWeight: 900, fontFamily: 'Montserrat, sans-serif' }}>GALLERY</div>
                </div>
                <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '50px' }}>Explore the sonic and visual landscapes of our flagship events</p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
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
                            <div style={{ height: '300px', background: `url("${item.img}") center/cover`, border: `4px solid ${item.color}`, borderRadius: '12px', marginBottom: '16px' }}></div>
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
                style={{ padding: '80px 10vw', textAlign: 'center' }}
            >
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px', marginBottom: '40px' }}>
                    <div style={{ background: '#00f0ff', color: '#000', padding: '8px 20px', fontSize: '2rem', fontWeight: 900, fontFamily: 'Montserrat, sans-serif' }}>OFFICIAL</div>
                    <div style={{ background: '#f700ff', color: '#fff', padding: '8px 20px', fontSize: '2rem', fontWeight: 900, fontFamily: 'Montserrat, sans-serif' }}>TRAILER</div>
                </div>

                <div style={{
                    position: 'relative',
                    paddingBottom: '56.25%',
                    height: 0,
                    overflow: 'hidden',
                    maxWidth: '100%',
                    borderRadius: '16px',
                    border: '4px solid rgba(0, 240, 255, 0.3)',
                    boxShadow: '0 0 40px rgba(0, 240, 255, 0.2)'
                }}>
                    <iframe
                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                        src="https://www.youtube.com/embed/V3cN7MX2qnI"
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
                style={{ padding: '100px 10vw 150px 10vw' }}
            >
                {/* Forced Side-By-Side Flex layout to ensure it sits exactly next to questions, not above */}
                <div style={{ display: 'flex', gap: '60px', alignItems: 'flex-start' }}>

                    {/* LEFT COLUMN: TITLE */}
                    <div style={{ flex: '0 0 320px', position: 'sticky', top: '100px' }}>
                        <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#f700ff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '30px' }}>
                            <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: '4px solid #fff' }}></div>
                        </div>
                        <h2 style={{ color: '#ebff00', fontSize: '3rem', fontFamily: 'Montserrat, sans-serif', fontWeight: 900, lineHeight: '1.1', margin: 0 }}>
                            ANY QUESTIONS?<br />
                            <span style={{ fontFamily: '"Mystery Quest", system-ui', fontWeight: 'normal', fontSize: '1.2em', color: '#ebff00' }}>WE GOT YOU.</span>
                        </h2>
                    </div>

                    {/* RIGHT COLUMN: ACTUAL QUESTIONS */}
                    <div style={{ flex: '1 1 auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                style={{
                                    background: openFaq === index ? '#D1FF00' : 'rgba(253, 243, 231, 0.95)',
                                    color: '#000',
                                    padding: '24px 30px',
                                    borderRadius: '16px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    cursor: 'pointer',
                                    transition: 'background 0.3s ease',
                                    fontWeight: 'bold',
                                    fontFamily: 'Montserrat, sans-serif'
                                }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span>{faq.q}</span>
                                    <span style={{ fontSize: '1.5rem', fontWeight: 'bold', transform: openFaq === index ? 'rotate(45deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}>
                                        +
                                    </span>
                                </div>
                                <AnimatePresence>
                                    {openFaq === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0, marginTop: 0 }}
                                            animate={{ height: 'auto', opacity: 1, marginTop: '16px' }}
                                            exit={{ height: 0, opacity: 0, marginTop: 0 }}
                                            style={{ color: '#333', fontWeight: 'normal', fontSize: '0.95rem', overflow: 'hidden' }}
                                        >
                                            {faq.a}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>

                </div>
            </motion.section>
        </div>
    );
};

export default Home;
