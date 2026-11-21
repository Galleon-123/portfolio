'use strict';
const year = document.getElementById('year');
if (year) year.textContent = new Intl.DateTimeFormat('en', { timeZone: 'Asia/Kolkata', year: 'numeric' }).format(new Date());
document.getElementById('print-resume')?.addEventListener('click', () => window.print());

// Local-only portfolio guide. Responses are intentionally limited to verified résumé details.
const chatLaunch = document.getElementById('resume-chat-launch');
const chatPanel = document.getElementById('resume-chat-panel');
const chatClose = document.querySelector('.resume-chat-close');
const chatForm = document.getElementById('resume-chat-form');
const chatInput = document.getElementById('resume-chat-input');
const chatMessages = document.getElementById('resume-chat-messages');
if (chatLaunch && chatPanel && chatForm && chatInput && chatMessages) {
  const answers = [
    { test: /(^|\s)(name|who are you|who is ragul)(\s|$)/i, answer: 'The portfolio belongs to Ragul Kumar E, a B.Tech Information Technology student.' },
    { test: /linkedin/i, answer: 'LinkedIn: https://www.linkedin.com/in/ragul-kumar-e-galleongt/' },
    { test: /github|source code|repository/i, answer: 'GitHub: https://github.com/Galleon-123 — Portfolio source: https://github.com/Galleon-123/portfolio' },
    { test: /hackerrank/i, answer: 'HackerRank: https://www.hackerrank.com/profile/ragulkumare2007' },
    { test: /coursera/i, answer: 'Coursera profile: https://www.coursera.org/user/92a729aaba78f5ec50fa6c3c2610d7a1' },
    { test: /credly/i, answer: 'Credly: https://www.credly.com/users/ragul-kumar-e' },
    { test: /study|college|education|pursu|degree/i, answer: 'Ragul is pursuing B.Tech Information Technology at Sri Krishna College of Engineering and Technology, Coimbatore (2025–2029).' },
    { test: /skill|technology|programming|language/i, answer: 'Skills and foundations include C, C++, Java, Python, HTML, CSS, JavaScript, SQL, PostgreSQL, MySQL, data structures, algorithms, OOP, DBMS, operating systems, computer networks, Linux, and AI tools.' },
    { test: /project|uniserv|web os/i, answer: 'Projects: UniServ, where Ragul developed the workers’ application for a platform connecting workers with people nearby; and Web OS, an ongoing lightweight server-hosted computer environment for multi-device access.' },
    { test: /certificate|credential|course|machine learning|google ai/i, answer: 'Selected credentials include Python for Machine Learning training (98% exam score), Google AI Professional Certificate, Google AI Essentials, and Crash Course on Python. Open the Credentials section to view verification links.' },
    { test: /location|where.*live|sathyamangalam/i, answer: 'Ragul is based in Sathyamangalam, Tamil Nadu, India.' },
    { test: /resume|cv/i, answer: 'You can open the complete résumé from the “View résumé” button at the top of this portfolio.' }
  ];
  const addMessage = (text, type) => {
    const message = document.createElement('p');
    message.className = `resume-chat-message resume-chat-message--${type}`;
    message.textContent = text;
    chatMessages.append(message);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  };
  const openChat = () => { chatPanel.hidden = false; chatLaunch.setAttribute('aria-expanded', 'true'); chatInput.focus(); };
  const closeChat = () => { chatPanel.hidden = true; chatLaunch.setAttribute('aria-expanded', 'false'); chatLaunch.focus(); };
  chatLaunch.addEventListener('click', () => chatPanel.hidden ? openChat() : closeChat());
  chatClose?.addEventListener('click', closeChat);
  document.querySelectorAll('[data-chat-prompt]').forEach(button => button.addEventListener('click', () => { chatInput.value = button.dataset.chatPrompt; chatForm.requestSubmit(); }));
  chatForm.addEventListener('submit', event => {
    event.preventDefault();
    const question = chatInput.value.trim();
    if (!question) return;
    addMessage(question, 'user');
    const match = answers.find(item => item.test.test(question));
    addMessage(match?.answer || 'I can help with Ragul’s name, education, skills, projects, credentials, location, résumé, and LinkedIn, GitHub, HackerRank, Coursera, or Credly links.', 'bot');
    chatInput.value = '';
  });
}

