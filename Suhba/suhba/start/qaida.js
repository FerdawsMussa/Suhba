const videoFrame = document.getElementById("qaidahVideo");
const videoListContainer = document.getElementById("videoList");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

// Add all Qāʿidah episodes here
const playlistVideos = [
  { title: "Lesson 1: Arabic Alphabets", videoId: "abcd1234" },
  { title: "Lesson 2: Basic Harakat", videoId: "efgh5678" },
  { title: "Lesson 3: Joining Letters", videoId: "ijkl9012" },
  { title: "Lesson 4: Simple Words", videoId: "mnop3456" },
  { title: "Lesson 5: Short Phrases", videoId: "qrst7890" },
  // Add more lessons here
];

let currentIndex = 0;

// Load first video
function loadVideo(index) {
  if (index < 0) index = 0;
  if (index >= playlistVideos.length) index = playlistVideos.length - 1;
  currentIndex = index;

  videoFrame.src = `https://www.youtube.com/embed/${playlistVideos[currentIndex].videoId}`;
  updateActiveCard();
}

// Generate clickable episode cards
playlistVideos.forEach((video, index) => {
  const card = document.createElement("div");
  card.className = "video-card";
  card.innerHTML = `<span>Lesson ${index + 1}</span>: ${video.title}`;
  card.addEventListener("click", () => loadVideo(index));
  videoListContainer.appendChild(card);
});

// Highlight the currently playing episode
function updateActiveCard() {
  const cards = document.querySelectorAll(".video-card");
  cards.forEach((card, i) => {
    if (i === currentIndex) card.classList.add("active");
    else card.classList.remove("active");
  });
}

// Navigation buttons
prevBtn.addEventListener("click", () => {
  if (currentIndex > 0) loadVideo(currentIndex - 1);
});

nextBtn.addEventListener("click", () => {
  if (currentIndex < playlistVideos.length - 1) loadVideo(currentIndex + 1);
});

// Initialize
loadVideo(0);
