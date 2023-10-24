const todolistController = require("../controller/todolistcontroller");
const permission = require("../permission");
const { Router } = require("express");
const router = Router();

router.post("", permission.is_authenticated, todolistController.createTodolist);
router.get("", permission.is_authenticated, todolistController.getTodolists);
router.put("/:id", permission.is_authenticated, todolistController.updateTodolist);
router.delete("/:id", permission.is_authenticated, todolistController.deleteTodolist);

module.exports = router;