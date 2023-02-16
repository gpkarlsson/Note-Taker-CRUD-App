//Dependencies
const express = require('express')

//Initialize App

const app = express()
const PORT = process.env.PORT || 3001

//Set up data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));


const apiRoutes = require("./routes/apiRoutes");
app.use(apiRoutes);
const htmlRoutes = require("./routes/htmlRoutes");
app.use(htmlRoutes);

//Set up app listener
app.listen(PORT, () => {
  console.log(`Listening on PORT: ${PORT}`);
});