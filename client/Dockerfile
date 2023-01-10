FROM node:14.16

# Create app directory
WORKDIR /app

COPY package*.json ./

COPY . .

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)

RUN npm install

# Build the app
RUN npm run build

# Expose the app port
EXPOSE 3000

# Set the command to start the server
CMD ["npm", "start"]