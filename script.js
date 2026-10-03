const surpriseBtn = document.getElementById("surpriseBtn");
const wishBtn = document.getElementById("wishBtn");
const modal = document.getElementById("wishModal");
const closeModal = document.getElementById("closeModal");
const closeModalBtn = document.getElementById("closeModalBtn");
const musicBtn = document.getElementById("musicBtn");
const musicText = document.getElementById("musicText");

surpriseBtn.addEventListener("click", () => {
  document.getElementById("surprise").scrollIntoView({ behavior: "smooth" });
});

function openWish() {
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  burstHearts();
}
function closeWish() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
}
wishBtn.addEventListener("click", openWish);
closeModal.addEventListener("click", closeWish);
closeModalBtn.addEventListener("click", closeWish);
document.querySelector(".modal-backdrop").addEventListener("click", closeWish);

document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeWish();
});

/* Floating hearts */
const heartBox = document.querySelector(".hearts");
function makeHeart() {
  const h = document.createElement("span");
  h.textContent = Math.random() > .25 ? "♡" : "♥";
  h.style.left = Math.random() * 100 + "vw";
  h.style.fontSize = 10 + Math.random() * 22 + "px";
  h.style.animationDuration = 7 + Math.random() * 8 + "s";
  h.style.animationDelay = Math.random() * 2 + "s";
  heartBox.appendChild(h);
  setTimeout(() => h.remove(), 17000);
}
setInterval(makeHeart, 900);
for (let i = 0; i < 8; i++) setTimeout(makeHeart, i * 300);

/* Wish celebration */
function burstHearts() {
  for (let i = 0; i < 26; i++) {
    const h = document.createElement("span");
    h.textContent = ["♥","♡","✦","✧"][Math.floor(Math.random()*4)];
    h.style.position = "fixed";
    h.style.left = (45 + Math.random()*10) + "vw";
    h.style.top = (45 + Math.random()*10) + "vh";
    h.style.color = "#ff6fae";
    h.style.fontSize = (12 + Math.random()*22) + "px";
    h.style.zIndex = 120;
    h.style.pointerEvents = "none";
    h.style.transition = "transform 1.4s ease, opacity 1.4s ease";
    document.body.appendChild(h);
    requestAnimationFrame(() => {
      const x = (Math.random()-.5)*500, y = (Math.random()-.5)*500;
      h.style.transform = `translate(${x}px,${y}px) rotate(${Math.random()*160-80}deg)`;
      h.style.opacity = "0";
    });
    setTimeout(() => h.remove(), 1500);
  }
}

/* Scroll reveals */
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, { threshold: .12 });
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

/* Demo music button: intentionally does not autoplay audio.
   Replace this with a client's chosen MP3 in a customized version. */
let musicPlaying = false;
musicBtn.addEventListener("click", () => {
  musicPlaying = !musicPlaying;
  musicText.textContent = musicPlaying ? "Playing" : "Play";
  musicBtn.querySelector(".music-icon").textContent = musicPlaying ? "♫" : "♪";
});
