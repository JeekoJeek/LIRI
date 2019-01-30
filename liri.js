require("dotenv").config();
var keys = require("./key.js");
var Spotify = require("node-spotify-api");
var axios = require("axios");
var fs = require("fs");
// var moment = require("moment");
var spotify = new Spotify(keys.spotify)

var queryURL = ""
var spacer= "\n~~~~~~~~~~~~~~~~ New Search ~~~~~~~~~~~~~~~~\n"
var search = process.argv.splice(3).join(" ")
if (process.argv[2] === "spotify-this-song") {
    if (search===""){
        search="Ace of Base - The Sign"
    }
    spotify.search({ type: 'track', query: search })
        .then(function (response) {
            var songInfo=[
                "Artist: " + response.tracks.items[0].album.artists[0].name,
                "Song Title: " + response.tracks.items[0].name,
                "Album: " + response.tracks.items[0].album.name,
                "Preview: " + response.tracks.items[0].preview_url
            ].join("\n\n")
            console.log(songInfo + spacer)
        })
        .catch(function(err) {
            console.log(err);
          });
}
else if(process.argv[2] === "movie-this"){
    if (search === undefined){
        search === "Mr. Nobody"
    }
    queryURL= "http://www.omdbapi.com/?t=" + search + "&y=&plot=short&apikey=trilogy"
    axios.get(queryURL).then(function(result){
        console.log(result.data)
        var movie=[
            "Title: " + result.data.Title,
            "Year: " + result.data.released,
            "IMDB Rating: " + result.data.imdbRating,
            "Rotten Tomatoes: " + result.data.Ratings[1].Value,
            "Country: " + result.data.Country,
            "Language: " + result.data.Language,
            "Plot: " + result.data.Plot,
            "Actors: " + result.data.Actors
        ].join("\n\n")
        console.log(movie + spacer)
    })
}



