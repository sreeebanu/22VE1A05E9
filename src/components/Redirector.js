import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Redirector() {
  const { shortcode } = useParams();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("shortUrls")) || [];
    const entry = data.find((item) => item.short === shortcode);

    if (entry && new Date(entry.expiresAt) > new Date()) {
      const updated = {
        ...entry,
        clicks: [...entry.clicks, {
          timestamp: new Date(),
          source: "localhost" 
        }]
      };
      const newData = data.map(d => d.short === shortcode ? updated : d);
      localStorage.setItem("shortUrls", JSON.stringify(newData));
      window.location.href = entry.original;
    } else {
      alert("Link expired or not found.");
    }
  }, [shortcode]);

  return <p>Redirecting...</p>;
}
