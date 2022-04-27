const { Schema, model } = require("mongoose");

const schema = new Schema({
  todos: { type: String, required: true, unique: true },
  completed: { type: Boolean, required: true },
});

module.exports = model("Todo", schema);
