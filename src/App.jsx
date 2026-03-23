import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoadingPage from './pages/LoadingPage';
import { lazy, Suspense, useState, useEffect, useRef } from 'react';
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Events = lazy(() => import('./pages/Events'));
const Sponsors = lazy(() => import('./pages/Sponsors'));
const Team = lazy(() => import('./pages/Team'));
const Register = lazy(() => import('./pages/Register'));
const ForSuman = lazy(() => import('./pages/ForSuman'));
const ForKalpana = lazy(() => import('./pages/ForKalpana'));
import { motion } from 'framer-motion';
import { Volume2, VolumeX, SkipForward, SkipBack, Music } from 'lucide-react';
import CustomCursor from './components/CustomCursor';

const TRACKS = [
  { id: 'h7MYJghRWt0', title: 'Die For You', artist: 'VALORANT' },
  { id: 'fB8TyLTD7EE', title: 'Legends Never Die', artist: 'Against The Current' },
  { id: 'UoK8DaJR774', title: 'POP/STARS', artist: 'K/DA' },
  { id: 'D9G1VOjua_8', title: 'Enemy', artist: 'Imagine Dragons' },
  { id: 'fk_KvUijS8M', title: 'Ik Vaari Aa', artist: 'Arijit Singh' },
  { id: 'l1pHRTFkKKs', title: 'Until I Found You', artist: 'Stephen Sanchez', start: 107 },
];

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f700ff', fontSize: '1.2rem', fontFamily: 'monospace' }}>LOADING SYSTEM...</div>}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/events" element={<Events />} />
        <Route path="/sponsors" element={<Sponsors />} />
        <Route path="/team" element={<Team />} />
        <Route path="/register" element={<Register />} />
        <Route path="/for-you" element={<ForSuman />} />
        <Route path="/dairy-milk" element={<ForKalpana />} />
      </Routes>
    </Suspense>
  );
}

function AppContent() {
  const [showLoader, setShowLoader] = useState(() => {
    const isBot = /bot|googlebot|crawler|spider|robot|crawling|lighthouse|speed|PTST/i.test(navigator.userAgent || '');
    return !sessionStorage.getItem('madhuram_loader_seen') && !isBot;
  });
  const [isMuted, setIsMuted] = useState(true);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [showSelector, setShowSelector] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const playerRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);

    // KONAMI CODE EASTER EGG
    let konamiIndex = 0;
    const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    const handleKeyDown = (e) => {
      if (e.key === konamiSequence[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiSequence.length) {
          triggerGlitch();
          konamiIndex = 0;
        }
      } else {
        konamiIndex = 0;
      }
    };

    const triggerGlitch = () => {
      document.body.style.filter = 'hue-rotate(90deg) contrast(1.5)';
      const overlay = document.createElement('div');
      overlay.style.position = 'fixed';
      overlay.style.inset = '0';
      overlay.style.zIndex = '99999';
      overlay.style.pointerEvents = 'none';
      overlay.style.background = 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 250 250\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")';
      overlay.style.opacity = '0.3';
      document.body.appendChild(overlay);

      setTimeout(() => {
        document.body.style.filter = '';
        if (overlay.parentNode) document.body.removeChild(overlay);
      }, 5000);
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Sync music to secret routes
  useEffect(() => {
    if (location.pathname === '/for-you') {
      setCurrentTrackIndex(4);
      setIsMuted(false);
      setShowSelector(false); // Hide selector on this page
    } else if (location.pathname === '/dairy-milk') {
      setCurrentTrackIndex(5); // Until I Found You
      setIsMuted(false);
      setShowSelector(false);
    }
  }, [location.pathname]);

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
            
            // If on secret pages, load correct track immediately
            if (location.pathname === '/for-you') {
              e.target.loadVideoById({ videoId: TRACKS[4].id });
            } else if (location.pathname === '/dairy-milk') {
              e.target.loadVideoById({ videoId: TRACKS[5].id, startSeconds: TRACKS[5].start || 0 });
            }

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

    const loadYT = () => {
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
    };

    // Delay YouTube loading to prevent main thread blocking during initial render
    const tm = setTimeout(loadYT, 3000);
    return () => clearTimeout(tm);
  }, []);

  useEffect(() => {
    if (playerRef.current?.loadVideoById) {
      playerRef.current.loadVideoById({ videoId: TRACKS[currentTrackIndex].id, startSeconds: TRACKS[currentTrackIndex].start || 0 });
      playerRef.current.setVolume(isMuted ? 0 : 60);
    }
  }, [currentTrackIndex]);

  useEffect(() => {
    if (playerRef.current?.setVolume) playerRef.current.setVolume(isMuted ? 0 : 60);
  }, [isMuted]);

  const isSecretPage = location.pathname === '/for-you' || location.pathname === '/dairy-milk';

  return (
    <>
      <CustomCursor />
      {/* Hidden YouTube audio player */}
      <div id="bg-youtube-audio" style={{ display: 'none' }} />

      {/* Auto-play loading animation on first visit */}
      {showLoader && (
        <LoadingPage onFinish={() => {
          setShowLoader(false);
          sessionStorage.setItem('madhuram_loader_seen', 'true');
        }} />
      )}

      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <ScrollToTop />
        {!isSecretPage && <Navbar setExternalMenuState={setIsMenuOpen} />}

        {/* Music player FAB — hidden on secret pages */}
        {!isSecretPage && (
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
        )}

        <main style={{ flex: 1, paddingTop: (isMobile && !isSecretPage) ? '60px' : (!isSecretPage ? '68px' : '0px') }}>
          <AnimatedRoutes />
        </main>
        {!isSecretPage && <Footer />}
      </div>
      <SpeedInsights />
      <Analytics />
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
