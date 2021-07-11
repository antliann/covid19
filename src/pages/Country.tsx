import React, {useState} from 'react';
import {Sidebar, StatisticsChart} from '../components';
import handleSearchByCountry from '../requests/handleSearchByCountry'
import {CONFIRMED, ERROR, LOADING, NO_DATA_FOUND} from '../constants';

function Country() {
  const [country, setCountry] = useState('');
  const [casesType, setCasesType] = useState(CONFIRMED);
  const [dateFrom, setDateFrom] = useState('');
  const [data, setData] = useState<any[]>([]);

  const [message, setMessage] = useState('');

  const handleChooseCountry = (countryKey: string) => {
    setCountry(countryKey);
  }

  const handleChooseCasesType = (cases: string) => () => {
    setCasesType(cases);
  }

  const handleChooseDateFrom = (date: string) => {
    setDateFrom(date);
  }

  const handleSearch = async () => {
    if (country) {
      setMessage(LOADING);
      const results = await handleSearchByCountry(country, casesType, dateFrom);
      if (results) {
        if (results.length) {
          setData(results);
          setMessage('');
        } else {
          setMessage(NO_DATA_FOUND);
        }
      } else setMessage(ERROR);
    } else alert('Please, choose a country from the list')
  }

  return (
    <div>
      <div>
        <Sidebar
          searchByCountries
          chooseCountry={handleChooseCountry}
          chooseCasesType={handleChooseCasesType}
          chooseDateFrom={handleChooseDateFrom}
          chosenCases={casesType}
          onSearchButtonClick={handleSearch}
        />
      </div>
      <div>{message || <StatisticsChart.ChartBars data={data}/>}</div>
    </div>
  )
}

export default Country;
