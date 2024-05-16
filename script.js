var csvData = {};

var semesterSessions = {
  1: "2022 Spring",
  2: "2022 Fall",
  3: "2023 Spring",
  4: "2023 Fall",
  5: "2024 Spring",
  6: "2024 Fall",
  7: "2025 Spring",
  8: "2025 Fall",
};

function loadAllCSVFiles() {
  var csvURLs = [
    "https://raw.githubusercontent.com/aMmarkunwar/semR/main/semester1_results.csv?token=GHSAT0AAAAAACSLOZJURNGDPLO322XP266MZSFUGWA"
  ];

  Promise.all(csvURLs.map(fetchAndParseCSV))
    .then(function (results) {
      results.forEach(function (result, index) {
        csvData[
          "Semester " + (index + 1) + " - " + semesterSessions[index + 1]
        ] = result.data;
      });
    })
    .catch(function (error) {
      console.error("Error loading CSV files:", error);
    });
}

function fetchAndParseCSV(csvURL) {
  return new Promise(function (resolve, reject) {
    fetch(csvURL)
      .then((response) => response.text())
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: resolve,
          error: reject,
        });
      })
      .catch(reject);
  });
}

function searchAndDisplay() {
  document.getElementById("tableContainer").innerHTML = "";
  document.querySelector(".additional-content").innerHTML = "";

  var rollNumber = document.getElementById("searchInput").value;

  var dataFound = false;

  Object.keys(csvData).forEach(function (semester) {
    var rowData = csvData[semester].find(function (row) {
      return row["Roll Number"] === rollNumber;
    });

    if (rowData) {
      dataFound = true;

      var semesterBox = document.createElement("div");
      semesterBox.className = "semester-box rounded-box";

      var semesterHeading = document.createElement("h2");
      semesterHeading.textContent = semester;
      semesterBox.appendChild(semesterHeading);

      var table = document.createElement("table");

      Object.entries(rowData).forEach(function ([key, value]) {
        if (key !== "Roll Number") {
          var row = document.createElement("tr");

          var attributeNameCell = document.createElement("td");
          attributeNameCell.textContent = key;
          var attributeValueCell = document.createElement("td");
          attributeValueCell.textContent = value;

          if (key === "SGPA") {
            attributeValueCell.style.color = value === "-" ? "red" : "green";
          }

          row.appendChild(attributeNameCell);
          row.appendChild(attributeValueCell);
          table.appendChild(row);
        }
      });

      semesterBox.appendChild(table);
      document.getElementById("tableContainer").appendChild(semesterBox);
    }
  });

  if (!dataFound) {
    var messageParagraph = document.createElement("p");
    messageParagraph.textContent = "No Data Found";
    document.querySelector(".additional-content").appendChild(messageParagraph);
  }

  document.getElementById("tableContainer").classList.remove("hidden");
}
loadAllCSVFiles();
