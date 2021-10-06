FROM node:16

RUN mkdir /app
WORKDIR /app

COPY ./.env.development.local .
COPY ./package.json .
COPY ./yarn.lock .

RUN yarn install

EXPOSE 3000

CMD yarn start
