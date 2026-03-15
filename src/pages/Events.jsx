import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Hash, Briefcase, Info, Home, CreditCard, CheckCircle2, QrCode, ChevronLeft, ChevronRight } from 'lucide-react';
import { supabase } from '../lib/supabase';



const Events = () => {
    const categories = ['ALL EVENTS', 'PRE-FEST', 'MAIN FEST'];
    const [activeCategory, setActiveCategory] = useState('ALL EVENTS');
    const [searchQuery, setSearchQuery] = useState('');
    const [currentSlide, setCurrentSlide] = useState(0);
    const navigate = useNavigate();

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
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const events = [
        // Pre-Events
        { title: 'MOVIE SHOW', desc: 'Grab your popcorn and get ready for the big screen experience.', tag: 'PRE-EVENTS', img: '/events/movie_show_1773481018872.png', active: true },
        { title: 'MARATHON', desc: 'Lace up your shoes and feel the rush of the run.', tag: 'PRE-EVENTS', img: '/events/marathon_1773481035299.png', active: false },
        { title: 'SLIET PREMIER LEAGUE', desc: 'Where passion meets the pitch and champions are made.', tag: 'PRE-EVENTS', img: '/events/sliet_premier_league_1773481053418.png', active: false },
        { title: 'TUG-OF-WAR', desc: 'Strength meets strategy in the ultimate test of teamwork.', tag: 'PRE-EVENTS', img: '/events/tug_of_war_1773481086195.png', active: false },
        { title: 'MUSICAL EVENING', desc: 'Where melodies meet emotions and rhythm fills the air.', tag: 'PRE-EVENTS', img: '/events/musical_evening_1773481107065.png', active: false },
        { title: 'OPEN MIC', desc: 'A stage for every voice and a spotlight for every story.', tag: 'PRE-EVENTS', img: '/events/open_mic_1773481123321.png', active: false },
        { title: 'SLIET ROADIES', desc: 'Strength, stamina, and fearless determination.', tag: 'PRE-EVENTS', img: '/events/sliet_roadies_1773481148722.png', active: false },
        { title: 'FLASHMOB', desc: 'When the music drops, the crowd becomes the stage.', tag: 'PRE-EVENTS', img: '/events/flashmob_1773481168223.png', active: false },

        // Main Events
        { title: 'BHANGRA CUP', desc: 'The ultimate Bhangra showdown. High energy, pure tradition.', tag: 'MAIN FEST', img: 'https://images.unsplash.com/photo-1543857778-c4a1a3e0b2eb?w=800&q=80', active: true },
        { title: 'DANCE', desc: 'Embrace the rich cultural tapestry through captivating folk dance.', tag: 'MAIN FEST', img: '/events/dance_1773481189287.png', active: false },
        { title: 'SINGING', desc: 'From soulful ballads to electrifying performances.', tag: 'MAIN FEST', img: '/events/singing_1773481234846.png', active: false },
        { title: 'BAND PERFORMANCE', desc: 'Step into the spotlight as bands unite to rock the stage.', tag: 'MAIN FEST', img: '/events/band_performance_1773481251795.png', active: false },
        { title: 'DRAMA / SKIT', desc: 'Prepare for an evening of storytelling and creativity.', tag: 'MAIN FEST', img: '/events/drama_skit_1773481272190.png', active: false },
        { title: 'RAPPING', desc: 'Rhythmic art form of spoken word with lyrics that flow.', tag: 'MAIN FEST', img: '/events/rapping_1773481301491.png', active: false },
        { title: 'STAND-UP COMEDY', desc: 'Blend of wit, satire and relatable humor to make you laugh.', tag: 'MAIN FEST', img: '/events/standup_comedy_1773481318897.png', active: false },
        { title: 'NUKKAD NATAK', desc: 'Street play combining drama and social messages.', tag: 'MAIN FEST', img: '/events/nukkad_natak_1773481337047.png', active: false },
        { title: 'MONO ACTING', desc: 'Captivating form of drama relying on the actor\'s versatility.', tag: 'MAIN FEST', img: '/events/mono_acting_1773481367955.png', active: false },
        { title: 'POETRY & STORYTELLING', desc: 'Paint the canvas of human expression offering solace and inspiration.', tag: 'MAIN FEST', img: '/events/poetry_storytelling_1773481384341.png', active: false },
        { title: 'MODELLING', desc: 'Striking poses, walking the runway with physical attributes and charisma.', tag: 'MAIN FEST', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80', active: false },
        { title: 'CHOREOGRAPHY', desc: 'An art of creating and arranging dance movements to form a cohesive performance.', tag: 'MAIN FEST', img: 'https://images.unsplash.com/photo-1493225457224-dd9f57ebad9e?w=800&q=80', active: false },
        { title: 'BEATBOXING', desc: 'Musical drumming performance relying solely on vocal skills.', tag: 'MAIN FEST', img: 'https://images.unsplash.com/photo-1516280440502-628d613994ce?w=800&q=80', active: false }
    ];

    const filteredEvents = events.filter(evt => {
        const matchesSearch = evt.title.toLowerCase().includes(searchQuery.toLowerCase()) || evt.tag.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory =
            activeCategory === 'ALL EVENTS' ? true :
                activeCategory === 'PRE-FEST' ? evt.tag === 'PRE-EVENTS' :
                    evt.tag !== 'PRE-EVENTS';
        return matchesSearch && matchesCategory;
    });

    const handleRegister = (eventName) => {
        navigate(`/register?event=${encodeURIComponent(eventName || '')}`);
    };

    const nextSlide = () => setCurrentSlide((p) => (p + 1) % topEvents.length);
    const prevSlide = () => setCurrentSlide((p) => (p - 1 + topEvents.length) % topEvents.length);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            style={{ paddingBottom: '100px', width: '100%', maxWidth: '1200px', margin: '0 auto' }}
        >
            {/* HERO BANNER SECTION - Highlight Slider */}
            <div style={{
                position: 'relative', width: '100%', height: '600px', marginBottom: '60px', borderRadius: '24px', overflow: 'hidden',
                background: 'var(--bg-card)', padding: '24px', border: '1px solid rgba(255,255,255,0.05)', marginTop: '20px'
            }}>
                {/* Background Blur derived from active slide */}
                <div style={{
                    position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                    background: `url(${topEvents[currentSlide].img}) center/cover`, filter: 'blur(30px) brightness(30%)', zIndex: 0, transform: 'scale(1.1)', transition: 'background 0.5s ease'
                }} />

                <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>

                    {/* Top Slider Navigation */}
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginBottom: '20px' }}>
                        <button onClick={prevSlide} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', cursor: 'pointer', backdropFilter: 'blur(10px)' }}>
                            <ChevronLeft size={20} />
                        </button>
                        <button onClick={nextSlide} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', cursor: 'pointer', backdropFilter: 'blur(10px)' }}>
                            <ChevronRight size={20} />
                        </button>
                    </div>

                    <div style={{ display: 'flex', gap: '40px', alignItems: 'center', flex: 1 }}>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentSlide}
                                initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 30 }} transition={{ duration: 0.4 }}
                                style={{ width: '320px', height: '450px', borderRadius: '16px', backgroundImage: `url(${topEvents[currentSlide].img})`, backgroundSize: 'cover', backgroundPosition: 'center', border: '1px solid rgba(255,255,255,0.2)' }}
                                className="hidden md:block shadow-2xl"
                            />
                        </AnimatePresence>

                        <div style={{ flex: 1 }}>
                            <AnimatePresence mode="wait">
                                <motion.div key={currentSlide} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}>

                                    <h1 className="text-glow-yellow" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontFamily: 'var(--font-heading)', margin: 0, lineHeight: 1.1, color: '#fff', textTransform: 'uppercase' }}>
                                        {topEvents[currentSlide].title}
                                    </h1>

                                    <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.8)', marginTop: '20px', maxWidth: '600px', marginBottom: '40px', lineHeight: 1.5 }}>
                                        {topEvents[currentSlide].desc}
                                    </p>

                                    <motion.button
                                        initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}
                                        onClick={() => handleRegister(topEvents[currentSlide].title)}
                                        style={{
                                            backgroundColor: 'var(--yellow)',
                                            color: '#000',
                                            padding: '16px 40px',
                                            fontSize: '1.2rem',
                                            fontFamily: 'var(--font-heading)',
                                            fontWeight: 900,
                                            border: 'none',
                                            borderRadius: '12px',
                                            cursor: 'pointer',
                                            textTransform: 'uppercase',
                                            boxShadow: '0 10px 30px rgba(252, 238, 10, 0.4)',
                                            transition: 'all 0.3s'
                                        }}
                                        onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
                                        onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                                    >
                                        REGISTER
                                    </motion.button>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Slide Indicators */}
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '20px' }}>
                        {topEvents.map((_, idx) => (
                            <div key={idx} onClick={() => setCurrentSlide(idx)} style={{ width: idx === currentSlide ? '24px' : '8px', height: '8px', borderRadius: '4px', background: idx === currentSlide ? 'var(--yellow)' : 'rgba(255,255,255,0.3)', cursor: 'pointer', transition: 'all 0.3s' }} />
                        ))}
                    </div>
                </div>
            </div>

            {/* UPCOMING SHOWCASE - "Only in Theatres" style header */}
            <h2 style={{ fontSize: '2.5rem', marginBottom: '32px', letterSpacing: '2px', paddingLeft: '20px' }}>FESTIVAL LINEUP</h2>

            {/* Filter Chips */}
            <div style={{ display: 'flex', gap: '16px', marginBottom: '40px', flexWrap: 'wrap', paddingLeft: '20px' }}>
                {categories.map((c, i) => (
                    <button
                        key={i}
                        onClick={() => setActiveCategory(c)}
                        style={{
                            background: activeCategory === c ? 'var(--pink)' : 'transparent',
                            border: activeCategory === c ? 'none' : '1px solid rgba(255,255,255,0.2)',
                            color: '#fff',
                            padding: '10px 24px',
                            borderRadius: '30px',
                            fontWeight: '600',
                            fontSize: '0.9rem',
                            cursor: 'pointer',
                            transition: 'all 0.3s'
                        }}
                    >
                        {c}
                    </button>
                ))}

                <div style={{ marginLeft: 'auto', background: 'rgba(255,255,255,0.05)', borderRadius: '30px', padding: '8px 24px', display: 'flex', alignItems: 'center', border: '1px solid rgba(255,255,255,0.1)', marginRight: '20px' }}>
                    <input
                        type="text"
                        placeholder="Search events..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{ background: 'transparent', border: 'none', color: '#fff', outline: 'none', width: '200px', fontSize: '0.9rem', fontFamily: 'var(--font-text)' }}
                    />
                </div>
            </div>

            {/* Event Cards Grid */}
            <motion.div layout style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '24px', marginBottom: '80px', padding: '0 20px' }}>
                <AnimatePresence>
                    {filteredEvents.length > 0 ? filteredEvents.map((evt, i) => (
                        <motion.div
                            key={evt.title}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                            onClick={() => handleRegister(evt.title)}
                            className="card flex flex-col justify-end"
                            style={{
                                padding: 0,
                                border: evt.active ? '2px solid var(--cyan)' : '1px solid rgba(255,255,255,0.1)',
                                position: 'relative',
                                height: '380px',
                                cursor: 'pointer',
                                overflow: 'hidden',
                                borderRadius: '16px'
                            }}
                        >
                            <motion.div whileHover={{ scale: 1.05 }} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: `url(${evt.img}) center/cover`, zIndex: 0, filter: 'brightness(80%) grayscale(10%)', transition: 'all 0.4s' }}></motion.div>

                            <div style={{ position: 'absolute', bottom: '0', left: '0', zIndex: 1, width: '100%', padding: '24px', background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0) 100%)', transition: 'transform 0.3s' }}>
                                <div style={{ background: 'var(--pink)', color: '#fff', fontSize: '0.7rem', padding: '4px 10px', display: 'inline-block', fontWeight: 'bold', borderRadius: '4px', marginBottom: '10px', letterSpacing: '1px' }}>
                                    {evt.tag}
                                </div>
                                <div style={{ color: '#fff', fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.3rem', lineHeight: 1.2 }}>
                                    {evt.title}
                                </div>
                                <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', marginTop: '6px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                    {evt.desc}
                                </div>
                            </div>
                        </motion.div>
                    )) : (
                        <div style={{ padding: '60px', textAlign: 'center', gridColumn: '1 / -1' }}>
                            <h3 style={{ color: 'var(--text-muted)' }}>No events found matching your criteria.</h3>
                        </div>
                    )}
                </AnimatePresence>
            </motion.div>



        </motion.div>
    );
};

export default Events;
