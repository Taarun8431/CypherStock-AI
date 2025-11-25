// Dashboard JavaScript

// Check if user is authenticated
const user = JSON.parse(localStorage.getItem('user'));
if (!user || !user.authenticated) {
    window.location.href = 'signin.html';
}

// Update user info
const userAvatar = document.querySelector('.user-avatar');
const userInfoName = document.querySelector('.user-info h4');
if (user && userAvatar && userInfoName) {
    userAvatar.textContent = user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    userInfoName.textContent = user.name;
}

// Logout functionality
const logoutButton = document.querySelector('.btn-logout');
if (logoutButton) {
    logoutButton.addEventListener('click', () => {
        if (confirm('Are you sure you want to logout?')) {
            localStorage.removeItem('user');
            window.location.href = 'signin.html';
        }
    });
}

// Mobile sidebar toggle
const menuToggle = document.querySelector('.menu-toggle');
const sidebar = document.querySelector('.sidebar');

if (menuToggle && sidebar) {
    menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
                sidebar.classList.remove('active');
            }
        }
    });
}

// Portfolio Chart
const portfolioChartCanvas = document.getElementById('portfolioChart');
if (portfolioChartCanvas && typeof Chart !== 'undefined') {
    const ctx = portfolioChartCanvas.getContext('2d');
    
    // Generate sample data
    const labels = [];
    const data = [];
    const today = new Date();
    
    for (let i = 30; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        labels.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
        
        // Generate random-ish data with upward trend
        const baseValue = 1000000 + (30 - i) * 8000;
        const variance = Math.random() * 40000 - 20000;
        data.push(baseValue + variance);
    }
    
    const portfolioChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Portfolio Value',
                data: data,
                borderColor: '#6366f1',
                backgroundColor: (context) => {
                    const ctx = context.chart.ctx;
                    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
                    gradient.addColorStop(0, 'rgba(99, 102, 241, 0.3)');
                    gradient.addColorStop(1, 'rgba(99, 102, 241, 0)');
                    return gradient;
                },
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointRadius: 0,
                pointHoverRadius: 6,
                pointHoverBackgroundColor: '#6366f1',
                pointHoverBorderColor: '#ffffff',
                pointHoverBorderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: '#1a1a2e',
                    titleColor: '#ffffff',
                    bodyColor: '#a0a0c0',
                    borderColor: '#2d2d4a',
                    borderWidth: 1,
                    padding: 12,
                    displayColors: false,
                    callbacks: {
                        label: function(context) {
                            return '₹' + context.parsed.y.toLocaleString('en-IN');
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false,
                        drawBorder: false
                    },
                    ticks: {
                        color: '#a0a0c0',
                        maxTicksLimit: 6
                    }
                },
                y: {
                    grid: {
                        color: 'rgba(99, 102, 241, 0.1)',
                        drawBorder: false
                    },
                    ticks: {
                        color: '#a0a0c0',
                        callback: function(value) {
                            return '₹' + (value / 100000).toFixed(1) + 'L';
                        }
                    }
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            }
        }
    });

    // Time range selector
    const timeRangeSelect = document.querySelector('.time-range');
    if (timeRangeSelect) {
        timeRangeSelect.addEventListener('change', (e) => {
            console.log('Time range changed to:', e.target.value);
            // In a real app, this would fetch new data and update the chart
        });
    }
}

// Animated counter for stats
function animateValue(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            current = end;
            clearInterval(timer);
        }
        
        if (element.textContent.includes('₹')) {
            element.textContent = '₹' + Math.floor(current).toLocaleString('en-IN');
        } else if (element.textContent.includes('%')) {
            element.textContent = Math.floor(current) + '%';
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Animate stat values on load
document.querySelectorAll('.stat-value').forEach((el, index) => {
    setTimeout(() => {
        const text = el.textContent;
        const numStr = text.replace(/[^0-9.]/g, '');
        const num = parseFloat(numStr);
        
        if (!isNaN(num)) {
            el.textContent = text.replace(numStr, '0');
            animateValue(el, 0, num, 1000);
        }
    }, index * 100);
});

// Real-time data updates (simulated)
function updateRealTimeData() {
    // Update prediction values
    const predictionValues = document.querySelectorAll('.prediction-value span');
    predictionValues.forEach(value => {
        const currentValue = parseFloat(value.textContent);
        const change = (Math.random() - 0.5) * 0.5;
        const newValue = currentValue + change;
        value.textContent = (newValue >= 0 ? '+' : '') + newValue.toFixed(1) + '%';
    });

    // Update confidence badges
    const confidenceBadges = document.querySelectorAll('.confidence-badge');
    confidenceBadges.forEach(badge => {
        const currentValue = parseInt(badge.textContent);
        const change = Math.floor((Math.random() - 0.5) * 4);
        const newValue = Math.max(70, Math.min(99, currentValue + change));
        badge.textContent = newValue + '%';
    });
}

// Update data every 10 seconds
setInterval(updateRealTimeData, 10000);

// Search functionality
const searchInput = document.querySelector('.search-box input');
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        console.log('Searching for:', query);
        // In a real app, this would filter/search stocks
    });
}

// Notification badge
const notificationBtn = document.querySelector('.icon-btn .fa-bell');
if (notificationBtn) {
    notificationBtn.parentElement.addEventListener('click', () => {
        alert('You have 3 new notifications:\n\n1. Strong buy signal for Reliance\n2. Price alert reached for ICICI Bank\n3. Market update: Nifty crosses 19,500');
    });
}

// Add click handlers for prediction items
document.querySelectorAll('.prediction-item, .holding-item').forEach(item => {
    item.style.cursor = 'pointer';
    item.addEventListener('click', function() {
        this.style.transform = 'scale(0.98)';
        setTimeout(() => {
            this.style.transform = '';
        }, 100);
        
        const stockName = this.querySelector('h4').textContent;
        console.log('Clicked on:', stockName);
        // In a real app, this would open detailed view
    });
});

// Alert item animations
document.querySelectorAll('.alert-item').forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-20px)';
    
    setTimeout(() => {
        item.style.transition = 'all 0.3s ease';
        item.style.opacity = '1';
        item.style.transform = 'translateX(0)';
    }, index * 100);
});

// Smooth scroll for dashboard
document.querySelectorAll('.view-all').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('View all clicked');
        // In a real app, this would navigate to the full view
    });
});

// Add hover effects to cards
document.querySelectorAll('.dashboard-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
        this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = '';
        this.style.boxShadow = '';
    });
});

// Simulate new alert notification
setTimeout(() => {
    const notificationDot = document.querySelector('.notification-dot');
    if (notificationDot) {
        notificationDot.style.animation = 'pulse 2s infinite';
    }
}, 5000);

// Add pulse animation
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.2); opacity: 0.8; }
    }
`;
document.head.appendChild(style);

console.log('Dashboard loaded for user:', user.name);
