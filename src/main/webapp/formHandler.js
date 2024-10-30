const debugMode = true; // Set to `false` in production

function displayResults(data) {
    const responseContainer = document.getElementById('responseContainer');
    const cottageResults = document.getElementById('cottageResults');
    cottageResults.innerHTML = "";  // Clear any previous results

    data.forEach((cottage, index) => {
        // Create a new div for each cottage result
        const div = document.createElement('div');
        div.classList.add('cottage-result');

        // Extract fields and convert meters to kilometers for distances
        const distanceLakeKm = (cottage.distanceLake / 1000).toFixed(1); // e.g., 500 m becomes 0.5 km
        const distanceCityKm = (cottage.distanceCity / 1000).toFixed(1);

        // Define color for shiftDays based on the value
        let shiftDaysColor;
        if (cottage.shiftDays < 3) {
            shiftDaysColor = 'green';
        } else if (cottage.shiftDays < 10) {
            shiftDaysColor = 'yellow';
        } else {
            shiftDaysColor = 'red';
        }

        // Populate the HTML structure with table format
        div.innerHTML = `
            <div style="display: flex; justify-content: space-between;">
                <h4>${cottage.name || 'Unknown User Name'}</h4>
                <p><strong>Booking Number:</strong> ${cottage.bookingNumber || 'N/A'}</p>
            </div>
            <table style="width: 100%; font-size: 1.2rem;">
                <tr>
                    <td><strong>Address</strong></td>
                    <td>${cottage.address || 'Not specified'}</td>
                </tr>
                <tr>
                    <td><strong>Image</strong></td>
                    <td>${cottage.imageURL ? `<img src="${cottage.imageURL}" alt="${cottage.name}" style="width: 100px; height: auto;">` : 'No Image'}</td>
                </tr>
                <tr>
                    <td><strong>Places</strong></td>
                    <td>${cottage.places || 'N/A'}</td>
                </tr>
                <tr>
                    <td><strong>Bedrooms</strong></td>
                    <td>${cottage.bedrooms || 'N/A'}</td>
                </tr>
                <tr>
                    <td><strong>Distance to Lake</strong></td>
                    <td>${distanceLakeKm} km</td>
                </tr>
                <tr>
                    <td><strong>Distance to City</strong></td>
                    <td>${distanceCityKm} km</td>
                </tr>
                <tr>
                    <td><strong>City</strong></td>
                    <td>${cottage.city || 'Not specified'}</td>
                </tr>
                <tr>
                    <td><strong>Start Date</strong></td>
                    <td>${cottage.startDate || 'Not specified'}</td>
                </tr>
                <tr>
                    <td><strong>Shift Days</strong></td>
                    <td style="color: ${shiftDaysColor};"><strong>${cottage.shiftDays}</strong> days</td>
                </tr>
            </table>
        `;

        // Append this cottage result to the container
        cottageResults.appendChild(div);
    });

    responseContainer.style.display = 'block';  // Make the response container visible
}



document.getElementById('bookingForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const fullName = `${firstName} ${lastName}`;
    
    const formData = {
        name: fullName,
        places: parseInt(document.getElementById('places').value),
        bedrooms: parseInt(document.getElementById('bedrooms').value),
        distanceLake: parseInt(document.getElementById('distanceLake').value),
        city: document.getElementById('city').value,
        distanceCity: parseInt(document.getElementById('distanceCity').value),
        days: parseInt(document.getElementById('days').value),
        startDate: document.getElementById('startDate').value,
        shiftDays: parseInt(document.getElementById('shiftDays').value),
    };
    
    console.log(formData);

    if (debugMode) {
        // Mock data for testing
        const mockData = [
            {
                address: "123 Forest Lane",
                bookingNumber: "BKG123456",
                imageURL: "https://example.com/image1.jpg",
                places: 4,
                bedrooms: 2,
                distanceLake: 500,
                city: "Springfield",
                distanceCity: 2000,
                startDate: "2024-11-01",
                shiftDays: 5
            },
            {
                address: "456 Mountain Ave",
                bookingNumber: "BKG654321",
                imageURL: "https://example.com/image2.jpg",
                places: 6,
                bedrooms: 3,
                distanceLake: 1500,
                city: "Riverside",
                distanceCity: 1000,
                startDate: "2024-11-05",
                shiftDays: 7
            }
        ];

        displayResults(mockData);  // Use mock data
    } else {
        // Real data fetch from server
        fetch('/booking', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => displayResults(data))
        .catch(error => console.error('Error:', error));
    }
});
