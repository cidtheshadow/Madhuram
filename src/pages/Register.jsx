import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { User, Hash, Briefcase, Info, Home, CreditCard, CheckCircle2, QrCode, ArrowLeft, Zap } from 'lucide-react';
import { supabase } from '../lib/supabase';

const RegistrationForm = ({ isSliet, onBack, initialEvent, isMobile }) => {
    const [formData, setFormData] = useState({
        name: '', whatsapp_no: '', reg_no: '', trade: '', college_name: isSliet ? 'SLIET' : '',
        event_name: initialEvent || '', performance_type: '', performance_details: '',
        accommodation: false, payment_paid: false
    });
    const [status, setStatus] = useState('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const eventsList = [
        'Bhangra Cup', 'Singing', 'Dancing', 'Nukkad Natak', 'Drama', 'Stand Up',
        'Band Performance', 'Rapping', 'Modelling', 'Beatboxing', 'Others', 'Movie Show', 'Marathon', 'SLIET Premier League', 'Tug-of-WAR', 'Musical Evening', 'Open Mic', 'SLIET Roadies', 'Flashmob', 'Mono Acting', 'Poetry & Storytelling', 'Choreography'
    ];

    const handleChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData(prev => ({ ...prev, [e.target.name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');
        if (formData.whatsapp_no.length < 10) {
            setStatus('error');
            setErrorMessage('Please enter a valid 10-digit WhatsApp number.');
            return;
        }
        try {
            const table = isSliet ? 'sliet_registrations' : 'non_sliet_registrations';
            
            // Filter out fields not present in sliet_registrations schema if needed
            let dataToSubmit = { ...formData };
            if (isSliet) {
                const { accommodation, payment_paid, ...filteredData } = dataToSubmit;
                dataToSubmit = filteredData;
            }

            const { error } = await supabase.from(table).insert([dataToSubmit]);
            if (error) throw error;
            setStatus('success');
        } catch (err) {
            setStatus('error');
            setErrorMessage(err.message || 'Transmission failed.');
        }
    };

    const inputStyle = {
        width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '12px', padding: '15px', color: '#fff', outline: 'none', transition: '0.3s'
    };

    return (
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}
            style={{ background: 'var(--bg-card)', padding: isMobile ? '30px 20px' : '50px', borderRadius: '30px', border: '1px solid rgba(255,255,255,0.05)', maxWidth: '900px', margin: '0 auto' }}>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                <h3 style={{ color: isSliet ? 'var(--pink)' : 'var(--cyan)', margin: 0, fontSize: isMobile ? '1.2rem' : '1.5rem', fontWeight: 900 }}>{isSliet ? 'INTERNAL RELAY' : 'EXTERNAL ACCESS'}</h3>
                <button onClick={onBack} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}><ArrowLeft size={16} /> CHANGE PATH</button>
            </div>

            {status === 'success' ? (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{ textAlign: 'center', padding: '40px 0' }}
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
                        style={{ width: '90px', height: '90px', background: 'rgba(74,222,128,0.12)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 28px', border: '2px solid rgba(74,222,128,0.3)' }}
                    >
                        <CheckCircle2 color="#4ade80" size={44} />
                    </motion.div>

                    <h2 style={{ fontSize: '2.2rem', fontWeight: 900, marginBottom: '8px', color: '#fff' }}>REGISTRATION COMPLETE!</h2>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '36px', fontSize: '1rem' }}>You're locked in. Join the WhatsApp group for updates &amp; schedule.</p>

                    {/* WhatsApp CTA — only shown after form is submitted */}
                    <motion.a
                        href="https://chat.whatsapp.com/YOUR_GROUP_LINK"
                        target="_blank"
                        rel="noreferrer"
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.35 }}
                        style={{
                            display: 'inline-flex', alignItems: 'center', gap: '12px',
                            background: '#25D366', color: '#fff',
                            padding: '16px 36px', borderRadius: '12px',
                            textDecoration: 'none', fontFamily: 'Montserrat, sans-serif',
                            fontWeight: 900, fontSize: '1rem', letterSpacing: '1.5px',
                            boxShadow: '0 8px 30px rgba(37,211,102,0.35)',
                            transition: 'transform 0.2s, box-shadow 0.2s',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.04)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(37,211,102,0.5)'; }}
                        onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(37,211,102,0.35)'; }}
                    >
                        <svg width="22" height="22" viewBox="0 0 32 32" fill="white"><path d="M16 3C9.373 3 4 8.373 4 15c0 2.385.832 4.584 2.216 6.348L4 29l7.867-2.183A12.94 12.94 0 0016 27c6.627 0 12-5.373 12-12S22.627 3 16 3zm5.94 16.54c-.252.707-1.473 1.353-2.02 1.4-.547.047-1.06.253-3.567-.747-3-1.193-4.94-4.247-5.087-4.44-.147-.193-1.193-1.587-1.193-3.027s.753-2.147 1.02-2.44c.267-.293.587-.367.78-.367h.56c.18 0 .427-.067.667.507l.953 2.347c.08.2.033.427-.1.6l-.48.627c-.16.207-.333.433-.143.847.747 1.567 2.247 2.993 3.913 3.647.387.153.62.127.847-.073l.68-.76c.2-.227.4-.167.627-.1l2.207.987c.213.08.36.12.413.213.053.093.053.547-.2 1.253z" /></svg>
                        JOIN WHATSAPP GROUP
                    </motion.a>
                </motion.div>
            ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: '25px' }}>
                        <div>
                            <div style={{ fontSize: '0.7rem', fontWeight: 900, color: 'var(--pink)', letterSpacing: '2px', marginBottom: '10px' }}>FULL_NAME</div>
                            <input required name="name" value={formData.name} onChange={handleChange} style={inputStyle} placeholder="ENTER IDENTIFIER" />
                        </div>
                        {!isSliet && (
                            <div>
                                <div style={{ fontSize: '0.7rem', fontWeight: 900, color: 'var(--pink)', letterSpacing: '2px', marginBottom: '10px' }}>COLLEGE_NODE</div>
                                <input required name="college_name" value={formData.college_name} onChange={handleChange} style={inputStyle} placeholder="UNIVERSITY NAME" />
                            </div>
                        )}
                        <div>
                            <div style={{ fontSize: '0.7rem', fontWeight: 900, color: 'var(--pink)', letterSpacing: '2px', marginBottom: '10px' }}>PHONE_NUMBER</div>
                            <input required type="tel" pattern="[0-9]{10}" name="whatsapp_no" value={formData.whatsapp_no} onChange={handleChange} style={inputStyle} placeholder="10-DIGIT MOBILE NUMBER" />
                        </div>
                        <div>
                            <div style={{ fontSize: '0.7rem', fontWeight: 900, color: 'var(--pink)', letterSpacing: '2px', marginBottom: '10px' }}>ROLL_SEQUENCE</div>
                            <input required name="reg_no" value={formData.reg_no} onChange={handleChange} style={inputStyle} placeholder="SERIAL_NUMBER" />
                        </div>
                        <div>
                            <div style={{ fontSize: '0.7rem', fontWeight: 900, color: 'var(--pink)', letterSpacing: '2px', marginBottom: '10px' }}>EVENT_TAG</div>
                            <select required name="event_name" value={formData.event_name} onChange={handleChange} style={inputStyle}>
                                <option value="" disabled>SELECT TARGET</option>
                                {eventsList.map(ev => <option key={ev} value={ev}>{ev}</option>)}
                            </select>
                        </div>
                        <div>
                            <div style={{ fontSize: '0.7rem', fontWeight: 900, color: 'var(--pink)', letterSpacing: '2px', marginBottom: '10px' }}>UNIT_LOGIC</div>
                            <select required name="performance_type" value={formData.performance_type} onChange={handleChange} style={inputStyle}>
                                <option value="" disabled>SELECT TYPE</option>
                                <option value="Solo">SOLO</option>
                                <option value="Duo">DUO</option>
                                <option value="Group">GROUP</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <div style={{ fontSize: '0.7rem', fontWeight: 900, color: 'var(--pink)', letterSpacing: '2px', marginBottom: '10px' }}>PERFORMANCE_LOAD</div>
                        <textarea required name="performance_details" value={formData.performance_details} onChange={handleChange} rows="3" style={inputStyle} placeholder="DESCRIBE SEQUENCE..." />
                    </div>

                    {!isSliet && (
                        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '30px', borderRadius: '20px', border: '1px solid rgba(0,240,255,0.1)' }}>
                            <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '30px', alignItems: 'center' }}>
                                <div style={{ flex: 1 }}>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '15px', color: '#fff', cursor: 'pointer', marginBottom: '20px' }}>
                                        <input type="checkbox" name="accommodation" checked={formData.accommodation} onChange={handleChange} style={{ width: '22px', height: '22px', accentColor: 'var(--cyan)' }} />
                                        REQUEST_HOSTEL_HOSTING
                                    </label>
                                    <label style={{ display: 'flex', alignItems: 'start', gap: '15px', color: '#fff', cursor: 'pointer' }}>
                                        <input type="checkbox" required name="payment_paid" checked={formData.payment_paid} onChange={handleChange} style={{ width: '22px', height: '22px', accentColor: 'var(--pink)', marginTop: '5px' }} />
                                        <div>SYNC_PAYMENT_COMPLETE <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', marginTop: '5px' }}>Fee verified via scan below.</div></div>
                                    </label>
                                </div>
                                <div style={{ background: '#fff', padding: '15px', borderRadius: '15px' }}>
                                    <QrCode size={120} color="#000" />
                                </div>
                            </div>
                        </div>
                    )}

                    {errorMessage && <div style={{ color: 'var(--pink)', padding: '15px', background: 'rgba(247,0,255,0.1)', border: '1px solid var(--pink)', borderRadius: '12px', fontSize: '0.9rem' }}>{errorMessage}</div>}

                    <button type="submit" disabled={status === 'submitting'} className="btn-primary" style={{ padding: '20px', fontSize: '1.2rem', opacity: status === 'submitting' ? 0.6 : 1 }}>
                        {status === 'submitting' ? 'SYNCHRONIZING...' : 'EXECUTE REGISTRATION'}
                    </button>
                </form>
            )}
        </motion.div>
    );
};

