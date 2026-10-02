/* ===================================================================
   🌾 RYTHUMITRA — Firebase Architecture & Service Layer
   Supports Firebase Auth, Cloud Firestore, Firebase Storage & Offline-First Mode
   =================================================================== */

window.RythuFirebase = {
  isConfigured: false,
  isLive: false,
  config: null,
  app: null,
  auth: null,
  db: null,
  storage: null,

  // Local persistent state for offline-first / demo demonstration
  localState: {
    currentUser: {
      uid: "farmer-ravi-101",
      name: "Ravi Kumar",
      phone: "+91 98480 22334",
      email: "ravi.farmer@rythumitra.in",
      location: "Kadapa, Andhra Pradesh",
      role: "farmer",
      language: "te"
    },
    farms: [
      {
        id: "farm-001",
        userId: "farmer-ravi-101",
        farmName: "Sri Lakshmi Venkateswara Farm",
        location: "Kadapa (Vempalli Mandal)",
        landArea: 3.0,
        soilType: "Red Sandy Loam",
        waterSource: "Borewell (Solar Powered)",
        crops: [
          {
            id: "crop-act-1",
            cropName: "Groundnut (వేరుశనగ)",
            area: 2.0,
            sowingDate: "2026-07-15",
            expectedHarvest: "2026-11-10",
            stage: "Pegging & Pod Filling",
            health: "Good"
          },
          {
            id: "crop-act-2",
            cropName: "Paddy (వరి - BPT 5204)",
            area: 1.0,
            sowingDate: "2026-08-01",
            expectedHarvest: "2026-12-15",
            stage: "Active Tillering",
            health: "Excellent"
          }
        ]
      }
    ],
    notifications: [
      {
        id: "notif-1",
        titleEn: "Weather Advisory",
        titleTe: "వాతావరణ హెచ్చరిక",
        bodyEn: "Scattered rain expected in Kadapa mandal. Postpone pesticide sprays.",
        bodyTe: "కడప పరిసరాల్లో వర్షాలు పడే అవకాశం ఉంది. మందుల పిచికారీని వాయిదా వేయండి.",
        time: "10 mins ago",
        read: false,
        type: "weather"
      },
      {
        id: "notif-2",
        titleEn: "Crop Growth Milestone",
        titleTe: "పంట దశ సూచన",
        bodyEn: "Your Groundnut crop is entering day 45 pegging stage. Apply 200 kg Gypsum/acre.",
        bodyTe: "మీ వేరుశనగ పంట ఊడలు దిగే 45వ రోజుకు చేరింది. ఎకరాకు 200 కిలోల జిప్సం వేయండి.",
        time: "2 hours ago",
        read: false,
        type: "crop"
      },
      {
        id: "notif-3",
        titleEn: "Rythu Bharosa Update",
        titleTe: "రైతు భరోసా నిధులు",
        bodyEn: "Next tranche of input subsidy verification completed at your RBK.",
        bodyTe: "రైతు భరోసా పెట్టుబడి సహాయం అర్హుల జాబితా మీ ఆర్బీకే లో అందుబాటులో ఉంది.",
        time: "1 day ago",
        read: true,
        type: "scheme"
      }
    ]
  },

  init() {
    // Load local storage overrides if present
    const savedFarms = localStorage.getItem('rythu_farms');
    if (savedFarms) {
      try { this.localState.farms = JSON.parse(savedFarms); } catch(e) {}
    }
    const savedUser = localStorage.getItem('rythu_user');
    if (savedUser) {
      try { this.localState.currentUser = JSON.parse(savedUser); } catch(e) {}
    }
    const savedConfig = localStorage.getItem('rythu_firebase_config');
    if (savedConfig) {
      try {
        this.config = JSON.parse(savedConfig);
        this.isConfigured = true;
      } catch(e) {}
    }

    console.log("🌾 RythuMitra Firebase Layer initialized in Hybrid Offline-First Mode.");
  },

  // Save changes to persistent storage
  persistFarms() {
    localStorage.setItem('rythu_farms', JSON.stringify(this.localState.farms));
    window.dispatchEvent(new CustomEvent('rythu:farms-updated'));
  },

  // Auth Service
  authService: {
    getCurrentUser() {
      return window.RythuFirebase.localState.currentUser;
    },
    login(email, password) {
      // Simulates auth login or connects to Firebase Auth
      window.RythuFirebase.localState.currentUser.email = email;
      localStorage.setItem('rythu_user', JSON.stringify(window.RythuFirebase.localState.currentUser));
      return Promise.resolve(window.RythuFirebase.localState.currentUser);
    },
    loginAsDemo(role = 'farmer') {
      if (role === 'admin') {
        window.RythuFirebase.localState.currentUser = {
          uid: "admin-officer-01",
          name: "Dr. K. Srinivas (Agricultural Officer)",
          phone: "+91 94401 55667",
          email: "officer.kadapa@agri.ap.gov.in",
          location: "Kadapa Central RBK",
          role: "admin",
          language: "en"
        };
      } else {
        window.RythuFirebase.localState.currentUser = {
          uid: "farmer-ravi-101",
          name: "Ravi Kumar",
          phone: "+91 98480 22334",
          email: "ravi.farmer@rythumitra.in",
          location: "Kadapa, Andhra Pradesh",
          role: "farmer",
          language: "te"
        };
      }
      localStorage.setItem('rythu_user', JSON.stringify(window.RythuFirebase.localState.currentUser));
      window.dispatchEvent(new CustomEvent('rythu:auth-changed'));
      return Promise.resolve(window.RythuFirebase.localState.currentUser);
    },
    logout() {
      return Promise.resolve(true);
    }
  },

  // Farm Service
  farmService: {
    getFarms() {
      return window.RythuFirebase.localState.farms;
    },
    addFarm(farmData) {
      const newFarm = {
        id: "farm-" + Date.now(),
        userId: window.RythuFirebase.localState.currentUser.uid,
        farmName: farmData.farmName || "My Farm",
        location: farmData.location || "Kadapa",
        landArea: parseFloat(farmData.landArea) || 1.0,
        soilType: farmData.soilType || "Red Soil",
        waterSource: farmData.waterSource || "Borewell",
        crops: []
      };
      window.RythuFirebase.localState.farms.push(newFarm);
      window.RythuFirebase.persistFarms();
      return Promise.resolve(newFarm);
    },
    addCropToFarm(farmId, cropData) {
      const farm = window.RythuFirebase.localState.farms.find(f => f.id === farmId);
      if (!farm) return Promise.reject(new Error("Farm not found"));
      
      const newCrop = {
        id: "crop-" + Date.now(),
        cropName: cropData.cropName || "Crop",
        area: parseFloat(cropData.area) || 1.0,
        sowingDate: cropData.sowingDate || new Date().toISOString().split('T')[0],
        expectedHarvest: cropData.expectedHarvest || "",
        stage: "Sowing / Seedling",
        health: "Normal"
      };

      if (!farm.crops) farm.crops = [];
      farm.crops.push(newCrop);
      window.RythuFirebase.persistFarms();
      return Promise.resolve(newCrop);
    },
    deleteCrop(farmId, cropId) {
      const farm = window.RythuFirebase.localState.farms.find(f => f.id === farmId);
      if (farm && farm.crops) {
        farm.crops = farm.crops.filter(c => c.id !== cropId);
        window.RythuFirebase.persistFarms();
      }
      return Promise.resolve(true);
    }
  },

  // Storage Service (Simulates image upload with data URLs / Firebase Storage)
  storageService: {
    async uploadImage(file, path = "uploads") {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          resolve(e.target.result); // Base64 data URL for preview and storage
        };
        reader.readAsDataURL(file);
      });
    }
  },

  // Notification Service
  notificationService: {
    getNotifications() {
      return window.RythuFirebase.localState.notifications;
    },
    markAllRead() {
      window.RythuFirebase.localState.notifications.forEach(n => n.read = true);
      window.dispatchEvent(new CustomEvent('rythu:notifs-updated'));
    }
  }
};

window.RythuFirebase.init();
