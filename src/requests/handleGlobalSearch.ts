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
  const casesTypeKey = transformTypeValueToKey(casesType);
  return responseData.map((item) => {
    return {
      quantity: item[casesTypeKey],
      date: item.Date?.split('T')[0],
    }
  })
}

const transformTypeValueToKey = (text: string) => 'Total' + text;

export default handleGlobalSearch;
