# AGRI-SHARE — A Smart Agricultural Equipment Sharing Platform
> **A Digital Public Infrastructure & School Science Exhibition Project**  
> *Primary Data Backend: Google Sheets & Google Forms (+ Google Apps Script Web App)*

---

## 1. Project Overview

- **Project Name:** AGRI-SHARE
- **Tagline:** A Smart Agricultural Equipment Sharing Platform
- **Objective:** Help small and marginal farmers find, rent, and share agricultural equipment (tractors, rotavators, seed drills, sprayers, harvesters, threshers) with nearby farmers instead of purchasing expensive machinery individually.

### Critical Technical Architecture
Google Forms and Google Sheets serve as the **authoritative data collection and storage system**.
- **Google Forms:** Collects equipment listing submissions and search requests.
- **Google Sheets:** Master equipment database storing machine records, hourly rental rates, locations, availability status, and contact information.
- **Google Apps Script:** Lightweight, zero-cost API layer providing live matching and search queries (`doGet` and `doPost`).
- **No Paid Backend:** Operates without SQL, Firebase, Supabase, MongoDB, or paid subscriptions.
- **Seamless Demo Mode:** Works out of the box with 14 simulated equipment records when Google Cloud URLs are unconfigured.

---

## 2. Visual Design & Theme

- **Theme Palette:**
  - Primary Green: `#237A3B` (Dark: `#164E24`, Hover: `#1E6832`)
  - Background: `#F7FAF5`
  - Earthy Beige Accents: `#F4EFE6`, `#EDE6D8`
  - Subtle Yellow / Gold Accents: `#EAB308`, `#FEF9C3`
- **Typography:** Outfit (headings) and Plus Jakarta Sans (body).
- **Visuals:** High-resolution machinery visuals for Rotavators, Tractors, Seed Drills, Sprayers, Harvesters, and Threshers.
- **Responsive Layout:** Optimized for mobile smartphones, tablets, laptops, and smart exhibition displays.

---

## 3. Website Navigation Structure

The website includes the 7 primary pages:

1. **Home (`#page-home`)**
   - Hero Section: *"Share Equipment. Reduce Costs. Grow Together."*
   - 4 Primary Call-to-Action buttons:
     - 🚜 **Find Equipment**
     - ➕ **List Your Equipment**
     - 💰 **Calculate Savings**
     - 📅 **Crop Calendar**
   - Active equipment listing counter.
   - Equipment categories with sample hourly rental rates.
   - 3-step AGRI-SHARE operational workflow.
   - Small & medium farmer benefits.
   - Featured recommended machine (**Rotavator A01** — 2 km, ₹800/hr, 4 hrs = ₹3,200).
   - Dynamic month indicator based on the user's current calendar date.
   - Educational simulation notice.

2. **Find Equipment (`#page-find`)**
   - Search parameters: Village, Equipment dropdown, Required date, Rental hours.
   - Exhibition Quick-Fill preset buttons for judges.
   - Live query connection to Google Apps Script or simulated local matching.
   - Equipment result cards displaying machine details, hourly rates, simulated distance, and estimated total costs.
   - Top recommended option highlight.
   - Equipment enquiry / rental modal.

3. **List Equipment (`#page-list`)**
   - Dual-mode interface:
     - **Interactive Web Form:** Submits directly to Google Apps Script or local storage.
     - **Embedded Google Form View:** Displays the published Google Form iframe.
   - Fields: Owner Name, Village, Equipment, Rental Rate per Hour, Available Date, Contact Number.
   - Step-by-step instructions on setting the Google Form response destination to Google Sheets.

4. **Available Equipment (`#page-available`)**
   - Responsive cards and interactive table view.
   - Live filters: Village, Equipment type, Availability status (🟢 Available, 🔴 Booked), Text search.
   - Dynamic rental hours estimator slider.
   - Featured recommended demo listing (Rotavator A01).
   - 1-click **Export to CSV** button (`AGRISHARE_EQUIPMENT_DATABASE.csv`).

