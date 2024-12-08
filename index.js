require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");

app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.USER_DB}:${process.env.PASS_DB}@cluster0.epzmh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    const sportsCollection = client
      .db("sportsDB")
      .collection("sportsCollection");

    // get data using id
    app.get("/sports/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await sportsCollection.findOne(query);
      res.send(result);
    });

    // get specific data using emails
    app.get("/myEquipments/:user", async (req, res) => {
      const user = req.params.user;
      const query = { userEmail: user };
      const cursor = sportsCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });
    // get all data
    app.get("/allSports", async (req, res) => {
      const cursor = sportsCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    // update data
    app.get("/sports/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await sportsCollection.findOne(query);
      res.send(result);
    });

    app.put("/sports/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };

      const UpdateEquipment = req.body;
      const NewEquipment = {
        $set: {
          userName : UpdateEquipment.userName,
          userEmail : UpdateEquipment.userEmail,
          itemName : UpdateEquipment.itemName,
          category : UpdateEquipment.category,
          price : UpdateEquipment.price,
          rating : UpdateEquipment.rating,
          customization : UpdateEquipment.customization,
          ProcessingTime : UpdateEquipment.ProcessingTime,
          itemImage : UpdateEquipment.itemImage,
          stockStatus : UpdateEquipment.stockStatus,
          description : UpdateEquipment.description,
        },
      };

      const result = await sportsCollection.updateOne(filter, NewEquipment, options)
      res.send(result);
    });
    // for delete data by id

    app.delete("/sports/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await sportsCollection.deleteOne(query);
      res.send(result);
    });

    app.get("/sports", async (req, res) => {
      const cursor = sportsCollection.find().limit(6);
      const result = await cursor.toArray();
      res.send(result);
    });

    app.post("/sports", async (req, res) => {
      const data = req.body;
      const result = await sportsCollection.insertOne(data);
      res.send(result);
      console.log("data successfully addeded");
    });


    // for get category data 
    app.get("/shopNow/:category", async(req, res)=>{
      const categories = req.params.category;
      const query = {category: categories};
      const cursor = sportsCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    })

    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("sports server is running");
});

app.listen(port, () => {
  console.log(`server is running on port: ${port}`);
});
