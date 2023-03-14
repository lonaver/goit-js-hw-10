import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './components/fetchCountries';
import './css/styles.css';

const DEBOUNCE_DELAY = 300;

const countryListEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');
const inputSearchCountryEl = document.querySelector('input#search-box');

const renderItemsCountry = (flags, name) => {
  return `<li class="item">
            <div class="thumb">
                <img src=${flags.svg} alt="flag" />
            </div>
            <span>${name.official}</span>
          </li>`;
};
const renderOneCountry = (flags, name, capital, population, languages) => {
  return `
        <div class="thumb">
            <img src=${flags.svg} alt="flag" />
        </div>
        <span class="name_country">${name.official}</span>
        <p><span class="name_item">Capital:    </span>${capital}</p>
        <p><span class="name_item">Population: </span>${population}</p>
        <p><span class="name_item">Languages:  </span>${Object.values(
          languages
        )}</p>
      `;
};
const resetRender = () => {
  countryListEl.innerHTML = '';
  countryInfoEl.innerHTML = '';
};

const getCountriesForRender = countries => {
  const countriesItems = countries
    .map(({ flags, name }) => renderItemsCountry(flags, name))
    .join('');
  countryListEl.insertAdjacentHTML('afterbegin', countriesItems);
};

const getOneCountryForRender = countries => {
  const oneContryItem = countries
    .map(({ flags, name, capital, population, languages }) =>
      renderOneCountry(flags, name, capital, population, languages)
    )
    .join('');
  countryInfoEl.insertAdjacentHTML('afterbegin', oneContryItem);
};

const infoTooManyCountries = () =>
  Notify.info('Too many matches found. Please enter a more specific name.');
const errorRespons = () =>
  Notify.failure('Oops, there is no country with that name');

const handleInputSearchCountry = e => {
  const nameCountry = e.target.value.trim();
  resetRender();
  if (nameCountry === '') return;
  fetchCountries(nameCountry)
    .then(countries => {
      if (countries.length === 1) {
        getOneCountryForRender(countries);
      } else if (countries.length > 1 && countries.length <= 10) {
        getCountriesForRender(countries);
      } else if (countries.length > 10) {
        infoTooManyCountries();
      }
    })
    .catch(error => errorRespons());
};

inputSearchCountryEl.addEventListener(
  'input',
  debounce(handleInputSearchCountry, DEBOUNCE_DELAY)
);
