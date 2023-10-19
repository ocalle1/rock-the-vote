const express = require("express");
const issueRouter = express.Router();
const Issue = require('../models/issue.js'); // accesses issue MODEL


// GET all issue
issueRouter.get("/", (req, res, next) => {
    Issue.find((err, allIssues) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(allIssues)
    })
});
// GET issue by user id
issueRouter.get("/user/:issueId", (req, res, next) => {
    Issue.find({ user: req.auth._id }, (err, userIssues) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(userIssues)
    })
});
// POST add new issue
issueRouter.post("/", (req, res, next) => {
    req.body.user = req.auth._id
    newIssue = new Issue(req.body)
    newIssue.save((err, savedIssue) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(201).send(savedIssue)
    })
});
// DELETE issue by user id
issueRouter.delete('/:issueId', (req, res, next) => {
    Issue.findOneAndDelete(
        {_id: req.params.issueId, user: req.auth._id},
        (err, deleteIssue) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).send(`Successfilly delete issue: ${deleteIssue.title}`)
        }
    )
});
//PUT update issue by id
issueRouter.put("/:issueId", (req, res, next) => {
    Issue.findOneAndUpdate(
        { _id: req.params.issueId, user: req.auth._id },
        req.body,
        { new: true },
        (err, updatedIssues) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            return res.status(200).send(updatedIssues)
        }
    )
});


// NEED TO ADD VOTE FUNCTIONS



module.exports = issueRouter;
