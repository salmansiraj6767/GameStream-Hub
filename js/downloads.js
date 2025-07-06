// downloads.js

// Simulated download data
const downloadData = {
  active: [
    {
      id: 1,
      name: "FIFA 23",
      type: "Sports simulator",
      image: "images/fifa23.webp",
      size: "1.23GB",
      downloaded: "265MB",
      progress: 0,
      speed: "2.1 MB/s",
      eta: "1 hour 22 min",
      status: "downloading" // downloading, paused, completed, cancelled
    },
    {
      id: 2,
      name: "Call of Duty: Warzone",
      type: "Battle Royale",
      image: "images/call of duty.webp",
      size: "85.4GB",
      downloaded: "12.3GB",
      progress: 0,
      speed: "5.2 MB/s",
      eta: "3 hours 45 min",
      status: "downloading"
    },
    {
      id: 3,
      name: "Cyberpunk 2077",
      type: "RPG",
      image: "images/cyberpunk.jpg",
      size: "63.2GB",
      downloaded: "8.7GB",
      progress: 0,
      speed: "3.8 MB/s",
      eta: "4 hours 12 min",
      status: "downloading"
    }
  ],
  completed: [
    {
      id: 4,
      name: "Valorant",
      type: "FPS",
      image: "images/Valorant.png",
      size: "12.8GB",
      downloaded: "12.8GB",
      progress: 100,
      completedAt: "2024-01-15 14:30"
    },
    {
      id: 5,
      name: "Elden Ring",
      type: "Action RPG",
      image: "images/eldenring.webp",
      size: "48.5GB",
      downloaded: "48.5GB",
      progress: 100,
      completedAt: "2024-01-14 09:15"
    }
  ]
};

let downloadIntervals = {};

// Initialize downloads page
function initDownloads() {
  renderActiveDownloads();
  renderCompletedDownloads();
  startDownloadSimulation();
  updateStats();
}

// Render active downloads
function renderActiveDownloads() {
  const container = document.getElementById('active-downloads-list');
  container.innerHTML = downloadData.active.map(download => `
    <div class="download-item" data-id="${download.id}">
      <div class="download-header">
        <div class="download-info">
          <img src="${download.image}" alt="${download.name}" class="download-thumb">
          <div class="download-details">
            <h3>${download.name}</h3>
            <span class="download-type">${download.type}</span>
          </div>
        </div>
        <div class="download-controls">
          <button class="control-btn pause-btn" onclick="toggleDownload(${download.id})" title="Pause">
            <i class="fas fa-pause"></i>
          </button>
          <button class="control-btn cancel-btn" onclick="cancelDownload(${download.id})" title="Cancel">
            <i class="fas fa-times"></i>
          </button>
        </div>
      </div>
      
      <div class="download-progress-section">
        <div class="progress-info">
          <span class="progress-text">${download.downloaded} / ${download.size}</span>
          <span class="speed-text">${download.speed}</span>
        </div>
        <div class="progress-bar">
          <div class="progress-fill" style="width: ${download.progress}%"></div>
        </div>
        <div class="download-meta">
          <span class="eta-text">${download.eta} remaining</span>
          <span class="percentage">${Math.round(download.progress)}%</span>
        </div>
      </div>
    </div>
  `).join('');
}

// Render completed downloads
function renderCompletedDownloads() {
  const container = document.getElementById('completed-downloads-list');
  container.innerHTML = downloadData.completed.map(download => `
    <div class="download-item completed" data-id="${download.id}">
      <div class="download-header">
        <div class="download-info">
          <img src="${download.image}" alt="${download.name}" class="download-thumb">
          <div class="download-details">
            <h3>${download.name}</h3>
            <span class="download-type">${download.type}</span>
          </div>
        </div>
        <div class="download-status">
          <i class="fas fa-check-circle"></i>
          <span>Completed</span>
        </div>
      </div>
      
      <div class="download-completion-info">
        <span class="completion-date">Completed on ${formatDate(download.completedAt)}</span>
        <button class="play-btn" onclick="playGame(${download.id})">
          <i class="fas fa-play"></i>
        </button>
      </div>
    </div>
  `).join('');
}

// Start download simulation
function startDownloadSimulation() {
  downloadData.active.forEach(download => {
    if (download.status === 'downloading') {
      simulateDownload(download.id);
    }
  });
}

