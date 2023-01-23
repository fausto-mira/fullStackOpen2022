const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

if (process.argv.length < 3) {
  console.log("New Entry: node mongo.js <password> <name> <number>");
  console.log("Show all Entries: node mongo.js <password>");
  process.exit(1);
}

//console.log(process.argv.length);

const password = process.argv[2];
const url = `mongodb+srv://fausto:${password}@cluster0.zwvekiy.mongodb.net/phonebook-app?retryWrites=true&w=majority`;

mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

if (process.argv.length == 5) {
  const personName = process.argv[3];
  const personNumber = process.argv[4];

  const person = new Person({
    name: personName,
    number: personNumber,
  });

  person.save().then((result) => {
    console.log(`added ${personName} number ${personNumber} to phonebook`);
    //console.log(result);
    mongoose.connection.close();
  });
}
if (process.argv.length == 3) {
  console.log("phonebook:");
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
  });
}
