const express = require("express")
const router = express.Router()
const mainController = require("../controllers/main.js")
const areaController = require("../controllers/area.js")
const gameController = require("../controllers/game.js")
const cursoController = require("../controllers/curso.js")

// Main controller 
router.get("/", mainController.index)  
router.get("/sobre", mainController.sobre)
router.get("/auth", mainController.auth)
router.get("/signup", mainController.signup)
router.post("/signup", mainController.signup)
router.get("/login",mainController.login)
router.post("/login",mainController.login)
router.get("/logout", mainController.logout)

// Area controller 
router.get("/area", areaController.index)

// Game controller 
router.get("/game",gameController.game)

//Curso controller
router.get("/curso", cursoController.index);
router.get("/curso/create", cursoController.create);
router.post("/curso/create", cursoController.create);
router.get("/curso/read/:id", cursoController.read);
router.get("/curso/update/:id", cursoController.update);
router.post("/curso/update/:id", cursoController.update);
router.post("/curso/remove/:id", cursoController.remove);

module.exports = router