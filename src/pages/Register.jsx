import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { User, Hash, Briefcase, Info, Home, CreditCard, CheckCircle2, QrCode } from 'lucide-react';
import { supabase } from '../lib/supabase';

const RegistrationForm = ({ isSliet, onBack, initialEvent }) => {
    const [formData, setFormData] = useState({
        name: '',
        whatsapp_no: '',
        reg_no: '',
        trade: '',
        college_name: isSliet ? 'SLIET' : '',
        event_name: initialEvent || '',
        performance_type: '',
        performance_details: '',
        accommodation: false,
        payment_paid: false
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
        setErrorMessage('');

        // Basic validation
        if (formData.whatsapp_no.length < 10) {
            setStatus('error');
            setErrorMessage('Please enter a valid 10-digit WhatsApp number.');
            return;
        }

        try {
            const table = isSliet ? 'sliet_registrations' : 'non_sliet_registrations';
            const payload = {
                name: formData.name,
                whatsapp_no: formData.whatsapp_no,
                reg_no: formData.reg_no,
                trade: formData.trade,
                college_name: formData.college_name,
                event_name: formData.event_name,
                performance_type: formData.performance_type,
                performance_details: formData.performance_details,
                ...(isSliet ? {} : {
                    accommodation: formData.accommodation,
                    payment_paid: formData.payment_paid
                })
            };

            const { error } = await supabase.from(table).insert([payload]);
            if (error) throw error;

            setStatus('success');
            setFormData({
                name: '', whatsapp_no: '', reg_no: '', trade: '', college_name: isSliet ? 'SLIET' : '',
                event_name: '', performance_type: '', performance_details: '',
                accommodation: false, payment_paid: false
            });
            // We don't clear idle automatically so they can see the WhatsApp link
        } catch (err) {
            console.error('Registration Error:', err);
            setStatus('error');
            if (err.message === 'Failed to fetch' || !import.meta.env.VITE_SUPABASE_URL) {
                setErrorMessage('Connection failed. Please ensure environment variables are configured in Vercel.');
            } else {
                setErrorMessage(err.message || 'An error occurred during registration.');
            }
        }
    };

    const inputStyle = {
        width: '100%',
        background: 'rgba(0,0,0,0.3)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '8px',
        padding: '12px 16px',
        color: '#fff',
        fontFamily: 'var(--font-text)',
        fontSize: '0.95rem',
        outline: 'none',
        transition: 'all 0.3s'
    };

    const labelStyle = {
        display: 'block',
        marginBottom: '8px',
        color: 'var(--text-muted)',
        fontFamily: 'var(--font-heading)',
        fontSize: '0.85rem',
        fontWeight: 'bold',
        letterSpacing: '1px',
        textTransform: 'uppercase'
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="card"
            style={{ padding: '40px', maxWidth: '800px', margin: '0 auto', background: 'var(--bg-card)', borderRadius: '24px' }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <h3 style={{ color: isSliet ? 'var(--pink)' : 'var(--cyan)', margin: 0 }}>
                    {isSliet ? 'INTERNAL (SLIET) REGISTRATION' : 'EXTERNAL REGISTRATION'}
                </h3>
                <button onClick={onBack} style={{ color: 'var(--text-muted)', textDecoration: 'underline', fontSize: '0.9rem', background: 'none', border: 'none', cursor: 'pointer' }}>Back to Selection</button>
            </div>

            {status === 'success' ? (
                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                    <CheckCircle2 color="#4ade80" size={60} style={{ margin: '0 auto 20px' }} />
                    <h2 style={{ color: '#fff', marginBottom: '10px' }}>Registration Successful!</h2>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>We look forward to seeing you at Madhuram.</p>

                    <div style={{ background: 'rgba(37, 211, 102, 0.1)', padding: '24px', borderRadius: '16px', border: '1px solid rgba(37, 211, 102, 0.3)' }}>
                        <p style={{ color: '#fff', fontWeight: 'bold', marginBottom: '16px' }}>Stay Updated!</p>
                        <a
                            href="https://chat.whatsapp.com/YOUR_GROUP_LINK"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary"
                            style={{ background: '#25D366', color: '#fff', border: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                        >
                            JOIN WHATSAPP GROUP
                        </a>
                    </div>
                    <button onClick={() => setStatus('idle')} style={{ marginTop: '30px', background: 'none', border: 'none', color: 'var(--cyan)', cursor: 'pointer', textDecoration: 'underline' }}>
                        Register Another Participant
                    </button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '24px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
                        <div>
                            <label style={labelStyle}>Full Name</label>
                            <input required type="text" minLength="3" maxLength="50" name="name" value={formData.name} onChange={handleChange} style={inputStyle} placeholder="Participant Name" />
                        </div>
                        {!isSliet && (
                            <div>
                                <label style={labelStyle}>College/University</label>
                                <input required type="text" minLength="3" maxLength="100" name="college_name" value={formData.college_name} onChange={handleChange} style={inputStyle} placeholder="Your College Name" />
                            </div>
                        )}
                        <div>
                            <label style={labelStyle}>WhatsApp Number</label>
                            <input required type="tel" pattern="[0-9]{10}" minLength="10" maxLength="10" name="whatsapp_no" value={formData.whatsapp_no} onChange={handleChange} style={inputStyle} placeholder="10-digit number" />
                        </div>
                        <div>
                            <label style={labelStyle}>Registration / Roll No</label>
                            <input required type="text" minLength="4" maxLength="20" name="reg_no" value={formData.reg_no} onChange={handleChange} style={inputStyle} placeholder="Registration Number" />
                        </div>
                        <div>
                            <label style={labelStyle}>Trade / Course</label>
                            <input required type="text" minLength="2" maxLength="50" name="trade" value={formData.trade} onChange={handleChange} style={inputStyle} placeholder="e.g., Computer Science" />
                        </div>
                        <div>
                            <label style={labelStyle}>Event</label>
                            <select required name="event_name" value={formData.event_name} onChange={handleChange} style={inputStyle}>
                                <option value="" disabled>Select Event</option>
                                {eventsList.map(ev => <option key={ev} value={ev}>{ev}</option>)}
                            </select>
                        </div>
                        <div>
                            <label style={labelStyle}>Type</label>
                            <select required name="performance_type" value={formData.performance_type} onChange={handleChange} style={inputStyle}>
                                <option value="" disabled>Select Type</option>
                                <option value="Solo">Solo</option>
                                <option value="Duo">Duo</option>
                                <option value="Group">Group</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label style={labelStyle}>Performance Details</label>
                        <textarea required name="performance_details" value={formData.performance_details} onChange={handleChange} rows="3" style={inputStyle} placeholder="Describe your performance (song, act details, etc.)..."></textarea>
                    </div>

                    {!isSliet && (
                        <div style={{ marginTop: '10px', padding: '24px', background: 'rgba(0,0,0,0.4)', borderRadius: '12px', border: '1px solid rgba(6,182,212,0.3)' }}>
                            <h4 style={{ color: 'var(--cyan)', margin: '0 0 16px 0', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <CreditCard size={20} /> Payment & Extras
                            </h4>

                            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(200px, 1fr) auto', gap: '24px', alignItems: 'center' }}>
                                <div>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', color: '#fff', marginBottom: '16px' }}>
                                        <input type="checkbox" name="accommodation" checked={formData.accommodation} onChange={handleChange} style={{ width: '20px', height: '20px', accentColor: 'var(--cyan)' }} />
                                        Opt for Accommodation (Hostel)
                                    </label>

                                    <label style={{ display: 'flex', alignItems: 'start', gap: '12px', cursor: 'pointer', color: '#fff' }}>
                                        <input type="checkbox" required name="payment_paid" checked={formData.payment_paid} onChange={handleChange} style={{ width: '20px', height: '20px', accentColor: '#4ade80', marginTop: '4px' }} />
                                        <div>
                                            I have completed the payment.
                                            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>Please scan the QR code to pay the registration fee before submitting.</div>
                                        </div>
                                    </label>
                                </div>

                                <div style={{ background: '#fff', padding: '10px', borderRadius: '12px', textAlign: 'center' }}>
                                    <QrCode size={100} color="#000" />
                                    <div style={{ color: '#000', fontSize: '0.8rem', fontWeight: 'bold', marginTop: '8px' }}>Scan to Pay</div>
                                </div>
                            </div>
                        </div>
                    )}

                    {errorMessage && <div style={{ color: '#ef4444', padding: '12px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '8px' }}>{errorMessage}</div>}

                    <button
                        type="submit"
                        disabled={status === 'submitting'}
                        className="btn-primary"
                        style={{ width: '100%', padding: '16px', fontSize: '1.1rem', marginTop: '10px', opacity: status === 'submitting' ? 0.7 : 1, border: 'none' }}
                    >
                        {status === 'submitting' ? 'PROCESSING...' : 'SUBMIT REGISTRATION'}
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

    // Make 'Bhangra Cup', 'Singing' etc properly match eventsList options
    // EventParam usually looks like 'MOVIE SHOW' or 'BHANGRA CUP', mapping might be needed if exact string matters.
    // For simplicity, we just pass the original string or capitalize properly.
    const capitalizeText = (str) => {
        if (!str) return '';
        return str.toLowerCase().replace(/(^\w|\s\w)/g, m => m.toUpperCase());
    };

    const initialEvent = capitalizeText(eventParam);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            style={{ padding: '100px 20px', width: '100%', maxWidth: '1200px', margin: '0 auto', minHeight: '80vh' }}
        >
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <h1 style={{ fontSize: '3rem', fontFamily: 'var(--font-heading)', color: '#fff', margin: 0 }}>Register</h1>
                {eventParam && (
                    <p style={{ color: 'var(--yellow)', fontSize: '1.2rem', marginTop: '10px' }}>
                        You are registering for: <strong>{initialEvent}</strong>
                    </p>
                )}
            </div>

            <AnimatePresence mode="wait">
                {registrationState === 'none' && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                        style={{ textAlign: 'center', padding: '80px 20px', background: 'var(--bg-card)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)' }}
                    >
                        <h2 style={{ fontSize: '3rem', marginBottom: '16px', fontFamily: 'var(--font-heading)', letterSpacing: '1px' }}>Join the Action</h2>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '50px', fontSize: '1.2rem' }}>Select your path to continue registration.</p>

                        <div style={{ display: 'flex', gap: '30px', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <button
                                className="btn-primary"
                                onClick={() => setRegistrationState('sliet')}
                                style={{
                                    background: 'var(--pink)', border: 'none', padding: '24px 48px',
                                    borderRadius: '16px', color: '#fff', fontSize: '1.3rem', fontFamily: 'var(--font-heading)',
                                    fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.3s', minWidth: '280px',
                                    boxShadow: '0 10px 30px rgba(255, 0, 255, 0.3)'
                                }}
                                onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; }}
                                onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
                            >
                                INTERNAL (SLIET)
                            </button>

                            <button
                                onClick={() => setRegistrationState('external')}
                                style={{
                                    background: 'var(--cyan)', border: 'none', padding: '24px 48px',
                                    borderRadius: '16px', color: '#000', fontSize: '1.3rem', fontFamily: 'var(--font-heading)',
                                    fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.3s', minWidth: '280px',
                                    boxShadow: '0 10px 30px rgba(6, 182, 212, 0.3)'
                                }}
                                onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; }}
                                onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
                            >
                                EXTERNAL GUEST
                            </button>
                        </div>
                    </motion.div>
                )}

                {registrationState === 'sliet' && (
                    <RegistrationForm isSliet={true} onBack={() => setRegistrationState('none')} initialEvent={initialEvent} />
                )}

                {registrationState === 'external' && (
                    <RegistrationForm isSliet={false} onBack={() => setRegistrationState('none')} initialEvent={initialEvent} />
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default Register;
