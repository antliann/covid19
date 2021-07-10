import React, {useState} from "react";
import {Sidebar} from "../components";
import handleGlobalSearch from '../requests/handleGlobalSearch';
import {CONFIRMED} from "../constants";

function Global() {
  const [casesType, setCasesType] = useState(CONFIRMED);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [data, setData] = useState('');

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
    const results = await handleGlobalSearch(casesType, dateFrom, dateTo);
    setData(results);
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
      />
    </div>
      <div>{data.toString()}</div>
    </div>
  )
}

export default Global;
