/* ===================================================================
   🌾 RYTHUMITRA — Agriculture Expert Dashboard Component
   =================================================================== */

window.RythuExpert = {
  queries: [
    {
      id: "q-101",
      farmerName: "Ravi Kumar",
      location: "Kadapa (Vempalli Mandal)",
      crop: "Groundnut (వేరుశనగ)",
      area: "2 Acres",
      question: "Brown circular spots appearing with yellow chlorotic rings on leaves. Leaf dropping is starting. Is this Tikka disease?",
      questionTe: "ఆకులపై పసుపు వలయాలతో గోధుమ రంగు మచ్చలు వస్తున్నాయి. ఆకులు రాలిపోతున్నాయి. ఇది తిక్క తెగులేనా?",
      date: "Today, 10:15 AM",
      priority: "urgent",
      status: "pending",
      image: "assets/images/leaf_disease_sample.jpg"
    },
    {
      id: "q-102",
      farmerName: "Lakshmi Narayana",
      location: "Guntur (Tenali)",
      crop: "Chilli (మిరప)",
      area: "1.5 Acres",
      question: "Upward leaf curling and stunted shoot growth in 40-day old crop. Small white insects under the leaves.",
      questionTe: "40 రోజుల మిరప తోటలో ఆకులు పైకి ముడుచుకుపోతున్నాయి. ఆకుల అడుగున తెల్లటి పురుగులు ఉన్నాయి.",
      date: "Today, 08:30 AM",
      priority: "high",
      status: "pending",
      image: "assets/images/chilli_crop.jpg"
    },
    {
      id: "q-103",
      farmerName: "S. Venkatesh",
      location: "Kurnool (Adoni)",
      crop: "Cotton (ప్రత్తి)",
      area: "3 Acres",
      question: "Square and boll dropping observed after continuous 3 days of intermittent drizzle. What foliar spray is advised?",
      questionTe: "మూడు రోజుల చిరుజల్లుల తర్వాత పూత, పిందెలు రాలిపోతున్నాయి. ఏ పోషక ద్రావణం పిచికారీ చేయాలి?",
      date: "Yesterday, 04:45 PM",
      priority: "medium",
      status: "pending",
      image: "assets/images/cotton_crop.jpg"
    }
  ],

  consultations: [
    {
      id: "c-01",
      farmerName: "K. Mohan Reddy",
      village: "Jammalamadugu, Kadapa",
      crop: "Sweet Orange / Citrus",
      time: "Today • 03:00 PM - 03:30 PM",
      type: "Video Consultation",
      topic: "Fruit borer management & micronutrient deficiency"
    },
    {
      id: "c-02",
      farmerName: "B. Anjamma",
      village: "Nandyal, Kurnool",
      crop: "Paddy (వరి - BPT 5204)",
      time: "Today • 04:30 PM - 05:00 PM",
      type: "Audio Consultation",
      topic: "Drip fertigation & neck blast prevention"
    }
  ],

  init() {
    this.render();
  },

  render() {
    const container = document.getElementById('view-expert');
    if (!container) return;

    const isTe = window.RythuI18n.currentLang === 'te';

    container.innerHTML = `
      <!-- Expert Portal Header Banner -->
      <div style="background:linear-gradient(135deg, #1e3a5f 0%, #0f172a 100%); color:#fff; border-radius:var(--radius-xl); padding:2rem; margin-bottom:1.75rem; box-shadow:var(--shadow-elevated); position:relative; overflow:hidden;">
        <div style="position:relative; z-index:2; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1.25rem;">
          <div style="display:flex; align-items:center; gap:1.25rem;">
            <div style="width:68px; height:68px; border-radius:50%; background:#38bdf8; display:flex; align-items:center; justify-content:center; font-size:2.2rem; border:3px solid rgba(255,255,255,0.3);">
              🧑‍🌾
            </div>
            <div>
              <div style="display:flex; align-items:center; gap:0.6rem; margin-bottom:0.25rem;">
                <span class="badge" style="background:rgba(56,189,248,0.25); color:#7dd3fc; border:1px solid #38bdf8;">
                  ${isTe ? "అగ్రికల్చర్ ఎక్స్‌పర్ట్ పోర్టల్" : "Agriculture Expert Portal"}
                </span>
                <span class="badge badge-success">Verified ANGRAU Scientist</span>
              </div>
              <h1 style="font-size:1.75rem; font-weight:800; color:#fff; margin-bottom:0.2rem;">
                ${isTe ? "స్వాగతం, డాక్టర్ రమేష్ గారు 👋" : "Welcome, Dr. K. Ramesh 👋"}
              </h1>
              <p style="font-size:0.9rem; color:#cbd5e1;">
                Senior Agronomist • Regional Agricultural Research Station, ANGRAU
              </p>
            </div>
          </div>

          <div style="display:flex; gap:0.6rem;">
            <button class="btn btn-primary" onclick="RythuExpert.openNewAdvisoryModal()" style="background:#0284c7;">
              ✍️ ${isTe ? "కొత్త సూచన ప్రచురించు" : "+ Publish Advisory"}
            </button>
            <button class="btn btn-secondary" onclick="RythuAuth.switchRole('farmer')" style="color:#0f172a;">
              👨‍🌾 ${isTe ? "రైతు మోడ్" : "Switch to Farmer"}
            </button>
          </div>
        </div>
      </div>

      <!-- Expert Statistics Grid -->
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:1rem; margin-bottom:1.75rem;">
        <div class="metric-card">
          <div class="metric-icon" style="background:#ecfdf5; color:#059669;">👨‍🌾</div>
          <div class="metric-info">
            <span class="metric-label">${isTe ? "సహాయం పొందిన రైతులు" : "Farmers Assisted"}</span>
            <span style="font-size:1.6rem; font-weight:800; color:var(--primary-900);">342</span>
            <span style="font-size:0.75rem; color:#059669; font-weight:700;">+14 this week</span>
          </div>
        </div>

        <div class="metric-card" style="border-left:4px solid #f59e0b;">
          <div class="metric-icon" style="background:#fffbeb; color:#d97706;">⏳</div>
          <div class="metric-info">
            <span class="metric-label">${isTe ? "పెండింగ్ ప్రశ్నలు" : "Pending Queries"}</span>
            <span style="font-size:1.6rem; font-weight:800; color:#b45309;" id="expertPendingCount">${this.queries.filter(q => q.status === 'pending').length}</span>
            <span style="font-size:0.75rem; color:#d97706; font-weight:700;">Requires Response</span>
          </div>
        </div>

        <div class="metric-card" style="border-left:4px solid #0284c7;">
          <div class="metric-icon" style="background:#f0f9ff; color:#0284c7;">💬</div>
          <div class="metric-info">
            <span class="metric-label">${isTe ? "నేటి కన్సల్టేషన్లు" : "Active Consultations"}</span>
            <span style="font-size:1.6rem; font-weight:800; color:#0369a1;">7</span>
            <span style="font-size:0.75rem; color:#0284c7; font-weight:700;">2 Scheduled Today</span>
          </div>
        </div>

        <div class="metric-card" style="border-left:4px solid #10b981;">
          <div class="metric-icon" style="background:#f0fdf4; color:#10b981;">✅</div>
          <div class="metric-info">
            <span class="metric-label">${isTe ? "పరిష్కరించిన సమస్యలు" : "Resolved Queries"}</span>
            <span style="font-size:1.6rem; font-weight:800; color:#047857;">324</span>
            <span style="font-size:0.75rem; color:#10b981; font-weight:700;">97.2% Satisfaction</span>
          </div>
        </div>
      </div>

      <!-- Main Layout: Farmer Queries & Consultation Calendar -->
      <div style="display:grid; grid-template-columns:1.8fr 1.2fr; gap:1.5rem; align-items:start;" class="expert-two-col">
        
        <!-- Left Column: Farmer Queries List -->
        <div>
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem;">
            <div>
              <h2 style="font-size:1.35rem; font-weight:800; color:var(--primary-900);">
                📥 ${isTe ? "రైతుల ప్రశ్నలు & సందేహాలు" : "Farmer Field Inquiries"}
              </h2>
              <p style="font-size:0.85rem; color:var(--text-muted);">
                ${isTe ? "రైతుల నుండి అందిన ప్రత్యక్ష పంట ఆరోగ్య సమస్యలు" : "Direct questions submitted by registered Andhra Pradesh farmers"}
              </p>
            </div>
            <span class="badge badge-harvest" style="font-weight:700;">
              ${this.queries.filter(q => q.status === 'pending').length} Active
            </span>
          </div>

          <div id="expertQueriesList">
            ${this.queries.map(q => `
              <div class="expert-query-card" id="queryCard-${q.id}">
                <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:0.75rem;">
                  <div>
                    <div style="display:flex; align-items:center; gap:0.5rem; margin-bottom:0.25rem;">
                      <span style="font-weight:800; font-size:1.05rem; color:var(--primary-900);">${q.farmerName}</span>
                      <span class="badge ${q.priority === 'urgent' ? 'priority-badge-urgent' : (q.priority === 'high' ? 'priority-badge-high' : 'priority-badge-medium')}">
                        ${q.priority.toUpperCase()}
                      </span>
                      ${q.status === 'resolved' ? '<span class="badge badge-success">✓ RESOLVED</span>' : ''}
                    </div>
                    <div style="font-size:0.82rem; color:var(--text-muted);">
                      📍 ${q.location} • 🌾 ${q.crop} (${q.area}) • 🕒 ${q.date}
                    </div>
                  </div>
                </div>

                <div style="background:var(--bg-page); padding:0.9rem; border-radius:var(--radius-md); border:1px solid var(--border-subtle); margin-bottom:1rem; font-size:0.92rem; color:var(--text-main); line-height:1.5;">
                  <strong>${isTe ? "రైతు ప్రశ్న:" : "Inquiry:"}</strong>
                  ${isTe ? q.questionTe : q.question}
                </div>

                <div style="display:flex; justify-content:space-between; align-items:center;">
                  <button class="btn btn-outline" style="padding:0.45rem 0.9rem; font-size:0.85rem;" onclick="RythuExpert.viewCropPhoto('${q.image}', '${q.crop}')">
                    📷 ${isTe ? "ఫోటో చూడండి" : "View Leaf Photo"}
                  </button>

                  <div style="display:flex; gap:0.5rem;">
                    ${q.status === 'pending' ? `
                      <button class="btn btn-primary" style="padding:0.45rem 1.15rem; font-size:0.88rem;" onclick="RythuExpert.openResponseModal('${q.id}')">
                        💬 ${isTe ? "సలహా ఇవ్వండి" : "Respond to Farmer"}
                      </button>
                    ` : `
                      <span style="color:#059669; font-weight:700; font-size:0.88rem;">Advisory Sent ✓</span>
                    `}
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Right Column: Scheduled Consultations & Scientific Knowledge -->
        <div>
          <!-- Upcoming Consultations Card -->
          <div class="card" style="margin-bottom:1.5rem;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem;">
              <h3 style="font-size:1.15rem; font-weight:800; color:var(--primary-900);">
                📞 ${isTe ? "రాబోయే కన్సల్టేషన్లు" : "Upcoming Consultations"}
              </h3>
              <span class="badge badge-info">Today</span>
            </div>

            <div style="display:flex; flex-direction:column; gap:0.85rem;">
              ${this.consultations.map(c => `
                <div style="background:#f8fafc; border:1px solid var(--border-subtle); border-radius:var(--radius-md); padding:0.9rem;">
                  <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:0.35rem;">
                    <div style="font-weight:700; font-size:0.92rem; color:var(--primary-900);">${c.farmerName}</div>
                    <span class="badge badge-harvest" style="font-size:0.7rem;">${c.type}</span>
                  </div>
                  <div style="font-size:0.8rem; color:var(--text-muted); margin-bottom:0.4rem;">
                    📍 ${c.village} • 🌾 ${c.crop}
                  </div>
                  <div style="font-size:0.82rem; color:var(--text-main); margin-bottom:0.6rem;">
                    <strong>Topic:</strong> ${c.topic}
                  </div>
                  <div style="display:flex; justify-content:space-between; align-items:center;">
                    <span style="font-size:0.78rem; font-weight:700; color:#0284c7;">⏰ ${c.time}</span>
                    <button class="btn btn-primary" style="padding:0.35rem 0.85rem; font-size:0.8rem; background:#0284c7;" onclick="RythuApp.showToast('Connecting to secure video call session...', 'info')">
                      Start Call 🎥
                    </button>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Knowledge Resources Management Card -->
          <div class="card">
            <h3 style="font-size:1.15rem; font-weight:800; color:var(--primary-900); margin-bottom:0.75rem;">
              📚 ${isTe ? "శాస్త్రీయ వనరుల నిర్వహణ" : "Agricultural Knowledge Base"}
            </h3>
            <p style="font-size:0.85rem; color:var(--text-muted); line-height:1.4; margin-bottom:1rem;">
              Manage verified crop advisory guidelines, disease management bulletins, and seasonal advisories.
            </p>

            <div style="display:flex; flex-direction:column; gap:0.5rem;">
              <button class="btn btn-secondary" style="justify-content:flex-start; font-size:0.85rem;" onclick="RythuNav.navigateTo('crops')">
                🌱 ${isTe ? "పంట మార్గదర్శకాలు సమీక్షించండి" : "Manage Crop Guides (42 Listed)"}
              </button>
              <button class="btn btn-secondary" style="justify-content:flex-start; font-size:0.85rem;" onclick="RythuNav.navigateTo('disease')">
                🐛 ${isTe ? "చీడపీడల సమాచారం అప్‌డేట్ చేయండి" : "Pest & Pathogen Database"}
              </button>
              <button class="btn btn-secondary" style="justify-content:flex-start; font-size:0.85rem;" onclick="RythuNav.navigateTo('soil')">
                🧪 ${isTe ? "నేల పోషకాల సిఫార్సులు" : "Soil Health & NPK Dosage Guides"}
              </button>
            </div>
          </div>
        </div>

      </div>

      <!-- Expert Response Modal -->
      <div id="expertResponseModal" class="modal-overlay">
        <div class="modal-container" style="max-width:540px;">
          <div class="modal-header">
            <h2 id="responseModalTitle" style="font-size:1.25rem; font-weight:800; color:var(--primary-900);">
              ✍️ Send Agronomic Advisory
            </h2>
            <button class="modal-close-btn" onclick="RythuExpert.closeResponseModal()">✕</button>
          </div>
          <div class="modal-body">
            <input type="hidden" id="activeResponseQueryId" />
            <div id="responseQuerySummary" style="background:var(--bg-page); padding:0.85rem; border-radius:var(--radius-md); margin-bottom:1rem; font-size:0.85rem; color:var(--text-main);"></div>

            <div class="form-group" style="margin-bottom:1rem;">
              <label class="form-label">Immediate Recommended Action (Organic / Agronomic):</label>
              <input type="text" id="respOrganic" class="form-input" value="Spray 5% Neem Seed Kernel Extract (NSKE) + ensure soil aeration." />
            </div>

            <div class="form-group" style="margin-bottom:1rem;">
              <label class="form-label">Chemical Treatment (Dosage per Litre of Water):</label>
              <input type="text" id="respChemical" class="form-input" value="Spray Saaf (Carbendazim 12% + Mancozeb 63% WP) @ 2g/litre." />
            </div>

            <div class="form-group" style="margin-bottom:1rem;">
              <label class="form-label">Specialist Note to Farmer:</label>
              <textarea id="respNote" class="form-input" rows="3" style="resize:vertical;">Maintain 3 days dry interval after foliar spray. If symptoms persist after 10 days, request a field visit from village Rythu Bharosa Kendram (RBK) officer.</textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-outline" onclick="RythuExpert.closeResponseModal()">Cancel</button>
            <button class="btn btn-primary" onclick="RythuExpert.submitResponse()">
              🚀 Send Advisory to Farmer
            </button>
          </div>
        </div>
      </div>
    `;
  },

  openResponseModal(queryId) {
    const q = this.queries.find(item => item.id === queryId);
    if (!q) return;

    document.getElementById('activeResponseQueryId').value = queryId;
    const summary = document.getElementById('responseQuerySummary');
    if (summary) {
      summary.innerHTML = `
        <strong>Farmer:</strong> ${q.farmerName} (${q.location})<br>
        <strong>Crop:</strong> ${q.crop} • <strong>Issue:</strong> "${q.question}"
      `;
    }

    const modal = document.getElementById('expertResponseModal');
    if (modal) modal.classList.add('active');
  },

  closeResponseModal() {
    const modal = document.getElementById('expertResponseModal');
    if (modal) modal.classList.remove('active');
  },

  submitResponse() {
    const queryId = document.getElementById('activeResponseQueryId').value;
    const q = this.queries.find(item => item.id === queryId);
    if (q) {
      q.status = 'resolved';
    }

    this.closeResponseModal();
    this.render();

    const isTe = window.RythuI18n.currentLang === 'te';
    const msg = isTe 
      ? `రైతు ${q.farmerName} కు శాస్త్రీయ సలహా విజయవంతంగా పంపబడింది! 🌾` 
      : `Advisory sent successfully to farmer ${q.farmerName}! 🌾`;

    if (window.RythuApp && window.RythuApp.showToast) {
      window.RythuApp.showToast(msg, 'success');
    }
  },

  viewCropPhoto(imgSrc, cropName) {
    if (window.RythuModals) {
      window.RythuModals.openModal('imagePreviewModal');
      const img = document.getElementById('imagePreviewTarget');
      const cap = document.getElementById('imagePreviewCaption');
      if (img) img.src = imgSrc;
      if (cap) cap.innerText = `Field inspection photo: ${cropName}`;
    }
  },

  openNewAdvisoryModal() {
    if (window.RythuApp && window.RythuApp.showToast) {
      window.RythuApp.showToast("Advisory editor opened. Enter crop management instructions.", "info");
    }
  }
};
