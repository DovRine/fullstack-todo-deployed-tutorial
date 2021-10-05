FROM node:16

WORKDIR /app

COPY ./.env /.env
COPY ./backend/package.json .
COPY ./backend/yarn.lock .

RUN yarn install

CMD yarn dev
