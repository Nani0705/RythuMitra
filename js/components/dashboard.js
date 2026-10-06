/* ===================================================================
   🌾 RYTHUMITRA — Section 3: Farmer Dashboard
   Personalized Agro-Meteorological & Field Management Center
   =================================================================== */

window.RythuDashboard = {
  async init() {
    this.render();
    window.addEventListener('rythu:lang-changed', () => this.render());
    window.addEventListener('rythu:farms-updated', () => this.render());
    window.addEventListener('rythu:auth-changed', () => this.render());

    // Fetch live weather
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

    const authUser = (window.RythuAuth && window.RythuAuth.currentUser) || {
      name: "Ravi Kumar",
      location: "Kadapa, Andhra Pradesh",
      role: "farmer"
    };

    const isTe = window.RythuI18n.currentLang === 'te';
    const hour = new Date().getHours();
    let greeting = isTe ? "శుభోదయం" : "Good Morning";
    if (hour >= 12 && hour < 17) greeting = isTe ? "శుభ మధ్యాహ్నం" : "Good Afternoon";
    else if (hour >= 17) greeting = isTe ? "శుభ సాయంత్రం" : "Good Evening";

    container.innerHTML = `
      <!-- Greeting & Location Header -->
      <div class="dashboard-greeting-bar" style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:1rem; margin-bottom:1.5rem;">
        <div>
          <h1 style="font-size:1.85rem; font-weight:800; color:var(--text-main); margin-bottom:0.25rem;">
            ${greeting}, ${authUser.name.split(' ')[0]} 👋
          </h1>
          <div style="display:flex; align-items:center; gap:0.4rem; color:var(--text-muted); font-size:0.92rem; font-weight:600;">
            <span style="color:#ef4444;">📍</span>
            <span>${authUser.location}</span>
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

      <!-- Weather Card (Screen 05 / Section 3) -->
      <div id="dash-weather-banner" class="weather-banner" style="margin-bottom:1.25rem;">
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
            <span>💧 <strong id="dash-weather-humidity">Humidity: 68%</strong></span>
            <span>💨 <strong id="dash-weather-wind">Wind: 12 km/h</strong></span>
            <span>🌧️ <strong id="dash-weather-rain">Rain Risk: 35%</strong></span>
          </div>
        </div>
        <div class="weather-banner-right" style="text-align:right;">
          <button class="btn btn-sm" style="background:rgba(255,255,255,0.25); color:#fff; border:1px solid rgba(255,255,255,0.4);" onclick="window.RythuNav.navigateTo('weather')">
            <span>${isTe ? "7 రోజుల సూచన →" : "7-Day Forecast →"}</span>
          </button>
        </div>
      </div>

      <!-- Weather Advisory Banner -->
      <div id="dash-weather-alert" class="weather-alert-box" style="margin-bottom:1.5rem;">
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

      <!-- My Farm Card & Cultivated Crops (Section 3) -->
      <div style="background:var(--bg-surface); border:1px solid var(--border-subtle); border-radius:var(--radius-xl); padding:1.5rem; margin-bottom:1.75rem; box-shadow:var(--shadow-sm);">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.25rem;">
          <div style="display:flex; align-items:center; gap:0.6rem;">
            <div style="width:40px; height:40px; border-radius:var(--radius-md); background:var(--primary-100); display:flex; align-items:center; justify-content:center; font-size:1.3rem;">
              👨‍🌾
            </div>
            <div>
              <h2 style="font-size:1.15rem; font-weight:800; color:var(--text-main);">
                ${isTe ? "శ్రీ లక్ష్మీ వేంకటేశ్వర పొలం" : "Sri Lakshmi Venkateswara Farm"}
              </h2>
              <p style="font-size:0.8rem; color:var(--text-muted);">Kadapa (Vempalli Mandal)</p>
            </div>
          </div>
          <button class="btn btn-outline btn-sm" onclick="window.RythuNav.navigateTo('my-farm')">
            ${isTe ? "వివరాలు →" : "Manage Farm →"}
          </button>
        </div>

        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem; background:var(--bg-surface-alt); padding:1.1rem; border-radius:var(--radius-lg); margin-bottom:1.25rem;">
          <div>
            <div style="font-size:0.72rem; color:var(--text-subtle); font-weight:700; text-transform:uppercase;">${isTe ? "మొత్తం భూమి" : "Land Area"}</div>
            <div style="font-size:1.15rem; font-weight:800; color:var(--primary-800);">3 Acres</div>
          </div>
          <div>
            <div style="font-size:0.72rem; color:var(--text-subtle); font-weight:700; text-transform:uppercase;">${isTe ? "నేల రకం" : "Soil Type"}</div>
            <div style="font-size:0.95rem; font-weight:700; color:var(--text-main);">${isTe ? "ఎర్ర నేలలు" : "Red Soil"}</div>
          </div>
          <div>
            <div style="font-size:0.72rem; color:var(--text-subtle); font-weight:700; text-transform:uppercase;">${isTe ? "నీటి వనరు" : "Water Source"}</div>
            <div style="font-size:0.95rem; font-weight:700; color:var(--text-main);">${isTe ? "బోరుబావి" : "Borewell"}</div>
          </div>
          <div>
            <div style="font-size:0.72rem; color:var(--text-subtle); font-weight:700; text-transform:uppercase;">${isTe ? "క్రియాశీల పంటలు" : "Active Crops"}</div>
            <div style="font-size:1.15rem; font-weight:800; color:var(--accent-600);">2 Crops</div>
          </div>
        </div>

        <!-- My Crops: Groundnut & Chilli Cards -->
        <h3 style="font-size:0.95rem; font-weight:800; color:var(--text-main); margin-bottom:0.75rem;">
          ${isTe ? "నా పంటలు (సాగులో ఉన్నవి):" : "My Crops (Currently Cultivated):"}
        </h3>
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(260px, 1fr)); gap:1rem;">
          <!-- Crop 1: Groundnut -->
          <div style="background:#fff; border:1px solid var(--border-brand); border-radius:var(--radius-md); padding:1rem; display:flex; justify-content:space-between; align-items:center; box-shadow:var(--shadow-sm);">
            <div>
              <div style="font-size:1.05rem; font-weight:800; color:var(--primary-900);">
                🌾 Groundnut (వేరుశనగ)
              </div>
              <div style="font-size:0.82rem; color:var(--text-muted); margin:0.2rem 0;">2 Acres • Sown: 2026-07-15</div>
              <div style="display:flex; gap:0.4rem; align-items:center;">
                <span class="badge badge-success">${isTe ? "ఎదుగుదల దశ (Growing)" : "Status: Growing"}</span>
                <span class="badge badge-harvest">${isTe ? "ఊడలు దిగే దశ" : "Pegging Stage"}</span>
              </div>
            </div>
            <button class="btn btn-secondary btn-sm" onclick="window.RythuNav.navigateTo('calendar')">📅</button>
          </div>

          <!-- Crop 2: Chilli -->
          <div style="background:#fff; border:1px solid var(--border-brand); border-radius:var(--radius-md); padding:1rem; display:flex; justify-content:space-between; align-items:center; box-shadow:var(--shadow-sm);">
            <div>
              <div style="font-size:1.05rem; font-weight:800; color:var(--primary-900);">
                🌶 Chilli (మిరప)
              </div>
              <div style="font-size:0.82rem; color:var(--text-muted); margin:0.2rem 0;">1 Acre • Sown: 2026-08-10</div>
              <div style="display:flex; gap:0.4rem; align-items:center;">
                <span class="badge badge-success">${isTe ? "పూత దశ (Flowering)" : "Status: Flowering"}</span>
                <span class="badge badge-info">${isTe ? "ఆరోగ్యవంతం" : "Healthy"}</span>
              </div>
            </div>
            <button class="btn btn-secondary btn-sm" onclick="window.RythuNav.navigateTo('calendar')">📅</button>
          </div>
        </div>
      </div>

      <!-- Quick Actions Grid (Section 3) -->
      <div style="margin-bottom:1.75rem;">
        <h3 style="font-size:1.2rem; font-weight:800; color:var(--primary-900); margin-bottom:0.75rem;">
          ⚡ ${isTe ? "శీఘ్ర సేవలు" : "Quick Actions"}
        </h3>
        <div class="quick-access-grid">
          <div class="quick-access-card" onclick="window.RythuNav.navigateTo('crops')">
            <div class="quick-card-icon">🌱</div>
            <div class="quick-card-title">${isTe ? "పంటల మార్గదర్శి" : "Explore Crops"}</div>
            <div class="quick-card-desc">${isTe ? "శాస్త్రీయ సాగు వివరాలు" : "42 Cultivation Guides"}</div>
          </div>

          <div class="quick-access-card" onclick="window.RythuNav.navigateTo('market')">
            <div class="quick-card-icon">💰</div>
            <div class="quick-card-title">${isTe ? "మార్కెట్ చూడండి" : "Check Market"}</div>
            <div class="quick-card-desc">${isTe ? "మండి ధరల పరిశీలన" : "APMC Mandi Bhav"}</div>
          </div>

          <div class="quick-access-card" onclick="window.RythuNav.navigateTo('scanner')">
            <div class="quick-card-icon" style="background:#fef3c7; color:#d97706;">🐛</div>
            <div class="quick-card-title">${isTe ? "పంట ఆరోగ్యం" : "Check Crop Health"}</div>
            <div class="quick-card-desc">${isTe ? "ఏఐ ఆకు స్కానర్" : "AI Leaf Disease Scan"}</div>
          </div>

          <div class="quick-access-card" onclick="window.RythuNav.navigateTo('calendar')">
            <div class="quick-card-icon">📅</div>
            <div class="quick-card-title">${isTe ? "పంట క్యాలెండర్" : "Crop Calendar"}</div>
            <div class="quick-card-desc">${isTe ? "దశలవారీ పనులు" : "Growth Milestones"}</div>
          </div>
        </div>
      </div>

      <!-- Two-Column Section: Market Prices Card & Crop Alerts -->
      <div style="display:grid; grid-template-columns:1.2fr 1fr; gap:1.5rem; margin-bottom:1.75rem;" class="cards-grid">
        
        <!-- Market Prices Card (Section 3) -->
        <div class="card">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem;">
            <div>
              <h3 style="font-size:1.15rem; font-weight:800; color:var(--primary-900);">
                💰 ${isTe ? "నేటి మార్కెట్ ధరలు" : "Live Mandi Rates"}
              </h3>
              <p style="font-size:0.78rem; color:var(--text-muted);">Verified Source: e-NAM & AP APMC</p>
            </div>
            <button class="btn btn-outline btn-sm" onclick="window.RythuNav.navigateTo('market')">
              ${isTe ? "మొత్తం చూడండి →" : "View All →"}
            </button>
          </div>

          <div style="display:flex; flex-direction:column; gap:0.75rem;">
            <!-- Commodity 1 -->
            <div style="background:#f8fafc; border:1px solid var(--border-subtle); border-radius:var(--radius-md); padding:0.85rem; display:flex; justify-content:space-between; align-items:center;">
              <div>
                <strong style="color:var(--primary-900); font-size:0.95rem;">Groundnut (Pod)</strong>
                <div style="font-size:0.78rem; color:var(--text-muted);">Kadapa APMC • Updated Today, 10:30 AM</div>
                <div style="font-size:0.75rem; color:var(--text-subtle); margin-top:0.2rem;">Min: ₹5,400 • Max: ₹6,650</div>
              </div>
              <div style="text-align:right;">
                <span class="price-modal-badge" style="font-size:0.95rem;">₹6,250</span>
                <div style="font-size:0.75rem; color:#16a34a; font-weight:700; margin-top:0.2rem;">▲ +₹150 Today</div>
              </div>
            </div>

            <!-- Commodity 2 -->
            <div style="background:#f8fafc; border:1px solid var(--border-subtle); border-radius:var(--radius-md); padding:0.85rem; display:flex; justify-content:space-between; align-items:center;">
              <div>
                <strong style="color:var(--primary-900); font-size:0.95rem;">Red Chilli (Guntur Teja)</strong>
                <div style="font-size:0.78rem; color:var(--text-muted);">Guntur Yard • Updated Today, 11:15 AM</div>
                <div style="font-size:0.75rem; color:var(--text-subtle); margin-top:0.2rem;">Min: ₹18,000 • Max: ₹22,500</div>
              </div>
              <div style="text-align:right;">
                <span class="price-modal-badge" style="font-size:0.95rem; background:#fff7ed; color:#c2410c; border-color:#fdba74;">₹20,500</span>
                <div style="font-size:0.75rem; color:#16a34a; font-weight:700; margin-top:0.2rem;">▲ +₹650 Demand</div>
              </div>
            </div>

            <!-- Commodity 3 -->
            <div style="background:#f8fafc; border:1px solid var(--border-subtle); border-radius:var(--radius-md); padding:0.85rem; display:flex; justify-content:space-between; align-items:center;">
              <div>
                <strong style="color:var(--primary-900); font-size:0.95rem;">Paddy (BPT 5204 Fine)</strong>
                <div style="font-size:0.78rem; color:var(--text-muted);">Nellore APMC • Updated Today, 09:45 AM</div>
                <div style="font-size:0.75rem; color:var(--text-subtle); margin-top:0.2rem;">Min: ₹2,600 • Max: ₹3,150</div>
              </div>
              <div style="text-align:right;">
                <span class="price-modal-badge" style="font-size:0.95rem;">₹2,950</span>
                <div style="font-size:0.75rem; color:#16a34a; font-weight:700; margin-top:0.2rem;">▲ +₹80 Steady</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Crop Alerts Card (Section 3) -->
        <div class="card">
          <h3 style="font-size:1.15rem; font-weight:800; color:var(--primary-900); margin-bottom:1rem;">
            🔔 ${isTe ? "పంట హెచ్చరికలు" : "Actionable Crop Alerts"}
          </h3>

          <div style="display:flex; flex-direction:column; gap:0.75rem;">
            <!-- Alert 1: Weather -->
            <div style="background:#eff6ff; border-left:4px solid #3b82f6; border-radius:var(--radius-sm); padding:0.75rem 0.9rem;">
              <div style="font-weight:700; font-size:0.88rem; color:#1e40af; margin-bottom:0.15rem;">
                🌧️ ${isTe ? "వాతావరణ హెచ్చరిక" : "Weather Alert"}
              </div>
              <div style="font-size:0.8rem; color:#1e3a8a; line-height:1.4;">
                ${isTe ? "రాబోయే 48 గంటల్లో వర్షం కురిసే అవకాశం ఉంది. మందుల పిచికారీని వాయిదా వేయండి." : "Rain showers forecast in Kadapa. Postpone foliar pesticide sprays for 48 hours."}
              </div>
            </div>

            <!-- Alert 2: Pest Monitoring -->
            <div style="background:#fffbeb; border-left:4px solid #f59e0b; border-radius:var(--radius-sm); padding:0.75rem 0.9rem;">
              <div style="font-weight:700; font-size:0.88rem; color:#92400e; margin-bottom:0.15rem;">
                🐛 ${isTe ? "చీడపీడల గమనింపు సూచన" : "Pest Monitoring Reminder"}
              </div>
              <div style="font-size:0.8rem; color:#78350f; line-height:1.4;">
                ${isTe ? "వేరుశనగలో తిక్క తెగులు మరియు ఆకుముడతను గమనించండి. ఏఐ స్కానర్‌తో ఆకును పరీక్షించండి." : "Check Groundnut bottom leaves for early Tikka spots. Use AI Scanner if yellow halos appear."}
              </div>
            </div>

            <!-- Alert 3: Activity Reminder -->
            <div style="background:#f0fdf4; border-left:4px solid #16a34a; border-radius:var(--radius-sm); padding:0.75rem 0.9rem;">
              <div style="font-weight:700; font-size:0.88rem; color:#166534; margin-bottom:0.15rem;">
                📅 ${isTe ? "పంట కార్యాచరణ సమయం" : "Crop Activity Reminder"}
              </div>
              <div style="font-size:0.8rem; color:#14532d; line-height:1.4;">
                ${isTe ? "వేరుశనగ ఊడలు దిగే 45వ రోజు. ఎకరాకు 200 కిలోల జిప్సం వేసి తేలికపాటి తడి ఇవ్వండి." : "Day 45 pegging phase: Apply Gypsum @ 200 kg/acre and stop all mechanical blade weeding."}
              </div>
            </div>
          </div>
        </div>

      </div>

      <!-- Recommended Government Schemes Section (Section 3) -->
      <div style="margin-bottom:1.5rem;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem;">
          <div>
            <h3 style="font-size:1.25rem; font-weight:800; color:var(--primary-900);">
              🏛️ ${isTe ? "మీకు వర్తించే సంక్షేమ పథకాలు" : "Recommended Government Schemes"}
            </h3>
            <p style="font-size:0.82rem; color:var(--text-muted);">Direct benefit transfers, insurance, and solar subsidies</p>
          </div>
          <button class="btn btn-outline btn-sm" onclick="window.RythuNav.navigateTo('schemes')">
            ${isTe ? "అన్ని పథకాలు →" : "All Schemes →"}
          </button>
        </div>

        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(260px, 1fr)); gap:1rem;">
          <!-- Scheme 1 -->
          <div class="card" style="border-top:4px solid #16a34a;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.5rem;">
              <span class="badge badge-info">Central Govt</span>
              <strong style="color:var(--primary-800); font-size:0.95rem;">₹6,000 / Year</strong>
            </div>
            <h4 style="font-size:1.05rem; font-weight:800; color:var(--primary-900); margin-bottom:0.35rem;">PM-KISAN Samman Nidhi</h4>
            <p style="font-size:0.8rem; color:var(--text-muted); margin-bottom:0.85rem;">Direct income support of ₹2,000 in 3 installments for all landholding farmers.</p>
            <button class="btn btn-secondary btn-sm" style="width:100%;" onclick="window.RythuNav.navigateTo('schemes')">Apply / Check Status →</button>
          </div>

          <!-- Scheme 2 -->
          <div class="card" style="border-top:4px solid #ea580c;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.5rem;">
              <span class="badge badge-harvest">Andhra Pradesh</span>
              <strong style="color:var(--primary-800); font-size:0.95rem;">₹13,500 / Year</strong>
            </div>
            <h4 style="font-size:1.05rem; font-weight:800; color:var(--primary-900); margin-bottom:0.35rem;">YSR / AP Rythu Bharosa</h4>
            <p style="font-size:0.8rem; color:var(--text-muted); margin-bottom:0.85rem;">Comprehensive input financial assistance before sowing season through RBKs.</p>
            <button class="btn btn-secondary btn-sm" style="width:100%;" onclick="window.RythuNav.navigateTo('schemes')">Apply / Check Status →</button>
          </div>

          <!-- Scheme 3 -->
          <div class="card" style="border-top:4px solid #0284c7;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.5rem;">
              <span class="badge badge-info">Crop Insurance</span>
              <strong style="color:var(--primary-800); font-size:0.95rem;">Up to 100% Cover</strong>
            </div>
            <h4 style="font-size:1.05rem; font-weight:800; color:var(--primary-900); margin-bottom:0.35rem;">PM Fasal Bima Yojana</h4>
            <p style="font-size:0.8rem; color:var(--text-muted); margin-bottom:0.85rem;">Subsidized crop insurance coverage against unseasonal drought, flood, and pests.</p>
            <button class="btn btn-secondary btn-sm" style="width:100%;" onclick="window.RythuNav.navigateTo('schemes')">Apply / Check Status →</button>
          </div>
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
    if (humEl) humEl.textContent = `${isTe ? "తేమ" : "Humidity"}: ${weather.humidity}%`;
    if (windEl) windEl.textContent = `${isTe ? "గాలి" : "Wind"}: ${weather.windSpeed} km/h`;
    if (rainEl) rainEl.textContent = `${isTe ? "వర్షం అవకాశం:" : "Rain Risk:"} ${weather.rainChance}%`;
    if (alertDescEl) alertDescEl.textContent = isTe ? weather.alertMessageTe : weather.alertMessageEn;
  }
};
