FROM node:26.12.0-alpine

WORKDIR /app

COPY ./backend/package*.json ./

RUN npm ci

COPY ./backend .

EXPOSE 15500
