/* ===================================================================
   🌾 RYTHUMITRA — Screen 06: Market Prices (Mandi Bhav)
   Verified Mandi Rates with Search, District Filters, Price Trends & e-NAM
   =================================================================== */

window.RythuMarketView = {
  selectedDistrict: 'all',
  searchQuery: '',

  init() {
    this.render();
    this.bindEvents();
    window.addEventListener('rythu:lang-changed', () => this.render());
  },

  bindEvents() {
    const container = document.getElementById('view-market');
    if (!container) return;

    // Search input
    container.addEventListener('input', (e) => {
      if (e.target.id === 'marketSearchInput') {
        this.searchQuery = e.target.value.toLowerCase().trim();
        this.renderTable();
      }
    });

    // District filter
    container.addEventListener('change', (e) => {
      if (e.target.id === 'marketDistrictSelect') {
        this.selectedDistrict = e.target.value;
        this.renderTable();
      }
    });
  },

  render() {
    const container = document.getElementById('view-market');
    if (!container) return;

    const isTe = window.RythuI18n.currentLang === 'te';
    const allData = window.RYTHU_MARKETS_DATA || [];
    const districts = Array.from(new Set(allData.map(d => d.district)));

    container.innerHTML = `
      <!-- Title -->
      <div style="margin-bottom:1.5rem;">
        <h1 style="font-size:1.85rem; font-weight:800; color:var(--text-main); margin-bottom:0.25rem;">
          💰 ${isTe ? "వ్యవసాయ మార్కెట్ ధరలు (మండి భావ్)" : "Agricultural Market Prices (Mandi Bhav)"}
        </h1>
        <p style="color:var(--text-muted); font-size:0.95rem;">
          ${isTe ? "ఈ-నామ్ (e-NAM) మరియు అగ్‌మార్క్‌నెట్ ద్వారా ఏపీ, తెలంగాణ మార్కెట్ యార్డుల తాజా ధరల నివేదిక" : "Real-time commodity arrival and modal prices from verified APMC market yards"}
        </p>
      </div>

      <!-- Price Highlights Carousel / Highlights -->
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(210px, 1fr)); gap:1rem; margin-bottom:1.75rem;">
        <div style="background:#fff; border:1px solid var(--border-subtle); border-radius:var(--radius-lg); padding:1.25rem; box-shadow:var(--shadow-sm);">
          <div style="font-size:0.75rem; color:var(--text-subtle); font-weight:700; text-transform:uppercase;">
            🥜 ${isTe ? "వేరుశనగ (కడప యార్డ్)" : "Groundnut (Kadapa Yard)"}
          </div>
          <div style="font-size:1.5rem; font-weight:800; color:var(--primary-800); margin:0.3rem 0;">
            ₹6,250 <span style="font-size:0.8rem; font-weight:600; color:var(--text-muted);">/ Quintal</span>
          </div>
          <div style="font-size:0.8rem; color:#16a34a; font-weight:700;">
            🔺 +₹150 (2.4%) ${isTe ? "ఈరోజు పెరిగింది" : "Up Today"}
          </div>
        </div>

        <div style="background:#fff; border:1px solid var(--border-subtle); border-radius:var(--radius-lg); padding:1.25rem; box-shadow:var(--shadow-sm);">
          <div style="font-size:0.75rem; color:var(--text-subtle); font-weight:700; text-transform:uppercase;">
            🌾 ${isTe ? "వరి (బి.పి.టి 5204 సన్నాలు)" : "Paddy (BPT Fine - Nellore)"}
          </div>
          <div style="font-size:1.5rem; font-weight:800; color:var(--primary-800); margin:0.3rem 0;">
            ₹2,950 <span style="font-size:0.8rem; font-weight:600; color:var(--text-muted);">/ Quintal</span>
          </div>
          <div style="font-size:0.8rem; color:#16a34a; font-weight:700;">
            🔺 +₹80 (2.7%) ${isTe ? "నిలకడగా ఉంది" : "Steady Demand"}
          </div>
        </div>

        <div style="background:#fff; border:1px solid var(--border-subtle); border-radius:var(--radius-lg); padding:1.25rem; box-shadow:var(--shadow-sm);">
          <div style="font-size:0.75rem; color:var(--text-subtle); font-weight:700; text-transform:uppercase;">
            🌶️ ${isTe ? "ఎర్ర మిర్చి (గుంటూరు తేజ)" : "Red Chilli (Guntur Teja)"}
          </div>
          <div style="font-size:1.5rem; font-weight:800; color:var(--accent-600); margin:0.3rem 0;">
            ₹20,500 <span style="font-size:0.8rem; font-weight:600; color:var(--text-muted);">/ Quintal</span>
          </div>
          <div style="font-size:0.8rem; color:#16a34a; font-weight:700;">
            🔺 +₹650 (3.2%) ${isTe ? "ఎగుమతుల డిమాండ్" : "Export Surge"}
          </div>
        </div>
      </div>

      <!-- Search & District Filter Controls -->
      <div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center; margin-bottom:1.5rem;">
        <div style="flex:1; min-width:240px; position:relative;">
          <input 
            type="text" 
            id="marketSearchInput" 
            class="form-control" 
            style="padding-left:2.6rem; border-radius:var(--radius-pill);"
            placeholder="${isTe ? 'పంట పేరు లేదా మార్కెట్ యార్డ్ పేరుతో వెతకండి...' : 'Search crop name or market yard...'}"
            value="${this.searchQuery}"
          />
          <span style="position:absolute; left:1rem; top:50%; transform:translateY(-50%); color:var(--text-subtle);">
            🔍
          </span>
        </div>

        <div style="display:flex; align-items:center; gap:0.5rem;">
          <label style="font-weight:700; font-size:0.88rem; color:var(--text-muted); white-space:nowrap;">
            🏛️ ${isTe ? "జిల్లా:" : "District:"}
          </label>
          <select id="marketDistrictSelect" class="form-control" style="width:auto; padding:0.5rem 1rem; border-radius:var(--radius-pill);">
            <option value="all">${isTe ? "అన్ని జిల్లాలు" : "All Districts"}</option>
            ${districts.map(d => `<option value="${d}" ${d === this.selectedDistrict ? 'selected' : ''}>${d}</option>`).join('')}
          </select>
        </div>
      </div>

      <!-- Mandi Table Card -->
      <div class="market-table-card">
        <div class="market-table-header">
          <div>
            <h3 style="font-size:1.1rem; font-weight:800; color:var(--text-main);">
              ${isTe ? "ప్రత్యక్ష మార్కెట్ ధరల పట్టిక" : "Live APMC Mandi Price Sheet"}
            </h3>
            <p style="font-size:0.8rem; color:var(--text-muted);">
              ${isTe ? "ధరలన్నీ క్వింటాలుకు (100 కిలోలు) రూపాయిలలో ఉంటాయి" : "Prices quoted in ₹ per Quintal (100 kg) unless specified"}
            </p>
          </div>
          <div style="font-size:0.8rem; color:var(--text-subtle);">
            📡 Verified Source: <strong>e-NAM / AGMARKNET</strong>
          </div>
        </div>

        <div class="table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th>${isTe ? "పంట పేరు / రకం" : "Commodity / Variety"}</th>
                <th>${isTe ? "మార్కెట్ యార్డ్" : "Market Yard"}</th>
                <th>${isTe ? "కనిష్ట ధర" : "Min Price"}</th>
                <th>${isTe ? "గరిష్ట ధర" : "Max Price"}</th>
                <th>${isTe ? "సగటు (మోడల్) ధర" : "Modal Price"}</th>
                <th>${isTe ? "ట్రెండ్" : "Trend"}</th>
                <th>${isTe ? "తాజాకరించిన సమయం" : "Last Updated"}</th>
              </tr>
            </thead>
            <tbody id="marketTableBody"></tbody>
          </table>
        </div>
      </div>
    `;

    this.renderTable();
  },

  renderTable() {
    const tbody = document.getElementById('marketTableBody');
    if (!tbody) return;

    const isTe = window.RythuI18n.currentLang === 'te';
    const items = window.RYTHU_MARKETS_DATA || [];

    const filtered = items.filter(item => {
      const matchDistrict = this.selectedDistrict === 'all' || item.district === this.selectedDistrict;
      const matchSearch = !this.searchQuery ||
        item.cropNameEn.toLowerCase().includes(this.searchQuery) ||
        item.cropNameTe.toLowerCase().includes(this.searchQuery) ||
        item.market.toLowerCase().includes(this.searchQuery) ||
        item.district.toLowerCase().includes(this.searchQuery);
      return matchDistrict && matchSearch;
    });

    if (filtered.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="7" style="text-align:center; padding:2rem; color:var(--text-muted);">
            ${isTe ? "ఎటువంటి మార్కెట్ ధరలు కనుగొనబడలేదు" : "No market price records found for this query."}
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = filtered.map(item => `
      <tr>
        <td>
          <div style="font-weight:800; color:var(--text-main);">${isTe ? item.cropNameTe : item.cropNameEn}</div>
          <div style="font-size:0.75rem; color:var(--text-subtle);">${item.variety}</div>
        </td>
        <td>
          <div style="font-weight:700;">${isTe ? item.marketTe : item.market}</div>
          <div style="font-size:0.75rem; color:var(--text-muted);">${item.district}, ${item.state}</div>
        </td>
        <td style="color:var(--text-muted); font-weight:600;">₹${item.minPrice.toLocaleString('en-IN')}</td>
        <td style="color:var(--text-muted); font-weight:600;">₹${item.maxPrice.toLocaleString('en-IN')}</td>
        <td>
          <span class="price-modal-badge">₹${item.modalPrice.toLocaleString('en-IN')}</span>
        </td>
        <td>
          ${item.trend === 'up' 
            ? `<span class="price-trend-up">▲ ${item.change}</span>` 
            : item.trend === 'down' 
              ? `<span class="price-trend-down">▼ ${item.change}</span>` 
              : `<span style="color:var(--text-subtle); font-weight:700;">— ₹0</span>`
          }
        </td>
        <td style="font-size:0.8rem; color:var(--text-subtle);">
          <div>${item.lastUpdated}</div>
          <div style="font-size:0.72rem; color:var(--primary-700);">${item.source}</div>
        </td>
      </tr>
    `).join('');
  }
};