const Register = () => {
    const [searchParams] = useSearchParams();
    const eventParam = searchParams.get('event');
    const [registrationState, setRegistrationState] = useState('none');
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 1024);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const initialEvent = eventParam ? eventParam.toLowerCase().replace(/(^\w|\s\w)/g, m => m.toUpperCase()) : '';

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ padding: isMobile ? '40px 20px 100px' : '80px 10vw 120px', minHeight: '90vh' }}>

            <div style={{ textAlign: 'center', marginBottom: isMobile ? '40px' : '60px' }}>
                <h1 style={{ fontSize: isMobile ? '3rem' : '5rem', fontWeight: 900, color: '#fff', margin: 0, fontFamily: 'var(--font-logo)' }}>SYNC_PORTAL</h1>
                {eventParam && <p style={{ color: 'var(--yellow)', fontSize: '1.2rem', marginTop: '15px', fontWeight: 900 }}>RESERVED FOR: {initialEvent}</p>}
            </div>

            <AnimatePresence mode="wait">
                {registrationState === 'none' && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
                        style={{ background: 'rgba(255,255,255,0.02)', padding: isMobile ? '60px 20px' : '100px', borderRadius: '40px', border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
                        <h2 style={{ fontSize: isMobile ? '2.5rem' : '4rem', fontWeight: 900, marginBottom: '20px' }}>SELECT PATH</h2>
                        <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', marginBottom: '60px' }}>Choose your origin to begin registration.</p>

                        <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '30px', justifyContent: 'center' }}>
                            <button onClick={() => setRegistrationState('sliet')} className="btn-primary"
                                style={{ background: 'var(--pink)', padding: '25px 60px', borderRadius: '20px', fontSize: '1.4rem', boxShadow: '0 20px 40px rgba(247,0,255,0.2)' }}>INTERNAL_SLIET</button>
                            <button onClick={() => window.location.href = 'https://unstop.com/c/sant-longowal-institute-of-engineering-and-technology-675999'} className="btn-primary"
                                style={{ background: 'var(--cyan)', color: '#000', padding: '25px 60px', borderRadius: '20px', fontSize: '1.4rem', boxShadow: '0 20px 40px rgba(0,240,255,0.2)' }}>EXTERNAL_GUEST</button>
                        </div>
                    </motion.div>
                )}

                {registrationState === 'sliet' && <RegistrationForm isSliet={true} onBack={() => setRegistrationState('none')} initialEvent={initialEvent} isMobile={isMobile} />}
                {registrationState === 'external' && <RegistrationForm isSliet={false} onBack={() => setRegistrationState('none')} initialEvent={initialEvent} isMobile={isMobile} />}
            </AnimatePresence>

        </motion.div>
    );
};

export default Register;
