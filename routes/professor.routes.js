const express = require("express");
const router = express.Router();
const { isAdmin, isLoggedIn } = require("../middleware");

const profcontrol = require("../controllers/professor.controller");

router.get("/", profcontrol.getprofessors);

module.exports = router;
