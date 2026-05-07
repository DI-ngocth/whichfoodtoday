const { ipcRenderer } = require('electron');

// ── Data ─────────────────────────────────────────────────────
let foods = [];

async function loadFoods() {
  foods = await ipcRenderer.invoke('foods:read');
  renderList();
}
async function saveFoods() {
  await ipcRenderer.invoke('foods:write', foods);
}

// ── Navigation ────────────────────────────────────────────────
const VIEWS = ['spin', 'list', 'decide'];
let activeView = 'spin';

function showView(name) {
  activeView = name;
  VIEWS.forEach(v => {
    const el = document.getElementById(`view-${v}`);
    el.classList.toggle('hidden', v !== name);
    el.classList.toggle('flex', v === name);
  });
  // sidebar highlight
  document.querySelectorAll('.nav-btn').forEach(btn => {
    const active = btn.dataset.view === name;
    btn.classList.toggle('bg-primary-container', active);
    btn.classList.toggle('text-on-primary-container', active);
    btn.classList.toggle('font-bold', active);
    btn.classList.toggle('scale-105', active);
    btn.classList.toggle('shadow-sm', active);
    btn.classList.toggle('text-on-surface-variant', !active);
    btn.classList.toggle('hover:bg-surface-variant/50', !active);
  });

  if (name === 'list') renderList();
}

document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', () => showView(btn.dataset.view));
});

// ── Humorous copy ─────────────────────────────────────────────
const EMOJIS = ['🍜', '🍛', '🍲', '🥘', '🌮', '🍔', '🥗', '🍱'];
const COPY = [
  n => `Đừng suy nghĩ nữa, ăn ${n} đi.`,
  n => `Số phận đã chọn: ${n}! Không cãi được đâu nha.`,
  n => `Hôm nay trời cho ăn ${n}. Cứ thế mà đi thôi!`,
  n => `${n} — ngon, quen, khỏi nghĩ thêm.`,
  n => `Bụng bảo: "${n}. Chốt!" Nghe bụng đi.`,
];
function randomCopy(name) { return COPY[Math.floor(Math.random() * COPY.length)](name); }
function randomEmoji()    { return EMOJIS[Math.floor(Math.random() * EMOJIS.length)]; }

// ── Pick logic ────────────────────────────────────────────────
function pickFood(pool) {
  const today = new Date();
  const eligible = pool.filter(f => {
    if (!f.lastEaten) return true;
    return (today - new Date(f.lastEaten)) / 86400000 > 3;
  });
  const src = eligible.length ? eligible : pool;
  return src[Math.floor(Math.random() * src.length)];
}


// ── SPIN VIEW ────────────────────────────────────────────────
let spinFilter = 'all';

document.querySelectorAll('.spin-chip').forEach(btn => {
  btn.addEventListener('click', () => {
    spinFilter = btn.dataset.filter;
    document.querySelectorAll('.spin-chip').forEach(c => {
      const sel = c === btn;
      c.classList.toggle('bg-primary-fixed', sel);
      c.classList.toggle('text-on-primary-fixed', sel);
      c.classList.toggle('bg-surface-container-high', !sel);
      c.classList.toggle('text-on-surface', !sel);
    });
  });
});

document.getElementById('btn-spin').addEventListener('click', async () => {
  const actualPool = spinFilter === 'all' ? foods
    : spinFilter === 'cheap' ? foods.filter(f => f.price === 'cheap')
    : foods.filter(f => (f.tags || []).includes(spinFilter));

  if (!actualPool.length) {
    showSpinResult({ name: 'Không có món nào!', tags: [] }, '😢', 'Thêm món hoặc đổi bộ lọc nào.');
    return;
  }

  const resultEl = document.getElementById('spin-result');
  resultEl.classList.remove('hidden');
  resultEl.classList.add('flex');

  // flicker
  let ticks = 0;
  const nameEl = document.getElementById('result-name');
  const ticker = setInterval(() => {
    const tmp = actualPool[Math.floor(Math.random() * actualPool.length)];
    nameEl.textContent = tmp.name;
    if (++ticks >= 10) clearInterval(ticker);
  }, 60);

  setTimeout(async () => {
    clearInterval(ticker);
    const food = pickFood(actualPool);
    const emoji = randomEmoji();
    const copy = randomCopy(food.name);
    showSpinResult(food, emoji, copy);

    const idx = foods.findIndex(f => f.id === food.id);
    if (idx !== -1) {
      foods[idx].lastEaten = new Date().toISOString().slice(0, 10);
      await saveFoods();
    }
  }, 620);
});

