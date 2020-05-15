FROM node:14-alpine

WORKDIR /app

COPY dist /app/
COPY server.js /app/
COPY node_modules /app/

CMD [ "node", "server.js" ]
