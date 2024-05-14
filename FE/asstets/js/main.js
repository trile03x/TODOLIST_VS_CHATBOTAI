// Form Login

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById('form');
  const usernameInput = document.getElementById("username-input");
  const passwordInput = document.getElementById("password-input");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (usernameInput.value === "admin" && passwordInput.value === "admin") {
      alert("Login Success");
      window.location.href = "index.html"; 
    } else {
      alert("Login Failed");
    }
  });
});


// End Form Login


// Navbar

const menu = document.querySelector(".navbar__links");
const menuButton = document.querySelector(".navbar__icons");
const overlay = document.querySelector("#overlay");

menuButton.addEventListener("click", () => {
  menu.classList.toggle("navbar__open");
  menuButton.classList.toggle("open");
  overlay.classList.toggle("show");
});

overlay.addEventListener("click", () => {
  menu.classList.toggle("navbar__open");
  menuButton.classList.toggle("open");
  overlay.classList.toggle("show");
});

// End Navbar
