var express = require("express");
var router = express.Router();
const Issue = require("../models/issue");

router.get('/test', (req, res, next) => {
  Issue.find(function (err, issues) {
    if (err)
      res.json(err);
    else {
      res.json(issues);
    }

  })
});

saveitem = function (newIssue, callback) {
  newIssue.save((err, issue) => {

    if (err) {

      callback(err)
    } else {
      callback(issue);
    }

  });


}



router.post('/post_route', (req, res, next) => {
  let item = req.body;
  console.log(req.body);
  console.log(item);

  let newIssue = new Issue(item);
  saveitem(newIssue, function (err, resp) {
    if (err) {
      res.send(err)
    } else {
      res.send(resp);
    }

  })


  // newIssue.save((err, issue) => {

  //   if (err) {

  //     res.json(err)
  //   } else {
  //     res.json({

  //       msg: 'issue added to db'
  //     });

  //   }

  // });
});


router.put('/issue/:id', (req, res, next) => {

  Issue.findOneAndUpdate({
      _id: req.params.id
    }, {
      $set: {
        issuename: req.body.issuename,
        issuecontent: req.body.issuecontent
      }
    },
    function (err, result) {
      if (err) {
        res.json(err);
      } else {
        res.json(result)
      }

    });
});

router.delete('/issue/:id', (req, res, next) => {
  Issue.remove({
    _id: req.params.id
  }, function (err, result) {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});
module.exports = router;
