import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Send, Bot, Loader2 } from 'lucide-react';

export default function ChatWidget() {
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'สวัสดีครับ! สอบถามข้อมูลทักษะและผลงานของสมาชิกในกลุ่มได้เลยครับ',
      time: new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // เลื่อนลงล่างสุดอัตโนมัติเมื่อมีข้อความใหม่
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = input;
    const currentTime = new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });
    
    setInput('');
    setMessages(prev => [...prev, { sender: 'user', text: userMsg, time: currentTime }]);
    setLoading(true);

    try {
      const res = await axios.post('https://chatbot-nine-sable-75.vercel.app/api/chat', { message: userMsg });
      const botTime = new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });
      setMessages(prev => [...prev, { sender: 'bot', text: res.data.reply, time: botTime }]);
    } catch (err) {
      const errTime = new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });
      setMessages(prev => [...prev, { sender: 'bot', text: 'ขออภัยครับ เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์ backend', time: errTime }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      {/* แถบหัวข้อด้านบน (Header) */}
      <div style={styles.header}>
        <div style={styles.botAvatarHeader}>
          <Bot size={22} color="#ffffff" />
        </div>
        <div style={{ textAlign: 'left' }}>
          <div style={styles.headerTitle}>Team Portfolio AI Assistant</div>
          <div style={styles.headerStatus}>● ออนไลน์</div>
        </div>
      </div>

      {/* พื้นที่แสดงข้อความสนทนา (สีฟ้าสไตล์ LINE) */}
      <div style={styles.chatBody}>
        {messages.map((msg, idx) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={idx}
              style={{
                ...styles.messageRow,
                justifyContent: isUser ? 'flex-end' : 'flex-start',
              }}
            >
              {/* รูปโปรไฟล์บอท (เฉพาะฝั่งซ้าย) */}
              {!isUser && (
                <div style={styles.botAvatar}>
                  <Bot size={18} color="#2c3e50" />
                </div>
              )}

              {/* เวลาส่ง (แสดงด้านซ้ายของกล่องข้อความผู้ใช้) */}
              {isUser && <span style={styles.timeText}>{msg.time}</span>}

              {/* กล่องข้อความ (Bubble) */}
              <div style={isUser ? styles.userBubble : styles.botBubble}>
                {msg.text}
              </div>

              {/* เวลาส่ง (แสดงด้านขวาของกล่องข้อความบอท) */}
              {!isUser && <span style={styles.timeText}>{msg.time}</span>}
            </div>
          );
        })}

        {/* สถานะกำลังพิมพ์ */}
        {loading && (
          <div style={{ ...styles.messageRow, justifyContent: 'flex-start' }}>
            <div style={styles.botAvatar}>
              <Bot size={18} color="#2c3e50" />
            </div>
            <div style={{ ...styles.botBubble, display: 'flex', alignItems: 'center', gap: '6px', color: '#666' }}>
              <Loader2 size={16} className="animate-spin" />
              <span>กำลังพิมพ์...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* ช่องพิมพ์ข้อความด้านล่าง */}
      <form onSubmit={sendMessage} style={styles.footer}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="พิมพ์ข้อความ..."
          style={styles.input}
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          style={{
            ...styles.sendButton,
            opacity: loading || !input.trim() ? 0.5 : 1,
          }}
        >
          <Send size={18} color="#ffffff" />
        </button>
      </form>
    </div>
  );
}

// ชุดตกแต่งสไตล์ LINE
const styles = {
  container: {
    width: '100%',
    maxWidth: '420px',
    height: '520px',
    margin: '20px auto',
    borderRadius: '18px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
    border: '1px solid #d1d5db',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  header: {
    backgroundColor: '#253141',
    color: '#ffffff',
    padding: '14px 16px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  botAvatarHeader: {
    width: '38px',
    height: '38px',
    borderRadius: '50%',
    backgroundColor: '#06c755',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontWeight: '600',
    fontSize: '15px',
    lineHeight: '1.2',
  },
  headerStatus: {
    fontSize: '11px',
    color: '#4ade80',
    marginTop: '2px',
  },
  chatBody: {
    flex: 1,
    backgroundColor: '#8cabd9', // สีพื้นหลังห้องแชท LINE
    padding: '16px 12px',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  messageRow: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: '6px',
    width: '100%',
  },
  botAvatar: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    backgroundColor: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    alignSelf: 'flex-start',
    boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
  },
  botBubble: {
    backgroundColor: '#ffffff',
    color: '#111827',
    padding: '10px 14px',
    borderRadius: '16px',
    borderTopLeftRadius: '4px',
    maxWidth: '70%',
    fontSize: '14px',
    lineHeight: '1.45',
    textAlign: 'left',
    whiteSpace: 'pre-line',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
    wordBreak: 'break-word',
  },
  userBubble: {
    backgroundColor: '#8de055', // สีเขียวกล่องข้อความฝั่งเราใน LINE
    color: '#111827',
    padding: '10px 14px',
    borderRadius: '16px',
    borderTopRightRadius: '4px',
    maxWidth: '70%',
    fontSize: '14px',
    lineHeight: '1.45',
    textAlign: 'left',
    whiteSpace: 'pre-line',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
    wordBreak: 'break-word',
  },
  timeText: {
    fontSize: '10px',
    color: '#f3f4f6',
    marginBottom: '2px',
    flexShrink: 0,
  },
  footer: {
    backgroundColor: '#ffffff',
    padding: '10px 12px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    borderTop: '1px solid #e5e7eb',
  },
  input: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    border: 'none',
    borderRadius: '20px',
    padding: '10px 16px',
    fontSize: '14px',
    color: '#111827',
    outline: 'none',
  },
  sendButton: {
    backgroundColor: '#06c755', // สีเขียวปุ่มส่งของ LINE
    border: 'none',
    borderRadius: '50%',
    width: '38px',
    height: '38px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    flexShrink: 0,
  },
};