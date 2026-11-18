import React from 'react';

// ใบไม้ SVG ใช้ตกแต่ง (สีกำหนดด้วย CSS color)
export default function Leaf({ className = '' }) {
  return (
    <svg className={`leaf ${className}`} viewBox="0 0 100 120" aria-hidden="true" focusable="false">
      <path d="M50 4C18 28 10 70 38 116c46-12 66-58 52-100C76 2 62 0 50 4z" fill="currentColor" />
      <path
        d="M38 116C44 78 58 46 82 20"
        fill="none"
        stroke="rgba(255,255,255,.45)"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}
