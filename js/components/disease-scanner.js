/* ===================================================================
   🌾 RYTHUMITRA — Screen 07 & Screen 15: Pest & Disease + AI Leaf Scanner
   Comprehensive Diagnostic Guide + Assistive Computer Vision Demo
   =================================================================== */

window.RythuDiseaseScanner = {
  selectedCrop: 'all',
  currentScanImage: null,

  init() {
    this.render();
    this.bindEvents();
    window.addEventListener('rythu:lang-changed', () => this.render());
  },

  bindEvents() {
    const container = document.getElementById('view-diseases');
    if (!container) return;

    // Crop selection pills for disease guide
    container.addEventListener('click', (e) => {
      const pill = e.target.closest('.disease-crop-pill');
      if (pill) {
        container.querySelectorAll('.disease-crop-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        this.selectedCrop = pill.getAttribute('data-crop') || 'all';
        this.renderDiseaseCards();
      }
    });
  },

  render() {
    const container = document.getElementById('view-diseases');
    if (!container) return;

    const isTe = window.RythuI18n.currentLang === 'te';

    container.innerHTML = `
      <!-- Title -->
      <div style="margin-bottom:1.5rem;">
        <h1 style="font-size:1.85rem; font-weight:800; color:var(--text-main); margin-bottom:0.25rem;">
          🐛 ${isTe ? "పంటల చీడపీడలు & తెగుళ్ల నివారణ" : "Pest & Disease Diagnosis Guide"}
        </h1>
        <p style="color:var(--text-muted); font-size:0.95rem;">
          ${isTe ? "లక్షణాలు, ముందస్తు జాగ్రత్తలు, సేంద్రియ మరియు రసాయన యాజమాన్య పద్ధతులు" : "Scientific symptoms identification, organic solutions, and chemical spray schedules"}
        </p>
      </div>

      <!-- AI Leaf Scanner Showcase Card (PRD Screen 15) -->
      <div style="background:linear-gradient(135deg, #14532d 0%, #166534 100%); border-radius:var(--radius-xl); color:#fff; padding:1.75rem; margin-bottom:2.5rem; box-shadow:var(--shadow-card);">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:1rem; margin-bottom:1.25rem;">
          <div>
            <span class="badge" style="background:rgba(255,255,255,0.2); color:var(--accent-400); margin-bottom:0.5rem; border:1px solid rgba(255,255,255,0.3);">
              ✨ ${isTe ? "ఏఐ ఆకు స్కానర్ ఫీచర్" : "AI Assistive Feature"}
            </span>
            <h2 style="font-size:1.5rem; font-weight:800; margin-bottom:0.25rem;">
              📷 ${isTe ? "మీ పంట ఆకు ఆరోగ్యాన్ని పరీక్షించండి" : "Check Your Crop Health Instantly"}
            </h2>
            <p style="opacity:0.9; font-size:0.92rem; max-width:650px;">
              ${isTe 
                ? "తెగులు సోకిన ఆకు ఫోటోను అప్‌లోడ్ చేయండి. మా ఏఐ అల్గారిథమ్ తెగులును గుర్తించి తక్షణ నివారణ సలహాలను అందిస్తుంది." 
                : "Upload or capture a leaf photo. Our deep-learning algorithm identifies symptoms and recommends verified IPM solutions."
              }
            </p>
          </div>
          <button class="btn btn-accent btn-sm" onclick="window.RythuNav.navigateTo('scanner')">
            <span>📷</span> <span>${isTe ? "స్కానర్ తెరవండి →" : "Launch AI Scanner →"}</span>
          </button>
        </div>

        <!-- 4-Step Process Breadcrumb -->
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(140px, 1fr)); gap:0.75rem; background:rgba(0,0,0,0.2); padding:1rem; border-radius:var(--radius-lg);">
          <div style="display:flex; align-items:center; gap:0.5rem; font-size:0.85rem; font-weight:700;">
            <span style="width:26px; height:26px; border-radius:50%; background:var(--accent-500); color:#fff; display:flex; align-items:center; justify-content:center; font-size:0.75rem;">1</span>
            <span>${isTe ? "ఆకు ఫోటో అప్‌లోడ్" : "Upload Leaf Photo"}</span>
          </div>
          <div style="display:flex; align-items:center; gap:0.5rem; font-size:0.85rem; font-weight:700;">
            <span style="width:26px; height:26px; border-radius:50%; background:var(--accent-500); color:#fff; display:flex; align-items:center; justify-content:center; font-size:0.75rem;">2</span>
            <span>${isTe ? "ఏఐ విశ్లేషణ" : "AI Vision Scan"}</span>
          </div>
          <div style="display:flex; align-items:center; gap:0.5rem; font-size:0.85rem; font-weight:700;">
            <span style="width:26px; height:26px; border-radius:50%; background:var(--accent-500); color:#fff; display:flex; align-items:center; justify-content:center; font-size:0.75rem;">3</span>
            <span>${isTe ? "తెగులు గుర్తింపు" : "Issue Detection"}</span>
          </div>
          <div style="display:flex; align-items:center; gap:0.5rem; font-size:0.85rem; font-weight:700;">
            <span style="width:26px; height:26px; border-radius:50%; background:var(--accent-500); color:#fff; display:flex; align-items:center; justify-content:center; font-size:0.75rem;">4</span>
            <span>${isTe ? "నివారణ సలహాలు" : "Treatment Plan"}</span>
          </div>
        </div>
      </div>

      <!-- Disease Catalog Section -->
      <div class="section-header">
        <div class="section-title-wrap">
          <div class="section-title">🌿 ${isTe ? "పంటల వారీగా ప్రధాన సమస్యలు" : "Crop-wise Common Problems & Remedies"}</div>
          <div class="section-subtitle">${isTe ? "సరైన నివారణతో పంట నష్టాన్ని నివారించండి" : "Select your crop to view specific pests, fungal blights and organic treatments"}</div>
        </div>
      </div>

      <!-- Crop Filter Pills -->
      <div class="filter-tabs" style="margin-bottom:1.5rem;">
        <button class="filter-tab disease-crop-pill ${this.selectedCrop === 'all' ? 'active' : ''}" data-crop="all">
          ${isTe ? "అన్ని పంటలు" : "All Crops"}
        </button>
        <button class="filter-tab disease-crop-pill ${this.selectedCrop === 'groundnut' ? 'active' : ''}" data-crop="groundnut">
          🥜 ${isTe ? "వేరుశనగ" : "Groundnut"}
        </button>
        <button class="filter-tab disease-crop-pill ${this.selectedCrop === 'paddy' ? 'active' : ''}" data-crop="paddy">
          🌾 ${isTe ? "వరి" : "Paddy"}
        </button>
        <button class="filter-tab disease-crop-pill ${this.selectedCrop === 'cotton' ? 'active' : ''}" data-crop="cotton">
          🌿 ${isTe ? "ప్రత్తి" : "Cotton"}
        </button>
        <button class="filter-tab disease-crop-pill ${this.selectedCrop === 'chilli' ? 'active' : ''}" data-crop="chilli">
          🌶️ ${isTe ? "మిరప" : "Chilli"}
        </button>
      </div>

      <!-- Disease Cards Grid -->
      <div id="diseaseCardsContainer" class="cards-grid"></div>
    `;

    this.renderDiseaseCards();
  },

  renderDiseaseCards() {
    const grid = document.getElementById('diseaseCardsContainer');
    if (!grid) return;

    const isTe = window.RythuI18n.currentLang === 'te';
    const diseases = window.RYTHU_DISEASES_DATA || [];

    const filtered = diseases.filter(d => this.selectedCrop === 'all' || d.cropId === this.selectedCrop);

    grid.innerHTML = filtered.map(d => `
      <div class="crop-card" style="border-top:4px solid ${d.severity === 'Critical' ? '#dc2626' : '#d97706'};">
        <div class="crop-card-img-wrap" style="height:170px;">
          <img src="${d.image}" alt="${d.nameEn}" class="crop-card-img" />
          <div class="crop-card-badge" style="background:#fee2e2; color:#b91c1c;">
            ${d.severity} Severity
          </div>
        </div>

        <div class="crop-card-body">
          <div style="font-size:0.75rem; color:var(--primary-700); font-weight:700; text-transform:uppercase; margin-bottom:0.25rem;">
            ${isTe ? d.cropNameTe : d.cropNameEn} • ${isTe ? d.typeTe : d.type}
          </div>
          <h3 style="font-size:1.15rem; font-weight:800; color:var(--text-main); margin-bottom:0.2rem;">
            ${isTe ? d.nameTe : d.nameEn}
          </h3>
          <div style="font-size:0.82rem; color:var(--text-subtle); margin-bottom:0.75rem;">
            ${isTe ? d.nameEn : d.nameTe}
          </div>

          <div style="background:var(--bg-surface-alt); padding:0.75rem; border-radius:var(--radius-md); margin-bottom:0.85rem;">
            <div style="font-size:0.75rem; font-weight:700; color:var(--text-subtle);">${isTe ? "ప్రధాన లక్షణాలు:" : "Symptoms:"}</div>
            <p style="font-size:0.82rem; color:var(--text-main); line-height:1.45;">
              ${isTe ? d.symptomsTe : d.symptoms}
            </p>
          </div>

          <div style="margin-bottom:0.75rem;">
            <div style="font-size:0.75rem; font-weight:700; color:#15803d; margin-bottom:0.15rem;">
              🌱 ${isTe ? "సేంద్రియ నివారణ:" : "Organic Management:"}
            </div>
            <p style="font-size:0.8rem; color:var(--text-muted); line-height:1.4;">
              ${isTe ? d.organicControlTe : d.organicControl}
            </p>
          </div>

          <div style="margin-bottom:1rem;">
            <div style="font-size:0.75rem; font-weight:700; color:#b45309; margin-bottom:0.15rem;">
              🧪 ${isTe ? "రసాయన నివారణ:" : "Chemical Management:"}
            </div>
            <p style="font-size:0.8rem; color:var(--text-muted); line-height:1.4;">
              ${isTe ? d.chemicalControlTe : d.chemicalControl}
            </p>
          </div>

          <button class="btn btn-outline btn-sm" style="width:100%; margin-top:auto;" onclick="window.RythuDiseaseScanner.openDiseaseModal('${d.id}')">
            ${isTe ? "సమగ్ర వివరాలు చూడండి →" : "View Full Advisory →"}
          </button>
        </div>
      </div>
    `).join('');
  },

  openDiseaseModal(id) {
    const d = (window.RYTHU_DISEASES_DATA || []).find(item => item.id === id);
    if (!d) return;

    const isTe = window.RythuI18n.currentLang === 'te';
    const content = document.getElementById('cropDetailModalContent');
    if (!content) return;

    content.innerHTML = `
      <div style="display:flex; align-items:center; gap:0.5rem; margin-bottom:0.5rem;">
        <span class="badge badge-danger">${d.severity}</span>
        <span style="font-size:0.85rem; color:var(--text-muted); font-weight:600;">${isTe ? d.cropNameTe : d.cropNameEn} • ${isTe ? d.typeTe : d.type}</span>
      </div>
      <h2 style="font-size:1.5rem; font-weight:800; color:var(--primary-900); margin-bottom:0.25rem;">
        ${isTe ? d.nameTe : d.nameEn}
      </h2>
      <div style="font-size:0.95rem; color:var(--text-subtle); margin-bottom:1.25rem;">
        (${isTe ? d.nameEn : d.nameTe})
      </div>

      <img src="${d.image}" alt="${d.nameEn}" style="width:100%; height:200px; object-fit:cover; border-radius:var(--radius-md); margin-bottom:1.25rem;" />

      <div style="display:flex; flex-direction:column; gap:1rem;">
        <div style="background:#fff; border:1px solid var(--border-subtle); border-radius:var(--radius-md); padding:1rem;">
          <h4 style="font-weight:700; color:var(--text-main); margin-bottom:0.25rem;">🔍 ${isTe ? "తెగులు లక్షణాలు:" : "Symptoms & Visual Signs"}</h4>
          <p style="font-size:0.9rem; color:var(--text-muted); line-height:1.5;">${isTe ? d.symptomsTe : d.symptoms}</p>
        </div>

        <div style="background:#fff; border:1px solid var(--border-subtle); border-radius:var(--radius-md); padding:1rem;">
          <h4 style="font-weight:700; color:#b45309; margin-bottom:0.25rem;">⚠️ ${isTe ? "వ్యాప్తి కారణాలు & అనుకూల వాతావరణం:" : "Causal Organism & Weather Triggers"}</h4>
          <p style="font-size:0.9rem; color:var(--text-muted); line-height:1.5;">${isTe ? d.causesTe : d.causes}</p>
        </div>

        <div style="background:#fff; border:1px solid var(--border-subtle); border-radius:var(--radius-md); padding:1rem;">
          <h4 style="font-weight:700; color:#15803d; margin-bottom:0.25rem;">🌿 ${isTe ? "సేంద్రియ / సహజ నివారణ పద్ధతులు:" : "Organic / Biological Control"}</h4>
          <p style="font-size:0.9rem; color:var(--text-muted); line-height:1.5;">${isTe ? d.organicControlTe : d.organicControl}</p>
        </div>

        <div style="background:#fff; border:1px solid var(--border-subtle); border-radius:var(--radius-md); padding:1rem;">
          <h4 style="font-weight:700; color:#b91c1c; margin-bottom:0.25rem;">🧪 ${isTe ? "రసాయన క్రిమిసంహారక మందులు (సిఫార్సు మోతాదు):" : "Recommended Chemical Sprays"}</h4>
          <p style="font-size:0.9rem; color:var(--text-muted); line-height:1.5;">${isTe ? d.chemicalControlTe : d.chemicalControl}</p>
        </div>
      </div>
    `;

    window.RythuModals.openModal('cropDetailModal');
  },

  // Interactive AI Scanner Page (Screen 15)
  renderScannerPage() {
    const container = document.getElementById('view-scanner');
    if (!container) return;

    const isTe = window.RythuI18n.currentLang === 'te';

    container.innerHTML = `
      <!-- Header -->
      <div style="margin-bottom:1.5rem;">
        <h1 style="font-size:1.85rem; font-weight:800; color:var(--text-main); margin-bottom:0.25rem;">
          📷 ${isTe ? "ఏఐ ఆకు తెగుళ్ల స్కానర్ (బీటా)" : "AI Crop Leaf Health Scanner (Beta)"}
        </h1>
        <p style="color:var(--text-muted); font-size:0.95rem;">
          ${isTe ? "ఆకు ఫోటోను తీయండి లేదా అప్‌లోడ్ చేయండి. కంప్యూటర్ విజన్ ద్వారా తక్షణ తెగులు విశ్లేషణ." : "Upload or take a photo of an infected leaf for instant assistive diagnosis and action steps."}
        </p>
      </div>

      <!-- Scanner Area Grid -->
      <div class="scanner-container">
        <!-- Left: Upload / Dropzone -->
        <div class="scanner-box" id="scannerDropArea">
          <input type="file" id="scannerFileInput" accept="image/*" style="display:none;" />
          
          <div id="scannerPlaceholder">
            <div class="scanner-icon">🍃</div>
            <h3 style="font-size:1.15rem; font-weight:800; color:var(--text-main); margin-bottom:0.4rem;">
              ${isTe ? "ఆకు ఫోటోను ఇక్కడ వేయండి లేదా అప్‌లోడ్ చేయండి" : "Drop leaf photo here or click to browse"}
            </h3>
            <p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:1.25rem;">
              ${isTe ? "మొబైల్ కెమెరా లేదా గ్యాలరీ నుండి ఎంచుకోండి (JPG, PNG)" : "Use your mobile camera or device gallery (JPG, PNG up to 10MB)"}
            </p>
            <div style="display:flex; flex-wrap:wrap; gap:0.6rem; justify-content:center;">
              <button class="btn btn-primary btn-sm" onclick="document.getElementById('scannerFileInput').click()">
                <span>📁</span> <span>${isTe ? "ఫోటోను ఎంచుకోండి" : "Upload File"}</span>
              </button>
              <button class="btn btn-secondary btn-sm" onclick="window.RythuDiseaseScanner.loadSampleImage()">
                <span>🥜</span> <span>${isTe ? "వేరుశనగ ఆకు నమూనా వాడండి" : "Use Sample Groundnut Leaf"}</span>
              </button>
            </div>
          </div>

          <!-- Preview Wrap -->
          <div class="scanner-preview-wrap" id="scannerPreviewWrap">
            <img id="scannerPreviewImg" src="" alt="Scanned Leaf" class="scanner-preview-img" />
            <div class="scanner-laser-line" id="scannerLaser"></div>
          </div>
        </div>

        <!-- Right: Results Card -->
        <div class="scanner-results-card" id="scannerResultsCard">
          <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:1rem;">
            <h3 style="font-size:1.15rem; font-weight:800; color:var(--text-main);">
              ${isTe ? "పరీక్ష ఫలితం" : "Diagnostic Report"}
            </h3>
            <span id="scanStatusBadge" class="badge badge-info">${isTe ? "సిద్ధంగా ఉంది" : "Awaiting Scan"}</span>
          </div>

          <!-- Initial Empty State -->
          <div id="scannerEmptyState" style="text-align:center; padding:3rem 1rem; color:var(--text-muted);">
            <div style="font-size:2.5rem; margin-bottom:0.5rem;">🔬</div>
            <p style="font-weight:600; font-size:0.95rem;">
              ${isTe ? "ఆకు ఫోటోను అప్‌లోడ్ చేసి విశ్లేషణ ప్రారంభించండి" : "Upload an infected leaf photograph to begin AI diagnostics"}
            </p>
          </div>

          <!-- Processing State -->
          <div id="scannerProcessingState" style="display:none; text-align:center; padding:3rem 1rem;">
            <div style="font-size:2.5rem; animation:pulseSubtle 0.8s infinite;">🧠</div>
            <h4 style="font-weight:800; color:var(--primary-800); margin:0.5rem 0 0.25rem;">
              ${isTe ? "ఏఐ విశ్లేషిస్తోంది..." : "Analyzing Plant Tissue & Chlorosis..."}
            </h4>
            <p style="font-size:0.85rem; color:var(--text-muted);">
              ${isTe ? "న్యూరల్ నెట్‌వర్క్ ద్వారా మచ్చల స్వభావాన్ని లెక్కిస్తోంది..." : "Matching spot contours against 15,000+ agricultural disease patterns..."}
            </p>
          </div>

          <!-- Results Details State -->
          <div id="scannerResultDetails" style="display:none; flex-direction:column; gap:1rem;">
            <div style="background:var(--bg-surface-alt); padding:1rem; border-radius:var(--radius-md); border-left:4px solid #16a34a;">
              <div style="font-size:0.75rem; font-weight:700; color:var(--text-subtle); text-transform:uppercase;">
                ${isTe ? "గుర్తించిన వ్యాధి:" : "Identified Condition:"}
              </div>
              <div style="font-size:1.25rem; font-weight:800; color:var(--primary-900); margin:0.15rem 0;">
                <span id="resDiseaseName">Tikka Leaf Spot (వేరుశనగ తిక్క ఆకుమచ్చ)</span>
              </div>
              <div style="display:flex; gap:0.5rem; align-items:center; margin-top:0.35rem;">
                <span class="badge badge-success" id="resConfidence">96.4% Match</span>
                <span style="font-size:0.78rem; color:var(--text-muted);">Crop: Groundnut (Arachis hypogaea)</span>
              </div>
            </div>

            <div>
              <h5 style="font-weight:700; font-size:0.88rem; color:var(--text-main); margin-bottom:0.25rem;">
                🔍 ${isTe ? "గమనించిన లక్షణాలు:" : "Visual Observations:"}
              </h5>
              <p id="resSymptoms" style="font-size:0.85rem; color:var(--text-muted); line-height:1.45;">
                Circular necrotic spots with yellow chlorotic rings on upper and lower epidermis. High probability of early Cercospora conidia development.
              </p>
            </div>

            <div style="background:#f0fdf4; border:1px solid var(--border-brand); padding:0.9rem; border-radius:var(--radius-md);">
              <h5 style="font-weight:700; font-size:0.85rem; color:#15803d; margin-bottom:0.25rem;">
                🌱 ${isTe ? "తక్షణ సిఫార్సు (సహజ నివారణ):" : "Immediate Step (Organic):"}
              </h5>
              <p id="resOrganic" style="font-size:0.82rem; color:#166534; line-height:1.4;">
                Spray 5% Neem Seed Kernel Extract (NSKE) or Panchagavya (30ml/L). Remove severely diseased bottom leaves.
              </p>
            </div>

            <div style="background:#fffbeb; border:1px solid #fef08a; padding:0.9rem; border-radius:var(--radius-md);">
              <h5 style="font-weight:700; font-size:0.85rem; color:#b45309; margin-bottom:0.25rem;">
                🧪 ${isTe ? "రసాయన క్రిమిసంహారకం:" : "Chemical Intervention:"}
              </h5>
              <p id="resChemical" style="font-size:0.82rem; color:#78350f; line-height:1.4;">
                Spray Saaf (Carbendazim 12% + Mancozeb 63% WP) @ 2g per liter water. Repeat in 15 days if humidity remains high.
              </p>
            </div>

            <!-- Mandatory PRD Disclaimer -->
            <div style="background:#fef2f2; border:1px solid #fee2e2; padding:0.75rem; border-radius:var(--radius-md); font-size:0.75rem; color:#991b1b; line-height:1.4;">
              ⚠️ <strong>${isTe ? "ముఖ్య గమనిక:" : "Disclaimer:"}</strong> ${isTe 
                ? "ఈ ఏఐ ఫలితం కేవలం ప్రాథమిక సూచన మాత్రమే. ఖరీదైన రసాయనాలు కొనుగోలు చేసేముందు సమీప రైతు భరోసా కేంద్రం (ఆర్బీకే) వ్యవసాయ అధికారిని సంప్రదించండి." 
                : "AI output is an assistive indication, not a guaranteed diagnosis. Consult your local Rythu Bharosa Kendram (RBK) officer for severe infections."}
            </div>

            <button class="btn btn-secondary btn-sm" onclick="window.RythuDiseaseScanner.resetScanner()" style="margin-top:0.5rem;">
              🔄 ${isTe ? "మరో ఆకును పరీక్షించండి" : "Scan Another Leaf"}
            </button>
          </div>
        </div>
      </div>
    `;

    this.bindScannerEvents();
  },

  bindScannerEvents() {
    const fileInput = document.getElementById('scannerFileInput');
    const dropArea = document.getElementById('scannerDropArea');

    if (fileInput) {
      fileInput.addEventListener('change', (e) => {
        if (e.target.files && e.target.files[0]) {
          this.processImageFile(e.target.files[0]);
        }
      });
    }

    if (dropArea) {
      dropArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropArea.classList.add('dragover');
      });
      dropArea.addEventListener('dragleave', () => {
        dropArea.classList.remove('dragover');
      });
      dropArea.addEventListener('drop', (e) => {
        e.preventDefault();
        dropArea.classList.remove('dragover');
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
          this.processImageFile(e.dataTransfer.files[0]);
        }
      });
    }
  },

  loadSampleImage() {
    const sampleUrl = "assets/images/leaf_disease_sample.jpg";
    this.displayAndAnalyzeImage(sampleUrl);
  },

  processImageFile(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.displayAndAnalyzeImage(e.target.result);
    };
    reader.readAsDataURL(file);
  },

  displayAndAnalyzeImage(imageUrl) {
    const previewWrap = document.getElementById('scannerPreviewWrap');
    const previewImg = document.getElementById('scannerPreviewImg');
    const placeholder = document.getElementById('scannerPlaceholder');
    const laser = document.getElementById('scannerLaser');
    const emptyState = document.getElementById('scannerEmptyState');
    const processingState = document.getElementById('scannerProcessingState');
    const resultDetails = document.getElementById('scannerResultDetails');
    const statusBadge = document.getElementById('scanStatusBadge');

    if (!previewWrap || !previewImg) return;

    previewImg.src = imageUrl;
    previewWrap.style.display = 'block';
    placeholder.style.display = 'none';

    // Start laser animation
    laser.style.display = 'block';
    laser.style.animation = 'scanLaser 1.5s infinite';

    emptyState.style.display = 'none';
    processingState.style.display = 'block';
    resultDetails.style.display = 'none';
    statusBadge.className = 'badge badge-warning';
    statusBadge.textContent = 'Scanning...';

    // Simulate 1.8 second AI neural network scan
    setTimeout(() => {
      laser.style.display = 'none';
      processingState.style.display = 'none';
      resultDetails.style.display = 'flex';
      statusBadge.className = 'badge badge-success';
      statusBadge.textContent = 'Diagnosed';

      // Log to local notifications
      window.RythuFirebase.localState.notifications.unshift({
        id: "scan-" + Date.now(),
        titleEn: "Leaf Scan Completed",
        titleTe: "ఆకు స్కానింగ్ పూర్తయింది",
        bodyEn: "Identified Tikka Leaf Spot on Groundnut with 96.4% confidence.",
        bodyTe: "వేరుశనగ తిక్క ఆకుమచ్చ తెగులు 96.4% ఖచ్చితత్వంతో గుర్తించబడింది.",
        time: "Just now",
        read: false,
        type: "scan"
      });
      window.RythuNav.updateNotificationBadge();
    }, 1800);
  },

  resetScanner() {
    const previewWrap = document.getElementById('scannerPreviewWrap');
    const placeholder = document.getElementById('scannerPlaceholder');
    const emptyState = document.getElementById('scannerEmptyState');
    const resultDetails = document.getElementById('scannerResultDetails');
    const statusBadge = document.getElementById('scanStatusBadge');

    if (previewWrap) previewWrap.style.display = 'none';
    if (placeholder) placeholder.style.display = 'flex';
    if (emptyState) emptyState.style.display = 'block';
    if (resultDetails) resultDetails.style.display = 'none';
    if (statusBadge) {
      statusBadge.className = 'badge badge-info';
      statusBadge.textContent = 'Awaiting Scan';
    }
  }
};
