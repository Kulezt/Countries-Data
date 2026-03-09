const countriescont = document.getElementById('countries-container');
const searchInput = document.getElementById('search-input');
const regionSelect = document.getElementById('region-select');
const themeToggle = document.getElementById('theme-toggle');

let countriesData = [];
async function fetchCountries() {
    try {
        countriescont.innerHTML = '<p>Loading countries data...</p>';
        const response = await fetch('countries.json');
        countriesData = await response.json();
        displaycountries(countriesData);
    } catch (error) {
        console.error("Error fetching the countries:", error);
        countriescont.innerHTML = '<p>Error loading countries data.</p>';
    }
}

function displaycountries(countries) {
    countriescont.innerHTML = "";
    countries.forEach(function (country) {
        let card = document.createElement("div");
        card.className = "country-card";
        let population = country.population.toLocaleString();
        let region = country.region;
        let flag = country.flags.png;
        let countryname = country.name;

        card.innerHTML =
            `<a href="country-details.htm?numericCode=${country.numericCode}">
             <img src='${flag}' alt='Flag of ${countryname}'>
            </a>
            <div class='card-details'>` +
            `<h2>${countryname}</h2>` +
            `<p>Population: <span>${population}</span></p>` +
            `<p>Region: <span>${region}</span></p>` +
            `<p>Capital: <span>${country.capital}</span></p>` +
            "</div>";

        countriescont.appendChild(card);
    });
}

function filterCountries() {

    let searchTerm = searchInput.value.toLowerCase();
    let region = regionSelect.value;

    let filteredCountries = countriesData.filter(function (country) {

        let matchesSearch = false;
        let matchesRegion = false;
        if (country.name.toLowerCase().includes(searchTerm)) {
            matchesSearch = true;
        }
        if (region === "all" || country.region === region) {
            matchesRegion = true;
        }

        if (matchesSearch && matchesRegion) {
            return true;
        } else {
            return false;
        }
    });

    displaycountries(filteredCountries);

}

searchInput.addEventListener('input', filterCountries);
regionSelect.addEventListener('change', filterCountries);


fetchCountries();
