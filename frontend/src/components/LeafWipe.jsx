import React, { useMemo } from 'react';
import './Nature.css';

const COLORS = ['#14532d', '#166534', '#1f6b3a', '#2f8a45', '#3a9d4a', '#52b04a', '#7bb243'];
const PATHS = [
  'M50 4C18 28 10 70 38 116c46-12 66-58 52-100C76 2 62 0 50 4z',
  'M50 2C88 34 94 88 50 118C6 88 12 34 50 2z',
];
const rand = (min, max) => min + Math.random() * (max - min);

// ใบไม้ปัดผ่านหน้าจอตอนเปลี่ยนหน้า
// phase = 'cover' (ใบไม้พัดเข้ามาบังจอ) แล้วเป็น 'reveal' (ใบไม้พัดออกไปเผยหน้าใหม่)
export default function LeafWipe({ phase }) {
  const leaves = useMemo(
    () =>
      Array.from({ length: 60 }, () => {
        const x = rand(-4, 104);
        return {
          x,
          y: rand(-6, 106),
          size: rand(22, 42),
          shape: Math.random() > 0.5 ? 0 : 1,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          r: rand(-70, 70),
          dy: rand(-18, 18),
          d: ((x + 4) / 108) * 0.25 + rand(0, 0.06), // ใบฝั่งซ้ายมาก่อน เหมือนลมพัดจากซ้ายไปขวา
        };
      }).sort((a, b) => b.size - a.size),
    []
  );

  return (
    <div className={`wipe ${phase}`} aria-hidden="true">
      <div className="wipe-bg" />
      {leaves.map((l, i) => (
        <span
          key={i}
          className="wl"
          style={{
            '--x': `${l.x}%`,
            '--y': `${l.y}%`,
            '--r': `${l.r}deg`,
            '--dy': `${l.dy}vh`,
            '--d': `${l.d}s`,
            color: l.color,
          }}
        >
          <svg viewBox="0 0 100 120" style={{ width: `${l.size}vmax`, height: `${l.size * 1.2}vmax` }}>
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
    </div>
  );
}
