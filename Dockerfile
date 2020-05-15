FROM node:14-alpine

WORKDIR /app

RUN npm ci && \
    npm run build

COPY . .

CMD [ "node", "server.js" ]
