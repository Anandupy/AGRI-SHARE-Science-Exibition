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
    await sleep(300);

    setHudStatus("📍 Step 1/5: Selecting Village B...");
    const villageSelect = document.getElementById("find-village");
    await simulateDropdownSelect(villageSelect, "Village B", 600);
    if (!isDemoRunning) return;

    setHudStatus("🚜 Step 2/5: Choosing Equipment: Tractor...");
    const equipSelect = document.getElementById("find-equipment");
    await simulateDropdownSelect(equipSelect, "Tractor", 550);
    if (!isDemoRunning) return;

    setHudStatus("📅 Step 3/5: Setting Required Date...");
    const dateInput = document.getElementById("find-date");
    await moveCursorTo(dateInput, 500);
    await triggerClickEffect(dateInput);
    if (dateInput) {
      dateInput.value = "2026-10-18";
      dateInput.dispatchEvent(new Event("change", { bubbles: true }));
    }
    await sleep(250);
    if (!isDemoRunning) return;

    setHudStatus("⏱️ Step 4/5: Entering Rental Duration (6 Hours)...");
    const hoursInput = document.getElementById("find-hours");
    await simulateHumanTyping(hoursInput, "6", 60);
    if (!isDemoRunning) return;

    setHudStatus("🔍 Step 5/5: Clicking Search to Query Database...");
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
