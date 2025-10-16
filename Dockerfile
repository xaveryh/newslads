FROM node:22-alpine

WORKDIR /app

COPY dist/ .

RUN npm install --global serve

EXPOSE 3000

CMD ["serve"]