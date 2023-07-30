const express = require("express");
const participantController = require("./controllers/participant.controller.js");

const routes = (app) => {
  app.use(express.json());
  app.use("/participants", participantController);
};

module.exports = routes;
