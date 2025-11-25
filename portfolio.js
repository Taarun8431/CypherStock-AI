// Portfolio Page JavaScript

// Allocation Chart (Doughnut)
const allocationCanvas = document.getElementById('allocationChart');
if (allocationCanvas && typeof Chart !== 'undefined') {
    const ctx = allocationCanvas.getContext('2d');
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Stocks', 'Mutual Funds', 'ETFs', 'Bonds'],
            datasets: [{
                data: [65, 20, 10, 5],
                backgroundColor: [
                    '#6366f1',
                    '#10b981',
                    '#f59e0b',
                    '#3b82f6'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
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
                    callbacks: {
                        label: function(context) {
                            return context.label + ': ' + context.parsed + '%';
                        }
                    }
                }
            },
            cutout: '70%'
        }
    });
}

// Performance Chart
const performanceCanvas = document.getElementById('performanceChart');
if (performanceCanvas && typeof Chart !== 'undefined') {
    const ctx = performanceCanvas.getContext('2d');
    
    // Generate data
    const labels = [];
    const data = [];
    const today = new Date();
    
    for (let i = 30; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        labels.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
        
        const baseValue = 1100000 + (30 - i) * 4500;
        const variance = Math.random() * 30000 - 15000;
        data.push(baseValue + variance);
    }
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Portfolio Value',
                data: data,
                borderColor: '#10b981',
                backgroundColor: (context) => {
                    const ctx = context.chart.ctx;
                    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
                    gradient.addColorStop(0, 'rgba(16, 185, 129, 0.3)');
                    gradient.addColorStop(1, 'rgba(16, 185, 129, 0)');
                    return gradient;
                },
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointRadius: 0,
                pointHoverRadius: 6,
                pointHoverBackgroundColor: '#10b981',
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
                        color: 'rgba(16, 185, 129, 0.1)',
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
}

// Table actions
document.querySelectorAll('.btn-icon-small').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const icon = btn.querySelector('i');
        
        if (icon.classList.contains('fa-plus')) {
            console.log('Buy more clicked');
        } else if (icon.classList.contains('fa-minus')) {
            console.log('Sell clicked');
        } else if (icon.classList.contains('fa-chart-line')) {
            console.log('View details clicked');
        }
    });
});

// Time range selector
document.querySelectorAll('.time-range, .time-range-small').forEach(select => {
    select.addEventListener('change', (e) => {
        console.log('Time range changed to:', e.target.value);
        // Update charts with new data
    });
});

// Search holdings
const searchHoldings = document.querySelector('.search-box-small input');
if (searchHoldings) {
    searchHoldings.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        console.log('Searching holdings:', query);
        // Filter table rows
    });
}

console.log('Portfolio page loaded');
