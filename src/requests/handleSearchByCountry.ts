import {MIN_DATE, API_URL} from '../constants';

function handleSearchByCountry(country: string, casesType: string, dateFrom: string) {
  const dateForSearch = dateFrom || MIN_DATE; // api does not allow searching without date value
  const countryKey = 'ukraine';

  const query = `${API_URL}/live/country/${countryKey}/status/${casesType.toLowerCase()}/date/${dateForSearch}`;

  return fetch(query)
    .then(res => res.json())
    .then(responseData => extractDataFromResponse(casesType, responseData));
}

function extractDataFromResponse(casesType: string, responseData: any[]) {
  const quantitiesByDate: {[key: string]: number} = {};

  responseData.forEach((item) => {
    const date = item.Date?.split('T')[0];
    if (quantitiesByDate.hasOwnProperty(date)) {
      quantitiesByDate[date] += item[casesType];
    } else quantitiesByDate[date] = item[casesType];
  });

  return Object.keys(quantitiesByDate).map((date) => {
    return {
      quantity: quantitiesByDate[date],
      date,
    }
  })
}

export default handleSearchByCountry;
