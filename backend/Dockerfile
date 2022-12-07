FROM node:15

# Create app directory
WORKDIR /app

# Copying everything to working directory
COPY ./ ./

# Install dependencies
RUN npm install

# Run the app
CMD [ "npm", "start" ]
