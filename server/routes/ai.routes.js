const express = require("express");
const { generateAIContent } = require("../controllers/ai.controller");
const protect = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/generate", generateAIContent);

module.exports = router;
