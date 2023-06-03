const axios = require('axios');
const fs = require('fs');

async function getVisitors() {
  try {
    const response = await axios.get('https://api.github.com/user');
    return response.data.followers;
  } catch (error) {
    console.error('Error fetching visitor count:', error.message);
    return 0;
  }
}

async function updateProfileReadme() {
  const visitors = await getVisitors();
  const greeting = `Hello, visitors! This profile has been visited by ${visitors} people.`;

  try {
    const response = await axios.patch('https://api.github.com/user', {
      name: 'Your Name',
      bio: greeting,
    }, {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      },
    });

    if (response.status === 200) {
      console.log('Profile readme updated successfully.');
    } else {
      console.error('Failed to update profile readme:', response.status, response.data);
    }
  } catch (error) {
    console.error('Error updating profile readme:', error.message);
  }
}

updateProfileReadme();
