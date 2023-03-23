import express from "express";
import data from "./data.js";
const app = express();
//test
//sd
app.get("/api/products", (req, res) => {
  res.send(data.products);
});
const port = process.env.port || 4000;
app.listen(port, () => {
  console.log(`server at https://localhost:${port}`);
});
