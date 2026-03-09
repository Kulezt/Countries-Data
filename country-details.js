// get the country name from the URL query parameters
const urlParams = new URLSearchParams(window.location.search);
const numericCode = urlParams.get('numericCode');
let countriesData

async function getCountryByNumericCode(numericCode) {
    try {
        const response = await fetch('countries.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        countriesData = await response.json();
        const country = countriesData.find(c => c.numericCode === numericCode);
        // add border countries to the country object
        country.borderCountries = country.borders ? getBorderCountries(country.borders) : [];
        return country;
    } catch (error) {
        console.error('Error fetching country data:', error.message);
    }
}
function getBorderCountries(borderCodes) {
    return borderCodes.map(code => {
        const borderCountry = countriesData.find(c => c.alpha3Code === code);
        return borderCountry ? borderCountry.name : 'Unknown';
    });
}


function displayCountryDetails(country) {
    const detailsContainer = document.getElementById('country-detail');
    if (!country) {
        detailsContainer.innerHTML = '<p>Country not found.</p>';
        return;
    }
    
    detailsContainer.innerHTML = `
        <img src="${country.flags.png}" alt="Flag of ${country.name}">
        <div class="details-text">
            <h1>${country.name}</h1>
            
            <div class="info-columns">
                <div class="col-1">
                <p><strong>Native Name:</strong><span> ${country.nativeName}</span></p>
                    <p><strong>Population:</strong><span> ${country.population.toLocaleString()}</span></p>
                    <p><strong>Region:</strong><span> ${country.region}</span></p>
                    <p><strong>Sub Region:</strong><span> ${country.subregion}</span></p>
                    <p><strong>Capital:</strong><span> ${country.capital}</span></p>
                </div>
                <div class="col-2">
                    <p><strong>Top Level Domain:</strong><span> ${country.topLevelDomain}</span></p>
                    <p><strong>Currencies:</strong><span> ${country.currencies.map(c => c.name)}</span></p>
                    <p><strong>Languages:</strong><span> ${country.languages.map(l => l.name)}</span></p>
                </div>
            </div>

            <div class="borders">
                <h3>Borders:</h3>
                <div class="border-tags">
                    ${country.borderCountries.map(border => `<span class="border">${border}</span>`).join('')}
                </div>
            </div>
        </div>
    `;
}
getCountryByNumericCode(numericCode).then(country => {
    displayCountryDetails(country);
});