// ==========================================
// 1. ตัวแปรสถานะเกมของผู้เล่น (Level & Gold)
// ==========================================
let currentLevel = 1;                       // เลเวลเริ่มต้นที่ 1
let currentGold = 500;                      // เงินเริ่มต้นที่ 500G
const visitedMenus = new Set();             // ตัวเก็บรายชื่อเมนูที่ผู้เล่นกดเปิดดูแล้ว (ไม่นับซ้ำ)

const hudLevel = document.getElementById('hud-level'); // ค้นหาข้อความแสดงเลเวลด้านบน
const hudGold = document.getElementById('hud-gold');   // ค้นหาข้อความแสดงเงินด้านบน

// รายการไอเทมลับที่จะสุ่มได้เมื่อกด START GAME
const secretItems = [
    { name: "⌨️ คีย์บอร์ดพิกเซลทองคำ", gold: 150 },
    { name: "🧪 น้ำยาแก้บั๊กขั้นเทพ (Bug Fix Potion)", gold: 100 },
    { name: "🐱 แมวกวักนำโชคของ Kulpriya", gold: 300 },
    { name: "📜 คัมภีร์โค้ดลับ 8-Bit", gold: 200 },
    { name: "☕ กาแฟเพิ่มพลังเขียนโค้ด", gold: 120 }
];

// ฟังก์ชันอัปเดตตัวเลขเงินและเลเวลบนแถบสถานะด้านบน
function updateHUD() {
    if (hudLevel) {
        // แสดงเลขเลเวลแบบ 2 หลัก เช่น LV. 01, LV. 02
        const formattedLv = currentLevel < 10 ? `0${currentLevel}` : currentLevel;
        hudLevel.textContent = currentLevel >= 2 ? `LV. ${formattedLv} ★` : `LV. ${formattedLv}`;
        
        // ถ้าเลเวลอัป ให้เปลี่ยนสีตัวหนังสือเลเวลเป็นสีเหลืองทอง
        if (currentLevel >= 2) {
            hudLevel.style.color = '#ffd700';
        }
    }
    if (hudGold) {
        hudGold.textContent = `GOLD: ${currentGold}G`; // อัปเดตจำนวนเงินล่าสุด
    }
}

// ฟังก์ชันเช็กการเก็บเลเวลจากการสำรวจเมนู
function checkMenuProgress(menuId) {
    visitedMenus.add(menuId); // บันทึกว่ากดเมนูนี้แล้ว

    // ถ้ากดเปิดครบทั้ง 5 เมนู และยังอยู่ที่เลเวล 1 ให้เลเวลอัป!
    if (visitedMenus.size === 5 && currentLevel === 1) {
        currentLevel = 2;       // อัปเลเวลเป็น 2
        currentGold += 500;     // แจกโบนัสเงินเพิ่ม 500G
        updateHUD();            // อัปเดตหน้าจอด้านบนทันที
        
        // แจ้งเตือนผู้เล่นว่าเลเวลอัปแล้ว
        setTimeout(() => {
            alert("🎉 LEVEL UP! คุณสำรวจข้อมูลครบทุกเมนูแล้ว เลื่อนระดับเป็น LV. 02 และได้รับโบนัส +500G!");
        }, 400);
    }
}

// ==========================================
// 2. ฟังก์ชันกลางสำหรับควบคุมป๊อปอัปแต่ละเมนู
// ==========================================
function setupPopup(btnId, popupId, closeId) {
    const btn = document.getElementById(btnId);       // ค้นหาปุ่มกดเปิด
    const popup = document.getElementById(popupId);   // ค้นหากล่องหน้าต่างป๊อปอัป
    const closeBtn = document.getElementById(closeId); // ค้นหาปุ่มปิด (CLOSE)

    if (btn && popup && closeBtn) {
        // เมื่อผู้ใช้คลิกที่ปุ่มเปิดเมนู
        btn.addEventListener('click', () => {
            popup.style.display = 'flex'; // แสดงป๊อปอัป
            checkMenuProgress(btnId);     // นับแต้มสำรวจเมนูเพื่อเก็บเลเวล
        });

        // เมื่อผู้ใช้คลิกที่ปุ่ม CLOSE
        closeBtn.addEventListener('click', () => {
            popup.style.display = 'none'; // ซ่อนป๊อปอัป
        });

        // เมื่อผู้ใช้คลิกพื้นที่ว่างรอบนอกกล่องป๊อปอัป
        popup.addEventListener('click', (e) => {
            if (e.target === popup) {
                popup.style.display = 'none'; // ซ่อนป๊อปอัป
            }
        });
    }
}

// ==========================================
// 3. ควบคุมป๊อปอัป START GAME (ระบบสุ่มไอเทมลับ)
// ==========================================
const startBtn = document.querySelector('.btn-start');   // ค้นหาปุ่ม START GAME
const gamePopup = document.getElementById('game-popup'); // ค้นหากล่องป๊อปอัปเกม
const closeGameBtn = document.getElementById('close-popup'); // ค้นหาปุ่มปิด
const gameResult = document.getElementById('game-result');   // ค้นหาข้อความแสดงผลไอเทมที่สุ่มได้

