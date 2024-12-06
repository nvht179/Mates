FROM node:23

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i

COPY . .

EXPOSE 5137

CMD ["npm", "run", "build"]

CMD ["npm", "run", "dev"]

