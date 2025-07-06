// profile.js

// Profile data structure
let profileData = {
  displayName: "SALMAN",
  username: "salman_gamer",
  email: "salman@example.com",
  bio: "Passionate gamer who loves competitive FPS games and RPGs. Always looking for new challenges and friends to play with!",
  avatar: "images/profile.jpeg",
  theme: "dark",
  accentColor: "purple",
  preferences: {
    notifications: true,
    autoUpdate: true,
    friendRequests: false,
    activityStatus: true
  },
  favoriteGames: [
    { name: "Valorant", image: "images/Valorant.png" },
    { name: "CS:GO", image: "images/csgo.webp" },
    { name: "Dota 2", image: "images/dota2.webp" },
    { name: "Elden Ring", image: "images/eldenring.webp" }
  ]
};

// Available games for favorites
const availableGames = [
  { name: "Valorant", image: "images/Valorant.png" },
  { name: "CS:GO", image: "images/csgo.webp" },
  { name: "Dota 2", image: "images/dota2.webp" },
  { name: "League of Legends", image: "images/lol.jpg" },
  { name: "Elden Ring", image: "images/eldenring.webp" },
  { name: "Uncharted 4", image: "images/Uncharted4.webp" },
  { name: "Dishonored", image: "images/dishonored.jpg" },
  { name: "FIFA 23", image: "images/fifa23.webp" }
];

// Initialize profile page
function initProfile() {
  loadProfileFromStorage();
  renderProfile();
  setupEventListeners();
  updateTheme();
}

// Load profile from localStorage
function loadProfileFromStorage() {
  const savedProfile = localStorage.getItem('profileData');
  if (savedProfile) {
    profileData = { ...profileData, ...JSON.parse(savedProfile) };
  }
}

// Save profile to localStorage
function saveProfileToStorage() {
  localStorage.setItem('profileData', JSON.stringify(profileData));
}

// Render profile data
function renderProfile() {
  // Update form fields
  document.getElementById('display-name').value = profileData.displayName;
  document.getElementById('username').value = profileData.username;
  document.getElementById('email').value = profileData.email;
  document.getElementById('bio').value = profileData.bio;
  document.getElementById('profile-avatar-img').src = profileData.avatar;
  document.getElementById('profile-name').textContent = profileData.displayName;
  
  // Update preferences
  document.getElementById('notifications').checked = profileData.preferences.notifications;
  document.getElementById('auto-update').checked = profileData.preferences.autoUpdate;
  document.getElementById('friend-requests').checked = profileData.preferences.friendRequests;
  document.getElementById('activity-status').checked = profileData.preferences.activityStatus;
  
  // Update theme buttons
  updateThemeButtons();
  
  // Update color buttons
  updateColorButtons();
  
  // Render favorite games
  renderFavoriteGames();
}

// Setup event listeners
function setupEventListeners() {
  // Theme toggle
  document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const theme = btn.dataset.theme;
      setTheme(theme);
    });
  });
  
  // Color picker
  document.querySelectorAll('.color-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const color = btn.dataset.color;
      setAccentColor(color);
    });
  });
  
  // Preference checkboxes
  document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      updatePreferences();
    });
  });
}

// Update theme buttons
function updateThemeButtons() {
  document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.classList.remove('active');
    if (btn.dataset.theme === profileData.theme) {
      btn.classList.add('active');
    }
  });
}

// Update color buttons
function updateColorButtons() {
  document.querySelectorAll('.color-btn').forEach(btn => {
    btn.classList.remove('active');
    if (btn.dataset.color === profileData.accentColor) {
      btn.classList.add('active');
    }
  });
}

// Set theme
function setTheme(theme) {
  profileData.theme = theme;
  updateTheme();
  updateThemeButtons();
  saveProfileToStorage();
}

// Set accent color
function setAccentColor(color) {
  profileData.accentColor = color;
  updateAccentColor();
  updateColorButtons();
  saveProfileToStorage();
}

