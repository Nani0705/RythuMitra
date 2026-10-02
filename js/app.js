/* ===================================================================
   🌾 RYTHUMITRA — Main Application Orchestrator
   =================================================================== */

window.RythuApp = {
  async init() {
    console.log("🌾 Initializing RythuMitra v1.0 (Digital Farming Platform)...");

    // Initialize Multilingual system first
    window.RythuI18n.init();

    // Initialize Navigation & Routing
    window.RythuNav.init();

    // Initialize Views
    if (window.RythuDashboard) window.RythuDashboard.init();
    if (window.RythuCropGuide) window.RythuCropGuide.init();
    if (window.RythuWeatherView) window.RythuWeatherView.init();
    if (window.RythuMarketView) window.RythuMarketView.init();
    if (window.RythuDiseaseScanner) {
      window.RythuDiseaseScanner.init();
      window.RythuDiseaseScanner.renderScannerPage();
    }
    if (window.RythuSchemesView) window.RythuSchemesView.init();
    if (window.RythuMyFarm) window.RythuMyFarm.init();
    if (window.RythuCalendarView) window.RythuCalendarView.init();
    if (window.RythuSoilView) window.RythuSoilView.init();
    if (window.RythuAdminView) window.RythuAdminView.init();
    if (window.RythuModals) window.RythuModals.init();

    // Setup global route changes listener
    window.addEventListener('rythu:route-changed', (e) => {
      const view = e.detail.view;
      if (view === 'scanner' && window.RythuDiseaseScanner) {
        window.RythuDiseaseScanner.renderScannerPage();
      }
      if (view === 'weather' && window.RythuWeatherView) {
        window.RythuWeatherView.loadWeatherData();
      }
    });

    // Populate Notification Modal content
    this.renderNotificationsList();
    window.addEventListener('rythu:notifs-updated', () => this.renderNotificationsList());

    // Check URL hash for direct deep linking
    const hash = window.location.hash.replace('#', '');
    if (hash && document.getElementById(`view-${hash}`)) {
      window.RythuNav.navigateTo(hash);
    } else {
      window.RythuNav.navigateTo('landing');
    }

    console.log("🌾 RythuMitra ready!");
  },

  showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type === 'warning' ? 'toast-warning' : (type === 'error' ? 'toast-error' : '')}`;
    toast.innerHTML = `
      <span>${type === 'warning' ? '⚠️' : (type === 'error' ? '❌' : '✅')}</span>
      <div style="flex:1; font-weight:600;">${message}</div>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  },

  renderNotificationsList() {
    const list = document.getElementById('notificationsList');
    if (!list) return;

    const isTe = window.RythuI18n.currentLang === 'te';
    const notifs = window.RythuFirebase.notificationService.getNotifications();

    if (notifs.length === 0) {
      list.innerHTML = `<p style="text-align:center; padding:2rem; color:var(--text-muted);">No new notifications.</p>`;
      return;
    }

    list.innerHTML = notifs.map(n => `
      <div style="background:${n.read ? 'var(--bg-surface)' : 'var(--primary-50)'}; border:1px solid ${n.read ? 'var(--border-subtle)' : 'var(--border-brand)'}; padding:0.85rem 1rem; border-radius:var(--radius-md); margin-bottom:0.6rem;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.2rem;">
          <strong style="font-size:0.9rem; color:var(--primary-900);">
            ${isTe ? n.titleTe : n.titleEn}
          </strong>
          <span style="font-size:0.72rem; color:var(--text-subtle);">${n.time}</span>
        </div>
        <p style="font-size:0.82rem; color:var(--text-main); line-height:1.4;">
          ${isTe ? n.bodyTe : n.bodyEn}
        </p>
      </div>
    `).join('');
  },

  switchUserRole(role) {
    window.RythuFirebase.authService.loginAsDemo(role);
    const isTe = window.RythuI18n.currentLang === 'te';
    window.RythuModals.closeAllModals();
    this.showToast(role === 'admin' 
      ? (isTe ? "అగ్రికల్చరల్ ఆఫీసర్ (అడ్మిన్) మోడ్ ప్రారంభమైంది" : "Switched to Agricultural Officer (Admin Evaluator) Mode") 
      : (isTe ? "రైతు రవి (కడప) ప్రొఫైల్ లోకి మారారు" : "Switched to Farmer Ravi (Kadapa) Profile")
    );
    if (role === 'admin') {
      window.RythuNav.navigateTo('admin');
    } else {
      window.RythuNav.navigateTo('dashboard');
    }
  }
};

// Bootstrap when DOM ready
document.addEventListener('DOMContentLoaded', () => {
  window.RythuApp.init();
});
