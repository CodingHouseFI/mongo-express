var express = require('express');
var router = express.Router();

var Tree = require('../models/tree');


router.route('/')
  .get((req, res) => {
    Tree.find({}, (err, trees) => {
      res.status(err ? 400 : 200).send(err || trees);
    });
  })
  .post((req, res) => {
    var tree = new Tree(req.body);
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

module.exports = router;
