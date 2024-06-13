#!/bin/bash

# -- Set local IP --
IP="192.168.0.172"

SUBJECT_CA="/C=AR/ST=CABA/L=CABA/O=FiUBA/OU=CA/CN=$IP"
SUBJECT_SERVER="/C=AR/ST=CABA/L=CABA/O=FiUBA/OU=Server/CN=$IP"
SUBJECT_CLIENT="/C=AR/ST=CABA/L=CABA/O=FiUBA/OU=Client/CN=$IP"

# Configuration file for adding IP as SAN
CONFIG="
[ req ]
distinguished_name = req_distinguished_name
x509_extensions = v3_ca
req_extensions = v3_req
prompt = no

[ req_distinguished_name ]
C = AR
ST = CABA
L = CABA
O = FiUBA
OU = Server
CN = $IP

[ v3_ca ]
subjectAltName = @alt_names

[ v3_req ]
subjectAltName = @alt_names

[ alt_names ]
IP.1 = $IP
"

function generate_CA () {
    echo "$SUBJECT_CA"
    openssl req -x509 -nodes -sha256 -newkey rsa:2048 -subj "$SUBJECT_CA" -days 365 -keyout ca.key -out ca.crt
}

function generate_server () {
    echo "$SUBJECT_SERVER"
    echo "$CONFIG" > server_config.cnf
    openssl req -nodes -sha256 -new -keyout server.key -out server.csr -config server_config.cnf
    openssl x509 -req -sha256 -in server.csr -CA ca.crt -CAkey ca.key -CAcreateserial -out server.crt -days 365 -extensions v3_req -extfile server_config.cnf
}

function generate_client () {
    echo "$SUBJECT_CLIENT"
    openssl req -new -nodes -sha256 -subj "$SUBJECT_CLIENT" -out client.csr -keyout client.key 
    openssl x509 -req -sha256 -in client.csr -CA ca.crt -CAkey ca.key -CAcreateserial -out client.crt -days 365
}

function copy_keys_to_broker () {
    cp ca.crt ../mosquitto/certs/
    cp server.crt ../mosquitto/certs/
    cp server.key ../mosquitto/certs/
}

generate_CA
generate_server
generate_client
# copy_keys_to_broker

