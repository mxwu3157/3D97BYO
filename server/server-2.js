// To connect with your mongoDB database
const mongoose = require('mongoose');

// CHANGE the username,password,link to be yours!
mongoose.connect('mongodb+srv://csci551-hw3-shared:CSCI571-hw3@cluster0.pdkgy.mongodb.net/',{
    dbName: 'myevent',
    useNewUrlParser: true,
    useUnifiedTopology: true
});


// schema for our table called 'users'
const UserSchema = new mongoose.Schema({
    invitee_name: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
        unique: true,
    },
    group_num: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});
const User = mongoose.model('customerFlow', UserSchema); // creates a 'users' table
//\\User.createIndexes();

// express middleware
const express = require('express');
const app = express();
const cors = require("cors");
console.log("App listen at port 5000");
app.use(express.json());
app.use(cors());
app.get("/", (req, resp) => {
  resp.send("App is Working");
  // go to http://localhost:5000 to see this
});

app.post("/register", async (req, resp) => {
    try {
        const user = new User(req.body);
        // .save() sends data to our cloud DB, more here: https://masteringjs.io/tutorials/mongoose/save
        let result = await user.save();
        result = result.toObject();
        if (result) {
            delete result.password;
            resp.send(req.body);
            console.log(result);
        } else {
            console.log("User already registered");
        }

    } catch (e) {
        resp.send("Something went wrong");
    }
});
app.listen(5000);
