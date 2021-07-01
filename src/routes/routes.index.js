const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send("Hola mundo 2");
});

module.exports = router;