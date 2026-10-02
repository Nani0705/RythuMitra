/* ===================================================================
   🌾 RYTHUMITRA — Navigation Component (Header, Sidebar, Mobile Bar)
   =================================================================== */

window.RythuNav = {
  activeView: 'landing',

  init() {
    this.bindEvents();
    this.updateNotificationBadge();
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

    // Sidebar navigation clicks
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', (e) => {
        const view = link.getAttribute('data-view');
        if (view) {
          this.navigateTo(view);
          this.closeMobileSidebar();
        }
      });
    });

    // Mobile bottom navigation clicks
    document.querySelectorAll('.mobile-nav-item').forEach(item => {
      item.addEventListener('click', () => {
        const view = item.getAttribute('data-view');
        if (view === 'more') {
          this.openMobileSidebar();
        } else if (view) {
          this.navigateTo(view);
        }
      });
    });

    // Brand logo click -> go to Home or Dashboard
    const brand = document.querySelector('.header-brand');
    if (brand) {
      brand.addEventListener('click', () => {
        this.navigateTo('landing');
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

    // User profile chip
    const userChip = document.getElementById('userProfileChip');
    if (userChip) {
      userChip.addEventListener('click', () => {
        window.RythuModals.openModal('profileModal');
      });
    }

    // Mobile sidebar toggle button
    const mobMenuBtn = document.getElementById('mobileMenuToggleBtn');
    if (mobMenuBtn) {
      mobMenuBtn.addEventListener('click', () => {
        this.toggleMobileSidebar();
      });
    }

    // Sidebar backdrop
    const backdrop = document.getElementById('sidebarBackdrop');
    if (backdrop) {
      backdrop.addEventListener('click', () => {
        this.closeMobileSidebar();
      });
    }
  },

  navigateTo(viewId) {
    this.activeView = viewId;

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

    // Update active state in sidebar
    document.querySelectorAll('.nav-link').forEach(link => {
      if (link.getAttribute('data-view') === viewId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Update active state in mobile bottom bar
    document.querySelectorAll('.mobile-nav-item').forEach(item => {
      if (item.getAttribute('data-view') === viewId) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    // Dispatch navigation event for component lazy load / refresh
    window.dispatchEvent(new CustomEvent('rythu:route-changed', { detail: { view: viewId } }));
  },

  updateLangButton() {
    const langBtn = document.getElementById('langToggleBtn');
    if (langBtn) {
      const isTe = window.RythuI18n.currentLang === 'te';
      langBtn.innerHTML = isTe
        ? `<span>🌐</span><span>English</span><span class="lang-badge">EN</span>`
        : `<span>🌐</span><span>తెలుగు</span><span class="lang-badge">TE</span>`;
    }
  },

  updateNotificationBadge() {
    const dot = document.getElementById('notifDot');
    if (dot) {
      const notifs = window.RythuFirebase.notificationService.getNotifications();
      const unreadCount = notifs.filter(n => !n.read).length;
      dot.style.display = unreadCount > 0 ? 'block' : 'none';
    }
  },

  openMobileSidebar() {
    const sidebar = document.querySelector('.app-sidebar');
    const backdrop = document.getElementById('sidebarBackdrop');
    if (sidebar) sidebar.classList.add('open');
    if (backdrop) backdrop.classList.add('active');
  },

  closeMobileSidebar() {
    const sidebar = document.querySelector('.app-sidebar');
    const backdrop = document.getElementById('sidebarBackdrop');
    if (sidebar) sidebar.classList.remove('open');
    if (backdrop) backdrop.classList.remove('active');
  },

  toggleMobileSidebar() {
    const sidebar = document.querySelector('.app-sidebar');
    if (sidebar && sidebar.classList.contains('open')) {
      this.closeMobileSidebar();
    } else {
      this.openMobileSidebar();
    }
  }
};
