/* eslint-disable no-implicit-coercion */
/* eslint-disable consistent-return */
const functions = require("firebase-functions");
const cors = require('cors')({ origin: true });
const admin = require('firebase-admin');

admin.initializeApp();

const db = admin.database();
const refTechnos = db.ref('/technos');

exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from a Severless Database!");
});

const getTechnosFromDatabase = (res) => {
  let technos = [];

  return refTechnos.on('value', (snapshot) => {
    snapshot.forEach((techno) => {
      let objTechno = techno.val();
      objTechno.id = techno.key;
      technos.push(objTechno);
    });   
    res.status(200).json(technos);
  }, (error) => {
    res.status(500).json({
      message: `Something went wrong. ${error}`
    })
  })
};

exports.addTechno = functions.https.onRequest((req, res) => {
  return cors(req, res, () => {
    if(req.method !== 'POST') {
      return res.status(500).json({
        message: 'Not allowed'
      })
    }
    console.log(req.body);
    const techno = req.body;
    refTechnos.child(techno.id).set(techno);
    getTechnosFromDatabase(res);
  });
});

exports.getTechnos = functions.https.onRequest((req, res) => {
  return cors(req, res, () => {
    if(req.method !== 'GET') {
      return res.status(500).json({
        message: 'Not allowed'
      });
    }
    getTechnosFromDatabase(res)
  });
});

exports.deleteTechno = functions.https.onRequest((req, res) => {
  return cors(req, res, () => {
    if(req.method !== 'DELETE') {
      return res.status(500).json({
        message: 'Not allowed'
      })
    }
    const id = req.query.id 
    refTechnos.child(id).remove()
    getTechnosFromDatabase(res)
  })
})