require("dotenv").config();

var Spotify = require('node-spotify-api');
var Twit = require("twitter");
var fs =  require ("fs");
var keys = require('./key')

var spotify = new Spotify(keys.spotify);
var twit = new Twit(keys.twitter);

var t = "This works!"
var input = process.argv[2];
var request = require("request");

if (input === "my-tweets"){ //node liri.js "my-tweets" displays 20 tweets.
    var params = {screen_name: 'nodejs', count:20};
    twit.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            tweets.forEach(function(i){
            var tweets = JSON.stringify(i.text);
            console.log(tweets+'\n\t');  
            });
        }//close if !error.
    }); 
};//close if statement.

if (input === "spotify-this-song"){//node liri.js spotify-this-song "song name here"
    var songName;
    if (process.argv.length === 3){
        songName = "Ace of Base The Sign";
    };

    if (process.argv.length === 4){
        songName = process.argv[3];    
    };

    spotify.search({ type: 'track', query: songName}, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
            var artist = data.tracks.items[1].album.artists[0].name;
            var song = data.tracks.items[1].name;
            var link = data.tracks.items[1].preview_url;
            var album = data.tracks.items[1].album.name;
            
            console.log("\nARTIST: "+artist+"\n");
            console.log("SONG NAME: "+song+"\n");
            console.log("PREVIEW: "+link+"\n");
            console.log("ALBUM: "+album+"\n");  
        }); 
};

if (input === "movie-this"){ 
    var movieName = process.argv[3];
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
    request(queryUrl, function(error, response, body) {
        var parsedBody = JSON.parse(body);
        var cons = ["Title: "+parsedBody.Title, "Year of Release: "+parsedBody.Released,
            "Rating: "+parsedBody.Rated,"Rotten Tomatoes Ratings: "+parsedBody.Ratings[1].Value,
            "Country of Production: "+parsedBody.Country,"Language: "+parsedBody.Language,
            "Plot: "+parsedBody.Plot,"Actors: "+parsedBody.Actors];
            
       for (var i = 0; i<cons.length; i++){
           console.log(cons[i]);
       }
    });
};

if (input === "do-what-it-says"){
    fs.readFile("random.txt","utf8", function(error, resp){
        
        var randomSong = resp;

        spotify.search({ type: 'track', query: randomSong}, function(err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
                var artist = data.tracks.items[1].album.artists[0].name;
                var song = data.tracks.items[1].name;
                var link = data.tracks.items[1].preview_url;
                var album = data.tracks.items[1].album.name;
                
                console.log("\nARTIST: "+artist+"\n");
                console.log("SONG NAME: "+song+"\n");
                console.log("PREVIEW: "+link+"\n");
                console.log("ALBUM: "+album+"\n");  
            }); 
    });
    // Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
    //  * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.
    //  * Feel free to change the text in that document to test out the feature for other commands.
};