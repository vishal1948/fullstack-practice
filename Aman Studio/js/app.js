/* =========================================================
   AMAN STUDIO — SITE LOGIC
   =========================================================
   Handles: rendering products/filters, cart state, the cart
   drawer, checkout modal, contact form, and toast messages.

   Product data lives in js/products.js (loaded before this
   file) — edit that file to change what's for sale.
   ========================================================= */
 
/* ---------------- STATE ---------------- */
let cart = {}; // { productId: quantity }
let activeFilter = 'All';

/* ---------------- HELPERS ---------------- */
function fmt(n) {
  return '₹' + n.toLocaleString('en-IN');
}

/* ---------------- RENDER: FILTERS ---------------- */
const filtersEl = document.getElementById('filters');

function renderFilters() {
  filtersEl.innerHTML = CATEGORIES.map(c =>
    `<button class="filter-pill ${c === activeFilter ? 'active' : ''}" data-cat="${c}">${c}</button>`
  ).join('');

  filtersEl.querySelectorAll('.filter-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      activeFilter = btn.dataset.cat;
      renderFilters();
      renderShelf();
    });
  });
}

/* ---------------- RENDER: PRODUCT SHELF ---------------- */
const shelfEl = document.getElementById('shelf');

function renderShelf() {
  const list = activeFilter === 'All'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.cat === activeFilter);

  shelfEl.innerHTML = list.map(p => `
    <div class="product" data-id="${p.id}">
      <div class="product-img">
        <img src="${p.img}" alt="${p.name}" loading="lazy">
        <div class="seal">${p.seal}</div>
      </div>
      <div class="product-body">
        <span class="product-cat">${p.cat}</span>
        <h3>${p.name}</h3>
        <div class="product-foot">
          <div class="price">${p.mrp ? `<span class="strike">${fmt(p.mrp)}</span>` : ''}${fmt(p.price)}</div>
          <button class="add-btn" data-id="${p.id}" aria-label="Add ${p.name} to cart">+</button>
        </div>
      </div>
    </div>
  `).join('');

  shelfEl.querySelectorAll('.add-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      addToCart(btn.dataset.id);
      btn.classList.add('added');
      btn.textContent = '✓';
      setTimeout(() => {
        btn.classList.remove('added');
        btn.textContent = '+';
      }, 900);
    });
  });
}

/* ---------------- MARQUEE STRIP ---------------- */
function renderMarquee() {
  const track = document.getElementById('marqueeTrack');
  track.innerHTML = MARQUEE_ITEMS.concat(MARQUEE_ITEMS)
    .map(t => `<span>${t}</span>`)
    .join('');
}

/* ---------------- CART LOGIC ---------------- */
function addToCart(id) {
  cart[id] = (cart[id] || 0) + 1;
  updateCartUI();
  showToast(`${PRODUCTS.find(p => p.id === id).name} added to cart`);
}

function changeQty(id, delta) {
  if (!cart[id]) return;
  cart[id] += delta;
  if (cart[id] <= 0) delete cart[id];
  updateCartUI();
}

function removeFromCart(id) {
  delete cart[id];
  updateCartUI();
}

function cartCount() {
  return Object.values(cart).reduce((a, b) => a + b, 0);
}

function cartTotal() {
  return Object.entries(cart).reduce((sum, [id, qty]) => {
    const p = PRODUCTS.find(p => p.id === id);
    return sum + p.price * qty;
  }, 0);
}

/* ---------------- RENDER: CART DRAWER ---------------- */
const drawerItems = document.getElementById('drawerItems');
const drawerFoot = document.getElementById('drawerFoot');
const cartCountEl = document.getElementById('cartCount');

function updateCartUI() {
  cartCountEl.textContent = cartCount();

  const ids = Object.keys(cart);
  if (ids.length === 0) {
    drawerItems.innerHTML = `
      <div class="empty-cart">
        <div class="em-icon">𓎈</div>
        <p>Your cart is empty.</p>
        <p style="font-size:0.85rem; margin-top:6px;">Add a piece from the collection to begin.</p>
      </div>`;
    drawerFoot.innerHTML = '';
    return;
  }

  drawerItems.innerHTML = ids.map(id => {
    const p = PRODUCTS.find(p => p.id === id);
    const qty = cart[id];
    return `
      <div class="cart-item">
        <img src="${p.img}" alt="${p.name}">
        <div>
          <h4>${p.name}</h4>
          <div class="price-sm">${fmt(p.price)}</div>
          <div class="qty-row">
            <button class="qty-btn" data-act="dec" data-id="${id}">−</button>
            <span class="mono" style="font-size:0.85rem;">${qty}</span>
            <button class="qty-btn" data-act="inc" data-id="${id}">+</button>
          </div>
        </div>
        <button class="remove-btn" data-id="${id}">Remove</button>
      </div>`;
  }).join('');

  const subtotal = cartTotal();
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : SHIPPING_FEE;
  const total = subtotal + shipping;

  drawerFoot.innerHTML = `
    <div class="sum-row"><span>Subtotal</span><span class="mono">${fmt(subtotal)}</span></div>
    <div class="sum-row"><span>Shipping</span><span class="mono">${shipping === 0 ? 'Free' : fmt(shipping)}</span></div>
    <div class="sum-row total"><span>Total</span><span class="mono">${fmt(total)}</span></div>
    <button class="btn btn-primary checkout-btn" id="goCheckout">Proceed to checkout →</button>
  `;

  drawerItems.querySelectorAll('.qty-btn').forEach(btn => {
    btn.addEventListener('click', () => changeQty(btn.dataset.id, btn.dataset.act === 'inc' ? 1 : -1));
  });
  drawerItems.querySelectorAll('.remove-btn').forEach(btn => {
    btn.addEventListener('click', () => removeFromCart(btn.dataset.id));
  });
  document.getElementById('goCheckout').addEventListener('click', openCheckout);
}

