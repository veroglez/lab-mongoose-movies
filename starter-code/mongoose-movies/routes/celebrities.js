var express = require('express');
var router = express.Router();
const Celebrity = require('../models/Celebrity');




//Iteration 2
router.get('/', function(req, res, next) {
  Celebrity.find({}, (err, docs) => {
    if (err) { return next(err); }
    res.render('./celebrities/index', { title:'Celebrities', celebritiesList: docs});
  });
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
  newCelebrity.save( (err) => {
    if (err) { return res.redirect('./celebrities/new'); }
    return res.redirect('/celebrities');
  });
});

//Iteration 5
router.get('/:id/delete', (req, res, next) => {
  const celebrityId = req.params.id;
  Celebrity.findByIdAndRemove(celebrityId, (err, docs) => {
    if (err) { return next(err); }
    return res.redirect('/celebrities');
  });
});


//Iteration 3
router.get('/:id', (req, res, next) => {
  const celebrityId = req.params.id;
  Celebrity.findById(celebrityId, (err, docs) => {
    if (err) { return next(err); }
    res.render('./celebrities/show',{title: 'Details', celebritiesProp: docs});
  });
});


module.exports = router;
