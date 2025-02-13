let autoplay = true;
let interval;
let currentIndex = 0;
let columns = 2;
const items = document.querySelectorAll(".wat");
const carousel = document.getElementById("carousel");

function updateDots() {
  const totalPages = Math.ceil(items.length / columns);
  const dotsContainer = document.querySelector(".dots");
  dotsContainer.innerHTML = "";
  for (let i = 0; i < totalPages; i++) {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    if (i === currentIndex) dot.classList.add("active");
    dotsContainer.appendChild(dot);
  }
}

function showPage(index) {
  const start = index * columns;
  const end = start + columns;
  items.forEach((item, i) => {
    item.style.display = i >= start && i < end ? "block" : "none";
  });

  document.querySelectorAll(".dot").forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });
}

function startAutoplay() {
  stopAutoplay();
  if (autoplay) {
    interval = setInterval(() => {
      const totalPages = Math.ceil(items.length / columns);
      currentIndex = (currentIndex + 1) % totalPages;
      showPage(currentIndex);
    }, 3000);
  }
}

function stopAutoplay() {
  clearInterval(interval);
}

function toggleAutoplay() {
  autoplay = !autoplay;
  document.getElementById("autoplay-status").innerText = autoplay
    ? "ON"
    : "OFF";
  if (autoplay) {
    startAutoplay();
  } else {
    stopAutoplay();
  }
}

function setColumns(numColumns) {
  columns = numColumns;
  carousel.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
  currentIndex = 0;
  updateDots();
  showPage(currentIndex);
}

setColumns(columns);
updateDots();
showPage(currentIndex);
startAutoplay();
