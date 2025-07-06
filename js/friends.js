// friends.js

// Simulated friends data
let friendsData = [
  {
    id: 1,
    name: "Alex Johnson",
    username: "alex_gamer",
    avatar: "images/friend2.jpg",
    status: "online",
    currentGame: null,
    lastSeen: null
  },
  {
    id: 2,
    name: "Sarah Chen",
    username: "sarah_plays",
    avatar: "images/friend3.jpg",
    status: "offline",
    currentGame: null,
    lastSeen: "2 hours ago"
  },
  {
    id: 3,
    name: "Mike Rodriguez",
    username: "mike_rage",
    avatar: "images/friend4.jpg",
    status: "ingame",
    currentGame: "Valorant",
    lastSeen: null
  },
  {
    id: 4,
    name: "Emma Wilson",
    username: "emma_warrior",
    avatar: "images/friend5.jpg",
    status: "online",
    currentGame: null,
    lastSeen: null
  },
  {
    id: 5,
    name: "David Kim",
    username: "david_pro",
    avatar: "images/friend6.jpg",
    status: "offline",
    currentGame: null,
    lastSeen: "1 day ago"
  },
  {
    id: 6,
    name: "Lisa Thompson",
    username: "lisa_gamer",
    avatar: "images/friend7.jpg",
    status: "ingame",
    currentGame: "CS:GO",
    lastSeen: null
  },
  {
    id: 7,
    name: "James Brown",
    username: "james_legend",
    avatar: "images/friend2.jpg",
    status: "online",
    currentGame: null,
    lastSeen: null
  },
  {
    id: 8,
    name: "Maria Garcia",
    username: "maria_queen",
    avatar: "images/friend3.jpg",
    status: "ingame",
    currentGame: "League of Legends",
    lastSeen: null
  },
  {
    id: 9,
    name: "Tom Anderson",
    username: "tom_ace",
    avatar: "images/friend4.jpg",
    status: "online",
    currentGame: null,
    lastSeen: null
  },
  {
    id: 10,
    name: "Anna Lee",
    username: "anna_sniper",
    avatar: "images/friend5.jpg",
    status: "offline",
    currentGame: null,
    lastSeen: "3 hours ago"
  },
  {
    id: 11,
    name: "Chris Taylor",
    username: "chris_king",
    avatar: "images/friend6.jpg",
    status: "online",
    currentGame: null,
    lastSeen: null
  },
  {
    id: 12,
    name: "Rachel Green",
    username: "rachel_gaming",
    avatar: "images/friend7.jpg",
    status: "offline",
    currentGame: null,
    lastSeen: "5 hours ago"
  }
];

let currentFilter = 'all';
let currentChatFriend = null;
let chatMessages = {};

// Load friends from localStorage
function loadFriendsFromStorage() {
  const savedFriends = localStorage.getItem('friendsData');
  if (savedFriends) {
    friendsData = JSON.parse(savedFriends);
  }
}

// Save friends to localStorage
function saveFriendsToStorage() {
  localStorage.setItem('friendsData', JSON.stringify(friendsData));
}

// Initialize friends page
function initFriends() {
  loadFriendsFromStorage();
  renderFriends();
  setupFilterTabs();
  updateFilterCounts();
}

// Render friends based on current filter
function renderFriends() {
  const container = document.getElementById('friends-grid');
  const filteredFriends = getFilteredFriends();
  
  container.innerHTML = filteredFriends.map(friend => `
    <div class="friend-card ${friend.status}" data-id="${friend.id}">
      <div class="friend-avatar">
        <img src="${friend.avatar}" alt="${friend.name}">
        <div class="status-indicator ${friend.status}"></div>
      </div>
      <div class="friend-info">
        <h3>${friend.name}</h3>
        <span class="username">@${friend.username}</span>
        ${friend.currentGame ? `<span class="current-game">Playing ${friend.currentGame}</span>` : ''}
        ${friend.lastSeen ? `<span class="last-seen">Last seen ${friend.lastSeen}</span>` : ''}
      </div>
      <div class="friend-actions">
        <button class="action-btn chat-btn" onclick="openChat(${friend.id})" title="Chat">
          <i class="fas fa-comment"></i>
        </button>
        <button class="action-btn remove-btn" onclick="removeFriend(${friend.id})" title="Remove Friend">
          <i class="fas fa-user-minus"></i>
        </button>
      </div>
    </div>
  `).join('');
}

// Get filtered friends
function getFilteredFriends() {
  switch(currentFilter) {
    case 'online':
      return friendsData.filter(friend => friend.status === 'online');
    case 'offline':
      return friendsData.filter(friend => friend.status === 'offline');
    case 'ingame':
      return friendsData.filter(friend => friend.status === 'ingame');
    default:
      return friendsData;
  }
}

// Setup filter tabs
function setupFilterTabs() {
  const filterTabs = document.querySelectorAll('.filter-tab');
  
  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active class from all tabs
      filterTabs.forEach(t => t.classList.remove('active'));
      
      // Add active class to clicked tab
      tab.classList.add('active');
      
      // Update current filter
      currentFilter = tab.dataset.filter;
      
      // Re-render friends
      renderFriends();
    });
  });
}

