import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Send, Bot, Loader2, Sparkles } from 'lucide-react';

// รายการคำถามแนะนำ (สามารถเพิ่มชื่อเพื่อนคนที่ 2 และ 3 เข้าไปตรงนี้ได้ครับ)
const QUICK_PROMPTS = [
  'สมาชิกในกลุ่มมีใครบ้าง?',
  'สมาชิกถนัดด้านไหน?',
  'มีผลงานหรือโปรเจกต์อะไรบ้าง?',
];

export default function ChatWidget() {
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'สวัสดีครับ! สอบถามข้อมูลทักษะและผลงานของสมาชิกทั้ง 3 คนในกลุ่มได้เลยครับ หรือกดเลือกคำถามแนะนำด้านล่างก็ได้ครับ',
      time: new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSendText = async (textToSend) => {
    if (!textToSend.trim() || loading) return;

    const currentTime = new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });
    setInput('');
    setMessages(prev => [...prev, { sender: 'user', text: textToSend, time: currentTime }]);
    setLoading(true);

    try {
      const res = await axios.post('https://chatbot-nine-sable-75.vercel.app/api/chat', { message: textToSend });
      const botTime = new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });
      setMessages(prev => [...prev, { sender: 'bot', text: res.data.reply, time: botTime }]);
    } catch (err) {
      const errTime = new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });
      setMessages(prev => [...prev, { sender: 'bot', text: 'ขออภัยครับ เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์ backend', time: errTime }]);
    } finally {
      setLoading(false);
    }
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    handleSendText(input);
  };

  return (
    <div style={styles.container}>
      {/* แถบหัวข้อด้านบน */}
      <div style={styles.header}>
        <div style={styles.botAvatarHeader}>
          <Bot size={22} color="#ffffff" />
        </div>
        <div style={{ textAlign: 'left' }}>
          <div style={styles.headerTitle}>Team Portfolio AI Assistant</div>
          <div style={styles.headerStatus}>● ออนไลน์</div>
        </div>
      </div>

      {/* พื้นที่สนทนา */}
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
              {!isUser && (
                <div style={styles.botAvatar}>
                  <Bot size={18} color="#2c3e50" />
                </div>
              )}

              {isUser && <span style={styles.timeText}>{msg.time}</span>}

              <div style={isUser ? styles.userBubble : styles.botBubble}>
                {msg.text}
              </div>

              {!isUser && <span style={styles.timeText}>{msg.time}</span>}
            </div>
          );
        })}

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

      {/* แถบปุ่มคำถามแนะนำ (Quick Prompts) */}
      <div style={styles.quickPromptBar}>
        {QUICK_PROMPTS.map((prompt, index) => (
          <button
            key={index}
            type="button"
            disabled={loading}
            onClick={() => handleSendText(prompt)}
            style={styles.quickPromptChip}
          >
            <Sparkles size={12} color="#06c755" />
            <span>{prompt}</span>
          </button>
        ))}
      </div>

      {/* ช่องพิมพ์ข้อความด้านล่าง */}
      <form onSubmit={onFormSubmit} style={styles.footer}>
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

const styles = {
  container: {
    width: '100%',
    maxWidth: '480px',
    height: '560px',
    margin: '0 auto',
    borderRadius: '18px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 12px 30px rgba(0, 0, 0, 0.12)',
    border: '1px solid #cbd5e1',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  header: {
    backgroundColor: '#1e293b',
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
    backgroundColor: '#8cabd9',
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
    maxWidth: '72%',
    fontSize: '14px',
    lineHeight: '1.45',
    textAlign: 'left',
    whiteSpace: 'pre-line',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
    wordBreak: 'break-word',
  },
  userBubble: {
    backgroundColor: '#8de055',
    color: '#111827',
    padding: '10px 14px',
    borderRadius: '16px',
    borderTopRightRadius: '4px',
    maxWidth: '72%',
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
  quickPromptBar: {
    backgroundColor: '#f8fafc',
    padding: '8px 10px',
    display: 'flex',
    gap: '6px',
    overflowX: 'auto',
    borderTop: '1px solid #e2e8f0',
    scrollbarWidth: 'none',
  },
  quickPromptChip: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    backgroundColor: '#ffffff',
    border: '1px solid #cbd5e1',
    borderRadius: '16px',
    padding: '5px 11px',
    fontSize: '12px',
    color: '#334155',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
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
    backgroundColor: '#06c755',
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