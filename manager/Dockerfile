# Use the official Node.js image
FROM node:20

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

RUN echo "Manager Service Running"

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

# Expose port
EXPOSE 5555

# Define environment variable
ENV NODE_ENV=production

# Start the Manager service
CMD ["npm", "start"]