5. **Cost Calculator (`#page-calculator`)**
   - Interactive mathematical cost comparison model:
     - **A. Rental Cost:** $\text{Annual Hiring Cost} = \text{Usage Hours} \times \text{Hiring Rate}$
     - **B. Estimated Ownership Cost:** $\text{Depreciation} = \frac{\text{Purchase Price}}{\text{Useful Life}}$, $\text{Ownership Cost} = \text{Depreciation} + \text{Maintenance} + \text{Operating}$
     - **C. Group Sharing:** $\text{Cost per Farmer} = \frac{\text{Ownership Cost}}{\text{Number of Farmers Sharing}}$
     - **D. Comparison & Savings:** Real-time net savings and percentage reduction.
   - Interactive Break-Even threshold meter.
   - Machine presets: Rotavator (₹5L), Tractor (₹8L), Harvester (₹22L), Sprayer (₹1.2L).
   - Comprehensive economic disclaimer and assumptions.

6. **Crop Calendar & Smart Seasonal Recommendations (`#page-calendar`)**
   - Prominently displays the current real-world month using JavaScript date logic.
   - Automatically highlights the matching agricultural period in the schedule table.
   - Month dropdown allowing interactive exploration of all 12 months.
   - Rule-based seasonal recommendations for Kharif, Rabi, and Zaid farming activities.
   - **"Find This Equipment"** buttons that navigate to the search page with the recommended machine preselected.
   - Clear agronomic disclaimer noting rule-based logic (not AI).

7. **About the Project (`#page-about`)**
   - Background on rural mechanization costs (₹5L to ₹25L) vs smallholding economics.
   - How equipment sharing converts fixed capital liabilities into flexible operational micro-rentals.
   - Architecture explaining Google Forms and Google Sheets integration.
   - Prototype limitations and official exhibition disclaimer.
   - Technical architecture diagram and configuration button.

---

## 4. Google Sheets Database Schema

Spreadsheet Title: **`AGRISHARE EQUIPMENT DATABASE`**  
Tab Name: **`EQUIPMENT_MASTER`**

### Exact 9 Column Headers:
| Col | Header Name | Description | Example |
|---|---|---|---|
| A | **ID** | Unique machine record code | `A01` |
| B | **Equipment** | Machinery category | `Rotavator` |
| C | **Owner** | Registered owner name | `Farmer A` |
| D | **Village** | Village location | `Village A` |
| E | **Rate/hr** | Rental rate per hour (₹) | `800` |
| F | **Status** | Availability state | `Available` / `Booked` |
| G | **Best Month** | Optimal agricultural season | `April–May` |
| H | **Available Date** | Ready date | `2026-10-15` |
| I | **Contact Number** | Private mobile number | `9820112233` |

### Sample Records (14 Records Included):
1. **A01** | Rotavator | Farmer A | Village A | ₹800 | Available | April–May | 2026-10-15 | 9820112233
2. **A02** | Tractor | Farmer B | Village B | ₹1,000 | Available | April–June | 2026-10-16 | 9820334455
3. **A03** | Seed Drill | Farmer C | Village A | ₹600 | Booked | June–July | 2026-10-17 | 9820445566
4. **A04** | Sprayer | Farmer D | Village C | ₹250 | Available | July–September | 2026-10-18 | 9820123456
5. **A05** | Harvester | Farmer E | Village B | ₹1,500 | Available | October–November | 2026-10-22 | 9820667788
6. **A06** | Thresher | Farmer F | Village A | ₹700 | Available | October–December | 2026-10-25 | 9820551122
7. **A07** | Rotavator | Farmer G | Village C | ₹750 | Available | November–December | 2026-10-20 | 9820773344
8. **A08** | Tractor | Farmer H | Village A | ₹1,100 | Available | October–November | 2026-10-21 | 9820884455
9. **A09** | Seed Drill | Farmer I | Village B | ₹650 | Available | November–December | 2026-10-23 | 9820995566
10. **A10** | Sprayer | Farmer J | Village B | ₹280 | Booked | January–February | 2026-10-19 | 9820226677
11. **A11** | Harvester | Farmer K | Village A | ₹1,600 | Available | March–April | 2026-10-24 | 9820337788
12. **A12** | Thresher | Farmer L | Village C | ₹750 | Available | March–April | 2026-10-26 | 9820448899
13. **A13** | Laser Land Leveller | Farmer M | Village A | ₹950 | Available | April–May | 2026-10-27 | 9820556677
14. **A14** | Power Tiller | Farmer N | Village B | ₹500 | Available | June–July | 2026-10-28 | 9820667788