if (startBtn && gamePopup && closeGameBtn) {
    startBtn.addEventListener('click', () => {
        // สุ่มเลือกไอเทม 1 ชิ้นจากรายการ secretItems
        const randomIndex = Math.floor(Math.random() * secretItems.length);
        const reward = secretItems[randomIndex];

        // บวกเงินรางวัลเข้ากระเป๋าผู้เล่น
        currentGold += reward.gold;
        updateHUD(); // อัปเดตเงินบนแถบด้านบนทันที

        // แสดงชื่อไอเทมและเงินที่ได้รับในกล่องป๊อปอัป
        if (gameResult) {
            gameResult.innerHTML = `คุณค้นพบไอเทมลับ:<br><strong style="color: #ffd700; font-size: 22px;">${reward.name}</strong><br>ได้รับเงินรางวัล +${reward.gold}G!`;
        }

        gamePopup.style.display = 'flex'; // เปิดป๊อปอัปโชว์รางวัล
    });

    closeGameBtn.addEventListener('click', () => {
        gamePopup.style.display = 'none'; // ปิดป๊อปอัป
    });

    gamePopup.addEventListener('click', (e) => {
        if (e.target === gamePopup) {
            gamePopup.style.display = 'none';
        }
    });
}

// ==========================================
// 4. เรียกใช้งานฟังก์ชันกลางสำหรับเมนูทั้ง 5 ปุ่ม
// ==========================================
setupPopup('about-btn', 'about-popup', 'close-about');          // ปุ่ม ABOUT ME
setupPopup('edu-btn', 'edu-popup', 'close-edu');                // ปุ่ม การศึกษา
setupPopup('skills-btn', 'skills-popup', 'close-skills');       // ปุ่ม ทักษะ
setupPopup('projects-btn', 'projects-popup', 'close-projects'); // ปุ่ม ผลงาน
setupPopup('chat-btn', 'chat-popup', 'close-chat');             // ปุ่ม แชทกับเลขา

// ==========================================
// 5. ระบบแชทเลือกคำถามอัตโนมัติกับเลขาฯ
// ==========================================
const chatOptions = document.querySelectorAll('.chat-option-btn'); // ค้นหาปุ่มคำถามทั้งหมด
const chatMessages = document.getElementById('chat-messages');     // ค้นหากล่องแสดงข้อความแชท

// ฐานข้อมูลคำถามและคำตอบของเลขาฯ
const qaDatabase = {
    skills: {
        q: "ทักษะหลักของคุณ Kulpriya คือด้านไหน?",
        a: "กำลังมุ่งมั่นพัฒนาทักษะด้าน HTML5, CSS3, JavaScript และการสร้างสรรค์เว็บพอร์ตฟิโอสไตล์ 8-Bit ค่ะ!"
    },
    goal: {
        q: "เป้าหมายในการสร้างเว็บไซต์นี้คืออะไร?",
        a: "เพื่อฝึกฝนทักษะการเขียนโปรแกรม และสร้างพื้นที่แสดงผลงานสุดเท่ในรูปแบบเกมย้อนยุคค่ะ!"
    },
    contact: {
        q: "ช่องทางการติดต่อมีอะไรบ้าง?",
        a: "สามารถติดต่อผ่าน Email, line,  หรือติดตามGitHub (kulpriya123)โปรเจกต์อื่นๆ ได้เลยนะคะ ยินดีต้อนรับค่ะ!"
    }
};

// วนลูปใส่คำสั่งคลิกให้ปุ่มคำถามทุกปุ่ม
chatOptions.forEach(button => {
    button.addEventListener('click', () => {
        const qKey = button.getAttribute('data-q'); // ดึงรหัสคำถามจากปุ่มที่กด
        const qa = qaDatabase[qKey];                // ค้นหาคู่คำถาม-คำตอบ

        if (qa && chatMessages) {
            // สร้างกล่องข้อความคำถามฝั่งผู้เล่น
            const userMsg = document.createElement('div');
            userMsg.className = 'chat-msg user-msg';
            userMsg.innerHTML = `> ${qa.q}`;
            chatMessages.appendChild(userMsg);

            // หน่วงเวลา 0.3 วินาที ให้เลขาฯ ตอบกลับ
            setTimeout(() => {
                const botMsg = document.createElement('div');
                botMsg.className = 'chat-msg bot-msg';
                botMsg.innerHTML = `<strong>เลขาฯ:</strong> ${qa.a}`;
                chatMessages.appendChild(botMsg);
                chatMessages.scrollTop = chatMessages.scrollHeight; // เลื่อนลงล่างสุด
            }, 300);

            chatMessages.scrollTop = chatMessages.scrollHeight; // เลื่อนลงล่างสุด
        }
    });
});

// ==========================================
// 6. ระบบสลับธีมกลางวัน / กลางคืน (Day / Night Mode)
// ==========================================
const themeBtn = document.getElementById('theme-btn'); // ค้นหาปุ่มสลับธีมบนแถบด้านบน

