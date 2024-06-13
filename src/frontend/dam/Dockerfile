FROM node:20

WORKDIR /src/frontend/dam/myApp

COPY package*.json ./

RUN npm install -g @ionic/cli @angular-devkit/build-angular --fetch-timeout=600000

RUN npm install --fetch-timeout=600000

EXPOSE 8100
