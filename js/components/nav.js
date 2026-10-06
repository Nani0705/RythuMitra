/* ===================================================================
   🌾 RYTHUMITRA — Role-Based Dynamic Navigation (Header, Sidebar, Mobile)
   =================================================================== */

window.RythuNav = {
  activeView: 'landing',

  init() {
    this.bindEvents();
    this.updateNotificationBadge();
    this.renderSidebarForRole();
    window.addEventListener('rythu:lang-changed', () => {
      this.updateLangButton();
      this.renderSidebarForRole();
    });
  },

  bindEvents() {
    // Language Toggle
    const langBtn = document.getElementById('langToggleBtn');
    if (langBtn) {
      langBtn.addEventListener('click', () => {
        window.RythuI18n.toggle();
        this.updateLangButton();
      });
    }

    // Header Role Switcher / Profile Chip click
    const userChip = document.getElementById('userProfileChip');
    if (userChip) {
      userChip.addEventListener('click', () => {
        this.toggleRoleMenu();
      });
    }

    // Global navigation clicks
    document.addEventListener('click', (e) => {
      const navTarget = e.target.closest('[data-view]');
      if (navTarget) {
        const view = navTarget.getAttribute('data-view');
        if (view === 'more') {
          this.openMobileSidebar();
        } else if (view === 'logout') {
          if (window.RythuAuth) window.RythuAuth.logout();
        } else if (view) {
          this.navigateTo(view);
          this.closeMobileSidebar();
          this.closeRoleMenu();
        }
      }

      // Close role menu if clicking outside
      if (!e.target.closest('#userProfileChip') && !e.target.closest('#headerRoleDropdown')) {
        this.closeRoleMenu();
      }
    });

    // Brand logo click
    const brand = document.querySelector('.header-brand');
    if (brand) {
      brand.addEventListener('click', () => {
        const role = (window.RythuAuth && window.RythuAuth.currentUser && window.RythuAuth.currentUser.role) || 'farmer';
        if (role === 'expert') this.navigateTo('expert');
        else if (role === 'admin') this.navigateTo('admin');
        else this.navigateTo('landing');
      });
    }

    // Notification button
    const notifBtn = document.getElementById('notifBtn');
    if (notifBtn) {
      notifBtn.addEventListener('click', () => {
        window.RythuModals.openModal('notificationsModal');
      });
    }

    // Search button
    const searchBtn = document.getElementById('headerSearchBtn');
    if (searchBtn) {
      searchBtn.addEventListener('click', () => {
        window.RythuModals.openModal('searchModal');
      });
    }

    // Mobile menu toggle
    const mobMenuBtn = document.getElementById('mobileMenuToggleBtn');
    if (mobMenuBtn) {
      mobMenuBtn.addEventListener('click', () => {
        this.toggleMobileSidebar();
      });
    }

    // Backdrop
    const backdrop = document.getElementById('sidebarBackdrop');
    if (backdrop) {
      backdrop.addEventListener('click', () => {
        this.closeMobileSidebar();
      });
    }
  },

  toggleRoleMenu() {
    const menu = document.getElementById('headerRoleDropdown');
    if (menu) {
      menu.classList.toggle('active');
    }
  },

  closeRoleMenu() {
    const menu = document.getElementById('headerRoleDropdown');
    if (menu) menu.classList.remove('active');
  },

  renderSidebarForRole() {
    const sidebar = document.querySelector('.app-sidebar');
    if (!sidebar) return;

    const role = (window.RythuAuth && window.RythuAuth.currentUser && window.RythuAuth.currentUser.role) || 'farmer';
    const isTe = window.RythuI18n.currentLang === 'te';

    let html = '';

    if (role === 'farmer') {
      html = `
        <div class="sidebar-section-title">${isTe ? "రైతు సేవలు" : "Farmer Services"}</div>
        <a class="nav-link ${this.activeView === 'dashboard' ? 'active' : ''}" data-view="dashboard">
          <span class="nav-icon">🏠</span>
          <span>${isTe ? "డాష్‌బోర్డ్" : "Dashboard"}</span>
        </a>
        <a class="nav-link ${this.activeView === 'my-farm' ? 'active' : ''}" data-view="my-farm">
          <span class="nav-icon">🌱</span>
          <span>${isTe ? "నా పంటలు & పొలం" : "My Crops & Farm"}</span>
        </a>
        <a class="nav-link ${this.activeView === 'crops' ? 'active' : ''}" data-view="crops">
          <span class="nav-icon">🌾</span>
          <span>${isTe ? "పంటల మార్గదర్శి" : "Crop Guide"}</span>
        </a>
        <a class="nav-link ${this.activeView === 'weather' ? 'active' : ''}" data-view="weather">
          <span class="nav-icon">🌦️</span>
          <span>${isTe ? "వాతావరణం" : "Weather"}</span>
        </a>
        <a class="nav-link ${this.activeView === 'market' ? 'active' : ''}" data-view="market">
          <span class="nav-icon">💰</span>
          <span>${isTe ? "మార్కెట్ ధరలు" : "Market Prices"}</span>
        </a>
        <a class="nav-link ${this.activeView === 'disease' ? 'active' : ''}" data-view="disease">
          <span class="nav-icon">🐛</span>
          <span>${isTe ? "చీడపీడల నివారణ" : "Pest & Disease"}</span>
        </a>
        <a class="nav-link ${this.activeView === 'scanner' ? 'active' : ''}" data-view="scanner">
          <span class="nav-icon">📷</span>
          <span>${isTe ? "ఏఐ ఆకు స్కానర్" : "AI Leaf Scanner"}</span>
          <span class="nav-badge">AI</span>
        </a>
        <a class="nav-link ${this.activeView === 'calendar' ? 'active' : ''}" data-view="calendar">
          <span class="nav-icon">📅</span>
          <span>${isTe ? "పంట క్యాలెండర్" : "Crop Calendar"}</span>
        </a>
        <a class="nav-link ${this.activeView === 'soil' ? 'active' : ''}" data-view="soil">
          <span class="nav-icon">🧪</span>
          <span>${isTe ? "నేల ఆరోగ్యం" : "Soil & Fertilizer"}</span>
        </a>
        <a class="nav-link ${this.activeView === 'schemes' ? 'active' : ''}" data-view="schemes">
          <span class="nav-icon">🏛️</span>
          <span>${isTe ? "ప్రభుత్వ పథకాలు" : "Govt Schemes"}</span>
        </a>

        <div class="sidebar-section-title" style="margin-top:1rem;">${isTe ? "ఖాతా & అమరికలు" : "Account & Help"}</div>
        <a class="nav-link" onclick="window.RythuModals.openModal('notificationsModal')">
          <span class="nav-icon">🔔</span>
          <span>${isTe ? "నోటిఫికేషన్లు" : "Notifications"}</span>
        </a>
        <a class="nav-link" onclick="window.RythuModals.openModal('profileModal')">
          <span class="nav-icon">👤</span>
          <span>${isTe ? "నా ప్రొఫైల్" : "My Profile"}</span>
        </a>
        <a class="nav-link" onclick="window.RythuAuth.logout()">
          <span class="nav-icon">🚪</span>
          <span>${isTe ? "లాగౌట్" : "Logout"}</span>
        </a>
      `;
    } else if (role === 'expert') {
      html = `
        <div class="sidebar-section-title">${isTe ? "నిపుణుల పోర్టల్" : "Expert Portal"}</div>
        <a class="nav-link ${this.activeView === 'expert' ? 'active' : ''}" data-view="expert">
          <span class="nav-icon">🏠</span>
          <span>${isTe ? "ఎక్స్‌పర్ట్ డాష్‌బోర్డ్" : "Expert Dashboard"}</span>
        </a>
        <a class="nav-link" onclick="RythuNav.navigateTo('expert')">
          <span class="nav-icon">👨‍🌾</span>
          <span>${isTe ? "రైతుల సందేహాలు" : "Farmer Queries"}</span>
          <span class="nav-badge" style="background:#ef4444; color:#fff;">3</span>
        </a>
        <a class="nav-link ${this.activeView === 'crops' ? 'active' : ''}" data-view="crops">
          <span class="nav-icon">🌱</span>
          <span>${isTe ? "పంటల విజ్ఞానం" : "Crop Knowledge"}</span>
        </a>
        <a class="nav-link ${this.activeView === 'disease' ? 'active' : ''}" data-view="disease">
          <span class="nav-icon">🐛</span>
          <span>${isTe ? "చీడపీడల డేటాబేస్" : "Pest & Disease"}</span>
        </a>
        <a class="nav-link ${this.activeView === 'soil' ? 'active' : ''}" data-view="soil">
          <span class="nav-icon">📚</span>
          <span>${isTe ? "శాస్త్రీయ వనరులు" : "Agri Resources"}</span>
        </a>
        <a class="nav-link" onclick="RythuNav.navigateTo('expert')">
          <span class="nav-icon">💬</span>
          <span>${isTe ? "కన్సల్టేషన్లు" : "Consultations"}</span>
          <span class="nav-badge" style="background:#0284c7; color:#fff;">2</span>
        </a>

        <div class="sidebar-section-title" style="margin-top:1rem;">${isTe ? "ఖాతా" : "Session"}</div>
        <a class="nav-link" onclick="window.RythuModals.openModal('profileModal')">
          <span class="nav-icon">👤</span>
          <span>${isTe ? "నిపుణుల ప్రొఫైల్" : "Expert Profile"}</span>
        </a>
        <a class="nav-link" onclick="window.RythuAuth.logout()">
          <span class="nav-icon">🚪</span>
          <span>${isTe ? "లాగౌట్" : "Logout"}</span>
        </a>
      `;
    } else if (role === 'admin') {
      html = `
        <div class="sidebar-section-title">${isTe ? "అడ్మిన్ నియంత్రణ" : "System Governance"}</div>
        <a class="nav-link ${this.activeView === 'admin' ? 'active' : ''}" data-view="admin">
          <span class="nav-icon">📊</span>
          <span>${isTe ? "ప్లాట్‌ఫారమ్ అవలోకనం" : "Platform Overview"}</span>
        </a>
        <a class="nav-link" onclick="RythuAdminView.switchTab('users')">
          <span class="nav-icon">👥</span>
          <span>${isTe ? "వినియోగదారులు" : "Users & Farmers"}</span>
        </a>
        <a class="nav-link" onclick="RythuAdminView.switchTab('crops')">
          <span class="nav-icon">🌱</span>
          <span>${isTe ? "పంటల కేటలాగ్" : "Crop Management"}</span>
        </a>
        <a class="nav-link ${this.activeView === 'disease' ? 'active' : ''}" data-view="disease">
          <span class="nav-icon">🐛</span>
          <span>${isTe ? "వ్యాధుల డేటా" : "Disease Management"}</span>
        </a>
        <a class="nav-link ${this.activeView === 'market' ? 'active' : ''}" data-view="market">
          <span class="nav-icon">💰</span>
          <span>${isTe ? "మండి మార్కెట్ డేటా" : "Market Data"}</span>
        </a>
        <a class="nav-link" onclick="RythuAdminView.switchTab('schemes')">
          <span class="nav-icon">🏛️</span>
          <span>${isTe ? "సంక్షేమ పథకాలు" : "Scheme Management"}</span>
        </a>
        <a class="nav-link" onclick="RythuAdminView.switchTab('content')">
          <span class="nav-icon">📚</span>
          <span>${isTe ? "వ్యాసాల ప్రచురణ" : "Articles & Advisories"}</span>
        </a>
        <a class="nav-link" onclick="window.RythuModals.openModal('firebaseModal')">
          <span class="nav-icon">⚙️</span>
          <span>${isTe ? "ఫైర్‌బేస్ స్థితి" : "Firestore Rules"}</span>
        </a>

        <div class="sidebar-section-title" style="margin-top:1rem;">${isTe ? "సెషన్" : "Session"}</div>
        <a class="nav-link" onclick="window.RythuAuth.logout()">
          <span class="nav-icon">🚪</span>
          <span>${isTe ? "లాగౌట్" : "Logout"}</span>
        </a>
      `;
    }

    sidebar.innerHTML = html;
  },

  navigateTo(viewId) {
    this.activeView = viewId;

    // Check if auth view or landing view
    const isAuthView = (viewId === 'login' || viewId === 'register');
    const isLanding = (viewId === 'landing');
    const header = document.querySelector('.app-header');
    const sidebar = document.querySelector('.app-sidebar');
    const mobileNav = document.querySelector('.mobile-bottom-nav');
    const appMain = document.querySelector('.app-main');

    // Sync URL hash
    if (viewId === 'landing') {
      if (window.location.hash && window.location.hash !== '#' && window.location.hash !== '#landing') {
        window.history.pushState(null, '', window.location.pathname);
      }
    } else {
      if (window.location.hash !== `#${viewId}`) {
        window.history.pushState(null, '', `#${viewId}`);
      }
    }

    if (isAuthView) {
      if (header) header.style.display = 'none';
      if (sidebar) sidebar.style.display = 'none';
      if (mobileNav) mobileNav.style.display = 'none';
      if (appMain) {
        appMain.style.padding = '0';
        appMain.style.maxWidth = '100%';
        appMain.style.width = '100%';
      }
    } else if (isLanding) {
      if (header) header.style.display = 'none';
      if (sidebar) sidebar.style.display = 'none';
      if (mobileNav) mobileNav.style.display = 'none';
      if (appMain) {
        appMain.style.padding = '0';
        appMain.style.maxWidth = '100%';
        appMain.style.width = '100%';
      }
      this.updateLandingSessionUI();
    } else {
      if (header) header.style.display = 'flex';
      if (sidebar) sidebar.style.display = 'block';
      if (mobileNav) mobileNav.style.display = 'block';
      if (appMain) {
        appMain.style.padding = '';
        appMain.style.maxWidth = '';
        appMain.style.width = '';
      }
      this.renderSidebarForRole();
    }

    // Hide all view sections
    document.querySelectorAll('.view-section').forEach(sec => {
      sec.classList.remove('active');
    });

    // Show target view section
    const target = document.getElementById(`view-${viewId}`);
    if (target) {
      target.classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Update active state in mobile bottom bar
    document.querySelectorAll('.mobile-nav-item').forEach(item => {
      if (item.getAttribute('data-view') === viewId) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    // Trigger sub-view initialization if needed
    if (viewId === 'dashboard' && window.RythuDashboard) {
      window.RythuDashboard.render();
    } else if (viewId === 'expert' && window.RythuExpert) {
      window.RythuExpert.render();
    } else if (viewId === 'admin' && window.RythuAdminView) {
      window.RythuAdminView.render();
    }
  },

  updateLangButton() {
    const isTe = window.RythuI18n.currentLang === 'te';
    const langBtn = document.getElementById('langToggleBtn');
    if (langBtn) {
      langBtn.innerHTML = `
        <span>🌐</span>
        <span>${isTe ? "English" : "తెలుగు"}</span>
        <span class="lang-badge">${isTe ? "EN" : "TE"}</span>
      `;
    }
  },

  updateLandingSessionUI() {
    const sessionBtn = document.getElementById('landingNavDashboardBtn');
    if (!sessionBtn) return;
    const authUser = window.RythuAuth && window.RythuAuth.currentUser;
    if (authUser && authUser.name) {
      sessionBtn.style.display = 'inline-flex';
      const role = authUser.role || 'farmer';
      sessionBtn.onclick = () => {
        if (role === 'expert') window.RythuNav.navigateTo('expert');
        else if (role === 'admin') window.RythuNav.navigateTo('admin');
        else window.RythuNav.navigateTo('dashboard');
      };
    } else {
      sessionBtn.style.display = 'none';
    }
  },

  updateNotificationBadge() {
    const dot = document.getElementById('notifDot');
    if (dot) dot.style.display = 'block';
  },

  toggleMobileSidebar() {
    const sidebar = document.querySelector('.app-sidebar');
    const backdrop = document.getElementById('sidebarBackdrop');
    if (sidebar && backdrop) {
      sidebar.classList.toggle('open');
      backdrop.classList.toggle('active');
    }
  },

  openMobileSidebar() {
    const sidebar = document.querySelector('.app-sidebar');
    const backdrop = document.getElementById('sidebarBackdrop');
    if (sidebar && backdrop) {
      sidebar.classList.add('open');
      backdrop.classList.add('active');
    }
  },

  closeMobileSidebar() {
    const sidebar = document.querySelector('.app-sidebar');
    const backdrop = document.getElementById('sidebarBackdrop');
    if (sidebar && backdrop) {
      sidebar.classList.remove('open');
      backdrop.classList.remove('active');
    }
  }
};
