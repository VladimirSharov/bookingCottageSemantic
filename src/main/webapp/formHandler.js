document.getElementById('bookingForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const firstName = document.getElementById('firstName').value;
	const lastName = document.getElementById('lastName').value;
	const fullName = `${firstName} ${lastName}`;
    
    const formData = {
        name: fullName,
        surname: document.getElementById('surname').value,
        places: parseInt(document.getElementById('places').value),
        bedrooms: parseInt(document.getElementById('bedrooms').value),
        distanceLake: parseInt(document.getElementById('distanceLake').value),
        city: document.getElementById('city').value,
        distanceCity: parseInt(document.getElementById('distanceCity').value),
        days: parseInt(document.getElementById('days').value),
        startDate: document.getElementById('startDate').value,
        shiftDays: parseInt(document.getElementById('shiftDays').value),
    };
    
    console.log(formData);  // To check data in console for testing

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
});

function displayResults(data) {
    const responseContainer = document.getElementById('responseContainer');
    const cottageResults = document.getElementById('cottageResults');

    cottageResults.innerHTML = "";  // Clear previous results
    data.forEach(cottage => {
        const div = document.createElement('div');
        div.classList.add('cottage-result');
        div.innerHTML = `
            <p><strong>Address:</strong> ${cottage.address}</p>
            <p><strong>Booking Period:</strong> ${cottage.bookingPeriod}</p>
            <!-- Add other details here -->
        `;
        cottageResults.appendChild(div);
    });
    responseContainer.style.display = 'block';
}
