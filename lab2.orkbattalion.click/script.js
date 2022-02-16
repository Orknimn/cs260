document.getElementById("weatherSubmit").addEventListener("click", function(event) {
    event.preventDefault();
    const value = document.getElementById("weatherInput").value;
    if (value === "")
    {
        return;
    }
        
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + value + 
        ",US&units=imperial" + "&APPID=";
    fetch(url)
        .then(function(response) {
            return response.json();
        }).then(function(json) {
            console.log(json);
            let results = "";
            results += '<h2 class="results-item">Weather in ' + json.name + "</h2>";
            for (let i=0; i < json.weather.length; ++i) {
                results += '<img src="https://openweathermap.org/img/w/' + json.weather[i].icon + '.png" class="results-item"/>';
            }
            results += '<h2 class="results-item">' + Math.round(json.main.temp * 10)/10 + " &deg;F</h2>";
            results += '<p class="results-item">' + "Feels Like: " + Math.round(json.main.feels_like*10)/10 + " &deg;F</p>";
            results += '<p class="results-item">' + "Humidity: " + json.main.humidity + "\%</p>";
            results += '<p class="results-item">' + "Wind Speed: " + json.wind.speed + " mph</p>";
            results += '<p class="results-item">' + "Lat: " + json.coord.lat + " Lon: " + json.coord.lon + "</p>";
            results += '<p class="results-item">';
            for (let i=0; i < json.weather.length; ++i) {
                results += json.weather[i].description.charAt(0).toUpperCase() + json.weather[i].description.slice(1);
                if (i !== json.weather.length - 1) {
                    results += ", ";
                }
            }
            results += "</p>";
            document.getElementById("weatherResults").innerHTML = results;
            
        })

    const url12 = "https://api.openweathermap.org/data/2.5/forecast?q=" + value + 
        ", US&units=imperial" + "&APPID=0f9693c9af64b3937952f46e202e7ade";
        fetch(url12)
            .then(function(response) {
                return response.json();
            }).then(function(json) {
                console.log(json);
                let forecast = "";
                for (let i=0; i < json.list.length; ++i) {
                    forecast += "<div class='forecast-box'>";
                    forecast += "<h2 class='forecast-item'>" + moment(json.list[i].dt_txt).format('MMMM Do h:mm A') + "</h2>";
                    forecast += '<img src="https://openweathermap.org/img/w/' + json.list[i].weather[0].icon + '.png" class="forecast-item"/>';
                    forecast += "<p class='forecast-item'>" + Math.round(json.list[i].main.temp * 10)/10 + " &deg;F</p>";
                    forecast += "<p class='forecast-item'>" + "Wind Speed: " + json.list[i].wind.speed + " mph</p>";
                    forecast += "<p class='forecast-item'>" + "Humidity: " + json.list[i].main.humidity + "\%</p>";
                    forecast += "<p class='forecast-item'>" + "Cloudiness: " + json.list[i].clouds.all + "\%</p>";
                    forecast += "</div>";
                }
                
                document.getElementById("forecastResults").innerHTML = forecast;
            })
});

