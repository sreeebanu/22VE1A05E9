import React from "react";
import { Container, Typography, Box } from "@mui/material";

export default function StatisticsPage() {
  const storedData = JSON.parse(localStorage.getItem("shortUrls")) || [];

  return (
    <Container>
      <Typography variant="h4" gutterBottom>URL Statistics</Typography>
      {storedData.map((item, index) => (
        <Box key={index} mb={3}>
          <Typography>
            Short URL: <a href={`/${item.short}`}>http://localhost:3000/{item.short}</a> <br />
            Created At: {new Date(item.createdAt).toLocaleString()} <br />
            Expires At: {new Date(item.expiresAt).toLocaleString()} <br />
            Clicks: {item.clicks.length}
          </Typography>
          <ul>
            {item.clicks.map((click, i) => (
              <li key={i}>
                Time: {new Date(click.timestamp).toLocaleString()} | Source: {click.source}
              </li>
            ))}
          </ul>
        </Box>
      ))}
    </Container>
  );
}
