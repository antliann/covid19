import React, {useEffect, useState} from 'react';
import {Sidebar, StatisticsChart} from '../components';
import handleGlobalSearch from '../requests/handleGlobalSearch';
import {CONFIRMED, ERROR, LOADING, MIN_DATE, NO_DATA_FOUND, CHOOSE_SEARCH_PARAMETERS} from '../constants';
import {getCurrentDate} from "../methods";
import {Typography, Container} from "@material-ui/core";

function Global() {
  const [casesType, setCasesType] = useState(CONFIRMED);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [newCasesOnly, setNewCasesOnly] = useState(false);

  const [data, setData] = useState<any[]>([]);
  const [message, setMessage] = useState(CHOOSE_SEARCH_PARAMETERS);

  useEffect(() => {
      const previousCasesTypeFilter = sessionStorage.getItem('globalCasesTypeFilter');
      previousCasesTypeFilter && setCasesType(previousCasesTypeFilter);

      const previousDateFromFilter = sessionStorage.getItem('globalDateFromFilter');
      previousDateFromFilter && setDateFrom(previousDateFromFilter);

      const previousDateToFilter = sessionStorage.getItem('globalDateToFilter');
      previousDateToFilter && setDateTo(previousDateToFilter);

      const previousNewCasesOnlyFilter = sessionStorage.getItem('globalNewCasesOnlyFilter');
      previousNewCasesOnlyFilter && setNewCasesOnly(previousNewCasesOnlyFilter === 'true');
    }, []
  );

  useEffect(() => {
    if (dateFrom || dateTo) {
      sessionStorage.setItem('globalDateFromFilter', dateFrom);
      sessionStorage.setItem('globalDateToFilter', dateTo);
    }
  }, [dateFrom, dateTo])

  const handleChooseCasesType = (cases: string) => () => {
    setCasesType(cases);
    sessionStorage.setItem('globalCasesTypeFilter', cases);
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

  const handleChooseNewCasesOnly = (areNew: boolean) => {
    setNewCasesOnly(areNew);
    sessionStorage.setItem('globalNewCasesOnlyFilter', areNew.toString());
  }

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
    <div className="flex-adapt">
      <Sidebar
        chooseCasesType={handleChooseCasesType}
        chooseDateFrom={handleChooseDateFrom}
        chooseDateTo={handleChooseDateTo}
        chooseNewCasesOnly={handleChooseNewCasesOnly}
        chosenCases={casesType}
        chosenNewCasesOnly={newCasesOnly}
        onSearchButtonClick={handleSearch}
        chosenDateFrom={dateFrom}
        chosenDateTo={dateTo}
      />
      {
        message ?
          <Container>
            <Typography className="center-text">{message}</Typography>
          </Container> :
          <div className="max-fit">
            <StatisticsChart.ChartArea data={data}/>
          </div>
      }
    </div>
  )
}

export default Global;
