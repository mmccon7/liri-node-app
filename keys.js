
// use require twitter module to be able to run in node
var Twitter = require('twitter');

// Keys and Tokens for the Twitter Module and API to be passed to liri.js
var client = new Twitter ({
	  consumer_key: 'ZacgZgWWvv3lkusPBkdfhRhBN',
	  consumer_secret: 'kMBueSc9RGZvuma1uCNSIwwnoRRevNkGQxFA4a2Mj2uQ4mVjoM',
	  access_token_key: '912355924437692416-TKJWelSnk8D0bYOhYpzXaEUTi2ru8J8',
	  access_token_secret: 'FQyPGvNYNqVMy4ncIyU8ZZPDuaPE3oWk9aKFKkpML5wWp',
	});
// will export Twitter keys to be used in another .js file
module.exports = client;