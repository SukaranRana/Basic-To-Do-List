"use strict";

const input = document.querySelector(".input");
const addBtn = document.getElementById("add");
const delBtn = document.getElementById("deleteAll");
const yesBtn = document.querySelector(".yes");
const noBtn = document.querySelector(".no");
const closeBtn = document.querySelector(".close-modal");
const copyBtn = document.getElementById("copy");

let items = [];

//Add functionality
const addHTML = function (item) {
  const html = `
  <div class="wrapper">
    <div class="typing-demo">
    <li class='list_item display-6'>${
      item.charAt(0).toUpperCase() + item.slice(1)
    }</li>
    </div>
</div>
          `;
  document.querySelector("ul").insertAdjacentHTML("afterend", html);
  document.querySelector(".typing-demo").style.width = `${item.length + 3}ch`;
};

//Remove functionality
const remove = function (e) {
  const target = e.target.textContent;
  e.target.classList.add("hidden");
  const index = items.findIndex((i) => i === target);
  items.splice(index, 1);
  localStorage.setItem("items", JSON.stringify(items));
};

if (JSON.parse(localStorage.getItem("items"))) {
  items = [...JSON.parse(localStorage.getItem("items"))];
}
if (!(items.length === 0)) {
  items.forEach((item) => addHTML(item));
  document.querySelectorAll(".list_item").forEach((el) =>
    el.addEventListener("click", function (e) {
      remove(e);
    })
  );
}

//Event Listener
addBtn.addEventListener("click", function (event) {
  event.preventDefault();
  if (!input.value || input.value === " ") return;
  const item = input.value.trim();
  if (item === "") return;
  input.value = "";
  items.push(item);
  localStorage.setItem("items", JSON.stringify(items));
  addHTML(item);
  document.querySelector(".list_item").addEventListener("click", function (e) {
    remove(e);
  });
});

delBtn.addEventListener("click", function (event) {
  event.preventDefault();
  window.open("#modal", "_self");
  yesBtn.addEventListener("click", function () {
    items.splice(0, items.length);
    localStorage.clear();
    window.open("#", "_self");
    input.focus();
    location.reload();
  });
  noBtn.addEventListener("click", function () {
    window.open("#", "_self");
    input.focus();
  });
});

copyBtn.addEventListener("click", function (e) {
  e.preventDefault();
  if (items.length === 0) return;

  navigator.clipboard.writeText(items);
});

//Listen Enter button
document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    if (!input.value || input.value === " ") return;
    const item = input.value.trim();
    if (input.value === "") return;
    input.value = "";
    items.push(item);
    localStorage.setItem("items", JSON.stringify(items));
    addHTML(item);
    document
      .querySelector(".list_item")
      .addEventListener("click", function (e) {
        remove(e);
      });
  }
});
//Refresh after 1 min
let time;
document.addEventListener("keydown", function () {
  time = new Date().getTime();
});
function refresh() {
  if (new Date().getTime() - time >= 60000) window.location.reload(true);
  else setTimeout(refresh, 10000);
}
setTimeout(refresh, 10000);

//Splash screen
const splash = document.querySelector(".splash");
document.addEventListener("DOMContentLoaded", (e) => {
  setTimeout(() => {
    splash.classList.add("hidden-splash");
  }, 2000);
});

//Bubbles
let sec;
input.addEventListener("keydown", () => {
  document.querySelector(".typingAnimation").classList.remove("hidden");
  sec = 3000;
});

input.addEventListener("keyup", (e) => {
  setTimeout(
    () => document.querySelector(".typingAnimation").classList.add("hidden"),
    sec
  );
  // if (sec === 0) {
  //   // document.querySelector(".typingAnimation").classList.add("hidden");
  // }
});