// Update theme
function updateTheme() {
  document.body.className = profileData.theme === 'light' ? 'light-theme' : '';
}

// Update accent color
function updateAccentColor() {
  const root = document.documentElement;
  const colors = {
    purple: '#a259ff',
    green: '#39ff14',
    blue: '#4d9fff',
    orange: '#ffb347'
  };
  
  root.style.setProperty('--accent-purple', colors[profileData.accentColor]);
}

// Update preferences
function updatePreferences() {
  profileData.preferences = {
    notifications: document.getElementById('notifications').checked,
    autoUpdate: document.getElementById('auto-update').checked,
    friendRequests: document.getElementById('friend-requests').checked,
    activityStatus: document.getElementById('activity-status').checked
  };
  saveProfileToStorage();
}

// Preview avatar
function previewAvatar(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const avatarImg = document.getElementById('profile-avatar-img');
      avatarImg.src = e.target.result;
      profileData.avatar = e.target.result;
      saveProfileToStorage();
    };
    reader.readAsDataURL(file);
  }
}

// Render favorite games
function renderFavoriteGames() {
  const container = document.getElementById('favorite-games');
  
  container.innerHTML = profileData.favoriteGames.map(game => `
    <div class="favorite-game-item">
      <img src="${game.image}" alt="${game.name}">
      <div class="game-info">
        <h4>${game.name}</h4>
        <button class="remove-favorite" onclick="removeFavoriteGame('${game.name}')">
          <i class="fas fa-times"></i>
        </button>
      </div>
    </div>
  `).join('');
  
  // Add "Add Game" button if less than 6 favorites
  if (profileData.favoriteGames.length < 6) {
    container.innerHTML += `
      <div class="favorite-game-item add-game" onclick="openAddGameModal()">
        <div class="add-game-content">
          <i class="fas fa-plus"></i>
          <span>Add Game</span>
        </div>
      </div>
    `;
  }
}

// Remove favorite game
function removeFavoriteGame(gameName) {
  profileData.favoriteGames = profileData.favoriteGames.filter(game => game.name !== gameName);
  renderFavoriteGames();
  saveProfileToStorage();
  showNotification(`Removed ${gameName} from favorites`);
}

// Open add game modal (simulated)
function openAddGameModal() {
  const availableToAdd = availableGames.filter(game => 
    !profileData.favoriteGames.some(fav => fav.name === game.name)
  );
  
  if (availableToAdd.length === 0) {
    showNotification('No more games available to add');
    return;
  }
  
  // Simple prompt for demo - in real app would be a modal
  const gameNames = availableToAdd.map(game => game.name).join(', ');
  const selectedGame = prompt(`Select a game to add: ${gameNames}`);
  
  if (selectedGame) {
    const gameToAdd = availableToAdd.find(game => game.name === selectedGame);
    if (gameToAdd) {
      profileData.favoriteGames.push(gameToAdd);
      renderFavoriteGames();
      saveProfileToStorage();
      showNotification(`Added ${selectedGame} to favorites`);
    }
  }
}

// Save profile
function saveProfile() {
  // Update profile data from form
  profileData.displayName = document.getElementById('display-name').value;
  profileData.username = document.getElementById('username').value;
  profileData.email = document.getElementById('email').value;
  profileData.bio = document.getElementById('bio').value;
  
  // Update display name in header
  document.getElementById('profile-name').textContent = profileData.displayName;
  
  // Save to localStorage
  saveProfileToStorage();
  
  // Show success message
  showNotification('Profile saved successfully!');
  
  // Update username in greeting
  const usernameElements = document.querySelectorAll('.username');
  usernameElements.forEach(el => {
    el.textContent = profileData.displayName;
  });
}

// Show notification
function showNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  // Remove notification after 3 seconds
  setTimeout(() => {
    notification.remove();
  }, 3000);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initProfile); 