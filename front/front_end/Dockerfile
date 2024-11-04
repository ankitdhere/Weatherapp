# Use node as the base image
FROM node:16

# Set the working directory
WORKDIR /app

# Copy the package.json and install dependencies
COPY package.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Build the application


# Serve the application

CMD ["npm", "start"]
EXPOSE 3000

