import React from 'react';
import Toucan from './Toucan';
import './Intro.css';

// กิ่งไม้ที่นกทูแคนมาเกาะ (วางไว้ในส่วนหัวของหน้าหลัก)
export default function Perch() {
  return (
    <div className="perch" aria-hidden="true">
      <svg className="branch" viewBox="0 0 400 160" focusable="false">
        <path
          d="M420 92 C330 84 250 100 150 88 C100 82 60 90 10 76"
          stroke="#5a3d22"
          strokeWidth="12"
          strokeLinecap="round"
          fill="none"
        />
        <g fill="#2f8a45">
          <path d="M300 90 C310 66 340 58 360 66 C350 86 324 96 300 90Z" />
          <path d="M210 94 C196 120 214 142 238 146 C246 124 236 102 210 94Z" fill="#3a9d4a" />
          <path d="M120 88 C104 64 76 60 56 70 C68 90 96 98 120 88Z" fill="#1f6b3a" />
          <path d="M60 84 C44 104 52 128 74 136 C86 116 80 94 60 84Z" fill="#52b04a" />
          <path d="M360 98 C372 118 396 126 412 120 C406 100 382 90 360 98Z" fill="#1f6b3a" />
        </g>
      </svg>
      <div id="perch-spot" className="perch-toucan">
        <Toucan />
      </div>
    </div>
  );
}
