import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Send, CheckCircle2 } from 'lucide-react';

const Footer = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
    const [email, setEmail] = useState('');
    const [newsStatus, setNewsStatus] = useState('idle');
    const [showSecret, setShowSecret] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 1024);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleNewsletterSubmit = async (e) => {
        e.preventDefault();
        if (!email) return;
        setNewsStatus('loading');

        try {
            const { error } = await supabase.from('newsletters').insert([{ email }]);
            if (error) throw error;
            setNewsStatus('success');
            setEmail('');
            setTimeout(() => setNewsStatus('idle'), 5000);
        } catch (err) {
            console.error('Newsletter error:', err);
            setNewsStatus('error');
        }
    };

    return (
        <footer style={{
            marginTop: '100px',
            background: 'rgba(10, 5, 20, 0.95)',
            padding: isMobile ? '60px 6vw' : '80px 10vw',
            borderTop: '1px solid rgba(247, 0, 255, 0.2)',
            fontFamily: 'Montserrat, sans-serif'
        }}>
            <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr 1.5fr',
                gap: isMobile ? '40px' : '60px',
                alignItems: 'start'
            }}>

                {/* ── Brand ── */}
                <div>
                    <div style={{ background: 'var(--pink)', color: '#fff', padding: '8px 24px', display: 'inline-block', fontWeight: 900, fontSize: '1.8rem', marginBottom: '24px', letterSpacing: '2px' }}>
                        मधुरम् '26
                    </div>
                    <p style={{ color: 'var(--text-muted)', maxWidth: '450px', lineHeight: 1.8, fontSize: '1rem' }}>
                        The cultural pulse of SLIET Longowal. A legacy of artistic excellence and technical innovation since 1989.
                    </p>
                    <div style={{ display: 'flex', gap: '16px', marginTop: '30px' }}>
                        <a
                            href="https://www.instagram.com/madhuramsliet/?hl=en"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ width: '44px', height: '44px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--pink)', textDecoration: 'none', transition: '0.3s', background: 'rgba(255,255,255,0.02)' }}
                            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--pink)'; e.currentTarget.style.background = 'rgba(247,0,255,0.08)'; }}
                            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; }}
                        >
                            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.166.054 1.791.249 2.212.412.557.217.954.476 1.373.895.419.419.678.816.895 1.373.163.421.358 1.046.412 2.212.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.054 1.166-.249 1.791-.412 2.212-.217.557-.476.954-.895 1.373-.419.419-.816.678-1.373.895-.421.163-1.046.358-2.212.412-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.166-.054-1.791-.249-2.212-.412-.557-.217-.954-.476-1.373-.895-.419-.419-.678-.816-.895-1.373-.163-.421-.358-1.046-.412-2.212C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.054-1.166.249-1.791.412-2.212.217-.557.476-.954.895-1.373.419-.419.816-.678 1.373-.895.421-.163 1.046-.358 2.212-.412 1.266-.058 1.646-.07 4.85-.07zM12 0C8.741 0 8.333.014 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.132 5.775.072 7.053.014 8.333 0 8.741 0 12s.014 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126s1.337 1.078 2.126 1.384c.766.296 1.636.499 2.913.558C8.333 23.986 8.741 24 12 24s3.667-.014 4.947-.072c1.277-.06 2.148-.261 2.913-.558.788-.306 1.459-.717 2.126-1.384s1.078-1.337 1.384-2.126c.296-.765.499-1.636.558-2.913.058-1.28.072-1.687.072-4.947s-.014-3.667-.072-4.947c-.06-1.277-.261-2.148-.558-2.913-.306-.789-.717-1.459-1.384-2.126C21.337 1.337 20.666.935 19.877.63c-.765-.297-1.636-.499-2.913-.558C15.667.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                            </svg>
                        </a>
                    </div>
                </div>

                {/* ── Nav links ── */}
                <div>
                    <div style={{ color: '#fff', fontSize: '0.9rem', fontWeight: 900, marginBottom: '24px', letterSpacing: '2px' }}>EXPLORE</div>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {[
                            { label: 'Events', path: '/events' },
                            { label: 'Sponsors', path: '/sponsors' },
                            { label: 'Register', path: '/register' },
                            { label: 'Team', path: '/team' },
                            { label: 'About', path: '/about' },
                        ].map(({ label, path }) => (
                            <li key={label}>
                                <a
                                    href={path}
                                    style={{ color: 'var(--text-muted)', fontSize: '0.95rem', transition: '0.2s', textDecoration: 'none' }}
                                    onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                                    onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
                                >
                                    {label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* ── Stay synced ── */}
                <div>
                    <div style={{ color: '#fff', fontSize: '0.9rem', fontWeight: 900, marginBottom: '24px', letterSpacing: '2px' }}>STAY SYNCED</div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '20px', lineHeight: 1.7 }}>
                        Join our newsletter for exclusive updates, artist reveals, and early-bird access.
                    </p>

                    {newsStatus === 'success' ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(74,222,128,0.1)', color: '#4ade80', padding: '16px', borderRadius: '12px', border: '1px solid rgba(74,222,128,0.2)' }}>
                            <CheckCircle2 size={20} />
                            <span style={{ fontSize: '0.9rem', fontWeight: 700 }}>You're on the list!</span>
                        </div>
                    ) : (
                        <form onSubmit={handleNewsletterSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                required
                                style={{
                                    width: '100%', padding: '16px', borderRadius: '12px',
                                    background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                                    color: '#fff', outline: 'none', transition: '0.3s', fontSize: '0.9rem'
                                }}
                                onFocus={e => e.target.style.borderColor = 'var(--pink)'}
                                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                            />
                            <button
                                type="submit"
                                disabled={newsStatus === 'loading'}
                                style={{
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', width: '100%',
                                    background: 'var(--pink)', color: '#fff', padding: '16px', borderRadius: '12px',
                                    border: 'none', fontWeight: 900, fontSize: '0.9rem', cursor: newsStatus === 'loading' ? 'wait' : 'pointer',
                                    opacity: newsStatus === 'loading' ? 0.7 : 1, transition: '0.3s'
                                }}
                            >
                                {newsStatus === 'loading' ? 'ADDING...' : 'SUBSCRIBE'} <Send size={16} />
                            </button>
                            {newsStatus === 'error' && (
                                <div style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '4px' }}>Something went wrong. Please try again.</div>
                            )}
                        </form>
                    )}
                </div>
            </div>

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', marginTop: '60px', paddingTop: '30px', textAlign: 'center' }}>
                <div 
                    onMouseEnter={() => setShowSecret(true)}
                    onMouseLeave={() => setShowSecret(false)}
                    style={{ fontSize: '0.75rem', letterSpacing: '2px', color: 'rgba(255,255,255,0.3)', fontWeight: 700, cursor: 'help', transition: '0.15s' }}
                >
                    © 2026 MADHURAM SLIET // {showSecret ? <span style={{ color: 'var(--cyan)' }}>HIDDEN BY THE MATRIX</span> : <span>DEVELOPED BY <span style={{ color: 'var(--pink)' }}>Aetherin</span></span>}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