if (themeBtn) {
    // เมื่อผู้ใช้คลิกที่ปุ่มสลับธีม
    themeBtn.addEventListener('click', () => {
        // สลับคลาส 'day-mode' ให้กับแท็ก <body> (ถ้ามีอยู่จะเอาออก ถ้ายังไม่มีจะใส่เพิ่ม)
        document.body.classList.toggle('day-mode');

        // ตรวจสอบว่าตอนนี้หน้าเว็บอยู่ในโหมดกลางวัน (day-mode) หรือไม่
        if (document.body.classList.contains('day-mode')) {
            themeBtn.textContent = '🌙 DUNGEON';       // เปลี่ยนข้อความปุ่มให้กดกลับเป็นโหมดกลางคืน
            themeBtn.style.backgroundColor = '#334155'; // เปลี่ยนสีปุ่มเป็นสีเทาเข้มกลางคืน
        } else {
            themeBtn.textContent = '☀️ SUNNY';         // เปลี่ยนข้อความปุ่มให้กดเป็นโหมดกลางวัน
            themeBtn.style.backgroundColor = '#f59e0b'; // เปลี่ยนสีปุ่มกลับเป็นสีส้มพระอาทิตย์
        }
    });
}

// ==========================================
// 7. ระบบข้อความพิมพ์ดีดอัตโนมัติ (Typewriter Effect)
// ==========================================
const typewriterElement = document.getElementById('typewriter-text'); // ค้นหากล่องข้อความต้อนรับ

// ข้อความต้อนรับที่ต้องการให้ค่อยๆ พิมพ์ทีละตัวอักษร (ใช้ \n เพื่อขึ้นบรรทัดใหม่)
const welcomeMessage = "> ยินดีต้อนรับสู่พอร์ตฟิโอสไตล์ 8-Bit ของฉันค่ะ!\n> เลือกหัวข้อเมนูด้านล่างเพื่อสำรวจข้อมูลการเดินทางได้เลย...";

let charIndex = 0;          // ตัวนับตำแหน่งตัวอักษรปัจจุบัน (เริ่มที่ตัวที่ 0)
const typingSpeed = 45;     // ความเร็วในการพิมพ์ (มิลลิวินาทีต่อตัวอักษร ยิ่งน้อยยิ่งพิมพ์เร็ว)

// ฟังก์ชันสำหรับพิมพ์ข้อความทีละตัวอักษร
function typeWriter() {
    if (typewriterElement) {
        // ตรวจสอบว่ายังพิมพ์ไม่ครบทุกตัวอักษรใช่ไหม
        if (charIndex < welcomeMessage.length) {
            // ดึงข้อความตั้งแต่ตัวแรกจนถึงตำแหน่งปัจจุบัน และเปลี่ยน \n เป็นแท็กขึ้นบรรทัดใหม่ <br>
            const currentText = welcomeMessage.substring(0, charIndex + 1).replace(/\n/g, '<br>');
            
            // แสดงข้อความพร้อมเคอร์เซอร์กระพริบท้ายประโยค
            typewriterElement.innerHTML = `${currentText}<span class="cursor-blink">█</span>`;
            
            charIndex++; // ขยับไปตัวอักษรถัดไป
            setTimeout(typeWriter, typingSpeed); // หน่วงเวลาแล้วเรียกฟังก์ชันพิมพ์ตัวถัดไป
        }
    }
}

// สั่งเริ่มทำงานเอฟเฟกต์พิมพ์ดีดทันทีที่โหลดหน้าเว็บเสร็จ
window.addEventListener('DOMContentLoaded', () => {
    typeWriter();
});

// ==========================================
// 8. ระบบป๊อปอัปติดต่อทางอีเมล & ปุ่มคัดลอกอีเมลอัตโนมัติ
// ==========================================
const openEmailModalBtn = document.getElementById('open-email-modal-btn'); // ปุ่ม "ส่งอีเมลติดต่อ" ในหน้า About Me
const emailPopup = document.getElementById('email-popup');                 // กล่องป๊อปอัปติดต่อทางอีเมล
const closeEmailX = document.getElementById('close-email-x');              // ปุ่มกากบาท (✖) ปิดหน้าต่างอีเมล
const copyEmailBtn = document.getElementById('copy-email-btn');            // ปุ่ม "คัดลอก"
const emailAddressText = document.getElementById('email-address-text');    // ข้อความที่อยู่อีเมล

// ควบคุมการเปิด-ปิดป๊อปอัปอีเมล
if (openEmailModalBtn && emailPopup && closeEmailX) {
    // กดปุ่ม "ส่งอีเมลติดต่อ" เพื่อเปิดหน้าต่างอีเมล
    openEmailModalBtn.addEventListener('click', () => {
        emailPopup.style.display = 'flex';
    });

    // กดปุ่มกากบาท ✖ เพื่อปิดหน้าต่างอีเมล
    closeEmailX.addEventListener('click', () => {
        emailPopup.style.display = 'none';
    });

    // กดพื้นที่ว่างรอบนอกเพื่อปิดหน้าต่างอีเมล
    emailPopup.addEventListener('click', (e) => {
        if (e.target === emailPopup) {
            emailPopup.style.display = 'none';
        }
    });
}

