// statistics.js

// Simulated gaming statistics data
const statsData = {
  all: {
    totalHours: 12340,
    gamesPlayed: 24,
    achievements: 847,
    winRate: 68.5,
    games: [
      { name: "Dota 2", hours: 2340, image: "assets/images/dota2.webp" },
      { name: "CS:GO", hours: 5420, image: "assets/images/csgo.webp" },
      { name: "League of Legends", hours: 4580, image: "assets/images/lol.jpg" },
      { name: "Valorant", hours: 1200, image: "assets/images/valorant.png" },
      { name: "Elden Ring", hours: 800, image: "assets/images/eldenring.webp" }
    ],
    activity: [
      { type: "achievement", game: "Elden Ring", text: "Unlocked 'Elden Lord' achievement", time: "2 hours ago" },
      { type: "game", game: "Valorant", text: "Played for 3 hours", time: "4 hours ago" },
      { type: "win", game: "CS:GO", text: "Won competitive match", time: "6 hours ago" },
      { type: "game", game: "Dota 2", text: "Played for 2 hours", time: "8 hours ago" },
      { type: "achievement", game: "League of Legends", text: "Reached Gold rank", time: "1 day ago" }
    ]
  },
  month: {
    totalHours: 156,
    gamesPlayed: 3,
    achievements: 12,
    winRate: 2.3,
    games: [
      { name: "Valorant", hours: 45, image: "assets/images/valorant.png" },
      { name: "CS:GO", hours: 38, image: "assets/images/csgo.webp" },
      { name: "Elden Ring", hours: 32, image: "assets/images/eldenring.webp" },
      { name: "Dota 2", hours: 28, image: "assets/images/dota2.webp" },
      { name: "League of Legends", hours: 13, image: "assets/images/lol.jpg" }
    ],
    activity: [
      { type: "achievement", game: "Elden Ring", text: "Unlocked 'Elden Lord' achievement", time: "2 hours ago" },
      { type: "game", game: "Valorant", text: "Played for 3 hours", time: "4 hours ago" },
      { type: "win", game: "CS:GO", text: "Won competitive match", time: "6 hours ago" }
    ]
  },
  week: {
    totalHours: 42,
    gamesPlayed: 2,
    achievements: 3,
    winRate: 1.2,
    games: [
      { name: "Valorant", hours: 18, image: "assets/images/valorant.png" },
      { name: "CS:GO", hours: 15, image: "assets/images/csgo.webp" },
      { name: "Elden Ring", hours: 9, image: "assets/images/eldenring.webp" }
    ],
    activity: [
      { type: "game", game: "Valorant", text: "Played for 3 hours", time: "4 hours ago" },
      { type: "win", game: "CS:GO", text: "Won competitive match", time: "6 hours ago" }
    ]
  },
  day: {
    totalHours: 6,
    gamesPlayed: 1,
    achievements: 0,
    winRate: 0.5,
    games: [
      { name: "Valorant", hours: 3, image: "assets/images/valorant.png" },
      { name: "CS:GO", hours: 3, image: "assets/images/csgo.webp" }
    ],
    activity: [
      { type: "game", game: "Valorant", text: "Played for 3 hours", time: "4 hours ago" },
      { type: "win", game: "CS:GO", text: "Won competitive match", time: "6 hours ago" }
    ]
  }
};

let currentPeriod = 'all';
let hoursChart = null;

// Initialize statistics page
function initStatistics() {
  renderStatsOverview();
  renderTopGames();
  renderRecentActivity();
  createHoursChart();
  setupTimeFilter();
}

// Render stats overview
function renderStatsOverview() {
  const data = statsData[currentPeriod];
  
  document.getElementById('total-hours-display').textContent = data.totalHours.toLocaleString();
  document.getElementById('games-played-display').textContent = data.gamesPlayed;
  document.getElementById('achievements-display').textContent = data.achievements;
  document.getElementById('win-rate-display').textContent = data.winRate + '%';
}

// Render top games
function renderTopGames() {
  const data = statsData[currentPeriod];
  const container = document.getElementById('top-games-list');
  
  container.innerHTML = data.games.map((game, index) => `
    <div class="top-game-item">
      <div class="game-rank">#${index + 1}</div>
      <div class="game-info">
        <img src="${game.image}" alt="${game.name}" class="game-thumb">
        <div class="game-details">
          <h3>${game.name}</h3>
          <span class="game-hours">${game.hours}h</span>
        </div>
      </div>
      <div class="game-percentage">
        ${Math.round((game.hours / data.totalHours) * 100)}%
      </div>
    </div>
  `).join('');
}

// Render recent activity
function renderRecentActivity() {
  const data = statsData[currentPeriod];
  const container = document.getElementById('activity-list');
  
  container.innerHTML = data.activity.map(activity => `
    <div class="activity-item ${activity.type}">
      <div class="activity-icon">
        ${getActivityIcon(activity.type)}
      </div>
      <div class="activity-content">
        <div class="activity-text">${activity.text}</div>
        <div class="activity-game">${activity.game}</div>
      </div>
      <div class="activity-time">${activity.time}</div>
    </div>
  `).join('');
}

// Get activity icon
function getActivityIcon(type) {
  switch(type) {
    case 'achievement': return '<i class="fas fa-trophy"></i>';
    case 'game': return '<i class="fas fa-gamepad"></i>';
    case 'win': return '<i class="fas fa-crown"></i>';
    default: return '<i class="fas fa-circle"></i>';
  }
}

// Create hours chart using Chart.js
function createHoursChart() {
  const data = statsData[currentPeriod];
  const ctx = document.getElementById('hours-chart').getContext('2d');
  
  if (hoursChart) {
    hoursChart.destroy();
  }
  
  hoursChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: data.games.map(game => game.name),
      datasets: [{
        data: data.games.map(game => game.hours),
        backgroundColor: [
          '#a259ff',
          '#39ff14',
          '#ff4d4d',
          '#ffb347',
          '#4d9fff',
          '#ff6b9d',
          '#9d4dff',
          '#4dff9d'
        ],
        borderWidth: 0,
        hoverOffset: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            color: '#fff',
            padding: 20,
            usePointStyle: true,
            font: {
              size: 12
            }
          }
        },
        tooltip: {
          backgroundColor: 'rgba(0,0,0,0.8)',
          titleColor: '#fff',
          bodyColor: '#fff',
          borderColor: '#a259ff',
          borderWidth: 1,
          callbacks: {
            label: function(context) {
              const total = context.dataset.data.reduce((a, b) => a + b, 0);
              const percentage = ((context.parsed / total) * 100).toFixed(1);
              return `${context.label}: ${context.parsed}h (${percentage}%)`;
            }
          }
        }
      }
    }
  });
}

// Setup time filter
function setupTimeFilter() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      button.classList.add('active');
      
      // Update current period
      currentPeriod = button.dataset.period;
      
      // Re-render all sections
      renderStatsOverview();
      renderTopGames();
      renderRecentActivity();
      createHoursChart();
    });
  });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initStatistics); 