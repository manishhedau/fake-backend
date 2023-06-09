const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);

function generateRandomNumber(min = 1000, max = 2000) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const nfityList = [
  {
    InstrumentIdentifier: "NIFTY 50",
    LastTradePrice: generateRandomNumber(),
    PriceChange: 279.05,
    PriceChangePercentage: 1.63,
  },
  {
    InstrumentIdentifier: "NIFTY BANK",
    LastTradePrice: generateRandomNumber(),
    PriceChange: 698.5,
    PriceChangePercentage: 1.75,
  },

  {
    InstrumentIdentifier: "NIFTY FIN SERVICE",
    LastTradePrice: generateRandomNumber(),
    PriceChange: 264.85,
    PriceChangePercentage: 1.49,
  },
];

let userSocket = null;
const io = new Server(httpServer, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  console.log("Client connected");

  userSocket = socket;

  setInterval(() => {
    const eventData = {
      message: "Hello dashboard!",
      timestamp: Date.now(),
    };

    socket.emit("dashboard", {
      Result: nfityList,
      stocks: [],
    });
    console.log("Data sent to client :", Date.now());
  }, 1000);

  socket.on("dashboard", (message) => {
    console.log("Client message :", message);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// const createSocketConnection = () => {
//   io = new Server(httpServer, {
//     cors: { origin: "*" },
//   });

//   io.on("connection", (socket) => {
//     console.log("Socket.IO connection established: ", socket.id);

//     userSocket = socket;

//     socket.on("message", (data) => {
//       console.log("Received message from client: ", data);
//       socket.emit("reply", { text: "Hello, client!" });
//     });

//     socket.on("dashboard", (message) => {
//       console.log("Listening for dashboard");

//       console.log("New message received: ", message);
//     });
//   });
// };

// createSocketConnection();

httpServer.listen(8080, () => {
  console.log("server is listening on port 8080");
});
