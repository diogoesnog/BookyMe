# NodeJS Version
FROM node:lts-alpine

# App Directory
WORKDIR /backend/userservice

# Install App dependencies
COPY package*.json ./

RUN npm install

# Ubdle App source
COPY . .

# Expose App Port
EXPOSE 3000

# Run App
CMD [ "npm", "test" ]
