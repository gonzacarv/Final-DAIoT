const cors = require('cors');
const express = require('express');
const pool = require('../../mysql-connector');
const mqtt = require('../../mqtt');

const app = express();
app.use(cors());
const router = express.Router();

// Obtener todos los consumos
router.get('/', (req, res) => {
    pool.query('SELECT * FROM consumos', (err, results) => {
        if (err) res.status(500).send({ error: err.message });
        else res.status(200).send(results);
    });
});

// Crear un nuevo consumo
router.post('/', (req, res) => {
    const { nombre, descripcion, estado, usuario_id } = req.body;
    const query = 'INSERT INTO consumos (nombre, descripcion, estado, usuario_id) VALUES (?, ?, ?, ?)';
    pool.query(query, [nombre, descripcion, estado, usuario_id], (err, result) => {
        if (err) res.status(500).send({ error: err.message });
        else res.status(201).send({ id: result.insertId });
    });
});

// Actualizar el estado de un consumo
router.put('/:id', (req, res) => {
    let { estado } = req.body;
    const { id } = req.params;

    const query = 'UPDATE consumos SET estado = ? WHERE id = ?';
    pool.query(query, [estado, id], (err, result) => {
        if (err) {
            console.error('SQL Error:', err.message);
            res.status(500).send({ error: 'Error al actualizar el estado del consumo', details: err.message });
        } else {
            if (result.affectedRows === 0) {
                res.status(200).send({ message: 'No se modificó ningún registro', details: 'Posiblemente el valor enviado es igual al valor actual en la base de datos.' });
            } else {
                mqtt.publish(`hogar/consumos/${id}/estado`, estado ? "true" : "false");
                res.status(200).send({ message: 'Consumo actualizado correctamente', affectedRows: result.affectedRows });
            }
        }
    });
});

// Actualizar la intensidad de un consumo
router.put('/:id/intensidad', (req, res) => {
    const { intensidad } = req.body;
    const { id } = req.params;

    if (intensidad < 0 || intensidad > 100) {
        return res.status(400).send({ error: 'La intensidad debe estar entre 0 y 100.' });
    }

    const query = 'UPDATE consumos SET intensidad = ? WHERE id = ?';
    pool.query(query, [intensidad, id], (err, result) => {
        if (err) {
            console.error('SQL Error:', err.message);
            res.status(500).send({ error: 'Error al actualizar la intensidad del consumo', details: err.message });
        } else {
            if (result.affectedRows === 0) {
                res.status(200).send({ message: 'No se modificó ningún registro, la intensidad puede ser igual al valor actual.' });
            } else {
                mqtt.publish(`hogar/consumos/${id}/intensidad`, intensidad.toString());
                res.status(200).send({ message: 'Intensidad actualizada correctamente', affectedRows: result.affectedRows });
            }
        }
    });
});

// Obtener un consumo específico por ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    pool.query('SELECT * FROM consumos WHERE id = ?', [id], (err, results) => {
        if (err) {
            res.status(500).send({ error: err.message });
        } else if (results.length > 0) {
            res.status(200).send(results[0]);
        } else {
            res.status(404).send({ message: 'Consumo no encontrado' });
        }
    });
});

module.exports = (app) => {
    app.use('/consumos', router);
};
