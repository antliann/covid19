import React from 'react';
import {MIN_DATE, CONFIRMED, DEATHS, RECOVERED, ACTIVE} from '../constants';
import {getCurrentDate} from '../methods';
import {SelectCountryList} from '../components';

function Sidebar({
                   searchByCountries,
                   chooseCountry = () => null,
                   chooseCasesType,
                   chooseDateFrom,
                   chooseDateTo = () => null,
                   chooseNewCasesOnly = () => null,
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
  chooseNewCasesOnly?: (areNew: boolean) => void,
  chosenCases: string,
  onSearchButtonClick: () => void,
  chosenDateFrom?: string,
  chosenDateTo?: string,
}) {
  const handleChangeDateFrom = (e: React.ChangeEvent<HTMLInputElement>) => {
    chooseDateFrom(e.target.value);
  }

  const handleChangeDateTo = (e: React.ChangeEvent<HTMLInputElement>) => {
    chooseDateTo(e.target.value);
  }

  const handleNewCasesClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    chooseNewCasesOnly(e.target.checked);
  }

  return (
    <div>
      {searchByCountries && (
        <SelectCountryList chooseCountry={chooseCountry}/>
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
        {searchByCountries ? (
          <button
            className={chosenCases === ACTIVE ? 'selected' : 'unselected'}
            onClick={chooseCasesType(ACTIVE)}>
            Active
          </button>
        ) : (
          <div>
            <input type="checkbox" id="new-cases" onChange={handleNewCasesClick}/>
            <label htmlFor="new-cases">New cases per day</label>
          </div>
        )}
      </div>
      <div id="period">
        <input
          type="date"
          value={chosenDateFrom}
          min={MIN_DATE}
          max={chosenDateTo || getCurrentDate()}
          onChange={handleChangeDateFrom}
        />
        {searchByCountries ||
        <input
          type="date"
          value={chosenDateTo}
          min={chosenDateFrom || MIN_DATE}
          max={getCurrentDate()}
          onChange={handleChangeDateTo}
        />}
      </div>
      <button onClick={onSearchButtonClick}>Search</button>
    </div>
  )
}

export default Sidebar;
