import {API_URL, MIN_DATE} from '../constants';
import {getCurrentDate, sortByDate} from '../methods';

function handleGlobalSearch(casesType: string, dateFrom: string, dateTo: string, newCasesOnly: boolean) {
  // API does not allow searching with only one date value
  const dateSearchKey = (dateFrom || dateTo) &&
    `from=${dateFrom || MIN_DATE}&to=${dateTo || getCurrentDate()}`;

  const query = `${API_URL}/world?${dateSearchKey}`

  return fetch(query)
    .then(res => res.json())
    .then(responseData => extractDataFromResponse(casesType, responseData, newCasesOnly), () => null);
}

function extractDataFromResponse(casesType: string, responseData: any[], newCasesOnly: boolean) {
  if (responseData) {
    const casesTypeKey = transformTypeValueToKey(casesType, newCasesOnly);
    return responseData.map((item) => {
      return {
        date: item.Date?.split('T')[0],
        quantity: item[casesTypeKey],
      }
    }).sort(sortByDate);
  } else return [];
}

const transformTypeValueToKey = (casesType: string, newCasesOnly: boolean) => {
  return (newCasesOnly ? 'New' : 'Total') + casesType;
}

export default handleGlobalSearch;
