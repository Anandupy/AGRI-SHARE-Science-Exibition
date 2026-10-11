/**
 * =========================================================================================
 * 🌾 AGRI-SHARE — GOOGLE APPS SCRIPT REST API BACKEND (EXACT ID VERSION)
 * Primary Backend Engine for School Science Exhibition & Real Agritech Deployment
 * Host Account: anandupy000@gmail.com
 * 
 * EXACT GOOGLE APPS SCRIPT PROJECT EDITOR:
 * Project URL: https://script.google.com/home/projects/1H8sEAAJRB4nngGcFCZF01YfK64ExmsKvB-sMcL6qKKI_p9iOqM_4TRTm/edit
 * Project ID:  '1H8sEAAJRB4nngGcFCZF01YfK64ExmsKvB-sMcL6qKKI_p9iOqM_4TRTm'
 * 
 * EXACT GOOGLE SPREADSHEET IDs CONFIGURED:
 * 1. Master Equipment Database: '1YWFbYnNSzicPHZG47rQhQ9tJ8-nJ0TBwJOQaaEnhUVE'
 * 2. Find Equipment Requests:   '1tOOZV862t1TowPh3Pj6gs3cueyesO62yaAGpfo5m-GY'
 * =========================================================================================
 */

// Exact Google Apps Script Project ID
const APPS_SCRIPT_PROJECT_ID = '1H8sEAAJRB4nngGcFCZF01YfK64ExmsKvB-sMcL6qKKI_p9iOqM_4TRTm';

// Exact Sheet IDs from your Google Drive URLs
const MASTER_EQUIPMENT_SHEET_ID = '1YWFbYnNSzicPHZG47rQhQ9tJ8-nJ0TBwJOQaaEnhUVE';
const FIND_RESPONSES_SHEET_ID = '1tOOZV862t1TowPh3Pj6gs3cueyesO62yaAGpfo5m-GY';

const TAB_MASTER = 'EQUIPMENT_MASTER';
const TAB_RESPONSES = 'Form Responses 1';

/**
 * Web App GET handler: Dynamically reads Google Form Responses + Master Sheet
 */
