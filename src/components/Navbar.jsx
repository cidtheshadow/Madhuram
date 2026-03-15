import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = () => {
    const location = useLocation();

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Events', path: '/events' },
        { name: 'Sponsors', path: '/sponsors' },
        { name: 'Team', path: '/team' },
        { name: 'About Us', path: '/about' },
    ];

    return (
        <motion.nav
            className="navbar"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            <Link to="/" className="logo-container" style={{ textDecoration: 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{
                        fontFamily: 'var(--font-logo)',
                        fontSize: '2rem',
                        fontWeight: '900',
                        color: '#fff',
                        textShadow: '0 0 10px rgba(255, 255, 255, 0.3)'
                    }}>
                        MADHURAM<span style={{ color: 'var(--pink)' }}>'26</span>
                    </div>
                </div>
            </Link>

            <ul className="nav-links">
                {navLinks.map((link) => {
                    const isActive = location.pathname === link.path || (link.path === '/about' && location.pathname === '/about');
                    return (
                        <li key={link.name}>
                            <Link
                                to={link.path}
                                className={`nav-link ${isActive ? 'active' : ''}`}
                                style={{
                                    borderBottom: isActive ? '2px solid var(--pink)' : '2px solid transparent',
                                    paddingBottom: '4px'
                                }}
                            >
                                {link.name}
                            </Link>
                        </li>
                    );
                })}
            </ul>

            {location.pathname === '/sponsors' && (
                <a href="mailto:contact@madhuram26.com" className="btn-primary" style={{ padding: '8px 20px', fontSize: '0.9rem' }}>
                    Partner With Us
                </a>
            )}
        </motion.nav>
    );
};

export default Navbar;
