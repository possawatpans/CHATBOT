import React from 'react';
import { Bot, Sparkles, Database, Code2, ExternalLink, User } from 'lucide-react';
import ChatWidget from './components/ChatWidget';

// ข้อมูลสมาชิกในกลุ่ม 3 คน (เปลี่ยนชื่อ ตำแหน่ง ทักษะ และลิงก์ของคนที่ 2 และ 3 ได้เลยครับ)
const teamMembers = [
  {
    name: 'พีรพัฒน์ (Peeraphat)',
    role: 'AI & Data Science Engineer',
    skills: ['Machine Learning', 'Python', 'Data Analysis'],
    portfolioUrl: 'https://member-portfolio-7242e8.gitlab.io',
    accentColor: '#10b981', // สีเขียวมรกต
  },
  {
    name: 'ชื่อ-นามสกุล สมาชิกคนที่ 2',
    role: 'AI & Full-Stack Developer',
    skills: ['React', 'Node.js', 'LLM Integration'],
    portfolioUrl: '#', // ใส่ลิงก์เว็บของคนที่ 2 ตรงนี้
    accentColor: '#3b82f6', // สีน้ำเงิน
  },
  {
    name: 'ชื่อ-นามสกุล สมาชิกคนที่ 3',
    role: 'Data Scientist & Business Analyst',
    skills: ['SQL', 'Data Visualization', 'Business Strategy'],
    portfolioUrl: '#', // ใส่ลิงก์เว็บของคนที่ 3 ตรงนี้
    accentColor: '#8b5cf6', // สีม่วง
  },
];

