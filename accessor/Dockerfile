# Use the official Node.js image
FROM node:20

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

RUN echo "Accessor Service Running"

# Install app dependencies
RUN npm install

# Create logs directory and set permissions
RUN mkdir -p /usr/src/app/logs && chmod 777 /usr/src/app/logs

# Create an empty log file
RUN touch /usr/src/app/logs/accessor.log && chmod 666 /usr/src/app/logs/accessor.log

# Bundle app source
COPY . .

# Expose port
EXPOSE 8080

# Define environment variable
ENV NODE_ENV=production
ENV DATABASEURL=${DATABASEURL}

CMD ["npm", "start"]
