document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const requestForm = document.getElementById('request-form');
    const logoutBtn = document.getElementById('logoutBtn');
    const navbarToggle = document.querySelector('.navbar-toggle');
    const navbarLinks = document.querySelector('.navbar-links');

    // Mobile menu toggle
    navbarToggle.addEventListener('click', function() {
        navbarLinks.classList.toggle('active');
    });

    // Form submission
    requestForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            // In a real app, you might want to show a loading state here
            this.submit();
        }
    });

    // Logout functionality
    logoutBtn.addEventListener('click', function(e) {
        e.preventDefault();
        // Clear any user session data
        sessionStorage.clear();
        localStorage.clear();
        // Redirect to login page
        window.location.href = 'studentLog_in.html';
    });

    // Prevent back navigation after logout
    window.addEventListener('popstate', function() {
        if (!sessionStorage.getItem('loggedIn')) {
            window.location.href = 'studentLog_in.html';
        }
    });

    // Form validation
    function validateForm() {
        const course = document.getElementById('paper-course').value;
        const title = document.getElementById('paper-title').value.trim();
        const year = document.getElementById('paper-year').value;
        const messageDiv = document.getElementById('request-message');
        
        // Reset message
        messageDiv.textContent = '';
        messageDiv.className = 'message';
        
        if (!course) {
            showMessage('Please select a course', 'error');
            return false;
        }
        
        if (!title) {
            showMessage('Please enter a paper title', 'error');
            return false;
        }
        
        if (!year || year < 2000 || year > 2025) {
            showMessage('Please enter a valid year between 2000 and 2025', 'error');
            return false;
        }
        
        return true;
    }

    function showMessage(message, type) {
        const messageDiv = document.getElementById('request-message');
        messageDiv.textContent = message;
        messageDiv.className = `message ${type}`;
        
        setTimeout(() => {
            messageDiv.textContent = '';
            messageDiv.className = 'message';
        }, 5000);
    }
});