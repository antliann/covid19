import React from "react";
import {Sidebar} from "../components";

function Country() {
  return (
    <div>
      <Sidebar
        searchByCountries
        chooseCasesType={handleChooseCasesType}
        chooseDateFrom={handleChooseDateFrom}
        chooseDateTo={handleChooseDateTo}
      />
    </div>
  )
}

export default Country;
