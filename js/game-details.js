// game-details.js

// Simulated game data
const gameData = {
  valorant: {
    title: "Valorant",
    banner: "Assets/images/valorant.png",
    desc: "Valorant is a multiplayer computer game developed and published by Riot Games. Valorant is Riot Games' first first-person shooter game. It features a unique blend of tactical gameplay and character abilities.",
    tags: ["Multiplayer", "Shooter", "Competitive", "FPS"],
    rating: 4.8,
    reviews: 1250,
    screenshots: [
      "Assets/images/valorant1.webp",
      "Assets/images/valorant2.webp",
      "Assets/images/valorant3.jpg"
    ]
  },
  uncharted4: {
    title: "Uncharted 4: A Thief's End",
    banner: "Assets/images/Uncharted4.webp",
    desc: "Sequel to Uncharted 3: Drake's Deception and the final installment of Nathan Drake's adventures. Follow Nathan Drake as he embarks on a globe-trotting journey in pursuit of a historical conspiracy behind a fabled pirate treasure.",
    tags: ["Adventure", "Story Rich", "Single Player", "Action"],
    rating: 4.9,
    reviews: 890,
    screenshots: [
      "Assets/images/Uncharted41.webp",
      "Assets/images/Uncharted42.webp",
      "Assets/images/Uncharted43.jpg"
    ]
  },
  dishonored: {
    title: "Dishonored: Standard Edition",
    banner: "Assets/images/dishonored.jpg",
    desc: "Action-adventure stealth game developed by Arkane Studios and published by Bethesda Softworks. Set in the fictional, plague-ridden industrial city of Dunwall, where you play as Corvo Attano, the legendary bodyguard to the Empress.",
    tags: ["Stealth", "Action", "Adventure", "Single Player"],
    rating: 4.7,
    reviews: 650,
    screenshots: [
      "Assets/images/dishonored1.webp",
      "Assets/images/dishonored2.webp",
      "Assets/images/dishonored3.webp"
    ]
  },
  eldenring: {
    title: "Elden Ring",
    banner: "Assets/images/eldenring.webp",
    desc: "Action role-playing game developed by FromSoftware and published by Bandai Namco Entertainment. Set in the Lands Between, where you play as a Tarnished, guided by grace to become the Elden Lord.",
    tags: ["RPG", "Action", "Open World", "Challenging"],
    rating: 4.9,
    reviews: 2100,
    screenshots: [
      "Assets/images/eldenring1.jpg",
      "Assets/images/eldenring2.webp",
      "Assets/images/eldenring3.webp"
    ]
  }
};

let currentScreenshotIndex = 0;

// Load game from URL and inject into DOM
function loadGameDetails() {
  const params = new URLSearchParams(window.location.search);
  const gameKey = params.get('game') || 'valorant';
  const game = gameData[gameKey];
  
  if (!game) {
    showError('Game not found');
    return;
  }

  // Update page title
  document.title = `${game.title} - Game Details`;
  
  // Inject game info into DOM
  const contentDiv = document.getElementById('game-details-content');
  contentDiv.innerHTML = `
    <div class="game-details-container">
      <!-- Game Banner -->
      <div class="game-banner">
        <img src="${game.banner}" alt="${game.title}">
        <div class="banner-overlay">
          <div class="play-button">
            <i class="fas fa-play"></i>
            <span>Play Now</span>
          </div>
        </div>
      </div>

      <!-- Game Info -->
      <div class="game-info-section">
        <div class="game-header">
          <h1>${game.title}</h1>
          <div class="game-tags">
            ${game.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
          </div>
        </div>
        
        <div class="game-description">
          <p>${game.desc}</p>
        </div>

        <!-- Game Rating -->
        <div class="game-rating">
          <div class="stars">
            ${generateStars(game.rating)}
          </div>
          <span class="rating-text">${game.rating}/5 (${game.reviews} reviews)</span>
        </div>
      </div>

      <!-- Screenshots Carousel -->
      <div class="screenshots-section">
        <h3>Screenshots</h3>
        <div class="screenshots-carousel">
          <button class="carousel-btn prev" onclick="changeScreenshot(-1)">
            <i class="fas fa-chevron-left"></i>
          </button>
          <div class="screenshots-container">
            <img src="${game.screenshots[0]}" alt="Screenshot" id="current-screenshot">
          </div>
          <button class="carousel-btn next" onclick="changeScreenshot(1)">
            <i class="fas fa-chevron-right"></i>
          </button>
        </div>
        <div class="screenshot-dots">
          ${game.screenshots.map((_, index) => 
            `<span class="dot ${index === 0 ? 'active' : ''}" onclick="goToScreenshot(${index})"></span>`
          ).join('')}
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="game-actions">
        <button class="btn-primary">
          <i class="fas fa-download"></i>
          Download Game
        </button>
        <button class="btn-secondary">
          <i class="fas fa-heart"></i>
          Add to Wishlist
        </button>
        <button class="btn-secondary">
          <i class="fas fa-share"></i>
          Share
        </button>
      </div>
    </div>
  `;
}

function generateStars(rating) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  let starsHTML = '';
  
  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      starsHTML += '<i class="fas fa-star"></i>';
    } else if (i === fullStars && hasHalfStar) {
      starsHTML += '<i class="fas fa-star-half-alt"></i>';
    } else {
      starsHTML += '<i class="far fa-star"></i>';
    }
  }
  
  return starsHTML;
}

function changeScreenshot(direction) {
  const params = new URLSearchParams(window.location.search);
  const gameKey = params.get('game') || 'valorant';
  const game = gameData[gameKey];
  
  currentScreenshotIndex = (currentScreenshotIndex + direction + game.screenshots.length) % game.screenshots.length;
  updateScreenshot();
}

function goToScreenshot(index) {
  currentScreenshotIndex = index;
  updateScreenshot();
}

function updateScreenshot() {
  const params = new URLSearchParams(window.location.search);
  const gameKey = params.get('game') || 'valorant';
  const game = gameData[gameKey];
  
  const screenshot = document.getElementById('current-screenshot');
  const dots = document.querySelectorAll('.dot');
  
  if (screenshot) {
    screenshot.src = game.screenshots[currentScreenshotIndex];
  }
  
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentScreenshotIndex);
  });
}

function showError(message) {
  const contentDiv = document.getElementById('game-details-content');
  contentDiv.innerHTML = `
    <div class="error-container">
      <i class="fas fa-exclamation-triangle"></i>
      <h2>${message}</h2>
      <a href="index.html" class="btn-primary">Back to Dashboard</a>
    </div>
  `;
}

document.addEventListener('DOMContentLoaded', loadGameDetails); 