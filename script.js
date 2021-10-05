const input = document.querySelector(".input");
const addBtn = document.getElementById("add");
let items = [];

//Add functionality
const addHTML = function (item) {
  const html = `
  <div class="wrapper">
    <div class="typing-demo">
    <li class='list_item'>${item}</li>
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
  if (!input.value) return;
  const item = input.value;
  input.value = "";
  items.push(item);
  localStorage.setItem("items", JSON.stringify(items));
  addHTML(item);
  document.querySelector(".list_item").addEventListener("click", function (e) {
    remove(e);
  });
});
