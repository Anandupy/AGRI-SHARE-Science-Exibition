/**
 * AGRI-SHARE — Configuration File
 * Live Connected with exact Google Sheet IDs and Google Forms
 */

const AGRI_CONFIG = {
  // 1. Google Form: "List Your Agricultural Equipment"
  GOOGLE_LIST_FORM_URL: "https://docs.google.com/forms/d/1I7E9TC5GWZe3zW1pq5oYYA5kvLWUt7R_T4LCX9cTg0o/viewform",

  // 2. Google Form: "Find Agricultural Equipment"
  GOOGLE_FIND_FORM_URL: "https://docs.google.com/forms/d/1jl6irF4voY0xfR2z84rF4RvMiM8QdpphtqQ_Yjf--DY/viewform",

  // 3. Exact Master Equipment Google Sheet ID (from your browser URL)
  GOOGLE_SHEET_ID: "1YWFbYnNSzicPHZG47rQhQ9tJ8-nJ0TBwJOQaaEnhUVE",

  // 4. Exact Find Requests Google Sheet ID (from your browser URL)
  GOOGLE_FIND_SHEET_ID: "1tOOZV862t1TowPh3Pj6gs3cueyesO62yaAGpfo5m-GY",

  // 5. Google Apps Script Web App Deployment URL for live search & sync
  GOOGLE_APPS_SCRIPT_WEB_APP_URL: "https://script.google.com/macros/s/AKfycbzzEqB8cxm5FyTNCM42nM5C8DydD90hXiQz3kV9ufHQvN05X_l2FHIj8t3OIyktBzfnrQ/exec",

  // 6. Google Apps Script Project Editor URL & Project ID
  GOOGLE_APPS_SCRIPT_PROJECT_URL: "https://script.google.com/home/projects/1H8sEAAJRB4nngGcFCZF01YfK64ExmsKvB-sMcL6qKKI_p9iOqM_4TRTm/edit",
  GOOGLE_APPS_SCRIPT_PROJECT_ID: "1H8sEAAJRB4nngGcFCZF01YfK64ExmsKvB-sMcL6qKKI_p9iOqM_4TRTm",

  // Seamless Demo Mode (automatically falls back to 14 sample records if live endpoint is not deployed)
  IS_DEMO_MODE: true,

  // Exhibition Metadata
  VERSION: "2.4.0",
  EXHIBITION_NAME: "School Science Exhibition — Agricultural Innovation Showcase",
  CONTACT_COORDINATOR: "anandupy000@gmail.com"
};

// Retrieve any saved overrides from browser localStorage
(function loadSavedConfig() {
  try {
    const saved = localStorage.getItem('AGRI_CONFIG_OVERRIDES');
    if (saved) {
      const parsed = JSON.parse(saved);
      Object.assign(AGRI_CONFIG, parsed);
    }
  } catch (err) {
    console.warn("Could not load stored config overrides:", err);
  }
})();

// Helper to save overrides via UI
function saveAgriConfigOverrides(newConfig) {
  try {
    Object.assign(AGRI_CONFIG, newConfig);
    localStorage.setItem('AGRI_CONFIG_OVERRIDES', JSON.stringify(newConfig));
    return true;
  } catch (err) {
    console.error("Failed to save config:", err);
    return false;
  }
}

// Helper to reset configuration back to defaults
function resetAgriConfigToDefault() {
  localStorage.removeItem('AGRI_CONFIG_OVERRIDES');
  location.reload();
}
