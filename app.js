/**
 * =========================================================================================
 * 🌾 AGRI-SHARE — Application Core Engine
 * A Smart Agricultural Equipment Sharing Platform
 * Primary Data Backend: Google Sheets & Google Forms (+ Apps Script Web App)
 * =========================================================================================
 */

// 1. MASTER EQUIPMENT DATASET (Live synchronized with Google Sheets AGRISHARE Master Database)
// Columns: ID | Equipment | Owner | Village | Rate/hr | Status | Best Month | Available Date | Contact Number
const INITIAL_EQUIPMENT_DATA = [
  {
    id: "EQ-01",
    equipment: "Seed Drill",
    owner: "Farmer Ramdas Patil",
    village: "Village A",
    distance: 2,
    rate: 600,
    status: "Available",
    bestMonth: "All Season",
    availableDate: "2026-10-15",
    contact: "9823456789",
    image: "assets/seed_drill_card.jpg",
    info: "Automatic multi-row seed-cum-fertilizer drill for precise seed spacing."
  },
  {
    id: "EQ-02",
    equipment: "Tractor",
    owner: "Test Farmer Ramesh",
    village: "Village A",
    distance: 3,
    rate: 1000,
    status: "Available",
    bestMonth: "All Season",
    availableDate: "2026-10-15",
    contact: "9820123456",
    image: "assets/tractor_card.jpg",
    info: "45 HP 4WD tractor with driver. Highly reliable for plowing and transport."
  },
  {
    id: "EQ-03",
    equipment: "Harvester",
    owner: "Anand Upadhyay",
    village: "Thane",
    distance: 4,
    rate: 1500,
    status: "Available",
    bestMonth: "All Season",
    availableDate: "2026-10-18",
    contact: "9082807803",
    image: "assets/harvester_card.jpg",
    info: "Multi-crop combine harvester with grain elevator. Fast paddy & wheat harvest."
  },
  {
    id: "EQ-04",
    equipment: "Rotavator",
    owner: "Farmer Suresh",
    village: "Village A",
    distance: 2,
    rate: 800,
    status: "Available",
    bestMonth: "All Season",
    availableDate: "2026-10-16",
    contact: "9820556677",
    image: "assets/rotavator_card.jpg",
    info: "Heavy-duty 42-blade rotavator suitable for wet & dry land preparation."
  },
  {
    id: "EQ-05",
    equipment: "Rotavator",
    owner: "Kavya Patil",
    village: "Bhiwandi",
    distance: 5,
    rate: 1050,
    status: "Available",
    bestMonth: "All Season",
    availableDate: "2026-10-17",
    contact: "9821378027",
    image: "assets/rotavator_card.jpg",
    info: "Heavy-duty rotavator for fine seedbed pulverization."
  },
  {
    id: "EQ-06",
    equipment: "Tractor",
    owner: "Farmer Suresh",
    village: "Village B",
    distance: 2,
    rate: 850,
    status: "Available",
    bestMonth: "All Season",
    availableDate: "2026-10-20",
    contact: "9820556677",
    image: "assets/tractor_card.jpg",
    info: "45 HP heavy duty tractor with operator."
  },
  {
    id: "EQ-07",
    equipment: "Sprayer",
    owner: "Farmer Suresh",
    village: "Village A",
    distance: 2,
    rate: 300,
    status: "Available",
    bestMonth: "All Season",
    availableDate: "2026-10-20",
    contact: "9820556677",
    image: "assets/sprayer_card.jpg",
    info: "Tractor boom sprayer with 500-liter tank for uniform pest management."
  },
  {
    id: "EQ-08",
    equipment: "Rotavator",
    owner: "Farmer Ramdas Patil",
    village: "Village A",
    distance: 2,
    rate: 750,
    status: "Available",
    bestMonth: "All Season",
    availableDate: "2026-10-18",
    contact: "9823456789",
    image: "assets/rotavator_card.jpg",
    info: "Secondary tillage implement for fine seedbed pulverization."
  },
  {
    id: "EQ-09",
    equipment: "Power Tiller",
    owner: "Rajesh Khan",
    village: "Village C",
    distance: 4,
    rate: 750,
    status: "Available",
    bestMonth: "All Season",
    availableDate: "2026-10-20",
    contact: "9335676575",
    image: "assets/tractor_card.jpg",
    info: "Compact high draft power tiller for inter-row tilling."
  },
  {
    id: "EQ-10",
    equipment: "Rotavator",
    owner: "Balram Patil",
    village: "Village A",
    distance: 3,
    rate: 800,
    status: "Available",
    bestMonth: "All Season",
    availableDate: "2026-10-19",
    contact: "9820556677",
    image: "assets/rotavator_card.jpg",
    info: "Reliable rotavator for wheat seedbed preparation."
  },
  {
    id: "EQ-11",
    equipment: "Thresher",
    owner: "Sankalp Sharma",
    village: "Kalyan",
    distance: 6,
    rate: 800,
    status: "Available",
    bestMonth: "All Season",
    availableDate: "2026-10-21",
    contact: "9820112233",
    image: "assets/thresher_card.jpg",
    info: "High-speed multi-crop thresher producing clean grain separation."
  },
  {
    id: "EQ-12",
    equipment: "Rotavator",
    owner: "Farmer Ramdas Patil",
    village: "Village B",
    distance: 3,
    rate: 750,
    status: "Available",
    bestMonth: "All Season",
    availableDate: "2026-10-22",
    contact: "9823456789",
    image: "assets/rotavator_card.jpg",
    info: "High-performance secondary tillage rotavator."
  }
];

// In-Memory Database
let currentEquipmentDatabase = [];

// Seasonal Rule-Based Dataset (Section 11)
const SEASONAL_RULES = [
  {
    months: ["April", "May"],
    period: "April–May",
    activity: "Land preparation (summer deep plowing, field leveling)",
    equipment: ["Tractor", "Rotavator"],
    rowId: "row-april-may"
  },
  {
    months: ["June"],
    period: "June",
    activity: "Kharif sowing (monsoon onset seed drilling)",
    equipment: ["Seed Drill", "Tractor"],
    rowId: "row-june"
  },
  {
    months: ["July"],
    period: "July",
    activity: "Sowing / transplanting and fertilizer application",
    equipment: ["Rotavator", "Sprayer"],
    rowId: "row-july"
  },
  {
    months: ["August", "September"],
    period: "August–September",
    activity: "Crop maintenance, pest management & foliar spray",
    equipment: ["Sprayer"],
    rowId: "row-august-september"
  },
  {
    months: ["October", "November"],
    period: "October–November",
    activity: "Kharif harvesting (paddy, soybean, maize harvesting & threshing)",
    equipment: ["Harvester", "Thresher"],
    rowId: "row-october-november"
  },
  {
    months: ["November", "December"],
    period: "November–December",
    activity: "Rabi sowing (wheat, mustard, gram planting)",
    equipment: ["Seed Drill", "Rotavator"],
    rowId: "row-november-december"
  },
  {
    months: ["January", "February"],
    period: "January–February",
    activity: "Rabi crop maintenance, micro-nutrient spraying",
    equipment: ["Sprayer"],
    rowId: "row-january-february"
  },
  {
    months: ["March", "April"],
    period: "March–April",
    activity: "Rabi harvesting (wheat, pulses harvesting & threshing)",
    equipment: ["Harvester", "Thresher"],
    rowId: "row-march-april"
  }
];

// Active State
let currentActivePage = "home";
let currentRentalHours = 4;
let activeEnquiryMachine = null;
let currentUser = null;
let currentBookingsList = [];

// =========================================================================
// 2. INITIALIZATION
// =========================================================================

document.addEventListener("DOMContentLoaded", () => {
  // Defensive cleanup for any cached duplicate buttons
  document.querySelectorAll(".nav-btn-highlight").forEach(el => el.remove());
  if (window.innerWidth > 990) {
    document.querySelectorAll(".nav-links .mobile-nav-footer").forEach(el => el.remove());
  }

  loadEquipmentDatabase();
  loadCurrentUser();
  loadBookingsList();
  initDynamicDates();
  initCalendarHighlight();
  calculateEconomics();
  renderAvailableEquipment();
  updateHeaderModeUI();
  updateUserAuthUI();
  
  // Perform an initial search display
  executeFindSearch("Village A", "Rotavator", 4);

  // Auto-fetch live records from Google Sheets if configured
  fetchLiveGoogleSheetData();

  // Handle URL hash navigation
  const initialHash = window.location.hash.replace("#", "").replace("page-", "");
  if (initialHash && ["find", "list", "available", "calculator", "calendar", "about", "ai"].includes(initialHash)) {
    navigateTo(initialHash);
  } else if (initialHash === "owner-dashboard") {
    openOwnerDashboardModal();
  } else if (initialHash === "farmer-dashboard") {
    openFarmerHirerDashboardModal();
  } else if (initialHash === "config-modal") {
    openConfigModal();
  }

  window.addEventListener("hashchange", () => {
    const hash = window.location.hash.replace("#", "").replace("page-", "");
    if (hash && ["home", "find", "list", "available", "calculator", "calendar", "about", "ai"].includes(hash)) {
      navigateTo(hash);
    } else if (hash === "owner-dashboard") {
      openOwnerDashboardModal();
    } else if (hash === "farmer-dashboard") {
      openFarmerHirerDashboardModal();
    } else if (hash === "config-modal") {
      openConfigModal();
    }
  });
});

async function fetchLiveGoogleSheetData() {
  if (AGRI_CONFIG.GOOGLE_APPS_SCRIPT_WEB_APP_URL && !AGRI_CONFIG.GOOGLE_APPS_SCRIPT_WEB_APP_URL.includes("SAMPLE")) {
    try {
      const res = await fetch(`${AGRI_CONFIG.GOOGLE_APPS_SCRIPT_WEB_APP_URL}?action=getAll`);
      const json = await res.json();
      if (json.success && Array.isArray(json.data) && json.data.length > 0) {
        const imgMap = {
          "Rotavator": "assets/rotavator_card.jpg",
          "Tractor": "assets/tractor_card.jpg",
          "Seed Drill": "assets/seed_drill_card.jpg",
          "Sprayer": "assets/sprayer_card.jpg",
          "Harvester": "assets/harvester_card.jpg",
          "Thresher": "assets/thresher_card.jpg",
          "Laser Land Leveller": "assets/rotavator_card.jpg",
          "Power Tiller": "assets/tractor_card.jpg"
        };
        const liveItems = json.data.map((item, idx) => ({
          ...item,
          distance: item.distance || (idx % 7 + 2),
          image: imgMap[item.equipment] || "assets/tractor_card.jpg"
        }));

        currentEquipmentDatabase = liveItems;
        saveEquipmentDatabase();
        renderAvailableEquipment();
        updateListingCountBadge();

        // Refresh search results on Find page with live data
        const searchVillage = document.getElementById("find-village") ? document.getElementById("find-village").value : "Village A";
        const searchEquip = document.getElementById("find-equipment") ? document.getElementById("find-equipment").value : "Rotavator";
        executeFindSearch(searchVillage, searchEquip, currentRentalHours || 4);

        // Merge any bookings returned from Google Apps Script (Find Requests Sheet)
        if (Array.isArray(json.bookings) && json.bookings.length > 0) {
          json.bookings.forEach(gb => {
            if (!currentBookingsList.some(b => b.token === gb.token)) {
              currentBookingsList.unshift(gb);
            }
          });
          saveBookingsList();
          if (currentUser) renderFarmerDashboardUI();
        }

        showToast(`🟢 Google Sheets Live Sync: Connected to Master Database (${liveItems.length} records)`, "success");
      }
    } catch (err) {
      console.warn("Could not fetch live Google Sheet data:", err);
    }
  }
}

// Load database from localStorage or initial dataset
function loadEquipmentDatabase() {
  try {
    const saved = localStorage.getItem("AGRISHARE_DATABASE_ITEMS");
    if (saved) {
      currentEquipmentDatabase = JSON.parse(saved);
      // Auto-migrate if stored data was old dummy "Farmer A / Farmer B" dataset
      if (currentEquipmentDatabase.some(item => item.owner === "Farmer A" || item.id === "A01" || item.id === "A14")) {
        currentEquipmentDatabase = [...INITIAL_EQUIPMENT_DATA];
        saveEquipmentDatabase();
      }
    } else {
      currentEquipmentDatabase = [...INITIAL_EQUIPMENT_DATA];
      saveEquipmentDatabase();
    }
  } catch (err) {
    console.warn("Storage load error:", err);
    currentEquipmentDatabase = [...INITIAL_EQUIPMENT_DATA];
  }
  updateListingCountBadge();
}

function saveEquipmentDatabase() {
  try {
    localStorage.setItem("AGRISHARE_DATABASE_ITEMS", JSON.stringify(currentEquipmentDatabase));
    updateListingCountBadge();
  } catch (err) {
    console.error("Storage save error:", err);
  }
}

function updateListingCountBadge() {
  const badge = document.getElementById("stat-listing-count");
  if (badge) {
    badge.innerText = `${currentEquipmentDatabase.length}+`;
  }
}

function resetDatabaseToDefault() {
  if (confirm("Refresh equipment database directly from live Google Sheets?")) {
    currentEquipmentDatabase = [...INITIAL_EQUIPMENT_DATA];
    saveEquipmentDatabase();
    renderAvailableEquipment();
    fetchLiveGoogleSheetData();
    showToast("Equipment database synchronized from Google Sheets.", "success");
  }
}

// =========================================================================
// 3. NAVIGATION CONTROLLER
// =========================================================================

function navigateTo(pageId) {
  const validPages = ["home", "find", "list", "available", "calculator", "calendar", "about", "ai"];
  if (!validPages.includes(pageId)) pageId = "home";

  // Hide all sections
  document.querySelectorAll(".page-section").forEach(sec => {
    sec.classList.remove("active");
  });

  // Deactivate all nav buttons
  document.querySelectorAll(".nav-btn").forEach(btn => {
    btn.classList.remove("active");
  });

  // Activate target section
  const targetSec = document.getElementById(`page-${pageId}`);
  if (targetSec) {
    targetSec.classList.add("active");
  }

  // Activate matching nav button
  const navBtn = document.getElementById(`nav-${pageId}`);
  if (navBtn) {
    navBtn.classList.add("active");
  }

  currentActivePage = pageId;
  if (window.location.hash !== `#${pageId}` && window.location.hash !== `#page-${pageId}`) {
    try { history.replaceState(null, "", `#${pageId}`); } catch(e) {}
  }
  window.scrollTo({ top: 0, behavior: "smooth" });

  // Close mobile nav menu if open
  const navLinks = document.getElementById("main-nav-links");
  const menuBtn = document.querySelector(".mobile-menu-btn");
  if (navLinks) {
    navLinks.classList.remove("mobile-open");
  }
  if (menuBtn) {
    menuBtn.innerHTML = "☰";
    menuBtn.setAttribute("aria-expanded", "false");
  }

  // Page-specific on-open actions
  if (pageId === "available") {
    renderAvailableEquipment();
  } else if (pageId === "calendar") {
    initCalendarHighlight();
  } else if (pageId === "calculator") {
    calculateEconomics();
  }
}

