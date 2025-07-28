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

<<<<<<< HEAD
  // Run yt-dlp without .exe and no relative path
  execFile('yt-dlp', ['-f', 'mp4', '-o', outputPath, videoUrl], (error) => {
=======
  execFile('./yt-dlp.exe', ['-f', 'mp4', '-o', outputPath, videoUrl], (error) => {
>>>>>>> a154094 (Add lockfile and initial files)
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

<<<<<<< HEAD
=======
app.listen(3000, () => console.log('Server running on http://localhost:3000'));
const path = require('path');

>>>>>>> a154094 (Add lockfile and initial files)
// Serve index.html for the root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});
<<<<<<< HEAD

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
=======
>>>>>>> a154094 (Add lockfile and initial files)
