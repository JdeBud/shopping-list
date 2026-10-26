FROM node:26.12.0-alpine

WORKDIR /app

COPY ./frontend/package*.json ./

RUN npm ci

COPY ./frontend .

EXPOSE 3000
