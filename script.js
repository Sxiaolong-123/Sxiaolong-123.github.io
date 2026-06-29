(function(){
  const progress = document.querySelector('.scroll-progress');
  const updateProgress = () => {
    const h = document.documentElement;
    const max = h.scrollHeight - h.clientHeight;
    if (progress) progress.style.width = (max ? (window.scrollY / max) * 100 : 0) + '%';
  };
  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress);
  updateProgress();

  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  const toggle = document.querySelector('.menu-toggle');
  if (toggle) {
    toggle.addEventListener('click', () => {
      const open = document.body.classList.toggle('menu-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    document.querySelectorAll('.site-nav a').forEach(link => {
      link.addEventListener('click', () => {
        document.body.classList.remove('menu-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const canvas = document.getElementById('heroCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = 0;
    let height = 0;
    let particles = [];
    const DPR = Math.min(window.devicePixelRatio || 1, 2);

    function setup() {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * DPR;
      canvas.height = height * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      const count = Math.max(26, Math.min(55, Math.floor(width / 28)));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        r: Math.random() * 1.8 + 0.7
      }));
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = 'rgba(255,255,255,0.85)';

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,0.35)';
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(255,255,255,${0.08 * (1 - dist / 110)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(draw);
    }

    setup();
    draw();
    window.addEventListener('resize', setup);
  }
})();

// Custom cursor for desktop portfolio interactions
(function(){
  const dot=document.querySelector('.cursor-dot');
  const ring=document.querySelector('.cursor-ring');
  if(!dot||!ring||window.matchMedia('(pointer: coarse)').matches)return;
  let mx=0,my=0,rx=0,ry=0;
  window.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;dot.style.transform=`translate(${mx-3}px,${my-3}px)`;});
  function loop(){rx+=(mx-rx)*.16;ry+=(my-ry)*.16;ring.style.transform=`translate(${rx-17}px,${ry-17}px)`;requestAnimationFrame(loop)}loop();
  document.querySelectorAll('a,button,[data-cursor]').forEach(el=>{el.addEventListener('mouseenter',()=>ring.classList.add('is-active'));el.addEventListener('mouseleave',()=>ring.classList.remove('is-active'));});
})();