*Note: Ready-to-import CSV file provided at `AGRISHARE_EQUIPMENT_DATABASE.csv` and Excel spreadsheet at `AGRISHARE_EQUIPMENT_DATABASE.xlsx`.*

---

## 5. Google Forms Specifications

### Form 1: "List Your Agricultural Equipment"
- **Title:** `List Your Agricultural Equipment`
- **Fields:**
  1. `Owner Name` (Short answer, Required)
  2. `Village` (Short answer / Dropdown, Required)
  3. `Equipment` (Dropdown: Tractor, Rotavator, Seed Drill, Sprayer, Harvester, Thresher, Laser Land Leveller, Power Tiller, Required)
  4. `Rental Rate per Hour (₹)` (Number, Required)
  5. `Available Date` (Date, Required)
  6. `Contact Number` (Short answer, Required)

### Form 2: "Find Agricultural Equipment"
- **Title:** `Find Agricultural Equipment`
- **Fields:**
  1. `Farmer Name` (Short answer, Required)
  2. `Village / Location` (Short answer / Dropdown, Required)
  3. `Equipment Required` (Dropdown, Required)
  4. `Required Date` (Date, Required)
  5. `Number of Rental Hours` (Number, Required)
  6. `Contact Number` (Short answer, Required)

---

## 6. Google Apps Script Setup & Deployment Instructions

