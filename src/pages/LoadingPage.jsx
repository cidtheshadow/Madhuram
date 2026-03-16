import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const AudioVisualizer = ({ isMuted }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const size = 360; // Larger than container to let bars go outside
        canvas.width = size;
        canvas.height = size;

        const cx = size / 2;
        const cy = size / 2;
        const radius = 100; // Matches inner circle size roughly
        const barsCount = 120;
        const bpm = 142; // Die For You BPM
        const beatInterval = 60000 / bpm;

        // Generate pseudo-random phases for each bar
        const barPhases = Array.from({ length: barsCount }).map(() => Math.random() * Math.PI * 2);

        let animationId;
        const render = () => {
            ctx.clearRect(0, 0, size, size);

            const now = Date.now();
            const beatPhase = (now % beatInterval) / beatInterval;
            const kick = Math.pow(1 - beatPhase, 4); // sharp kick decay

            for (let i = 0; i < barsCount; i++) {
                const angle = (i / barsCount) * Math.PI * 2 - Math.PI / 2;

                // Color mapping: Top is Cyan, Bottom is Deep Blue/Purple
                const yFactor = Math.sin(angle);
                const normalizedY = (yFactor + 1) / 2; // 0 at top, 1 at bottom

                let h = 3;
                if (!isMuted) {
                    // Combine sine waves to create complex, flowing motion
                    const wave1 = Math.sin(i * 0.2 + now * 0.002 + barPhases[i]);
                    const wave2 = Math.sin(i * 0.8 - now * 0.005);
                    const wave3 = Math.cos(i * 0.05 + now * 0.001);

                    // Bass emphasis at the bottom half and left/right edges
                    const bassZone = (normalizedY > 0.6 || Math.abs(Math.cos(angle)) > 0.8) ? 1.5 : 0.5;

                    const reactivity = Math.max(0, wave1 + wave2 * 0.5 + wave3) * 15;
                    h = 4 + reactivity + (kick * 30 * bassZone * Math.max(0, wave1));
                }

                // Interpolate colors: Top: Cyan (#00f0ff), Bottom: Indigo/Purple (#6366f1)
                const r = Math.floor(0 + (99 - 0) * normalizedY);
                const g = Math.floor(240 + (102 - 240) * normalizedY);
                const b = Math.floor(255 + (241 - 255) * normalizedY);
                const color = `rgb(${r},${g},${b})`;

                // Bar geometry
                const cX1 = cx + Math.cos(angle) * (radius + 2);
                const cY1 = cy + Math.sin(angle) * (radius + 2);
                const cX2 = cx + Math.cos(angle) * (radius + 2 + h);
                const cY2 = cy + Math.sin(angle) * (radius + 2 + h);

                // Draw Bar
                ctx.beginPath();
                ctx.moveTo(cX1, cY1);
                ctx.lineTo(cX2, cY2);
                ctx.lineWidth = 4;
                ctx.strokeStyle = color;
                ctx.lineCap = 'round';
                ctx.shadowBlur = 15;
                ctx.shadowColor = color;
                ctx.stroke();

                // Draw Inner Dot (to mimic reference image)
                const dX = cx + Math.cos(angle) * (radius - 12);
                const dY = cy + Math.sin(angle) * (radius - 12);
                ctx.beginPath();
                ctx.arc(dX, dY, 2, 0, Math.PI * 2);
                ctx.fillStyle = color;
                ctx.shadowBlur = 8;
                ctx.fill();
            }

            animationId = requestAnimationFrame(render);
        };
        render();
        return () => cancelAnimationFrame(animationId);
    }, [isMuted]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'absolute',
                width: '360px',
                height: '360px',
                pointerEvents: 'none',
                filter: 'drop-shadow(0px 0px 10px rgba(0,240,255,0.4))'
            }}
        />
    );
};

