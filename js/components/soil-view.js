/* ===================================================================
   🌾 RYTHUMITRA — Soil Health & Testing Guide
   Soil Types, NPK Balanced Dosage & Local RBK Sampling Protocol
   =================================================================== */

window.RythuSoilView = {
  init() {
    this.render();
    window.addEventListener('rythu:lang-changed', () => this.render());
  },

  render() {
    const container = document.getElementById('view-soil');
    if (!container) return;

    const isTe = window.RythuI18n.currentLang === 'te';
    const soilData = window.RYTHU_SOIL_DATA || { types: [], testingSteps: [] };

    container.innerHTML = `
      <!-- Title -->
      <div style="margin-bottom:1.5rem;">
        <h1 style="font-size:1.85rem; font-weight:800; color:var(--text-main); margin-bottom:0.25rem;">
          🧪 ${isTe ? "నేల ఆరోగ్యం & మట్టి పరీక్షల మార్గదర్శి" : "Soil Health & Nutrient Management Guide"}
        </h1>
        <p style="color:var(--text-muted); font-size:0.95rem;">
          ${isTe ? "నేల రకాలు, NPK సమతుల్య ఎరువులు మరియు రైతు భరోసా కేంద్రం (RBK) ద్వారా మట్టి పరీక్షా విధానం" : "Soil classifications, optimal pH ranges, organic carbon balance, and sampling protocols"}
        </p>
      </div>

      <!-- Soil Health Card Scheme Spotlight -->
      <div style="background:linear-gradient(135deg, #78350f, #92400e); border-radius:var(--radius-xl); color:#fff; padding:1.75rem; margin-bottom:2rem; box-shadow:var(--shadow-card);">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem;">
          <div>
            <span class="badge" style="background:rgba(255,255,255,0.2); color:#fef3c7; margin-bottom:0.4rem; border:1px solid rgba(255,255,255,0.3);">
              🇮🇳 Government of India & AP Agri Dept
            </span>
            <h2 style="font-size:1.45rem; font-weight:800; margin-bottom:0.25rem;">
              📜 ${isTe ? "ఉచిత నేల ఆరోగ్య కార్డు (Soil Health Card)" : "Free Soil Health Card Scheme"}
            </h2>
            <p style="opacity:0.9; font-size:0.9rem; max-width:620px;">
              ${isTe 
                ? "మీ పొలంలోని 12 రకాల పోషకాలను ఉచితంగా పరీక్షించి పంటల వారీగా ఎరువుల మోతాదును కార్డు రూపంలో పొందండి. అనవసర ఎరువుల ఖర్చు 25% వరకు ఆదా చేసుకోండి."
                : "Get 12 macro and micro-nutrients in your field analyzed free at your village RBK. Optimize fertilizer costs and restore fertility."
              }
            </p>
          </div>
          <button class="btn btn-sm" style="background:#fff; color:#78350f; font-weight:800;" onclick="window.RythuNav.navigateTo('schemes')">
            ${isTe ? "పథకం వివరాలు →" : "Scheme Details →"}
          </button>
        </div>
      </div>

      <!-- Soil Types Grid -->
      <div class="section-header">
        <div class="section-title-wrap">
          <div class="section-title">🌱 ${isTe ? "ప్రధాన నేల రకాలు & యాజమాన్యం" : "Major Agricultural Soil Types in AP"}</div>
          <div class="section-subtitle">${isTe ? "మీ నేల స్వభావాన్ని బట్టి పంట ఎంపిక చేసుకోండి" : "Match your crops to natural soil drainage and fertility"}</div>
        </div>
      </div>

      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(300px, 1fr)); gap:1.25rem; margin-bottom:2.5rem;">
        ${soilData.types.map(t => `
          <div style="background:#fff; border:1px solid var(--border-subtle); border-radius:var(--radius-lg); padding:1.5rem; box-shadow:var(--shadow-sm); display:flex; flex-direction:column;">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:0.5rem;">
              <h3 style="font-size:1.15rem; font-weight:800; color:var(--primary-900);">
                ${isTe ? t.nameTe : t.nameEn}
              </h3>
              <span class="badge badge-info" style="font-size:0.75rem;">${isTe ? t.phTe : t.phRange}</span>
            </div>

            <div style="margin-bottom:0.85rem;">
              <div style="font-size:0.75rem; font-weight:700; color:var(--text-subtle);">${isTe ? "లక్షణాలు & అనుకూల పంటలు:" : "Characteristics & Crops:"}</div>
              <p style="font-size:0.85rem; color:var(--text-main); line-height:1.45;">
                ${isTe ? t.characteristicsTe : t.characteristicsEn}
              </p>
            </div>

            <div style="background:var(--bg-surface-alt); padding:0.75rem; border-radius:var(--radius-md); margin-bottom:0.85rem;">
              <div style="font-size:0.75rem; font-weight:700; color:var(--text-subtle);">${isTe ? "పోషకాల స్థితి:" : "Nutrient Profile:"}</div>
              <p style="font-size:0.82rem; color:var(--text-main); line-height:1.4;">
                ${isTe ? t.nutrientStatusTe : t.nutrientStatusEn}
              </p>
            </div>

            <div style="margin-top:auto; font-size:0.82rem; color:var(--primary-800); font-weight:600;">
              💡 <strong>${isTe ? "యాజమాన్య సలహా:" : "Management Tip:"}</strong> ${t.managementTipsEn}
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Soil Sampling Procedure -->
      <div style="background:#fff; border:1px solid var(--border-subtle); border-radius:var(--radius-xl); padding:1.75rem; box-shadow:var(--shadow-sm);">
        <h3 style="font-size:1.2rem; font-weight:800; color:var(--text-main); margin-bottom:0.25rem;">
          🧪 ${isTe ? "మట్టి నమూనా ఎలా సేకరించాలి? (4 సులభ దశలు)" : "How to Collect Soil Samples (4 Easy Steps)"}
        </h3>
        <p style="font-size:0.88rem; color:var(--text-muted); margin-bottom:1.5rem;">
          ${isTe ? "ఖచ్చితమైన పరీక్ష ఫలితాల కోసం శాస్త్రీయ పద్ధతిలో మట్టి నమూనా సేకరించడం ముఖ్యం" : "Follow these standard ICAR protocols before sending your sample to the soil testing lab"}
        </p>

        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:1rem;">
          ${soilData.testingSteps.map(s => `
            <div style="background:var(--bg-surface-alt); border-radius:var(--radius-md); padding:1.25rem; border-top:3px solid var(--primary-600);">
              <div style="width:32px; height:32px; border-radius:50%; background:var(--primary-700); color:#fff; display:flex; align-items:center; justify-content:center; font-weight:800; font-size:0.85rem; margin-bottom:0.75rem;">
                ${s.step}
              </div>
              <h4 style="font-size:0.95rem; font-weight:800; color:var(--text-main); margin-bottom:0.35rem;">
                ${isTe ? s.titleTe : s.titleEn}
              </h4>
              <p style="font-size:0.82rem; color:var(--text-muted); line-height:1.45;">
                ${isTe ? s.descTe : s.descEn}
              </p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }
};
