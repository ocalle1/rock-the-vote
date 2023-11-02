import React, {useState, useContext} from "react";
import { IssueContext } from "../../context/IssueProvider";






  export default function CommentsForm(props){

    const { 
      getIssueComments,
      addCommentToExistingIssue,
      comments,
    userId,
    issueId,
    getAllIssues
  } = useContext(IssueContext);
      
// const { comments } = props
console.log(props)
const { _id, comment } = props
const [userComment, setUserComment] = useState("");
const [id, setId] = useState("");

// const [getComments, setGetComments] = useState([]);

function handleChange(e){
  setUserComment(e.target.value)
//  setId(_id)
// setAllComments([e.target.value])
// console.log('handleChange allComments:', allComments)
};

function handleSubmit(e){
  // console.log('handleSub allComments:' ,allComments, 'id:', id)
  e.preventDefault()
  addCommentToExistingIssue(userComment, _id)
  setUserComment("")
  getAllIssues()
// addCommentToExistingIssue(allComments, id)
// setAllComments(commentsInputs)
}




return (
  <form onSubmit={handleSubmit}>
<textarea
name="comment"
value={userComment}
onChange={handleChange}
placeholder="Add comment"
></textarea>
<button type="submit">Add Comment</button>
<h2>Comments</h2>
      <ul>
        {comment?.map((comment) => (
          <li key={comment._id}>{comment.text}</li>
        ))}
      </ul>
  </form>
  
)
  };


 