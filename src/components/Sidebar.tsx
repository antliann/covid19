import React, {useMemo} from "react";
import {MIN_DATE, CONFIRMED, DEATHS, RECOVERED} from "../constants";

function Sidebar({
                   searchByCountries,
                   chooseCountry,
                   chooseCasesType,
                   chooseDateFrom,
                   chooseDateTo = () => null,
                   chosenCases,
                   onSearchButtonClick,
                   chosenDateFrom,
                   chosenDateTo,
                 }: {
  searchByCountries?: boolean,
  chooseCountry?: (country: string) => void,
  chooseCasesType: (cases: string) => () => void,
  chooseDateFrom: (date: string) => void,
  chooseDateTo?: (date: string) => void,
  chosenCases: string,
  onSearchButtonClick: () => void,
  chosenDateFrom?: string,
  chosenDateTo?: string,
}) {
  const currentDate = useMemo(() => new Date().toISOString().split('T')[0], []);

  const handleChangeDateFrom = (e: React.ChangeEvent<HTMLInputElement>) => {
    chooseDateFrom(e.target.value);
  }

  const handleChangeDateTo = (e: React.ChangeEvent<HTMLInputElement>) => {
    chooseDateTo(e.target.value);
  }

  return (
    <div>
      {searchByCountries && (
        <select id="countries-list">

        </select>
      )}
      <div id="cases">
        <button
          className={chosenCases === CONFIRMED ? 'selected' : 'unselected'}
          onClick={chooseCasesType(CONFIRMED)}>
          Confirmed
        </button>
        <button
          className={chosenCases === DEATHS ? 'selected' : 'unselected'}
          onClick={chooseCasesType(DEATHS)}>
          Deaths
        </button>
        <button
          className={chosenCases === RECOVERED ? 'selected' : 'unselected'}
          onClick={chooseCasesType(RECOVERED)}>
          Recovered
        </button>
      </div>
      <div id="period">
        <input type="date" min={MIN_DATE} max={chosenDateTo || currentDate} onChange={handleChangeDateFrom}/>
        {searchByCountries || <input type="date" min={chosenDateFrom || MIN_DATE} max={currentDate} onChange={handleChangeDateTo}/>}
      </div>
      <button onClick={onSearchButtonClick}>Search</button>
    </div>
  )
}

export default Sidebar;
