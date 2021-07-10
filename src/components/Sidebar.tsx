import React, {useMemo} from "react";

function Sidebar({
                   searchByCountries,
                   chooseCountry,
                   chooseCasesType,
                   chooseDateFrom,
                   chooseDateTo = () => null,
                   chosenCases,
                   onSearchButtonClick,
                 }: {
  searchByCountries?: boolean,
  chooseCountry?: (country: string) => void,
  chooseCasesType: (cases: string) => () => void,
  chooseDateFrom: (date: string) => void,
  chooseDateTo?: (date: string) => void,
  chosenCases: string,
  onSearchButtonClick: () => void,
}) {
  const currentDate = useMemo(() => new Date().toISOString().split("T")[0], []);

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
          className={chosenCases === 'confirmed' ? 'selected' : 'unselected'}
          onClick={chooseCasesType('confirmed')}>
          Confirmed
        </button>
        <button
          className={chosenCases === 'deaths' ? 'selected' : 'unselected'}
          onClick={chooseCasesType('deaths')}>
          Deaths
        </button>
        <button
          className={chosenCases === 'recovered' ? 'selected' : 'unselected'}
          onClick={chooseCasesType('recovered')}>
          Recovered
        </button>
      </div>
      <div id="period">
        <input type="date" min="2019-12-01" max={currentDate} onChange={handleChangeDateFrom}/>
        {searchByCountries || <input type="date" min="2019-12-01" max={currentDate} onChange={handleChangeDateTo}/>}
      </div>
      <button onClick={onSearchButtonClick}>Search</button>
    </div>
  )
}

export default Sidebar;
