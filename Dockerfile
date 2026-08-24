FROM node:20-alpine

WORKDIR /usr/src/app


RUN apk update && apk upgrade --no-cache

COPY app/package*.json ./

RUN npm ci --omit=dev && npm cache clean --force

COPY app/ ./


RUN rm -rf /usr/local/lib/node_modules/npm

EXPOSE 3000

CMD ["node", "index.js"]