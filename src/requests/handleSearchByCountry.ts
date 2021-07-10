function handleSearchByCountry(country: string, casesType: string, dateFrom: string): Promise<string> {
  return fetch("https://api.covid19api.com/live/country/south-africa/status/confirmed/date/2021-03-21T13:13:30Z")
    .then(res => res.json());
}

export {handleSearchByCountry};
