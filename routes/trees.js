'use strict';

var express = require('express');
var router = express.Router();

var Tree = require('../models/tree');


router.route('/')
  .get((req, res) => {



    // .sort()    sort the results
    // .limit()   limit the number of results
    // .select()  limit the fields that will be in the results

    // req.query ==> {
    //   species: 1,
    //   _id: 0
    // }
    var page = parseInt(req.query.page) || 1;

    Tree
      .find({})
      .skip( page * 20 - 20 )
      .limit(20)
      .exec((err, trees) => {
        // LAST
        res.status(err ? 400 : 200).send(err || trees);
      });

    // var sort = req.query.sort;
    // delete req.query.sort;

    // var limit = parseInt(req.query.limit);
    // delete req.query.limit;

    // var select = {};

    // for(var key in req.query) {
    //   select[key] = parseInt(req.query[key])
    // }

    // Tree
    //   .find({})
    //   .select(select)
    //   .sort(sort)
    //   .limit(limit)
    //   .exec((err, trees) => {
    //     // LAST
    //     res.status(err ? 400 : 200).send(err || trees);
    //   });

  })
  .post((req, res) => {
    var tree = new Tree(req.body);

    console.log('tree:', tree);

    tree.save((err, savedTree) => {
      res.status(err ? 400 : 200).send(err || savedTree);
    });
  })

router.route('/:id')
  .get((req, res) => {
    Tree.findById(req.params.id, (err, tree) => {
      res.status(err ? 400 : 200).send(err || tree);
    });
  })
  .delete((req, res) => {
    Tree.findByIdAndRemove(req.params.id, (err, tree) => {
      res.status(err ? 400 : 200).send(err);
    });
  })
  .put((req, res) => {
    Tree.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true }, (err, tree) => {
      res.status(err ? 400 : 200).send(err || tree);
    });
  })

router.post('/:id/:creature', (req, res) => {

  // finding one document from the database
  Tree.findById(req.params.id, (err, tree) => {
    // tree is the document

    if(err) return res.status(400).send(err);

    var newCreature = req.params.creature;

    // modify the document
    tree.creatures.push(newCreature);

    // save to the db
    tree.save((err, savedTree) => {
      res.status(err ? 400 : 200).send(err || savedTree);
    });

  });
});


router.delete('/:id/:creature', (req, res) => {
  Tree.findById(req.params.id, (err, tree) => {
    if(err) return res.status(400).send(err);

    var index = tree.creatures.indexOf(req.params.creature);
    tree.creatures.splice(index, 1);

    tree.save((err, savedTree) => {
      res.status(err ? 400 : 200).send(err || savedTree);
    });

  });
})










module.exports = router;
