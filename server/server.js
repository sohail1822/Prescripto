import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// middleware
app.use(cors({ origin: "https://localhost:5173" }));
app.use(express.json());

// Sample route
app.get("/", (req, res) => {
  res.send("Hello from the server!");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
 

