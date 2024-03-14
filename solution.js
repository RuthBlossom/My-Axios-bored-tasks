// Import required modules
import express from "express";      // Importing Express framework
import bodyParser from "body-parser";  // Middleware to parse incoming request bodies
import axios from "axios";             // HTTP client for making requests

// Create an Express application
const app = express();

// Set the port number
const port = 3000;

// Configure middleware
app.use(express.static("public"));          // Serve static files from the "public" directory
app.use(bodyParser.urlencoded({ extended: true }));  // Parse URL-encoded data in the request body

// Define a route for handling GET requests to the root URL "/"
app.get("/", async (req, res) => {
  try {
    // Make a GET request to an external API using axios
    const response = await axios.get("https://bored-api.appbrewery.com/random");
    const result = response.data;
    console.log(result);

    // Render an EJS template with the retrieved data
    res.render("solution.ejs", { data: result });
  } catch (error) {
    // Handle errors by rendering an EJS template with an error message
    console.error("Failed to make request:", error.message);
    res.render("solution.ejs", {
      error: error.message,
    });
  }
});

// Define a route for handling POST requests to the root URL "/"
app.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const type = req.body.type;
    const participants = req.body.participants;

    // Make a GET request to an external API with query parameters using axios
    const response = await axios.get(
      `https://bored-api.appbrewery.com/filter?type=${type}&participants=${participants}`
    );
    const result = response.data;
    console.log(result);

    // Render an EJS template with a randomly selected activity from the filtered results
    res.render("solution.ejs", {
      data: result[Math.floor(Math.random() * result.length)],
    });
  } catch (error) {
    // Handle errors by rendering an EJS template with an error message
    console.error("Failed to make request:", error.message);
    res.render("solution.ejs", {
      error: "No activities that match your criteria.",
    });
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

