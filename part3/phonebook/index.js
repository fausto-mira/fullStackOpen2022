require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/person");
const app = express();

//run app in dev mode with nodemon with $npm run dev;

app.use(express.json());
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :content"
  )
);
app.use(cors());
app.use(express.static("build"));

app.get("/", (request, response) => {
  response.send("<h1>Hello world</h1>");
});

app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => response.json(persons));
});

app.get("/info", (request, response) => {
  Person.find({}).then((persons) => {
    console.logs(response.json(persons));
  });

  const message = `<div>Phonebook has info for ${response.length} people</div>`;
  const date = `<div>${new Date()}</div>`;
  response.send(message + date);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  Person.find({}).then((persons) => response.json(persons));
  const person = persons.find((person) => person.id === id);

  person
    ? response.json(person)
    : response.status(404).json({ error: "Not Found" });
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const persons = Person.find({}).then((persons) => response.json(persons));
  persons = persons.filter((person) => person.id !== id);

  response.status(204).end();
});

app.post("/api/persons", (request, response) => {
  const newPerson = request.body;
  newPerson.id = Math.floor(Math.random() * 99999);

  if (newPerson.name && newPerson.number) {
    if (!persons.find((person) => person.name === newPerson.name)) {
      // persons = persons.concat(newPerson);
      // response.json(newPerson);
      // console.log({ persons });
      const person = new Person({
        name: newPerson.name,
        number: newPerson.number,
      });
      person.save().then((savedPerson) => response.json(savedPerson));
    }
    return response.status(400).json({ error: "name must be unique" });
  }
  return response.status(400).json({ error: "name and/or number required" });
});

morgan.token("content", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);
  let showPerson;
  person
    ? (showPerson = { name: person.name, number: person.number })
    : (showPerson = {});
  return JSON.stringify(showPerson);
});

app.use((request, response) => {
  response.status(404).json({
    error: "Not found",
  });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
