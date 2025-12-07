const searchInput =  document.getElementById("input-search");
const searchBtn = document.getElementById("search-btn");
const showAllBtn = document.getElementById("show-all");

const API_KEY = "786594eda617e313b34a2fbd04a89597";

const availableFlights = document.getElementById("available-flights");

function createFlightElements(tag, classes = "", id = "", text = "", source = "", alt = "") {
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
        getFlightDetails(searchInput.value.trim());
});

showAllBtn.addEventListener("click", () => {
    getFlightDetails("");
});



function clearElements() {
    while(availableFlights.firstChild) 
        availableFlights.removeChild(availableFlights.firstChild);
}

function errorOnLoading() {
    searchBtn.disabled = false;
    showAllBtn.disabled = false;

    const errorThows = createFlightElements("div","error-throws");
    errorThows.appendChild(createFlightElements("p","","","⚠️"));
    errorThows.appendChild(createFlightElements("h2","","","Oops! Something went wrong. Try again!" ));

    const retryBtn = createFlightElements("div", "btn", "retry-btn");
    retryBtn.appendChild(createFlightElements("img", "", "", "", "images/icon-retry.svg", "retry icon"));

    errorThows.appendChild(retryBtn);
    availableFlights.appendChild(errorThows);
    retryBtn.addEventListener("click", () => {
        clearElements();
        getFlightDetails(searchInput.value.trim());
    });
}

function startLoading() {
    const rippleLoading = createFlightElements("div", "ripple-loading");
    rippleLoading.appendChild(createFlightElements("div", "ripple-circle"));
    rippleLoading.appendChild(createFlightElements("div", "ripple-circle"));
    rippleLoading.appendChild(createFlightElements("div", "ripple-circle"));
    availableFlights.appendChild(rippleLoading);
}

function getFlightDetails(flightId) {
    clearElements();
    startLoading();
    console.log(flightId);
    searchBtn.disabled = true;
    showAllBtn.disabled = true;

    const URL = `https://api.aviationstack.com/v1/flights?access_key=${API_KEY}` + (flightId ? `&flight_iata=${flightId}` : "");
    console.log(URL)

    fetch(URL).then(res => res.json()).then((data) => {
        console.log(data);
        clearElements();
        initalizeFields(data.data);
    }).catch((err) => {
        console.log("Error: ", err)
        clearElements();
        errorOnLoading();
    });
}

function initalizeFields(data) {
    console.log("initial fields", data.length);
    if (data.length === 0) errorOnLoading();

    data.forEach(element => {
        const status = element.flight_status ?? "N/A";
        const depart = element.departure.airport ?? "N/A";
        const arrival = element.arrival.airport ?? "N/A";
        const flightId = element.flight.iata ?? "N/A";
        const airline = element.airline.name ?? "N/A" == "empty" ? "N/A" : element.airline.name;
        const terminal = element.arrival.terminal ?? "N/A";
        const gate = element.arrival.gate ?? "N/A";

        const card = createFlightElements("div", "grid-card");
        card.appendChild(createFlightElements("h1", "flight-id", "", flightId));
        card.appendChild(createFlightElements("p", "arrival", "", "Arrival  : "+ arrival));
        card.appendChild(createFlightElements("p", "depart", "",  "Depart   : " + depart));
        card.appendChild(createFlightElements("p", "airlines", "","Airline  : " + airline));
        card.appendChild(createFlightElements("p", "terminal", "","Terminal : " + terminal));
        card.appendChild(createFlightElements("p", "gate", "",    "Gate     : " + gate));
        card.appendChild(createFlightElements("p", "status", "",  "Status   : " + status));
        availableFlights.appendChild(card);
    });

    searchBtn.disabled = false;
    showAllBtn.disabled = false;
}