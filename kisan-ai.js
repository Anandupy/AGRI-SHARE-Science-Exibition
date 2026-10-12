/**
 * =========================================================================
 * 🤖 AGRI-SHARE — KISAN AI SMART AGRITECH ADVISOR ENGINE
 * AI Machinery Sequencing, Acreage-to-Hours Calculator, Audio Readout & Q&A
 * Designed for Indian Smallholder Farmers & Science Exhibition 2026 Showcase
 * =========================================================================
 */

(function () {
  "use strict";

  // Agritech Knowledge Graph for Indian Crops & Machinery
  const AGRITECH_KNOWLEDGE = {
    wheat: {
      nameEn: "Wheat (गेहूं)",
      stages: {
        tillage: {
          machine: "Tractor (45–50 HP) + 7ft Rotavator",
          type: "Rotavator",
          hoursPerAcre: 1.4,
          ratePerHour: 800,
          buyCost: 850000,
          specs: "Pulverizes soil in 1 pass, creates fine seedbed, incorporates stubble.",
          dieselTip: "Operate at 1600–1800 engine RPM in 1st Low gear for 20% diesel saving."
        },
        sowing: {
          machine: "Tractor (40–45 HP) + Zero-Till Seed-cum-Fertilizer Drill",
          type: "Seed Drill",
          hoursPerAcre: 1.1,
          ratePerHour: 650,
          buyCost: 650000,
          specs: "Places seeds & DAP at uniform 5cm depth with 20cm row spacing; saves 25% seeds.",
          dieselTip: "Ensure seed metering fluted rollers are calibrated before entering field."
        },
        spraying: {
          machine: "Tractor-Mounted Boom Sprayer (500L Tank)",
          type: "Sprayer",
          hoursPerAcre: 0.4,
          ratePerHour: 350,
          buyCost: 350000,
          specs: "Covers 10-meter swath per pass with uniform hollow cone nozzles.",
          dieselTip: "Spray during early morning calm winds to prevent pesticide drift."
        },
        harvesting: {
          machine: "Self-Propelled Multi-Crop Combine Harvester (Standard Cutter Bar)",
          type: "Harvester",
          hoursPerAcre: 1.0,
          ratePerHour: 1600,
          buyCost: 2200000,
          specs: "Simultaneous harvesting, threshing & winnowing; 99% grain recovery.",
          dieselTip: "Avoid morning dew moisture; harvest between 11 AM and 5 PM for clean grain."
        }
      }
    },
    paddy: {
      nameEn: "Paddy / Rice (धान / चावल)",
      stages: {
        tillage: {
          machine: "4WD Tractor (45–55 HP) + Cage Wheels + Wet Rotavator (Puddler)",
          type: "Rotavator",
          hoursPerAcre: 2.2,
          ratePerHour: 950,
          buyCost: 950000,
          specs: "Forms impervious hardpan to prevent water percolation; essential for paddy nurseries.",
          dieselTip: "Keep 5-7cm standing water in field during puddling for smooth tractor movement."
        },
        sowing: {
          machine: "Walk-Behind or Ride-On 4-Row Rice Transplanter",
          type: "Seed Drill",
          hoursPerAcre: 1.8,
          ratePerHour: 750,
          buyCost: 450000,
          specs: "Uniform 25 hills/sq. meter density; ensures 15% higher panicle emergence.",
          dieselTip: "Mat nursery thickness must be 18–20mm for error-free seedling pick."
        },
        spraying: {
          machine: "High-Clearance Self-Propelled Orchard / Paddy Sprayer",
          type: "Sprayer",
          hoursPerAcre: 0.5,
          ratePerHour: 400,
          buyCost: 380000,
          specs: "Tall ground clearance avoids damaging submerged paddy stems.",
          dieselTip: "Calibrate droplet size to 150-200 microns for blast and hopper control."
        },
        harvesting: {
          machine: "Rubber-Track Combine Harvester (Wet Field Specialist)",
          type: "Harvester",
          hoursPerAcre: 1.2,
          ratePerHour: 1800,
          buyCost: 2400000,
          specs: "Rubber tracks provide floating action in wet muddy soil without sinking.",
          dieselTip: "Ensure cutter bar knife sections are razor-sharp to prevent straw jamming."
        }
      }
    },
    cotton: {
      nameEn: "Cotton (कपास)",
      stages: {
        tillage: {
          machine: "Tractor (50 HP) + MB (Mould Board) Plough + Disc Harrow",
          type: "Tractor",
          hoursPerAcre: 2.0,
          ratePerHour: 900,
          buyCost: 880000,
          specs: "Deep tillage up to 30cm breaks subsoil compaction for taproot penetration.",
          dieselTip: "Plough across the slope in summer to conserve upcoming monsoon rainfall."
        },
        sowing: {
          machine: "Pneumatic Planter / Raised Bed Former with Seed Drill",
          type: "Seed Drill",
          hoursPerAcre: 1.2,
          ratePerHour: 700,
          buyCost: 520000,
          specs: "Precise single-seed drop with 90x60cm spacing; avoids root rotting.",
          dieselTip: "Pre-calibrate vacuum pressure to prevent seed skips or doubles."
        },
        spraying: {
          machine: "Tractor-Mounted High-Mast Air-Assisted Sprayer",
          type: "Sprayer",
          hoursPerAcre: 0.45,
          ratePerHour: 450,
          buyCost: 400000,
          specs: "Air blower penetrates dense cotton foliage for whitefly & bollworm control.",
          dieselTip: "Operate at 3 bar pressure with hollow cone nozzles."
        },
        harvesting: {
          machine: "Rotary Shredder / Mulcher (Post-harvest stalk clearing)",
          type: "Rotavator",
          hoursPerAcre: 1.3,
          ratePerHour: 800,
          buyCost: 450000,
          specs: "Crushes cotton stalks into organic manure; prevents pink bollworm carryover.",
          dieselTip: "Mulch immediately after final picking to prepare land for Rabi crop."
        }
      }
    },
    sugarcane: {
      nameEn: "Sugarcane (गन्ना)",
      stages: {
        tillage: {
          machine: "Heavy Duty Tractor (55+ HP) + Subsoiler & 2-Bottom Reversible MB Plough",
          type: "Tractor",
          hoursPerAcre: 2.5,
          ratePerHour: 1100,
          buyCost: 1050000,
          specs: "Subsoiling up to 45cm enables deep cane root anchorage and drought resistance.",
          dieselTip: "Operate at constant low gear to maximize drawbar pull."
        },
        sowing: {
          machine: "Automatic Sugarcane Cutter Planter with Furrow Opener",
          type: "Seed Drill",
          hoursPerAcre: 2.0,
          ratePerHour: 850,
          buyCost: 600000,
          specs: "Opens furrows, cuts setts to 35cm, applies fertilizer, and covers with soil in 1 pass.",
          dieselTip: "Maintain 4-feet furrow distance for mechanized weeding later."
        },
        spraying: {
          machine: "Tractor PTO-Driven High Pressure Power Sprayer",
          type: "Sprayer",
          hoursPerAcre: 0.6,
          ratePerHour: 350,
          buyCost: 280000,
          specs: "Covers tall 10-feet cane canopy with long throw gun.",
          dieselTip: "Use anti-drift flood jet nozzles."
        },
        harvesting: {
          machine: "Whole-Stalk Sugarcane Harvester / Ratoon Stubble Shaver",
          type: "Harvester",
          hoursPerAcre: 2.0,
          ratePerHour: 2200,
          buyCost: 3500000,
          specs: "Ground-level clean cut maximizes sugar recovery and ensures uniform ratoon sprouting.",
          dieselTip: "Check base cutter blade angles daily."
        }
      }
    },
    soybean: {
      nameEn: "Soybean (सोयाबीन)",
      stages: {
        tillage: {
          machine: "Tractor (40–45 HP) + Duckfoot Cultivator + Light Rotavator",
          type: "Rotavator",
          hoursPerAcre: 1.2,
          ratePerHour: 750,
          buyCost: 750000,
          specs: "Maintains optimal soil moisture and fine crumbly tilth without over-pulverizing.",
          dieselTip: "Cultivate when soil is friable, not sticky."
        },
        sowing: {
          machine: "Broad Bed Furrow (BBF) Planter & Seed-cum-Fertilizer Drill",
          type: "Seed Drill",
          hoursPerAcre: 1.0,
          ratePerHour: 600,
          buyCost: 480000,
          specs: "BBF technology drains excess monsoon water while conserving moisture during dry spells.",
          dieselTip: "Do not exceed 4 km/h speed to protect soybean seed coat."
        },
        spraying: {
          machine: "Battery/Tractor Boom Sprayer with Flat Fan Nozzles",
          type: "Sprayer",
          hoursPerAcre: 0.35,
          ratePerHour: 300,
          buyCost: 250000,
          specs: "Targeted pre-emergence weedicide spray creates clean weed-free crop stand.",
          dieselTip: "Spray within 48 hours of sowing."
        },
        harvesting: {
          machine: "Combine Harvester with Floating Cutter Bar",
          type: "Harvester",
          hoursPerAcre: 0.9,
          ratePerHour: 1500,
          buyCost: 2000000,
          specs: "Cuts bottom-most pods located just 5cm above ground without pod shattering.",
          dieselTip: "Harvest when grain moisture drops to 14-15%."
        }
      }
    }
  };

  // Soil Type Coefficients (Heavy black soil requires more draft power)
  const SOIL_COEFFICIENTS = {
    black: { factor: 1.25, name: "Black Heavy Soil (काली मिट्टी - Heavy Draft)" },
    loam: { factor: 1.0, name: "Loamy Soil (दोमट मिट्टी - Standard Draft)" },
    sandy: { factor: 0.85, name: "Sandy Soil (रेतीली मिट्टी - Light Draft)" },
    red: { factor: 1.05, name: "Red / Gravel Soil (लाल मिट्टी - Moderate Draft)" }
  };

  // Agritech Q&A Knowledge Database
  const FAQ_DATABASE = [
    {
      keywords: ["rotavator", "cultivator", "रोटावेटर", "कल्टीवेटर", "difference", "better"],
      question: "Wheat buwai ke liye Rotavator better hai ya Cultivator?",
      answer: "🌾 **AI Recommendation:**\n• **Rotavator (रोटावेटर):** 1 ही पास में मिट्टी को बारीक (fine tilth) कर देता है और फसल के अवशेषों को खाद में बदल देता है। यह समय और 40% डीजल बचाता है।\n• **Cultivator (कल्टीवेटर):** केवल मिट्टी को चीरता है, जिसके बाद पाटा (planking) लगाना पड़ता है (2-3 पास लगते हैं)।\n👉 **निर्णय:** अगर मिट्टी में नमी कम है या समय बचाना है, तो **Rotavator + Zero-Till Drill** का कॉम्बिनेशन सर्वश्रेष्ठ है!"
    },
    {
      keywords: ["diesel", "डीजल", "खर्चा", "consumption", "mileage", "fuel"],
      question: "Tractor diesel kharcha 25% kaise kam kare?",
      answer: "🚜 **AI Fuel Optimization Tips:**\n1. **Gear & RPM मैचिंग:** ट्रैक्टर को हमेशा 1600–1800 RPM (ग्रीन ज़ोन) पर चलाएं। फुल थ्रॉटल (2200 RPM) पर 30% अधिक डीजल जलता है।\n2. **टायर प्रेशर (PSI):** खेत में जुताई के समय 12–14 PSI और सड़क पर 20–22 PSI रखें। कम या ज्यादा प्रेशर से टायर स्लिप 15% डीजल बर्बाद करती है।\n3. **सही उपकरण चयन:** 45 HP ट्रैक्टर पर 7 फीट की जगह 6 फीट रोटावेटर चलाने से इंजन पर लोड कम और माइलेज बढ़ता है।"
    },
    {
      keywords: ["paddy", "combine", "harvester", "धान", "चावल", "कटाई"],
      question: "Paddy combine harvester rent karne ke fayde?",
      answer: "🌾 **AI Economic Analysis:**\n• **मजदूरों से कटाई:** 1 एकड़ में 12-14 मजदूर लगते हैं (लागत: ₹4,500/एकड़) और 3-4 दिन लगते हैं। बारिश होने पर फसल खराब होने का 100% खतरा रहता है।\n• **Combine Harvester:** 1 एकड़ की कटाई और गहाई मात्र **1 घंटे में ₹1,800** में पूरी हो जाती है!\n👉 **कुल बचत:** ₹2,700 प्रति एकड़ नकद बचत + 100% बेमौसमी बारिश से सुरक्षा!"
    },
    {
      keywords: ["buy", "rent", "खरीद", "किराया", "savings", "loan", "कर्ज"],
      question: "Machine khareedne se acha rent karna kyu hai?",
      answer: "💰 **AI Financial Breakdown:**\n• नया ट्रैक्टर + रोटावेटर खरीदने पर **₹8,50,000 की पूंजी** फंसती है, जिस पर ₹85,000 सालाना बैंक ब्याज और ₹25,000 मेंटेनेंस खर्च होता है।\n• एक 3-5 एकड़ का किसान साल में सिर्फ 30-40 घंटे मशीन चलाता है।\n• **AGRI-SHARE से रेंट:** 35 घंटे का किराया = मात्र ₹28,000!\n👉 किसान के हर साल **₹96,000 से ₹1,10,000 बचते हैं** और कोई बैंक लोन नहीं लेना पड़ता!"
    },
    {
      keywords: ["sprayer", "छिड़काव", "स्प्रे", "drip", "labor"],
      question: "Spraying me kitna time aur labor bachega?",
      answer: "💦 **AI Machinery Insight:**\n• पीठ वाले मैनुअल स्प्रेयर से 5 एकड़ खेत में दवा छिड़कने में 2 दिन और ₹1,500 मजदूरी लगती है, और दवा का फैलाव असमान होता है।\n• **Tractor Boom Sprayer (500L):** 5 एकड़ मात्र **2 घंटे में** कवर करता है (किराया: ₹700)।\n👉 90% समय की बचत + हर पत्ते पर एक समान दवा का छिड़काव!"
    },
    {
      keywords: ["calendar", "transition", "kharif", "rabi", "rotation"],
      question: "Kharif se Rabi crop transition timing kaise plan kare?",
      answer: "📅 **AI Seasonal Coordination:**\n• अक्टूबर-नवंबर में खरीफ (धान/सोयाबीन) की कटाई और रबी (गेहूं/चना) की बुवाई के बीच केवल **10-15 दिनों की महत्वपूर्ण विंडो** होती है।\n• देरी होने पर गेहूं की पैदावार प्रति सप्ताह 1.5 क्विंटल प्रति एकड़ कम हो जाती है।\n• **AGRI-SHARE पर 7 दिन पहले ही Combine Harvester और Zero-Till Drill बुक करें** ताकि समय पर खेत खाली होकर बुवाई हो सके!"
    }
  ];

  // Core Calculation Function
  function calculateKisanRecommendation() {
    const cropSelect = document.getElementById("ai-crop-select");
    const stageSelect = document.getElementById("ai-stage-select");
    const acresInput = document.getElementById("ai-acres-input");
    const soilSelect = document.getElementById("ai-soil-select");

    if (!cropSelect || !stageSelect || !acresInput) return;

    const cropKey = cropSelect.value || "wheat";
    const stageKey = stageSelect.value || "tillage";
    const acres = Math.max(0.5, Math.min(50, parseFloat(acresInput.value) || 3));
    const soilKey = (soilSelect && soilSelect.value) || "loam";

    const cropData = AGRITECH_KNOWLEDGE[cropKey] || AGRITECH_KNOWLEDGE.wheat;
    const stageData = cropData.stages[stageKey] || cropData.stages.tillage;
    const soilData = SOIL_COEFFICIENTS[soilKey] || SOIL_COEFFICIENTS.loam;

    // Calculations
    const calculatedHours = Math.round(acres * stageData.hoursPerAcre * soilData.factor * 10) / 10;
    const totalRentalCost = Math.round(calculatedHours * stageData.ratePerHour);
    const purchaseCost = stageData.buyCost;
    const netSavings = purchaseCost - totalRentalCost;
    const savingsPercent = Math.round(((purchaseCost - totalRentalCost) / purchaseCost) * 100);

    // Multi-Language Strings
    const lang = (window.getCurrentLanguage && window.getCurrentLanguage()) || localStorage.getItem("agrishare_lang") || "en";
    const isHindi = lang === "hi";
    const isMarathi = lang === "mr";

    let labelBadge = "🤖 AI Verified Agritech Recommendation";
    let labelAudioBtn = "🔊 Listen to Audio Guide";
    let labelRecMach = "🚜 Recommended Machine";
    let labelHours = "⏱️ Estimated Total Hours";
    let labelRentCost = "💵 AGRI-SHARE Rental Cost";
    let labelBuyCost = "💰 Capital Required to Buy Machine";
    let labelSpec = "Agritech Engineering Specification:";
    let labelDiesel = "Fuel & Diesel Optimization Tip:";
    let labelSoil = "Soil Type & Draft Context:";
    let labelSavings = `🎉 Net Capital Savings: ₹${netSavings.toLocaleString("en-IN")} (${savingsPercent}% saved vs purchasing!)`;
    let labelBookBtn = `👉 Book ${stageData.type} on AGRI-SHARE (${calculatedHours} hrs)`;

    if (isHindi) {
      labelBadge = "🤖 एआई सत्यापित कृषि इंजीनियरिंग सिफारिश";
      labelAudioBtn = "🔊 बोलकर सुनो (Audio)";
      labelRecMach = "🚜 अनुशंसित मशीन (Recommended)";
      labelHours = "⏱️ आवश्यक कुल घंटे (Estimated Hours)";
      labelRentCost = "💵 AGRI-SHARE किराया लागत";
      labelBuyCost = "💰 नई मशीन खरीदने पर फंसाने वाली पूंजी";
      labelSpec = "कृषि विज्ञान विश्लेषण (Agritech Specification):";
      labelDiesel = "डीजल व ईंधन बचत गाइड (Fuel Optimization Tip):";
      labelSoil = "मिट्टी का प्रकार व ड्रॉफ्ट लोड:";
      labelSavings = `🎉 ₹${netSavings.toLocaleString("en-IN")} की सीधी बचत! (मशीन खरीदने की तुलना में ${savingsPercent}% पूंजी बचत)`;
      labelBookBtn = `👉 एग्री-शेयर पर ${stageData.type} बुक करें (${calculatedHours} घंटे)`;
    } else if (isMarathi) {
      labelBadge = "🤖 AI प्रमाणित कृषी यांत्रिकीकरण शिफारस";
      labelAudioBtn = "🔊 आवाजात ऐका (Audio)";
      labelRecMach = "🚜 शिफारस केलेले यंत्र";
      labelHours = "⏱️ अंदाजे एकूण तास";
      labelRentCost = "💵 AGRI-SHARE भाडे खर्च";
      labelBuyCost = "💰 नवीन यंत्र खरेदीचे अडकणारे भांडवल";
      labelSpec = "कृषी अभियांत्रिकी तपशील:";
      labelDiesel = "डिझेल व इंधन बचत सल्ला:";
      labelSoil = "मातीचा प्रकार व ड्रॉफ्ट भार:";
      labelSavings = `🎉 ₹${netSavings.toLocaleString("en-IN")} निव्वळ बचत! (यंत्र खरेदीच्या तुलनेत ${savingsPercent}% भांडवली बचत)`;
      labelBookBtn = `👉 AGRI-SHARE वर ${stageData.type} बुक करा (${calculatedHours} तास)`;
    }

    // Update UI elements
    const resBox = document.getElementById("ai-results-panel");
    if (!resBox) return;

    resBox.innerHTML = `
      <div class="ai-result-card animate-fadeIn">
        <div class="ai-res-header">
          <div class="ai-badge-chip">${labelBadge}</div>
          <button type="button" class="ai-speech-btn" onclick="speakAiRecommendation()" title="${labelAudioBtn}">
            <span class="speech-icon">🔊</span> <span>${labelAudioBtn}</span>
          </button>
        </div>

        <div class="ai-res-body">
          <div class="ai-res-grid">
            <div class="ai-metric-pill">
              <span class="metric-label">${labelRecMach}</span>
              <strong class="metric-val text-primary">${stageData.machine}</strong>
            </div>
            <div class="ai-metric-pill">
              <span class="metric-label">${labelHours}</span>
              <strong class="metric-val">${calculatedHours} Hours (${acres} Acres)</strong>
            </div>
            <div class="ai-metric-pill">
              <span class="metric-label">${labelRentCost}</span>
              <strong class="metric-val text-success">₹${totalRentalCost.toLocaleString("en-IN")} (@ ₹${stageData.ratePerHour}/hr)</strong>
            </div>
            <div class="ai-metric-pill highlight-gold">
              <span class="metric-label">${labelBuyCost}</span>
              <strong class="metric-val text-danger">₹${purchaseCost.toLocaleString("en-IN")}</strong>
            </div>
          </div>

          <div class="ai-insight-box">
            <div class="insight-row">
              <span class="insight-icon">💡</span>
              <div>
                <strong>${labelSpec}</strong>
                <p>${stageData.specs}</p>
              </div>
            </div>
            <div class="insight-row">
              <span class="insight-icon">⛽</span>
              <div>
                <strong>${labelDiesel}</strong>
                <p>${stageData.dieselTip}</p>
              </div>
            </div>
            <div class="insight-row">
              <span class="insight-icon">🌱</span>
              <div>
                <strong>${labelSoil}</strong>
                <p>${soilData.name} (Load factor: ${soilData.factor}x)</p>
              </div>
            </div>
          </div>

          <div class="ai-action-bar">
            <div class="ai-savings-summary">
              ${labelSavings}
            </div>
            <button type="button" class="btn btn-primary btn-book-ai" onclick="bookFromAi('${stageData.type}', ${calculatedHours})">
              <span>👉</span> <span>${labelBookBtn}</span>
            </button>
          </div>
        </div>
      </div>
    `;

    // Cache the spoken text for audio
    if (isHindi) {
      window.currentAiSpeechText = `किसान भाई, ${acres} एकड़ ${cropData.nameEn} के लिए, एआई सलाहकार की सिफारिश है: ${stageData.machine}. आपके खेत में काम पूरा करने के लिए लगभग ${calculatedHours} घंटे लगेंगे. इसका कुल किराया सिर्फ ₹${totalRentalCost} होगा. नई मशीन खरीदने के ₹${purchaseCost} के भारी खर्च से बचकर आप ₹${netSavings} की सीधी बचत कर रहे हैं.`;
    } else if (isMarathi) {
      window.currentAiSpeechText = `शेतकरी बंधूंनो, ${acres} एकर शेतीसाठी एआय सल्लागाराची शिफारस आहे: ${stageData.machine}. अंदाजे ${calculatedHours} तास लागतील आणि एकूण भाडे फक्त ₹${totalRentalCost} असेल. नवीन मशिन खरेदी न करता तुम्ही ₹${netSavings} वाचवत आहात.`;
    } else {
      window.currentAiSpeechText = `Hello Farmer, for ${acres} acres, our AI recommendation is: ${stageData.machine}. It will take approximately ${calculatedHours} operating hours costing just ₹${totalRentalCost}. By choosing AGRI-SHARE, you save ₹${netSavings} without taking costly machine loans.`;
    }
  }

  // Voice speech synthesis
  window.speakAiRecommendation = function () {
    if (!window.speechSynthesis) {
      if (typeof showToast === "function") showToast("Audio playback not supported in this browser.", "info");
      return;
    }

    window.speechSynthesis.cancel(); // Stop any ongoing speech

    const textToSpeak = window.currentAiSpeechText || "किसान भाई, एग्री-शेयर के साथ मशीन किराए पर लेकर आप 80 प्रतिशत लागत बचा सकते हैं.";
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = "hi-IN";
    utterance.rate = 0.95; // Natural pace

    // Try finding a Hindi or English voice
    const voices = window.speechSynthesis.getVoices();
    const hiVoice = voices.find(v => v.lang.includes("hi") || v.name.includes("Hindi"));
    if (hiVoice) utterance.voice = hiVoice;

    window.speechSynthesis.speak(utterance);
    if (typeof showToast === "function") showToast("🔊 प्लेइंग एआई ऑडियो गाइड...", "success");
  };

  // Direct 1-Click transfer from AI to Find Equipment page
  window.bookFromAi = function (equipmentType, hours) {
    if (typeof navigateTo === "function") navigateTo("find");

    setTimeout(() => {
      const equipSelect = document.getElementById("find-equipment");
      if (equipSelect) {
        equipSelect.value = equipmentType;
        equipSelect.dispatchEvent(new Event("change", { bubbles: true }));
      }

      const hoursInput = document.getElementById("find-hours");
      if (hoursInput) {
        hoursInput.value = Math.max(1, Math.round(hours));
        hoursInput.dispatchEvent(new Event("input", { bubbles: true }));
      }

      const formCard = document.getElementById("find-web-form-container");
      if (formCard) formCard.scrollIntoView({ behavior: "smooth", block: "center" });

      if (typeof showToast === "function") {
        showToast(`🤖 AI ट्रांसफर: ${equipmentType} (${Math.round(hours)} घंटे) फाइंड फॉर्म में लोड हो गया!`, "success");
      }
    }, 200);
  };

  // Quick FAQ question answering
  window.askKisanAiQuestion = function (customQuestion) {
    const inputEl = document.getElementById("ai-user-query");
    const query = (customQuestion || (inputEl ? inputEl.value : "")).trim().toLowerCase();

    if (!query) {
      if (typeof showToast === "function") showToast("कृपया अपना प्रश्न लिखें या नीचे दिए गए प्रश्नों पर क्लिक करें।", "info");
      return;
    }

    const answerBox = document.getElementById("ai-qa-answer-box");
    if (!answerBox) return;

    // Match keywords against FAQ_DATABASE
    let matchedFaq = FAQ_DATABASE.find(item => {
      return item.keywords.some(kw => query.includes(kw.toLowerCase()));
    });

    if (!matchedFaq) {
      // General dynamic agritech response
      matchedFaq = {
        question: customQuestion || query,
        answer: `🌱 **Kisan AI Smart Advisor Analysis:**\n• आपके प्रश्न "${customQuestion || query}" के लिए कृषि इंजीनियरिंग सिद्धांत:\n• स्थानीय custom hiring centre (CHC) या AGRI-SHARE नेटवर्क से 40-50 HP क्षमता के उपकरण साझा करने से समय पर बुवाई/कटाई संभव होती है।\n• किसी भी मशीन को किराए पर लेने से पहले रेंटल दर (₹/घंटा) और खेत तक पहुंचने की दूरी (Distance in KM) अवश्य जांचें।\n• **अधिक जानकारी के लिए ऊपर दिए गए 'स्मार्ट फसल व मशीन सलाहकार' कैलकुलेटर का उपयोग करें!**`
      };
    }

    answerBox.innerHTML = `
      <div class="ai-qa-card animate-fadeIn">
        <div class="qa-q-row">
          <span class="qa-icon-q">❓</span>
          <strong>${matchedFaq.question}</strong>
        </div>
        <div class="qa-a-row">
          <span class="qa-icon-a">🤖</span>
          <div class="qa-a-text">${matchedFaq.answer.replace(/\n/g, "<br>")}</div>
        </div>
      </div>
    `;

    answerBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };

  // Setup Event Listeners
  document.addEventListener("DOMContentLoaded", function () {
    const calcBtn = document.getElementById("btn-calc-ai-rec");
    if (calcBtn) {
      calcBtn.addEventListener("click", calculateKisanRecommendation);
    }

    const cropSelect = document.getElementById("ai-crop-select");
    const stageSelect = document.getElementById("ai-stage-select");
    const acresInput = document.getElementById("ai-acres-input");
    const soilSelect = document.getElementById("ai-soil-select");

    [cropSelect, stageSelect, acresInput, soilSelect].forEach(el => {
      if (el) el.addEventListener("change", calculateKisanRecommendation);
    });

    // Run initial recommendation
  document.addEventListener("languageChanged", function () {
    calculateKisanRecommendation();
  });

  window.calculateKisanRecommendation = calculateKisanRecommendation;

})();