const story = document.getElementById('story');
if (story) {
  const systemMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const motionButtons = [...document.querySelectorAll('[data-motion-toggle]')];
  let preference = null;
  try {
    const saved = localStorage.getItem('ragul-animation-preference');
    if (saved === 'paused' || saved === 'playing') preference = saved;
    else if (localStorage.getItem('ragul-reduce-motion') === 'true') preference = 'paused';
  } catch { /* Storage is optional. */ }
  let reduced = preference === 'paused' || (preference === null && systemMotion.matches);
  const ambient = createAmbientScene(document.querySelector('.hero'), document.querySelector('.hero-particles'));
  const reveals = document.querySelectorAll('.reveal');
  let revealObserver;
  if ('IntersectionObserver' in window) {
    revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); revealObserver.unobserve(entry.target); } });
    }, { threshold: 0.08, rootMargin: '0px 0px -22px 0px' });
    reveals.forEach(element => revealObserver.observe(element));
    const loopObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => entry.target.classList.toggle('is-in-view', entry.isIntersecting));
    }, { threshold: 0 });
    document.querySelectorAll('.project-card, .contact-card').forEach(element => loopObserver.observe(element));
  }
  function syncMotion() {
    document.documentElement.classList.toggle('reduce-motion', reduced);
    document.documentElement.classList.toggle('motion-enabled', !reduced);
    document.documentElement.classList.toggle('scroll-enhanced', !reduced && !!revealObserver);
    motionButtons.forEach(button => {
      button.hidden = false;
      button.setAttribute('aria-pressed', String(reduced));
      button.textContent = reduced ? 'Resume animations' : 'Pause animations';
    });
    if (reduced) {
      reveals.forEach(element => element.classList.add('is-visible'));
      document.documentElement.classList.add('intro-complete');
    }
    ambient.setPlaying(!reduced);
  }
  motionButtons.forEach(button => button.addEventListener('click', () => {
    reduced = !reduced;
    preference = reduced ? 'paused' : 'playing';
    try {
      localStorage.setItem('ragul-animation-preference', preference);
      localStorage.setItem('ragul-reduce-motion', String(reduced));
    } catch { /* Storage is optional. */ }
    syncMotion();
  }));
  systemMotion.addEventListener('change', event => {
    if (preference === null) { reduced = event.matches; syncMotion(); }
  });
  syncMotion();
  document.querySelector('.hero-details')?.addEventListener('animationend', () => {
    document.documentElement.classList.add('intro-complete');
  }, { once: true });

  const chapters = [...document.querySelectorAll('[data-step]')];
  const markers = [...story.querySelectorAll('.chapter-marker')];
  const routeSvg = document.querySelector('.story-path');
  const track = document.getElementById('route-track');
  const glow = document.getElementById('route-glow');
  const spectrum = document.getElementById('journey-spectrum');
  const spectrumStops = [...spectrum.querySelectorAll('stop')];
  const navCursor = document.getElementById('nav-flow-cursor');
  const flowColors = [[255,80,111], [73,146,255], [97,224,255], [166,143,255], [255,111,176]];
  let flowAnchors = [];
  let currentSection = '';
  let currentColor = '';
  const fill = document.getElementById('route-progress');
  const dot = document.getElementById('route-dot');
  const progress = document.getElementById('reading-progress');
  const navLinks = [...document.querySelectorAll('[data-nav]')];
  let pathLength = 0, routeStart = 0, routeHeight = 1, pageHeight = 1, scheduled = false;
  function measureRoute() {
    const rect = story.getBoundingClientRect();
    routeStart = rect.top + scrollY;
    routeHeight = story.offsetHeight;
    pageHeight = Math.max(1, document.documentElement.scrollHeight - innerHeight);
    const anchors = markers.map(marker => marker.getBoundingClientRect().top - rect.top + marker.offsetHeight / 2);
    let d = 'M28 0';
    let previous = 0;
    anchors.forEach(y => {
      const half = (previous + y) / 2;
      const bend = Math.min(40, (y - previous) * .17);
      d += ` C28 ${half - bend} 47 ${half - bend} 47 ${half} C47 ${half + bend} 28 ${half + bend} 28 ${y}`;
      previous = y;
    });
    d += ` L28 ${routeHeight - 20}`;
    routeSvg.setAttribute('viewBox', `0 0 56 ${routeHeight}`);
    track.setAttribute('d', d); fill.setAttribute('d', d); glow.setAttribute('d', d);
    spectrum.setAttribute('y2', String(routeHeight));
    const positions = [0, anchors[0] / routeHeight, (anchors[0] + anchors[1]) / (2 * routeHeight), anchors[1] / routeHeight, (anchors[1] + anchors[2]) / (2 * routeHeight), anchors[2] / routeHeight, anchors[3] / routeHeight, 1];
    spectrumStops.forEach((stop, index) => stop.setAttribute('offset', String(positions[index])));
    const activation = Math.min(innerHeight * .4, 260);
    flowAnchors = chapters.map(chapter => chapter.getBoundingClientRect().top + scrollY - activation);
    pathLength = fill.getTotalLength();
    updateScroll();
  }
  function updateScroll() {
    scheduled = false;
    const top = scrollY;
    if (progress) progress.value = Math.max(0, Math.min(1, top / pageHeight));
    const fraction = Math.max(0, Math.min(1, (top + innerHeight * .48 - routeStart) / routeHeight));
    fill.setAttribute('stroke-dashoffset', String(1 - fraction));
    glow.setAttribute('stroke-dashoffset', String(1 - fraction));
    if (pathLength) {
      const point = fill.getPointAtLength(pathLength * fraction);
      dot.setAttribute('cx', point.x); dot.setAttribute('cy', point.y);
    }
    let active = chapters[0];
    for (const chapter of chapters) if (chapter.getBoundingClientRect().top <= Math.min(innerHeight * .4, 260)) active = chapter;
    if (top + innerHeight >= document.documentElement.scrollHeight - 4) active = chapters[chapters.length - 1];
    const paletteIndex = Math.max(0, chapters.indexOf(active));
    const nextIndex = Math.min(flowColors.length - 1, paletteIndex + 1);
    const distance = Math.max(1, (flowAnchors[nextIndex] || 0) - (flowAnchors[paletteIndex] || 0));
    const blend = nextIndex === paletteIndex ? 0 : Math.max(0, Math.min(1, (top - flowAnchors[paletteIndex]) / distance));
    const weight = blend * blend * (3 - 2 * blend);
    const rgb = flowColors[paletteIndex].map((channel, index) => Math.round(channel + (flowColors[nextIndex][index] - channel) * weight));
    const color = `rgb(${rgb.join(', ')})`;
    if (color !== currentColor) {
      document.documentElement.style.setProperty('--flow-color', color);
      document.documentElement.style.setProperty('--scene-hue', `${Math.round(top / pageHeight * 100)}deg`);
      currentColor = color;
    }
    navLinks.forEach(link => {
      const current = link.dataset.nav === active.id;
      if (current) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current');
    });
    const activeLink = navLinks.find(link => link.dataset.nav === active.id);
    if (activeLink && navCursor) {
      navCursor.style.setProperty('--cursor-x', `${activeLink.offsetLeft}px`);
      navCursor.style.setProperty('--cursor-width', `${activeLink.offsetWidth}px`);
      document.documentElement.classList.add('flow-ready');
    }
    if (currentSection !== active.id) {
      document.documentElement.dataset.flowSection = active.id;
      currentSection = active.id;
    }
    story.querySelectorAll('.chapter').forEach(chapter => {
      chapter.classList.toggle('is-reached', chapter.getBoundingClientRect().top < innerHeight * .65);
    });
  }
  addEventListener('scroll', () => { if (!scheduled) { scheduled = true; requestAnimationFrame(updateScroll); } }, { passive: true });
  addEventListener('resize', measureRoute, { passive: true });
  new ResizeObserver(measureRoute).observe(story);
  document.fonts?.ready.then(measureRoute);
  document.querySelectorAll('a[href^="#"]').forEach(link => link.addEventListener('click', event => {
    const target = document.getElementById(link.hash.slice(1));
    if (!target || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    target.querySelectorAll('.reveal').forEach(element => element.classList.add('is-visible'));
  }));
  addEventListener('focusin', event => event.target.closest('.reveal')?.classList.add('is-visible'));
  measureRoute();
}


