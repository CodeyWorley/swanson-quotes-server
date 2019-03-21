const express = require('express');

const {Quote} = require('./model');

const router = express.Router();

// Get all quotes
router.get('/', (req, res) => {
  Quote.find({})
    .then(results => {
      res.status(200).json(results);
    })
    .catch(error => {
      res.status(500).json(error);
    }); 
});

// Get random quote by size type
// types ==> small >= 4 , medium >= 5 <= 12  , large >= 13
router.get('/:type', (req,res) => {
  const {type} = req.params;

  // query mongo for a quote content of words x size


  // randomly select one and send

});

// Update quote with rating
// router.put('/:id', (req, res) => {
    
// });

// Post for testing
// router.post('/', (req, res) => {
//   const {content} = req.body;

//   return Quote.find({content})
//       .count()
//       .then(count => {
//           if(count > 0) {
//               return Promise.reject({
//                   code: 422,
//                   reason: 'ValidationError',
//                   message: 'This quote already exists in database',
//                   location: 'quote'
//               });
//           }
//           return Quote.create({
//               content
//           })
//       })
//       .then(quote => {
//           return res.status(201).json(quote);
//       })
//       .catch(err => {
//           if(err.reason === 'ValidationError') {
//               return res.status(err.code).json(err);
//           }
//           res.status(500).json({code: 500, message: 'Internal server error'})
//       });    
// });

module.exports = {router};