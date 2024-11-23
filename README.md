# Exporting habit tracker data Google Sheet > Apps Script
```js
function exportHabitTrackerData() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Habit tracker 2.0");
  
  const lastRow = sheet.getLastRow();
  const lastColumn = sheet.getLastColumn();

  const habitNames = sheet.getRange(1, 2, 1, lastColumn - 1).getValues()[0]; // B1:F1
  const dates = sheet.getRange(4, 1, lastRow - 3).getValues(); // A4:A
  const statuses = sheet.getRange(4, 2, lastRow - 3, lastColumn - 1).getValues(); // B4:FLastRow

  const habitsData = [];

  habitNames.forEach((habitName, habitIndex) => {
    if (!habitName) return; // Skip if habit name is empty

    const habitTracker = [];

    dates.forEach((date, rowIndex) => {
      const status = statuses[rowIndex][habitIndex];
      if (date[0] && status) {
        habitTracker.push({
          date: date[0],
          status: status
        });
      }
    });

    habitsData.push({
      habitName: habitName,
      habitTracker: habitTracker
    });
  });

  const json = JSON.stringify({ habitsData }, null, 2);

  // Save JSON to a file in Google Drive
  const fileName = "HabitTrackerData.json";
  const file = DriveApp.createFile(fileName, json, MimeType.PLAIN_TEXT);

  Logger.log(`JSON saved to Google Drive. File ID: ${file.getId()}`);
  return file.getId(); // Optionally return the file ID
}
```

# UI app
### Get material UI
```
npm install @mui/material @emotion/react @emotion/styled
```

# Useful code
### Parent - Child, Child - Child state relationships
```
https://chatgpt.com/share/673f909a-89c8-8005-ab01-899ce80f8736
```