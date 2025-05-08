// Create a global product index
let productIndex = [];

// Function to build the search index
function buildProductIndex() {
    // This data should come from your actual products data
    // For static sites, you might need to include this in a script tag in your template
    const sections = {{ .Site.Data.products.product_sections | jsonify | safeJS }};
    
    productIndex = [];
    
    sections.forEach(section => {
        section.products.forEach(product => {
            // Split English and Arabic descriptions
            const [englishDesc, arabicDesc] = product.description.split('<br>');
            
            productIndex.push({
                english: englishDesc.trim().toLowerCase(),
                arabic: arabicDesc.trim().toLowerCase(),
                section: section.heading.split('<br>')[0].trim().toLowerCase(),
                image: product.image
            });
        });
    });
}

// Search function
function searchProducts() {
    const query = document.getElementById('productSearch').value.trim().toLowerCase();
    if (!query) return;
    
    // Try to find a matching product
    const results = productIndex.filter(item => 
        item.english.includes(query) || 
        item.arabic.includes(query) ||
        item.section.includes(query)
    );
    
    if (results.length > 0) {
        // Redirect to products page with hash for the first result
        window.location.href = `/products#${encodeURIComponent(results[0].english.replace(/\s+/g, '-'))}`;
    } else {
        alert('Product not found\nالمنتج غير موجود');
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    buildProductIndex();
    
    // Handle Enter key in search field
    document.getElementById('productSearch').addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            searchProducts();
        }
    });
});
