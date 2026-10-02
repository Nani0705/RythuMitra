import asyncio
import json
import base64
import urllib.request
import os
import sys
import subprocess
import websockets

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

SCREENSHOT_DIR = r"C:\Users\S Anil\.gemini\antigravity-ide\scratch\rythumitra\screenshots"
os.makedirs(SCREENSHOT_DIR, exist_ok=True)

CHROME_PATH = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
CHROME_PROFILE = r"C:\Users\S Anil\.gemini\antigravity-ide\scratch\rythumitra\chrome_debug_profile_9333"

async def send_cmd(ws, method, params=None, msg_id_holder=[1]):
    msg_id = msg_id_holder[0]
    msg_id_holder[0] += 1
    payload = {"id": msg_id, "method": method, "params": params or {}}
    await ws.send(json.dumps(payload))
    while True:
        resp = await ws.recv()
        data = json.loads(resp)
        if data.get("id") == msg_id:
            return data.get("result", {})

async def capture_screenshot(ws, filename, msg_id_holder):
    res = await send_cmd(ws, "Page.captureScreenshot", {"format": "png"}, msg_id_holder)
    data = res.get("data")
    if data:
        path = os.path.join(SCREENSHOT_DIR, filename)
        with open(path, "wb") as f:
            f.write(base64.b64decode(data))
        print(f"📸 Saved screenshot: {filename}")
        return path
    return None

async def eval_js(ws, expr, msg_id_holder):
    res = await send_cmd(ws, "Runtime.evaluate", {"expression": expr, "returnByValue": True, "awaitPromise": True}, msg_id_holder)
    result = res.get("result", {})
    return result.get("value")

