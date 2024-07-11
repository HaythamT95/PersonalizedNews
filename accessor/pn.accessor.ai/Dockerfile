# Use the official Node.js image
FROM node:20

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY accessor/pn.accessor.ai/package*.json ./

RUN echo "AI Service Running"

# Install app dependencies
RUN npm install

# Create logs directory and set permissions
RUN mkdir -p /usr/src/app/logs && chmod 777 /usr/src/app/logs

# Create an empty log file
RUN touch /usr/src/app/logs/accessor.log && chmod 666 /usr/src/app/logs/accessor.log

# Bundle app source
COPY accessor/pn.accessor.ai .

# Copy the utils directory
COPY accessor/utils /usr/src/app/utils

# Expose port
EXPOSE 5562

# Define environment variable
ENV NODE_ENV=production

# Start the Accessor service
CMD ["npm", "start"]
