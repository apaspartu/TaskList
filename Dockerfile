FROM node:lts-alpine
COPY . /usr/src/app
WORKDIR /usr/src/app
EXPOSE 3000
ENTRYPOINT ["npm", "test"]