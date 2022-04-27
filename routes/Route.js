const { Router } = require("express");
const Todo = require("../models/Todo.js");
const router = Router();
const config = require("config");
const { check, validationResult } = require("express-validator");
// /api/todos/
router.post(
  "/",
  [
    check("todo", "Empty todos").isLength({
      min: 1,
      max: 40,
    }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Incorrect datas backend",
        });
      }

      const { todo, completed } = req.body;
      const candidate = await Todo.findOne({
        todos: todo,
        completed: completed,
      });
      if (candidate) {
        return res.status(400).json({ message: "You already have this todo)" });
      }
      const newTodo = new Todo({ todos: todo, completed: false });
      await newTodo.save();
      res.status(201).json({ message: "Todo created successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error " + error });
    }
  }
);

router.get("/", async (req, res) => {
  try {
    const candidate = await Todo.find();
    res.json(candidate);
  } catch (e) {
    res.status(500).json({ message: "Getting error" });
  }
});
router.put("/:id", async (req, res) => {
  try {
    const candidate = await Todo.findOneAndUpdate(
      { _id: req.params.id },
      req.body
    );
    res.json(candidate);
  } catch (e) {
    res.status(500).json({ message: "Update error" });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const candidate = await Todo.findByIdAndDelete(
      { _id: req.params.id },
      req.body
    );
    res.json(candidate);
  } catch (e) {
    console.log("Delete error" + e);
  }
});

module.exports = router;
