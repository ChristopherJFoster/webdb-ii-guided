const router = require('express').Router();
const knex = require('knex');

const knexConfig = {
  client: 'sqlite3',
  connection: {
    filename: './roles.db3'
  },
  useNullAsDefault: true,
  debug: true
};

const db = knex(knexConfig);

router.get('/', (req, res) => {
  // get the roles from the database
  db('roles')
    .then(roles => {
      res.status(200).json(roles);
    })
    .catch(err => res.status(500).json(err));
});

router.get('/:id', (req, res) => {
  // retrieve a role by id
  db('roles')
    .where('id', req.params.id)
    .first()
    .then(roles => {
      res.status(200).json(roles);
    })
    .catch(err => res.status(500).json(err));
});

router.post('/', (req, res) => {
  // add a role to the database
  db('roles')
    .insert({ name: req.body.name })
    .then(ids => {
      const id = ids[0];
      db('roles')
        .where({ id: id })
        .first()
        .then(role => {
          res.status(200).json(role);
        });
    })
    .catch(err => res.status(500).json(err));
});

router.put('/:id', (req, res) => {
  // update roles
  db('roles')
    .where({ id: req.params.id })
    .update(req.body)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ messge: 'Record updated.' });
      } else {
        res.status(404).json({ messge: 'Record not found.' });
      }
    })
    .catch(err => res.status(500).json(err));
});

router.delete('/:id', (req, res) => {
  // remove roles (inactivate the role)
  db('roles')
    .where({ id: req.params.id })
    .del()
    .then(count => {
      if (count > 0) {
        res.status(204).end();
      } else {
        res.status(404).json({ messge: 'Record not found.' });
      }
    })
    .catch(err => res.status(500).json(err));
});

module.exports = router;
