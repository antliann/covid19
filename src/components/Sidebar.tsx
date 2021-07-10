import React from "react";

function Sidebar({
                   searchByCountries,
                   chooseCasesType,
                   chooseDateFrom,
                   chooseDateTo,
                   chosenCases,
                 }: {
  searchByCountries: boolean,
  chooseCasesType: (cases: string) => () => void,
  chooseDateFrom: (date: string) => void,
  chooseDateTo: (date: string) => void,
  chosenCases: string,
}) {
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
          onClick={chooseCasesType('confirmed')}>Confirmed
        </button>
        <button
          className={chosenCases === 'deaths' ? 'selected' : 'unselected'}
          onClick={chooseCasesType('deaths')}>Deaths
        </button>
        <button
          className={chosenCases === 'recovered' ? 'selected' : 'unselected'}
          onClick={chooseCasesType('recovered')}>Recovered
        </button>
      </div>
      <div id="period">
        <input type="date" min="2019-12-01" onChange={handleChangeDateFrom}/>
        <input type="date" onChange={handleChangeDateTo}/>
      </div>
    </div>
  )
}

export default Sidebar;
