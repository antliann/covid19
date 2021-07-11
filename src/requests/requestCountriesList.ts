import {API_URL} from "../constants";

function requestCountriesList() {
  const query = `${API_URL}/countries`;

  return fetch(query)
    .then(res => res)
    .then(responseData => responseData.json(), () => null)
}

export default requestCountriesList;
