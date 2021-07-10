import {MIN_DATE, API_URL} from '../constants';

function handleSearchByCountry(country: string, casesType: string, dateFrom: string): Promise<string> {
  const dateForSearch = dateFrom || MIN_DATE; // api does not allow searching without date value
  const countryKey = 'ukraine';

  const query = `${API_URL}/live/country/${countryKey}/status/${casesType}/date/${dateForSearch}`;

  return fetch(query)
    .then(res => res.json());
}

export default handleSearchByCountry;
