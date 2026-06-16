// ══════════════════════════════════════════════════════
//  G TECH CCTV — MAIN JS v2 (Enhanced)
// ══════════════════════════════════════════════════════

// ── SCROLL TOP ──────────────────────────────────────
window.onscroll = function() {
  const btn = document.getElementById('scrollTopBtn');
  if(btn) btn.style.display = window.scrollY > 120 ? 'block' : 'none';
};

// ── HAMBURGER ───────────────────────────────────────
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
if(menuToggle && navMenu) {
  menuToggle.addEventListener('click', () => navMenu.classList.toggle('show'));
  document.addEventListener('click', (e) => {
    if(!menuToggle.contains(e.target) && !navMenu.contains(e.target))
      navMenu.classList.remove('show');
  });
}

// ── SEARCH BAR ──────────────────────────────────────
const searchBtn = document.getElementById('searchBtn');
const searchBar = document.getElementById('searchBar');
const searchInput = document.getElementById('searchInput');
if(searchBtn && searchBar) {
  searchBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    searchBar.classList.toggle('show');
    if(searchBar.classList.contains('show') && searchInput) searchInput.focus();
  });
  document.addEventListener('click', (e) => {
    if(!searchBar?.contains(e.target) && !searchBtn?.contains(e.target))
      searchBar?.classList.remove('show');
  });
  searchInput?.addEventListener('keydown', (e) => {
    if(e.key === 'Enter') {
      const q = searchInput.value.trim().toLowerCase();
      if(q) window.location.href = 'products.html?search=' + encodeURIComponent(q);
    }
  });
}

// ── HERO SLIDER ─────────────────────────────────────
(function initSlider() {
  const slides = document.querySelectorAll('#heroSlider .slide');
  const dots   = document.querySelectorAll('#heroDots .dot');
  if(!slides.length) return;
  let current = 0, timer;
  function goTo(n) {
    slides[current].classList.remove('active');
    dots[current]?.classList.remove('active');
    current = (n + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current]?.classList.add('active');
  }
  function startAuto() { timer = setInterval(() => goTo(current + 1), 4500); }
  function stopAuto()  { clearInterval(timer); }
  dots.forEach(d => d.addEventListener('click', () => { stopAuto(); goTo(+d.dataset.index); startAuto(); }));
  startAuto();
})();

// ── TESTIMONIALS ────────────────────────────────────
let testiCurrent = 0;
const testimonials = document.querySelectorAll('.testimonial');
function showTesti(i) { testimonials.forEach(t => t.classList.remove('active')); testimonials[i]?.classList.add('active'); }
function nextTestimonial() { testiCurrent = (testiCurrent + 1) % testimonials.length; showTesti(testiCurrent); }
function prevTestimonial() { testiCurrent = (testiCurrent - 1 + testimonials.length) % testimonials.length; showTesti(testiCurrent); }
if(testimonials.length) setInterval(nextTestimonial, 6000);

// ── NEWSLETTER ──────────────────────────────────────
function sendWA() {
  const ph = document.getElementById('nlPhone')?.value.trim();
  const msg = ph ? `Hello G Tech, my number is ${ph}. I need a CCTV quote.` : 'Hello G Tech, I need a CCTV quote.';
  window.open('https://wa.me/918890977017?text=' + encodeURIComponent(msg), '_blank');
}

