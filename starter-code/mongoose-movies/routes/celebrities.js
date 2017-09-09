var express = require('express');
var router = express.Router();
const Celebrity = require('../models/Celebrity');

/* GET users listing. */
router.get('/celebrities', function(req, res, next) {
  Celebrity.find({}, (err, docs) => {
    if (err) { return next(err); }
    res.render('./celebrities/index', { title:'Celebrities', celebritiesList: docs});
  });
});


router.get('/celebrities/:id', (req, res, next) => {
  const celebrityId = req.params.id;
  Celebrity.findById(celebrityId, (err, docs) => {
    if (err) { return next(err); }
    res.render('celebrities/show',{title: 'Details', celebritiesProp: docs});
  });
});

module.exports = router;
