const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');
const statBlockSchema = new mongoose.Schema({
  str: Number,
  dex: Number,
  con: Number,
  int: Number,
  wis: Number,
  cha: Number,
  desc: String,
});

const statBlock = mongoose.model('StatBlock', statBlockSchema);
const dotenv = require("dotenv");
dotenv.config();
const username = process.env.MONGOUSER;
const password = process.env.MONGOPASSWORD;
const hostname = process.env.MONGOHOSTNAME;
const dbName = 'stats';

const url = `mongodb+srv://${username}:${password}@${hostname}/${dbName}`;
// connect to the database
mongoose.connect(url, {
  useNewUrlParser: true
});


app.post('/api/stats', async (req, res) => {
    const block = new statBlock({
        str: req.body.str,
        dex: req.body.dex,
        con: req.body.con,
        int: req.body.int,
        wis: req.body.wis,
        cha: req.body.cha
    });
    try {
        await block.save();
        res.send(block);

    } catch(error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.get('/api/stats', async (req, res) => {
    try {
        let blocks = await statBlock.find();
        res.send(blocks);
    } catch (error) {
        console.log(error);
    }
    
});

app.delete('/api/stats/:id', async (req, res) => {
    try {
      await statBlock.deleteOne({
        _id: req.params.id
      });
      res.sendStatus(200);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });

app.put('/api/stats/:id', async (req, res) => {
    try {
        let block = await statBlock.findOne({
            _id: req.params.id
        });
        block.desc = req.body.desc;
        block.save();
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
})

  app.listen(3030, () => console.log('Server listening on port 3030!'));