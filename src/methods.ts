function getCurrentDate() {
  return new Date().toISOString().split('T')[0];
}

function sortByDate(a: {date: string}, b: {date: string}) {
    if (a.date < b.date) return -1;
    else if (a.date > b.date) return 1;
    else return 0;
}

function sortByCountryName(a: {Country: string}, b: {Country: string}) {
  if (a.Country < b.Country) return -1;
  else if (a.Country > b.Country) return 1;
  else return 0;
}

export {getCurrentDate, sortByDate, sortByCountryName};
