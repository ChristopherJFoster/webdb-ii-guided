const express = require('express');
const knex = require('knex');

const knexConfig = require('./knexfile');
const db = knex(knexConfig.development);

const server = express();

server.use(express.json());

server.post('/characters', (req, res) => {
  const character = req.body;
  db.insert(character)
    .into('characters')
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

server.listen(8000, () => console.log('Running on port 8000'));
