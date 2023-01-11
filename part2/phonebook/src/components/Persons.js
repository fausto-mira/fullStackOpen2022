import personService from "../services/numbers";

const Persons = ({ persons, setPersons }) => {
  const deletePerson = (person) => {
    if (window.confirm(`delete ${person.name}?`)) {
      personService
        .del(person.id)
        .then(() =>
          personService
            .getAll()
            .then((modifiedPersons) => setPersons(modifiedPersons))
        );
    }
  };
  return (
    <div>
      {persons.map((person) => (
        <p key={person.id}>
          {person.name} {person.number}{" "}
          <button type="button" onClick={() => deletePerson(person)}>
            delete
          </button>
        </p>
      ))}
    </div>
  );
};

export default Persons;
