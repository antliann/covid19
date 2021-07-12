import React from 'react';
import {MIN_DATE, CONFIRMED, DEATHS, RECOVERED, ACTIVE} from '../constants';
import {getCurrentDate} from '../methods';
import {SelectCountryList} from '../components';

import {Checkbox, ButtonGroup, Button, TextField, Typography} from "@material-ui/core";

function Sidebar({
                   searchByCountries,
                   chooseCountry = () => null,
                   chooseCasesType,
                   chooseDateFrom,
                   chooseDateTo = () => null,
                   chooseNewCasesOnly = () => null,
                   chosenCases,
                   chosenNewCasesOnly,
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
  chosenNewCasesOnly?: boolean,
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
    <div className="sidebar">
      <div className="sidebar-item-container">
        <Typography variant="h6" className="center-text">
          {searchByCountries ? 'Statistics Per Country' : 'Global Statistics'}
        </Typography>
      </div>
      {searchByCountries && (
        <div className="sidebar-item-container">
          <SelectCountryList chooseCountry={chooseCountry}/>
        </div>
      )}
      <div className="sidebar-item-container">
        <ButtonGroup
          orientation="vertical"
          color="primary"
          aria-label="outlined primary button group">
          <Button
            variant={chosenCases === CONFIRMED ? 'contained' : 'outlined'}
            onClick={chooseCasesType(CONFIRMED)}>
            Confirmed
          </Button>
          <Button
            variant={chosenCases === DEATHS ? 'contained' : 'outlined'}
            onClick={chooseCasesType(DEATHS)}>
            Deaths
          </Button>
          <Button
            variant={chosenCases === RECOVERED ? 'contained' : 'outlined'}
            onClick={chooseCasesType(RECOVERED)}>
            Recovered
          </Button>
          {searchByCountries && (
            <Button
              variant={chosenCases === ACTIVE ? 'contained' : 'outlined'}
              onClick={chooseCasesType(ACTIVE)}>
              Active
            </Button>
          )}
        </ButtonGroup>
      </div>
      {searchByCountries || (
        <div className="sidebar-item-container">
          <div className="flex-row">
            <Checkbox checked={chosenNewCasesOnly} color="primary" onChange={handleNewCasesClick}/>
            <Typography>New cases per day</Typography>
          </div>
        </div>
      )}
      <div id="period">
        <div className="sidebar-item-container">
          <TextField
            type="date"
            label="Choose Date From"
            value={chosenDateFrom || ''}
            inputProps={{
              min: MIN_DATE,
              max: chosenDateTo || getCurrentDate(),
            }}
            InputLabelProps={{shrink: true}}
            onChange={handleChangeDateFrom}
          />
        </div>
        {searchByCountries ||
        <div className="sidebar-item-container">
          <TextField
            type="date"
            label="Choose Date To"
            value={chosenDateTo}
            inputProps={{
              min: chosenDateFrom || MIN_DATE,
              max: getCurrentDate(),
            }}
            InputLabelProps={{shrink: true}}
            onChange={handleChangeDateTo}
          />
        </div>}
      </div>
      <Button variant="contained" color="primary" onClick={onSearchButtonClick}>Search</Button>
    </div>
  )
}

export default Sidebar;
