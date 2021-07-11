import React, {useState} from 'react';
import {Sidebar, StatisticsChart} from '../components';
import handleGlobalSearch from '../requests/handleGlobalSearch';
import {CONFIRMED, ERROR, LOADING, NO_DATA_FOUND} from '../constants';

function Global() {
  const [casesType, setCasesType] = useState(CONFIRMED);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [data, setData] = useState<any[]>([]);
  const [newCasesOnly, setNewCasesOnly] = useState(false);

  const [message, setMessage] = useState('');

  const handleChooseCasesType = (cases: string) => () => {
    setCasesType(cases);
  }

  const handleChooseDateFrom = (date: string) => {
    setDateFrom(date);
  }

  const handleChooseDateTo = (date: string) => {
    setDateTo(date);
  }

  const handleChooseNewCasesOnly = (areNew: boolean) => setNewCasesOnly(areNew);

  const handleSearch = async () => {
    if (dateFrom && dateTo && dateFrom >= dateTo) {
      alert('Please, set "Date From" lower than "Date To"');
    } else {
      setMessage(LOADING);
      const results = await handleGlobalSearch(casesType, dateFrom, dateTo, newCasesOnly);
      if (results) {
        if (results.length) {
          setData(results);
          setMessage('');
        } else {
          setMessage(NO_DATA_FOUND);
        }
      } else setMessage(ERROR);
    }
  }

  return (
    <div>
      <div>
        <Sidebar
          chooseCasesType={handleChooseCasesType}
          chooseDateFrom={handleChooseDateFrom}
          chooseDateTo={handleChooseDateTo}
          chooseNewCasesOnly={handleChooseNewCasesOnly}
          chosenCases={casesType}
          onSearchButtonClick={handleSearch}
          chosenDateFrom={dateFrom}
          chosenDateTo={dateTo}
        />
      </div>
      <div>{message || <StatisticsChart.ChartArea data={data}/>}</div>
    </div>
  )
}

export default Global;
