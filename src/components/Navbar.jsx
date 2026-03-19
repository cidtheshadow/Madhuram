import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const NAV_H_DESKTOP = 68; // px — keep in sync with App.jsx paddingTop
const NAV_H_MOBILE = 60;

const Navbar = ({ setExternalMenuState }) => {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

    useEffect(() => {
        if (setExternalMenuState) setExternalMenuState(isOpen);
    }, [isOpen, setExternalMenuState]);

    useEffect(() => {
        const onResize = () => {
            setIsMobile(window.innerWidth < 1024);
            if (window.innerWidth >= 1024) setIsOpen(false);
        };
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('resize', onResize);
        window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('resize', onResize);
            window.removeEventListener('scroll', onScroll);
        };
    }, []);

    const leftLinks = [
        { name: 'HOME', path: '/' },
        { name: 'EVENTS', path: '/events' },
        { name: 'SPONSORS', path: '/sponsors' },
    ];
    const rightLinks = [
        { name: 'TEAM', path: '/team' },
        { name: 'ABOUT', path: '/about' },
        { name: 'REGISTER', path: '/register', pill: true },
    ];

    const closeMenu = () => setIsOpen(false);

    return (
        <>
            <style>{`
                @keyframes glitch-nav {
                    0%,100% { text-shadow: 2px 0 rgba(0,240,255,0.8), -2px 0 rgba(247,0,255,0.8); }
                    25%     { text-shadow: -3px 0 rgba(0,240,255,0.9),  3px 0 rgba(247,0,255,0.9); }
                    50%     { text-shadow:  3px 0 rgba(247,0,255,0.9), -3px 0 rgba(0,240,255,0.9); }
                    75%     { text-shadow: -2px 0 rgba(247,0,255,0.8),  2px 0 rgba(0,240,255,0.8); }
                }
                .nav-pill-link {
                    font-family: 'Montserrat', sans-serif;
                    font-size: 0.7rem;
                    font-weight: 700;
                    letter-spacing: 2px;
                    text-transform: uppercase;
                    text-decoration: none;
                    color: rgba(247, 0, 255, 0.80);
                    padding: 4px 0;
                    position: relative;
                    transition: color 0.15s;
                    white-space: nowrap;
                }
                .nav-pill-link::after {
                    content: '';
                    position: absolute;
                    bottom: -2px; left: 50%; right: 50%;
                    height: 1.5px;
                    background: #f700ff;
                    transition: left 0.25s ease, right 0.25s ease;
                }
                .nav-pill-link:hover,
                .nav-pill-link.active { color: #f700ff; }
                .nav-pill-link:hover {
                    animation: glitch-nav 0.35s steps(1) infinite;
                }
                .nav-pill-link:hover::after,
                .nav-pill-link.active::after { left: 0; right: 0; }
            `}</style>

            {/* ── NAVBAR ── */}
            <nav
                style={{
                    position: 'fixed',
                    top: 0, left: 0, right: 0,
                    zIndex: 9999,
                    height: isMobile ? `${NAV_H_MOBILE}px` : `${NAV_H_DESKTOP}px`,
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr auto 1fr' : '1fr auto 1fr',
                    alignItems: 'center',
                    padding: isMobile ? '0 18px' : '0 4%',
                    background: scrolled
                        ? 'rgba(12, 2, 24, 0.85)'
                        : location.pathname === '/'
                            ? 'transparent'
                            : 'rgba(12, 2, 24, 0.30)',
                    backdropFilter: scrolled ? 'blur(18px)' : 'none',
                    WebkitBackdropFilter: scrolled ? 'blur(18px)' : 'none',
                    borderBottom: scrolled
                        ? '1px solid rgba(247,0,255,0.25)'
                        : 'none',
                    boxShadow: scrolled ? '0 4px 32px rgba(247,0,255,0.08)' : 'none',
                    transition: 'background 0.35s, border-bottom 0.35s, box-shadow 0.35s',
                }}
            >
                {/* ── COL 1: LEFT LINKS / mobile logo ── */}
                {isMobile ? (
                    /* On mobile col-1 is empty — logo is col-2, hamburger is col-3 */
                    <div />
                ) : (
                    <ul style={{
                        display: 'flex',
                        gap: '32px',
                        listStyle: 'none', margin: 0, padding: 0,
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        paddingRight: '48px',
                    }}>
                        {leftLinks.map(link => {
                            const active = location.pathname === link.path;
                            return (
                                <li key={link.name}>
                                    <Link to={link.path} className={`nav-pill-link${active ? ' active' : ''}`}>
                                        {link.name}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                )}

                {/* ── COL 2: CENTERED LOGO ── */}
                <Link to="/" onClick={closeMenu} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img
                        src="/madhuram-logo.png"
                        alt="MADHURAM'26"
                        style={{
                            height: isMobile ? '38px' : '50px',
                            width: 'auto',
                            // hue-rotate(310deg): red(0°) → magenta-pink(310°), cyan stays ~cyan (180°+310°=490°→130° ≈ cyan-green, close enough)
                            filter: 'hue-rotate(310deg) saturate(1.3) drop-shadow(0 0 6px rgba(0,240,255,0.7)) drop-shadow(0 0 2px rgba(247,0,255,0.5))',
                            transition: 'filter 0.3s, transform 0.3s',
                        }}
                        onMouseEnter={e => { e.target.style.filter = 'hue-rotate(310deg) saturate(1.5) drop-shadow(0 0 14px rgba(0,240,255,1)) drop-shadow(0 0 6px rgba(247,0,255,0.8))'; e.target.style.transform = 'scale(1.06)'; }}
                        onMouseLeave={e => { e.target.style.filter = 'hue-rotate(310deg) saturate(1.3) drop-shadow(0 0 6px rgba(0,240,255,0.7)) drop-shadow(0 0 2px rgba(247,0,255,0.5))'; e.target.style.transform = 'scale(1)'; }}
                        onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }}
                    />
                    <span style={{ display: 'none', fontFamily: '"Mystery Quest",system-ui', fontSize: '1.5rem', color: '#f700ff', textShadow: '0 0 20px rgba(247,0,255,0.8)' }}>
                        mADHURAM
                    </span>
                </Link>

                {/* ── COL 3: RIGHT LINKS / hamburger ── */}
                {isMobile ? (
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            style={{
                                background: 'none',
                                border: '1.5px solid rgba(247,0,255,0.55)',
                                color: '#f700ff',
                                cursor: 'pointer', padding: '5px',
                                borderRadius: '4px',
                                display: 'flex', alignItems: 'center',
                            }}
                        >
                            {isOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                ) : (
                    <ul style={{
                        display: 'flex',
                        gap: '32px',
                        listStyle: 'none', margin: 0, padding: 0,
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        paddingLeft: '48px',
                    }}>
                        {rightLinks.map(link => {
                            const active = location.pathname === link.path;
                            if (link.pill) return (
                                <li key={link.name}>
                                    <Link
                                        to={link.path}
                                        style={{
                                            fontFamily: 'Montserrat, sans-serif',
                                            fontSize: '0.68rem',
                                            fontWeight: 900,
                                            letterSpacing: '2px',
                                            textTransform: 'uppercase',
                                            textDecoration: 'none',
                                            color: '#fff',
                                            background: 'transparent',
                                            border: '1.5px solid #f700ff',
                                            padding: '6px 18px',
                                            borderRadius: '4px',
                                            display: 'inline-block',
                                            transition: 'background 0.2s, color 0.2s, transform 0.15s',
                                            whiteSpace: 'nowrap',
                                        }}
                                        onMouseEnter={e => { e.currentTarget.style.background = '#f700ff'; e.currentTarget.style.color = '#000'; e.currentTarget.style.transform = 'scale(1.05)'; }}
                                        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.transform = 'scale(1)'; }}
                                    >
                                        REGISTER
                                    </Link>
                                </li>
                            );
                            return (
                                <li key={link.name}>
                                    <Link to={link.path} className={`nav-pill-link${active ? ' active' : ''}`}>
                                        {link.name}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                )}
            </nav>

            {/* ── MOBILE MENU ── */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                        style={{
                            position: 'fixed',
                            top: `${NAV_H_MOBILE}px`, left: 0, right: 0, bottom: 0,
                            background: 'rgba(8, 0, 20, 0.97)',
                            backdropFilter: 'blur(24px)',
                            display: 'flex', flexDirection: 'column',
                            alignItems: 'center', justifyContent: 'center',
                            gap: '6px', zIndex: 1999,
                        }}
                    >
                        {[...leftLinks, ...rightLinks].map((link, i) => {
                            const active = location.pathname === link.path;
                            return (
                                <motion.div key={link.name}
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.07 }}
                                >
                                    <Link
                                        to={link.path}
                                        onClick={closeMenu}
                                        style={{
                                            fontFamily: 'Montserrat, sans-serif',
                                            fontSize: '1rem',
                                            fontWeight: 800,
                                            letterSpacing: '4px',
                                            textDecoration: 'none',
                                            textTransform: 'uppercase',
                                            display: 'block',
                                            textAlign: 'center',
                                            padding: '13px 50px',
                                            color: active ? '#f700ff' : 'rgba(255,255,255,0.85)',
                                            borderBottom: active ? '1.5px solid #f700ff' : '1.5px solid transparent',
                                            ...(link.pill ? {
                                                marginTop: '20px',
                                                color: '#000',
                                                background: '#f700ff',
                                                borderRadius: '6px',
                                                border: 'none',
                                                padding: '13px 50px',
                                            } : {}),
                                        }}
                                    >
                                        {link.name}
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