function doGet(e) {
  var action = (e && e.parameter && e.parameter.action) ? e.parameter.action : 'getAll';
  var targetSheetId = (e && e.parameter && e.parameter.sheetId) ? e.parameter.sheetId : MASTER_EQUIPMENT_SHEET_ID;
  
  try {
    // Open using target Sheet ID
    var ss = SpreadsheetApp.openById(targetSheetId);
    var allItems = [];

    // 1. DYNAMICALLY READ GOOGLE FORM RESPONSES (Tab: "Form Responses 1")
    // This reads whatever farmers submit through Google Form!
    var respSheet = ss.getSheetByName(TAB_RESPONSES) || ss.getSheetByName('Form responses 1') || ss.getSheetByName('Form Responses');
    if (respSheet && respSheet.getLastRow() >= 2) {
      var respLastRow = respSheet.getLastRow();
      // Columns: Timestamp(A) | Owner Name(B) | Village(C) | Equipment(D) | Rate(E) | Available Date(F) | Contact Number(G)
      var respData = respSheet.getRange(2, 1, respLastRow - 1, 7).getValues();

      for (var r = 0; r < respData.length; r++) {
        var row = respData[r];
        if (!row[1] && !row[3]) continue; // Skip empty row

        var dateVal = row[5];
        var dateStr = '';
        if (dateVal instanceof Date) {
          dateStr = Utilities.formatDate(dateVal, Session.getScriptTimeZone(), 'yyyy-MM-dd');
        } else {
          dateStr = String(dateVal || '');
        }

        var formId = 'F' + ('0' + (r + 1)).slice(-2);
        allItems.push({
          id: formId,
          equipment: String(row[3] || 'Equipment').trim(),
          owner: String(row[1] || 'Farmer').trim(),
          village: String(row[2] || 'Village A').trim(),
          rate: Number(row[4]) || 800,
          status: 'Available',
          bestMonth: 'All Season',
          availableDate: dateStr,
          contact: String(row[6] || ''),
          source: 'Google Form Response'
        });
      }
    }

    // 2. READ MASTER TAB (EQUIPMENT_MASTER) if present
    var masterSheet = ss.getSheetByName(TAB_MASTER);
    if (masterSheet && masterSheet.getLastRow() >= 5) {
      var masterLastRow = masterSheet.getLastRow();
      var rawData = masterSheet.getRange(5, 1, masterLastRow - 4, 9).getValues();

      for (var i = 0; i < rawData.length; i++) {
        var mRow = rawData[i];
        if (!mRow[0]) continue;
        
        var dStr = '';
        if (mRow[7] instanceof Date) {
          dStr = Utilities.formatDate(mRow[7], Session.getScriptTimeZone(), 'yyyy-MM-dd');
        } else {
          dStr = String(mRow[7]);
        }

        allItems.push({
          id: String(mRow[0]),
          equipment: String(mRow[1]).trim(),
          owner: String(mRow[2]).trim(),
          village: String(mRow[3]).trim(),
          rate: Number(mRow[4]) || 0,
          status: String(mRow[5]),
          bestMonth: String(mRow[6]),
          availableDate: dStr,
          contact: String(mRow[8]),
          source: 'Master Registry'
        });
      }
    }

    // 3. DYNAMICALLY READ GOOGLE FORM "FIND AGRICULTURAL EQUIPMENT" RESPONSES
    var allBookings = [];
    try {
      if (FIND_RESPONSES_SHEET_ID) {
        var findSs = SpreadsheetApp.openById(FIND_RESPONSES_SHEET_ID);
        var findSheet = findSs.getSheetByName(TAB_RESPONSES) || findSs.getSheetByName('Form responses 1') || findSs.getSheets()[0];
        if (findSheet && findSheet.getLastRow() >= 2) {
          var findRows = findSheet.getRange(2, 1, findSheet.getLastRow() - 1, Math.min(findSheet.getLastColumn(), 8)).getValues();
          for (var b = 0; b < findRows.length; b++) {
            var fRow = findRows[b];
            if (!fRow[1] && !fRow[3]) continue;
            var bDate = '';
            if (fRow[4] instanceof Date) {
              bDate = Utilities.formatDate(fRow[4], Session.getScriptTimeZone(), 'yyyy-MM-dd');
            } else {
              bDate = String(fRow[4] || '');
            }
            allBookings.push({
              token: 'GF-REQ-' + ('00' + (b + 1)).slice(-3),
              farmerName: String(fRow[1] || 'Farmer').trim(),
              village: String(fRow[2] || 'Village A').trim(),
              machineName: String(fRow[3] || 'Tractor').trim(),
              date: bDate,
              hours: Number(fRow[5]) || 4,
              farmerPhone: String(fRow[6] || '').trim(),
              rate: 800,
              total: (Number(fRow[5]) || 4) * 800,
              status: 'Confirmed',
              source: 'Google Form (Find Equipment)'
            });
          }
        }
      }
    } catch (findErr) {
      Logger.log("Find Sheet read warning: " + findErr);
    }

    // If query action is getBookings
    if (action === 'getBookings') {
      return jsonResponse({
        success: true,
        action: 'getBookings',
        count: allBookings.length,
        data: allBookings
      });
    }

    // If query action is search
    if (action === 'search') {
      var queryVillage = (e.parameter.village || '').trim().toLowerCase();
      var queryEquipment = (e.parameter.equipment || '').trim().toLowerCase();
      
      var matched = allItems.filter(function(item) {
        var matchEquip = !queryEquipment || queryEquipment === 'all' || item.equipment.toLowerCase().indexOf(queryEquipment) !== -1;
        var matchVill = !queryVillage || queryVillage === 'all' || item.village.toLowerCase().indexOf(queryVillage) !== -1;
        return matchEquip && matchVill;
      });

      return jsonResponse({
        success: true,
        action: 'search',
        count: matched.length,
        data: matched
      });
    }

    // Default: return all records + bookings
    return jsonResponse({
      success: true,
      action: 'getAll',
      sheetId: MASTER_EQUIPMENT_SHEET_ID,
      count: allItems.length,
      data: allItems,
      bookingsCount: allBookings.length,
      bookings: allBookings
    });

  } catch (err) {
    return jsonResponse({
      success: false,
      error: err.toString()
    });
  }
}

