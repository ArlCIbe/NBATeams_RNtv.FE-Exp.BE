const express = require('express');//imports express module
const mongoose = require('mongoose');//imports mongoose module

const app = express();//creates express app
app.use(express.json());//parses JSON requests

const port = 3000;//designates a port #

mongoose.connect('mongodb+srv://arlindaibezim:mspU6uxWLRCqqyod@arlindocluster.b5qf5.mongodb.net/');
//opens mongoose's connection to MongoDB


const db = mongoose.connection;//default connection

db.on( 'error', console.error.bind(console, 'connection error:' ));
//handles error by logging it to console w/ specified message 
    //on() listens for specified event(error) on a connection(db)
    //triggers the execution of a callback function(console.error.bind(console, 'connection error:'))

db.once('open', () => { console.log('Connected to MongoDB'); });
//once() listens for 'open' 1 time only; triggers logging of above message to the console

const teamSchema = new mongoose.Schema//defines doc structure w/i 'teams'; key & data type
(    
    {
        name: String,
        wins: Number,
        losses: Number
    }
);

const Team = mongoose.model('Team', teamSchema);//constructor compliled from 'teamSchema'
    //interface between app & 'teams'; provides methods to perford CRUD ops

//instances of 'Team' model
    //then () logs message if promise is fulfilled; chains promises
    //catch() handles errors

const Memphis = new Team({ name: "Grizzlies", wins: 998, losses: 1313 });
    Memphis.save()
        .then(() => console.log("Memphis Grizzlies saved."))
        .catch(err => console.error("Save failed:", err));

const Phoenix = new Team({ name: "Suns", wins: 2429, losses: 2096 });
    Phoenix.save()
        .then(() => console.log("Phoenix Suns saved."))
        .catch(err => console.error("Save failed:", err));

const Dallas = new Team({ name: "Mavericks", wins: 1797, losses: 1746});
    Dallas.save()
        .then(() => console.log("Dallas Mavericks saved."))
        .catch((err) => console.error("Save failed:", err))

app.get('/teams', async (req, res) => {//teams' get route definition

    try{

        const teams = await Team.find({});//

        res.json(teams);//returns info in JSON format
    } 
    catch (err) 
    {
        res.status(500).json({ message: err.message });//sets error status code and sends response in JSON
    }
});

app.listen( port,  () =>//starts express server; listens for requests

    {
        console.log(`Server running at http://localhost:${port}`);
    }
);