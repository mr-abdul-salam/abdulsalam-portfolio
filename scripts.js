document.addEventListener('DOMContentLoaded', function(){
  // set year
  document.getElementById('year').textContent = new Date().getFullYear();

  // mobile nav toggle
  const btn = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  btn && btn.addEventListener('click', ()=>{
    nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
    nav.style.flexDirection = 'column';
    nav.style.background = 'rgba(0,0,0,0.35)';
    nav.style.position = 'absolute';
    nav.style.right = '1rem';
    nav.style.top = '64px';
    nav.style.padding = '0.6rem';
    nav.style.borderRadius = '8px';
  });

  // sample blog posts (replace with real posts or fetch from API)
  const posts = [
    {
      id:1,
      title:'How I built an Italy visa appointment bot (notes)',
      date:'2025-07-10',
      excerpt:'Prototype bot using Python + Selenium: closes popups and auto-fills forms. Still improving CAPTCHA solution and stable login flow.'
    },
    {
      id:2,
      title:'Top 5 Excel tricks for fast reporting',
      date:'2025-05-22',
      excerpt:'Pivot tricks, INDEX/MATCH combos, dynamic tables, and macros that saved hours in monthly reports.'
    }
  ];

  const postsWrap = document.getElementById('posts');
  posts.forEach(p=>{
    const el = document.createElement('article');
    el.className = 'post';
    el.innerHTML = `<h3>${p.title}</h3><small>${p.date}</small><p>${p.excerpt}</p><a class="btn" href="#">Read more</a>`;
    postsWrap && postsWrap.appendChild(el);
  });

  // contact form: open user's email client via mailto if server endpoint not provided
  const form = document.getElementById('contactForm');
  form && form.addEventListener('submit', function(e){
    e.preventDefault();
    const data = new FormData(form);
    const name = data.get('name');
    const email = data.get('email');
    const message = data.get('message');
    const subject = encodeURIComponent(`Website message from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:as1745722@gmail.com?subject=${subject}&body=${body}`;
  });
});
// Formspree AJAX submit (replace mailto fallback)
document.addEventListener('DOMContentLoaded', function(){
  // ... existing code above ...

  const form = document.getElementById('contactForm');
  if (form && form.action.includes('formspree.io')) {
    form.addEventListener('submit', async function(e){
      e.preventDefault();
      const data = new FormData(form);
      const endpoint = form.action;
      try {
        const resp = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Accept': 'application/json' },
          body: data
        });
        if (resp.ok) {
          alert('Message sent — thank you! I will reply soon.');
          form.reset();
        } else {
          const result = await resp.json();
          throw new Error(result.error || 'Submission failed');
        }
      } catch (err) {
        alert('Could not send message (try mailto or email directly): as1745722@gmail.com');
        console.error(err);
      }
    });
  }
});
// ---------- Robust Testimonials slider (replace previous slider code) ----------
(function(){
  const slider = document.querySelector('.test-slider');
  if (!slider) return;

  const items = Array.from(slider.querySelectorAll('.testimonial'));
  const prevBtn = document.querySelector('.test-nav.prev');
  const nextBtn = document.querySelector('.test-nav.next');
  const dotsWrap = document.querySelector('.test-dots');

  let index = 0;
  let timer = null;
  const interval = 4000; // 4s

  // create dots if missing
  if (dotsWrap && dotsWrap.children.length === 0) {
    items.forEach((_, i) => {
      const d = document.createElement('button');
      d.className = 'test-dot';
      d.setAttribute('aria-label', 'Go to review ' + (i + 1));
      d.addEventListener('click', () => show(i, true));
      dotsWrap.appendChild(d);
    });
  }

  const dots = dotsWrap ? Array.from(dotsWrap.children) : [];

  function show(i, manual = false) {
    if (i < 0) i = items.length - 1;
    if (i >= items.length) i = 0;
    items.forEach((it, idx) => {
      if (idx === i) {
        it.classList.add('active');
        it.style.display = 'block';
        // small delay to allow CSS fade via opacity (if present)
        requestAnimationFrame(() => it.style.opacity = '1');
      } else {
        it.classList.remove('active');
        it.style.opacity = '0';
        // hide after transition time to avoid stacking in document flow
        setTimeout(() => { if (!it.classList.contains('active')) it.style.display = 'none'; }, 380);
      }
    });

    dots.forEach((dt, idx) => dt.classList.toggle('active', idx === i));
    index = i;
    if (manual) resetTimer();
  }

  function next() { show((index + 1) % items.length); }
  function prev() { show((index - 1 + items.length) % items.length); }

  if (nextBtn) nextBtn.addEventListener('click', () => { next(); resetTimer(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { prev(); resetTimer(); });

  function resetTimer() {
    if (timer) clearInterval(timer);
    timer = setInterval(next, interval);
  }

  // initial layout: hide all then show first
  items.forEach(it => { it.style.display = 'none'; it.style.opacity = '0'; });
  show(0);
  resetTimer();

  // pause autoplay on hover
  slider.addEventListener('mouseenter', () => clearInterval(timer));
  slider.addEventListener('mouseleave', () => resetTimer());

})();
// ----------------- Safe init for existing res-slider (if present) -----------------
document.addEventListener('DOMContentLoaded', function () {
  (function(){
    const wrap = document.querySelector('.res-slider');
    if (!wrap) return; // if the old slider is not present, skip
    const slides = Array.from(wrap.querySelectorAll('.res-slide'));
    const prevBtn = document.querySelector('.res-nav.prev');
    const nextBtn = document.querySelector('.res-nav.next');
    const dotsWrap = document.querySelector('.res-dots');

    let idx = 0;
    if (dotsWrap && dotsWrap.children.length === 0) {
      slides.forEach((_,i)=>{
        const d = document.createElement('button');
        d.className = 'res-dot';
        d.addEventListener('click', ()=> show(i, true));
        dotsWrap.appendChild(d);
      });
    }
    const dots = dotsWrap ? Array.from(dotsWrap.children) : [];

    function show(i, manual=false){
      if (slides.length === 0) return;
      if (i < 0) i = slides.length - 1;
      if (i >= slides.length) i = 0;
      slides.forEach((s,si)=>{
        s.classList.toggle('active', si === i);
        if (si === i) { s.style.display='block'; requestAnimationFrame(()=> s.style.opacity = '1'); }
        else { s.style.opacity='0'; setTimeout(()=>{ s.style.display='none'; }, 360); }
      });
      dots.forEach((d,di)=> d.classList.toggle('active', di === i));
      idx = i;
    }

    if (nextBtn) nextBtn.addEventListener('click', ()=> show(idx+1, true));
    if (prevBtn) prevBtn.addEventListener('click', ()=> show(idx-1, true));
    slides.forEach(s=> { s.style.display='none'; s.style.opacity='0'; });
    show(0);
  })();
});

// ----------------- Safe init for existing res-slider (if present) -----------------
document.addEventListener('DOMContentLoaded', function () {
  (function(){
    const wrap = document.querySelector('.res-slider');
    if (!wrap) return;
    const slides = Array.from(wrap.querySelectorAll('.res-slide'));
    const prevBtn = document.querySelector('.res-nav.prev');
    const nextBtn = document.querySelector('.res-nav.next');
    const dotsWrap = document.querySelector('.res-dots');
    let idx = 0;
    if (dotsWrap && dotsWrap.children.length === 0) {
      slides.forEach((_,i)=>{
        const d = document.createElement('button');
        d.className = 'res-dot';
        d.addEventListener('click', ()=> show(i, true));
        dotsWrap.appendChild(d);
      });
    }
    const dots = dotsWrap ? Array.from(dotsWrap.children) : [];
    function show(i, manual=false){
      if (slides.length === 0) return;
      if (i < 0) i = slides.length - 1;
      if (i >= slides.length) i = 0;
      slides.forEach((s,si)=>{
        s.classList.toggle('active', si === i);
        if (si === i) { s.style.display='block'; requestAnimationFrame(()=> s.style.opacity = '1'); }
        else { s.style.opacity='0'; setTimeout(()=>{ s.style.display='none'; }, 360); }
      });
      dots.forEach((d,di)=> d.classList.toggle('active', di === i));
      idx = i;
    }
    if (nextBtn) nextBtn.addEventListener('click', ()=> show(idx+1, true));
    if (prevBtn) prevBtn.addEventListener('click', ()=> show(idx-1, true));
    slides.forEach(s=> { s.style.display='none'; s.style.opacity='0'; });
    show(0);
  })();
});

// ----------------- Case Studies Slider (robust, DOM-ready) -----------------
document.addEventListener('DOMContentLoaded', function () {
  const caseItems = Array.from(document.querySelectorAll('.case-item'));
  const prevCase = document.querySelector('.case-prev');
  const nextCase = document.querySelector('.case-next');
  if (!caseItems || caseItems.length === 0) { return; }
  let caseIndex = 0;
  function showCase(i) {
    if (!caseItems.length) return;
    if (i < 0) i = caseItems.length - 1;
    if (i >= caseItems.length) i = 0;
    caseItems.forEach((slide, idx) => {
      slide.classList.toggle('active', idx === i);
      slide.style.display = (idx === i) ? 'block' : 'none';
    });
    caseIndex = i;
  }
  if (prevCase) {
    prevCase.addEventListener('click', () => {
      showCase((caseIndex - 1 + caseItems.length) % caseItems.length);
    });
  }
  if (nextCase) {
    nextCase.addEventListener('click', () => {
      showCase((caseIndex + 1) % caseItems.length);
    });
  }
  caseItems.forEach((s,i) => {
    s.style.display = (i === 0) ? 'block' : 'none';
    s.classList.toggle('active', i === 0);
  });
  caseIndex = 0;
});
