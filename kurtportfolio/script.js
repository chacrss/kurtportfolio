// Tennis Ball Cursor Follower
const ball = document.getElementById('tennisBall');
let mouseX = 0, mouseY = 0;
let ballX = 0, ballY = 0;

// Track mouse movement
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    ball.style.opacity = '0.8';
});

// Animate tennis ball to follow cursor smoothly
function animateBall() {
    ballX += (mouseX - ballX - 30) * 0.1;
    ballY += (mouseY - ballY - 30) * 0.1;
    
    ball.style.left = ballX + 'px';
    ball.style.top = ballY + 'px';
    
    requestAnimationFrame(animateBall);
}

// Start the animation
animateBall();

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Intersection Observer for Scroll Animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 1s ease forwards';
        }
    });
}, { threshold: 0.1 });

// Observe elements for animation on scroll
document.querySelectorAll('.skill-card, .about-card, .timeline-item').forEach(el => {
    observer.observe(el);
});