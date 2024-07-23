# Use the official Node.js image as the base image
FROM docker.arvancloud.ir/node:22-alpine3.19

# Set env variables 
ENV HOSTNAME='Dana-monitor-backend'
ENV APP_PORT=4000
ENV DANA_SEREVR_ADDRESS=localhost
ENV DANA_SEREVR_PORT=25000
ENV DANA_SQL_ADDRESS=localhost
ENV DANA_SQL_USER='sa'
ENV DANA_SQL_PASS='123456'

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies 
RUN npm install 

# Install Nest framework
RUN npm install -g @nestjs/cli
# Copy the entire app to the container
COPY . ./

# Expose the port on which the app will run 
EXPOSE 4000

# Start the React app
CMD ["npm", "run","start:prod"]
