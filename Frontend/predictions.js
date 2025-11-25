// Predictions Page JavaScript

// Mini chart for prediction cards
function createMiniChart(canvasId, isPositive = true) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = 60;
    
    // Generate random data with trend
    const points = [];
    const numPoints = 20;
    let value = 50;
    
    for (let i = 0; i < numPoints; i++) {
        value += (Math.random() - 0.4) * 5 + (isPositive ? 0.5 : -0.5);
        value = Math.max(20, Math.min(80, value));
        points.push({
            x: (i / (numPoints - 1)) * canvas.width,
            y: canvas.height - (value / 100) * canvas.height
        });
    }
    
    // Draw gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    const color = isPositive ? '16, 185, 129' : '239, 68, 68';
    gradient.addColorStop(0, `rgba(${color}, 0.2)`);
    gradient.addColorStop(1, `rgba(${color}, 0)`);
    
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    
    for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
    }
    
    ctx.lineTo(canvas.width, canvas.height);
    ctx.lineTo(0, canvas.height);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();
    
    // Draw line
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    
    for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
    }
    
    ctx.strokeStyle = isPositive ? '#10b981' : '#ef4444';
    ctx.lineWidth = 2;
    ctx.stroke();
}

// Initialize mini charts
document.addEventListener('DOMContentLoaded', () => {
    createMiniChart('chart-infy', true);
    createMiniChart('chart-hdfc', true);
    createMiniChart('chart-rel', true);
    createMiniChart('chart-aapl', true);
    createMiniChart('chart-tsla', true);
    createMiniChart('chart-msft', false);
    createMiniChart('chart-icici', true);
});

// Search functionality
const searchInput = document.getElementById('stockSearch');
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        console.log('Searching predictions for:', query);
        // Filter predictions based on search
    });
}

// Filter buttons
document.querySelectorAll('.filter-select').forEach(select => {
    select.addEventListener('change', (e) => {
        console.log('Filter changed:', e.target.value);
        // Apply filters to predictions
    });
});

// Add to watchlist
document.querySelectorAll('.prediction-card .btn-icon').forEach(btn => {
    if (btn.querySelector('.fa-plus')) {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const card = btn.closest('.prediction-card');
            const stockName = card.querySelector('h4').textContent;
            btn.innerHTML = '<i class="fas fa-check"></i>';
            btn.style.background = 'var(--success)';
            btn.style.color = 'white';
            console.log('Added to watchlist:', stockName);
            
            setTimeout(() => {
                btn.innerHTML = '<i class="fas fa-plus"></i>';
                btn.style.background = '';
                btn.style.color = '';
            }, 2000);
        });
    }
});

// Set alert
document.querySelectorAll('.prediction-card .btn-icon').forEach(btn => {
    if (btn.querySelector('.fa-bell')) {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const card = btn.closest('.prediction-card');
            const stockName = card.querySelector('h4').textContent;
            console.log('Set alert for:', stockName);
            alert(`Alert set for ${stockName}`);
        });
    }
});

// Prediction card click
document.querySelectorAll('.prediction-card:not(.add-new)').forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', function(e) {
        if (!e.target.closest('.btn-icon') && !e.target.closest('.btn')) {
            const stockName = this.querySelector('h4, h2').textContent;
            console.log('View details for:', stockName);
            // Navigate to stock details
        }
    });
});

console.log('Predictions page loaded');
