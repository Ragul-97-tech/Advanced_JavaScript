const feelsLike = document.getElementById("feelsLike");
const humidityElem = document.getElementById("humidity");
const windElem = document.getElementById("windSpeed");
const precipitationElem = document.getElementById("precipitation");

const searchInput =  document.getElementById("input-search");
const searchBtn = document.getElementById("search-btn");

const todayReport = document.querySelector(".today-report");

function createWeatherElements(tag, classes = "", id = "", text = "", source = "", alt = "") {
    const element = document.createElement(tag);
    if (classes) element.className = classes;
    if (id) element.id = id;
    if (source) {
        element.src = source;
        element.alt = alt + " flag image";
    }
    if (text) element.textContent = text;
    return element;
}

searchBtn.addEventListener("click", () => {
    if (searchInput.value.trim())
        getLatitudeLongitude(searchInput.value.trim());
});

function errorOnLoading() {
    searchBtn.disabled = false;

    const errorThows = createWeatherElements("div","error-throws");
    errorThows.appendChild(createWeatherElements("p","","","⚠️"));
    errorThows.appendChild(createWeatherElements("h2","","","Oops! Something went wrong. Try again!" ));

    const retryBtn = createWeatherElements("div", "btn", "retry-btn");
    retryBtn.appendChild(createWeatherElements("img", "", "", "", "images/icon-retry.svg", "retry icon"));

    errorThows.appendChild(retryBtn);
    todayReport.appendChild(errorThows);
    retryBtn.addEventListener("click", () => {
        clearElements();
        getLatitudeLongitude(searchInput.value.trim());
    });
}

function startLoading() {
    const zohoLoading = createWeatherElements("div", "Zoho-loading");
    zohoLoading.appendChild(createWeatherElements("div", "color red"));
    zohoLoading.appendChild(createWeatherElements("div", "color green"));
    zohoLoading.appendChild(createWeatherElements("div", "color yellow"));
    zohoLoading.appendChild(createWeatherElements("div", "color blue"));
    todayReport.appendChild(zohoLoading);
}

function clearElements() {
    while(todayReport.firstChild) 
        todayReport.removeChild(todayReport.firstChild);
}

function getLatitudeLongitude(cityName) {
    searchBtn.disabled = true;
    clearElements();
    startLoading();
    const URL = `https://nominatim.openstreetmap.org/search?format=json&q=${cityName}`;
    fetch(URL).then(res => res.json()).then((data) => {
        console.log(data[0].lat, data[0].lon, data[0].display_name);
        getWeatherReport(data[0].lat, data[0].lon, data[0].display_name);
    }).catch(() => {
        clearElements();
        errorOnLoading();
    });
}

function getWeatherReport(latitude, longitude, placeData) {
    const URL = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,wind_speed_10m,precipitation,relative_humidity_2m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m,precipitation,apparent_temperature`;
    console.log(URL);
    fetch(URL).then(res => res.json()).then((report) => {
        clearElements();
        initalizeField(report, placeData);
    }).catch(() => {
        clearElements();
        errorOnLoading();
    });
}

function initalizeField(weatherReport, locationName) {
    todayReport.appendChild(createWeatherElements("img", "", "", "","images/bg-today-large.svg", "bg-image"));

    const ICONS = ["images/icon-snow.webp", "images/icon-storm.webp", "images/icon-rain.webp", "images/icon-drizzle.webp", "images/icon-fog.webp", "images/icon-overcast.webp", "images/icon-partly-cloudy.webp", "images/icon-sunny.webp"];
    let suitableIcon;

    const temperature = weatherReport.current.temperature_2m;
    const absoluteTemp = weatherReport.current.apparent_temperature;
    const humidity = weatherReport.current.relative_humidity_2m;
    const windSpeed = weatherReport.current.wind_speed_10m;
    const precipitation = weatherReport.current.precipitation;

    if (temperature <= 3 && precipitation > 0) suitableIcon = ICONS[0];
    else if (precipitation > 15 && windSpeed > 30) suitableIcon = ICONS[1];
    else if (precipitation > 2) suitableIcon = ICONS[2];
    else if (precipitation > 0 && precipitation <= 2) suitableIcon = ICONS[3];
    else if (humidity > 90 && windSpeed < 5) suitableIcon = ICONS[4];
    else if (temperature < 20 && precipitation == 0) suitableIcon = ICONS[5];
    else if (temperature >= 20 && temperature <= 30 && precipitation == 0) suitableIcon = ICONS[6];
    else suitableIcon = ICONS[7];

    let absoluteLocation = locationName.split(",");

    const reportInfo = createWeatherElements("div", "report-info");
    const today = new Date().toLocaleDateString("en-US", {
        weekday: "long",
        month: "short",
        day: "numeric",
        year: "numeric"
    });
    
    const location = createWeatherElements("div", "location");
    location.appendChild(createWeatherElements("h1", "location-name", "", absoluteLocation[0] + (absoluteLocation[3] ? ","+absoluteLocation[3] : "")));
    location.appendChild(createWeatherElements("p", "current-date", "", today));
    
    const temperatureInfo = createWeatherElements("div", "temperature-info");
    temperatureInfo.appendChild(createWeatherElements("img", "temp-icon", "", "", suitableIcon, suitableIcon.substring(5,suitableIcon.length-5) + " image"));
    temperatureInfo.appendChild(createWeatherElements("h1", "temperature", "", temperature + "°"));
    
    feelsLike.textContent = absoluteTemp + "°";
    humidityElem.textContent = humidity + "%";
    windElem.textContent = windSpeed +"km/h";
    precipitationElem.textContent = precipitation+"mm";

    reportInfo.appendChild(location);
    reportInfo.appendChild(temperatureInfo);
    todayReport.appendChild(reportInfo);

    searchBtn.disabled = false;
}

getLatitudeLongitude("surandai");