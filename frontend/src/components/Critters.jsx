import React from 'react';
import Leaf from './Leaf';
import './Nature.css';

// ฉากสัตว์สำหรับการ์ดสมาชิก (วางสลับกับการ์ดในหน้าหลัก)
// ทุกฉากอยู่ในก้อนพื้นหลังสีเขียวทรงอินทรีย์ แล้วมีสัตว์ + ของตกแต่งรอบๆ
// ท่าขยับของสัตว์อยู่ใน Nature.css

// ก้อนพื้นหลัง 3 แบบ (ใช้ตามลำดับฉาก)
const BLOBS = [
  {
    back: 'M48 46 C96 -6 214 4 258 62 C304 122 288 204 224 238 C160 270 70 258 34 204 C-2 150 6 90 48 46Z',
    front: 'M70 62 C108 22 196 24 232 70 C266 114 250 184 202 210 C154 236 88 226 62 182 C36 140 40 92 70 62Z',
  },
  {
    back: 'M40 80 C50 20 140 -4 214 24 C282 50 308 130 262 196 C220 256 120 266 60 224 C10 188 30 130 40 80Z',
    front: 'M66 92 C76 52 146 34 204 54 C256 74 270 134 234 180 C198 224 124 232 82 198 C48 170 60 130 66 92Z',
  },
  {
    back: 'M30 120 C22 60 90 6 170 8 C250 10 306 70 290 150 C276 222 200 262 120 252 C54 244 36 180 30 120Z',
    front: 'M58 122 C54 78 104 40 166 42 C226 44 262 90 252 148 C242 200 188 226 128 220 C80 214 62 168 58 122Z',
  },
];

function Stage({ variant, className = '', children }) {
  const b = BLOBS[variant % BLOBS.length];
  return (
    <div className={`art ${className}`}>
      <svg className="art-blob" viewBox="0 0 300 260" aria-hidden="true" focusable="false">
        <path className="blob-back" d={b.back} />
        <path className="blob-front" d={b.front} />
      </svg>
      {children}
    </div>
  );
}

// กิ่งไม้พาดด้านบนฉาก (ให้ลิงและสลอธเกาะ)
function Branch() {
  return (
    <svg className="art-branch" viewBox="0 0 300 48" aria-hidden="true" focusable="false">
      <path
        d="M-6 26 C60 12 140 36 214 18 C256 8 288 18 308 14"
        stroke="#5a3d22"
        strokeWidth="10"
        strokeLinecap="round"
        fill="none"
      />
      <path d="M70 22 C60 4 38 2 24 10 C34 26 54 30 70 22Z" fill="#2f8a45" />
      <path d="M150 28 C158 46 180 50 196 44 C190 28 168 20 150 28Z" fill="#52b04a" />
      <path d="M232 14 C240 -2 262 -4 276 4 C268 20 248 24 232 14Z" fill="#1f6b3a" />
    </svg>
  );
}

function Flower({ className = '', color = '#ff8fc0' }) {
  return (
    <svg className={`art-deco art-flower ${className}`} viewBox="0 0 40 40" aria-hidden="true" focusable="false">
      <g fill={color}>
        {[0, 72, 144, 216, 288].map((a) => (
          <ellipse key={a} cx="20" cy="9" rx="6" ry="9" transform={`rotate(${a} 20 20)`} />
        ))}
      </g>
      <circle cx="20" cy="20" r="5" fill="#ffe45e" />
    </svg>
  );
}

