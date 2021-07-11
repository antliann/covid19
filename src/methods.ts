function getCurrentDate() {
  return new Date().toISOString().split('T')[0];
}

function sortByDate(a: {date: string}, b: {date: string}) {
    if (a.date < b.date) return -1;
    else if (a.date > b.date) return 1;
    else return 0;
}

export {getCurrentDate, sortByDate};
