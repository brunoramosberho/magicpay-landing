'use client';

import {useEffect, useRef, useState} from 'react';

// VideoPhone — iPhone-frame video player. Autoplays muted on slide enter,
// has a replay button overlay. Same .deck-phone styles as the rest of the deck
// so frames are visually consistent across slides.
//
// On mobile we drop the phone frame (the user is *already* on a phone) and
// show the video edge-to-edge with a tap-to-fullscreen toggle that uses the
// native Fullscreen API. Tapping again — or pressing the close button —
// exits fullscreen and returns the inline player.

type Vid = HTMLVideoElement & {
  webkitEnterFullscreen?: () => void;
  webkitExitFullscreen?: () => void;
  webkitDisplayingFullscreen?: boolean;
};

export function VideoPhone({src, poster}: {src: string; poster?: string}) {
  const ref = useRef<HTMLVideoElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [ended, setEnded] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [isFs, setIsFs] = useState(false);

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

    const onFs = () => {
      const fsEl = document.fullscreenElement;
      setIsFs(Boolean(fsEl && (fsEl === v || fsEl === wrapRef.current)));
    };
    const onWebkitFs = () => {
      const vv = v as Vid;
      setIsFs(Boolean(vv.webkitDisplayingFullscreen));
    };
    document.addEventListener('fullscreenchange', onFs);
    v.addEventListener('webkitbeginfullscreen', onWebkitFs);
    v.addEventListener('webkitendfullscreen', onWebkitFs);

    return () => {
      v.removeEventListener('play', onPlay);
      v.removeEventListener('pause', onPause);
      v.removeEventListener('ended', onEnded);
      document.removeEventListener('fullscreenchange', onFs);
      v.removeEventListener('webkitbeginfullscreen', onWebkitFs);
      v.removeEventListener('webkitendfullscreen', onWebkitFs);
    };
  }, []);

  const replay = () => {
    const v = ref.current;
    if (!v) return;
    v.currentTime = 0;
    v.play();
  };

  const toggleFullscreen = () => {
    const v = ref.current as Vid | null;
    const wrap = wrapRef.current;
    if (!v) return;

    const exit = async () => {
      if (document.fullscreenElement) {
        try {
          await document.exitFullscreen();
        } catch {
          // ignore
        }
      } else if (v.webkitExitFullscreen) {
        v.webkitExitFullscreen();
      }
    };

    const enter = async () => {
      // iOS Safari only supports fullscreen on the <video> itself.
      if (v.webkitEnterFullscreen) {
        v.webkitEnterFullscreen();
        return;
      }
      // Everywhere else: fullscreen the wrapper so our custom controls stay
      // visible and the close button is reachable.
      try {
        await (wrap ?? v).requestFullscreen({navigationUI: 'hide'});
      } catch {
        try {
          await v.requestFullscreen();
        } catch {
          // ignore
        }
      }
    };

    if (isFs) {
      exit();
    } else {
      enter();
    }
  };

  return (
    <div ref={wrapRef} className={`vp-wrap ${isFs ? 'is-fs' : ''}`}>
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
            onClick={toggleFullscreen}
          />
          {(ended || !playing) && !isFs && (
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
          <button
            type="button"
            onClick={toggleFullscreen}
            className="vp-fs-toggle"
            aria-label={isFs ? 'Exit fullscreen' : 'Open video fullscreen'}
          >
            {isFs ? (
              <svg viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M9 4H4v5M15 4h5v5M9 20H4v-5M15 20h5v-5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </button>
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
          cursor: pointer;
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
        .vp-fs-toggle {
          position: absolute;
          top: 12px;
          right: 12px;
          width: 36px;
          height: 36px;
          padding: 0;
          background: rgba(0, 0, 0, 0.55);
          border: 0;
          border-radius: 999px;
          color: #fff;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          opacity: 0;
          transition: opacity 160ms ease;
          z-index: 2;
        }
        .vp-fs-toggle :global(svg) {
          width: 18px;
          height: 18px;
        }
        .vp-wrap:hover .vp-fs-toggle,
        .vp-wrap.is-fs .vp-fs-toggle {
          opacity: 1;
        }

        @media (max-width: 640px) {
          .vp-fs-toggle {
            opacity: 1;
          }
          .vp-wrap :global(.deck-phone) {
            border-radius: var(--mp-radius-lg);
            padding: 0;
            background: transparent;
            box-shadow: 0 12px 32px rgba(0, 0, 0, 0.18);
            width: 100%;
            max-width: 360px;
            aspect-ratio: 9 / 19.5;
          }
          .vp-wrap :global(.deck-phone-notch) {
            display: none;
          }
          .vp-screen {
            border-radius: var(--mp-radius-lg);
            overflow: hidden;
          }
        }

        .vp-wrap:fullscreen {
          background: #000;
          width: 100vw;
          height: 100vh;
          padding: 0;
        }
        .vp-wrap:fullscreen :global(.deck-phone) {
          width: 100%;
          height: 100%;
          max-width: none;
          padding: 0;
          background: #000;
          border-radius: 0;
          aspect-ratio: auto;
          box-shadow: none;
        }
        .vp-wrap:fullscreen :global(.deck-phone-notch) {
          display: none;
        }
        .vp-wrap:fullscreen .vp-screen {
          width: 100%;
          height: 100%;
          border-radius: 0;
        }
        .vp-wrap:fullscreen .vp-video {
          object-fit: contain;
        }
      `}</style>
    </div>
  );
}
