const express = require("express");
const app = express();
const https = require("https");

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {

  res.sendFile(__dirname + "/index.html");

});

app.post("/", function(req, res) {

  const unit = "imperial";
  const apiKey = "510cd3230f75dcc7cf8f4dbee7a53d69";
  const query = req.body.cityName;
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;

  https.get(url, function(response) {

    console.log(response.statusCode);

    response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      const temp = Math.round(weatherData.main.temp);
      const weatherDescription = weatherData.weather[0].description
      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write("<p>The weather is currently: " + weatherDescription + "</p>");
      res.write("<h1>The temperature in " + req.body.cityName + " is " + temp + " &degF.</h1>");
      res.write("<img src=" + imageURL + ">");
      res.send()
    });
  });

});






app.listen(3000, function() {
  console.log("Server is running on port 3000.");
});
