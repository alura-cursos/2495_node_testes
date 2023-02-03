FROM node:16.14.2

RUN apt update && apt install -y sqlite3

WORKDIR /app

COPY . .

RUN npm install

RUN sqlite3 ./src/db/livraria.sqlite "PRAGMA foreign_keys = ON;"

EXPOSE 3000

CMD [ "npm", "run", "dev" ]