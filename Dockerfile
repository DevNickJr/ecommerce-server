# syntax=docker/dockerfile:1

FROM node:20-alpine

RUN apk add python3 make gcc g++

WORKDIR /app

COPY . .

# RUN npm install --g node-gyp

RUN npm install --g pnpm 

RUN pnpm install

CMD ["pnpm", "run", "dev"]

EXPOSE 3000