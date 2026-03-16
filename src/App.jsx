import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Events from './pages/Events';
import Sponsors from './pages/Sponsors';
import Team from './pages/Team';
import Register from './pages/Register';
import LoadingPage from './pages/LoadingPage';
import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/events" element={<Events />} />
        <Route path="/sponsors" element={<Sponsors />} />
        <Route path="/team" element={<Team />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </AnimatePresence>
  );
}

function MainApp({ isMuted, onToggleMute }) {
  return (
    <div className="page-container">
      <ScrollToTop />
      <div className="bg-pattern" />
      <Navbar />

      {/* Global Mute Toggle */}
      <motion.button
        onClick={onToggleMute}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          zIndex: 99999,
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.1)',
          backdropFilter: 'blur(10px)',
          padding: '12px',
          borderRadius: '50%',
          color: isMuted ? 'var(--text-muted)' : 'var(--cyan)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'all 0.3s',
          boxShadow: isMuted ? 'none' : '0 0 15px rgba(0,240,255,0.3)',
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
      </motion.button>

      <div className="content-wrapper">
        <AnimatedRoutes />
      </div>
      <Footer />
    </div>
  );
}

function App() {
  const [interacted, setInteracted] = useState(false);
  const [entered, setEntered] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const playerRef = useRef(null);

  useEffect(() => {
    if (!interacted) return;

    // Load YouTube Iframe API
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player('bg-youtube-audio', {
        videoId: 'h7MYJghRWt0', // Die For You - VALORANT
        playerVars: {
          autoplay: 1,
          loop: 1,
          playlist: 'h7MYJghRWt0',
          controls: 0,
          showinfo: 0,
          autohide: 1,
          start: 0 // Play from beginning
        },
        events: {
          onReady: (event) => {
            event.target.setVolume(0);
            event.target.playVideo();

            if (!isMuted) {
              // Custom fade-in logic
              const fadeInDuration = 3000;
              const interval = 100;
              const steps = fadeInDuration / interval;
              const stepVolume = 60 / steps; // Max volume 60%

              let currentStep = 0;
              const fadeInterval = setInterval(() => {
                currentStep++;
                if (currentStep <= steps) {
                  event.target.setVolume(Math.round(currentStep * stepVolume));
                } else {
                  clearInterval(fadeInterval);
                }
              }, interval);
            }
          }
        }
      });
    };

    return () => {
      if (playerRef.current && typeof playerRef.current.destroy === 'function') {
        playerRef.current.destroy();
      }
      window.onYouTubeIframeAPIReady = null;
    };
  }, [interacted]);

  useEffect(() => {
    if (playerRef.current && typeof playerRef.current.setVolume === 'function') {
      if (isMuted) {
        playerRef.current.setVolume(0);
      } else {
        playerRef.current.setVolume(60);
      }
    }
  }, [isMuted]);

  return (
    <Router>
      {!interacted ? (
        <div
          onClick={() => {
            setInteracted(true);
          }}
          style={{
            height: '100vh', width: '100vw', background: 'var(--bg-darker)', display: 'flex',
            justifyContent: 'center', alignItems: 'center', cursor: 'pointer', fontFamily: 'var(--font-heading)'
          }}
        >
          <motion.div
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{ color: 'var(--cyan)', fontSize: '1.5rem', letterSpacing: '4px' }}
          >
            [ CLICK TO INIT SEQUENCE ]
          </motion.div>
        </div>
      ) : (
        <>
          <div id="bg-youtube-audio" style={{ display: 'none', position: 'absolute', width: 0, height: 0 }} />
          {!entered ? (
            <LoadingPage
              onEnter={() => setEntered(true)}
              isMuted={isMuted}
              onToggleMute={() => setIsMuted(!isMuted)}
            />
          ) : (
            <MainApp isMuted={isMuted} onToggleMute={() => setIsMuted(!isMuted)} />
          )}
        </>
      )}
    </Router>
  );
}

export default App;
