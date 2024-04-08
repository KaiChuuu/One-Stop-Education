const express = require('express');
const cors = require('cors');
const {Datastore, PropertyFilter, and} = require('@google-cloud/datastore');
const app = express();
const port = 80;

var corsOptions = {
    origin: 'https://frontend-sehicwjdpq-uw.a.run.app',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

app.get('/courseservice', cors(corsOptions), (req, res) => {
    res.send({ confirm : 'loaded userservice' });
});

app.get("/courseservice/course-grades/:course", cors(corsOptions), async (req, res) => {
    const course = req.params.course;

    //request to course-resource microservice
    try {
      //Get grades
      const datastore = new Datastore();
      const query = datastore
        .createQuery('course')
        .filter(
          new PropertyFilter('courseName', '=', course)
        );
          
      const [entities] = await datastore.runQuery(query);
      
      res.send({ courseGrades : entities[0]['courseGrades'] });
      return;
    } catch (error){
      console.log("GET::course grades error: ", error);
      res.sendStatus(500);
    }
})

//Get courses
app.get("/courseservice/courses", cors(corsOptions), async (req, res) => {
    //request to course-resource microservice
    try {
      //Get grades
      const datastore = new Datastore();
      const query = datastore
        .createQuery('course');
          
      const [entities] = await datastore.runQuery(query);

      var response = [];
      for (const entity of entities) {
        response.push(entity['courseName']);
      }

      res.set('Cache-Control', 'public, max-age=100000'); //100 seconds
      res.send({ courseNames : response });
      return;
    } catch (error){
      console.log("GET::course error: ", error);
      res.sendStatus(500);
    }
})

//Get course grade topics
app.get("/courseservice/topics/:course/:grade", cors(corsOptions), async (req, res) => {
  const course = req.params.course;
  const grade = req.params.grade;

  //request to course-resource microservice
  try {
    //Get grades
    const datastore = new Datastore();
    const query = datastore
      .createQuery('topic')
      .filter(
        and([
          new PropertyFilter('courseName', '=', course),
          new PropertyFilter('gradeId', '=', grade),
        ])
      );
        
    const [entities] = await datastore.runQuery(query);

    var response = [];
    for (const entity of entities) {
      var group = {};
      group["topicTitle"] = entity['topicTitle'];
      group["topicDescription"] = entity['topicDescription'];
      response.push(group);
    }

    res.send({topics : response});
    return;
  } catch (error){
    console.log("GET::course grade topics error: ", error);
    res.sendStatus(500);
  }
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});