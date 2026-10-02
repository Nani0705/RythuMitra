# 🌾 RythuMitra (రైతుమిత్ర)
### Smart Digital Farming Platform for Indian Farmers
**Product Version:** 1.0 • **Project Category:** CSP + College Web Application  
**Frontend Design Language:** Google Stitch Agricultural Design System  
**Frontend Stack:** HTML5 / Modern CSS / Vanilla JavaScript (ES6+ Architecture)  
**Backend:** Firebase (Authentication, Cloud Firestore, Firebase Storage, Firebase Hosting)  
**Primary Languages:** Bilingual English + Telugu (తెలుగు)  
**Target:** Mobile-First Responsive Web Application  

---

## 🌟 1. Product Vision & Overview

**RythuMitra** (“Your Digital Farming Companion”) is a multilingual digital platform designed specifically for small, medium, and commercial Indian farmers (with a primary focus on Rayalaseema & coastal Andhra Pradesh crops: Groundnut, Paddy, Cotton, Chilli, Tomato, and Maize).

The platform directly answers critical daily farming questions:
- 🌱 **Which crop is suitable & how should I cultivate it?** (Deep package of practices from ANGRAU & ICAR)
- 🌦️ **What is upcoming weather?** (Real-time agro-meteorological forecast via Open-Meteo API)
- 💰 **What are the current mandi market prices?** (Daily e-NAM & APMC rates with Min/Max/Modal prices)
- 🐛 **What could be affecting my crop?** (Pest & disease diagnosis with organic and chemical remedies)
- 📷 **Can AI check my crop's health?** (Interactive AI Leaf Disease Scanner with confidence scoring)
- 💧 **When should I monitor irrigation?** (Critical moisture stages & weather advisory alerts)
- 🧪 **What should I know about my soil?** (Soil testing guide & Soil Health Card scheme)
- 🏛️ **Which government schemes apply to me?** (PM-KISAN, YSR Rythu Bharosa, PMFBY, APMIP Drip Subsidy)
- 📅 **What activities should I remember for my crop?** (Interactive growth milestone calendar)

---

## 🎨 2. Google Stitch Design System

RythuMitra implements a dedicated **Google Stitch** design system tailored for rural accessibility:
- **Color Palette:**
  - `Primary:` Deep Agriculture Green (`#14532d` / `#166534`)
  - `Secondary:` Fresh Leaf Green (`#22c55e` / `#15803d`)
  - `Accent:` Harvest Golden Wheat (`#f59e0b` / `#d97706`)
  - `Background:` Natural Warm Off-White (`#f7faf5`)
  - `Soil / Earth:` Fertile Loam Brown (`#78350f`)
  - `Water / Sky:` Agro Rain Blue (`#0284c7`)
- **Typography:** Plus Jakarta Sans & Noto Sans Telugu for crystal-clear readability.
- **Farmer-First Ergonomics:** Large touch targets (≥44px), high-contrast badges, rounded cards (`border-radius: 14px - 28px`), large iconography, and minimal cognitive friction.
- **Responsive Navigation:**
  - **Desktop:** Sticky top search bar, language toggle, and left-hand drawer navigation.
  - **Mobile:** Sticky bottom navigation (`🏠 Home`, `🌱 Crops`, `💰 Market`, `👨‍🌾 My Farm`, `☰ More`).

---

## 🚀 3. Core Screens & Architecture

