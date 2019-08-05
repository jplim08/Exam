'use strict';
var express = require('express');
var router = express.Router();
var cors = require('cors');
const fs = require('fs');
const editJsonFile = require("edit-json-file");
const bodyParser = require('body-parser');

router.use(cors())


//  http://localhost:8080/data
router.get('/fortuneMessages', function(req, res) {
  let content = fs.readFileSync('dataTest.json', 'utf8');
  let fortuneMessages = JSON.parse(content);
  let randIndex = Math.floor(Math.random()*fortuneMessages.length);
  let randomFortune = fortuneMessages[randIndex];

  res.json({id:randIndex,fortune:randomFortune});
});

router.post('/fortuneMessages', function (req, res) {
  const idData = req.body.id;
  const fortuneData = req.body.fortune;

  console.log(idData);
  console.log(fortuneData);

  if(idData >=0 && idData < 100){
    let file = editJsonFile(`dataTest.json`);
    file.set(idData.toString(), fortuneData);
    file.save();

    res.json({id:idData,fortune:fortuneData});
  }else{
    return res.status(422).send({
     message: 'This is an error!'
    });
  }


});

module.exports = router;
