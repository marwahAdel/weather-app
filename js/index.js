var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

async function search(location) {
    try {
        let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=7d03533c781d480781b114820240907&q=${location}&days=3`);
        
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        
        let data = await response.json();
        displayCurrent(data.location, data.current);
        displayForecast(data.forecast.forecastday);
    } catch (error) {
        console.error('Error fetching data:', error);
        // Handle error display or fallback here
    }
}

function displayCurrent(location, current) {
    if (current !== null) {
        var updatedDate = new Date(current.last_updated.replace(" ", "T"));
        let html = `<div class="today forecast">
            <div class="forecast-header" id="today">
                <div class="day">${days[updatedDate.getDay()]}</div>
                <div class="date">${updatedDate.getDate()} ${monthNames[updatedDate.getMonth()]}</div>
            </div>
            <div class="forecast-content" id="current">
                <div class="location">${location.name}</div>
                <div class="degree">
                    <div class="num">${current.temp_c}<sup>o</sup>C</div>
                    <div class="forecast-icon">
                        <img src="https:${current.condition.icon}" alt="" width=90>
                    </div>
                </div>
                <div class="custom">${current.condition.text}</div>
                <span><img src="images/icon-umberella.png" alt="">${current.humidity}%</span>
                <span><img src="images/icon-wind.png" alt="">${current.wind_kph}km/h</span>
                <span><img src="images/icon-compass.png" alt="">${current.wind_dir}</span>
            </div>
        </div>`;
        
        document.getElementById("forecast").innerHTML = html;
    }
}

function displayForecast(forecastDays) {
    let html = "";
    for (let i = 1; i < forecastDays.length; i++) {
        let forecastDate = new Date(forecastDays[i].date);
        html += `<div class="forecast">
            <div class="forecast-header">
                <div class="day">${days[forecastDate.getDay()]}</div>
            </div>
            <div class="forecast-content">
                <div class="forecast-icon">
                    <img src="https:${forecastDays[i].day.condition.icon}" alt="" width=48>
                </div>
                <div class="degree">${forecastDays[i].day.maxtemp_c}<sup>o</sup>C</div>
                <small>${forecastDays[i].day.mintemp_c}<sup>o</sup></small>
                <div class="custom">${forecastDays[i].day.condition.text}</div>
            </div>
        </div>`;
    }
    document.getElementById("forecast").innerHTML += html; // Append forecast HTML
}

document.getElementById("submit").addEventListener("click", function(event) {
    event.preventDefault();
    let location = document.getElementById("search").value;
    if (location.trim() !== "") {
        search(location);
    }
});

// Initial search for default location
search("Cairo"); // Replace with your default location
