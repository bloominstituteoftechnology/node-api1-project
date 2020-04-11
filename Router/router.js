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

router.post('/', (req, res) => {
    if (req.body.name && req.body.bio) {
        db.insert(req.body)
            .then(objID => {
                db.findById(objID.id)
                    .then(user => {
                        res.status(201).json(user);
                    })
                    .catch(err => {
                        res.status(500).json({
                            err,
                            errorMessage: "There was an error saving to the database."
                        });
                    });
            })
            .catch(err => {
                res.status(500).json({
                    err,
                    errorMessage: "There was an error saving to the database."
                });
            });
    } else {
        res.status(400).json({
            errorMessage: "Please provide a name and bio for the user."
        });
    }
});

router.put('/:id', (req, res) => {
    const changes = req.body;
    
    if(!changes.name || !changes.bio) {
        res.status(400).json({
            errorMessage: "Please provide name and bio for the user."
        });
    } else {
        db.update(req.params.id, changes)
            .then(count => {
                count >=1 
                    ? db.findById(req.params.id)
                        .then(user => {
                            res.status(200).json(user)
                        })
                        .catch(err => {
                            res.status(404).json({
                                err,
                                errorMessage: "The user with the specified ID does not exist."
                            });
                        })
                    : res.status(404).json({
                        err,
                        errorMessage: "The user with the specified ID does not exist."
                    });
            })       
            .catch(err => {
                res.status(500).json({
                    err,
                    errorMessage: "The user information could not be modified."
                });
            }); 
    }
});

router.delete('/:id', (req, res) => {
    db.remove(req.params.id)
        .then(count => {
            if (count > 0) {
				res.status(200).json({ message: "The post has been deleted" });
			} else {
				res
					.status(404)
					.json({ message: "The post with the specified ID does not exist" });
			}
		})
        .catch(err => {
            res.status(500).json({
                err, 
                errorMessage: "The user could not be removed" 
            });
        });
});

module.exports = router;