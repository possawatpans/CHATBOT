import React, { useEffect, useMemo, useRef, useState } from 'react';
import Toucan from './Toucan';
import './Intro.css';

const COLORS = ['#14532d', '#166534', '#1f6b3a', '#2f8a45', '#3a9d4a', '#52b04a', '#7bb243'];
const rand = (min, max) => min + Math.random() * (max - min);

// สร้างกองใบไม้แบบสุ่ม 1 ครั้งต่อการเปิดหน้า
function makeLeaves() {
  return Array.from({ length: 46 }, () => {
    const x = rand(-5, 105);
    const y = rand(-5, 105);
    const angle = Math.atan2(y - 50, x - 50);
    const far = rand(90, 150);
    const r = rand(-80, 80);
    return {
      x,
      y,
      size: rand(26, 48),
      shape: Math.random() > 0.5 ? 0 : 1,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      r,
      r2: r + rand(-220, 220),
      dx: Math.cos(angle) * far,
      dy: Math.sin(angle) * far,
      d: Math.hypot(x - 50, y - 50) / 220 + rand(0, 0.15),
    };
  }).sort((a, b) => b.size - a.size); // ใบเล็กอยู่ด้านบน
}

const PATHS = [
  'M50 4C18 28 10 70 38 116c46-12 66-58 52-100C76 2 62 0 50 4z',
  'M50 2C88 34 94 88 50 118C6 88 12 34 50 2z',
];

export default function Intro({ onDone }) {
  const [phase, setPhase] = useState('idle'); // idle > dive > inside > burst > fly
  const [landing, setLanding] = useState(false); // ช่วงกางปีกเบรกก่อนลงเกาะ
  const birdRef = useRef(null);
  const leaves = useMemo(makeLeaves, []);
  const timers = useRef([]);
  // ตอนพุ่งเข้ากองใบไม้ให้เห็นนกจากด้านหลัง เหมือนมองนกบินห่างออกไป
  const showBack = phase === 'dive' || phase === 'inside' || phase === 'burst';

  // ล็อกการเลื่อนหน้าระหว่างอินโทร
  useEffect(() => {
    window.scrollTo(0, 0);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
      timers.current.forEach(clearTimeout);
    };
  }, []);

  const later = (fn, ms) => timers.current.push(setTimeout(fn, ms));

  const flyToBranch = () => {
    const bird = birdRef.current;
    const spot = document.getElementById('perch-spot');
    if (!bird || !spot || !bird.animate) return onDone();

    setPhase('fly');
    const t = spot.getBoundingClientRect();
    const H = window.innerHeight;
    const s = t.width / bird.offsetWidth;
    const dx = t.left + t.width / 2 - window.innerWidth / 2;
    const dy = t.top + t.height / 2 - H / 2;
    const f = (x, y, sc, flip, rot) =>
      `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(${sc}) scaleX(${flip}) rotate(${rot}deg)`;

    // เส้นทางบิน: พุ่งขึ้น > ร่อนลง > เงยหัวก่อนลงเกาะ
    const anim = bird.animate(
      [
        { transform: f(0, 0, 0.3, 1, 0) },
        { transform: f(dx * 0.08, -H * 0.12, s * 1.2, 1, -18), offset: 0.2 },
        { transform: f(dx * 0.38, Math.min(-H * 0.22, dy - 60), s * 1.55, 1, -8), offset: 0.45 },
        { transform: f(dx * 0.82, dy - 50, s * 1.15, 1, 12), offset: 0.75 },
        { transform: f(dx * 0.97, dy - 14, s * 1.03, 1, -10), offset: 0.9 },
        { transform: f(dx, dy, s, -1, 0) },
      ],
      { duration: 1800, easing: 'ease-in-out', fill: 'forwards' }
    );
    later(() => setLanding(true), 1500); // กางปีกเบรกก่อนลงเกาะ
    anim.onfinish = onDone;
  };

  const start = () => {
    if (phase !== 'idle') return;
    setPhase('dive');
    later(() => setPhase('inside'), 750); // นกหายเข้าไปในกองใบไม้
    later(() => setPhase('burst'), 1150); // ใบไม้กระจาย
    later(flyToBranch, 1950); // นกบินไปเกาะกิ่งไม้
  };

  return (
    <div className={`intro ${phase}${landing ? ' land' : ''}`}>
      <div className="intro-bg" />

      {leaves.map((l, i) => (
        <span
          key={i}
          className="il"
          style={{
            left: `${l.x}%`,
            top: `${l.y}%`,
            color: l.color,
            '--r': `${l.r}deg`,
            '--r2': `${l.r2}deg`,
            '--dx': `${l.dx}vmax`,
            '--dy': `${l.dy}vmax`,
            '--d': `${l.d}s`,
          }}
        >
          <svg
            viewBox="0 0 100 120"
            style={{ width: `${l.size}vmax`, height: `${l.size * 1.2}vmax` }}
            aria-hidden="true"
          >
            <path d={PATHS[l.shape]} fill="currentColor" />
            <path
              d="M46 112C50 76 62 44 80 18"
              fill="none"
              stroke="rgba(255,255,255,.28)"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </span>
      ))}

      <button
        ref={birdRef}
        type="button"
        className="ib"
        onClick={start}
        aria-label="แตะที่นกทูแคนเพื่อเข้าสู่ป่าแอมะซอน"
      >
        <Toucan view={showBack ? 'back' : 'side'} />
      </button>

      <p className="intro-hint">แตะที่นกทูแคนเพื่อเข้าสู่ป่าแอมะซอน</p>
      <button type="button" className="intro-skip" onClick={onDone}>
        ข้าม
      </button>
    </div>
  );
}
