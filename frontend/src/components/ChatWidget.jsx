import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Send, Bot, Sparkles } from 'lucide-react';
import './ChatWidget.css';

// รายการคำถามแนะนำ (สามารถเพิ่มชื่อเพื่อนคนที่ 2 และ 3 เข้าไปตรงนี้ได้ครับ)
const QUICK_PROMPTS = [
  'สมาชิกในกลุ่มมีใครบ้าง?',
  'สมาชิกถนัดด้านไหน?',
  'มีผลงานหรือโปรเจกต์อะไรบ้าง?',
];

const nowTime = () =>
  new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });

export default function ChatWidget() {
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'สวัสดีครับ! สอบถามข้อมูลทักษะและผลงานของสมาชิกทั้ง 3 คนในกลุ่มได้เลยครับ หรือกดเลือกคำถามแนะนำด้านล่างก็ได้ครับ',
      time: nowTime(),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bodyRef = useRef(null);

  // เลื่อนเฉพาะในกล่องแชท ไม่ให้ทั้งหน้าเลื่อนตาม
  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
  }, [messages, loading]);

  const handleSendText = async (textToSend) => {
    if (!textToSend.trim() || loading) return;

    setInput('');
    setMessages((prev) => [...prev, { sender: 'user', text: textToSend, time: nowTime() }]);
    setLoading(true);

    try {
      const res = await axios.post('https://chatbot-nine-sable-75.vercel.app/api/chat', {
        message: textToSend,
      });
      setMessages((prev) => [...prev, { sender: 'bot', text: res.data.reply, time: nowTime() }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: 'ขออภัยครับ เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์ backend',
          time: nowTime(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    handleSendText(input);
  };

  return (
    <div className="cw">
      <div className="cw-header">
        <div className="cw-avatar-lg">
          <Bot size={22} color="#06210f" />
        </div>
        <div>
          <div className="cw-title">Team Portfolio AI Assistant</div>
          <div className="cw-status">ออนไลน์</div>
        </div>
      </div>

      <div className="cw-body" ref={bodyRef}>
        {messages.map((msg, idx) => {
          const isUser = msg.sender === 'user';
          return (
            <div key={idx} className={isUser ? 'cw-row user' : 'cw-row'}>
              {!isUser && (
                <div className="cw-avatar">
                  <Bot size={18} color="#1d2b23" />
                </div>
              )}
              {isUser && <span className="cw-time">{msg.time}</span>}
              <div className={isUser ? 'cw-bubble user' : 'cw-bubble bot'}>{msg.text}</div>
              {!isUser && <span className="cw-time">{msg.time}</span>}
            </div>
          );
        })}

        {loading && (
          <div className="cw-row">
            <div className="cw-avatar">
              <Bot size={18} color="#1d2b23" />
            </div>
            <div className="cw-bubble bot cw-typing" role="status" aria-label="กำลังพิมพ์">
              <span />
              <span />
              <span />
            </div>
          </div>
        )}
      </div>

      <div className="cw-quick">
        {QUICK_PROMPTS.map((prompt) => (
          <button
            key={prompt}
            type="button"
            className="cw-chip"
            disabled={loading}
            onClick={() => handleSendText(prompt)}
          >
            <Sparkles size={13} color="#06c755" />
            <span>{prompt}</span>
          </button>
        ))}
      </div>

      <form className="cw-footer" onSubmit={onFormSubmit}>
        <input
          className="cw-input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="พิมพ์ข้อความ..."
          aria-label="พิมพ์ข้อความ"
        />
        <button
          className="cw-send"
          type="submit"
          aria-label="ส่งข้อความ"
          disabled={loading || !input.trim()}
        >
          <Send size={18} color="#06210f" />
        </button>
      </form>
    </div>
  );
}
