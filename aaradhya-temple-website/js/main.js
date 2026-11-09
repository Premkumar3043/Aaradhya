const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const rupee = n => "₹" + n.toLocaleString("en-IN");
const byId = (list, id) => list.find(x => x.id === id);
const store = { get(k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } }, set(k, v) { try { sessionStorage.setItem(k, v); } catch (e) {} } };

/* Toast */
let toastTimer;
function toast(msg) {
  const t = $("#toast"); t.textContent = msg; t.classList.add("show");
  clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove("show"), 3200);
}

const introWord = $("#introWord");
if (introWord && typeof gsap !== "undefined") {
  const introLabel = introWord.textContent.trim();
  introWord.textContent = "";
  [...introLabel].forEach((char, index) => {
    const span = document.createElement("span");
    span.className = "intro-char";
    span.textContent = char;
    span.style.setProperty("--char-index", index);
    introWord.appendChild(span);
  });
}

/* ---------- Intro ---------- */
let introCtl;
function startSite() {
  Anim.initSmoothScroll();
  Anim.heroIn();
}
(function initIntro() {
  const overlay = $("#intro");
  if (store.get("aaradhya-lotus-sequence-v7")) {
    overlay.remove();
    document.body.classList.remove("is-intro");
    startSite();
    return;
  }
  introCtl = Anim.intro(startSite);
  let closed = false;
  const close = () => { if (closed) return; closed = true; store.set("aaradhya-lotus-sequence-v7", "1"); introCtl.out(); };
  $("#introBegin").addEventListener("click", close);
  $("#introSkip").addEventListener("click", close);
  document.addEventListener("keydown", e => { if (e.key === "Escape") close(); });
  $("#introBegin").focus({ preventScroll: true });
})();

/* ---------- Header, progress, floating actions ---------- */
const header = $("#header"), fab = $("#fab"), progress = $("#progress");
function onScroll() {
  const y = window.scrollY, max = document.documentElement.scrollHeight - innerHeight;
  header.classList.toggle("scrolled", y > 40);
  progress.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
  const plan = $("#plan").getBoundingClientRect();
  const inPlan = plan.top < innerHeight * .6 && plan.bottom > innerHeight * .3;
  fab.classList.toggle("show", y > innerHeight * .8 && !inPlan);
}
addEventListener("scroll", onScroll, { passive: true }); onScroll();
$("#toTop").addEventListener("click", () => Anim.scrollTo(0, { duration: 1.15 }));

const nav = $("#nav"), menuBtn = $("#menuBtn");
function setMenu(open) {
  nav.classList.toggle("open", open);
  menuBtn.setAttribute("aria-expanded", open);
  document.body.style.overflow = open ? "hidden" : "";
  Anim.setScrollStopped(open);
}
menuBtn.addEventListener("click", () => setMenu(!nav.classList.contains("open")));
nav.addEventListener("click", e => { if (e.target.closest("a")) setMenu(false); });

/* Active nav link */
const navLinks = $$(".nav a");
const secObs = new IntersectionObserver(es => es.forEach(en => {
  if (en.isIntersecting) navLinks.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + en.target.id));
}), { rootMargin: "-45% 0px -50% 0px" });
["home", "temples", "packages", "how", "about", "help"].forEach(id => secObs.observe($("#" + id)));

