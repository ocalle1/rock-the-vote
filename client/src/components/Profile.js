import React, {useContext} from 'react' // 11. added useContext
// import TodoForm from './TodoForm.js'
// import TodoList from './TodoList.js'
// import Todo from './Todo.js'
import { UserContext } from '../context/UserProvider.js' 

// added
import { IssueContext } from '../context/IssueProvider.js'
import IssueForm from './issue/IssueForm.js'
import IssueList from './issue/IssueList.js'



export default function Profile(){
const {user: 
  {username},
  //  addTodo, 
  //  todos
  } = useContext(UserContext) // 11.; 14. addTodo, todos - UserProviders.js

const { 
addIssue,
issues
} = useContext(IssueContext);

  return (
    <div className="profile">
      <h1>Welcome @{username}!</h1>
      <h3>Add issue</h3>
      <IssueForm addIssue={addIssue}/>
      <h3>Your Issue</h3>
      <IssueList issues={issues}/>
    </div>
  )
}
