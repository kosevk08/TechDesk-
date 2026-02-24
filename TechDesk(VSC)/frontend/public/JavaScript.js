/* ===== GLOBALS ===== */
const app = document.getElementById("app");
let currentUser = null;
let canvas,
  ctx,
  drawing = false;
let tool = "pen",
  size = 3;
let currentSubject = "";
let currentStudentForTeacher = "";
let replyToStudent = null; // за отговори на учител

/* ===== DATA ===== */
const data = {
  students: {
    alex: {
      class: "10А",
      subjects: {
        Математика: {
          lessonsTaken: ["Математика"],
          material: "10А Математика – уравнения"
        },
        Български: {
          lessonsTaken: ["Български"],
          material: "10А Български – правопис"
        }
      },
      absences: 2,
      focus: "Математика – дроби",
      parent: "parent_alex",
      tests: ["Дроби", "Правопис", "Средновековие"]
    },
    maria: {
      class: "10Б",
      subjects: {
        Математика: {
          lessonsTaken: ["Математика"],
          material: "10Б Математика – геометрия"
        },
        Български: {
          lessonsTaken: ["Български"],
          material: "10Б Български – граматика"
        }
      },
      absences: 0,
      focus: "Български – правопис",
      parent: "parent_maria",
      tests: ["Геометрия", "Съчинение"]
    },
    ivan: {
      class: "10А",
      subjects: {
        Математика: {
          lessonsTaken: ["Математика"],
          material: "10А Математика – дроби"
        },
        История: {
          lessonsTaken: ["История"],
          material: "10А История – Средновековие"
        }
      },
      absences: 1,
      focus: "История – Средновековие",
      parent: "parent_ivan",
      tests: ["Дроби", "Средновековие"]
    },
    victor: {
      class: "11Д",
      subjects: {
        Математика: {
          lessonsTaken: ["Математика"],
          material: "11Д Математика – деление"
        },
        Български: {
          lessonsTaken: ["Български"],
          material: "11Д Български – литература"
        }
      },
      absences: 1,
      focus: "Математика – деление",
      parent: "parent_victor",
      tests: ["Деление", "Анализ"]
    },
    kosio: {
      class: "11Д",
      subjects: {
        Математика: {
          lessonsTaken: ["Математика"],
          material: "11Д Математика – дроби"
        },
        Физика: {
          lessonsTaken: ["Физика"],
          material: "11Д Физика – сила и движение"
        }
      },
      absences: 2,
      focus: "Физика – енергия",
      parent: "parent_kosio",
      tests: ["Дроби", "Енергия"]
    },
    sofia: {
      class: "10В",
      subjects: {
        Български: {
          lessonsTaken: ["Български"],
          material: "10В Български – граматика"
        },
        Химия: { lessonsTaken: ["Химия"], material: "10В Химия – елементи" }
      },
      absences: 0,
      focus: "Химия – елементи",
      parent: "parent_sofia",
      tests: ["Граматика", "Елементи"]
    },
    peter: {
      class: "11А",
      subjects: {
        Физика: {
          lessonsTaken: ["Физика"],
          material: "11А Физика – сила и движение"
        },
        Математика: {
          lessonsTaken: ["Математика"],
          material: "11А Математика – интеграли"
        }
      },
      absences: 1,
      focus: "Математика – интеграли",
      parent: "parent_peter",
      tests: ["Сила", "Интеграли"]
    },
    elena: {
      class: "11Б",
      subjects: {
        Български: {
          lessonsTaken: ["Български"],
          material: "11Б Български – литература"
        },
        История: {
          lessonsTaken: ["История"],
          material: "11Б История – съвременна история"
        }
      },
      absences: 0,
      focus: "Български – литература",
      parent: "parent_elena",
      tests: ["Литература", "Съвременна история"]
    }
  },
  parents: {
    parent_alex: { child: "alex", username: "parent_alex", password: "1234" },
    parent_maria: {
      child: "maria",
      username: "parent_maria",
      password: "1234"
    },
    parent_ivan: { child: "ivan", username: "parent_ivan", password: "1234" },
    parent_victor: {
      child: "victor",
      username: "parent_victor",
      password: "1234"
    },
    parent_kosio: {
      child: "kosio",
      username: "parent_kosio",
      password: "1234"
    },
    parent_sofia: {
      child: "sofia",
      username: "parent_sofia",
      password: "1234"
    },
    parent_peter: {
      child: "peter",
      username: "parent_peter",
      password: "1234"
    },
    parent_elena: { child: "elena", username: "parent_elena", password: "1234" }
  },
  users: {
    alex: "1234",
    maria: "1234",
    ivan: "1234",
    victor: "1234",
    kosio: "1234",
    sofia: "1234",
    peter: "1234",
    elena: "1234",
    teacher: "1234",
    parent_alex: "1234",
    parent_maria: "1234",
    parent_ivan: "1234",
    parent_victor: "1234",
    parent_kosio: "1234",
    parent_sofia: "1234",
    parent_peter: "1234",
    parent_elena: "1234"
  },
  messages: {} // тук ще се пазят съобщенията per student
};

