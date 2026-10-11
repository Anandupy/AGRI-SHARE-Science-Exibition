/**
 * =========================================================================
 * 🎬 AGRI-SHARE — EXHIBITION JUDGE LIVE DEMONSTRATION ENGINE
 * Complete A-to-Z Automated 1-Click Interactive Tour for Science Exhibition
 * Features: Virtual cursor glide, human typing cadence, element ripples & HUD
 * =========================================================================
 */

(function () {
  "use strict";

  let isDemoRunning = false;
  let skipStepRequested = false;

  // Interruptible sleep utility
  function sleep(ms) {
    return new Promise((resolve) => {
      const interval = 40;
      let elapsed = 0;
      const timer = setInterval(() => {
        elapsed += interval;
        if (!isDemoRunning || skipStepRequested || elapsed >= ms) {
          clearInterval(timer);
          resolve();
        }
      }, interval);
    });
  }

  function getDemoElements() {
    return {
      layer: document.getElementById("demo-overlay-layer"),
      cursor: document.getElementById("demo-virtual-cursor"),
      ripple: document.getElementById("demo-click-ripple"),
      hudBar: document.getElementById("demo-hud-bar"),
      hudText: document.getElementById("demo-hud-step-text")
    };
  }

  function setHudStatus(text) {
    const { hudText } = getDemoElements();
    if (hudText) {
      hudText.innerText = text;
    }
  }

  async function moveCursorTo(element, durationMs = 600) {
    if (!isDemoRunning || !element) return;
    const { cursor } = getDemoElements();
    if (!cursor) return;

    // Scroll element into view smoothly if not visible in viewport
    const rect = element.getBoundingClientRect();
    const isOutOfView = rect.top < 90 || rect.bottom > (window.innerHeight - 80);
    if (isOutOfView) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
      await sleep(350);
    }

    // Fresh coordinates after scroll
    const freshRect = element.getBoundingClientRect();
    const targetX = Math.round(freshRect.left + freshRect.width / 2);
    const targetY = Math.round(freshRect.top + freshRect.height / 2);

    cursor.style.transition = `transform ${durationMs}ms cubic-bezier(0.25, 1, 0.5, 1)`;
    cursor.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;

    await sleep(durationMs + 50);
  }

  async function triggerClickEffect(element) {
    if (!isDemoRunning) return;
    const { ripple } = getDemoElements();

    if (ripple) {
      ripple.classList.remove("animate");
      void ripple.offsetWidth; // Force CSS reflow
      ripple.classList.add("animate");
    }

    if (element) {
      element.classList.add("demo-target-highlight");
      element.style.transition = "transform 0.12s ease";
      element.style.transform = "scale(0.97)";
      await sleep(130);
      element.style.transform = "";
      setTimeout(() => element.classList.remove("demo-target-highlight"), 400);
    }
  }

  async function simulateHumanTyping(inputElement, text, charSpeed = 35) {
    if (!isDemoRunning || !inputElement) return;

    await moveCursorTo(inputElement, 500);
    await triggerClickEffect(inputElement);

    inputElement.focus();
    inputElement.classList.add("demo-target-highlight");
    inputElement.value = "";

    for (let i = 0; i < text.length; i++) {
      if (!isDemoRunning) {
        inputElement.classList.remove("demo-target-highlight");
        return;
      }
      inputElement.value += text[i];
      inputElement.dispatchEvent(new Event("input", { bubbles: true }));
      await sleep(charSpeed + Math.random() * 20); // Natural human cadence
    }

    inputElement.dispatchEvent(new Event("change", { bubbles: true }));
    inputElement.classList.remove("demo-target-highlight");
    await sleep(180);
  }

  async function simulateDropdownSelect(selectElement, targetValue, durationMs = 450) {
    if (!isDemoRunning || !selectElement) return;

    await moveCursorTo(selectElement, durationMs);
    await triggerClickEffect(selectElement);

    selectElement.focus();
    selectElement.classList.add("demo-target-highlight");
    await sleep(180);

    selectElement.value = targetValue;
    selectElement.dispatchEvent(new Event("change", { bubbles: true }));

    await sleep(200);
    selectElement.classList.remove("demo-target-highlight");
  }

  // --- 1. SINGLE-ACTION FIND EQUIPMENT DEMO ---
  async function runFindEquipmentDemo() {
    if (typeof navigateTo === "function") navigateTo("find");
    if (typeof switchFindMode === "function") switchFindMode("web");
    await sleep(300);

    setHudStatus("👤 Step 1/7: Entering Farmer Name: Farmer Suresh...");
    const nameInput = document.getElementById("find-farmer-name");
    if (nameInput) await simulateHumanTyping(nameInput, "Farmer Suresh", 35);
    if (!isDemoRunning) return;

    setHudStatus("📱 Step 2/7: Entering Mobile Number: 9820556677...");
    const contactInput = document.getElementById("find-contact");
    if (contactInput) await simulateHumanTyping(contactInput, "9820556677", 40);
    if (!isDemoRunning) return;

    setHudStatus("📍 Step 3/7: Selecting Location: Village B...");
    const villageSelect = document.getElementById("find-village");
    await simulateDropdownSelect(villageSelect, "Village B", 500);
    if (!isDemoRunning) return;

    setHudStatus("🚜 Step 4/7: Choosing Machinery: Tractor...");
    const equipSelect = document.getElementById("find-equipment");
    await simulateDropdownSelect(equipSelect, "Tractor", 450);
    if (!isDemoRunning) return;

    setHudStatus("📅 Step 5/7: Setting Required Date...");
    const dateInput = document.getElementById("find-date");
    await moveCursorTo(dateInput, 450);
    await triggerClickEffect(dateInput);
    if (dateInput) {
      dateInput.value = "2026-10-18";
      dateInput.dispatchEvent(new Event("change", { bubbles: true }));
    }
    await sleep(250);
    if (!isDemoRunning) return;

    setHudStatus("⏱️ Step 6/7: Entering Rental Duration (6 Hours)...");
    const hoursInput = document.getElementById("find-hours");
    await simulateHumanTyping(hoursInput, "6", 50);
    if (!isDemoRunning) return;

    setHudStatus("🔍 Step 7/7: Searching & Recording Live in Google Sheet...");
    const searchBtn = document.getElementById("btn-submit-search");
    await moveCursorTo(searchBtn, 550);
    await triggerClickEffect(searchBtn);

    if (searchBtn) {
      searchBtn.click();
    }

    await sleep(400);
    const resultsSec = document.getElementById("search-results-section");
    if (resultsSec) {
      resultsSec.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    setHudStatus("🎉 Success! Found matching tractors in Village B. (Demo Complete)");
    if (typeof showToast === "function") {
      showToast("⭐ Exhibition Demo: Matched 2 Tractors available nearby!", "success");
    }

    await sleep(3000);
    stopJudgeLiveDemo();
  }

  // --- 2. SINGLE-ACTION LIST EQUIPMENT DEMO ---
  async function runListEquipmentDemo() {
    if (typeof navigateTo === "function") navigateTo("list");
    if (typeof switchListMode === "function") switchListMode("web");
    await sleep(300);

    setHudStatus("👤 Step 1/6: Entering Owner Name: Farmer Ramdas Patil...");
    const nameInput = document.getElementById("list-owner-name");
    await simulateHumanTyping(nameInput, "Farmer Ramdas Patil", 35);
    if (!isDemoRunning) return;

    setHudStatus("📍 Step 2/6: Selecting Location: Village A...");
    const villageSelect = document.getElementById("list-village");
    await simulateDropdownSelect(villageSelect, "Village A", 450);
    if (!isDemoRunning) return;

    setHudStatus("🌾 Step 3/6: Selecting Machinery: Rotavator...");
    const equipSelect = document.getElementById("list-equipment-type");
    await simulateDropdownSelect(equipSelect, "Rotavator", 450);
    if (!isDemoRunning) return;

    setHudStatus("💵 Step 4/6: Setting Hourly Rental Rate: ₹750/hr...");
    const rateInput = document.getElementById("list-rate");
    await simulateHumanTyping(rateInput, "750", 45);
    if (!isDemoRunning) return;

    setHudStatus("📱 Step 5/6: Entering Farmer Contact Mobile Number...");
    const contactInput = document.getElementById("list-contact");
    await simulateHumanTyping(contactInput, "9823456789", 40);
    if (!isDemoRunning) return;

    setHudStatus("➕ Step 6/6: Submitting Equipment Listing to Database...");
    const submitBtn = document.getElementById("btn-submit-listing");
    await moveCursorTo(submitBtn, 550);
    await triggerClickEffect(submitBtn);

    if (submitBtn) {
      submitBtn.click();
    }

    setHudStatus("✅ Equipment 'Rotavator' successfully listed! (Demo Complete)");
    if (typeof showToast === "function") {
      showToast("🚜 Equipment registered into AGRISHARE DATABASE!", "success");
    }

    await sleep(3000);
    stopJudgeLiveDemo();
  }

  // --- 3. FULL WEBSITE GUIDED TOUR (A-TO-Z COMPLETE 15-STOP SHOWCASE) ---
  async function runFullWebsiteTour() {
    // -------------------------------------------------------------
    // STOP 1/15: SSVEHS School Identity & Project Vision (Home Page)
    // -------------------------------------------------------------
    if (typeof navigateTo === "function") navigateTo("home");
    window.scrollTo({ top: 0, behavior: "smooth" });
    await sleep(400);

    setHudStatus("🏫 Stop 1/15: SSVEHS School Identity & Project Presentation (Shree Siddhi Vinayagar English High School)...");
    const schoolChip = document.querySelector(".school-header-chip");
    if (schoolChip) {
      await moveCursorTo(schoolChip, 550);
      await triggerClickEffect(schoolChip);
    }
    if (!isDemoRunning) return;
    await sleep(600);

    setHudStatus("🌱 Stop 1/15: AGRI-SHARE Core Vision — Shared Agritech to Eliminate Farmer Debt...");
    const heroTitle = document.querySelector(".hero-title");
    if (heroTitle) await moveCursorTo(heroTitle, 600);
    if (!isDemoRunning) return;
    await sleep(650);

    const statsBox = document.querySelector(".hero-stats");
    if (statsBox) {
      setHudStatus("📊 Key Metrics: 80% Cost Reduction & ₹96,000 Avg Annual Savings for Small Farmers...");
      await moveCursorTo(statsBox, 550);
      await triggerClickEffect(statsBox);
    }
    if (!isDemoRunning) return;
    await sleep(750);

    // -------------------------------------------------------------
    // STOP 2/15: Dynamic Crop Month Indicator & Value Pillars
    // -------------------------------------------------------------
    setHudStatus("🗓️ Stop 2/15: Dynamic Agricultural Month Bar — Real-Time Seasonal Crop Stage...");
    const monthStrip = document.getElementById("home-month-strip");
    if (monthStrip) {
      await moveCursorTo(monthStrip, 600);
      await triggerClickEffect(monthStrip);
    }
    if (!isDemoRunning) return;
    await sleep(700);

    setHudStatus("⚖️ Stop 2/15: 4 Value Pillars: Equitable Access, Supplementary Income, Timely Sowing & Zero Debt...");
    const pillarsSection = document.querySelector(".value-pillars-grid") || document.querySelector(".pillars-grid");
    if (pillarsSection) {
      await moveCursorTo(pillarsSection, 650);
    }
    if (!isDemoRunning) return;
    await sleep(750);

    // -------------------------------------------------------------
    // STOP 3/15: Multilingual Rural Accessibility (English/Hindi/Marathi)
    // -------------------------------------------------------------
    setHudStatus("🌐 Stop 3/15: Multilingual Inclusion: Language Support for Rural Farmers (HI / MR / EN)...");
    const langSelector = document.getElementById("lang-select");
    if (langSelector) {
      await moveCursorTo(langSelector, 550);
      await triggerClickEffect(langSelector);
      if (typeof changeLanguage === "function") {
        changeLanguage("hi");
        await sleep(900);
        changeLanguage("en"); // Revert smoothly to English
      }
    }
    if (!isDemoRunning) return;
    await sleep(600);

    // -------------------------------------------------------------
    // STOP 4/15: Find Equipment — Live Machinery Search Engine
    // -------------------------------------------------------------
    setHudStatus("🔍 Stop 4/15: Navigating to Find Equipment — Live Village Search Engine...");
    const navFind = document.getElementById("nav-find");
    if (navFind) {
      await moveCursorTo(navFind, 500);
      await triggerClickEffect(navFind);
    }
    if (typeof navigateTo === "function") navigateTo("find");
    if (typeof switchFindMode === "function") switchFindMode("web");
    window.scrollTo({ top: 0, behavior: "smooth" });
    await sleep(400);
    if (!isDemoRunning) return;

    setHudStatus("👤 Filling Hirer Farmer: Suresh Patil (9820556677)...");
    const nameInput = document.getElementById("find-farmer-name");
    if (nameInput) await simulateHumanTyping(nameInput, "Suresh Patil", 30);
    if (!isDemoRunning) return;

    setHudStatus("📍 Selecting Location: Village B & Machine: Tractor (6 hrs)...");
    const villageSelect = document.getElementById("find-village");
    if (villageSelect) await simulateDropdownSelect(villageSelect, "Village B", 400);
    if (!isDemoRunning) return;

    const equipSelect = document.getElementById("find-equipment");
    if (equipSelect) await simulateDropdownSelect(equipSelect, "Tractor", 400);
    if (!isDemoRunning) return;

    const hoursInput = document.getElementById("find-hours");
    if (hoursInput) await simulateHumanTyping(hoursInput, "6", 45);
    if (!isDemoRunning) return;

    setHudStatus("⚡ Executing Search & Recording Live Requirement in Google Sheets Database...");
    const searchBtn = document.getElementById("btn-submit-search");
    if (searchBtn) {
      await moveCursorTo(searchBtn, 500);
      await triggerClickEffect(searchBtn);
      searchBtn.click();
    }
    await sleep(900);
    if (!isDemoRunning) return;

    // -------------------------------------------------------------
    // STOP 5/15: Direct Google Sheet Sync & Embedded Form Verification
    // -------------------------------------------------------------
    setHudStatus("📊 Stop 5/15: Live Google Sheet Destination ('Find Agricultural Equipment Responses')...");
    const findSheetBtn = document.querySelector("#page-find .btn-secondary");
    if (findSheetBtn) await moveCursorTo(findSheetBtn, 550);
    if (!isDemoRunning) return;
    await sleep(650);

    setHudStatus("📋 Switching to Embedded Google Form Alternative View...");
    const tabFindEmbed = document.getElementById("tab-find-embed-form");
    if (tabFindEmbed) {
      await moveCursorTo(tabFindEmbed, 500);
      await triggerClickEffect(tabFindEmbed);
      if (typeof switchFindMode === "function") switchFindMode("embed");
    }
    await sleep(900);
    if (!isDemoRunning) return;

    // Switch back to web form view
    const tabFindWeb = document.getElementById("tab-find-web-form");
    if (tabFindWeb) {
      await moveCursorTo(tabFindWeb, 450);
      await triggerClickEffect(tabFindWeb);
      if (typeof switchFindMode === "function") switchFindMode("web");
    }
    await sleep(450);
    if (!isDemoRunning) return;

    // -------------------------------------------------------------
    // STOP 6/15: Available Equipment Database & Real-Time Filter Pills
    // -------------------------------------------------------------
    setHudStatus("📦 Stop 6/15: Available Equipment Database — Village Cluster Catalog...");
    const navAvailable = document.getElementById("nav-available");
    if (navAvailable) {
      await moveCursorTo(navAvailable, 500);
      await triggerClickEffect(navAvailable);
    }
    if (typeof navigateTo === "function") navigateTo("available");
    window.scrollTo({ top: 0, behavior: "smooth" });
    await sleep(450);
    if (!isDemoRunning) return;

    setHudStatus("🎯 Filtering Machinery Catalog: Testing 'Tractors' filter pill...");
    const tractorFilterBtn = Array.from(document.querySelectorAll(".filter-pill")).find(p => p.innerText.includes("Tractor"));
    if (tractorFilterBtn) {
      await moveCursorTo(tractorFilterBtn, 450);
      await triggerClickEffect(tractorFilterBtn);
      tractorFilterBtn.click();
    }
    await sleep(650);
    if (!isDemoRunning) return;

    setHudStatus("🚜 Testing 'Rotavators' filter pill...");
    const rotavatorFilterBtn = Array.from(document.querySelectorAll(".filter-pill")).find(p => p.innerText.includes("Rotavator"));
    if (rotavatorFilterBtn) {
      await moveCursorTo(rotavatorFilterBtn, 450);
      await triggerClickEffect(rotavatorFilterBtn);
      rotavatorFilterBtn.click();
    }
    await sleep(650);
    if (!isDemoRunning) return;

    // Reset to All
    const allFilterBtn = Array.from(document.querySelectorAll(".filter-pill")).find(p => p.innerText.includes("All"));
    if (allFilterBtn) {
      await moveCursorTo(allFilterBtn, 450);
      allFilterBtn.click();
    }
    await sleep(400);
    if (!isDemoRunning) return;

    // -------------------------------------------------------------
    // STOP 7/15: Interactive Booking Modal & Digital Token Generation
    // -------------------------------------------------------------
    setHudStatus("📝 Stop 7/15: Launching Machine Booking Enquiry Modal on Available Machine...");
    const requestBtn = document.querySelector(".btn-card-request") || document.querySelector(".equipment-card .btn-primary");
    if (requestBtn) {
      await moveCursorTo(requestBtn, 550);
      await triggerClickEffect(requestBtn);
      requestBtn.click();
    }
    await sleep(750);
    if (!isDemoRunning) return;

    const modalHirerName = document.getElementById("enquiry-farmer-name");
    if (modalHirerName) {
      setHudStatus("🎫 Entering Hirer Details: Rohan Patil (9820112233) for 4 Rental Hours...");
      await simulateHumanTyping(modalHirerName, "Rohan Patil", 30);
    }
    if (!isDemoRunning) return;

    const modalSubmitBtn = document.getElementById("btn-submit-enquiry");
    if (modalSubmitBtn) {
      setHudStatus("✅ Submitting Booking: Generating Digital Token AGRI-REQ & Syncing to Google Sheets...");
      await moveCursorTo(modalSubmitBtn, 500);
      await triggerClickEffect(modalSubmitBtn);
      modalSubmitBtn.click();
    }
    await sleep(1000);
    if (!isDemoRunning) return;

    // Close booking modal cleanly
    if (typeof closeEnquiryModal === "function") closeEnquiryModal();
    await sleep(400);

    // -------------------------------------------------------------
    // STOP 8/15: List Equipment — Farmer Machine Monetization
    // -------------------------------------------------------------
    setHudStatus("➕ Stop 8/15: Navigating to List Equipment — Enabling Machine Owners to Earn Regular Income...");
    const navList = document.getElementById("nav-list");
    if (navList) {
      await moveCursorTo(navList, 500);
      await triggerClickEffect(navList);
    }
    if (typeof navigateTo === "function") navigateTo("list");
    if (typeof switchListMode === "function") switchListMode("web");
    window.scrollTo({ top: 0, behavior: "smooth" });
    await sleep(450);
    if (!isDemoRunning) return;

    setHudStatus("🌾 Registering Machinery: Balram Patil, Village A, Rotavator (₹800/hr)...");
    const listOwner = document.getElementById("list-owner-name");
    if (listOwner) await simulateHumanTyping(listOwner, "Balram Patil", 30);
    if (!isDemoRunning) return;

    setHudStatus("📋 Reviewing Google Sheet Destination Guide for Master Database...");
    const guideCard = document.querySelector("#page-list .card:last-child");
    if (guideCard) await moveCursorTo(guideCard, 600);
    await sleep(800);
    if (!isDemoRunning) return;

    // -------------------------------------------------------------
    // STOP 9/15: Financial Cost & Savings Calculator (80% Reduction)
    // -------------------------------------------------------------
    setHudStatus("💰 Stop 9/15: Financial Cost Calculator — Buy vs Rent Capital Lockup Analysis...");
    const navCalc = document.getElementById("nav-calculator");
    if (navCalc) {
      await moveCursorTo(navCalc, 500);
      await triggerClickEffect(navCalc);
    }
    if (typeof navigateTo === "function") navigateTo("calculator");
    window.scrollTo({ top: 0, behavior: "smooth" });
    await sleep(450);
    if (!isDemoRunning) return;

    setHudStatus("📈 Adjusting Annual Hours Slider (35 hrs): Demonstrating Farmer Break-Even Savings...");
    const hoursSlider = document.getElementById("calc-hours");
    if (hoursSlider) {
      await moveCursorTo(hoursSlider, 500);
      hoursSlider.value = "35";
      hoursSlider.dispatchEvent(new Event("input", { bubbles: true }));
    }
    await sleep(650);
    if (!isDemoRunning) return;

    setHudStatus("💵 Proving 80% Cost Reduction & ₹1,02,000 Net Annual Savings vs Buying Machinery...");
    const meterBar = document.getElementById("calc-meter-bar") || document.querySelector(".calc-meter-track");
    if (meterBar) {
      await moveCursorTo(meterBar, 550);
      await triggerClickEffect(meterBar);
    }
    await sleep(950);
    if (!isDemoRunning) return;

    // -------------------------------------------------------------
    // STOP 10/15: Crop Calendar & Seasonal Recommendations
    // -------------------------------------------------------------
    setHudStatus("📅 Stop 10/15: Crop Calendar — Seasonal Sowing & Harvesting Machine Recommendations...");
    const navCalendar = document.getElementById("nav-calendar");
    if (navCalendar) {
      await moveCursorTo(navCalendar, 500);
      await triggerClickEffect(navCalendar);
    }
    if (typeof navigateTo === "function") navigateTo("calendar");
    window.scrollTo({ top: 0, behavior: "smooth" });
    await sleep(450);
    if (!isDemoRunning) return;

    const seasonRow = document.querySelector(".calendar-row.highlight-month") || document.querySelector(".calendar-row");
    if (seasonRow) {
      setHudStatus("🌾 Season Matrix: Coordinated machinery scheduling to avoid harvest delays...");
      await moveCursorTo(seasonRow, 600);
    }
    await sleep(900);
    if (!isDemoRunning) return;

    // -------------------------------------------------------------
    // STOP 11/15: Equipment Owner Control Portal
    // -------------------------------------------------------------
    setHudStatus("🚜 Stop 11/15: Opening Equipment Owner Control Portal Dashboard...");
    const ownerPill = document.getElementById("btn-header-owner-login");
    if (ownerPill) {
      await moveCursorTo(ownerPill, 500);
      await triggerClickEffect(ownerPill);
    }
    if (typeof openOwnerDashboardModal === "function") openOwnerDashboardModal();
    await sleep(950);
    if (!isDemoRunning) return;

    setHudStatus("🌾 Managing Machinery, Availability Status (Available / In Field), & Rental Earnings...");
    await sleep(800);
    if (typeof closeOwnerDashboardModal === "function") closeOwnerDashboardModal();
    await sleep(350);

    // -------------------------------------------------------------
    // STOP 12/15: Farmer / Hirer Request Tracking Portal
    // -------------------------------------------------------------
    setHudStatus("👨‍🌾 Stop 12/15: Opening Farmer / Hirer Request Tracking Portal Dashboard...");
    const farmerPill = document.getElementById("btn-header-farmer-login");
    if (farmerPill) {
      await moveCursorTo(farmerPill, 500);
      await triggerClickEffect(farmerPill);
    }
    if (typeof openFarmerHirerDashboardModal === "function") openFarmerHirerDashboardModal();
    await sleep(900);
    if (!isDemoRunning) return;

    setHudStatus("🎫 Tracking Active Booking Requests, Token IDs & Equipment Handover Status...");
    await sleep(800);
    if (typeof closeFarmerHirerDashboardModal === "function") closeFarmerHirerDashboardModal();
    await sleep(350);

    // -------------------------------------------------------------
    // STOP 13/15: Google Cloud & Central Spreadsheet Architecture
    // -------------------------------------------------------------
    setHudStatus("⚙️ Stop 13/15: Opening Google Cloud Integration & Central Sheet Settings Console...");
    const configBtn = document.querySelector(".config-trigger-btn");
    if (configBtn) {
      await moveCursorTo(configBtn, 500);
      await triggerClickEffect(configBtn);
    }
    if (typeof openConfigModal === "function") openConfigModal();
    await sleep(950);
    if (!isDemoRunning) return;

    setHudStatus("☁️ Zero Server Cost Architecture: Master Sheet, Find Sheet & Forms linked to Google Cloud...");
    await sleep(850);
    if (typeof closeConfigModal === "function") closeConfigModal();
    await sleep(350);
    if (!isDemoRunning) return;

    // -------------------------------------------------------------
    // STOP 14/15: About AGRI-SHARE, Methodology & Viksit Bharat 2047
    // -------------------------------------------------------------
    setHudStatus("🔬 Stop 14/15: Navigating to About AGRI-SHARE — Methodology, Problem Statement & School Showcase...");
    const navAbout = document.getElementById("nav-about");
    if (navAbout) {
      await moveCursorTo(navAbout, 500);
      await triggerClickEffect(navAbout);
    }
    if (typeof navigateTo === "function") navigateTo("about");
    window.scrollTo({ top: 0, behavior: "smooth" });
    await sleep(450);
    if (!isDemoRunning) return;

    const visionCard = document.querySelector("#page-about .card:first-child");
    if (visionCard) {
      setHudStatus("🇮🇳 Viksit Bharat 2047: Transforming Smallholder Farming through Digital Public Infrastructure...");
      await moveCursorTo(visionCard, 600);
    }
    await sleep(1100);
    if (!isDemoRunning) return;

    // -------------------------------------------------------------
    // STOP 15/15: Grand Finale — Return to Home with Celebration
    // -------------------------------------------------------------
    setHudStatus("🎉 Stop 15/15: A-to-Z Complete Tour Finished! Returning to Home — Ready for Judges & Visitors! 🌱");
    if (typeof navigateTo === "function") navigateTo("home");
    window.scrollTo({ top: 0, behavior: "smooth" });
    await sleep(400);

    if (typeof showToast === "function") {
      showToast("🌟 Full A-to-Z Interactive Tour Complete! SSVEHS Science Exhibition 2026.", "success");
    }

    await sleep(2200);
    stopJudgeLiveDemo();
  }

  // --- PUBLIC API ---
  window.startJudgeLiveDemo = function (type = "find") {
    if (isDemoRunning) {
      stopJudgeLiveDemo();
      return;
    }

    isDemoRunning = true;
    skipStepRequested = false;
    const { layer, cursor } = getDemoElements();

    if (layer) layer.classList.add("active");
    if (cursor) {
      cursor.style.transition = "none";
      cursor.style.transform = `translate3d(${window.innerWidth / 2}px, 120px, 0)`;
      void cursor.offsetWidth; // Reflow
    }

    setHudStatus(`🎬 Initializing Live Judge Demo for ${type === 'find' ? 'Find Equipment' : 'List Equipment'}...`);

    if (type === "find") {
      runFindEquipmentDemo();
    } else {
      runListEquipmentDemo();
    }
  };

  window.startFullWebsiteTour = function () {
    if (isDemoRunning) {
      stopJudgeLiveDemo();
      return;
    }

    isDemoRunning = true;
    skipStepRequested = false;
    const { layer, cursor } = getDemoElements();

    if (layer) layer.classList.add("active");
    if (cursor) {
      cursor.style.transition = "none";
      cursor.style.transform = `translate3d(${window.innerWidth / 2}px, 120px, 0)`;
      void cursor.offsetWidth; // Reflow
    }

    setHudStatus("🚀 Starting Full A-to-Z Website Tour (15 Stops Complete Showcase)...");
    runFullWebsiteTour();
  };

  window.skipTourStep = function () {
    if (!isDemoRunning) return;
    skipStepRequested = true;
    setTimeout(() => {
      skipStepRequested = false;
    }, 350);
  };

  window.stopJudgeLiveDemo = function () {
    isDemoRunning = false;
    skipStepRequested = false;
    const { layer } = getDemoElements();
    if (layer) layer.classList.remove("active");

    // Close any lingering modals
    if (typeof closeEnquiryModal === "function") closeEnquiryModal();
    if (typeof closeOwnerDashboardModal === "function") closeOwnerDashboardModal();
    if (typeof closeFarmerHirerDashboardModal === "function") closeFarmerHirerDashboardModal();
    if (typeof closeConfigModal === "function") closeConfigModal();

    // Clear any target highlights
    document.querySelectorAll(".demo-target-highlight").forEach((el) => {
      el.classList.remove("demo-target-highlight");
    });
  };

})();
