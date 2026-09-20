// ShelfRadar Backend - Node.js WebSocket + SageMaker
const WebSocket = require("ws");
const AWS = require("aws-sdk");

// Configure AWS SDK (make sure your Lightsail instance has IAM role or keys)
AWS.config.update({ region: "us-east-1" });
const sagemaker = new AWS.SageMakerRuntime();

// Start WebSocket server
const wss = new WebSocket.Server({ port: 8080 });
console.log("ShelfRadar backend running on port 8080...");

// Store connected retailers
let retailers = [];

wss.on("connection", (ws) => {
  console.log("New client connected");

  ws.on("message", async (msg) => {
    const data = JSON.parse(msg);

    // Retailer registers with category interest
    if (data.type === "registerRetailer") {
      retailers.push({ ws, category: data.category });
      ws.send(JSON.stringify({ msg: "Retailer registered for " + data.category }));
    }

    // Customer broadcasts item request
    if (data.type === "broadcast") {
      const item = data.item;

      // Call SageMaker endpoint to categorize item
      const params = {
        EndpointName: "ShelfRadarClassifier", // replace with your SageMaker endpoint name
        ContentType: "application/json",
        Body: JSON.stringify({ text: item }),
      };

      try {
        const response = await sagemaker.invokeEndpoint(params).promise();
        const category = response.Body.toString();

        // Notify matching retailers
        retailers.forEach((r) => {
          if (r.category === category) {
            r.ws.send(
              JSON.stringify({
                type: "ping",
                item,
                delivery: data.delivery,
              })
            );
          }
        });

        ws.send(JSON.stringify({ msg: "Broadcast sent to category: " + category }));
      } catch (err) {
        console.error("Error calling SageMaker:", err);
        ws.send(JSON.stringify({ error: "AI categorization failed" }));
      }
    }
  });

  ws.on("close", () => {
    retailers = retailers.filter((r) => r.ws !== ws);
    console.log("Client disconnected");
  });
});