/* ===== LOCAL STORAGE ===== */
function saveNotebook(studentName, subject, content) {
  if (!studentName || !subject) return;
  let allData = JSON.parse(localStorage.getItem("techdesk_notebooks") || "{}");
  if (!allData[studentName]) allData[studentName] = {};
  allData[studentName][subject] = content;
  localStorage.setItem("techdesk_notebooks", JSON.stringify(allData));
}
function loadNotebook(studentName, subject) {
  let allData = JSON.parse(localStorage.getItem("techdesk_notebooks") || "{}");
  return allData[studentName]?.[subject] || "";
}

/* ===== LOGIN / LOGOUT ===== */
function showLogin() {
  app.innerHTML = `<div class="card" style="max-width:300px;margin:40px auto">
    <h2>Вход</h2>
    <input id="u" placeholder="Потребител">
    <input id="p" type="password" placeholder="Парола">
    <button onclick="login()">Вход</button>
  </div>`;
}
function login() {
  const username = document.getElementById("u").value;
  const password = document.getElementById("p").value;
  if (data.users[username] && data.users[username] === password) {
    currentUser = username;
    loadProfile();
  } else alert("Грешка: неправилен потребител или парола");
}
function logout() {
  currentUser = null;
  showLogin();
}

/* ===== PROFILE SWITCH ===== */
function loadProfile() {
  if (data.students[currentUser]) loadStudent(currentUser);
  else if (currentUser.startsWith("parent_")) loadParent(currentUser);
  else if (currentUser === "teacher") loadTeacher();
}

/* ===== STUDENT VIEW ===== */
function loadStudent(username) {
  const s = data.students[username];
  app.innerHTML = `
  <div class="screen">
    <h1>Здравей, ${username.charAt(0).toUpperCase() + username.slice(1)}</h1>
    <p>Клас: ${s.class}</p>
    <div class="dashboard">
      ${Object.keys(s.subjects)
        .map(
          (sub) => `
        <div class="card">
          <h3>${sub}</h3>
          <p>Взети уроци: ${s.subjects[sub].lessonsTaken.join(", ")}</p>
          <button onclick="openStudy('${sub}')">Учебник + Тетрадка</button>
        </div>`
        )
        .join("")}
    </div>
    <div class="card">
      <h3>📝 Предстоящи тестове</h3>
      <ul>${s.tests.map((t) => `<li>${t}</li>`).join("")}</ul>
    </div>
    <button onclick="openChat()">💬 Обратна връзка</button>
  </div>`;
}

/* ===== PARENT VIEW ===== */
function loadParent(username) {
  const childName = data.parents[username].child;
  const s = data.students[childName];
  app.innerHTML = `
  <div class="screen">
    <h1>Родителски профил – ${childName}</h1>
    <p>Клас: ${s.class}</p>
    <div class="dashboard">
      ${Object.keys(s.subjects)
        .map(
          (sub) => `
        <div class="card">
          <h3>${sub}</h3>
          <p>Взети уроци: ${s.subjects[sub].lessonsTaken.join(", ")}</p>
          <button onclick="openStudy('${sub}')">Виж тетрадка</button>
        </div>`
        )
        .join("")}
    </div>
    <div class="card">
      <h3>📝 Предстоящи тестове</h3>
      <ul>${s.tests.map((t) => `<li>${t}</li>`).join("")}</ul>
    </div>
    <button onclick="openChat()">💬 Връзка с учител</button>
  </div>`;
}

