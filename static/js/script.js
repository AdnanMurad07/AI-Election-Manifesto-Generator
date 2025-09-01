// DOM Elements
const manifestoForm = document.getElementById('manifestoForm');
const resultsSection = document.getElementById('resultsSection');
const loadingSection = document.getElementById('loadingSection');
const manifestoContent = document.getElementById('manifestoContent');
const copyBtn = document.getElementById('copyBtn');
const downloadBtn = document.getElementById('downloadBtn');
const toastContainer = document.getElementById('toastContainer');

// Global variables
let currentManifesto = '';
let currentFilename = '';

// Form submission handler
manifestoForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(manifestoForm);
    const partyName = formData.get('partyName');
    const issues = formData.get('issues');
    const policies = formData.get('policies');
    const vision = formData.get('vision');
    
    // Validate form
    if (!partyName || !issues || !policies || !vision) {
        showToast('Please fill in all fields', 'error');
        return;
    }
    
    // Show loading state
    showLoading();
    
    try {
        // Prepare request data
        const requestData = {
            party_name: partyName,
            issues: issues,
            policies: policies,
            vision: vision
        };
        
        // Make API call
        const response = await fetch('/generate_manifesto', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData)
        });
        
        const result = await response.json();
        
        if (result.success) {
            // Store manifesto data
            currentManifesto = result.manifesto;
            currentFilename = result.filename;
            
            // Display results
            displayResults(result.manifesto);
            showToast('Manifesto generated successfully!', 'success');
        } else {
            throw new Error(result.error || 'Failed to generate manifesto');
        }
        
    } catch (error) {
        console.error('Error:', error);
        showToast(error.message || 'An error occurred while generating the manifesto', 'error');
        hideLoading();
    }
});

// Display results
function displayResults(manifesto) {
    // Hide loading
    hideLoading();
    
    // Update content
    manifestoContent.textContent = manifesto;
    
    // Show results section
    resultsSection.style.display = 'block';
    
    // Scroll to results
    resultsSection.scrollIntoView({ behavior: 'smooth' });
}

// Show loading state
function showLoading() {
    loadingSection.style.display = 'block';
    resultsSection.style.display = 'none';
    
    // Disable submit button
    const submitBtn = manifestoForm.querySelector('.submit-btn');
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';
}

// Hide loading state
function hideLoading() {
    loadingSection.style.display = 'none';
    
    // Re-enable submit button
    const submitBtn = manifestoForm.querySelector('.submit-btn');
    submitBtn.disabled = false;
    submitBtn.innerHTML = '<i class="fas fa-magic"></i> Generate Manifesto';
}

// Copy manifesto to clipboard
copyBtn.addEventListener('click', async function() {
    try {
        await navigator.clipboard.writeText(currentManifesto);
        showToast('Manifesto copied to clipboard!', 'success');
        
        // Visual feedback
        copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        setTimeout(() => {
            copyBtn.innerHTML = '<i class="fas fa-copy"></i> Copy';
        }, 2000);
        
    } catch (error) {
        console.error('Failed to copy:', error);
        showToast('Failed to copy to clipboard', 'error');
    }
});

// Download manifesto
downloadBtn.addEventListener('click', function() {
    try {
        // Create blob
        const blob = new Blob([currentManifesto], { type: 'text/plain' });
        
        // Create download link
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = currentFilename;
        
        // Trigger download
        document.body.appendChild(a);
        a.click();
        
        // Cleanup
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        
        showToast('Manifesto downloaded successfully!', 'success');
        
    } catch (error) {
        console.error('Failed to download:', error);
        showToast('Failed to download manifesto', 'error');
    }
});

// Toast notification system
function showToast(message, type = 'info') {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    // Set icon based on type
    let icon = 'info-circle';
    if (type === 'success') icon = 'check-circle';
    if (type === 'error') icon = 'exclamation-circle';
    
    toast.innerHTML = `
        <i class="fas fa-${icon}"></i>
        <span>${message}</span>
    `;
    
    // Add to container
    toastContainer.appendChild(toast);
    
    // Remove after 5 seconds
    setTimeout(() => {
        if (toast.parentNode) {
            toast.parentNode.removeChild(toast);
        }
    }, 5000);
}

// Form validation and real-time feedback
const formInputs = manifestoForm.querySelectorAll('input, textarea');

formInputs.forEach(input => {
    input.addEventListener('input', function() {
        // Remove error styling
        this.classList.remove('error');
        
        // Check if field is valid
        if (this.value.trim() === '') {
            this.classList.add('error');
        }
    });
    
    input.addEventListener('blur', function() {
        if (this.value.trim() === '') {
            this.classList.add('error');
        }
    });
});

// Add error styling to CSS
const style = document.createElement('style');
style.textContent = `
    .form-group input.error,
    .form-group textarea.error {
        border-color: #f56565;
        box-shadow: 0 0 0 3px rgba(245, 101, 101, 0.1);
    }
`;
document.head.appendChild(style);

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + Enter to submit form
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        if (document.activeElement.tagName === 'TEXTAREA') {
            e.preventDefault();
            manifestoForm.dispatchEvent(new Event('submit'));
        }
    }
    
    // Escape to clear form
    if (e.key === 'Escape') {
        manifestoForm.reset();
        resultsSection.style.display = 'none';
        showToast('Form cleared', 'info');
    }
});

// Auto-resize textareas
const textareas = manifestoForm.querySelectorAll('textarea');
textareas.forEach(textarea => {
    textarea.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = this.scrollHeight + 'px';
    });
});

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Add some nice animations
    const cards = document.querySelectorAll('.form-card, .results-card, .loading-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
    
    // Focus first input
    const firstInput = manifestoForm.querySelector('input');
    if (firstInput) {
        setTimeout(() => firstInput.focus(), 500);
    }
});

// Handle form reset
manifestoForm.addEventListener('reset', function() {
    // Reset textarea heights
    const textareas = this.querySelectorAll('textarea');
    textareas.forEach(textarea => {
        textarea.style.height = 'auto';
    });
    
    // Hide results
    resultsSection.style.display = 'none';
    
    // Remove error classes
    const inputs = this.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.classList.remove('error');
    });
});

// Add loading animation to submit button
manifestoForm.addEventListener('submit', function() {
    const submitBtn = this.querySelector('.submit-btn');
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';
});

// Error handling for network issues
window.addEventListener('online', function() {
    showToast('Connection restored', 'success');
});

window.addEventListener('offline', function() {
    showToast('No internet connection', 'error');
});