export default function App() {
  return (
    <div style={styles.pageWrapper}>
      {/* 1. Hero Section */}
      <header style={styles.heroSection}>
        <div style={styles.topTag}>
          <Sparkles size={14} color="#06c755" />
          <span>Bangkok University • AI Engineering & Data Science</span>
        </div>

        <h1 style={styles.heroTitle}>
          AI & Data Science <br />
          <span style={styles.gradientText}>Team Portfolio</span>
        </h1>

        <p style={styles.heroSubtitle}>
          พื้นที่รวบรวมผลงาน ทักษะ และประสบการณ์ของทีมพัฒนาด้านปัญญาประดิษฐ์และวิทยาการข้อมูล 
          พร้อมผู้ช่วย AI อัจฉริยะที่คอยตอบทุกข้อสงสัยเกี่ยวกับโปรไฟล์ของพวกเรา
        </p>

        {/* Badges แสดงทักษะหลัก */}
        <div style={styles.badgeContainer}>
          <span style={styles.badge}>
            <Bot size={15} color="#8b5cf6" /> Artificial Intelligence
          </span>
          <span style={styles.badge}>
            <Database size={15} color="#0ea5e9" /> Data Science
          </span>
          <span style={styles.badge}>
            <Code2 size={15} color="#10b981" /> Full-Stack Dev
          </span>
        </div>
      </header>

      {/* 2. Team Members (Profile Cards Grid 3 คอลัมน์) */}
      <section style={styles.sectionContainer}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Team Members</h2>
          <p style={styles.sectionDesc}>ทำความรู้จักและเข้าชมผลงานของสมาชิกในกลุ่มทั้ง 3 คน</p>
        </div>

        <div style={styles.cardsGrid}>
          {teamMembers.map((member, index) => (
            <div key={index} style={styles.card}>
              <div
                style={{
                  ...styles.avatarCircle,
                  backgroundColor: `${member.accentColor}15`,
                  border: `2px solid ${member.accentColor}`,
                }}
              >
                <User size={28} color={member.accentColor} />
              </div>

              <h3 style={styles.memberName}>{member.name}</h3>
              <p style={styles.memberRole}>{member.role}</p>

              {/* แท็กทักษะย่อยของแต่ละคน */}
              <div style={styles.memberSkills}>
                {member.skills.map((skill, idx) => (
                  <span key={idx} style={styles.skillChip}>
                    {skill}
                  </span>
                ))}
              </div>

              <a
                href={member.portfolioUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ ...styles.portfolioBtn, backgroundColor: member.accentColor }}
              >
                <span>ดู Portfolio</span>
                <ExternalLink size={16} />
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* 3. AI Chatbot Section */}
      <section style={styles.chatSection}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Ask Our AI Assistant</h2>
          <p style={styles.sectionDesc}>ลองพิมพ์ถาม หรือกดเลือกคำถามแนะนำด้านล่างเพื่อคุยกับ AI ได้ทันที</p>
        </div>

        <ChatWidget />
      </section>

      <footer style={styles.footer}>
        © {new Date().getFullYear()} AI & Data Science Team Portfolio. Powered by React & AI Chatbot.
      </footer>
    </div>
  );
}

const styles = {
  pageWrapper: {
    width: '100%',
    minHeight: '100vh',
    backgroundColor: '#f8fafc',
    color: '#0f172a',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    paddingBottom: '40px',
  },
  heroSection: {
    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
    color: '#ffffff',
    padding: '64px 20px 56px',
    textAlign: 'center',
    borderBottom: '1px solid #334155',
  },
  topTag: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    padding: '6px 14px',
    borderRadius: '999px',
    fontSize: '13px',
    color: '#e2e8f0',
    marginBottom: '20px',
  },
  heroTitle: {
    fontSize: 'clamp(32px, 5vw, 48px)',
    fontWeight: '800',
    lineHeight: '1.2',
    margin: '0 0 16px',
    color: '#ffffff',
    letterSpacing: '-0.5px',
  },
  gradientText: {
    background: 'linear-gradient(90deg, #38bdf8, #4ade80)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  heroSubtitle: {
    maxWidth: '620px',
    margin: '0 auto 28px',
    fontSize: '16px',
    lineHeight: '1.6',
    color: '#cbd5e1',
  },
  badgeContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '10px',
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    backgroundColor: 'rgba(15, 23, 42, 0.7)',
    border: '1px solid #334155',
    color: '#f1f5f9',
    padding: '8px 16px',
    borderRadius: '10px',
    fontSize: '14px',
    fontWeight: '500',
  },
  sectionContainer: {
    maxWidth: '1040px',
    margin: '48px auto 0',
    padding: '0 20px',
  },
  sectionHeader: {
    textAlign: 'center',
    marginBottom: '28px',
  },
  sectionTitle: {
    fontSize: '26px',
    fontWeight: '700',
    color: '#0f172a',
    margin: '0 0 6px',
  },
  sectionDesc: {
    fontSize: '15px',
    color: '#64748b',
    margin: 0,
  },
  cardsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '24px',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    padding: '28px 24px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
    border: '1px solid #e2e8f0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },
  avatarCircle: {
    width: '64px',
    height: '64px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '16px',
  },
  memberName: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#0f172a',
    margin: '0 0 4px',
  },
  memberRole: {
    fontSize: '14px',
    color: '#64748b',
    margin: '0 0 16px',
  },
  memberSkills: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '6px',
    marginBottom: '22px',
  },
  skillChip: {
    backgroundColor: '#f1f5f9',
    color: '#334155',
    fontSize: '12px',
    padding: '4px 10px',
    borderRadius: '6px',
    fontWeight: '500',
  },
  portfolioBtn: {
    marginTop: 'auto',
    width: '100%',
    padding: '10px 16px',
    borderRadius: '10px',
    color: '#ffffff',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '14px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    boxSizing: 'border-box',
  },
  chatSection: {
    maxWidth: '800px',
    margin: '56px auto 0',
    padding: '0 20px',
  },
  footer: {
    textAlign: 'center',
    marginTop: '60px',
    fontSize: '13px',
    color: '#94a3b8',
  },
};