const { request } = require('express');
const notes = require('../db/db.json');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');
const { ESRCH } = require('constants');
module.exports = (app) => {

    app.get('/api/notes', (req, res) => res.json(notes));

    app.post('/api/notes', (req, res) => {

      var note = {
          id: uuidv4(), 
          title: req.body.title,
          text: req.body.text
      };

      notes.push(note);
      fs.writeFile(path.join(__dirname, '../db/db.json', JSON.stringify(notes)));
      res.json(req.body);
    });

    app.delete('/api/notes/:id', (req, res) => {
      fs.readFile('../db/db.json', "utf-8", (err,data)=>{
        let db = JSON.parse(data);
        db.splice(req.params.id, 1);
        let reindex_db = db.map((curentElemnt,index)=>{
          curentElemnt = {...curentElemnt, id:index};
          return curentElemnt
        })
        fs.writeFile('../db/db.json', JSON.stringify(reindex_db),err =>{
          if(err){
            throw err;
          } else {
            res.send('ok')
          }
        });
      }); 
 })}