// ระบบปุ่มกดคัดลอกอีเมลลงคลิปบอร์ด (Clipboard)
if (copyEmailBtn && emailAddressText) {
    copyEmailBtn.addEventListener('click', () => {
        const emailToCopy = emailAddressText.textContent.trim(); // ดึงข้อความอีเมลออกมา

        // สั่งคัดลอกข้อความลงคลิปบอร์ด
        navigator.clipboard.writeText(emailToCopy).then(() => {
            // เปลี่ยนข้อความปุ่มชั่วคราวเพื่อแจ้งให้ผู้ใช้รู้ว่าคัดลอกสำเร็จแล้ว
            copyEmailBtn.textContent = 'คัดลอกแล้ว! ✓';
            copyEmailBtn.style.backgroundColor = '#16a34a'; // เปลี่ยนปุ่มเป็นสีเขียว

            // หน่วงเวลา 2 วินาที แล้วเปลี่ยนปุ่มกลับเป็นคำว่า "คัดลอก" เหมือนเดิม
            setTimeout(() => {
                copyEmailBtn.textContent = 'คัดลอก';
                copyEmailBtn.style.backgroundColor = ''; 
            }, 2000);
        });
    });
}

// ==========================================
// 9. ระบบป๊อปอัปสแกน QR Code LINE & ปุ่มคัดลอก LINE ID
// ==========================================
const openLineModalBtn = document.getElementById('open-line-modal-btn'); // ปุ่ม "LINE" ในหน้า About Me
const linePopup = document.getElementById('line-popup');                 // กล่องป๊อปอัป QR Code LINE
const closeLineX = document.getElementById('close-line-x');              // ปุ่มกากบาท (✖) ปิดหน้าต่าง LINE
const copyLineBtn = document.getElementById('copy-line-btn');            // ปุ่ม "คัดลอก ID"
const lineIdText = document.getElementById('line-id-text');              // ข้อความ LINE ID

// ควบคุมการเปิด-ปิดป๊อปอัป LINE
if (openLineModalBtn && linePopup && closeLineX) {
    openLineModalBtn.addEventListener('click', () => {
        linePopup.style.display = 'flex';
    });

    closeLineX.addEventListener('click', () => {
        linePopup.style.display = 'none';
    });

    linePopup.addEventListener('click', (e) => {
        if (e.target === linePopup) {
            linePopup.style.display = 'none';
        }
    });
}

// ระบบปุ่มกดคัดลอก LINE ID
if (copyLineBtn && lineIdText) {
    copyLineBtn.addEventListener('click', () => {
        const idToCopy = lineIdText.textContent.trim();

        navigator.clipboard.writeText(idToCopy).then(() => {
            copyLineBtn.textContent = 'คัดลอกแล้ว! ✓';
            copyLineBtn.style.backgroundColor = '#16a34a';

            setTimeout(() => {
                copyLineBtn.textContent = 'คัดลอก ID';
                copyLineBtn.style.backgroundColor = '';
            }, 2000);
        });
    });
}

// ==========================================
// 10. โหมดแผนที่ในปุ่ม START GAME + เดินครบ 5 จุดรับรางวัลโดยไม่โดนจับ + มอนสเตอร์ไล่ & GAME OVER
// ==========================================
const gameMapPopup = document.getElementById('game-map-popup');       // ดึงกล่องป๊อปอัปหน้าต่างเกมทั้งหมด
const closeGameMapX = document.getElementById('close-game-map-x');     // ดึงปุ่มกากบาท (✖) ปิดหน้าต่างเกม
const closeGameMapBtn = document.getElementById('close-game-map-btn'); // ดึงปุ่ม "กลับหน้าหลัก"
const mapStage = document.getElementById('rpg-map-stage');             // ดึงพื้นที่ฉากสนามหญ้าที่ให้เดินได้
const playerSprite = document.getElementById('player-sprite');         // ดึงตัวละครผู้เล่น (YOU)
const chaseMonster = document.getElementById('chase-monster');         // ดึงตัวมอนสเตอร์ที่วิ่งไล่ตามผู้เล่น
const mapProgressBadge = document.getElementById('map-progress-badge'); // ดึงป้ายบอกจำนวนจุดที่สำรวจแล้วในรอบนี้

const gameoverPopup = document.getElementById('gameover-popup');       // ดึงกล่องป๊อปอัป GAME OVER
const retryGameBtn = document.getElementById('retry-game-btn');        // ดึงปุ่ม "เล่นใหม่อีกครั้ง"
const gameoverHomeBtn = document.getElementById('gameover-home-btn');  // ดึงปุ่ม "กลับหน้าหลัก" ในหน้า GAME OVER

const victoryPopup = document.getElementById('victory-popup');         // ดึงกล่องป๊อปอัปรางวัลชนะภารกิจ (QUEST CLEAR)
const playAgainVictoryBtn = document.getElementById('play-again-victory-btn'); // ดึงปุ่ม "เล่นอีกรอบ" ในหน้าชนะ
const victoryHomeBtn = document.getElementById('victory-home-btn');    // ดึงปุ่ม "กลับหน้าหลัก" ในหน้าชนะ

