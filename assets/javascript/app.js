$(document).ready(function() {
    console.log("Ready!");
});

$(window).on("load", function() {
    console.log("Window Loaded!");
});



// sample buttons there to pull data
// any new buttons input go to gifButtons after clicking add-gif button
// images and ratings go to gifDisplay div
// frozen gifs until clicked on


var cartoons = ["Teen Titans", "Amazing World of Gumball", "Wonderpets", "One Punch Man"]

function displayGiphy() {

var cartoon = $(this).attr("data-name");
var queryURL = "https://www.api.giphy.com/v1/gifs/search?q=" + cartoon + "&api_key=u5PRDLT2fc5oP3bn6Y4eG1c88dA0STN2&limit=10&rating=g";

$.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response) {

    var cartoonDiv = $("<div class='cartoon'>");

    var rating = response.rating;
    var ratingDisplay = $("<p>").text("Rating: " + rating);
    cartoonDiv.append(ratingDisplay);

    var showImage = response.images.fixed_height.url;
    var imageDisplay = $("<img>").attr("src", showImage);
    cartoonDiv.append(imageDisplay);
    });
}

function buttonMaker() {
    $("#gifButtons").empty();
    for (i = 0; i < cartoons.length; i++) {
        var newButton = $("<button>");
        newButton.addClass("cartoon");
        newButton.attr("data-name", cartoons[i]);
        newButton.text(cartoons[i]);
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