/* ---------- Hero extras ---------- */
$$("#heroTitle .line").forEach(l => { l.innerHTML = l.textContent.split(" ").map(w => `<span class="w"><i>${w}</i></span>`).join(" "); });
(function heroFx() {
  const hero = $(".hero");
  hero.addEventListener("pointermove", e => {
    const r = hero.getBoundingClientRect();
    hero.style.setProperty("--gx", e.clientX - r.left + "px"); hero.style.setProperty("--gy", e.clientY - r.top + "px");
  });
  let petals = "";
  for (let i = 0; i < 16; i++) petals += `<path d="M300 300 C270 230 270 130 300 70 C330 130 330 230 300 300Z" transform="rotate(${i * 22.5} 300 300)"/>`;
  $(".hero-scene").insertAdjacentHTML("afterbegin", `<svg class="mandala hero-mandala" viewBox="0 0 600 600" fill="none" stroke="#C49A48" stroke-width="1" stroke-opacity=".35">${petals}<circle cx="300" cy="300" r="60"/><circle cx="300" cy="300" r="230"/><circle cx="300" cy="300" r="290"/></svg>`);
})();
/* marquee */
$("#marquee").innerHTML = [0, 1].map(() => TEMPLES.map(t => `<span>${t.name}<i></i></span>`).join("")).join("");
/* spotlight + magnetic */
document.addEventListener("pointermove", e => {
  const c = e.target.closest(".dest, .t-card, .pkg"); if (!c) return;
  const r = c.getBoundingClientRect(); c.style.setProperty("--mx", e.clientX - r.left + "px"); c.style.setProperty("--my", e.clientY - r.top + "px");
});
if (typeof gsap !== "undefined" && matchMedia("(hover:hover) and (prefers-reduced-motion: no-preference)").matches) {
  $$(".btn-gold, .hero-cta .btn, .final .btn").forEach(b => {
    const x = gsap.quickTo(b, "x", { duration: .4, ease: "power3" }), y = gsap.quickTo(b, "y", { duration: .4, ease: "power3" });
    b.addEventListener("pointermove", e => { const r = b.getBoundingClientRect(); x((e.clientX - r.left - r.width / 2) * .25); y((e.clientY - r.top - r.height / 2) * .35); });
    b.addEventListener("pointerleave", () => { x(0); y(0); });
  });
}
$("#heroTemple").innerHTML = (() => {
  const g = (x, scale) => {
    let s = "", y = 760, w = 300;
    s += `<rect x="${x - w / 2 - 24}" y="${y}" width="${w + 48}" height="30" fill="#120a0b"/>`;
    for (let i = 0; i < 9; i++) {
      const h = 40, w2 = w - i * 28; y -= h;
      s += `<path d="M${x - w2 / 2} ${y + h} L${x - w2 / 2 + 9} ${y} H${x + w2 / 2 - 9} L${x + w2 / 2} ${y + h}Z" fill="#150c0d" stroke="#C49A48" stroke-opacity=".7"/>`;
      const n = Math.max(1, Math.floor(w2 / 58)), gap = w2 / (n + 1);
      for (let j = 1; j <= n; j++) s += `<rect x="${x - w2 / 2 + gap * j - 5}" y="${y + 10}" width="10" height="20" rx="5" fill="#C49A48" opacity=".85"/>`;
    }
    s += `<ellipse cx="${x}" cy="${y - 10}" rx="26" ry="12" fill="#150c0d" stroke="#C49A48"/>`;
    for (let k = -2; k <= 2; k++) s += `<ellipse cx="${x + k * 13}" cy="${y - 24}" rx="6" ry="11" fill="#C49A48"/>`;
    s += `<path d="M${x} ${y - 36} V${y - 70}" stroke="#C49A48" stroke-width="3"/>`;
    return `<g transform="translate(${x} 790) scale(${scale}) translate(${-x} -790)">${s}</g>`;
  };
  return g(1000, 1);
})();
(function embers() {
  const box = $("#embers");
  for (let i = 0; i < 16; i++) {
    const e = document.createElement("span");
    e.className = i % 4 === 0 ? "ember ember-petal" : "ember";
    e.style.setProperty("--petal-tilt", (i * 19 - 45) + "deg");
    e.style.left = Math.random() * 100 + "%";
    e.style.setProperty("--dur", 9 + Math.random() * 10 + "s");
    e.style.setProperty("--delay", -Math.random() * 14 + "s");
    e.style.setProperty("--drift", (Math.random() * 120 - 60) + "px");
    const s = 3 + Math.random() * 5; e.style.width = e.style.height = s + "px";
    box.appendChild(e);
  }
})();

