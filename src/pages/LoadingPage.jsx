import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const LoadingPage = ({ onEnter }) => {
    const [ready, setReady] = useState(false);
    const [loadingText, setLoadingText] = useState('INITIALIZING MOOD_STREAM...');

    useEffect(() => {
        // Dynamic loading log
        const texts = [
            'CALIBRATING NEON_FLUX_CORE...',
            'SYNCHRONIZING AUDIO_VIBE_MATRIX...',
            'UPLOADING ETHEREAL_CONSTRUCT...',
            'SYSTEM_READY // AWAITING USER INPUT'
        ];
        let i = 0;
        const textInterval = setInterval(() => {
            if (i < texts.length) {
                setLoadingText(texts[i]);
                i++;
            }
        }, 800);

        // Extended timeout to truly vibe with the drop
        const timer = setTimeout(() => {
            setReady(true);
        }, 4200);

        return () => {
            clearTimeout(timer);
            clearInterval(textInterval);
        };
    }, []);

    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            background: 'linear-gradient(rgba(18, 9, 33, 0.85), rgba(18, 9, 33, 0.95)), linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url("https://i.ibb.co/PsYq7N55/Untitled-design-4.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            fontFamily: 'var(--font-heading)',
        }}>
            {/* Central Circle with Pulse and Waveform */}
            <motion.div
                animate={{
                    scale: [1, 1.05, 1],
                    boxShadow: [
                        '0 0 10px rgba(255, 42, 133, 0.2)',
                        '0 0 40px rgba(0, 240, 255, 0.4)',
                        '0 0 10px rgba(255, 42, 133, 0.2)'
                    ]
                }}
                transition={{ duration: 0.49, repeat: Infinity, ease: "easeInOut" }}
                style={{
                    width: '220px',
                    height: '220px',
                    borderRadius: '50%',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    background: 'radial-gradient(circle at center, rgba(0, 240, 255, 0.05) 0%, rgba(255, 42, 133, 0.1) 100%)',
                    position: 'relative',
                    marginBottom: '60px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                {/* Beating Heart / ECG Waveform */}
                <div style={{ width: '120px', height: '40px', overflow: 'hidden', position: 'relative' }}>
                    <motion.svg 
                        viewBox="0 0 200 100" 
                        preserveAspectRatio="none"
                        style={{ width: '200%', height: '100%', position: 'absolute', left: 0 }}
                        animate={{ x: ['0%', '-50%'] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    >
                        <path 
                            d="M 0 50 L 20 50 L 30 20 L 40 80 L 50 50 L 100 50 L 120 50 L 130 20 L 140 80 L 150 50 L 200 50" 
                            fill="transparent" 
                            stroke="var(--pink)" 
                            strokeWidth="4" 
                            strokeLinejoin="round"
                            style={{ filter: 'drop-shadow(0 0 8px rgba(255,42,133,0.8))' }}
                        />
                    </motion.svg>
                </div>
            </motion.div>

            {/* Title block */}
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                style={{
                    background: 'var(--pink)',
                    padding: '10px 40px',
                    transform: 'skewX(-15deg)',
                    display: 'inline-block',
                    marginBottom: '24px'
                }}
            >
                <h1 style={{
                    transform: 'skewX(15deg)',
                    color: 'var(--yellow)',
                    margin: 0,
                    fontSize: '3rem',
                    letterSpacing: '4px',
                    textShadow: '2px 2px 0px #000'
                }}>
                    मधुरम् '26
                </h1>
            </motion.div>

            <AnimatePresence mode="wait">
                {!ready ? (
                    <motion.div key="loading" exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }} style={{ width: '400px', maxWidth: '80vw', textAlign: 'center' }}>
                        <motion.div
                            key={loadingText}
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: [0.5, 1, 0.5], y: 0 }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            style={{
                                color: 'var(--cyan)',
                                letterSpacing: '4px',
                                marginBottom: '20px',
                                fontSize: '1rem',
                                fontWeight: '700'
                            }}
                        >
                            {loadingText}
                        </motion.div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', color: 'var(--pink)', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '1px' }}>
                            <span>SYSTEM STATUS <span style={{ color: '#fff', marginLeft: '6px' }}>Syncing Neon Pulse</span></span>
                            <span style={{ color: 'var(--cyan)', fontSize: '1rem', fontWeight: 800 }}>100%</span>
                        </div>
                        <div style={{ height: '4px', background: '#331a52', borderRadius: '4px', overflow: 'hidden' }}>
                            <motion.div
                                initial={{ width: '0%' }}
                                animate={{ width: '100%' }}
                                transition={{ duration: 4.0, ease: "easeOut" }}
                                style={{
                                    height: '100%',
                                    background: 'linear-gradient(90deg, var(--pink), var(--cyan))',
                                    boxShadow: '0 0 10px var(--cyan)'
                                }}
                            />
                        </div>
                    </motion.div>
                ) : (
                    <motion.div key="ready" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                        <button
                            onClick={onEnter}
                            className="btn-primary"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '12px',
                                padding: '16px 40px',
                                fontSize: '1.2rem',
                                letterSpacing: '2px',
                                background: 'var(--pink)',
                                color: 'var(--yellow)',
                                fontWeight: 900,
                                outline: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                borderRadius: '4px',
                                transform: 'skewX(-10deg)',
                                textShadow: '1px 1px 0 #000',
                                boxShadow: '0 0 30px rgba(247,0,255,0.4)',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            ENTER THE WORLD <span style={{ fontSize: '1.5rem', color: '#fff' }}>⚡</span>
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            <div style={{ position: 'absolute', bottom: '40px', left: '40px', color: 'var(--pink)', fontSize: '0.7rem', letterSpacing: '2px' }}>
                ERROR_CODE: 0XVAPORWAVE
            </div>
            <div style={{ position: 'absolute', bottom: '40px', right: '40px', color: 'var(--text-muted)', fontSize: '0.7rem', letterSpacing: '2px' }}>
                © 2026 RETRO_FUTURE_LABS
            </div>
        </div>
    );
};

export default LoadingPage;
