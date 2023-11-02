const express = require('express');
const commentsRouter = express.Router();
const Comment = require('../models/comments.js');
const Issue = require('../models/issue.js');



// get all comments
commentsRouter.get('/', (req, res, next) => {
    Comment.find({}, (err, comments) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(comments)
    })
});

// Get comments for a specific issue by issueId
commentsRouter.get('/:issueId', (req, res, next) => {

    Comment.find({ issue: req.params.issueId }, (err, comments) => {

        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(comments)
    })
});


// commentsRouter.get('/:issueId', (req, res, next) => {
//     const issueId = req.params.issueId; // Extract the issueId from the URL
//     // Now you can use the issueId to retrieve comments for that specific issue
//     Comment.find({ issue: issueId }, (err, comments) => {
//         if (err) {
//             res.status(500);
//             return next(err);
//         }
//         return res.status(200).send(comments);
//     });
// });
//add new comment
commentsRouter.post('/:issueId', (req, res, next) => {
    Issue.findOne({
        _id: req.params.issueId
    }, (err, foundIssue) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        if (!foundIssue) {
            res.status(404)
            return next(err)
        }
        const newComment = new Comment({
            text: req.body.text,
            issue: req.params.issueId,
            user: req.auth._id
        })
        newComment.save((err, savedComment) => {
            if (err) {
                res.status(500);
                return next(err);
            }
            foundIssue.comment.push(savedComment._id)
            foundIssue.save((err, updatedIssue) => {
                if (err) {
                    res.status(500)
                    return next(err)
                }
                return res.status(200).send(updatedIssue)
            })
        })
    })
});


// PUT
commentsRouter.put("/:issueId", (req, res, next) => {
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
// DELETE
commentsRouter.delete('/:issueId', (req, res, next) => {

    Issue.findOneAndDelete(

        { _id: req.params.issueId, user: req.auth._id },
        (err, deleteComment) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            return res.status(200).send(`Successfilly delete issue: ${deleteComment.title}`)
        }
    )
});


module.exports = commentsRouter;