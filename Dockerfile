FROM node:16

WORKDIR /app

COPY package.json .

RUN npm install
RUN npm install -g json-server

COPY . .

EXPOSE 3000

CMD ["json-server", "--watch", "db.json"]
CMD ["npm", "start"]