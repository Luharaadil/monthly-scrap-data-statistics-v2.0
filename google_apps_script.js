const SPREADSHEET_ID = '1GHwq2tHt0ZDwuGHfTZSov6b2JgfURUKt7c8WLZWPGKs';
const SUMMARY_SHEET_NAME = 'ProductionSummary';
const SCRAP_SHEET_NAME = 'ScrapDetails';
const SETTINGS_SHEET_NAME = 'Settings'; // <-- Added to track custom settings

// Helper to cache the timezone and prevent rate limits in loops
let cachedTimeZone = '';
function getSheetTimeZone() {
  if (!cachedTimeZone) {
    cachedTimeZone = SpreadsheetApp.openById(SPREADSHEET_ID).getSpreadsheetTimeZone();
  }
  return cachedTimeZone;
}

function setupSheets() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let summarySheet = ss.getSheetByName(SUMMARY_SHEET_NAME);
  if (!summarySheet) {
    summarySheet = ss.insertSheet(SUMMARY_SHEET_NAME);
    summarySheet.appendRow(['Date', 'Shift', 'Timestamp', 'BIC Usage', 'BIC Scrap', 'PLY Usage', 'PLY Scrap', 'Rubber Usage', 'Rubber Scrap', 'RN Scrap', 'Chafer Usage', 'Chafer Scrap', 'Extrusion Rubber Usage', 'Mixing Rubber Usage']);
  }
  let scrapSheet = ss.getSheetByName(SCRAP_SHEET_NAME);
  if (!scrapSheet) {
    scrapSheet = ss.insertSheet(SCRAP_SHEET_NAME);
    // Added 'Reason for Scrap' to the end (Column J)
    scrapSheet.appendRow(['Date', 'Material', 'Weight', 'Reason', 'ImageURL', 'Shift', 'Section', 'MaterialName', 'Timestamp', 'Reason for Scrap']);
  }
  let settingsSheet = ss.getSheetByName(SETTINGS_SHEET_NAME);
  if (!settingsSheet) {
    settingsSheet = ss.insertSheet(SETTINGS_SHEET_NAME);
    settingsSheet.appendRow(['Key', 'Value']);
  }
}

function formatDateString(dateValue) {
  // Uses Spreadsheet timezone instead of Script timezone to prevent date-shifting
  if (dateValue instanceof Date) return Utilities.formatDate(dateValue, getSheetTimeZone(), 'yyyy-MM-dd');
  let str = String(dateValue).trim();
  if (str.match(/^\d{2}\/\d{2}\/\d{4}$/)) {
    const parts = str.split('/');
    return parts[2] + '-' + parts[1] + '-' + parts[0];
  }
  return str;
}

