/**
 * =========================================================================
 * 🌐 AGRI-SHARE — MULTI-LANGUAGE TRANSLATION ENGINE
 * Complete Dynamic Translation for English, Hindi, Marathi, Gujarati, Punjabi
 * Built for Rural Farmer Accessibility & Science Exhibition 2026 Showcase
 * =========================================================================
 */

(function () {
  "use strict";

  const TRANSLATIONS = {
    en: {
      langName: "English",
      // Navigation
      navHome: "Home",
      navFind: "Find",
      navList: "List",
      navAvailable: "Available",
      navCalculator: "Calculator",
      navCalendar: "Calendar",
      navAi: "🤖 Kisan AI",
      navAbout: "About",
      portalOwner: "🚜 Owner",
      portalFarmer: "🌾 Farmer",
      tourChip: "✨ Tour",

      // Hero Section
      heroBadge: "🌱 Transforming Indian Agricultural Mechanization",
      heroTitle: '<span class="highlight-text">AGRI-SHARE</span> Share Equipment. Reduce Costs. Grow Together.',
      heroSub: "Find nearby agricultural machinery, rent equipment when you need it, and help farmers reduce the cost of farming.",
      btnTour: "✨ Full Website Tour",
      btnFind: "🚜 Find Equipment",
      btnList: "➕ List Your Equipment",
      btnCalc: "💰 Calculate Savings",
      btnCalendar: "📅 Crop Calendar",
      btnAi: "🤖 Kisan AI Advisor",

      // Hero Stats
      statListings: "Equipment Listings",
      statSavings: "Avg. Annual Savings",
      statReduction: "Cost Reduction",

      // Month strip
      monthStripBadge: "CURRENT FARMING STAGE:",

      // Headings
      howItWorksTitle: "How AGRI-SHARE Works in 3 Simple Steps",
      howItWorksSub: "Bridging machine owners and nearby farmers with zero upfront investment.",
      step1Title: "Search & Match",
      step1Desc: "Enter your village, equipment requirement, date, and hours. The system matches nearby available machinery.",
      step2Title: "Connect & Rent",
      step2Desc: "Connect directly with the local owner or Custom Hiring Centre (CHC) with zero middleman commission.",
      step3Title: "Farm & Save",
      step3Desc: "Complete your seasonal ploughing, spraying or harvesting on demand, saving up to 80% compared to purchasing.",

      benefitsTitle: "Benefits for Small and Medium Farmers",
      benefitsSub: "Why equipment sharing is crucial for rural economic independence.",
      benefit1Title: "Zero Debt & Capital Burden",
      benefit1Desc: "Avoid taking ₹5,00,000 to ₹25,00,000 bank loans for equipment that sits idle for 10–11 months a year.",
      benefit2Title: "No Repair or Maintenance Hassle",
      benefit2Desc: "Pay strictly for operating hours. Machine servicing, tyre changes, and shed storage remain with the owner.",
      benefit3Title: "Extra Income for Equipment Owners",
      benefit3Desc: "Farmers who own tractors or harvesters earn ₹50,000 to ₹1,20,000 extra per season by renting out idle machinery.",

      // Find Page
      findTitle: "Find Agricultural Equipment",
      findSubtitle: "Search available tractors, rotavators, sprayers, and harvesters near your village.",
      findSearchCardTitle: "Search Equipment",
      findSearchCardSub: 'Google Form "Find Agricultural Equipment" Integration.',
      lblVillage: "Village / Location",
      lblEquipRequired: "Equipment Required",
      lblFarmerName: "Farmer Name (Hirer)",
      lblContactMobile: "Contact Mobile",
      lblRequiredDate: "Required Date",
      lblRentalHours: "Number of Rental Hours",
      btnSearchSubmit: "🔍 Search & Record in Sheet",
      btnBrowseAll: "Browse All Machinery →",

      // List Page
      listTitle: "List Your Agricultural Equipment",
      listSubtitle: "Share your tractor or machinery with nearby farmers and earn extra seasonal income.",
      listCardTitle: "List Machinery for Rent",
      lblOwnerName: "Owner Name",
      lblEquipType: "Equipment Type",
      lblHourlyRate: "Hourly Rental Rate (₹/hr)",
      lblAvailFrom: "Available From Date",
      lblAvailUntil: "Available Until Date",
      btnListSubmit: "➕ Register Equipment in Database",

      // Available Page
      availTitle: "Available Equipment Database",
      availSubtitle: "Real-time machinery catalog across Village A, Village B, Village C, and custom hiring clusters.",
      filterAll: "All Machinery",
      filterTractor: "Tractors",
      filterRotavator: "Rotavators",
      filterDrill: "Seed Drills",
      filterSprayer: "Sprayers",
      filterHarvester: "Harvesters",
      filterThresher: "Threshers",

      // Calculator Page
      calcTitle: "Buy vs Rent Cost Calculator",
      calcSubtitle: "Compare the actual capital, depreciation, interest, and maintenance of buying vs renting through AGRI-SHARE.",
      calcSliderLabel: "Annual Usage (Hours per Year)",
      calcBuyCardTitle: "Buying Equipment (Capital Lockup)",
      calcRentCardTitle: "Renting via AGRI-SHARE (Pay-As-You-Use)",
      calcSavingsCardTitle: "Net Annual Farmer Savings",

      // Calendar Page
      calTitle: "Crop Calendar & Seasonal Recommendations",
      calSubtitle: "Optimal seasonal machinery planning to eliminate sowing and harvesting bottlenecks.",

      // AI Page
      aiTitle: "🤖 Kisan AI — Smart Agritech Advisor",
      aiSubtitle: "Intelligent Machinery Sequencing, Acreage Estimation, Cost Optimization & Voice Advisory for Farmers.",
      aiRecTitle: "🌱 Smart Crop & Machinery Sizing (AI Recommender)",
      aiRecSub: "Select your crop, acreage, farming stage, and soil type to get scientific machine sizing and instant cost savings.",
      lblAiCrop: "Crop Type",
      cropOptions: {
        wheat: "Wheat",
        paddy: "Paddy / Rice",
        cotton: "Cotton",
        sugarcane: "Sugarcane",
        soybean: "Soybean"
      },
      lblAiStage: "Farming Stage",
      stageOptions: {
        tillage: "Primary / Secondary Tillage",
        sowing: "Precision Sowing & Planting",
        spraying: "Crop Protection Spraying",
        harvesting: "Harvesting & Residue Management"
      },
      lblAiAcres: "Farm Size in Acres",
      lblAiSoil: "Soil Type",
      soilOptions: {
        black: "Black Heavy Soil",
        loam: "Loamy Soil",
        sandy: "Sandy Soil",
        red: "Red Soil"
      },
      btnCalcAi: "Get Instant AI Recommendation",
      aiQaTitle: "💬 Ask Kisan AI (Agritech Questions)",
      aiQaSub: "Ask questions about machinery fuel efficiency, implement selection, or seasonal crop timing in your language.",
      phAiQuery: "e.g. How to reduce tractor diesel consumption? Or ask your question...",
      btnQueryAsk: "Ask (AI)",
      aiQuickTopics: "Quick Farmer Questions (Click to ask):",
      aiEmptyPh: "Click any question above or type your query. Kisan AI will provide instant scientific advice.",

      // About Page
      aboutTitle: "About AGRI-SHARE Project",
      aboutSubtitle: "Bridging the Farm Mechanization Divide in Rural India through Community Sharing & Digital Public Infrastructure."
    },

    hi: {
      langName: "हिंदी",
      // Navigation
      navHome: "होम",
      navFind: "मशीन खोजें",
      navList: "मशीन जोड़ें",
      navAvailable: "उपलब्ध मशीनें",
      navCalculator: "बचत कैलकुलेटर",
      navCalendar: "फसल कैलेंडर",
      navAi: "🤖 किसान AI",
      navAbout: "प्रोजेक्ट परिचय",
      portalOwner: "🚜 मशीन मालिक",
      portalFarmer: "🌾 किराएदार किसान",
      tourChip: "✨ वेबसाइट टूर",

      // Hero Section
      heroBadge: "🌱 भारतीय कृषि यंत्रीकरण में डिजिटल क्रांति",
      heroTitle: '<span class="highlight-text">AGRI-SHARE</span> उपकरण साझा करें। लागत घटाएं। साथ बढ़ें।',
      heroSub: "आसपास की कृषि मशीनें खोजें, जरूरत पड़ने पर किराए पर लें और खेती की लागत 80% तक कम करके कर्जमुक्त बनें।",
      btnTour: "✨ संपूर्ण वेबसाइट टूर",
      btnFind: "🚜 उपकरण खोजें",
      btnList: "➕ अपनी मशीन दर्ज करें",
      btnCalc: "💰 बचत की गणना करें",
      btnCalendar: "📅 फसल कैलेंडर",
      btnAi: "🤖 किसान AI सलाहकार",

      // Hero Stats
      statListings: "उपलब्ध मशीन सूचियां",
      statSavings: "औसत वार्षिक बचत",
      statReduction: "लागत में कमी",

      // Month strip
      monthStripBadge: "वर्तमान कृषि चरण:",

      // Headings
      howItWorksTitle: "3 आसान चरणों में एग्री-शेयर कैसे काम करता है",
      howItWorksSub: "बिना किसी अग्रिम निवेश के मशीन मालिकों और जरूरतमंद किसानों को जोड़ना।",
      step1Title: "खोजें और मिलान करें",
      step1Desc: "अपना गांव, आवश्यक मशीन, तारीख और घंटे दर्ज करें। सिस्टम पास की उपलब्ध मशीनों को तुरंत ढूंढता है।",
      step2Title: "सीधे संपर्क करें और किराए पर लें",
      step2Desc: "बिना किसी बिचौलिये या कमीशन के स्थानीय मशीन मालिक से सीधे जुड़ें।",
      step3Title: "खेती करें और बचत करें",
      step3Desc: "समय पर जुताई, बुवाई, छिड़काव या कटाई पूरी करें और नई मशीन खरीदने की तुलना में 80% तक बचत करें।",

      benefitsTitle: "छोटे और मध्यम किसानों के लिए बड़े लाभ",
      benefitsSub: "ग्रामीण आर्थिक स्वतंत्रता और कर्जमुक्ति के लिए मशीन शेयरिंग क्यों आवश्यक है।",
      benefit1Title: "शून्य कर्ज और पूंजी का बोझ नहीं",
      benefit1Desc: "साल में 10-11 महीने खाली रहने वाली मशीनों के लिए ₹5 लाख से ₹25 लाख का बैंक लोन लेने से बचें।",
      benefit2Title: "मरम्मत और रखरखाव का कोई झंझट नहीं",
      benefit2Desc: "केवल उपयोग किए गए घंटों का किराया दें। सर्विसिंग, टायर बदलना और शेड का खर्च मालिक का रहता है।",
      benefit3Title: "मशीन मालिकों के लिए अतिरिक्त आय",
      benefit3Desc: "ट्रैक्टर या हार्वेस्टर मालिक खाली समय में मशीन किराए पर देकर प्रति सीजन ₹50,000 से ₹1,20,000 अतिरिक्त कमाते हैं।",

      // Find Page
      findTitle: "कृषि उपकरण खोजें",
      findSubtitle: "अपने गांव के नजदीक उपलब्ध ट्रैक्टर, रोटावेटर, स्प्रेयर और हार्वेस्टर खोजें।",
      findSearchCardTitle: "उपकरण खोजें",
      findSearchCardSub: 'गूगल फॉर्म "Find Agricultural Equipment" लाइव इंटीग्रेशन।',
      lblVillage: "गांव / स्थान",
      lblEquipRequired: "आवश्यक कृषि उपकरण",
      lblFarmerName: "किसान का नाम (किराएदार)",
      lblContactMobile: "संपर्क मोबाइल नंबर",
      lblRequiredDate: "आवश्यक तारीख",
      lblRentalHours: "किराया अवधि (घंटे)",
      btnSearchSubmit: "🔍 खोजें और शीट में दर्ज करें",
      btnBrowseAll: "सभी मशीनें देखें →",

      // List Page
      listTitle: "अपनी कृषि मशीन किराए के लिए दर्ज करें",
      listSubtitle: "अपने ट्रैक्टर या उपकरण को आसपास के किसानों के साथ साझा करें और अतिरिक्त मौसमी आय अर्जित करें।",
      listCardTitle: "किराए के लिए मशीन दर्ज करें",
      lblOwnerName: "मशीन मालिक का नाम",
      lblEquipType: "उपकरण का प्रकार",
      lblHourlyRate: "प्रति घंटा किराया दर (₹/घंटा)",
      lblAvailFrom: "उपलब्धता आरंभ तिथि",
      lblAvailUntil: "उपलब्धता अंतिम तिथि",
      btnListSubmit: "➕ डेटाबेस में उपकरण पंजीकृत करें",

      // Available Page
      availTitle: "उपलब्ध कृषि उपकरण डेटाबेस",
      availSubtitle: "विलेज ए, विलेज बी, विलेज सी और कस्टम हायरिंग क्लस्टर में वास्तविक समय मशीनरी सूची।",
      filterAll: "सभी मशीनें",
      filterTractor: "ट्रैक्टर",
      filterRotavator: "रोटावेटर",
      filterDrill: "सीड ड्रिल",
      filterSprayer: "स्प्रेयर",
      filterHarvester: "हार्वेस्टर",
      filterThresher: "थ्रेशर",

      // Calculator Page
      calcTitle: "खरीद बनाम किराया बचत कैलकुलेटर",
      calcSubtitle: "एग्री-शेयर के माध्यम से किराए पर लेने बनाम खरीदने की वास्तविक पूंजी, ब्याज, मूल्यह्रास और रखरखाव की तुलना करें।",
      calcSliderLabel: "वार्षिक उपयोग (घंटे प्रति वर्ष)",
      calcBuyCardTitle: "मशीन खरीदना (पूंजी फंसाना)",
      calcRentCardTitle: "एग्री-शेयर से किराया (जितना इस्तेमाल, उतना भुगतान)",
      calcSavingsCardTitle: "किसान की शुद्ध वार्षिक बचत",

      // Calendar Page
      calTitle: "फसल कैलेंडर और मौसमी सिफारिशें",
      calSubtitle: "बुवाई और कटाई में देरी को खत्म करने के लिए सर्वोत्तम मौसमी मशीनरी योजना।",

      // AI Page
      aiTitle: "🤖 किसान AI — स्मार्ट कृषि सलाहकार",
      aiSubtitle: "किसानों के लिए इंटेलिजेंट मशीनरी चयन, एकड़ अनुसार समय गणना, लागत बचत विश्लेषण और आवाज सहायता।",
      aiRecTitle: "🌱 स्मार्ट फसल व मशीन कैलकुलेटर (AI Recommender)",
      aiRecSub: "अपनी फसल, एकड़, खेती का चरण और मिट्टी का प्रकार चुनें और वैज्ञानिक मशीनरी चयन व लागत बचत प्राप्त करें।",
      lblAiCrop: "फसल का प्रकार",
      cropOptions: {
        wheat: "गेहूं (Wheat)",
        paddy: "धान / चावल (Paddy)",
        cotton: "कपास (Cotton)",
        sugarcane: "गन्ना (Sugarcane)",
        soybean: "सोयाबीन (Soybean)"
      },
      lblAiStage: "खेती का चरण",
      stageOptions: {
        tillage: "जुताई व खेत तैयारी (Tillage)",
        sowing: "सटीक बुवाई व रोपाई (Sowing)",
        spraying: "फसल सुरक्षा छिड़काव (Spraying)",
        harvesting: "कटाई व अवशेष प्रबंधन (Harvesting)"
      },
      lblAiAcres: "जमीन (एकड़ में)",
      lblAiSoil: "मिट्टी का प्रकार",
      soilOptions: {
        black: "काली भारी मिट्टी (Black Soil)",
        loam: "दोमट उपजाऊ मिट्टी (Loam Soil)",
        sandy: "रेतीली हल्की मिट्टी (Sandy Soil)",
        red: "लाल कंकरीली मिट्टी (Red Soil)"
      },
      btnCalcAi: "एआई सलाह प्राप्त करें",
      aiQaTitle: "💬 पूछो किसान AI (कृषि प्रश्न)",
      aiQaSub: "मशीनरी ईंधन दक्षता, सही उपकरण चयन या मौसमी फसल समय के बारे में अपनी भाषा में प्रश्न पूछें।",
      phAiQuery: "उदा. ट्रैक्टर का डीजल खर्च कैसे कम करें? या अपना प्रश्न लिखें...",
      btnQueryAsk: "पूछें",
      aiQuickTopics: "किसानों के सामान्य प्रश्न (क्लिक करके पूछें):",
      aiEmptyPh: "ऊपर दिए गए प्रश्नों पर क्लिक करें या अपना सवाल टाइप करें। किसान AI तुरंत वैज्ञानिक सलाह देगा।",

      // About Page
      aboutTitle: "एग्री-शेयर प्रोजेक्ट के बारे में",
      aboutSubtitle: "सामुदायिक शेयरिंग और डिजिटल पब्लिक इंफ्रास्ट्रक्चर के माध्यम से ग्रामीण भारत में कृषि यंत्रीकरण की खाई को पाटना।"
    },

    mr: {
      langName: "मराठी",
      // Navigation
      navHome: "मुख्यपृष्ठ",
      navFind: "मशिन शोधा",
      navList: "मशिन जोडा",
      navAvailable: "उपलब्ध मशिन्स",
      navCalculator: "बचत गणक",
      navCalendar: "पीक दिनदर्शिका",
      navAi: "🤖 शेतकरी AI",
      navAbout: "प्रकल्पाविषयी",
      portalOwner: "🚜 मशिन मालक",
      portalFarmer: "🌾 भाडेकरू शेतकरी",
      tourChip: "✨ वेबसाइट टूर",

      // Hero Section
      heroBadge: "🌱 भारतीय शेती यांत्रिकीकरणात डिजिटल क्रांती",
      heroTitle: '<span class="highlight-text">AGRI-SHARE</span> उपकरणे शेअर करा. खर्च कमी करा. एकत्र समृद्ध व्हा.',
      heroSub: "जवळपासची कृषी यंत्रसामग्री शोधा, गरजेनुसार भाड्याने घ्या आणि शेतीचा खर्च ८०% पर्यंत कमी करून कर्जमुक्त व्हा.",
      btnTour: "✨ संपूर्ण वेबसाइट टूर",
      btnFind: "🚜 यंत्र शोधा",
      btnList: "➕ स्वतःचे यंत्र जोडा",
      btnCalc: "💰 बचतीची गणना करा",
      btnCalendar: "📅 पीक दिनदर्शिका",
      btnAi: "🤖 शेतकरी AI सल्लागार",

      // Hero Stats
      statListings: "उपलब्ध मशिन याद्या",
      statSavings: "सरासरी वार्षिक बचत",
      statReduction: "खर्चामध्ये घट",

      // Month strip
      monthStripBadge: "सध्याचा शेती टप्पा:",

      // Headings
      howItWorksTitle: "३ सोप्या टप्प्यांत एग्री-शेअर कसे कार्य करते",
      howItWorksSub: "कोणत्याही आगाऊ गुंतवणुकीशिवाय यंत्र मालक आणि गरजू शेतकऱ्यांना जोडणे.",
      step1Title: "शोधा आणि जुळवा",
      step1Desc: "तुमचे गाव, आवश्यक यंत्र, तारीख आणि तास प्रविष्ट करा. प्रणाली जवळची उपलब्ध यंत्रे त्वरित शोधते.",
      step2Title: "थेट संपर्क आणि भाडेकरार",
      step2Desc: "कोणत्याही मध्यस्थाशिवाय स्थानिक मशिन मालकाशी थेट जोडा.",
      step3Title: "शेती करा आणि बचत करा",
      step3Desc: "वेळेवर नांगरणी, पेरणी, फवारणी किंवा कापणी पूर्ण करा आणि खरेदीच्या तुलनेत ८०% पर्यंत बचत करा.",

      benefitsTitle: "लहान व मध्यम शेतकऱ्यांसाठी मोठे फायदे",
      benefitsSub: "ग्रामीण आर्थिक स्वावलंबन आणि कर्जमुक्तीसाठी यंत्र शेअरिंग का आवश्यक आहे.",
      benefit1Title: "शून्य कर्ज आणि भांडवलाचा भार नाही",
      benefit1Desc: "वर्षातून १०-११ महिने पडून राहणाऱ्या यंत्रांसाठी ₹५ लाख ते ₹२५ लाखांचे बँक कर्ज घेणे टाळा.",
      benefit2Title: "दुरुस्ती आणि देखभालीची कोणतीही चिंता नाही",
      benefit2Desc: "फक्त वापरलेल्या तासांचे भाडे द्या. सर्व्हिसिंग, टायर बदलणे आणि शेडचा खर्च मालकाकडेच राहतो.",
      benefit3Title: "यंत्र मालकांसाठी अतिरिक्त उत्पन्न",
      benefit3Desc: "ट्रॅक्टर किंवा हार्वेस्टर मालक रिकाम्या काळात यंत्रे भाड्याने देऊन दर हंगामात ₹५०,००० ते ₹१,२०,००० अतिरिक्त कमावतात.",

      // Find Page
      findTitle: "कृषी यंत्रसामग्री शोधा",
      findSubtitle: "तुमच्या गावाजवळ उपलब्ध ट्रॅक्टर, रोटाव्हेटर, फवारणी यंत्रे आणि हार्वेस्टर शोधा.",
      findSearchCardTitle: "यंत्र शोधा",
      findSearchCardSub: 'गुगल फॉर्म "Find Agricultural Equipment" थेट इंटिग्रेशन.',
      lblVillage: "गाव / ठिकाण",
      lblEquipRequired: "आवश्यक कृषी यंत्र",
      lblFarmerName: "शेतकऱ्याचे नाव (भाडेकरू)",
      lblContactMobile: "संपर्क मोबाईल नंबर",
      lblRequiredDate: "आवश्यक तारीख",
      lblRentalHours: "भाडे कालावधी (तास)",
      btnSearchSubmit: "🔍 शोधा आणि शीटमध्ये नोंदवा",
      btnBrowseAll: "सर्व मशिन्स पहा →",

      // List Page
      listTitle: "तुमची कृषी मशिन भाड्यासाठी नोंदवा",
      listSubtitle: "तुमचा ट्रॅक्टर किंवा यंत्र आजूबाजूच्या शेतकऱ्यांसोबत शेअर करा आणि अतिरिक्त हंगामी उत्पन्न मिळवा.",
      listCardTitle: "भाड्यासाठी यंत्र नोंदणी",
      lblOwnerName: "मशिन मालकाचे नाव",
      lblEquipType: "यंत्राचा प्रकार",
      lblHourlyRate: "प्रति तास भाडे दर (₹/तास)",
      lblAvailFrom: "उपलब्धता सुरू तारीख",
      lblAvailUntil: "उपलब्धता अंतिम तारीख",
      btnListSubmit: "➕ डेटाबेसमध्ये यंत्र नोंदणी करा",

      // Available Page
      availTitle: "उपलब्ध कृषी यंत्रसामग्री डेटाबेस",
      availSubtitle: "व्हिलेज ए, व्हिलेज बी, व्हिलेज सी मधील रिअल-टाइम यंत्र सूची.",
      filterAll: "सर्व मशिन्स",
      filterTractor: "ट्रॅक्टर्स",
      filterRotavator: "रोटाव्हेटर्स",
      filterDrill: "पेरणी यंत्रे",
      filterSprayer: "फवारणी यंत्रे",
      filterHarvester: "हार्व्हेस्टर्स",
      filterThresher: "थ्रेशर्स",

      // Calculator Page
      calcTitle: "खरेदी विरूद्ध भाडे बचत गणक",
      calcSubtitle: "एग्री-शेअरद्वारे भाड्याने घेणे विरूद्ध खरेदी करण्याचे भांडवल, घसारा, व्याज आणि देखभाल खर्चाची तुलना करा.",
      calcSliderLabel: "वार्षिक वापर (तास प्रति वर्ष)",
      calcBuyCardTitle: "यंत्र खरेदी (भांडवल अडकवणे)",
      calcRentCardTitle: "एग्री-शेअर भाडे (वापरा तितकेच भरा)",
      calcSavingsCardTitle: "शेतकऱ्याची निव्वळ वार्षिक बचत",

      // Calendar Page
      calTitle: "पीक दिनदर्शिका आणि हंगामी शिफारसी",
      calSubtitle: "पेरणी आणि कापणीतील विलंब टाळण्यासाठी सर्वोत्तम हंगामी यंत्रसामग्री नियोजन.",

      // AI Page
      aiTitle: "🤖 शेतकरी AI — स्मार्ट कृषी सल्लागार",
      aiSubtitle: "शेतकऱ्यांसाठी कृत्रिम बुद्धिमत्ता आधारित यंत्र निवड, एकरनुसार वेळ अंदाज, खर्च बचत आणि व्हॉइस सल्ला.",
      aiRecTitle: "🌱 स्मार्ट पीक व यंत्र कॅल्क्युलेटर (AI Recommender)",
      aiRecSub: "आपले पीक, एकर, शेतीचा टप्पा आणि मातीचा प्रकार निवडा आणि वैज्ञानिक यंत्र निवड व खर्च बचत मिळवा.",
      lblAiCrop: "पिकाचा प्रकार",
      cropOptions: {
        wheat: "गहू (Wheat)",
        paddy: "भात / धान (Paddy)",
        cotton: "कापूस (Cotton)",
        sugarcane: "ऊस (Sugarcane)",
        soybean: "सोयाबीन (Soybean)"
      },
      lblAiStage: "शेतीचा टप्पा",
      stageOptions: {
        tillage: "नांगरणी व पूर्वतयारी (Tillage)",
        sowing: "अचूक पेरणी व लागवड (Sowing)",
        spraying: "पीक संरक्षण फवारणी (Spraying)",
        harvesting: "कापणी व अवशेष व्यवस्थापन (Harvesting)"
      },
      lblAiAcres: "जमीन (एकरमध्ये)",
      lblAiSoil: "मातीचा प्रकार",
      soilOptions: {
        black: "काळी भारी माती (Black Soil)",
        loam: "गाळाची सुपीक माती (Loam Soil)",
        sandy: "वाळूमिश्रित हलकी माती (Sandy Soil)",
        red: "लाल माती (Red Soil)"
      },
      btnCalcAi: "AI सल्ला मिळवा",
      aiQaTitle: "💬 विचारा शेतकरी AI (कृषी प्रश्न)",
      aiQaSub: "यंत्रसामग्री इंधन कार्यक्षमता, योग्य अवजारे निवड किंवा हंगामी वेळेबद्दल आपल्या भाषेत प्रश्न विचारा.",
      phAiQuery: "उदा. ट्रॅक्टर डिझेल खर्च कसा कमी करावा? किंवा प्रश्न टाइप करा...",
      btnQueryAsk: "विचारा",
      aiQuickTopics: "शेतकऱ्यांचे नेहमीचे प्रश्न (क्लिक करून विचारा):",
      aiEmptyPh: "वरील कोणत्याही प्रश्नावर क्लिक करा किंवा आपला प्रश्न टाइप करा. शेतकरी AI त्वरित वैज्ञानिक सल्ला देईल.",

      // About Page
      aboutTitle: "एग्री-शेअर प्रकल्पाविषयी",
      aboutSubtitle: "सामुदायिक शेअरिंग आणि डिजिटल पब्लिक इन्फ्रास्ट्रक्चरद्वारे ग्रामीण भारतातील शेती यांत्रिकीकरणाची दरी सांधणे."
    },

    gu: {
      langName: "ગુજરાતી",
      navHome: "હોમ",
      navFind: "સાધન શોધો",
      navList: "સાધન ઉમેરો",
      navAvailable: "ઉપલબ્ધ સાધનો",
      navCalculator: "બચત કેલ્ક્યુલેટર",
      navCalendar: "પાક કેલેન્ડર",
      navAi: "🤖 કિસાન AI",
      navAbout: "વિશે",
      portalOwner: "🚜 માલિક",
      portalFarmer: "🌾 ખેડૂત",
      tourChip: "✨ ટૂર",
      heroBadge: "🌱 ભારતીય કૃષિ યાંત્રિકીકરણમાં ડિજિટલ ક્રાંતિ",
      heroTitle: '<span class="highlight-text">AGRI-SHARE</span> સાધનો વહેંચો. ખર્ચ ઘટાડો. સાથે પ્રગતિ કરો.',
      heroSub: "નજીકના ખેતી સાધનો શોધો, જરૂર પડે ત્યારે ભાડે લો અને ખેતીનો ખર્ચ 80% સુધી ઘટાડીને દેવામુક્ત બનો.",
      btnTour: "✨ સંપૂર્ણ વેબસાઇટ ટૂર",
      btnFind: "🚜 સાધન શોધો",
      btnList: "➕ પોતાનું સાધન ઉમેરો",
      btnCalc: "💰 બચતની ગણતરી કરો",
      btnCalendar: "📅 પાક કેલેન્ડર",
      btnAi: "🤖 કિસાન AI સલાહકાર",
      statListings: "ઉપલબ્ધ સાધનો",
      statSavings: "સરેરાશ વાર્ષિક બચત",
      statReduction: "ખર્ચમાં ઘટાડો",
      findTitle: "ખેતીના સાધનો શોધો",
      listTitle: "તમારું ખેતી સાધન ભાડે આપવા નોંધણી કરો",
      availTitle: "ઉપલબ્ધ ખેતી સાધનો ડેટાબેઝ",
      calcTitle: "ખરીદી વિરુદ્ધ ભાડું બચત કેલ્ક્યુલેટર",
      calTitle: "પાક કેલેન્ડર અને મોસમી ભલામણો",
      aiTitle: "🤖 કિસાન AI — સ્માર્ટ કૃષિ સલાહકાર",
      aboutTitle: "એગ્રી-શેર પ્રોજેક્ટ વિશે"
    },

    pa: {
      langName: "ਪੰਜਾਬੀ",
      navHome: "ਹੋਮ",
      navFind: "ਮਸ਼ੀਨ ਲੱਭੋ",
      navList: "ਮਸ਼ੀਨ ਸ਼ਾਮਲ ਕਰੋ",
      navAvailable: "ਉਪਲਬਧ ਮਸ਼ੀਨਾਂ",
      navCalculator: "ਬਚਤ ਕੈਲਕੁਲੇਟਰ",
      navCalendar: "ਫ਼ਸਲ ਕੈਲੰਡਰ",
      navAi: "🤖 ਕਿਸਾਨ AI",
      navAbout: "ਬਾਰੇ",
      portalOwner: "🚜 ਮਸ਼ੀਨ ਮਾਲਕ",
      portalFarmer: "🌾 ਕਿਰਾਏਦਾਰ ਕਿਸਾਨ",
      tourChip: "✨ ਟੂਰ",
      heroBadge: "🌱 ਭਾਰਤੀ ਖੇਤੀ ਮਸ਼ੀਨੀਕਰਨ ਵਿੱਚ ਡਿਜੀਟਲ ਕ੍ਰਾਂਤੀ",
      heroTitle: '<span class="highlight-text">AGRI-SHARE</span> ਸੰਦ ਸਾਂਝੇ ਕਰੋ। ਖਰਚੇ ਘਟਾਓ। ਇਕੱਠੇ ਤਰੱਕੀ ਕਰੋ।',
      heroSub: "ਨੇੜਲੀਆਂ ਖੇਤੀ ਮਸ਼ੀਨਾਂ ਲੱਭੋ, ਲੋੜ ਪੈਣ 'ਤੇ ਕਿਰਾਏ 'ਤੇ ਲਓ ਅਤੇ ਖੇਤੀ ਖਰਚੇ 80% ਤੱਕ ਘਟਾ ਕੇ ਕਰਜ਼ਾ ਮੁਕਤ ਬਣੋ।",
      btnTour: "✨ ਪੂਰਾ ਵੈੱਬਸਾਈਟ ਟੂਰ",
      btnFind: "🚜 ਸੰਦ ਲੱਭੋ",
      btnList: "➕ ਆਪਣੀ ਮਸ਼ੀਨ ਦਰਜ ਕਰੋ",
      btnCalc: "💰 ਬਚਤ ਦਾ ਹਿਸਾਬ ਲਗਾਓ",
      btnCalendar: "📅 ਫ਼ਸਲ ਕੈਲੰਡਰ",
      btnAi: "🤖 ਕਿਸਾਨ AI ਸਲਾਹਕਾਰ",
      statListings: "ਉਪਲਬਧ ਸੰਦ ਸੂਚੀਆਂ",
      statSavings: "ਔਸਤ ਸਾਲਾਨਾ ਬਚਤ",
      statReduction: "ਖਰਚੇ ਵਿੱਚ ਕਟੌਤੀ",
      findTitle: "ਖੇਤੀਬਾੜੀ ਸੰਦ ਲੱਭੋ",
      listTitle: "ਆਪਣੀ ਮਸ਼ੀਨ ਕਿਰਾਏ 'ਤੇ ਦੇਣ ਲਈ ਦਰਜ ਕਰੋ",
      availTitle: "ਉਪਲਬਧ ਖੇਤੀ ਮਸ਼ੀਨਾਂ ਡਾਟਾਬੇਸ",
      calcTitle: "ਖਰੀਦ ਬਨਾਮ ਕਿਰਾਇਆ ਬਚਤ ਕੈਲਕੁਲੇਟਰ",
      calTitle: "ਫ਼ਸਲ ਕੈਲੰਡਰ ਅਤੇ ਮੌਸਮੀ ਸਿਫਾਰਸ਼ਾਂ",
      aiTitle: "🤖 ਕਿਸਾਨ AI — ਸਮਾਰਟ ਖੇਤੀਬਾੜੀ ਸਲਾਹਕਾਰ",
      aboutTitle: "ਐਗਰੀ-ਸ਼ੇਅਰ ਪ੍ਰੋਜੈਕਟ ਬਾਰੇ"
    }
  };

  function updateElementText(id, text) {
    const el = document.getElementById(id);
    if (el && text !== undefined) {
      el.innerHTML = text;
    }
  }

  function updateSelectorText(selector, text) {
    const el = document.querySelector(selector);
    if (el && text !== undefined) {
      el.innerHTML = text;
    }
  }

  function applyLanguage(langCode) {
    const validLangs = ["en", "hi", "mr", "gu", "pa"];
    if (!validLangs.includes(langCode)) langCode = "en";

    const dict = TRANSLATIONS[langCode] || TRANSLATIONS["en"];

    // 1. Sync dropdowns
    const mainSelect = document.getElementById("lang-select");
    const mobileSelect = document.querySelector(".mobile-lang-select");
    if (mainSelect && mainSelect.value !== langCode) mainSelect.value = langCode;
    if (mobileSelect && mobileSelect.value !== langCode) mobileSelect.value = langCode;

    // 2. Set document language
    document.documentElement.lang = langCode;
    localStorage.setItem("agrishare_lang", langCode);

    // 3. Navigation Bar Links
    updateElementText("nav-home", dict.navHome);
    updateElementText("nav-find", dict.navFind);
    updateElementText("nav-list", dict.navList);
    updateElementText("nav-available", dict.navAvailable);
    updateElementText("nav-calculator", dict.navCalculator);
    updateElementText("nav-calendar", dict.navCalendar);
    updateElementText("nav-ai", dict.navAi);
    updateElementText("nav-about", dict.navAbout);

    // 4. Header buttons & Portal pills
    updateSelectorText("#btn-header-owner-login .portal-label", dict.portalOwner.replace(/[^A-Za-z\u0900-\u0A7F ]/g, "").trim());
    updateSelectorText("#btn-header-farmer-login .portal-label", dict.portalFarmer.replace(/[^A-Za-z\u0900-\u0A7F ]/g, "").trim());
    updateSelectorText(".btn-tour-chip span", dict.tourChip);

    // 5. Hero Section
    updateSelectorText(".hero-badge", dict.heroBadge);
    updateSelectorText(".hero-title", dict.heroTitle);
    updateSelectorText(".hero-sub", dict.heroSub);

    updateSelectorText("#btn-hero-tour span:nth-child(2)", dict.btnTour.replace(/[^A-Za-z\u0900-\u0A7F ]/g, "").trim());
    updateSelectorText("#btn-hero-find", `<span>🚜</span> ${dict.btnFind.replace(/[^A-Za-z\u0900-\u0A7F ]/g, "").trim()}`);
    updateSelectorText("#btn-hero-list", `<span>➕</span> ${dict.btnList.replace(/[^A-Za-z\u0900-\u0A7F ]/g, "").trim()}`);
    updateSelectorText("#btn-hero-calc", `<span>💰</span> ${dict.btnCalc.replace(/[^A-Za-z\u0900-\u0A7F ]/g, "").trim()}`);
    updateSelectorText("#btn-hero-calendar", `<span>📅</span> ${dict.btnCalendar.replace(/[^A-Za-z\u0900-\u0A7F ]/g, "").trim()}`);

    const heroAiBtn = document.getElementById("btn-hero-ai");
    if (heroAiBtn) heroAiBtn.innerHTML = `<span>🤖</span> ${dict.btnAi}`;

    // Hero Stats labels
    const statPills = document.querySelectorAll(".hero-stats .stat-pill span");
    if (statPills.length >= 3) {
      statPills[0].innerText = dict.statListings;
      statPills[1].innerText = dict.statSavings;
      statPills[2].innerText = dict.statReduction;
    }

    // 6. Section Titles & Subtitles
    updateSelectorText("#page-find .page-title", dict.findTitle);
    updateSelectorText("#page-find .page-subtitle", dict.findSubtitle);
    updateSelectorText("#find-web-form-container .card-title", dict.findSearchCardTitle || dict.findTitle);

    updateSelectorText("#page-list .page-title", dict.listTitle);
    updateSelectorText("#page-list .page-subtitle", dict.listSubtitle);
    updateSelectorText("#list-web-form-container .card-title", dict.listCardTitle || dict.listTitle);

    updateSelectorText("#page-available .page-title", dict.availTitle);
    updateSelectorText("#page-available .page-subtitle", dict.availSubtitle);

    updateSelectorText("#page-calculator .page-title", dict.calcTitle);
    updateSelectorText("#page-calculator .page-subtitle", dict.calcSubtitle);

    updateSelectorText("#page-calendar .page-title", dict.calTitle);
    updateSelectorText("#page-calendar .page-subtitle", dict.calSubtitle);

    updateSelectorText("#page-about .page-title", dict.aboutTitle);
    updateSelectorText("#page-about .page-subtitle", dict.aboutSubtitle);

    // 7. Form Labels in Find & List
    updateSelectorText("label[for='find-village']", `${dict.lblVillage || 'Village / Location'} <span class="required">*</span>`);
    updateSelectorText("label[for='find-equipment']", `${dict.lblEquipRequired || 'Equipment Required'} <span class="required">*</span>`);
    updateSelectorText("label[for='find-farmer-name']", `${dict.lblFarmerName || 'Farmer Name (Hirer)'} <span class="required">*</span>`);
    updateSelectorText("label[for='find-contact']", `${dict.lblContactMobile || 'Contact Mobile'} <span class="required">*</span>`);
    updateSelectorText("label[for='find-date']", `${dict.lblRequiredDate || 'Required Date'} <span class="required">*</span>`);
    updateSelectorText("label[for='find-hours']", `${dict.lblRentalHours || 'Number of Rental Hours'} <span class="required">*</span>`);

    const btnSubmitSearch = document.getElementById("btn-submit-search");
    if (btnSubmitSearch) {
      btnSubmitSearch.innerHTML = `<span>🔍</span> ${dict.btnSearchSubmit || 'Search & Record in Sheet'}`;
    }

    updateSelectorText("label[for='list-owner-name']", `${dict.lblOwnerName || 'Owner Name'} <span class="required">*</span>`);
    updateSelectorText("label[for='list-village']", `${dict.lblVillage || 'Village / Location'} <span class="required">*</span>`);
    updateSelectorText("label[for='list-equipment-type']", `${dict.lblEquipType || 'Equipment Type'} <span class="required">*</span>`);
    updateSelectorText("label[for='list-rate']", `${dict.lblHourlyRate || 'Hourly Rental Rate'} <span class="required">*</span>`);
    updateSelectorText("label[for='list-contact']", `${dict.lblContactMobile || 'Contact Mobile'} <span class="required">*</span>`);

    const btnSubmitList = document.getElementById("btn-submit-listing");
    if (btnSubmitList) {
      btnSubmitList.innerHTML = `<span>➕</span> ${dict.btnListSubmit || 'Register Equipment in Database'}`;
    }

    // 8. Available Filter Pills
    const filterPills = document.querySelectorAll(".filter-pill");
    filterPills.forEach((pill) => {
      const text = pill.innerText;
      if (text.includes("All") || text.includes("सभी") || text.includes("सर्व")) pill.innerText = dict.filterAll || "All Machinery";
      else if (text.includes("Tractor") || text.includes("ट्रैक्टर")) pill.innerText = dict.filterTractor || "Tractors";
      else if (text.includes("Rotavator") || text.includes("रोटावेटर") || text.includes("रोटाव्हेटर")) pill.innerText = dict.filterRotavator || "Rotavators";
      else if (text.includes("Drill") || text.includes("ड्रिल")) pill.innerText = dict.filterDrill || "Seed Drills";
      else if (text.includes("Sprayer") || text.includes("स्प्रेयर") || text.includes("फवारणी")) pill.innerText = dict.filterSprayer || "Sprayers";
      else if (text.includes("Harvester") || text.includes("हार्वेस्टर") || text.includes("हार्व्हेस्टर")) pill.innerText = dict.filterHarvester || "Harvesters";
      else if (text.includes("Thresher") || text.includes("थ्रेशर")) pill.innerText = dict.filterThresher || "Threshers";
    });

    // 9. Floating Kisan AI Pill
    const floatAiText = document.querySelector("#floating-kisan-ai .ai-float-label");
    if (floatAiText) floatAiText.innerText = dict.navAi || "🤖 Kisan AI";

    // 10. AI Page Complete Translation
    updateSelectorText("#page-ai .page-title", dict.aiTitle);
    updateSelectorText("#page-ai .page-subtitle", dict.aiSubtitle);
    updateElementText("ai-recommender-title", dict.aiRecTitle || "🌱 Smart Crop & Machinery Sizing (AI Recommender)");
    updateElementText("ai-recommender-subtext", dict.aiRecSub || "Select your crop, acreage, farming stage, and soil type to get scientific machine sizing and instant cost savings.");
    updateElementText("lbl-ai-crop", `${dict.lblAiCrop || 'Crop Type'} <span class="required">*</span>`);
    updateElementText("lbl-ai-stage", `${dict.lblAiStage || 'Farming Stage'} <span class="required">*</span>`);
    updateElementText("lbl-ai-acres", `${dict.lblAiAcres || 'Farm Size in Acres'} <span class="required">*</span>`);
    updateElementText("lbl-ai-soil", `${dict.lblAiSoil || 'Soil Type'} <span class="required">*</span>`);
    updateElementText("btn-calc-ai-rec-text", dict.btnCalcAi || "Get Instant AI Recommendation");

    // Select options on AI page
    const cropSelect = document.getElementById("ai-crop-select");
    if (cropSelect && dict.cropOptions) {
      Object.keys(dict.cropOptions).forEach(k => {
        const opt = cropSelect.querySelector(`option[value="${k}"]`);
        if (opt) opt.innerText = dict.cropOptions[k];
      });
    }

    const stageSelect = document.getElementById("ai-stage-select");
    if (stageSelect && dict.stageOptions) {
      Object.keys(dict.stageOptions).forEach(k => {
        const opt = stageSelect.querySelector(`option[value="${k}"]`);
        if (opt) opt.innerText = dict.stageOptions[k];
      });
    }

    const soilSelect = document.getElementById("ai-soil-select");
    if (soilSelect && dict.soilOptions) {
      Object.keys(dict.soilOptions).forEach(k => {
        const opt = soilSelect.querySelector(`option[value="${k}"]`);
        if (opt) opt.innerText = dict.soilOptions[k];
      });
    }

    // AI Q&A Card
    updateElementText("ai-qa-title", dict.aiQaTitle || "💬 Ask Kisan AI (Agritech Questions)");
    updateElementText("ai-qa-subtext", dict.aiQaSub || "Ask questions about machinery fuel efficiency, implement selection, or seasonal crop timing in your language.");
    const queryInput = document.getElementById("ai-user-query");
    if (queryInput) queryInput.placeholder = dict.phAiQuery || "e.g. How to reduce tractor diesel consumption? Or ask your question...";
    updateElementText("btn-query-ask-text", dict.btnQueryAsk || "Ask (AI)");
    updateElementText("ai-quick-topics-label", `<span>💡 ${dict.aiQuickTopics || 'Quick Farmer Questions (Click to ask):'}</span>`);
    const emptyPh = document.getElementById("ai-empty-placeholder");
    if (emptyPh) emptyPh.innerHTML = `<span style="font-size: 2rem;">🌾</span><p>${dict.aiEmptyPh || 'Click any question above or type your query. Kisan AI will provide instant scientific advice.'}</p>`;

    // Notify listeners
    document.dispatchEvent(new CustomEvent("languageChanged", { detail: { lang: langCode, dict: dict } }));
  }

  // Global changeLanguage function
  window.changeLanguage = function (langCode) {
    applyLanguage(langCode);
    const dict = TRANSLATIONS[langCode] || TRANSLATIONS["en"];
    if (typeof showToast === "function") {
      showToast(`🌐 भाषा बदली: ${dict.langName} (${langCode.toUpperCase()})`, "success");
    }
  };

  // Auto initialize saved language on DOM load
  document.addEventListener("DOMContentLoaded", function () {
    const savedLang = localStorage.getItem("agrishare_lang") || "en";
    setTimeout(() => {
      applyLanguage(savedLang);
    }, 100);
  });

  window.TRANSLATIONS = TRANSLATIONS;
  window.applyLanguage = applyLanguage;
  window.getCurrentLanguage = function () {
    return localStorage.getItem("agrishare_lang") || "en";
  };

})();
