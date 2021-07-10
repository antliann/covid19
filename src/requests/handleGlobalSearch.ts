function handleGlobalSearch(casesType: string, dateFrom: string, dateTo: string): Promise<string> {
  return fetch("https://api.covid19api.com/world?from=2020-03-01T00:00:00Z&to=2021-06-01T00:00:00Z")
    .then(res => res.json())
}

export {handleGlobalSearch};
