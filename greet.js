const fs = require('fs');

const username = process.env.GITHUB_ACTOR;
const greeting = `Hello, @${username}! Welcome to my GitHub profile.`;

fs.writeFileSync('README.md', greeting);
