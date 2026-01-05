// Placeholder user videos
const myVideos = [
  { id: 1, title: "City at Lightspeed", views: "1.2K", duration: "6:12", thumb: "assets/images/thumb1.jpg" },
  { id: 2, title: "Synthwave Drive", views: "894", duration: "4:08", thumb: "assets/images/thumb2.jpg" },
  { id: 3, title: "Orbital Sunrise", views: "2.3K", duration: "9:41", thumb: "assets/images/thumb3.jpg" }
];

function renderMyVideos() {
  const grid = document.getElementById("myVideos");
  grid.innerHTML = myVideos.map(v => `
    <a class="card" href="video.html?id=${v.id}">
      <img class="card-thumb" src="${v.thumb}" alt="${v.title}">
      <div class="card-body">
        <h4 class="card-title">${v.title}</h4>
        <div class="card-meta">${v.views} views • ${v.duration}</div>
      </div>
    </a>
  `).join("");
}

function editProfile() {
  const name = prompt("Enter new profile name:", document.getElementById("profileName").textContent);
  const bio = prompt("Enter new bio:", document.getElementById("profileBio").textContent);
  if (name) document.getElementById("profileName").textContent = name;
  if (bio) document.getElementById("profileBio").textContent = bio;
}

document.addEventListener("DOMContentLoaded", renderMyVideos);
