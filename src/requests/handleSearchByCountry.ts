function handleSearchByCountry(country: string, casesType: string, dateFrom: string): Promise<string> {
  const dateForSearch = dateFrom || '2019-12-01';
  const query = `https://api.covid19api.com/live/country/south-africa/status/${casesType}/date/${dateForSearch}`;

  return fetch(query)
    .then(res => res.json());
}

export default handleSearchByCountry;
