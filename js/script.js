// Sidebar toggle for mobile (optional, if you add a hamburger menu)
// document.querySelector('.sidebar-toggle').addEventListener('click', function() {
//   document.querySelector('.sidebar').classList.toggle('open');
// });

// Simulate download progress bar
function simulateDownloadProgress() {
  const progressBar = document.querySelector('.progress-bar-fill');
  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 8 + 2; // random increment
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
    }
    progressBar.style.width = progress + '%';
  }, 600);
}

// Animate statistics ring
function animateStatsRing() {
  const ring = document.querySelector('.ring-progress');
  if (!ring) return;
  // SVG circle: circumference = 2 * PI * r
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  ring.style.strokeDasharray = circumference;
  ring.style.strokeDashoffset = circumference;
  setTimeout(() => {
    ring.style.strokeDashoffset = circumference * 0.2; // 80% filled
  }, 500);
}

document.addEventListener('DOMContentLoaded', () => {
  simulateDownloadProgress();
  animateStatsRing();
});

// Mobile menu toggle
function toggleMobileMenu() {
  const sidebar = document.getElementById('sidebar');
  const toggleBtn = document.querySelector('.mobile-menu-toggle');
  
  if (sidebar) {
    sidebar.classList.toggle('mobile-open');
    
    // Update toggle button icon
    const icon = toggleBtn.querySelector('i');
    if (sidebar.classList.contains('mobile-open')) {
      icon.className = 'fas fa-times';
    } else {
      icon.className = 'fas fa-bars';
    }
  }
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
  const sidebar = document.getElementById('sidebar');
  const toggleBtn = document.querySelector('.mobile-menu-toggle');
  
  if (sidebar && sidebar.classList.contains('mobile-open')) {
    if (!sidebar.contains(event.target) && !toggleBtn.contains(event.target)) {
      sidebar.classList.remove('mobile-open');
      const icon = toggleBtn.querySelector('i');
      icon.className = 'fas fa-bars';
    }
  }
});

// Add mobile menu toggle to all pages
document.addEventListener('DOMContentLoaded', function() {
  // Add mobile menu toggle button to all pages if it doesn't exist
  if (!document.querySelector('.mobile-menu-toggle')) {
    const container = document.querySelector('.dashboard-container');
    if (container) {
      const toggleBtn = document.createElement('button');
      toggleBtn.className = 'mobile-menu-toggle';
      toggleBtn.innerHTML = '<i class="fas fa-bars"></i>';
      toggleBtn.onclick = toggleMobileMenu;
      container.insertBefore(toggleBtn, container.firstChild);
    }
  }
  
  // Add ID to sidebar if it doesn't have one
  const sidebar = document.querySelector('.sidebar');
  if (sidebar && !sidebar.id) {
    sidebar.id = 'sidebar';
  }
});

// Search functionality (placeholder)
function handleSearch(event) {
  const searchInput = event.target;
  const query = searchInput.value.toLowerCase();
  
  // Add search functionality here
  console.log('Searching for:', query);
}

// Add search event listeners
document.addEventListener('DOMContentLoaded', function() {
  const searchInputs = document.querySelectorAll('.search-bar input');
  searchInputs.forEach(input => {
    input.addEventListener('input', handleSearch);
  });
});

// Notification functionality (placeholder)
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  // Remove notification after 3 seconds
  setTimeout(() => {
    notification.remove();
  }, 3000);
}

// Add button functionality (placeholder)
function handleAddButton() {
  showNotification('Add functionality coming soon!', 'info');
}

// Add event listeners for add buttons
document.addEventListener('DOMContentLoaded', function() {
  const addButtons = document.querySelectorAll('.add-btn');
  addButtons.forEach(btn => {
    btn.addEventListener('click', handleAddButton);
  });
});

// Notification Dropdown Logic
const notifBell = document.getElementById('notifBell');
const notifDropdown = document.getElementById('notifDropdown');
const notifList = document.getElementById('notifList');
const notifEmpty = document.getElementById('notifEmpty');

const notifications = [
  { icon: 'fa-gamepad', text: 'Valorant update available!' },
  { icon: 'fa-user-friends', text: 'New friend request from Alex.' },
  { icon: 'fa-trophy', text: 'Achievement unlocked: Sharpshooter!' }
];

function renderNotifications() {
  notifList.innerHTML = '';
  if (notifications.length === 0) {
    notifEmpty.style.display = 'block';
    return;
  }
  notifEmpty.style.display = 'none';
  notifications.forEach(n => {
    notifList.innerHTML += `<li class="notif-item"><span class="notif-icon"><i class="fas ${n.icon}"></i></span>${n.text}</li>`;
  });
}

if (notifBell && notifDropdown) {
  notifBell.addEventListener('click', (e) => {
    notifDropdown.classList.toggle('active');
    renderNotifications();
    e.stopPropagation();
  });
  document.addEventListener('click', (e) => {
    if (!notifBell.contains(e.target)) {
      notifDropdown.classList.remove('active');
    }
  });
  notifBell.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') notifDropdown.classList.remove('active');
  });
} 