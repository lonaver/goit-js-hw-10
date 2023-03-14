import { Notify } from 'notiflix/build/notiflix-notify-aio';
const API_DEFAULT = 'https://restcountries.com/v3.1/';

export const fetchCountries = name => {
  return fetch(
    `${API_DEFAULT}name/${name}?fields=name,capital,population,flags,languages`
  ).then(response => {
    if (!response.ok) {
      Notify.failure('Oops, there is no country with that name');
    }

    return response.json();
  });
};
