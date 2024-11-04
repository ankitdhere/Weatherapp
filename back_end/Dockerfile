# Use Node.js as the base image
FROM node:16

# Set the working directory
WORKDIR /app

# Install MongoDB
RUN apt-get update && apt-get install -y gnupg wget && \
    wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | apt-key add - && \
    echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/debian buster/mongodb-org/4.4 main" | tee /etc/apt/sources.list.d/mongodb-org-4.4.list && \
    apt-get update && \
    apt-get install -y mongodb-org && \
    mkdir -p /data/db /var/log/mongodb && \
    chown -R mongodb:mongodb /data/db /var/log/mongodb

# Set the MongoDB data directory environment variable
ENV MONGO_DATA_DIR=/data/db

# Copy the package.json and install dependencies
COPY package.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the application will run on
EXPOSE 5000

# Start MongoDB and the Node.js application
CMD mongod --dbpath /data/db --logpath /var/log/mongodb/mongodb.log --logappend & node server1.js

