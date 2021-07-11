import {API_URL} from '../constants';

function handleGlobalSearch(casesType: string, dateFrom: string, dateTo: string) {
  const dateFromWithSearchKey = dateFrom && `from=${dateFrom}`;
  const dateToWithSearchKey = dateTo && `${dateFrom && '&'}to=${dateTo}`;

  const query = `${API_URL}/world?${dateFromWithSearchKey}${dateToWithSearchKey}`

  return fetch(query)
    .then(res => res.json())
    .then(responseData => extractDataFromResponse(casesType, responseData));
}

function extractDataFromResponse(casesType: string, responseData: any[]) {
  if (responseData) {
    const casesTypeKey = transformTypeValueToKey(casesType);
    return responseData.map((item) => {
      return {
        date: item.Date?.split('T')[0],
        quantity: item[casesTypeKey],
      }
    }).sort((a, b) => {
      if (a.date < b.date) return -1;
      else if (a.date > b.date) return 1;
      else return 0;
    })
  } else return [];
}

const transformTypeValueToKey = (text: string) => 'New' + text;

export default handleGlobalSearch;
