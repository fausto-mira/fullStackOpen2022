import React, { useState, useEffect } from "react";
import axios from "axios";

import { Search } from "./components/Search";
import { Results } from "./components/Result";

function App() {
  const [search, setSearch] = useState("");
  const [allCountries, setAllCountries] = useState([]);
  const url = "https://restcountries.com/v2/all";

  useEffect(() => {
    axios.get(url).then((response) => setAllCountries(response.data));
  }, []);

  const result = allCountries.filter((country) =>
    country.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <Search search={search} setSearch={setSearch} result={result} />
      <Results countries={result} setSearch={setSearch} search={search} />
    </div>
  );
}

export default App;
