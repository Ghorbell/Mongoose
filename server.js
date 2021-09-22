const { response } = require('express')
const express = require('express')
const app = express()
const port = 4000
const mongoose=require("mongoose")
const connectdb=require("./config/dbConfig")


require("dotenv").config();

connectdb();



const personSchema = new mongoose.Schema({
  id: { type: Number, unique: true },

  name: {
    type: String,
    default: `User${Math.floor(Math.random() * 900000)}`,
    required: true,
  },

  age: {
    type: Number,
    default: 13,
  },
  favoriteFoods: {
    type: [String],
  },
});


const Person = mongoose.model("Person", personSchema); 


const user = new Person ({
  name: "Joey",
  age: 31,
  favoriteFoods: ["Pizza", "Meatballs Sandwich"],
});


const users= [
  {  name: "Scott", age: 46, favoriteFoods: ["Bacon", "Pretzels"] },

  {
    
    name: "Hasbullah",
    age: 19,
    favoriteFoods: ["Strawberries", "Pizza"],
  },

  {  name: "Kevin", age: 42, favoriteFoods: ["m&ms", "Chilli"] },
]





user.save((error) => {
  error ? console.log("SAVE::",error) : console.log("User was added Successfully");
});

Person.create(users, (error, response) => {
  error ? console.log("CREATE:", error) : console.log(response);
});

Person.find({ name: "Scott" }, (error, response) =>
  error ? console.log("FIND::", error) : console.log(response)
);

Person.findOne({ favoriteFoods: "chilli" }, (error, response) =>
  error ? console.log("FINDONE:",error) : console.log(response)
);

Person.findById({ _id: "614b155ba7c349cc377dff1a" }, (error, response) =>
  error
    ? console.log("FIND BY ID :: ", error)
    : console.log("res by id1", response)
);

Person.findById({_id:"614b16a2924948f145c49008"},async(error,response)=>{
 try {
   await response.favoriteFoods.push("Gabagool")
   console.log("Favorite food was updated")
   response.save()
   
 } catch (error) {
   console.log("error of food update",error)
 }
});



Person.findOneAndUpdate({name:"Hasbullah"},{$set:{age:20}},(error,response)=>{
  error?
  console.log(error):
  console.log("Age was Updated")
})


Person.findByIdAndRemove(
  { _id: "614b1c903d73dbfd32a2f761" },
  (error, response) => {
    error ? console.log(error) : console.log("User Was removed Successfully");
  }
);


Person.remove({ name: "Mary" }, (error, response) => {
  error ? console.log(error) : console.log("Mary was Removed");
});

const chainSearch="Burritos";
Person.find({ favoriteFoods: chainSearch })
  .sort({ name: 1 })
  .limit(2)
  .select({ age: 00})
  .exec((err, data) =>
    err
      ? console.error("error", err)
      : console.log("people who like burritos:", data)
  );
app.listen(port, () => console.log(`Example app listening on port ${port}!`))