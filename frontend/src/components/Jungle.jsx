import React, { useMemo } from 'react';
import Vine from './Vine';
import FallingLeaves from './FallingLeaves';
import './Nature.css';

const rand = (min, max) => min + Math.random() * (max - min);

// ผีเสื้อ: tone = a (ส้ม) | b (ฟ้า) | c (ชมพู)
const WING_TOP = 'M28 24 C16 2 0 6 3 20 C5 29 19 30 28 26Z';
const WING_BOTTOM = 'M28 27 C18 30 7 36 12 45 C19 50 27 41 28 30Z';

function Butterfly({ tone, style, rev = false }) {
  return (
    <div className={`bf bf-${tone}${rev ? ' rev' : ''}`} style={style}>
      <svg className="bf-svg" viewBox="0 0 60 50">
        <g className="bf-wings">
          <path className="bf-w1" d={WING_TOP} />
          <path className="bf-w2" d={WING_BOTTOM} />
          <g transform="translate(60 0) scale(-1 1)">
            <path className="bf-w1" d={WING_TOP} />
            <path className="bf-w2" d={WING_BOTTOM} />
          </g>
          <circle cx="12" cy="16" r="3" fill="rgba(255,255,255,.7)" />
          <circle cx="48" cy="16" r="3" fill="rgba(255,255,255,.7)" />
        </g>
        <ellipse cx="30" cy="26" rx="2.4" ry="12" fill="#3b2a1a" />
        <path
          d="M29 15 Q26 8 22 6 M31 15 Q34 8 38 6"
          stroke="#3b2a1a"
          strokeWidth="1.3"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

export default function Jungle() {
  const fireflies = useMemo(
    () =>
      Array.from({ length: 16 }, () => ({
        x: rand(2, 98),
        y: rand(35, 96),
        mx: rand(-60, 60),
        my: rand(-50, 50),
        dur: rand(6, 12),
        delay: -rand(0, 12),
      })),
    []
  );

  return (
    <div className="jungle" aria-hidden="true">
      <Vine className="jv jv-1" />
      <Vine className="jv jv-3" />
      <Vine className="jv jv-2" flip />

      <Butterfly tone="a" style={{ top: '300px', '--w': '48px', '--dur': '26s', '--delay': '-4s' }} />
      <Butterfly tone="b" rev style={{ top: '400px', '--w': '40px', '--dur': '32s', '--delay': '-14s' }} />
      <Butterfly tone="c" style={{ top: '470px', '--w': '44px', '--dur': '38s', '--delay': '-24s' }} />

      {fireflies.map((f, i) => (
        <span
          key={i}
          className="ff"
          style={{
            '--x': `${f.x}%`,
            '--y': `${f.y}%`,
            '--mx': `${f.mx}px`,
            '--my': `${f.my}px`,
            '--dur': `${f.dur}s`,
            '--delay': `${f.delay}s`,
          }}
        />
      ))}

      <FallingLeaves count={7} />
    </div>
  );
}
