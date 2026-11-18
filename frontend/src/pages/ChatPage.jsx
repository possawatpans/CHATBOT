import React from 'react';
import ChatWidget from '../components/ChatWidget';
import Footer from '../components/Footer';
import Leaf from '../components/Leaf';

export default function ChatPage() {
  return (
    <>
      <header className="arch small">
        <Leaf className="leaf-a" />
        <div className="wrap">
          <h1 className="page-title">Ask Our AI Assistant</h1>
          <p className="hero-sub">พิมพ์คำถาม หรือเลือกคำถามแนะนำเพื่อเริ่มคุยได้ทันที</p>
        </div>
      </header>

      <main className="wrap chat-page">
        <div className="chat-frame">
          <ChatWidget />
        </div>
        <a className="back-link" href="#/">
          กลับหน้าหลัก
        </a>
      </main>

      <Footer />
    </>
  );
}
