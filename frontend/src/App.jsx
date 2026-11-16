import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import ChatWidget from './components/ChatWidget'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Get started</h1>
          <p>
            Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank" rel="noopener noreferrer">
                <img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank" rel="noopener noreferrer">
                <img className="button-icon" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>

        {/* ปรับเป็นส่วนแสดงรายชื่อเพื่อนในกลุ่มแทนโซเชียลเดิม */}
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Team Members</h2>
          <p>สมาชิกในกลุ่ม</p>
          
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: 0 }}>
            {/* พีรพัฒน์ */}
            <li>
              <a 
                href="https://member-portfolio-7242e8.gitlab.io" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ backgroundColor: '#10b981', color: '#ffffff', fontWeight: 'bold' }}
              >
                🌐 พีรพัฒน์ Portfolio
              </a>
            </li>

            {/* เพิ่มปุ่มของเพื่อนคนอื่นๆ ได้ตามโครงสร้างนี้เลยครับ */}
            {/* 
            <li>
              <a href="#" target="_blank" rel="noopener noreferrer">
                👤 ชื่อเพื่อนคนต่อไป
              </a>
            </li> 
            */}
          </ul>
        </div>
      </section>

      {/* แปะกล่อง AI Chatbot ไว้ด้านล่าง */}
      <section style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px' }}>
        <ChatWidget />
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App