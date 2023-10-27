const todolistController = require("../controller/todolistcontroller");
const permission = require("../permission");
const { Router } = require("express");
const router = Router();

router.post("", permission.is_authenticated, todolistController.createTodolist);
router.put("/:id", permission.is_authenticated, todolistController.updateTodolist);
router.delete("/:id", permission.is_authenticated, todolistController.deleteTodolist);
router.get("", permission.is_authenticated, todolistController.getTodolists);
router.get("/:id", permission.is_authenticated, todolistController.getTodolistsById);

module.exports = router;