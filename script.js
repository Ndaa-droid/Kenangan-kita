/* =====================================================
   ✏️  EDIT BAGIAN INI SAJA UNTUK MENGUBAH ISI WEBSITE
   ===================================================== */
const CONFIG = {
  judul: "Kenangan Kita",
  namaKamu: "Kaka",
  namaPacar: "Dede",
  subjudul: "Setiap momen bareng Dede tuh paling indah sedunia 🌎💕",

  // Tanggal jadian (format: TAHUN-BULAN-TANGGAL)
  tanggalJadian: "2026-08-22",

  // Teks berjalan di bagian paling atas
  teksBerjalan: [
    "💕 Kaka sayank Dede banget banget banget 💕",
    "🌸 Dede is my everything 🌸",
    "💖 Dede adalah alasan Kaka senyum tiap hari 💖",
    "✨ Cuma Dede yang di hati Kaka ✨"
  ],

  surat:
    "Hai Dede sayangku, cintaku, duniaku 💖\n" +
    "Makasih ya Dede udah selalu ada buat Kaka.\n" +
    "Dede bikin hari-hari Kaka jadi lebih berwarna.\n" +
    "Semoga kita bareng terus sampai kapan pun ya 🥺💕",
  tandaTangan: "Dari Kaka yang selalu sayang Dede ❤️",

  alasan: [
    { emoji: "😘", teks: "Senyum Dede bikin dunia Kaka meleleh" },
    { emoji: "🥰", teks: "Dede selalu sabar sama Kaka" },
    { emoji: "🤗", teks: "Pelukan Dede paling hangat" },
    { emoji: "😂", teks: "Receh Dede bikin Kaka ketawa terus" },
    { emoji: "🌙", teks: "Dede tuh rumah buat Kaka" },
    { emoji: "💍", teks: "Pokoknya Dede masa depan Kaka" }
  ],

  footer: "Dibuat dengan 💗 oleh Kaka khusus untuk Dede",

  // Taruh foto di folder "foto" lalu daftarkan di sini
  foto: [
    { src: "date.jpg", caption: "First Date kita 💕" },
    { src: "bonceng.jpg", caption: "Pertama Kali kita Boncengan" },
    { src: "photobooth.jpg", caption: "Photobooth Pertama kita" },
    { src: "sc2.jpg", caption: "Rutinitas Malam Kita" },
    { src: "kecil.png", caption: "Waktu Kita Masih Kecil" },
    { src: "chat.png", caption: "Chat Kita" }
  ]
};
/* ===================================================== */

const $ = (id) => document.getElementById(id);
const stickers = ["💖", "🌸", "🦋", "⭐", "🎀", "🧸", "🌷", "💫"];
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

// ---------- Teks dasar ----------
document.title = CONFIG.judul + " 💕";
$("judul").textContent = CONFIG.judul;
$("names").textContent = `${CONFIG.namaKamu} 💕 ${CONFIG.namaPacar}`;
$("subjudul").textContent = CONFIG.subjudul;
$("surat").textContent = CONFIG.surat;
$("sign").textContent = CONFIG.tandaTangan;
$("footer-text").textContent = CONFIG.footer;

// teks berjalan (diulang supaya panjang)
$("marquee").textContent = [...CONFIG.teksBerjalan, ...CONFIG.teksBerjalan].join("      ");

const formatTanggal = (str) =>
  new Date(str).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });

$("since").textContent = "Bersama sejak " + formatTanggal(CONFIG.tanggalJadian) + " 🥰";

// ---------- Counter jadian ----------
function updateCounter() {
  const start = new Date(CONFIG.tanggalJadian + "T00:00:00");
  const now = new Date();

  let years = now.getFullYear() - start.getFullYear();
  let months = now.getMonth() - start.getMonth();
  let days = now.getDate() - start.getDate();

  if (days < 0) {
    months--;
    days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
  }
  if (months < 0) {
    years--;
    months += 12;
  }

  $("c-tahun").textContent = Math.max(years, 0);
  $("c-bulan").textContent = Math.max(months, 0);
  $("c-hari").textContent = Math.max(days, 0);
  $("c-jam").textContent = now.getHours();
  $("c-menit").textContent = now.getMinutes();
  $("c-detik").textContent = now.getSeconds();
}
updateCounter();
setInterval(updateCounter, 1000);

