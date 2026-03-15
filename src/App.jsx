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
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

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

function MainApp() {
  return (
    <div className="page-container">
      <ScrollToTop />
      <div className="bg-pattern" />
      <Navbar />
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

  useEffect(() => {
    if (!interacted) return;

    // Load YouTube Iframe API
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    let player;
    window.onYouTubeIframeAPIReady = () => {
      player = new window.YT.Player('bg-youtube-audio', {
        videoId: 'V3cN7MX2qnI', // User specified background track
        playerVars: {
          autoplay: 1,
          loop: 1,
          playlist: 'V3cN7MX2qnI',
          controls: 0,
          showinfo: 0,
          autohide: 1,
          start: 38
        },
        events: {
          onReady: (event) => {
            event.target.setVolume(0);
            event.target.playVideo();

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
      });
    };

    return () => {
      if (player && typeof player.destroy === 'function') {
        player.destroy();
      }
      window.onYouTubeIframeAPIReady = null;
    };
  }, [interacted]);

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
            <LoadingPage onEnter={() => setEntered(true)} />
          ) : (
            <MainApp />
          )}
        </>
      )}
    </Router>
  );
}

export default App;
