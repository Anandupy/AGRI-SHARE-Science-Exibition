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
 * EXACT GOOGLE SPREADSHEET IDs CONFIGURED:
 * 1. Master Equipment Database: '1YWFbYnNSZicPHZG47rQhQ9tJ8-nJ0TBwJOQaaEnhUVE' (gid: 1815109117)
 * 2. Find Equipment Requests:   '1tOOZV862t1TowPh3Pj6gs3cueyesO62yaAGpfo5m-GY'
 * =========================================================================================
 */

// Exact Google Apps Script Project ID
const APPS_SCRIPT_PROJECT_ID = '1H8sEAAJRB4nngGcFCZF01YfK64ExmsKvB-sMcL6qKKI_p9iOqM_4TRTm';

// Exact Sheet IDs from your Google Drive URLs
const MASTER_EQUIPMENT_SHEET_ID = '1YWFbYnNSZicPHZG47rQhQ9tJ8-nJ0TBwJOQaaEnhUVE';
const MASTER_EQUIPMENT_GID = 1815109117;
const FIND_RESPONSES_SHEET_ID = '1tOOZV862t1TowPh3Pj6gs3cueyesO62yaAGpfo5m-GY';

const TAB_MASTER = 'EQUIPMENT_MASTER';
const TAB_RESPONSES = 'Form Responses 1';

/**
 * Web App GET handler: Dynamically reads Google Form Responses + Master Sheet
 */
