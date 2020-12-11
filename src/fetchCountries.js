import { refs } from './index.js';
import { workWithCountryList } from './index.js';

export default function () {
    const countryName = refs.searchInput.value;
    return fetch(`https://restcountries.eu/rest/v2/name/${countryName}`)
        .then(response => response.json())
        .then((response) => {
            workWithCountryList(response)
        });
};

