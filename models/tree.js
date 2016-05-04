'use strict';

var mongoose = require('mongoose');

var treeSchema = new mongoose.Schema({
  species: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  age: { type: Number, required: true },
  creatures: [{ type: String }] // an array of strings


  // // single string
  // name:  String
  // name:  { type: String }


  // // an array of strings
  // names:  [String],
  // names:  [{ type: String }]

});

var Tree = mongoose.model('Tree', treeSchema);

// function pickAPlant() {
//   var trees = ['sequoia', 'ash', 'pine', 'cherry'];
//   var randIndex = Math.floor(Math.random() * trees.length);
//   return trees[randIndex];
// }


module.exports = Tree;
