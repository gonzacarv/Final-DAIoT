const express = require('express');
const pool = require('../../mysql-connector');

const router = express.Router();

router.post('/', (req, res) => {
    const { grupo_id, consumo_id } = req.body;
    const query = 'INSERT INTO grupos_consumos (grupo_id, consumo_id) VALUES (?, ?)';
    pool.query(query, [grupo_id, consumo_id], (err, result) => {
        if (err) res.status(500).send({ error: err.message });
        else res.status(201).send({ message: 'Asociación creada correctamente' });
    });
});

module.exports = router;
