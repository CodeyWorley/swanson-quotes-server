const express = require('express');

const {Quote} = require('./model');

const router = express.Router();

// Get all quotes **** for postman testing
// router.get('/', (req, res) => {
//   Quote.find({})
//     .then(results => {
//       res.status(200).json(results);
//     })
//     .catch(error => {
//       res.status(500).json(error);
//     }); 
// });

// Get random quote by size type
router.get('/:type', (req,res) => {
  const {type} = req.params;

  // **** maybe use a regex or type of mongo query in v2
  Quote.find({})
    .then(results => {
      let availableQuotes = [];

      results.map(quote => {
        let words = (quote.content.split(' ').length + 1);

        if(type === 'small' && words < 5) {
          availableQuotes.push(quote)
        }
        if(type === 'medium' && words >= 5 && words <= 12) {
          availableQuotes.push(quote)
        }
        if(type === 'large' && words > 12) {
          availableQuotes.push(quote)
        }
      })
      let randomQuote = availableQuotes[Math.floor(Math.random()*availableQuotes.length)];

      res.status(200).json(randomQuote);
    })
    .catch(error => {
      res.status(500).json(error);
    }); 
});

// Update quote with rating
router.put('/:id', (req, res) => {
  const {id} = req.params;
  const {rating, address} = req.body;

  return Quote.find({_id: id, addresses: address})
    .countDocuments()
    .then(count => {
      if(count > 0) {
        return Promise.reject({
          code: 422,
          reason: 'ValidationError',
          message: 'You have alreadt voted on this quote',
          location: 'quote'
        });
      }
      return Quote.findOneAndUpdate(
        {_id: id}, 
        {$push: {ratings: rating, addresses: address}},
        {new: true}
      );
    })
    .then(quote => {
        return res.status(201).json(quote);
    })
    .catch(err => {
        if(err.reason === 'ValidationError') {
            return res.status(err.code).json(err);
        }
        res.status(500).json({code: 500, message: 'Internal server error'})
    });  
});

// **** v2 stuff
// Post a quote
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