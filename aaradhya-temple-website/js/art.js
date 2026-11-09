/* Original illustrated temple scenes (SVG) so the design works before real photography is added.
   Replace with authentic photos from assets/images/ when available. */
let _artN = 0;
function templeArt(kind = "gopuram", sky = ["#191919", "#642D32", "#C49A48"], tiers = 7, label = "Illustration of a temple at sunrise") {
  const id = "ar" + (++_artN);
  const stars = [[40, 30], [90, 55], [320, 40], [360, 80], [250, 25], [150, 20], [60, 100]]
    .map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.2" fill="#F8F5EF" opacity=".6"/>`).join("");
  let body = "";
  const dark = "#191919", gold = "#C49A48";

  if (kind === "gopuram") {
    const cx = 200, base = 262; let y = base, w = 170;
    body += `<rect x="${cx - w / 2 - 14}" y="${base}" width="${w + 28}" height="16" fill="${dark}"/>`;
    for (let i = 0; i < tiers; i++) {
      const h = Math.min(24, 190 / tiers), w2 = w - i * (w - 26) / tiers;
      y -= h;
      body += `<path d="M${cx - w2 / 2} ${y + h} L${cx - w2 / 2 + 5} ${y} H${cx + w2 / 2 - 5} L${cx + w2 / 2} ${y + h}Z" fill="${dark}" stroke="${gold}" stroke-opacity=".75" stroke-width="1"/>`;
      const n = Math.max(1, Math.floor(w2 / 34)), gap = w2 / (n + 1);
      for (let j = 1; j <= n; j++) body += `<rect x="${cx - w2 / 2 + gap * j - 3}" y="${y + h * .3}" width="6" height="${h * .45}" rx="3" fill="${gold}" opacity=".8"/>`;
    }
    body += `<ellipse cx="${cx}" cy="${y - 6}" rx="14" ry="7" fill="${dark}" stroke="${gold}" stroke-width="1"/>`;
    for (let k = -2; k <= 2; k++) body += `<ellipse cx="${cx + k * 7}" cy="${y - 13}" rx="3.5" ry="6" fill="${gold}"/>`;
    body += `<path d="M${cx} ${y - 18} V${y - 34}" stroke="${gold}" stroke-width="2"/>`;
    body += `<rect x="40" y="244" width="70" height="22" fill="${dark}"/><rect x="290" y="244" width="70" height="22" fill="${dark}"/>`;
  } else if (kind === "shikhara") {
    body += `<path d="M135 266 C135 205 160 130 200 70 C240 130 265 205 265 266Z" fill="${dark}" stroke="${gold}" stroke-opacity=".7"/>`;
    for (let i = 0; i < 9; i++) { const yy = 88 + i * 19, ww = 18 + i * 7; body += `<path d="M${200 - ww} ${yy} Q200 ${yy - 6} ${200 + ww} ${yy}" stroke="${gold}" stroke-opacity=".55" fill="none"/>`; }
    body += `<ellipse cx="200" cy="66" rx="13" ry="5" fill="${gold}"/><path d="M200 60 V36 M200 40 l16 5 l-16 5" stroke="${gold}" stroke-width="2" fill="#642D32"/>`;
    body += `<path d="M95 266 C95 230 112 190 135 160 C158 190 170 230 170 266Z M230 266 C230 230 242 190 265 160 C288 190 305 230 305 266Z" fill="${dark}" opacity=".95"/>`;
    body += `<rect x="60" y="256" width="280" height="12" fill="${dark}"/>`;
  } else if (kind === "mountain") {
    body += `<path d="M-10 270 L90 110 L140 170 L215 55 L300 175 L340 120 L420 270Z" fill="#2b3447"/>`;
    body += `<path d="M215 55 L190 100 L205 92 L215 112 L228 90 L242 98Z M90 110 L72 140 L88 132 L100 142Z" fill="#F8F5EF" opacity=".92"/>`;
    body += `<path d="M-10 270 L70 190 L150 235 L230 185 L330 240 L420 270Z" fill="#1a2030"/>`;
    body += `<g><rect x="178" y="228" width="44" height="26" fill="${dark}" stroke="${gold}" stroke-opacity=".7"/><path d="M182 228 L200 204 L218 228Z" fill="${dark}" stroke="${gold}" stroke-opacity=".7"/><rect x="196" y="236" width="8" height="18" fill="${gold}"/><path d="M200 204 V192" stroke="${gold}" stroke-width="2"/></g>`;
  } else if (kind === "ghat") {
    body += `<path d="M60 200 C60 170 80 130 100 105 C120 130 140 170 140 200Z M250 210 C250 175 270 140 295 112 C320 140 340 175 340 210Z" fill="${dark}" opacity=".9"/>`;
    for (let i = 0; i < 6; i++) body += `<rect x="${-10 + i * 6}" y="${206 + i * 10}" width="${420 - i * 12}" height="11" fill="${i % 2 ? "#232020" : dark}" stroke="${gold}" stroke-opacity=".25"/>`;
    body += `<rect x="150" y="150" width="100" height="58" fill="${dark}" stroke="${gold}" stroke-opacity=".6"/>`;
    body += `<path d="M150 150 Q200 96 250 150Z" fill="${dark}" stroke="${gold}" stroke-opacity=".6"/><path d="M200 112 V92" stroke="${gold}" stroke-width="2"/>`;
    body += `<rect x="-10" y="262" width="420" height="40" fill="#0f1822" opacity=".55"/>`;
    for (let i = 0; i < 7; i++) body += `<path d="M${10 + i * 58} ${272 + (i % 2) * 8} q12 -5 24 0" stroke="${gold}" stroke-opacity=".6" fill="none"/>`;
    for (let i = 0; i < 5; i++) body += `<circle cx="${70 + i * 62}" cy="${284 + (i % 2) * 6}" r="3" fill="#e8b86a" opacity=".9"/>`;
  }
  const ground = kind === "ghat" ? "" : `<rect x="-10" y="262" width="420" height="50" fill="#120a0b"/>`;
  return `<svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${label}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="${id}k" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${sky[0]}"/><stop offset=".6" stop-color="${sky[1]}"/><stop offset="1" stop-color="${sky[2]}"/></linearGradient>
      <radialGradient id="${id}s"><stop offset="0" stop-color="#fff3d1"/><stop offset=".45" stop-color="${gold}" stop-opacity=".85"/><stop offset="1" stop-color="${gold}" stop-opacity="0"/></radialGradient>
    </defs>
    <rect width="400" height="300" fill="url(#${id}k)"/>${stars}
    <circle class="sun-glow" cx="200" cy="170" r="110" fill="url(#${id}s)"/>
    ${body}${ground}
  </svg>`;
}

/* Photo on top of illustration. Missing photo file -> illustration stays visible. */
function media(photo, svg, alt) {
  const img = photo ? `<img src="${photo}" alt="${alt}" loading="lazy" decoding="async" onload="this.classList.add('ok')" onerror="this.remove()">` : "";
  return `<span class="media">${svg}${img}</span>`;
}
