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
