/* ===================================================================
   🌾 RYTHUMITRA — Screen 03 & Screen 04: Crop Guide & Detailed Advisory
   =================================================================== */

window.RythuCropGuide = {
  currentCategory: 'all',
  searchQuery: '',

  init() {
    this.render();
    this.bindEvents();
    window.addEventListener('rythu:lang-changed', () => this.render());
  },

  bindEvents() {
    const container = document.getElementById('view-crops');
    if (!container) return;

    // Delegate category tab clicks
    container.addEventListener('click', (e) => {
      const tab = e.target.closest('.filter-tab');
      if (tab) {
        container.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        this.currentCategory = tab.getAttribute('data-cat') || 'all';
        this.renderCards();
      }
    });

    // Search input
    const searchInput = document.getElementById('cropSearchInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value.toLowerCase().trim();
        this.renderCards();
      });
    }
  },

  render() {
    const container = document.getElementById('view-crops');
    if (!container) return;

    const isTe = window.RythuI18n.currentLang === 'te';

    container.innerHTML = `
      <!-- Header -->
      <div style="margin-bottom:1.5rem;">
        <h1 style="font-size:1.85rem; font-weight:800; color:var(--text-main); margin-bottom:0.25rem;">
          🌱 ${isTe ? "పంటల సాగు మార్గదర్శి" : "Crop Advisory & Cultivation Guide"}
        </h1>
        <p style="color:var(--text-muted); font-size:0.95rem;">
          ${isTe ? "ఆంధ్రప్రదేశ్ మరియు భారతదేశ వ్యవసాయ వాతావరణానికి అనువైన శాస్త్రీయ సాగు వివరాలు" : "Scientific package of practices for maximum yield and soil preservation"}
        </p>
      </div>

      <!-- Search Bar -->
      <div style="margin-bottom:1.5rem; max-width:600px;">
        <div style="position:relative;">
          <input 
            type="text" 
            id="cropSearchInput" 
            class="form-control" 
            style="padding-left:2.8rem; border-radius:var(--radius-pill);"
            placeholder="${isTe ? 'పంట పేరుతో వెతకండి (ఉదా: వేరుశనగ, వరి, పత్తి)...' : 'Search for a crop (e.g., Groundnut, Paddy, Cotton)...'}"
            value="${this.searchQuery}"
          />
          <span style="position:absolute; left:1rem; top:50%; transform:translateY(-50%); font-size:1.1rem; color:var(--text-subtle);">
            🔍
          </span>
        </div>
      </div>

      <!-- Category Filter Tabs -->
      <div class="filter-tabs">
        <button class="filter-tab ${this.currentCategory === 'all' ? 'active' : ''}" data-cat="all">
          ${isTe ? "అన్ని పంటలు" : "All Crops"}
        </button>
        <button class="filter-tab ${this.currentCategory === 'foodcrops' ? 'active' : ''}" data-cat="foodcrops">
          🌾 ${isTe ? "ఆహార పంటలు" : "Food Crops"}
        </button>
        <button class="filter-tab ${this.currentCategory === 'oilseeds' ? 'active' : ''}" data-cat="oilseeds">
          🥜 ${isTe ? "నూనెగింజలు" : "Oil Seeds"}
        </button>
        <button class="filter-tab ${this.currentCategory === 'commercial' ? 'active' : ''}" data-cat="commercial">
          🌿 ${isTe ? "వాణిజ్య పంటలు" : "Commercial Crops"}
        </button>
        <button class="filter-tab ${this.currentCategory === 'vegetables' ? 'active' : ''}" data-cat="vegetables">
          🍅 ${isTe ? "కూరగాయలు" : "Vegetables"}
        </button>
      </div>

      <!-- Crops Grid -->
      <div id="cropsCardsContainer" class="cards-grid"></div>
    `;

    this.renderCards();
  },

  renderCards() {
    const grid = document.getElementById('cropsCardsContainer');
    if (!grid) return;

    const isTe = window.RythuI18n.currentLang === 'te';
    const crops = window.RYTHU_CROPS_DATA || [];

    const filtered = crops.filter(crop => {
      const matchCat = this.currentCategory === 'all' || crop.category === this.currentCategory;
      const matchSearch = !this.searchQuery || 
        crop.nameEn.toLowerCase().includes(this.searchQuery) ||
        crop.nameTe.toLowerCase().includes(this.searchQuery) ||
        crop.category.toLowerCase().includes(this.searchQuery);
      return matchCat && matchSearch;
    });

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div style="grid-column:1/-1; text-align:center; padding:3rem; background:#fff; border-radius:var(--radius-lg); border:1px dashed var(--border-subtle);">
          <div style="font-size:2.5rem; margin-bottom:0.5rem;">🌾</div>
          <h3 style="font-weight:700; color:var(--text-main); margin-bottom:0.25rem;">
            ${isTe ? "పంటలు కనుగొనబడలేదు" : "No Crops Found"}
          </h3>
          <p style="color:var(--text-muted); font-size:0.9rem;">
            ${isTe ? "దయచేసి ఇతర కీవర్డ్ తో వెతకండి" : "Try adjusting your search or category filter"}
          </p>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map(crop => `
      <div class="crop-card">
        <div class="crop-card-img-wrap">
          <img src="${crop.image}" alt="${crop.nameEn}" class="crop-card-img" loading="lazy" />
          <div class="crop-card-badge">${crop.category.toUpperCase()}</div>
        </div>
        <div class="crop-card-body">
          <div class="crop-card-names">
            <h3 class="crop-card-name-en">${crop.nameEn}</h3>
            <span class="crop-card-name-te">${crop.nameTe}</span>
          </div>
          <div class="crop-card-category">
            📅 ${isTe ? crop.seasonTe : crop.season} • ⏱️ ${isTe ? crop.durationTe : crop.duration}
          </div>

          <div class="crop-card-specs">
            <div class="spec-item">
              <span class="spec-label">${isTe ? "నేల రకం" : "Soil"}</span>
              <span class="spec-val" style="font-size:0.75rem; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
                ${isTe ? crop.soilTe : crop.soil}
              </span>
            </div>
            <div class="spec-item">
              <span class="spec-label">${isTe ? "ఆశించే దిగుబడి" : "Yield"}</span>
              <span class="spec-val" style="font-size:0.75rem;">
                ${isTe ? crop.expectedYieldTe : crop.expectedYield}
              </span>
            </div>
          </div>

          <p style="font-size:0.84rem; color:var(--text-muted); line-height:1.45; margin-bottom:1rem; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden;">
            ${isTe ? crop.overviewTe : crop.overview}
          </p>

          <div class="crop-card-footer">
            <button class="btn btn-primary btn-sm" style="width:100%;" onclick="window.RythuCropGuide.openCropDetail('${crop.id}')">
              <span>📖</span> <span>${isTe ? "సాగు మార్గదర్శి చూడండి →" : "View Full Guide →"}</span>
            </button>
          </div>
        </div>
      </div>
    `).join('');
  },

  openCropDetail(cropId) {
    const crop = (window.RYTHU_CROPS_DATA || []).find(c => c.id === cropId);
    if (!crop) return;

    const isTe = window.RythuI18n.currentLang === 'te';
    const modalContent = document.getElementById('cropDetailModalContent');
    if (!modalContent) return;

    modalContent.innerHTML = `
      <!-- Hero Crop Header -->
      <div style="position:relative; height:220px; border-radius:var(--radius-lg); overflow:hidden; margin-bottom:1.5rem;">
        <img src="${crop.image}" alt="${crop.nameEn}" style="width:100%; height:100%; object-fit:cover;" />
        <div style="position:absolute; bottom:0; left:0; right:0; padding:1.25rem; background:linear-gradient(transparent, rgba(15, 61, 23, 0.95)); color:#fff;">
          <h2 style="font-size:1.6rem; font-weight:800;">${crop.nameEn} <span style="font-size:1.2rem; font-weight:600; color:var(--accent-400);">(${crop.nameTe})</span></h2>
          <div style="font-size:0.85rem; opacity:0.9;">
            ${crop.category.toUpperCase()} • ${isTe ? crop.seasonTe : crop.season} • ${isTe ? crop.durationTe : crop.duration}
          </div>
        </div>
      </div>

      <!-- Quick Metrics Bar -->
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(140px, 1fr)); gap:0.75rem; background:var(--bg-surface-alt); padding:1rem; border-radius:var(--radius-md); margin-bottom:1.5rem;">
        <div>
          <div style="font-size:0.72rem; color:var(--text-subtle); font-weight:700;">🌡️ ${isTe ? "వాతావరణం" : "CLIMATE"}</div>
          <div style="font-size:0.85rem; font-weight:700; color:var(--text-main);">${isTe ? crop.climateTe : crop.climate}</div>
        </div>
        <div>
          <div style="font-size:0.72rem; color:var(--text-subtle); font-weight:700;">🧪 ${isTe ? "నేల" : "SOIL"}</div>
          <div style="font-size:0.85rem; font-weight:700; color:var(--text-main);">${isTe ? crop.soilTe : crop.soil}</div>
        </div>
        <div>
          <div style="font-size:0.72rem; color:var(--text-subtle); font-weight:700;">📏 ${isTe ? "ఎడం" : "SPACING"}</div>
          <div style="font-size:0.85rem; font-weight:700; color:var(--text-main);">${isTe ? crop.spacingTe : crop.spacing}</div>
        </div>
        <div>
          <div style="font-size:0.72rem; color:var(--text-subtle); font-weight:700;">🌾 ${isTe ? "విత్తన మోతాదు" : "SEED RATE"}</div>
          <div style="font-size:0.85rem; font-weight:700; color:var(--text-main);">${isTe ? crop.seedRateTe : crop.seedRate}</div>
        </div>
      </div>

      <!-- Detail Tabs (Overview, Cultivation, Irrigation, Fertilizer, Diseases, Harvest) -->
      <div style="display:flex; flex-direction:column; gap:1.25rem;">
        <div style="background:#fff; border:1px solid var(--border-subtle); border-radius:var(--radius-md); padding:1.25rem;">
          <h4 style="font-size:1rem; font-weight:800; color:var(--primary-800); margin-bottom:0.5rem; display:flex; align-items:center; gap:0.4rem;">
            <span>🌱</span> ${isTe ? "సాగు విధానం & విత్తనశుద్ధి" : "Cultivation & Sowing"}
          </h4>
          <p style="font-size:0.9rem; color:var(--text-main); line-height:1.55;">
            ${isTe ? crop.cultivationTe : crop.cultivation}
          </p>
        </div>

        <div style="background:#fff; border:1px solid var(--border-subtle); border-radius:var(--radius-md); padding:1.25rem;">
          <h4 style="font-size:1rem; font-weight:800; color:#0369a1; margin-bottom:0.5rem; display:flex; align-items:center; gap:0.4rem;">
            <span>💧</span> ${isTe ? "నీటి యాజమాన్యం" : "Irrigation Management"}
          </h4>
          <p style="font-size:0.9rem; color:var(--text-main); line-height:1.55;">
            ${isTe ? crop.irrigationTe : crop.irrigation}
          </p>
        </div>

        <div style="background:#fff; border:1px solid var(--border-subtle); border-radius:var(--radius-md); padding:1.25rem;">
          <h4 style="font-size:1rem; font-weight:800; color:var(--accent-700); margin-bottom:0.5rem; display:flex; align-items:center; gap:0.4rem;">
            <span>🧪</span> ${isTe ? "ఎరువుల యాజమాన్యం (NPK)" : "Fertilizer & Nutrition (NPK)"}
          </h4>
          <p style="font-size:0.9rem; color:var(--text-main); line-height:1.55;">
            ${isTe ? crop.fertilizerTe : crop.fertilizer}
          </p>
        </div>

        <div style="background:#fff; border:1px solid var(--border-subtle); border-radius:var(--radius-md); padding:1.25rem;">
          <h4 style="font-size:1rem; font-weight:800; color:#b91c1c; margin-bottom:0.5rem; display:flex; align-items:center; gap:0.4rem;">
            <span>🐛</span> ${isTe ? "ప్రధాన చీడపీడలు & తెగుళ్లు" : "Major Pests & Diseases"}
          </h4>
          <div style="font-size:0.88rem; margin-bottom:0.4rem;">
            <strong>${isTe ? "పురుగులు:" : "Pests:"}</strong> ${isTe ? crop.pestsTe : crop.pests}
          </div>
          <div style="font-size:0.88rem;">
            <strong>${isTe ? "తెగుళ్లు:" : "Diseases:"}</strong> ${isTe ? crop.diseasesTe : crop.diseases}
          </div>
        </div>

        <div style="background:#fff; border:1px solid var(--border-subtle); border-radius:var(--radius-md); padding:1.25rem;">
          <h4 style="font-size:1rem; font-weight:800; color:var(--primary-700); margin-bottom:0.5rem; display:flex; align-items:center; gap:0.4rem;">
            <span>🌾</span> ${isTe ? "పంట కోత & దిగుబడి" : "Harvesting & Yield"}
          </h4>
          <p style="font-size:0.9rem; color:var(--text-main); line-height:1.55; margin-bottom:0.4rem;">
            ${isTe ? crop.harvestingTe : crop.harvesting}
          </p>
          <div style="font-weight:700; color:var(--accent-700); font-size:0.9rem;">
            ${isTe ? "ఆశించే దిగుబడి:" : "Expected Yield:"} ${isTe ? crop.expectedYieldTe : crop.expectedYield}
          </div>
        </div>

        <!-- Official Agronomic Attribution Note -->
        <div style="background:var(--bg-surface-alt); padding:0.75rem 1rem; border-radius:var(--radius-md); font-size:0.78rem; color:var(--text-subtle);">
          ℹ️ <strong>Source:</strong> Acharya N.G. Ranga Agricultural University (ANGRAU) & ICAR Package of Practices.
        </div>
      </div>
    `;

    window.RythuModals.openModal('cropDetailModal');
  }
};
