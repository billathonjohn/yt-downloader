FROM node:18

# Install yt-dlp dependencies
RUN apt-get update && \
    apt-get install -y python3-pip ffmpeg && \
    pip install yt-dlp

# Set working directory
WORKDIR /app

# Copy package files first for better cache
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy rest of the app files
COPY . .

# Expose port 3000
EXPOSE 3000

# Start the server
CMD ["node", "server.js"]
