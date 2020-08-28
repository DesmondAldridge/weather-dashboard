function searchWeather(city) {

  // Querying for the city
  var APIKey = "&appid=986e1c20e564c29abd61cb165783eb2b"
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + ",us" + APIKey;
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {

    // Creating Elements
    var cityName = $("<h1>").text(response.name);
    var cityURL = $("<a>").attr("href", response.url).append(cityName);
  

    var tempFahrenheit = (response.main.temp - 273.15) * 1.80 + 32;

    var cityTemp = $("<h2>").text("Temperature:  " + tempFahrenheit.toFixed(2));
    var cityHumidity = $("<h2>").text("Humidity:  " + response.main.humidity);
    var cityWind = $("<h2>").text("Wind Speed:  " + response.wind.speed);


    // Querying for the UV Index 
    var cityLat = response.coord.lat;
    var cityLon = response.coord.lon;

    var UVQueryURL = "https://api.openweathermap.org/data/2.5/uvi?appid=" + "986e1c20e564c29abd61cb165783eb2b" + "&lat=" + cityLat + "&lon=" + cityLon;
    
      // Thought parsing the URL would be quicker and more concise than another AJAX call... not so sure anymore...
      $.getJSON(UVQueryURL, function(data) {

        var UVObj = [];

        $.each(data, function(key, val) {
          UVObj.push(val);
          });
      
          var UVIndex = UVObj[4];

          
          var cityUVIndex = $("<h2>").text("UV Index:  " + UVIndex)

          if (UVIndex >= 8) {
            cityUVIndex.css("background", "red");
          } 
          else if (UVIndex < 8 && UVIndex >= 6) {
            cityUVIndex.css("background", "orange");
          } 
          else if (UVIndex < 6 && UVIndex >= 3) {
            cityUVIndex.css("background", "yellow");
          } 
          else {
            cityUVIndex.css("background", "green");
          }

          // Needed to append it individually to its own div because I kept having issues with scope or deferred promises, or something else I don't fully understand... like scope and promises...
          $("#uv-div").empty();
          $("#uv-div").append(cityUVIndex);

      });

    // Populating the designated area with the search results
    $("#city-div").empty();
    $("#city-div").append(cityName, cityURL, cityTemp, cityHumidity, cityWind);

    // FORECAST
    var forecastQueryURL = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + ',us' + APIKey;

    $.ajax({
      url: forecastQueryURL,
      method: "GET"
    }).then(function(forecastObj) {

      console.log(forecastObj);

      // Forecast Info
      var temp1 = forecastObj.list[2].main.temp;
      var temp2 = forecastObj.list[10].main.temp;
      var temp3 = forecastObj.list[18].main.temp;
      var temp4 = forecastObj.list[26].main.temp;
      var temp5 = forecastObj.list[34].main.temp;

      var tomorrowsFCTemp = (temp1 - 273.15) * 1.80 + 32;
      var day2FCTemp = (temp1 - 273.15) * 1.80 + 32;
      var day3FCTemp = (temp2 - 273.15) * 1.80 + 32;
      var day4FCTemp = (temp3 - 273.15) * 1.80 + 32;
      var day5FCTemp = (temp4 - 273.15) * 1.80 + 32;

      var humidity1 = forecastObj.list[2].main.humidity;
      var humidity2 = forecastObj.list[10].main.humidity;
      var humidity3 = forecastObj.list[18].main.humidity;
      var humidity4 = forecastObj.list[26].main.humidity;
      var humidity5 = forecastObj.list[34].main.humidity;

      //Forecast Days
      var tomorrowsDate = moment().add(1, 'days').format("MMM Do");
      var day2Date = moment().add(2, 'days').format("MMM Do");
      var day3Date = moment().add(3, 'days').format("MMM Do");
      var day4Date = moment().add(4, 'days').format("MMM Do");
      var day5Date = moment().add(5, 'days').format("MMM Do");
    
      //Tomorrow's Forecast
      var fc1Date= $("<h1>").text(tomorrowsDate);
        var fc1Temp = $("<h2>").text("Temperature:  " + tomorrowsFCTemp.toFixed(2));
          var fc1Humidity = $("<h2>").text("Humidity:  " + humidity1);

      //Day 2's Forecast
      var fc2Date= $("<h1>").text(day2Date);
        var fc2Temp = $("<h2>").text("Temperature:  " + day2FCTemp.toFixed(2));
          var fc2Humidity = $("<h2>").text("Humidity:  " + humidity2);

      //Day 3's Forecast
      var fc3Date= $("<h1>").text(day3Date);
        var fc3Temp = $("<h2>").text("Temperature:  " + day3FCTemp.toFixed(2));
          var fc3Humidity = $("<h2>").text("Humidity:  " + humidity3);
            
      //Day 4's Forecast
      var fc4Date= $("<h1>").text(day4Date);
        var fc4Temp = $("<h2>").text("Temperature:  " + day4FCTemp.toFixed(2));
          var fc4Humidity = $("<h2>").text("Humidity:  " + humidity4);

      //Day 5's Forecast
      var fc5Date= $("<h1>").text(day5Date);
        var fc5Temp = $("<h2>").text("Temperature:  " + day5FCTemp.toFixed(2));
          var fc5Humidity = $("<h2>").text("Humidity:  " + humidity5);


      $("#forecast1").empty();
      $("#forecast1").append(fc1Date, fc1Temp, fc1Humidity);

      $("#forecast2").empty();
      $("#forecast2").append(fc2Date, fc2Temp, fc2Humidity);

      $("#forecast3").empty();
      $("#forecast3").append(fc3Date, fc3Temp, fc3Humidity);

      $("#forecast4").empty();
      $("#forecast4").append(fc4Date, fc4Temp, fc4Humidity);
      
      $("#forecast5").empty();
      $("#forecast5").append(fc5Date, fc5Temp, fc5Humidity);

    });

  });
}

// City Search
$("#select-city").click(function(event) {
  event.preventDefault();

  var inputCity = $("#city-input").val().trim().toUpperCase();

  searchWeather(inputCity);
});

          