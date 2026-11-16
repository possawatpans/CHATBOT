import React, { useState } from 'react';
import axios from 'axios';
import { Send, Bot, User, Loader2 } from 'lucide-react';

export default function ChatWidget() {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'สวัสดีครับ! สอบถามข้อมูลทักษะและผลงานของสมาชิกในกลุ่มได้เลยครับ' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const res = await axios.post('https://chatbot-nine-sable-75.vercel.app/api/chat', { message: userMsg });
      setMessages(prev => [...prev, { sender: 'bot', text: res.data.reply }]);
    } catch (err) {
      setMessages(prev => [...prev, { sender: 'bot', text: 'ขออภัยครับ เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์ backend' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[500px]">
      <div className="bg-slate-800 p-4 border-b border-slate-700 flex items-center gap-2">
        <Bot className="text-cyan-400 w-6 h-6" />
        <h3 className="text-white font-semibold">Team Portfolio AI Assistant</h3>
      </div>

      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex items-start gap-2 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`p-2 rounded-full ${msg.sender === 'user' ? 'bg-cyan-600' : 'bg-slate-800'}`}>
              {msg.sender === 'user' ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-cyan-400" />}
            </div>
            <div className={`max-w-[80%] p-3 rounded-2xl text-sm whitespace-pre-line ${
              msg.sender === 'user' ? 'bg-cyan-600 text-white rounded-tr-none' : 'bg-slate-800 text-slate-200 rounded-tl-none border border-slate-700'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex items-center gap-2 text-slate-400 text-xs italic">
            <Loader2 className="w-4 h-4 animate-spin text-cyan-400" />
            AI กำลังคิดคำตอบ...
          </div>
        )}
      </div>

      <form onSubmit={sendMessage} className="p-3 bg-slate-800 border-t border-slate-700 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="พิมพ์คำถามเกี่ยวกับโปรไฟล์ หรือผลงาน..."
          className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-cyan-500"
        />
        <button type="submit" disabled={loading} className="bg-cyan-500 hover:bg-cyan-600 text-white p-2.5 rounded-xl transition-all">
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}