// รายการจุดหมายทั้ง 5 แห่งบนแผนที่ พร้อมป๊อปอัปและรหัสเมนูสำหรับสะสมแต้มเลเวล
const mapZones = [
    {
        el: document.getElementById('guild-building'), // จุดที่ 1: อาคารกิลด์
        popup: document.getElementById('about-popup'), // เปิดป๊อปอัป ABOUT ME & CONTACT
        menuKey: 'about-btn',                          // รหัสเมนูสำหรับนับแต้มเลเวลรวม
        padding: 8,                                    // ระยะเผื่อขอบเขตการชน
        inside: false                                  // สถานะว่ากำลังยืนอยู่ในโซนนี้ไหม
    },
    {
        el: document.getElementById('edu-spot'),       // จุดที่ 2: การศึกษา
        popup: document.getElementById('edu-popup'),   // เปิดป๊อปอัปการศึกษา
        menuKey: 'edu-btn',                            // รหัสเมนูการศึกษา
        padding: 6,                                    // ระยะเผื่อขอบเขตการชน
        inside: false                                  // สถานะการอยู่ในโซน
    },
    {
        el: document.getElementById('skills-spot'),    // จุดที่ 3: ทักษะ
        popup: document.getElementById('skills-popup'),// เปิดป๊อปอัปทักษะ
        menuKey: 'skills-btn',                         // รหัสเมนูทักษะ
        padding: 6,                                    // ระยะเผื่อขอบเขตการชน
        inside: false                                  // สถานะการอยู่ในโซน
    },
    {
        el: document.getElementById('projects-spot'),  // จุดที่ 4: ผลงาน
        popup: document.getElementById('projects-popup'),// เปิดป๊อปอัปผลงาน
        menuKey: 'projects-btn',                       // รหัสเมนูผลงาน
        padding: 6,                                    // ระยะเผื่อขอบเขตการชน
        inside: false                                  // สถานะการอยู่ในโซน
    },
    {
        el: document.getElementById('knight-npc'),     // จุดที่ 5: ตัวอัศวิน
        popup: document.getElementById('chat-popup'),  // เปิดป๊อปอัปแชทกับอัศวิน
        menuKey: 'chat-btn',                           // รหัสเมนูแชท
        padding: 6,                                    // ระยะเผื่อขอบเขตการชน
        inside: false                                  // สถานะการอยู่ในโซน
    }
];

// ค้นหาปุ่ม START GAME (รองรับทั้งแบบมี id และแบบหาจากข้อความบนปุ่ม)
const startGameBtn =
    document.getElementById('start-game-btn') ||
    Array.from(document.querySelectorAll('button')).find(btn => btn.textContent.includes('START GAME'));

let playerX = 300;          // ตำแหน่งแกน X (แนวนอน) ของตัวละครผู้เล่น
let playerY = 140;          // ตำแหน่งแกน Y (แนวตั้ง) ของตัวละครผู้เล่น
let monsterX = 40;          // ตำแหน่งแกน X เริ่มต้นของมอนสเตอร์
let monsterY = 40;          // ตำแหน่งแกน Y เริ่มต้นของมอนสเตอร์

const moveSpeed = 3.6;      // ความเร็วการเดินของผู้เล่นต่อ 1 เฟรม
const monsterSpeed = 2.4;  // ความเร็ววิ่งไล่ของมอนสเตอร์ (ปรับเพิ่ม-ลดความยากได้ตรงนี้)
const questBonusGold = 1000;// โบนัสเงินรางวัลเมื่อเดินครบทั้ง 5 จุดโดยไม่โดนจับ

const keysPressed = {};                 // เก็บรายการปุ่มทิศทางที่กำลังกดค้างอยู่
let targetPoint = null;                 // เก็บพิกัด { x, y } กรณีผู้เล่นคลิกจุดบนฉากให้เดินไปหา
let isMapOpen = false;                  // ตัวบอกว่าตอนนี้หน้าต่างแผนที่เปิดอยู่หรือไม่
let isGameOver = false;                 // ตัวบอกว่าผู้เล่นโดนมอนสเตอร์จับได้หรือยัง
let isQuestCleared = false;             // ตัวบอกว่าในรอบนี้เดินครบทั้ง 5 จุดและรับรางวัลหรือยัง
let pendingVictoryAfterPopup = false;   // รอเปิดหน้าต่างรางวัลหลังปิดป๊อปอัปจุดที่ 5

const clearedZonesInRun = new Set();    // เก็บจุดที่เดินถึงแล้วใน "รอบปัจจุบัน" (ครบ 5 จุดเมื่อไหร่ได้รางวัล)

// อัปเดตป้ายบอกจำนวนจุดที่เก็บได้แล้วในรอบปัจจุบัน (เช่น 📍 จุดที่สำรวจ: 2 / 5)
function updateMapProgressUI() {
    if (!mapProgressBadge) return;
    const count = clearedZonesInRun.size;
    const total = mapZones.length;
    mapProgressBadge.textContent = `📍 จุดที่สำรวจ: ${count} / ${total}`;
    if (count >= total) {
        mapProgressBadge.classList.add('is-complete');
    } else {
        mapProgressBadge.classList.remove('is-complete');
    }
}