function doGet(e) {
  setupSheets();
  const action = e.parameter.action;
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const summarySheet = ss.getSheetByName(SUMMARY_SHEET_NAME);
  const scrapSheet = ss.getSheetByName(SCRAP_SHEET_NAME);
  
  // --- FETCH SETTINGS (CUSTOM DATE RANGES) ---
  if (action === 'getCustomRanges') {
    const settingsSheet = ss.getSheetByName(SETTINGS_SHEET_NAME);
    let ranges = null;
    if (settingsSheet) {
      const data = settingsSheet.getDataRange().getValues();
      for (let i = 1; i < data.length; i++) {
        if (data[i][0] === 'customMonthRanges') {
          try {
            ranges = JSON.parse(data[i][1]);
          } catch (e) {}
          break;
        }
      }
    }
    return ContentService.createTextOutput(JSON.stringify({ ranges: ranges })).setMimeType(ContentService.MimeType.JSON);
  }

  // --- NEW SNIPPET ADDED HERE ---
  if (action === 'getRawScrap') {
    // We use getDisplayValues() so weights/dates format nicely like CSV
    return ContentService.createTextOutput(JSON.stringify({ data: scrapSheet.getDataRange().getDisplayValues() })).setMimeType(ContentService.MimeType.JSON);
  }
  // ------------------------------

  if (action === 'getTargets') {
    const lastRow = summarySheet.getLastRow();
    let targets = [];
    if (lastRow >= 2) {
      const data = summarySheet.getRange("Z2:AB" + lastRow).getValues();
      targets = data.map(function(row) {
        return { category: row[0], period: row[1], value: row[2] };
      }).filter(function(t) { return t.category; });
    }
    let configs = [];
    if (lastRow >= 2) {
      const configData = summarySheet.getRange("AC2:AD" + lastRow).getValues();
      configs = configData.map(function(row) {
        return { id: String(row[0] || '').trim(), password: String(row[1] || '').trim() };
      }).filter(function(c) { return c.id && c.password; });
    }
    return ContentService.createTextOutput(JSON.stringify({targets: targets, configs: configs})).setMimeType(ContentService.MimeType.JSON);
  }

  if (action === 'getData' || action === 'getRangeData') {
    const startDate = e.parameter.date || e.parameter.startDate;
    const endDate = e.parameter.endDate || startDate;
    const summaries = [];
    const summaryData = summarySheet.getDataRange().getValues();
    for (let i = 1; i < summaryData.length; i++) {
      const rowDate = formatDateString(summaryData[i][0]);
      if (rowDate >= startDate && rowDate <= endDate) {
        summaries.push({
          date: rowDate, shift: summaryData[i][1], timestamp: summaryData[i][2],
          bicUsage: summaryData[i][3], bicScrap: summaryData[i][4],
          plyUsage: summaryData[i][5], plyScrap: summaryData[i][6],
          rubberUsage: summaryData[i][7], rubberScrap: summaryData[i][8],
          rnScrap: summaryData[i][9], rnGeneration: summaryData[i][9],
          chaferUsage: summaryData[i][10], chaferScrap: summaryData[i][11],
          extrusionRubberUsage: summaryData[i][12], mixingRubberUsage: summaryData[i][13] || summaryData[i][7]
        });
      }
    }
    const scraps = [];
    const scrapData = scrapSheet.getDataRange().getValues();
    for (let i = 1; i < scrapData.length; i++) {
      const rowDate = formatDateString(scrapData[i][0]);
      if (rowDate >= startDate && rowDate <= endDate) {
        scraps.push({
          date: rowDate, material: scrapData[i][1], weight: scrapData[i][2], reason: scrapData[i][3],
          imageUrl: scrapData[i][4], shift: scrapData[i][5] || '', section: scrapData[i][6] || '',
          materialName: scrapData[i][7] || '', timestamp: scrapData[i][8] || '', 
          mainReason: scrapData[i][9] || '' // Fetches data from Column J
        });
      }
    }
    return ContentService.createTextOutput(JSON.stringify({ summaries: summaries, scraps: scraps })).setMimeType(ContentService.MimeType.JSON);
  }
  return ContentService.createTextOutput(JSON.stringify({error: 'Invalid action'})).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  setupSheets();
  try {
    const data = JSON.parse(e.postData.contents);
    const action = data.action;
    if (action === 'saveSummary') return saveSummary(data);
    if (action === 'saveScrap') return saveScrap(data);
    if (action === 'saveTargets') return saveTargets(data.targets);
    if (action === 'updateScrapReason') return updateScrapReason(data);
    if (action === 'saveCustomRanges') return saveCustomRanges(data.ranges); // <-- Added this
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({error: error.toString()})).setMimeType(ContentService.MimeType.JSON);
  }
}

function saveCustomRanges(ranges) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName(SETTINGS_SHEET_NAME);
  const data = sheet.getDataRange().getValues();
  let rowIndex = -1;
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === 'customMonthRanges') {
      rowIndex = i + 1;
      break;
    }
  }
  const rangesStr = JSON.stringify(ranges);
  if (rowIndex > 0) {
    sheet.getRange(rowIndex, 2).setValue(rangesStr);
  } else {
    sheet.appendRow(['customMonthRanges', rangesStr]);
  }
  return ContentService.createTextOutput(JSON.stringify({ status: 'success' })).setMimeType(ContentService.MimeType.JSON);
}

function updateScrapReason(data) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName(SCRAP_SHEET_NAME);
  const rows = sheet.getDataRange().getValues();
  const timestamp = data.timestamp;
  const newReason = data.reason;
  
  for (let i = 1; i < rows.length; i++) {
    if (String(rows[i][8]) === String(timestamp)) {
      sheet.getRange(i + 1, 4).setValue(newReason); 
      return ContentService.createTextOutput(JSON.stringify({ status: 'success' })).setMimeType(ContentService.MimeType.JSON);
    }
  }
  return ContentService.createTextOutput(JSON.stringify({ error: 'Record not found' })).setMimeType(ContentService.MimeType.JSON);
}

function saveTargets(targets) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName(SUMMARY_SHEET_NAME);
  const lastRow = sheet.getLastRow();
  if (lastRow >= 2) sheet.getRange("Z2:AB" + lastRow).clearContent();
  const targetKeys = Object.keys(targets);
  const rows = targetKeys.map(key => [key, targets[key].period, targets[key].value]);
  if (rows.length > 0) sheet.getRange(2, 26, rows.length, 3).setValues(rows);
  return ContentService.createTextOutput(JSON.stringify({ status: 'success' })).setMimeType(ContentService.MimeType.JSON);
}

