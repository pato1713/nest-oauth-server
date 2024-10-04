FROM node:20

WORKDIR /app

COPY yarn.lock package.json ./

RUN yarn

COPY . .

RUN yarn build

CMD [ "yarn", "start:dev" ]