// เช็กว่ามีป๊อปอัปข้อมูลของจุดต่างๆ เปิดอยู่ไหม (ถ้าเปิดอยู่ จะพักมอนสเตอร์ชั่วคราว)
function isAnyInfoPopupOpen() {
    return mapZones.some(zone => zone.popup && zone.popup.style.display === 'flex');
}

// เปิดหน้าต่างรางวัลชนะภารกิจ + บวกโบนัส Gold และอัปเดต HUD
function showVictoryReward() {
    if (isQuestCleared) return;
    isQuestCleared = true;
    targetPoint = null;
    for (let k in keysPressed) delete keysPressed[k];
    playerSprite.classList.remove('is-walking');

    // บวกโบนัสเงินรางวัลเข้าตัวแปรหลัก currentGold และอัปเดตแถบสถานะด้านบน
    if (typeof currentGold === 'number') {
        currentGold += questBonusGold;
        if (typeof updateHUD === 'function') {
            updateHUD();
        }
    }

    if (victoryPopup) {
        victoryPopup.style.display = 'flex';
    }
}

// ฟังก์ชันรีเซ็ตตำแหน่งผู้เล่น มอนสเตอร์ และตัวนับจุดสำรวจสำหรับรอบใหม่
function resetPositionsAndState() {
    if (!mapStage || !playerSprite) return;

    // วางผู้เล่นไว้ตรงกลางฉาก
    playerX = (mapStage.clientWidth - playerSprite.offsetWidth) / 2;
    playerY = (mapStage.clientHeight - playerSprite.offsetHeight) / 2 + 15;

    // วางมอนสเตอร์ไว้มุมซ้ายบน ห่างจากผู้เล่นตอนเริ่มเกม
    monsterX = 24;
    monsterY = 42;

    targetPoint = null;              // ล้างจุดหมายจากการคลิกเมาส์
    isGameOver = false;              // รีเซ็ตสถานะ GAME OVER
    isQuestCleared = false;          // รีเซ็ตสถานะชนะภารกิจสำหรับรอบใหม่
    pendingVictoryAfterPopup = false;// ล้างสถานะรอเปิดหน้ารางวัล
    clearedZonesInRun.clear();       // ล้างรายชื่อจุดที่เก็บได้ในรอบก่อนหน้า เพื่อให้เริ่มนับ 1-5 ใหม่
    updateMapProgressUI();           // รีเซ็ตป้ายบอกจำนวนจุดกลับเป็น 0 / 5

    mapZones.forEach(zone => { zone.inside = false; }); // รีเซ็ตสถานะการยืนทับทุกโซน
    for (let k in keysPressed) delete keysPressed[k]; // ล้างปุ่มค้าง

    playerSprite.style.left = playerX + 'px'; // อัปเดตตำแหน่งซ้ายของผู้เล่น
    playerSprite.style.top = playerY + 'px';  // อัปเดตตำแหน่งบนของผู้เล่น

    if (chaseMonster) {
        chaseMonster.style.left = monsterX + 'px'; // อัปเดตตำแหน่งซ้ายของมอนสเตอร์
        chaseMonster.style.top = monsterY + 'px';  // อัปเดตตำแหน่งบนของมอนสเตอร์
    }
}

// ฟังก์ชันเปิดหน้าต่างแผนที่เกม
function openGameMap() {
    if (!gameMapPopup) return;
    if (gameoverPopup) gameoverPopup.style.display = 'none';
    if (victoryPopup) victoryPopup.style.display = 'none';
    gameMapPopup.style.display = 'flex';
    isMapOpen = true;
    requestAnimationFrame(() => resetPositionsAndState());
}

// ฟังก์ชันปิดหน้าต่างแผนที่เกมและกลับหน้าหลัก
function closeGameMap() {
    if (!gameMapPopup) return;
    gameMapPopup.style.display = 'none';
    if (gameoverPopup) gameoverPopup.style.display = 'none';
    if (victoryPopup) victoryPopup.style.display = 'none';
    isMapOpen = false;
    isGameOver = false;
    isQuestCleared = false;
    pendingVictoryAfterPopup = false;
    targetPoint = null;
    for (let k in keysPressed) delete keysPressed[k];
}

// ฟังก์ชันเมื่อมอนสเตอร์จับผู้เล่นได้ก่อนครบ 5 จุด -> เข้าสู่หน้าต่าง GAME OVER
function triggerGameOver() {
    if (isGameOver || isQuestCleared) return;
    isGameOver = true;
    targetPoint = null;
    for (let k in keysPressed) delete keysPressed[k];
    playerSprite.classList.remove('is-walking');

    if (gameoverPopup) {
        gameoverPopup.style.display = 'flex';
    }
}

