// Placeholder dataset
const videos = [
  {
    id: 1,
    title: "City at Lightspeed",
    description: "Neon arteries, kinetic nights, and glass horizons.",
    duration: "6:12",
    views: "1.2M",
    thumb: "assets/images/thumb1.jpg",
    src: "assets/videos/sample.mp4"
  },
  {
    id: 2,
    title: "Synthwave Drive",
    description: "A midnight drive through vapor skies.",
    duration: "4:08",
    views: "894K",
    thumb: "assets/images/thumb2.jpg",
    src: "assets/videos/sample.mp4"
  },
  {
    id: 3,
    title: "Orbital Sunrise",
    description: "Sunlight skims the rim of the world.",
    duration: "9:41",
    views: "2.3M",
    thumb: "assets/images/thumb3.jpg",
    src: "assets/videos/sample.mp4"
  },
  {
    id: 4,
    title: "Neon Rain",
    description: "Chromatic droplets in a city that hums.",
    duration: "3:57",
    views: "512K",
    thumb: "assets/images/thumb4.jpg",
    src: "assets/videos/sample.mp4"
  }
];

// Render grid on homepage
function renderGrid() {
  const grid = document.getElementById("videoGrid");
  if (!grid) return;
  grid.innerHTML = videos.map(v => `
    <a class="card" href="video.html?id=${v.id}">
      <img class="card-thumb" src="${v.thumb}" alt="${v.title}">
      <div class="card-body">
        <h4 class="card-title">${v.title}</h4>
        <div class="card-meta">${v.views} • ${v.duration}</div>
      </div>
    </a>
  `).join("");
}

// Search
function initSearch() {
  const input = document.getElementById("searchInput");
  const btn = document.getElementById("searchBtn");
  if (!input || !btn) return;
  const runSearch = () => {
    const q = input.value.trim().toLowerCase();
    const grid = document.getElementById("videoGrid");
    if (!grid) return;
    const filtered = videos.filter(v => v.title.toLowerCase().includes(q));
    grid.innerHTML = filtered.length ? filtered.map(v => `
      <a class="card" href="video.html?id=${v.id}">
        <img class="card-thumb" src="${v.thumb}" alt="${v.title}">
        <div class="card-body">
          <h4 class="card-title">${v.title}</h4>
          <div class="card-meta">${v.views} • ${v.duration}</div>
        </div>
      </a>
    `).join("") : `<p>No results found.</p>`;
  };
  btn.addEventListener("click", runSearch);
  input.addEventListener("keydown", e => { if (e.key === "Enter") runSearch(); });
}

// Player page logic
function initPlayerPage() {
  const params = new URLSearchParams(window.location.search);
  const id = Number(params.get("id")) || 1;
  const video = videos.find(v => v.id === id) || videos[0];

  const videoEl = document.getElementById("videoElement");
  const titleEl = document.getElementById("videoTitle");
  const descEl = document.getElementById("videoDescription");
  const upNextEl = document.getElementById("upNext");

  if (videoEl) {
    videoEl.src = video.src;
    titleEl.textContent = video.title;
    descEl.textContent = video.description;

    const playPause = document.getElementById("playPause");
    const seekBar = document.getElementById("seekBar");
    const volumeBar = document.getElementById("volumeBar");
    const timeDisplay = document.getElementById("timeDisplay");
    const fullscreenBtn = document.getElementById("fullscreenBtn");

    const formatTime = secs => {
      const m = Math.floor(secs / 60);
      const s = Math.floor(secs % 60);
      return `${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`;
    };

    videoEl.addEventListener("loadedmetadata", () => {
      seekBar.max = Math.floor(videoEl.duration);
      timeDisplay.textContent = `${formatTime(0)} / ${formatTime(videoEl.duration)}`;
    });

    videoEl.addEventListener("timeupdate", () => {
      seekBar.value = Math.floor(videoEl.currentTime);
      timeDisplay.textContent = `${formatTime(videoEl.currentTime)} / ${formatTime(videoEl.duration)}`;
    });

    playPause.addEventListener("click", () => {
      if (videoEl.paused) { videoEl.play(); playPause.textContent = "❚❚"; }
      else { videoEl.pause(); playPause.textContent = "►"; }
    });

    seekBar.addEventListener("input", () => {
      videoEl.currentTime = Number(seekBar.value);
    });

    volumeBar.addEventListener("input", () => {
      videoEl.volume = Number(volumeBar.value);
    });

    fullscreenBtn.addEventListener("click", () => {
      if (document.fullscreenElement) document.exitFullscreen();
      else videoEl.requestFullscreen();
    });
  }

  if (upNextEl) {
    const others = videos.filter(v => v.id !== id);
    upNextEl.innerHTML = others.map(v => `
      <a class="list-item" href="video.html?id=${v.id}">
        <img src="${v.thumb}" alt="${v.title}">
        <div>
          <div class="card-title">${v.title}</div>
          <div class="card-meta">${v.views} • ${v.duration}</div>
        </div>
      </a>
    `).join("");
  }
}

// Bootstrap
document.addEventListener("DOMContentLoaded", () => {
  renderGrid();
  initSearch();
  initPlayerPage();
});
