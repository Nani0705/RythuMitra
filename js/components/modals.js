/* ===================================================================
   🌾 RYTHUMITRA — Modals & Dialogs Component
   Global Search, Add Farm, Add Crop, Firebase Settings, Notifications
   =================================================================== */

window.RythuModals = {
  init() {
    this.bindEvents();
  },

  bindEvents() {
    // Close modal on close button or overlay background click
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          this.closeAllModals();
        }
      });
    });

    document.querySelectorAll('.modal-close-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.closeAllModals();
      });
    });

    // ESC key closes modals
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeAllModals();
      }
      // Ctrl+K / Cmd+K triggers search
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        this.openModal('searchModal');
        const input = document.getElementById('globalSearchInput');
        if (input) input.focus();
      }
    });

    // Global Search Input Handler
    const searchInput = document.getElementById('globalSearchInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.handleGlobalSearch(e.target.value.trim().toLowerCase());
      });
    }

    // Add Farm Form Submit
    const addFarmForm = document.getElementById('addFarmForm');
    if (addFarmForm) {
      addFarmForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const farmName = document.getElementById('farmInputName').value;
        const location = document.getElementById('farmInputLocation').value;
        const landArea = document.getElementById('farmInputArea').value;
        const soilType = document.getElementById('farmInputSoil').value;
        const waterSource = document.getElementById('farmInputWater').value;

        await window.RythuFirebase.farmService.addFarm({
          farmName, location, landArea, soilType, waterSource
        });

        this.closeAllModals();
        addFarmForm.reset();
        window.RythuApp.showToast("🌾 Farm profile added to Cloud Firestore!");
      });
    }

    // Add Crop Form Submit
    const addCropForm = document.getElementById('addCropForm');
    if (addCropForm) {
      addCropForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const farms = window.RythuFirebase.farmService.getFarms();
        const targetFarmId = document.getElementById('cropTargetFarmId').value || (farms[0] ? farms[0].id : null);
        const cropName = document.getElementById('cropInputName').value;
        const area = document.getElementById('cropInputArea').value;
        const sowingDate = document.getElementById('cropInputSowing').value;
        const expectedHarvest = document.getElementById('cropInputHarvest').value;

        if (!targetFarmId) {
          alert("Please add a farm parcel first!");
          return;
        }

        await window.RythuFirebase.farmService.addCropToFarm(targetFarmId, {
          cropName, area, sowingDate, expectedHarvest
        });

        this.closeAllModals();
        addCropForm.reset();
        window.RythuApp.showToast("🌱 New crop cultivation recorded successfully!");
      });
    }

    // Firebase Config Form Submit
    const firebaseConfigForm = document.getElementById('firebaseConfigForm');
    if (firebaseConfigForm) {
      firebaseConfigForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const rawJson = document.getElementById('firebaseConfigJson').value;
        try {
          const cfg = JSON.parse(rawJson);
          localStorage.setItem('rythu_firebase_config', JSON.stringify(cfg));
          window.RythuFirebase.config = cfg;
          window.RythuFirebase.isConfigured = true;
          this.closeAllModals();
          window.RythuApp.showToast("🔥 Firebase credentials updated and saved!");
        } catch (err) {
          alert("Invalid JSON format for Firebase configuration.");
        }
      });
    }
  },

  openModal(modalId) {
    this.closeAllModals();
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';

      // Focus first input if search modal
      if (modalId === 'searchModal') {
        const input = document.getElementById('globalSearchInput');
        if (input) setTimeout(() => input.focus(), 50);
      }

      // Populate target farm select in Add Crop modal
      if (modalId === 'addCropModal') {
        this.populateFarmSelect();
      }
    }
  },

  closeAllModals() {
    document.querySelectorAll('.modal-overlay').forEach(modal => {
      modal.classList.remove('active');
    });
    document.body.style.overflow = '';
  },

  populateFarmSelect() {
    const select = document.getElementById('cropTargetFarmId');
    if (!select) return;
    const farms = window.RythuFirebase.farmService.getFarms();
    select.innerHTML = farms.map(f => `<option value="${f.id}">${f.farmName} (${f.landArea} Acres - ${f.location})</option>`).join('');
  },

  // Global Multi-Entity Search (PRD Section 33)
  handleGlobalSearch(query) {
    const resultsContainer = document.getElementById('globalSearchResults');
    if (!resultsContainer) return;

    if (!query) {
      resultsContainer.innerHTML = `
        <div style="text-align:center; padding:2rem; color:var(--text-subtle);">
          Start typing to search crops, diseases, schemes, and mandi prices...
        </div>
      `;
      return;
    }

    const isTe = window.RythuI18n.currentLang === 'te';
    const crops = window.RYTHU_CROPS_DATA || [];
    const diseases = window.RYTHU_DISEASES_DATA || [];
    const schemes = window.RYTHU_SCHEMES_DATA || [];
    const markets = window.RYTHU_MARKETS_DATA || [];

    const matchedCrops = crops.filter(c => c.nameEn.toLowerCase().includes(query) || c.nameTe.toLowerCase().includes(query));
    const matchedDiseases = diseases.filter(d => d.nameEn.toLowerCase().includes(query) || d.nameTe.toLowerCase().includes(query));
    const matchedSchemes = schemes.filter(s => s.nameEn.toLowerCase().includes(query) || s.nameTe.toLowerCase().includes(query));
    const matchedMarkets = markets.filter(m => m.cropNameEn.toLowerCase().includes(query) || m.cropNameTe.toLowerCase().includes(query) || m.market.toLowerCase().includes(query));

    const totalResults = matchedCrops.length + matchedDiseases.length + matchedSchemes.length + matchedMarkets.length;

    if (totalResults === 0) {
      resultsContainer.innerHTML = `
        <div style="text-align:center; padding:2rem; color:var(--text-muted);">
          No matching records found for "<strong>${query}</strong>". Try searching "Groundnut", "Paddy", or "Kadapa".
        </div>
      `;
      return;
    }

    let html = '';

    if (matchedCrops.length > 0) {
      html += `<div style="font-size:0.75rem; font-weight:800; color:var(--primary-800); text-transform:uppercase; margin-bottom:0.5rem;">🌱 Crop Guides (${matchedCrops.length})</div>`;
      matchedCrops.forEach(c => {
        html += `
          <div class="search-result-item" onclick="window.RythuModals.closeAllModals(); window.RythuCropGuide.openCropDetail('${c.id}');" style="padding:0.65rem 0.85rem; border-radius:var(--radius-md); background:var(--bg-surface-alt); margin-bottom:0.4rem; cursor:pointer; display:flex; justify-content:space-between; align-items:center;">
            <div>
              <strong>${c.nameEn}</strong> <span style="color:var(--primary-700);">(${c.nameTe})</span>
              <div style="font-size:0.75rem; color:var(--text-muted);">${c.category} • ${c.duration}</div>
            </div>
            <span style="font-size:0.8rem; color:var(--primary-700); font-weight:700;">View →</span>
          </div>
        `;
      });
    }

    if (matchedDiseases.length > 0) {
      html += `<div style="font-size:0.75rem; font-weight:800; color:#b91c1c; text-transform:uppercase; margin:1rem 0 0.5rem;">🐛 Crop Health & Diseases (${matchedDiseases.length})</div>`;
      matchedDiseases.forEach(d => {
        html += `
          <div class="search-result-item" onclick="window.RythuModals.closeAllModals(); window.RythuDiseaseScanner.openDiseaseModal('${d.id}');" style="padding:0.65rem 0.85rem; border-radius:var(--radius-md); background:var(--bg-surface-alt); margin-bottom:0.4rem; cursor:pointer; display:flex; justify-content:space-between; align-items:center;">
            <div>
              <strong>${d.nameEn}</strong> <span style="color:var(--text-subtle);">(${d.cropNameEn})</span>
              <div style="font-size:0.75rem; color:var(--text-muted);">${d.type}</div>
            </div>
            <span style="font-size:0.8rem; color:#b91c1c; font-weight:700;">Diagnosis →</span>
          </div>
        `;
      });
    }

    if (matchedSchemes.length > 0) {
      html += `<div style="font-size:0.75rem; font-weight:800; color:var(--accent-700); text-transform:uppercase; margin:1rem 0 0.5rem;">🏛️ Government Schemes (${matchedSchemes.length})</div>`;
      matchedSchemes.forEach(s => {
        html += `
          <div class="search-result-item" onclick="window.RythuModals.closeAllModals(); window.RythuSchemesView.openSchemeModal('${s.id}');" style="padding:0.65rem 0.85rem; border-radius:var(--radius-md); background:var(--bg-surface-alt); margin-bottom:0.4rem; cursor:pointer; display:flex; justify-content:space-between; align-items:center;">
            <div>
              <strong>${s.nameEn}</strong> <span style="color:var(--accent-700);">(${s.amount})</span>
              <div style="font-size:0.75rem; color:var(--text-muted);">${s.level.toUpperCase()} • ${s.category}</div>
            </div>
            <span style="font-size:0.8rem; color:var(--accent-700); font-weight:700;">Details →</span>
          </div>
        `;
      });
    }

    if (matchedMarkets.length > 0) {
      html += `<div style="font-size:0.75rem; font-weight:800; color:#0369a1; text-transform:uppercase; margin:1rem 0 0.5rem;">💰 Market Mandi Rates (${matchedMarkets.length})</div>`;
      matchedMarkets.forEach(m => {
        html += `
          <div class="search-result-item" onclick="window.RythuModals.closeAllModals(); window.RythuNav.navigateTo('market');" style="padding:0.65rem 0.85rem; border-radius:var(--radius-md); background:var(--bg-surface-alt); margin-bottom:0.4rem; cursor:pointer; display:flex; justify-content:space-between; align-items:center;">
            <div>
              <strong>${m.cropNameEn}</strong> - ${m.market}
              <div style="font-size:0.75rem; color:var(--text-muted);">Modal Price: ₹${m.modalPrice}/Quintal</div>
            </div>
            <span style="font-size:0.8rem; color:#0369a1; font-weight:700;">Check Rates →</span>
          </div>
        `;
      });
    }

    resultsContainer.innerHTML = html;
  }
};
