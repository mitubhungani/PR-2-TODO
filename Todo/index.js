const express = require("express");
const app = express();
app.use(express.json());

let initialTodo = [
  { title: "HTML", isCompleted: true, id: 1 },
  { title: "javascript", isCompleted: true, id: 2 },
  { title: "React", isCompleted: false, id: 3 },
];

app.get("/", (req, res) => {
  res.send("welcome to the todo api");
});

app.get("/todos", (req, res) => {
  res.json(initialTodo);
});

app.post("/addtodo", (req, res) => {
  const { title, isCompleted } = req.body;
  console.log(title);

  if (!title || typeof isCompleted !== "boolean") {
    return res.status(400).send("invalid data");
  }
  let newTodo = {
    title,
    isCompleted,
    id: Date.now(),
  };
  initialTodo.push(newTodo);
  res.status(200).json(newTodo);
});

app.patch("/update/:id", (req, res) => {
  const { id } = req.params;
  const { title, isCompleted } = req.body;
  const todoIndex = initialTodo.findIndex((ele) => ele.id == id);

  // if (todoIndex === -1) {
  //   return res.status(404).send("Todo not found.");
  // }

  if (title) initialTodo[todoIndex].title = title;
  if (typeof isCompleted === "boolean")
    initialTodo[todoIndex].isCompleted = isCompleted;

  res.json(initialTodo[todoIndex]);
});

app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  const index = initialTodo.findIndex((ele) => ele.id == id);
  let deletedTodo = initialTodo.splice(index, 1)[0];
  res.json({ deletedTodo, todos: initialTodo });
});

app.get("/todo/:id", (req, res) => {
  const { id } = req.params;
  const todo = initialTodo.find((ele) => ele.id == id);
  if (!todo) {
    return res.status(404).send("Todo not found");
  }
  res.json(todo);
});

app.get("/findbystatus", (req, res) => {
  const { isCompleted } = req.query;
  const filterData = initialTodo.filter(
    (ele) => ele.isCompleted === (isCompleted === "true")
  );
  res.json(filterData);
});

app.listen(8090, () => {
  console.log("http://localhost:8090/");
});
