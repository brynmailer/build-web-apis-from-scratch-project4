const ideasRouter = require('express').Router();
const checkMillionDollarIdea = require('../checkMillionDollarIdea');
const { 
    addToDatabase,
    getAllFromDatabase,
    getFromDatabaseById,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
} = require('../db');

ideasRouter.param('ideaId', (req, res, next, id) => {
    const idea = getFromDatabaseById('ideas', id);
    if (idea) {
        req.idea = idea;
        next();
    } else {
        res.status(404).send();
    }
});

// get an array of all ideas.
ideasRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('ideas'));
});

// create a new idea and save it to the database.
ideasRouter.post('/', checkMillionDollarIdea,(req, res, next) => {
    const newIdea = addToDatabase('ideas', req.body);
    res.status(201).send(newIdea);
});

// get a single idea by id.
ideasRouter.get('/:ideaId', (req, res, next) => {
    res.send(req.idea);
});

// update a single idea by id.
ideasRouter.put('/:ideaId', checkMillionDollarIdea,(req, res, next) => {
    const updatedIdeaInstance = updateInstanceInDatabase('ideas', req.body);
    res.send(updatedIdeaInstance);
});

// delete a single idea by id.
ideasRouter.delete('/:ideaId', (req, res, next) => {
    deleteFromDatabasebyId('ideas', req.params.ideaId);
    res.status(204).send();
});

module.exports = ideasRouter;