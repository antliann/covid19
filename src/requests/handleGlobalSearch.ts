import {API_URL} from '../constants';

function handleGlobalSearch(casesType: string, dateFrom: string, dateTo: string): Promise<string> {
  const dateFromWithSearchKey = dateFrom && `from=${dateFrom}`;
  const dateToWithSearchKey = dateTo && `${dateFrom && '&'}to=${dateTo}`;

  return fetch(`${API_URL}/world?${dateFromWithSearchKey}${dateToWithSearchKey}`)
    .then(res => res.json())
}

export default handleGlobalSearch;
