// server.js

const express = require('express'); // Import Express.js
const cors = require('cors'); // Import CORS for cross-origin requests
const app = express(); // Create an Express application
const port = 5000; // Define the server port

app.use(cors()); // Enable CORS
app.use(express.json()); // Enable parsing JSON request bodies

// Sample data for hostels
let hostels = [
  {
    id: 1,
    name: 'Cozy Hostel',
    location: 'Downtown',
    price: 25,
  },
  {
    id: 2,
    name: 'Beachside Hostel',
    location: 'Near the beach',
    price: 30,
  },
];

// Data for bookings
let bookings = [];

// Data for reviews
let reviews = [];

// Home route
app.get('/', (req, res) => {
  res.send('Hello, welcome to the Hostel Finder Backend!');
});

// Route to get all hostels
app.get('/hostels', (req, res) => {
  res.json(hostels);
});

// Route to add a new hostel
app.post('/add-hostel', (req, res) => {
  const newHostel = req.body;
  newHostel.id = hostels.length + 1; // Assign a new ID
  hostels.push(newHostel);
  res.json({ message: 'Hostel added successfully', hostels });
});

// Route to book a hostel
app.post('/book', (req, res) => {
  const bookingInfo = req.body;
  bookings.push(bookingInfo);
  res.json({ message: 'Booking successful', bookings });
});

// Route to get reviews for a specific hostel
app.get('/reviews/:hostelId', (req, res) => {
  const hostelId = parseInt(req.params.hostelId);
  const hostelReviews = reviews.filter(review => review.hostelId === hostelId);
  res.json(hostelReviews);
});

// Route to submit a review
app.post('/reviews', (req, res) => {
  const reviewData = req.body;
  reviews.push(reviewData);
  res.json({ message: 'Review submitted', reviews });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
