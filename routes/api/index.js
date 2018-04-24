(()=>{
    const router = require('express').Router();
    const passport = require('passport');
    var mongoose = require('mongoose');
    // Require all models
    var db = require('../../models');
    // router.get('/', function (req, res) {
    //     res.render('index', { user: req.user });
    // });

    //send News
    router.get("/main/news", (req,res) => {
        db.News.find({}).then((data)=> res.json(data))
    });

    router.get("/main/events", (req,res) => {
        console.log('route hit')
        db.Events.find({}).then((data)=> res.json(data))
    });

    router.post('/user', (req, res) => {
        var linkedInId = req.body.linkedInId;
        var body = req.body;
        console.log('unique linkedIn id' + linkedInId);
        db.User.update(
            //find by
            {'linkedInId': req.body.linkedInId},
            //update or create
            { $set: {
                'firstName': req.body.firstName,
                'lastName': req.body.lastName,
                'headline': req.body.headline,
                'location': req.body.location,
                'profilePicURL': req.body.location,
            }},
            {'upsert':true}
    
        ).then(user => res.json(user)).catch(err => res.json(err));
    })




    const cohortController = require('../../controllers/cohortController')
    
    router.get('/news', cohortController.findNews);
    router.get('/events', cohortController.findEvents);
    router.get('/user/:id', cohortController.findUser);
    router.post('/user', cohortController.createUser);

    router.route('user/:id/:favorite')
      .get(cohortController.findFavorites)
      .post(cohortController.createFavorite)
      .delete(cohortController.removeFavorite);

    module.exports = router;
})();