const defaultSubjects = {
  1: [
    "English",
    "Mathematics I",
    "Digital Logic Systems",
    "Computer Fundamentals and Application",
    "Programming Logic and Techniques",
  ],
  2: [
    "Business Communication",
    "Mathematics II",
    "Financial Accounting I",
    "Programming Language in C",
    "Fundamentals of Electrical and Electronics",
    "Project I",
  ],
  3: [
    "Object Oriented Programming in C++",
    "Data Structure and Algorithms",
    "System Analysis and Design",
    "Financial Accounting II",
    "Microprocessor",
  ],
  4: [
    "Numerical Methods",
    "Visual Programming",
    "Operating Systems",
    "Database Management System",
    "Computer Graphics and Multimedia Technology",
    "Project II",
  ],
  5: [
    "Computer Architecture",
    "Java Programming",
    "Web Technology I",
    "Mathematical Foundation and Computer Science",
    "Software Engineering",
  ],
  6: [
    "Data Communication and Computer Network",
    "Fundamentals of Probability and Statistics",
    "Applied Economics",
    "Organization and Management",
    "Web Technology II",
    "Project III",
  ],
  7: [
    "E-Business",
    "Simulation and Modeling",
    "Linux",
    "Internship",
    "Elective I(.NET Programming)",
  ],
  8: [
    "Mobile Application and Development Technology",
    "Management Information System",
    "Elective II",
    "Project IV",
  ],
};

const defaultCredits = {
  1: [3, 3, 3, 3, 3],
  2: [3, 3, 3, 3, 3, 1],
  3: [3, 3, 3, 3, 3],
  4: [3, 3, 3, 3, 4, 2],
  5: [3, 3, 3, 3, 3],
  6: [3, 3, 3, 3, 3, 3],
  7: [3, 3, 3, 3, 3],
  8: [3, 3, 3, 4],
};

const gradeOptions = [
  "A",
  "A-",
  "B+",
  "B",
  "B-",
  "C+",
  "C",
  "C-",
  "D+",
  "D",
  "F",
];

// Function to handle semester form submission
function handleSemesterSubmit() {
  let semesterNumber = parseInt(
    document.getElementById("semesterNumber").value
  );

  // Validate input
  if (isNaN(semesterNumber) || semesterNumber < 1 || semesterNumber > 8) {
    alert("Please enter a valid semester number between 1 and 8.");
    return;
  }

  // Hide semester form
  document.getElementById("semesterForm").style.display = "none";

  // Display subject form
  document.getElementById("subjectForm").style.display = "block";

  // Populate subject form based on the selected semester
  populateSubjectForm(semesterNumber);
}
function populateSubjectForm(semesterNumber) {
  let numSubjects = defaultSubjects[semesterNumber].length;

  // Calculate total credits
  let totalCredits = defaultCredits[semesterNumber].reduce(
    (acc, credit) => acc + credit,
    0
  );

  // Generate table dynamically
  let tableHtml = "<table>";
  tableHtml +=
    '<thead><tr><th style="text-align:left;">Subject</th><th>Credit</th><th>Grade</th></tr></thead>';
  tableHtml += "<tbody>";

  // Generate table rows with default values for the selected semester
  for (let i = 0; i < numSubjects; i++) {
    tableHtml += `<tr>`;
    tableHtml += `<td>${defaultSubjects[semesterNumber][i]}</td>`;
    tableHtml += `<td>${defaultCredits[semesterNumber][i]}</td>`;
    tableHtml += `<td><select name="grade${i + 1}" required>`;

    // Populate grade options
    gradeOptions.forEach((option) => {
      tableHtml += `<option value="${option}">${option}</option>`;
    });

    tableHtml += `</select></td>`;
    tableHtml += `</tr>`;
  }

  tableHtml += "</tbody>";
  tableHtml += "</table>";

  // Add GPA calculation button
  tableHtml +=
    '<button class="submit-button" type="button" onclick="calculateCGPA()">Calculate GPA</button>';
  // Add Back button
  tableHtml +=
    '<button class="exit-button" type="button" onclick="handleBackButton()">Back</button>';
  // Display total credits
  tableHtml += `&nbsp;&nbsp;&nbsp;Total Credits: ${totalCredits}`;
  // Display table and GPA display
  document.getElementById("tableContainer").innerHTML = tableHtml;
  document.getElementById("gpaDisplay").innerHTML = ""; // Clear GPA display
}
// Function to calculate GPA
function calculateCGPA() {
  let semesterNumber = parseInt(
    document.getElementById("semesterNumber").value
  );
  let tableRows = document.querySelectorAll("tbody tr");
  let totalCredits = 0;
  let totalWeightedGradePoints = 0;

  // Iterate through table rows to calculate GPA
  tableRows.forEach((row, index) => {
    let grade = document
      .querySelector(`select[name=grade${index + 1}]`)
      .value.toUpperCase();
    let credit = defaultCredits[semesterNumber][index]; // Get credit from defaultCredits array

    // Validate grade and calculate grade points
    let gradePointMapping = {
      A: 4.0,
      "A-": 3.7,
      "B+": 3.3,
      B: 3.0,
      "B-": 2.7,
      "C+": 2.3,
      C: 2.0,
      "C-": 1.7,
      "D+": 1.3,
      D: 1.0,
      F: 0.0,
    };

    if (
      grade in gradePointMapping &&
      !isNaN(credit) &&
      credit >= 1 &&
      credit <= 4
    ) {
      let gradePoint = gradePointMapping[grade];
      totalWeightedGradePoints += gradePoint * credit;
      totalCredits += credit;
    } else {
      alert(
        `Invalid input detected for Subject ${
          index + 1
        }. Please enter valid values.`
      );
      return;
    }
  });

  // Calculate GPA only if there are valid credits
  if (totalCredits > 0) {
    let gpa = totalWeightedGradePoints / totalCredits;

    // Create GPA display HTML
    let gpaDisplay = `<p><strong>CGPA: ${gpa.toFixed(2)}</strong></p>`;

    // Replace existing GPA display
    document.getElementById("gpaDisplay").innerHTML = gpaDisplay;
  } else {
    alert("No valid credits entered to calculate GPA.");
  }
}
function handleBackButton() {
  // Show semester form
  document.getElementById("semesterForm").style.display = "block";

  // Hide subject form
  document.getElementById("subjectForm").style.display = "none";
}
