/* ===================================================================
   🌾 RYTHUMITRA — Screen 09, 10, 11: My Farm Management Suite
   Signature Farm Profiling, Active Crop Lifecycle, Land & Irrigation Logs
   =================================================================== */

window.RythuMyFarm = {
  init() {
    this.render();
    window.addEventListener('rythu:lang-changed', () => this.render());
    window.addEventListener('rythu:farms-updated', () => this.render());
  },

  render() {
    const container = document.getElementById('view-my-farm');
    if (!container) return;

    const isTe = window.RythuI18n.currentLang === 'te';
    const user = window.RythuFirebase.authService.getCurrentUser();
    const farms = window.RythuFirebase.farmService.getFarms();

    container.innerHTML = `
      <!-- Title & Action Buttons -->
      <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:1rem; margin-bottom:1.5rem;">
        <div>
          <h1 style="font-size:1.85rem; font-weight:800; color:var(--text-main); margin-bottom:0.25rem;">
            👨‍🌾 ${isTe ? "నా డిజిటల్ ఫార్మ్ ప్రొఫైల్" : "My Digital Farm Profile"}
          </h1>
          <p style="color:var(--text-muted); font-size:0.95rem;">
            ${isTe ? "మీ సాగు భూములు, నేల స్వభావం, నీటి వనరులు మరియు పంటల నిర్వహణ" : "Manage your land parcels, soil profiles, irrigation infrastructure and crop cycles"}
          </p>
        </div>

        <div style="display:flex; gap:0.6rem;">
          <button class="btn btn-secondary btn-sm" onclick="window.RythuModals.openModal('addFarmModal')">
            <span>➕</span> <span>${isTe ? "+ కొత్త పొలం చేర్చండి" : "+ Add New Farm"}</span>
          </button>
          <button class="btn btn-primary btn-sm" onclick="window.RythuModals.openModal('addCropModal')">
            <span>🌱</span> <span>${isTe ? "+ పంట నమోదు చేయండి" : "+ Add Crop"}</span>
          </button>
        </div>
      </div>

      <!-- Farmer Identity Card -->
      <div style="background:linear-gradient(135deg, #14532d, #166534); border-radius:var(--radius-xl); color:#fff; padding:1.75rem; margin-bottom:2rem; box-shadow:var(--shadow-card);">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem;">
          <div style="display:flex; align-items:center; gap:1.25rem;">
            <div style="width:64px; height:64px; border-radius:50%; background:var(--primary-100); color:var(--primary-800); display:flex; align-items:center; justify-content:center; font-size:2rem; font-weight:800; box-shadow:0 4px 10px rgba(0,0,0,0.15);">
              👨‍🌾
            </div>
            <div>
              <div style="font-size:0.8rem; text-transform:uppercase; letter-spacing:0.05em; color:var(--accent-400); font-weight:700;">
                ${isTe ? "రైతు ప్రొఫైల్" : "Registered Farmer"}
              </div>
              <h2 style="font-size:1.5rem; font-weight:800;">${user.name}</h2>
              <div style="font-size:0.88rem; opacity:0.9; margin-top:0.2rem;">
                📍 ${user.location} • 📞 ${user.phone}
              </div>
            </div>
          </div>

          <div style="display:flex; gap:0.5rem;">
            <button class="btn btn-sm" style="background:rgba(255,255,255,0.2); color:#fff; border:1px solid rgba(255,255,255,0.3);" onclick="window.RythuModals.openModal('firebaseModal')">
              ⚙️ Firebase Sync Status
            </button>
          </div>
        </div>
      </div>

      <!-- Farms List -->
      ${farms.map((farm, fIdx) => `
        <div style="background:#fff; border:1px solid var(--border-subtle); border-radius:var(--radius-xl); padding:1.75rem; margin-bottom:2rem; box-shadow:var(--shadow-sm);">
          <!-- Farm Header -->
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.25rem; border-bottom:1px solid var(--border-subtle); padding-bottom:1rem;">
            <div>
              <span class="badge badge-success" style="margin-bottom:0.4rem;">Farm Parcel #${fIdx + 1}</span>
              <h3 style="font-size:1.35rem; font-weight:800; color:var(--text-main);">${farm.farmName}</h3>
              <p style="font-size:0.85rem; color:var(--text-muted);">📍 ${farm.location}</p>
            </div>
            <div>
              <button class="btn btn-primary btn-sm" onclick="window.RythuMyFarm.prepareAddCrop('${farm.id}')">
                <span>🌱</span> <span>${isTe ? "+ పంట చేర్చండి" : "+ Add Crop to this Farm"}</span>
              </button>
            </div>
          </div>

          <!-- Farm Specifications Bar -->
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(140px, 1fr)); gap:1rem; background:var(--bg-surface-alt); padding:1rem; border-radius:var(--radius-lg); margin-bottom:1.5rem;">
            <div>
              <div style="font-size:0.75rem; font-weight:700; color:var(--text-subtle); text-transform:uppercase;">
                📏 ${isTe ? "మొత్తం సాగు భూమి" : "Land Area"}
              </div>
              <div style="font-size:1.15rem; font-weight:800; color:var(--primary-800);">
                ${farm.landArea} Acres
              </div>
            </div>
            <div>
              <div style="font-size:0.75rem; font-weight:700; color:var(--text-subtle); text-transform:uppercase;">
                🧪 ${isTe ? "నేల రకం" : "Soil Classification"}
              </div>
              <div style="font-size:1rem; font-weight:700; color:var(--text-main);">
                ${farm.soilType}
              </div>
            </div>
            <div>
              <div style="font-size:0.75rem; font-weight:700; color:var(--text-subtle); text-transform:uppercase;">
                💧 ${isTe ? "నీటి వనరు" : "Irrigation Facility"}
              </div>
              <div style="font-size:1rem; font-weight:700; color:var(--text-main);">
                ${farm.waterSource}
              </div>
            </div>
            <div>
              <div style="font-size:0.75rem; font-weight:700; color:var(--text-subtle); text-transform:uppercase;">
                🌾 ${isTe ? "పంటలు" : "Crops Cultivated"}
              </div>
              <div style="font-size:1.15rem; font-weight:800; color:var(--accent-600);">
                ${(farm.crops || []).length} Active
              </div>
            </div>
          </div>

          <!-- Crops in this Farm -->
          <h4 style="font-size:1.05rem; font-weight:800; color:var(--text-main); margin-bottom:1rem;">
            🌱 ${isTe ? "ఈ పొలంలో సాగుచేస్తున్న పంటలు:" : "Crops in this Farm Parcel:"}
          </h4>

          ${(!farm.crops || farm.crops.length === 0) ? `
            <div style="text-align:center; padding:2rem; background:var(--bg-surface-alt); border-radius:var(--radius-md); color:var(--text-muted);">
              <p style="font-size:0.9rem;">${isTe ? "ఈ పొలంలో ఇంకా ఏ పంట నమోదు చేయలేదు." : "No crops currently recorded for this parcel."}</p>
              <button class="btn btn-secondary btn-sm" style="margin-top:0.5rem;" onclick="window.RythuMyFarm.prepareAddCrop('${farm.id}')">
                + Add Crop Now
              </button>
            </div>
          ` : `
            <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(280px, 1fr)); gap:1rem;">
              ${farm.crops.map(c => `
                <div style="background:#fff; border:1px solid var(--border-brand); border-radius:var(--radius-lg); padding:1.25rem; box-shadow:var(--shadow-sm); display:flex; flex-direction:column; justify-content:space-between;">
                  <div>
                    <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:0.5rem;">
                      <h5 style="font-size:1.15rem; font-weight:800; color:var(--primary-900);">${c.cropName}</h5>
                      <span class="badge badge-success">${c.area} Acres</span>
                    </div>

                    <div style="display:flex; flex-direction:column; gap:0.25rem; font-size:0.82rem; color:var(--text-muted); margin-bottom:0.75rem;">
                      <div>📅 <strong>${isTe ? "విత్తిన తేదీ:" : "Sowing Date:"}</strong> ${c.sowingDate}</div>
                      <div>🌾 <strong>${isTe ? "ఆశించే కోత:" : "Est. Harvest:"}</strong> ${c.expectedHarvest || "—"}</div>
                      <div>🔄 <strong>${isTe ? "ప్రస్తుత దశ:" : "Growth Stage:"}</strong> ${c.stage}</div>
                    </div>
                  </div>

                  <div style="display:flex; gap:0.5rem; margin-top:0.75rem; border-top:1px solid var(--border-subtle); padding-top:0.75rem;">
                    <button class="btn btn-secondary btn-sm" style="flex:1;" onclick="window.RythuNav.navigateTo('calendar')">
                      <span>📅</span> <span>${isTe ? "క్యాలెండర్" : "Milestones"}</span>
                    </button>
                    <button class="btn btn-outline btn-sm" style="color:#dc2626; border-color:#fecaca;" title="Delete crop record" onclick="window.RythuMyFarm.deleteCrop('${farm.id}', '${c.id}')">
                      🗑️
                    </button>
                  </div>
                </div>
              `).join('')}
            </div>
          `}
        </div>
      `).join('')}
    `;
  },

  prepareAddCrop(farmId) {
    const farmSelect = document.getElementById('cropTargetFarmId');
    if (farmSelect) {
      farmSelect.value = farmId;
    }
    window.RythuModals.openModal('addCropModal');
  },

  async deleteCrop(farmId, cropId) {
    const isTe = window.RythuI18n.currentLang === 'te';
    const confirmMsg = isTe ? "మీరు ఈ పంట రికార్డును ఖచ్చితంగా తొలగించాలనుకుంటున్నారా?" : "Are you sure you want to delete this crop record?";
    if (confirm(confirmMsg)) {
      await window.RythuFirebase.farmService.deleteCrop(farmId, cropId);
      window.RythuApp.showToast(isTe ? "పంట రికార్డు తొలగించబడింది" : "Crop record deleted successfully");
    }
  }
};
