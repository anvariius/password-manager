const express = require("express");
//const dotenv = require("dotenv");
const prisma = require("./db/prisma");
const port = 5555;
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", async (req, res) => {
  res.send("hello world");
});

app.get("/passwords", async (req, res) => {
  const response = await prisma.passwords.findMany({
    where: {
      status: "ACTIVE",
    },
  });
  res.send(JSON.stringify(response));
});

app.post("/add-password", async (req, res) => {
  const password = req.body;
  try {
    await prisma.passwords.create({
      data: {
        ...password,
      },
    });
    res.send({ status: "success" });
  } catch (e) {
    console.log(e);
    res.send({ status: "error", text: JSON.stringify(e) });
  }
});

app.post("/edit-password", async (req, res) => {
  const {
    id,
    folderId,
    service,
    login,
    password,
    favorite,
    lastChange,
    status,
  } = req.body;
  try {
    await prisma.passwords.update({
      where: { id },
      data: {
        folderId,
        service,
        login,
        password,
        favorite,
        lastChange,
        status,
      },
    });
    res.send({ status: "success" });
  } catch (e) {
    console.log(e);
    res.send({ status: "error", text: JSON.stringify(e) });
  }
});

app.listen(port, () => {
  console.log("Listening on port", port);
});
