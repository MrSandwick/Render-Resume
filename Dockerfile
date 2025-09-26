# Dockerfile
FROM node:22.12-alpine

WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./
RUN npm install

# Copy the rest of the source code
COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]
