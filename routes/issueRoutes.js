const express = require("express");
const issueRouter = express.Router();
const Issue = require('../models/issue.js'); // accesses issue MODEL


// GET all issue
issueRouter.get("/", (req, res, next) => {

    Issue.find().populate("comment").exec( (err, foundIssues) => {
        if (err) {
            res.status(500)
            return next(err)
        }
    
        
        return res.status(200).send(foundIssues)
    })
});
// GET issue by user id
issueRouter.get("/user/:issueId", (req, res, next) => {
     Issue.find({ user: req.auth._id }).populate("comment").exec( (err, userIssues) => {
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
        
        { _id: req.params.issueId, user: req.auth._id },
        (err, deleteIssue) => {
            if (err) {
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



// upvote
issueRouter.put("/upvote/:issueId", (req, res, next) => {
    // find issue by id
    Issue.findById(req.params.issueId, (err, foundIssue) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        if (!foundIssue) {
            res.status(404)
            return next(new Error("Issue not found"))
        }
        //checks if user has already voted
        if (foundIssue.upvoters.includes(req.auth._id)) {
            res.status(400)
            return next(new Error("User has already upvoted this issue"))
        }

        // add the user to the upvoter array and incement the upvote count
        foundIssue.upvoters.push(req.auth._id)
        foundIssue.upvotes += 1

        // Save the updated issue
        foundIssue.save((err, updatedIssue) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            return res.status(200).send(updatedIssue)
        })
    })
});
// downvote
issueRouter.put("/downvote/:issueId", (req, res, next) => {
    Issue.findById(req.params.issueId, (err, foundIssue) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        if (!foundIssue) {
            res.status(404)
            return next(new Error("User has already downvoted this issue"))
        }


        foundIssue.downvoters.push(req.auth._id)
        foundIssue.downvotes += 1


        foundIssue.save((err, updatedIssue) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            return res.status(200).send(updatedIssue)
        })
    })
});


module.exports = issueRouter;
