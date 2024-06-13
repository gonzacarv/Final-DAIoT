require('dotenv').config();

module.exports = {
    services: {
        API: {
            HOST: process.env.API_HOST || "0.0.0.0",
            PORT: process.env.API_PORT || 3000
        },
        MQTT: {
            USERNAME: process.env.MQTT_USERNAME || "",
            PASSWORD: process.env.MQTT_PASSWORD || "",
            HOST: process.env.MQTT_HOST || "192.168.0.172", // Cambiado a la IP del broker
            PORT: process.env.MQTT_PORT || 8883
        },
        DATABASE: {
            MYSQL: {
                USERNAME: process.env.DB_MYSQL_USERNAME || "root",
                PASSWORD: process.env.DB_MYSQL_PASSWORD || "userpass",
                DBNAME: process.env.DB_MYSQL_NAME || "DAM",
                HOST: process.env.DB_MYSQL_HOST || "mysql-server",
                PORT: process.env.DB_MYSQL_PORT || 3306
            }
        }
    },
    ROUTER_PATH: process.env.ROUTER_PATH || "",
    ENVIRONMENT: process.env.ENVIRONMENT || "development"
};
