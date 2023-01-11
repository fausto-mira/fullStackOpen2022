import React, { useState, useEffect } from "react";
import personService from "./services/numbers";

import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);
  const handleSearchChange = (event) => setSearch(event.target.value);

  const personsReduced = persons.filter((person) =>
    person.name.toLowerCase().includes(search)
  );

  const addPerson = (event) => {
    event.preventDefault();
    const newPerson = { name: newName, number: newNumber };
    const result = persons.find((person) =>
      person.name === newPerson.name ? person.id : undefined
    );

    if (result === undefined) {
      personService.create(newPerson).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName("");
        setNewNumber("");
      });
    } else {
      const message = `${newPerson.name} is already added to phonebook, replace the old number with a new one?`;
      console.log(result);
      if (window.confirm(message)) {
        personService
          .update(result.id, newPerson)
          .then((updatedPerson) =>
            setPersons(
              persons.map((person) =>
                person.id !== result.id ? person : updatedPerson
              )
            )
          );
        setNewName("");
        setNewNumber("");
      }
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} handleSearchChange={handleSearchChange} />
      <h3>add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons persons={personsReduced} setPersons={setPersons} />
    </div>
  );
};

export default App;
