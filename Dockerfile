FROM node:20
WORKDIR /app
COPY yarn.lock package.json ./
RUN yarn
COPY . .
RUN yarn build
# run app on 0.0.0.0 to make sure that debugger can access it from outside
CMD [ "yarn", "start:dev", "NODE_OPTIONS='--inspect=0.0.0.0:9229'" ]
