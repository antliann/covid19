import React, {useState} from "react";
import {Sidebar} from "../components";

function Country() {
  const [country, setCountry] = useState('ukraine');
  const [casesType, setCasesType] = useState('confirmed');
  const [dateFrom, setDateFrom] = useState('');

  const handleChooseCountry = (country: string) => () => {
    setCountry(country);
  }

  const handleChooseCasesType = (cases: string) => () => {
    setCasesType(cases);
  }

  const handleChooseDateFrom = (date: string) => {
    setDateFrom(date);
  }

  const handleSearch = () => handleSearchByCountry(country, casesType, dateFrom);

  return (
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
  )
}

export default Country;
