import React, {useState} from 'react';
import {Sidebar, StatisticsChart} from '../components';
import handleGlobalSearch from '../requests/handleGlobalSearch';
import {CONFIRMED, ERROR, LOADING, MIN_DATE, NO_DATA_FOUND, CHOOSE_SEARCH_PARAMETERS} from '../constants';
import {getCurrentDate} from "../methods";
import {Typography, Container} from "@material-ui/core";

function Global() {
  const [casesType, setCasesType] = useState(CONFIRMED);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [data, setData] = useState<any[]>([]);
  const [newCasesOnly, setNewCasesOnly] = useState(false);

  const [message, setMessage] = useState(CHOOSE_SEARCH_PARAMETERS);

  const handleChooseCasesType = (cases: string) => () => {
    setCasesType(cases);
  }

  const handleChooseDateFrom = (date: string) => {
    setDateFrom(date);
    // since API does not allow searching with only one date value:
    !dateTo && setDateTo(getCurrentDate());
  }

  const handleChooseDateTo = (date: string) => {
    setDateTo(date);
    // since API does not allow searching with only one date value:
    !dateFrom && setDateFrom(MIN_DATE);
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
    <div className="flex-row">
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
      {
        message ?
          <Container>
            <Typography className="center-text">{message}</Typography>
          </Container> :
          <StatisticsChart.ChartArea data={data}/>
      }
    </div>
  )
}

export default Global;
