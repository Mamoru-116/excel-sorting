function categorizeByAge() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var dataRange = sheet.getDataRange();
  var values = dataRange.getValues();

  var today = new Date(); // Get today's date
  
  var categories = {
    "1946-1964": [],
    "1965-1980": [],
    "1981-1996": [],
    "1997-2012": [],
  };

  for (var i = 1; i < values.length; i++) { // Assuming the first row contains headers
    var dob = new Date(values[i][0]);
    
    // sort for date (can change here based on your requirement/condition)
    if (!isNaN(dob.getDate())) { // Check if it's a valid date
      var age = today.getFullYear() - dob.getFullYear();
      
      if (age >= 59 && age <= 77) {
        categories["1946-1964"].push(values[i]);
      } else if (age >= 43 && age <= 58) {
        categories["1965-1980"].push(values[i]);
      } else if (age >= 27 && age <= 42) {
        categories["1981-1996"].push(values[i]);
      } else if (age >= 11 && age <= 26) { // Adjust the upper limit as needed
        categories["1997-2012"].push(values[i]);
      }
    }
  }

  // Clear the existing data below the header row
  sheet.getRange(2, 1, sheet.getLastRow() - 1, sheet.getLastColumn()).clearContent();

  // Sort and write the categorized data back to the sheet (ascending order)
  for (var category in categories) {
    categories[category].sort(function(a, b) {
      var dateA = new Date(a[0]);
      var dateB = new Date(b[0]);
      return dateA - dateB;
    });

    for (var j = 0; j < categories[category].length; j++) {
      sheet.appendRow(categories[category][j]);
    }
  }
}