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

// ลิงห้อยเถาวัลย์ (แกว่งทั้งตัว โบกแขน และแกว่งหาง)
function Monkey() {
  return (
    <svg className="monkey" viewBox="0 0 120 300" aria-hidden="true" focusable="false">
      <path d="M60 0 L60 144" stroke="#6aa83a" strokeWidth="5" strokeLinecap="round" />
      <g transform="translate(0 100)">
        <g className="m-tail">
          <path
            d="M60 148 C92 156 104 186 82 190 C70 192 68 182 76 180"
            stroke="#7a4a24"
            strokeWidth="9"
            strokeLinecap="round"
            fill="none"
          />
        </g>
        <path d="M50 146 C45 160 49 172 56 176" stroke="#8b5a2b" strokeWidth="12" strokeLinecap="round" fill="none" />
        <path d="M70 146 C76 160 72 172 65 176" stroke="#8b5a2b" strokeWidth="12" strokeLinecap="round" fill="none" />
        <ellipse cx="55" cy="179" rx="9" ry="5" fill="#7a4a24" />
        <ellipse cx="66" cy="179" rx="9" ry="5" fill="#7a4a24" />
        <ellipse cx="60" cy="122" rx="24" ry="30" fill="#8b5a2b" />
        <ellipse cx="60" cy="128" rx="14" ry="20" fill="#e7c79a" />
        <g className="m-arm">
          <path d="M70 104 C86 112 92 128 88 142" stroke="#8b5a2b" strokeWidth="11" strokeLinecap="round" fill="none" />
          <circle cx="88" cy="144" r="6" fill="#7a4a24" />
        </g>
        <path d="M50 104 C38 86 46 58 60 46" stroke="#8b5a2b" strokeWidth="11" strokeLinecap="round" fill="none" />
        <circle cx="60" cy="44" r="7" fill="#7a4a24" />
        <circle cx="40" cy="80" r="8" fill="#8b5a2b" />
        <circle cx="80" cy="80" r="8" fill="#8b5a2b" />
        <circle cx="40" cy="80" r="4" fill="#e7c79a" />
        <circle cx="80" cy="80" r="4" fill="#e7c79a" />
        <circle cx="60" cy="82" r="20" fill="#8b5a2b" />
        <ellipse cx="60" cy="86" rx="14" ry="12" fill="#e7c79a" />
        <circle cx="54" cy="80" r="2.6" fill="#222" />
        <circle cx="66" cy="80" r="2.6" fill="#222" />
        <circle cx="57" cy="87" r="1.2" fill="#7a4a24" />
        <circle cx="63" cy="87" r="1.2" fill="#7a4a24" />
        <path d="M54 91 Q60 96 66 91" stroke="#7a4a24" strokeWidth="2" fill="none" strokeLinecap="round" />
      </g>
    </svg>
  );
}

// กบนั่งบนใบไม้ลอย กระพริบตา หายใจ และกระโดดเป็นระยะ
function Frog() {
  return (
    <svg className="frog" viewBox="0 0 110 90" aria-hidden="true" focusable="false">
      <g className="frog-leaf">
        <path d="M6 76 C20 62 90 62 104 76 C90 88 20 88 6 76Z" fill="#3a9d4a" />
        <path d="M16 76 L98 76" stroke="#2f8a45" strokeWidth="2" strokeLinecap="round" />
      </g>
      <g className="frog-body">
        <ellipse cx="26" cy="66" rx="13" ry="8" fill="#5db23f" transform="rotate(-20 26 66)" />
        <ellipse cx="84" cy="66" rx="13" ry="8" fill="#5db23f" transform="rotate(20 84 66)" />
        <ellipse cx="55" cy="54" rx="26" ry="20" fill="#6fc04a" />
        <ellipse className="frog-belly" cx="55" cy="60" rx="15" ry="10" fill="#d8f0a8" />
        <ellipse cx="40" cy="70" rx="8" ry="5" fill="#5db23f" />
        <ellipse cx="70" cy="70" rx="8" ry="5" fill="#5db23f" />
        <circle cx="40" cy="34" r="10" fill="#6fc04a" />
        <circle cx="70" cy="34" r="10" fill="#6fc04a" />
        <g className="frog-eyes">
          <circle cx="40" cy="33" r="6.5" fill="#fff" />
          <circle cx="70" cy="33" r="6.5" fill="#fff" />
          <circle cx="41" cy="34" r="3.4" fill="#111" />
          <circle cx="71" cy="34" r="3.4" fill="#111" />
        </g>
        <path d="M42 52 Q55 62 68 52" stroke="#2f6b2f" strokeWidth="2.2" fill="none" strokeLinecap="round" />
        <circle cx="34" cy="52" r="4.5" fill="#ff9aa2" opacity=".6" />
        <circle cx="76" cy="52" r="4.5" fill="#ff9aa2" opacity=".6" />
      </g>
    </svg>
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

      <div className="monkey-wrap">
        <Monkey />
      </div>
      <div className="frog-wrap">
        <Frog />
      </div>

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