// ── SCROLL REVEAL ANIMATIONS ────────────────────────
(function initScrollReveal() {
  const style = document.createElement('style');
  style.textContent = `
    .sr { opacity:0; transform:translateY(35px); transition:opacity .65s ease, transform .65s ease; }
    .sr.sr-left { transform:translateX(-35px); }
    .sr.sr-right { transform:translateX(35px); }
    .sr.sr-scale { transform:scale(.92); }
    .sr.visible { opacity:1 !important; transform:none !important; }
    .sr-delay-1 { transition-delay:.1s !important; }
    .sr-delay-2 { transition-delay:.2s !important; }
    .sr-delay-3 { transition-delay:.3s !important; }
    .sr-delay-4 { transition-delay:.4s !important; }
  `;
  document.head.appendChild(style);

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if(e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.1 });

  // Auto-assign scroll reveal to key elements
  function tag(selector, cls, delay) {
    document.querySelectorAll(selector).forEach((el, i) => {
      if(!el.classList.contains('sr')) {
        el.classList.add('sr', ...(cls ? [cls] : []), ...(delay ? ['sr-delay-' + ((i % 4) + 1)] : []));
        obs.observe(el);
      }
    });
  }
  setTimeout(() => {
    tag('.svc-card', '', true);
    tag('.product-card', '', true);
    tag('.men-women-watch-box', '', true);
    tag('.testi-card', 'sr-scale', false);
    tag('.info-item', '', true);
    tag('.brand-list-box-image', '', true);
    tag('.product-heading-arrival', 'sr-left', false);
    tag('.special-text', 'sr-left', false);
    tag('.special-image', 'sr-right', false);
    tag('.footer-col', '', true);
  }, 100);
})();

// ── RENDER PRODUCT CARD ──────────────────────────────
function renderCard(p) {
  return `
    <div class="product-card sr" onclick="openModal(${p.id})" style="opacity:0">
      <div class="product-action-buttons">
        <button class="action-btn" title="Quick View" onclick="event.stopPropagation();openModal(${p.id})"><i class="fa fa-eye"></i></button>
        <a href="https://wa.me/918890977017?text=${encodeURIComponent('Hi G Tech, interested in ' + p.name + ' – ' + p.subtitle + '. Please share price.')}" target="_blank" class="action-btn" title="WhatsApp" onclick="event.stopPropagation()" style="text-decoration:none;display:flex;align-items:center;justify-content:center"><i class="fab fa-whatsapp"></i></a>
      </div>
      <div class="pc-tag-badge" style="background:${p.tagColor}">${p.tag}</div>
      <div class="image-wrapper">
        <img src="${p.image}" class="main-img" alt="${p.name}" loading="lazy" onerror="this.src='cp_bullet_dual.png'"/>
        <img src="${p.images[1]||p.image}" class="hover-img" alt="${p.name}" loading="lazy" onerror="this.src='cp_bullet_dual.png'"/>
      </div>
      <h4 class="shop-name">${p.brand}</h4>
      <div class="product-name-text">${p.name}</div>
      <div class="product-subtitle">${p.subtitle}</div>
      <div class="rating">★★★★★</div>
      <div style="margin-top:10px">
        <span style="background:#e8f0fe;color:#1a73e8;font-size:.75rem;font-weight:700;padding:.2rem .65rem;border-radius:50px">📞 Call for Price</span>
      </div>
    </div>`;
}

// Observe newly created cards
function observeNewCards() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if(e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.08 });
  document.querySelectorAll('.product-card.sr:not(.visible)').forEach(el => obs.observe(el));
}

// ── HOMEPAGE GRIDS ───────────────────────────────────
const featuredGrid = document.getElementById('featuredGrid');
if(featuredGrid && typeof FEATURED_IDS !== 'undefined') {
  const featured = FEATURED_IDS.map(id => PRODUCTS.find(p => p.id === id)).filter(Boolean);
  featuredGrid.innerHTML = featured.map(renderCard).join('');
  setTimeout(observeNewCards, 50);
}
const popularGrid = document.getElementById('popularGrid');
if(popularGrid && typeof PRODUCTS !== 'undefined') {
  popularGrid.innerHTML = PRODUCTS.slice(4, 8).map(renderCard).join('');
  setTimeout(observeNewCards, 50);
}

