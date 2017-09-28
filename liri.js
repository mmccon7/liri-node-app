// read the export from keys.js file and pass the inforation into the keys variable 
var keys =  require("./keys.js");

console.log("\r\n" + "Try any of the following commands after 'node liri.js': " +"\r\n"+
			"1. my-tweets " +"\r\n"+
			"2. spotify-this-song 'any song name' "+"\r\n"+
			"3. movie-this 'any movie name' "+"\r\n"+
			"4. do-what-it-says"+"\r\n"+
			"--------------------------------------------------------------");

// Create function to get info from the Twitter module and API
function myTweets(){

	var twitterUsername = process.argv[3];
	if(!twitterUsername){
			twitterUsername = "bojangles_magee";
	}

	params = {screen_name: twitterUsername};
	keys.get('statuses/user_timeline', params, function(error, data, response) {
		if (!error){
		  	for (var i = 0; i < data.length; i++){
				var twitterResults = 
				"@" + data[i].user.screen_name + ": " + 
				data[i].text + "\r\n" + 
				data[i].created_at + "\r\n";
				console.log(twitterResults);
	  		}
	  	} 
	  	else{
	    console.log("Error occurred: " + error);;
	  	}
	});
}

// ---------------------------------------------------------------
// Uses Spotify module and api to create Spotify requests and data
var Spotify = require('node-spotify-api');
 
var spotify = new Spotify({
  id: "17a04b438a7b4b169e79fad2d594242f",
  secret: "1681d9e0a55e4487becd6af51d3a5751",
});

function spotifyThisSong(songName){
	var songName = process.argv[3];
	if(!songName){
		songName = "The Sign, Ace of Base";
	}
params = songName;
 
spotify.search({ type: 'track', query: params }, function(err, data) {
  	if (!err) {
	  	var songInfo = data.tracks.items;
	  	// Loops through data and selects closets match to input that returns from Spotify
	  	for (var i = 0; i < 1; i++){
  			var spotifyResults = 
  			"Artist: " + songInfo[i].artists[0].name + "\r\n" +
  			"Song: " + songInfo[i].name + "\r\n" +
  			"Preview Url: " + songInfo[i].preview_url + "\r\n" +
  			"Song Album: " + songInfo[i].album.name + "\r\n";

  			console.log(spotifyResults);	
  		} 
  	}
  else{
  	console.log("Error occurred: " + err);
  }
});
}

// ---------------------------------------------------------------
// Use Request module to pull data from OMDB and print to the console
var request = require("request");

function movieThis(){
		var movie = process.argv[3];
		if(!movie){
			movie = "mr nobody";
		}
		params = movie
		request("http://www.omdbapi.com/?t=" + params + "&y=&plot=short&apikey=40e9cece&r=json&tomatoes=true", function (error, response, body) {
			if (!error && response.statusCode == 200) {
				var movieObject = JSON.parse(body);
				//console.log(movieObject); // Show the text in the terminal
				var movieResults =
				"Title: " + movieObject.Title+"\r\n"+
				"Year: " + movieObject.Year+"\r\n"+
				"Imdb Rating: " + movieObject.imdbRating+"\r\n"+
				"Rotten Tomatoes Rating: " + movieObject.Ratings[1].Value +"\r\n"+
				"Country: " + movieObject.Country+"\r\n"+
				"Language: " + movieObject.Language+"\r\n"+
				"Plot: " + movieObject.Plot+"\r\n"+
				"Actors: " + movieObject.Actors+"\r\n";
				console.log(movieResults);
			} else {
				console.log("Error occurred: "+ error);
			}
		});
	};
// ---------------------------------------------------------------
// Do what is says function will read command from a random text file and appropriatley do as it says!
var fs = require("fs");

function doWhatItSays(){
	fs.readFile("random.txt", "utf8", function(error, data){
		if(!error){
			console.log(data);
			var resultArr = data.split(",");
		}

		else{
			console.log("Error occured: "+ error);
		}
	});
};

// ---------------------------------------------------------------
	// listing all functions with cases to be able to call inside of Node
	var liriArgument = process.argv[2];

	switch(liriArgument) {
		case "my-tweets": myTweets(); break;
		case "spotify-this-song": spotifyThisSong(); break;
		case "movie-this": movieThis(); break;
		case "do-what-it-says": doWhatItSays(); break;
	};