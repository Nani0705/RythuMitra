/* ===================================================================
   🌾 RYTHUMITRA — Screen 02 & Screen 40: Farmer Dashboard
   =================================================================== */

window.RythuDashboard = {
  async init() {
    this.render();
    window.addEventListener('rythu:lang-changed', () => this.render());
    window.addEventListener('rythu:farms-updated', () => this.render());
    window.addEventListener('rythu:auth-changed', () => this.render());

    // Fetch initial weather
    try {
      const weather = await window.RythuWeather.fetchWeather('kadapa');
      this.updateWeatherUI(weather);
    } catch (e) {
      console.error("Dashboard weather fetch error:", e);
    }
  },

  render() {
    const container = document.getElementById('dashboard-content');
    if (!container) return;

    const user = window.RythuFirebase.authService.getCurrentUser();
    const farms = window.RythuFirebase.farmService.getFarms();
    const primaryFarm = farms[0] || { farmName: "My Farm", landArea: 0, soilType: "Red Soil", waterSource: "Borewell", crops: [] };
    const crops = primaryFarm.crops || [];

    const isTe = window.RythuI18n.currentLang === 'te';
    const hour = new Date().getHours();
    let greeting = isTe ? "శుభోదయం" : "Good Morning";
    if (hour >= 12 && hour < 17) greeting = isTe ? "శుభ మధ్యాహ్నం" : "Good Afternoon";
    else if (hour >= 17) greeting = isTe ? "శుభ సాయంత్రం" : "Good Evening";

    container.innerHTML = `
      <!-- Top Welcome Bar -->
      <div class="dashboard-greeting-bar" style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:1rem; margin-bottom:1.5rem;">
        <div>
          <h1 style="font-size:1.85rem; font-weight:800; color:var(--text-main); margin-bottom:0.25rem;">
            ${greeting}, ${user.name.split(' ')[0]} 👋
          </h1>
          <div style="display:flex; align-items:center; gap:0.4rem; color:var(--text-muted); font-size:0.92rem; font-weight:600;">
            <span style="color:#ef4444;">📍</span>
            <span>${user.location}</span>
            <span style="margin:0 0.4rem;">•</span>
            <span class="badge badge-success" style="font-size:0.75rem;">e-Crop Verified</span>
          </div>
        </div>
        <div style="display:flex; gap:0.5rem;">
          <button class="btn btn-secondary btn-sm" onclick="window.RythuModals.openModal('addCropModal')">
            <span>🌱</span> <span>${isTe ? "+ పంట చేర్చండి" : "+ Add Crop"}</span>
          </button>
          <button class="btn btn-primary btn-sm" onclick="window.RythuNav.navigateTo('my-farm')">
            <span>👨‍🌾</span> <span>${isTe ? "నా పొలం" : "My Farm"}</span>
          </button>
        </div>
      </div>

      <!-- Weather Banner (Dynamic from Open-Meteo) -->
      <div id="dash-weather-banner" class="weather-banner">
        <div class="weather-banner-left">
          <div class="weather-location-pill">
            <span>📍</span>
            <span id="dash-weather-loc">Kadapa, Andhra Pradesh</span>
          </div>
          <div class="weather-main-temp">
            <span id="dash-weather-icon">⛅</span>
            <span id="dash-weather-temp">29°C</span>
          </div>
          <div id="dash-weather-cond" class="weather-condition">Partly Cloudy</div>
          <div class="weather-metrics-row">
            <span>💧 <strong id="dash-weather-humidity">Humidity 68%</strong></span>
            <span>💨 <strong id="dash-weather-wind">Wind 12 km/h</strong></span>
            <span>🌧️ <strong id="dash-weather-rain">Rain Risk: 35%</strong></span>
          </div>
        </div>
        <div class="weather-banner-right" style="text-align:right;">
          <button class="btn btn-sm" style="background:rgba(255,255,255,0.25); color:#fff; border:1px solid rgba(255,255,255,0.4);" onclick="window.RythuNav.navigateTo('weather')">
            <span>${isTe ? "7 రోజుల సూచన →" : "7-Day Forecast →"}</span>
          </button>
        </div>
      </div>

      <!-- Weather Alert Box -->
      <div id="dash-weather-alert" class="weather-alert-box">
        <div class="weather-alert-icon">⚠️</div>
        <div>
          <div class="weather-alert-title">${isTe ? "పొలం వాతావరణ హెచ్చరిక" : "FARM WEATHER ADVISORY"}</div>
          <div class="weather-alert-desc" id="dash-weather-alert-desc">
            ${isTe 
              ? "రాబోయే 48 గంటల్లో కడప పరిసరాల్లో వర్షాలు పడే అవకాశం ఉంది. క్రిమిసంహారక మందుల పిచికారీ మరియు రసాయన ఎరువుల వాడకాన్ని వర్షాలు తగ్గే వరకు వాయిదా వేయండి."
              : "Scattered rainfall expected in Kadapa & surrounding mandals over the next 48 hours. Postpone chemical pesticide spraying and fertilizer top-dressing until showers pass."
            }
          </div>
        </div>
      </div>

      <!-- Core Section 01: My Farm Summary Card -->
      <div style="background:var(--bg-surface); border:1px solid var(--border-subtle); border-radius:var(--radius-xl); padding:1.5rem; margin-bottom:2rem; box-shadow:var(--shadow-sm);">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.25rem;">
          <div style="display:flex; align-items:center; gap:0.6rem;">
            <div style="width:40px; height:40px; border-radius:var(--radius-md); background:var(--primary-100); display:flex; align-items:center; justify-content:center; font-size:1.3rem;">
              🌾
            </div>
            <div>
              <h2 style="font-size:1.15rem; font-weight:800; color:var(--text-main);">${primaryFarm.farmName}</h2>
              <p style="font-size:0.8rem; color:var(--text-muted);">${primaryFarm.location}</p>
            </div>
          </div>
          <button class="btn btn-outline btn-sm" onclick="window.RythuNav.navigateTo('my-farm')">
            ${isTe ? "వివరాలు →" : "Manage Farm →"}
          </button>
        </div>

        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem; background:var(--bg-surface-alt); padding:1.1rem; border-radius:var(--radius-lg); margin-bottom:1.25rem;">
          <div>
            <div style="font-size:0.72rem; color:var(--text-subtle); font-weight:700; text-transform:uppercase;">${isTe ? "మొత్తం భూమి" : "Total Land"}</div>
            <div style="font-size:1.15rem; font-weight:800; color:var(--primary-800);">${primaryFarm.landArea} Acres</div>
          </div>
          <div>
            <div style="font-size:0.72rem; color:var(--text-subtle); font-weight:700; text-transform:uppercase;">${isTe ? "నేల రకం" : "Soil Type"}</div>
            <div style="font-size:0.95rem; font-weight:700; color:var(--text-main);">${primaryFarm.soilType}</div>
          </div>
          <div>
            <div style="font-size:0.72rem; color:var(--text-subtle); font-weight:700; text-transform:uppercase;">${isTe ? "నీటి వనరు" : "Water Source"}</div>
            <div style="font-size:0.95rem; font-weight:700; color:var(--text-main);">${primaryFarm.waterSource}</div>
          </div>
          <div>
            <div style="font-size:0.72rem; color:var(--text-subtle); font-weight:700; text-transform:uppercase;">${isTe ? "క్రియాశీల పంటలు" : "Active Crops"}</div>
            <div style="font-size:1.15rem; font-weight:800; color:var(--accent-600);">${crops.length} ${isTe ? "పంటలు" : "Crops"}</div>
          </div>
        </div>

        <!-- Active Crops List -->
        <h3 style="font-size:0.95rem; font-weight:800; color:var(--text-main); margin-bottom:0.75rem;">
          ${isTe ? "ప్రస్తుతం సాగులో ఉన్న పంటలు:" : "Currently Cultivated Crops:"}
        </h3>
        <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(260px, 1fr)); gap:1rem;">
          ${crops.map(crop => `
            <div style="background:#fff; border:1px solid var(--border-brand); border-radius:var(--radius-md); padding:1rem; display:flex; justify-content:space-between; align-items:center; box-shadow:var(--shadow-sm);">
              <div>
                <div style="font-size:1.05rem; font-weight:800; color:var(--primary-900);">${crop.cropName}</div>
                <div style="font-size:0.82rem; color:var(--text-muted);">${crop.area} Acres • Sown: ${crop.sowingDate}</div>
                <div style="margin-top:0.4rem; display:flex; gap:0.4rem; align-items:center;">
                  <span class="badge badge-success">${crop.stage}</span>
                  <span class="badge badge-harvest">${isTe ? "ఆరోగ్యవంతం" : "Healthy"}</span>
                </div>
              </div>
              <button class="btn btn-secondary btn-sm" style="padding:0.35rem 0.65rem;" onclick="window.RythuNav.navigateTo('calendar')">
                📅
              </button>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Quick Actions Grid (Screen 01 & 02) -->
      <div class="section-header">
        <div class="section-title-wrap">
          <div class="section-title">⚡ ${isTe ? "శీఘ్ర సేవలు" : "Quick Access Services"}</div>
          <div class="section-subtitle">${isTe ? "మీ వ్యవసాయ కార్యకలాపాలకు తక్షణ సేవలు" : "Essential farm management & advisory tools"}</div>
        </div>
      </div>

      <div class="quick-access-grid">
        <div class="quick-access-card" onclick="window.RythuNav.navigateTo('crops')">
          <div class="quick-card-icon">🌱</div>
          <div class="quick-card-title">${isTe ? "పంటల మార్గదర్శి" : "Crop Guide"}</div>
          <div class="quick-card-desc">${isTe ? "శాస్త్రీయ సాగు వివరాలు" : "Cultivation practices"}</div>
        </div>

        <div class="quick-access-card" onclick="window.RythuNav.navigateTo('weather')">
          <div class="quick-card-icon">🌦️</div>
          <div class="quick-card-title">${isTe ? "వాతావరణం" : "Farm Weather"}</div>
          <div class="quick-card-desc">${isTe ? "వర్షం & ఉష్ణోగ్రత" : "Rain & 7-day forecast"}</div>
        </div>

        <div class="quick-access-card" onclick="window.RythuNav.navigateTo('market')">
          <div class="quick-card-icon">💰</div>
          <div class="quick-card-title">${isTe ? "మార్కెట్ ధరలు" : "Market Prices"}</div>
          <div class="quick-card-desc">${isTe ? "మండి ప్రత్యక్ష రేట్లు" : "APMC Mandi rates"}</div>
        </div>

        <div class="quick-access-card" onclick="window.RythuNav.navigateTo('diseases')">
          <div class="quick-card-icon">🐛</div>
          <div class="quick-card-title">${isTe ? "చీడపీడలు" : "Crop Health"}</div>
          <div class="quick-card-desc">${isTe ? "తెగుళ్ల నివారణ" : "Pest diagnosis"}</div>
        </div>

        <div class="quick-access-card" onclick="window.RythuNav.navigateTo('scanner')">
          <div class="quick-card-icon" style="background:#fef3c7; color:#d97706;">📷</div>
          <div class="quick-card-title">${isTe ? "ఏఐ ఆకు స్కానర్" : "AI Leaf Scanner"}</div>
          <div class="quick-card-desc">${isTe ? "ఫోటోతో తెగులు గుర్తింపు" : "Instant leaf diagnosis"}</div>
        </div>

        <div class="quick-access-card" onclick="window.RythuNav.navigateTo('calendar')">
          <div class="quick-card-icon">📅</div>
          <div class="quick-card-title">${isTe ? "పంట క్యాలెండర్" : "Crop Calendar"}</div>
          <div class="quick-card-desc">${isTe ? "దశలవారీ పనులు" : "Growth milestones"}</div>
        </div>

        <div class="quick-access-card" onclick="window.RythuNav.navigateTo('soil')">
          <div class="quick-card-icon">🧪</div>
          <div class="quick-card-title">${isTe ? "నేల ఆరోగ్యం" : "Soil Health"}</div>
          <div class="quick-card-desc">${isTe ? "మట్టి పరీక్ష & NPK" : "Nutrients & testing"}</div>
        </div>

        <div class="quick-access-card" onclick="window.RythuNav.navigateTo('schemes')">
          <div class="quick-card-icon">🏛️</div>
          <div class="quick-card-title">${isTe ? "ప్రభుత్వ పథకాలు" : "Govt Schemes"}</div>
          <div class="quick-card-desc">${isTe ? "రైతు భరోసా, పీఎం కిసాన్" : "Subsidies & welfare"}</div>
        </div>
      </div>
    `;
  },

  updateWeatherUI(weather) {
    if (!weather) return;
    const isTe = window.RythuI18n.currentLang === 'te';

    const locEl = document.getElementById('dash-weather-loc');
    const tempEl = document.getElementById('dash-weather-temp');
    const condEl = document.getElementById('dash-weather-cond');
    const iconEl = document.getElementById('dash-weather-icon');
    const humEl = document.getElementById('dash-weather-humidity');
    const windEl = document.getElementById('dash-weather-wind');
    const rainEl = document.getElementById('dash-weather-rain');
    const alertDescEl = document.getElementById('dash-weather-alert-desc');

    if (locEl) locEl.textContent = isTe ? weather.locationNameTe : weather.locationName;
    if (tempEl) tempEl.textContent = `${weather.temp}°C`;
    if (condEl) condEl.textContent = isTe ? weather.conditionTe : weather.conditionEn;
    if (iconEl) iconEl.textContent = weather.icon;
    if (humEl) humEl.textContent = `${isTe ? "తేమ" : "Humidity"} ${weather.humidity}%`;
    if (windEl) windEl.textContent = `${isTe ? "గాలి" : "Wind"} ${weather.windSpeed} km/h`;
    if (rainEl) rainEl.textContent = `${isTe ? "వర్షం అవకాశం:" : "Rain Risk:"} ${weather.rainChance}%`;
    if (alertDescEl) alertDescEl.textContent = isTe ? weather.alertMessageTe : weather.alertMessageEn;
  }
};
