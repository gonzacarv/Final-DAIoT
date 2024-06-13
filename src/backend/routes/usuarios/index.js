const express = require('express');
const pool = require('../../mysql-connector');

const router = express.Router();

router.get('/', (req, res) => {
    pool.query('SELECT * FROM usuarios', (err, results) => {
        if (err) res.status(500).send({ error: err.message });
        else res.status(200).send(results);
    });
});

router.post('/', (req, res) => {
    const { nombre, email, password } = req.body;
    const query = 'INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)';
    pool.query(query, [nombre, email, password], (err, result) => {
        if (err) res.status(500).send({ error: err.message });
        else res.status(201).send({ id: result.insertId });
    });
});

module.exports = router;
