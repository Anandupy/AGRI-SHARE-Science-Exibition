/**
 * =========================================================================
 * 🎬 AGRI-SHARE — EXHIBITION JUDGE LIVE DEMONSTRATION ENGINE
 * Automated 1-Click Interactive Tour for Science Exhibition Demonstrations
 * Features: Virtual cursor glide, human typing cadence, element ripples & HUD
 * =========================================================================
 */

(function () {
  "use strict";

  let isDemoRunning = false;
  let demoAbortController = null;

  // Utility sleep with cancellation check
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
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

  async function simulateHumanTyping(inputElement, text, charSpeed = 40) {
    if (!isDemoRunning || !inputElement) return;

    await moveCursorTo(inputElement, 550);
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
      await sleep(charSpeed + Math.random() * 20); // Natural cadence
    }

    inputElement.dispatchEvent(new Event("change", { bubbles: true }));
    inputElement.classList.remove("demo-target-highlight");
    await sleep(200);
  }

  async function simulateDropdownSelect(selectElement, targetValue, durationMs = 500) {
    if (!isDemoRunning || !selectElement) return;

    await moveCursorTo(selectElement, durationMs);
    await triggerClickEffect(selectElement);

    selectElement.focus();
    selectElement.classList.add("demo-target-highlight");
    await sleep(200);

    selectElement.value = targetValue;
    selectElement.dispatchEvent(new Event("change", { bubbles: true }));

    await sleep(250);
    selectElement.classList.remove("demo-target-highlight");
  }

  // --- 1. FIND EQUIPMENT DEMO ---
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
    await simulateDropdownSelect(villageSelect, "Village B", 550);
    if (!isDemoRunning) return;

    setHudStatus("🚜 Step 4/7: Choosing Machinery: Tractor...");
    const equipSelect = document.getElementById("find-equipment");
    await simulateDropdownSelect(equipSelect, "Tractor", 500);
    if (!isDemoRunning) return;

    setHudStatus("📅 Step 5/7: Setting Required Date...");
    const dateInput = document.getElementById("find-date");
    await moveCursorTo(dateInput, 500);
    await triggerClickEffect(dateInput);
    if (dateInput) {
      dateInput.value = "2026-10-18";
      dateInput.dispatchEvent(new Event("change", { bubbles: true }));
    }
    await sleep(250);
    if (!isDemoRunning) return;

    setHudStatus("⏱️ Step 6/7: Entering Rental Duration (6 Hours)...");
    const hoursInput = document.getElementById("find-hours");
    await simulateHumanTyping(hoursInput, "6", 60);
    if (!isDemoRunning) return;

    setHudStatus("🔍 Step 7/7: Searching & Recording Live in Google Sheet...");
    const searchBtn = document.getElementById("btn-submit-search");
    await moveCursorTo(searchBtn, 650);
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

    await sleep(3500);
    stopJudgeLiveDemo();
  }

  // --- 2. LIST EQUIPMENT DEMO ---
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
    await simulateDropdownSelect(villageSelect, "Village A", 500);
    if (!isDemoRunning) return;

    setHudStatus("🌾 Step 3/6: Selecting Machinery: Rotavator...");
    const equipSelect = document.getElementById("list-equipment-type");
    await simulateDropdownSelect(equipSelect, "Rotavator", 500);
    if (!isDemoRunning) return;

    setHudStatus("💵 Step 4/6: Setting Hourly Rental Rate: ₹750/hr...");
    const rateInput = document.getElementById("list-rate");
    await simulateHumanTyping(rateInput, "750", 50);
    if (!isDemoRunning) return;

    setHudStatus("📱 Step 5/6: Entering Farmer Contact Mobile Number...");
    const contactInput = document.getElementById("list-contact");
    await simulateHumanTyping(contactInput, "9823456789", 40);
    if (!isDemoRunning) return;

    setHudStatus("➕ Step 6/6: Submitting Equipment Listing to Database...");
    const submitBtn = document.getElementById("btn-submit-listing");
    await moveCursorTo(submitBtn, 650);
    await triggerClickEffect(submitBtn);

    if (submitBtn) {
      submitBtn.click();
    }

    setHudStatus("✅ Equipment 'Rotavator' successfully listed! (Demo Complete)");
    if (typeof showToast === "function") {
      showToast("🚜 Equipment registered into AGRISHARE DATABASE!", "success");
    }

    await sleep(3500);
    stopJudgeLiveDemo();
  }

  // --- 3. FULL WEBSITE GUIDED TOUR ---
  async function runFullWebsiteTour() {
    // Stop 1: Home Page & Project Vision
    if (typeof navigateTo === "function") navigateTo("home");
    window.scrollTo({ top: 0, behavior: "smooth" });
    await sleep(400);

    setHudStatus("🌟 Stop 1/6: Welcome to AGRI-SHARE — Smart Agricultural Equipment Sharing (SSVEHS)...");
    const heroTitle = document.querySelector(".hero-title");
    if (heroTitle) await moveCursorTo(heroTitle, 700);
    if (!isDemoRunning) return;
    await sleep(900);

    const statsBox = document.querySelector(".hero-stats");
    if (statsBox) {
      setHudStatus("📊 Highlighting Core Metric: 80% Cost Reduction & ₹96,000 Avg Savings for Farmers...");
      await moveCursorTo(statsBox, 600);
      await triggerClickEffect(statsBox);
    }
    if (!isDemoRunning) return;
    await sleep(1000);

    // Stop 2: Find Equipment Search
    setHudStatus("🔍 Stop 2/6: Navigating to Find Equipment — Live Machinery Search Engine...");
    const navFind = document.getElementById("nav-find") || document.getElementById("btn-hero-find");
    if (navFind) {
      await moveCursorTo(navFind, 600);
      await triggerClickEffect(navFind);
    }
    if (typeof navigateTo === "function") navigateTo("find");
    if (typeof switchFindMode === "function") switchFindMode("web");
    window.scrollTo({ top: 0, behavior: "smooth" });
    await sleep(500);
    if (!isDemoRunning) return;

    setHudStatus("🚜 Selecting Machinery Requirement: Tractor in Village B (6 hours)...");
    const villageSelect = document.getElementById("find-village");
    if (villageSelect) await simulateDropdownSelect(villageSelect, "Village B", 450);
    if (!isDemoRunning) return;

    const equipSelect = document.getElementById("find-equipment");
    if (equipSelect) await simulateDropdownSelect(equipSelect, "Tractor", 450);
    if (!isDemoRunning) return;

    const hoursInput = document.getElementById("find-hours");
    if (hoursInput) await simulateHumanTyping(hoursInput, "6", 50);
    if (!isDemoRunning) return;

    setHudStatus("⚡ Executing Search & Live Google Sheet Recording...");
    const searchBtn = document.getElementById("btn-submit-search");
    if (searchBtn) {
      await moveCursorTo(searchBtn, 550);
      await triggerClickEffect(searchBtn);
      searchBtn.click();
    }
    await sleep(1200);
    if (!isDemoRunning) return;

    // Stop 3: Available Machinery Catalog
    setHudStatus("📦 Stop 3/6: Navigating to Available Equipment Database — Village Cluster Catalog...");
    const navAvailable = document.getElementById("nav-available");
    if (navAvailable) {
      await moveCursorTo(navAvailable, 600);
      await triggerClickEffect(navAvailable);
    }
    if (typeof navigateTo === "function") navigateTo("available");
    window.scrollTo({ top: 0, behavior: "smooth" });
    await sleep(600);
    if (!isDemoRunning) return;

    const firstCard = document.querySelector(".equipment-card");
    if (firstCard) {
      setHudStatus("🟢 Verifying Live Availability & Hourly Rates from Google Sheets...");
      await moveCursorTo(firstCard, 700);
      await triggerClickEffect(firstCard);
    }
    await sleep(1000);
    if (!isDemoRunning) return;

    // Stop 4: List Your Equipment
    setHudStatus("➕ Stop 4/6: Navigating to List Equipment — Enabling Farmers to Monetize Idle Machinery...");
    const navList = document.getElementById("nav-list");
    if (navList) {
      await moveCursorTo(navList, 600);
      await triggerClickEffect(navList);
    }
    if (typeof navigateTo === "function") navigateTo("list");
    if (typeof switchListMode === "function") switchListMode("web");
    window.scrollTo({ top: 0, behavior: "smooth" });
    await sleep(600);
    if (!isDemoRunning) return;

    const listForm = document.getElementById("list-equipment-form");
    if (listForm) {
      setHudStatus("📋 Owner Registration Form linked directly to Google Sheets master database...");
      await moveCursorTo(listForm, 600);
    }
    await sleep(1000);
    if (!isDemoRunning) return;

    // Stop 5: Cost & Savings Calculator
    setHudStatus("💰 Stop 5/6: Navigating to Cost Calculator — Buy vs Rent Capital Lockup Analysis...");
    const navCalc = document.getElementById("nav-calculator");
    if (navCalc) {
      await moveCursorTo(navCalc, 600);
      await triggerClickEffect(navCalc);
    }
    if (typeof navigateTo === "function") navigateTo("calculator");
    window.scrollTo({ top: 0, behavior: "smooth" });
    await sleep(600);
    if (!isDemoRunning) return;

    const calcMeter = document.getElementById("calc-meter-bar") || document.querySelector(".calc-meter-track");
    if (calcMeter) {
      setHudStatus("📈 Proving 80% Cost Reduction & Demonstrating Farmer Financial Feasibility...");
      await moveCursorTo(calcMeter, 700);
      await triggerClickEffect(calcMeter);
    }
    await sleep(1100);
    if (!isDemoRunning) return;

    // Stop 6: Crop Calendar
    setHudStatus("📅 Stop 6/6: Navigating to Crop Calendar — Seasonal Sowing & Harvesting Timetable...");
    const navCalendar = document.getElementById("nav-calendar");
    if (navCalendar) {
      await moveCursorTo(navCalendar, 600);
      await triggerClickEffect(navCalendar);
    }
    if (typeof navigateTo === "function") navigateTo("calendar");
    window.scrollTo({ top: 0, behavior: "smooth" });
    await sleep(700);
    if (!isDemoRunning) return;

    const currentSeasonRow = document.querySelector(".calendar-row.highlight-month") || document.querySelector(".calendar-row");
    if (currentSeasonRow) {
      setHudStatus("🌾 Season Matrix: Matching machine recommendations for Kharif and Rabi cycles...");
      await moveCursorTo(currentSeasonRow, 650);
    }
    await sleep(1200);
    if (!isDemoRunning) return;

    // Tour Finish: Return to Home
    setHudStatus("🎉 Guided Tour Complete! Returning to Home — Ready for Judges & Visitors! 🌱");
    if (typeof navigateTo === "function") navigateTo("home");
    window.scrollTo({ top: 0, behavior: "smooth" });
    await sleep(500);

    if (typeof showToast === "function") {
      showToast("🌟 Full Website Guided Tour Complete! SSVEHS Science Exhibition 2026.", "success");
    }

    await sleep(2500);
    stopJudgeLiveDemo();
  }

  // --- PUBLIC API ---
  window.startJudgeLiveDemo = function (type = "find") {
    if (isDemoRunning) {
      stopJudgeLiveDemo();
      return;
    }

    isDemoRunning = true;
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
    const { layer, cursor } = getDemoElements();

    if (layer) layer.classList.add("active");
    if (cursor) {
      cursor.style.transition = "none";
      cursor.style.transform = `translate3d(${window.innerWidth / 2}px, 120px, 0)`;
      void cursor.offsetWidth; // Reflow
    }

    setHudStatus("🚀 Starting Full Website Guided Tour for Judges (SSVEHS Science Exhibition)...");
    runFullWebsiteTour();
  };

  window.stopJudgeLiveDemo = function () {
    isDemoRunning = false;
    const { layer } = getDemoElements();
    if (layer) layer.classList.remove("active");

    // Clear any target highlights
    document.querySelectorAll(".demo-target-highlight").forEach((el) => {
      el.classList.remove("demo-target-highlight");
    });
  };

})();
