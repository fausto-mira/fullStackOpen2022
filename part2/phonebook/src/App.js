import React, { useState, useEffect } from "react";
import personService from "./services/numbers";

import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [sucessfulMessage, setSucessfulMessage] = useState(null);

  const errorStyle = {
    color: "red",
    background: "lightgrey",
    fontSize: "20px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
  };

  const sucessfulStyle = {
    color: "green",
    background: "lightgrey",
    fontSize: "20px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
  };

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
    const result = persons.find((person) => person.name === newPerson.name);

    if (result === undefined) {
      personService.create(newPerson).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName("");
        setNewNumber("");
        setSucessfulMessage(`Added ${newPerson.name}`);
        setTimeout(() => setSucessfulMessage(null), 5000);
      });
    } else {
      const message = `${newPerson.name} is already added to phonebook, replace the old number with a new one?`;
      console.log(result);

      if (window.confirm(message)) {
        personService
          .update(result.id, newPerson)
          .then((updatedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== result.id ? person : updatedPerson
              )
            );
            setSucessfulMessage(
              `${updatedPerson.name} number was updated sucessfully!`
            );
            setTimeout(() => setSucessfulMessage(null), 5000);
          })
          .catch((error) => {
            console.log(error);
            setErrorMessage(
              `Information of ${newPerson.name} has already been removed from the server, please recharge the page`
            );
            setTimeout(() => setErrorMessage(null), 5000);
          });
        setNewName("");
        setNewNumber("");
      }
    }
  };

  return (
    <div>
      <h2 style={{ color: "green" }}>Phonebook</h2>
      <Notification message={sucessfulMessage} selectedStyle={sucessfulStyle} />
      <Notification message={errorMessage} selectedStyle={errorStyle} />
      <Filter search={search} handleSearchChange={handleSearchChange} />
      <h3 style={{ color: "red" }}>add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h3 style={{ color: "red" }}>Numbers</h3>
      <Persons persons={personsReduced} setPersons={setPersons} />
    </div>
  );
};

export default App;
