const express = require('express');
const cors = require('cors');
const { execFile } = require('child_process');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

// Helper to create a safe unique filename
const sanitize = str => str.replace(/[^\w\-]/g, '_');

app.post('/download', (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: 'No URL provided' });

  const timestamp = Date.now();
  const safeFilename = `video_${timestamp}.mp4`;
  const outputPath = path.join(__dirname, safeFilename);
  const ytDlpPath = path.join(__dirname, 'yt-dlp.exe'); // must be in project folder

  execFile(ytDlpPath, ['-o', outputPath, url], (error, stdout, stderr) => {
    if (error) {
      console.error('yt-dlp error:', error);
      console.error('stderr:', stderr);
      return res.status(500).json({ error: 'Download failed', detail: stderr });
    }

    console.log('Download success:', stdout);

    res.download(outputPath, 'video.mp4', err => {
      if (err) {
        console.error('Send error:', err);
      }
      // Optionally delete file after sending
      fs.unlink(outputPath, () => {});
    });
  });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server running on port ${PORT}`);
});
