const content = document.getElementById("content");

// ================= NAVIGATION ===================
$(".menu").on("click", function () {
  $(".menu").removeClass("active");
  $(this).addClass("active");

  let page = $(this).data("page");

  if (page === "dashboard") renderDashboard();
  if (page === "students") renderStudents();
});


// ================= DASHBOARD DEFAULT ===================
function renderDashboard(){
  content.innerHTML = `
    <div class="stats">
      <div class="stat-card"><h3>15,000</h3><p>Students</p></div>
      <div class="stat-card"><h3>2,000</h3><p>Teachers</p></div>
      <div class="stat-card"><h3>5,600</h3><p>Parents</p></div>
      <div class="stat-card"><h3>$19,300</h3><p>Earnings</p></div>
    </div>

    <div class="charts">
      <div class="chart-box">
        <h3>Exam Results</h3>
        <canvas id="barChart"></canvas>
      </div>

      <div class="chart-box">
        <h3>Students</h3>
        <canvas id="donutChart"></canvas>
      </div>
    </div>

    <div class="table-section card">
      <h3>Star Students</h3>
      <table>
        <thead>
          <tr><th>Name</th><th>Marks</th><th>Percent</th></tr>
        </thead>
        <tbody>
          <tr><td>Evelyn Harper</td><td>172</td><td>95%</td></tr>
          <tr><td>Diana Perry</td><td>156</td><td>90%</td></tr>
          <tr><td>Mark Stone</td><td>143</td><td>88%</td></tr>
        </tbody>
      </table>
    </div>
  `;

  new Chart(document.getElementById('barChart'), {
    type: 'bar',
    data: {
      labels:["Jan","Feb","Mar","Apr","May","Jun"],
      datasets:[{ data:[45,32,60,55,72,80], borderWidth:1 }]
    }
  });

  new Chart(document.getElementById("donutChart"), {
    type: "doughnut",
    data: {
      labels:["Male","Female"],
      datasets:[{data:[8000,7000]}]
    }
  });
}


// ================= STUDENT CRUD ===================
let students = [
  {name:"Diva Nadia", major:"IT"},
  {name:"Hanif Fathiyya", major:"Nursing"}
];

function renderStudents(){
  content.innerHTML = `
    <h2>Students Management</h2>
    <button id="addBtn" class="btn btn-primary" style="margin:12px 0;">Add Student</button>

    <table>
      <thead>
        <tr><th>No</th><th>Fullname</th><th>Major</th><th>Action</th></tr>
      </thead>
      <tbody id="studentBody"></tbody>
    </table>

    <div id="modal" class="modal-box" style="display:none;">
      <div class="modal-content card" style="padding:18px;">
        <h3 id="modalTitle"></h3>
        <input type="hidden" id="editIndex">
        <input class="form-control" id="fullname" placeholder="Student Name">
        <input class="form-control" id="major" placeholder="Major" style="margin-top:10px;">
        <button id="saveBtn" class="btn btn-success" style="margin-top:15px;">Save</button>
      </div>
    </div>
  `;

  renderStudentTable();

  document.getElementById("addBtn").addEventListener("click", () => {
    document.getElementById("modal").style.display = "block";
    document.getElementById("modalTitle").innerText = "Add Student";
    document.getElementById("saveBtn").onclick = saveStudent;
  });
}

function renderStudentTable(){
  const body = document.getElementById("studentBody");
  body.innerHTML = "";
  students.forEach((s, i) => {
    body.innerHTML += `
      <tr>
        <td>${i+1}</td>
        <td>${s.name}</td>
        <td>${s.major}</td>
        <td>
          <button onclick="editStudent(${i})" class="btn btn-warning btn-sm">Edit</button>
          <button onclick="deleteStudent(${i})" class="btn btn-danger btn-sm">Delete</button>
        </td>
      </tr>
    `;
  });
}

function saveStudent(){
  let name = document.getElementById("fullname").value;
  let major = document.getElementById("major").value;
  students.push({name, major});
  document.getElementById("modal").style.display = "none";
  renderStudents();
}

function editStudent(index){
  let s = students[index];
  document.getElementById("modal").style.display = "block";
  document.getElementById("modalTitle").innerText = "Edit Student";
  document.getElementById("fullname").value = s.name;
  document.getElementById("major").value = s.major;

  document.getElementById("saveBtn").onclick = () => {
    students[index].name = document.getElementById("fullname").value;
    students[index].major = document.getElementById("major").value;
    document.getElementById("modal").style.display = "none";
    renderStudents();
  };
}

function deleteStudent(index){
  if(confirm("Are you sure?")) {
    students.splice(index,1);
    renderStudents();
  }
}


// load default
renderDashboard();
