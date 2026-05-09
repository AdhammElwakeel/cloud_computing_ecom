FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 8000

CMD ["sh", "-c", "node src/seed/index.js && node src/index.js"]