// Simulate download progress
function simulateDownload(downloadId) {
  const download = downloadData.active.find(d => d.id === downloadId);
  if (!download || download.status !== 'downloading') return;

  downloadIntervals[downloadId] = setInterval(() => {
    if (download.status === 'paused') return;
    
    // Simulate progress increase
    const progressIncrement = Math.random() * 2 + 0.5; // 0.5 to 2.5%
    download.progress = Math.min(download.progress + progressIncrement, 100);
    
    // Update downloaded size
    const totalSizeMB = parseFloat(download.size.replace('GB', '')) * 1024;
    const downloadedMB = (download.progress / 100) * totalSizeMB;
    download.downloaded = formatSize(downloadedMB);
    
    // Update ETA
    const remainingMB = totalSizeMB - downloadedMB;
    const speedMBps = parseFloat(download.speed.replace(' MB/s', ''));
    const remainingSeconds = remainingMB / speedMBps;
    download.eta = formatTime(remainingSeconds);
    
    // Update UI
    updateDownloadUI(downloadId);
    
    // Check if completed
    if (download.progress >= 100) {
      completeDownload(downloadId);
    }
  }, 1000);
}

// Update download UI
function updateDownloadUI(downloadId) {
  const download = downloadData.active.find(d => d.id === downloadId);
  if (!download) return;

  const downloadElement = document.querySelector(`[data-id="${downloadId}"]`);
  if (!downloadElement) return;

  const progressFill = downloadElement.querySelector('.progress-fill');
  const progressText = downloadElement.querySelector('.progress-text');
  const etaText = downloadElement.querySelector('.eta-text');
  const percentage = downloadElement.querySelector('.percentage');

  if (progressFill) progressFill.style.width = `${download.progress}%`;
  if (progressText) progressText.textContent = `${download.downloaded} / ${download.size}`;
  if (etaText) etaText.textContent = `${download.eta} remaining`;
  if (percentage) percentage.textContent = `${Math.round(download.progress)}%`;
}

// Toggle download (pause/resume)
function toggleDownload(downloadId) {
  const download = downloadData.active.find(d => d.id === downloadId);
  if (!download) return;

  const button = document.querySelector(`[data-id="${downloadId}"] .pause-btn i`);
  
  if (download.status === 'downloading') {
    download.status = 'paused';
    button.className = 'fas fa-play';
    button.parentElement.title = 'Resume';
  } else {
    download.status = 'downloading';
    button.className = 'fas fa-pause';
    button.parentElement.title = 'Pause';
  }
}

// Cancel download
function cancelDownload(downloadId) {
  const download = downloadData.active.find(d => d.id === downloadId);
  if (!download) return;

  download.status = 'cancelled';
  clearInterval(downloadIntervals[downloadId]);
  
  // Remove from active downloads
  downloadData.active = downloadData.active.filter(d => d.id !== downloadId);
  
  renderActiveDownloads();
  updateStats();
}

// Complete download
function completeDownload(downloadId) {
  const download = downloadData.active.find(d => d.id === downloadId);
  if (!download) return;

  clearInterval(downloadIntervals[downloadId]);
  
  // Move to completed downloads
  download.status = 'completed';
  download.completedAt = new Date().toISOString();
  downloadData.completed.unshift(download);
  downloadData.active = downloadData.active.filter(d => d.id !== downloadId);
  
  renderActiveDownloads();
  renderCompletedDownloads();
  updateStats();
}

// Update stats
function updateStats() {
  const activeCount = downloadData.active.filter(d => d.status === 'downloading').length;
  const totalTime = calculateTotalTime();
  
  document.getElementById('active-downloads').textContent = activeCount;
  document.getElementById('total-time').textContent = totalTime;
}

// Calculate total remaining time
function calculateTotalTime() {
  const activeDownloads = downloadData.active.filter(d => d.status === 'downloading');
  let totalSeconds = 0;
  
  activeDownloads.forEach(download => {
    const totalSizeMB = parseFloat(download.size.replace('GB', '')) * 1024;
    const downloadedMB = (download.progress / 100) * totalSizeMB;
    const remainingMB = totalSizeMB - downloadedMB;
    const speedMBps = parseFloat(download.speed.replace(' MB/s', ''));
    totalSeconds += remainingMB / speedMBps;
  });
  
  return formatTime(totalSeconds);
}

// Utility functions
function formatSize(mb) {
  if (mb >= 1024) {
    return `${(mb / 1024).toFixed(1)}GB`;
  }
  return `${Math.round(mb)}MB`;
}

function formatTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
}

function playGame(downloadId) {
  const download = downloadData.completed.find(d => d.id === downloadId);
  if (download) {
    alert(`Launching ${download.name}...`);
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initDownloads); 