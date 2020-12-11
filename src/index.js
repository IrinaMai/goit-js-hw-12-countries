import './styles.css';
import makeMarkup from './markup.hbs';
import mycountry from './mycountry.hbs'
import makeUrl from './fetchCountries.js'
const { alert, error, notice, defaultModules} = require('@pnotify/core');
import '../node_modules/@pnotify/core/dist/PNotify.css'
import '../node_modules/@pnotify/core/dist/Angeler.css'
import '../node_modules/@pnotify/core/dist/BrightTheme.css'
import '../node_modules/@pnotify/core/dist/Material.css'



// const myAlert = alert({
//  title: 'Attention!!!!',
//   text: "I'm an alert.",
//   type: 'info'
// });
// console.log(myAlert);

// const myError = error({
//  title: 'Error',
//   text: "I'm an error.",
//   type: 'error'
// });
// console.log(myError);



export const refs = {
    searchInput: document.querySelector('.search__input'),
    wrapper: document.querySelector('.wrapper'),
    countriesList: document.querySelector('.countries__list'),
    country: document.querySelector('.country')
};


const _ = require('lodash');
const onInputSearch = _.debounce(() => {
    makeUrl();
},500);


export function workWithCountryList(countryList) {
    // let error = ""
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
    };
    if (countryList.length <= 10 && countryList.length > 1) {
        const countryArray = [...countryList];
         refs.country.innerHTML = makeMarkup(countryArray);
    };
    if (countryList.length > 10) { 
        const myError = error({
        title: 'Error',
        text: "Too many countries were found. Please enter more specific query!",
        type: 'error'
        });
        return (myError)
    };
};




refs.searchInput.addEventListener('input', onInputSearch);








