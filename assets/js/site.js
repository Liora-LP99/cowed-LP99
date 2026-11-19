/* ============================================================
   甜玉米 · 飞鸟与鱼 —— 交互脚本
   想加视频？把链接填进下面的 VIDEOS 就行。
   - mp4 本地/远程文件：{ type: 'mp4', src: 'assets/videos/xxx.mp4' }
   - B 站视频：{ type: 'bilibili', bvid: 'BV1xxxxxxx' }
   - 任意嵌入地址：{ type: 'iframe', src: 'https://player.bilibili.com/player.html?bvid=...' }
   ============================================================ */

const VIDEOS = {
  v1: {
    title: '《逆爱》甜向混剪 · 飞鸟与鱼',
    meta: 'CUT · 甜向剪辑',
    type: 'mp4',
    src: ''
  },
  v2: {
    title: '双人花絮 / 采访合集',
    meta: 'BTS · 花絮',
    type: 'mp4',
    src: ''
  },
  v3: {
    title: '黄绿色的海 · 应援现场记录',
    meta: 'LIVE · 应援现场',
    type: 'mp4',
    src: ''
  }
};

(function () {
  const nav = document.getElementById('nav');
  const progress = document.getElementById('progress');
  const navLinks = [...document.querySelectorAll('.nav__links a')];

  /* ---------- 滚动：导航状态 + 进度条 ---------- */
  let ticking = false;
  function onScroll() {
    const y = window.scrollY || document.documentElement.scrollTop;
    nav.classList.toggle('is-stuck', y > 24);
    const h = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = (h > 0 ? Math.min(y / h, 1) * 100 : 0) + '%';
    ticking = false;
  }
  window.addEventListener('scroll', () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(onScroll);
    }
  }, { passive: true });
  onScroll();

  /* ---------- 入场动画 ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('in'));
  }

  /* ---------- 导航高亮 ---------- */
  const sections = navLinks
    .map((a) => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((a) =>
          a.classList.toggle('is-active', a.getAttribute('href') === '#' + entry.target.id)
        );
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach((s) => spy.observe(s));
  }

  /* ---------- 图集灯箱 ---------- */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCap = document.getElementById('lightboxCap');

  function openLightbox(item) {
    const img = item.querySelector('img');
    if (!img) return;
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt || '';
    lightboxCap.textContent = item.dataset.cap || img.alt || '';
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
  }
  function closeLightbox() {
    lightbox.hidden = true;
    lightboxImg.src = '';
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.gallery__item').forEach((item) => {
    item.addEventListener('click', () => openLightbox(item));
  });
  document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  /* ---------- 视频弹窗 ---------- */
  const modal = document.getElementById('videoModal');
  const vmTitle = document.getElementById('vmTitle');
  const vmMeta = document.getElementById('vmMeta');
  const vmPlayer = document.getElementById('vmPlayer');

  function renderPlayer(v) {
    vmPlayer.innerHTML = '';
    if (!v) return;

    if (v.type === 'mp4' && v.src) {
      const video = document.createElement('video');
      video.src = v.src;
      video.controls = true;
      video.playsInline = true;
      video.autoplay = true;
      vmPlayer.appendChild(video);
      return;
    }
    if (v.type === 'bilibili' && v.bvid) {
      const iframe = document.createElement('iframe');
      iframe.src = 'https://player.bilibili.com/player.html?bvid=' + v.bvid + '&high_quality=1&autoplay=1';
      iframe.allow = 'autoplay; fullscreen';
      iframe.allowFullscreen = true;
      iframe.scrolling = 'no';
      vmPlayer.appendChild(iframe);
      return;
    }
    if (v.type === 'iframe' && v.src) {
      const iframe = document.createElement('iframe');
      iframe.src = v.src;
      iframe.allow = 'autoplay; fullscreen; picture-in-picture';
      iframe.allowFullscreen = true;
      vmPlayer.appendChild(iframe);
      return;
    }

    const empty = document.createElement('div');
    empty.className = 'player-empty';
    empty.innerHTML =
      '<b>视频还没有上传</b>' +
      '把视频地址填进 <code>assets/js/site.js</code> 的 <code>VIDEOS</code> 里，刷新即可播放。<br>' +
      '<span>支持 MP4 文件、B 站视频号（bvid）或任意嵌入地址</span>';
    vmPlayer.appendChild(empty);
  }

  function openVideo(id) {
    const v = VIDEOS[id];
    if (!v) return;
    vmTitle.textContent = v.title;
    vmMeta.textContent = v.meta || '';
    renderPlayer(v);
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
  }
  function closeVideo() {
    modal.hidden = true;
    vmPlayer.innerHTML = '';
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.video-card').forEach((card) => {
    card.addEventListener('click', () => openVideo(card.dataset.video));
  });
  document.getElementById('videoClose').addEventListener('click', closeVideo);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeVideo();
  });

  /* ---------- Esc 关闭 ---------- */
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    if (!lightbox.hidden) closeLightbox();
    if (!modal.hidden) closeVideo();
  });

  /* ---------- 首屏符号轻微视差 ---------- */
  const symbols = document.querySelector('.hero__symbols');
  if (symbols && window.matchMedia('(pointer:fine)').matches) {
    window.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 16;
      const y = (e.clientY / window.innerHeight - 0.5) * 12;
      symbols.style.transform = 'translate3d(' + x + 'px,' + y + 'px,0)';
    }, { passive: true });
  }
})();
