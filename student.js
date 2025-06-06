// Navigation between sections
        document.querySelectorAll('.navbar-links a[data-section]').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Update active nav link
                document.querySelector('.navbar-links a.active').classList.remove('active');
                this.classList.add('active');
                
                // Hide all sections
                document.querySelectorAll('.content-section').forEach(section => {
                    section.classList.remove('active');
                });
                
                // Show selected section
                const sectionId = this.getAttribute('data-section') + '-section';
                document.getElementById(sectionId).classList.add('active');
            });
        });
        
        // Search functionality for courses
        document.getElementById('course-search').addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const courseCards = document.querySelectorAll('#courses-container .course-card');
            
            courseCards.forEach(card => {
                const title = card.querySelector('.course-title').textContent.toLowerCase();
                const instructor = card.querySelector('.course-meta span:first-child').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || instructor.includes(searchTerm)) {
                    card.style.display = 'block';
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
                const progressText = card.querySelector('.course-meta span:first-child').textContent.toLowerCase();
                
                if (filterValue === 'all') {
                    card.style.display = 'block';
                } else if (filterValue === 'current' && !progressText.includes('upcoming') && !progressText.includes('100%')) {
                    card.style.display = 'block';
                } else if (filterValue === 'completed' && progressText.includes('100%')) {
                    card.style.display = 'block';
                } else if (filterValue === 'upcoming' && progressText.includes('upcoming')) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
        
        // Search functionality for resources
        document.getElementById('resource-search').addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const resourceCards = document.querySelectorAll('#resource-container .resource-card');
            
            resourceCards.forEach(card => {
                const title = card.querySelector('.resource-title').textContent.toLowerCase();
                const description = card.querySelector('.resource-description').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || description.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
        
        // Filter functionality for resources
        document.getElementById('resource-type').addEventListener('change', filterResources);
        document.getElementById('resource-course').addEventListener('change', filterResources);
        
        function filterResources() {
            const typeValue = document.getElementById('resource-type').value;
            const courseValue = document.getElementById('resource-course').value;
            const resourceCards = document.querySelectorAll('#resource-container .resource-card');
            
            resourceCards.forEach(card => {
                const type = card.querySelector('.resource-image i').classList.contains('fa-video') ? 'video' :
                            card.querySelector('.resource-image i').classList.contains('fa-headphones') ? 'recording' :
                            card.querySelector('.resource-image i').classList.contains('fa-file-pdf') ? 'document' :
                            card.querySelector('.resource-image i').classList.contains('fa-file-word') ? 'document' :
                            'assignment';
                
                const course = card.querySelector('.resource-meta span:last-child').textContent.toLowerCase();
                const courseMatch = courseValue === 'all' || 
                                  (courseValue === 'web-dev' && course.includes('web')) ||
                                  (courseValue === 'database' && course.includes('database')) ||
                                  (courseValue === 'dsa' && course.includes('data'));
                
                const typeMatch = typeValue === 'all' || typeValue === type;
                
                if (typeMatch && courseMatch) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        }
        
        // Request form submission
        document.getElementById('request-form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulate form submission
            setTimeout(() => {
                const messageDiv = document.getElementById('request-message');
                messageDiv.textContent = 'Your request has been submitted successfully!';
                messageDiv.className = 'message success';
                
                // Reset form
                this.reset();
                
                // Hide message after 5 seconds
                setTimeout(() => {
                    messageDiv.className = 'message';
                }, 5000);
            }, 1000);
        });
        
        // Feedback modal
        const modal = document.getElementById('feedback-modal');
        const closeBtn = document.querySelector('.close-btn');
        const stars = document.querySelectorAll('[data-rating]');
        const ratingInput = document.getElementById('feedback-rating');
        
        // Open modal (you can trigger this when appropriate)
        function openFeedbackModal() {
            modal.style.display = 'flex';
        }
        
        // Close modal
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
        
        // Close when clicking outside modal
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
        
        // Star rating
        stars.forEach(star => {
            star.addEventListener('click', function() {
                const rating = this.getAttribute('data-rating');
                ratingInput.value = rating;
                
                stars.forEach((s, index) => {
                    if (index < rating) {
                        s.classList.remove('far');
                        s.classList.add('fas');
                    } else {
                        s.classList.remove('fas');
                        s.classList.add('far');
                    }
                });
            }); 
        });
        
        // Feedback form submission
        document.getElementById('feedback-form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulate form submission
            setTimeout(() => {
                modal.style.display = 'none';
                alert('Thank you for your feedback!');
                this.reset();
                
                // Reset stars
                stars.forEach(star => {
                    star.classList.remove('fas');
                    star.classList.add('far');
                });
            }, 1000);
        });
        
        // Logout button
        document.getElementById('logoutBtn').addEventListener('click', function(e) {
            e.preventDefault();
            if (confirm('Are you sure you want to logout?')) {
                // Here you would typically call your logout API
                // For now, just redirect to login page
                window.location.href = 'index.html';
            }
        });
        
        // Initialize filters
        filterResources();
        
        // Show feedback button after 30 seconds (demo purposes)
        setTimeout(openFeedbackModal, 30000);