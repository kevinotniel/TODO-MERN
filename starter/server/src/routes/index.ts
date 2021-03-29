import { Router } from "express";
import bodyParser from "body-parser";

import {
  getTodos,
  getTodo,
  addTodo,
  updateTodo,
  removeTodo,
} from "../controllers/todos/index";

const router = Router();

// middle ware, karena mereka akan memproses body request dari USER
const jsonParser = bodyParser.json();

router.get("/api/todos", getTodos);

router.get("/api/todos/:id", getTodo);

router.post("/api/add-todo", jsonParser, addTodo);

//endpoint api dipasing dengan id fitur untuk membuat todo menjadi completed dan uncompleted yang nantinya akan diedit existing di database
router.put("/api/update-todo/:id", jsonParser, updateTodo);

//enpoint api dipasing dengan id, supaya dapat meremove dengan data id yang tepat
router.delete("/api/remove-todo/:id", jsonParser, removeTodo);

export default router;

// controller adalah sebuah koki didapur yang membuat
// alamat adalah sebuah menu
// router.get adalah sebuah pramusaji/waiter
// parameter didalamnya endpoint sebuah alamat untuk diambil dari database
