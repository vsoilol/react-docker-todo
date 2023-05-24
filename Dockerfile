FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available) to the container
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the entire project directory to the container
COPY . .

# Copy db.json to the container
COPY data/db.json ./data/db.json

RUN npm install json-server -g --silent

# Expose port 3000 for React and port 8000 for JSON Server
EXPOSE 3000 8000

# Start both React and JSON Server
CMD ["npm", "run", "docker-start"]