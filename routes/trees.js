var express = require('express');
var router = express.Router();

var Tree = require('../models/tree');

//  POST  /api/trees   --->  create a new tree
 
//  GET   /api/trees   --->  return array of all trees
router.get('/', (req, res) => {
  Tree.find({}, (err, trees) => {
    if(err) {
      res.status(400).send(err);
    } else {
      res.send(trees);
    }
  });
});

//  GET   /api/trees/:id   --->  return one tree by id
router.get('/:id', (req, res) => {

  Tree.findById(req.params.id, (err, tree) => {
    if(err) {
      res.status(400).send(err);
    } else {
      res.send(tree);
    }
  });

});

//  DELETE   /api/trees/:id   --->  delete one tree by id
router.delete('/:id', (req, res) => {
  Tree.findByIdAndRemove(req.params.id, err => {
    if(err) {
      res.status(400).send(err);
    } else {
      res.send();
    }
  });
});

//  POST  /api/trees   --->  create a new tree
router.post('/', (req, res) => {
  var tree = new Tree(req.body);

  tree.save((err, savedTree) => {
    if(err) {
      res.status(400).send(err);
    } else {
      res.send(savedTree);
    }
  });
});

//  PUT   /api/trees/:id   --->  update one tree
router.put('/:id', (req, res) => {

  // req.params.id  -->  document id
  // req.body  --->  update obj

  Tree.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true }, (err, tree) => {
    if(err) {
      res.status(400).send(err);
    } else {
      res.send(tree);
    }
  });
});

module.exports = router;
