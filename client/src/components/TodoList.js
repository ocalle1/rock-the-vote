import React from 'react'
import Todo from './Todo.js'

export default function TodoList(props){
const { todos } = props // 14. 

  return (
    <div className="todo-list">
      {/* 14. */}
{ todos.map(todo => <Todo {...todo} key={todo._id}/>) } 
    </div>
  )
}