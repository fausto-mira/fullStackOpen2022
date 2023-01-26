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
    ":method :url :status :res[content-length] - :response-time ms - :content"
  )
);
app.use(cors());

//Only for production build
//app.use(express.static("build"));

app.get("/", (request, response) => {
  response.send("<h1>Hello world</h1>");
});

app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => response.json(persons));
});

app.get("/info", (request, response) => {
  Person.find({}).then((persons) => {
    const message = `<div>Phonebook has info for ${persons.length} people</div>`;
    const date = `<div>${new Date()}</div>`;
    response.send(message + date);
  });
});

app.get("/api/persons/:id", (request, response) => {
  Person.findById(request.params.id).then((person) => {
    person
      ? response.json(person)
      : response.status(404).json({ error: "Not Found" });
  });
});

app.delete("/api/persons/:id", (request, response) => {
  Person.findById(request.params.id).then((person) => {
    console.log(person);
    Person.deleteOne(person);
    response.status(204).end();
  });
});

app.post("/api/persons", (request, response) => {
  const newPerson = request.body;

  if (!newPerson.name || !newPerson.number)
    return response.status(400).json({ error: "content missing" });

  Person.find({})
    .then((persons) => {
      if (persons.find((person) => person.name === newPerson.name))
        return Promise.reject();
    })
    .then(() => {
      const person = new Person({
        name: newPerson.name,
        number: newPerson.number,
      });
      person.save().then((savedPerson) => response.json(savedPerson));
    })
    .catch((err) => {
      console.log(err);
      response.status(400).json({ error: "name must be unique" });
    });
});

morgan.token("content", (request, response) => {
  Person.findById(request.params.id).then((person) => {
    let showPerson;
    person
      ? (showPerson = { name: person.name, number: person.number })
      : (showPerson = {});
    return JSON.stringify(showPerson);
  });
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
