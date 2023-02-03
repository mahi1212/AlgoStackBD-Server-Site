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

const uri = `mongodb+srv://sslcommerz:FwZigDrvq84Ends@cluster0.fwlhb0t.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// console.log(uri)
async function run() {
    try {
        await client.connect();
        console.log("connected to db");

        const database = client.db("algoStackWebsite");
        const membersCollection = database.collection("members");
        const coursesCollection = database.collection("courses");
        const videosCollection = database.collection("videos");
        const usersCollection = database.collection("users");
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
        // get videos 
        app.get("/videos", async (req, res) => {
            const cursor = videosCollection.find({});
            const videos = await cursor.toArray();
            res.json(videos);
        });
        // post videos
        app.post("/videos", async (req, res) => {
            const newVideo = req.body;
            const result = await videosCollection.insertOne(newVideo);
            res.json(result);
        });
        // save users to database
        app.post('/users', async(req, res) =>{
            const newUser = req.body;
            const result = await usersCollection.insertOne(newUser);
            res.json(result);
        })
        // post users
        // app.post("/login", async (req, res) => {
        //     const email = req.body.email;
        //     const password = req.body.password;
        //     const query = { email: email, password: password }
        //     const singleMember = await usersCollection.findOne(query)
        //     res.json(singleMember)
        //     console.log('hitted login', singleMember)
        // })
        // axios.post('http://localhost:5000/login', { email, password })
        //     .then((res) => {
        //         // If the email and password match, redirect the user to the dashboard
        //         if (res.data) {
        //             if (res.data.course === 'web') {
        //                 const from = location?.state?.from || '/webClass'
        //                 navigate(from, { replace: true });
        //                 console.log(res.data, 'web');
        //             } else {
        //                 const from = location?.state?.from || '/appClass'
        //                 navigate(from);
        //                 console.log(res.data, 'app');
        //             }
        //             // const from = location?.state?.from || '/courses'
        //             // navigate(from, { replace: true });
        //             // setAuthError('');
        //         } else {
        //             setAuthError('No user found');
        //         }
        //     })
        //     .catch((err) => {
        //         console.error(err);
        //     });

    } finally {
        //   await client.close();
    }
}
run().catch(console.dir);

app.get("/", (req, res) => {
    res.send("Hello World! ok");
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
