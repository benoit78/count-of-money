FROM node:14.16

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY . .

RUN npm install

# Expose the app port
EXPOSE 5000

RUN npm run build
# Set the command to start the server
CMD ["npm", "start"]
