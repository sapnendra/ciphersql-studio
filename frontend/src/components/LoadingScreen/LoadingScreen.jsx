import { useEffect, useState } from 'react';
import './LoadingScreen.scss';

const MESSAGES = [
  'Initializing SQL Sandbox...',
  'Preparing database environment...',
  'Loading assignments...',
  'Almost ready...',
];

const LoadingScreen = ({ onDone }) => {
  const [msgIndex, setMsgIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Cycle messages
    const msgTimer = setInterval(() => {
      setMsgIndex((i) => Math.min(i + 1, MESSAGES.length - 1));
    }, 600);

    // Progress bar drives the whole lifecycle
    const start = performance.now();
    const duration = 2400;

    const tick = () => {
      const elapsed = performance.now() - start;
      const pct = Math.min((elapsed / duration) * 100, 100);
      setProgress(pct);

      if (pct < 100) {
        requestAnimationFrame(tick);
      } else {
        clearInterval(msgTimer);
        setFadeOut(true);
        setTimeout(onDone, 500);
      }
    };

    requestAnimationFrame(tick);
    return () => clearInterval(msgTimer);
  }, [onDone]);

  return (
    <div className={`loading-screen${fadeOut ? ' loading-screen--fadeout' : ''}`}>
      {/* Grid background */}
      <div className="loading-screen__grid" />

      {/* Glows */}
      <div className="loading-screen__glow loading-screen__glow--purple" />
      <div className="loading-screen__glow loading-screen__glow--green" />

      <div className="loading-screen__content">
        {/* Logo */}
        <div className="loading-screen__logo">
          <div className="loading-screen__hex">
            <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
              <polygon
                points="28,4 52,17 52,39 28,52 4,39 4,17"
                stroke="url(#hexGrad)"
                strokeWidth="1.5"
                fill="rgba(255,85,0,0.08)"
                className="loading-screen__hex-poly"
              />
              <defs>
                <linearGradient id="hexGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FF5500" />
                  <stop offset="100%" stopColor="#FF8C00" />
                </linearGradient>
              </defs>
            </svg>
            <span className="loading-screen__cursor">_</span>
          </div>
          <span className="loading-screen__wordmark">
            Cipher<span>SQL</span>Studio
          </span>
        </div>

        {/* Message */}
        <p className="loading-screen__message">{MESSAGES[msgIndex]}</p>

        {/* Progress bar */}
        <div className="loading-screen__bar-track">
          <div
            className="loading-screen__bar-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

        <span className="loading-screen__pct">{Math.round(progress)}%</span>
      </div>
    </div>
  );
};

export default LoadingScreen;