/**
 * Web App POST handler: Saves new listings or status updates directly to Google Sheets
 */
function doPost(e) {
  try {
    var body = {};
    if (e.postData && e.postData.contents) {
      body = JSON.parse(e.postData.contents);
    } else if (e.parameter) {
      body = e.parameter;
    }

    // 1. Status update from Farmer Portal
    if (body.action === 'updateStatus' && body.id && body.status) {
      var ss = SpreadsheetApp.openById(MASTER_EQUIPMENT_SHEET_ID);
      var sheet = ss.getSheetByName(TAB_MASTER) || ss.getActiveSheet();
      var lastRow = sheet.getLastRow();
      for (var r = 5; r <= lastRow; r++) {
        var rowId = sheet.getRange(r, 1).getValue();
        if (String(rowId).trim().toUpperCase() === String(body.id).trim().toUpperCase()) {
          var statusCell = sheet.getRange(r, 6);
          statusCell.setValue(body.status);
          if (body.status === 'Available') {
            statusCell.setBackground('#DCFCE7').setFontColor('#15803D');
          } else {
            statusCell.setBackground('#FEE2E2').setFontColor('#B91C1C');
          }
          return jsonResponse({ success: true, message: 'Status for ' + body.id + ' updated to ' + body.status });
        }
      }
    }

    // 2. New Booking enquiry submission
    if (body.action === 'createBooking') {
      try {
        var findSs = SpreadsheetApp.openById(FIND_RESPONSES_SHEET_ID);
        var findSheet = findSs.getSheetByName(TAB_RESPONSES) || findSs.getSheetByName('Form responses 1') || findSs.getSheets()[0];
        var bookingRow = [
          new Date(),
          body.farmerName || 'Farmer',
          body.village || 'Village A',
          body.equipment || body.machineName || 'Tractor',
          body.date || Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd'),
          Number(body.hours) || 4,
          body.farmerPhone || body.contact || '9820000000'
        ];
        findSheet.appendRow(bookingRow);
        return jsonResponse({ success: true, message: 'Booking recorded in Google Sheets!', data: bookingRow });
      } catch (errB) {
        return jsonResponse({ success: false, error: errB.toString() });
      }
    }

    // 3. Default: Insert new row into EQUIPMENT_MASTER
    var targetMasterSheetId = body.sheetId || MASTER_EQUIPMENT_SHEET_ID;
    var ssMaster = SpreadsheetApp.openById(targetMasterSheetId);
    var masterSheet = ssMaster.getSheetByName(TAB_MASTER) || ssMaster.getActiveSheet();
    var lastMasterRow = masterSheet.getLastRow();
    var nextId = 'A' + ('0' + (lastMasterRow - 4 + 1)).slice(-2);
    var newRow = [
      nextId,
      body.equipment || 'Tractor',
      body.owner || 'Farmer',
      body.village || 'Village A',
      Number(body.rate) || 800,
      body.status || 'Available',
      body.bestMonth || 'April–June',
      body.availableDate || Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd'),
      body.contact || '9820000000'
    ];

    masterSheet.appendRow(newRow);

    return jsonResponse({
      success: true,
      message: 'Equipment listed successfully in Google Sheets!',
      assignedId: nextId,
      record: newRow
    });

  } catch (err) {
    return jsonResponse({
      success: false,
      error: err.toString()
    });
  }
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
