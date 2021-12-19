const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("../utils/geocode");
const forecast = require("../utils/forecast");
const app = express();

const port = process.env.PORT || 3000;
// Define paths for E8xpress config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Oladeji Tosin",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Oladeji Tosin",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "Need some help?",
    title: "Help",
    name: "Oladeji Tosin",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.json({
      error: "pls specify the address",
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        //   console.log(location);
        //   console.log(forecastData);
        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.json({
      error: "cannot find the product",
    });
  }
  console.log(req.query.search);
  res.send({
    product1: "shoe",
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Oladeji Tosin",
    errorMessage: "Help article not found.",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Oladeji Tosin",
    errorMessage: "Page not found.",
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
});