function saveSummary(data) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName(SUMMARY_SHEET_NAME);
  const rows = sheet.getDataRange().getValues();
  const dateStr = data.date; 
  const shift = data.shift || '';
  let rowIndex = -1;
  for (let i = 1; i < rows.length; i++) {
    if (formatDateString(rows[i][0]) === dateStr && String(rows[i][1] || '') === shift) {
      rowIndex = i + 1;
      break;
    }
  }
  if (rowIndex > 0) {
    const rowData = rows[rowIndex - 1];
    
    // Forces the date back into text format
    rowData[0] = "'" + dateStr; 

    if (data.timestamp) rowData[2] = data.timestamp;
    if (data.bicUsage !== undefined) rowData[3] = data.bicUsage;
    if (data.bicScrap !== undefined) rowData[4] = data.bicScrap;
    if (data.plyUsage !== undefined) rowData[5] = data.plyUsage;
    if (data.plyScrap !== undefined) rowData[6] = data.plyScrap;
    if (data.rubberUsage !== undefined) rowData[7] = data.rubberUsage;
    if (data.rubberScrap !== undefined) rowData[8] = data.rubberScrap;
    if (data.rnScrap !== undefined || data.rnGeneration !== undefined) rowData[9] = data.rnScrap || data.rnGeneration;
    if (data.chaferUsage !== undefined) rowData[10] = data.chaferUsage;
    if (data.chaferScrap !== undefined) rowData[11] = data.chaferScrap;
    if (data.extrusionRubberUsage !== undefined) rowData[12] = data.extrusionRubberUsage;
    if (data.mixingRubberUsage !== undefined) rowData[13] = data.mixingRubberUsage;
    sheet.getRange(rowIndex, 1, 1, rowData.length).setValues([rowData]);
  } else {
    sheet.appendRow(["'" + dateStr, shift, data.timestamp || new Date().toISOString(), data.bicUsage || 0, data.bicScrap || 0, data.plyUsage || 0, data.plyScrap || 0, data.rubberUsage || 0, data.rubberScrap || 0, data.rnScrap || data.rnGeneration || 0, data.chaferUsage || 0, data.chaferScrap || 0, data.extrusionRubberUsage || 0, data.mixingRubberUsage || 0]);
  }
  return ContentService.createTextOutput(JSON.stringify({ status: 'success' })).setMimeType(ContentService.MimeType.JSON);
}

function saveScrap(data) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const scrapSheet = ss.getSheetByName(SCRAP_SHEET_NAME);
  let imageUrl = '';
  if (data.imageBase64) {
    const folderIterator = DriveApp.getFoldersByName('ScrapImages');
    let folder = folderIterator.hasNext() ? folderIterator.next() : DriveApp.createFolder('ScrapImages');
    folder.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    const blob = Utilities.newBlob(Utilities.base64Decode(data.imageBase64.split(',')[1]), data.imageMimeType, 'scrap_' + new Date().getTime());
    imageUrl = folder.createFile(blob).getUrl();
  }
  // Added data.mainReason to the end to populate Column J
  scrapSheet.appendRow(["'" + data.date, data.material, data.weight, data.reason, imageUrl, data.shift || '', data.section || '', data.materialName || '', data.timestamp || '', data.mainReason || data.scrapReason || '']);
  
  const summarySheet = ss.getSheetByName(SUMMARY_SHEET_NAME);
  const summaryData = summarySheet.getDataRange().getValues();
  let rowIndex = -1;
  for (let i = 1; i < summaryData.length; i++) {
    if (formatDateString(summaryData[i][0]) === data.date && String(summaryData[i][1] || '') === (data.shift || '')) {
      rowIndex = i + 1;
      break;
    }
  }
  if (rowIndex > -1) {
    let colIndex = -1; 
    if (data.material === 'BIC') colIndex = 5;
    if (data.material === 'PLY') colIndex = 7;
    if (data.material === 'Rubber') colIndex = 9;
    if (data.material === 'RN') colIndex = 10;
    if (data.material === 'Chafer') colIndex = 12;
    if (colIndex > -1) {
      const currentVal = summarySheet.getRange(rowIndex, colIndex).getValue() || 0;
      summarySheet.getRange(rowIndex, colIndex).setValue(Number(currentVal) + Number(data.weight));
      summarySheet.getRange(rowIndex, 3).setValue(data.timestamp || new Date().toISOString());
    }
  } else {
    let newRow = ["'" + data.date, data.shift || '', data.timestamp || new Date().toISOString(), 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    if (data.material === 'BIC') newRow[4] = data.weight;
    if (data.material === 'PLY') newRow[6] = data.weight;
    if (data.material === 'Rubber') newRow[8] = data.weight;
    if (data.material === 'RN') newRow[9] = data.weight;
    if (data.material === 'Chafer') newRow[11] = data.weight;
    summarySheet.appendRow(newRow);
  }
  return ContentService.createTextOutput(JSON.stringify({success: true, imageUrl: imageUrl})).setMimeType(ContentService.MimeType.JSON);
}
