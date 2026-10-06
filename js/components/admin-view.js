/* ===================================================================
   🌾 RYTHUMITRA — Section 5: Administrator Dashboard
   System Telemetry, Visual Analytics, User Governance & Content Management
   =================================================================== */

window.RythuAdminView = {
  currentTab: 'overview',

  users: [
    { id: 'usr-1', name: 'Ravi Kumar', role: 'Farmer', email: 'ravi.farmer@rythumitra.in', location: 'Kadapa, AP', date: '2026-09-12', status: 'Active' },
    { id: 'usr-2', name: 'Dr. K. Ramesh', role: 'Agriculture Expert', email: 'dr.ramesh@angrau.ac.in', location: 'Tirupati, AP', date: '2026-08-20', status: 'Verified' },
    { id: 'usr-3', name: 'Lakshmi Narayana', role: 'Farmer', email: 'narayana.agri@gmail.com', location: 'Guntur, AP', date: '2026-09-28', status: 'Active' },
    { id: 'usr-4', name: 'Dr. P. Sailaja', role: 'Agriculture Expert', email: 'p.sailaja@angrau.ac.in', location: 'Kadapa, AP', date: '2026-09-01', status: 'Verified' },
    { id: 'usr-5', name: 'S. Venkatesh', role: 'Farmer', email: 'venkat.farmer@gmail.com', location: 'Kurnool, AP', date: '2026-10-01', status: 'Active' },
    { id: 'usr-6', name: 'Admin Console', role: 'Administrator', email: 'admin@rythumitra.in', location: 'Amaravati, AP', date: '2026-07-01', status: 'SuperAdmin' }
  ],

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
      <!-- Admin Header Banner -->
      <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:1rem; margin-bottom:1.5rem;">
        <div>
          <div style="display:flex; align-items:center; gap:0.6rem; margin-bottom:0.25rem;">
            <h1 style="font-size:1.85rem; font-weight:800; color:var(--text-main);">
              🛡️ ${isTe ? "రైతుమిత్ర అడ్మిన్ కన్సోల్" : "RythuMitra Administration Portal"}
            </h1>
            <span class="badge badge-success">SuperAdmin Access</span>
          </div>
          <p style="color:var(--text-muted); font-size:0.95rem;">
            ${isTe ? "రైతుల డేటా, నిపుణులు, పంటల కేటలాగ్, మరియు ప్లాట్‌ఫారమ్ అనలిటిక్స్ నిర్వహణ" : "Platform Overview • User Governance, Agricultural Content & Real-Time Analytics"}
          </p>
        </div>

        <div style="display:flex; gap:0.6rem;">
          <button class="btn btn-secondary btn-sm" onclick="window.RythuModals.openModal('firebaseModal')">
            🔥 Firebase Collections
          </button>
          <button class="btn btn-primary btn-sm" onclick="RythuAuth.switchRole('farmer')">
            👨‍🌾 Switch to Farmer
          </button>
        </div>
      </div>

      <!-- 6 Key Statistics Cards (PRD Section 5) -->
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:1rem; margin-bottom:1.75rem;">
        <div class="metric-card">
          <div class="metric-icon" style="background:#ecfdf5; color:#059669;">👨‍🌾</div>
          <div class="metric-info">
            <span class="metric-label">${isTe ? "మొత్తం రైతులు" : "Total Farmers"}</span>
            <span style="font-size:1.6rem; font-weight:800; color:var(--text-main);">1,248</span>
            <span style="font-size:0.75rem; color:#16a34a; font-weight:700;">+32 this week</span>
          </div>
        </div>

        <div class="metric-card">
          <div class="metric-icon" style="background:#e0f2fe; color:#0284c7;">🧑‍🌾</div>
          <div class="metric-info">
            <span class="metric-label">${isTe ? "వ్యవసాయ నిపుణులు" : "Total Experts"}</span>
            <span style="font-size:1.6rem; font-weight:800; color:var(--text-main);">48</span>
            <span style="font-size:0.75rem; color:#0284c7; font-weight:700;">13 AP Districts</span>
          </div>
        </div>

        <div class="metric-card">
          <div class="metric-icon" style="background:#fef3c7; color:#d97706;">🌱</div>
          <div class="metric-info">
            <span class="metric-label">${isTe ? "నమోదైన పంటలు" : "Total Crops"}</span>
            <span style="font-size:1.6rem; font-weight:800; color:var(--text-main);">42</span>
            <span style="font-size:0.75rem; color:#d97706; font-weight:700;">6 Agro-Zones</span>
          </div>
        </div>

        <div class="metric-card">
          <div class="metric-icon" style="background:#fdf2f8; color:#db2777;">⚡</div>
          <div class="metric-info">
            <span class="metric-label">${isTe ? "యాక్టివ్ వినియోగదారులు" : "Active Users"}</span>
            <span style="font-size:1.6rem; font-weight:800; color:var(--text-main);">834</span>
            <span style="font-size:0.75rem; color:#db2777; font-weight:700;">Online today</span>
          </div>
        </div>

        <div class="metric-card">
          <div class="metric-icon" style="background:#f3e8ff; color:#7e22ce;">📚</div>
          <div class="metric-info">
            <span class="metric-label">${isTe ? "ప్రచురించిన వ్యాసాలు" : "Published Articles"}</span>
            <span style="font-size:1.6rem; font-weight:800; color:var(--text-main);">68</span>
            <span style="font-size:0.75rem; color:#7e22ce; font-weight:700;">ANGRAU Certified</span>
          </div>
        </div>

        <div class="metric-card">
          <div class="metric-icon" style="background:#ecfeff; color:#0891b2;">🏛️</div>
          <div class="metric-info">
            <span class="metric-label">${isTe ? "ప్రభుత్వ పథకాలు" : "Active Schemes"}</span>
            <span style="font-size:1.6rem; font-weight:800; color:var(--text-main);">12</span>
            <span style="font-size:0.75rem; color:#0891b2; font-weight:700;">Central & AP State</span>
          </div>
        </div>
      </div>

      <!-- Navigation Tabs -->
      <div class="filter-tabs" style="margin-bottom:1.5rem;">
        <button class="filter-tab admin-tab-btn ${this.currentTab === 'overview' ? 'active' : ''}" data-tab="overview">
          📊 ${isTe ? "ప్లాట్‌ఫారమ్ విశ్లేషణ" : "Platform Analytics"}
        </button>
        <button class="filter-tab admin-tab-btn ${this.currentTab === 'users' ? 'active' : ''}" data-tab="users">
          👥 ${isTe ? "వినియోగదారుల నిర్వహణ" : "User Management"}
        </button>
        <button class="filter-tab admin-tab-btn ${this.currentTab === 'content' ? 'active' : ''}" data-tab="content">
          📝 ${isTe ? "కంటెంట్ నిర్వహణ" : "Content Management"}
        </button>
        <button class="filter-tab admin-tab-btn ${this.currentTab === 'crops' ? 'active' : ''}" data-tab="crops">
          🌱 ${isTe ? "పంటల కేటలాగ్" : "Crop Catalog"}
        </button>
        <button class="filter-tab admin-tab-btn ${this.currentTab === 'schemes' ? 'active' : ''}" data-tab="schemes">
          🏛️ ${isTe ? "సంక్షేమ పథకాలు" : "Schemes Registry"}
        </button>
      </div>

      <!-- Tab Content Area -->
      <div id="adminTabContent"></div>

      <!-- Confirmation Dialog Modal -->
      <div id="adminConfirmModal" class="modal-overlay">
        <div class="modal-container" style="max-width:440px;">
          <div class="modal-header">
            <h2 id="confirmModalTitle" style="font-size:1.2rem; font-weight:800; color:var(--primary-900);">⚠️ Confirm Action</h2>
            <button class="modal-close-btn" onclick="RythuAdminView.closeConfirmModal()">✕</button>
          </div>
          <div class="modal-body">
            <p id="confirmModalMessage" style="font-size:0.95rem; color:var(--text-main); line-height:1.5; margin-bottom:1rem;">
              Are you sure you want to perform this action?
            </p>
          </div>
          <div class="modal-footer">
            <button class="btn btn-outline" onclick="RythuAdminView.closeConfirmModal()">Cancel</button>
            <button class="btn btn-primary" id="confirmModalActionBtn" style="background:#dc2626;" onclick="RythuAdminView.executeConfirmedAction()">
              Confirm
            </button>
          </div>
        </div>
      </div>
    `;

    this.renderTabContent();
  },

  renderTabContent() {
    const tabBody = document.getElementById('adminTabContent');
    if (!tabBody) return;

    const isTe = window.RythuI18n.currentLang === 'te';

    if (this.currentTab === 'overview') {
      tabBody.innerHTML = `
        <!-- Visual Charts Section (PRD Section 5) -->
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:1.5rem; margin-bottom:1.75rem;" class="admin-charts-grid">
          
          <!-- Chart 1: User Growth -->
          <div class="admin-chart-box">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem;">
              <div>
                <h3 style="font-size:1.15rem; font-weight:800; color:var(--primary-900);">
                  📈 ${isTe ? "రైతుల పెరుగుదల (వారం వారీ)" : "Farmer Onboarding Growth"}
                </h3>
                <p style="font-size:0.8rem; color:var(--text-muted);">Weekly registration metrics across Rayalaseema</p>
              </div>
              <span class="badge badge-success">+28% MoM</span>
            </div>

            <!-- Stylized Bar Chart -->
            <div class="stat-bars-container">
              <div class="stat-bar-col">
                <div class="stat-bar-fill" style="height:45%;"></div>
                <span class="stat-bar-label">W1</span>
              </div>
              <div class="stat-bar-col">
                <div class="stat-bar-fill" style="height:62%;"></div>
                <span class="stat-bar-label">W2</span>
              </div>
              <div class="stat-bar-col">
                <div class="stat-bar-fill" style="height:78%;"></div>
                <span class="stat-bar-label">W3</span>
              </div>
              <div class="stat-bar-col">
                <div class="stat-bar-fill" style="height:92%;"></div>
                <span class="stat-bar-label">W4</span>
              </div>
              <div class="stat-bar-col">
                <div class="stat-bar-fill" style="height:100%; background:linear-gradient(180deg,#16a34a,#14532d);"></div>
                <span class="stat-bar-label">Current</span>
              </div>
            </div>
          </div>

          <!-- Chart 2: Most Viewed Crops -->
          <div class="admin-chart-box">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem;">
              <div>
                <h3 style="font-size:1.15rem; font-weight:800; color:var(--primary-900);">
                  🌾 ${isTe ? "ఎక్కువగా చూసిన పంటలు" : "Most Viewed & Searched Crops"}
                </h3>
                <p style="font-size:0.8rem; color:var(--text-muted);">Platform advisory engagement distribution</p>
              </div>
              <span class="badge badge-harvest">Active Trends</span>
            </div>

            <div style="display:flex; flex-direction:column; gap:0.85rem; margin-top:1.25rem;">
              <div>
                <div style="display:flex; justify-content:space-between; font-size:0.85rem; font-weight:700; margin-bottom:0.3rem;">
                  <span>Groundnut (వేరుశనగ)</span>
                  <span style="color:var(--primary-700);">38%</span>
                </div>
                <div style="height:8px; background:#e2e8f0; border-radius:4px; overflow:hidden;">
                  <div style="width:38%; height:100%; background:var(--primary-600); border-radius:4px;"></div>
                </div>
              </div>

              <div>
                <div style="display:flex; justify-content:space-between; font-size:0.85rem; font-weight:700; margin-bottom:0.3rem;">
                  <span>Paddy / Rice (వరి)</span>
                  <span style="color:var(--primary-700);">29%</span>
                </div>
                <div style="height:8px; background:#e2e8f0; border-radius:4px; overflow:hidden;">
                  <div style="width:29%; height:100%; background:#0284c7; border-radius:4px;"></div>
                </div>
              </div>

              <div>
                <div style="display:flex; justify-content:space-between; font-size:0.85rem; font-weight:700; margin-bottom:0.3rem;">
                  <span>Red Chilli (మిరప)</span>
                  <span style="color:var(--primary-700);">18%</span>
                </div>
                <div style="height:8px; background:#e2e8f0; border-radius:4px; overflow:hidden;">
                  <div style="width:18%; height:100%; background:#ea580c; border-radius:4px;"></div>
                </div>
              </div>

              <div>
                <div style="display:flex; justify-content:space-between; font-size:0.85rem; font-weight:700; margin-bottom:0.3rem;">
                  <span>Cotton (ప్రత్తి)</span>
                  <span style="color:var(--primary-700);">15%</span>
                </div>
                <div style="height:8px; background:#e2e8f0; border-radius:4px; overflow:hidden;">
                  <div style="width:15%; height:100%; background:#d97706; border-radius:4px;"></div>
                </div>
              </div>
            </div>
          </div>

        </div>

        <!-- Content Management Quick Cards -->
        <div style="margin-bottom:1.5rem;">
          <h3 style="font-size:1.25rem; font-weight:800; color:var(--primary-900); margin-bottom:1rem;">
            ⚙️ ${isTe ? "కంటెంట్ నిర్వహణ" : "Content & Governance Hub"}
          </h3>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(240px, 1fr)); gap:1rem;">
            <div class="card" style="border-top:4px solid var(--primary-600);">
              <h4 style="font-weight:800; font-size:1.05rem; margin-bottom:0.35rem;">🌱 Manage Crops</h4>
              <p style="font-size:0.82rem; color:var(--text-muted); margin-bottom:1rem;">42 crop varieties with NPK, water, and climate parameters.</p>
              <button class="btn btn-secondary btn-sm" onclick="RythuAdminView.switchTab('crops')">Open Catalog →</button>
            </div>

            <div class="card" style="border-top:4px solid #ea580c;">
              <h4 style="font-weight:800; font-size:1.05rem; margin-bottom:0.35rem;">🐛 Manage Diseases</h4>
              <p style="font-size:0.82rem; color:var(--text-muted); margin-bottom:1rem;">28 fungal, bacterial, and pest profiles with organic remedies.</p>
              <button class="btn btn-secondary btn-sm" onclick="RythuNav.navigateTo('disease')">Inspect Database →</button>
            </div>

            <div class="card" style="border-top:4px solid #0284c7;">
              <h4 style="font-weight:800; font-size:1.05rem; margin-bottom:0.35rem;">🏛 Manage Schemes</h4>
              <p style="font-size:0.82rem; color:var(--text-muted); margin-bottom:1rem;">12 direct benefit schemes (PM-KISAN, Rythu Bharosa, APMIP).</p>
              <button class="btn btn-secondary btn-sm" onclick="RythuAdminView.switchTab('schemes')">Manage Subsidies →</button>
            </div>

            <div class="card" style="border-top:4px solid #7e22ce;">
              <h4 style="font-weight:800; font-size:1.05rem; margin-bottom:0.35rem;">📚 Manage Articles</h4>
              <p style="font-size:0.82rem; color:var(--text-muted); margin-bottom:1rem;">68 agricultural advisories and scientific research papers.</p>
              <button class="btn btn-secondary btn-sm" onclick="RythuAdminView.promptNewArticle()">+ Add Article →</button>
            </div>
          </div>
        </div>
      `;
    } else if (this.currentTab === 'users') {
      tabBody.innerHTML = `
        <div class="market-table-card">
          <div class="market-table-header" style="display:flex; justify-content:space-between; align-items:center;">
            <div>
              <h3 style="font-weight:800; font-size:1.15rem; color:var(--text-main);">Registered Users Registry</h3>
              <p style="font-size:0.82rem; color:var(--text-muted);">Manage farmers, agriculture experts, and administrators</p>
            </div>
            <button class="btn btn-primary btn-sm" onclick="RythuApp.showToast('User invitation link generated.', 'success')">
              + Invite Expert
            </button>
          </div>
          <div class="table-responsive">
            <table class="data-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Role</th>
                  <th>Location</th>
                  <th>Registered</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                ${this.users.map(u => `
                  <tr>
                    <td>
                      <strong>${u.name}</strong><br/>
                      <small style="color:var(--text-muted);">${u.email}</small>
                    </td>
                    <td>
                      <span class="badge ${u.role === 'Administrator' ? 'badge-harvest' : (u.role === 'Agriculture Expert' ? 'badge-info' : 'badge-success')}">
                        ${u.role}
                      </span>
                    </td>
                    <td>📍 ${u.location}</td>
                    <td>${u.date}</td>
                    <td>
                      <span class="badge ${u.status === 'Verified' || u.status === 'Active' || u.status === 'SuperAdmin' ? 'badge-success' : 'badge-warning'}">
                        ${u.status}
                      </span>
                    </td>
                    <td>
                      <div style="display:flex; gap:0.4rem;">
                        <button class="btn btn-outline" style="padding:0.25rem 0.5rem; font-size:0.75rem;" onclick="RythuAdminView.promptEditUser('${u.id}')">Edit</button>
                        ${u.role !== 'Administrator' ? `
                          <button class="btn btn-outline" style="padding:0.25rem 0.5rem; font-size:0.75rem; color:#dc2626;" onclick="RythuAdminView.confirmAction('Suspend User', 'Are you sure you want to suspend user ${u.name}?')">Suspend</button>
                        ` : ''}
                      </div>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
    } else if (this.currentTab === 'content') {
      tabBody.innerHTML = `
        <div class="market-table-card">
          <div class="market-table-header" style="display:flex; justify-content:space-between; align-items:center;">
            <div>
              <h3 style="font-weight:800; font-size:1.15rem; color:var(--text-main);">Agricultural Articles & Publications</h3>
              <p style="font-size:0.82rem; color:var(--text-muted);">Manage approved guides and seasonal alerts</p>
            </div>
            <button class="btn btn-primary btn-sm" onclick="RythuAdminView.promptNewArticle()">
              + Write New Article
            </button>
          </div>
          <div class="table-responsive">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Author</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Integrated Pest Management in Kharif Groundnut</strong></td>
                  <td><span class="badge badge-info">Crop Protection</span></td>
                  <td>Dr. K. Ramesh (ANGRAU)</td>
                  <td><span class="badge badge-success">Published</span></td>
                  <td><button class="btn btn-outline" style="padding:0.25rem 0.5rem; font-size:0.75rem;" onclick="RythuAdminView.confirmAction('Unpublish Article', 'Unpublish IPM article?')">Unpublish</button></td>
                </tr>
                <tr>
                  <td><strong>Micro-Irrigation & Water Conservation in Rayalaseema</strong></td>
                  <td><span class="badge badge-harvest">Water Management</span></td>
                  <td>AP Agri Extension</td>
                  <td><span class="badge badge-success">Published</span></td>
                  <td><button class="btn btn-outline" style="padding:0.25rem 0.5rem; font-size:0.75rem;" onclick="RythuAdminView.confirmAction('Unpublish Article', 'Unpublish water article?')">Unpublish</button></td>
                </tr>
                <tr>
                  <td><strong>Soil Testing & Macro/Micro Nutrient Restitution</strong></td>
                  <td><span class="badge badge-success">Soil Science</span></td>
                  <td>Dr. P. Sailaja</td>
                  <td><span class="badge badge-info">Under Review</span></td>
                  <td><button class="btn btn-primary btn-sm" style="padding:0.25rem 0.5rem; font-size:0.75rem;" onclick="RythuApp.showToast('Article approved and published!', 'success')">Approve</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      `;
    } else if (this.currentTab === 'crops') {
      const crops = window.RYTHU_CROPS_DATA || [];
      tabBody.innerHTML = `
        <div class="market-table-card">
          <div class="market-table-header" style="display:flex; justify-content:space-between; align-items:center;">
            <div>
              <h3 style="font-weight:800; font-size:1.1rem; color:var(--text-main);">Master Crop Catalog (${crops.length} items)</h3>
              <p style="font-size:0.8rem; color:var(--text-muted);">Manage verified agronomic practices and duration</p>
            </div>
            <button class="btn btn-primary btn-sm" onclick="RythuApp.showToast('New crop template opened.', 'info')">+ Add New Crop</button>
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
                  <th>Actions</th>
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
                    <td>
                      <div style="display:flex; gap:0.4rem;">
                        <button class="btn btn-outline" style="padding:0.25rem 0.5rem; font-size:0.75rem;" onclick="window.RythuCropGuide.openCropDetail('${c.id}')">View</button>
                        <button class="btn btn-outline" style="padding:0.25rem 0.5rem; font-size:0.75rem; color:#dc2626;" onclick="RythuAdminView.confirmAction('Delete Crop', 'Are you sure you want to delete crop ${c.nameEn}?')">Delete</button>
                      </div>
                    </td>
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
          <div class="market-table-header" style="display:flex; justify-content:space-between; align-items:center;">
            <div>
              <h3 style="font-weight:800; font-size:1.1rem; color:var(--text-main);">Welfare Schemes Management</h3>
              <p style="font-size:0.8rem; color:var(--text-muted);">Central and AP state farmer welfare schemes</p>
            </div>
            <button class="btn btn-primary btn-sm" onclick="RythuApp.showToast('Scheme creation form loaded.', 'info')">+ Add Scheme</button>
          </div>
          <div class="table-responsive">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Scheme Name</th>
                  <th>Jurisdiction</th>
                  <th>Financial Benefit</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                ${schemes.map(s => `
                  <tr>
                    <td><strong>${s.titleEn}</strong><br/><small style="color:var(--text-muted);">${s.titleTe}</small></td>
                    <td><span class="badge ${s.jurisdiction === 'Central' ? 'badge-info' : 'badge-harvest'}">${s.jurisdiction}</span></td>
                    <td><strong style="color:var(--primary-800);">${s.benefitEn}</strong></td>
                    <td><span class="badge badge-success">Active</span></td>
                    <td>
                      <button class="btn btn-outline" style="padding:0.25rem 0.5rem; font-size:0.75rem;" onclick="RythuAdminView.confirmAction('Edit Scheme', 'Open scheme editor for ${s.titleEn}?')">Edit</button>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
    }
  },

  switchTab(tabId) {
    this.currentTab = tabId;
    const container = document.getElementById('view-admin');
    if (container) {
      container.querySelectorAll('.admin-tab-btn').forEach(btn => {
        if (btn.getAttribute('data-tab') === tabId) btn.classList.add('active');
        else btn.classList.remove('active');
      });
    }
    this.renderTabContent();
  },

  confirmAction(title, message) {
    document.getElementById('confirmModalTitle').innerText = `⚠️ ${title}`;
    document.getElementById('confirmModalMessage').innerText = message;
    const modal = document.getElementById('adminConfirmModal');
    if (modal) modal.classList.add('active');
  },

  closeConfirmModal() {
    const modal = document.getElementById('adminConfirmModal');
    if (modal) modal.classList.remove('active');
  },

  executeConfirmedAction() {
    this.closeConfirmModal();
    if (window.RythuApp && window.RythuApp.showToast) {
      window.RythuApp.showToast("Action completed successfully.", "success");
    }
  },

  promptEditUser(userId) {
    if (window.RythuApp && window.RythuApp.showToast) {
      window.RythuApp.showToast(`User settings loaded for ID ${userId}.`, "info");
    }
  },

  promptNewArticle() {
    if (window.RythuApp && window.RythuApp.showToast) {
      window.RythuApp.showToast("Article drafting studio opened.", "info");
    }
  }
};
