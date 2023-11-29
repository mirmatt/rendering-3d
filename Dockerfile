FROM node:18.18.1-alpine
WORKDIR /src
COPY . .

RUN npm ci
EXPOSE 3000
CMD ["npm", "start"]