// ── PRODUCTS PAGE ───────────────────────────────────
const allGrid = document.getElementById('allProductsGrid');
if(allGrid && typeof PRODUCTS !== 'undefined') {
  let activeCat = 'all';
  const urlP = new URLSearchParams(window.location.search);
  const paramCat = urlP.get('cat');
  const paramSearch = urlP.get('search');
  if(paramCat) {
    activeCat = paramCat;
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.toggle('active', b.dataset.cat === paramCat));
  }
  function renderAll(cat, search) {
    let list = cat === 'all' ? [...PRODUCTS] : PRODUCTS.filter(p => p.category === cat);
    if(search) list = list.filter(p =>
      p.name.toLowerCase().includes(search) ||
      p.subtitle.toLowerCase().includes(search) ||
      p.brand.toLowerCase().includes(search) ||
      p.shortDesc.toLowerCase().includes(search)
    );
    allGrid.innerHTML = list.length
      ? list.map(renderCard).join('')
      : '<p style="padding:3rem;text-align:center;color:#666;grid-column:1/-1">No products found.</p>';
    setTimeout(observeNewCards, 50);
  }
  renderAll(activeCat, paramSearch?.toLowerCase());
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCat = btn.dataset.cat;
      renderAll(activeCat);
    });
  });
}

// ── MODAL ────────────────────────────────────────────
let currentProduct = null;
function openModal(id) {
  const p = PRODUCTS.find(pr => pr.id === id);
  if(!p) return;
  currentProduct = p;
  renderModal(p);
  const overlay = document.getElementById('modalOverlay');
  const box = document.getElementById('modalBox');
  if(overlay) { overlay.style.opacity='1'; overlay.style.pointerEvents='all'; }
  if(box) box.style.transform = 'scale(1)';
  document.body.style.overflow = 'hidden';
}
function closeModal() {
  const overlay = document.getElementById('modalOverlay');
  const box = document.getElementById('modalBox');
  if(overlay) { overlay.style.opacity='0'; overlay.style.pointerEvents='none'; }
  if(box) box.style.transform = 'scale(.94)';
  document.body.style.overflow = '';
}
document.addEventListener('keydown', e => { if(e.key==='Escape'){closeModal();closeLightbox();} });

