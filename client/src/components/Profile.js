import React, {useContext} from 'react' // 11. added useContext
import TodoForm from './TodoForm.js'
import TodoList from './TodoList.js'
// import Todo from './Todo.js'
import { UserContext } from '../context/UserProvider.js' // 11. 

export default function Profile(){
const {user: 
  {username},
   addTodo, 
   todos
  } = useContext(UserContext) // 11.; 14. addTodo, todos - UserProviders.js

  return (
    <div className="profile">
      <h1>Welcome @{username}!</h1>
      <h3>Add A Todo</h3>
      {/* 14. addTodo */}
      <TodoForm addTodo={addTodo}/> 
      <h3>Your Todos</h3>
      {/*  14 */}
      <TodoList todos={todos}/>
    </div>
  )
}
