const express = require('express');
const cors = require('cors');
const {Datastore, PropertyFilter, and} = require('@google-cloud/datastore');
const app = express();
const port = 80;

var corsOptions = {
    origin: 'https://frontend-sehicwjdpq-uw.a.run.app',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

app.get('/faqservice', cors(corsOptions), (req, res) => {
    res.send({ confirm : 'loaded faqservice' });
});

app.get('/faqservice/questions', cors(corsOptions), async (req, res) => {
    
    try {
        const datastore = new Datastore();
        const query = datastore
            .createQuery('faq');
            
        const [entities] = await datastore.runQuery(query);
        
        var response = [];
        for (const entity of entities) {
          var group = {};
          group["faqQuestions"] = entity['question'];
          group["faqAnswer"] = entity['answer'];
          response.push(group);
        }

        res.send({faq : response});
        return;
    } catch (error){
        console.log("GET::faq questions error: ", error);
        res.sendStatus(500);
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});