function renderModal(p) {
  const thumbsHTML = p.images.map((img,i) =>
    `<img src="${img}" class="${i===0?'active':''}"
      onclick="changeThumb(this,'${img}')"
      style="width:80px;height:72px;object-fit:contain;cursor:pointer;border:2px solid ${i===0?'#1a73e8':'#ddd'};border-radius:7px;padding:4px;background:#f4f7fb;transition:all .2s"
      onerror="this.src='cp_bullet_dual.png'" loading="lazy"/>`
  ).join('');

  const specsHTML = p.specs.map(s =>
    `<div class="table-row"><span class="label">${s.label}</span><span class="value">${s.value}</span></div>`
  ).join('');

  const hlHTML = p.highlights.map(h =>
    `<li style="font-size:.85rem;display:flex;align-items:flex-start;gap:.5rem;padding:.25rem 0">
      <span style="color:#1a73e8;font-weight:700;flex-shrink:0;margin-top:2px">✓</span>
      <span>${h}</span>
    </li>`
  ).join('');

  const inBoxHTML = p.inBox.map(item =>
    `<div style="font-size:.84rem;padding:.5rem .8rem;background:#f4f7fb;border-radius:7px;display:flex;align-items:center;gap:.5rem">
      <span style="color:#1a73e8;font-weight:700">✓</span> ${item}
    </div>`
  ).join('');

  const waMsg = encodeURIComponent(`Hello G Tech, I'm interested in ${p.name} – ${p.subtitle}. Please share the price and availability.`);

  document.getElementById('modalContent').innerHTML = `
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:2rem">
      <div>
        <div style="display:flex;gap:12px">
          <div style="display:flex;flex-direction:column;gap:8px;overflow-y:auto;max-height:380px;scrollbar-width:none">
            ${thumbsHTML}
          </div>
          <div style="flex:1">
            <div class="main-image" onclick="openLightbox('${p.images[0]}','${p.name}')" style="position:relative;height:320px;border:1px solid #dde3ec;border-radius:10px;overflow:hidden;cursor:zoom-in;background:#f4f7fb">
              <img id="modalMainImg" src="${p.images[0]}" alt="${p.name}"
                style="width:100%;height:100%;object-fit:contain;transition:transform .4s"
                onerror="this.src='cp_bullet_dual.png'"/>
              <div style="position:absolute;bottom:.6rem;right:.6rem;background:rgba(0,0,0,.55);color:#fff;font-size:.7rem;padding:.25rem .6rem;border-radius:50px;pointer-events:none">🔍 Click to zoom</div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div style="display:flex;gap:.5rem;flex-wrap:wrap;margin-bottom:.65rem">
          <span style="background:${p.tagColor}20;color:${p.tagColor};border:1px solid ${p.tagColor}40;font-size:.7rem;font-weight:700;padding:.22rem .7rem;border-radius:50px">${p.brand}</span>
          <span style="background:#e8f0fe;color:#1a73e8;border:1px solid #bbd0f8;font-size:.7rem;font-weight:700;padding:.22rem .7rem;border-radius:50px">${p.tag}</span>
        </div>
        <h2 style="font-size:1.4rem;font-weight:800;color:#0d2137;margin-bottom:.3rem;line-height:1.3">${p.name}</h2>
        <div style="font-size:.88rem;color:#666;margin-bottom:.65rem;font-weight:500">${p.subtitle}</div>
        <div style="color:#ffc107;font-size:.9rem;margin-bottom:.75rem">★★★★★</div>
        <p style="font-size:.85rem;color:#666;margin-bottom:.85rem;line-height:1.8">${p.description}</p>
        <ul style="list-style:none;margin-bottom:1rem;padding:0">${hlHTML}</ul>
        <div style="background:#fff8e1;border:1.5px solid #ffd54f;border-radius:8px;padding:.85rem 1rem;margin-bottom:1rem;font-size:.84rem;color:#5d4037">
          💬 <strong>For price & availability</strong> — Call or WhatsApp: <a href="tel:+918890977017" style="color:#1a73e8;font-weight:700">+91 8890977017</a>
        </div>
        <div style="display:flex;gap:.65rem;margin-bottom:1.25rem;flex-wrap:wrap">
          <a href="tel:+918890977017" style="flex:1;min-width:140px;display:flex;align-items:center;justify-content:center;gap:.4rem;padding:.78rem 1rem;background:#0d2137;color:#fff;border-radius:8px;font-weight:700;font-size:.88rem;text-decoration:none;transition:background .2s" onmouseover="this.style.background='#1a73e8'" onmouseout="this.style.background='#0d2137'">
            <i class="fa fa-phone"></i> Call for Price
          </a>
          <a href="https://wa.me/918890977017?text=${waMsg}" target="_blank" style="flex:1;min-width:140px;display:flex;align-items:center;justify-content:center;gap:.4rem;padding:.78rem 1rem;background:#25d366;color:#fff;border-radius:8px;font-weight:700;font-size:.88rem;text-decoration:none;transition:background .2s" onmouseover="this.style.background='#22c35e'" onmouseout="this.style.background='#25d366'">
            <i class="fab fa-whatsapp"></i> WhatsApp
          </a>
        </div>
        <div style="display:flex;gap:.35rem;border-bottom:2px solid #eee;padding-bottom:.4rem;margin-bottom:.85rem">
          <button class="modal-tab-btn active" onclick="showMTab('mspecs',this)" style="background:#e8f0fe;color:#1a73e8;border:none;cursor:pointer;font-size:.84rem;font-weight:700;padding:.4rem .85rem;border-radius:6px;font-family:inherit;transition:all .2s">Specifications</button>
          <button class="modal-tab-btn" onclick="showMTab('minbox',this)" style="background:none;color:#666;border:none;cursor:pointer;font-size:.84rem;font-weight:600;padding:.4rem .85rem;border-radius:6px;font-family:inherit;transition:all .2s">In the Box</button>
        </div>
        <div id="mspecs">
          <div style="display:flex;flex-direction:column">${specsHTML}</div>
        </div>
        <div id="minbox" style="display:none">
          <div style="display:flex;flex-direction:column;gap:.45rem;margin-top:8px">${inBoxHTML}</div>
        </div>
        <div style="margin-top:1.1rem;padding-top:1rem;border-top:1px solid #eee;display:flex;align-items:center;gap:.6rem">
          <span style="font-size:.8rem;color:#999">Share:</span>
          <a href="https://wa.me/?text=${waMsg}" target="_blank" style="width:32px;height:32px;border-radius:50%;background:#25d366;color:#fff;display:flex;align-items:center;justify-content:center;text-decoration:none;font-size:.8rem"><i class="fab fa-whatsapp"></i></a>
          <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(location.href)}" target="_blank" style="width:32px;height:32px;border-radius:50%;background:#3b5998;color:#fff;display:flex;align-items:center;justify-content:center;text-decoration:none;font-size:.8rem"><i class="fab fa-facebook-f"></i></a>
        </div>
      </div>
    </div>`;

  // Style table rows
  document.querySelectorAll('#mspecs .table-row').forEach((r,i) => {
    r.style.cssText = `display:flex;justify-content:space-between;padding:10px 8px;border-bottom:1px solid #f0f0f0;background:${i%2===0?'#fafafa':'#fff'}`;
    r.querySelector('.label').style.cssText = 'font-weight:700;color:#333;min-width:40%;font-size:.83rem';
    r.querySelector('.value').style.cssText = 'color:#555;font-size:.83rem;text-align:right';
  });

  // Responsive
  if(window.innerWidth < 768) {
    const grid = document.querySelector('#modalContent > div');
    if(grid) grid.style.gridTemplateColumns = '1fr';
  }
}

