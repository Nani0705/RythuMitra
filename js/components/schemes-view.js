/* ===================================================================
   🌾 RYTHUMITRA — Screen 08: Government Schemes
   Welfare & Input Subsidy Catalog with Central / State Filters & Eligibility
   =================================================================== */

window.RythuSchemesView = {
  currentFilter: 'all',
  searchQuery: '',

  init() {
    this.render();
    this.bindEvents();
    window.addEventListener('rythu:lang-changed', () => this.render());
  },

  bindEvents() {
    const container = document.getElementById('view-schemes');
    if (!container) return;

    container.addEventListener('click', (e) => {
      const tab = e.target.closest('.filter-tab');
      if (tab) {
        container.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        this.currentFilter = tab.getAttribute('data-filter') || 'all';
        this.renderCards();
      }
    });

    const searchInput = document.getElementById('schemeSearchInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value.toLowerCase().trim();
        this.renderCards();
      });
    }
  },

  render() {
    const container = document.getElementById('view-schemes');
    if (!container) return;

    const isTe = window.RythuI18n.currentLang === 'te';

    container.innerHTML = `
      <!-- Title -->
      <div style="margin-bottom:1.5rem;">
        <h1 style="font-size:1.85rem; font-weight:800; color:var(--text-main); margin-bottom:0.25rem;">
          🏛️ ${isTe ? "రైతు సంక్షేమ & ప్రభుత్వ పథకాలు" : "Farmer Government Welfare Schemes"}
        </h1>
        <p style="color:var(--text-muted); font-size:0.95rem;">
          ${isTe ? "రైతు భరోసా, పీఎం కిసాన్, పంట బీమా మరియు సూక్ష్మ నీటిపారుదల రాయితీల సమగ్ర సమాచారం" : "Direct benefit transfer, interest subsidies, crop insurance, and mechanization grants"}
        </p>
      </div>

      <!-- Search Input -->
      <div style="margin-bottom:1.5rem; max-width:600px;">
        <div style="position:relative;">
          <input 
            type="text" 
            id="schemeSearchInput" 
            class="form-control" 
            style="padding-left:2.8rem; border-radius:var(--radius-pill);"
            placeholder="${isTe ? 'పథకం పేరు లేదా లబ్ధి వివరాలతో వెతకండి...' : 'Search scheme name, eligibility or benefit...'}"
            value="${this.searchQuery}"
          />
          <span style="position:absolute; left:1rem; top:50%; transform:translateY(-50%); color:var(--text-subtle);">
            🔍
          </span>
        </div>
      </div>

      <!-- Filter Tabs -->
      <div class="filter-tabs">
        <button class="filter-tab ${this.currentFilter === 'all' ? 'active' : ''}" data-filter="all">
          ${isTe ? "అన్ని పథకాలు" : "All Schemes"}
        </button>
        <button class="filter-tab ${this.currentFilter === 'state' ? 'active' : ''}" data-filter="state">
          🌾 ${isTe ? "ఆంధ్రప్రదేశ్ రాష్ట్ర పథకాలు" : "Andhra Pradesh State"}
        </button>
        <button class="filter-tab ${this.currentFilter === 'central' ? 'active' : ''}" data-filter="central">
          🇮🇳 ${isTe ? "కేంద్ర ప్రభుత్వ పథకాలు" : "Central Government"}
        </button>
      </div>

      <!-- Schemes Cards Grid -->
      <div id="schemesCardsContainer" class="cards-grid"></div>
    `;

    this.renderCards();
  },

  renderCards() {
    const grid = document.getElementById('schemesCardsContainer');
    if (!grid) return;

    const isTe = window.RythuI18n.currentLang === 'te';
    const schemes = window.RYTHU_SCHEMES_DATA || [];

    const filtered = schemes.filter(s => {
      const matchFilter = this.currentFilter === 'all' || s.level === this.currentFilter;
      const matchSearch = !this.searchQuery ||
        s.nameEn.toLowerCase().includes(this.searchQuery) ||
        s.nameTe.toLowerCase().includes(this.searchQuery) ||
        s.benefits.toLowerCase().includes(this.searchQuery) ||
        s.category.toLowerCase().includes(this.searchQuery);
      return matchFilter && matchSearch;
    });

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div style="grid-column:1/-1; text-align:center; padding:3rem; background:#fff; border-radius:var(--radius-lg);">
          <p style="color:var(--text-muted); font-size:0.95rem;">
            ${isTe ? "ఎటువంటి పథకాలు కనుగొనబడలేదు" : "No government schemes match your criteria."}
          </p>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map(s => `
      <div class="crop-card" style="border-top:4px solid var(--primary-600);">
        <div class="crop-card-body">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:0.5rem;">
            <span class="badge ${s.level === 'state' ? 'badge-success' : 'badge-info'}">
              ${s.level === 'state' ? "Andhra Pradesh" : "Central Govt"}
            </span>
            <span class="badge badge-harvest" style="font-weight:800;">
              ${isTe ? s.amountTe : s.amount}
            </span>
          </div>

          <h3 style="font-size:1.2rem; font-weight:800; color:var(--text-main); margin-bottom:0.25rem;">
            ${isTe ? s.nameTe : s.nameEn}
          </h3>
          <div style="font-size:0.8rem; color:var(--text-subtle); margin-bottom:1rem;">
            ${isTe ? s.nameEn : s.nameTe} • ${isTe ? s.categoryTe : s.category}
          </div>

          <div style="background:var(--bg-surface-alt); padding:0.85rem; border-radius:var(--radius-md); margin-bottom:1rem;">
            <div style="font-size:0.75rem; font-weight:700; color:var(--text-subtle);">${isTe ? "అర్హతలు:" : "Eligibility:"}</div>
            <p style="font-size:0.82rem; color:var(--text-main); line-height:1.45; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden;">
              ${isTe ? s.eligibilityTe : s.eligibility}
            </p>
          </div>

          <div style="margin-bottom:1.25rem;">
            <div style="font-size:0.75rem; font-weight:700; color:var(--primary-800);">${isTe ? "ప్రయోజనాలు:" : "Key Benefits:"}</div>
            <p style="font-size:0.82rem; color:var(--text-muted); line-height:1.45; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden;">
              ${isTe ? s.benefitsTe : s.benefits}
            </p>
          </div>

          <div class="crop-card-footer" style="display:flex; gap:0.5rem;">
            <button class="btn btn-primary btn-sm" style="flex:1;" onclick="window.RythuSchemesView.openSchemeModal('${s.id}')">
              <span>📄</span> <span>${isTe ? "వివరాలు & దరఖాస్తు →" : "View Details →"}</span>
            </button>
            <a href="${s.officialLink}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm" title="Official Portal">
              ↗
            </a>
          </div>
        </div>
      </div>
    `).join('');
  },

  openSchemeModal(schemeId) {
    const s = (window.RYTHU_SCHEMES_DATA || []).find(item => item.id === schemeId);
    if (!s) return;

    const isTe = window.RythuI18n.currentLang === 'te';
    const content = document.getElementById('cropDetailModalContent');
    if (!content) return;

    content.innerHTML = `
      <div style="display:flex; align-items:center; gap:0.5rem; margin-bottom:0.5rem;">
        <span class="badge ${s.level === 'state' ? 'badge-success' : 'badge-info'}">
          ${s.level === 'state' ? "Andhra Pradesh State Scheme" : "Central Government Scheme"}
        </span>
        <span class="badge badge-harvest" style="font-weight:800;">${isTe ? s.amountTe : s.amount}</span>
      </div>

      <h2 style="font-size:1.5rem; font-weight:800; color:var(--primary-900); margin-bottom:0.25rem;">
        ${isTe ? s.nameTe : s.nameEn}
      </h2>
      <div style="font-size:0.95rem; color:var(--text-subtle); margin-bottom:1.25rem;">
        (${isTe ? s.nameEn : s.nameTe})
      </div>

      <div style="display:flex; flex-direction:column; gap:1rem;">
        <div style="background:#fff; border:1px solid var(--border-subtle); border-radius:var(--radius-md); padding:1rem;">
          <h4 style="font-weight:700; color:var(--text-main); margin-bottom:0.35rem;">
            👨‍🌾 ${isTe ? "రైతు అర్హతలు:" : "Eligibility Criteria"}
          </h4>
          <p style="font-size:0.9rem; color:var(--text-muted); line-height:1.55;">
            ${isTe ? s.eligibilityTe : s.eligibility}
          </p>
        </div>

        <div style="background:#f0fdf4; border:1px solid var(--border-brand); border-radius:var(--radius-md); padding:1rem;">
          <h4 style="font-weight:700; color:var(--primary-800); margin-bottom:0.35rem;">
            💰 ${isTe ? "ఆర్థిక & ఇతర ప్రయోజనాలు:" : "Financial & Physical Benefits"}
          </h4>
          <p style="font-size:0.9rem; color:#166534; line-height:1.55;">
            ${isTe ? s.benefitsTe : s.benefits}
          </p>
        </div>

        <div style="background:#fff; border:1px solid var(--border-subtle); border-radius:var(--radius-md); padding:1rem;">
          <h4 style="font-weight:700; color:var(--text-main); margin-bottom:0.35rem;">
            📄 ${isTe ? "కావలసిన పత్రాలు / డాక్యుమెంట్లు:" : "Required Documents"}
          </h4>
          <p style="font-size:0.9rem; color:var(--text-muted); line-height:1.55;">
            ${isTe ? s.documentsTe : s.documents}
          </p>
        </div>

        <div style="background:#fff; border:1px solid var(--border-subtle); border-radius:var(--radius-md); padding:1rem;">
          <h4 style="font-weight:700; color:var(--accent-700); margin-bottom:0.35rem;">
            📝 ${isTe ? "దరఖాస్తు చేసుకునే విధానం:" : "Application & Enrollment Procedure"}
          </h4>
          <p style="font-size:0.9rem; color:var(--text-muted); line-height:1.55;">
            ${isTe ? s.applicationProcessTe : s.applicationProcess}
          </p>
        </div>

        <div style="display:flex; justify-content:space-between; align-items:center; background:var(--bg-surface-alt); padding:0.9rem 1.25rem; border-radius:var(--radius-md);">
          <div style="font-size:0.8rem; color:var(--text-subtle);">
            Verified: <strong>${s.verifiedDate}</strong>
          </div>
          <a href="${s.officialLink}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
            <span>🌐</span> <span>${isTe ? "అధికారిక వెబ్‌సైట్ తెరవండి ↗" : "Open Official Portal ↗"}</span>
          </a>
        </div>
      </div>
    `;

    window.RythuModals.openModal('cropDetailModal');
  }
};
