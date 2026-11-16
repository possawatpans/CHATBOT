import express from 'express';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Clients
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;

    // 1. ดึงข้อมูลโปรไฟล์และผลงานจาก Supabase View
    const { data: teamContext, error } = await supabase
      .from('team_portfolio_view')
      .select('*');

    if (error) throw error;

    // 2. สร้าง System Instruction
    const systemInstruction = `
      คุณเป็น AI Assistant ประจำเว็บไซต์ Portfolio กลุ่ม
      นี่คือข้อมูลโปรไฟล์และผลงานของสมาชิกทุกคนในกลุ่ม:
      ${JSON.stringify(teamContext, null, 2)}

      คำแนะนำในการตอบ:
      - ตอบคำถามเกี่ยวกับสมาชิก ผลงาน ทักษะ และบทบาทตามข้อมูลที่กำหนดให้เท่านั้น
      - ตอบด้วยภาษาไทย กระชับ เป็นกันเอง และสุภาพ
      - หากผู้ใช้ถามถึงสิ่งที่ไม่เกี่ยวกับสมาชิกหรือข้อมูลผลงานในกลุ่ม ให้ปฏิเสธอย่างสุภาพ
    `;

    // 3. ส่งคำถามไปยัง Gemini API โดยดึงโมเดลจาก process.env.LLM_MODEL
    const response = await ai.models.generateContent({
      model: process.env.LLM_MODEL || 'gemini-3.5-flash-lite',
      contents: message,
      config: {
        systemInstruction: systemInstruction,
      }
    });

    res.json({ reply: response.text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการประมวลผลคำตอบ' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));