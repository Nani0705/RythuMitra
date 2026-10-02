/* ===================================================================
   🌾 RYTHUMITRA — Screen 05: Farm Weather & Forecast
   Dynamic Open-Meteo Integration with Location Switcher & Alerts
   =================================================================== */

window.RythuWeatherView = {
  currentLoc: 'kadapa',

  async init() {
    this.render();
    window.addEventListener('rythu:lang-changed', () => this.render());
  },

  async render() {
    const container = document.getElementById('view-weather');
    if (!container) return;

    const isTe = window.RythuI18n.currentLang === 'te';
    const locs = window.RythuWeather.locations;

    container.innerHTML = `
      <!-- Top Title & Location Dropdown -->
      <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:1rem; margin-bottom:1.5rem;">
        <div>
          <h1 style="font-size:1.85rem; font-weight:800; color:var(--text-main); margin-bottom:0.25rem;">
            🌦️ ${isTe ? "వ్యవసాయ వాతావరణ సమాచారం" : "Farm Weather & Climate Insights"}
          </h1>
          <p style="color:var(--text-muted); font-size:0.95rem;">
            ${isTe ? "మీ పంట పొలానికి ప్రత్యక్ష వర్షం, ఉష్ణోగ్రత మరియు 7 రోజుల సూచన" : "Hyperlocal agro-meteorological data directly for your farm"}
          </p>
        </div>

        <div style="display:flex; align-items:center; gap:0.6rem;">
          <label style="font-weight:700; font-size:0.88rem; color:var(--text-muted);">
            📍 ${isTe ? "ప్రాంతం:" : "District:"}
          </label>
          <select id="weatherLocSelect" class="form-control" style="width:auto; padding:0.5rem 1rem; border-radius:var(--radius-pill);">
            ${Object.keys(locs).map(k => `
              <option value="${k}" ${k === this.currentLoc ? 'selected' : ''}>
                ${isTe ? locs[k].nameTe : locs[k].name}
              </option>
            `).join('')}
          </select>
        </div>
      </div>

      <!-- Weather Data Container -->
      <div id="weatherViewBody">
        <div style="text-align:center; padding:3rem;">
          <div style="font-size:2rem; animation:pulseSubtle 1s infinite;">🌦️</div>
          <p style="margin-top:0.5rem; color:var(--text-muted); font-weight:600;">
            ${isTe ? "వాతావరణ సమాచారాన్ని లోడ్ చేస్తోంది..." : "Fetching live satellite weather..."}
          </p>
        </div>
      </div>
    `;

    // Bind dropdown change
    const select = document.getElementById('weatherLocSelect');
    if (select) {
      select.addEventListener('change', async (e) => {
        this.currentLoc = e.target.value;
        await this.loadWeatherData();
      });
    }

    await this.loadWeatherData();
  },

  async loadWeatherData() {
    const body = document.getElementById('weatherViewBody');
    if (!body) return;

    const isTe = window.RythuI18n.currentLang === 'te';
    const weather = await window.RythuWeather.fetchWeather(this.currentLoc);

    body.innerHTML = `
      <!-- Big Weather Card -->
      <div class="weather-banner" style="margin-bottom:1.5rem;">
        <div class="weather-banner-left">
          <div class="weather-location-pill">
            <span>📍</span>
            <span>${isTe ? weather.locationNameTe : weather.locationName}</span>
          </div>
          <div class="weather-main-temp">
            <span>${weather.icon}</span>
            <span>${weather.temp}°C</span>
          </div>
          <div class="weather-condition">
            ${isTe ? weather.conditionTe : weather.conditionEn}
          </div>
          <div class="weather-metrics-row">
            <span>💧 <strong>${isTe ? "తేమ:" : "Humidity:"} ${weather.humidity}%</strong></span>
            <span>💨 <strong>${isTe ? "గాలి:" : "Wind:"} ${weather.windSpeed} km/h</strong></span>
            <span>🌧️ <strong>${isTe ? "వర్ష సూచన:" : "Rain Chance:"} ${weather.rainChance}%</strong></span>
          </div>
        </div>
        <div style="text-align:right;">
          <div style="font-size:0.75rem; background:rgba(255,255,255,0.2); padding:0.35rem 0.75rem; border-radius:var(--radius-pill); display:inline-block; margin-bottom:0.5rem;">
            🟢 Open-Meteo Live API
          </div>
          <div style="font-size:0.75rem; opacity:0.85;">
            ${isTe ? "ఈరోజే తాజాకరించబడింది" : "Updated just now"}
          </div>
        </div>
      </div>

      <!-- Weather Advisory Banner -->
      <div class="weather-alert-box" style="margin-bottom:2rem;">
        <div class="weather-alert-icon">⚠️</div>
        <div>
          <div class="weather-alert-title">${isTe ? "వ్యవసాయ సలహా" : "AGRONOMIC ADVISORY"}</div>
          <div class="weather-alert-desc">
            ${isTe ? weather.alertMessageTe : weather.alertMessageEn}
          </div>
        </div>
      </div>

      <!-- 7-Day Forecast Grid -->
      <div class="section-header">
        <div class="section-title-wrap">
          <div class="section-title">📅 ${isTe ? "రాబోయే 7 రోజుల వాతావరణం" : "7-Day Weather Forecast"}</div>
          <div class="section-subtitle">${isTe ? "మీ వ్యవసాయ పనులను ప్లాన్ చేసుకోండి" : "Plan your irrigation, fertilizer and spraying schedules"}</div>
        </div>
      </div>

      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(135px, 1fr)); gap:1rem; margin-bottom:2rem;">
        ${(weather.forecast || []).map(day => `
          <div style="background:#fff; border:1px solid var(--border-subtle); border-radius:var(--radius-lg); padding:1rem; text-align:center; box-shadow:var(--shadow-sm); transition:transform 0.2s;" onmouseover="this.style.transform='translateY(-3px)'" onmouseout="this.style.transform='none'">
            <div style="font-weight:700; font-size:0.95rem; color:var(--text-main); margin-bottom:0.35rem;">
              ${day.dayName}
            </div>
            <div style="font-size:2rem; margin-bottom:0.35rem;">
              ${day.condition.icon}
            </div>
            <div style="font-size:0.8rem; color:var(--text-muted); margin-bottom:0.4rem; min-height:2.2em; display:flex; align-items:center; justify-content:center;">
              ${isTe ? day.condition.te : day.condition.en}
            </div>
            <div style="font-weight:800; font-size:1.05rem; color:var(--primary-800);">
              ${day.maxTemp}° <span style="font-size:0.85rem; color:var(--text-subtle); font-weight:600;">/ ${day.minTemp}°</span>
            </div>
            <div style="margin-top:0.4rem; font-size:0.75rem; color:#0284c7; font-weight:700;">
              🌧️ ${day.rainProb}%
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Agricultural Operation Guidance Table based on weather -->
      <div style="background:#fff; border:1px solid var(--border-subtle); border-radius:var(--radius-xl); padding:1.5rem; box-shadow:var(--shadow-sm);">
        <h3 style="font-size:1.15rem; font-weight:800; color:var(--text-main); margin-bottom:1rem;">
          🌾 ${isTe ? "నేటి వాతావరణానికి అనువైన వ్యవసాయ పనులు:" : "Field Activity Feasibility Index"}
        </h3>

        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:1rem;">
          <div style="border-left:4px solid #16a34a; background:var(--bg-surface-alt); padding:0.9rem; border-radius:var(--radius-sm);">
            <div style="font-weight:700; font-size:0.9rem; color:var(--text-main); margin-bottom:0.2rem;">
              🚜 ${isTe ? "దుక్కులు & సాగు పనులు" : "Ploughing & Tillage"}
            </div>
            <div style="font-size:0.82rem; color:var(--text-muted);">
              <span class="badge badge-success" style="margin-bottom:0.3rem;">Favorable</span><br/>
              ${isTe ? "నేల తేమ అనుకూలంగా ఉంది. లోతు దుక్కులు చేసుకోవచ్చు." : "Soil moisture optimal for intercultural operations."}
            </div>
          </div>

          <div style="border-left:4px solid ${weather.isRainAlert ? '#dc2626' : '#16a34a'}; background:var(--bg-surface-alt); padding:0.9rem; border-radius:var(--radius-sm);">
            <div style="font-weight:700; font-size:0.9rem; color:var(--text-main); margin-bottom:0.2rem;">
              🧪 ${isTe ? "పురుగుమందుల పిచికారీ" : "Pesticide Spraying"}
            </div>
            <div style="font-size:0.82rem; color:var(--text-muted);">
              <span class="badge ${weather.isRainAlert ? 'badge-danger' : 'badge-success'}" style="margin-bottom:0.3rem;">
                ${weather.isRainAlert ? "Unfavorable" : "Favorable"}
              </span><br/>
              ${weather.isRainAlert 
                ? (isTe ? "వర్షం వల్ల మందు కొట్టుకుపోయే ప్రమాదం ఉంది. వాయిదా వేయండి." : "Rain will wash off chemicals. Postpone sprays.") 
                : (isTe ? "గాలి వేగం తక్కువగా ఉంది. పిచికారీకి అనుకూలం." : "Low wind speeds ideal for uniform droplet coverage.")
              }
            </div>
          </div>

          <div style="border-left:4px solid #0284c7; background:var(--bg-surface-alt); padding:0.9rem; border-radius:var(--radius-sm);">
            <div style="font-weight:700; font-size:0.9rem; color:var(--text-main); margin-bottom:0.2rem;">
              💧 ${isTe ? "నీటిపారుదల" : "Crop Irrigation"}
            </div>
            <div style="font-size:0.82rem; color:var(--text-muted);">
              <span class="badge badge-info" style="margin-bottom:0.3rem;">Moderate</span><br/>
              ${weather.isRainAlert 
                ? (isTe ? "సహజ వర్షపాతం వల్ల నీటి తడులు ఆదా చేసుకోవచ్చు." : "Natural precipitation expected; hold off heavy pumping.") 
                : (isTe ? "తేలికపాటి తడులు ఇవ్వవచ్చు." : "Light irrigation can be applied to root zones.")
              }
            </div>
          </div>
        </div>
      </div>
    `;
  }
};
