let dataGlobal = [];

const menuButtons = document.querySelectorAll(".profile__menu-item");
const cards = document.querySelectorAll(".card");

document.addEventListener('DOMContentLoaded', () => {
  fetch("assets/data/data.json")
    .then(response => response.json())
    .then(data => {
      dataGlobal = data;
      updateUI("weekly");
    });
});

menuButtons.forEach(button => {
  button.addEventListener("click", () => {
    const timeframe = button.dataset.timeframe;

    menuButtons.forEach(btn => {
      btn.classList.remove("profile__menu-item--active");
      btn.setAttribute("aria-pressed", "false");
    });

    button.classList.add("profile__menu-item--active");
    button.setAttribute("aria-pressed", "true");

    updateUI(timeframe);
  });
});

function updateUI(timeframe) {
  cards.forEach((card, index) => {
    const current = dataGlobal[index].timeframes[timeframe].current;
    const previous = dataGlobal[index].timeframes[timeframe].previous;

    card.querySelector(".card__hours").textContent = `${current}hrs`;

    card.querySelector(".card__previous").innerHTML =
     `Last ${getLabel(timeframe)} - ${previous}hrs`;
  });
}

function getLabel(timeframe) {
  if (timeframe === "daily") return "Day";
  if (timeframe === "weekly") return "Week";
  if (timeframe === "monthly") return "Month";
}