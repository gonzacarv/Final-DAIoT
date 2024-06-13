var mqtt = require('mqtt');
const config = require('./config');
const pool = require('./mysql-connector');

const MQTT_ENV = config.services.MQTT;

var options = {
    clientId: 'mqttjs_' + Math.random().toString(16).slice(2, 8),
    rejectUnauthorized: false,  // Deshabilitar la validación de certificados para pruebas
    username: MQTT_ENV.USERNAME,
    password: MQTT_ENV.PASSWORD,
    qos: 2,
    port: MQTT_ENV.PORT,
    clean: true
};

const URI = `mqtts://${MQTT_ENV.HOST}`;
console.log("MQTT:" + URI);

const client = mqtt.connect(URI, options);

client.on('connect', function () {
    console.log("[MQTT] Init: Connected");
    client.subscribe('hogar/consumos/+/estado', function (err) {
        if (err) {
            console.log("[MQTT] Error subscribing to estado: " + err);
        }
    });
    client.subscribe('hogar/consumos/+/intensidad', function (err) {
        if (err) {
            console.log("[MQTT] Error subscribing to intensidad: " + err);
        }
    });
});

client.on('message', function (topic, message) {
    console.log(`[MQTT] Received message: ${message.toString()} on topic: ${topic}`);

    const topicParts = topic.split('/');
    const consumoId = topicParts[2];
    const attribute = topicParts[3];

    if (attribute === 'estado') {
        const estado = message.toString() === 'true' ? 1 : 0;
        const query = 'UPDATE consumos SET estado = ? WHERE id = ?';
        pool.query(query, [estado, consumoId], (err, result) => {
            if (err) {
                console.error('[MySQL] Error updating estado:', err);
            } else {
                console.log('[MySQL] Estado updated successfully');
            }
        });
    } else if (attribute === 'intensidad') {
        const intensidad = parseInt(message.toString());
        const query = 'UPDATE consumos SET intensidad = ? WHERE id = ?';
        pool.query(query, [intensidad, consumoId], (err, result) => {
            if (err) {
                console.error('[MySQL] Error updating intensidad:', err);
            } else {
                console.log('[MySQL] Intensidad updated successfully');
            }
        });
    }
});

client.on('error', function (error) {
    console.log("[MQTT] Error: " + error);
});

module.exports = client;
