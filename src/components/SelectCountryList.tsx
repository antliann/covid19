import React, {useEffect, useState} from 'react';
import requestCountriesList from "../requests/requestCountriesList";
import {sortByCountryName} from "../methods";

function SelectCountryList({chooseCountry}: { chooseCountry: (country: string) => void }) {
  const [countriesList, setCountriesList] = useState([]);

  useEffect(() => {
      if (sessionStorage.getItem('countriesList')) {
        setCountriesList(JSON.parse(sessionStorage.getItem('countriesList') || ''));
      } else {
        requestCountriesList().then((listFromRequest) => {
            if (listFromRequest) {
              const sortedCountriesList = listFromRequest.sort(sortByCountryName);
              sessionStorage.setItem('countriesList', JSON.stringify(sortedCountriesList));
              setCountriesList(sortedCountriesList);
            }
          }
        );
      }
    }, []
  );

  const handleCountrySelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    chooseCountry(e.target.value);
  }

  return (
    <select defaultValue="default" onChange={handleCountrySelect}>
      <option value="default" disabled>Choose country...</option>
      {countriesList.map((country: { Country: string, Slug: string }) => (
        <option value={country.Slug}>{country.Country}</option>
      ))}
    </select>
  );
}

export default SelectCountryList;
