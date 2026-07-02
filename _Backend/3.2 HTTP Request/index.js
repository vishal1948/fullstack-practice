
import express from "express";
const app = express();
const port = 3000;

app.get("/", (req, res) => {
    res.send("<h1>Welcome to the Express Server</h1>");
});

app.get("/about", (req, res) => {
    res.send("<p>This is the about page of the Express Server.</p>");
});

app.get("/contact", (req, res) => {
    res.send("<p>Contact us at 8899775588</p>");
});


app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});