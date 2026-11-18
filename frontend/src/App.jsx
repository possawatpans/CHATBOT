import React, { useEffect, useState } from 'react';
import Home from './pages/Home';
import ChatPage from './pages/ChatPage';
import Leaf from './components/Leaf';
import Intro from './components/Intro';
import './App.css';

// ใช้ hash routing (#/ และ #/chat) ไม่ต้องติดตั้งแพ็กเกจเพิ่ม และ refresh บน Vercel ได้ปกติ
const getRoute = () => window.location.hash.replace(/^#/, '') || '/';

// แสดงอินโทรเฉพาะตอนเปิดหน้าหลัก และเฉพาะคนที่ไม่ได้ตั้งค่าลดการเคลื่อนไหว
const shouldShowIntro = () =>
  getRoute() === '/' && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function App() {
  const [route, setRoute] = useState(getRoute());
  const [introOn, setIntroOn] = useState(shouldShowIntro);

  useEffect(() => {
    const onChange = () => {
      setRoute(getRoute());
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);

  const isChat = route === '/chat';

  useEffect(() => {
    document.title = isChat ? 'คุยกับ AI | Team Portfolio' : 'AI & Data Science Team Portfolio';
  }, [isChat]);

  return (
    <div className={`site${introOn ? ' intro-on' : ''}`}>
      <nav className="nav">
        <div className="wrap nav-inner">
          <a className="brand" href="#/">
            <Leaf className="brand-leaf" />
            AI &amp; Data Science Team
          </a>
          <div className="nav-links">
            <a href="#/" className={!isChat ? 'active' : ''}>
              หน้าหลัก
            </a>
            <a href="#/chat" className={isChat ? 'active' : ''}>
              คุยกับ AI
            </a>
          </div>
        </div>
      </nav>

      {isChat ? <ChatPage /> : <Home />}

      {introOn && <Intro onDone={() => setIntroOn(false)} />}
    </div>
  );
}
