import React, {useState} from "react";
import {Sidebar, StatisticsChart} from "../components";
import handleGlobalSearch from '../requests/handleGlobalSearch';
import {CONFIRMED} from "../constants";

function Global() {
  const [casesType, setCasesType] = useState(CONFIRMED);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [data, setData] = useState<any[]>([]);

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
    if (dateFrom && dateTo && dateFrom >= dateTo) {
      alert('Please, set "Date From" lower than "Date To"');
    } else {
      setIsLoading(true);
      const results = await handleGlobalSearch(casesType, dateFrom, dateTo);
      setData(results);
      setIsLoading(false);
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
      <div>{isLoading ? 'Loading...' : <StatisticsChart.ChartArea data={data}/>}</div>
    </div>
  )
}

export default Global;
