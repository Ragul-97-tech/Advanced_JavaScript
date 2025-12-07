const flagsContainer = document.getElementById("flags-container");
const searchInput = document.querySelector(".search-box input");
const regionSelect = document.querySelector("select");
let countriesData = [];
let currentView = "search";

function createFlagElements(tag, classes = "", id = "", text = "", source = "", alt = "") {
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

function clearContainer() {
    while (flagsContainer.firstChild) {
        flagsContainer.removeChild(flagsContainer.firstChild);
    }
}

function showLoading() {
    clearContainer();

    const loadingContainer = createFlagElements("div", "loading-container");
    const spinner = createFlagElements("div", "spinner");
    const loadingText = createFlagElements("p", "loading-text", "", "Loading countries...");
    loadingContainer.appendChild(spinner);
    loadingContainer.appendChild(loadingText);
    flagsContainer.appendChild(loadingContainer);
}

function showError(message, showRetry = true) {
    clearContainer();
    const errorContainer = createFlagElements("div", "error-container");
    const errorIcon = createFlagElements("div", "error-icon", "", "⚠️");
    const errorTitle = createFlagElements("h2", "error-title", "", "Oops! Something went wrong");
    const errorMessage = createFlagElements("p", "error-message", "", message);
    
    errorContainer.appendChild(errorIcon);
    errorContainer.appendChild(errorTitle);
    errorContainer.appendChild(errorMessage);

    if (showRetry) {
        const retryBtn = createFlagElements("button", "retry-btn", "", "Try Again");
        retryBtn.addEventListener('click', () => {
            searchCountry(); 
        });
        errorContainer.appendChild(retryBtn);
    }

    flagsContainer.appendChild(errorContainer);
}

function showEmptyState() {
    clearContainer();
    
    const emptyContainer = createFlagElements("div", "empty-state");
    const emptyIcon = createFlagElements("div", "empty-icon", "", "🔍");
    const emptyTitle = createFlagElements("h2", "empty-title", "", "No countries found");
    const emptyMessage = createFlagElements("p", "empty-message", "", "Try searching for a different country name or adjust your region filter.");
    
    emptyContainer.appendChild(emptyIcon);
    emptyContainer.appendChild(emptyTitle);
    emptyContainer.appendChild(emptyMessage);
    flagsContainer.appendChild(emptyContainer);
}

function displayFlags(data) {
    clearContainer();
    
    if (data.length === 0) {
        showEmptyState();
        return;
    }

    data.forEach(flag => {
        const flagCard = createFlagElements("div", "flag-card");
        flagCard.dataset.country = JSON.stringify(flag);

        const flagImage = createFlagElements("img", "flag-image", "", "", flag.flags.png, flag.name.common);
        flagCard.appendChild(flagImage);

        const flagInfo = createFlagElements("div", "flag-info");

        const flagName = createFlagElements("h2", "flag-name", "", flag.name.common);
        flagInfo.appendChild(flagName);

        const flagCapital = createFlagElements("p", "flag-capital");
        const capitalStrong = createFlagElements("strong", "", "", "Capital: ");
        flagCapital.appendChild(capitalStrong);
        flagCapital.appendChild(document.createTextNode(flag.capital ? flag.capital[0] : "N/A"));
        flagInfo.appendChild(flagCapital);

        const flagRegion = createFlagElements("p", "flag-region");
        const regionStrong = createFlagElements("strong", "", "", "Region: ");
        flagRegion.appendChild(regionStrong);
        flagRegion.appendChild(document.createTextNode(flag.region));
        flagInfo.appendChild(flagRegion);

        const flagPopulation = createFlagElements("p", "flag-population");
        const popStrong = createFlagElements("strong", "", "", "Population: ");
        flagPopulation.appendChild(popStrong);
        flagPopulation.appendChild(document.createTextNode(flag.population.toLocaleString()));
        flagInfo.appendChild(flagPopulation);

        flagCard.appendChild(flagInfo);
        flagsContainer.appendChild(flagCard);
    });
}

function showDetailedView(countryData) {
    clearContainer();
    currentView = "detail";

    const detailContainer = createFlagElements("div", "detail-view");

    // Back button
    const backBtn = createFlagElements("button", "back-btn", "", "<- Back");
    detailContainer.appendChild(backBtn);

    const contentWrapper = createFlagElements("div", "detail-content");

    // Flag Image
    const flagImageLarge = createFlagElements("img", "detail-flag-image", "", "", countryData.flags.svg, countryData.name.common);
    contentWrapper.appendChild(flagImageLarge);

    // Country Info
    const infoSection = createFlagElements("div", "detail-info");

    const countryName = createFlagElements("h1", "detail-name", "", countryData.name.common);
    infoSection.appendChild(countryName);

    const infoGrid = createFlagElements("div", "info-grid");

    // Left Column
    const leftCol = createFlagElements("div", "info-column");

    const nativeName = createFlagElements("p");
    const nativeStrong = createFlagElements("strong", "", "", "Native Name: ");
    nativeName.appendChild(nativeStrong);
    nativeName.appendChild(document.createTextNode(countryData.name.nativeName ? Object.values(countryData.nativeName)()[0].common : "N/A"));
    leftCol.appendChild(nativeName);

    const population = createFlagElements("p");
    const popStrong = createFlagElements("strong", "", "", "Population: ");
    population.appendChild(popStrong);
    population.appendChild(document.createTextNode(countryData.population.toLocaleString()));
    leftCol.appendChild(population);

    const region = createFlagElements("p");
    const regionStrong = createFlagElements("strong", "", "", "Region: ");
    region.appendChild(regionStrong);
    region.appendChild(document.createTextNode(countryData.region));
    leftCol.appendChild(region);

    const subregion = createFlagElements("p");
    const subregionStrong = createFlagElements("strong", "", "", "Sub Region: ");
    subregion.appendChild(subregionStrong);
    subregion.appendChild(document.createTextNode(countryData.subregion || "N/A"));
    leftCol.appendChild(subregion);

    const capital = createFlagElements("p");
    const capitalStrong = createFlagElements("strong", "", "", "Capital: ");
    capital.appendChild(capitalStrong);
    capital.appendChild(document.createTextNode(countryData.capital ? countryData.capital[0] : "N/A"));
    leftCol.appendChild(capital);

    infoGrid.appendChild(leftCol);

    // Right Column
    const rightCol = createFlagElements("div", "info-column");

    const topLevelDomain = createFlagElements("p");
    const domainStrong = createFlagElements("strong", "", "", "Top Level Domain: ");
    topLevelDomain.appendChild(domainStrong);
    topLevelDomain.appendChild(document.createTextNode(countryData.tld ? countryData.tld.join(", ") : "N/A"));
    rightCol.appendChild(topLevelDomain);

    const currencies = createFlagElements("p");
    const currencyStrong = createFlagElements("strong", "", "", "Currencies: ");
    currencies.appendChild(currencyStrong);
    const currencyText = countryData.currencies ? Object.values(countryData.currencies).map(c => c.name).join(", ") : "N/A";
    currencies.appendChild(document.createTextNode(currencyText));
    rightCol.appendChild(currencies);

    const languages = createFlagElements("p");
    const langStrong = createFlagElements("strong", "", "", "Languages: ");
    languages.appendChild(langStrong);
    const langText = countryData.languages ? Object.values(countryData.languages).map(l => l.name).join(", ") : "N/A";
    languages.appendChild(document.createTextNode(langText));
    rightCol.appendChild(languages);

    infoGrid.appendChild(rightCol);
    infoSection.appendChild(infoGrid);

    // Border Countries
    if (countryData.borders && countryData.borders.length > 0) {
        const borderSection = createFlagElements("div", "border-section");
        const borderLabel = createFlagElements("strong", "", "", "Border Countries: ");
        borderSection.appendChild(borderLabel);

        const borderContainer = createFlagElements("div", "border-countries");
        countryData.borders.forEach(borderCode => {
            const borderCountry = countriesData.find(c => c.cca3 === borderCode);
            const borderBtn = createFlagElements("button", "border-btn", "", borderCountry ? borderCountry.name.common : borderCode);
            borderBtn.dataset.countryCode = borderCode;
            borderContainer.appendChild(borderBtn);
        });

        borderSection.appendChild(borderContainer);
        infoSection.appendChild(borderSection);
    }

    contentWrapper.appendChild(infoSection);
    detailContainer.appendChild(contentWrapper);
    flagsContainer.appendChild(detailContainer);
}

function filterCountries() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedRegion = regionSelect.value;

    const filtered = countriesData.filter(country => {
        const matchesSearch = country.name.common.toLowerCase().includes(searchTerm);
        const matchesRegion = !selectedRegion || country.region === selectedRegion;
        return matchesSearch && matchesRegion;
    });

    displayFlags(filtered);
}