/* ---------- Footer wordmark reveal: replay on every viewport re-entry ---------- */
(function footerWordmarkReveal() {
  const mark = $("#footerWordmarkText");
  const wrap = $("#footerWordmark");
  if (!mark || !wrap) return;

  const label = mark.textContent.trim();
  mark.replaceChildren();
  [...label].forEach((char, index) => {
    const mask = document.createElement("span");
    mask.className = "footer-letter-mask";
    const letter = document.createElement("span");
    letter.className = "footer-letter";
    letter.textContent = char;
    letter.style.setProperty("--letter-index", index);
    mask.appendChild(letter);
    mark.appendChild(mask);
  });
  mark.classList.add("is-split");

  if (!("IntersectionObserver" in window)) {
    wrap.classList.add("is-visible");
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.target !== wrap) return;
      if (entry.isIntersecting && entry.intersectionRatio >= 0.12) {
        wrap.classList.remove("is-visible");
        void mark.offsetWidth;
        requestAnimationFrame(() => wrap.classList.add("is-visible"));
      } else {
        wrap.classList.remove("is-visible");
      }
    });
  }, {
    threshold: [0, 0.12, 0.25],
    rootMargin: "-6% 0px -8% 0px"
  });
  observer.observe(wrap);
})();

/* ---------- Temples ---------- */
const tMedia = t => media(t.photo, templeArt(t.art, t.sky, t.tiers || 6, "Illustration of " + t.name), t.name);
const pMedia = p => {
  const temple = byId(TEMPLES, p.temples[0]);
  return media(temple.photo, templeArt(p.art, p.sky, p.tiers || 6, "Illustration of " + temple.name), temple.name);
};
const templeCard = t => `
  <button class="t-card" type="button" data-open-temple="${t.id}" data-plan-temple="${t.id}">
    <div class="art">${tMedia(t)}</div>
    <div class="t-body"><span class="t-loc">${t.city}, ${t.state}</span><h3>${t.name}</h3><p>${t.summary}</p>
    <span class="t-meta">${t.deity} · Best season: ${t.season.split(";")[0]}</span></div>
  </button>`;

function renderFeatured() {
  const f = TEMPLES.filter(t => t.featured).slice(0, 5);
  $("#featureGrid").innerHTML = f.map((t, i) => `
    <button class="dest f${i + 1}" type="button" data-open-temple="${t.id}" data-plan-temple="${t.id}">
      <div class="art">${tMedia(t)}</div>
      <div class="dest-body"><small>${t.city}, ${t.state}</small><h3>${t.name}</h3>${i === 0 ? `<p>${t.summary}</p>` : ""}<span class="uline"></span></div>
    </button>`).join("");
}

const states = [...new Set(TEMPLES.map(t => t.state))].sort();
$("#tState").insertAdjacentHTML("beforeend", states.map(s => `<option>${s}</option>`).join(""));
function renderTemples(skeleton) {
  const grid = $("#tGrid");
  if (skeleton) { grid.innerHTML = Array(3).fill('<div class="skeleton"></div>').join(""); return setTimeout(() => renderTemples(), 350); }
  const q = $("#tSearch").value.trim().toLowerCase(), st = $("#tState").value, dt = $("#tDeity").value, sort = $("#tSort").value;
  let list = TEMPLES.filter(t =>
    (!q || [t.name, t.city, t.state, t.deity].join(" ").toLowerCase().includes(q)) && (!st || t.state === st) && (!dt || t.group === dt));
  if (sort === "az") list.sort((a, b) => a.name.localeCompare(b.name));
  if (sort === "state") list.sort((a, b) => a.state.localeCompare(b.state) || a.name.localeCompare(b.name));
  $("#tCount").textContent = `${list.length} temples shown`;
  grid.innerHTML = list.length ? list.map(templeCard).join("") :
    `<div class="empty"><h3>No temples match your search</h3><p>Try a different name or clear the filters.</p><p style="margin-top:1rem"><button class="btn btn-dark btn-sm" type="button" id="emptyReset">Reset filters</button></p></div>`;
  Anim.reveal(grid);
}
let tDebounce;
["tSearch"].forEach(id => $("#" + id).addEventListener("input", () => { clearTimeout(tDebounce); tDebounce = setTimeout(() => renderTemples(), 160); }));
["tState", "tDeity", "tSort"].forEach(id => $("#" + id).addEventListener("change", () => renderTemples()));
function resetFilters() { $("#tSearch").value = ""; $("#tState").value = ""; $("#tDeity").value = ""; $("#tSort").value = "featured"; renderTemples(); }
$("#tReset").addEventListener("click", resetFilters);

