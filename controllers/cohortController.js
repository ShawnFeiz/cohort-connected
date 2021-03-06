(() => {
    const db = require('../models');

    module.exports = {
        findUser: (req, res) => {
            db.User
                .findOne({ _id: req.params.id })
                .then(dbUser => res.json(dbUser))
                .catch(err => res.status(422).json(err));
        },
        findUsers: (req,res) => {
            db.User
                .find({})
                .then(dbUsers => res.json(dbUsers))
                .catch(err => res.status(422).json(err));
        },
        findUserbyLinkedIn: (req, res) => {
            db.User
                .findOne({ linkedInId: req.params.id })
                .then(dbUser => res.json(dbUser))
                .catch(err => res.status(422).json(err));
        },
        createUser: (req, res) => {
            // console.log('unique linkedIn id' + req.body.linkedInId);
            db.User.update(
                //find by
                {'linkedInId': req.body.linkedInId},
                //update or create
                { $set: {
                    'linkedInId':req.body.linkedInId,
                    'firstName': req.body.firstName,
                    'lastName': req.body.lastName,
                    'headline': req.body.headline,
                    'location': req.body.location,
                    'profilePicURL': req.body.profilePicURL,
                }},
                {'upsert':true})

                .then(dbUser => res.json(dbUser))
                .catch(err => res.status(422).json(err));
        },
        findCollection: (req, res) => {
            collectionControl = new Promise((resolve, reject) => {
                let collection;
                switch (req.params.collection) {
                    case 'events':
                        collection = 'Events';
                        break;
                    case 'news':
                        collection = 'News';
                        break;
                    case 'jobs':
                        collection = 'Job';
                        break;
                    case 'forum':
                        collection = 'Forum';
                        break;
                };
                resolve(collection);
            })
            .then(collection => {  
                console.log(collection);     
                db[collection]
                  .find({})
                  .then(dbCollection => res.json(dbCollection))
                  .catch(err => res.status(422).json(err));});
        },
        createCollection: (req, res) => {
            collectionControl = new Promise((resolve, reject) => {
                let collection;
                switch (req.params.collection) {
                    case 'jobs':
                        collection = 'Job';
                        break;
                    case 'forum':
                        collection = 'Forum';
                        break;
                };
                resolve(collection);
            })
            .then(collection => {  
                console.log(collection);     
                db[collection]
                  .create({
                      'title': req.body.title,
                      'summary': req.body.summary,
                      'author': { '_id': req.body._id,
                                  'author': req.body.author }
                  })
                  .then(dbCollection => res.json(dbCollection))
                  .catch(err => res.status(422).json(err));});
        },
        findOne: (req, res) => {
            collectionControl = new Promise((resolve, reject) => {
                let collection;
                switch (req.params.collection) {
                    case 'events':
                        collection = 'Events';
                        break;
                    case 'news':
                        collection = 'News';
                        break;
                    case 'jobs':
                        collection = 'Job';
                        break;
                    case 'forum':
                        collection = 'Forum';
                        break;
                };
                resolve(collection);
            })
            .then(collection => {   
                db[collection]
                  .findOne({ _id: req.params.id })
                  .then(dbCollection => res.json(dbCollection))
                  .catch(err => res.status(422).json(err));});
        },

        findJobs: (req, res) => {
            db.Job
              .find({})
              .then(dbJobs => res.json(dbJobs))
              .catch(err => res.status(422).json(err));
        },

        thumb: (req, res) => {
            collectionControl = new Promise((resolve, reject) => {
                let collection;
                switch (req.params.collection) {
                    case 'news':
                        collection = 'News';
                        break;
                };
                resolve(collection);
            })
            .then(collection => {     
                db[collection]
                  .findOneAndUpdate({ _id: req.params.id }, { $inc: { thumbsUp: 1 }})
                  .then(dbCollection => res.json(dbCollection))
                  .catch(err => res.status(422).json(err));});

        },
        createJobs: (req, res) => {
            console.log(res.data);
            db.Job.Insert({
                'company': req.body.company,
                'title': req.body.title,
                'link':req.body.link,
                // 'comment':req.body.comment
            })
        },
        findFavorites: (req, res) => {
            db.User.findOne({ _id: req.params.id })
              .populate(`${req.params.favorite}`)
              .then(dbFavorites => res.json(dbFavorite))
              .catch(err => res.status(422).json(err));
        },
        createFavorite: (req, res) => {
            db.User.findOneAndUpdate({ _id: req.params.id }, { $push: { [req.params.favorite]: result._id }}, { new: true })
              .then(dbFavorite => res.json(dbFavorite))
              .catch(err => res.status(422).json(err));
        },
        removeFavorite: (req, res) => {
            db.User.findOneAndUpdate({ _id: req.params.id }, { $pull: { [req.params.favorite]: result._id }})
              .then(dbFavorite => res.json(dbFavorite))
              .catch(err => res.status(422).json(err));
        },
        findChat: (req,res) => {
            db.Chat.findOne({chatId : req.params.id})
            .then(dbChat => res.json(dbChat))
            .catch(err => res.status(422).json(err));
        },
        createChat: (req,res) => {
            db.Chat.create({chatId : req.params.id})
            .then(dbChat => { console.log(dbChat); res.json(dbChat)})
            .catch(err => res.status(422).json(err));
        },
        updateChat: (req,res) => {
            db.Chat.findOneAndUpdate({ chatId: req.params.id }, { $push: {messages: req.body}}, { new: true })
            .then(dbChat => res.json(dbChat))
              .catch(err => res.status(422).json(err));
        }
    };
})();
