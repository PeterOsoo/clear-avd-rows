function clearQCSheets() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const activeSheet = ss.getActiveSheet();
  const activeName = activeSheet.getName();
  const sheetNames = ["raw_cf_output_paste", "cf_qc_output"];

  // Check if the active sheet is one of the allowed sheets
  if (!sheetNames.includes(activeName)) {
    SpreadsheetApp.getUi().alert(
      `⚠️ Please switch to either "raw_cf_output_paste" or "cf_qc_output" before running this function.`
    );
    return;
  }

  const messages = [];

  sheetNames.forEach(name => {
    const sheet = ss.getSheetByName(name);

    if (!sheet) {
      messages.push(`⚠️ ${name}: sheet not found`);
      return;
    }

    // Get values only from columns A–AH
    const dataRange = sheet.getRange(2, 1, sheet.getMaxRows() - 1, 34);
    const values = dataRange.getValues();

    // Find the last row with actual content in A–AH
    let lastDataRow = 0;
    for (let i = values.length - 1; i >= 0; i--) {
      if (values[i].some(cell => cell !== "")) {
        lastDataRow = i + 2; // +2 because data starts at row 2
        break;
      }
    }

    if (lastDataRow < 2) {
      messages.push(`ℹ️ ${name}: no data to clear`);
      return;
    }

    sheet.getRange(2, 1, lastDataRow - 1, 34).clearContent();
    messages.push(`🧹 ${name}: cleared rows 2 → ${lastDataRow}`);
  });

  // Show toast for longer duration (10 seconds)
  ss.toast(messages.join("\n"), "QC Clear Status", 10);
}
