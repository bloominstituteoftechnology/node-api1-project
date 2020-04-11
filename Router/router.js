const express = require('express');
const router = express.Router();
const db = require('../data/db');

router.get('/', (req, res) => {
    db.find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(500).json({
                err,
                errorMessage: "There was an error while saving the user to the database."
            });
        });
});

router.get('/:id', (req, res) => {
    db.findById(req.params.id)
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            res.status(500).json({
                err,
                errorMessage: "The user with the specified ID does not exist."
            });
        });
});

module.exports = router;