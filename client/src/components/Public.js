import React, { useContext, useEffect } from 'react'

// added
import IssueList from './issue/IssueList.js'
// import Issue from './issue/Issue.js'
import { IssueContext } from '../context/IssueProvider.js'
import IssueForm from './issue/IssueForm.js'
// import Issue from '../components/Issue.js'




export default function Public() {
  const {
    issues, 
    handleUpvote,
    addIssue,
    allIssues,
    getAllIssues,
    issue,
    getAllComments
  } = useContext(IssueContext);

  useEffect(() => {getAllIssues()}, []);
  // useEffect(() => {getAllComments()}, []);

  // console.log(allIssues)

  return (
    <div className="public">
      <h1>USER ISSUES</h1>
      <IssueForm addIssue={addIssue}/>

      <h3>Your issues</h3>
      {/* <IssueList issues={allIssues}/> */}
      <IssueList issues={allIssues}/>
    </div>
  )
}