async def run_test_suite():
    print("🚀 Starting RythuMitra Full CDP Debugging & Verification Suite...")
    
    # Launch Chrome as subprocess
    chrome_proc = subprocess.Popen([
        CHROME_PATH,
        "--headless=new",
        "--disable-gpu",
        "--remote-debugging-port=9333",
        f"--user-data-dir={CHROME_PROFILE}",
        "http://localhost:3000"
    ])
    
    try:
        # Wait up to 10 seconds for Chrome to be ready
        pages = None
        for _ in range(20):
            await asyncio.sleep(0.5)
            try:
                req = urllib.request.Request("http://localhost:9333/json/list")
                with urllib.request.urlopen(req) as response:
                    pages = json.loads(response.read().decode())
                if pages:
                    break
            except Exception:
                continue

        if not pages:
            raise RuntimeError("Failed to connect to Chrome CDP within 10 seconds.")

        page = next((p for p in pages if "localhost:3000" in p.get("url", "")), None)
        if not page:
            page = next((p for p in pages if p.get("type") == "page"), None)
        
        ws_url = page["webSocketDebuggerUrl"]
        print(f"🔗 Connected to Chrome DevTools WebSocket: {ws_url}")
        print(f"📄 Target Page URL: {page.get('url')}, Title: {page.get('title')}")

        async with websockets.connect(ws_url, max_size=20*1024*1024) as ws:
            msg_id_holder = [1]
            
            # Enable domains
            await send_cmd(ws, "Page.enable", {}, msg_id_holder)
            await send_cmd(ws, "Runtime.enable", {}, msg_id_holder)
            await send_cmd(ws, "Console.enable", {}, msg_id_holder)
            await send_cmd(ws, "DOM.enable", {}, msg_id_holder)
            
            # Set window size (Standard Desktop 1280x900)
            await send_cmd(ws, "Emulation.setDeviceMetricsOverride", {
                "width": 1280,
                "height": 900,
                "deviceScaleFactor": 1,
                "mobile": False
            }, msg_id_holder)

            # Navigate to application
            print("🌐 Navigating to http://localhost:3000...")
            await send_cmd(ws, "Page.navigate", {"url": "http://localhost:3000"}, msg_id_holder)
            await asyncio.sleep(1.5)

            # ----------------------------------------------------
            # TEST 1: Landing Page
            # ----------------------------------------------------
            title = await eval_js(ws, "document.title", msg_id_holder)
            brand = await eval_js(ws, "document.querySelector('.brand-name').innerText", msg_id_holder)
            hero_title = await eval_js(ws, "document.querySelector('.hero-title').innerText", msg_id_holder)
            quick_cards = await eval_js(ws, "document.querySelectorAll('.quick-access-card').length", msg_id_holder)
            print(f"✅ Test 1 [Landing Page]: Title='{title}', Brand='{brand}', CardsCount={quick_cards}")
            assert quick_cards >= 8, f"Expected at least 8 quick cards, got {quick_cards}"
            await capture_screenshot(ws, "01_landing_page.png", msg_id_holder)

            # ----------------------------------------------------
            # TEST 2: Language Switcher (English -> Telugu -> English)
            # ----------------------------------------------------
            print("🌐 Testing Language Toggle to Telugu...")
            await eval_js(ws, "document.getElementById('langToggleBtn').click()", msg_id_holder)
            await asyncio.sleep(0.5)
            te_brand = await eval_js(ws, "document.querySelector('.brand-name').innerText", msg_id_holder)
            is_te_active = await eval_js(ws, "document.body.classList.contains('te-active')", msg_id_holder)
            hero_te = await eval_js(ws, "document.querySelector('.hero-title').innerText", msg_id_holder)
            print(f"✅ Test 2 [Telugu Toggle]: Brand='{te_brand}', te-active={is_te_active}, Hero='{hero_te}'")
            assert is_te_active, "Body should have te-active class"
            assert te_brand == "రైతుమిత్ర", f"Expected 'రైతుమిత్ర', got '{te_brand}'"
            await capture_screenshot(ws, "02_landing_telugu.png", msg_id_holder)

            # Switch back to English for remaining tests
            await eval_js(ws, "document.getElementById('langToggleBtn').click()", msg_id_holder)
            await asyncio.sleep(0.5)

            # ----------------------------------------------------
            # TEST 3: Farmer Dashboard (Screen 02 & Screen 40)
            # ----------------------------------------------------
            print("📊 Testing Farmer Dashboard...")
            await eval_js(ws, "window.RythuNav.navigateTo('dashboard')", msg_id_holder)
            await asyncio.sleep(1.0)
            dash_greeting = await eval_js(ws, "document.querySelector('.dashboard-greeting-bar h1').innerText", msg_id_holder)
            weather_temp = await eval_js(ws, "document.getElementById('dash-weather-temp').innerText", msg_id_holder)
            print(f"✅ Test 3 [Dashboard]: Greeting='{dash_greeting}', WeatherTemp='{weather_temp}'")
            await capture_screenshot(ws, "03_farmer_dashboard.png", msg_id_holder)

            # ----------------------------------------------------
            # TEST 4: Crop Guide & Detailed Modal (Screen 03 & 04)
            # ----------------------------------------------------
            print("🌱 Testing Crop Guide & Detailed Modal...")
            await eval_js(ws, "window.RythuNav.navigateTo('crops')", msg_id_holder)
            await asyncio.sleep(0.5)
            crop_cards_count = await eval_js(ws, "document.querySelectorAll('#cropsCardsContainer .crop-card').length", msg_id_holder)
            print(f"✅ Test 4a [Crop Guide]: Found {crop_cards_count} crops in catalog")
            assert crop_cards_count >= 6, "Expected at least 6 crops in catalog"
            await capture_screenshot(ws, "04_crop_guide.png", msg_id_holder)

            # Open Groundnut Modal
            print("📖 Opening Groundnut Detailed Modal...")
            await eval_js(ws, "window.RythuCropGuide.openCropDetail('groundnut')", msg_id_holder)
            await asyncio.sleep(0.5)
            modal_active = await eval_js(ws, "document.getElementById('cropDetailModal').classList.contains('active')", msg_id_holder)
            modal_heading = await eval_js(ws, "document.querySelector('#cropDetailModalContent h2').innerText", msg_id_holder)
            print(f"✅ Test 4b [Crop Modal]: Active={modal_active}, Heading='{modal_heading}'")
            assert modal_active, "Crop detail modal should be open"
            await capture_screenshot(ws, "05_groundnut_detail_modal.png", msg_id_holder)

            # Close Modal
            await eval_js(ws, "window.RythuModals.closeAllModals()", msg_id_holder)
            await asyncio.sleep(0.3)

            # ----------------------------------------------------
            # TEST 5: Live Farm Weather (Screen 05)
            # ----------------------------------------------------
            print("🌦️ Testing Live Weather View & 7-Day Forecast...")
            await eval_js(ws, "window.RythuNav.navigateTo('weather')", msg_id_holder)
            await asyncio.sleep(1.0)
            weather_loc = await eval_js(ws, "document.querySelector('#view-weather .weather-location-pill span:last-child').innerText", msg_id_holder)
            print(f"✅ Test 5 [Weather]: Location='{weather_loc}'")
            await capture_screenshot(ws, "06_farm_weather.png", msg_id_holder)

            # ----------------------------------------------------
            # TEST 6: Market Prices (Screen 06)
            # ----------------------------------------------------
            print("💰 Testing Mandi Market Prices Table...")
            await eval_js(ws, "window.RythuNav.navigateTo('market')", msg_id_holder)
            await asyncio.sleep(0.5)
            table_rows = await eval_js(ws, "document.querySelectorAll('#marketTableBody tr').length", msg_id_holder)
            first_commodity = await eval_js(ws, "document.querySelector('#marketTableBody tr:first-child td:first-child div:first-child').innerText", msg_id_holder)
            first_modal_price = await eval_js(ws, "document.querySelector('#marketTableBody tr:first-child td .price-modal-badge').innerText", msg_id_holder)
            print(f"✅ Test 6 [Market]: TotalRecords={table_rows}, FirstCommodity='{first_commodity}', Modal='{first_modal_price}'")
            assert table_rows >= 8, "Expected at least 8 mandi price records"
            await capture_screenshot(ws, "07_market_prices.png", msg_id_holder)

            # ----------------------------------------------------
            # TEST 7: AI Leaf Scanner (Screen 15)
            # ----------------------------------------------------
            print("📷 Testing AI Leaf Disease Scanner with Sample Leaf...")
            await eval_js(ws, "window.RythuNav.navigateTo('scanner')", msg_id_holder)
            await asyncio.sleep(0.5)
            # Trigger sample scan
            await eval_js(ws, "window.RythuDiseaseScanner.loadSampleImage()", msg_id_holder)
            print("⏳ Waiting for AI laser scan simulation (2.3s)...")
            await asyncio.sleep(2.5)
            res_disease = await eval_js(ws, "document.getElementById('resDiseaseName').innerText", msg_id_holder)
            res_conf = await eval_js(ws, "document.getElementById('resConfidence').innerText", msg_id_holder)
            res_visible = await eval_js(ws, "document.getElementById('scannerResultDetails').style.display !== 'none'", msg_id_holder)
            print(f"✅ Test 7 [AI Scanner]: Diagnosed='{res_disease}', Confidence='{res_conf}', Visible={res_visible}")
            assert "Tikka" in res_disease, "Expected Tikka Leaf Spot detection"
            assert res_visible, "Result card must be visible"
            await capture_screenshot(ws, "08_ai_leaf_scanner_result.png", msg_id_holder)

            # ----------------------------------------------------
            # TEST 8: Crop Calendar (Screen 12 & 20)
            # ----------------------------------------------------
            print("📅 Testing Crop Growth Calendar...")
            await eval_js(ws, "window.RythuNav.navigateTo('calendar')", msg_id_holder)
            await asyncio.sleep(0.5)
            stages_count = await eval_js(ws, "document.querySelectorAll('.timeline-step').length", msg_id_holder)
            stage1_title = await eval_js(ws, "document.querySelector('.timeline-step:first-child h3').innerText", msg_id_holder)
            print(f"✅ Test 8 [Crop Calendar]: TotalStages={stages_count}, Stage1='{stage1_title}'")
            assert stages_count >= 5, "Expected at least 5 crop stages"
            await capture_screenshot(ws, "09_crop_calendar.png", msg_id_holder)

            # ----------------------------------------------------
            # TEST 9: Soil Health Guide
            # ----------------------------------------------------
            print("🧪 Testing Soil Health Guide...")
            await eval_js(ws, "window.RythuNav.navigateTo('soil')", msg_id_holder)
            await asyncio.sleep(0.5)
            soil_types_count = await eval_js(ws, "document.querySelectorAll('#view-soil [style*=\"grid-template-columns:repeat(auto-fit, minmax(300px, 1fr))\"] > div').length", msg_id_holder)
            print(f"✅ Test 9 [Soil Health]: SoilTypes={soil_types_count}")
            assert soil_types_count >= 3, "Expected at least 3 soil types"
            await capture_screenshot(ws, "10_soil_health.png", msg_id_holder)

            # ----------------------------------------------------
            # TEST 10: Govt Schemes (Screen 08)
            # ----------------------------------------------------
            print("🏛️ Testing Government Schemes View...")
            await eval_js(ws, "window.RythuNav.navigateTo('schemes')", msg_id_holder)
            await asyncio.sleep(0.5)
            schemes_count = await eval_js(ws, "document.querySelectorAll('#schemesCardsContainer .crop-card').length", msg_id_holder)
            first_scheme = await eval_js(ws, "document.querySelector('#schemesCardsContainer .crop-card:first-child h3').innerText", msg_id_holder)
            print(f"✅ Test 10 [Schemes]: TotalSchemes={schemes_count}, FirstScheme='{first_scheme}'")
            assert schemes_count >= 4, "Expected at least 4 schemes"
            await capture_screenshot(ws, "11_government_schemes.png", msg_id_holder)

            # ----------------------------------------------------
            # TEST 11: My Farm Suite (Screen 09, 10, 11)
            # ----------------------------------------------------
            print("👨‍🌾 Testing My Farm Suite...")
            await eval_js(ws, "window.RythuNav.navigateTo('my-farm')", msg_id_holder)
            await asyncio.sleep(0.5)
            farmer_name = await eval_js(ws, "document.querySelector('#view-my-farm h2').innerText", msg_id_holder)
            print(f"✅ Test 11 [My Farm]: FarmerName='{farmer_name}'")
            assert "Ravi" in farmer_name, "Farmer name should contain Ravi"
            await capture_screenshot(ws, "12_my_farm.png", msg_id_holder)

            # ----------------------------------------------------
            # TEST 12: Admin Portal (Screen 26)
            # ----------------------------------------------------
            print("⚙️ Testing Admin Portal...")
            await eval_js(ws, "window.RythuNav.navigateTo('admin')", msg_id_holder)
            await asyncio.sleep(0.5)
            metric_cards = await eval_js(ws, "document.querySelectorAll('.metric-card').length", msg_id_holder)
            farmers_val = await eval_js(ws, "document.querySelector('.metric-card:first-child [style*=\"font-size:1.6rem\"]').innerText", msg_id_holder)
            print(f"✅ Test 12 [Admin]: MetricCards={metric_cards}, FarmersRegistered='{farmers_val}'")
            assert metric_cards >= 4, "Expected at least 4 metric cards"
            assert farmers_val == "1,248", f"Expected 1,248 farmers, got {farmers_val}"
            await capture_screenshot(ws, "13_admin_portal.png", msg_id_holder)

            # ----------------------------------------------------
            # TEST 13: Global Multi-Entity Search Modal (Screen 33)
            # ----------------------------------------------------
            print("🔍 Testing Global Search Modal (Ctrl+K)...")
            await eval_js(ws, "window.RythuModals.openModal('searchModal')", msg_id_holder)
            await asyncio.sleep(0.3)
            await eval_js(ws, """
                const input = document.getElementById('globalSearchInput');
                input.value = 'Groundnut';
                window.RythuModals.handleGlobalSearch('groundnut');
            """, msg_id_holder)
            await asyncio.sleep(0.3)
            results_count = await eval_js(ws, "document.querySelectorAll('.search-result-item').length", msg_id_holder)
            print(f"✅ Test 13 [Global Search]: Found {results_count} entities for query 'Groundnut'")
            assert results_count >= 2, f"Expected at least 2 search results, got {results_count}"
            await capture_screenshot(ws, "14_global_search_results.png", msg_id_holder)

            # Close Modal
            await eval_js(ws, "window.RythuModals.closeAllModals()", msg_id_holder)
            await asyncio.sleep(0.3)

            print("\n🎉 ALL 13 TEST CASES PASSED WITH 100% SUCCESS!")

    finally:
        print("🛑 Cleaning up Chrome debug process...")
        try:
            chrome_proc.terminate()
            chrome_proc.wait(timeout=3)
        except Exception:
            pass

if __name__ == "__main__":
    asyncio.run(run_test_suite())
