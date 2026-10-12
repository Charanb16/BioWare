import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import BrandLogo from './BrandLogo.jsx';

const SESSION_KEY = 'bioware:intro-seen';
let hasShownInMemory = false;

function shouldShowSplash() {
  if (typeof window === 'undefined') return false;
  if (new URLSearchParams(window.location.search).get('showIntro') === '1') return true;
  if (hasShownInMemory) return false;

  try {
    return window.sessionStorage.getItem(SESSION_KEY) !== 'seen';
  } catch {
    return true;
  }
}

function markSplashSeen() {
  hasShownInMemory = true;

  try {
    window.sessionStorage.setItem(SESSION_KEY, 'seen');
  } catch {
    // The in-memory flag still prevents replay during this application session.
  }
}

function prefersReducedMotion() {
  try {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch {
    return false;
  }
}

export default function BrandSplash() {
  const [visible, setVisible] = useState(shouldShowSplash);
  const [exiting, setExiting] = useState(false);
  const skipButtonRef = useRef(null);
  const previousFocusRef = useRef(null);

  useLayoutEffect(() => {
    if (!visible) return undefined;
    const siteFrame = document.querySelector('.site-frame');
    if (!siteFrame) return undefined;
    siteFrame.setAttribute('inert', '');
    return () => siteFrame.removeAttribute('inert');
  }, [visible]);

  useEffect(() => {
    if (!visible) return undefined;

    markSplashSeen();
    if (!previousFocusRef.current && document.activeElement !== document.body) {
      previousFocusRef.current = document.activeElement;
    }
    skipButtonRef.current?.focus({ preventScroll: true });

    const duration = prefersReducedMotion() ? 800 : 1760;
    const fadeDuration = prefersReducedMotion() ? 0 : 220;
    const exitTimer = window.setTimeout(() => setExiting(true), duration - fadeDuration);
    const finishTimer = window.setTimeout(() => setVisible(false), duration);

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(finishTimer);
    };
  }, [visible]);

  useEffect(() => {
    if (visible) return;
    const previousFocus = previousFocusRef.current;
    if (previousFocus?.isConnected) previousFocus.focus({ preventScroll: true });
  }, [visible]);

  function handleKeyDown(event) {
    if (event.key === 'Escape') {
      setVisible(false);
    } else if (event.key === 'Tab') {
      event.preventDefault();
      skipButtonRef.current?.focus();
    }
  }

  if (!visible) return null;

  return (
    <div
      className={`brand-splash${exiting ? ' is-exiting' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="brand-splash-tagline"
      onKeyDown={handleKeyDown}
    >
      <div className="brand-splash__content">
        <BrandLogo variant="splash" />
        <p id="brand-splash-tagline" className="brand-splash__tagline">Sustainable by design.</p>
      </div>
      <button
        ref={skipButtonRef}
        className="brand-splash__skip"
        type="button"
        onClick={() => setVisible(false)}
      >
        Skip introduction
      </button>
    </div>
  );
}
