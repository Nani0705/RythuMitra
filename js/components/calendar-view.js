/* ===================================================================
   🌾 RYTHUMITRA — Screen 12 & Screen 20: Interactive Crop Calendar
   Milestone-by-Milestone Growth Timeline with Day Ranges & Critical Tasks
   =================================================================== */

window.RythuCalendarView = {
  currentCropKey: 'groundnut',

  init() {
    this.render();
    this.bindEvents();
    window.addEventListener('rythu:lang-changed', () => this.render());
  },

  bindEvents() {
    const container = document.getElementById('view-calendar');
    if (!container) return;

    container.addEventListener('change', (e) => {
      if (e.target.id === 'calendarCropSelect') {
        this.currentCropKey = e.target.value;
        this.renderTimeline();
      }
    });
  },

  render() {
    const container = document.getElementById('view-calendar');
    if (!container) return;

    const isTe = window.RythuI18n.currentLang === 'te';

    container.innerHTML = `
      <!-- Title & Crop Selector -->
      <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:1rem; margin-bottom:1.5rem;">
        <div>
          <h1 style="font-size:1.85rem; font-weight:800; color:var(--text-main); margin-bottom:0.25rem;">
            📅 ${isTe ? "పంట ఎదుగుదల క్యాలెండర్" : "Interactive Crop Growth Calendar"}
          </h1>
          <p style="color:var(--text-muted); font-size:0.95rem;">
            ${isTe ? "విత్తినప్పటి నుండి కోత వరకు దశలవారీ చేయవలసిన కీలక వ్యవసాయ పనుల టైమ్‌లైన్" : "Step-by-step agronomic growth stages, moisture thresholds, and timely interventions"}
          </p>
        </div>

        <div style="display:flex; align-items:center; gap:0.6rem;">
          <label style="font-weight:700; font-size:0.88rem; color:var(--text-muted); white-space:nowrap;">
            🌱 ${isTe ? "పంటను ఎంచుకోండి:" : "Select Crop:"}
          </label>
          <select id="calendarCropSelect" class="form-control" style="width:auto; padding:0.5rem 1rem; border-radius:var(--radius-pill);">
            <option value="groundnut" ${this.currentCropKey === 'groundnut' ? 'selected' : ''}>
              ${isTe ? "వేరుశనగ (Groundnut - 110 Days)" : "Groundnut (వేరుశనగ - 110 Days)"}
            </option>
            <option value="paddy" ${this.currentCropKey === 'paddy' ? 'selected' : ''}>
              ${isTe ? "వరి (Paddy - 135 Days)" : "Paddy (వరి - 135 Days)"}
            </option>
          </select>
        </div>
      </div>

      <!-- Current Growth Progress Banner -->
      <div style="background:var(--bg-surface); border:1px solid var(--border-subtle); border-radius:var(--radius-xl); padding:1.5rem; margin-bottom:2rem; box-shadow:var(--shadow-sm);">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem;">
          <div style="font-weight:800; font-size:1.05rem; color:var(--primary-900);">
            ${isTe ? "ప్రస్తుత పంట అభివృద్ధి దశ:" : "Current Stage Progress"}
          </div>
          <span class="badge badge-success" style="font-size:0.8rem; font-weight:800;">
            ${isTe ? "దశ 3 / 6 (శాకీయ ఎదుగుదల)" : "Stage 3 of 6 (Vegetative Growth)"}
          </span>
        </div>
        
        <!-- Progress Bar -->
        <div style="width:100%; height:12px; background:var(--bg-surface-alt); border-radius:var(--radius-pill); overflow:hidden; margin-bottom:0.75rem;">
          <div style="width:48%; height:100%; background:linear-gradient(90deg, #15803d, #22c55e); border-radius:var(--radius-pill);"></div>
        </div>

        <div style="display:flex; justify-content:space-between; font-size:0.75rem; color:var(--text-subtle); font-weight:600;">
          <span>🌱 Day 0: Sowing</span>
          <span>🌿 Day 35: Intercultivation</span>
          <span>🌼 Day 50: Pegging</span>
          <span>🌾 Day 110: Harvest</span>
        </div>
      </div>

      <!-- Timeline Container -->
      <div id="calendarTimelineBody"></div>
    `;

    this.renderTimeline();
  },

  renderTimeline() {
    const body = document.getElementById('calendarTimelineBody');
    if (!body) return;

    const isTe = window.RythuI18n.currentLang === 'te';
    const stages = (window.RYTHU_CALENDAR_DATA && window.RYTHU_CALENDAR_DATA[this.currentCropKey]) || [];

    body.innerHTML = `
      <div class="timeline-container">
        <div class="timeline-track"></div>

        ${stages.map((stage, idx) => `
          <div class="timeline-step ${stage.status === 'completed' ? 'completed' : ''}">
            <div class="timeline-node">
              ${stage.status === 'completed' ? '✓' : stage.icon}
            </div>

            <div class="timeline-content-card" style="${stage.status === 'active' ? 'border:2px solid var(--primary-600); background:#f0fdf4;' : ''}">
              <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:0.5rem; margin-bottom:0.4rem;">
                <div>
                  <span class="badge ${stage.status === 'completed' ? 'badge-success' : (stage.status === 'active' ? 'badge-harvest' : 'badge-info')}" style="margin-bottom:0.3rem;">
                    ${stage.dayRange} • ${stage.status.toUpperCase()}
                  </span>
                  <h3 style="font-size:1.15rem; font-weight:800; color:var(--primary-900);">
                    Stage ${stage.stageNumber}: ${isTe ? stage.stageNameTe : stage.stageNameEn}
                  </h3>
                </div>
              </div>

              <p style="font-size:0.88rem; color:var(--text-main); line-height:1.5; margin-bottom:0.85rem;">
                ${isTe ? stage.descriptionTe : stage.descriptionEn}
              </p>

              <!-- Critical Agronomic Task Highlight -->
              <div style="background:#fff; border:1px solid ${stage.status === 'active' ? 'var(--primary-400)' : 'var(--border-subtle)'}; padding:0.75rem 1rem; border-radius:var(--radius-md); display:flex; align-items:center; gap:0.6rem;">
                <span style="font-size:1.1rem; color:var(--accent-600);">⚡</span>
                <div style="font-size:0.82rem; font-weight:700; color:var(--text-main);">
                  <strong>${isTe ? "కీలక పని:" : "Critical Task:"}</strong> ${isTe ? stage.criticalTaskTe : stage.criticalTask}
                </div>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }
};
