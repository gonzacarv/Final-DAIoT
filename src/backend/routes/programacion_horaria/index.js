const express = require('express');
const pool = require('../../mysql-connector');

const router = express.Router();

// Obtener todos los registros de programacion_horaria
router.get('/', (req, res) => {
    pool.query('SELECT * FROM programacion_horaria', (err, results) => {
        if (err) res.status(500).send({ error: err.message });
        else res.status(200).send(results);
    });
});

// Añadir o actualizar un registro de programacion_horaria
router.post('/', (req, res) => {
    const { consumo_id, inicio, fin } = req.body;
    const upsertQuery = `
        INSERT INTO programacion_horaria (consumo_id, inicio, fin) 
        VALUES (?, ?, ?) 
        ON DUPLICATE KEY UPDATE 
        inicio = VALUES(inicio), fin = VALUES(fin);
    `;

    pool.query(upsertQuery, [consumo_id, inicio, fin], (err, result) => {
        if (err) {
            console.error('SQL Error:', err);
            if (err.code === 'ER_DUP_ENTRY') {
                // Maneja específicamente el error de entrada duplicada
                res.status(409).send({ error: 'Entrada duplicada', details: err.message });
            } else {
                // Maneja otros errores SQL
                res.status(500).send({ error: err.message });
            }
        } else {
            // Envía una respuesta exitosa con detalles apropiados
            if (result.affectedRows > 0) {
                res.send({ message: "Operación realizada con éxito", affectedRows: result.affectedRows });
            } else {
                res.status(404).send({ message: 'No se encontraron registros para actualizar.' });
            }
        }
    });
});


module.exports = router;
