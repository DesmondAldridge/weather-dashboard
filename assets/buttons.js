
var pastSearches = [];

// Displaying past searches
function renderButtons() {

    $("#searches").empty();


    for (var i = 0; i < pastSearches.length; i++) {

        var a = $("<button>");

        a.addClass("searched-city");

        a.attr("data-name", pastSearches[i]);

        a.text(pastSearches[i]);

        $("#searches").append(a);
    }
}

// Populating the previous searches list
$("#select-city").click(function(event) {
event.preventDefault();

    var searchedCity = $("#city-input").val().trim().toUpperCase();
    // I needed help with the syntax here, I originally (and mistakenly) tried this: searchedCity !== pastSearches.indexOf(searchedCity)
    // Also tried to add an additional qualifier in the conditional to screen for searches that are !== to 404 errors (not actual cities)
    if (pastSearches.indexOf(searchedCity) === -1) {
    pastSearches.push(searchedCity);
    }

    renderButtons();
    
});


// var goToCity = searchWeather("data-name");

// $(document).click(".searched-city", function() {
//     var goToCity = $(this);
//     searchWeather(goToCity);
// });

// // Calling the renderButtons function to display the initial buttons
// renderButtons();



// $(".searched-city").click(goToCity);

// $(".searched-city").click(function(event) {
//     event.preventDefault();

//     var goToCity = $(this);

//     searchWeather(goToCity);
// })

