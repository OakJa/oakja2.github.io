
const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);
let state = {fontScale:1,contrast:false};

function applyFont(){ const s = Math.max(0.85, Math.min(1.6, state.fontScale)); document.documentElement.style.fontSize = (17 * s) + 'px'; document.getElementById('font-scale').textContent = Math.round(s*100) + '%'; }
function toggleContrast(){ state.contrast = !state.contrast; document.body.classList.toggle('high-contrast', state.contrast); document.getElementById('contrast-status').textContent = state.contrast ? 'คอนทราสต์สูง: เปิด' : 'คอนทราสต์สูง: ปิด'; }
document.addEventListener('keydown', e => { if(e.altKey && (e.key==='=' || e.key==='+')){ state.fontScale += 0.1; applyFont(); e.preventDefault(); } if(e.altKey && e.key==='-'){ state.fontScale -= 0.1; applyFont(); e.preventDefault(); } if(e.altKey && e.key.toLowerCase()==='h'){ toggleContrast(); e.preventDefault(); } });

function setup(){
  applyFont();
  document.getElementById('btn-font-plus').addEventListener('click', ()=>{ state.fontScale += 0.1; applyFont(); });
  document.getElementById('btn-font-minus').addEventListener('click', ()=>{ state.fontScale -= 0.1; applyFont(); });
  document.getElementById('btn-contrast').addEventListener('click', toggleContrast);
  document.getElementById('simulate-caption').addEventListener('click', simulateCaption);
  document.getElementById('upload-audio').addEventListener('change', handleAudio);
  document.getElementById('contact-form').addEventListener('submit', e => { e.preventDefault(); submitContact(); });
  // focus management for skip link
  document.getElementById('skip-to-content').addEventListener('click', ()=>{ document.getElementById('main-content').focus(); });
}

function simulateCaption(){
  const sample = 'จำลองการถอดความ (Clinical Demo): ผู้พูดกล่าวคำทักทายและกล่าวสรุปการทดสอบร่วมกัน';
  document.getElementById('transcript').textContent = sample;
  document.getElementById('caption-status').textContent = 'ถอดความเสร็จ (จำลอง)';
  // for clinical audiences, also log an anonymous event (placeholder)
  console.info('demo:transcript', {ts:Date.now()});
}

function handleAudio(e){
  const f = e.target.files[0];
  if(!f) return;
  document.getElementById('audio-name').textContent = `${f.name} — ${Math.round(f.size/1024)} KB`;
  document.getElementById('caption-status').textContent = 'ไฟล์อัปโหลดแล้ว (สำหรับเดโม)';
  document.getElementById('transcript').textContent = 'กด Simulate Caption เพื่อสาธิตการถอดความ';
}

function submitContact(){
  const name = document.getElementById('c-name').value || 'ผู้ติดต่อ';
  const email = document.getElementById('c-email').value || '';
  const msg = document.getElementById('c-msg').value || '';
  // polite confirmation
  document.getElementById('contact-status').textContent = `ขอบคุณ ${name} ทีมงานจะติดต่อกลับทางอีเมล ${email || '(ไม่ได้ระบุ)'} ภายใน 3 วันทำการ`;
  // open mail client as fallback
  const body = `ชื่อ: ${name}%0D%0Aอีเมล: ${email}%0D%0Aข้อความ:%0D%0A${encodeURIComponent(msg)}`;
  window.location.href = `mailto:support@hearing-aid.example?subject=${encodeURIComponent('[ติดต่อ] เครื่องช่วยฟัง')}&body=${body}`;
}

document.addEventListener('DOMContentLoaded', setup);
