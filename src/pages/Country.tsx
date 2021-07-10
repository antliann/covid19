import React, {useState} from "react";
import {Sidebar} from "../components";
import {handleSearchByCountry} from '../requests/handleSearchByCountry'

function Country() {
  const [country, setCountry] = useState('ukraine');
  const [casesType, setCasesType] = useState('confirmed');
  const [dateFrom, setDateFrom] = useState('');
  const [data, setData] = useState('');

  const handleChooseCountry = (country: string) => () => {
    setCountry(country);
  }

  const handleChooseCasesType = (cases: string) => () => {
    setCasesType(cases);
  }

  const handleChooseDateFrom = (date: string) => {
    setDateFrom(date);
  }

  const handleSearch = async () => {
    const results = await handleSearchByCountry(country, casesType, dateFrom);
    setData(results);
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
      <div>{data.toString()}</div>
    </div>
  )
}

export default Country;
