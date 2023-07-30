const express = require("express");
const configureRoutes = require("./routes.js");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
const port = 4000;

configureRoutes(app);

app.listen(port, () => console.log(`Application started on port ${port}`));
