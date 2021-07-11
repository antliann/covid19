import React, {useState} from "react";
import {Sidebar} from "../components";
import handleGlobalSearch from '../requests/handleGlobalSearch';
import {CONFIRMED} from "../constants";

function Global() {
  const [casesType, setCasesType] = useState(CONFIRMED);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [data, setData] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const handleChooseCasesType = (cases: string) => () => {
    setCasesType(cases);
  }

  const handleChooseDateFrom = (date: string) => {
    setDateFrom(date);
  }

  const handleChooseDateTo = (date: string) => {
    setDateTo(date);
  }

  const handleSearch = async () => {
    if (dateFrom < dateTo) {
      setIsLoading(true);
      const results = await handleGlobalSearch(casesType, dateFrom, dateTo);
      setData(results?.map((item) =>
        item.quantity + ' ' + item.date).join() || 'No data for this period');
      setIsLoading(false);
    } else {
      alert('Please, set "Date From" lower than "Date To"');
    }
  }

  return (
    <div>
      <div>
        <Sidebar
          chooseCasesType={handleChooseCasesType}
          chooseDateFrom={handleChooseDateFrom}
          chooseDateTo={handleChooseDateTo}
          chosenCases={casesType}
          onSearchButtonClick={handleSearch}
          chosenDateFrom={dateFrom}
          chosenDateTo={dateTo}
        />
      </div>
      <div>{isLoading ? 'Loading...' : data}</div>
    </div>
  )
}

export default Global;