function showSpinResult(food, emoji, copy) {
  document.getElementById('result-emoji').textContent = emoji;
  document.getElementById('result-name').textContent = food.name;
  document.getElementById('result-copy').textContent = copy;
  const tagsEl = document.getElementById('result-tags');
  tagsEl.innerHTML = '';
  if (food.price) tagsEl.appendChild(makeTag(food.price, priceClass(food.price)));
  (food.tags || []).forEach(t => tagsEl.appendChild(makeTag(t)));
}

// random via sidebar button
document.getElementById('nav-random-btn').addEventListener('click', () => {
  showView('spin');
  document.getElementById('btn-spin').click();
});

// ── LIST VIEW ────────────────────────────────────────────────
document.getElementById('search-input').addEventListener('input', renderList);

function renderList() {
  const query = document.getElementById('search-input').value.toLowerCase();
  const pool = foods.filter(f => f.name.toLowerCase().includes(query));
  const grid = document.getElementById('food-grid');
  const empty = document.getElementById('empty-state');
  grid.innerHTML = '';

  if (!pool.length) { empty.classList.remove('hidden'); return; }
  empty.classList.add('hidden');

  pool.forEach(food => {
    const el = document.createElement('div');
    el.className = 'bg-surface rounded-xl overflow-hidden shadow-[0_10px_30px_rgba(172,53,9,0.05)] hover:shadow-[0_15px_40px_rgba(172,53,9,0.1)] hover:-translate-y-1 transition-all duration-300 border border-outline-variant/10 group relative';
    el.innerHTML = `
      <div class="absolute top-sm right-sm z-10 flex gap-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <button class="bg-surface/80 backdrop-blur-sm p-xs rounded-full text-on-surface hover:text-primary shadow-sm edit-btn" data-id="${food.id}">
          <span class="material-symbols-outlined text-[20px]">edit</span>
        </button>
        <button class="bg-surface/80 backdrop-blur-sm p-xs rounded-full text-error hover:bg-error-container shadow-sm del-btn" data-id="${food.id}">
          <span class="material-symbols-outlined text-[20px]">delete</span>
        </button>
      </div>
      <div class="p-md flex flex-col gap-sm min-h-[140px]">
        <div class="flex justify-between items-start">
          <h3 class="text-headline-md font-bold text-on-surface">${food.name}</h3>
          <div class="flex text-primary">${priceIcons(food.price)}</div>
        </div>
        <div class="flex flex-wrap gap-xs">
          ${(food.tags || []).map(t => `<span class="bg-secondary-fixed text-on-secondary-fixed text-label-md font-semibold px-sm py-[2px] rounded-full">${t}</span>`).join('')}
        </div>
        <div class="mt-auto pt-sm border-t border-outline-variant/20 flex items-center gap-xs text-on-surface-variant text-[14px]">
          <span class="material-symbols-outlined text-[16px]">history</span>
          ${food.lastEaten ? `Lần cuối: ${formatDate(food.lastEaten)}` : 'Chưa ăn lần nào'}
        </div>
      </div>`;
    el.querySelector('.edit-btn').addEventListener('click', () => openModal(food.id));
    el.querySelector('.del-btn').addEventListener('click', () => deleteFood(food.id));
    grid.appendChild(el);
  });
}

function priceIcons(price) {
  const counts = { cheap: 1, medium: 2, expensive: 3 };
  const n = counts[price] || 1;
  let html = '';
  for (let i = 0; i < 3; i++) {
    const filled = i < n ? "'FILL' 1" : "'FILL' 0";
    const dim = i < n ? '' : ' text-surface-dim';
    html += `<span class="material-symbols-outlined text-[18px]${dim}" style="font-variation-settings: ${filled}">attach_money</span>`;
  }
  return html;
}

function formatDate(iso) {
  const d = new Date(iso);
  const today = new Date();
  const diff = Math.round((today - d) / 86400000);
  if (diff === 0) return 'Hôm nay';
  if (diff === 1) return 'Hôm qua';
  if (diff < 7)  return `${diff} ngày trước`;
  return iso;
}

async function deleteFood(id) {
  foods = foods.filter(f => f.id !== id);
  await saveFoods();
  renderList();
}

document.getElementById('btn-add-food').addEventListener('click', () => openModal());

// ── DECIDE VIEW ───────────────────────────────────────────────
let decidePrice = 'all';
let decideMode  = 'all';

document.querySelectorAll('.decide-price').forEach(btn => {
  btn.addEventListener('click', () => {
    decidePrice = btn.dataset.val;
    document.querySelectorAll('.decide-price').forEach(b => {
      const sel = b === btn;
      b.classList.toggle('bg-primary-container',   sel);
      b.classList.toggle('text-on-primary-container', sel);
      b.classList.toggle('shadow-sm',              sel);
      b.classList.toggle('bg-surface-variant',     !sel);
      b.classList.toggle('text-on-surface-variant',!sel);
    });
  });
});

