"use client";

import { useEffect, useState } from "react";

export default function PingClient() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchPing = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/v1/ping");
        const data = await res.json();
        setMessage(data.message);
      } catch (error) {
        console.error("Error fetching ping:", error);
        setMessage("Error connecting to backend");
      }
    };

    fetchPing();
  }, []);

  return (
    <div className="p-4 border rounded-md" data-testid="ping-display">
      <p>Backend says: <strong>{message}</strong></p>
    </div>
  );
}