function doGet(e) {
  var action = (e && e.parameter && e.parameter.action) ? e.parameter.action : 'getAll';
  var targetSheetId = (e && e.parameter && e.parameter.sheetId) ? e.parameter.sheetId.trim() : MASTER_EQUIPMENT_SHEET_ID;
  
  // Clean sheet ID if full URL was accidentally passed
  if (targetSheetId.indexOf('/d/') !== -1) {
    var match = targetSheetId.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (match) targetSheetId = match[1];
  }

  try {
    // Open using target Sheet ID
    var ss = SpreadsheetApp.openById(targetSheetId);
    var allItems = [];
    var matchedTabName = '';

    // Helper: Find sheet by GID or Name or fallback
    function findTargetSheet(spreadsheet, targetGid, preferredNames) {
      var sheets = spreadsheet.getSheets();
      if (!sheets || sheets.length === 0) return null;

      // 1. Check by GID (e.g. 1815109117)
      if (targetGid) {
        for (var i = 0; i < sheets.length; i++) {
          if (sheets[i].getSheetId() === targetGid) {
            return sheets[i];
          }
        }
      }

      // 2. Check by preferred names
      for (var p = 0; p < preferredNames.length; p++) {
        var named = spreadsheet.getSheetByName(preferredNames[p]);
        if (named) return named;
      }

      // 3. Fallback to first sheet
      return sheets[0];
    }

    // 1. DYNAMICALLY READ MASTER / EQUIPMENT SHEET
    var equipSheet = findTargetSheet(ss, MASTER_EQUIPMENT_GID, [TAB_MASTER, TAB_RESPONSES, 'Form responses 1', 'Sheet1', 'Database']);
    
    if (equipSheet && equipSheet.getLastRow() >= 2) {
      matchedTabName = equipSheet.getName();
      var lastRow = equipSheet.getLastRow();
      var lastCol = Math.max(equipSheet.getLastColumn(), 7);
      
      // Read top rows to determine where headers are
      var sampleRows = equipSheet.getRange(1, 1, Math.min(lastRow, 6), lastCol).getValues();
      var headerRowIdx = 0; // 0-indexed
      var isTemplateFormat = false;

      // Check if row 4/5 has template headers (ID, Equipment Name, etc.)
      for (var r = 0; r < sampleRows.length; r++) {
        var rowText = sampleRows[r].join(' ').toLowerCase();
        if (rowText.indexOf('equipment') !== -1 || rowText.indexOf('tractor') !== -1 || rowText.indexOf('owner') !== -1) {
          headerRowIdx = r;
          if (r >= 3) isTemplateFormat = true;
          break;
        }
      }

      var dataStartRow = headerRowIdx + 2; // 1-indexed next row
      var totalDataRows = lastRow - dataStartRow + 1;

      if (totalDataRows > 0) {
        var rawData = equipSheet.getRange(dataStartRow, 1, totalDataRows, lastCol).getValues();
        
        for (var d = 0; d < rawData.length; d++) {
          var row = rawData[d];
          // Determine layout: Template (A=ID, B=Equip, C=Owner, D=Village, E=Rate) vs Form Response (A=Timestamp, B=Owner, C=Village, D=Equip, E=Rate)
          var itemEquip = '';
          var itemOwner = '';
          var itemVillage = '';
          var itemRate = 800;
          var itemStatus = 'Available';
          var itemDate = '';
          var itemContact = '';
          var itemId = 'EQ-' + ('0' + (d + 1)).slice(-2);

          if (isTemplateFormat || (row[0] && String(row[0]).match(/^[A-Z0-9_-]+$/i) && isNaN(row[0]))) {
            // Template style: Col 0:ID, 1:Equip, 2:Owner, 3:Village, 4:Rate, 5:Status, 6:Month, 7:Date, 8:Contact
            if (!row[1] && !row[2]) continue;
            itemId = String(row[0] || itemId);
            itemEquip = String(row[1] || 'Equipment').trim();
            itemOwner = String(row[2] || 'Farmer').trim();
            itemVillage = String(row[3] || 'Local Area').trim();
            itemRate = Number(row[4]) || 800;
            itemStatus = String(row[5] || 'Available').trim();
            itemDate = row[7] instanceof Date ? Utilities.formatDate(row[7], Session.getScriptTimeZone(), 'yyyy-MM-dd') : String(row[7] || '');
            itemContact = String(row[8] || '').trim();
          } else {
            // Form Response style: Col 0:Timestamp, 1:Owner, 2:Village, 3:Equip, 4:Rate, 5:Date, 6:Contact
            if (!row[1] && !row[3]) continue;
            itemOwner = String(row[1] || 'Farmer').trim();
            itemVillage = String(row[2] || 'Local Area').trim();
            itemEquip = String(row[3] || 'Equipment').trim();
            itemRate = Number(row[4]) || 800;
            itemDate = row[5] instanceof Date ? Utilities.formatDate(row[5], Session.getScriptTimeZone(), 'yyyy-MM-dd') : String(row[5] || '');
            itemContact = String(row[6] || '').trim();
          }

          allItems.push({
            id: itemId,
            equipment: itemEquip,
            owner: itemOwner,
            village: itemVillage,
            rate: itemRate,
            status: itemStatus,
            bestMonth: 'All Season',
            availableDate: itemDate,
            contact: itemContact,
            source: matchedTabName
          });
        }
      }
    }

    // 2. DYNAMICALLY READ GOOGLE FORM "FIND AGRICULTURAL EQUIPMENT" RESPONSES
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
      var isNearby = false;
      
      var matched = allItems.filter(function(item) {
        var matchEquip = !queryEquipment || queryEquipment === 'all' || item.equipment.toLowerCase().indexOf(queryEquipment) !== -1;
        var matchVill = !queryVillage || queryVillage === 'all' || item.village.toLowerCase().indexOf(queryVillage) !== -1;
        return matchEquip && matchVill;
      });

      // If village has 0 matches, show nearest matching equipment from nearby villages
      if (matched.length === 0 && queryEquipment && queryEquipment !== 'all') {
        matched = allItems.filter(function(item) {
          return item.equipment.toLowerCase().indexOf(queryEquipment) !== -1;
        });
        if (matched.length > 0) isNearby = true;
      }

      return jsonResponse({
        success: true,
        action: 'search',
        count: matched.length,
        isNearbyFallback: isNearby,
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
