import React, {useEffect, useState} from 'react';
import requestCountriesList from "../requests/requestCountriesList";
import {sortByCountryName} from "../methods";

import {Select, MenuItem} from "@material-ui/core";

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

  const handleCountrySelect = (e: React.ChangeEvent<{value: unknown; }>) => {
    chooseCountry(e.target.value as string);
  }

  return (
    <Select defaultValue="default" onChange={handleCountrySelect}>
      <MenuItem value="default" disabled>Choose country...</MenuItem>
      {countriesList.map((country: { Country: string, Slug: string }) => (
        <MenuItem value={country.Slug}>{country.Country}</MenuItem>
      ))}
    </Select>
  );
}

export default SelectCountryList;
