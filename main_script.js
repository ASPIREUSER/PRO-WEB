/* Fit Remaja v3.0 - script.js
   - Dropdown nav + smooth scroll
   - Tabs for Pemakanan
   - BMI calculator (color-coded)
   - ObesAI floating bubble + frosted chat panel
   - Typing animation + auto-scroll
   - Premium comment system (likes & delete) stored in localStorage
   - Minimal knowledge base for ObesAI (BM)
*/

/* Helper: query */
const $ = sel => document.querySelector(sel);
const $$ = sel => Array.from(document.querySelectorAll(sel));

/* Smooth scroll for nav links & hero buttons */
document.querySelectorAll('[data-link]').forEach(a=>{
  a.addEventListener('click', e=>{
    e.preventDefault();
    const href = a.getAttribute('href');
    const target = document.querySelector(href);
    if(target) target.scrollIntoView({behavior:'smooth',block:'start'});
  });
});
document.querySelectorAll('.btn[data-scroll]').forEach(b=>{
  b.addEventListener('click', ()=> {
    const s = b.getAttribute('data-scroll');
    document.querySelector(s).scrollIntoView({behavior:'smooth',block:'start'});
  });
});

/* TABS (Pemakanan) */
const tabBtns = $$('.tab-btn');
const panels = $$('.tab-panel');
tabBtns.forEach(btn=>{
  btn.addEventListener('click', ()=>{
    tabBtns.forEach(b=>b.classList.remove('active'));
    panels.forEach(p=>p.classList.remove('active'));
    btn.classList.add('active');
    const target = document.querySelector(btn.dataset.target);
    if(target) target.classList.add('active');
  });
});

/* Populate Articles Grid (KB short list) */
const KB = [
  {id:'kb1', title:'Apa itu Obesiti?', summary:'Obesiti ialah keadaan lebihan lemak badan yang memberi risiko kesihatan.'},
  {id:'kb2', title:'Kesan Obesiti', summary:'Obesiti meningkatkan risiko diabetes, penyakit jantung dan masalah sendi.'},
  {id:'kb3', title:'Pemakanan Sihat', summary:'Pilih bijirin penuh, sayur & protein tanpa lemak.'},
  {id:'kb4', title:'Senaman untuk Remaja', summary:'30 minit aktiviti setiap hari, campur kardio & kekuatan.'},
  {id:'kb5', title:'Tidur & Berat Badan', summary:'Tidur cukup membantu regulasi hormon lapar.'},
  {id:'kb6', title:'Cara Baca Label Makanan', summary:'Perhatikan gula, garam dan saiz hidangan.'},
  {id:'kb7', title:'Serat dan Pencernaan', summary:'Serat penting untuk sistem pencernaan dan kenyang lebih lama.'},
  {id:'kb8', title:'Contoh Menu 7 Hari', summary:'Contoh menu seimbang untuk remaja aktif.'},
  {id:'kb9', title:'Air dan Hidrasi', summary:'Minum air sebelum makan membantu kawal pengambilan.'},
  {id:'kb10', title:'Teknik Mindful Eating', summary:'Makan perlahan dan sedar untuk elak makan berlebihan.'}
];

const articlesGrid = $('#articlesGrid');
KB.forEach(k=>{
  const card = document.createElement('div');
  card.className = 'article-card';
  card.innerHTML = `<h4>${k.title}</h4><p>${k.summary}</p><button class="btn ghost read-btn" data-id="${k.id}">Baca</button>`;
  articlesGrid.appendChild(card);
});
/* Read button show modal (simple alert for demo) */
document.body.addEventListener('click', e=>{
  if(e.target.classList.contains('read-btn')){
    const id = e.target.dataset.id;
    const item = KB.find(k=>k.id===id);
    if(item) alert(item.title + "\n\n" + item.summary + "\n\n(Artikel penuh boleh ditambah ke KB untuk RAG.)");
  }
});

/* BMI Calculator */
$('#bmiCalc').addEventListener('click', ()=>{
  const w = parseFloat($('#bmiWeight').value);
  const hcm = parseFloat($('#bmiHeight').value);
  const resultDiv = $('#bmiResult');
  if(!w || !hcm){ resultDiv.innerHTML = '<p style="color:#b33">Sila masukkan berat & tinggi yang sah.</p>'; return; }
  const h = hcm/100;
  const bmi = +(w / (h*h)).toFixed(1);
  let cat = '', color = '';
  if(bmi < 18.5){ cat='Berat Kurang'; color='#0b7'; }
  else if(bmi < 25){ cat='Normal'; color='#08a'; }
  else if(bmi < 30){ cat='Berlebihan Berat'; color='#e68'; }
  else { cat='Obesiti'; color='#d33'; }
  resultDiv.innerHTML = `<h4 style="color:${color}">BMI = ${bmi} • ${cat}</h4><p>Petua: ${obesaiAdviceByCategory(cat)}</p>`;
});

/* Simple advice generator based on category */
function obesaiAdviceByCategory(cat){
  if(cat==='Berat Kurang') return 'Tambah pengambilan protein & kalori sihat; rujuk pakar pemakanan jika perlu.';
  if(cat==='Normal') return 'Tahniah! Kekalkan diet seimbang & aktiviti harian.';
  if(cat==='Berlebihan Berat') return 'Kurangkan pengambilan gula & minyak; tambah aktiviti fizikal 30 min/hari.';
  return 'Dapatkan nasihat profesional; mulakan pelan berstruktur dan pantau kemajuan.';
}