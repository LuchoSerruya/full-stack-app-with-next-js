FROM node:alpine

WORKDIR /usr/src/app

COPY . .

RUN npm install && npm run build

ENV PORT 8080

CMD ["npm", "start", "--", "--port", "$PORT", "--hostname", "0.0.0.0"]