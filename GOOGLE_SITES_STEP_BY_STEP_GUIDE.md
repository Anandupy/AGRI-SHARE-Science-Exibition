# 🌾 AGRI-SHARE — Step-by-Step Google Sites, Google Forms & Google Sheets Implementation Guide

> **Grade 9–10 Science, Mathematics & Technology Exhibition Project**  
> **Approach:** No-Code Digital Public Infrastructure (DPI)  
> **Tools:** Google Sites + Google Forms (x2) + Google Sheets (x1)  
> **Project Account / Host:** `anandupy000@gmail.com`

---

## 📌 Index / Table of Contents
1. [Overview of Ma'am's No-Code Method](#1-overview-of-maams-no-code-method)
2. [STEP 1 — Create the Master Google Sheet Database](#step-1--create-the-master-google-sheet-database)
3. [STEP 2 — Create Google Form 1: "List Your Agricultural Equipment"](#step-2--create-google-form-1-list-your-agricultural-equipment)
4. [STEP 3 — Create Google Form 2: "Find Agricultural Equipment"](#step-3--create-google-form-2-find-agricultural-equipment)
5. [STEP 4 — Build the Website on Google Sites](#step-4--build-the-website-on-google-sites)
6. [STEP 5 — Build the "Find Equipment" Form Page](#step-5--build-the-find-equipment-form-page)
7. [STEP 6 — Build the "Available Equipment / Results" Page](#step-6--build-the-available-equipment--results-page)
8. [STEP 7 — Build the "List Equipment" Page](#step-7--build-the-list-equipment-page)
9. [STEP 10 — Build the "Savings Calculator" (Mathematical Model)](#step-10--build-the-savings-calculator-mathematical-model)
10. [⚡ 1-Click Automation via Google Apps Script (Fastest Method)](#-1-click-automation-via-google-apps-script-fastest-method)
11. [🗣️ Judge Presentation Script (3-Minute Exhibition Pitch)](#-judge-presentation-script-3-minute-exhibition-pitch)

---

## 1. Overview of Ma'am's No-Code Method

As guided by Ma'am in the WhatsApp tutorial images, for high school students (Grade 9–10), the **Google Ecosystem** is the cleanest and most practical way to demonstrate digital agricultural sharing:
* **Google Sites:** Free, drag-and-drop website builder with zero coding required.
* **Google Forms:** Two interactive forms for inputs:
  1. For **Equipment Owners** to register machinery.
  2. For **Hirers / Farmers** to search and request machinery.
* **Google Sheets:** The live cloud database (`AGRISHARE EQUIPMENT DATABASE`) storing availability, pricing, and calculating mathematical models.

---

## STEP 1 — Create the Master Google Sheet Database

### Instructions:
1. Open Google Drive using your account (`anandupy000@gmail.com`).
2. Click **New** → **Google Sheets** → **Blank spreadsheet**.
3. Rename the spreadsheet to:
   ```
   AGRISHARE EQUIPMENT DATABASE
   ```
4. Rename Sheet 1 to: `AGRISHARE_DATABASE`.
5. In **Row 1**, enter the exact column headers:

| ID | Equipment | Owner | Village | Distance | Rate/hr (₹) | Status | Contact Number |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|

6. Add the **10–12 simulated entries** matching Ma'am's exhibition table:

| ID | Equipment | Owner | Village | Distance | Rate/hr | Status | Contact Number |
|---|---|---|---|---|---|---|---|
| **E01** | Rotavator | Farmer A | Kalyan | 2 km | ₹800 | Available 🟢 | 9820112233 |
| **E02** | Tractor | Farmer B | Kalyan | 3 km | ₹1,200 | Available 🟢 | 9820334455 |
| **E03** | Seed Drill | Farmer C | Bhiwandi | 7 km | ₹600 | Booked 🔴 | 9820445566 |
| **E04** | Sprayer | Farmer D | Kalyan | 1 km | ₹300 | Available 🟢 | 9820123456 |
| **E05** | Harvester | Farmer E | Bhiwandi | 6 km | ₹1,500 | Available 🟢 | 9820667788 |
| **E06** | Rotavator | Farmer F | Dombivli | 5 km | ₹700 | Available 🟢 | 9820551122 |
| **E07** | Power Tiller | Farmer G | Ulhasnagar | 4 km | ₹450 | Available 🟢 | 9820773344 |
| **E08** | Tractor | Farmer H | Badlapur | 9 km | ₹1,100 | Booked 🔴 | 9820884455 |
| **E09** | Thresher | Farmer I | Kalyan | 3 km | ₹500 | Available 🟢 | 9820995566 |
| **E10** | Laser Land Leveller | Farmer J | Bhiwandi | 8 km | ₹900 | Available 🟢 | 9820226677 |

> 💡 **Shortcut:** You can also simply upload the pre-generated file [`AGRISHARE_EQUIPMENT_DATABASE.xlsx`](file:///c:/Users/anand/Downloads/Science-project/AGRISHARE_EQUIPMENT_DATABASE.xlsx) directly into Google Drive!

---

## STEP 2 — Create Google Form 1: "List Your Agricultural Equipment"

This form allows equipment owners with idle machinery to register:

1. Go to **Google Forms** (forms.google.com) → **Blank form**.
2. Title: `List Your Agricultural Equipment — AGRI-SHARE`
3. Description: `Intelligent Agricultural Equipment Sharing Platform. When you submit, your machine is added to the live database.`
4. Add the following questions:
   - **Q1:** `Owner Name` (Short answer, Required)
   - **Q2:** `Village / Location` (Dropdown, Required: *Kalyan, Bhiwandi, Thane, Dombivli, Ulhasnagar, Badlapur, Shahapur*)
   - **Q3:** `Equipment Type` (Dropdown, Required: *Rotavator, Tractor, Seed Drill, Sprayer, Harvester, Thresher, Power Tiller*)
   - **Q4:** `Rental rate per hour (₹)` (Short answer, Required)
   - **Q5:** `Available date` (Date, Required)
   - **Q6:** `Available hours` (Short answer, e.g. 6 hours)
   - **Q7:** `Contact number` (Short answer, 10-digit mobile, Required)
5. Link responses: Click **Responses** tab → **Link to Sheets** → Select existing spreadsheet → Choose `AGRISHARE EQUIPMENT DATABASE`.

---

## STEP 3 — Create Google Form 2: "Find Agricultural Equipment"

*(Matches Ma'am's Step 3 Image)*

This form allows farmers to search for equipment:

1. Go to **Google Forms** → **Blank form**.
2. Title: `Find Agricultural Equipment`
3. Description: `Enter your requirement to find available machinery near you.`
4. Add the questions:
   - **Q1:** `Farmer Name` (Short answer, Required)
   - **Q2:** `Village` (Dropdown: *Kalyan, Bhiwandi, Thane, Dombivli, Ulhasnagar, Badlapur*)
   - **Q3:** `Equipment required` (Dropdown: *Rotavator, Tractor, Seed Drill, Sprayer, Harvester, Thresher*)
   - **Q4:** `Required date` (Date, Required)
   - **Q5:** `Number of hours` (Short answer, Required, e.g. 4)
5. Link responses to the same spreadsheet `AGRISHARE EQUIPMENT DATABASE`.

---

## STEP 4 — Build the Website on Google Sites

*(Matches Ma'am's Step 4 Image)*

1. Go to **[sites.google.com](https://sites.google.com)** and click **Blank Site (+)**.
2. Enter the Site Name in the top left:
   ```
   AGRISHARE
   ```
3. Set the Banner Header:
   - **Title:** `AGRI-SHARE`
   - **Subtitle / Tagline:** `A Smart Agricultural Equipment Sharing Platform`
   - Banner background: Select an image of a tractor or lush farm field.
4. Add **Three Large Buttons** (using the *Button* widget in the right panel):
   - 🚜 Button 1: **`FIND EQUIPMENT`** → Links to page `/find-equipment`
   - ➕ Button 2: **`LIST EQUIPMENT`** → Links to page `/list-equipment`
   - 💰 Button 3: **`CALCULATE SAVINGS`** → Links to page `/calculate-savings`

---

## STEP 5 — Build the "Find Equipment" Form Page

*(Matches Ma'am's Step 5 Image)*

1. In Google Sites, click the **Pages** tab on the right side.
2. Click **+ (New page)** → Name it: `Find Equipment`.
3. In the right panel, click **Insert** → Scroll down to **Forms**.
4. Select your Google Form: **`Find Agricultural Equipment`**.
5. Drag and expand the form box to make it full width and tall so visitors can fill it in directly on the website without scrolling!

---

## STEP 6 — Build the "Available Equipment / Results" Page

*(Matches Ma'am's Step 6 & Image 4)*

1. Create a new page named: `Available Equipment`.
2. Add a **Text Box** header:
   ```
   🔍 AVAILABLE EQUIPMENT
   ```
3. Add a **⭐ Recommended Option Card** (Callout Box):
   * **Machine:** Rotavator (A01) — Farmer A
   * **Distance:** 2 km away (Kalyan)
   * **Rate:** ₹800 / hour
   * **Availability:** 🟢 Available
   * **4-Hour Estimated Cost:** ₹3,200
   * **Button:** `[ REQUEST EQUIPMENT ]`
4. Add the **Available Machinery Table**:
   * Insert a table or click **Insert** → **Sheets** → Select `AGRISHARE EQUIPMENT DATABASE`.
   * Display columns: Machine, Location, Distance, Rate, Status (🟢 Available / 🔴 Booked).

---

## STEP 10 — Build the "Savings Calculator" (Mathematical Model)

*(Matches Ma'am's Step 10 Image)*

1. Create a page named: `Calculate Savings`.
2. Insert a 2-column layout block:
   * **Left Side (Inputs):**
     * Machine purchase price: ₹5,00,000
     * Hours required per year: 30 hours
     * Hiring rate: ₹800 / hour
   * **Right Side (Calculation Output):**
     * 💰 **Annual hiring cost:** $30 \times ₹800 = \mathbf{₹24,000\text{ / year}}$
     * 🏷️ **Annual cost of ownership:**
       * Depreciation (10%): ₹50,000
       * Maintenance: ₹30,000
       * Storage & Fuel: ₹40,000
       * **Total Ownership:** $\mathbf{₹1,20,000\text{ / year}}$
     * 🏆 **Net Farmer Savings:** $₹1,20,000 - ₹24,000 = \mathbf{₹96,000\text{ (80\% saved!)}}$
     * ⚖️ **Break-Even Point:** $\frac{₹1,20,000}{₹800} = \mathbf{150\text{ hours/year}}$
3. Add the **Group Sharing Example Card**:
   > *"If a harvester costing ₹6,000 for a day's work is shared by 5 neighboring farmers:  
   > ₹6,000 ÷ 5 = **₹1,200 per farmer**"*

---

## ⚡ 1-Click Automation via Google Apps Script (Fastest Method)

If you do not want to create the Sheets and Forms manually, we have built a **1-Click Automation Script**:

1. Open [script.google.com](https://script.google.com/) while logged into your Google account.
2. Click **New project**.
3. Open [`GoogleAppsScript_AutoFormAndSheet.js`](file:///c:/Users/anand/Downloads/Science-project/GoogleAppsScript_AutoFormAndSheet.js) from this folder.
4. Copy the entire script and paste it into the Apps Script editor.
5. Click **Save** (💾) and then **Run** (▶️).
6. Authorize the permissions when prompted.
7. Within **10 seconds**, both Google Forms and the formatted Google Sheet with all formulas and data will appear in your Google Drive! The direct links will be printed in the Execution Log!

---

## 🗣️ Judge Presentation Script (3-Minute Exhibition Pitch)

Here is how you can explain the Google Sites + Forms + Sheets system to the judges:

### 1. Introduction (30 seconds)
> *"Respected judges, in India, 86% of farmers are smallholders who cannot afford heavy machinery costing ₹5 Lakh to ₹25 Lakh. Our project, **AGRI-SHARE**, uses Digital Public Infrastructure (DPI) to make agricultural mechanization affordable through a localized sharing economy."*

### 2. Demonstrating the No-Code Architecture (60 seconds)
> *"To ensure this platform can be deployed in any rural Panchayat without expensive software infrastructure, we implemented it using Google Sites, Google Forms, and Google Sheets:*
> * *On our **Google Sites** homepage, we have three simple buttons: Find Equipment, List Equipment, and Calculate Savings.*
> * *When a farmer clicks **'Find Equipment'**, they submit their village and requirement via Google Forms.*
> * *The search references our master **Google Sheet database**, which maintains real-time availability across local villages like Kalyan and Bhiwandi.*
> * *The system displays the nearest available machine with a green indicator, showing proximity and pricing."*

### 3. Demonstrating Mathematical Modeling (60 seconds)
> *"Next, we demonstrate our mathematical model under **'Calculate Savings'**:*
> * *A smallholder farmer only needs a rotavator for **30 hours per year**.*
> * *Buying the machine costs **₹1,20,000 per year** in depreciation and maintenance.*
> * *Hiring through Agri-Share at ₹800/hr costs only **₹24,000 per year**.*
> * *This saves the farmer **₹96,000 annually — an 80% cost reduction**!*
> * *Furthermore, mathematically the break-even threshold is **150 hours/year**, proving that purchasing is economically irrational for smallholders."*

### 4. Conclusion (30 seconds)
> *"Through this no-code Google system, any farmer with a basic smartphone can access modern machinery, stop debt traps, and accelerate rural mechanization in support of **Viksit Bharat 2047**."*

---

*Project files created and verified in: `c:\Users\anand\Downloads\Science-project\`*
