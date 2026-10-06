/* ===================================================================
   🌾 RYTHUMITRA — Role-Based Authentication & Registration Component
   =================================================================== */

window.RythuAuth = {
  selectedRole: 'farmer', // 'farmer', 'expert', 'admin'
  currentUser: null,

  init() {
    // Thorough sanitization of stored user objects in localStorage
    ['rythu_auth_user', 'rythu_user'].forEach(key => {
      const data = localStorage.getItem(key);
      if (data) {
        try {
          const user = JSON.parse(data);
          let modified = false;
          if (user.avatar && typeof user.avatar === 'string' && (user.avatar.includes('<') || user.avatar.includes('http'))) {
            const urlMatch = user.avatar.match(/https?:\/\/[^\s"']+/);
            if (urlMatch && !user.photoURL) {
              user.photoURL = urlMatch[0];
            }
            user.avatar = '👨‍🌾';
            modified = true;
          }
          if (modified) {
            localStorage.setItem(key, JSON.stringify(user));
          }
        } catch (e) {}
      }
    });

    // Load initial user session or default to farmer demo
    const saved = localStorage.getItem('rythu_auth_user');
    if (saved) {
      try {
        this.currentUser = JSON.parse(saved);
        this.selectedRole = this.currentUser.role || 'farmer';
        if (this.currentUser.avatar && (this.currentUser.avatar.includes('<') || this.currentUser.avatar.includes('http'))) {
          this.currentUser.avatar = '👨‍🌾';
        }
      } catch (e) {
        this.setDefaultFarmer();
      }
    } else {
      this.setDefaultFarmer();
    }

    this.bindEvents();
    this.updateRoleUI();
  },

  setDefaultFarmer() {
    this.currentUser = {
      uid: 'farmer-ravi-101',
      name: 'Ravi Kumar',
      email: 'ravi.farmer@rythumitra.in',
      phone: '+91 98480 22334',
      role: 'farmer',
      location: 'Kadapa, Andhra Pradesh',
      landArea: '3 Acres',
      soilType: 'Red Sandy Loam',
      waterSource: 'Borewell (Solar Powered)',
      avatar: '👨‍🌾'
    };
    this.selectedRole = 'farmer';
    this.saveSession();
  },

  saveSession() {
    if (this.currentUser) {
      localStorage.setItem('rythu_auth_user', JSON.stringify(this.currentUser));
      if (window.RythuFirebase && window.RythuFirebase.localState) {
        window.RythuFirebase.localState.currentUser = this.currentUser;
      }
    }
  },

  selectRole(role) {
    this.selectedRole = role;
    document.querySelectorAll('.role-card').forEach(card => {
      if (card.getAttribute('data-role') === role) {
        card.classList.add('selected');
      } else {
        card.classList.remove('selected');
      }
    });

    // Update form placeholders & demo hints
    const emailInput = document.getElementById('loginIdentifier');
    const pwdInput = document.getElementById('loginPassword');
    if (emailInput && pwdInput) {
      if (role === 'farmer') {
        emailInput.value = 'ravi.farmer@rythumitra.in';
        pwdInput.value = 'farmer@123';
      } else if (role === 'expert') {
        emailInput.value = 'dr.ramesh@angrau.ac.in';
        pwdInput.value = 'expert@123';
      } else if (role === 'admin') {
        emailInput.value = 'admin@rythumitra.in';
        pwdInput.value = 'admin@123';
      }
    }
  },

  togglePasswordVisibility() {
    const pwdInput = document.getElementById('loginPassword');
    const toggleBtn = document.getElementById('pwdToggleBtn');
    if (!pwdInput || !toggleBtn) return;

    if (pwdInput.type === 'password') {
      pwdInput.type = 'text';
      toggleBtn.innerText = '🙈';
    } else {
      pwdInput.type = 'password';
      toggleBtn.innerText = '👁️';
    }
  },

  handleLogin(e) {
    if (e) e.preventDefault();

    const role = this.selectedRole;
    if (role === 'farmer') {
      this.currentUser = {
        uid: 'farmer-ravi-101',
        name: 'Ravi Kumar',
        email: 'ravi.farmer@rythumitra.in',
        phone: '+91 98480 22334',
        role: 'farmer',
        location: 'Kadapa, Andhra Pradesh',
        landArea: '3 Acres',
        soilType: 'Red Sandy Loam',
        waterSource: 'Borewell (Solar Powered)',
        avatar: '👨‍🌾'
      };
    } else if (role === 'expert') {
      this.currentUser = {
        uid: 'expert-ramesh-202',
        name: 'Dr. K. Ramesh',
        designation: 'Senior Agronomist, ANGRAU',
        email: 'dr.ramesh@angrau.ac.in',
        phone: '+91 94401 55667',
        role: 'expert',
        location: 'Regional Ag Research Station, Tirupati',
        avatar: '🧑‍🌾'
      };
    } else if (role === 'admin') {
      this.currentUser = {
        uid: 'admin-platform-303',
        name: 'Platform Administrator',
        email: 'admin@rythumitra.in',
        phone: '+91 98499 00112',
        role: 'admin',
        location: 'Amaravati / Hyderabad',
        avatar: '🛡️'
      };
    }

    this.saveSession();
    this.updateRoleUI();

    const isTe = window.RythuI18n.currentLang === 'te';
    const welcomeMsg = isTe 
      ? `స్వాగతం, ${this.currentUser.name}! డాష్‌బోర్డ్‌కి మళ్ళిస్తున్నాము...` 
      : `Welcome, ${this.currentUser.name}! Redirecting to ${role} dashboard...`;
    
    if (window.RythuApp && window.RythuApp.showToast) {
      window.RythuApp.showToast(welcomeMsg, 'success');
    }

    // Redirect to respective dashboard
    setTimeout(() => {
      this.redirectByRole();
    }, 400);
  },

  async handleGoogleSignIn() {
    const isTe = window.RythuI18n.currentLang === 'te';
    if (window.RythuApp && window.RythuApp.showToast) {
      window.RythuApp.showToast(isTe ? "గూగుల్ సైన్-ఇన్ పాపప్ తెరుచుకుంటోంది..." : "Opening Google Sign-In popup...", "info");
    }

    try {
      if (window.RythuFirebase && window.RythuFirebase.authService) {
        const user = await window.RythuFirebase.authService.signInWithGoogle();
        this.currentUser = user;
        this.selectedRole = 'farmer';
        this.saveSession();
        this.updateRoleUI();

        const successMsg = isTe
          ? `స్వాగతం, ${user.name}! గూగుల్ ద్వారా విజయవంతంగా లాగిన్ అయ్యారు.`
          : `Welcome, ${user.name}! Signed in successfully with Google.`;
        if (window.RythuApp && window.RythuApp.showToast) {
          window.RythuApp.showToast(successMsg, "success");
        }

        setTimeout(() => {
          window.RythuNav.navigateTo('dashboard');
        }, 400);
      } else {
        this.handleLogin();
      }
    } catch (error) {
      console.warn("Google Sign-In canceled or failed:", error);
      if (error && error.code === 'auth/popup-closed-by-user') {
        if (window.RythuApp && window.RythuApp.showToast) {
          window.RythuApp.showToast(isTe ? "గూగుల్ సైన్-ఇన్ రద్దు చేయబడింది" : "Google Sign-In was cancelled", "warning");
        }
      } else {
        // Fallback demo login
        this.handleLogin();
      }
    }
  },

  handleRegister(e) {
    if (e) e.preventDefault();

    const name = document.getElementById('regName')?.value || 'Ravi Kumar';
    const phone = document.getElementById('regPhone')?.value || '+91 98480 22334';
    const email = document.getElementById('regEmail')?.value || 'farmer@rythumitra.in';
    const district = document.getElementById('regDistrict')?.value || 'Kadapa';
    const land = document.getElementById('regLand')?.value || '3 Acres';
    const soil = document.getElementById('regSoil')?.value || 'Red Sandy Loam';
    const mainCrop = document.getElementById('regCrop')?.value || 'Groundnut';

    this.currentUser = {
      uid: 'farmer-' + Date.now(),
      name: name,
      phone: phone,
      email: email,
      role: 'farmer',
      location: `${district}, Andhra Pradesh`,
      landArea: land,
      soilType: soil,
      mainCrop: mainCrop,
      avatar: '👨‍🌾'
    };

    this.selectedRole = 'farmer';
    this.saveSession();
    this.updateRoleUI();

    const isTe = window.RythuI18n.currentLang === 'te';
    const successMsg = isTe ? "మీ రైతు ప్రొఫైల్ విజయవంతంగా సిద్ధమైంది! 🎉" : "Your farmer profile is ready! 🎉";

    if (window.RythuApp && window.RythuApp.showToast) {
      window.RythuApp.showToast(successMsg, 'success');
    }

    setTimeout(() => {
      window.RythuNav.navigateTo('dashboard');
    }, 500);
  },

  logout() {
    localStorage.removeItem('rythu_auth_user');
    this.selectedRole = 'farmer';
    window.RythuNav.navigateTo('login');
    if (window.RythuApp && window.RythuApp.showToast) {
      const isTe = window.RythuI18n.currentLang === 'te';
      window.RythuApp.showToast(isTe ? "విజయవంతంగా లాగౌట్ అయ్యారు" : "Signed out successfully", 'info');
    }
  },

  switchRole(targetRole) {
    this.selectedRole = targetRole;
    this.selectRole(targetRole);
    this.handleLogin();
  },

  redirectByRole() {
    if (this.selectedRole === 'farmer') {
      window.RythuNav.navigateTo('dashboard');
    } else if (this.selectedRole === 'expert') {
      window.RythuNav.navigateTo('expert');
    } else if (this.selectedRole === 'admin') {
      window.RythuNav.navigateTo('admin');
    }
  },

  updateRoleUI() {
    // Update Header Role Badge
    const headerUserName = document.getElementById('headerUserName');
    const roleIndicator = document.getElementById('headerRoleIndicator');
    const rolePill = document.getElementById('rolePillText');
    const roleAvatar = document.getElementById('headerRoleAvatar');

    if (this.currentUser) {
      if (headerUserName) {
        const firstName = (this.currentUser.name || 'Farmer').split(' ')[0];
        headerUserName.textContent = firstName;
      }
      if (roleAvatar) {
        roleAvatar.textContent = '';
        roleAvatar.innerHTML = '';

        let photo = this.currentUser.photoURL;
        if (!photo && this.currentUser.avatar && this.currentUser.avatar.includes('http')) {
          const match = this.currentUser.avatar.match(/https?:\/\/[^\s"']+/);
          if (match) photo = match[0];
        }

        if (photo) {
          const img = document.createElement('img');
          img.src = photo;
          img.alt = this.currentUser.name || 'Avatar';
          img.style.width = '100%';
          img.style.height = '100%';
          img.style.objectFit = 'cover';
          img.style.borderRadius = '50%';
          img.style.display = 'block';
          img.onerror = () => {
            roleAvatar.textContent = '👨‍🌾';
          };
          roleAvatar.appendChild(img);
        } else {
          let emoji = this.currentUser.avatar;
          if (!emoji || emoji.includes('<') || emoji.includes('http')) {
            emoji = this.currentUser.role === 'admin' ? '🛡️' : (this.currentUser.role === 'expert' ? '🧑‍🌾' : '👨‍🌾');
          }
          roleAvatar.textContent = emoji;
        }
      }
      if (rolePill) {
        if (this.currentUser.role === 'farmer') rolePill.innerText = 'Farmer';
        else if (this.currentUser.role === 'expert') rolePill.innerText = 'Expert';
        else if (this.currentUser.role === 'admin') rolePill.innerText = 'Admin';
      }
    }

    // Refresh Expert & Admin renders if present
    if (window.RythuExpert && typeof window.RythuExpert.render === 'function') {
      window.RythuExpert.render();
    }
    if (window.RythuAdmin && typeof window.RythuAdmin.render === 'function') {
      window.RythuAdmin.render();
    }
  },

  bindEvents() {
    // Role selection cards in login view
    document.querySelectorAll('.role-card').forEach(card => {
      card.addEventListener('click', () => {
        const role = card.getAttribute('data-role');
        if (role) this.selectRole(role);
      });
    });

    // Password toggle
    const pwdToggle = document.getElementById('pwdToggleBtn');
    if (pwdToggle) {
      pwdToggle.addEventListener('click', () => this.togglePasswordVisibility());
    }

    // Login Form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
      loginForm.addEventListener('submit', (e) => this.handleLogin(e));
    }

    // Google Sign in
    const googleBtn = document.getElementById('googleSignInBtn');
    if (googleBtn) {
      googleBtn.addEventListener('click', () => this.handleGoogleSignIn());
    }

    // Quick demo buttons
    document.querySelectorAll('.demo-chip-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const role = btn.getAttribute('data-demo-role');
        if (role) {
          this.selectRole(role);
          this.handleLogin();
        }
      });
    });

    // Registration Form
    const regForm = document.getElementById('registrationForm');
    if (regForm) {
      regForm.addEventListener('submit', (e) => this.handleRegister(e));
    }
  }
};
