import React, { useState } from "react";
import axios from 'axios';


export const IssueContext = React.createContext();


// 14. interceptor for token; To be used whenever it is needed
const userAxios = axios.create()
userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config
});


export default function IssueProvider(props) {
    const initState = {
        user: JSON.parse(localStorage.getItem("user")) || {},
        token: localStorage.getItem('token') || "",
        issues: [],
        // not sure if I need these bottom 2
        // upvotes: 0,
        // downvotes: 0,
        voters: [],
        issueVotes: 0,
        text: []

    };
    const commentsInput = {
        comment: ""
    };

    const [issueState, setIssueState] = useState(initState);
    const [allIssues, setAllIssues] = useState([]);


    //added
    // const [comments, setComment] = useState(commentsInput)
    const [comments, setComment] = useState([])



    // GET all issues --- I THINK THIS IS WHAT NEEDS TO BE MAPPED OVER IN THE PUBLIC.js
    function getAllIssues() {
        userAxios.get("/api/issue")
            .then(res => {
                // console.log(res.data)
                setAllIssues(res.data)
                //get issue comments
            })
            .catch(err => console.log(err.response.data.errMsg))
    };


    // 14.2 getUserIssue
    function getUserIssue() {
        userAxios.get("/api/issue/user") // user is from todoRouter.js
            .then(res => {
                setIssueState(prevState => ({
                    ...prevState,
                    Issues: res.data
                }))
            })
            .catch(err => console.log(err.response.data.errMsg))
    };

    // ADD issue
    function addIssue(newIssue) {
        userAxios.post("/api/issue", newIssue)
            .then(res => {
                setIssueState(prevState => ({
                    ...prevState,
                    issues: [...prevState.issues, res.data]
                }))
            })
            .catch(err => console.log(err.response.data.errMsg))
    };

    // DELETE issue
    function deleteIssue(issueId) {
        userAxios.delete(`api/issue/${issueId}`)
            .then(res => {
                console.log(res)
                return setIssueState(prevInputs => ({
                    ...prevInputs,
                    issues: [...prevInputs.issues.filter(issue => issue._id !== issueId)]
                }))
            })
            .catch(err => console.log(err.response.data.errMsg))
    };
    // update issue
//     function editIssue(updates, issueId) {
//         userAxios.put(`/api/issue/${issueId}`, updates)
//             // .then(res => console.log(res))
//             .then(res => {
// setIssueState((prevIssues) => [
//     ...prevIssues.map((issue) => (issue._id !== issueId?
//         ))
// ])
//             })
//     }

    // function updateIssue(issueId, updatedData) {
    //     userAxios.put(`/api/issues/${issueId}`, updatedData)
    //     .then((res) => {
    //         const updatedIssue = res.data
    //         console.log('updated Issue:', updatedIssue)
    //     })
    //     .catch((error) => {
    //         console.log("Error updating the issue: ", error)
    //     })
    // };
    // COMMENTS


    // get all issue comments?
    function getIssueComments(issueId) {
        userAxios.get(`/api/comment/${issueId}`)
            .then(res => {
                // console.log('getIssueComments data:',res.data)
                setComment(prevState => ({
                    ...prevState,
                    comments: {
                        ...prevState.comment,
                        [issueId]: res.data
                    }
                }))
                // setComment([res.data])
            })
            .catch(err => console.log(err))
    };
    // ADD comment to existing issue
    function addCommentToExistingIssue(newComment, issueId) {
        console.log({ text: newComment, issue: issueId })
        userAxios.post(`/api/comment/${issueId}`, { text: newComment, issue: issueId })
            .then(res => {
                setComment(prevState => ({
                    ...prevState,
                    comments: {
                        ...prevState.comment,
                        [issueId]: newComment
                    }
                }))
            })
            .catch(err => console.log(err))
    };
    // delete comment
    // update comment


    // handle upvote
    function handleUpvote(issueId) {
        console.log(issueId)
        userAxios.put(`/api/issue/upvote/${issueId}`)
            .then(res => {
                const updatedIssues = issueState.issues.map(issue => {
                    if (issue._id === issueId) {
                        return {
                            ...issue,
                            issueVotes: res.data.issueVotes,
                        }
                    }
                    return issue
                })
                setIssueState(prevState => ({
                    ...prevState,
                    issues: updatedIssues
                }))
                getAllIssues()
            })
            .catch(err => console.log(err.response.data.errMsg))
    };

    // handle downvotes
    function handleDownvote(issueId) {
        console.log(issueId)
        userAxios.put(`/api/issue/downvote/${issueId}`)
            .then(res => {
                const updatedIssues = issueState.issues.map(issue => {
                    if (issue._id === issueId) {
                        return {
                            ...issue,
                            issueVotes: res.data.issueVotes,
                        }
                    }
                    return issue;
                })
                setIssueState(prevState => ({
                    ...prevState,
                    issue: updatedIssues
                }))
                getAllIssues()
            })
            .catch(err => console.log(err.response.data.errMsg))
    }

    return (
        <IssueContext.Provider
            value={{
                ...issueState,
                getAllIssues,
                getUserIssue,
                addIssue,
                deleteIssue,
                handleUpvote,
                handleDownvote,
                allIssues,
                comments,
                // getUserComments,
                addCommentToExistingIssue,
                getIssueComments,
                updateIssue
            }}>
            {props.children}
        </IssueContext.Provider>
    )
};