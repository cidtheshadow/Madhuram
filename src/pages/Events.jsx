import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const Events = () => {
    const categories = ['ALL EVENTS', 'PRE-FEST', 'MAIN FEST'];
    const [activeCategory, setActiveCategory] = useState('ALL EVENTS');
    const [searchQuery, setSearchQuery] = useState('');

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

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            style={{ paddingBottom: '100px' }}
        >
            <div style={{ display: 'flex', gap: '16px', marginBottom: '40px', background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '12px', flexWrap: 'wrap' }}>
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
                            fontWeight: 'bold',
                            fontSize: '0.9rem',
                            cursor: 'pointer',
                            transition: 'all 0.3s'
                        }}
                    >
                        {c}
                    </button>
                ))}

                <div style={{ marginLeft: 'auto', background: 'rgba(255,255,255,0.05)', borderRadius: '30px', padding: '8px 24px', display: 'flex', alignItems: 'center', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <input
                        type="text"
                        placeholder="Search events..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{ background: 'transparent', border: 'none', color: '#fff', outline: 'none', width: '200px', fontSize: '0.9rem' }}
                    />
                </div>
            </div>

            <motion.div layout style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '24px' }}>
                <AnimatePresence>
                    {filteredEvents.length > 0 ? filteredEvents.map((evt, i) => (
                        <motion.div
                            key={evt.title}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                            whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(255,0,255,0.2)' }}
                            className="card flex flex-col justify-end"
                            style={{
                                padding: 0,
                                border: evt.active ? '2px solid var(--cyan)' : '1px solid rgba(255,255,255,0.1)',
                                position: 'relative',
                                height: '350px',
                                cursor: 'pointer',
                                overflow: 'hidden'
                            }}
                        >
                            <motion.div whileHover={{ scale: 1.1 }} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: `url(${evt.img}) center/cover`, zIndex: 0, filter: 'brightness(60%) grayscale(20%)', transition: 'all 0.4s' }}></motion.div>

                            <div style={{ position: 'absolute', bottom: '20px', left: '20px', zIndex: 1, width: 'calc(100% - 40px)', transition: 'transform 0.3s' }}>
                                <div style={{ background: 'var(--pink)', color: '#fff', fontSize: '0.7rem', padding: '4px 12px', display: 'inline-block', fontWeight: 'bold', borderRadius: '2px', marginBottom: '8px', fontFamily: 'var(--font-sub)' }}>
                                    {evt.tag}
                                </div>
                                <div style={{ background: 'rgba(255,255,255,0.95)', color: '#000', padding: '12px', fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '1rem', transform: 'skewX(-10deg)', display: 'inline-block', width: '100%', borderLeft: '4px solid var(--pink)' }}>
                                    {evt.title}
                                </div>
                            </div>
                        </motion.div>
                    )) : (
                        <div style={{ padding: '60px', textAlign: 'center', gridColumn: 'span 4' }}>
                            <h3 style={{ color: 'var(--text-muted)' }}>No events found matching your criteria.</h3>
                        </div>
                    )}
                </AnimatePresence>
            </motion.div>

            <div style={{ textAlign: 'center', marginTop: '60px' }}>
                <div style={{ width: '40px', height: '40px', border: '3px solid var(--pink)', borderTopColor: 'transparent', borderRadius: '50%', margin: '0 auto 16px', animation: 'spin 1s linear infinite' }}></div>
                <div style={{ color: 'var(--pink)', fontFamily: 'var(--font-heading)', fontWeight: 'bold', letterSpacing: '2px' }}>LOADING MORE VIBES...</div>
            </div>

            <style>{`
         @keyframes spin { 100% { transform: rotate(360deg); } }
      `}</style>
        </motion.div>
    );
};

export default Events;
