// Main Script for Landing Page

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.boxShadow = 'none';
    }
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe feature cards
document.querySelectorAll('.feature-card, .pricing-card, .step').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// Hero Chart (Simple animated chart)
const heroChartCanvas = document.getElementById('heroChart');
if (heroChartCanvas) {
    const ctx = heroChartCanvas.getContext('2d');
    heroChartCanvas.width = 400;
    heroChartCanvas.height = 300;

    function drawChart() {
        ctx.clearRect(0, 0, heroChartCanvas.width, heroChartCanvas.height);
        
        // Draw grid
        ctx.strokeStyle = 'rgba(99, 102, 241, 0.1)';
        ctx.lineWidth = 1;
        
        for (let i = 0; i < 5; i++) {
            const y = (i * heroChartCanvas.height) / 4;
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(heroChartCanvas.width, y);
            ctx.stroke();
        }

        // Draw line chart
        const points = [
            { x: 0, y: 200 },
            { x: 50, y: 180 },
            { x: 100, y: 190 },
            { x: 150, y: 140 },
            { x: 200, y: 160 },
            { x: 250, y: 120 },
            { x: 300, y: 100 },
            { x: 350, y: 80 },
            { x: 400, y: 60 }
        ];

        // Gradient fill
        const gradient = ctx.createLinearGradient(0, 0, 0, heroChartCanvas.height);
        gradient.addColorStop(0, 'rgba(99, 102, 241, 0.3)');
        gradient.addColorStop(1, 'rgba(99, 102, 241, 0)');

        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        
        for (let i = 1; i < points.length; i++) {
            ctx.lineTo(points[i].x, points[i].y);
        }
        
        ctx.lineTo(heroChartCanvas.width, heroChartCanvas.height);
        ctx.lineTo(0, heroChartCanvas.height);
        ctx.closePath();
        ctx.fillStyle = gradient;
        ctx.fill();

        // Draw line
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        
        for (let i = 1; i < points.length; i++) {
            ctx.lineTo(points[i].x, points[i].y);
        }
        
        ctx.strokeStyle = '#6366f1';
        ctx.lineWidth = 3;
        ctx.stroke();

        // Draw points
        points.forEach(point => {
            ctx.beginPath();
            ctx.arc(point.x, point.y, 4, 0, Math.PI * 2);
            ctx.fillStyle = '#6366f1';
            ctx.fill();
        });
    }

    drawChart();
}
