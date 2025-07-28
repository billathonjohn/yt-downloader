const express = require('express');
const cors = require('cors');
const { execFile } = require('child_process');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/download', (req, res) => {
  const videoUrl = req.body.url;
  if (!videoUrl) return res.status(400).send('No URL provided');

  const outputPath = 'video.mp4';

  // Use Linux yt-dlp (no .exe)
  execFile('yt-dlp', ['-f', 'mp4', '-o', outputPath, videoUrl], (error) => {
    if (error) {
      console.error('Download error:', error);
      return res.status(500).send('Failed to download video');
    }

    res.download(path.resolve(outputPath), 'video.mp4', (err) => {
      if (err) console.error('Error sending file:', err);
      fs.unlink(outputPath, () => {});
    });
  });
});

// Serve index.html for the root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Listen on port from environment variable (Koyeb sets this), fallback to 3000 locally
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