const EventCountdown = () => {
    const targetDate = new Date('2026-04-10T00:00:00+05:30').getTime();
    const [timeLeft, setTimeLeft] = useState(targetDate - new Date().getTime());

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate - now;
            setTimeLeft(distance);
        }, 1000);

        return () => clearInterval(interval);
    }, [targetDate]);

    // If countdown is finished
    if (timeLeft <= 0) {
        return (
            <div style={{
                textAlign: 'center',
                zIndex: 10,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <div style={{
                    fontSize: '1rem',
                    color: 'var(--cyan)',
                    letterSpacing: '4px',
                    fontWeight: 800,
                    textShadow: '0 0 10px rgba(0,240,255,0.8)'
                }}>
                    AN EXPRESSION OF
                </div>
                <div style={{
                    fontSize: '1.4rem',
                    color: 'var(--pink)',
                    letterSpacing: '5px',
                    fontWeight: 900,
                    marginTop: '8px',
                    textShadow: '0 0 10px rgba(255,42,133,0.8)'
                }}>
                    EUPHORIA
                </div>
            </div>
        );
    }

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    const pad = (num) => num.toString().padStart(2, '0');

    return (
        <div style={{
            textAlign: 'center',
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'Montserrat, sans-serif'
        }}>
            <div style={{
                color: 'var(--cyan)',
                fontSize: '0.65rem',
                letterSpacing: '3px',
                marginBottom: '8px',
                fontWeight: 700,
                opacity: 0.8
            }}>
                INITIATING IN
            </div>

            <div style={{
                display: 'flex',
                gap: '8px',
                alignItems: 'baseline'
            }}>
                <div className="time-block" style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '2rem', fontWeight: 900, color: '#fff', textShadow: '0 0 10px rgba(255,255,255,0.5)' }}>{pad(days)}</div>
                    <div style={{ fontSize: '0.5rem', color: 'var(--pink)', letterSpacing: '2px', marginTop: '-4px' }}>DAYS</div>
                </div>
                <div style={{ fontSize: '1.5rem', color: 'var(--cyan)', fontWeight: 'bold', margin: '0 2px', textShadow: '0 0 10px var(--cyan)' }}>:</div>
                <div className="time-block" style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '2rem', fontWeight: 900, color: '#fff', textShadow: '0 0 10px rgba(255,255,255,0.5)' }}>{pad(hours)}</div>
                    <div style={{ fontSize: '0.5rem', color: 'var(--pink)', letterSpacing: '2px', marginTop: '-4px' }}>HRS</div>
                </div>
                <div style={{ fontSize: '1.5rem', color: 'var(--cyan)', fontWeight: 'bold', margin: '0 2px', textShadow: '0 0 10px var(--cyan)' }}>:</div>
                <div className="time-block" style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '2rem', fontWeight: 900, color: '#fff', textShadow: '0 0 10px rgba(255,255,255,0.5)' }}>{pad(minutes)}</div>
                    <div style={{ fontSize: '0.5rem', color: 'var(--pink)', letterSpacing: '2px', marginTop: '-4px' }}>MIN</div>
                </div>
                <div style={{ fontSize: '1.5rem', color: 'var(--cyan)', fontWeight: 'bold', margin: '0 2px', textShadow: '0 0 10px var(--cyan)' }}>:</div>
                <div className="time-block" style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '2rem', fontWeight: 900, color: '#fff', textShadow: '0 0 10px rgba(255,255,255,0.5)' }}>{pad(seconds)}</div>
                    <div style={{ fontSize: '0.5rem', color: 'var(--pink)', letterSpacing: '2px', marginTop: '-4px' }}>SEC</div>
                </div>
            </div>
        </div>
    );
};

const LoadingPage = ({ onEnter, isMuted, onToggleMute }) => {
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

            {/* Audio Controls */}
            <motion.button
                onClick={onToggleMute}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                    position: 'absolute',
                    top: '40px',
                    right: '40px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(10px)',
                    padding: '12px',
                    borderRadius: '50%',
                    color: isMuted ? 'var(--text-muted)' : 'var(--cyan)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    boxShadow: isMuted ? 'none' : '0 0 15px rgba(0,240,255,0.3)',
                }}
            >
                {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
            </motion.button>

            {/* Central Circle with Pulse and Visualizer */}
            <motion.div
                animate={{
                    scale: isMuted ? 1 : [1, 1.02, 1],
                    boxShadow: isMuted ? 'inset 0 0 20px rgba(0,0,0,0.5)' : [
                        'inset 0 0 20px rgba(0, 240, 255, 0.2)',
                        'inset 0 0 50px rgba(0, 240, 255, 0.4)',
                        'inset 0 0 20px rgba(0, 240, 255, 0.2)'
                    ]
                }}
                transition={{ duration: 0.49, repeat: Infinity, ease: "easeInOut" }}
                style={{
                    width: '240px',
                    height: '240px',
                    borderRadius: '50%',
                    border: '2px solid rgba(0, 240, 255, 0.4)',
                    background: 'rgba(0, 0, 0, 0.6)',
                    position: 'relative',
                    marginBottom: '80px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    style={{
                        position: 'absolute',
                        inset: 8,
                        borderRadius: '50%',
                        border: '1px dashed rgba(139, 92, 246, 0.5)'
                    }}
                />
                <EventCountdown />
                <AudioVisualizer isMuted={isMuted} />
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
                            <span>SYSTEM STATUS <span style={{ color: '#fff', marginLeft: '6px' }}>Syncing Audio Matrix</span></span>
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

            <div style={{ position: 'absolute', bottom: '40px', left: '40px', color: 'var(--cyan)', fontSize: '0.8rem', letterSpacing: '2px', fontWeight: 'bold' }}>
                TRACK: DIE FOR YOU (VALORANT)
            </div>
            <div style={{ position: 'absolute', bottom: '40px', right: '40px', color: 'var(--text-muted)', fontSize: '0.7rem', letterSpacing: '2px' }}>
                © 2026 RETRO_FUTURE_LABS
            </div>
        </div>
    );
};

export default LoadingPage;
