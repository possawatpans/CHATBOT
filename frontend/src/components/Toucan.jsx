import React from 'react';

// นกทูแคน (นกปากกล้วย) วาดด้วย SVG
// view="side" = มองด้านข้าง หันหน้าไปทางขวา (ใช้ตอนรอ ตอนบินไปกิ่งไม้ และตอนเกาะกิ่ง)
// view="back" = มองจากด้านหลัง (ใช้ตอนบินเข้าไปในกองใบไม้)
// .wing / .wing-far / .tail / .wing-b ถูกขยับด้วย CSS ใน Intro.css

const WING =
  'M126 92 C100 88 78 108 68 138 C64 152 66 164 72 172 C82 168 98 160 110 148 C124 132 132 108 126 92Z';

const WING_BACK =
  'M146 82 C176 58 214 58 248 78 C241 82 239 87 241 91 C233 91 229 97 231 103 C223 101 217 107 217 113 C209 109 201 115 199 121 C191 115 181 119 177 125 C168 113 156 109 146 112Z';

function Side({ className }) {
  return (
    <svg className={`toucan ${className}`} viewBox="0 0 260 230" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="tc-beak" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffd83d" />
          <stop offset=".6" stopColor="#ffb02e" />
          <stop offset="1" stopColor="#ff8a1f" />
        </linearGradient>
      </defs>

      {/* หาง */}
      <g className="tail">
        <path d="M90 150 C66 180 44 206 32 224 C58 224 90 202 112 152Z" fill="#17171c" />
        <path d="M100 154 C84 180 66 204 54 222 C74 216 98 194 112 158Z" fill="#282a35" />
        <path d="M88 152 C84 160 80 164 74 170 C88 172 102 166 112 156Z" fill="#e5391a" />
      </g>

      {/* เท้า */}
      <g stroke="#7a8794" strokeWidth="5" strokeLinecap="round" fill="none">
        <path d="M104 170 L101 188 M124 164 L126 188" />
        <path d="M101 188 L113 190 M101 188 L108 193 M126 188 L138 190 M126 188 L133 193" strokeWidth="4" />
      </g>

      {/* ปีกข้างไกล (โผล่หลังลำตัว) */}
      <g transform="translate(14 -12)">
        <g className="wing-far">
          <path d={WING} fill="#1f2631" />
        </g>
      </g>

      {/* หงอนสีส้ม */}
      <path d="M98 46 C106 26 134 18 160 28 C158 36 150 40 142 38 C126 36 110 44 102 58Z" fill="#f0852a" />

      {/* ลำตัว */}
      <ellipse cx="110" cy="122" rx="44" ry="60" fill="#1b1b21" transform="rotate(28 110 122)" />

      {/* อกสีครีม */}
      <path
        d="M140 82 C164 90 166 116 152 140 C142 154 124 152 118 132 C113 112 124 88 140 82Z"
        fill="#f7f1de"
      />

      {/* หัว + หน้าสีเหลือง */}
      <circle cx="126" cy="62" r="32" fill="#1b1b21" />
      <ellipse cx="142" cy="62" rx="22" ry="21" fill="#ffc43a" />

      {/* ปีกข้างใกล้ */}
      <g className="wing">
        <path d={WING} fill="#2b3340" />
        <path
          d="M68 140 C64 152 66 164 72 172 C80 168 90 164 98 158 L90 152 L100 146 L88 142 L94 134 C84 134 74 136 68 140Z"
          fill="#f7b84a"
        />
        <path
          d="M120 98 C102 110 88 126 80 146 M124 104 C110 118 100 134 94 150"
          stroke="#3d485a"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
      </g>

      {/* ปาก */}
      <path
        d="M150 44 C186 30 232 50 253 98 C254 103 250 105 246 104 C212 99 178 92 150 84Z"
        fill="url(#tc-beak)"
      />
      <path
        d="M150 76 C178 86 212 94 246 104 C250 105 254 103 253 98 C252 95 251 93 250 90 C214 92 176 82 150 68Z"
        fill="#f0652a"
      />
      <path
        d="M226 66 C240 74 248 86 253 98 C254 103 250 105 246 104 C238 102 230 100 224 97 C230 88 230 76 226 66Z"
        fill="#1b1b21"
      />
      <path
        d="M162 52 C192 44 222 56 238 80"
        stroke="#fff3a8"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        opacity=".6"
      />
      <path d="M150 44 C144 56 144 72 150 84" stroke="#1b1b21" strokeWidth="3.5" fill="none" strokeLinecap="round" />

      {/* ตา */}
      <circle cx="140" cy="57" r="11.5" fill="#fff" />
      <circle cx="142" cy="58" r="6.5" fill="#111" />
      <circle cx="144" cy="56" r="2" fill="#fff" />
    </svg>
  );
}

function Back({ className }) {
  return (
    <svg
      className={`toucan toucan-back ${className}`}
      viewBox="0 0 260 230"
      aria-hidden="true"
      focusable="false"
    >
      {/* หาง (พัดออกมาทางผู้ชม) */}
      <path d="M110 146 L100 212 C112 226 148 226 160 212 L150 146Z" fill="#17171c" />
      <path
        d="M122 150 L118 218 M130 150 L130 222 M138 150 L142 218"
        stroke="#2b2d38"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* ปีกข้างซ้าย (สะท้อนจากข้างขวา) */}
      <g transform="translate(260 0) scale(-1 1)">
        <g className="wing-b">
          <path d={WING_BACK} fill="#2b3340" />
          <path
            d="M177 125 C181 119 191 115 199 121 C201 115 209 109 217 113 C215 119 211 125 203 131 C193 135 183 133 177 125Z"
            fill="#f7b84a"
          />
        </g>
      </g>

      {/* ปีกข้างขวา */}
      <g className="wing-b">
        <path d={WING_BACK} fill="#2b3340" />
        <path
          d="M177 125 C181 119 191 115 199 121 C201 115 209 109 217 113 C215 119 211 125 203 131 C193 135 183 133 177 125Z"
          fill="#f7b84a"
        />
      </g>

      {/* ลำตัว + แถบสะโพกสีครีม */}
      <ellipse cx="130" cy="112" rx="34" ry="52" fill="#1b1b21" />
      <path d="M100 142 C114 154 146 154 160 142 L156 132 C142 142 118 142 104 132Z" fill="#f7f1de" />

      {/* หัวและหงอน */}
      <circle cx="130" cy="58" r="22" fill="#1b1b21" />
      <path d="M114 44 C120 34 140 34 146 44 C138 40 122 40 114 44Z" fill="#f0852a" />
    </svg>
  );
}

export default function Toucan({ className = '', view = 'side' }) {
  return view === 'back' ? <Back className={className} /> : <Side className={className} />;
}
