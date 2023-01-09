import { Country } from "./Country";

const DisplayCountries = ({ countries, setSearch }) => {
  return (
    <div>
      {countries.map((country) => {
        return (
          <div key={country.name}>
            {country.name}
            <button
              type="button"
              value={country.name}
              onClick={(e) => setSearch(e.target.value)}
            >
              show
            </button>
          </div>
        );
      })}
    </div>
  );
};

export const Results = ({ countries, setSearch, search }) => {
  if (countries.length > 10 && search.length > 0)
    return <div>Too manu matches, specify another filter</div>;

  if (countries.length === 1) {
    console.log({ countries });
    return (
      <Country
        name={countries[0].name}
        capital={countries[0].capital}
        population={countries[0].population}
        languages={countries[0].languages}
        flag={countries[0].flag}
      />
    );
  }

  if (search.length === 0)
    return <div>Type a country name to start searching</div>;

  return <DisplayCountries countries={countries} setSearch={setSearch} />;
};
