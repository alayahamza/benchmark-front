FROM node:14-alpine

WORKDIR /app

COPY . .

RUN npm ci && \
    npm run build

CMD [ "node", "server.js" ]
