const minionWorkRouter = require('express').Router({mergeParams: true});
const { 
    addToDatabase,
    getAllFromDatabase,
    getFromDatabaseById,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
} = require('../db');

minionWorkRouter.get('/', (req, res, next) => {
    const work = getAllFromDatabase('work').filter((job) => {
        return job.minionId === req.minionId;
    });
    res.send(work);
});
  
minionWorkRouter.post('/', (req, res, next) => {
    const newWork = req.body;
    newWork.minionId = req.minionId;
    const addedWork = addToDatabase('work', newWork);
    res.status(201).send(addedWork);
});

minionWorkRouter.param('workId', (req, res, next, id) => {
    const work = getFromDatabaseById('work', id);
    if (work) {
        req.work = work;
        req.workId = id;
        next();
    } else {
        res.status(404).send();
    }
});

minionWorkRouter.put('/:workId', (req, res, next) => {
    if (req.params.minionId !== req.body.minionId) {
        res.status(400).send();
    } else {
        updatedWork = updateInstanceInDatabase('work', req.body);
        res.send(updatedWork);
    }
});

minionWorkRouter.delete('/:workId', (req, res, next) => {
    const deleted = deleteFromDatabasebyId('work', req.workId);
    if (deleted) {
        res.status(204).send();
    }
    res.status(500).send();
});
  

module.exports = minionWorkRouter;