/* ---------- Packages ---------- */
let pkgFilter = "all";
function renderPackages() {
  const list = PACKAGES.filter(p => pkgFilter === "all" || p.tags.includes(pkgFilter));
  $("#pkgGrid").innerHTML = list.map(p => `
    <article class="pkg">
      <div class="pkg-art">${pMedia(p)}<span class="pkg-days">${p.days} days</span></div>
      <div class="pkg-body">
        <h3>${p.title}</h3><div class="route">${p.route}</div>
        <div class="tag-row">${p.tags.map(t => `<span class="tag">${{ family: "Family", senior: "Senior-friendly", multi: "Multi-temple", short: "Short visit" }[t]}</span>`).join("")}</div>
        <ul>${p.inc.slice(0, 3).map(i => `<li>${i}</li>`).join("")}</ul>
        <div class="pkg-foot">
          <div class="price"><small>Demo estimate from</small><b>${rupee(p.price)}</b><small>${p.basis}</small></div>
          <div class="dlg-actions"><button class="btn btn-line btn-sm" style="color:var(--charcoal)" data-open-package="${p.id}" type="button">View itinerary</button></div>
        </div>
      </div>
    </article>`).join("");
  Anim.reveal($("#pkgGrid"));
}
function setPkgFilter(f) {
  pkgFilter = f;
  $$("#pkgChips .chip").forEach(c => c.setAttribute("aria-pressed", c.dataset.f === f));
  renderPackages();
}
$("#pkgChips").addEventListener("click", e => { const c = e.target.closest(".chip"); if (c) setPkgFilter(c.dataset.f); });

/* ---------- Dialogs ---------- */
const dlg = $("#dlg");
function openDialog(html) {
  $("#dlgBody").innerHTML = `<button class="dlg-close" type="button" aria-label="Close" data-close>✕</button>` + html;
  if (!dlg.open) dlg.showModal();
  $("#dlgBody").scrollTop = 0;
  Anim.dialogIn(dlg);
}
dlg.addEventListener("click", e => { if (e.target === dlg || e.target.closest("[data-close]")) dlg.close(); });

