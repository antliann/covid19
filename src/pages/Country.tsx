import React, {useState} from 'react';
import {Sidebar, StatisticsChart} from '../components';
import handleSearchByCountry from '../requests/handleSearchByCountry'
import {CONFIRMED, ERROR, LOADING, NO_DATA_FOUND, CHOOSE_SEARCH_PARAMETERS} from '../constants';
import {Container, Typography} from "@material-ui/core";

function Country() {
  const [country, setCountry] = useState('');
  const [casesType, setCasesType] = useState(CONFIRMED);
  const [dateFrom, setDateFrom] = useState('');
  const [data, setData] = useState<any[]>([]);

  const [message, setMessage] = useState(CHOOSE_SEARCH_PARAMETERS);

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
    <div className="flex-adapt">
      <Sidebar
        searchByCountries
        chooseCountry={handleChooseCountry}
        chooseCasesType={handleChooseCasesType}
        chooseDateFrom={handleChooseDateFrom}
        chosenCases={casesType}
        onSearchButtonClick={handleSearch}
      />
      {
        message ?
          <Container>
            <Typography className="center-text">{message}</Typography>
          </Container> :
          <StatisticsChart.ChartBars data={data}/>
      }
    </div>
  )
}

export default Country;
