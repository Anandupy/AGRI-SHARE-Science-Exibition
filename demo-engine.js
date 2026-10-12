/**
 * =========================================================================
 * 🎬 AGRI-SHARE — EXHIBITION JUDGE LIVE DEMONSTRATION ENGINE
 * Complete A-to-Z Automated 1-Click Interactive Tour for Science Exhibition
 * Features: Slower human typing, visible slider gliding, HUD step details
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
      hudText: document.getElementById("demo-hud-step-text"),
      hudSubtext: document.getElementById("demo-hud-subtext")
    };
  }

  function setHudStatus(title, subtitle = "") {
    const { hudText, hudSubtext } = getDemoElements();
    let mainTitle = title;
    let subText = subtitle;

    // Auto-split on separator if subtitle was omitted
    if (!subText && title.includes(" — ")) {
      const parts = title.split(" — ");
      mainTitle = parts[0].trim();
      subText = parts.slice(1).join(" — ").trim();
    }

    if (hudText) {
      hudText.innerText = mainTitle;
    }

    if (hudSubtext) {
      if (subText) {
        hudSubtext.innerText = subText;
        hudSubtext.style.display = "block";
      } else {
        hudSubtext.style.display = "none";
      }
    }
  }

  async function moveCursorTo(element, durationMs = 850) {
    if (!isDemoRunning || !element) return;
    const { cursor } = getDemoElements();
    if (!cursor) return;

    // Scroll element into view smoothly if not visible in viewport
    const rect = element.getBoundingClientRect();
    const isOutOfView = rect.top < 90 || rect.bottom > (window.innerHeight - 80);
    if (isOutOfView) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
      await sleep(450);
    }

    // Fresh coordinates after scroll
    const freshRect = element.getBoundingClientRect();
    const targetX = Math.round(freshRect.left + freshRect.width / 2);
    const targetY = Math.round(freshRect.top + freshRect.height / 2);

    cursor.style.transition = `transform ${durationMs}ms cubic-bezier(0.22, 1, 0.36, 1)`;
    cursor.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;

    await sleep(durationMs + 60);
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
      element.style.transition = "transform 0.14s ease";
      element.style.transform = "scale(0.96)";
      await sleep(150);
      element.style.transform = "";
      setTimeout(() => element.classList.remove("demo-target-highlight"), 500);
    }
  }

  // Slower, visible human typing cadence
  async function simulateHumanTyping(inputElement, text, charSpeed = 80) {
    if (!isDemoRunning || !inputElement) return;

    await moveCursorTo(inputElement, 850);
    await triggerClickEffect(inputElement);

    inputElement.focus();
    inputElement.classList.add("demo-target-highlight");
    inputElement.value = "";
    await sleep(250);

    for (let i = 0; i < text.length; i++) {
      if (!isDemoRunning) {
        inputElement.classList.remove("demo-target-highlight");
        return;
      }
      inputElement.value += text[i];
      inputElement.dispatchEvent(new Event("input", { bubbles: true }));

      // Deliberate pause on spaces or symbols for natural typing cadence
      const pauseExtra = (text[i] === " " || text[i] === ",") ? 130 : 0;
      await sleep(charSpeed + Math.random() * 25 + pauseExtra);
    }

    inputElement.dispatchEvent(new Event("change", { bubbles: true }));
    await sleep(400); // Hold so judges can read what was typed
    inputElement.classList.remove("demo-target-highlight");
    await sleep(350);
  }

  // Slower, deliberate dropdown selection
  async function simulateDropdownSelect(selectElement, targetValue, durationMs = 850) {
    if (!isDemoRunning || !selectElement) return;

    await moveCursorTo(selectElement, durationMs);
    await triggerClickEffect(selectElement);

    selectElement.focus();
    selectElement.classList.add("demo-target-highlight");
    await sleep(450); // Pause to inspect options

    selectElement.value = targetValue;
    selectElement.dispatchEvent(new Event("change", { bubbles: true }));

    await sleep(650); // Pause so judge sees chosen selection
    selectElement.classList.remove("demo-target-highlight");
    await sleep(250);
  }

  // Smooth, visible slider slide animation with real-time recalculation
  async function simulateSliderSlide(sliderElement, fromVal, toVal, step = 5, stepDelayMs = 260) {
    if (!isDemoRunning || !sliderElement) return;

    await moveCursorTo(sliderElement, 850);
    await triggerClickEffect(sliderElement);
    sliderElement.classList.add("demo-target-highlight");
    await sleep(350);

    const { cursor } = getDemoElements();
    const rect = sliderElement.getBoundingClientRect();
    const min = parseFloat(sliderElement.min) || 0;
    const max = parseFloat(sliderElement.max) || 100;

    const startVal = fromVal !== undefined ? fromVal : parseFloat(sliderElement.value) || min;
    const isIncreasing = toVal >= startVal;
    const actualStep = isIncreasing ? Math.abs(step) : -Math.abs(step);

    let current = startVal;
    while ((isIncreasing && current <= toVal) || (!isIncreasing && current >= toVal)) {
      if (!isDemoRunning) {
        sliderElement.classList.remove("demo-target-highlight");
        return;
      }

      sliderElement.value = String(current);
      sliderElement.dispatchEvent(new Event("input", { bubbles: true }));
      sliderElement.dispatchEvent(new Event("change", { bubbles: true }));

      // Sync companion number input
      const companionInput = document.getElementById("calc-annual-hours");
      if (companionInput && companionInput !== sliderElement) {
        companionInput.value = String(current);
        companionInput.dispatchEvent(new Event("input", { bubbles: true }));
      }

      if (typeof calculateEconomics === "function") {
        calculateEconomics();
      }

      // Visibly glide virtual cursor along horizontal slider track!
      if (cursor && rect.width > 0) {
        const ratio = Math.max(0, Math.min(1, (current - min) / (max - min)));
        const thumbX = Math.round(rect.left + ratio * rect.width);
        const thumbY = Math.round(rect.top + rect.height / 2);
        cursor.style.transition = `transform ${stepDelayMs * 0.9}ms linear`;
        cursor.style.transform = `translate3d(${thumbX}px, ${thumbY}px, 0)`;
      }

      await sleep(stepDelayMs);

      if (current === toVal) break;
      current += actualStep;
      if (isIncreasing && current > toVal) current = toVal;
      if (!isIncreasing && current < toVal) current = toVal;
    }

    await sleep(950); // Pause on final breakeven value so judges examine numbers
    sliderElement.classList.remove("demo-target-highlight");
    await sleep(300);
  }

  // =========================================================================
  // 1. SINGLE-ACTION FIND EQUIPMENT DEMO (IN-DEPTH 7 STEPS)
  // =========================================================================
  async function runFindEquipmentDemo() {
    if (typeof navigateTo === "function") navigateTo("find");
    if (typeof switchFindMode === "function") switchFindMode("web");
    window.scrollTo({ top: 0, behavior: "smooth" });
    await sleep(500);

    setHudStatus(
      "👤 Step 1/7: Smallholder Farmer Suresh (Hirer)",
      "Entering Farmer Name — Shared platform eliminates ₹7.5 Lakh machinery capital debt"
    );
    const nameInput = document.getElementById("find-farmer-name");
    if (nameInput) await simulateHumanTyping(nameInput, "Farmer Suresh Patil", 80);
    if (!isDemoRunning) return;
    await sleep(800);

    setHudStatus(
      "📱 Step 2/7: Hirer Mobile Contact Verification",
      "Entering +91-9820556677 — Automated SMS dispatch with zero middleman commission"
    );
    const contactInput = document.getElementById("find-contact");
    if (contactInput) await simulateHumanTyping(contactInput, "9820556677", 85);
    if (!isDemoRunning) return;
    await sleep(800);

    setHudStatus(
      "📍 Step 3/7: Geospatial Village Cluster Matching",
      "Selecting 'Village B' (2 km radius) — Minimizes tractor diesel transit between farm plots"
    );
    const villageSelect = document.getElementById("find-village");
    await simulateDropdownSelect(villageSelect, "Village B", 850);
    if (!isDemoRunning) return;
    await sleep(900);

    setHudStatus(
      "🚜 Step 4/7: Sowing Machinery Selection",
      "Choosing 'Tractor (45 HP)' — Primary power unit for soil tillage and harrowing"
    );
    const equipSelect = document.getElementById("find-equipment");
    await simulateDropdownSelect(equipSelect, "Tractor", 850);
    if (!isDemoRunning) return;
    await sleep(900);

    setHudStatus(
      "📅 Step 5/7: Critical Seasonal Sowing Date",
      "Scheduling 2026-10-18 — Synchronized with optimal soil moisture & monsoon forecast"
    );
    const dateInput = document.getElementById("find-date");
    await moveCursorTo(dateInput, 800);
    await triggerClickEffect(dateInput);
    if (dateInput) {
      dateInput.value = "2026-10-18";
      dateInput.dispatchEvent(new Event("change", { bubbles: true }));
    }
    await sleep(900);
    if (!isDemoRunning) return;

    setHudStatus(
      "⏱️ Step 6/7: Operational Hours Requirement",
      "Entering 6 Rental Hours — Pay-per-hour model saves 80% vs machinery purchase"
    );
    const hoursInput = document.getElementById("find-hours");
    await simulateHumanTyping(hoursInput, "6", 90);
    if (!isDemoRunning) return;
    await sleep(900);

    setHudStatus(
      "🔍 Step 7/7: Live Cloud Sync & Equipment Matching",
      "Submitting requirement — Live dual-sync into Google Sheets 'Find Responses' database!"
    );
    const searchBtn = document.getElementById("btn-submit-search");
    await moveCursorTo(searchBtn, 850);
    await triggerClickEffect(searchBtn);

    if (searchBtn) {
      searchBtn.click();
    }

    await sleep(700);
    const resultsSec = document.getElementById("search-results-section");
    if (resultsSec) {
      resultsSec.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    setHudStatus(
      "🎉 Success: Matched 2 Verified Tractors in Village B!",
      "Live geo-cluster algorithm ranked nearest tractors with instant pricing (Demo Complete)"
    );
    if (typeof showToast === "function") {
      showToast("⭐ Exhibition Demo: Matched 2 Tractors available nearby!", "success");
    }

    await sleep(3500);
    stopJudgeLiveDemo();
  }

  // =========================================================================
  // 2. SINGLE-ACTION LIST EQUIPMENT DEMO (IN-DEPTH 7 STEPS)
  // =========================================================================
  async function runListEquipmentDemo() {
    if (typeof navigateTo === "function") navigateTo("list");
    if (typeof switchListMode === "function") switchListMode("web");
    window.scrollTo({ top: 0, behavior: "smooth" });
    await sleep(500);

    setHudStatus(
      "👤 Step 1/7: Machine Owner Profile Registration",
      "Registering Farmer Ramdas Patil — Monetizing idle machinery to repay bank loan EMI"
    );
    const nameInput = document.getElementById("list-owner-name");
    await simulateHumanTyping(nameInput, "Farmer Ramdas Patil", 80);
    if (!isDemoRunning) return;
    await sleep(800);

    setHudStatus(
      "📍 Step 2/7: Base Hub Village Location",
      "Selecting 'Village A' — Base hub for automated distance calculation to nearby farms"
    );
    const villageSelect = document.getElementById("list-village");
    await simulateDropdownSelect(villageSelect, "Village A", 850);
    if (!isDemoRunning) return;
    await sleep(900);

    setHudStatus(
      "🌾 Step 3/7: Implement Specification",
      "Selecting 'Rotavator' — Secondary tillage implement for fine seedbed pulverization"
    );
    const equipSelect = document.getElementById("list-equipment-type");
    await simulateDropdownSelect(equipSelect, "Rotavator", 850);
    if (!isDemoRunning) return;
    await sleep(900);

    setHudStatus(
      "💵 Step 4/7: Fair Rental Tariff Sizing",
      "Setting ₹750/hour — 80% cheaper for hirers while owner earns ₹45,000 supplementary income"
    );
    const rateInput = document.getElementById("list-rate");
    await simulateHumanTyping(rateInput, "750", 90);
    if (!isDemoRunning) return;
    await sleep(900);

    setHudStatus(
      "📅 Step 5/7: Seasonal Availability Window",
      "Setting available date (2026-10-20) for optimal Rabi wheat sowing season"
    );
    const dateInput = document.getElementById("list-available-date");
    if (dateInput) {
      await moveCursorTo(dateInput, 800);
      await triggerClickEffect(dateInput);
      dateInput.value = "2026-10-20";
      dateInput.dispatchEvent(new Event("change", { bubbles: true }));
    }
    await sleep(800);
    if (!isDemoRunning) return;

    setHudStatus(
      "📱 Step 6/7: Owner Mobile Verification",
      "Entering +91-9823456789 — Securely recorded in Master Sheet; never shared publicly"
    );
    const contactInput = document.getElementById("list-contact");
    await simulateHumanTyping(contactInput, "9823456789", 85);
    if (!isDemoRunning) return;
    await sleep(900);

    setHudStatus(
      "➕ Step 7/7: Cloud Database Registration",
      "Submitting listing — Adding live equipment record to Google Sheets AGRISHARE Master DB"
    );
    const submitBtn = document.getElementById("btn-submit-listing");
    await moveCursorTo(submitBtn, 850);
    await triggerClickEffect(submitBtn);

    if (submitBtn) {
      submitBtn.click();
    }

    setHudStatus(
      "✅ Success: Rotavator Registered in Central Catalog!",
      "Asset is now visible to all cluster farmers for digital booking (Demo Complete)"
    );
    if (typeof showToast === "function") {
      showToast("🚜 Equipment registered into AGRISHARE DATABASE!", "success");
    }

    await sleep(3500);
    stopJudgeLiveDemo();
  }

  // =========================================================================
  // 3. FULL WEBSITE GUIDED TOUR (A-TO-Z COMPLETE 16-STOP SHOWCASE)
  // =========================================================================
  async function runFullWebsiteTour() {
    // -------------------------------------------------------------
    // STOP 1/16: Project Presentation & Core Vision (Home Page)
    // -------------------------------------------------------------
    if (typeof navigateTo === "function") navigateTo("home");
    window.scrollTo({ top: 0, behavior: "smooth" });
    await sleep(600);

    setHudStatus(
      "🌱 Stop 1/16: AGRI-SHARE Core Innovation & Vision",
      "Eliminating agricultural debt: Shared digital machinery model cuts farming costs by 80%"
    );
    const heroTitle = document.querySelector(".hero-title");
    if (heroTitle) await moveCursorTo(heroTitle, 900);
    if (!isDemoRunning) return;
    await sleep(1400);

    const statsBox = document.querySelector(".hero-stats");
    if (statsBox) {
      setHudStatus(
        "📊 Proven Economics: 80% Cost Reduction & ₹96,000 Annual Savings",
        "Economic model empowers 86% small & marginal farmers with modern mechanization"
      );
      await moveCursorTo(statsBox, 850);
      await triggerClickEffect(statsBox);
    }
    if (!isDemoRunning) return;
    await sleep(1500);

    // -------------------------------------------------------------
    // STOP 2/16: Dynamic Crop Month Indicator & Value Pillars
    // -------------------------------------------------------------
    setHudStatus(
      "🗓️ Stop 2/16: Dynamic Agricultural Month Bar",
      "Real-time seasonal stage bar tracks ongoing Kharif harvest & Rabi wheat sowing transitions"
    );
    const monthStrip = document.getElementById("home-month-strip");
    if (monthStrip) {
      await moveCursorTo(monthStrip, 850);
      await triggerClickEffect(monthStrip);
    }
    if (!isDemoRunning) return;
    await sleep(1400);

    setHudStatus(
      "⚖️ Core Pillars: Equitable Access, Extra Income & Zero Debt",
      "4 pillars convert idle machinery from a liability into a shared community asset"
    );
    const pillarsSection = document.querySelector(".value-pillars-grid") || document.querySelector(".pillars-grid");
    if (pillarsSection) {
      await moveCursorTo(pillarsSection, 850);
    }
    if (!isDemoRunning) return;
    await sleep(1500);

    // -------------------------------------------------------------
    // STOP 3/16: Multilingual Rural Accessibility (English/Hindi/Marathi)
    // -------------------------------------------------------------
    setHudStatus(
      "🌐 Stop 3/16: Multilingual Inclusion for Grassroots Farmers",
      "Demonstrating live language switching: Hindi (हिंदी) and Marathi (मराठी) vernacular modes"
    );
    const langSelector = document.getElementById("lang-select");
    if (langSelector) {
      await moveCursorTo(langSelector, 850);
      await triggerClickEffect(langSelector);
      if (typeof changeLanguage === "function") {
        changeLanguage("hi");
        setHudStatus("🌐 हिंदी मोड (Hindi Vernacular): संपूर्ण इंटरफेस ग्रामीण किसानों के अनुकूल!");
        await sleep(1800);
        changeLanguage("mr");
        setHudStatus("🌐 मराठी मोड (Marathi Vernacular): स्थानिक शेतकऱ्यांसाठी सुलभ डिजिटल सुविधा!");
        await sleep(1600);
        changeLanguage("en"); // Revert smoothly to English
        setHudStatus("🌐 English Mode Restored: Pure international exhibition presentation.");
      }
    }
    if (!isDemoRunning) return;
    await sleep(1200);

    // -------------------------------------------------------------
    // STOP 4/16: Find Equipment — Live Machinery Search Engine
    // -------------------------------------------------------------
    setHudStatus(
      "🔍 Stop 4/16: Machinery Search & Requirements Dispatch",
      "Navigating to Find Equipment — Live Village Cluster search engine"
    );
    const navFind = document.getElementById("nav-find");
    if (navFind) {
      await moveCursorTo(navFind, 800);
      await triggerClickEffect(navFind);
    }
    if (typeof navigateTo === "function") navigateTo("find");
    if (typeof switchFindMode === "function") switchFindMode("web");
    window.scrollTo({ top: 0, behavior: "smooth" });
    await sleep(550);
    if (!isDemoRunning) return;

    setHudStatus(
      "👤 Filling Hirer Profile: Suresh Patil",
      "Simulating marginal farmer needing timely tractor support"
    );
    const nameInput = document.getElementById("find-farmer-name");
    if (nameInput) await simulateHumanTyping(nameInput, "Suresh Patil", 80);
    if (!isDemoRunning) return;
    await sleep(700);

    setHudStatus(
      "📍 Selecting Geo-Cluster: Village B & Machinery: Tractor (6 hrs)",
      "Automated cluster filtering keeps transit distance within 2 km radius"
    );
    const villageSelect = document.getElementById("find-village");
    if (villageSelect) await simulateDropdownSelect(villageSelect, "Village B", 750);
    if (!isDemoRunning) return;

    const equipSelect = document.getElementById("find-equipment");
    if (equipSelect) await simulateDropdownSelect(equipSelect, "Tractor", 750);
    if (!isDemoRunning) return;

    const hoursInput = document.getElementById("find-hours");
    if (hoursInput) await simulateHumanTyping(hoursInput, "6", 85);
    if (!isDemoRunning) return;
    await sleep(600);

    setHudStatus(
      "⚡ Submitting Requirement to Live Cloud Sheet",
      "Executing query & dual-recording requirement into Google Sheets database"
    );
    const searchBtn = document.getElementById("btn-submit-search");
    if (searchBtn) {
      await moveCursorTo(searchBtn, 850);
      await triggerClickEffect(searchBtn);
      searchBtn.click();
    }
    await sleep(1200);
    if (!isDemoRunning) return;

    // -------------------------------------------------------------
    // STOP 5/16: Direct Google Sheet Sync & Embedded Form Verification
    // -------------------------------------------------------------
    setHudStatus(
      "📊 Stop 5/16: Zero-Server Google Cloud Integration",
      "Direct live destination: 'Find Agricultural Equipment Responses' Google Sheet"
    );
    const findSheetBtn = document.querySelector("#page-find .btn-secondary");
    if (findSheetBtn) await moveCursorTo(findSheetBtn, 850);
    if (!isDemoRunning) return;
    await sleep(1300);

    setHudStatus(
      "📋 Switching to Embedded Google Form Alternative View",
      "Hybrid architecture: web forms sync with Google Forms embed seamlessly"
    );
    const tabFindEmbed = document.getElementById("tab-find-embed-form");
    if (tabFindEmbed) {
      await moveCursorTo(tabFindEmbed, 800);
      await triggerClickEffect(tabFindEmbed);
      if (typeof switchFindMode === "function") switchFindMode("embed");
    }
    await sleep(1400);
    if (!isDemoRunning) return;

    // Switch back to web form view
    const tabFindWeb = document.getElementById("tab-find-web-form");
    if (tabFindWeb) {
      await moveCursorTo(tabFindWeb, 750);
      await triggerClickEffect(tabFindWeb);
      if (typeof switchFindMode === "function") switchFindMode("web");
    }
    await sleep(700);
    if (!isDemoRunning) return;

    // -------------------------------------------------------------
    // STOP 6/16: Available Equipment Database & Real-Time Filter Pills
    // -------------------------------------------------------------
    setHudStatus(
      "📦 Stop 6/16: Village Cluster Equipment Catalog",
      "Navigating to Available Equipment — Live catalog of peer-registered machinery"
    );
    const navAvailable = document.getElementById("nav-available");
    if (navAvailable) {
      await moveCursorTo(navAvailable, 800);
      await triggerClickEffect(navAvailable);
    }
    if (typeof navigateTo === "function") navigateTo("available");
    window.scrollTo({ top: 0, behavior: "smooth" });
    await sleep(600);
    if (!isDemoRunning) return;

    setHudStatus(
      "🎯 Dynamic Filtering: Testing 'Tractors' Category Pill",
      "Filters catalog instantly by machinery type with live hourly tariffs"
    );
    const tractorFilterBtn = Array.from(document.querySelectorAll(".filter-pill")).find(p => p.innerText.includes("Tractor"));
    if (tractorFilterBtn) {
      await moveCursorTo(tractorFilterBtn, 800);
      await triggerClickEffect(tractorFilterBtn);
      tractorFilterBtn.click();
    }
    await sleep(1200);
    if (!isDemoRunning) return;

    setHudStatus(
      "🚜 Dynamic Filtering: Testing 'Rotavators' Category Pill",
      "Displays secondary tillage implements available in neighboring villages"
    );
    const rotavatorFilterBtn = Array.from(document.querySelectorAll(".filter-pill")).find(p => p.innerText.includes("Rotavator"));
    if (rotavatorFilterBtn) {
      await moveCursorTo(rotavatorFilterBtn, 800);
      await triggerClickEffect(rotavatorFilterBtn);
      rotavatorFilterBtn.click();
    }
    await sleep(1200);
    if (!isDemoRunning) return;

    // Reset to All
    const allFilterBtn = Array.from(document.querySelectorAll(".filter-pill")).find(p => p.innerText.includes("All"));
    if (allFilterBtn) {
      await moveCursorTo(allFilterBtn, 750);
      allFilterBtn.click();
    }
    await sleep(700);
    if (!isDemoRunning) return;

    // -------------------------------------------------------------
    // STOP 7/16: Interactive Booking Modal & Digital Token Generation
    // -------------------------------------------------------------
    setHudStatus(
      "📝 Stop 7/16: Instant Machine Booking & Digital Token",
      "Launching booking enquiry modal on available machine card"
    );
    const requestBtn = document.querySelector(".equipment-result-card .btn-primary") ||
      document.querySelector("button[onclick*='openEnquiryModal']") ||
      document.querySelector(".btn-card-request") ||
      document.querySelector(".equipment-card .btn-primary");
    if (requestBtn) {
      await moveCursorTo(requestBtn, 850);
      await triggerClickEffect(requestBtn);
      requestBtn.click();
    } else if (typeof openEnquiryModal === "function") {
      openEnquiryModal("EQ001", 4);
    }
    await sleep(1100);
    if (!isDemoRunning) return;

    const modalHirerName = document.getElementById("enquiry-farmer-name");
    if (modalHirerName) {
      setHudStatus(
        "🎫 Entering Hirer Details: Rohan Patil (4 Rental Hours)",
        "Capturing farmer requirements before generating digital dispatch token"
      );
      await simulateHumanTyping(modalHirerName, "Rohan Patil", 75);
    }
    if (!isDemoRunning) return;

    const modalSubmitBtn = document.getElementById("btn-submit-enquiry");
    if (modalSubmitBtn) {
      setHudStatus(
        "✅ Generating Digital Booking Token AGRI-REQ",
        "Submitting booking: Creates verified tracking token synced to Google Sheets"
      );
      await moveCursorTo(modalSubmitBtn, 800);
      await triggerClickEffect(modalSubmitBtn);
      modalSubmitBtn.click();
    }
    await sleep(1500);
    if (!isDemoRunning) return;

    // Close booking modal cleanly
    if (typeof closeEnquiryModal === "function") closeEnquiryModal();
    await sleep(600);

    // -------------------------------------------------------------
    // STOP 8/16: List Equipment — Farmer Machine Monetization
    // -------------------------------------------------------------
    setHudStatus(
      "➕ Stop 8/16: Machine Owner Monetization Portal",
      "Navigating to List Equipment — Enabling tractor owners to earn recurring income"
    );
    const navList = document.getElementById("nav-list");
    if (navList) {
      await moveCursorTo(navList, 800);
      await triggerClickEffect(navList);
    }
    if (typeof navigateTo === "function") navigateTo("list");
    if (typeof switchListMode === "function") switchListMode("web");
    window.scrollTo({ top: 0, behavior: "smooth" });
    await sleep(600);
    if (!isDemoRunning) return;

    setHudStatus(
      "🌾 Registering Machinery: Balram Patil, Village A (Rotavator ₹800/hr)",
      "Standardized form registers machine specifications & seasonal availability"
    );
    const listOwner = document.getElementById("list-owner-name");
    if (listOwner) await simulateHumanTyping(listOwner, "Balram Patil", 75);
    if (!isDemoRunning) return;

    setHudStatus(
      "📋 Reviewing Central Database Destination Guide",
      "Owner listings sync to master Google Sheets database without IT maintenance"
    );
    const guideCard = document.querySelector("#page-list .card:last-child");
    if (guideCard) await moveCursorTo(guideCard, 850);
    await sleep(1400);
    if (!isDemoRunning) return;

    // -------------------------------------------------------------
    // STOP 9/16: Financial Cost & Savings Calculator (VISIBLY SLIDING!)
    // -------------------------------------------------------------
    setHudStatus(
      "💰 Stop 9/16: Financial Cost Calculator & Buy vs Rent Analysis",
      "Navigating to Calculator — Economic modeling proves debt-free mechanization"
    );
    const navCalc = document.getElementById("nav-calculator");
    if (navCalc) {
      await moveCursorTo(navCalc, 800);
      await triggerClickEffect(navCalc);
    }
    if (typeof navigateTo === "function") navigateTo("calculator");
    window.scrollTo({ top: 0, behavior: "smooth" });
    await sleep(650);
    if (!isDemoRunning) return;

    setHudStatus(
      "📈 LIVE SLIDER GLIDE: Adjusting Usage from 10 to 35 Annual Hours!",
      "Watch real-time calculation: capital breakeven point & ₹1,02,000 net annual savings!"
    );
    const hoursSlider = document.getElementById("slider-annual-hours") ||
      document.getElementById("calc-annual-hours") ||
      document.getElementById("calc-hours");
    if (hoursSlider) {
      // Visibly and smoothly slide from 10 to 35 with steps of 5!
      await simulateSliderSlide(hoursSlider, 10, 35, 5, 260);
    }
    if (!isDemoRunning) return;

    setHudStatus(
      "💵 Proven Economic Milestone: 80% Cost Reduction Achieved!",
      "Owning a ₹7.5L tractor locks up capital; renting 35 hrs costs only ₹28,000/yr"
    );
    const meterBar = document.getElementById("calc-meter-bar") || document.querySelector(".calc-meter-track");
    if (meterBar) {
      await moveCursorTo(meterBar, 850);
      await triggerClickEffect(meterBar);
    }
    await sleep(1600);
    if (!isDemoRunning) return;

    // -------------------------------------------------------------
    // STOP 10/16: Crop Calendar & Seasonal Recommendations
    // -------------------------------------------------------------
    setHudStatus(
      "📅 Stop 10/16: Crop Calendar & Mechanization Scheduling",
      "Synchronizing machinery dispatch with regional weather & sowing windows"
    );
    const navCalendar = document.getElementById("nav-calendar");
    if (navCalendar) {
      await moveCursorTo(navCalendar, 800);
      await triggerClickEffect(navCalendar);
    }
    if (typeof navigateTo === "function") navigateTo("calendar");
    window.scrollTo({ top: 0, behavior: "smooth" });
    await sleep(600);
    if (!isDemoRunning) return;

    const seasonRow = document.querySelector(".calendar-row.highlight-month") || document.querySelector(".calendar-row");
    if (seasonRow) {
      setHudStatus(
        "🌾 Timely Sowing Window Matrix",
        "Coordinating tractor & harvester availability prevents peak-season yield penalties"
      );
      await moveCursorTo(seasonRow, 850);
    }
    await sleep(1500);
    if (!isDemoRunning) return;

    // -------------------------------------------------------------
    // STOP 11/16: Equipment Owner Control Portal
    // -------------------------------------------------------------
    setHudStatus(
      "🚜 Stop 11/16: Equipment Owner Fleet Dashboard",
      "Opening Owner Control Portal — Machine availability & earnings manager"
    );
    const ownerPill = document.getElementById("btn-header-owner-login");
    if (ownerPill) {
      await moveCursorTo(ownerPill, 800);
      await triggerClickEffect(ownerPill);
    }
    if (typeof openOwnerDashboardModal === "function") openOwnerDashboardModal();
    await sleep(1400);
    if (!isDemoRunning) return;

    setHudStatus(
      "🌾 Owner Control: Toggle Status (Available / In Field) & Payouts",
      "Machine owners manage rental calendar, track hours deployed & collect rental income"
    );
    await sleep(1400);
    if (typeof closeOwnerDashboardModal === "function") closeOwnerDashboardModal();
    await sleep(500);

    // -------------------------------------------------------------
    // STOP 12/16: Farmer / Hirer Request Tracking Portal
    // -------------------------------------------------------------
    setHudStatus(
      "👨‍🌾 Stop 12/16: Farmer Hirer Request Tracking Portal",
      "Opening Farmer Request Portal — Real-time booking verification & status"
    );
    const farmerPill = document.getElementById("btn-header-farmer-login");
    if (farmerPill) {
      await moveCursorTo(farmerPill, 800);
      await triggerClickEffect(farmerPill);
    }
    if (typeof openFarmerHirerDashboardModal === "function") openFarmerHirerDashboardModal();
    await sleep(1400);
    if (!isDemoRunning) return;

    setHudStatus(
      "🎫 Verification Tokens & Machinery Handover Security",
      "Digital verification OTPs and token IDs ensure transparent tractor handover in fields"
    );
    await sleep(1400);
    if (typeof closeFarmerHirerDashboardModal === "function") closeFarmerHirerDashboardModal();
    await sleep(500);

    // -------------------------------------------------------------
    // STOP 13/16: Google Cloud & Central Spreadsheet Architecture
    // -------------------------------------------------------------
    setHudStatus(
      "⚙️ Stop 13/16: Cloud Architecture & Spreadsheet Integration",
      "Opening Central Settings Console — Transparent zero-cost cloud infrastructure"
    );
    const configBtn = document.querySelector(".config-trigger-btn");
    if (configBtn) {
      await moveCursorTo(configBtn, 800);
      await triggerClickEffect(configBtn);
    }
    if (typeof openConfigModal === "function") openConfigModal();
    await sleep(1400);
    if (!isDemoRunning) return;

    setHudStatus(
      "☁️ Zero Server Cost Stack: Google Sheets + Apps Script Endpoints",
      "No recurring server rental fees: perfectly designed for village panchayats and FPOs"
    );
    await sleep(1400);
    if (typeof closeConfigModal === "function") closeConfigModal();
    await sleep(500);
    if (!isDemoRunning) return;

    // -------------------------------------------------------------
    // STOP 14/16: Kisan AI — Smart Agritech Advisor & Voice Guide
    // -------------------------------------------------------------
    setHudStatus(
      "🤖 Stop 14/16: Kisan AI — Smart Agritech Sizing & Voice Advisor",
      "Navigating to Kisan AI — Scientific crop-stage machinery recommendation engine"
    );
    const navAi = document.getElementById("nav-ai");
    if (navAi) {
      await moveCursorTo(navAi, 800);
      await triggerClickEffect(navAi);
    }
    if (typeof navigateTo === "function") navigateTo("ai");
    window.scrollTo({ top: 0, behavior: "smooth" });
    await sleep(600);
    if (!isDemoRunning) return;

    setHudStatus(
      "⚡ Scientific Agritech Sizing: Wheat (3 Acres) & Heavy Soil Draft",
      "AI calculates recommended HP capacity, tillage hours, and fuel economy estimates"
    );
    const aiCalcBtn = document.getElementById("btn-calc-ai-rec");
    if (aiCalcBtn) {
      await moveCursorTo(aiCalcBtn, 800);
      await triggerClickEffect(aiCalcBtn);
      if (typeof calculateKisanRecommendation === "function") calculateKisanRecommendation();
    }
    await sleep(1400);
    if (!isDemoRunning) return;

    setHudStatus(
      "💬 Agritech FAQ: 'Rotavator vs Cultivator' Soil Physics Comparison",
      "AI explains when to use cultivator vs rotavator to preserve organic soil moisture"
    );
    const aiFirstChip = document.querySelector(".ai-chip-btn");
    if (aiFirstChip) {
      await moveCursorTo(aiFirstChip, 800);
      await triggerClickEffect(aiFirstChip);
      if (typeof askKisanAiQuestion === "function") {
        askKisanAiQuestion("Wheat buwai ke liye Rotavator better hai ya Cultivator?");
      }
    }
    await sleep(1800);
    if (!isDemoRunning) return;

    // -------------------------------------------------------------
    // STOP 15/16: About AGRI-SHARE, Methodology & Viksit Bharat 2047
    // -------------------------------------------------------------
    setHudStatus(
      "🔬 Stop 15/16: Research Methodology & Problem Statement",
      "Navigating to About Page — Science Exhibition documentation & background research"
    );
    const navAbout = document.getElementById("nav-about");
    if (navAbout) {
      await moveCursorTo(navAbout, 800);
      await triggerClickEffect(navAbout);
    }
    if (typeof navigateTo === "function") navigateTo("about");
    window.scrollTo({ top: 0, behavior: "smooth" });
    await sleep(600);
    if (!isDemoRunning) return;

    const visionCard = document.querySelector("#page-about .card:first-child");
    if (visionCard) {
      setHudStatus(
        "🇮🇳 Viksit Bharat 2047: Digital Public Infrastructure for Rural India",
        "Empowering 14 Crore farming households through shared machinery access"
      );
      await moveCursorTo(visionCard, 850);
    }
    await sleep(1800);
    if (!isDemoRunning) return;

    // -------------------------------------------------------------
    // STOP 16/16: Grand Finale — Return to Home with Celebration
    // -------------------------------------------------------------
    setHudStatus(
      "🎉 Stop 16/16: A-to-Z Complete Showcase Finished!",
      "Returning to Home — AGRI-SHARE platform is live-synced & ready for Judges! 🌱"
    );
    if (typeof navigateTo === "function") navigateTo("home");
    window.scrollTo({ top: 0, behavior: "smooth" });
    await sleep(600);

    if (typeof showToast === "function") {
      showToast("🌟 Full A-to-Z Interactive Tour Complete! Science Exhibition 2026.", "success");
    }

    await sleep(3000);
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

    setHudStatus(
      `🎬 Initializing Live Judge Demo (${type === 'find' ? 'Find Equipment' : 'List Equipment'})`,
      "Starting automated slow cursor, human typing & verified cloud recording"
    );

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

    setHudStatus(
      "🚀 Starting Full A-to-Z Website Tour (16 Stops)",
      "Comprehensive guided presentation for Science Exhibition Judges & Visitors"
    );
    runFullWebsiteTour();
  };

  window.skipTourStep = function () {
    if (!isDemoRunning) return;
    skipStepRequested = true;
    setTimeout(() => {
      skipStepRequested = false;
    }, 400);
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
