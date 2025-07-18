import React, { useState } from "react";
import {
  Container, Typography, TextField, Button, Grid, Box,
} from "@mui/material";
import { isValidURL, isValidShortcode } from "../utils/validation";
import { generateShortcode } from "../utils/urlUtils";
import { logAction } from "../utils/logger";

const MAX_ENTRIES = 5;

export default function ShortenerPage() {
  const [entries, setEntries] = useState([{ url: "", validity: "", shortcode: "" }]);
  const [results, setResults] = useState(() => {
  const stored = localStorage.getItem("shortUrls");
  return stored ? JSON.parse(stored) : [];
});

  const handleChange = (index, field, value) => {
    const newEntries = [...entries];
    newEntries[index][field] = value;
    setEntries(newEntries);
  };

  const handleAddEntry = () => {
    if (entries.length < MAX_ENTRIES) {
      setEntries([...entries, { url: "", validity: "", shortcode: "" }]);
    }
  };

  const handleSubmit = () => {
    const newResults = [];
    for (let entry of entries) {
      const { url, validity, shortcode } = entry;

      if (!isValidURL(url)) {
        alert(`Invalid URL: ${url}`);
        return;
      }

      let code = shortcode.trim() || generateShortcode();
      if (!isValidShortcode(code)) {
        alert(`Invalid Shortcode: ${code}`);
        return;
      }

      const expiresAt = new Date(Date.now() + (parseInt(validity) || 30) * 60000);
      const result = { original: url, short: code, expiresAt, clicks: [], createdAt: new Date() };

      newResults.push(result);
      logAction("Shortened URL created", result);
    }

    setResults([...results, ...newResults]);
    localStorage.setItem("shortUrls", JSON.stringify([...results, ...newResults]));

  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>URL Shortener</Typography>
      {entries.map((entry, index) => (
        <Box key={index} mb={2}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Original URL"
                fullWidth
                value={entry.url}
                onChange={(e) => handleChange(index, "url", e.target.value)}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="Validity (min)"
                fullWidth
                value={entry.validity}
                onChange={(e) => handleChange(index, "validity", e.target.value)}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="Custom Shortcode"
                fullWidth
                value={entry.shortcode}
                onChange={(e) => handleChange(index, "shortcode", e.target.value)}
              />
            </Grid>
          </Grid>
        </Box>
      ))}
      <Button variant="contained" onClick={handleAddEntry} disabled={entries.length >= MAX_ENTRIES}>
        Add More
      </Button>
      <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ ml: 2 }}>
        Shorten
      </Button>

      <Box mt={4}>
  <Typography variant="h5">Shortened URLs</Typography>
  {results.map((r, i) => (
    <Box key={i} mt={2}>
      <Typography>
        Original: {r.original} <br />
        Short:{" "}
        <a
          href={`/#/${r.short}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {`https://sreeebanu.github.io/22VE1A05E9/#/${r.short}`}
        </a> <br />
        Expires: {new Date(r.expiresAt).toLocaleString()}
      </Typography>
    </Box>
  ))}
</Box>

    </Container>
  );
}