document.querySelectorAll('.decide-mode').forEach(btn => {
  btn.addEventListener('click', () => {
    decideMode = btn.dataset.val;
    document.querySelectorAll('.decide-mode').forEach(b => {
      const sel = b === btn;
      b.classList.toggle('bg-secondary-container',    sel);
      b.classList.toggle('text-on-secondary-container', sel);
      b.classList.toggle('border-secondary',          sel);
      b.classList.toggle('bg-surface',                !sel);
      b.classList.toggle('border-outline-variant/30', !sel);
    });
  });
});

document.getElementById('btn-decide').addEventListener('click', async () => {
  const pool = foods.filter(f => {
    if (decidePrice !== 'all' && f.price !== decidePrice) return false;
    if (decideMode  !== 'all' && !(f.tags || []).includes(decideMode)) return false;
    return true;
  });
  const resultEl = document.getElementById('decide-result');
  if (!pool.length) {
    document.getElementById('decide-emoji').textContent = '😢';
    document.getElementById('decide-name').textContent = 'Không tìm thấy món phù hợp!';
    document.getElementById('decide-copy').textContent = 'Hãy thử bỏ bớt bộ lọc nhé.';
    resultEl.classList.remove('hidden');
    return;
  }
  const food = pickFood(pool);
  document.getElementById('decide-emoji').textContent = randomEmoji();
  document.getElementById('decide-name').textContent = food.name;
  document.getElementById('decide-copy').textContent = randomCopy(food.name);
  resultEl.classList.remove('hidden');

  const idx = foods.findIndex(f => f.id === food.id);
  if (idx !== -1) {
    foods[idx].lastEaten = new Date().toISOString().slice(0, 10);
    await saveFoods();
  }
});

// ── MODAL ─────────────────────────────────────────────────────
let editingId = null;

function openModal(id = null) {
  editingId = id;
  const overlay = document.getElementById('modal-overlay');

  // reset form
  document.getElementById('input-name').value = '';
  document.querySelector('[name="price"][value="cheap"]').checked = true;
  document.querySelectorAll('#tag-checkbox-group input').forEach(c => c.checked = false);

  if (id) {
    const food = foods.find(f => f.id === id);
    document.getElementById('modal-title').textContent = 'Sửa món ăn';
    document.getElementById('modal-icon').textContent = 'edit';
    document.getElementById('input-name').value = food.name;
    const priceInput = document.querySelector(`[name="price"][value="${food.price}"]`);
    if (priceInput) priceInput.checked = true;
    (food.tags || []).forEach(t => {
      const cb = document.querySelector(`#tag-checkbox-group input[value="${t}"]`);
      if (cb) cb.checked = true;
    });
  } else {
    document.getElementById('modal-title').textContent = 'Thêm món mới';
    document.getElementById('modal-icon').textContent = 'add_circle';
  }

  overlay.classList.remove('hidden');
  overlay.classList.add('flex');
  document.getElementById('input-name').focus();
}

function closeModal() {
  document.getElementById('modal-overlay').classList.add('hidden');
  document.getElementById('modal-overlay').classList.remove('flex');
  editingId = null;
}

document.getElementById('btn-cancel').addEventListener('click', closeModal);
document.getElementById('modal-overlay').addEventListener('click', e => {
  if (e.target === e.currentTarget) closeModal();
});

document.getElementById('food-form').addEventListener('submit', async e => {
  e.preventDefault();
  const name = document.getElementById('input-name').value.trim();
  if (!name) { document.getElementById('input-name').focus(); return; }
  const price = document.querySelector('[name="price"]:checked')?.value || 'cheap';
  const tags = [...document.querySelectorAll('#tag-checkbox-group input:checked')].map(c => c.value);

  if (editingId) {
    const idx = foods.findIndex(f => f.id === editingId);
    foods[idx] = { ...foods[idx], name, price, tags };
  } else {
    foods.push({ id: Date.now().toString(), name, price, tags, lastEaten: null });
  }
  await saveFoods();
  renderList();
  closeModal();
});

// ── Helpers ───────────────────────────────────────────────────
function makeTag(text, cls = '') {
  const span = document.createElement('span');
  span.className = `text-label-md font-semibold px-sm py-[2px] rounded-full ${cls}`;
  const labels = { cheap: 'Rẻ 💸', medium: 'Vừa 💰', expensive: 'Đắt 💎' };
  span.textContent = labels[text] || text;
  return span;
}
function priceClass(price) {
  return { cheap: 'bg-[#e8f5e9] text-[#2e7d32]', medium: 'bg-[#fff8e1] text-[#8a6200]', expensive: 'bg-[#fce4ec] text-[#880e4f]' }[price] || '';
}

// ── Init ──────────────────────────────────────────────────────
showView('spin');
loadFoods();
