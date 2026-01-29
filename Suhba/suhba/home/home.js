// ===== ELEMENTS =====
const loginBtn = document.getElementById("loginBtn");
const signupBtn = document.getElementById("signupBtn");

const loginCard = document.getElementById("loginCard");
const signupCard = document.getElementById("signupCard");

const switchToSignup = document.getElementById("switchToSignup");
const switchToLogin = document.getElementById("switchToLogin");

const signupForm = document.getElementById("signupForm");
const loginForm = document.getElementById("loginForm");

const modalOverlay = document.getElementById("modalOverlay");

// ===== FUNCTIONS =====
function showLogin() {
  loginCard.classList.add("show");
  signupCard.classList.remove("show");
  modalOverlay.classList.add("show");
}

function showSignup() {
  signupCard.classList.add("show");
  loginCard.classList.remove("show");
  modalOverlay.classList.add("show");
}

function closeModals() {
  loginCard.classList.remove("show");
  signupCard.classList.remove("show");
  modalOverlay.classList.remove("show");
}

// ===== BUTTON EVENTS =====
loginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  loginCard.classList.contains("show") ? closeModals() : showLogin();
});

signupBtn.addEventListener("click", (e) => {
  e.preventDefault();
  signupCard.classList.contains("show") ? closeModals() : showSignup();
});

// ===== SWITCH LINKS =====
switchToSignup.addEventListener("click", (e) => {
  e.preventDefault();
  showSignup();
});

switchToLogin.addEventListener("click", (e) => {
  e.preventDefault();
  showLogin();
});

// ===== CLOSE MODAL ON OVERLAY CLICK =====
modalOverlay.addEventListener("click", closeModals);

// ===== CLOSE MODAL WHEN CLICKING ANYWHERE OUTSIDE MODAL =====
document.addEventListener("click", function (e) {
  // If modal is visible and click is NOT inside any modal or button
  if (
    (loginCard.classList.contains("show") ||
      signupCard.classList.contains("show")) &&
    !loginCard.contains(e.target) &&
    !signupCard.contains(e.target) &&
    e.target !== loginBtn &&
    e.target !== signupBtn
  ) {
    closeModals();
  }
});

// ===== SIGN UP =====
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("signupName").value.trim();
  const email = document.getElementById("signupEmail").value.trim();
  const password = document.getElementById("signupPassword").value.trim();

  if (!name || !email || !password) {
    alert("Please fill all fields.");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];

  if (users.some((user) => user.email === email)) {
    alert("Email already registered!");
    return;
  }

  users.push({ name, email, password });
  localStorage.setItem("users", JSON.stringify(users));

  alert("Registration successful! You can now log in.");
  showLogin();
  signupForm.reset();
});

// ===== LOGIN =====
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  let users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find((u) => u.email === email && u.password === password);

  if (user) {
    window.location.href = ".../suhba/start/start.html";
    closeModals();
    loginForm.reset();
  } else {
    alert("Invalid email or password.");
  }
});
