// DMAT Account Page JavaScript

// Connect broker
document.querySelectorAll('.broker-card .btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const brokerName = this.closest('.broker-card').querySelector('h4').textContent;
        console.log('Connecting to:', brokerName);
        
        // Show loading
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Connecting...';
        this.disabled = true;
        
        // Simulate connection
        setTimeout(() => {
            alert(`Redirecting to ${brokerName} login...`);
            this.innerHTML = 'Connect';
            this.disabled = false;
        }, 1500);
    });
});

// Sync account
document.querySelectorAll('.account-actions .fa-sync').forEach(btn => {
    btn.parentElement.addEventListener('click', function() {
        const accountCard = this.closest('.dmat-account-card');
        const brokerName = accountCard.querySelector('h3').textContent;
        
        console.log('Syncing:', brokerName);
        
        // Show loading
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Syncing...';
        this.disabled = true;
        
        // Simulate sync
        setTimeout(() => {
            this.innerHTML = '<i class="fas fa-sync"></i> Sync Now';
            this.disabled = false;
            
            // Update last sync time
            const lastSync = accountCard.querySelector('.last-sync');
            lastSync.innerHTML = '<i class="fas fa-clock"></i> Last synced: Just now';
        }, 2000);
    });
});

// View details
document.querySelectorAll('.account-actions .fa-chart-simple').forEach(btn => {
    btn.parentElement.addEventListener('click', function() {
        const brokerName = this.closest('.dmat-account-card').querySelector('h3').textContent;
        console.log('View details for:', brokerName);
        // Navigate to detailed view
    });
});

// Account menu
document.querySelectorAll('.account-status .btn-icon-small').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.stopPropagation();
        console.log('Account menu clicked');
        // Show dropdown menu with options: Disconnect, Settings, etc.
    });
});

// Link new account
const addNewCard = document.querySelector('.dmat-account-card.add-new');
if (addNewCard) {
    addNewCard.querySelector('.btn').addEventListener('click', () => {
        console.log('Link new account clicked');
        // Scroll to supported brokers or open modal
        document.querySelector('.brokers-grid').scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    });
}

// FAQ accordion
document.querySelectorAll('.faq-item').forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    
    // Hide answers by default
    answer.style.display = 'none';
    
    question.style.cursor = 'pointer';
    question.addEventListener('click', function() {
        const icon = this.querySelector('i');
        const isOpen = answer.style.display === 'block';
        
        // Close all other FAQs
        document.querySelectorAll('.faq-answer').forEach(a => {
            a.style.display = 'none';
        });
        document.querySelectorAll('.faq-question i').forEach(i => {
            i.style.transform = 'rotate(0deg)';
        });
        
        // Toggle current FAQ
        if (!isOpen) {
            answer.style.display = 'block';
            icon.style.transform = 'rotate(180deg)';
        }
    });
});

// Link new account from header
const linkNewBtn = document.querySelector('.dashboard-header .btn-primary');
if (linkNewBtn) {
    linkNewBtn.addEventListener('click', () => {
        console.log('Link new account from header');
        document.querySelector('.brokers-grid').scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    });
}

console.log('DMAT account page loaded');
