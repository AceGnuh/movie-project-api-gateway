# Using Node.js v20 as base image
FROM node:20
# Set up the working directory
WORKDIR /app
# Copy package.json and package-lock.json to the working directory
COPY package*.json ./
# Install the dependencies
RUN yarn install
# Coppy all the files to the working directory
COPY . .
# Expose the port 4000 for the application
EXPOSE 4000
# Start the application in development mode
CMD ["yarn", "run", "start:dev"]





