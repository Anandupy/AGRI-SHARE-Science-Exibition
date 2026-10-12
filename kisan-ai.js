/**
 * =========================================================================
 * 🤖 AGRI-SHARE — KISAN AI SMART AGRITECH ADVISOR
 * Intelligent Machinery Sequencing, Acreage-to-Hour Estimation & Voice Advisory
 * Built for Smallholder Indian Farmers & Science Exhibition 2026 Showcase
 * =========================================================================
 */

(function () {
  "use strict";

  // Agritech Knowledge Graph for Indian Crops & Machinery
  const AGRITECH_KNOWLEDGE = {
    wheat: {
      nameEn: "Wheat",
      nameHi: "गेहूं",
      nameMr: "गहू",
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
      nameEn: "Paddy / Rice",
      nameHi: "धान / चावल",
      nameMr: "भात / तांदूळ",
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
      nameEn: "Cotton",
      nameHi: "कपास",
      nameMr: "कापूस",
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
      nameEn: "Sugarcane",
      nameHi: "गन्ना",
      nameMr: "ऊस",
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
      nameEn: "Soybean",
      nameHi: "सोयाबीन",
      nameMr: "सोयाबीन",
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
    black: {
      factor: 1.25,
      nameEn: "Black Heavy Soil (Heavy Draft)",
      nameHi: "काली भारी मिट्टी (Heavy Draft)",
      nameMr: "काळी भारी जमीन"
    },
    loam: {
      factor: 1.0,
      nameEn: "Loamy Soil (Standard Draft)",
      nameHi: "दोमट उपजाऊ मिट्टी (Standard Draft)",
      nameMr: "गाळाची सुपीक जमीन"
    },
    sandy: {
      factor: 0.85,
      nameEn: "Sandy Soil (Light Draft)",
      nameHi: "रेतीली हल्की मिट्टी (Light Draft)",
      nameMr: "वाळूची हलकी जमीन"
    },
    red: {
      factor: 1.05,
      nameEn: "Red / Gravel Soil (Moderate Draft)",
      nameHi: "लाल व कंकरीली मिट्टी (Moderate Draft)",
      nameMr: "तांबडी जमीन"
    }
  };

  // Agritech Q&A Knowledge Database (Trilingual)
  const FAQ_DATABASE = [
    {
      id: "rotavator_vs_cultivator",
      keywords: ["rotavator", "cultivator", "रोटावेटर", "कल्टीवेटर", "difference", "better"],
      qEn: "Is a Rotavator or Cultivator better for sowing wheat?",
      qHi: "गेहूं की बुवाई के लिए रोटावेटर बेहतर है या कल्टीवेटर?",
      qMr: "गहू पेरणीसाठी रोटाव्हेटर चांगला की कल्टिव्हेटर?",
      aEn: "🌾 **AI Scientific Recommendation:**\n• **Rotavator:** Pulverizes soil into fine tilth in just 1 pass and mixes crop stubble into organic manure. Saves 40% operating time and diesel.\n• **Cultivator:** Only rips open the soil, requiring subsequent planking and multiple passes (2-3 passes needed).\n👉 **Verdict:** When soil moisture is limited or quick seeding is needed, the **Rotavator + Zero-Till Seed Drill** combination is the most economical and yield-effective choice!",
      aHi: "🌾 **AI वैज्ञानिक सिफारिश:**\n• **Rotavator (रोटावेटर):** 1 ही पास में मिट्टी को बारीक (fine tilth) कर देता है और फसल के अवशेषों को खाद में बदल देता है। यह समय और 40% डीजल बचाता है।\n• **Cultivator (कल्टीवेटर):** केवल मिट्टी को चीरता है, जिसके बाद पाटा (planking) लगाना पड़ता है (2-3 पास लगते हैं)।\n👉 **निर्णय:** अगर मिट्टी में नमी कम है या समय बचाना है, तो **Rotavator + Zero-Till Drill** का कॉम्बिनेशन सर्वश्रेष्ठ है!",
      aMr: "🌾 **AI शास्त्रीय शिफारस:**\n• **Rotavator (रोटाव्हेटर):** एकाच फेरीत माती भुसभुशीत करतो आणि पिकाचे अवशेष सेंद्रिय खतात बदलतो. वेळ आणि ४०% डिझेल वाचवतो.\n• **Cultivator (कल्टिव्हेटर):** फक्त जमीन फाडतो, त्यानंतर २-३ फेऱ्या माराव्या लागतात.\n👉 **निष्कर्ष:** **Rotavator + Zero-Till Drill** चा वापर सर्वात किफायतशीर ठरतो!"
    },
    {
      id: "diesel_saving",
      keywords: ["diesel", "डीजल", "खर्चा", "consumption", "mileage", "fuel", "डिझेल"],
      qEn: "How to reduce tractor diesel consumption by 25%?",
      qHi: "ट्रैक्टर डीजल खर्चा 25% कैसे कम करें?",
      qMr: "ट्रॅक्टरचा डिझेल खर्च २५% कसा कमी करावा?",
      aEn: "🚜 **AI Fuel Optimization Engineering:**\n1. **Gear & RPM Matching:** Always operate tractor at 1600–1800 engine RPM (the green zone). Full throttle (2200+ RPM) wastes up to 30% more diesel without additional output.\n2. **Tire Pressure (PSI):** Maintain 12–14 PSI in the field during tillage, and 20–22 PSI for road transport. Improper pressure leads to wheel slip and 15% fuel loss.\n3. **Right Implement Sizing:** Running a 6-ft rotavator instead of an overloaded 7-ft on a 45 HP tractor prevents engine lugging and maximizes fuel efficiency.",
      aHi: "🚜 **AI Fuel Optimization Tips:**\n1. **Gear & RPM मैचिंग:** ट्रैक्टर को हमेशा 1600–1800 RPM (ग्रीन ज़ोन) पर चलाएं। फुल थ्रॉटल (2200 RPM) पर 30% अधिक डीजल जलता है।\n2. **टायर प्रेशर (PSI):** खेत में जुताई के समय 12–14 PSI और सड़क पर 20–22 PSI रखें। कम या ज्यादा प्रेशर से टायर स्लिप 15% डीजल बर्बाद करती है।\n3. **सही उपकरण चयन:** 45 HP ट्रैक्टर पर 7 फीट की जगह 6 फीट रोटावेटर चलाने से इंजन पर लोड कम और माइलेज बढ़ता है।",
      aMr: "🚜 **AI इंधन बचत तंत्र:**\n१. **RPM नियोजन:** ट्रॅक्टर १६००-१८०० RPM वर चालवा, जास्त वेगाने चालवल्यास ३०% जास्त डिझेल वाया जाते.\n२. **टायर हवा (PSI):** शेतात १२-१४ PSI आणि रस्त्यावर २०-२२ PSI ठेवा.\n३. **योग्य अवजार:** ट्रॅक्टरच्या अश्वशक्तीनुसारच योग्य आकाराचे रोटाव्हेटर वापरा."
    },
    {
      id: "paddy_harvester",
      keywords: ["paddy", "combine", "harvester", "धान", "चावल", "कटाई", "भात"],
      qEn: "What are the financial benefits of renting a paddy combine harvester?",
      qHi: "धान कंबाइन हार्वेस्टर किराए पर लेने के आर्थिक लाभ क्या हैं?",
      qMr: "भात काढणीसाठी कंबाईन हार्व्हेस्टर भाड्याने घेण्याचे फायदे?",
      aEn: "🌾 **AI Economic Analysis:**\n• **Manual Labor Harvesting:** Requires 12–14 laborers per acre (Cost: ₹4,500/acre) taking 3–4 days with severe risk of untimely rain damage.\n• **Combine Harvester:** Completes simultaneous harvesting and threshing of 1 acre in **just 1 hour for ₹1,800**!\n👉 **Total Net Savings:** Direct cash savings of ₹2,700 per acre + 100% weather insurance against sudden rain!",
      aHi: "🌾 **AI Economic Analysis:**\n• **मजदूरों से कटाई:** 1 एकड़ में 12-14 मजदूर लगते हैं (लागत: ₹4,500/एकड़) और 3-4 दिन लगते हैं। बारिश होने पर फसल खराब होने का 100% खतरा रहता है।\n• **Combine Harvester:** 1 एकड़ की कटाई और गहाई मात्र **1 घंटे में ₹1,800** में पूरी हो जाती है!\n👉 **कुल बचत:** ₹2,700 प्रति एकड़ नकद बचत + 100% बेमौसमी बारिश से सुरक्षा!",
      aMr: "🌾 **AI आर्थिक विश्लेषण:**\n• **मजुरांमार्फत काढणी:** प्रति एकर १२-१४ मजूर लागतात (खर्च: ₹४,५००/एकर) आणि ३-४ दिवस लागतात.\n• **कंबाईन हार्व्हेस्टर:** १ तासात अवघ्या ₹१,८०० मध्ये पूर्ण काम होते.\n👉 **एकूण बचत:** प्रति एकर ₹२,७०० रोख बचत आणि पावसापासून संरक्षण!"
    },
    {
      id: "buy_vs_rent",
      keywords: ["buy", "rent", "खरीद", "किराया", "savings", "loan", "कर्ज", "भाडे"],
      qEn: "Why is renting machinery smarter than purchasing?",
      qHi: "मशीन खरीदने की तुलना में किराए पर लेना बेहतर क्यों है?",
      qMr: "मशिन खरेदी करण्यापेक्षा भाड्याने घेणे फायदेशीर का?",
      aEn: "💰 **AI Financial Breakdown:**\n• Purchasing a new tractor + implements locks up **₹8,50,000 in capital**, incurring ₹85,000 in annual loan interest and ₹25,000 in maintenance and depreciation.\n• An average 3–5 acre farmer operates machinery for only 30–40 operational hours per year.\n• **Renting via AGRI-SHARE:** 35 seasonal hours cost only ₹28,000 total!\n👉 The farmer saves **₹96,000 to ₹1,10,000 every single year** with zero bank loan debt!",
      aHi: "💰 **AI Financial Breakdown:**\n• नया ट्रैक्टर + रोटावेटर खरीदने पर **₹8,50,000 की पूंजी** फंसती है, जिस पर ₹85,000 सालाना बैंक ब्याज और ₹25,000 मेंटेनेंस खर्च होता है।\n• एक 3-5 एकड़ का किसान साल में सिर्फ 30-40 घंटे मशीन चलाता है।\n• **AGRI-SHARE से रेंट:** 35 घंटे का किराया = मात्र ₹28,000!\n👉 किसान के हर साल **₹96,000 से ₹1,10,000 बचते हैं** और कोई बैंक लोन नहीं लेना पड़ता!",
      aMr: "💰 **AI आर्थिक विश्लेषण:**\n• नवीन ट्रॅक्टर खरेदी केल्यास ₹८.५ लाख भांडवल अडकते आणि वर्षाला ₹८५,००० व्याज भरावे लागते.\n• वर्षात केवळ ३०-४० तास वापरणाऱ्या शेतकऱ्यासाठी AGRI-SHARE भाडेतत्त्व सर्वात स्वस्त पडते.\n👉 दरवर्षी शेतकऱ्याची ₹९६,००० ते ₹१,१०,००० थेट बचत होते!"
    },
    {
      id: "spraying_savings",
      keywords: ["sprayer", "छिड़काव", "स्प्रे", "drip", "labor", "फवारणी"],
      qEn: "How much time and labor is saved using a tractor boom sprayer?",
      qHi: "ट्रैक्टर बूम स्प्रेयर से कितना समय और लेबर बचती है?",
      qMr: "ट्रॅक्टर बूम स्प्रेअरमुळे किती वेळ आणि मजुरी वाचते?",
      aEn: "💦 **AI Machinery Insight:**\n• Manual knapsack backpack spraying takes 2 full days and ₹1,500 in manual labor for 5 acres, with uneven droplet coverage.\n• **Tractor Boom Sprayer (500L Tank):** Covers 5 acres in **just 2 hours** (rental fee: ₹700).\n👉 90% time saved + perfectly uniform mist droplets on every leaf for superior pest protection!",
      aHi: "💦 **AI Machinery Insight:**\n• पीठ वाले मैनुअल स्प्रेयर से 5 एकड़ खेत में दवा छिड़कने में 2 दिन और ₹1,500 मजदूरी लगती है, और दवा का फैलाव असमान होता है।\n• **Tractor Boom Sprayer (500L):** 5 एकड़ मात्र **2 घंटे में** कवर करता है (किराया: ₹700)।\n👉 90% समय की बचत + हर पत्ते पर एक समान दवा का छिड़काव!",
      aMr: "💦 **AI अवजार माहिती:**\n• मॅन्युअल पंपाने ५ एकर फवारणीसाठी २ दिवस आणि ₹१,५०० मजुरी लागते.\n• **Tractor Boom Sprayer:** ५ एकर अवघ्या २ तासात कव्हर करतो (भाडे: ₹७००).\n👉 ९०% वेळेची बचत + सर्व झाडांवर एकसमान औषध फवारणी!"
    },
    {
      id: "seasonal_calendar",
      keywords: ["calendar", "transition", "kharif", "rabi", "rotation", "हंगाम"],
      qEn: "How should farmers plan the Kharif to Rabi machine transition?",
      qHi: "खरीफ से रबी फसल बदलाव के समय मशीनों की योजना कैसे बनाएं?",
      qMr: "खरीप ते रब्बी पीक बदला दरम्यान मशिनचे नियोजन कसे करावे?",
      aEn: "📅 **AI Seasonal Coordination:**\n• Between Kharif harvesting (Paddy/Soybean) and Rabi sowing (Wheat/Gram) in Oct–Nov, there is a **critical 10–15 day window**.\n• Every week of sowing delay reduces wheat yields by 1.5 quintals per acre.\n• **Pre-book your Combine Harvester and Zero-Till Drill on AGRI-SHARE 7 days in advance** so fields are prepared and seeded on schedule!",
      aHi: "📅 **AI Seasonal Coordination:**\n• अक्टूबर-नवंबर में खरीफ (धान/सोयाबीन) की कटाई और रबी (गेहूं/चना) की बुवाई के बीच केवल **10-15 दिनों की महत्वपूर्ण विंडो** होती है।\n• देरी होने पर गेहूं की पैदावार प्रति सप्ताह 1.5 क्विंटल प्रति एकड़ कम हो जाती है।\n• **AGRI-SHARE पर 7 दिन पहले ही Combine Harvester और Zero-Till Drill बुक करें** ताकि समय पर खेत खाली होकर बुवाई हो सके!",
      aMr: "📅 **AI हंगामी नियोजन:**\n• ऑक्टोबर-नोव्हेंबरमध्ये खरीप काढणी आणि रब्बी पेरणी दरम्यान १०-१५ दिवसांचा महत्त्वाचा कालावधी असतो.\n• उशीर झाल्यास गव्हाचे उत्पादन घटते. म्हणूनच AGRI-SHARE वर आठवडाभर आधीच अवजारे आरक्षित करा!"
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

    const cropName = isHindi ? cropData.nameHi : (isMarathi ? cropData.nameMr : cropData.nameEn);
    const soilName = isHindi ? soilData.nameHi : (isMarathi ? soilData.nameMr : soilData.nameEn);

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
                <p>${soilName} (Load factor: ${soilData.factor}x)</p>
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
      window.currentAiSpeechText = `किसान भाई, ${acres} एकड़ ${cropName} के लिए, एआई सलाहकार की सिफारिश है: ${stageData.machine}. आपके खेत में काम पूरा करने के लिए लगभग ${calculatedHours} घंटे लगेंगे. इसका कुल किराया सिर्फ ₹${totalRentalCost} होगा. नई मशीन खरीदने के ₹${purchaseCost} के भारी खर्च से बचकर आप ₹${netSavings} की सीधी बचत कर रहे हैं.`;
    } else if (isMarathi) {
      window.currentAiSpeechText = `शेतकरी बंधूंनो, ${acres} एकर शेतीसाठी एआय सल्लागाराची शिफारस आहे: ${stageData.machine}. अंदाजे ${calculatedHours} तास लागतील आणि एकूण भाडे फक्त ₹${totalRentalCost} असेल. नवीन मशिन खरेदी न करता तुम्ही ₹${netSavings} वाचवत आहात.`;
    } else {
      window.currentAiSpeechText = `Hello Farmer, for ${acres} acres of ${cropName}, our AI recommendation is: ${stageData.machine}. It will take approximately ${calculatedHours} operating hours costing just ₹${totalRentalCost}. By choosing AGRI-SHARE, you save ₹${netSavings} without taking costly machine loans.`;
    }
  }

  // Voice speech synthesis
  window.speakAiRecommendation = function () {
    if (!window.speechSynthesis) {
      if (typeof showToast === "function") showToast("Audio playback not supported in this browser.", "info");
      return;
    }

    window.speechSynthesis.cancel(); // Stop any ongoing speech

    const lang = (window.getCurrentLanguage && window.getCurrentLanguage()) || localStorage.getItem("agrishare_lang") || "en";
    const defaultText = (lang === "en")
      ? "Hello farmer, renting machinery via AGRI-SHARE saves you up to 80% compared to purchasing."
      : (lang === "mr"
        ? "शेतकरी बंधूंनो, एग्री-शेअरद्वारे मशिन भाड्याने घेतल्यास तुमचे ८० टक्के पैसे वाचतात."
        : "किसान भाई, एग्री-शेयर के साथ मशीन किराए पर लेकर आप 80 प्रतिशत लागत बचा सकते हैं.");

    const textToSpeak = window.currentAiSpeechText || defaultText;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = (lang === "en") ? "en-IN" : (lang === "mr" ? "mr-IN" : "hi-IN");
    utterance.rate = 0.95; // Natural pace

    // Try finding appropriate voice
    const voices = window.speechSynthesis.getVoices();
    if (lang === "en") {
      const enVoice = voices.find(v => v.lang.includes("en-IN") || v.lang.includes("en-US") || v.lang.includes("en"));
      if (enVoice) utterance.voice = enVoice;
    } else if (lang === "hi") {
      const hiVoice = voices.find(v => v.lang.includes("hi") || v.name.includes("Hindi"));
      if (hiVoice) utterance.voice = hiVoice;
    }

    window.speechSynthesis.speak(utterance);
    const toastMsg = (lang === "en")
      ? "🔊 Playing AI Audio Guide..."
      : (lang === "mr" ? "🔊 ऑडिओ सल्ला सुरू आहे..." : "🔊 प्लेइंग एआई ऑडियो गाइड...");
    if (typeof showToast === "function") showToast(toastMsg, "success");
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

      const lang = (window.getCurrentLanguage && window.getCurrentLanguage()) || localStorage.getItem("agrishare_lang") || "en";
      const toastMsg = (lang === "en")
        ? `🤖 AI Transfer: ${equipmentType} (${Math.round(hours)} hrs) loaded into Find form!`
        : (lang === "mr"
          ? `🤖 AI ट्रान्सफर: ${equipmentType} (${Math.round(hours)} तास) फॉर्ममध्ये लोड केले!`
          : `🤖 AI ट्रांसफर: ${equipmentType} (${Math.round(hours)} घंटे) फाइंड फॉर्म में लोड हो गया!`);
      if (typeof showToast === "function") showToast(toastMsg, "success");
    }, 200);
  };

  // Quick FAQ question answering
  window.askKisanAiQuestion = function (customQuestion) {
    const lang = (window.getCurrentLanguage && window.getCurrentLanguage()) || localStorage.getItem("agrishare_lang") || "en";
    const isHindi = lang === "hi";
    const isMarathi = lang === "mr";

    const inputEl = document.getElementById("ai-user-query");
    const query = (customQuestion || (inputEl ? inputEl.value : "")).trim().toLowerCase();

    if (!query) {
      const emptyMsg = (lang === "en")
        ? "Please enter your question or click one of the quick topics below."
        : (lang === "mr"
          ? "कृपया आपला प्रश्न टाइप करा किंवा खालील विषयांवर क्लिक करा."
          : "कृपया अपना प्रश्न लिखें या नीचे दिए गए प्रश्नों पर क्लिक करें।");
      if (typeof showToast === "function") showToast(emptyMsg, "info");
      return;
    }

    const answerBox = document.getElementById("ai-qa-answer-box");
    if (!answerBox) return;

    // Match by ID first or keywords
    let matchedFaq = FAQ_DATABASE.find(item => item.id === customQuestion) ||
      FAQ_DATABASE.find(item => item.keywords.some(kw => query.includes(kw.toLowerCase())));

    let qTitle = "";
    let aBody = "";

    if (matchedFaq) {
      qTitle = isHindi ? matchedFaq.qHi : (isMarathi ? matchedFaq.qMr : matchedFaq.qEn);
      aBody = isHindi ? matchedFaq.aHi : (isMarathi ? matchedFaq.aMr : matchedFaq.aEn);
    } else {
      qTitle = customQuestion || query;
      if (isHindi) {
        aBody = `🌱 **किसान AI स्मार्ट सलाहकार विश्लेषण:**\n• आपके प्रश्न "${customQuestion || query}" के लिए कृषि इंजीनियरिंग सिद्धांत:\n• स्थानीय custom hiring centre (CHC) या AGRI-SHARE नेटवर्क से 40-50 HP क्षमता के उपकरण साझा करने से समय पर बुवाई/कटाई संभव होती है।\n• किसी भी मशीन को किराए पर लेने से पहले रेंटल दर (₹/घंटा) और खेत तक पहुंचने की दूरी (Distance in KM) अवश्य जांचें।\n• **अधिक जानकारी के लिए ऊपर दिए गए 'स्मार्ट फसल व मशीन सलाहकार' कैलकुलेटर का उपयोग करें!**`;
      } else if (isMarathi) {
        aBody = `🌱 **शेतकरी AI सल्लागार विश्लेषण:**\n• आपल्या प्रश्न "${customQuestion || query}" साठी कृषी अभियांत्रिकी तत्त्वे:\n• स्थानिक custom hiring centre किंवा AGRI-SHARE नेटवर्कवरून ४०-५० HP क्षमतेची अवजारे वापरणे किफायतशीर ठरते.\n• कोणतेही यंत्र भाड्याने घेण्यापूर्वी प्रति तास दर (₹/तास) आणि अंतर तपासा.\n• **अधिक माहितीसाठी वरील स्मार्ट कॅल्क्युलेटर वापरा!**`;
      } else {
        aBody = `🌱 **Kisan AI Smart Advisor Analysis:**\n• Agricultural Engineering Insight for query: "${customQuestion || query}":\n• Utilizing shared 40–50 HP machinery from local Custom Hiring Centres (CHCs) or the AGRI-SHARE digital network eliminates capital debt while ensuring peak-season crop timeliness.\n• Always verify hourly rental rates (₹/hr) and field proximity (Distance in km) before confirming machinery dispatch.\n• **Use the Smart Crop & Machinery Calculator above for scientific acreage sizing!**`;
      }
    }

    answerBox.innerHTML = `
      <div class="ai-qa-card animate-fadeIn">
        <div class="qa-q-row">
          <span class="qa-icon-q">❓</span>
          <strong>${qTitle}</strong>
        </div>
        <div class="qa-a-row">
          <span class="qa-icon-a">🤖</span>
          <div class="qa-a-text">${aBody.replace(/\n/g, "<br>")}</div>
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
  });

  document.addEventListener("languageChanged", function () {
    calculateKisanRecommendation();
  });

  window.calculateKisanRecommendation = calculateKisanRecommendation;

})();