// Update filter counts
function updateFilterCounts() {
  const allCount = friendsData.length;
  const onlineCount = friendsData.filter(f => f.status === 'online').length;
  const offlineCount = friendsData.filter(f => f.status === 'offline').length;
  const ingameCount = friendsData.filter(f => f.status === 'ingame').length;
  
  document.querySelector('[data-filter="all"]').textContent = `All Friends (${allCount})`;
  document.querySelector('[data-filter="online"]').textContent = `Online (${onlineCount})`;
  document.querySelector('[data-filter="offline"]').textContent = `Offline (${offlineCount})`;
  document.querySelector('[data-filter="ingame"]').textContent = `In Game (${ingameCount})`;
}

// Open add friend modal
function openAddFriendModal() {
  document.getElementById('add-friend-modal').style.display = 'flex';
  document.getElementById('friend-username').value = '';
  document.getElementById('avatar-preview').src = 'images/default-avatar.jpg';
}

// Close add friend modal
function closeAddFriendModal() {
  document.getElementById('add-friend-modal').style.display = 'none';
}

// Change avatar (simulated)
function changeAvatar() {
  const avatars = [
    'images/friend2.jpg',
    'images/friend3.jpg',
    'images/friend4.jpg',
    'images/friend5.jpg',
    'images/friend6.jpg',
    'images/friend7.jpg'
  ];
  
  const randomAvatar = avatars[Math.floor(Math.random() * avatars.length)];
  document.getElementById('avatar-preview').src = randomAvatar;
}

// Add friend
function addFriend() {
  const username = document.getElementById('friend-username').value.trim();
  const avatar = document.getElementById('avatar-preview').src;
  
  if (!username) {
    alert('Please enter a username');
    return;
  }
  
  // Check if friend already exists
  if (friendsData.some(friend => friend.username === username)) {
    alert('Friend already exists!');
    return;
  }
  
  // Create new friend
  const newFriend = {
    id: Date.now(),
    name: username.charAt(0).toUpperCase() + username.slice(1),
    username: username,
    avatar: avatar,
    status: 'online',
    currentGame: null,
    lastSeen: null
  };
  
  friendsData.push(newFriend);
  saveFriendsToStorage();
  
  closeAddFriendModal();
  renderFriends();
  updateFilterCounts();
  
  // Show success message
  showNotification(`Added ${newFriend.name} as friend!`);
}

// Remove friend
function removeFriend(friendId) {
  const friend = friendsData.find(f => f.id === friendId);
  if (friend && confirm(`Remove ${friend.name} from friends?`)) {
    friendsData = friendsData.filter(f => f.id !== friendId);
    saveFriendsToStorage();
    renderFriends();
    updateFilterCounts();
    showNotification(`Removed ${friend.name} from friends`);
  }
}

// Open chat modal
function openChat(friendId) {
  const friend = friendsData.find(f => f.id === friendId);
  if (!friend) return;
  
  currentChatFriend = friend;
  
  // Update chat header
  document.getElementById('chat-friend-avatar').src = friend.avatar;
  document.getElementById('chat-friend-name').textContent = friend.name;
  document.getElementById('chat-friend-status').textContent = friend.status;
  
  // Load chat messages
  if (!chatMessages[friendId]) {
    chatMessages[friendId] = [
      { sender: 'friend', message: 'Hey! How are you?', time: '2:30 PM' },
      { sender: 'me', message: 'I\'m good! Just playing some games', time: '2:32 PM' },
      { sender: 'friend', message: 'Nice! What are you playing?', time: '2:33 PM' }
    ];
  }
  
  renderChatMessages();
  document.getElementById('chat-modal').style.display = 'flex';
  document.getElementById('message-input').focus();
}

// Close chat modal
function closeChatModal() {
  document.getElementById('chat-modal').style.display = 'none';
  currentChatFriend = null;
}

// Render chat messages
function renderChatMessages() {
  if (!currentChatFriend) return;
  
  const messages = chatMessages[currentChatFriend.id] || [];
  const container = document.getElementById('chat-messages');
  
  container.innerHTML = messages.map(msg => `
    <div class="chat-message ${msg.sender}">
      <div class="message-content">
        <p>${msg.message}</p>
        <span class="message-time">${msg.time}</span>
      </div>
    </div>
  `).join('');
  
  // Scroll to bottom
  container.scrollTop = container.scrollHeight;
}

// Send message
function sendMessage() {
  const input = document.getElementById('message-input');
  const message = input.value.trim();
  
  if (!message || !currentChatFriend) return;
  
  const now = new Date();
  const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
  // Add message to chat
  if (!chatMessages[currentChatFriend.id]) {
    chatMessages[currentChatFriend.id] = [];
  }
  
  chatMessages[currentChatFriend.id].push({
    sender: 'me',
    message: message,
    time: time
  });
  
  // Clear input
  input.value = '';
  
  // Re-render messages
  renderChatMessages();
  
  // Simulate friend response after 2 seconds
  setTimeout(() => {
    const responses = [
      'That\'s cool!',
      'Nice!',
      'I see!',
      'Interesting!',
      'Got it!',
      'Awesome!'
    ];
    
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    const responseTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    chatMessages[currentChatFriend.id].push({
      sender: 'friend',
      message: randomResponse,
      time: responseTime
    });
    
    renderChatMessages();
  }, 2000);
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

// Handle Enter key in chat input
document.addEventListener('DOMContentLoaded', () => {
  const messageInput = document.getElementById('message-input');
  if (messageInput) {
    messageInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        sendMessage();
      }
    });
  }
});

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initFriends); 