// Low-density ambient particles. The loop runs only while the hero is visible.
function createAmbientScene(hero, canvas) {
  const ctx = canvas?.getContext('2d', { alpha: true });
  if (!hero || !ctx) return { setPlaying() {} };
  const video = hero.querySelector('.hero-video');
  const videoPlayButton = hero.querySelector('.hero-video-play');
  if (video) video.muted = true;
  video?.addEventListener('playing', () => {
    hero.classList.add('video-ready');
    if (videoPlayButton) videoPlayButton.hidden = true;
  });
  let width = 0, height = 0, frame = 0, previous = 0, elapsed = 0;
  let playing = false, inView = true;
  const mobileVideo = matchMedia('(max-width: 600px)');
  function selectVideoSource() {
    if (!video) return;
    const source = mobileVideo.matches ? video.dataset.mobileSrc : video.dataset.desktopSrc;
    if (video.getAttribute('src') === source) return;
    video.pause();
    video.setAttribute('src', source);
    video.poster = mobileVideo.matches ? 'assets/katana-mobile.webp' : 'assets/katana-hero.webp';
    video.load();
    hero.classList.remove('video-ready');
    if (playing && inView && !document.hidden) tryVideoPlayback();
  }
  mobileVideo.addEventListener('change', selectVideoSource);
  selectVideoSource();
  function tryVideoPlayback() {
    if (!video || !video.paused) return;
    const attempt = video.play();
    attempt?.catch(() => {
      hero.classList.remove('video-ready');
      if (videoPlayButton && playing && inView && !document.hidden) videoPlayButton.hidden = false;
    });
  }
  videoPlayButton?.addEventListener('click', () => {
    videoPlayButton.hidden = true;
    tryVideoPlayback();
  });
  const particles = Array.from({ length: matchMedia('(max-width: 600px)').matches ? 24 : 46 }, (_, i) => ({
    x: ((i * 73 + 29) % 997) / 997,
    y: ((i * 137 + 83) % 991) / 991,
    radius: i % 9 === 0 ? 1.8 : .65 + (i % 3) * .25,
    speed: 5 + (i % 7) * 1.7,
    phase: i * 1.8,
    hue: (i * 47) % 360,
    fire: i % 3 === 0
  }));
  function paint(dt = 0) {
    if (!width || !height) return;
    elapsed += dt;
    ctx.clearRect(0, 0, width, height);
    particles.forEach(particle => {
      particle.y -= particle.speed * dt / height;
      if (particle.y < -.02) particle.y = 1.02;
      const x = (particle.x * width + Math.sin(elapsed * .3 + particle.phase) * 11 + width) % width;
      const y = particle.y * height;
      const alpha = .16 + (.5 + .5 * Math.sin(elapsed * .65 + particle.phase)) * .34;
      ctx.beginPath();
      ctx.arc(x, y, particle.radius, 0, Math.PI * 2);
      const hue = particle.fire ? 4 + (particle.hue % 20) : 205 + (particle.hue % 27);
      ctx.fillStyle = `hsla(${hue}, 95%, 70%, ${alpha * (x < width * .38 ? .22 : 1)})`;
      if (particle.radius > 1.5) { ctx.shadowColor = `hsl(${hue}, 95%, 65%)`; ctx.shadowBlur = 10; }
      ctx.fill();
      ctx.shadowBlur = 0;
    });
  }
  function tick(time) {
    frame = 0;
    if (!playing || !inView || document.hidden) return;
    if (!previous) previous = time;
    if (time - previous >= 33) {
      paint(Math.min(.06, (time - previous) / 1000));
      previous = time;
    }
    frame = requestAnimationFrame(tick);
  }
  function sync() {
    const visible = inView && !document.hidden;
    hero.classList.toggle('ambient-visible', visible);
    document.documentElement.classList.toggle('page-hidden', document.hidden);
    if (video) {
      if (playing && visible) tryVideoPlayback();
      else {
        video.pause();
        if (videoPlayButton) videoPlayButton.hidden = true;
      }
    }
    if (playing && visible) {
      if (!frame) { previous = 0; frame = requestAnimationFrame(tick); }
    } else {
      cancelAnimationFrame(frame); frame = 0; previous = 0;
    }
  }
  function resize() {
    const rect = hero.getBoundingClientRect();
    width = rect.width; height = rect.height;
    const dpr = Math.min(devicePixelRatio || 1, 1.5);
    canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    paint();
  }
  if ('ResizeObserver' in window) new ResizeObserver(resize).observe(hero);
  else addEventListener('resize', resize, { passive: true });
  if ('IntersectionObserver' in window) new IntersectionObserver(entries => {
    inView = entries[0].isIntersecting; sync();
  }, { rootMargin: '-90px 0px 0px 0px', threshold: 0 }).observe(hero);
  document.addEventListener('visibilitychange', sync);
  resize(); sync();
  return { setPlaying(value) { playing = value; sync(); } };
}
