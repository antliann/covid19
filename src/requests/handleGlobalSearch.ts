import {API_URL, MIN_DATE} from '../constants';
import {getCurrentDate, sortByDate} from '../methods';

function handleGlobalSearch(casesType: string, dateFrom: string, dateTo: string) {
  // API does not allow searching with only one date value
  const dateSearchKey = (dateFrom || dateTo) &&
    `from=${dateFrom || MIN_DATE}&to=${dateTo || getCurrentDate()}`;

  const query = `${API_URL}/world?${dateSearchKey}`

  return fetch(query)
    .then(res => res.json())
    .then(responseData => extractDataFromResponse(casesType, responseData), () => null);
}

function extractDataFromResponse(casesType: string, responseData: any[]) {
  if (responseData) {
    const casesTypeKey = transformTypeValueToKey(casesType);
    return responseData.map((item) => {
      return {
        date: item.Date?.split('T')[0],
        quantity: item[casesTypeKey],
      }
    }).sort(sortByDate);
  } else return [];
}

const transformTypeValueToKey = (text: string) => 'New' + text;

export default handleGlobalSearch;
