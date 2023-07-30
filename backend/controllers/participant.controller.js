const express = require("express");
const Participant = require("../models/participant.model.js");
const { MongoClient, ObjectId } = require("mongodb");

const router = express.Router();

router.get("/", async (req, res) => {
  const client = await new MongoClient("mongodb://localhost:27017").connect();
  const participants = await client
    .db("events")
    .collection("participants")
    .find({})
    .toArray();
  await client.close();

  res.send(participants);
});

router.post("/", async (req, res) => {
  console.log(req.body);
  const [name, surname, emailAdress, age] = req.body;
  if (!name || !surname || !emailAdress || !age) {
    res
      .status(400)
      .send("Mandatory fields are missing (name, surname, emailAdress, age)");
    return console.log(res);
  }
  const participant = new Participant(
    req.body[0],
    req.body[1],
    req.body[2],
    req.body[3]
  );
  const client = await new MongoClient("mongodb://localhost:27017").connect();
  await client.db("events").collection("participants").insertOne(participant);
  await client.close();
  res.status(201).send(`Participant added successfully`);
});

router.patch("/:id", async (req, res) => {
  const participantId = req.params.id;
  const client = await new MongoClient("mongodb://localhost:27017").connect();
  await client
    .db("events")
    .collection("participants")
    .updateOne({ _id: new ObjectId(participantId) }, { $set: req.body });
  await client.close();
  res.status(200).send(`Participant with id: ${participantId} updated`);
});

router.delete("/:id", async (req, res) => {
  const participantId = req.params.id;
  const client = await new MongoClient("mongodb://localhost:27017").connect();
  await client
    .db("events")
    .collection("participants")
    .deleteOne({ _id: new ObjectId(participantId) });
  await client.close();
  res.status(201).send(`Participant with id: ${participantId} deleted`);
});

module.exports = router;
