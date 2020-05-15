FROM node:14-alpine

WORKDIR /app

COPY dist /app/dist

CMD [ "node", "server.js" ]
