FROM node:23

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i

COPY . .

EXPOSE 5173

ENV CHOKIDAR_USEPOLLING=true

CMD ["npm", "run", "dev"]

