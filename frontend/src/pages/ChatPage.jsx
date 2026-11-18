import React from 'react';
import ChatWidget from '../components/ChatWidget';
import Footer from '../components/Footer';
import Leaf from '../components/Leaf';
import Vine from '../components/Vine';
import Toucan from '../components/Toucan';
import FallingLeaves from '../components/FallingLeaves';

export default function ChatPage() {
  return (
    <div className="chat-scene">
      <FallingLeaves fixed count={14} />

      <header className="arch small">
        <Leaf className="leaf-a" />
        <div className="wrap">
          <h1 className="page-title">Ask Our AI Assistant</h1>
          <p className="hero-sub">พิมพ์คำถาม หรือเลือกคำถามแนะนำเพื่อเริ่มคุยได้ทันที</p>
        </div>
      </header>

      <div className="vines" aria-hidden="true">
        <Vine className="v1" />
        <Vine className="v3" />
        <Vine className="v2" flip />
      </div>

      <main className="wrap chat-page">
        <Leaf className="cl cl-1" />
        <Leaf className="cl cl-2" />
        <Leaf className="cl cl-3" />
        <Leaf className="cl cl-4" />

        <div className="perch-toucan chat-toucan" aria-hidden="true">
          <Toucan />
        </div>

        <div className="chat-frame">
          <ChatWidget />
        </div>
        <a className="back-link" href="#/">
          กลับหน้าหลัก
        </a>
      </main>

      <Footer />
    </div>
  );
}
