import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

const CustomCursor = () => {
    const [visible, setVisible] = useState(false);
    const [clicking, setClicking] = useState(false);
    const [isMobile, setIsMobile] = useState(
        typeof window !== 'undefined' &&
        (window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768)
    );

    useEffect(() => {
        const checkMobile = () => setIsMobile(
            window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768
        );
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const cursorX = useMotionValue(-200);
    const cursorY = useMotionValue(-200);

    // Dot — nearly instant
    const dotX = useSpring(cursorX, { stiffness: 1000, damping: 50 });
    const dotY = useSpring(cursorY, { stiffness: 1000, damping: 50 });

    // Ring — lags behind nicely
    const ringX = useSpring(cursorX, { stiffness: 120, damping: 20 });
    const ringY = useSpring(cursorY, { stiffness: 120, damping: 20 });

    useEffect(() => {
        if (isMobile) return; // no custom cursor on touch devices

        const onMove = (e) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
            if (!visible) setVisible(true);
        };
        const onLeave = () => setVisible(false);
        const onEnter = () => setVisible(true);
        const onDown = () => setClicking(true);
        const onUp = () => setClicking(false);

        window.addEventListener('mousemove', onMove);
        document.addEventListener('mouseleave', onLeave);
        document.addEventListener('mouseenter', onEnter);
        window.addEventListener('mousedown', onDown);
        window.addEventListener('mouseup', onUp);

        return () => {
            window.removeEventListener('mousemove', onMove);
            document.removeEventListener('mouseleave', onLeave);
            document.removeEventListener('mouseenter', onEnter);
            window.removeEventListener('mousedown', onDown);
            window.removeEventListener('mouseup', onUp);
        };
    }, [isMobile]);

    if (isMobile) return null;

    return (
        <>
            {/* ── Inner dot ── */}
            <motion.div
                style={{
                    position: 'fixed',
                    top: 0, left: 0,
                    width: clicking ? 6 : 9,
                    height: clicking ? 6 : 9,
                    borderRadius: '50%',
                    background: '#f700ff',
                    boxShadow: '0 0 8px 2px rgba(247,0,255,0.9)',
                    zIndex: 999999,
                    pointerEvents: 'none',
                    x: dotX, y: dotY,
                    translateX: '-50%', translateY: '-50%',
                    opacity: visible ? 1 : 0,
                    transition: 'width 0.1s, height 0.1s, opacity 0.2s',
                }}
            />

            {/* ── Outer trailing ring ── */}
            <motion.div
                style={{
                    position: 'fixed',
                    top: 0, left: 0,
                    width: clicking ? 28 : 38,
                    height: clicking ? 28 : 38,
                    borderRadius: '50%',
                    border: `1.5px solid rgba(247,0,255,${clicking ? 0.9 : 0.55})`,
                    zIndex: 999998,
                    pointerEvents: 'none',
                    x: ringX, y: ringY,
                    translateX: '-50%', translateY: '-50%',
                    opacity: visible ? 1 : 0,
                    transition: 'width 0.15s, height 0.15s, opacity 0.2s, border-color 0.1s',
                }}
            />
        </>
    );
};

export default CustomCursor;
