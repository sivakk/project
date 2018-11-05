var express = require("express");
const Timer = require("../models/timer");
var router = express.Router();


router.get('/test', (req, res, next) => {
  Timer.find(function (err, time) {
    if (err)
      res.json(err);
    else {
      res.json(time);
    }

  })
});

savetime = function (newTime, callback) {
  newTime.save((err, time1) => {

    if (err) {

      callback(err)
    } else {
      callback(time1);
    }

  });


}



router.post('/post_route', (req, res, next) => {
  let time = req.body;
  console.log(req.body);
  console.log(time);

  let time1 = new Timer({
    timer: req.body

  });

  // let newTime = new Timer(time);
  // savetime(newTime, function (err, resp) {
  //   if (err) {
  //     res.send(err)
  //   } else {
  //     res.send(resp);
  //   }

  // });


  time1.save((err, time) => {

    if (err) {

      res.json(err)
    } else {
      res.json({

        msg: 'issue added to db'
      });

    }

  });
});




// router.delete('/issue/:id', (req, res, next) => {
//   Issue.remove({
//     _id: req.params.id
//   }, function (err, result) {
//     if (err) {
//       res.json(err);
//     } else {
//       res.json(result);
//     }
//   });
// });
module.exports = router;