function openTemple(id) {
  const t = byId(TEMPLES, id); if (!t) return;
  const related = PACKAGES.filter(p => p.temples.includes(id));
  openDialog(`
    <div class="dlg-banner">${tMedia(t)}
      <div class="dlg-title"><small>${t.city}, ${t.state}</small><h2>${t.name}</h2></div></div>
    <div class="dlg-body">
      <dl class="qfacts">
        <div><dt>Deity</dt><dd>${t.deity}</dd></div><div><dt>Location</dt><dd>${t.state}</dd></div>
        <div><dt>Typical visit</dt><dd>${t.duration}</dd></div><div><dt>Best season</dt><dd>${t.season}</dd></div>
        <div><dt>Official site</dt><dd>Check the temple's website</dd></div>
      </dl>
      <div><h3>About the temple</h3><p>${t.about}</p></div>
      <div class="dlg-grid">
        <div><h3>Darshan and visit information</h3>
          <p class="notice">Timings, entry rules and dress guidance change. Confirm on the official temple website before you travel. Source: Aaradhya demo content, not verified live.</p></div>
        <div><h3>How to reach</h3><ul><li><b>Rail:</b> ${t.reach.rail}</li><li><b>Air:</b> ${t.reach.air}</li><li><b>Road:</b> ${t.reach.road}</li></ul></div>
      </div>
      ${related.length ? `<div><h3>Related journeys</h3><div class="related">${related.map(p => `<button class="chip" type="button" data-open-package="${p.id}">${p.title}</button>`).join("")}</div></div>` : ""}
      <div class="dlg-actions"><button class="btn btn-dark" type="button" data-plan="${t.id}">Plan a visit</button><button class="btn btn-line" style="color:var(--charcoal)" type="button" data-close>Close</button></div>
    </div>`);
}
function openPackage(id) {
  const p = byId(PACKAGES, id); if (!p) return;
  openDialog(`
    <div class="dlg-banner">${pMedia(p)}
      <div class="dlg-title"><small>${p.days} days · ${p.route}</small><h2>${p.title}</h2></div></div>
    <div class="dlg-body">
      <dl class="qfacts">
        <div><dt>Suits</dt><dd>${p.suits}</dd></div><div><dt>Travel window</dt><dd>${p.window}</dd></div>
        <div><dt>Demo estimate</dt><dd>${rupee(p.price)}</dd></div><div><dt>Price basis</dt><dd>${p.basis}</dd></div>
      </dl>
      <div class="two-col">
        <div><h3>Included</h3><ul>${p.inc.map(i => `<li>${i}</li>`).join("")}</ul></div>
        <div><h3>Not included</h3><ul>${p.exc.map(i => `<li>${i}</li>`).join("")}</ul></div>
      </div>
      <div><h3>Day by day</h3>
        <div class="timeline"><span class="tl-line"></span>
          ${p.plan.map((d, i) => `<div class="day"><h4>Day ${i + 1}: ${d[0]} <span class="status">Suggested</span></h4>
            <dl><dt>Morning</dt><dd>${d[1] || "Free time"}</dd><dt>Afternoon</dt><dd>${d[2] || "Free time"}</dd><dt>Evening</dt><dd>${d[3] || "Free time"}</dd></dl></div>`).join("")}
        </div></div>
      <p class="notice">Demo itinerary. Travel times, availability and prices are not confirmed. Final details would be shared in writing before any payment.</p>
      <div class="dlg-actions"><button class="btn btn-dark" type="button" data-plan="pkg:${p.id}">Request this package</button><button class="btn btn-line" style="color:var(--charcoal)" type="button" data-close>Close</button></div>
    </div>`);
}

document.addEventListener("click", e => {
  const templeChoice = e.target.closest("[data-plan-temple]");
  if (templeChoice) { prefill(templeChoice.dataset.planTemple); return; }
  const t = e.target.closest("[data-open-temple]"); if (t) { openTemple(t.dataset.openTemple); return; }
  const p = e.target.closest("[data-open-package]"); if (p) { openPackage(p.dataset.openPackage); return; }
  const pl = e.target.closest("[data-plan]"); if (pl) { dlg.open && dlg.close(); prefill(pl.dataset.plan); return; }
  if (e.target.id === "emptyReset") resetFilters();
});

/* ---------- Search panel ---------- */
const sDest = $("#sDest");
sDest.insertAdjacentHTML("beforeend", TEMPLES.map(t => `<option value="${t.id}">${t.name}</option>`).join(""));
$("#sDate").min = new Date().toISOString().slice(0, 10);
$("#searchPanel").addEventListener("submit", e => {
  e.preventDefault();
  const type = $("#sType").value;
  if (sDest.value) { prefill(sDest.value); return; }
  setPkgFilter(type);
  $("#packages").scrollIntoView({ behavior: "smooth" });
  toast(type === "all" ? "Showing all journeys" : "Showing journeys that match your choice");
});
$("#searchBtn").addEventListener("click", () => {
  $("#temples").scrollIntoView({ behavior: "smooth" });
  setTimeout(() => $("#tSearch").focus({ preventScroll: true }), 600);
});

