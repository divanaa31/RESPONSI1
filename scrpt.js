// === HANDLE MENU CLICK ===
$(document).on("click", ".menu", function (e) {
  e.preventDefault();

  $(".menu").removeClass("active");
  $(this).addClass("active");

  let page = $(this).data("page");
  loadPage(page);
});

// === STORAGE SEMENTARA ===
let teachersList = [
  { name: "Mrs. Jessica", subject: "Mathematics" },
  { name: "Mr. Daniel", subject: "Science" }
];

// === LOAD PAGE CONTENT ===
function loadPage(page) {
  let content = $("#content");

  // DASHBOARD
  if (page === "dashboard") {
    content.html(`
      <h2>Dashboard Overview</h2>

      <div class="stats">
        <div class="stat-card"><h3>650</h3><p>Total Students</p></div>
        <div class="stat-card"><h3>${teachersList.length}</h3><p>Total Teachers</p></div>
        <div class="stat-card"><h3>15</h3><p>New Admissions</p></div>
        <div class="stat-card"><h3>98%</h3><p>Attendance Rate</p></div>
      </div>

      <div class="charts">
        <div class="chart-box">
          <canvas id="studentChart"></canvas>
        </div>
        <div class="chart-box">
          <canvas id="financeChart"></canvas>
        </div>
      </div>
    `);

    loadCharts();
  }

  // STUDENTS
  else if (page === "students") {
    content.html(`
      <h2>Students List</h2>
      <div class="table-section">
        <button class="btn btn-primary mb-3">+ Add Student</button>

        <table>
          <thead>
            <tr><th>No</th><th>Name</th><th>Class</th><th>Action</th></tr>
          </thead>
          <tbody>
            <tr><td>1</td><td>Michael Brown</td><td>10-A</td>
              <td><button class="btn btn-warning btn-sm">Edit</button>
              <button class="btn btn-danger btn-sm">Delete</button></td></tr>

            <tr><td>2</td><td>Alisha Putri</td><td>9-B</td>
              <td><button class="btn btn-warning btn-sm">Edit</button>
              <button class="btn btn-danger btn-sm">Delete</button></td></tr>
          </tbody>
        </table>
      </div>
    `);
  }

  // TEACHERS (FIXED + ADD FEATURE)
  else if (page === "teachers") {
    loadTeachersPage();
  }

  // FINANCE
  else if (page === "finance") {
    content.html(`
      <h2>Finance Overview</h2>

      <div class="chart-box" style="max-width:400px;">
        <canvas id="financePie"></canvas>
      </div>
    `);

    loadFinanceChart();
  }

  // LIBRARY
  else if (page === "library") {
    content.html(`<h2>Library</h2><p>Library features coming soon...</p>`);
  }

  // ATTENDANCE
  else if (page === "attendance") {
    content.html(`<h2>Attendance</h2><p>Attendance data coming soon...</p>`);
  }

  // SETTINGS
  else if (page === "settings") {
    content.html(`<h2>Settings</h2><p>Manage system settings here.</p>`);
  }
}

// === TEACHERS PAGE FUNCTION ===
function loadTeachersPage() {
  let content = $("#content");

  // Generate table rows
  let rows = "";
  teachersList.forEach((t, i) => {
    rows += `
      <tr>
        <td>${i + 1}</td>
        <td>${t.name}</td>
        <td>${t.subject}</td>
        <td>
          <button class="btn btn-warning btn-sm" onclick="editTeacher(${i})">Edit</button>
          <button class="btn btn-danger btn-sm" onclick="deleteTeacher(${i})">Delete</button>
        </td>
      </tr>
    `;
  });

  // Render HTML
  content.html(`
    <h2>Teachers List</h2>

    <button class="btn btn-primary mt-2" id="addTeacherBtn">+ Add Teacher</button>

    <div class="table-section">
      <table>
        <thead>
          <tr><th>No</th><th>Name</th><th>Subject</th><th>Action</th></tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  `);

  // Event tombol add
  $("#addTeacherBtn").click(() => showAddTeacherModal());
}

// === MODAL TAMBAH GURU ===
function showAddTeacherModal() {
  $("body").append(`
    <div class="modal-box" id="teacherModal">
      <div class="modal-content">
        <h3>Add Teacher</h3>

        <label>Name</label>
        <input type="text" id="tName" class="form-control">

        <label class="mt-2">Subject</label>
        <input type="text" id="tSubject" class="form-control">

        <div class="flex justify-between mt-3">
          <button class="btn btn-danger" onclick="closeModal()">Cancel</button>
          <button class="btn btn-success" onclick="saveTeacher()">Save</button>
        </div>
      </div>
    </div>
  `);
}

function closeModal() {
  $("#teacherModal").remove();
}

// === SIMPAN GURU BARU ===
function saveTeacher() {
  let name = $("#tName").val();
  let subject = $("#tSubject").val();

  if (name === "" || subject === "") {
    alert("Please fill all fields!");
    return;
  }

  teachersList.push({ name, subject });

  closeModal();
  loadTeachersPage();
}

// === DELETE ===
function deleteTeacher(i) {
  if (confirm("Delete this teacher?")) {
    teachersList.splice(i, 1);
    loadTeachersPage();
  }
}

// === EDIT ===
function editTeacher(index) {
  let teacher = teachersList[index];

  $("body").append(`
    <div class="modal-box" id="teacherModal">
      <div class="modal-content">
        <h3>Edit Teacher</h3>

        <label>Name</label>
        <input type="text" id="tName" class="form-control" value="${teacher.name}">

        <label class="mt-2">Subject</label>
        <input type="text" id="tSubject" class="form-control" value="${teacher.subject}">

        <div class="flex justify-between mt-3">
          <button class="btn btn-danger" onclick="closeModal()">Cancel</button>
          <button class="btn btn-success" onclick="updateTeacher(${index})">Update</button>
        </div>
      </div>
    </div>
  `);
}

function updateTeacher(index) {
  teachersList[index].name = $("#tName").val();
  teachersList[index].subject = $("#tSubject").val();

  closeModal();
  loadTeachersPage();
}

// === CHARTS ===
function loadCharts() {
  new Chart(document.getElementById("studentChart"), {
    type: "line",
    data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May"],
      datasets: [{
        label: "New Students",
        data: [30, 45, 20, 50, 40],
        borderColor: "#6C63FF",
        tension: 0.4
      }]
    }
  });

  new Chart(document.getElementById("financeChart"), {
    type: "doughnut",
    data: {
      labels: ["Income", "Expense"],
      datasets: [{
        data: [7000, 3000],
        backgroundColor: ["#6C63FF", "#FF4C4C"]
      }]
    }
  });
}

function loadFinanceChart() {
  new Chart(document.getElementById("financePie"), {
    type: "pie",
    data: {
      labels: ["Tuition", "Books", "Events"],
      datasets: [{
        data: [5000, 1200, 800],
        backgroundColor: ["#6C63FF", "#FFC300", "#0FA958"]
      }]
    }
  });
}

// Load default
loadPage("dashboard");

