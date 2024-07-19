# Use an official Node.js runtime as a parent image
FROM node:18-alpine AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application to the working directory
COPY . .

# Build the Next.js application
RUN npm run build

# Use a smaller base image for the final build
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Install PM2 globally
RUN npm install -g pm2

# Copy the built application from the build stage
COPY --from=build /app ./

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application using PM2
CMD ["pm2-runtime", "start", "npm", "--", "start"]
