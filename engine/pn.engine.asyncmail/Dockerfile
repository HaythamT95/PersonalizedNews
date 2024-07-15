# Use the official Node.js image
FROM node:20

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY engine/pn.engine.asyncmail/package*.json ./

RUN echo "Async Mail Service Running"

# Install app dependencies
RUN npm install

# Create logs directory and set permissions
RUN mkdir -p /usr/src/app/logs && chmod 777 /usr/src/app/logs

# Create an empty log file
RUN touch /usr/src/app/logs/engine.log && chmod 666 /usr/src/app/logs/engine.log

# Bundle app source
COPY engine/pn.engine.asyncmail .

# Copy the utils directory
COPY engine/utils /usr/src/app/utils

# Expose port
EXPOSE 5565

# Define environment variable
ENV NODE_ENV=production

# Start the Manager service
CMD ["npm", "start"]