File: **[`GoogleAppsScript_AutoFormAndSheet.js`](file:///c:/Users/anand/Downloads/Science-project/GoogleAppsScript_AutoFormAndSheet.js)**

### Step 1: Apps Script Project
Your active project is located at:
- **Project Editor:** [https://script.google.com/home/projects/1H8sEAAJRB4nngGcFCZF01YfK64ExmsKvB-sMcL6qKKI_p9iOqM_4TRTm/edit](https://script.google.com/home/projects/1H8sEAAJRB4nngGcFCZF01YfK64ExmsKvB-sMcL6qKKI_p9iOqM_4TRTm/edit)
- **Project ID:** `1H8sEAAJRB4nngGcFCZF01YfK64ExmsKvB-sMcL6qKKI_p9iOqM_4TRTm`

1. Open your project at the link above.
2. Replace the code in `Code.gs` with the entire content of [`GoogleAppsScript_AutoFormAndSheet.js`](file:///c:/Users/anand/Downloads/Science-project/GoogleAppsScript_AutoFormAndSheet.js).
3. Save the project (Ctrl + S).

### Step 2: Deploy as a Public Web App
1. Click **Deploy** -> **New deployment** (or **Manage deployments** -> **Edit** -> **New version**).
2. Select type: **Web app**.
3. Set **Description**: `AGRI-SHARE Live API`.
4. Set **Execute as**: `Me` (`anandupy000@gmail.com`).
5. Set **Who has access**: **`Anyone`** *(Essential so the website frontend can query Google Sheets without OAuth barriers)*.
6. Click **Deploy** and copy the **Web App URL** (`https://script.google.com/macros/s/.../exec`).

### Step 3: Link to Website Frontend
1. Open the website and click the **⚙️ Google Setup** button in the header.
2. View your pre-configured:
   - `GOOGLE_LIST_FORM_URL`
   - `GOOGLE_FIND_FORM_URL`
   - `GOOGLE_SHEET_ID`
   - `GOOGLE_APPS_SCRIPT_WEB_APP_URL`
   - `GOOGLE_APPS_SCRIPT_PROJECT_URL`
3. Click **Test API Connection** to verify live connectivity.
4. Mode is already set to **Live Google Sheets Mode** (`IS_DEMO_MODE: false`)!

---

## 7. Configuration (`config.js`)

Located in [`config.js`](file:///c:/Users/anand/Downloads/Science-project/config.js):
```javascript
const AGRI_CONFIG = {
  GOOGLE_LIST_FORM_URL: "https://docs.google.com/forms/d/1I7E9TC5GWZe3zW1pq5oYYA5kvLWUt7R_T4LCX9cTg0o/viewform",
  GOOGLE_FIND_FORM_URL: "https://docs.google.com/forms/d/1jl6irF4voY0xfR2z84rF4RvMiM8QdpphtqQ_Yjf--DY/viewform",
  GOOGLE_SHEET_ID: "1YWFbYnNSzicPHZG47rQhQ9tJ8-nJ0TBwJOQaaEnhUVE",
  GOOGLE_FIND_SHEET_ID: "1tOOZV862t1TowPh3Pj6gs3cueyesO62yaAGpfo5m-GY",
  GOOGLE_APPS_SCRIPT_WEB_APP_URL: "https://script.googleusercontent.com/macros/echo?user_content_key=...",
  GOOGLE_APPS_SCRIPT_PROJECT_URL: "https://script.google.com/home/projects/1H8sEAAJRB4nngGcFCZF01YfK64ExmsKvB-sMcL6qKKI_p9iOqM_4TRTm/edit",
  GOOGLE_APPS_SCRIPT_PROJECT_ID: "1H8sEAAJRB4nngGcFCZF01YfK64ExmsKvB-sMcL6qKKI_p9iOqM_4TRTm",
  IS_DEMO_MODE: false
};
```

---

## 8. School Science Exhibition Demonstration Checklist

For students presenting to judges and teachers:

- [ ] **Step 1: Introduction & Problem Context**  
  Open the **Home** page. Explain the 86% smallholder farmer demographic in India and how purchasing ₹5L–₹25L machinery leads to rural debt and underutilized equipment.
- [ ] **Step 2: Dynamic Agricultural Month**  
  Point out the dynamic month banner on the Home page (automatically evaluates current month, e.g. October) and seasonal Kharif/Rabi activity.
- [ ] **Step 3: Machine Search & Matching**  
  Navigate to **Find Equipment**. Click the preset button: `Rotavator (Village A - 4 hrs)`. Show the matched results, estimated cost (₹3,200), and top recommended option.
- [ ] **Step 4: Registering Equipment**  
  Navigate to **List Equipment**. Enter a new machine listing. Show how the listing assigns a new ID (`A15`) and immediately updates the database.
- [ ] **Step 5: Available Equipment & Live Filters**  
  Navigate to **Available Equipment**. Demonstrate filtering by village, status (🟢 Available / 🔴 Booked), and adjusting the rental duration slider to see real-time cost updates. Click `Export to CSV` to download the master sheet.
- [ ] **Step 6: Mathematical Cost Calculator**  
  Navigate to **Cost Calculator**. Show judges the break-even threshold (150 hours/yr) and how renting saves ₹96,000/year (80% cost reduction). Toggle the preset chips (Rotavator, Tractor, Harvester).
- [ ] **Step 7: Crop Calendar**  
  Navigate to **Crop Calendar**. Point out the highlighted active month row and click **"Find This Equipment"** to demonstrate cross-page linking.
- [ ] **Step 8: Google Cloud Backend Proof**  
  Open **Google Setup (⚙️)** in the header. Explain that Google Sheets remains the primary source of truth, requiring zero commercial cloud subscriptions.

---

## 9. Official Disclaimers

> **Exhibition Disclaimer:**  
> This is an educational prototype. Sample listings and some distance figures are simulated. Seasonal recommendations are rule-based and should be verified with local agricultural experts. Live equipment availability depends on the configured Google Sheets integration.
