'use client';

import { useState } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);

  const handleExtract = async (e) => {
    e.preventDefault();
    if (!url) return;

    setLoading(true);
    setError(null);
    setVideoUrl(null);

    try {
      const response = await fetch('/api/extract', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to extract video');
      }

      setVideoUrl(data.videoUrl);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <div className="container">
        <h1 className="title">Kuaishou Downloader</h1>
        <p className="subtitle">Download watermark-free videos</p>

        <form className="form-group" onSubmit={handleExtract}>
          <input
            type="url"
            className="input"
            placeholder="Paste Kuaishou link here..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            autoComplete="off"
          />
          <button type="submit" className="button" disabled={loading || !url}>
            {loading ? <span className="spinner"></span> : 'Extract Video'}
          </button>
        </form>

        {error && <p className="error-message">{error}</p>}

        {videoUrl && (
          <div className="result-card">
            <video 
              className="video-preview" 
              src={videoUrl} 
              controls 
              autoPlay 
              muted 
              loop
              playsInline
            />
            {/* The download attribute allows saving directly to device */}
            <a 
              href={videoUrl} 
              className="download-link" 
              download="kuaishou_video.mp4"
              target="_blank"
              rel="noopener noreferrer"
            >
              Save to Device
            </a>
          </div>
        )}
      </div>
    </main>
  );
}
