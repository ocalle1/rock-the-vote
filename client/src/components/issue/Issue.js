import React, { useState, useContext, useEffect } from 'react'
import IssueProvider from '../../context/IssueProvider';
import { IssueContext } from '../../context/IssueProvider.js'
import CommentsForm from '../comments/CommentsForm';



const initInputs = {
  upvoters: 0,
  downvoters: 0,
};

export default function Issue(props) {
  const { title, description, _id, upvoters, downvoters, issues, comment } = props;
  const {
    handleUpvote,
    handleDownvote,
    deleteIssue,
    userId, // Assuming you have a variable for the user's ID
    
  } = useContext(IssueContext);

  const [inputs, setInputs] = useState(initInputs);
  const [hasVoted, setHasVoted] = useState(false);



  useEffect(() => {
    if (Array.isArray(issues) && issues.length > 0) {
      // Create a copy of the issues array
      const sortedIssues = [...issues];

      // Sort the copy by issueVotes (most voted first)
      sortedIssues.sort((a, b) => b.issueVotes - a.issueVotes);

      // Update the state with the sorted array
      setInputs(sortedIssues);
    }
  }, [issues]);


  function handleUpvoteClick() {
    if (!hasVoted) {
      handleUpvote(_id, 'upvoters');
      setHasVoted(true);
    }
  };

  function handleDownvoteClick() {
    if (!hasVoted) {
      handleDownvote(_id, 'downvoters');
      setHasVoted(true);
    }
  };
  function handleDeleteClick() {
    deleteIssue(_id)
  };



  return (
    <div className="issue">
      <h1>{title}</h1>
      <h3>{description}</h3>
      <div>
        <button onClick={handleUpvoteClick} disabled={hasVoted}>
          Like
        </button>
        <button onClick={handleDownvoteClick} disabled={hasVoted}>
          Dislike
        </button>
        <button onClick={handleDeleteClick}>delete</button>
      </div>
      <p>Upvotes: {upvoters.length}</p>
      <p>Downvotes: {downvoters.length}</p>
   <CommentsForm 
   _id={_id}
   comment = {comment}
   />

    </div>
  )
};
