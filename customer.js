import React, { useState, useEffect } from "react";

function CustomerPortal({ username }) {
  const [item, setItem] = useState("");
  const [delivery, setDelivery] = useState("Pickup");
  const [messages, setMessages] = useState([]);
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const socket = new WebSocket("ws://<YOUR_LIGHTSAIL_IP>:8080");
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages((prev) => [...prev, data]);
    };
    setWs(socket);
  }, []);

  const broadcastPing = () => {
    ws.send(JSON.stringify({ type: "broadcast", item, delivery }));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Welcome {username} (Customer)</h1>
      <input
        className="border p-2 m-2"
        placeholder="Enter item"
        value={item}
        onChange={(e) => setItem(e.target.value)}
      />
      <select
        className="border p-2 m-2"
        value={delivery}
        onChange={(e) => setDelivery(e.target.value)}
      >
        <option>Pickup</option>
        <option>Delivery (+ ₹30)</option>
      </select>
      <button
        className="bg-blue-500 text-white p-2 m-2"
        onClick={broadcastPing}
      >
        Broadcast Ping
      </button>

      <h2 className="text-xl mt-4">Retailer Responses:</h2>
      <ul>
        {messages.map((msg, i) => (
          <li key={i}>{JSON.stringify(msg)}</li>
        ))}
      </ul>
    </div>
  );
}

export default CustomerPortal;
