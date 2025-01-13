// Purpose: Serve the app using Express and EJS
import express from "express";
import axios from "axios";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = process.env.PORT || 3000;

// Get the current file's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set view engine to EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Define routes
app.get("/", async (req, res) => {
  try {
    const result = await axios.get("https://v2.jokeapi.dev/joke/Any");
    res.render("index.ejs", {
      joke: result.data.joke,
      cat: result.data.category,
    });
  } catch (error) {
    console.log(error.response.data);
    res.status(500);
  }
});

// Start the server
export default app;
