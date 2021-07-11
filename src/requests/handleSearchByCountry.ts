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
  if (responseData) {
    // calculating total country data as a sum of its regions data
    const quantitiesByDate: { [key: string]: number } = {};

    responseData.forEach((item) => {
      const dateOfRecord = item.Date?.split('T')[0];

      if (quantitiesByDate.hasOwnProperty(dateOfRecord)) {
        quantitiesByDate[dateOfRecord] += item[casesType];
      } else {
        quantitiesByDate[dateOfRecord] = item[casesType];
      }
    });

    return Object.keys(quantitiesByDate).map((date) => {
      return {
        date: date,
        quantity: quantitiesByDate[date],
      }
    }).sort((a, b) => {
      if (a.date < b.date) return -1;
      else if (a.date > b.date) return 1;
      else return 0;
    })
  } else return [];
}

export default handleSearchByCountry;
