

function clearCurrentSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getActiveSheet();
  const sheetName = sheet.getName();

  if (sheetName !== "cf_qc_output" && sheetName !== "raw_cf_output_paste") {
    SpreadsheetApp.getUi().alert("⚠️ This clear function only works in 'cf_qc_output' or 'raw_cf_output_paste'.");
    return;
  }

  const lastRow = sheet.getLastRow();
  if (lastRow < 2) {
    SpreadsheetApp.getUi().alert("⚠️ No data to clear.");
    return;
  }

  sheet.getRange(2, 1, lastRow - 1, 34).clearContent();

  SpreadsheetApp.getActiveSpreadsheet().toast(
    `🧹 Cleared rows 2 → ${lastRow} (columns A–AH) in ${sheetName}`,
    "QC Clear Status",
    5
  );
}
