import React from 'react';
import './Nature.css';

// เถาวัลย์ห้อยลงมา ใบแต่ละใบโยกไม่พร้อมกัน
// จุดยึดใบอยู่บนเส้นเถา (x, y) ใบชี้ขึ้นจากจุดยึด แล้วหมุนด้วย r
const LEAVES = [
  { x: 41, y: 43, r: -60, s: 1.0, c: '#2f8a45' },
  { x: 46, y: 85, r: 62, s: 1.1, c: '#52b04a' },
  { x: 50, y: 126, r: -68, s: 1.2, c: '#3a9d4a' },
  { x: 44, y: 170, r: 60, s: 1.0, c: '#7bb243' },
  { x: 40, y: 208, r: -64, s: 1.15, c: '#1f6b3a' },
  { x: 44, y: 247, r: 62, s: 1.1, c: '#52b04a' },
  { x: 49, y: 291, r: -58, s: 1.0, c: '#2f8a45' },
  { x: 46, y: 340, r: 180, s: 1.0, c: '#7bb243' },
];

export default function Vine({ className = '', flip = false }) {
  return (
    <svg
      className={`vine${flip ? ' flip' : ''} ${className}`}
      viewBox="0 0 90 380"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M45 0 C30 60 62 110 44 170 C30 220 58 270 46 340"
        stroke="#6aa83a"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />
      {LEAVES.map((l, i) => (
        <g key={i} transform={`translate(${l.x} ${l.y}) rotate(${l.r}) scale(${l.s})`}>
          <g className="vl" style={{ '--vd': `${-i * 0.37}s` }}>
            <path d="M0 0 C-11 -12 -9 -30 0 -40 C9 -30 11 -12 0 0Z" fill={l.c} />
            <path d="M0 -3 L0 -30" stroke="rgba(255,255,255,.35)" strokeWidth="1.5" strokeLinecap="round" />
          </g>
        </g>
      ))}
    </svg>
  );
}
