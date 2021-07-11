import {MIN_DATE, API_URL} from '../constants';
import {sortByDate} from '../methods';

function handleSearchByCountry(country: string, casesType: string, dateFrom: string) {
  // API does not allow searching without date value
  const dateForSearch = dateFrom || MIN_DATE;

  const query = `${API_URL}/live/country/${country}/status/${casesType.toLowerCase()}/date/${dateForSearch}`;

  return fetch(query)
    .then(res => res.json())
    .then(responseData => extractDataFromResponse(casesType, responseData), () => null);
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
    }).sort(sortByDate)
  } else return [];
}

export default handleSearchByCountry;
