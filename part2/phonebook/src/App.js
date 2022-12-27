import React, { useState } from "react";

const Number = ({ persons }) => {
  return (
    <div>
      {persons.map((person) => (
        <p>{person.name}</p>
      ))}
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const addName = (event) => {
    event.preventDefault();
    console.log("button clicked", event.target);
    const newPerson = { name: newName };
    let found = persons.includes(newPerson, 0);
    console.log(found);
    if (!found) {
      setPersons(persons.concat(newPerson));
      setNewName("");
    } else alert(`${newPerson} is already added to phonebook`);
  };

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Number persons={persons} />
    </div>
  );
};

export default App;
