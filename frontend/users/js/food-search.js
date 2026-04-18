const foodItems = ["pizza", "pasta", "burger"];

const input = document.getElementById("foodSearch");
const suggestionsBox = document.getElementById("suggestions");

input.addEventListener("input", function () {
  const value = input.value.toLowerCase();

  suggestionsBox.innerHTML = "";

  if (!value) return;

  const filtered = foodItems.filter(item => item.startsWith(value));

  filtered.forEach(item => {
  const div = document.createElement("div");
  div.innerText = item;

  // 👇 NEW ADD
  div.onclick = () => {
    localStorage.setItem("searchQuery", item);
    localStorage.setItem("searchType", "food"); // important
    window.location.href = "search.html";
  };

  suggestionsBox.appendChild(div);
});
});