import React, { useMemo } from 'react';
import './Nature.css';

const COLORS = ['#2f8a45', '#3a9d4a', '#52b04a', '#7bb243', '#a3c94d', '#c9d65a'];
const PATHS = [
  'M50 4C18 28 10 70 38 116c46-12 66-58 52-100C76 2 62 0 50 4z',
  'M50 2C88 34 94 88 50 118C6 88 12 34 50 2z',
];
const rand = (min, max) => min + Math.random() * (max - min);

// ใบไม้ร่วงลงมาช้าๆ (fixed = เต็มจอ, ไม่ใส่ = อยู่ในกรอบของพ่อ)
export default function FallingLeaves({ count = 10, fixed = false }) {
  const leaves = useMemo(
    () =>
      Array.from({ length: count }, () => {
        const dir = Math.random() > 0.5 ? 1 : -1;
        return {
          left: rand(0, 100),
          size: rand(16, 34),
          dur: rand(12, 22),
          delay: -rand(0, 22),
          sway: rand(24, 70) * dir,
          spin: rand(200, 520) * dir,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          shape: Math.random() > 0.5 ? 0 : 1,
        };
      }),
    [count]
  );

  return (
    <div className={`fall${fixed ? ' fixed' : ''}`} aria-hidden="true">
      {leaves.map((l, i) => (
        <span
          key={i}
          className="fl"
          style={{
            '--left': `${l.left}%`,
            '--s': `${l.size}px`,
            '--dur': `${l.dur}s`,
            '--delay': `${l.delay}s`,
            '--sway': `${l.sway}px`,
            '--spin': `${l.spin}deg`,
            color: l.color,
          }}
        >
          <svg viewBox="0 0 100 120">
            <path d={PATHS[l.shape]} fill="currentColor" />
            <path
              d="M46 112C50 76 62 44 80 18"
              fill="none"
              stroke="rgba(255,255,255,.3)"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>
        </span>
      ))}
    </div>
  );
}
