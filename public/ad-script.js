// Ad page script
let currentAdData = null;
let currentImageIndex = 0;
let totalImages = 0;

// Load ad data when page loads
document.addEventListener('DOMContentLoaded', function() {
    const pathParts = window.location.pathname.split('/');
    const adId = pathParts[pathParts.length - 1];
    
    // For direct ID routes (e.g., /68923a39f2c07e88dd10824a)
    if (adId && adId !== '' && adId !== 'ad') {
        loadAdData(adId);
    } else {
        showError('Invalid ad ID');
    }
});

// Load ad data from API
async function loadAdData(adId) {
    try {
        showLoading();
        
        // Use remote server API endpoint
        const response = await fetch(`https://sahbo-app-api.onrender.com/api/ads/getAdById/${adId}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const adData = await response.json();
        currentAdData = adData;
        
        displayAdData(adData);
        hideLoading();
        
    } catch (error) {
        console.error('Error loading ad data:', error);
        showError('Failed to load ad details. Please try again later.');
    }
}

// Display ad data in the UI
function displayAdData(adData) {
    try {
        // Update page title
        document.title = `${adData.adTitle} - Syria Market`;
        
        // Update breadcrumb
        document.getElementById('breadcrumb-category').textContent = adData.categoryName;
        
        // Update ad header
        document.getElementById('ad-title').textContent = adData.adTitle;
        document.getElementById('price').textContent = adData.price;
        document.getElementById('currency').textContent = adData.currencyName;
        
        // Update meta information
        document.getElementById('category').textContent = adData.categoryName;
        document.getElementById('subcategory').textContent = adData.subCategoryName;
        document.getElementById('location').textContent = `${adData.cityName}, ${adData.regionName}`;
        document.getElementById('date').textContent = formatDate(adData.createDate);
        
        // Update description
        document.getElementById('description').textContent = adData.description;
        
        // Update seller information
        document.getElementById('seller-name').textContent = adData.userName;
        document.getElementById('seller-phone').textContent = adData.userPhone;
        
        // Handle images
        setupImages(adData.images);
        
        // Show the ad container
        document.getElementById('ad-container').style.display = 'block';
        
    } catch (error) {
        console.error('Error displaying ad data:', error);
        showError('Error displaying ad information');
    }
}

// Setup image gallery
function setupImages(images) {
    const mainImage = document.getElementById('main-image');
    const thumbnailContainer = document.getElementById('thumbnails');
    const currentImageSpan = document.getElementById('current-image');
    const totalImagesSpan = document.getElementById('total-images');
    
    // Clear existing thumbnails
    thumbnailContainer.innerHTML = '';
    
    if (!images || images.length === 0) {
        // Use placeholder image
        const placeholderSrc = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjVGNUY1Ii8+CjxwYXRoIGQ9Ik0xMDAgMTUwQzEwMCAxMzQuMzE1IDExMy40MzEgMTIxLjUgMTMwIDEyMS41SDE3MEMxODYuNTY5IDEyMS41IDIwMCAxMzQuMzE1IDIwMCAxNTBWMjUwQzIwMCAyNjUuNjg1IDE4Ni41NjkgMjc4LjUgMTcwIDI3OC41SDEzMEMxMTMuNDMxIDI3OC41IDEwMCAyNjUuNjg1IDEwMCAyNTBWMTUwWiIgZmlsbD0iI0U1RTVFNSIvPgo8Y2lyY2xlIGN4PSIxNDAiIGN5PSIxNzAiIHI9IjEwIiBmaWxsPSIjRDREREREIi8+CjxwYXRoIGQ9Ik0xMjAgMjQwTDE1MCAyMTBMMTgwIDI0MEgyMDAiIHN0cm9rZT0iI0Q0RERERAiIHN0cm9rZS13aWR0aD0iMiIgZmlsbD0ibm9uZSIvPgo8L3N2Zz4K';
        mainImage.src = placeholderSrc;
        mainImage.alt = 'No image available';
        
        totalImages = 1;
        currentImageIndex = 0;
        currentImageSpan.textContent = '1';
        totalImagesSpan.textContent = '1';
        
        // Hide navigation buttons
        document.querySelector('.image-navigation').style.display = 'none';
        return;
    }
    
    totalImages = images.length;
    currentImageIndex = 0;
    
    // Set first image as main
    mainImage.src = images[0];
    mainImage.alt = currentAdData.adTitle;
    
    // Update counter
    currentImageSpan.textContent = '1';
    totalImagesSpan.textContent = totalImages.toString();
    
    // Create thumbnails
    images.forEach((imageSrc, index) => {
        const thumbnail = document.createElement('div');
        thumbnail.className = `thumbnail ${index === 0 ? 'active' : ''}`;
        thumbnail.onclick = () => showImage(index);
        
        const img = document.createElement('img');
        img.src = imageSrc;
        img.alt = `${currentAdData.adTitle} - Image ${index + 1}`;
        img.onerror = function() {
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjRjVGNUY1Ii8+CjxwYXRoIGQ9Ik0yMCAzMEMyMCAyNi44NjI5IDIyLjg2MjkgMjQgMjYgMjRINTRDNTcuMTM3MSAyNCA2MCAyNi44NjI5IDYwIDMwVjUwQzYwIDUzLjEzNzEgNTcuMTM3MSA1NiA1NCA1Nkg0NkM0Mi44NjI5IDU2IDQwIDUzLjEzNzEgNDAgNTBWMzBaIiBmaWxsPSIjRTVFNUU1Ii8+CjxjaXJjbGUgY3g9IjMwIiBjeT0iMzQiIHI9IjMiIGZpbGw9IiNEREREREQiLz4KPHBhdGggZD0iTTI2IDQ2TDM0IDM4TDQyIDQ2SDQ2IiBzdHJva2U9IiNEREREREQiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIvPgo8L3N2Zz4K';
        };
        
        thumbnail.appendChild(img);
        thumbnailContainer.appendChild(thumbnail);
    });
    
    // Show navigation if more than one image
    if (totalImages > 1) {
        document.querySelector('.image-navigation').style.display = 'flex';
    } else {
        document.querySelector('.image-navigation').style.display = 'none';
    }
}

// Show specific image
function showImage(index) {
    if (index < 0 || index >= totalImages || !currentAdData.images) return;
    
    currentImageIndex = index;
    
    // Update main image
    const mainImage = document.getElementById('main-image');
    mainImage.src = currentAdData.images[index];
    
    // Update counter
    document.getElementById('current-image').textContent = (index + 1).toString();
    
    // Update active thumbnail
    document.querySelectorAll('.thumbnail').forEach((thumb, i) => {
        thumb.classList.toggle('active', i === index);
    });
}

// Navigation functions
function previousImage() {
    const newIndex = currentImageIndex > 0 ? currentImageIndex - 1 : totalImages - 1;
    showImage(newIndex);
}

function nextImage() {
    const newIndex = currentImageIndex < totalImages - 1 ? currentImageIndex + 1 : 0;
    showImage(newIndex);
}

// Utility functions
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function showLoading() {
    document.getElementById('loading').style.display = 'flex';
    document.getElementById('error').style.display = 'none';
    document.getElementById('ad-container').style.display = 'none';
}

function hideLoading() {
    document.getElementById('loading').style.display = 'none';
}

function showError(message) {
    document.getElementById('loading').style.display = 'none';
    document.getElementById('ad-container').style.display = 'none';
    document.getElementById('error').style.display = 'flex';
    document.getElementById('error-message').textContent = message;
}

// Action functions
function contactSeller() {
    if (currentAdData && currentAdData.userPhone) {
        const phone = currentAdData.userPhone;
        const message = `Hi, I'm interested in your ad: ${currentAdData.adTitle}`;
        const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    } else {
        alert('Contact information not available');
    }
}

function shareAd() {
    document.getElementById('share-modal').style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

function shareToWhatsApp() {
    const url = window.location.href;
    const text = `Check out this ad: ${currentAdData.adTitle} - ${currentAdData.price} ${currentAdData.currencyName}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`;
    window.open(whatsappUrl, '_blank');
    closeModal('share-modal');
}

function shareToFacebook() {
    const url = window.location.href;
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(facebookUrl, '_blank');
    closeModal('share-modal');
}

function copyLink() {
    navigator.clipboard.writeText(window.location.href).then(() => {
        alert('Link copied to clipboard!');
        closeModal('share-modal');
    }).catch(() => {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = window.location.href;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        alert('Link copied to clipboard!');
        closeModal('share-modal');
    });
}

function reportAd() {
    if (confirm('Are you sure you want to report this ad?')) {
        alert('Thank you for your report. We will review this ad shortly.');
    }
}

// Keyboard navigation for images
document.addEventListener('keydown', function(e) {
    if (totalImages > 1) {
        if (e.key === 'ArrowLeft') {
            previousImage();
        } else if (e.key === 'ArrowRight') {
            nextImage();
        }
    }
});

// Close modal when clicking outside
window.addEventListener('click', function(e) {
    const modal = document.getElementById('share-modal');
    if (e.target === modal) {
        closeModal('share-modal');
    }
});

// Touch/swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold && totalImages > 1) {
        if (diff > 0) {
            // Swipe left - next image
            nextImage();
        } else {
            // Swipe right - previous image
            previousImage();
        }
    }
}
