$(document).ready(function() {
    console.log("Ready!");
});

$(window).on("load", function() {
    console.log("Window Loaded!");
});


// psuedocode -- LET'S GO!
// sample buttons there to pull data
// any new buttons input go to gifButtons after clicking add-gif button
// images and ratings go to gifDisplay div
// frozen gifs until clicked on


var cartoons = ["Teen Titans", "Amazing World of Gumball", "The Simpsons", "One Punch Man", "The Powerpuff Girls", "Demon Slayer"]

function displayGiphy() {

var cartoon = $(this).attr("data-name");
var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&q=" + cartoon + "&limit=10&rating=g";

$.ajax({
    url: queryURL,
    method: "GET" 
  }).then(function(response) {

    console.log(queryURL);
    console.log(response);

    // shortcut to cleanup typing response.data (and fits better in for loop with [i])
    var results = response.data

    for (var i = 0; i < results.length; i++) {

        var cartoonDiv = $("<div>");
        var getRating = $("<p>").text("Rating: " + results[i].rating);

        var showImage = $("<img>");
        showImage.attr("src", results[i].images.fixed_height_still.url);

        // for the still/animate
        // showImage.attr("class", "gif");
        // showImage.data("state", "still");

        cartoonDiv.append(showImage);
        cartoonDiv.append(getRating);

        $("#gifDisplay").prepend(cartoonDiv);

        // how to replace gifs with a new set instead of purely prepending?

        // still/animate function
        // $(".gif").on("click", function() {
        // var state = $(this).attr("data-state");
        // if (state === "still") {
        //     $(this).attr("src", $(this).attr("data-animate"));
        //     $(this).attr("data-state", "animate");
        //     showImage.attr("src", results[i].images.fixed_height.url);
        //   } else {
        //     $(this).attr("src", $(this).attr("data-still"));
        //     $(this).attr("data-state", "still");
        //   }
        // });
    }
});
}

function buttonMaker() {
    $("#gifButtons").empty();
    for (i = 0; i < cartoons.length; i++) {
        var newButton = $("<button>");
        newButton.addClass("cartoon");
        newButton.attr("data-name", cartoons[i]);
        newButton.text(cartoons[i])
        $("#gifButtons").append(newButton);
    }
}

$("#add-gif").on("click", function(event) {
    event.preventDefault();
    var cartoon = $("#gif-input").val().trim();

    cartoons.push(cartoon);

buttonMaker();
});

$(document).on("click", ".cartoon", displayGiphy);
buttonMaker();