import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Search, X } from 'lucide-react';

const Events = () => {
    const categories = ['ALL EVENTS', 'PRE-FEST', 'MAIN FEST'];
    const [activeCategory, setActiveCategory] = useState('ALL EVENTS');
    const [searchQuery, setSearchQuery] = useState('');
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
    const [selectedEvent, setSelectedEvent] = useState(null); // popup state
    const navigate = useNavigate();

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 1024);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Lock body scroll when popup is open
    useEffect(() => {
        document.body.style.overflow = selectedEvent ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [selectedEvent]);

    const topEvents = [
        { title: "Bhangra Cup", desc: "The ultimate Bhangra showdown. High energy, pure tradition.", img: "https://images.unsplash.com/photo-1543857778-c4a1a3e0b2eb?w=800&q=80", tag: "MAIN FEST" },
        { title: "Movie Show", desc: "Grab your popcorn and get ready for the big screen experience.", img: "/events/movie_show_1773481018872.png", tag: "PRE-EVENTS" },
        { title: "Dance", desc: "Embrace the rich cultural tapestry through captivating folk dance.", img: "/events/dance_1773481189287.png", tag: "MAIN FEST" },
        { title: "Singing", desc: "From soulful ballads to electrifying performances.", img: "/events/singing_1773481234846.png", tag: "MAIN FEST" },
        { title: "Band Performance", desc: "Step into the spotlight as bands unite to rock the stage.", img: "/events/band_performance_1773481251795.png", tag: "MAIN FEST" }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % topEvents.length);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    const events = [
        { title: 'MOVIE SHOW', desc: 'Grab your popcorn and get ready for the big screen experience. Under the open sky or in the auditorium, this cinematic evening promises an unforgettable experience for all movie lovers.', tag: 'PRE-EVENTS', img: '/events/movie_show_1773481018872.png', active: true },
        { title: 'MARATHON', desc: 'Lace up your shoes and feel the rush of the run. Compete with the best, push your limits, and cross the finish line to glory in this high-energy campus marathon.', tag: 'PRE-EVENTS', img: '/events/marathon_1773481035299.png', active: false },
        { title: 'SLIET PREMIER LEAGUE', desc: 'Where passion meets the pitch and champions are made. The most awaited cricket tournament of the year — teams compete with fire in their hearts and victory in their sights.', tag: 'PRE-EVENTS', img: '/events/sliet_premier_league_1773481053418.png', active: false },
        { title: 'TUG-OF-WAR', desc: 'Strength meets strategy in the ultimate test of teamwork. Pull together or fall together — this classic battle of grit separates the champions from the rest.', tag: 'PRE-EVENTS', img: '/events/tug_of_war_1773481086195.png', active: false },
        { title: 'MUSICAL EVENING', desc: 'Where melodies meet emotions and rhythm fills the air. An enchanting evening of live music that sets the tone for the grand festival ahead.', tag: 'PRE-EVENTS', img: '/events/musical_evening_1773481107065.png', active: false },
        { title: 'OPEN MIC', desc: 'A stage for every voice and a spotlight for every story. Share your poetry, comedy, music, or spoken word — no filters, just raw expression.', tag: 'PRE-EVENTS', img: '/events/open_mic_1773481123321.png', active: false },
        { title: 'SLIET ROADIES', desc: 'Strength, stamina, and fearless determination. Navigate through gruelling challenges designed to test your physical and mental limits in this epic adventure.', tag: 'PRE-EVENTS', img: '/events/sliet_roadies_1773481148722.png', active: false },
        { title: 'FLASHMOB', desc: 'When the music drops, the crowd becomes the stage. A surprise burst of choreographed energy in the most unexpected places — join in or be amazed.', tag: 'PRE-EVENTS', img: '/events/flashmob_1773481168223.png', active: false },
        { title: 'BHANGRA CUP', desc: 'The ultimate Bhangra showdown. High energy, pure tradition, thunderous beats and vibrant moves — experience the true spirit of Punjab on the grandest stage.', tag: 'MAIN FEST', img: 'https://images.unsplash.com/photo-1543857778-c4a1a3e0b2eb?w=800&q=80', active: true },
        { title: 'DANCE', desc: 'Embrace the rich cultural tapestry through captivating folk dance. From classical to contemporary, every step tells a story of tradition, passion, and artistry.', tag: 'MAIN FEST', img: '/events/dance_1773481189287.png', active: false },
        { title: 'SINGING', desc: 'From soulful ballads to electrifying performances. Step up to the mic and let your voice echo through the crowd in this celebration of musical excellence.', tag: 'MAIN FEST', img: '/events/singing_1773481234846.png', active: false },
        { title: 'BAND PERFORMANCE', desc: 'Step into the spotlight as bands unite to rock the stage. Original compositions, cover acts, and raw talent — this is where music legends are born.', tag: 'MAIN FEST', img: '/events/band_performance_1773481251795.png', active: false },
        { title: 'DRAMA / SKIT', desc: 'Prepare for an evening of storytelling and creativity. Powerful performances that blur the line between stage and reality, leaving the audience breathless.', tag: 'MAIN FEST', img: '/events/drama_skit_1773481272190.png', active: false },
        { title: 'RAPPING', desc: 'Rhythmic art form of spoken word with lyrics that flow. Drop bars that hit hard — freestyle or written, the mic is yours to own.', tag: 'MAIN FEST', img: '/events/rapping_1773481301491.png', active: false },
        { title: 'STAND-UP COMEDY', desc: 'Blend of wit, satire and relatable humor to make you laugh. Bring your best set, own the stage, and leave the crowd in stitches.', tag: 'MAIN FEST', img: '/events/standup_comedy_1773481318897.png', active: false },
        { title: 'NUKKAD NATAK', desc: 'Street play combining drama and social messages. Hard-hitting narratives performed with passion to spark conversations that matter.', tag: 'MAIN FEST', img: '/events/nukkad_natak_1773481337047.png', active: false },
        { title: 'MONO ACTING', desc: "Captivating form of drama relying on the actor's versatility. One person, one stage, one shot at glory — bring a character to life like never before.", tag: 'MAIN FEST', img: '/events/mono_acting_1773481367955.png', active: false },
        { title: 'POETRY & STORYTELLING', desc: 'Paint the canvas of human expression offering solace and inspiration. Weave words into wonder and connect with souls through the timeless art of language.', tag: 'MAIN FEST', img: '/events/poetry_storytelling_1773481384341.png', active: false },
        { title: 'MODELLING', desc: 'Striking poses, walking the runway with physical attributes and charisma. Own the ramp, own the moment — this is where style meets substance.', tag: 'MAIN FEST', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80', active: false },
        { title: 'CHOREOGRAPHY', desc: 'An art of creating and arranging dance movements to form a cohesive performance. Bring your vision alive through movement, synchrony, and creative expression.', tag: 'MAIN FEST', img: 'https://images.unsplash.com/photo-1493225457224-dd9f57ebad9e?w=800&q=80', active: false },
        { title: 'BEATBOXING', desc: 'Musical drumming performance relying solely on vocal skills. Craft beats with nothing but your voice and leave the audience absolutely speechless.', tag: 'MAIN FEST', img: 'https://images.unsplash.com/photo-1516280440502-628d613994ce?w=800&q=80', active: false }
    ];

    const filteredEvents = events.filter(evt => {
        const matchesSearch = evt.title.toLowerCase().includes(searchQuery.toLowerCase()) || evt.tag.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = activeCategory === 'ALL EVENTS' ? true : activeCategory === 'PRE-FEST' ? evt.tag === 'PRE-EVENTS' : evt.tag !== 'PRE-EVENTS';
        return matchesSearch && matchesCategory;
    });

    const handleRegister = (eventName) => navigate(`/register?event=${encodeURIComponent(eventName || '')}`);
    const nextSlide = () => setCurrentSlide((p) => (p + 1) % topEvents.length);
    const prevSlide = () => setCurrentSlide((p) => (p - 1 + topEvents.length) % topEvents.length);

    return (
        <>
            {/* ── EVENT DETAIL POPUP ── */}
            <AnimatePresence>
                {selectedEvent && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        onClick={() => setSelectedEvent(null)}
                        style={{
                            position: 'fixed', inset: 0, zIndex: 9000,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            padding: isMobile ? '16px' : '40px',
                        }}
                    >
                        {/* Blurred background (event image) */}
                        <div style={{
                            position: 'absolute', inset: 0,
                            backgroundImage: `url(${selectedEvent.img})`,
                            backgroundSize: 'cover', backgroundPosition: 'center',
                            filter: 'blur(22px) brightness(0.35)',
                            transform: 'scale(1.08)',
                        }} />
                        {/* Dark overlay */}
                        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.55)' }} />

                        {/* Modal card */}
                        <motion.div
                            initial={{ opacity: 0, y: 30, scale: 0.96 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 20, scale: 0.96 }}
                            transition={{ duration: 0.3, ease: 'easeOut' }}
                            onClick={(e) => e.stopPropagation()}
                            style={{
                                position: 'relative',
                                background: 'rgba(10, 2, 20, 0.82)',
                                backdropFilter: 'blur(24px)',
                                WebkitBackdropFilter: 'blur(24px)',
                                border: '1px solid rgba(247,0,255,0.25)',
                                borderRadius: '20px',
                                padding: isMobile ? '28px 24px' : '48px 52px',
                                maxWidth: '680px',
                                width: '100%',
                                boxShadow: '0 30px 80px rgba(0,0,0,0.7), 0 0 60px rgba(247,0,255,0.08)',
                            }}
                        >
                            {/* Back / close button */}
                            <button
                                onClick={() => setSelectedEvent(null)}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: '6px',
                                    background: 'none', border: 'none', cursor: 'pointer',
                                    color: 'var(--pink)', fontFamily: 'var(--font-retro, monospace)',
                                    fontSize: isMobile ? '1rem' : '1.1rem',
                                    letterSpacing: '2px', fontWeight: 700,
                                    marginBottom: '28px', padding: 0,
                                    transition: 'opacity 0.2s',
                                }}
                                onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
                                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                            >
                                <ChevronLeft size={20} />  BACK
                            </button>

                            {/* Tag badge */}
                            <div style={{
                                display: 'inline-flex', alignItems: 'center', gap: '6px',
                                color: 'var(--pink)', border: '1px solid rgba(247,0,255,0.45)',
                                padding: '5px 16px', borderRadius: '50px',
                                fontSize: '0.7rem', fontWeight: 900, letterSpacing: '3px',
                                marginBottom: '18px',
                            }}>
                                ⚡ {selectedEvent.tag}
                            </div>

                            {/* Title */}
                            <h2 style={{
                                margin: '0 0 24px',
                                fontSize: isMobile ? '2rem' : '2.8rem',
                                fontWeight: 900,
                                color: 'var(--pink)',
                                fontFamily: 'var(--font-retro, monospace)',
                                lineHeight: 1.1,
                                textShadow: '0 0 30px rgba(247,0,255,0.4)',
                                letterSpacing: '2px',
                            }}>
                                {selectedEvent.title}
                            </h2>

                            {/* Divider */}
                            <div style={{ height: '1px', background: 'rgba(247,0,255,0.2)', marginBottom: '24px' }} />

                            {/* Description */}
                            <p style={{
                                color: 'rgba(255,220,255,0.85)',
                                fontSize: isMobile ? '0.95rem' : '1.05rem',
                                lineHeight: 1.8,
                                margin: '0 0 36px',
                            }}>
                                {selectedEvent.desc}
                            </p>

                            {/* CTA buttons */}
                            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                                <button
                                    onClick={() => { setSelectedEvent(null); handleRegister(selectedEvent.title); }}
                                    className="btn-primary"
                                    style={{ padding: '14px 36px', fontSize: '0.9rem' }}
                                >
                                    REGISTER NOW ⚡
                                </button>
                                <button
                                    onClick={() => setSelectedEvent(null)}
                                    style={{
                                        padding: '14px 28px',
                                        background: 'transparent',
                                        border: '1.5px solid rgba(247,0,255,0.4)',
                                        color: 'rgba(255,255,255,0.7)',
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        fontFamily: 'Montserrat, sans-serif',
                                        fontWeight: 700,
                                        fontSize: '0.85rem',
                                        letterSpacing: '1px',
                                        transition: 'border-color 0.2s, color 0.2s',
                                    }}
                                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--pink)'; e.currentTarget.style.color = '#fff'; }}
                                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(247,0,255,0.4)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; }}
                                >
                                    CLOSE
                                </button>
                            </div>

                            {/* Corner accent */}
                            <div style={{ position: 'absolute', top: 0, right: 0, width: '60px', height: '60px', borderTop: '2px solid rgba(247,0,255,0.35)', borderRight: '2px solid rgba(247,0,255,0.35)', borderRadius: '0 20px 0 0', pointerEvents: 'none' }} />
                            <div style={{ position: 'absolute', bottom: 0, left: 0, width: '60px', height: '60px', borderBottom: '2px solid rgba(247,0,255,0.35)', borderLeft: '2px solid rgba(247,0,255,0.35)', borderRadius: '0 0 0 20px', pointerEvents: 'none' }} />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── PAGE CONTENT ── */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}
                style={{ padding: isMobile ? '20px' : '40px 10vw', width: '100%', overflowX: 'hidden' }}
            >
                {/* HERO SLIDER */}
                <div style={{
                    position: 'relative', width: '100%', height: isMobile ? '420px' : '650px',
                    marginBottom: '60px', borderRadius: isMobile ? '16px' : '30px', overflow: 'hidden',
                    background: 'var(--bg-darker)', border: '1px solid rgba(255,255,255,0.1)'
                }}>
                    <div style={{
                        position: 'absolute', inset: 0, background: `url(${topEvents[currentSlide].img}) center/cover`,
                        filter: 'blur(40px) brightness(0.4)', zIndex: 0, transform: 'scale(1.1)', transition: '0.8s'
                    }} />

                    <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', height: '100%', padding: isMobile ? '16px' : '40px' }}>

                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '15px' }}>
                            <button onClick={prevSlide} style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', color: '#fff', border: 'none', cursor: 'pointer', backdropFilter: 'blur(10px)' }}><ChevronLeft size={24} /></button>
                            <button onClick={nextSlide} style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', color: '#fff', border: 'none', cursor: 'pointer', backdropFilter: 'blur(10px)' }}><ChevronRight size={24} /></button>
                        </div>

                        <div style={{ display: 'flex', gap: '60px', alignItems: 'center', flex: 1 }}>
                            {!isMobile && (
                                <AnimatePresence mode="wait">
                                    <motion.div key={currentSlide} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                                        style={{ flex: '0 0 350px', height: '480px', borderRadius: '24px', background: `url(${topEvents[currentSlide].img}) center/cover`, boxShadow: '0 20px 50px rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.2)' }}
                                    />
                                </AnimatePresence>
                            )}

                            <div style={{ flex: 1, textAlign: isMobile ? 'center' : 'left' }}>
                                <AnimatePresence mode="wait">
                                    <motion.div key={currentSlide} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                                        <div style={{ background: 'var(--pink)', color: '#fff', padding: '6px 16px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 900, display: 'inline-block', marginBottom: '20px', letterSpacing: '2px' }}>{topEvents[currentSlide].tag}</div>
                                        <h1 style={{ fontSize: isMobile ? 'clamp(1.6rem, 7vw, 2.6rem)' : '4.5rem', fontWeight: 900, margin: 0, color: '#fff', lineHeight: 1.1, fontFamily: 'var(--font-heading)' }}>{topEvents[currentSlide].title}</h1>
                                        <p style={{
                                            fontSize: isMobile ? '0.9rem' : '1.2rem', color: 'rgba(255,255,255,0.7)', marginTop: isMobile ? '12px' : '24px', marginBottom: isMobile ? '20px' : '40px', lineHeight: 1.6, maxWidth: isMobile ? '100%' : '500px',
                                            display: '-webkit-box', WebkitLineClamp: isMobile ? 2 : 10, WebkitBoxOrient: 'vertical', overflow: 'hidden'
                                        }}>{topEvents[currentSlide].desc}</p>
                                        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: isMobile ? 'center' : 'flex-start' }}>
                                            <button onClick={() => handleRegister(topEvents[currentSlide].title)} className="btn-primary" style={{ padding: isMobile ? '14px 28px' : '18px 50px', fontSize: isMobile ? '0.95rem' : '1.2rem', boxShadow: '0 15px 35px rgba(247,0,255,0.3)' }}>REGISTER NOW ⚡</button>
                                            <button
                                                onClick={() => setSelectedEvent(topEvents[currentSlide])}
                                                style={{ padding: isMobile ? '14px 20px' : '18px 36px', fontSize: isMobile ? '0.85rem' : '1rem', fontWeight: 700, fontFamily: 'Montserrat, sans-serif', letterSpacing: '1px', background: 'transparent', border: '2px solid rgba(255,255,255,0.3)', color: '#fff', borderRadius: '10px', cursor: 'pointer', transition: 'border-color 0.2s, background 0.2s' }}
                                                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--pink)'; e.currentTarget.style.background = 'rgba(247,0,255,0.1)'; }}
                                                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; e.currentTarget.style.background = 'transparent'; }}
                                            >
                                                LEARN MORE
                                            </button>
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                            {topEvents.map((_, idx) => (
                                <div key={idx} onClick={() => setCurrentSlide(idx)} style={{ width: idx === currentSlide ? '30px' : '10px', height: '10px', borderRadius: '5px', background: idx === currentSlide ? 'var(--pink)' : 'rgba(255,255,255,0.2)', cursor: 'pointer', transition: '0.3s' }} />
                            ))}
                        </div>
                    </div>
                </div>

                {/* FILTERS & SEARCH */}
                <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '30px', alignItems: isMobile ? 'center' : 'flex-end', justifyContent: 'space-between', marginBottom: '60px' }}>
                    <div style={{ textAlign: isMobile ? 'center' : 'left' }}>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#fff', margin: 0 }}>FESTIVAL <span style={{ color: 'var(--cyan)' }}>LINEUP</span></h2>
                        <p style={{ color: 'var(--text-muted)', marginTop: '10px' }}>Experience the rhythm of excellence.</p>
                    </div>
                    <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '20px', width: isMobile ? '100%' : 'auto' }}>
                        <div style={{ display: 'flex', flexWrap: 'wrap', background: 'rgba(255,255,255,0.05)', borderRadius: '50px', padding: '5px', border: '1px solid rgba(255,255,255,0.1)', gap: '4px' }}>
                            {categories.map(c => (
                                <button key={c} onClick={() => setActiveCategory(c)} style={{ background: activeCategory === c ? 'var(--pink)' : 'transparent', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '50px', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer', transition: '0.3s' }}>{c}</button>
                            ))}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.05)', borderRadius: '50px', padding: '0 20px', border: '1px solid rgba(255,255,255,0.1)' }}>
                            <Search size={18} color="rgba(255,255,255,0.4)" />
                            <input type="text" placeholder="Search events..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                                style={{ background: 'transparent', border: 'none', color: '#fff', padding: '15px 12px', outline: 'none', fontSize: '0.9rem', width: isMobile ? '100%' : '200px' }} />
                        </div>
                    </div>
                </div>

                {/* CARDS GRID */}
                <motion.div layout style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', marginBottom: '100px' }}>
                    <AnimatePresence>
                        {filteredEvents.length > 0 ? filteredEvents.map((evt, i) => (
                            <motion.div key={evt.title} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                                style={{ position: 'relative', height: isMobile ? '360px' : '420px', borderRadius: '24px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', cursor: 'default' }}
                            >
                                <motion.div whileHover={{ scale: 1.08 }} transition={{ duration: 0.5 }} style={{ position: 'absolute', inset: 0, background: `url(${evt.img}) center/cover`, zIndex: 0 }} />
                                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(transparent 30%, rgba(0,0,0,0.92))', zIndex: 1 }} />
                                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '24px 28px', zIndex: 2 }}>
                                    {evt.active && <div style={{ background: 'var(--cyan)', color: '#000', padding: '4px 12px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 900, display: 'inline-block', marginBottom: '10px' }}>EVENT LIVE ⚡</div>}
                                    <div style={{ color: 'var(--pink)', fontSize: '0.72rem', fontWeight: 900, letterSpacing: '1px', marginBottom: '6px' }}>{evt.tag}</div>
                                    <h3 style={{ color: '#fff', fontSize: '1.5rem', fontWeight: 900, lineHeight: 1.2, margin: '0 0 10px' }}>{evt.title}</h3>
                                    <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.85rem', marginBottom: '18px', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{evt.desc}</p>

                                    {/* Buttons row */}
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                        <button
                                            onClick={() => setSelectedEvent(evt)}
                                            style={{
                                                flex: 1, padding: '10px 0', borderRadius: '8px',
                                                background: 'transparent', border: '1.5px solid rgba(247,0,255,0.6)',
                                                color: '#f700ff', fontFamily: 'Montserrat, sans-serif',
                                                fontWeight: 700, fontSize: '0.75rem', letterSpacing: '1.5px',
                                                cursor: 'pointer', transition: 'background 0.2s, color 0.2s',
                                                textTransform: 'uppercase',
                                            }}
                                            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(247,0,255,0.18)'; e.currentTarget.style.color = '#fff'; }}
                                            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#f700ff'; }}
                                        >
                                            LEARN MORE
                                        </button>
                                        <button
                                            onClick={() => handleRegister(evt.title)}
                                            className="btn-primary"
                                            style={{ flex: 1, padding: '10px 0', fontSize: '0.75rem', borderRadius: '8px' }}
                                        >
                                            REGISTER ⚡
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        )) : (
                            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '100px 0' }}>
                                <h2 style={{ color: 'var(--text-muted)', fontSize: '1.5rem' }}>No sequences found matching your query.</h2>
                            </div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </motion.div>
        </>
    );
};

export default Events;
