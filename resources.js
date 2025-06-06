// DOM Elements
const navbarToggle = document.querySelector('.navbar-toggle');
const navbarLinks = document.querySelector('.navbar-links');
const logoutBtn = document.getElementById('logoutBtn');
const resourceContainer = document.getElementById('resource-container');
const filterOptions = document.getElementById('filter-options');
const filterToggleBtn = document.getElementById('filter-toggle-btn');

// Modal elements
const videoModal = document.getElementById('video-modal');
const modalVideo = document.getElementById('modal-video');
const videoTitle = document.getElementById('video-title');
const videoDescription = document.getElementById('video-description');
const closeBtns = document.querySelectorAll('.close-btn');
const pdfModal = document.getElementById('pdf-modal');
const pdfViewer = document.getElementById('pdf-viewer');
const pdfTitle = document.getElementById('pdf-title');
const downloadPdfBtn = document.getElementById('download-pdf-btn');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Set up event listeners
    setupEventListeners();
    
    // Initialize filters
    filterResources();
});

// Set up all event listeners
function setupEventListeners() {
    // Navigation toggle for mobile
    navbarToggle.addEventListener('click', () => {
        navbarLinks.classList.toggle('active');
    });
    
    // Filter toggle for mobile
    filterToggleBtn.addEventListener('click', () => {
        filterOptions.classList.toggle('active');
    });
    
    // Search functionality
    document.getElementById('resource-search').addEventListener('input', function() {
        filterResources();
    });
    
    // Filter functionality
    document.getElementById('resource-type').addEventListener('change', filterResources);
    document.getElementById('resource-course').addEventListener('change', filterResources);
    
    // Video modal
    document.addEventListener('click', function(e) {
        if (e.target.closest('.watch-btn')) {
            const btn = e.target.closest('.watch-btn');
            openVideoModal(
                btn.dataset.video,
                btn.dataset.title,
                btn.dataset.description
            );
        }
        
        if (e.target.closest('.view-btn')) {
            const btn = e.target.closest('.view-btn');
            openPdfModal(
                btn.dataset.pdf,
                btn.dataset.title,
                btn.dataset.file
            );
        }
        
        if (e.target.closest('.download-btn')) {
            const btn = e.target.closest('.download-btn');
            downloadFile(btn.dataset.file);
        }
    });
    
    // Close modals
    closeBtns.forEach(btn => {
        btn.addEventListener('click', closeModals);
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === videoModal || e.target === pdfModal) {
            closeModals();
        }
    });
    
    // PDF download button in modal
    downloadPdfBtn.addEventListener('click', function() {
        downloadFile(this.dataset.file);
    });
    
    // Logout button
    logoutBtn.addEventListener('click', function(e) {
        e.preventDefault();
        if (confirm('Are you sure you want to logout?')) {
            // Clear any session data
            sessionStorage.clear();
            localStorage.clear();
            
            // Redirect to login page
            window.location.href = 'studentLog_in.html';
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', handleResize);
}

// Filter resources based on selections
function filterResources() {
    const searchTerm = document.getElementById('resource-search').value.toLowerCase();
    const typeValue = document.getElementById('resource-type').value;
    const courseValue = document.getElementById('resource-course').value;
    const resourceCards = document.querySelectorAll('#resource-container .resource-card');
    
    resourceCards.forEach(card => {
        const type = card.dataset.type;
        const paper = card.dataset.paper;
        const title = card.querySelector('.resource-title').textContent.toLowerCase();
        const description = card.querySelector('.resource-description').textContent.toLowerCase();
        
        const paperMatch = courseValue === 'all' || 
                         (courseValue === 'paper1' && paper === 'paper1') ||
                         (courseValue === 'paper2' && paper === 'paper2');
        
        const typeMatch = typeValue === 'all' || typeValue === type;
        const searchMatch = searchTerm === '' || 
                          title.includes(searchTerm) || 
                          description.includes(searchTerm);
        
        if (typeMatch && paperMatch && searchMatch) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

// Open video modal
function openVideoModal(videoSrc, title, description) {
    // Stop any currently playing video
    modalVideo.pause();
    modalVideo.currentTime = 0;
    
    // Set new video source
    modalVideo.src = videoSrc;
    videoTitle.textContent = title;
    videoDescription.textContent = description;
    
    // Show modal
    videoModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Play video when ready
    modalVideo.oncanplay = function() {
        modalVideo.play().catch(e => console.log('Autoplay prevented:', e));
    };
}

// Open PDF modal
function openPdfModal(pdfSrc, title, downloadUrl) {
    pdfViewer.src = pdfSrc;
    pdfTitle.textContent = title;
    downloadPdfBtn.dataset.file = downloadUrl;
    
    // Show modal
    pdfModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Adjust iframe height
    adjustPdfViewerHeight();
}

// Close all modals
function closeModals() {
    videoModal.style.display = 'none';
    pdfModal.style.display = 'none';
    document.body.style.overflow = 'auto';
    
    // Pause video
    modalVideo.pause();
    modalVideo.currentTime = 0;
}

// Download file
function downloadFile(fileUrl) {
    const a = document.createElement('a');
    a.href = fileUrl;
    a.download = fileUrl.split('/').pop();
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// Handle window resize
function handleResize() {
    // Close mobile menu if screen is large enough
    if (window.innerWidth > 768) {
        navbarLinks.classList.remove('active');
        filterOptions.classList.remove('active');
    }
    
    // Adjust iframe height for PDF viewer
    if (pdfModal.style.display === 'flex') {
        adjustPdfViewerHeight();
    }
}

// Adjust PDF viewer height
function adjustPdfViewerHeight() {
    const modalContent = document.querySelector('.modal-content');
    const headerHeight = document.querySelector('.pdf-header').offsetHeight;
    const availableHeight = window.innerHeight - headerHeight - 60; // 60px for padding/margins
    
    pdfViewer.style.height = `${availableHeight}px`;
}

// Add dynamic CSS
const dynamicCSS = `
@media (max-width: 768px) {
    .navbar-links {
        display: none;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: #fff;
        flex-direction: column;
        padding: 1rem;
        box-shadow: 0 5px 10px rgba(0,0,0,0.1);
        z-index: 1000;
    }
    
    .navbar-links.active {
        display: flex;
    }
    
    .navbar-links a {
        padding: 0.75rem 0;
        border-bottom: 1px solid #eee;
    }
    
    .logout-text {
        display: inline;
    }
    
    .filter-options {
        flex-direction: column;
        display: none;
    }
    
    .filter-options.active {
        display: flex;
    }
    
    .filter-group {
        margin-bottom: 1rem;
        width: 100%;
    }
    
    .resource-card {
        flex-direction: column;
    }
    
    .resource-image {
        width: 100%;
        height: auto;
        aspect-ratio: 16/9;
    }
    
    .resource-info {
        width: 100%;
    }
    
    .modal-content {
        width: 95%;
        padding: 15px;
    }
    
    .video-info {
        padding: 15px 0 0;
    }
}

@media (max-width: 480px) {
    .resource-actions {
        flex-direction: column;
    }
    
    .resource-actions .btn {
        width: 100%;
        margin: 5px 0;
    }
    
    .logout-text {
        display: none;
    }
}
`;

const style = document.createElement('style');
style.innerHTML = dynamicCSS;
document.head.appendChild(style);