// ผูกปุ่ม CLOSE ของป๊อปอัปทั้ง 5 จุด เพื่อเปิดหน้ารางวัลทันทีหากเพิ่งเก็บครบ 5 จุดในจุดนั้น
mapZones.forEach(zone => {
    if (!zone.popup) return;
    const closeBtn = zone.popup.querySelector('button[id^="close-"]');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            if (pendingVictoryAfterPopup && !isQuestCleared) {
                pendingVictoryAfterPopup = false;
                showVictoryReward();
            }
        });
    }
    zone.popup.addEventListener('click', (e) => {
        if (e.target === zone.popup && pendingVictoryAfterPopup && !isQuestCleared) {
            pendingVictoryAfterPopup = false;
            showVictoryReward();
        }
    });
});

// ดักจับการคลิกปุ่ม START GAME เพื่อเปิดหน้าต่างแผนที่
if (startGameBtn) {
    startGameBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openGameMap();
    });
}

if (closeGameMapX) closeGameMapX.addEventListener('click', closeGameMap);
if (closeGameMapBtn) closeGameMapBtn.addEventListener('click', closeGameMap);

// ปุ่มเล่นใหม่ในหน้า GAME OVER
if (retryGameBtn) {
    retryGameBtn.addEventListener('click', () => {
        if (gameoverPopup) gameoverPopup.style.display = 'none';
        resetPositionsAndState();
    });
}

// ปุ่มกลับหน้าหลักในหน้า GAME OVER
if (gameoverHomeBtn) {
    gameoverHomeBtn.addEventListener('click', closeGameMap);
}

// ปุ่มเล่นอีกรอบในหน้า QUEST CLEAR
if (playAgainVictoryBtn) {
    playAgainVictoryBtn.addEventListener('click', () => {
        if (victoryPopup) victoryPopup.style.display = 'none';
        resetPositionsAndState();
    });
}

// ปุ่มกลับหน้าหลักในหน้า QUEST CLEAR
if (victoryHomeBtn) {
    victoryHomeBtn.addEventListener('click', closeGameMap);
}

// ถ้าคลิกพื้นที่สีดำด้านนอกกล่องแผนที่ ให้ปิดหน้าต่างแผนที่
if (gameMapPopup) {
    gameMapPopup.addEventListener('click', (e) => {
        if (e.target === gameMapPopup) closeGameMap();
    });
}