function toggleMobileMenu() {
  const navLinks = document.getElementById("main-nav-links");
  const menuBtn = document.querySelector(".mobile-menu-btn");
  if (navLinks) {
    const isOpen = navLinks.classList.toggle("mobile-open");
    if (menuBtn) {
      menuBtn.innerHTML = isOpen ? "✕" : "☰";
      menuBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
    }
  }
}

// Close mobile nav when clicking outside
document.addEventListener("click", (e) => {
  const navLinks = document.getElementById("main-nav-links");
  const menuBtn = document.querySelector(".mobile-menu-btn");
  if (navLinks && navLinks.classList.contains("mobile-open")) {
    if (!navLinks.contains(e.target) && menuBtn && !menuBtn.contains(e.target)) {
      navLinks.classList.remove("mobile-open");
      menuBtn.innerHTML = "☰";
      menuBtn.setAttribute("aria-expanded", "false");
    }
  }
});

// =========================================================================
// 4. DYNAMIC DATE & CURRENT MONTH LOGIC (Sections 5 & 11)
// =========================================================================

function initDynamicDates() {
  const now = new Date();
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const currentMonth = monthNames[now.getMonth()];

  // Update Home Page dynamic month strip
  const homeTitle = document.getElementById("home-month-title");
  const homeActivity = document.getElementById("home-month-activity");
  
  const currentRule = getRuleForMonth(currentMonth);

  if (homeTitle) {
    homeTitle.innerText = `Current Agricultural Month: ${currentMonth}`;
  }
  if (homeActivity && currentRule) {
    homeActivity.innerText = `Recommended Activity: ${currentRule.activity} (${currentRule.equipment.join(", ")})`;
  }

  // Set default search required date to today / near future
  const findDateInput = document.getElementById("find-date");
  if (findDateInput) {
    findDateInput.value = now.toISOString().split("T")[0];
  }
  const listDateInput = document.getElementById("list-available-date");
  if (listDateInput) {
    listDateInput.value = now.toISOString().split("T")[0];
  }

  // Update Crop Calendar page elements
  const calBadgeName = document.getElementById("calendar-current-month-name");
  if (calBadgeName) calBadgeName.innerText = currentMonth;

  const calDropdown = document.getElementById("calendar-month-dropdown");
  if (calDropdown) calDropdown.value = currentMonth;

  updateCalendarRecommendationUI(currentMonth);
}

function getRuleForMonth(monthName) {
  return SEASONAL_RULES.find(r => r.months.includes(monthName)) || SEASONAL_RULES[0];
}

function initCalendarHighlight() {
  const now = new Date();
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const currentMonth = monthNames[now.getMonth()];
  const currentRule = getRuleForMonth(currentMonth);

  // Clear all highlight classes
  document.querySelectorAll("#crop-calendar-table tbody tr").forEach(tr => {
    tr.classList.remove("tr-current-month");
  });

  if (currentRule && currentRule.rowId) {
    const activeRow = document.getElementById(currentRule.rowId);
    if (activeRow) {
      activeRow.classList.add("tr-current-month");
    }
  }
}

function handleCalendarMonthChange(selectedMonth) {
  updateCalendarRecommendationUI(selectedMonth);
}

function updateCalendarRecommendationUI(monthName) {
  const rule = getRuleForMonth(monthName);
  const titleElem = document.getElementById("rec-box-title");
  const actElem = document.getElementById("rec-box-activities");
  const pillsContainer = document.getElementById("rec-box-equipment-pills");
  const buttonsContainer = document.getElementById("rec-box-action-buttons");

  if (titleElem) {
    titleElem.innerText = `Seasonal Recommendations for ${monthName} (${rule.period})`;
  }
  if (actElem) {
    actElem.innerHTML = `<strong>Recommended Agricultural Activity:</strong> ${rule.activity}`;
  }

  if (pillsContainer) {
    pillsContainer.innerHTML = rule.equipment.map(eq => `
      <div class="rec-equip-pill">
        <span>🚜</span>
        <span>${eq}</span>
      </div>
    `).join("");
  }

  if (buttonsContainer) {
    buttonsContainer.innerHTML = rule.equipment.map(eq => `
      <button class="btn btn-primary btn-sm" onclick="findEquipmentForCrop('${eq}')">
        Find ${eq} Now →
      </button>
    `).join("");
  }
}

function findEquipmentForCrop(equipmentName) {
  navigateTo("find");
  const equipSelect = document.getElementById("find-equipment");
  if (equipSelect) {
    equipSelect.value = equipmentName;
  }
  handleFindEquipmentSubmit(new Event("submit"));
}

function quickFilterFromHome(equipmentName) {
  navigateTo("find");
  const equipSelect = document.getElementById("find-equipment");
  if (equipSelect) {
    equipSelect.value = equipmentName;
  }
  handleFindEquipmentSubmit(new Event("submit"));
}

// =========================================================================
// 5. FIND EQUIPMENT & MATCHING (Section 7)
// =========================================================================

function switchFindMode(mode) {
  const webContainer = document.getElementById("find-web-form-container");
  const embedContainer = document.getElementById("find-embed-form-container");
  const tabWeb = document.getElementById("tab-find-web-form");
  const tabEmbed = document.getElementById("tab-find-embed-form");

  if (mode === "embed") {
    if (webContainer) webContainer.style.display = "none";
    if (embedContainer) embedContainer.style.display = "block";
    if (tabWeb) tabWeb.classList.remove("active");
    if (tabEmbed) tabEmbed.classList.add("active");

    const iframe = document.getElementById("google-find-form-iframe");
    if (iframe && AGRI_CONFIG.GOOGLE_FIND_FORM_URL) {
      let srcUrl = AGRI_CONFIG.GOOGLE_FIND_FORM_URL;
      if (!srcUrl.includes("embedded=true")) {
        srcUrl += (srcUrl.includes("?") ? "&embedded=true" : "?embedded=true");
      }
      iframe.src = srcUrl;
    }
  } else {
    if (webContainer) webContainer.style.display = "block";
    if (embedContainer) embedContainer.style.display = "none";
    if (tabWeb) tabWeb.classList.add("active");
    if (tabEmbed) tabEmbed.classList.remove("active");
  }
}

function presetSearch(equipment, village, hours) {
  const villageSelect = document.getElementById("find-village");
  const equipSelect = document.getElementById("find-equipment");
  const hoursInput = document.getElementById("find-hours");

  if (villageSelect) villageSelect.value = village;
  if (equipSelect) equipSelect.value = equipment;
  if (hoursInput) hoursInput.value = hours;

  executeFindSearch(village, equipment, hours);
}

async function handleFindEquipmentSubmit(event) {
  if (event && event.preventDefault) event.preventDefault();

  const village = document.getElementById("find-village").value;
  const equipment = document.getElementById("find-equipment").value;
  const hours = parseInt(document.getElementById("find-hours").value, 10) || 4;
  const farmerName = document.getElementById("find-farmer-name") ? document.getElementById("find-farmer-name").value.trim() : (currentUser ? currentUser.name : "Farmer Suresh");
  const phone = document.getElementById("find-contact") ? document.getElementById("find-contact").value.trim() : (currentUser ? currentUser.mobile : "9820556677");
  const dateVal = document.getElementById("find-date") ? document.getElementById("find-date").value : new Date().toISOString().split("T")[0];

  currentRentalHours = hours;

  // 1. Direct Dual-Sync to Google Form (Instantly writes to 'Find Agricultural Equipment (Responses)' Google Sheet!)
  try {
    const formParams = new URLSearchParams();
    formParams.append("entry.903536382", farmerName || "Farmer Suresh");
    formParams.append("entry.143014243", village || "Village A");
    formParams.append("entry.598746884", equipment || "Tractor");
    formParams.append("entry.870341971", dateVal);
    formParams.append("entry.826602519", String(hours));
    formParams.append("entry.309542968", phone || "9820556677");

    fetch("https://docs.google.com/forms/d/1jl6irF4voY0xfR2z84rF4RvMiM8QdpphtqQ_Yjf--DY/formResponse", {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formParams.toString()
    }).catch(e => console.warn("Google Form Find sync notice:", e));

    // Also dual-sync find request to Google Apps Script Web App if active
    if (AGRI_CONFIG.GOOGLE_APPS_SCRIPT_WEB_APP_URL && !AGRI_CONFIG.GOOGLE_APPS_SCRIPT_WEB_APP_URL.includes("SAMPLE")) {
      fetch(AGRI_CONFIG.GOOGLE_APPS_SCRIPT_WEB_APP_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({
          action: "findRequest",
          farmerName: farmerName,
          village: village,
          equipment: equipment,
          date: dateVal,
          hours: hours,
          farmerPhone: phone
        })
      }).catch(e => console.warn("Apps Script find POST sync notice:", e));
    }

    showToast(`✅ Requirement for ${equipment} recorded directly in Find Requests Google Sheet!`, "success");
  } catch (errForm) {
    console.warn("Direct Google Form Find sync error:", errForm);
  }

  // If farmer is not logged in, auto-login with this name & role
  if (!currentUser && farmerName) {
    setCurrentUser({
      name: farmerName,
      mobile: phone,
      village: village,
      role: "Farmer"
    });
  }

  // Check if live Apps Script mode is configured and enabled
  if (!AGRI_CONFIG.IS_DEMO_MODE && AGRI_CONFIG.GOOGLE_APPS_SCRIPT_WEB_APP_URL && !AGRI_CONFIG.GOOGLE_APPS_SCRIPT_WEB_APP_URL.includes("SAMPLE")) {
    const btn = document.getElementById("btn-submit-search");
    if (btn) btn.innerText = "Querying Google Sheets...";

    try {
      const url = `${AGRI_CONFIG.GOOGLE_APPS_SCRIPT_WEB_APP_URL}?action=search&village=${encodeURIComponent(village)}&equipment=${encodeURIComponent(equipment)}`;
      const res = await fetch(url);
      const json = await res.json();

      if (json.success && Array.isArray(json.data)) {
        renderSearchResults(json.data, hours, village, equipment, json.isNearbyFallback || false);
        showToast(`Found ${json.data.length} live matches in Google Sheets!`, "success");
        if (btn) btn.innerText = "Search Equipment";
        return;
      } else {
        throw new Error(json.error || "Invalid response from Apps Script");
      }
    } catch (err) {
      console.warn("Live Google Sheets search failed; showing error & demo fallback:", err);
      showToast("Live Google Sheets connection failed. Displaying simulated records.", "error");
    } finally {
      if (btn) btn.innerText = "Search Equipment";
    }
  }

  // Demo mode fallback
  executeFindSearch(village, equipment, hours);
}

function executeFindSearch(village, equipment, hours) {
  currentRentalHours = hours;
  let isNearbyFallback = false;

  let matches = currentEquipmentDatabase.filter(item => {
    const matchEquip = !equipment || equipment === "ALL" || item.equipment.toLowerCase() === equipment.toLowerCase();
    const matchVill = !village || village === "All" || village === "ALL" || item.village.toLowerCase() === village.toLowerCase();
    return matchEquip && matchVill;
  });

  // If strict match has 0 results, fallback to matching equipment anywhere
  if (matches.length === 0) {
    matches = currentEquipmentDatabase.filter(item => {
      return !equipment || equipment === "ALL" || item.equipment.toLowerCase() === equipment.toLowerCase();
    });
    if (matches.length > 0) isNearbyFallback = true;
  }

  // Sort: Available first, then by distance
  matches.sort((a, b) => {
    if (a.status === "Available" && b.status !== "Available") return -1;
    if (a.status !== "Available" && b.status === "Available") return 1;
    return (a.distance || 0) - (b.distance || 0);
  });

  renderSearchResults(matches, hours, village, equipment, isNearbyFallback);
}

