// owner.js

const form = document.getElementById('hostelForm');

form.addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevent the default form submission

  const formData = new FormData(form);
  const hostelData = {
    name: formData.get('name'),
    location: formData.get('location'),
    price: parseInt(formData.get('price')),
  };

  try {
    const response = await fetch('http://localhost:5000/add-hostel', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(hostelData),
    });
    const result = await response.json();
    alert(result.message);
    form.reset(); // Clear the form after submission
  } catch (error) {
    console.error('Error adding hostel:', error);
  }
});