/* ---------- Story art ---------- */
$("#storyArt").innerHTML = tMedia(byId(TEMPLES, "varanasi"));

/* ---------- FAQ ---------- */
$("#faq").innerHTML = FAQS.map(([q, a]) => `<details><summary>${q}</summary><div class="ans">${a}</div></details>`).join("");

/* ---------- Guided enquiry wizard ---------- */
const TRAVEL = [["Train", "Comfortable for long routes"], ["Bus", "Budget-friendly"], ["Flight", "Fastest option"], ["Own vehicle", "Self-drive or hired car"], ["Help me choose", "We suggest the best fit"]];
const STAY = [["Dharamshala", "Simple, close to temples"], ["Budget", "Clean and basic"], ["Standard", "Comfortable mid-range"], ["Premium", "Extra comfort"], ["No stay needed", "Day visit only"]];
const NEEDS = [["Mobility support", ""], ["Wheelchair access", ""], ["Medical facility nearby", ""]];
const radios = (name, list) => list.map(([a, b], i) => `<label class="opt"><input type="radio" name="${name}" value="${a}" ${i === list.length - 1 && name === "travel" ? "checked" : ""}><span>${a}${b ? `<small>${b}</small>` : ""}</span></label>`).join("");
$("#travelOpts").innerHTML = radios("travel", TRAVEL);
$("#stayOpts").innerHTML = radios("stay", STAY);
$("#needOpts").innerHTML = NEEDS.map(([a]) => `<label class="opt"><input type="checkbox" name="need" value="${a}"><span>${a}</span></label>`).join("");

const wDest = $("#wDest");
wDest.insertAdjacentHTML("beforeend",
  `<optgroup label="Temples">${TEMPLES.map(t => `<option value="${t.id}">${t.name}</option>`).join("")}</optgroup>` +
  `<optgroup label="Ready-made routes">${PACKAGES.map(p => `<option value="pkg:${p.id}">${p.title} (${p.days} days)</option>`).join("")}</optgroup>`);

const STEPS = $$(".wz-step"), TOTAL = STEPS.length;
$("#stepper").innerHTML = STEPS.map(() => "<i></i>").join("");
const counts = { adults: 2, children: 0, seniors: 0 };
let step = 1;

