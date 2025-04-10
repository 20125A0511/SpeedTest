const express = require('express');
const cors = require('cors');
const speedTest = require('speedtest-net');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.get('/speedtest', async (req, res) => {
  try {
    const result = await speedTest({ acceptLicense: true, acceptGdpr: true });
    res.json({
      downloadSpeed: result.download.bandwidth * 8 / 1e6, // Mbps
      uploadSpeed: result.upload.bandwidth * 8 / 1e6,     // Mbps
      ping: result.ping.latency
    });
  } catch (error) {
    res.status(500).json({ error: 'Speed test failed', details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
