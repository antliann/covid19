import React, {useState} from "react";

import {Sidebar} from "../components";

function Global() {
  const [casesType, setCasesType] = useState('confirmed');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const handleChooseCasesType = (cases: string) => () => {
    setCasesType(cases);
  }

  const handleChooseDateFrom = (date: string) => {
    setDateFrom(date);
  }

  const handleChooseDateTo = (date: string) => {
    setDateTo(date);
  }

  const handleSearch = () => handleGlobalSearch(casesType, dateFrom, dateTo);

  return (
    <div>
      <Sidebar
        chooseCasesType={handleChooseCasesType}
        chooseDateFrom={handleChooseDateFrom}
        chooseDateTo={handleChooseDateTo}
        chosenCases={casesType}
        onSearchButtonClick={handleSearch}
      />
    </div>
  )
}

export default Global;
