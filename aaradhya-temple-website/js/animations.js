/* Aaradhya motion system.
   Adapted from the supplied Selene project: Lenis advances in one RAF loop,
   scroll-linked visuals subscribe to that loop, and content reveals use a
   per-element IntersectionObserver with simple opacity + translate only. */
const Anim = (() => {
  const hasGsap = typeof gsap !== "undefined";
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const on = hasGsap && !reduce;
  if (hasGsap && typeof ScrollTrigger !== "undefined") gsap.registerPlugin(ScrollTrigger);

  let lenis = null;
  let rafId = 0;
  let revealMutationObserver = null;
  const frameSubscribers = new Set();
  const revealNodes = new Map();
  let revealDirty = true;

  function dispatchFrame(time = performance.now()) {
    frameSubscribers.forEach(fn => fn(time));
  }

  // Selene's one-loop model: Lenis advances first, then each subscribed
  // scroll scene reads geometry and writes directly to its own DOM nodes.
  function frameLoop(time) {
    if (lenis) lenis.raf(time);
    dispatchFrame(time);
    rafId = requestAnimationFrame(frameLoop);
  }

  function ensureFrameLoop() {
    if (!reduce && !rafId) rafId = requestAnimationFrame(frameLoop);
  }

  function onFrame(fn) {
    frameSubscribers.add(fn);
    if (reduce) {
      const nativeTick = () => fn(performance.now());
      window.addEventListener("scroll", nativeTick, { passive: true });
      return () => {
        frameSubscribers.delete(fn);
        window.removeEventListener("scroll", nativeTick);
      };
    }
    ensureFrameLoop();
    return () => frameSubscribers.delete(fn);
  }

  function initSmoothScroll() {
    if (reduce) return null;
    if (lenis) {
      ensureFrameLoop();
      return lenis;
    }

    const LenisCtor = window.Lenis || (typeof Lenis !== "undefined" ? Lenis : null);
    if (LenisCtor) {
      lenis = new LenisCtor({
        lerp: 0.09,
        smoothWheel: true,
        wheelMultiplier: 0.9
      });
      window.__aaradhyaLenis = lenis;

      if (typeof ScrollTrigger !== "undefined") {
        lenis.on("scroll", ScrollTrigger.update);
      }

      // Keep in-page navigation on the same Lenis motion curve.
      document.addEventListener("click", event => {
        const link = event.target.closest('a[href^="#"]');
        if (!link || link.hasAttribute("data-native-scroll")) return;
        const hash = link.getAttribute("href");
        if (!hash || hash === "#") return;
        let target;
        try { target = document.querySelector(hash); } catch (_) { return; }
        if (!target) return;
        event.preventDefault();
        lenis.scrollTo(target, { offset: -84, duration: 1.45 });
        try { history.replaceState(null, "", hash); } catch (_) {}
      });
    } else {
      // CDN fallback: native scrolling remains smooth and the same frame
      // subscribers still run, so reveals/parallax do not disappear.
      document.documentElement.classList.add("native-smooth-scroll");
    }

    // Selene's single RAF loop always runs: Lenis first, then subscribers.
    ensureFrameLoop();
    return lenis;
  }

  function scrollTo(target, options = {}) {
    const resolvedTarget = typeof target === "string" ? document.querySelector(target) : target;
    if (lenis) {
      lenis.scrollTo(resolvedTarget, { offset: -84, duration: 1.25, ...options });
      return;
    }
    if (typeof target === "number") {
      window.scrollTo({ top: target, behavior: reduce ? "auto" : "smooth" });
      return;
    }
    const element = resolvedTarget;
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY - (options.offset ?? 84);
      window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
    }
  }

  function setScrollStopped(stopped) {
    if (!lenis) return;
    if (stopped) lenis.stop(); else lenis.start();
  }

  function intro(onDone) {
    const overlay = document.getElementById("intro");
    const flower = document.getElementById("introLotusAnimation");
    const word = document.getElementById("introWord");
    const tag = document.getElementById("introTag");
    const actions = document.getElementById("introActions");
    const chars = word ? [...word.querySelectorAll(".intro-char")] : [];

    let closed = false;
    let playbackStarted = false;
    let brandRevealed = false;
    let revealTimeline = null;
    let loadFallback = 0;
    let endFallback = 0;

    const finish = () => {
      if (flower && typeof flower.pause === "function") flower.pause();
      window.clearTimeout(loadFallback);
      window.clearTimeout(endFallback);
      overlay.style.display = "none";
      document.body.classList.remove("is-intro");
      onDone && onDone();
    };

    const revealBrand = () => {
      if (closed || brandRevealed) return;
      brandRevealed = true;
      if (!on) {
        chars.forEach(char => {
          char.style.opacity = "1";
          char.style.transform = "none";
        });
        if (tag) { tag.style.opacity = "1"; tag.style.transform = "none"; }
        if (actions) { actions.style.opacity = "1"; actions.style.transform = "none"; }
        return;
      }

      revealTimeline = gsap.timeline({ defaults: { ease: "power3.out" } });
      if (chars.length) {
        revealTimeline.to(chars, {
          opacity: 1,
          y: 0,
          duration: 0.72,
          stagger: { each: 0.085, from: "center" }
        }, 0);
      } else if (word) {
        revealTimeline.fromTo(word, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.72 }, 0);
      }
      if (tag) revealTimeline.fromTo(tag, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.48 }, 0.42);
      if (actions) revealTimeline.fromTo(actions, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.48 }, 0.62);
    };

    // Reduced-motion users get a clean static poster. Otherwise the isolated
    // lotus clip plays even if GSAP's CDN is unavailable.
    if (reduce || !flower || flower.tagName !== "VIDEO") {
      overlay.classList.add("intro-static");
      if (flower && typeof flower.pause === "function") flower.pause();
      revealBrand();
      return {
        out: () => on
          ? gsap.to(overlay, { yPercent: -100, opacity: 0, duration: 0.55, ease: "power3.inOut", onComplete: finish })
          : finish()
      };
    }

    if (on) {
      gsap.set("#introBloom", { opacity: 1, scale: 1 });
      gsap.set(flower, { opacity: 1, scale: 1, x: 0, y: 0, transformOrigin: "50% 50%" });
      if (chars.length) gsap.set(chars, { opacity: 0, y: 22, scale: 1, clearProps: "filter" });
      else if (word) gsap.set(word, { opacity: 0, y: 18 });
      if (tag) gsap.set(tag, { opacity: 0, y: 12 });
      if (actions) gsap.set(actions, { opacity: 0, y: 12 });
    }

    // This is the actual flower motion isolated from the video you supplied.
    // We let the clip play at its original pace and reveal the name only after
    // the final full bloom, rather than layering a second flower animation on it.
    flower.addEventListener("ended", revealBrand, { once: true });

    const posterFallback = () => {
      if (closed || brandRevealed) return;
      overlay.classList.add("intro-static");
      if (flower && typeof flower.pause === "function") flower.pause();
      window.clearTimeout(loadFallback);
      revealBrand();
    };

    const beginPlayback = () => {
      if (playbackStarted || closed) return;
      playbackStarted = true;
      try { flower.currentTime = 0; } catch (_) {}
      const playResult = flower.play();
      if (playResult && typeof playResult.then === "function") {
        playResult.catch(posterFallback);
      }
      // Safety net for browsers that fail to dispatch `ended` after decoding.
      endFallback = window.setTimeout(() => {
        if (!brandRevealed && !closed) revealBrand();
      }, 7200);
    };

    flower.addEventListener("canplay", beginPlayback, { once: true });
    flower.addEventListener("error", posterFallback, { once: true });
    flower.load();
    if (flower.readyState >= 3) beginPlayback();
    loadFallback = window.setTimeout(() => {
      if (!playbackStarted && !closed) posterFallback();
    }, 9000);

    return {
      out() {
        closed = true;
        window.clearTimeout(loadFallback);
        window.clearTimeout(endFallback);
        if (flower && typeof flower.pause === "function") flower.pause();
        if (revealTimeline) revealTimeline.kill();
        if (on) {
          gsap.to(overlay, {
            yPercent: -100,
            opacity: 0,
            duration: 0.72,
            ease: "power3.inOut",
            onComplete: finish
          });
        } else {
          finish();
        }
      }
    };
  }

  function heroIn() {
    if (!on) return;
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.from(".hero-photo", { scale: 1.035, opacity: 0, duration: 1.25, ease: "power2.out" }, 0)
      .from(".hero-rule", { scaleX: 0, transformOrigin: "left", duration: 0.72 }, 0.12)
      .from("#heroTitle .w i", { yPercent: 48, opacity: 0, duration: 0.78, stagger: 0.065 }, 0.2)
      .from(".hero-fade", { y: 15, opacity: 0, duration: 0.68, stagger: 0.09 }, 0.5)
      .from(".float-chip", { y: 10, opacity: 0, duration: 0.62, stagger: 0.11 }, 0.78)
      .from(".search-panel", { y: 22, opacity: 0, duration: 0.72 }, 1.0);
  }

  // Selene's reveal model adapted to this static site:
  // - dynamic elements are registered once
  // - one Lenis RAF loop measures their viewport progress
  // - only the elements move; section shells never transform
  // - no blur, filters, or opacity fades on whole panels
  function reveal(root = document) {
    const register = (el, order = 0) => {
      if (!el || el.hidden || el.dataset.scrollReveal === "1") return;
      el.dataset.scrollReveal = "1";
      const group = el.parentElement?.closest("[data-stagger]");
      const staggerIndex = group ? [...group.children].indexOf(el) : order;
      el.dataset.scrollOrder = String(Math.max(0, staggerIndex));
      el.style.filter = "none";
      el.style.willChange = "opacity, transform";
      if (reduce) {
        el.style.opacity = "1";
        el.style.transform = "none";
        return;
      }
      el.style.opacity = "0";
      el.style.transform = "translate3d(0, 26px, 0)";
      revealNodes.set(el, Math.max(0, staggerIndex));
      revealDirty = true;
    };

    const collect = node => {
      if (!node) return;
      if (node.nodeType === 9) {
        node.querySelectorAll("[data-reveal]").forEach(el => register(el, 0));
        node.querySelectorAll("[data-stagger]").forEach(group => {
          [...group.children].forEach((child, index) => register(child, index));
        });
        return;
      }
      if (node.nodeType !== 1) return;
      if (node.matches("[data-reveal]")) register(node, 0);
      if (node.matches("[data-stagger]")) {
        [...node.children].forEach((child, index) => register(child, index));
      }
      node.querySelectorAll?.("[data-reveal]").forEach(el => register(el, 0));
      node.querySelectorAll?.("[data-stagger]").forEach(group => {
        [...group.children].forEach((child, index) => register(child, index));
      });
      const parentGroup = node.parentElement?.closest("[data-stagger]");
      if (parentGroup && node.parentElement === parentGroup) {
        register(node, [...parentGroup.children].indexOf(node));
      }
    };

    collect(root);
    if (reduce) return;

    // Hide only registered content elements. If JS fails before registration,
    // the page remains readable because this class is never applied.
    document.documentElement.classList.add("js-motion-ready");

    if (!revealMutationObserver) {
      revealMutationObserver = new MutationObserver(records => {
        records.forEach(record => record.addedNodes.forEach(node => {
          if (node.nodeType === 1) collect(node);
        }));
      });
      [document.querySelector("#main"), document.querySelector(".footer")]
        .filter(Boolean)
        .forEach(el => revealMutationObserver.observe(el, { childList: true, subtree: true }));
    }
  }

  function scrollFx() {
    const artwork = document.querySelector("#scrollArtwork img");
    let lastScroll = -1;
    let lastHeight = -1;
    let lastWidth = -1;

    // This is the Selene-style frame subscriber: Lenis advances first in the
    // shared RAF loop, then the artwork and individual content elements read
    // their own rects and receive direct transform/opacity updates.
    onFrame(() => {
      const y = lenis ? lenis.animatedScroll : window.scrollY;
      const vh = window.innerHeight;
      const vw = window.innerWidth;
      const moved = Math.abs(y - lastScroll) > 0.2 || vh !== lastHeight || vw !== lastWidth || revealDirty;
      if (!moved) return;
      lastScroll = y;
      lastHeight = vh;
      lastWidth = vw;
      revealDirty = false;

      if (artwork) {
        const maxScroll = Math.max(1, document.documentElement.scrollHeight - vh);
        const pageProgress = Math.max(0, Math.min(1, y / maxScroll));
        artwork.style.transform =
          `translate3d(0, ${pageProgress * 1.35}%, 0) scale(${1.035 + pageProgress * 0.025})`;
      }

      if (reduce) return;

      revealNodes.forEach((order, el) => {
        if (!el.isConnected) {
          revealNodes.delete(el);
          return;
        }
        const rect = el.getBoundingClientRect();
        const staggerOffset = Math.min(order, 5) * vh * 0.026;
        const start = vh * 0.93 - staggerOffset;
        const end = vh * 0.66 - staggerOffset;
        const raw = Math.max(0, Math.min(1, (start - rect.top) / Math.max(1, start - end)));
        const progress = 1 - Math.pow(1 - raw, 3);
        if (progress >= 0.999) {
          // Release inline transforms after arrival so card hover states work.
          el.classList.add("is-in");
          el.style.opacity = "";
          el.style.transform = "";
          return;
        }
        el.classList.remove("is-in");
        const lift = (1 - progress) * 26;
        const side = order % 2 === 0 ? -1 : 1;
        const drift = (1 - progress) * side * 7;

        // Crisp floating entrance: no filter blur, no scaling, no parent slide.
        el.style.opacity = progress.toFixed(3);
        el.style.transform = `translate3d(${drift.toFixed(1)}px, ${lift.toFixed(1)}px, 0)`;
      });
    });

    if (on && typeof ScrollTrigger !== "undefined") {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 921px)", () => {
        gsap.to("#howFill", {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { trigger: "#howSteps", start: "top 75%", end: "bottom 70%", scrub: true }
        });
      });
      mm.add("(max-width: 920px)", () => {
        gsap.to("#howFill", {
          scaleY: 1,
          ease: "none",
          scrollTrigger: { trigger: "#howSteps", start: "top 75%", end: "bottom 70%", scrub: true }
        });
      });
      gsap.to("#storyArt .media", {
        yPercent: -3,
        ease: "none",
        scrollTrigger: { trigger: "#story", start: "top bottom", end: "bottom top", scrub: true }
      });
    }
  }

  function dialogIn(dlg) {
    if (!on) return;
    const panel = dlg.querySelector(".dlg") || dlg;
    gsap.fromTo(panel, { y: 20, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.42, ease: "power3.out", clearProps: "transform"
    });
    const days = dlg.querySelectorAll(".day");
    if (days.length) {
      gsap.from(days, { x: 18, opacity: 0, stagger: 0.1, duration: 0.52, delay: 0.18, ease: "power3.out" });
    }
  }

  function pop(els) {
    if (!on || !els.length) return;
    gsap.from(els, { y: 18, opacity: 0, stagger: 0.055, duration: 0.48, ease: "power3.out", clearProps: "transform,opacity" });
  }

  return { on, intro, heroIn, reveal, scrollFx, dialogIn, pop, initSmoothScroll, scrollTo, setScrollStopped };
})();
