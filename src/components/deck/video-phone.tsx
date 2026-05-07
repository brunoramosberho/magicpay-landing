'use client';

import {useEffect, useRef, useState} from 'react';

// VideoPhone — iPhone-frame video player. Autoplays muted on slide enter,
// has a replay button overlay. Same .deck-phone styles as the rest of the deck
// so frames are visually consistent across slides.

export function VideoPhone({src, poster}: {src: string; poster?: string}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [ended, setEnded] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const onPlay = () => {
      setPlaying(true);
      setEnded(false);
    };
    const onPause = () => setPlaying(false);
    const onEnded = () => {
      setEnded(true);
      setPlaying(false);
    };
    v.addEventListener('play', onPlay);
    v.addEventListener('pause', onPause);
    v.addEventListener('ended', onEnded);
    return () => {
      v.removeEventListener('play', onPlay);
      v.removeEventListener('pause', onPause);
      v.removeEventListener('ended', onEnded);
    };
  }, []);

  const replay = () => {
    const v = ref.current;
    if (!v) return;
    v.currentTime = 0;
    v.play();
  };

  return (
    <div className="vp-wrap">
      <div className="deck-phone">
        <div className="deck-phone-notch" />
        <div className="deck-phone-screen vp-screen">
          <video
            ref={ref}
            src={src}
            poster={poster}
            muted
            autoPlay
            playsInline
            preload="metadata"
            className="vp-video"
          />
          {(ended || !playing) && (
            <button onClick={replay} className="vp-replay" aria-label="Replay video">
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M4 12a8 8 0 1 0 2.5-5.8M4 4v4h4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Replay</span>
            </button>
          )}
        </div>
      </div>
      <style jsx>{`
        .vp-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .vp-screen {
          background: #000;
          position: relative;
        }
        .vp-video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .vp-replay {
          position: absolute;
          bottom: 24px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(255, 255, 255, 0.95);
          color: #111;
          border: 0;
          border-radius: 999px;
          padding: 10px 18px;
          font: 500 13px/1 var(--mp-font-body);
          display: inline-flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
          transition: transform 120ms;
        }
        .vp-replay:hover {
          transform: translateX(-50%) scale(1.04);
        }
        .vp-replay :global(svg) {
          width: 16px;
          height: 16px;
        }
      `}</style>
    </div>
  );
}
