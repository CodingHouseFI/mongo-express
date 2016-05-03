'use strict';

var mongoose = require('mongoose');

var treeSchema = new mongoose.Schema({
  species: { type: String, required: true, default: pickAPlant },
  createdAt: { type: Date, default: Date.now },
  age: { type: Number }
});

var Tree = mongoose.model('Tree', treeSchema);

function pickAPlant() {
  var trees = ['sequoia', 'ash', 'pine', 'cherry'];
  var randIndex = Math.floor(Math.random() * trees.length);
  return trees[randIndex];
}


module.exports = Tree;
