import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoadingPage from './pages/LoadingPage';
import Home from './pages/Home';
import About from './pages/About';
import Events from './pages/Events';
import Sponsors from './pages/Sponsors';
import Team from './pages/Team';
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";
import Register from './pages/Register';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, SkipForward, SkipBack, Music } from 'lucide-react';
import CustomCursor from './components/CustomCursor';

const TRACKS = [
  { id: 'h7MYJghRWt0', title: 'Die For You', artist: 'VALORANT' },
  { id: 'fB8TyLTD7EE', title: 'Legends Never Die', artist: 'Against The Current' },
  { id: 'UoK8DaJR774', title: 'POP/STARS', artist: 'K/DA' },
  { id: 'D9G1VOjua_8', title: 'Enemy', artist: 'Imagine Dragons' },
];

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/events" element={<Events />} />
      <Route path="/sponsors" element={<Sponsors />} />
      <Route path="/team" element={<Team />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

function App() {
  const [showLoader, setShowLoader] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [showSelector, setShowSelector] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const playerRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Load YouTube API and autoplay music with the loading screen
  useEffect(() => {
    const tryPlay = () => {
      if (playerRef.current?.playVideo) {
        playerRef.current.setVolume(60);
        playerRef.current.playVideo();
        setIsMuted(false);
      }
    };

    const initPlayer = () => {
      playerRef.current = new window.YT.Player('bg-youtube-audio', {
        videoId: TRACKS[0].id,
        playerVars: { autoplay: 1, loop: 1, playlist: TRACKS[0].id, controls: 0, mute: 0 },
        events: {
          onReady: (e) => {
            e.target.setVolume(60);
            // Attempt play — browsers may block autoplay without a gesture
            const p = e.target.playVideo();
            if (p instanceof Promise) {
              p.catch(() => {
                // Blocked: wait for first user interaction
                const unlock = () => {
                  tryPlay();
                  document.removeEventListener('click', unlock);
                  document.removeEventListener('keydown', unlock);
                  document.removeEventListener('touchstart', unlock);
                };
                document.addEventListener('click', unlock, { once: true });
                document.addEventListener('keydown', unlock, { once: true });
                document.addEventListener('touchstart', unlock, { once: true });
              });
            }
            setIsMuted(false);
          }
        }
      });
    };

    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.head.appendChild(tag);
      window.onYouTubeIframeAPIReady = initPlayer;
    } else if (window.YT.Player) {
      initPlayer();
    } else {
      window.onYouTubeIframeAPIReady = initPlayer;
    }
  }, []);

  useEffect(() => {
    if (playerRef.current?.loadVideoById) {
      playerRef.current.loadVideoById({ videoId: TRACKS[currentTrackIndex].id });
      playerRef.current.setVolume(isMuted ? 0 : 60);
    }
  }, [currentTrackIndex]);

  useEffect(() => {
    if (playerRef.current?.setVolume) playerRef.current.setVolume(isMuted ? 0 : 60);
  }, [isMuted]);

  return (
    <Router>
      <CustomCursor />
      {/* Hidden YouTube audio player */}
      <div id="bg-youtube-audio" style={{ display: 'none' }} />

      {/* Auto-play loading animation on first visit */}
      {showLoader && <LoadingPage onFinish={() => setShowLoader(false)} />}

      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <ScrollToTop />
        <Navbar setExternalMenuState={setIsMenuOpen} />

        {/* Music player FAB */}
        <div style={{
          position: 'fixed', bottom: isMobile ? '20px' : '40px', right: isMobile ? '20px' : '40px',
          zIndex: showSelector ? 10001 : 999,
          display: isMenuOpen ? 'none' : 'flex',
          flexDirection: 'column', alignItems: 'flex-end', gap: '15px'
        }}>
          {showSelector && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              style={{
                background: 'rgba(18, 9, 33, 0.95)', backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.1)', padding: isMobile ? '20px' : '30px',
                borderRadius: '30px', width: isMobile ? '260px' : '320px',
                boxShadow: '0 20px 60px rgba(0,0,0,0.8)'
              }}
            >
              <div style={{ display: 'flex', gap: '20px', marginBottom: '25px', alignItems: 'center' }}>
                <div style={{ width: '60px', height: '60px', background: 'var(--cyan)', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Music size={30} color="#000" />
                </div>
                <div style={{ flex: 1, overflow: 'hidden' }}>
                  <div style={{ color: '#fff', fontSize: '1rem', fontWeight: 900, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{TRACKS[currentTrackIndex].title}</div>
                  <div style={{ color: 'var(--cyan)', fontSize: '0.7rem', fontWeight: 900, letterSpacing: '2px', marginTop: '5px' }}>TRACK_{currentTrackIndex + 1}</div>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.03)', padding: '15px', borderRadius: '20px' }}>
                <button onClick={() => setCurrentTrackIndex((p) => (p - 1 + TRACKS.length) % TRACKS.length)} style={{ color: '#fff' }}><SkipBack size={24} /></button>
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  style={{ background: isMuted ? 'rgba(255,255,255,0.1)' : 'var(--cyan)', color: isMuted ? '#fff' : '#000', width: '50px', height: '50px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
                </button>
                <button onClick={() => setCurrentTrackIndex((p) => (p + 1) % TRACKS.length)} style={{ color: '#fff' }}><SkipForward size={24} /></button>
              </div>
            </motion.div>
          )}

          <motion.button
            animate={{ boxShadow: isMuted ? 'none' : '0 0 30px rgba(0,240,255,0.3)' }}
            onClick={() => setShowSelector(!showSelector)}
            style={{
              background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.1)',
              width: isMobile ? '55px' : '70px', height: isMobile ? '55px' : '70px',
              borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: isMuted ? 'rgba(255,255,255,0.3)' : 'var(--cyan)'
            }}
          >
            <Music size={isMobile ? 24 : 32} />
          </motion.button>
        </div>

        <main style={{ flex: 1, paddingTop: isMobile ? '60px' : '68px' }}>
          <AnimatedRoutes />
        </main>
        <Footer />
      </div>
      <SpeedInsights />
      <Analytics />
    </Router>
  );
}

export default App;