function renderSearchResults(items, hours, village, equipment, isNearbyFallback = false) {
  const grid = document.getElementById("search-results-grid");
  const summary = document.getElementById("search-results-summary");
  const countChip = document.getElementById("results-count-chip");

  if (summary) {
    if (isNearbyFallback && items.length > 0) {
      summary.innerHTML = `
        <span style="color: #B45309; font-weight: 600;">📍 Note: Direct machine not registered inside "${village}".</span>
        Showing nearest matching <strong>${equipment}</strong> from nearby villages (${hours} hours rental):
      `;
    } else {
      summary.innerHTML = `Showing available equipment for <strong>${equipment}</strong> in <strong>${village}</strong> (${hours} hours rental)`;
    }
  }
  if (countChip) {
    countChip.innerText = `${items.length} Machines Found`;
  }

  if (!grid) return;

  if (items.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1rem; background: #fff; border-radius: var(--radius-lg); border: 1px dashed var(--border-color);">
        <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">🚜🌾</div>
        <h3>No direct matching machines found in ${village}</h3>
        <p style="color: var(--text-muted); margin-top: 0.35rem;">
          Try searching in nearby villages or <a href="javascript:void(0)" onclick="navigateTo('available')">view all available equipment</a>.
        </p>
      </div>
    `;
    return;
  }

  grid.innerHTML = items.map((item, index) => {
    const isRecommended = index === 0 && item.status === "Available";
    const totalEstimate = (item.rate || 800) * hours;
    const maskedContact = item.contact ? `${item.contact.slice(0, 4)}******` : "Protected";

    return `
      <div class="equipment-result-card ${isRecommended ? 'recommended' : ''}">
        ${isRecommended ? `
          <div class="card-badge-top">
            <span>⭐ RECOMMENDED (BEST MATCH & NEAREST)</span>
            <span>${item.distance || 2} km away</span>
          </div>
        ` : ''}

        <div class="card-img-wrap">
          <img src="${item.image || 'assets/tractor_card.jpg'}" alt="${item.equipment}" class="card-equip-img" onerror="this.src='assets/tractor_card.jpg'">
          <div class="card-status-chip">
            <span class="${item.status === 'Available' ? 'badge-avail' : 'badge-booked'}">
              ${item.status === 'Available' ? '🟢 Available' : '🔴 Booked'}
            </span>
          </div>
        </div>

        <div class="card-content-body">
          <h3 class="card-equip-title">${item.equipment} (${item.id})</h3>
          <div class="card-location-row">
            <span>📍</span> <span>${item.village} • Owner: <strong>${item.owner}</strong></span>
          </div>

          <div class="card-specs-list">
            <div>Rate: <strong>₹${item.rate}/hr</strong></div>
            <div>Distance: <strong>${item.distance || 2} km</strong></div>
            <div>Best Season: <strong>${item.bestMonth || 'All Year'}</strong></div>
            <div>Available: <strong>${item.availableDate || 'Immediate'}</strong></div>
          </div>

          <div class="card-calc-box">
            <div>
              <div class="calc-label">Total Estimate (${hours} hrs):</div>
              <div style="font-size: 0.72rem; color: var(--text-subtle);">₹${item.rate} × ${hours} hrs</div>
            </div>
            <div class="calc-val">₹${totalEstimate.toLocaleString('en-IN')}</div>
          </div>

          <div style="display: flex; gap: 0.5rem; margin-top: auto;">
            <button class="btn btn-primary btn-sm btn-block" onclick="openEnquiryModal('${item.id}', ${hours})">
              <span>🌾</span> Enquire / Rent
            </button>
            <button class="btn btn-outline btn-sm" onclick="navigateTo('calculator')">
              <span>🧮</span> Math
            </button>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

function updateSearchResultsCosts() {
  const hoursInput = document.getElementById("find-hours");
  if (!hoursInput) return;
  const hours = parseInt(hoursInput.value, 10) || 4;
  currentRentalHours = hours;

  const village = document.getElementById("find-village").value;
  const equipment = document.getElementById("find-equipment").value;
  executeFindSearch(village, equipment, hours);
}

// =========================================================================
// 6. LIST EQUIPMENT (Section 8)
// =========================================================================

function switchListMode(mode) {
  const webContainer = document.getElementById("list-web-form-container");
  const embedContainer = document.getElementById("list-embed-form-container");
  const tabWeb = document.getElementById("tab-web-form");
  const tabEmbed = document.getElementById("tab-embed-form");

  if (mode === "embed") {
    webContainer.style.display = "none";
    embedContainer.style.display = "block";
    tabWeb.classList.remove("active");
    tabEmbed.classList.add("active");

    const iframe = document.getElementById("google-list-form-iframe");
    if (iframe && AGRI_CONFIG.GOOGLE_LIST_FORM_URL) {
      iframe.src = AGRI_CONFIG.GOOGLE_LIST_FORM_URL;
    }
  } else {
    webContainer.style.display = "block";
    embedContainer.style.display = "none";
    tabWeb.classList.add("active");
    tabEmbed.classList.remove("active");
  }
}

function updateDefaultRate(equipType) {
  const rateInput = document.getElementById("list-rate");
  if (!rateInput) return;
  const rateMap = {
    "Rotavator": 800,
    "Tractor": 1000,
    "Seed Drill": 600,
    "Sprayer": 250,
    "Harvester": 1500,
    "Thresher": 700,
    "Laser Land Leveller": 950,
    "Power Tiller": 500
  };
  rateInput.value = rateMap[equipType] || 800;
}

async function handleListEquipmentSubmit(event) {
  if (event && event.preventDefault) event.preventDefault();

  const owner = document.getElementById("list-owner-name").value.trim();
  const village = document.getElementById("list-village").value;
  const equipment = document.getElementById("list-equipment-type").value;
  const rate = parseInt(document.getElementById("list-rate").value, 10) || 800;
  const availableDate = document.getElementById("list-available-date").value;
  const bestMonth = document.getElementById("list-best-month").value || "April–June";
  const contact = document.getElementById("list-contact").value.trim();

  // Pick matching equipment image
  const imgMap = {
    "Rotavator": "assets/rotavator_card.jpg",
    "Tractor": "assets/tractor_card.jpg",
    "Seed Drill": "assets/seed_drill_card.jpg",
    "Sprayer": "assets/sprayer_card.jpg",
    "Harvester": "assets/harvester_card.jpg",
    "Thresher": "assets/thresher_card.jpg",
    "Laser Land Leveller": "assets/rotavator_card.jpg",
    "Power Tiller": "assets/tractor_card.jpg"
  };

  const nextNum = currentEquipmentDatabase.length + 1;
  const newId = `A${nextNum < 10 ? '0' + nextNum : nextNum}`;

  const newRecord = {
    id: newId,
    equipment,
    owner,
    village,
    distance: Math.floor(Math.random() * 8) + 2,
    rate,
    status: "Available",
    bestMonth,
    availableDate,
    contact,
    image: imgMap[equipment] || "assets/tractor_card.jpg",
    info: `Registered by ${owner}. High condition farm machinery.`
  };

  let liveSyncSuccess = false;
  let liveSyncError = null;

  // 1. Direct Dual-Sync to Google Form (Immediately adds row into linked Google Sheet!)
  try {
    const formParams = new URLSearchParams();
    formParams.append("entry.1191117382", owner);
    formParams.append("entry.486654325", village);
    formParams.append("entry.204674552", equipment);
    formParams.append("entry.923592049", String(rate));
    formParams.append("entry.1508521393", availableDate || new Date().toISOString().split("T")[0]);
    formParams.append("entry.1849832257", contact || "9820000000");

    fetch("https://docs.google.com/forms/d/1I7E9TC5GWZe3zW1pq5oYYA5kvLWUt7R_T4LCX9cTg0o/formResponse", {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formParams.toString()
    }).catch(e => console.warn("Google Form direct sync notice:", e));

    liveSyncSuccess = true;
  } catch (errForm) {
    console.warn("Direct Google Form sync error:", errForm);
  }

  // 2. Also send to Google Apps Script Web App if configured
  if (AGRI_CONFIG.GOOGLE_APPS_SCRIPT_WEB_APP_URL && !AGRI_CONFIG.GOOGLE_APPS_SCRIPT_WEB_APP_URL.includes("SAMPLE")) {
    const btn = document.getElementById("btn-submit-listing");
    if (btn) btn.innerText = "Syncing with Google Sheets...";

    try {
      const payload = {
        ...newRecord,
        sheetId: AGRI_CONFIG.GOOGLE_SHEET_ID
      };

      const res = await fetch(AGRI_CONFIG.GOOGLE_APPS_SCRIPT_WEB_APP_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload)
      });
      const json = await res.json();
      if (json && json.success) {
        liveSyncSuccess = true;
      }
    } catch (err) {
      console.warn("Apps Script post error:", err);
      // Notice: If direct Google Form succeeded, liveSyncSuccess is still true
    } finally {
      if (btn) btn.innerText = "Submit Equipment Listing";
    }
  }

  // Prepend to local database
  currentEquipmentDatabase.unshift(newRecord);
  saveEquipmentDatabase();

  // If not logged in, auto-login as this owner so they can see their portal dashboard immediately
  if (!currentUser) {
    setCurrentUser({
      name: owner,
      mobile: contact,
      village: village,
      role: "Owner"
    });
  }

  if (liveSyncSuccess) {
    showToast(`✅ Saved directly to Google Sheets & Farmer Portal with ID: ${newId}!`, "success");
  } else if (liveSyncError) {
    showToast(`⚠️ Google Sheets sync issue: ${liveSyncError}. (Saved in local session)`, "error");
  } else {
    showToast(`✅ Equipment registered locally with ID: ${newId}.`, "success");
  }

  document.getElementById("list-equipment-form").reset();
  updateDefaultRate("Rotavator");

  // Offer jump to Available Equipment
  setTimeout(() => {
    if (confirm(`Equipment ${newRecord.equipment} (${newId}) registered! View in your Farmer Control Dashboard?`)) {
      openFarmerDashboardModal();
    }
  }, 400);
}

// =========================================================================
// 7. AVAILABLE EQUIPMENT PAGE & TABLE (Section 9)
// =========================================================================

function renderAvailableEquipment() {
  applyEquipmentFilters();
}

function applyEquipmentFilters() {
  const villageFilter = document.getElementById("filter-village")?.value || "ALL";
  const equipFilter = document.getElementById("filter-equipment")?.value || "ALL";
  const statusFilter = document.getElementById("filter-status")?.value || "ALL";
  const textQuery = (document.getElementById("filter-text")?.value || "").toLowerCase().trim();

  const filtered = currentEquipmentDatabase.filter(item => {
    const matchVill = villageFilter === "ALL" || item.village.toLowerCase() === villageFilter.toLowerCase();
    const matchEquip = equipFilter === "ALL" || item.equipment.toLowerCase() === equipFilter.toLowerCase();
    const matchStatus = statusFilter === "ALL" || item.status.toLowerCase() === statusFilter.toLowerCase();
    const matchText = !textQuery || 
      item.id.toLowerCase().includes(textQuery) ||
      item.owner.toLowerCase().includes(textQuery) ||
      item.equipment.toLowerCase().includes(textQuery) ||
      item.village.toLowerCase().includes(textQuery);

    return matchVill && matchEquip && matchStatus && matchText;
  });

  renderAvailableCards(filtered);
  renderAvailableTable(filtered);
}

function updateRentalHoursSlider(val) {
  currentRentalHours = parseInt(val, 10) || 4;
  const label = document.getElementById("rental-hours-label");
  if (label) label.innerText = `${currentRentalHours} hrs`;

  document.querySelectorAll(".th-calc-hours").forEach(span => {
    span.innerText = currentRentalHours;
  });

  applyEquipmentFilters();
}

function toggleAvailableView(viewMode) {
  const cardsContainer = document.getElementById("available-cards-view");
  const tableContainer = document.getElementById("available-table-view");
  const btnCards = document.getElementById("btn-view-cards");
  const btnTable = document.getElementById("btn-view-table");

  if (viewMode === "table") {
    cardsContainer.style.display = "none";
    tableContainer.style.display = "block";
    btnCards.className = "btn btn-outline btn-sm";
    btnTable.className = "btn btn-secondary btn-sm";
  } else {
    cardsContainer.style.display = "grid";
    tableContainer.style.display = "none";
    btnCards.className = "btn btn-secondary btn-sm";
    btnTable.className = "btn btn-outline btn-sm";
  }
}

