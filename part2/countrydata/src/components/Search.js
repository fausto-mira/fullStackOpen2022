export const Search = (props) => {
  const { search, setSearch, result } = props;
  const handleSearch = (event) => {
    setSearch(event.target.value);
    console.log({ search });
  };

  return (
    <div>
      find countries: <input value={search} onChange={handleSearch} />
      {result.length !== 250 ? (
        <button type="button" onClick={() => setSearch("")}>
          clear
        </button>
      ) : (
        <br />
      )}
    </div>
  );
};
