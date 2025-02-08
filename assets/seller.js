// Function to handle the input and show suggestions
function showSuggestions(input) {
    const suggestionBox = document.getElementById('suggestions');
    const query = input.value.trim(); // Trim spaces to ensure clean input
    suggestionBox.innerHTML = ''; // Clear previous suggestions

    // Only proceed if input is longer than 2 characters
    if (query.length > 2) {
        // Use Nominatim API to fetch search results based on user input
        fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&addressdetails=1&limit=5&countrycodes=TH`)
            .then(response => response.json())
            .then(data => {
                // Display suggestions if results are found
                if (data.length > 0) {
                    suggestionBox.style.display = 'block'; // Show suggestions
                    data.forEach(place => {
                        const suggestionItem = document.createElement('div');
                        suggestionItem.classList.add('suggestion-item');
                        suggestionItem.innerText = place.display_name; // Show address in suggestion
                        suggestionItem.onclick = function () {
                            input.value = place.display_name; // Set input value to clicked suggestion
                            suggestionBox.innerHTML = ''; // Clear suggestions
                            suggestionBox.style.display = 'none'; // Hide suggestions
                        };
                        suggestionBox.appendChild(suggestionItem);
                    });
                } else {
                    suggestionBox.style.display = 'none'; // Hide suggestions if no data found
                }
            })
            .catch(error => console.log('Error fetching data:', error));
    } else {
        suggestionBox.style.display = 'none'; // Hide suggestions if input is too short
    }
}

// Event listener for the address input field
document.getElementById('store-address').addEventListener('input', function () {
    showSuggestions(this);
});

// Hide suggestions when clicking outside
document.addEventListener('click', function (e) {
    if (!document.getElementById('store-address').contains(e.target)) {
        document.getElementById('suggestions').style.display = 'none';
    }
});
