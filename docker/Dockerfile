FROM node:boron

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# COPY package.json .
# For npm@5 or later, copy package-lock.json as well
# COPY package.json package-lock.json ./

RUN apt-get update

RUN apt-get install nano

RUN npm install

RUN npm install nodemon -g

EXPOSE 3000

CMD ["npm", "start"]