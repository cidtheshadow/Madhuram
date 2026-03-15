import { motion } from 'framer-motion';

const Footer = () => {
    return (
        <footer style={{ marginTop: '100px', background: 'rgba(20,10,30,0.8)', padding: '60px 5%', borderTop: '1px dashed var(--pink)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: 'var(--font-heading)' }}>
            <div>
                <div style={{ background: 'var(--pink)', color: '#fff', padding: '8px 24px', display: 'inline-block', fontWeight: 'bold', fontSize: '1.5rem', marginBottom: '16px' }}>मधुरम् '26</div>
                <p style={{ color: 'var(--text-muted)', maxWidth: '400px', fontFamily: 'var(--font-text)' }}>Created with love. The ethereal future of college fests is here.</p>
                <div style={{ fontSize: '0.8rem', letterSpacing: '1px', color: 'var(--text-muted)', marginTop: '16px' }}>
                    © 2026 Madhuram SLIET // ALL_RESERVED
                </div>
            </div>
            <div style={{ display: 'flex', gap: '16px' }}>
                {/* Social icons placeholders */}
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid var(--pink)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--pink)' }}>in</div>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid var(--pink)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--pink)' }}>x</div>
                <a href="https://www.instagram.com/madhuramsliet/?hl=en" target="_blank" rel="noopener noreferrer" style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid var(--pink)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--pink)', textDecoration: 'none', transition: 'all 0.3s' }}>ig</a>
            </div>
            <div>
                <div style={{ fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '8px', color: '#fff', fontFamily: 'var(--font-sub)' }}>STAY IN THE LOOP</div>
                <form onSubmit={(e) => { e.preventDefault(); alert(`Subscribed!`); }} style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.2)' }}>
                    <input type="email" required placeholder="Email" style={{ background: 'transparent', border: 'none', color: '#fff', padding: '8px', outline: 'none', fontFamily: 'var(--font-text)' }} />
                    <button type="submit" style={{ color: 'var(--pink)', fontWeight: 'bold', padding: '8px', background: 'transparent', border: 'none', cursor: 'pointer' }}>→</button>
                </form>
            </div>
        </footer>
    );
};

export default Footer;
