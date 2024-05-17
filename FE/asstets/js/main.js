// ChatBot AI

// const botChat = document.querySelector('.bot-chat');
// console.log(botChat);
// const formChatbot = document.querySelector('.form__chatbot');
// console.log(formChatbot);

// botChat.addEventListener('click', () => {
//   formChatbot.classList.toggle('active');
// });

// End ChatBot AI
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

