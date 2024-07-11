# Use the official Node.js image
FROM node:20

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY manager/pn.manager.mail/package*.json ./

RUN echo "AI News Service Running"

# Install app dependencies
RUN npm install

# Create logs directory and set permissions
RUN mkdir -p /usr/src/app/logs && chmod 777 /usr/src/app/logs

# Create an empty log file
RUN touch /usr/src/app/logs/manager.log && chmod 666 /usr/src/app/logs/manager.log

# Bundle app source
COPY manager/pn.manager.mail .

# Copy the utils directory
COPY manager/utils /usr/src/app/utils

# Expose port
EXPOSE 5558

# Define environment variable
ENV NODE_ENV=production

# Start the Manager service
CMD ["npm", "start"]