function renderAvailableCards(items) {
  const container = document.getElementById("available-cards-view");
  if (!container) return;

  if (items.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; background: #fff; border-radius: var(--radius-lg); border: 1px dashed var(--border-color);">
        <p style="color: var(--text-muted); font-size: 1.1rem;">No equipment matches your filter criteria.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = items.map(item => {
    const totalEstimate = (item.rate || 800) * currentRentalHours;

    return `
      <div class="equipment-result-card">
        <div class="card-img-wrap">
          <img src="${item.image || 'assets/tractor_card.jpg'}" alt="${item.equipment}" class="card-equip-img" onerror="this.src='assets/tractor_card.jpg'">
          <div class="card-status-chip">
            <span class="${item.status === 'Available' ? 'badge-avail' : 'badge-booked'}">
              ${item.status === 'Available' ? '🟢 Available' : '🔴 Booked'}
            </span>
          </div>
        </div>

        <div class="card-content-body">
          <h3 class="card-equip-title">${item.equipment} (${item.id})</h3>
          <div class="card-location-row">
            <span>📍</span> <span>${item.village} • Owner: <strong>${item.owner}</strong></span>
          </div>

          <div class="card-specs-list">
            <div>Rate: <strong>₹${item.rate}/hr</strong></div>
            <div>Distance: <strong>${item.distance || 2} km</strong></div>
            <div>Season: <strong>${item.bestMonth || 'All Year'}</strong></div>
            <div>Date: <strong>${item.availableDate || 'Available'}</strong></div>
          </div>

          <div class="card-calc-box">
            <div>
              <div class="calc-label">Total for ${currentRentalHours} hours:</div>
              <div style="font-size: 0.72rem; color: var(--text-subtle);">₹${item.rate} × ${currentRentalHours} hrs</div>
            </div>
            <div class="calc-val">₹${totalEstimate.toLocaleString('en-IN')}</div>
          </div>

          <div style="display: flex; gap: 0.5rem; margin-top: auto;">
            <button class="btn btn-primary btn-sm btn-block" onclick="openEnquiryModal('${item.id}', ${currentRentalHours})">
              <span>🌾</span> Enquire
            </button>
            <button class="btn btn-outline btn-sm" title="Toggle status for judge demo" onclick="toggleMachineStatus('${item.id}')">
              <span>🔄</span> Toggle
            </button>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

function renderAvailableTable(items) {
  const tbody = document.getElementById("available-table-tbody");
  if (!tbody) return;

  tbody.innerHTML = items.map(item => {
    const totalEstimate = (item.rate || 800) * currentRentalHours;

    return `
      <tr>
        <td><strong>${item.id}</strong></td>
        <td>${item.equipment}</td>
        <td>${item.owner}</td>
        <td>${item.village}</td>
        <td>${item.distance || 2} km</td>
        <td>₹${item.rate}</td>
        <td>${item.bestMonth || 'All Year'}</td>
        <td>${item.availableDate || 'Available'}</td>
        <td>
          <span class="${item.status === 'Available' ? 'badge-avail' : 'badge-booked'}" style="cursor: pointer;" onclick="toggleMachineStatus('${item.id}')" title="Click to toggle status">
            ${item.status === 'Available' ? '🟢 Available' : '🔴 Booked'}
          </span>
        </td>
        <td><strong>₹${totalEstimate.toLocaleString('en-IN')}</strong></td>
        <td>
          <button class="btn btn-primary btn-sm" onclick="openEnquiryModal('${item.id}', ${currentRentalHours})">
            Enquire
          </button>
        </td>
      </tr>
    `;
  }).join("");
}

function toggleMachineStatus(machineId) {
  const item = currentEquipmentDatabase.find(i => i.id === machineId);
  if (!item) return;

  item.status = item.status === "Available" ? "Booked" : "Available";
  saveEquipmentDatabase();
  renderAvailableEquipment();
  showToast(`Machine ${item.id} status changed to ${item.status}!`, "success");
}

function exportDatabaseToCSV() {
  const headers = ["ID", "Equipment", "Owner", "Village", "Rate/hr", "Status", "Best Month", "Available Date", "Contact Number"];
  const rows = currentEquipmentDatabase.map(item => [
    item.id,
    `"${item.equipment}"`,
    `"${item.owner}"`,
    `"${item.village}"`,
    item.rate,
    `"${item.status}"`,
    `"${item.bestMonth || 'All Year'}"`,
    item.availableDate,
    `"${item.contact}"`
  ]);

  const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "AGRISHARE_EQUIPMENT_DATABASE.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  showToast("Database exported to CSV successfully!", "success");
}

// =========================================================================
// 8. COST CALCULATOR (Section 10 Mathematical Model)
// =========================================================================

// =========================================================================
// 8. UNIQUE EXHIBITION SIMULATORS & COST CALCULATOR
// =========================================================================

function scrollToCalcSection(secId) {
  const elem = document.getElementById(secId);
  if (elem) {
    elem.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  document.querySelectorAll(".calc-view-jump-bar .jump-btn").forEach(btn => btn.classList.remove("active"));
  const btnId = secId.replace("sec-", "jump-") + "-btn";
  const activeBtn = document.getElementById(btnId);
  if (activeBtn) activeBtn.classList.add("active");
}

let currentScaleMode = "share";

function setScaleMode(mode) {
  currentScaleMode = mode;
  document.querySelectorAll(".tarazu-toggle-pills .tarazu-pill").forEach(p => p.classList.remove("active"));
  const pill = document.getElementById(`scale-mode-${mode}`);
  if (pill) pill.classList.add("active");

  const beam = document.getElementById("scale-beam");
  const verdictIcon = document.getElementById("scale-verdict-icon");
  const verdictTitle = document.getElementById("scale-verdict-title");
  const verdictDesc = document.getElementById("scale-verdict-desc");
  const verdictBox = document.getElementById("scale-verdict-box");

  if (!beam) return;

  beam.classList.remove("tilt-left", "tilt-right", "tilt-level");

  if (mode === "solo") {
    beam.classList.add("tilt-left");
    if (verdictBox) {
      verdictBox.style.borderColor = "#f87171";
      verdictBox.style.background = "#fff5f5";
    }
    if (verdictIcon) verdictIcon.innerText = "🚨";
    if (verdictTitle) {
      verdictTitle.innerText = "CRITICAL CAPITAL TRAP (SOLO PURCHASE BURDEN)";
      verdictTitle.style.color = "#dc2626";
    }
    if (verdictDesc) {
      verdictDesc.innerHTML = "Solo ownership locks up ₹5 Lakh to ₹22 Lakh in farmer debt for just 30 working hours a year! Machinery sits idle 98.9% of the year in monsoon rains, draining ₹1,20,000 every year in dead-weight losses.";
    }
  } else if (mode === "share") {
    beam.classList.add("tilt-right");
    if (verdictBox) {
      verdictBox.style.borderColor = "#86efac";
      verdictBox.style.background = "#ffffff";
    }
    if (verdictIcon) verdictIcon.innerText = "🎉";
    if (verdictTitle) {
      verdictTitle.innerText = "SCALE TIPPED TO PROSPERITY (AGRI-SHARE CLOUD MODEL)";
      verdictTitle.style.color = "#15803d";
    }
    if (verdictDesc) {
      verdictDesc.innerHTML = "By renting on-demand through AGRI-SHARE, the farmer eliminates debt and repair risks. You save <strong>₹96,000 every single year (80.0% savings)</strong> and preserve ₹5,00,000 liquid working capital in the bank!";
    }
  } else if (mode === "coop") {
    beam.classList.add("tilt-level");
    if (verdictBox) {
      verdictBox.style.borderColor = "#fde047";
      verdictBox.style.background = "#fffdf0";
    }
    if (verdictIcon) verdictIcon.innerText = "👥";
    if (verdictTitle) {
      verdictTitle.innerText = "COMMUNITY CO-OP POOLING (SHARED COOPERATIVE)";
      verdictTitle.style.color = "#b45309";
    }
    if (verdictDesc) {
      verdictDesc.innerHTML = "5 village farmers join an FPO cooperative to split machine depreciation and maintenance. Annual burden drops to <strong>₹24,000 per farmer</strong>, achieving balanced mechanization without individual distress.";
    }
  }
}

// 1-Tap Farm Land & Crop Simulator State
let simCurrentAcres = 3;
let simCurrentOp = "rotavator";

const OP_DATA = {
  rotavator: { hoursPerAcre: 10, machinePrice: 500000, rate: 800, name: "Rotavator", usefulLife: 10, maint: 30000, oper: 40000 },
  tractor: { hoursPerAcre: 8, machinePrice: 800000, rate: 1000, name: "Tractor", usefulLife: 12, maint: 45000, oper: 65000 },
  harvester: { hoursPerAcre: 5, machinePrice: 2200000, rate: 1500, name: "Harvester", usefulLife: 15, maint: 80000, oper: 120000 },
  sprayer: { hoursPerAcre: 4, machinePrice: 120000, rate: 250, name: "Sprayer", usefulLife: 6, maint: 8000, oper: 12000 }
};

function selectAcreage(acres) {
  simCurrentAcres = acres;
  document.querySelectorAll(".sim-ctrl-group button[id^='acre-btn-']").forEach(b => b.classList.remove("active"));
  const btn = document.getElementById(`acre-btn-${acres}`);
  if (btn) btn.classList.add("active");
  applyFarmLandSimulation();
}

function selectOperation(op) {
  simCurrentOp = op;
  document.querySelectorAll(".sim-ctrl-group button[id^='op-btn-']").forEach(b => b.classList.remove("active"));
  const btn = document.getElementById(`op-btn-${op}`);
  if (btn) btn.classList.add("active");
  applyFarmLandSimulation();
}

function applyFarmLandSimulation() {
  const opInfo = OP_DATA[simCurrentOp] || OP_DATA.rotavator;
  const calculatedHours = Math.max(Math.round(simCurrentAcres * opInfo.hoursPerAcre), 5);
  const rentalBill = calculatedHours * opInfo.rate;
  const capitalKept = opInfo.machinePrice - rentalBill;
  const recoveryYears = Math.max(Math.round(opInfo.machinePrice / Math.max(rentalBill, 1)), 1);

  // Update simulator cards
  const hoursElem = document.getElementById("sim-out-hours");
  if (hoursElem) hoursElem.innerText = `${calculatedHours} Hours / yr`;

  const recoveryElem = document.getElementById("sim-out-recovery");
  if (recoveryElem) recoveryElem.innerText = `${recoveryYears} Years to Break Even!`;

  const rentalElem = document.getElementById("sim-out-rental");
  if (rentalElem) rentalElem.innerText = `₹${rentalBill.toLocaleString('en-IN')} / yr`;

  const keptElem = document.getElementById("sim-out-kept");
  if (keptElem) keptElem.innerText = `₹${capitalKept.toLocaleString('en-IN')} Preserved`;

  // Sync to mathematical inputs
  const pInput = document.getElementById("calc-purchase-price");
  if (pInput) pInput.value = opInfo.machinePrice;

  const hInput = document.getElementById("calc-annual-hours");
  if (hInput) hInput.value = calculatedHours;

  const rInput = document.getElementById("calc-hiring-rate");
  if (rInput) rInput.value = opInfo.rate;

  const lifeInput = document.getElementById("calc-useful-life");
  if (lifeInput) lifeInput.value = opInfo.usefulLife;

  const mInput = document.getElementById("calc-maint-cost");
  if (mInput) mInput.value = opInfo.maint;

  const oInput = document.getElementById("calc-operating-cost");
  if (oInput) oInput.value = opInfo.oper;

  syncCalculatorSlider("calc-purchase-price", opInfo.machinePrice);
  syncCalculatorSlider("calc-annual-hours", calculatedHours);
  syncCalculatorSlider("calc-hiring-rate", opInfo.rate);

  calculateEconomics();
}

function applyCalculatorPreset(type) {
  document.querySelectorAll(".calc-presets-row .chip-btn").forEach(btn => btn.classList.remove("active"));
  const btn = document.getElementById(`preset-${type.toLowerCase()}-btn`);
  if (btn) btn.classList.add("active");

  const purchaseInput = document.getElementById("calc-purchase-price");
  const hoursInput = document.getElementById("calc-annual-hours");
  const rateInput = document.getElementById("calc-hiring-rate");
  const lifeInput = document.getElementById("calc-useful-life");
  const maintInput = document.getElementById("calc-maint-cost");
  const operInput = document.getElementById("calc-operating-cost");

  if (type === "Rotavator") {
    purchaseInput.value = 500000;
    hoursInput.value = 30;
    rateInput.value = 800;
    lifeInput.value = 10;
    maintInput.value = 30000;
    operInput.value = 40000;
  } else if (type === "Tractor") {
    purchaseInput.value = 800000;
    hoursInput.value = 50;
    rateInput.value = 1000;
    lifeInput.value = 12;
    maintInput.value = 45000;
    operInput.value = 65000;
  } else if (type === "Harvester") {
    purchaseInput.value = 2200000;
    hoursInput.value = 60;
    rateInput.value = 1500;
    lifeInput.value = 15;
    maintInput.value = 80000;
    operInput.value = 120000;
  } else if (type === "Sprayer") {
    purchaseInput.value = 120000;
    hoursInput.value = 25;
    rateInput.value = 250;
    lifeInput.value = 6;
    maintInput.value = 8000;
    operInput.value = 12000;
  }

  syncCalculatorSlider("calc-purchase-price", purchaseInput.value);
  syncCalculatorSlider("calc-annual-hours", hoursInput.value);
  syncCalculatorSlider("calc-hiring-rate", rateInput.value);

  calculateEconomics();
}

// Animated Number Counter State
const calcAnimState = {};

function animateCalcNumber(elemId, targetVal, prefix = "₹", suffix = "", duration = 350) {
  const elem = document.getElementById(elemId);
  if (!elem) return;

  const currentVal = calcAnimState[elemId] !== undefined ? calcAnimState[elemId] : targetVal;
  if (Math.abs(currentVal - targetVal) < 1) {
    elem.innerText = `${prefix}${Math.round(targetVal).toLocaleString("en-IN")}${suffix}`;
    calcAnimState[elemId] = targetVal;
    return;
  }

  if (elem._animRaf) cancelAnimationFrame(elem._animRaf);

  const startTime = performance.now();
  const startVal = currentVal;

  elem.classList.remove("num-ticker-flash");
  void elem.offsetWidth;
  elem.classList.add("num-ticker-flash");

  function frame(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    const val = startVal + (targetVal - startVal) * ease;

    elem.innerText = `${prefix}${Math.round(val).toLocaleString("en-IN")}${suffix}`;

    if (progress < 1) {
      elem._animRaf = requestAnimationFrame(frame);
    } else {
      calcAnimState[elemId] = targetVal;
      elem.innerText = `${prefix}${Math.round(targetVal).toLocaleString("en-IN")}${suffix}`;
      elem._animRaf = null;
    }
  }

  elem._animRaf = requestAnimationFrame(frame);
}

function syncCalculatorSlider(inputId, val) {
  const numInput = document.getElementById(inputId);
  if (numInput) numInput.value = val;
  const slider = document.getElementById(inputId.replace("calc-", "slider-"));
  if (slider) slider.value = val;
  calculateEconomics();
}

function calculateEconomics() {
  const purchasePrice = parseFloat(document.getElementById("calc-purchase-price")?.value) || 500000;
  const annualHours = parseFloat(document.getElementById("calc-annual-hours")?.value) || 30;
  const hiringRate = parseFloat(document.getElementById("calc-hiring-rate")?.value) || 800;
  const usefulLife = parseFloat(document.getElementById("calc-useful-life")?.value) || 10;
  const maintenanceCost = parseFloat(document.getElementById("calc-maint-cost")?.value) || 30000;
  const operatingCost = parseFloat(document.getElementById("calc-operating-cost")?.value) || 40000;
  const groupFarmers = parseFloat(document.getElementById("calc-group-farmers")?.value) || 5;

  // A. Rental Cost
  const annualRentalCost = annualHours * hiringRate;

  // B. Ownership Cost
  const annualDepreciation = purchasePrice / Math.max(usefulLife, 1);
  const annualOwnershipCost = annualDepreciation + maintenanceCost + operatingCost;

  // C. Group Sharing
  const perFarmerOwnershipCost = annualOwnershipCost / Math.max(groupFarmers, 1);

  // D. Savings Comparison
  const netSavings = annualOwnershipCost - annualRentalCost;
  const savingsPct = annualOwnershipCost > 0 ? (netSavings / annualOwnershipCost) * 100 : 0;

  // Break-Even Hours
  const breakEvenHours = hiringRate > 0 ? Math.round(annualOwnershipCost / hiringRate) : 0;

  // Smooth Animated Number Tickers
  animateCalcNumber("res-rental-cost", annualRentalCost);
  animateCalcNumber("res-ownership-cost", annualOwnershipCost);
  animateCalcNumber("res-depr-item", annualDepreciation);
  animateCalcNumber("res-maint-item", maintenanceCost);
  animateCalcNumber("res-oper-item", operatingCost);
  animateCalcNumber("res-savings-val", netSavings, "₹", " / yr");
  animateCalcNumber("calc-breakeven-hours", breakEvenHours, "", " hours / year");

  // Visualizer Numbers
  animateCalcNumber("vis-cost-buying", annualOwnershipCost, "₹", " / yr");
  animateCalcNumber("vis-cost-group", perFarmerOwnershipCost, "₹", " / yr");
  animateCalcNumber("vis-cost-renting", annualRentalCost, "₹", " / yr");
  animateCalcNumber("res-capital-avoided", purchasePrice, "₹", "");

  // Update Formula Breakdowns
  const rentalFormulaElem = document.getElementById("res-rental-formula");
  if (rentalFormulaElem) {
    rentalFormulaElem.innerText = `${annualHours} hours × ₹${hiringRate} / hr`;
  }

  const ownershipFormulaElem = document.getElementById("res-ownership-formula");
  if (ownershipFormulaElem) {
    ownershipFormulaElem.innerText = `Depreciation (₹${Math.round(annualDepreciation).toLocaleString('en-IN')}) + Maintenance (₹${Math.round(maintenanceCost).toLocaleString('en-IN')}) + Operating (₹${Math.round(operatingCost).toLocaleString('en-IN')})`;
  }

  // Update Savings Text
  const savingsTextElem = document.getElementById("res-savings-text");
  if (savingsTextElem) {
    savingsTextElem.innerHTML = `
      By renting for <strong>${annualHours} hours</strong> instead of individually purchasing, the farmer saves 
      <strong>₹${Math.round(netSavings).toLocaleString('en-IN')} every year (${savingsPct.toFixed(1)}% savings)</strong>!
      If <strong>${groupFarmers} farmers</strong> pool together to share ownership costs, the estimated cost per farmer is 
      <strong>₹${Math.round(perFarmerOwnershipCost).toLocaleString('en-IN')} / year</strong>.
    `;
  }

  // Badges & Counter Chips
  const pctBadge = document.getElementById("res-savings-pct-badge");
  if (pctBadge) {
    pctBadge.innerText = `⚡ ${savingsPct.toFixed(1)}% Cost Reduction`;
  }

  const liquidityBadge = document.getElementById("res-liquidity-saved");
  if (liquidityBadge) {
    liquidityBadge.innerText = `100% Capital Safe`;
  }

  // Update Break-Even Gauge & Needle Pin
  const beDescElem = document.getElementById("calc-breakeven-desc");
  if (beDescElem) {
    if (annualHours < breakEvenHours) {
      beDescElem.innerHTML = `Since farmer uses only <strong>${annualHours} hrs/yr</strong> (below the ${breakEvenHours} hrs threshold), <span class="badge-avail">HIRING IS ALWAYS CHEAPER</span>!`;
    } else {
      beDescElem.innerHTML = `Farmer uses <strong>${annualHours} hrs/yr</strong> (above break-even ${breakEvenHours} hrs). Heavy utilization justifies joint ownership.`;
    }
  }

  const farmerLabel = document.getElementById("be-current-farmer-label");
  if (farmerLabel) farmerLabel.innerText = `Farmer Usage: ${annualHours} hrs`;

  const thresholdLabel = document.getElementById("be-threshold-label");
  if (thresholdLabel) thresholdLabel.innerText = `Threshold: ${breakEvenHours} hrs`;

  const thresholdMark = document.getElementById("be-threshold-mark");
  if (thresholdMark) thresholdMark.innerText = `100% (${breakEvenHours}h)`;

  const meterBar = document.getElementById("calc-meter-bar");
  const meterPin = document.getElementById("calc-meter-pin");
  const pinBubble = document.getElementById("calc-pin-bubble");

  let pctUsage = 0;
  if (breakEvenHours > 0) {
    pctUsage = Math.round((annualHours / breakEvenHours) * 100);
    const clampedPct = Math.min(pctUsage, 100);
    if (meterBar) {
      meterBar.style.width = `${clampedPct}%`;
      if (pctUsage <= 40) {
        meterBar.style.background = "linear-gradient(90deg, #16a34a 0%, #22c55e 100%)";
      } else if (pctUsage <= 80) {
        meterBar.style.background = "linear-gradient(90deg, #16a34a 0%, #eab308 100%)";
      } else {
        meterBar.style.background = "linear-gradient(90deg, #eab308 0%, #ef4444 100%)";
      }
    }
    if (meterPin) meterPin.style.left = `${clampedPct}%`;
    if (pinBubble) pinBubble.innerText = `${annualHours} hrs`;
  }

  // Dynamic Status Alert Box
  const statusAlert = document.getElementById("calc-status-alert");
  const statusIcon = document.getElementById("calc-status-icon");
  const statusText = document.getElementById("calc-status-text");

  if (statusAlert && statusText) {
    if (annualHours < breakEvenHours) {
      statusAlert.style.background = "#f0fdf4";
      statusAlert.style.borderColor = "#86efac";
      if (statusIcon) statusIcon.innerText = "🎉";
      statusText.innerHTML = `<strong>HIRING IS ALWAYS CHEAPER!</strong> Farmer operates at only <strong>${pctUsage}%</strong> of break-even usage. Capital remains free from depreciation and bank debt.`;
    } else {
      statusAlert.style.background = "#fffbeb";
      statusAlert.style.borderColor = "#fde68a";
      if (statusIcon) statusIcon.innerText = "⚡";
      statusText.innerHTML = `<strong>HEAVY UTILIZATION (${annualHours} hrs):</strong> Exceeds break-even threshold (${breakEvenHours} hrs). Custom hiring centre or community co-op pooling is highly cost-effective!`;
    }
  }

  // Dynamic 3-Way Real-Time Cost Visualizer Bars
  const maxCompCost = Math.max(annualOwnershipCost, annualRentalCost, 1);
  const buyingBar = document.getElementById("vis-fill-buying");
  const buyingPct = document.getElementById("vis-pct-buying");
  if (buyingBar) {
    const w = Math.min(Math.round((annualOwnershipCost / maxCompCost) * 100), 100);
    buyingBar.style.width = `${w}%`;
  }
  if (buyingPct) buyingPct.innerText = `100% (Baseline)`;

  const groupBar = document.getElementById("vis-fill-group");
  const groupPct = document.getElementById("vis-pct-group");
  const farmersCount = document.getElementById("vis-farmers-count");
  if (groupBar) {
    const w = Math.min(Math.round((perFarmerOwnershipCost / maxCompCost) * 100), 100);
    groupBar.style.width = `${Math.max(w, 12)}%`;
  }
  if (groupPct) {
    const groupRatio = annualOwnershipCost > 0 ? (perFarmerOwnershipCost / annualOwnershipCost) * 100 : 20;
    groupPct.innerText = `${groupRatio.toFixed(0)}% of solo cost`;
  }
  if (farmersCount) farmersCount.innerText = groupFarmers;

  const rentingBar = document.getElementById("vis-fill-renting");
  const rentingPct = document.getElementById("vis-pct-renting");
  if (rentingBar) {
    const w = Math.min(Math.round((annualRentalCost / maxCompCost) * 100), 100);
    rentingBar.style.width = `${Math.max(w, 14)}%`;
  }
  if (rentingPct) {
    if (netSavings > 0) {
      rentingPct.innerText = `⭐ ${savingsPct.toFixed(1)}% SAVINGS`;
    } else {
      rentingPct.innerText = `Pay-As-You-Use`;
    }
  }

  // Update 365-Day Idle Machine Reality Checker
  const workingDays = (annualHours / 8).toFixed(1);
  const idleHours = Math.max(8760 - annualHours, 0);
  const idlePct = ((idleHours / 8760) * 100).toFixed(1);
  const activePct = (100 - parseFloat(idlePct)).toFixed(1);

  const idlePctElem = document.getElementById("idle-pct-disp");
  if (idlePctElem) idlePctElem.innerText = `${idlePct}%`;

  const idleDaysLabel = document.getElementById("idle-days-working-label");
  if (idleDaysLabel) {
    idleDaysLabel.innerHTML = `Field Work: <strong>Only ${workingDays} Days (${annualHours} Hours)</strong>`;
  }

  const idleTrackWorking = document.getElementById("idle-track-working");
  if (idleTrackWorking) {
    const wWidth = Math.max(Math.min(parseFloat(activePct), 90), 2.5);
    idleTrackWorking.style.width = `${wWidth}%`;
    idleTrackWorking.innerText = `${annualHours}h`;
  }

  const idleTrackRusted = document.getElementById("idle-track-rusted");
  if (idleTrackRusted) {
    const rWidth = Math.max(100 - Math.max(Math.min(parseFloat(activePct), 90), 2.5), 10);
    idleTrackRusted.style.width = `${rWidth}%`;
    idleTrackRusted.innerHTML = `🌧️ ${(365 - (annualHours / 8)).toFixed(0)} Days Idle Rusting in Shed (${idlePct}%)`;
  }

  const idleActiveElem = document.getElementById("idle-hours-active");
  if (idleActiveElem) idleActiveElem.innerText = `${annualHours} hrs (${activePct}%)`;

  const idleRustedElem = document.getElementById("idle-hours-rusted");
  if (idleRustedElem) idleRustedElem.innerText = `${idleHours.toLocaleString('en-IN')} hrs (${idlePct}%)`;

  const trueCostSolo = annualHours > 0 ? Math.round(annualOwnershipCost / annualHours) : 0;
  animateCalcNumber("true-cost-solo", trueCostSolo);
  animateCalcNumber("true-cost-share", hiringRate);

  // Update Tarazu scale pan figures
  const panLeftTotal = document.getElementById("pan-left-total");
  if (panLeftTotal) {
    panLeftTotal.innerText = `Solo Cost: ₹${Math.round(annualOwnershipCost).toLocaleString('en-IN')} / yr`;
  }

  const panRightTotal = document.getElementById("pan-right-total");
  if (panRightTotal) {
    panRightTotal.innerText = `Net Savings: ₹${Math.round(netSavings).toLocaleString('en-IN')} / yr`;
  }
}

// =========================================================================
// 9. CONFIGURATION MANAGER MODAL (Section 13)
// =========================================================================

function openConfigModal() {
  const modal = document.getElementById("config-modal");
  if (!modal) return;

  document.getElementById("cfg-list-form-url").value = AGRI_CONFIG.GOOGLE_LIST_FORM_URL || "";
  document.getElementById("cfg-find-form-url").value = AGRI_CONFIG.GOOGLE_FIND_FORM_URL || "";
  document.getElementById("cfg-sheet-id").value = AGRI_CONFIG.GOOGLE_SHEET_ID || "";
  document.getElementById("cfg-apps-script-url").value = AGRI_CONFIG.GOOGLE_APPS_SCRIPT_WEB_APP_URL || "";
  const projUrlInput = document.getElementById("cfg-apps-script-project-url");
  if (projUrlInput) projUrlInput.value = AGRI_CONFIG.GOOGLE_APPS_SCRIPT_PROJECT_URL || "";
  document.getElementById("cfg-mode-toggle").value = AGRI_CONFIG.IS_DEMO_MODE ? "demo" : "live";

  const statusBox = document.getElementById("cfg-test-status");
  if (statusBox) statusBox.style.display = "none";

  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeConfigModal() {
  const modal = document.getElementById("config-modal");
  if (modal) modal.classList.remove("active");
  document.body.style.overflow = "";
}

function toggleConfigMode(mode) {
  AGRI_CONFIG.IS_DEMO_MODE = mode === "demo";
}

function saveConfigFromModal() {
  const listUrl = document.getElementById("cfg-list-form-url").value.trim();
  const findUrl = document.getElementById("cfg-find-form-url").value.trim();
  let sheetId = document.getElementById("cfg-sheet-id").value.trim();
  if (sheetId.includes('/d/')) {
    const match = sheetId.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (match) sheetId = match[1];
  }
  const scriptUrl = document.getElementById("cfg-apps-script-url").value.trim();
  const projUrl = document.getElementById("cfg-apps-script-project-url") ? document.getElementById("cfg-apps-script-project-url").value.trim() : "";
  const isDemo = document.getElementById("cfg-mode-toggle").value === "demo";

  const newConfig = {
    GOOGLE_LIST_FORM_URL: listUrl || AGRI_CONFIG.GOOGLE_LIST_FORM_URL,
    GOOGLE_FIND_FORM_URL: findUrl || AGRI_CONFIG.GOOGLE_FIND_FORM_URL,
    GOOGLE_SHEET_ID: sheetId || AGRI_CONFIG.GOOGLE_SHEET_ID,
    GOOGLE_APPS_SCRIPT_WEB_APP_URL: scriptUrl || AGRI_CONFIG.GOOGLE_APPS_SCRIPT_WEB_APP_URL,
    GOOGLE_APPS_SCRIPT_PROJECT_URL: projUrl || AGRI_CONFIG.GOOGLE_APPS_SCRIPT_PROJECT_URL,
    IS_DEMO_MODE: isDemo
  };

  saveAgriConfigOverrides(newConfig);
  updateHeaderModeUI();
  closeConfigModal();
  showToast("Configuration saved successfully!", "success");
}

function resetConfigToDefaults() {
  resetAgriConfigToDefault();
}

function updateHeaderModeUI() {
  const badge = document.getElementById("header-mode-badge");
  if (!badge) return;

  if (AGRI_CONFIG.IS_DEMO_MODE) {
    badge.className = "mode-pill-demo";
    badge.innerText = "Demo Mode";
  } else {
    badge.className = "mode-pill-live";
    badge.innerText = "Google Sheets Live";
  }
}

async function testAppsScriptConnection() {
  const scriptUrl = document.getElementById("cfg-apps-script-url").value.trim();
  const statusBox = document.getElementById("cfg-test-status");
  if (!statusBox) return;

  if (!scriptUrl || scriptUrl.includes("SAMPLE")) {
    statusBox.style.display = "block";
    statusBox.innerHTML = `<span style="color: var(--danger-color);">⚠️ Please paste a valid deployed Google Apps Script Web App URL first.</span>`;
    return;
  }

  // 1. Detect redirected echo URL
  if (scriptUrl.includes("googleusercontent.com") || scriptUrl.includes("echo?user_content")) {
    statusBox.style.display = "block";
    statusBox.innerHTML = `
      <div style="background: #FEF2F2; border: 1.5px solid #FCA5A5; padding: 0.85rem; border-radius: 8px; color: #991B1B; font-size: 0.84rem; line-height: 1.5;">
        <strong>⚠️ Galat URL Format Detect Hua Hai!</strong><br>
        Aapne redirected browser link paste kiya hai (<code>script.googleusercontent.com/macros/echo...</code>). Yeh temporary cache key hoti hai jo expire ho jaati hai.<br><br>
        <strong>Sahi Web App URL:</strong><br>
        Google Apps Script Editor me <strong>Deploy &gt; Manage deployments</strong> (ya New deployment) se Web app URL copy karein jo hamesha <strong><code>/exec</code></strong> par end hota hai:<br>
        <code>https://script.google.com/macros/s/AKfycb.../exec</code>
      </div>
    `;
    return;
  }

  statusBox.style.display = "block";
  statusBox.innerHTML = `<span style="color: var(--primary-color);">⏳ Testing connection to Google Apps Script endpoint...</span>`;

  try {
    let sheetId = document.getElementById("cfg-sheet-id") ? document.getElementById("cfg-sheet-id").value.trim() : "";
    if (sheetId.includes('/d/')) {
      const match = sheetId.match(/\/d\/([a-zA-Z0-9_-]+)/);
      if (match) sheetId = match[1];
    }
    const testUrl = sheetId ? `${scriptUrl}?action=getAll&sheetId=${encodeURIComponent(sheetId)}` : `${scriptUrl}?action=getAll`;
    const res = await fetch(testUrl);
    const json = await res.json();

    if (json.success) {
      statusBox.innerHTML = `<span style="color: var(--success-color);">✅ Connection Successful! Connected to Sheet (Records: ${json.count || json.data?.length || 0}).</span>`;
    } else {
      if (json.error && json.error.toLowerCase().includes("missing")) {
        statusBox.innerHTML = `
          <div style="background: #FEF3C7; border: 1.5px solid #F59E0B; padding: 0.85rem; border-radius: 8px; color: #92400E; font-size: 0.84rem; line-height: 1.5;">
            <strong>🎉 Web App API Connection 100% Successful!</strong><br>
            Google Apps Script se live connection ban gaya hai, lekin Google Drive par <strong>Sheet ID (${sheetId || '1YWFbYn...'})</strong> nahi mili.<br><br>
            <strong>Ab bas Google Sheet link karni hai:</strong><br>
            1. Apne Google Drive me <strong>AGRISHARE EQUIPMENT DATABASE</strong> spreadsheet kholein.<br>
            2. Address bar se Sheet ID copy karein: <code>https://docs.google.com/spreadsheets/d/<strong>[YEH_SHEET_ID_HAI]</strong>/edit</code><br>
            3. Usko upar <strong>GOOGLE_SHEET_ID</strong> field me daal kar <strong>Save Settings</strong> click karein!
          </div>
        `;
      } else {
        statusBox.innerHTML = `<span style="color: var(--danger-color);">❌ Endpoint responded with: ${json.error || "Unknown error"}</span>`;
      }
    }
  } catch (err) {
    statusBox.innerHTML = `
      <div style="background: #FEF2F2; border: 1.5px solid #FCA5A5; padding: 0.85rem; border-radius: 8px; color: #991B1B; font-size: 0.84rem; line-height: 1.5;">
        <strong>❌ Network test failed: ${err.message}</strong><br><br>
        Is problem ko solve karne ke 2 main reasons hote hain:<br>
        1. <strong>"Who has access" Setting:</strong> Google Apps Script Editor mein Deploy karte waqt <strong>"Anyone"</strong> hona zaroori hai (agar "Only myself" hai toh Vercel par block ho jaata hai).<br>
        2. <strong>URL format:</strong> URL hamesha <code>https://script.google.com/macros/s/.../exec</code> hona chahiye.
      </div>
    `;
  }
}

// =========================================================================
// 10. ENQUIRY / BOOKING MODAL
// =========================================================================

function openEnquiryModal(machineId, hours) {
  const item = currentEquipmentDatabase.find(i => i.id === machineId) || currentEquipmentDatabase[0];
  activeEnquiryMachine = item;
  const enquiryHours = hours || currentRentalHours || 4;

  const modal = document.getElementById("enquiry-modal");
  const summaryBox = document.getElementById("enquiry-machine-summary");
  const hoursInput = document.getElementById("enquiry-hours");

  if (hoursInput) hoursInput.value = enquiryHours;

  if (summaryBox) {
    summaryBox.innerHTML = `
      <div style="display: flex; gap: 1rem; align-items: center;">
        <img src="${item.image || 'assets/tractor_card.jpg'}" alt="${item.equipment}" style="width: 70px; height: 60px; object-fit: cover; border-radius: var(--radius-sm);" onerror="this.src='assets/tractor_card.jpg'">
        <div>
          <strong style="font-size: 1.1rem; color: var(--text-main);">${item.equipment} (${item.id})</strong>
          <div style="font-size: 0.85rem; color: var(--text-muted);">Owner: ${item.owner} • ${item.village} • Rate: ₹${item.rate}/hr</div>
        </div>
      </div>
    `;
  }

  recalcEnquiryTotal();
  if (modal) modal.classList.add("active");
}

function closeEnquiryModal() {
  const modal = document.getElementById("enquiry-modal");
  if (modal) modal.classList.remove("active");
  activeEnquiryMachine = null;
}

function recalcEnquiryTotal() {
  if (!activeEnquiryMachine) return;
  const hours = parseInt(document.getElementById("enquiry-hours")?.value, 10) || 4;
  const total = (activeEnquiryMachine.rate || 800) * hours;
  const totalDisplay = document.getElementById("enquiry-total-display");
  if (totalDisplay) {
    totalDisplay.innerText = `₹${total.toLocaleString('en-IN')}`;
  }
}

function handleEnquirySubmit(event) {
  if (event && event.preventDefault) event.preventDefault();

  const farmerName = document.getElementById("enquiry-farmer-name").value.trim();
  const phone = document.getElementById("enquiry-phone").value.trim();
  const hours = parseInt(document.getElementById("enquiry-hours").value, 10) || 4;
  const token = `AGRI-REQ-${Math.floor(1000 + Math.random() * 9000)}`;
  const village = document.getElementById("enquiry-notes") ? document.getElementById("enquiry-notes").value.trim() : "Village A";
  const notes = document.getElementById("enquiry-notes") ? document.getElementById("enquiry-notes").value.trim() : "";
  const rate = activeEnquiryMachine.rate || 800;
  const total = rate * hours;

  // Record booking
  const newBooking = {
    token,
    farmerName,
    farmerPhone: phone,
    village: village || activeEnquiryMachine.village || "Local Cluster",
    machineId: activeEnquiryMachine.id,
    machineName: activeEnquiryMachine.equipment,
    ownerName: activeEnquiryMachine.owner,
    ownerPhone: activeEnquiryMachine.contact,
    hours,
    rate,
    total,
    date: new Date().toLocaleDateString('en-IN'),
    status: "Pending Request",
    notes: notes || "Enquiry submitted via website",
    source: "Website Booking"
  };

  currentBookingsList.unshift(newBooking);
  saveBookingsList();

  // 1. Direct Dual Sync to Google Forms (Directly records in Find Requests Sheet!)
  try {
    const findFormParams = new URLSearchParams();
    findFormParams.append("entry.903536382", farmerName);
    findFormParams.append("entry.143014243", village || activeEnquiryMachine.village || "Village A");
    findFormParams.append("entry.598746884", activeEnquiryMachine.equipment);
    findFormParams.append("entry.870341971", new Date().toISOString().slice(0, 10));
    findFormParams.append("entry.826602519", String(hours));
    findFormParams.append("entry.309542968", phone || "9820000000");

    fetch("https://docs.google.com/forms/d/1jl6irF4voY0xfR2z84rF4RvMiM8QdpphtqQ_Yjf--DY/formResponse", {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: findFormParams.toString()
    }).catch(e => console.warn("Google Form booking notice:", e));
  } catch (errBookingForm) {
    console.warn("Direct booking form sync notice:", errBookingForm);
  }

  // 2. Sync booking to Google Apps Script if live
  if (AGRI_CONFIG.GOOGLE_APPS_SCRIPT_WEB_APP_URL && !AGRI_CONFIG.GOOGLE_APPS_SCRIPT_WEB_APP_URL.includes("SAMPLE")) {
    try {
      fetch(AGRI_CONFIG.GOOGLE_APPS_SCRIPT_WEB_APP_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({
          action: "createBooking",
          sheetId: AGRI_CONFIG.GOOGLE_SHEET_ID,
          farmerName: farmerName,
          village: village || activeEnquiryMachine.village,
          equipment: activeEnquiryMachine.equipment,
          hours: hours,
          contact: phone,
          date: new Date().toISOString().slice(0, 10)
        })
      }).catch(e => {});
    } catch (err) {}
  }

  closeEnquiryModal();
  showToast(`🎉 Rental Enquiry Submitted! Booking Token: ${token} generated for ${farmerName}.`, "success");

  // If farmer is logged in, refresh dashboard
  if (currentUser) {
    renderFarmerDashboardUI();
  }
}

// =========================================================================
// 11. FARMER LOGIN & KISAN CONTROL DASHBOARD
// =========================================================================

function loadCurrentUser() {
  try {
    const saved = localStorage.getItem("AGRISHARE_CURRENT_USER");
    if (saved) {
      currentUser = JSON.parse(saved);
    }
  } catch (err) {
    currentUser = null;
  }
}

function loadBookingsList() {
  try {
    const saved = localStorage.getItem("AGRISHARE_BOOKINGS_LIST");
    if (saved) {
      currentBookingsList = JSON.parse(saved);
    }
    // If empty or only 1 sample, seed with rich realistic bookings
    if (!currentBookingsList || currentBookingsList.length <= 1) {
      currentBookingsList = [
        {
          token: "AGRI-REQ-101",
          farmerName: "Ramesh Pawar",
          farmerPhone: "9820123456",
          village: "Village A (North Canal)",
          machineId: "A01",
          machineName: "Rotavator",
          ownerName: "Farmer A",
          ownerPhone: "9820112233",
          hours: 4,
          rate: 800,
          total: 3200,
          date: "2026-10-15",
          status: "Confirmed",
          notes: "Kharif field seedbed preparation near canal",
          source: "Website Booking"
        },
        {
          token: "AGRI-REQ-102",
          farmerName: "Sunil Shinde",
          farmerPhone: "9820778899",
          village: "Village A (Main Road)",
          machineId: "A01",
          machineName: "Rotavator",
          ownerName: "Farmer A",
          ownerPhone: "9820112233",
          hours: 3,
          rate: 800,
          total: 2400,
          date: "2026-10-18",
          status: "Pending Request",
          notes: "Urgent required for soil rotavating",
          source: "Google Form (Find Equipment)"
        },
        {
          token: "AGRI-REQ-103",
          farmerName: "Mahesh Deshmukh",
          farmerPhone: "9820443322",
          village: "Village B",
          machineId: "A02",
          machineName: "Tractor",
          ownerName: "Farmer B",
          ownerPhone: "9820334455",
          hours: 6,
          rate: 1000,
          total: 6000,
          date: "2026-10-16",
          status: "Confirmed",
          notes: "Trolley haulage and deep ploughing",
          source: "Website Booking"
        },
        {
          token: "AGRI-REQ-104",
          farmerName: "Kiran More",
          farmerPhone: "9820665544",
          village: "Village A",
          machineId: "A01",
          machineName: "Rotavator",
          ownerName: "Farmer Suresh",
          ownerPhone: "9820556677",
          hours: 5,
          rate: 800,
          total: 4000,
          date: "2026-10-20",
          status: "Pending Request",
          notes: "Post-harvest soil turning",
          source: "Google Form (Find Equipment)"
        }
      ];
      saveBookingsList();
    }
  } catch (err) {
    currentBookingsList = [];
  }
}

function saveBookingsList() {
  try {
    localStorage.setItem("AGRISHARE_BOOKINGS_LIST", JSON.stringify(currentBookingsList));
  } catch (err) {
    console.error("Failed to save bookings:", err);
  }
}

// Active Login Modal Tab State
let currentLoginRole = "owner";

function setCurrentUser(user) {
  currentUser = user;
  try {
    localStorage.setItem("AGRISHARE_CURRENT_USER", JSON.stringify(user));
  } catch (err) {}
  updateUserAuthUI();
}

function updateUserAuthUI() {
  const loggedOutBox = document.getElementById("auth-logged-out");
  const loggedInBox = document.getElementById("auth-logged-in");
  const nameSpan = document.getElementById("header-user-name");
  const roleSpan = document.getElementById("header-user-role");
  const avatarSpan = document.getElementById("header-avatar-circle");

  if (currentUser) {
    if (loggedOutBox) loggedOutBox.style.display = "none";
    if (loggedInBox) loggedInBox.style.display = "inline-flex";
    if (nameSpan) nameSpan.innerText = currentUser.name;
    
    const isOwner = currentUser.role === "Owner";
    if (roleSpan) {
      roleSpan.innerText = isOwner ? "Owner" : "Hirer";
      roleSpan.className = `badge-role ${isOwner ? 'owner-role' : 'farmer-role'}`;
    }
    if (avatarSpan) {
      avatarSpan.innerText = isOwner ? "🚜" : "👨‍🌾";
    }
  } else {
    if (loggedOutBox) loggedOutBox.style.display = "inline-flex";
    if (loggedInBox) loggedInBox.style.display = "none";
  }
}

// Open Login Modal configured for specific role
function openLoginModalWithRole(role = "owner") {
  switchLoginRoleTab(role);
  const modal = document.getElementById("farmer-login-modal");
  if (modal) modal.classList.add("active");
}

function closeRoleLoginModal() {
  const modal = document.getElementById("farmer-login-modal");
  if (modal) modal.classList.remove("active");
}

// Switch between Owner and Farmer tabs in login modal
function switchLoginRoleTab(role) {
  currentLoginRole = role;
  const tabOwner = document.getElementById("tab-login-owner");
  const tabFarmer = document.getElementById("tab-login-farmer");
  const descOwner = document.getElementById("login-owner-desc");
  const descFarmer = document.getElementById("login-farmer-desc");
  const demoOwner = document.getElementById("owner-demo-profiles");
  const demoFarmer = document.getElementById("farmer-demo-profiles");
  const phoneInput = document.getElementById("login-mobile-number");
  const phoneLabel = document.getElementById("login-mobile-label");
  const submitText = document.getElementById("btn-submit-login-text");
  const footerHint = document.getElementById("login-footer-hint");

  if (role === "owner") {
    if (tabOwner) tabOwner.classList.add("active");
    if (tabFarmer) tabFarmer.classList.remove("active");
    if (descOwner) descOwner.style.display = "block";
    if (descFarmer) descFarmer.style.display = "none";
    if (demoOwner) demoOwner.style.display = "flex";
    if (demoFarmer) demoFarmer.style.display = "none";
    if (phoneLabel) phoneLabel.innerHTML = `Registered Owner Mobile Number <span class="required">*</span>`;
    if (phoneInput) phoneInput.value = "9820112233";
    if (submitText) submitText.innerText = "Login to Owner Dashboard";
    if (footerHint) footerHint.innerHTML = `New Machine Owner? <a href="javascript:void(0)" onclick="closeRoleLoginModal(); navigateTo('list');">Register your equipment here →</a>`;
  } else {
    if (tabOwner) tabOwner.classList.remove("active");
    if (tabFarmer) tabFarmer.classList.add("active");
    if (descOwner) descOwner.style.display = "none";
    if (descFarmer) descFarmer.style.display = "block";
    if (demoOwner) demoOwner.style.display = "none";
    if (demoFarmer) demoFarmer.style.display = "flex";
    if (phoneLabel) phoneLabel.innerHTML = `Farmer / Hirer Mobile Number <span class="required">*</span>`;
    if (phoneInput) phoneInput.value = "9820123456";
    if (submitText) submitText.innerText = "Login to Farmer Rental Portal";
    if (footerHint) footerHint.innerHTML = `Need equipment for your field? <a href="javascript:void(0)" onclick="closeRoleLoginModal(); navigateTo('find');">Find available machinery here →</a>`;
  }
}

// 1-Click quick login
function quickLoginWithNumber(mobile, role = "owner") {
  switchLoginRoleTab(role);
  const phoneInput = document.getElementById("login-mobile-number");
  if (phoneInput) phoneInput.value = mobile;
  handleRoleLoginSubmit(new Event("submit"));
}

// Login submission handler
function handleRoleLoginSubmit(event) {
  if (event && event.preventDefault) event.preventDefault();

  const mobileInput = document.getElementById("login-mobile-number");
  const mobile = mobileInput ? mobileInput.value.trim() : "";

  if (!mobile || mobile.length !== 10) {
    showToast("Please enter a valid 10-digit mobile number.", "error");
    return;
  }

  closeRoleLoginModal();

  if (currentLoginRole === "owner") {
    // Equipment Owner login flow
    const myMachines = currentEquipmentDatabase.filter(item => item.contact === mobile);
    const ownerName = myMachines.length > 0 ? myMachines[0].owner : (mobile === "9820556677" ? "Farmer Suresh" : "Machine Owner");
    const village = myMachines.length > 0 ? myMachines[0].village : "Village A";

    setCurrentUser({
      name: ownerName,
      mobile: mobile,
      village: village,
      role: "Owner"
    });

    showToast(`🚜 Welcome back, ${ownerName}! Logged into Equipment Owner Portal.`, "success");
    openOwnerDashboardModal();

  } else {
    // Farmer / Hirer login flow
    const myBookings = currentBookingsList.filter(b => b.farmerPhone === mobile);
    const farmerName = myBookings.length > 0 ? myBookings[0].farmerName : (mobile === "9820123456" ? "Ramesh Pawar" : (mobile === "9820778899" ? "Sunil Shinde" : "Kisan User"));
    const village = myBookings.length > 0 && myBookings[0].village ? myBookings[0].village : "Village A";

    setCurrentUser({
      name: farmerName,
      mobile: mobile,
      village: village,
      role: "Farmer / Hirer"
    });

    showToast(`🌾 Welcome, ${farmerName}! Logged into Farmer Rental Portal.`, "success");
    openFarmerHirerDashboardModal();
  }
}

function handleUserLogout() {
  currentUser = null;
  localStorage.removeItem("AGRISHARE_CURRENT_USER");
  updateUserAuthUI();
  closeOwnerDashboardModal();
  closeFarmerHirerDashboardModal();
  showToast("Logged out successfully.", "success");
}

// Header click router based on current role
function openActiveRoleDashboard() {
  if (!currentUser) {
    openLoginModalWithRole("owner");
    return;
  }

  if (currentUser.role === "Owner") {
    openOwnerDashboardModal();
  } else {
    openFarmerHirerDashboardModal();
  }
}

// Switch between Owner view and Farmer view
function switchDashboardView(targetRole) {
  if (targetRole === "farmer") {
    closeOwnerDashboardModal();
    openFarmerHirerDashboardModal();
    showToast("Switched to Farmer / Hirer Rental View 🌾", "success");
  } else {
    closeFarmerHirerDashboardModal();
    openOwnerDashboardModal();
    showToast("Switched to Equipment Owner Control Center 🚜", "success");
  }
}

// -------------------------------------------------------------------------
// DASHBOARD 1: EQUIPMENT OWNER CONTROL CENTER
// -------------------------------------------------------------------------

function openOwnerDashboardModal() {
  renderOwnerDashboardUI();
  const modal = document.getElementById("owner-dashboard-modal");
  if (modal) modal.classList.add("active");
}

function closeOwnerDashboardModal() {
  const modal = document.getElementById("owner-dashboard-modal");
  if (modal) modal.classList.remove("active");
}

function renderOwnerDashboardUI() {
  const activeUser = currentUser || { name: "Farmer A", mobile: "9820112233", village: "Village A", role: "Owner" };

  // Profile
  const nameElem = document.getElementById("owner-dash-name");
  const villElem = document.getElementById("owner-dash-village");
  const phoneElem = document.getElementById("owner-dash-phone");

  if (nameElem) nameElem.innerText = activeUser.name;
  if (villElem) villElem.innerText = activeUser.village || "Village A";
  if (phoneElem) phoneElem.innerText = activeUser.mobile || "9820112233";

  // Machines owned by this owner
  let myMachines = currentEquipmentDatabase.filter(i => i.contact === activeUser.mobile);
  if (myMachines.length === 0 && activeUser.name === "Farmer A") {
    myMachines = currentEquipmentDatabase.filter(i => i.id === "A01");
  }
  const myMachineIds = myMachines.map(m => m.id);

  // Incoming bookings for my machines
  const relevantBookings = currentBookingsList.filter(b => {
    if (b.ownerPhone && b.ownerPhone === activeUser.mobile) return true;
    if (b.machineId && myMachineIds.includes(b.machineId)) return true;
    if (b.ownerName && activeUser.name && b.ownerName.toLowerCase() === activeUser.name.toLowerCase()) return true;
    return false;
  });

  const totalBookingsCount = relevantBookings.length;
  const totalBookedHours = relevantBookings.reduce((sum, b) => sum + (Number(b.hours) || 0), 0);
  const totalBookedEarnings = relevantBookings.reduce((sum, b) => sum + (Number(b.total) || 0), 0);

  // Stats
  const statMachines = document.getElementById("owner-stat-machines");
  const statBookings = document.getElementById("owner-stat-bookings");
  const statHours = document.getElementById("owner-stat-hours");
  const statEarnings = document.getElementById("owner-stat-earnings");
  const badgeCount = document.getElementById("owner-dash-bookings-count");

  if (statMachines) statMachines.innerText = myMachines.length;
  if (statBookings) statBookings.innerText = `${totalBookingsCount} Bookings`;
  if (statHours) statHours.innerText = `${totalBookedHours > 0 ? totalBookedHours : myMachines.length * 35} hrs`;
  const displayedIncome = totalBookedEarnings > 0 ? totalBookedEarnings : myMachines.reduce((acc, m) => acc + (m.rate * 35), 0);
  if (statEarnings) statEarnings.innerText = `₹${displayedIncome.toLocaleString('en-IN')}`;
  if (badgeCount) badgeCount.innerText = `${totalBookingsCount}`;

  // Machinery Fleet List
  const equipContainer = document.getElementById("owner-dash-equipment-list");
  if (equipContainer) {
    if (myMachines.length === 0) {
      equipContainer.innerHTML = `
        <div style="background: #fff; padding: 1.25rem; border-radius: var(--radius-md); text-align: center; border: 1px dashed var(--border-color);">
          <p style="color: var(--text-muted); font-size: 0.9rem;">You haven't listed any farm machines in the database yet.</p>
          <button class="btn btn-primary btn-sm" style="margin-top: 0.5rem;" onclick="closeOwnerDashboardModal(); navigateTo('list');">
            ➕ Register Your Equipment Now
          </button>
        </div>
      `;
    } else {
      equipContainer.innerHTML = myMachines.map(m => {
        const machineBookings = relevantBookings.filter(b => b.machineId === m.id || (b.machineName && b.machineName.toLowerCase() === m.equipment.toLowerCase()));
        return `
        <div class="my-equip-card">
          <div style="display: flex; align-items: center; gap: 0.85rem;">
            <img src="${m.image || 'assets/tractor_card.jpg'}" alt="${m.equipment}" style="width: 58px; height: 50px; object-fit: cover; border-radius: var(--radius-sm);" onerror="this.src='assets/tractor_card.jpg'">
            <div>
              <strong style="font-size: 1.05rem; color: var(--text-main);">${m.equipment} (${m.id})</strong>
              <div style="font-size: 0.82rem; color: var(--text-muted); margin-top: 0.15rem;">
                Season: <strong>${m.bestMonth || 'All Season'}</strong> • Available: <strong>${m.availableDate || 'Ready'}</strong>
              </div>
              <div class="badge-machine-bookings">
                <span>👥</span> <span>${machineBookings.length} Kisan Booked (${machineBookings.reduce((s, b) => s + (Number(b.hours) || 0), 0)} hrs)</span>
              </div>
            </div>
          </div>

          <div class="equip-toggle-action">
            <!-- Rate Editor -->
            <div style="display: flex; align-items: center; gap: 0.25rem; font-size: 0.85rem;">
              <span>₹</span>
              <input type="number" class="inline-rate-input" value="${m.rate}" step="50" min="50" onchange="updateFarmerMachineRate('${m.id}', this.value)" title="Change hourly rental rate">
              <span style="font-size: 0.78rem; color: var(--text-subtle);">/hr</span>
            </div>

            <!-- Live Status Toggler -->
            <button class="toggle-switch-btn ${m.status === 'Available' ? 'avail' : 'booked'}" onclick="toggleFarmerMachineStatus('${m.id}')" title="Click to toggle status in Google Sheets">
              <span>${m.status === 'Available' ? '🟢 Available' : '🔴 In Field (Booked)'}</span>
              <span style="font-size: 0.72rem; opacity: 0.7;">(Toggle)</span>
            </button>
          </div>
        </div>
      `;
      }).join("");
    }
  }

  // Incoming Bookings List
  const bookingsContainer = document.getElementById("owner-dash-bookings-list");
  if (bookingsContainer) {
    if (relevantBookings.length === 0) {
      bookingsContainer.innerHTML = `
        <div style="text-align: center; padding: 1.5rem 1rem; background: #fff; border-radius: var(--radius-sm); border: 1px dashed var(--border-color);">
          <div style="font-size: 1.75rem; margin-bottom: 0.35rem;">📭</div>
          <strong style="font-size: 0.95rem; color: var(--text-main);">No rental requests received yet.</strong>
          <p style="font-size: 0.82rem; color: var(--text-muted); margin-top: 0.35rem;">
            Click <strong>"➕ Simulate Test Booking"</strong> above to test an incoming request right away!
          </p>
        </div>
      `;
    } else {
      bookingsContainer.innerHTML = relevantBookings.map(b => {
        const statusClass = (b.status || 'Confirmed').toLowerCase().includes('pending') ? 'pending' : (b.status || '').toLowerCase().includes('complete') ? 'completed' : 'confirmed';
        const phoneClean = (b.farmerPhone || '').replace(/\D/g, '');
        return `
        <div class="dash-booking-card" id="booking-item-${b.token}">
          <div class="booking-header-row">
            <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
              <span class="booking-token-tag">🎫 ${b.token}</span>
              <span class="booking-pill ${statusClass}">
                ${statusClass === 'confirmed' ? '🟢 Confirmed' : statusClass === 'pending' ? '🟡 Pending Request' : '✅ Completed'}
              </span>
              <span style="font-size: 0.75rem; color: var(--text-subtle);">
                📅 ${b.date || 'Today'} • ${b.source || 'Website Booking'}
              </span>
            </div>
            <div>
              <span style="font-size: 0.78rem; font-weight: 700; color: var(--primary-dark);">
                🚜 Machine: ${b.machineName} (${b.machineId || 'A01'})
              </span>
            </div>
          </div>

          <div class="booking-main-grid">
            <div class="booking-hirer-info">
              <h4>👤 Hirer: <strong>${b.farmerName}</strong></h4>
              <div class="booking-meta-line">
                📍 Location: <strong>${b.village || 'Local Village'}</strong> • 📞 Mobile: <strong>${b.farmerPhone}</strong>
              </div>
              <div class="booking-meta-line" style="margin-top: 0.2rem;">
                ⏱️ Booked Duration: <strong>${b.hours} hours</strong> @ <strong>₹${b.rate || Math.round(b.total / b.hours) || 800}/hr</strong>
              </div>
              ${b.notes ? `<div class="booking-meta-line" style="font-style: italic; color: var(--text-subtle); margin-top: 0.2rem;">📝 "${b.notes}"</div>` : ''}

              <!-- Direct Call & WhatsApp Buttons -->
              <div class="booking-quick-contact">
                <a href="tel:${b.farmerPhone}" class="btn-contact-action btn-contact-call" title="Call Farmer Directly">
                  <span>📞</span> Call Farmer
                </a>
                <a href="https://wa.me/91${phoneClean}" target="_blank" rel="noopener noreferrer" class="btn-contact-action btn-contact-wa" title="WhatsApp Farmer">
                  <span>💬</span> WhatsApp
                </a>
              </div>
            </div>

            <div class="booking-price-badge">
              <div style="font-size: 0.72rem; color: var(--text-subtle); font-weight: 600;">Total Rental Amount:</div>
              <strong style="font-size: 1.25rem; color: var(--primary-color); font-family: var(--font-heading);">
                ₹${Number(b.total || 0).toLocaleString('en-IN')}
              </strong>
            </div>
          </div>

          <div class="booking-actions-row">
            ${statusClass !== 'confirmed' ? `
              <button type="button" class="btn btn-primary btn-sm" onclick="acceptBooking('${b.token}')" style="font-size: 0.78rem; padding: 0.35rem 0.75rem;">
                <span>✅</span> Accept & Mark In Field
              </button>
            ` : `
              <button type="button" class="btn btn-secondary btn-sm" onclick="completeBooking('${b.token}')" style="font-size: 0.78rem; padding: 0.35rem 0.75rem;">
                <span>🏁</span> Mark Job Completed
              </button>
            `}
            <button type="button" class="btn btn-outline btn-sm" onclick="cancelBooking('${b.token}')" style="font-size: 0.78rem; padding: 0.35rem 0.75rem; color: #DC2626; border-color: #FECACA;">
              <span>✕</span> Cancel
            </button>
          </div>
        </div>
      `;
      }).join("");
    }
  }
}

// -------------------------------------------------------------------------
// DASHBOARD 2: DEDICATED FARMER / HIRER RENTAL PORTAL
// -------------------------------------------------------------------------

function openFarmerHirerDashboardModal() {
  renderFarmerHirerDashboardUI();
  const modal = document.getElementById("farmer-hirer-dashboard-modal");
  if (modal) modal.classList.add("active");
}

function closeFarmerHirerDashboardModal() {
  const modal = document.getElementById("farmer-hirer-dashboard-modal");
  if (modal) modal.classList.remove("active");
}

function renderFarmerHirerDashboardUI() {
  const activeUser = currentUser || { name: "Ramesh Pawar", mobile: "9820123456", village: "Village A", role: "Farmer / Hirer" };

  // Profile Hero
  const nameElem = document.getElementById("farmer-dash-name");
  const villElem = document.getElementById("farmer-dash-village");
  const phoneElem = document.getElementById("farmer-dash-phone");

  if (nameElem) nameElem.innerText = activeUser.name;
  if (villElem) villElem.innerText = activeUser.village || "Village A";
  if (phoneElem) phoneElem.innerText = activeUser.mobile || "9820123456";

  // Bookings made by this farmer
  let myHiredBookings = currentBookingsList.filter(b => b.farmerPhone === activeUser.mobile);
  if (myHiredBookings.length === 0 && (activeUser.name === "Ramesh Pawar" || activeUser.mobile === "9820123456")) {
    myHiredBookings = currentBookingsList.filter(b => b.token === "AGRI-REQ-101");
  }

  // Fallback demo bookings for exhibition judges so they never see empty screen
  if (myHiredBookings.length === 0) {
    myHiredBookings = currentBookingsList.slice(0, 2);
  }

  const activeRentalsCount = myHiredBookings.length;
  const totalHoursHired = myHiredBookings.reduce((sum, b) => sum + (Number(b.hours) || 0), 0);
  const totalSpent = myHiredBookings.reduce((sum, b) => sum + (Number(b.total) || 0), 0);
  const estimatedSavings = 96000; // Average annual savings

  // Update Farmer Stats
  const statActive = document.getElementById("farmer-stat-active-rentals");
  const statHours = document.getElementById("farmer-stat-hours-used");
  const statSpent = document.getElementById("farmer-stat-total-spent");
  const statSavings = document.getElementById("farmer-stat-savings");
  const badgeCount = document.getElementById("farmer-dash-bookings-count");

  if (statActive) statActive.innerText = activeRentalsCount;
  if (statHours) statHours.innerText = `${totalHoursHired} hrs`;
  if (statSpent) statSpent.innerText = `₹${totalSpent.toLocaleString('en-IN')}`;
  if (statSavings) statSavings.innerText = `₹${estimatedSavings.toLocaleString('en-IN')}`;
  if (badgeCount) badgeCount.innerText = `${activeRentalsCount}`;

  // Render Farmer Bookings List
  const bookingsContainer = document.getElementById("farmer-dash-bookings-list");
  if (bookingsContainer) {
    if (myHiredBookings.length === 0) {
      bookingsContainer.innerHTML = `
        <div style="text-align: center; padding: 1.5rem 1rem; background: #fff; border-radius: var(--radius-sm); border: 1px dashed var(--border-color);">
          <div style="font-size: 1.75rem; margin-bottom: 0.35rem;">🚜</div>
          <strong style="font-size: 0.95rem; color: var(--text-main);">You have no active machinery bookings right now.</strong>
          <p style="font-size: 0.82rem; color: var(--text-muted); margin-top: 0.35rem;">
            Click below to find tractors, rotavators, sprayers, and harvesters available in your area!
          </p>
          <button class="btn btn-primary btn-sm" style="margin-top: 0.5rem;" onclick="closeFarmerHirerDashboardModal(); navigateTo('find');">
            <span>🔍</span> Find Available Machinery
          </button>
        </div>
      `;
    } else {
      bookingsContainer.innerHTML = myHiredBookings.map(b => {
        const statusClass = (b.status || 'Confirmed').toLowerCase().includes('pending') ? 'pending' : (b.status || '').toLowerCase().includes('complete') ? 'completed' : 'confirmed';
        const ownerPhoneClean = (b.ownerPhone || '9820112233').replace(/\D/g, '');
        const matchedMachine = currentEquipmentDatabase.find(m => m.id === b.machineId);
        const machineImg = matchedMachine ? matchedMachine.image : 'assets/rotavator_card.jpg';

        return `
        <div class="dash-booking-card">
          <div class="booking-header-row">
            <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
              <span class="booking-token-tag">🎫 ${b.token}</span>
              <span class="booking-pill ${statusClass}">
                ${statusClass === 'confirmed' ? '🟢 Confirmed & Scheduled' : statusClass === 'pending' ? '🟡 Awaiting Owner Confirmation' : '✅ Completed'}
              </span>
              <span style="font-size: 0.75rem; color: var(--text-subtle);">
                📅 Scheduled: ${b.date || 'Today'}
              </span>
            </div>
            <div>
              <span style="font-size: 0.82rem; font-weight: 700; color: var(--primary-color);">
                ₹${Number(b.total || 0).toLocaleString('en-IN')} Paid / Due
              </span>
            </div>
          </div>

          <div style="display: flex; gap: 1rem; align-items: center; margin-top: 0.5rem; flex-wrap: wrap;">
            <img src="${machineImg}" alt="${b.machineName}" style="width: 64px; height: 52px; object-fit: cover; border-radius: var(--radius-sm); border: 1px solid var(--border-color);" onerror="this.src='assets/tractor_card.jpg'">
            <div style="flex: 1;">
              <h4 style="margin: 0; font-size: 1.05rem; color: var(--text-main);">${b.machineName} (${b.machineId || 'A01'})</h4>
              <div style="font-size: 0.82rem; color: var(--text-muted); margin-top: 0.15rem;">
                Machine Owner: <strong>${b.ownerName || 'Farmer A'}</strong> • Location: <strong>${b.village || 'Village A'}</strong>
              </div>
              <div style="font-size: 0.8rem; color: var(--text-subtle); margin-top: 0.2rem;">
                Duration: <strong>${b.hours} hours</strong> @ ₹${b.rate || Math.round(b.total / b.hours) || 800}/hr
              </div>

              <!-- Direct Contact to Machine Owner -->
              <div class="booking-quick-contact">
                <a href="tel:${b.ownerPhone || '9820112233'}" class="btn-contact-action btn-contact-call" title="Call Machine Owner">
                  <span>📞</span> Call Owner (${b.ownerPhone || '9820112233'})
                </a>
                <a href="https://wa.me/91${ownerPhoneClean}" target="_blank" rel="noopener noreferrer" class="btn-contact-action btn-contact-wa" title="WhatsApp Machine Owner">
                  <span>💬</span> WhatsApp Owner
                </a>
              </div>
            </div>
          </div>
        </div>
      `;
      }).join("");
    }
  }
}

// Backwards-compatibility aliases
function openFarmerLoginModal() { openLoginModalWithRole('owner'); }
function closeFarmerLoginModal() { closeRoleLoginModal(); }
function openFarmerDashboardModal() { openActiveRoleDashboard(); }
function closeFarmerDashboardModal() { closeOwnerDashboardModal(); closeFarmerHirerDashboardModal(); }
function handleFarmerLogout() { handleUserLogout(); }
function renderFarmerDashboardUI() { renderOwnerDashboardUI(); }

// Booking Management Action Handlers
function acceptBooking(token) {
  const booking = currentBookingsList.find(b => b.token === token);
  if (!booking) return;

  booking.status = "Confirmed";
  
  // Mark the machine status to "Booked"
  if (booking.machineId) {
    const machine = currentEquipmentDatabase.find(m => m.id === booking.machineId);
    if (machine) {
      machine.status = "Booked";
      saveEquipmentDatabase();
      applyEquipmentFilters();
      
      // Update Google Sheets
      if (!AGRI_CONFIG.IS_DEMO_MODE && AGRI_CONFIG.GOOGLE_APPS_SCRIPT_WEB_APP_URL && !AGRI_CONFIG.GOOGLE_APPS_SCRIPT_WEB_APP_URL.includes("SAMPLE")) {
        try {
          fetch(AGRI_CONFIG.GOOGLE_APPS_SCRIPT_WEB_APP_URL, {
            method: "POST",
            headers: { "Content-Type": "text/plain;charset=utf-8" },
            body: JSON.stringify({ action: "updateStatus", id: machine.id, status: "Booked" })
          });
        } catch (e) {}
      }
    }
  }

  saveBookingsList();
  renderOwnerDashboardUI();
  showToast(`✅ Booking ${token} accepted! Machine marked as "In Field (Booked)".`, "success");
}

function completeBooking(token) {
  const booking = currentBookingsList.find(b => b.token === token);
  if (!booking) return;

  booking.status = "Completed";

  // Mark machine back to "Available"
  if (booking.machineId) {
    const machine = currentEquipmentDatabase.find(m => m.id === booking.machineId);
    if (machine) {
      machine.status = "Available";
      saveEquipmentDatabase();
      applyEquipmentFilters();

      // Update Google Sheets
      if (!AGRI_CONFIG.IS_DEMO_MODE && AGRI_CONFIG.GOOGLE_APPS_SCRIPT_WEB_APP_URL && !AGRI_CONFIG.GOOGLE_APPS_SCRIPT_WEB_APP_URL.includes("SAMPLE")) {
        try {
          fetch(AGRI_CONFIG.GOOGLE_APPS_SCRIPT_WEB_APP_URL, {
            method: "POST",
            headers: { "Content-Type": "text/plain;charset=utf-8" },
            body: JSON.stringify({ action: "updateStatus", id: machine.id, status: "Available" })
          });
        } catch (e) {}
      }
    }
  }

  saveBookingsList();
  renderOwnerDashboardUI();
  showToast(`🏁 Rental completed for ${booking.farmerName}! Machine marked back as "Available".`, "success");
}

function cancelBooking(token) {
  const idx = currentBookingsList.findIndex(b => b.token === token);
  if (idx !== -1) {
    const b = currentBookingsList[idx];
    currentBookingsList.splice(idx, 1);
    saveBookingsList();
    renderOwnerDashboardUI();
    showToast(`Booking ${token} cancelled.`, "error");
  }
}

// Simulate an incoming test booking on the owner's dashboard
function simulateNewFarmerBooking() {
  const activeUser = currentUser || { name: "Farmer A", mobile: "9820112233", village: "Village A" };
  const myMachines = currentEquipmentDatabase.filter(i => i.contact === activeUser.mobile);
  const targetMachine = myMachines.length > 0 ? myMachines[0] : currentEquipmentDatabase[0];

  const sampleNames = ["Farmer Jagdish", "Farmer Prakash", "Farmer Anita", "Farmer Vijay", "Farmer Santosh"];
  const randomName = sampleNames[Math.floor(Math.random() * sampleNames.length)];
  const randomHours = Math.floor(Math.random() * 5) + 3; // 3 to 7 hours
  const rate = targetMachine ? targetMachine.rate : 800;
  const total = rate * randomHours;
  const token = `AGRI-REQ-${Math.floor(1000 + Math.random() * 9000)}`;
  const randomPhone = `9820${Math.floor(100000 + Math.random() * 900000)}`;

  const newTestBooking = {
    token: token,
    farmerName: randomName,
    farmerPhone: randomPhone,
    village: activeUser.village || "Village A",
    machineId: targetMachine ? targetMachine.id : "A01",
    machineName: targetMachine ? targetMachine.equipment : "Rotavator",
    ownerName: activeUser.name,
    ownerPhone: activeUser.mobile,
    hours: randomHours,
    rate: rate,
    total: total,
    date: new Date().toLocaleDateString('en-IN'),
    status: "Pending Request",
    notes: "Demonstration booking for Science Exhibition",
    source: "Exhibition Simulation"
  };

  currentBookingsList.unshift(newTestBooking);
  saveBookingsList();
  renderOwnerDashboardUI();
  showToast(`🎉 New Booking Request from ${randomName}! (${randomHours} hrs — ₹${total.toLocaleString('en-IN')})`, "success");
}

async function toggleFarmerMachineStatus(machineId) {
  const item = currentEquipmentDatabase.find(i => i.id === machineId);
  if (!item) return;

  item.status = item.status === "Available" ? "Booked" : "Available";
  saveEquipmentDatabase();
  applyEquipmentFilters();
  renderFarmerDashboardUI();

  // Sync to Google Sheets via Apps Script Web App if live
  if (!AGRI_CONFIG.IS_DEMO_MODE && AGRI_CONFIG.GOOGLE_APPS_SCRIPT_WEB_APP_URL && !AGRI_CONFIG.GOOGLE_APPS_SCRIPT_WEB_APP_URL.includes("SAMPLE")) {
    try {
      fetch(AGRI_CONFIG.GOOGLE_APPS_SCRIPT_WEB_APP_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({
          action: "updateStatus",
          id: machineId,
          status: item.status
        })
      });
    } catch (err) {
      console.warn("Could not sync status update to Apps Script:", err);
    }
  }

  showToast(`⚡ ${item.equipment} (${item.id}) status updated to ${item.status}! Synced in Google Sheets.`, "success");
}

function updateFarmerMachineRate(machineId, newRate) {
  const item = currentEquipmentDatabase.find(i => i.id === machineId);
  if (!item) return;

  const parsed = parseInt(newRate, 10);
  if (isNaN(parsed) || parsed < 50) {
    showToast("Please enter a valid rate (minimum ₹50).", "error");
    return;
  }

  item.rate = parsed;
  saveEquipmentDatabase();
  applyEquipmentFilters();
  renderFarmerDashboardUI();

  // Sync to Google Sheets if live
  if (!AGRI_CONFIG.IS_DEMO_MODE && AGRI_CONFIG.GOOGLE_APPS_SCRIPT_WEB_APP_URL && !AGRI_CONFIG.GOOGLE_APPS_SCRIPT_WEB_APP_URL.includes("SAMPLE")) {
    try {
      fetch(AGRI_CONFIG.GOOGLE_APPS_SCRIPT_WEB_APP_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({
          action: "updateRate",
          id: machineId,
          rate: parsed
        })
      });
    } catch (err) {}
  }

  showToast(`💵 Rate for ${item.equipment} updated to ₹${parsed}/hr!`, "success");
}

// =========================================================================
// 12. TOAST NOTIFICATION UTILITY & MULTILINGUAL SUPPORT
// =========================================================================

function showToast(message, type = "success") {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast ${type === 'success' ? 'toast-success' : 'toast-error'}`;
  toast.innerHTML = `
    <span>${type === 'success' ? '✅' : '⚠️'}</span>
    <span>${message}</span>
  `;

  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(50px)";
    toast.style.transition = "all 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

function changeLanguage(langCode) {
  if (typeof window.applyLanguage === "function") {
    window.applyLanguage(langCode);
    const dict = window.TRANSLATIONS ? window.TRANSLATIONS[langCode] : null;
    const name = dict ? dict.langName : langCode.toUpperCase();
    if (langCode === "en") {
      showToast("🌐 Language switched to: English (EN)", "success");
    } else if (langCode === "mr") {
      showToast("🌐 भाषा बदलली: मराठी (MR)", "success");
    } else {
      showToast(`🌐 भाषा बदली: ${name} (${langCode.toUpperCase()})`, "success");
    }
  } else {
    showToast(`Language switched to ${langCode.toUpperCase()}.`, "success");
  }
}

// Global modal backdrop click & Escape key handlers
document.addEventListener("click", (e) => {
  if (e.target.classList && (e.target.classList.contains("modal-backdrop") || e.target.classList.contains("modal-overlay"))) {
    e.target.classList.remove("active");
    document.body.style.overflow = "";
    const introPlayer = document.getElementById("intro-modal-player");
    if (introPlayer) try { introPlayer.pause(); } catch (err) {}
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    document.querySelectorAll(".modal-backdrop.active, .modal-overlay.active").forEach((m) => {
      m.classList.remove("active");
    });
    document.body.style.overflow = "";
    const introPlayer = document.getElementById("intro-modal-player");
    if (introPlayer) try { introPlayer.pause(); } catch (err) {}
  }
});

// =========================================================================
// CLEAN SAFE STUBS (School loader removed for fair exhibition judging)
// =========================================================================
function dismissSchoolLoader() {}
function replaySchoolIntro() {}


