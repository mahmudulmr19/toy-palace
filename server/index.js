const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { MongoClient, ObjectId } = require("mongodb");

// CONFIGURATION
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const URL = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@portfolio.v8jfp5z.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(URL);

// MIDDLEWARE
app.use(express.json());
app.use(cors());

// Routes
app.get("/", (req, res) => {
  res.send({ message: "Hello from Toy Palace!" });
});

app.post("/api/add-a-toy", async (req, res) => {
  // prettier-ignore
  try {
    const toyData = req.body;
    const result = await client.db("ToyPalace").collection("toys").insertOne(toyData)
    res.send(result);
  } catch (error) {
    res.status(500).send({success: false, error: error.message});
  }
});

app.put("/api/toys/:id", async (req, res) => {
  // prettier-ignore
  try {
    const id = req.params.id;
    const filter = {_id: new ObjectId(id)}
    const body = req.body;
    const option = { upsert: true };
    const updatedToy = {
      $set:body
    }
    const result = await client.db("ToyPalace").collection("toys").updateOne(filter, updatedToy,option)
    res.send(result)
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
});

// delete specific data by id
app.delete("/api/toys/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    // prettier-ignore
    const result = await client.db("ToyPalace").collection("toys").deleteOne(query);
    res.send(result);
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
});

// get the all toys
app.get("/api/toys", async (req, res) => {
  // prettier-ignore
  try {
    const limit = parseInt(req.query.limit);
    const result = await client.db("ToyPalace").collection("toys").find().limit(limit).toArray()
    res.send(result);
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
});

app.get("/api/toys/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    // prettier-ignore
    const result = await client.db("ToyPalace").collection("toys").findOne(query);
    res.send(result);
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
});

// get the specing to seller data using query
app.get("/api/toy", async (req, res) => {
  let query = {};

  if (req.query?.email) {
    query = { sellerEmail: req.query?.email };
  }
  // prettier-ignore
  try {
    const result = await client.db("ToyPalace").collection("toys").find(query).toArray()
    res.send(result);
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
});

// Ascending/Descending Sort
app.get("/api/sort/:sortName", async (req, res) => {
  // prettier-ignore
  try {
    const sortName = req.params.sortName;
    let price = {}
    if(sortName === "ascending"){
      price = {price: 1}
    }else if(sortName === "descending"){
      price = {price: -1}
    }
    let query = {};
    if (req.query?.email) {
      query = { sellerEmail: req.query?.email };
    }
    const result = await client.db("ToyPalace").collection("toys").find(query).sort(price).toArray();
    res.send(result);
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
});

// search by title
app.get("/api/search/:query", async (req, res) => {
  // prettier-ignore
  try {
    const query = req.params.query;
    const result = await client.db("ToyPalace").collection("toys").find({toyName: { $regex: query, $options: "i" }}).toArray()
    res.send(result)
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
});

app.get("/api/category/toys", async (req, res) => {
  // prettier-ignore
  try {
    let query = {};
    if (req.query?.categoryName) {
      query = { subcategory:  req.query.categoryName  };
    }
    const result = await client.db("ToyPalace").collection("toys").find(query).toArray();
    res.send(result);
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
});

// RUN THE SERVER
client.connect().then(() => {
  app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`);
  });
});
