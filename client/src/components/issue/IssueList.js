import React from 'react'
// import Issue from './Issue.js'
import Issue from '../issue/Issue.js'

export default function IssueList(props) {
  const { issues } = props
  // console.log(issues)
  return (
    <div className="issue-list">
      {Array.isArray(issues) && issues.length > 0 ? (
        issues.map((issue) => <Issue {...issue} key={issue._id} />)
      ) : (
        <p>No issues to display</p>
      )}

    </div>
  )
};