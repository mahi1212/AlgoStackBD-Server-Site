const express = require("express");
const cors = require("cors");
// const SSLCommerzPayment = require('sslcommerz-lts')
const { MongoClient, ServerApiVersion } = require("mongodb");
var ObjectId = require('mongodb').ObjectId;
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;


// Middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.fwlhb0t.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// console.log(uri)
async function run() {
    try {
        await client.connect();
        console.log("connected to db");

        const database = client.db("algoStackWebsite");
        const membersCollection = database.collection("members");
        const coursesCollection = database.collection("courses");

        app.get("/memberDetails", async (req, res) => {
            const cursor = membersCollection.find({});
            const members = await cursor.toArray();
            res.json(members);
        });

        app.get("/memberDetails/:id", async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) }
            const singleMember = await membersCollection.findOne(query)
            res.json(singleMember)
        });

        // course section code
        app.get("/courses", async (req, res) => {
            const cursor = coursesCollection.find({});
            const course = await cursor.toArray();
            res.json(course);
        });

        // app.get('/courses/:id', async (req, res) => {
        //     const id = req.params.id
        //     // console.log('getting id', id)
        //     const query = { _id: ObjectId(id) }
        //     const myCourse = await coursesCollection.findOne(query)
        //     res.json(myCourse)
        // })

    } finally {
        //   await client.close();
    }
}
run().catch(console.dir);

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