/* ---------------- DRAWER OPEN/CLOSE ---------------- */
const overlay = document.getElementById('overlay');
const drawer = document.getElementById('drawer');

function openDrawer() {
  overlay.classList.add('open');
  drawer.classList.add('open');
}
function closeDrawer() {
  overlay.classList.remove('open');
  drawer.classList.remove('open');
}

/* ---------------- CHECKOUT MODAL ---------------- */
const checkoutOverlay = document.getElementById('checkoutOverlay');
const checkoutModal = document.getElementById('checkoutModal');

function openCheckout() {
  const subtotal = cartTotal();
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const total = subtotal + shipping;

  checkoutModal.innerHTML = `
    <h3>Checkout</h3>
    <p class="sub">${cartCount()} item${cartCount() > 1 ? 's' : ''} · Total ${fmt(total)}</p>
    <form id="checkoutForm">
      <div class="field"><label for="co-name">Full name</label><input id="co-name" required placeholder="Your full name"></div>
      <div class="field"><label for="co-addr">Delivery address</label><textarea id="co-addr" required placeholder="House no, street, city, state, PIN"></textarea></div>
      <div class="field"><label for="co-phone">Phone</label><input id="co-phone" type="tel" required placeholder="+91 00000 00000"></div>
      <div class="field"><label for="co-pay">Payment method</label>
        <select id="co-pay" style="border:1.5px solid var(--line); background:var(--clay-dust); padding:13px 14px; border-radius:4px; font-family:'Karla',sans-serif;">
          <option>UPI</option>
          <option>Cash on Delivery</option>
          <option>Credit / Debit Card</option>
        </select>
      </div>
      <button type="submit" class="btn btn-primary" style="justify-content:center; margin-top:8px;">Place order — ${fmt(total)}</button>
    </form>
  `;

  drawer.classList.remove('open');
  checkoutOverlay.classList.add('open');

  document.getElementById('checkoutForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const orderNum = 'AS' + Math.floor(10000 + Math.random() * 89999);
    checkoutModal.innerHTML = `
      <div class="success">
        <div class="seal-big">✓</div>
        <h3>Order placed!</h3>
        <p class="sub">Order #${orderNum} · We'll email a confirmation shortly.</p>
        <p style="font-size:0.9rem; color:rgba(61,34,24,0.7); margin-bottom:26px;">Your pieces are being wrapped with care and will ship within 3–5 days, straight from the studio in Bishnupur.</p>
        <button class="btn btn-ghost" id="closeSuccess" style="width:100%; justify-content:center;">Continue browsing</button>
      </div>
    `;
    cart = {};
    updateCartUI();
    document.getElementById('closeSuccess').addEventListener('click', closeCheckout);
  });
}

function closeCheckout() {
  checkoutOverlay.classList.remove('open');
}

/* ---------------- TOAST ---------------- */
let toastTimer;
function showToast(msg) {
  const toast = document.getElementById('toast');
  document.getElementById('toastMsg').textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
}

/* ---------------- EVENT WIRING ---------------- */
function wireStaticEvents() {
  document.getElementById('cartOpenBtn').addEventListener('click', openDrawer);
  document.getElementById('closeDrawer').addEventListener('click', closeDrawer);

  overlay.addEventListener('click', () => {
    closeDrawer();
    closeCheckout();
  });

  checkoutOverlay.addEventListener('click', (e) => {
    if (e.target === checkoutOverlay) closeCheckout();
  });

  document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();
    document.getElementById('formMsg').textContent = "✓ Message sent — we'll reply within a day.";
    this.reset();
  });
}

/* ---------------- INIT ---------------- */
document.addEventListener('DOMContentLoaded', () => {
  renderFilters();
  renderShelf();
  renderMarquee();
  updateCartUI();
  wireStaticEvents();
});
