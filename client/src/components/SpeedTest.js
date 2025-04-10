import React, { useState } from 'react';
import axios from 'axios';

const SpeedTest = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const startTest = async () => {
    setLoading(true);
    setResult(null);
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/speedtest`);
      setResult(res.data);
    } catch (err) {
      alert("Failed to test speed");
    }
    setLoading(false);
  };

  return (
    <div>
      <button onClick={startTest} disabled={loading}>
        {loading ? "Testing..." : "Start Speed Test"}
      </button>
      {result && (
        <div style={{ marginTop: '1rem' }}>
          <p><strong>Download:</strong> {result.downloadSpeed.toFixed(2)} Mbps</p>
          <p><strong>Upload:</strong> {result.uploadSpeed.toFixed(2)} Mbps</p>
          <p><strong>Ping:</strong> {result.ping} ms</p>
        </div>
      )}
    </div>
  );
};

export default SpeedTest;
