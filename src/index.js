import './styles.css';
import '@pnotify/core/dist/PNotify.css';
import makeMarkup from './markup.hbs';
import mycountry from './mycountry.hbs'
// import makeUrl from './fetchCountries.js'



const refs = {
    searchInput: document.querySelector('.search__input'),
    wrapper: document.querySelector('.wrapper'),
    countriesList: document.querySelector('.countries__list'),
    country: document.querySelector('.country')
};


const _ = require('lodash');
const onInputSearch = _.debounce(() => {
    makeUrl();
},500);

function makeUrl() {
    const countryName = refs.searchInput.value;
    return fetch(`https://restcountries.eu/rest/v2/name/${countryName}`)
        .then(response => response.json())
        .then((countryList) => {
            workWithCountryList(countryList)
        })
};

 function workWithCountryList(countryList) {
    let error = ""
    let choosenCountry = {};
    if (countryList.length === 1) {
            choosenCountry = {
            name: countryList[0].name,
            capital: countryList[0].capital,
            population: countryList[0].population,
            flag: countryList[0].flag,
            languages: countryList[0].languages.map(item => item.name),
        }

        refs.country.innerHTML = mycountry(choosenCountry)
        refs.searchInput.value = ""
    }

    if (countryList.length <= 10 && countryList.length > 1) {
        const countryArray = [...countryList];
         refs.country.innerHTML = makeMarkup(countryArray);

        
    }
    if (countryList.length > 10) { 
        error = 'there ara too many countries with such name'
        console.log('there ara too many countries with such name');
        return error
    };
};




refs.searchInput.addEventListener('input', onInputSearch);