function Banana({ className = '' }) {
  return (
    <svg className={`art-deco art-banana ${className}`} viewBox="0 0 40 40" aria-hidden="true" focusable="false">
      <path d="M6 8 C6 28 22 38 36 32 C26 31 14 24 12 6Z" fill="#ffd83d" />
      <path d="M6 8 L12 6" stroke="#7a5a14" strokeWidth="3" strokeLinecap="round" />
      <path d="M36 32 L38 30" stroke="#7a5a14" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function Reeds({ className = '' }) {
  return (
    <svg className={`art-deco art-reeds ${className}`} viewBox="0 0 60 120" aria-hidden="true" focusable="false">
      <g stroke="#3f7d3a" strokeWidth="3" strokeLinecap="round" fill="none">
        <path d="M14 120 C12 80 16 40 12 14" />
        <path d="M30 120 C32 84 28 52 32 24" />
        <path d="M46 120 C44 90 48 62 44 40" />
      </g>
      <g fill="#7a4a24">
        <rect x="9" y="8" width="7" height="20" rx="3.5" />
        <rect x="29" y="16" width="7" height="20" rx="3.5" />
      </g>
    </svg>
  );
}

// ลิงห้อยเถาวัลย์ (แกว่งทั้งตัว โบกแขน และแกว่งหาง)
function Monkey() {
  return (
    <svg className="monkey" viewBox="0 60 120 240" aria-hidden="true" focusable="false">
      <path d="M60 60 L60 144" stroke="#6aa83a" strokeWidth="5" strokeLinecap="round" />
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

// สลอธห้อยกิ่งไม้ แกว่งช้าๆ และกะพริบตา
function Sloth() {
  return (
    <svg className="sloth" viewBox="0 0 200 240" aria-hidden="true" focusable="false">
      {/* แขนทั้งสองข้างเกาะกิ่ง */}
      <g stroke="#8d7457" strokeWidth="13" strokeLinecap="round" fill="none">
        <path d="M80 22 C72 50 70 80 84 108" />
        <path d="M120 22 C128 50 130 80 116 108" />
      </g>
      <g stroke="#4a3a2a" strokeWidth="3" strokeLinecap="round" fill="none">
        <path d="M74 22 L70 13 M80 22 L80 12 M86 22 L90 13" />
        <path d="M114 22 L110 13 M120 22 L120 12 M126 22 L130 13" />
      </g>

      {/* ขา */}
      <g stroke="#8d7457" strokeWidth="14" strokeLinecap="round" fill="none">
        <path d="M86 170 C80 190 84 206 92 214" />
        <path d="M114 170 C120 190 116 206 108 214" />
      </g>
      <g stroke="#4a3a2a" strokeWidth="3" strokeLinecap="round" fill="none">
        <path d="M88 218 L84 228 M94 218 L94 230 M100 216 L104 226" />
        <path d="M112 218 L116 228 M106 218 L106 230 M100 216 L96 226" />
      </g>

      {/* ลำตัว */}
      <ellipse cx="100" cy="146" rx="36" ry="46" fill="#a58a69" />
      <ellipse cx="100" cy="154" rx="22" ry="32" fill="#c8b08b" />

      {/* หัว + หน้า */}
      <circle cx="100" cy="92" r="30" fill="#b89e7a" />
      <ellipse cx="100" cy="98" rx="23" ry="19" fill="#efe3c8" />
      <ellipse cx="87" cy="92" rx="8" ry="6" fill="#5b4630" transform="rotate(-24 87 92)" />
      <ellipse cx="113" cy="92" rx="8" ry="6" fill="#5b4630" transform="rotate(24 113 92)" />
      <g className="sloth-eyes">
        <circle cx="87" cy="92" r="3" fill="#111" />
        <circle cx="113" cy="92" r="3" fill="#111" />
        <circle cx="88" cy="91" r="1" fill="#fff" />
        <circle cx="114" cy="91" r="1" fill="#fff" />
      </g>
      <ellipse cx="100" cy="101" rx="5" ry="3.5" fill="#3b2a1a" />
      <path d="M92 108 Q100 115 108 108" stroke="#7a5a3a" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

// ---------- ฉากทั้ง 3 ----------

export function MonkeyScene() {
  return (
    <Stage variant={0} className="scene-monkey">
      <Branch />
      <div className="art-monkey">
        <Monkey />
      </div>
      <Banana className="d-banana-1" />
      <Banana className="d-banana-2" />
      <Flower className="d-flower-1" color="#ff8fc0" />
      <Leaf className="art-leaf d-leaf-1" />
      <Leaf className="art-leaf d-leaf-2" />
      <span className="sparkle s1" />
      <span className="sparkle s2" />
      <span className="sparkle s3" />
    </Stage>
  );
}

export function FrogScene() {
  return (
    <Stage variant={1} className="scene-frog">
      <div className="pond" />
      <span className="ripple r1" />
      <span className="ripple r2" />
      <Reeds className="d-reeds" />
      <div className="art-frog">
        <Frog />
      </div>
      <Flower className="d-lotus" color="#ff9ccb" />
      <Flower className="d-flower-2" color="#ffd36b" />
      <Leaf className="art-leaf d-leaf-3" />
      <span className="sparkle s1" />
      <span className="sparkle s2" />
      <span className="sparkle s3" />
    </Stage>
  );
}

export function SlothScene() {
  return (
    <Stage variant={2} className="scene-sloth">
      <Branch />
      <div className="art-sloth">
        <Sloth />
      </div>
      <span className="zzz z1">z</span>
      <span className="zzz z2">z</span>
      <span className="zzz z3">Z</span>
      <Flower className="d-flower-3" color="#ff8fc0" />
      <Leaf className="art-leaf d-leaf-4" />
      <Leaf className="art-leaf d-leaf-5" />
      <span className="sparkle s1" />
      <span className="sparkle s2" />
    </Stage>
  );
}

export const critterScenes = [MonkeyScene, FrogScene, SlothScene];
