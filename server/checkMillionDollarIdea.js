const checkMillionDollarIdea = (req, res, next) => {
    const { numWeeks, weeklyRevenue } = req.body;
    const totalRevenue = Number(numWeeks) * Number(weeklyRevenue);
    if (!numWeeks || !weeklyRevenue|| totalRevenue < 1000000 || isNaN(totalRevenue)) {
        res.status(400).send();
    } else {
        next();
    }
};

module.exports = checkMillionDollarIdea;
;