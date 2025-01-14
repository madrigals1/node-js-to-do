FROM node:13.12.0-alpine

WORKDIR /usr/src/app

COPY package*.json ./
COPY tsconfig.json ./
COPY src ./src

RUN npm install
RUN npm run build

COPY . .

EXPOSE 4200

CMD ["npm", "run start"]