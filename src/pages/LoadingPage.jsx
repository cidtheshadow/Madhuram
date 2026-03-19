import { useEffect, useRef, useState } from 'react';

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');

  body.transition-active { overflow: hidden; }

  @keyframes tr-scan { 0%{top:-4px} 100%{top:calc(100% + 4px)} }
  @keyframes tr-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-15px)} }

  .tr-font { font-family:'VT323',monospace; }
  .tr-logo { animation: tr-float 3s ease-in-out infinite; }

  .tr-grid {
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 40%;
    background:
      linear-gradient(to bottom, transparent 0%, rgba(147,0,255,.15) 100%),
      repeating-linear-gradient(
        to right,
        transparent 0px, transparent calc(8vw - 1px), rgba(147,0,255,.5) calc(8vw - 1px), rgba(147,0,255,.5) calc(8vw)
      );
    transform: perspective(500px) rotateX(45deg);
    transform-origin: bottom center;
    pointer-events: none;
  }
  .tr-grid::after {
    content:'';
    position:absolute;inset:0;
    background:
      repeating-linear-gradient(
        to bottom,
        transparent 0px, transparent 50px,
        rgba(147,0,255,.4) 50px, rgba(147,0,255,.4) 51px
      );
  }

  .tr-halftone {
    position: absolute; inset: 0; pointer-events: none; z-index: 1;
    background-image: radial-gradient(circle, rgba(147,0,255,.08) 1.2px, transparent 1.2px);
    background-size: 20px 20px;
  }

  .tr-bar-track {
    height: 6px;
    background: rgba(147,0,255,0.15);
    border-radius: 3px;
    margin-top: 40px;
    position: relative;
    overflow: hidden;
  }
  .tr-bar-fill {
    height: 100%;
    background: linear-gradient(90deg, #6600cc, #9900ff, #cc44ff);
    box-shadow: 0 0 20px rgba(147,0,255,0.8);
    border-radius: 3px;
    transition: width 0.05s linear;
  }
`;

const RetroBG = () => {
    const ref = useRef(null);
    useEffect(() => {
        const c = ref.current;
        if (!c) return;
        const ctx = c.getContext('2d');
        const resize = () => { c.width = window.innerWidth; c.height = window.innerHeight; };
        resize();
        window.addEventListener('resize', resize);

        const stars = Array.from({ length: 150 }, () => ({
            x: Math.random(), y: Math.random(),
            r: Math.random() * 1.5 + 0.5,
            blink: Math.random() * Math.PI * 2
        }));

        let id;
        const draw = () => {
            ctx.clearRect(0, 0, c.width, c.height);
            const t = Date.now() * 0.001;
            stars.forEach(s => {
                const a = 0.3 + 0.7 * Math.abs(Math.sin(t + s.blink));
                ctx.globalAlpha = a * 0.5;
                ctx.fillStyle = '#fff';
                ctx.beginPath();
                ctx.arc(s.x * c.width, s.y * c.height * 0.7, s.r, 0, Math.PI * 2);
                ctx.fill();
            });
            ctx.globalAlpha = 1;
            id = requestAnimationFrame(draw);
        };
        draw();
        return () => { cancelAnimationFrame(id); window.removeEventListener('resize', resize); };
    }, []);
    return <canvas ref={ref} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} />;
};

const LoadingPage = ({ onFinish }) => {
    const [progress, setProgress] = useState(0);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
    const onFinishRef = useRef(onFinish);
    onFinishRef.current = onFinish;
    const doneRef = useRef(false);

    useEffect(() => {
        document.body.classList.add('transition-active');
        const handleResize = () => setIsMobile(window.innerWidth < 1024);
        window.addEventListener('resize', handleResize);

        const DURATION = 3000; // ms
        const INTERVAL = 30;  // ms
        const STEPS = DURATION / INTERVAL;
        let current = 0;

        const timer = setInterval(() => {
            current += 1;
            const pct = Math.min((current / STEPS) * 100, 100);
            setProgress(pct);

            if (current >= STEPS && !doneRef.current) {
                doneRef.current = true;
                clearInterval(timer);
                setTimeout(() => {
                    document.body.classList.remove('transition-active');
                    onFinishRef.current();
                }, 600);
            }
        }, INTERVAL);

        // Safety net: never stay stuck longer than 6 seconds
        const safetyTimer = setTimeout(() => {
            if (!doneRef.current) {
                doneRef.current = true;
                clearInterval(timer);
                document.body.classList.remove('transition-active');
                onFinishRef.current();
            }
        }, 6000);

        return () => {
            clearInterval(timer);
            clearTimeout(safetyTimer);
            document.body.classList.remove('transition-active');
            window.removeEventListener('resize', handleResize);
        };
    }, []); // run once only

    // grayscale goes from 100 → 0 as progress goes 0 → 100
    const gray = Math.round(100 - progress);
    // purple glow intensity
    const glowPx = Math.round(progress / 4);
    const glowAlpha = (progress / 100).toFixed(2);

    return (
        <div style={{
            position: 'fixed', inset: 0, zIndex: 10000,
            background: '#07000f',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            overflow: 'hidden'
        }}>
            <style>{STYLES}</style>

            <RetroBG />
            <div className="tr-halftone" />
            <div className="tr-grid" />

            {/* CRT scanlines */}
            <div style={{
                position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
                backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.15) 0px, rgba(0,0,0,0.15) 1px, transparent 1px, transparent 4px)',
            }} />

            {/* Scan line sweep */}
            <div style={{
                position: 'absolute', left: 0, right: 0, height: '3px', zIndex: 3, pointerEvents: 'none',
                background: 'linear-gradient(90deg, transparent, rgba(147,0,255,0.5), transparent)',
                animation: 'tr-scan 3s linear infinite',
            }} />

            {/* Main Content */}
            <div style={{ position: 'relative', zIndex: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>

                {/* Logo — grayscale → purple colour transition */}
                <img
                    src="/madhuram-logo.png"
                    alt="MADHURAM 26"
                    className="tr-logo"
                    style={{
                        width: isMobile ? 240 : 420,
                        height: 'auto',
                        imageRendering: 'crisp-edges',
                        filter: `hue-rotate(310deg) grayscale(${gray}%) drop-shadow(0 0 ${glowPx}px rgba(247,0,255,${glowAlpha}))`,
                        opacity: progress < 5 ? progress / 5 : 1,
                        transition: 'filter 0.05s linear, opacity 0.3s linear',
                    }}
                />

                {/* Progress bar */}
                <div className="tr-bar-track" style={{ width: isMobile ? 220 : 360 }}>
                    <div className="tr-bar-fill" style={{ width: `${progress}%` }} />
                </div>

                {/* Percentage label */}
                <div className="tr-font" style={{
                    color: `rgba(180,100,255,${0.3 + (progress / 100) * 0.7})`,
                    fontSize: '1.1rem',
                    letterSpacing: '5px',
                    marginTop: '14px',
                }}>
                    {progress < 100 ? `LOADING... ${Math.floor(progress)}%` : 'ENTERING MADHURAM'}
                </div>
            </div>
        </div>
    );
};

export default LoadingPage;
