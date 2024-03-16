// import { path } from "path";
const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/UserRoutes");
const mongoose = require("mongoose");
// const { MongoClient, ServerApiVersion } = require('mongodb');

const path = require("path");
const MongoDB_URI = process.env.MongoDB_URI;

const _dirname = path.resolve();

const app = express();

app.use(cors());
app.use(express.json());


// const client = new MongoClient(MongoDB_URI, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     await client.connect();
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     await client.close();
//   }
// }
// run().catch(console.dir);

mongoose
  .connect(MongoDB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use("/api/user", userRoutes);

app.use(express.static(path.join(_dirname, '/netflix-ui/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(_dirname, 'netflix-ui', 'build', 'index.html'));
})

app.listen(5000, () => {
  console.log("server started on port 5000");
});
