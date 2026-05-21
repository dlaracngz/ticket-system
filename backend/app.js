const express = require("express");
require("dotenv").config();
const { connectDB } = require("./src/config/db");
const cookieParser = require("cookie-parser");
const app = express();
const routes = require("./src/routes/mainRoutes");
const cors = require("cors");
const port = process.env.PORT || 5001;

require("./src/models/userModel");
require("./src/models/ticketModel");
require("./src/models/commentModel");
require("./src/models/association");

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

app.use("/api", routes);

app.get("/", (req, res) => {
  res.json({
    message: "Hoş Geldiniz",
  });
});

async function startServer() {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Server ${port} portundan çalışıyor`);
    });
  } catch (error) {
    console.error("Server başlatılamadı:", error);
  }
}

startServer();
