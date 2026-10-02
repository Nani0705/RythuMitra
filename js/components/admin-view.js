/* ===================================================================
   🌾 RYTHUMITRA — Screen 26: Admin Portal
   System Metrics, Crop Catalog Management & Welfare Scheme Moderation
   =================================================================== */

window.RythuAdminView = {
  currentTab: 'overview',

  init() {
    this.render();
    this.bindEvents();
    window.addEventListener('rythu:lang-changed', () => this.render());
  },

  bindEvents() {
    const container = document.getElementById('view-admin');
    if (!container) return;

    container.addEventListener('click', (e) => {
      const tab = e.target.closest('.admin-tab-btn');
      if (tab) {
        container.querySelectorAll('.admin-tab-btn').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        this.currentTab = tab.getAttribute('data-tab') || 'overview';
        this.renderTabContent();
      }
    });
  },

  render() {
    const container = document.getElementById('view-admin');
    if (!container) return;

    const isTe = window.RythuI18n.currentLang === 'te';

    container.innerHTML = `
      <!-- Header -->
      <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:1rem; margin-bottom:1.5rem;">
        <div>
          <div style="display:flex; align-items:center; gap:0.5rem; margin-bottom:0.25rem;">
            <h1 style="font-size:1.85rem; font-weight:800; color:var(--text-main);">
              ⚙️ ${isTe ? "రైతుమిత్ర అడ్మిన్ డాష్‌బోర్డ్" : "RythuMitra Administration Portal"}
            </h1>
            <span class="badge badge-success">CSP Evaluator Mode</span>
          </div>
          <p style="color:var(--text-muted); font-size:0.95rem;">
            ${isTe ? "రైతుల డేటా, పంటల కేటలాగ్, ప్రభుత్వ పథకాలు మరియు సిస్టమ్ పర్యవేక్షణ" : "Manage crop guides, welfare schemes, disease datasets, and database health"}
          </p>
        </div>

        <div style="display:flex; gap:0.6rem;">
          <button class="btn btn-secondary btn-sm" onclick="window.RythuModals.openModal('firebaseModal')">
            🔥 Firebase Live Config
          </button>
        </div>
      </div>

      <!-- Telemetry Metric Cards (PRD Section 26) -->
      <div class="metrics-row">
        <div class="metric-card">
          <div class="metric-icon-box" style="background:#dcfce7; color:#15803d;">
            👨‍🌾
          </div>
          <div>
            <div style="font-size:0.75rem; font-weight:700; color:var(--text-subtle); text-transform:uppercase;">
              ${isTe ? "నమోదైన రైతులు" : "Users / Farmers"}
            </div>
            <div style="font-size:1.6rem; font-weight:800; color:var(--text-main);">1,248</div>
            <div style="font-size:0.75rem; color:#16a34a; font-weight:700;">+32 this week</div>
          </div>
        </div>

        <div class="metric-card">
          <div class="metric-icon-box" style="background:#e0f2fe; color:#0369a1;">
            🌾
          </div>
          <div>
            <div style="font-size:0.75rem; font-weight:700; color:var(--text-subtle); text-transform:uppercase;">
              ${isTe ? "సాగు భూములు" : "Farms Recorded"}
            </div>
            <div style="font-size:1.6rem; font-weight:800; color:var(--text-main);">834</div>
            <div style="font-size:0.75rem; color:#0284c7; font-weight:700;">3,420 Acres total</div>
          </div>
        </div>

        <div class="metric-card">
          <div class="metric-icon-box" style="background:#fef3c7; color:#b45309;">
            🌱
          </div>
          <div>
            <div style="font-size:0.75rem; font-weight:700; color:var(--text-subtle); text-transform:uppercase;">
              ${isTe ? "పంట రకాలు" : "Catalog Crops"}
            </div>
            <div style="font-size:1.6rem; font-weight:800; color:var(--text-main);">42</div>
            <div style="font-size:0.75rem; color:var(--accent-600); font-weight:700;">6 AP regions</div>
          </div>
        </div>

        <div class="metric-card">
          <div class="metric-icon-box" style="background:#f3e8ff; color:#7e22ce;">
            📰
          </div>
          <div>
            <div style="font-size:0.75rem; font-weight:700; color:var(--text-subtle); text-transform:uppercase;">
              ${isTe ? "సాగు వ్యాసాలు" : "Articles & Advisories"}
            </div>
            <div style="font-size:1.6rem; font-weight:800; color:var(--text-main);">68</div>
            <div style="font-size:0.75rem; color:#7e22ce; font-weight:700;">ANGRAU verified</div>
          </div>
        </div>
      </div>

      <!-- Admin Tabs Navigation -->
      <div class="filter-tabs" style="margin-bottom:1.5rem;">
        <button class="filter-tab admin-tab-btn ${this.currentTab === 'overview' ? 'active' : ''}" data-tab="overview">
          📊 ${isTe ? "సిస్టమ్ సారాంశం" : "System Overview"}
        </button>
        <button class="filter-tab admin-tab-btn ${this.currentTab === 'crops' ? 'active' : ''}" data-tab="crops">
          🌱 ${isTe ? "పంటల కేటలాగ్" : "Crop Catalog"}
        </button>
        <button class="filter-tab admin-tab-btn ${this.currentTab === 'schemes' ? 'active' : ''}" data-tab="schemes">
          🏛️ ${isTe ? "సంక్షేమ పథకాలు" : "Schemes Registry"}
        </button>
        <button class="filter-tab admin-tab-btn ${this.currentTab === 'firestore' ? 'active' : ''}" data-tab="firestore">
          🔥 ${isTe ? "ఫైర్‌బేస్ స్థితి" : "Firestore Collections"}
        </button>
      </div>

      <!-- Tab Content Area -->
      <div id="adminTabContent"></div>
    `;

    this.renderTabContent();
  },

  renderTabContent() {
    const tabBody = document.getElementById('adminTabContent');
    if (!tabBody) return;

    const isTe = window.RythuI18n.currentLang === 'te';

    if (this.currentTab === 'crops') {
      const crops = window.RYTHU_CROPS_DATA || [];
      tabBody.innerHTML = `
        <div class="market-table-card">
          <div class="market-table-header">
            <div>
              <h3 style="font-weight:800; font-size:1.1rem; color:var(--text-main);">Master Crop Catalog (${crops.length} items)</h3>
              <p style="font-size:0.8rem; color:var(--text-muted);">Manage verified agronomic practices and duration</p>
            </div>
          </div>
          <div class="table-responsive">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Crop</th>
                  <th>Category</th>
                  <th>Season</th>
                  <th>Duration</th>
                  <th>Expected Yield</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                ${crops.map(c => `
                  <tr>
                    <td><strong>${c.nameEn}</strong><br/><small style="color:var(--primary-700);">${c.nameTe}</small></td>
                    <td><span class="badge badge-info">${c.category}</span></td>
                    <td>${c.season}</td>
                    <td>${c.duration}</td>
                    <td>${c.expectedYield}</td>
                    <td><span class="badge badge-success">Active</span></td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
    } else if (this.currentTab === 'schemes') {
      const schemes = window.RYTHU_SCHEMES_DATA || [];
      tabBody.innerHTML = `
        <div class="market-table-card">
          <div class="market-table-header">
            <div>
              <h3 style="font-weight:800; font-size:1.1rem; color:var(--text-main);">Welfare Schemes Management</h3>
              <p style="font-size:0.8rem; color:var(--text-muted);">Central and AP state farmer welfare schemes</p>
            </div>
          </div>
          <div class="table-responsive">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Scheme Name</th>
                  <th>Jurisdiction</th>
                  <th>Financial Benefit</th>
                  <th>Eligibility</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                ${schemes.map(s => `
                  <tr>
                    <td><strong>${s.nameEn}</strong><br/><small style="color:var(--text-subtle);">${s.nameTe}</small></td>
                    <td><span class="badge ${s.level === 'state' ? 'badge-success' : 'badge-info'}">${s.level.toUpperCase()}</span></td>
                    <td style="font-weight:700; color:var(--primary-800);">${s.amount}</td>
                    <td style="max-width:250px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${s.eligibility}</td>
                    <td><span class="badge badge-success">Verified</span></td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
    } else if (this.currentTab === 'firestore') {
      tabBody.innerHTML = `
        <div style="background:#fff; border:1px solid var(--border-subtle); border-radius:var(--radius-xl); padding:1.5rem; box-shadow:var(--shadow-sm);">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.25rem;">
            <div>
              <h3 style="font-size:1.2rem; font-weight:800; color:var(--text-main);">Cloud Firestore Database Architecture</h3>
              <p style="font-size:0.85rem; color:var(--text-muted);">Structured according to PRD Sections 22 & 23</p>
            </div>
            <span class="badge badge-success">Storage Ready</span>
          </div>

          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(240px, 1fr)); gap:1rem;">
            <div style="background:var(--bg-surface-alt); padding:1rem; border-radius:var(--radius-md); border-left:4px solid var(--primary-600);">
              <div style="font-weight:800; font-size:0.95rem; color:var(--primary-900);">📁 /users/{userId}</div>
              <p style="font-size:0.8rem; color:var(--text-muted); margin-top:0.3rem;">Farmer authentication profile, contact phone, primary district, preferred language</p>
            </div>
            <div style="background:var(--bg-surface-alt); padding:1rem; border-radius:var(--radius-md); border-left:4px solid var(--primary-600);">
              <div style="font-weight:800; font-size:0.95rem; color:var(--primary-900);">📁 /farms/{farmId}</div>
              <p style="font-size:0.8rem; color:var(--text-muted); margin-top:0.3rem;">Land acreage, soil testing records, borewell/canal water facilities, location coordinates</p>
            </div>
            <div style="background:var(--bg-surface-alt); padding:1rem; border-radius:var(--radius-md); border-left:4px solid var(--accent-600);">
              <div style="font-weight:800; font-size:0.95rem; color:var(--accent-700);">📁 /farms/{farmId}/crops/</div>
              <p style="font-size:0.8rem; color:var(--text-muted); margin-top:0.3rem;">Active crops, sowing date, estimated harvest date, fertilizer logs, growth stage</p>
            </div>
            <div style="background:var(--bg-surface-alt); padding:1rem; border-radius:var(--radius-md); border-left:4px solid #0284c7;">
              <div style="font-weight:800; font-size:0.95rem; color:#0284c7;">📁 /marketPrices/</div>
              <p style="font-size:0.8rem; color:var(--text-muted); margin-top:0.3rem;">Daily e-NAM sync rates for Kadapa, Guntur, Kurnool, and Anantapur APMC mandis</p>
            </div>
          </div>
        </div>
      `;
    } else {
      // System Overview
      tabBody.innerHTML = `
        <div style="background:#fff; border:1px solid var(--border-subtle); border-radius:var(--radius-xl); padding:1.5rem; box-shadow:var(--shadow-sm); margin-bottom:1.5rem;">
          <h3 style="font-size:1.15rem; font-weight:800; color:var(--text-main); margin-bottom:0.75rem;">
            🏆 CSP College Project Positioning & Readiness
          </h3>
          <p style="font-size:0.9rem; color:var(--text-muted); line-height:1.6; margin-bottom:1rem;">
            RythuMitra is a multilingual smart digital farming platform built for Indian farmers. The frontend is designed following Google Stitch principles with a modern natural agricultural design language. The backend architecture is powered by Firebase Authentication, Cloud Firestore, and Firebase Storage with verified agronomic guidelines from ANGRAU and real-time Open-Meteo climate data.
          </p>
          <div style="display:flex; flex-wrap:wrap; gap:0.5rem;">
            <span class="badge badge-success">✓ Google Stitch Aesthetic</span>
            <span class="badge badge-success">✓ Telugu + English Bilingual</span>
            <span class="badge badge-success">✓ Mobile-First Architecture</span>
            <span class="badge badge-success">✓ Live Open-Meteo Weather</span>
            <span class="badge badge-success">✓ e-NAM Market Prices</span>
            <span class="badge badge-success">✓ AI Leaf Disease Scanner</span>
            <span class="badge badge-success">✓ Firebase Ready</span>
          </div>
        </div>
      `;
    }
  }
};
