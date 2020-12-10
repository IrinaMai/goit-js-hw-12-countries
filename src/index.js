import './styles.css';
import makeMarkup from './markup.hbs';
import mycountry from './mycountry.hbs'

const _ = require('lodash');

const refs = {
    searchInput: document.querySelector('.search__input'),
    wrapper: document.querySelector('.wrapper'),
    countriesList: document.querySelector('.countries__list'),
    country: document.querySelector('.country')
};

function makeUrl(event) {
    const countryName = event.currentTarget.value;
    return fetch(`https://restcountries.eu/rest/v2/name/${countryName}`)
        .then(response => response.json())
        .then((countryList) => {
            workWithCountryList(countryList)
            
        })
   
};

function workWithCountryList(countryList) {
    let error = ""
    let choosenCountry = {};
    // if (countryList.length === 0){
    //     error = 'there is not such country'
    //     console.log('there is not such country');
    //     return error
    // };
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
        refs.countriesList.innerHTML = makeMarkup(countryArray);
        // console.log('countryArray: ', countryArray);
        
    }
    if (countryList.length > 10) { 
        error = 'there ara too many countries with such name'
        console.log('there ara too many countries with such name');
        return error
    };
};




refs.searchInput.addEventListener('input', makeUrl);