1. **Screen 01 — Landing Page:** Hero banner with rural Andhra Pradesh sunrise imagery, punchy headline, quick access grid to all tools.
2. **Screen 02 & 40 — Farmer Dashboard:** Personalized greeting (`Good Morning, Ravi 👋`), live location tag (`📍 Kadapa, Andhra Pradesh`), Open-Meteo live weather banner, active rain advisory, farm summary, active crops status, and quick action buttons.
3. **Screen 03 — Crop Guide:** Search bar and category chips (Food Crops, Oil Seeds, Commercial, Vegetables).
4. **Screen 04 — Crop Details Modal:** Deep agronomic guidance (Overview, Sowing, Irrigation, NPK Fertilizers, Pests, Diseases, and Harvesting).
5. **Screen 05 — Farm Weather:** District selector (Kadapa, Kurnool, Anantapur, Guntur, Tirupati, Nellore), 7-day forecast cards, and field feasibility indices.
6. **Screen 06 — Market Prices (Mandi Bhav):** Live APMC mandi table with Min, Max, Modal prices, trends (▲/▼), and official e-NAM source tags.
7. **Screen 07 — Pest & Disease Guide:** Comprehensive symptoms, organic solutions (Neem oil, Trichoderma), and chemical sprays.
8. **Screen 15 — AI Leaf Disease Scanner (Beta):** Interactive photo upload and mobile camera simulation with laser scanning animation, 96.4% confidence detection, remedies, and verified disclaimer.
9. **Screen 08 — Government Schemes:** PM-KISAN, YSR Rythu Bharosa (₹13,500/yr), PMFBY Crop Insurance, Micro-Irrigation Drip subsidies, eligibility, required documents, and application steps.
10. **Screen 09, 10, 11 — My Farm Suite:** Farm profile with land acreage, soil type, water source, active crops, interactive `+ Add Farm` and `+ Add Crop` modals.
11. **Screen 12 & 20 — Crop Calendar:** Milestone-by-milestone growth timeline (Sowing → Germination → Vegetative → Flowering → Pod Filling → Harvest) with progress indicator.
12. **Screen 26 — Admin Portal (CSP Evaluator Mode):** Telemetry cards (1,248 Farmers, 834 Farms, 42 Crops, 68 Articles) and CRUD tables.
13. **Screen 33 — Global Multi-Entity Search:** Real-time indexed search (Ctrl+K) across all database entities.

---

## 💻 4. How to Run Locally

Because RythuMitra is built with native modern web standards (HTML5, Vanilla CSS, ES6+ modules) and uses CDN-based services, **no build step or `npm install` is required**.

### Running with Python (Windows / Mac / Linux):
```powershell
# Navigate to the project directory
cd "C:\Users\S Anil\.gemini\antigravity-ide\scratch\rythumitra"

# Start the local server
py -m http.server 3000
```
Open your browser and navigate to: **`http://localhost:3000`**

Or simply double-click and open **`index.html`** in any modern web browser!

---

## 🔥 5. Firebase Setup & Deployment

### Production Rules
- `firebase/firestore.rules`: Enforces that farmers can only modify their own farms and crops, while anyone can read public crop guides, diseases, schemes, and market prices.
- `firebase/storage.rules`: Governs image uploads for leaf scans and profile photos.
- `firebase/firebase.json`: Single-page app hosting routing rules.

### Deploying to Firebase Hosting:
```bash
# 1. Install Firebase CLI (if not already installed)
npm install -g firebase-tools

# 2. Login to Google account
firebase login

# 3. Initialize Firebase project
firebase use --add

# 4. Deploy
firebase deploy
```

---

## 🌐 6. Multilingual Engine (English & Telugu)

All text strings, crop names, agronomic advice, market terms, and button labels are organized inside `js/i18n.js`. Clicking the **`తెలుగు | EN`** button in the header instantly switches the interface between English and Telugu without page reload!

---

## 🏆 CSP Project Evaluation Checklist

- [x] High-fidelity Stitch UI design with natural agricultural theme
- [x] Mobile-first responsive layout (tested for phone & desktop)
- [x] Full bilingual support (English + Telugu)
- [x] Real-time Open-Meteo API weather integration with Kadapa coordinates
- [x] e-NAM verified Mandi prices with search & district filters
- [x] AI Leaf Disease Scanner with scanning animation & disclaimer
- [x] Complete My Farm profile with Add Farm & Add Crop capabilities
- [x] Interactive Crop Calendar growth milestone tracker
- [x] Government schemes with eligibility criteria & application steps
- [x] Cloud Firestore & Firebase Storage security rules configured