// ---------- Galeri polaroid ----------
const PLACEHOLDER =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400'>
       <defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
         <stop offset='0' stop-color='#ffd1e3'/><stop offset='1' stop-color='#e7c6ff'/>
       </linearGradient></defs>
       <rect width='400' height='400' fill='url(#g)'/>
       <text x='50%' y='45%' font-size='80' text-anchor='middle' dominant-baseline='middle'>💖</text>
       <text x='50%' y='65%' font-size='18' fill='#b5307a' text-anchor='middle' font-family='sans-serif'>Foto belum ditambahkan</text>
     </svg>`
  );

CONFIG.foto.forEach((item, index) => {
  const card = document.createElement("article");
  card.className = "polaroid";
  card.style.setProperty("--rot", (Math.random() * 8 - 4).toFixed(1) + "deg");
  card.innerHTML = `
    <div class="thumb">
      <img src="${item.src}" alt="${item.caption}" loading="lazy">
    </div>
    <div class="info">
      <h3>${item.caption}</h3>
    </div>
    <span class="sticker">${pick(stickers)}</span>`;
  card.querySelector("img").addEventListener("error", (e) => {
    e.target.src = PLACEHOLDER;
  });
  card.addEventListener("click", () => openLightbox(index));
  $("gallery").appendChild(card);
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll(".polaroid").forEach((c) => observer.observe(c));

// ---------- Alasan sayang ----------
CONFIG.alasan.forEach((a) => {
  const el = document.createElement("div");
  el.className = "reason";
  el.innerHTML = `<b>${a.emoji}</b>${a.teks}`;
  $("reasons").appendChild(el);
});

// ---------- Lightbox ----------
let current = 0;
const lightbox = $("lightbox");

function showPhoto() {
  const item = CONFIG.foto[current];
  const img = $("lb-img");
  img.onerror = () => { img.src = PLACEHOLDER; };
  img.src = item.src;
  img.alt = item.caption;
  $("lb-caption").textContent = item.caption;
}
function openLightbox(i) {
  current = i;
  showPhoto();
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}
function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}
function move(step) {
  current = (current + step + CONFIG.foto.length) % CONFIG.foto.length;
  showPhoto();
}
$("lb-close").addEventListener("click", closeLightbox);
$("lb-prev").addEventListener("click", () => move(-1));
$("lb-next").addEventListener("click", () => move(1));
lightbox.addEventListener("click", (e) => { if (e.target === lightbox) closeLightbox(); });

// ---------- Surat cinta ----------
const modal = $("modal");
function setModal(open) {
  modal.classList.toggle("open", open);
  modal.setAttribute("aria-hidden", String(!open));
  document.body.style.overflow = open ? "hidden" : "";
}
$("btn-surat").addEventListener("click", () => { setModal(true); burst(window.innerWidth / 2, window.innerHeight / 2, 24); });
$("modal-close").addEventListener("click", () => setModal(false));
modal.addEventListener("click", (e) => { if (e.target === modal) setModal(false); });

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") { closeLightbox(); setModal(false); }
  if (!lightbox.classList.contains("open")) return;
  if (e.key === "ArrowLeft") move(-1);
  if (e.key === "ArrowRight") move(1);
});

// ---------- Kelopak & hati jatuh ----------
const fallingBox = $("falling");
const fallItems = ["💖", "🌸", "💕", "🌷", "✨", "🦋"];
for (let i = 0; i < 22; i++) {
  const s = document.createElement("span");
  s.className = "fall";
  s.textContent = pick(fallItems);
  s.style.left = Math.random() * 100 + "%";
  s.style.fontSize = 14 + Math.random() * 22 + "px";
  s.style.animationDuration = 8 + Math.random() * 10 + "s";
  s.style.animationDelay = -Math.random() * 15 + "s";
  fallingBox.appendChild(s);
}

// ---------- Hati meledak saat klik ----------
function burst(x, y, count = 12) {
  for (let i = 0; i < count; i++) {
    const h = document.createElement("span");
    h.className = "burst";
    h.textContent = pick(["💖", "💕", "💗", "✨", "🌸", "💘"]);
    h.style.left = x + "px";
    h.style.top = y + "px";
    h.style.fontSize = 14 + Math.random() * 18 + "px";
    const angle = Math.random() * Math.PI * 2;
    const dist = 60 + Math.random() * 90;
    h.style.setProperty("--dx", Math.cos(angle) * dist + "px");
    h.style.setProperty("--dy", Math.sin(angle) * dist + "px");
    document.body.appendChild(h);
    setTimeout(() => h.remove(), 1000);
  }
}
document.addEventListener("click", (e) => burst(e.clientX, e.clientY));

// ---------- Glitter mengikuti kursor ----------
let lastTrail = 0;
document.addEventListener("mousemove", (e) => {
  const now = Date.now();
  if (now - lastTrail < 45) return;
  lastTrail = now;
  const t = document.createElement("span");
  t.className = "trail";
  t.textContent = pick(["✨", "💫", "⭐", "💖"]);
  t.style.left = e.clientX + "px";
  t.style.top = e.clientY + "px";
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 800);
});