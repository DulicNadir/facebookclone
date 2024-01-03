# Use the official Node.js image as a base
FROM node:18.13.0

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

RUN npm rebuild bcrypt --build-from-source

# Copy the rest of the application code to the container
COPY . .

# Expose the port the backend server will run on
EXPOSE 8080

# Define the command to run your backend
CMD ["npm", "start"]
