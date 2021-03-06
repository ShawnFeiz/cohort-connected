(() => {
    const router = require('express').Router();
    const passport = require('passport');
    const cohortController = require('../../controllers/cohortController')

    router.get('/userLinkedIn/:id', cohortController.findUserbyLinkedIn);

    router.get('/users/:id', cohortController.findUser);
    router.post('/user', cohortController.createUser);
    router.get('/users', cohortController.findUsers);
    
    router.post('/jobs',cohortController.createJobs);

    router.route('/messages/:id')
      .get(cohortController.findChat)
      .post(cohortController.createChat)
      .put(cohortController.updateChat);

    router.route('/:collection')
      .get(cohortController.findCollection)
      .post(cohortController.createCollection);
    router.route('/:collection/:id')
      .get(cohortController.findOne)
      .put(cohortController.thumb);

    router.route('/user/:id/:favorite')
      .get(cohortController.findFavorites)
      .post(cohortController.createFavorite)
      .delete(cohortController.removeFavorite);

    

    module.exports = router;
})();