import React from 'react';
import { ArrowUpRight, User, Bot, Database, Code, Briefcase } from 'lucide-react';
import Leaf from '../components/Leaf';
import Perch from '../components/Perch';
import Footer from '../components/Footer';
import Jungle from '../components/Jungle';
import { critterScenes } from '../components/Critters';

// ข้อมูลสมาชิกในกลุ่ม 3 คน (เปลี่ยนชื่อ ตำแหน่ง ทักษะ และลิงก์ของคนที่ 2 และ 3 ได้เลยครับ)
const teamMembers = [
  {
    name: 'พีรพัฒน์ (Peeraphat)',
    role: 'AI & Data Science Engineer',
    skills: ['Machine Learning', 'Python', 'Data Analysis'],
    portfolioUrl: 'https://member-portfolio-7242e8.gitlab.io',
    accentColor: '#10b981',
    photo: '/images/peeraphat.jpg',
  },
  {
    name: 'กุลปริยา (Kulpriya)',
    role: 'Frontend & UI/UX Developer',
    skills: ['React', 'JavaScript', 'UI/UX Design'],
    portfolioUrl: 'https://kulpriya123.github.io/pixel-adventure/',
    accentColor: '#3b82f6',
    photo: '/images/kulpriya.jpg',
  },
  {
    name: 'พศวัต (Possawat)',
    role: 'Full stack',
    skills: ['SQL', 'Data Visualization', 'Business Strategy'],
    portfolioUrl: 'https://oak-portfolio-ae1365.gitlab.io/',
    accentColor: '#8b5cf6',
    photo: '/images/possawat.jpg',
  },
];

// ความถนัดของทีม (แก้ข้อความหรือเปลี่ยนไอคอนได้ตามต้องการ)
const focusAreas = [
  { label: 'Machine Learning', Icon: Bot },
  { label: 'Data Analysis', Icon: Database },
  { label: 'Software Development', Icon: Code },
  { label: 'Business Insight', Icon: Briefcase },
];

export default function Home() {
  const scrollToTeam = () =>
    document.getElementById('members')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <>
      <header className="arch">
        <Leaf className="leaf-a" />
        <Leaf className="leaf-b" />
        <Perch />
        <div className="wrap">
          <p className="hero-meta">Bangkok University, AI Engineering &amp; Data Science</p>

          <h1 className="hero-title">
            <span className="line">
              <span style={{ '--i': 0 }}>CTRL+ff</span>
            </span>
            <span className="line">
              <span style={{ '--i': 1 }}>Team Portfolio</span>
            </span>
          </h1>

          <p className="hero-sub">
            รวมผลงาน ทักษะ และประสบการณ์ของทีมพัฒนาด้านปัญญาประดิษฐ์และวิทยาการข้อมูล
            พร้อมผู้ช่วย AI ที่ตอบคำถามเกี่ยวกับโปรไฟล์ของพวกเรา
          </p>

          <div className="hero-actions">
            <a className="btn btn-primary" href="#/chat">
              คุยกับผู้ช่วย AI
            </a>
            <button className="btn btn-ghost" type="button" onClick={scrollToTeam}>
              ดูสมาชิกทีม
            </button>
          </div>
        </div>
      </header>

      <div className="stage">
        <Jungle />
        <main className="wrap">
          <section id="members" className="section">
            <div className="zigzag">
              <Leaf className="zz-leaf zz-leaf-1" />
              <Leaf className="zz-leaf zz-leaf-2" />
              <Leaf className="zz-leaf zz-leaf-3" />

              <div className="section-head">
                <h2>Team Members</h2>
                <p>สมาชิกในกลุ่มทั้ง 3 คน เลือกเพื่อเข้าชมผลงาน</p>
              </div>

              <div className="zz-rows">
                {teamMembers.map((member, i) => {
                  const Scene = critterScenes[i % critterScenes.length];
                  return (
                    <div key={member.name} className={`zz-row${i % 2 === 1 ? ' flip' : ''}`}>
                      <div className="zz-art" aria-hidden="true">
                        <Scene />
                      </div>
                      <a
                        className="member"
                        href={member.portfolioUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ '--c': member.accentColor }}
                      >
                        <Leaf className="member-deco" />
                        <span className="avatar" aria-hidden="true">
                          {member.photo ? (
                            <img src={member.photo} alt="" loading="lazy" />
                          ) : (
                            <User size={26} color={member.accentColor} />
                          )}
                        </span>
                        <h3 className="member-name">{member.name}</h3>
                        <p className="member-role">{member.role}</p>
                        <div className="chips">
                          {member.skills.map((skill) => (
                            <span key={skill} className="chip">
                              {skill}
                            </span>
                          ))}
                        </div>
                        <span className="member-go">
                          ดู Portfolio
                          <ArrowUpRight size={16} strokeWidth={1.75} />
                        </span>
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </main>
      </div>

      <section className="panel">
        <Leaf className="leaf-c" />
        <Leaf className="leaf-d" />
        <div className="wrap">
          <div className="section-head">
            <h2>ความถนัดของทีม</h2>
          </div>
          <div className="tiles">
            {focusAreas.map(({ label, Icon }) => (
              <div key={label} className="tile">
                <div className="tile-icon">
                  <span>
                    <Icon size={30} color="#fff" strokeWidth={1.75} />
                  </span>
                </div>
                <p className="tile-label">{label}</p>
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </section>
    </>
  );
}