function destLabel(v) {
  if (!v) return "";
  if (v.startsWith("pkg:")) return byId(PACKAGES, v.slice(4)).title;
  return byId(TEMPLES, v).name;
}
function showStep(n) {
  step = n;
  STEPS.forEach((s, i) => { s.hidden = i + 1 !== n; });
  $$("#stepper i").forEach((b, i) => { b.className = i + 1 < n ? "done" : i + 1 === n ? "now" : ""; });
  $("#wzBack").style.visibility = n === 1 ? "hidden" : "visible";
  $("#wzNext").textContent = n === TOTAL ? "Send enquiry" : "Continue";
  $("#wzError").textContent = "";
  if (n === TOTAL) renderReview();
  Anim.pop($$("h3, .sub, .field, .counter, .opt, .review", STEPS[n - 1]));
}
function renderReview() {
  const f = new FormData($("#wzForm"));
  const dates = $("#wFlex").checked ? "Flexible" : [$("#wStart").value, $("#wEnd").value].filter(Boolean).join(" to ") || "Not set";
  const needs = f.getAll("need").join(", ") || "None noted";
  const rows = [["Destination", destLabel(wDest.value) || "Not chosen"], ["Dates", dates],
    ["Travellers", `${counts.adults} adults, ${counts.children} children, ${counts.seniors} seniors`],
    ["Travel", f.get("travel") || "Undecided"], ["Stay", f.get("stay") || "Not chosen"], ["Needs", needs], ["Language", $("#wLang").value]];
  $("#review").innerHTML = rows.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join("");
}
function validate(n) {
  if (n === 1 && !wDest.value) return "Choose a destination to continue.";
  if (n === 2 && !$("#wFlex").checked) {
    const s = $("#wStart").value, e = $("#wEnd").value;
    if (!s) return "Pick a start date, or tick that your dates are flexible.";
    if (e && e < s) return "The end date should be on or after the start date.";
  }
  if (n === 3 && counts.adults + counts.seniors < 1) return "Add at least one adult or senior traveller.";
  if (n === 7) {
    if (!$("#wName").value.trim()) return "Enter your name.";
    const c = $("#wContact").value.trim();
    if (!c) return "Enter a phone number or email so we can reply.";
    if (c.includes("@") ? !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c) : c.replace(/\D/g, "").length < 8) return "Enter a valid phone number or email address.";
    if (!$("#wConsent").checked) return "Please tick the consent box to send your enquiry.";
  }
  return "";
}
$("#wzForm").addEventListener("submit", e => {
  e.preventDefault();
  const err = validate(step);
  if (err) { $("#wzError").textContent = err; return; }
  if (step < TOTAL) return showStep(step + 1);
  $("#wzForm").hidden = true; $("#stepper").hidden = true; $("#wzSuccess").hidden = false;
  Anim.pop($$("#wzSuccess > *"));
  toast("Demo enquiry saved. Nothing was sent.");
});
$("#wzBack").addEventListener("click", () => step > 1 && showStep(step - 1));
$("#wzRestart").addEventListener("click", () => {
  $("#wzForm").reset(); counts.adults = 2; counts.children = 0; counts.seniors = 0; syncCounts();
  $("#prefillNote").hidden = true; $("#wzForm").hidden = false; $("#stepper").hidden = false; $("#wzSuccess").hidden = true; showStep(1);
});
function syncCounts() { Object.keys(counts).forEach(k => { $("#o-" + k).textContent = counts[k]; }); }
$$(".counter button").forEach(b => b.addEventListener("click", () => {
  const k = b.dataset.c; counts[k] = Math.max(0, Math.min(20, counts[k] + Number(b.dataset.d))); syncCounts();
}));

function prefill(value) {
  // A temple/package entry point should enter the same guided planner as the
  // main "Plan Your Journey" CTA, with the selected destination already set.
  const label = destLabel(value);
  if (!label) {
    toast("Please choose a valid temple or journey.");
    return;
  }

  // If a previous enquiry reached the success screen, start a fresh enquiry.
  // Otherwise preserve any details the devotee has already entered.
  const startingFresh = $("#wzForm").hidden || (step === 1 && !wDest.value);
  if ($("#wzForm").hidden) $("#wzRestart").click();

  wDest.value = value;
  const note = $("#prefillNote");
  note.hidden = false;
  note.textContent = `Selected destination: ${label}. Continue with your travel details below.`;

  // Carry over the date and traveller range from the homepage search when
  // available, without overwriting details already entered in the wizard.
  const searchDate = $("#sDate").value;
  if (searchDate && !$("#wStart").value) $("#wStart").value = searchDate;

  if (startingFresh) {
    const travellerMinimum = {
      "1 traveller": 1,
      "2 travellers": 2,
      "3 to 4 travellers": 3,
      "5 to 8 travellers": 5,
      "9 or more": 9
    }[$("#sTrav").value];
    if (travellerMinimum) {
      counts.adults = travellerMinimum;
      counts.children = 0;
      counts.seniors = 0;
      syncCounts();
    }
  }

  // Destination is already selected, so continue at the next planning step.
  showStep(2);
  Anim.scrollTo("#plan", { offset: -84, duration: 1.3 });
}
$$("#wDest").forEach(s => s.addEventListener("change", () => { $("#prefillNote").hidden = true; }));

/* ---------- Boot ---------- */
renderFeatured(); renderTemples(true); renderPackages(); showStep(1);
Anim.reveal(); Anim.scrollFx();
if (!introCtl) startSite();
$("#year") && ($("#year").textContent = new Date().getFullYear());

window.addEventListener("load", () => {
  if (typeof ScrollTrigger !== "undefined") ScrollTrigger.refresh();
}, { once: true });