/* ===== TEACHER VIEW ===== */
function loadTeacher() {
  const studentList = Object.keys(data.students);
  app.innerHTML = `
  <div class="screen">
    <h1>Учител</h1>
    ${studentList
      .map((name) => {
        const s = data.students[name];
        return `<div class="card">
        <h3>${name.charAt(0).toUpperCase() + name.slice(1)} – Клас ${
          s.class
        }</h3>
        ${Object.keys(s.subjects)
          .map(
            (sub) => `
          <p>${sub} – Взети уроци: ${s.subjects[sub].lessonsTaken.join(
              ", "
            )}</p>
          <button onclick="openStudyForTeacher('${name}','${sub}')">Виж ${sub}</button>
        `
          )
          .join("")}
        <p>Предстоящи тестове: ${s.tests.join(", ")}</p>
        <button onclick="setReplyStudent('${name}')">Отговори на ${name}</button>
      </div>`;
      })
      .join("")}
    <button onclick="openChat()">💬 Обратна връзка с ученици</button>
  </div>`;
}

/* ===== SET REPLY STUDENT ===== */
function setReplyStudent(studentName) {
  replyToStudent = studentName;
  alert(`Учителят ще отговаря на ${studentName}`);
}

/* ===== OPEN STUDY FOR TEACHER ===== */
function openStudyForTeacher(studentName, subject) {
  currentStudentForTeacher = studentName;
  openStudy(subject);
}

/* ===== STUDY VIEW ===== */
function openStudy(subject) {
  currentSubject = subject;
  const studentName = currentUser.startsWith("parent_")
    ? data.parents[currentUser].child
    : currentUser === "teacher"
    ? currentStudentForTeacher
    : currentUser;
  const s = data.students[studentName];
  const notebookContent = loadNotebook(studentName, subject);
  const bg = subject === "Математика" ? "grid" : "lines";
  app.innerHTML = `
  <div class="screen">
    <h2>${subject} – ${
    studentName.charAt(0).toUpperCase() + studentName.slice(1)
  }</h2>
    <div class="toolbar">
      <button onclick="setTool('pen')">✏️</button>
      <button onclick="setTool('highlighter')">🖍️</button>
      <button onclick="setTool('eraser')">🧽</button>
      <button onclick="setSize(2)">Тънко</button>
      <button onclick="setSize(6)">Дебело</button>
    </div>
    <div class="split">
      <div class="card" style="overflow:auto; height:400px;">
        <h3>📘 Учебник</h3>
        <p>${s.subjects[subject].material}</p>
      </div>
      <div class="card notebook-container ${bg}" id="notebook-bg">
        <canvas id="note"></canvas>
      </div>
    </div>
    <button onclick="saveAndExit()">⬅ Назад</button>
  </div>`;
  setupCanvas();
  if (notebookContent) {
    const img = new Image();
    img.onload = () => ctx.drawImage(img, 0, 0);
    img.src = notebookContent;
  }
}