function changeThumb(el, src) {
  const mainImg = document.getElementById('modalMainImg');
  if(mainImg) {
    mainImg.style.opacity = '0';
    mainImg.style.transform = 'scale(0.96)';
    setTimeout(() => {
      mainImg.src = src;
      mainImg.style.transition = 'opacity .2s, transform .2s';
      mainImg.style.opacity = '1';
      mainImg.style.transform = 'scale(1)';
    }, 120);
  }
  document.querySelectorAll('.watch-thumbs img, .main-image + div img, div[style*="flex-direction:column"] img').forEach(t => t.style.borderColor = '#ddd');
  el.style.borderColor = '#1a73e8';
  const mi = document.querySelector('.main-image');
  if(mi) mi.onclick = () => openLightbox(src, currentProduct?.name || '');
}

function showMTab(id, btn) {
  ['mspecs','minbox'].forEach(tid => {
    const el = document.getElementById(tid);
    if(el) el.style.display = 'none';
  });
  document.querySelectorAll('.modal-tab-btn').forEach(b => {
    b.style.background = 'none';
    b.style.color = '#666';
  });
  const target = document.getElementById(id);
  if(target) target.style.display = 'block';
  btn.style.background = '#e8f0fe';
  btn.style.color = '#1a73e8';
}

// ── LIGHTBOX ────────────────────────────────────────
function openLightbox(src, caption) {
  const lb = document.getElementById('imgLightbox');
  if(!lb) return;
  document.getElementById('lbImg').src = src;
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  document.getElementById('imgLightbox')?.classList.remove('open');
}

// ── CONTACT FORM ────────────────────────────────────
function submitContact() {
  const name = document.getElementById('cName')?.value.trim();
  const phone = document.getElementById('cPhone')?.value.trim();
  if(!name || !phone) { alert('Please fill Name and Phone.'); return; }
  document.getElementById('formCard').style.display = 'none';
  document.getElementById('formSuccess').style.display = 'block';
}

// ── NAVBAR SCROLL ────────────────────────────────────
window.addEventListener('scroll', () => {
  document.querySelector('.navbar')?.classList.toggle('scrolled', window.scrollY > 40);
});
