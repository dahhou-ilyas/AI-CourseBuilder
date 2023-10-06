FROM node:18-alpine


WORKDIR /app

COPY package.json .

COPY package-lock.json .

RUN npm install

COPY . .

EXPOSE 3000


CMD ["sh", "-c", "npx prisma migrate dev && npm run dev"]