import React, {useState} from "react";
import {Sidebar} from "../components";
import handleSearchByCountry from '../requests/handleSearchByCountry'
import {CONFIRMED} from "../constants";

function Country() {
  const [country, setCountry] = useState('ukraine');
  const [casesType, setCasesType] = useState(CONFIRMED);
  const [dateFrom, setDateFrom] = useState('');
  const [data, setData] = useState('');

  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
    const results = await handleSearchByCountry(country, casesType, dateFrom);
    setData(results?.map((item, index) =>
      index + ') ' + item.quantity + ' ' + item.date).join() || 'No data for this period');
    setIsLoading(false);
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
      <div>{isLoading ? 'Loading...' : data}</div>
    </div>
  )
}

export default Country;
