import { useEffect, useRef, useState } from 'react';

const STYLES = `
  body.transition-active { overflow: hidden; background: #000; }

  .loading-text-container {
    margin-top: 60px;
    font-family: 'Montserrat', sans-serif;
    text-align: center;
    color: #fff;
    z-index: 15;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .loading-percentage {
    font-size: 20px;
    font-weight: 700;
    font-style: italic;
    letter-spacing: 0.5px;
  }

  .loading-subtitle {
    font-size: 13px;
    font-weight: 700;
    font-style: italic;
    color: #aaa;
    letter-spacing: 0.5px;
  }
`;

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

        const DURATION = 2000; // ms
        const INTERVAL = 80;  // ms
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
                }, 800); // Wait on 100% for brief moment
            }
        }, INTERVAL);

        const safetyTimer = setTimeout(() => {
            if (!doneRef.current) {
                doneRef.current = true;
                clearInterval(timer);
                document.body.classList.remove('transition-active');
                onFinishRef.current();
            }
        }, 5000);

        return () => {
            clearInterval(timer);
            clearTimeout(safetyTimer);
            document.body.classList.remove('transition-active');
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // No grayscale washing
    // Starts blocky and pixelated, becoming sharp and glowing around 50%
    const alphaShadow = Math.max(0, (progress - 30) / 70); // Glow kicks in after 30%
    const opacity = progress < 70 ? 0.3 + (0.7 * (progress / 70)) : 1;
    
    // Pixel size shrinks from 30 down to 1 over the course of progress
    // Wait until progress reaches 80% to be completely crisp
    const pixelSize = Math.max(1, Math.floor(30 - (progress * 0.38)));

    return (
        <div style={{
            position: 'fixed', inset: 0, zIndex: 100000,
            background: '#000',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            overflow: 'hidden'
        }}>
            <style>{STYLES}</style>

            {/* Pixelate filter — Disabled on mobile/Safari for performance optimization */}
            {!isMobile && (
                <svg style={{ position: 'absolute', width: 0, height: 0 }}>
                    <filter id="pixelate" x="-20%" y="-20%" width="140%" height="140%">
                        {pixelSize > 1 && (
                            <>
                                <feFlood x={Math.floor(pixelSize / 2)} y={Math.floor(pixelSize / 2)} height="1" width="1" />
                                <feComposite width={pixelSize} height={pixelSize} />
                                <feTile result="a" />
                                <feComposite in="SourceGraphic" in2="a" operator="in" />
                                <feMorphology operator="dilate" radius={Math.ceil(pixelSize / 2)} />
                            </>
                        )}
                    </filter>
                </svg>
            )}

            <div style={{ position: 'relative', zIndex: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <img
                    src="/madhuram-logo.png"
                    alt="MADHURAM 26"
                    style={{
                        width: isMobile ? 220 : 350,
                        height: 'auto',
                        filter: `hue-rotate(310deg) brightness(1.2) drop-shadow(0 0 20px rgba(247,0,255,${alphaShadow})) ${(!isMobile && pixelSize > 1) ? 'url(#pixelate)' : ''}`,
                        opacity: opacity,
                        transition: 'opacity 0.1s linear'
                    }}
                />

                <div className="loading-text-container">
                    <div className="loading-percentage" style={{ color: `rgba(255,255,255, ${opacity})` }}>
                        {Math.floor(progress)}%
                    </div>
                    <div className="loading-subtitle">
                        Loading the Madhuram Experience...
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoadingPage;
