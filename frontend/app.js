// app.js

let allHostels = []; // Store all hostels

// Function to fetch all hostels from the backend
async function getHostels() {
  try {
    const response = await fetch('http://localhost:5000/hostels');
    const data = await response.json();
    allHostels = data;
    displayHostels(data);
  } catch (error) {
    console.error('Error fetching hostels:', error);
  }
}

// Function to display hostels on the page
function displayHostels(hostels) {
  const hostelsDiv = document.getElementById('hostels');
  hostelsDiv.innerHTML = ''; // Clear previous results

  hostels.forEach((hostel) => {
    const hostelElement = document.createElement('div');
    hostelElement.innerHTML = `
      <h2>${hostel.name}</h2>
      <p>Location: ${hostel.location}</p>
      <p>Price per night: $${hostel.price}</p>
      <button onclick="bookHostel(${hostel.id})">Book Now</button>
      <button onclick="viewReviews(${hostel.id})">View Reviews</button>
    `;
    hostelsDiv.appendChild(hostelElement);
  });
}

// Function to search for hostels based on user input
function searchHostels() {
  const searchInput = document.getElementById('search').value.toLowerCase();
  const filteredHostels = allHostels.filter((hostel) =>
    hostel.location.toLowerCase().includes(searchInput)
  );
  displayHostels(filteredHostels);
}

// Function to book a hostel
async function bookHostel(hostelId) {
  const name = prompt('Enter your name:');
  const date = prompt('Enter booking date (YYYY-MM-DD):');

  const bookingData = {
    hostelId,
    name,
    date,
  };

  try {
    const response = await fetch('http://localhost:5000/book', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookingData),
    });
    const result = await response.json();
    alert(result.message);
  } catch (error) {
    console.error('Error booking hostel:', error);
  }
}

// Function to view reviews for a hostel
async function viewReviews(hostelId) {
  try {
    const response = await fetch(`http://localhost:5000/reviews/${hostelId}`);
    const hostelReviews = await response.json();

    let reviewsHtml = '';
    hostelReviews.forEach((review) => {
      reviewsHtml += `<p><strong>${review.name}</strong>: ${review.comment} - Rating: ${review.rating}</p>`;
    });

    if (hostelReviews.length === 0) {
      reviewsHtml = '<p>No reviews yet.</p>';
    }

    const reviewSection = document.createElement('div');
    reviewSection.innerHTML = `
      <h3>Reviews</h3>
      ${reviewsHtml}
      <button onclick="addReview(${hostelId})">Add Review</button>
    `;

    document.body.appendChild(reviewSection);
  } catch (error) {
    console.error('Error fetching reviews:', error);
  }
}

// Function to add a review for a hostel
async function addReview(hostelId) {
  const name = prompt('Enter your name:');
  const rating = prompt('Enter your rating (1-5):');
  const comment = prompt('Enter your comment:');

  const reviewData = {
    hostelId,
    name,
    rating: parseInt(rating),
    comment,
  };

  try {
    const response = await fetch('http://localhost:5000/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reviewData),
    });
    const result = await response.json();
    alert(result.message);
  } catch (error) {
    console.error('Error submitting review:', error);
  }
}

// Call getHostels when the page loads
getHostels();
