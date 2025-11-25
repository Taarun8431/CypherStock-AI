
document.querySelectorAll('.filter-chip').forEach(chip => {
    chip.addEventListener('click', function() {
        document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
        this.classList.add('active');
        console.log('Filter changed to:', this.textContent);
    });
});

document.querySelectorAll('.news-actions .fa-bookmark').forEach(btn => {
    btn.parentElement.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        btn.classList.toggle('fas');
        btn.classList.toggle('far');
        
        if (btn.classList.contains('fas')) {
            btn.style.color = '#f59e0b';
            console.log('Article bookmarked');
        } else {
            btn.style.color = '';
            console.log('Article unbookmarked');
        }
    });
});

document.querySelectorAll('.news-actions .fa-share-nodes').forEach(btn => {
    btn.parentElement.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('Share clicked');
        alert('Share functionality would open here');
    });
});

document.querySelectorAll('.news-card').forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', function(e) {
        if (!e.target.closest('.news-actions')) {
            const title = this.querySelector('h2, h3').textContent;
            console.log('Reading article:', title);
        }
    });
});

document.querySelectorAll('.topic-tag').forEach(tag => {
    tag.style.cursor = 'pointer';
    tag.addEventListener('click', function() {
        const topic = this.textContent;
        console.log('Filtering by topic:', topic);
        // Filter news by topic
    });
});

// Search news
const searchNews = document.querySelector('.search-box input');
if (searchNews) {
    searchNews.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        console.log('Searching news:', query);
        // Filter news articles
    });
}

// Load more news
const loadMoreBtn = document.querySelector('.load-more .btn');
if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
        console.log('Loading more news...');
        loadMoreBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
        
        setTimeout(() => {
            loadMoreBtn.innerHTML = '<i class="fas fa-rotate"></i> Load More News';
            // Append more news cards
        }, 1000);
    });
}

// Real-time market index updates (simulated)
function updateMarketIndices() {
    document.querySelectorAll('.market-index').forEach(index => {
        const changeElement = index.querySelector('.index-change');
        const isPositive = Math.random() > 0.5;
        
        // Small random change
        const change = (Math.random() * 2).toFixed(2);
        const percentage = (Math.random() * 0.5).toFixed(2);
        
        if (isPositive) {
            changeElement.className = 'index-change positive';
            changeElement.innerHTML = `<i class="fas fa-arrow-up"></i> +${change} (+${percentage}%)`;
        } else {
            changeElement.className = 'index-change negative';
            changeElement.innerHTML = `<i class="fas fa-arrow-down"></i> -${change} (-${percentage}%)`;
        }
    });
}

// Update indices every 30 seconds
setInterval(updateMarketIndices, 30000);

console.log('Market news page loaded');
