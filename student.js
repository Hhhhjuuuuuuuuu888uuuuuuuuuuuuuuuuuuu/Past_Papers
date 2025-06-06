// Navigation handling
document.querySelectorAll('.navbar-links a').forEach(link => {
    link.addEventListener('click', function(e) {
        if (this.id !== 'logoutBtn') {
            e.preventDefault();
            
            // Update active nav link
            document.querySelector('.navbar-links a.active').classList.remove('active');
            this.classList.add('active');
            
            // Redirect to the appropriate page
            if (this.getAttribute('data-section') === 'courses') {
                window.location.href = 'student.html';
            } else if (this.getAttribute('data-section') === 'resources') {
                window.location.href = 'resources.html';
            } else if (this.getAttribute('data-section') === 'requests') {
                window.location.href = 'request_papers.html';
            }
        }
    });
});

// Search functionality for courses
document.getElementById('course-search').addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    const courseCards = document.querySelectorAll('#courses-container .course-card');
    
    courseCards.forEach(card => {
        const title = card.querySelector('.course-title').textContent.toLowerCase();
        
        if (title.includes(searchTerm)) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
});

// Filter functionality for courses
document.getElementById('course-filter').addEventListener('change', function() {
    const filterValue = this.value;
    const courseCards = document.querySelectorAll('#courses-container .course-card');
    
    courseCards.forEach(card => {
        const paper = card.getAttribute('data-paper');
        
        if (filterValue === 'all') {
            card.style.display = 'flex';
        } else if (filterValue === 'paper1' && paper === 'paper1') {
            card.style.display = 'flex';
        } else if (filterValue === 'paper2' && paper === 'paper2') {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
});

// Continue button functionality
document.querySelectorAll('.continue-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const page = this.getAttribute('data-page');
        window.location.href = page;
    });
});

// Details button functionality with animation
document.querySelectorAll('.details-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const details = this.closest('.course-info').querySelector('.course-details');
        
        // Toggle display with animation
        if (details.style.display === 'none' || !details.style.display) {
            details.style.display = 'block';
            details.style.animation = 'fadeIn 0.3s ease-in-out';
        } else {
            details.style.animation = 'fadeOut 0.3s ease-in-out';
            setTimeout(() => {
                details.style.display = 'none';
            }, 300);
        }
    });
});

// Logout button
document.getElementById('logoutBtn').addEventListener('click', function(e) {
    e.preventDefault();
    if (confirm('Are you sure you want to logout?')) {
        // Clear any session data
        sessionStorage.clear();
        localStorage.clear();
        
        // Redirect to login page with no history
        window.location.replace('studentLog_in.html');
    }
});

// Add animation styles dynamically
const style = document.createElement('style');
style.innerHTML = `
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeOut {
    from { opacity: 1; transform: translateY(0); }
    to { opacity: 0; transform: translateY(-10px); }
}

.course-details {
    margin-top: 10px;
    padding: 10px;
    background-color: #f8f9fa;
    border-radius: 4px;
    animation: fadeIn 0.3s ease-in-out;
}
`;
document.head.appendChild(style);