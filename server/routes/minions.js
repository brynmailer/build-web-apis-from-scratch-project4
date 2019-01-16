const minionsRouter = require('express').Router();
const minionWorkRouter = require('./minionWorkRouter');

const { 
    addToDatabase,
    getAllFromDatabase,
    getFromDatabaseById,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
} = require('../db');

minionsRouter.param('minionId', (req, res, next, id) => {
    const minion = getFromDatabaseById('minions', id);
    if (minion) {
        req.minionId = id;
        req.minion = minion;
        next();
    } else {
        res.status(404).send();
    }
});

minionsRouter.use('/:minionId/work', minionWorkRouter);

// get an array of all minions.
minionsRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('minions'));
});

// create a new minion and save it to the database.
minionsRouter.post('/', (req, res, next) => {
    const newMinion = addToDatabase('minions', req.body);
    res.status(201).send(newMinion);
});

// get a single minion by id.
minionsRouter.get('/:minionId', (req, res, next) => {
    res.send(req.minion);
});

// update a single minion by id.
minionsRouter.put('/:minionId', (req, res, next) => {
    const updatedMinionInstance = updateInstanceInDatabase('minions', req.body);
    res.send(updatedMinionInstance);
});

// delete a single minion by id.
minionsRouter.delete('/:minionId', (req, res, next) => {
    deleteFromDatabasebyId('minions', req.params.minionId);
    res.status(204).send();
});

module.exports = minionsRouter;