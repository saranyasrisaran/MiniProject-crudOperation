const express = require('express');
const router = express.Router();
const club = require('../models/club');

router.get('/', (req, res, next) => {
    club.find()
        .then(docs => {
            res.render('home', { crud_demos: docs });
        })
        .catch(err => {
            console.log('Error occurred while loading data:', err);
            res.status(500).send('Error occurred while loading data');
        });
});

router.post('/add', (req, res, next) => {
    const { Name, Age, Location } = req.body;
    console.log(Name, Age, Location);
    const uclClub = new club({
        Name,
        Age,
        Location
    });
    uclClub.save()
        .then(() => {
            console.log('Data saved Successfully');
            res.redirect('/');
        })
        .catch(err => {
            console.log('Error occurred while saving to database:', err);
            res.status(500).send('Error occurred while saving to database');
        });
});

router.get('/edit/:id', (req, res, next) => {
    console.log(req.params.id);
    const { Name, Age, Location } = req.body; // Assuming these are the fields you want to update
    club.findOneAndUpdate({ _id: req.params.id }, { Name, Age, Location }, { new: true })
        .then(docs => {
            if (!docs) {
                console.log('Unable to find data for editing');
                res.status(404).send('Unable to find data for editing');
                next(err);
            } else {
                console.log('Data Update is successful');
                res.render('edit', { crud_demos: docs });
            }
        })
        .catch(err => {
            console.log('Error occurred while updating data:', err);
            res.status(500).send('Error occurred while updating data');
        });
});


router.post('/edit/:id', (req, res, next) => {
    console.log(req.params.id);
    const { Name, Age, Location } = req.body; // Assuming these are the fields you want to update
    club.findByIdAndUpdate({ _id: req.params.id }, { Name, Age, Location }, { new: true })
        .then(docs => {
            if (!docs) {
                console.log('Unable to find data for editing');
                res.status(404).send('Unable to find data for editing');
                next(err);
            } else {
                console.log('Data Update is successful');
                res.redirect('/');
            }
        })
        .catch(err => {
            console.log('Error occurred while updating data:', err);
            res.status(500).send('Error occurred while updating data');
        });
});


router.get('/delete/:id', (req, res, next) => {
    console.log(req.params.id);
    const { Name, Age, Location } = req.body; // Assuming these are the fields you want to update
    club.findByIdAndDelete({ _id: req.params.id }, { Name, Age, Location }, { new: true })
        .then(docs => {
            if (!docs) {
                console.log('Unable to find data for deleting');
                res.status(404).send('Unable to find data for deleting');
                next(err);
            } else {
                console.log('Data deletion is successful');
                res.redirect('/');
            }
        })
        .catch(err => {
            console.log('Error occurred while deleting data:', err);
            res.status(500).send('Error occurred while deleting data');
        });
});




module.exports = router;
