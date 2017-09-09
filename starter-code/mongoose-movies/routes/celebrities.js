var express = require('express');
var router = express.Router();
const Celebrity = require('../models/Celebrity');

//Iteration 2
router.get('/', function(req, res, next) {
  Celebrity.find({})
  .then( (response) => {
    res.render('./celebrities/index', { title:'Celebrities', celebritiesList: response})
  }).catch( err => next(err) )
});

//Iteration 4
router.get('/new', (req, res, next) => {
  res.render('./celebrities/new', {title: 'Add Celebrity'})
})

// Iteration 4
router.post('/',(req,res,next) =>{
  const celebrityInfo = {
      name: req.body.name,
      occupation: req.body.occupation,
      catchPhrase: req.body.catchPhrase
    };

  const newCelebrity = new Celebrity(celebrityInfo);
  newCelebrity.save()
  .then( () => {
    res.redirect('/celebrities')
  }).catch( (err) => res.redirect('./celebrities/new') )
});

//Iteration 3
router.get('/:id', (req, res, next) => {
  const celebrityId = req.params.id;
  Celebrity.findById(celebrityId)
  .then( (response) => {
    res.render('./celebrities/show',{title: 'Details', celebritiesProp: response});
  }).catch( err => next(err) )
});

//Iteration 5
router.get('/:id/delete', (req, res, next) => {
  const celebrityId = req.params.id;
  Celebrity.findByIdAndRemove(celebrityId)
  .then( () => {
    res.redirect('/celebrities')
  }).catch( err => next(err) )
});

//Iteration 6 (bonus)
router.get('/:id/edit', (req, res, next) => {
  const celebrityId = req.params.id;
  Celebrity.findById(celebrityId)
  .then( (response) => {
    res.render('./celebrities/edit',{title: 'Edit celebrity', celebrities: response})
  }).catch( err => next(err) )
});

//Iteration 6 (bonus)
router.post('/:id/edit', (req, res, next) => {
  const celebrityId = req.params.id;
  const updates = {
      name: req.body.name,
      occupation: req.body.occupation,
      catchPhrase: req.body.catchPhrase
  };
  Celebrity.findByIdAndUpdate(celebrityId, updates)
  .then( () => {
    res.redirect('/celebrities')
  }).catch( err => next(err) )

});

module.exports = router;
