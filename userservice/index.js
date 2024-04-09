const express = require('express');
const cors = require('cors');
const {Datastore, PropertyFilter, and} = require('@google-cloud/datastore');
const app = express();
const port = 80;

var corsOptions = {
    origin: 'https://frontend-sehicwjdpq-uw.a.run.app',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

app.get('/userservice', cors(corsOptions), (req, res) => {
    console.log(req.url);
    res.send({ confirm : 'loaded userservice' });
});

app.get('/userservice/loginrequest/:username/:password', cors(corsOptions), async (req, res) => {
    const username = req.params.username;
    const password = req.params.password;

    try {
        const datastore = new Datastore();
        const query = datastore
          .createQuery('profile')
          .filter(
            and([
                new PropertyFilter('name', '=', username),
                new PropertyFilter('password', '=', password),
              ])
          );
            
        const [entities] = await datastore.runQuery(query);
        
        res.send({ userId : entities[0]['userId'] });
        return;
      } catch (error){
        console.log("GET::userid error: ", error);
        res.sendStatus(500);
      }
});

app.get('/userservice/homeinformation/:userId', cors(corsOptions), async (req, res) => {
    
    const userId = req.params.userId;

    //request to course-resource microservice
    try {
        const datastore = new Datastore();
        const query = datastore
        .createQuery('profile')
        .filter(
            new PropertyFilter('userId', '=', userId)
        );

        const [entities] = await datastore.runQuery(query);
        var topics = entities[0]['currentTopics'];
        
        var response = [];
        for(var i=0; i<topics.length; i++){

            var newstore = new Datastore();
            var search = newstore
            .createQuery('topic')
            .filter(
                new PropertyFilter('topicTitle', '=', topics[i])
            );
                
            var [result] = await newstore.runQuery(search);
                
            var group = {};
            group["topicTitle"] = result[0]['topicTitle'];
            group["topicGrade"] = result[0]['gradeId'];
            group["topicCourse"] = result[0]['courseName'];
            response.push(group);
        }

        res.send({curStudies : response});
        return;
    } catch (error){
        console.log("GET::user topics error: ", error);
        res.sendStatus(500);
    }

});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});