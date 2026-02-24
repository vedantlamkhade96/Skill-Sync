function showSection(id) {
    document.querySelectorAll(".section").forEach(sec => sec.classList.remove("active"));
    document.getElementById(id).classList.add("active");
}

// ========== NAVIGATION ==========
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });

    document.getElementById(sectionId).classList.add('active');
}


// ========== STUDENT REGISTER ==========
function studentRegister() {

    const name = document.getElementById("sRegName").value;
    const email = document.getElementById("sRegEmail").value;
    const pass = document.getElementById("sRegPass").value;
    const branch = document.getElementById("sRegBranch").value;
    const interest = document.getElementById("sRegInterest").value;
    const skills = document.getElementById("sRegSkills").value;
    const cv = document.getElementById("sRegCV").value;

    if (!name || !email || !pass) {
        alert("Please fill all required fields!");
        return;
    }

    const student = {
        name,
        email,
        pass,
        branch,
        interest,
        skills,
        cv
    };

    localStorage.setItem("student_" + email, JSON.stringify(student));

    alert("Student Registered Successfully!");
}


// ========== STUDENT LOGIN ==========
function studentLogin() {

    const email = document.getElementById("sLoginEmail").value;
    const pass = document.getElementById("sLoginPass").value;

    const storedData = localStorage.getItem("student_" + email);

    if (!storedData) {
        alert("Student not found. Please register first.");
        return;
    }

    const student = JSON.parse(storedData);

    if (student.pass !== pass) {
        alert("Incorrect Password!");
        return;
    }

    // LOGIN SUCCESS
    alert("Login Successful!");

    // Hide register & login cards
    document.querySelectorAll("#student .card").forEach(card => {
        card.style.display = "none";
    });

    // Show Dashboard
    document.getElementById("dashboard").style.display = "block";

    // Show student details
    document.getElementById("studentDashboard").innerHTML = `
        <div class="card">
            <h3>Profile</h3>
            <p><b>Name:</b> ${student.name}</p>
            <p><b>Email:</b> ${student.email}</p>
            <p><b>Branch:</b> ${student.branch}</p>
            <p><b>Interest:</b> ${student.interest}</p>
            <p><b>Skills:</b> ${student.skills}</p>
        </div>
    `;
}
/* COLLEGE */
function collegeRegister() {
    let colleges = JSON.parse(localStorage.getItem("colleges")) || [];
    colleges.push({ name: colRegName.value, email: colRegEmail.value, password: colRegPass.value });
    localStorage.setItem("colleges", JSON.stringify(colleges));
    alert("College Registered");
}

function collegeLogin() {
    let colleges = JSON.parse(localStorage.getItem("colleges")) || [];
    let user = colleges.find(c => c.email === colLoginEmail.value && c.password === colLoginPass.value);
    if (user) collegeDashboard.innerHTML = `<div class="card">Welcome ${user.name}<br><button onclick="logout('collegeDashboard')">Logout</button></div>`;
    else alert("Invalid Login");
}

function filterStudents() {
    let students = JSON.parse(localStorage.getItem("students")) || [];
    let branch = filterBranch.value;
    let output = "";

    students.forEach(s => {
        if (s.branch === branch) {
            output += `<div class="card">${s.name} - ${s.skills}</div>`;
        }
    });

    collegeDashboard.innerHTML = output || "No students found.";
}

/* COMPANY */
function companyRegister() {
    let companies = JSON.parse(localStorage.getItem("companies")) || [];
    companies.push({ name: cRegName.value, email: cRegEmail.value, password: cRegPass.value, about: cRegAbout.value });
    localStorage.setItem("companies", JSON.stringify(companies));
    alert("Company Registered");
}

function companyLogin() {
    let companies = JSON.parse(localStorage.getItem("companies")) || [];
    let user = companies.find(c => c.email === cLoginEmail.value && c.password === cLoginPass.value);
    if (user) companyDashboard.innerHTML = `<div class="card">${user.name}<br>${user.about}<br><button onclick="logout('companyDashboard')">Logout</button></div>`;
    else alert("Invalid Login");
}

function matchStudents() {
    let students = JSON.parse(localStorage.getItem("students")) || [];
    let required = cRequiredSkills.value.toLowerCase().split(",").map(s => s.trim());
    let output = "";

    students.forEach(s => {
        let studentSkills = s.skills.toLowerCase().split(",").map(skill => skill.trim());
        if (required.some(skill => studentSkills.includes(skill))) {
            output += `<div class="card">${s.name} - ${s.skills}</div>`;
        }
    });

    companyDashboard.innerHTML = output || "No matching students found.";
}

function logout(id) {
    document.getElementById(id).innerHTML = "";
}
