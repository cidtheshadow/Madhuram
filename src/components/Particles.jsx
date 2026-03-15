import { useEffect, useRef } from 'react';

const Particles = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        const particlesArray = [];
        // Vastly reduced count for incredible performance, replacing with massive organic blobs
        const numberOfParticles = 15;

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                // Massive sizes for the organic fluid blob look 
                this.size = Math.random() * 80 + 40;
                // Very slow, dreamy floating speeds
                this.speedX = (Math.random() * 1 - 0.5) * 0.5;
                this.speedY = (Math.random() * 1 - 0.5) * 0.5;

                // Deep Mood Indigo style cyans, pinks, and ultra-deep purples
                const colors = [
                    'rgba(0, 240, 255, 0.4)',
                    'rgba(255, 42, 133, 0.4)',
                    'rgba(140, 0, 255, 0.3)'
                ];
                this.color = colors[Math.floor(Math.random() * colors.length)];
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                // Wrap around edges natively instead of bouncing
                if (this.x > canvas.width + this.size) this.x = -this.size;
                if (this.x < -this.size) this.x = canvas.width + this.size;
                if (this.y > canvas.height + this.size) this.y = -this.size;
                if (this.y < -this.size) this.y = canvas.height + this.size;
            }

            draw() {
                // Create gorgeous radial gradients per blob
                const gradient = ctx.createRadialGradient(
                    this.x, this.y, 0,
                    this.x, this.y, this.size
                );
                // Core is brighter, edges fade out softly
                gradient.addColorStop(0, this.color);
                gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const init = () => {
            for (let i = 0; i < numberOfParticles; i++) {
                particlesArray.push(new Particle());
            }
        };

        const animate = () => {
            // Hard clear for max performance (no trails needed for diffuse blobs)
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
                particlesArray[i].draw();
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        init();
        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: -1,
                mixBlendMode: 'screen', // Gives it that incredible glowing liquid overlay
                filter: 'blur(30px)' // Massive CSS blur to make them perfectly organic and fluid
            }}
        />
    );
};

export default Particles;
