const express = require("express");
const router = express.Router();

router.get("/login", (req, res) => {
    res.json({ mensaje: "Ruta de login funcionando" });
});

module.exports = router;
