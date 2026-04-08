/* =============================================
   GymForge - Main JavaScript (main.js)
   Gym Equipment & Services Web Application
   ============================================= */

/* ---- Namespace ---- */
const GF = {

  /* ---- Toast Notification ---- */
  toast(msg, type = 'success', duration = 3000) {
    const el = document.getElementById('gf-toast');
    if (!el) return;
    el.textContent = msg;
    el.className = type;
    el.style.display = 'block';
    setTimeout(() => { el.style.display = 'none'; }, duration);
  },

  /* ---- Session Helpers (simulating server session via sessionStorage) ---- */
  getUser() {
    try { return JSON.parse(sessionStorage.getItem('gf_user')); } catch { return null; }
  },
  setUser(user) {
    sessionStorage.setItem('gf_user', JSON.stringify(user));
  },
  logout() {
    sessionStorage.removeItem('gf_user');
    window.location.href = '../index.html';
  },
  requireLogin() {
    if (!GF.getUser()) {
      window.location.href = '../pages/login.html';
      return false;
    }
    return true;
  },
  redirectIfLoggedIn() {
    if (GF.getUser()) {
      window.location.href = '../pages/dashboard.html';
    }
  },

  /* ---- Input Validation ---- */
  validate: {
    required(val) { return val.trim().length > 0; },
    email(val)    { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim()); },
    phone(val)    { return /^\+?[\d\s\-()]{7,15}$/.test(val.trim()); },
    minLen(val, n){ return val.trim().length >= n; },
    match(a, b)   { return a === b; },
    numeric(val)  { return /^\d+(\.\d+)?$/.test(val.trim()); },
  },

  /* ---- Show / hide field error ---- */
  showError(inputEl, msg) {
    if (!inputEl) return;
    inputEl.classList.add('is-invalid');
    inputEl.classList.remove('is-valid');
    const errEl = inputEl.parentElement.querySelector('.gf-error');
    if (errEl) { errEl.textContent = msg; errEl.classList.add('show'); }
  },
  clearError(inputEl) {
    if (!inputEl) return;
    inputEl.classList.remove('is-invalid');
    inputEl.classList.add('is-valid');
    const errEl = inputEl.parentElement.querySelector('.gf-error');
    if (errEl) errEl.classList.remove('show');
  },
  clearAll(form) {
    form.querySelectorAll('.gf-input').forEach(el => {
      el.classList.remove('is-invalid', 'is-valid');
    });
    form.querySelectorAll('.gf-error').forEach(el => el.classList.remove('show'));
  },

  /* ---- Inject Navbar ---- */
  renderNavbar(activePage = '') {
    const user = GF.getUser();
    
    // Detect if we're on home page or in pages folder
    const isHomePage = window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/');
    const basePath = isHomePage ? 'pages/' : '';
    const homePath = isHomePage ? '#' : '../index.html';
    
    const publicLinks = `
      <li class="nav-item"><a class="nav-link ${activePage==='home'?'active':''}" href="${homePath}"><i class="fa-solid fa-home"></i> <span>Home</span></a></li>
      <li class="nav-item"><a class="nav-link ${activePage==='machines'?'active':''}" href="${basePath}machines.html"><i class="fa-solid fa-dumbbell"></i> <span>Machines</span></a></li>
      <li class="nav-item"><a class="nav-link ${activePage==='services'?'active':''}" href="${basePath}services.html"><i class="fa-solid fa-wrench"></i> <span>Services</span></a></li>
    `;
    const authLinks = user
      ? `<li class="nav-item"><a class="nav-link ${activePage==='dashboard'?'active':''}" href="${basePath}dashboard.html"><i class="fa-solid fa-chart-line"></i> <span>Dashboard</span></a></li>
         <li class="nav-item"><a class="nav-link" href="#" id="nav-logout"><i class="fa-solid fa-sign-out-alt"></i> <span>Logout</span></a></li>`
      : `<li class="nav-item"><a class="nav-link ${activePage==='login'?'active':''}" href="${basePath}login.html"><i class="fa-solid fa-sign-in-alt"></i> <span>Login</span></a></li>
         <li class="nav-item"><a class="btn-primary-gf ms-2" href="${basePath}register.html"><i class="fa-solid fa-user-plus"></i> <span>Register</span></a></li>`;

    const html = `
    <nav class="navbar navbar-expand-lg">
      <div class="container">
        <a class="navbar-brand" href="${isHomePage ? '#' : '../index.html'}"><i class="fa-solid fa-dumbbell"></i> GYM<span>FORGE</span></a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navMenu">
          <ul class="navbar-nav ms-auto align-items-center gap-2">
            ${publicLinks}${authLinks}
          </ul>
        </div>
      </div>
    </nav>`;

    const navHolder = document.getElementById('gf-navbar');
    if (navHolder) navHolder.innerHTML = html;

    // Logout handler
    document.getElementById('nav-logout')?.addEventListener('click', e => {
      e.preventDefault();
      GF.logout();
    });
  },

  /* ---- Inject Footer ---- */
  renderFooter() {
    const html = `
    <footer class="gf-footer">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-md-4 mb-2 mb-md-0">
            <div class="footer-brand">GYMFORGE</div>
            <div class="mt-1 text-muted-gf" style="font-size:0.78rem;letter-spacing:1px;">EQUIPMENT &amp; SERVICES</div>
          </div>
          <div class="col-md-4 text-center mb-2 mb-md-0">
            <small style="color:#555;">© 2025 GymForge. All rights reserved.</small>
          </div>
          <div class="col-md-4 text-md-end">
            <a href="../pages/machines.html" class="me-3" style="color:#555;font-size:0.85rem;">Machines</a>
            <a href="../pages/services.html" class="me-3" style="color:#555;font-size:0.85rem;">Services</a>
            <a href="../pages/login.html" style="color:#555;font-size:0.85rem;">Login</a>
          </div>
        </div>
      </div>
    </footer>`;
    const holder = document.getElementById('gf-footer');
    if (holder) holder.innerHTML = html;
  },

  /* ---- Toast element ---- */
  injectToast() {
    if (!document.getElementById('gf-toast')) {
      const el = document.createElement('div');
      el.id = 'gf-toast';
      document.body.appendChild(el);
    }
  },

  /* ---- Format currency ---- */
  formatCurrency(n) { return 'OMR ' + Number(n).toFixed(2); },

  /* ---- Format date ---- */
  formatDate(d) {
    if (!d) return '—';
    return new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  },
};

/* ---- On DOM ready ---- */
document.addEventListener('DOMContentLoaded', () => {
  GF.injectToast();
});