/* ===== CANVAS ===== */
function setupCanvas() {
  canvas = document.getElementById("note");
  const bgDiv = document.getElementById("notebook-bg");
  canvas.width = bgDiv.clientWidth;
  canvas.height = bgDiv.clientHeight;
  canvas.style.position = "absolute";
  ctx = canvas.getContext("2d");
  ctx.lineCap = "round";
  if (currentUser.startsWith("parent_")) {
    canvas.style.pointerEvents = "none";
    return;
  }
  canvas.onpointerdown = (e) => {
    drawing = true;
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
  };
  canvas.onpointermove = (e) => {
    if (!drawing) return;
    if (currentUser === "teacher") {
      ctx.strokeStyle = "red";
      ctx.globalAlpha = 1;
      ctx.lineWidth = size;
      ctx.lineTo(e.offsetX, e.offsetY);
      ctx.stroke();
      return;
    }
    ctx.lineWidth = size;
    if (tool === "pen") {
      ctx.strokeStyle = "#000";
      ctx.globalAlpha = 1;
      ctx.lineTo(e.offsetX, e.offsetY);
      ctx.stroke();
    }
    if (tool === "highlighter") {
      ctx.strokeStyle = "yellow";
      ctx.globalAlpha = 0.4;
      ctx.lineTo(e.offsetX, e.offsetY);
      ctx.stroke();
    }
    if (tool === "eraser") {
      ctx.clearRect(
        e.offsetX - size * 4,
        e.offsetY - size * 4,
        size * 8,
        size * 8
      );
    }
  };
  canvas.onpointerup = () => (drawing = false);
}
function setTool(t) {
  tool = t;
}
function setSize(s) {
  size = s;
}

/* ===== SAVE & EXIT ===== */
function saveAndExit() {
  const studentName = currentUser.startsWith("parent_")
    ? data.parents[currentUser].child
    : currentUser === "teacher"
    ? currentStudentForTeacher
    : currentUser;
  if (!currentUser.startsWith("parent_")) {
    const content = canvas.toDataURL();
    saveNotebook(studentName, currentSubject, content);
  }
  loadProfile();
}

/* ===== CHAT ===== */
function openChat() {
  if (currentUser === "teacher") {
    app.innerHTML = `<div class="screen">
      <h2>Обратна връзка – Учител</h2>
      <textarea id="teacher-msg" placeholder="Напиши съобщение"></textarea>
      <button onclick="sendMsg()">Изпрати</button>
      <div id="teacher-chat"></div>
      <button onclick="loadTeacher()">⬅ Назад</button>
    </div>`;
    renderTeacherChat();
    return;
  }
  const studentName = currentUser.startsWith("parent_")
    ? data.parents[currentUser].child
    : currentUser;
  if (!data.messages[studentName]) data.messages[studentName] = [];
  app.innerHTML = `<div class="screen">
    <h2>Обратна връзка</h2>
    <textarea id="msg" placeholder="Напиши съобщение"></textarea>
    <button onclick="sendMsg()">Изпрати</button>
    <div id="chat"></div>
    <button onclick="loadProfile()">⬅ Назад</button>
  </div>`;
  renderChat(studentName);
}

function sendMsg() {
  const msgInput =
    document.getElementById("msg") || document.getElementById("teacher-msg");
  if (!msgInput.value.trim()) return;

  if (currentUser === "teacher") {
    if (!replyToStudent) {
      alert("Изберете ученик, на когото да отговорите");
      return;
    }
    if (!data.messages[replyToStudent]) data.messages[replyToStudent] = [];
    data.messages[replyToStudent].push({
      from: "teacher",
      text: msgInput.value
    });
    msgInput.value = "";
    renderTeacherChat();
    return;
  }

  const studentName = currentUser.startsWith("parent_")
    ? data.parents[currentUser].child
    : currentUser;
  if (!data.messages[studentName]) data.messages[studentName] = [];
  data.messages[studentName].push({ from: currentUser, text: msgInput.value });
  msgInput.value = "";
  renderChat(studentName);
}

function renderChat(studentName) {
  const chatDiv = document.getElementById("chat");
  chatDiv.innerHTML = data.messages[studentName]
    .map((m) => `<p><b>${m.from}:</b> ${m.text}</p>`)
    .join("");
}

function renderTeacherChat() {
  const container = document.getElementById("teacher-chat");
  container.innerHTML = "";
  Object.keys(data.messages).forEach((studentName) => {
    const messages = data.messages[studentName];
    if (!messages) return;
    const studentDiv = document.createElement("div");
    studentDiv.className = "card";
    studentDiv.innerHTML =
      `<h3>${studentName.charAt(0).toUpperCase() + studentName.slice(1)}</h3>` +
      messages.map((m) => `<p><b>${m.from}:</b> ${m.text}</p>`).join("");
    container.appendChild(studentDiv);
  });
}

/* ===== START ===== */
showLogin();

