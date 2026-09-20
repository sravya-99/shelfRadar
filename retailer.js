import React, { useState, useEffect } from "react";

function RetailerPortal({ username }) {
  const [category, setCategory] = useState("Electronics");
  const [ws, setWs] = useState(null);
  const [pings, setPings] = useState([]);

  useEffect(() => {
    const socket = new WebSocket("ws://<YOUR_LIGHTSAIL_IP>:8080");
    socket.onopen = () => {
      socket.send(JSON.stringify({ type: "registerRetailer", category }));
    };
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "ping") {
        setPings((prev) => [...prev, data]);
      }
    };
    setWs(socket);
  }, [category]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Welcome {username} (Retailer)</h1>
      <h2 className="text-xl mt-4">Incoming Pings:</h2>
      <ul>
        {pings.map((ping, i) => (
          <li key={i}>
            {ping.item} - {ping.delivery}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RetailerPortal;