function searchCountry() {
    const countryName = searchInput.value.trim();

    if (!countryName) {
        clearContainer();
        return;
    }
    
    showLoading();

    const xhr = new XMLHttpRequest();
    xhr.open("GET", `https://restcountries.com/v3.1/name/${countryName}`);
    
    xhr.onload = () => {
        if (xhr.status == 200) {
            countriesData = JSON.parse(xhr.responseText);
            currentView = "search";
            filterCountries();
        }else if (xhr.status === 404) {
            showError(`No countries found matching "${countryName}". Please check the name!`)
        } else {
            showError("Failed to load country data. Please try again.");
        }
    };
    xhr.onerror = () => {
        showError("Network error occurred. Please check your connection and try again.");
    };
    xhr.send();
}

// Event Delegation on flags container
flagsContainer.addEventListener("click", (e) => {
    const flagCard = e.target.closest(".flag-card");
    if (flagCard) {
        const countryData = JSON.parse(flagCard.dataset.country);
        showDetailedView(countryData);
    }

    // Handle back button
    if (e.target.classList.contains("back-btn")) {
        currentView = "search";
        filterCountries();
    }

    // Handle border country buttons
    if (e.target.classList.contains("border-btn")) {
        const borderCode = e.target.dataset.countryCode;
        const borderCountry = countriesData.find(c => c.cca3 === borderCode);
        if (borderCountry) {
            showDetailedView(borderCountry);
        }
    }
});

// Search functionality
let searchTimeout;
searchInput.addEventListener("input", () => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        if (currentView === "search")
            searchCountry();
    }, 500);
});

// Filter functionality
regionSelect.addEventListener("change", () => {
    if (currentView === "search") {
        filterCountries();
    }
});