// เริ่มตั้งค่าระบบควบคุมการเดิน การวิ่งไล่ของมอนสเตอร์ และการตรวจจับการชน
if (mapStage && playerSprite) {
    playerSprite.style.left = playerX + 'px';
    playerSprite.style.top = playerY + 'px';

    // แปลงปุ่มกดจากคีย์บอร์ดให้เป็นทิศทาง 'up', 'down', 'left', 'right' (รองรับทั้งอังกฤษและไทย)
    function getMoveDirectionKey(e) {
        const key = e.key.toLowerCase();
        const code = e.code;

        if (key === 'w' || key === 'ไ' || code === 'KeyW' || key === 'arrowup' || code === 'ArrowUp') return 'up';
        if (key === 's' || key === 'ห' || code === 'KeyS' || key === 'arrowdown' || code === 'ArrowDown') return 'down';
        if (key === 'a' || key === 'ฟ' || code === 'KeyA' || key === 'arrowleft' || code === 'ArrowLeft') return 'left';
        if (key === 'd' || key === 'ก' || code === 'KeyD' || key === 'arrowright' || code === 'ArrowRight') return 'right';

        return null;
    }

    // เมื่อกดปุ่มคีย์บอร์ดลง
    window.addEventListener('keydown', (e) => {
        if (!isMapOpen || isGameOver || isQuestCleared) return;
        const dir = getMoveDirectionKey(e);
        if (dir) {
            e.preventDefault();
            keysPressed[dir] = true;
            targetPoint = null;
        }
    });

    // เมื่อปล่อยปุ่มคีย์บอร์ด
    window.addEventListener('keyup', (e) => {
        const dir = getMoveDirectionKey(e);
        if (dir) delete keysPressed[dir];
    });

    // เมื่อคลิกหรือแตะบนฉากแผนที่ เพื่อสั่งให้ตัวละครเดินไปจุดนั้น
    mapStage.addEventListener('click', (e) => {
        if (!isMapOpen || isGameOver || isQuestCleared) return;
        const rect = mapStage.getBoundingClientRect();
        const clickX = e.clientX - rect.left - (playerSprite.offsetWidth / 2);
        const clickY = e.clientY - rect.top - (playerSprite.offsetHeight / 2);
        targetPoint = { x: clickX, y: clickY };
    });

    // ฟังก์ชันตรวจสอบว่ากล่ององค์ประกอบ elA และ elB ทับ/ชนกันหรือไม่
    function isOverlapping(elA, elB, padding = 6) {
        if (!elA || !elB) return false;
        const a = elA.getBoundingClientRect();
        const b = elB.getBoundingClientRect();
        return !(
            a.right < b.left + padding ||
            a.left > b.right - padding ||
            a.bottom < b.top + padding ||
            a.top > b.bottom - padding
        );
    }

    // ลูปหลักของเกม ทำงานต่อเนื่องทุกเฟรมหน้าจอ
    function gameLoop() {
        // ประมวลผลเฉพาะตอนเปิดแผนที่ ยังไม่ GAME OVER ยังไม่ชนะรอบนี้ และไม่มีป๊อปอัปข้อมูลเปิดทับอยู่
        if (isMapOpen && !isGameOver && !isQuestCleared && !isAnyInfoPopupOpen()) {
            let dx = 0;
            let dy = 0;

            // 1. คำนวณทิศทางจากการกดปุ่มคีย์บอร์ด
            if (keysPressed['up']) dy -= moveSpeed;
            if (keysPressed['down']) dy += moveSpeed;
            if (keysPressed['left']) dx -= moveSpeed;
            if (keysPressed['right']) dx += moveSpeed;

            // 2. ถ้าไม่ได้กดปุ่มคีย์บอร์ด แต่มีเป้าหมายจากการคลิกบนฉาก ให้เดินเข้าหาเป้าหมาย
            if (targetPoint && dx === 0 && dy === 0) {
                const diffX = targetPoint.x - playerX;
                const diffY = targetPoint.y - playerY;
                const distance = Math.hypot(diffX, diffY);

                if (distance > moveSpeed) {
                    dx = (diffX / distance) * moveSpeed;
                    dy = (diffY / distance) * moveSpeed;
                } else {
                    playerX = targetPoint.x;
                    playerY = targetPoint.y;
                    targetPoint = null;
                }
            }

            const maxX = mapStage.clientWidth - playerSprite.offsetWidth;
            const maxY = mapStage.clientHeight - playerSprite.offsetHeight;

            // 3. อัปเดตตำแหน่งผู้เล่นเมื่อมีการเคลื่อนที่
            if (dx !== 0 || dy !== 0) {
                playerX += dx;
                playerY += dy;

                playerX = Math.max(4, Math.min(maxX - 4, playerX));
                playerY = Math.max(28, Math.min(maxY - 4, playerY));

                playerSprite.style.left = playerX + 'px';
                playerSprite.style.top = playerY + 'px';
                playerSprite.classList.add('is-walking');

                const img = playerSprite.querySelector('.player-img');
                if (img && dx !== 0) {
                    img.style.transform = dx < 0 ? 'scaleX(-1)' : 'scaleX(1)';
                }
            } else {
                playerSprite.classList.remove('is-walking');
            }

            // 4. ขยับมอนสเตอร์วิ่งไล่ตามตำแหน่งผู้เล่น
            if (chaseMonster) {
                const mDiffX = playerX - monsterX;
                const mDiffY = playerY - monsterY;
                const mDist = Math.hypot(mDiffX, mDiffY);

                if (mDist > 1) {
                    monsterX += (mDiffX / mDist) * monsterSpeed;
                    monsterY += (mDiffY / mDist) * monsterSpeed;

                    const mMaxX = mapStage.clientWidth - chaseMonster.offsetWidth;
                    const mMaxY = mapStage.clientHeight - chaseMonster.offsetHeight;
                    monsterX = Math.max(4, Math.min(mMaxX - 4, monsterX));
                    monsterY = Math.max(28, Math.min(mMaxY - 4, monsterY));

                    chaseMonster.style.left = monsterX + 'px';
                    chaseMonster.style.top = monsterY + 'px';
                }

                // ตรวจจับว่ามอนสเตอร์วิ่งมาจับผู้เล่นได้หรือยัง
                if (isOverlapping(playerSprite, chaseMonster, 10)) {
                    triggerGameOver();
                }
            }

            // 5. ตรวจจับการเดินชนครบทั้ง 5 จุดบนแผนที่และเช็กเงื่อนไขรับรางวัล
            if (!isGameOver && !isQuestCleared) {
                mapZones.forEach(zone => {
                    const isHit = isOverlapping(playerSprite, zone.el, zone.padding);
                    if (isHit && !zone.inside) {
                        zone.inside = true;
                        targetPoint = null;
                        for (let k in keysPressed) delete keysPressed[k];

                        // บันทึกว่าเดินถึงจุดนี้แล้วในรอบปัจจุบัน และอัปเดตป้ายตัวเลขบนแผนที่
                        if (zone.menuKey) {
                            clearedZonesInRun.add(zone.menuKey);
                            updateMapProgressUI();
                            if (typeof checkMenuProgress === 'function') {
                                checkMenuProgress(zone.menuKey);
                            }
                        }

                        // ถ้าเดินครบทั้ง 5 จุดโดยยังไม่โดนจับ ให้ตั้งธงรอเปิดหน้าต่างรางวัลหลังปิดป๊อปอัปจุดนี้
                        if (clearedZonesInRun.size === mapZones.length) {
                            pendingVictoryAfterPopup = true;
                        }

                        if (zone.popup) {
                            zone.popup.style.display = 'flex';
                        } else if (pendingVictoryAfterPopup) {
                            pendingVictoryAfterPopup = false;
                            showVictoryReward();
                        }
                    } else if (!isHit) {
                        zone.inside = false;
                    }
                });
            }
        }

        requestAnimationFrame(gameLoop);
    }

    requestAnimationFrame(gameLoop);
}