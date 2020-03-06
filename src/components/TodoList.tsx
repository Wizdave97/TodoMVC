import React from 'react';
import TodoItem from './TodoItem';
type TodoProps={
  todos:{title:string,status:number,id:number}[];
  deleteItem(id:number):void;
  toggleStatus(id:number):void;
  editItem(id:number,title:string):void;
}

interface TodoList extends React.FC<TodoProps>{

}
const TodoList:TodoList=(props)=>{

    return (
      <div className="p-4 w-full">
        <ul className="w-full p-4 bg-gray-100 rounded-md ">
        {props.todos.map(todo=>(
        <TodoItem key={todo.id} todo={todo}  deleteItem={props.deleteItem} editItem={props.editItem} toggleStatus={props.toggleStatus}/>
        ))}
        </ul>
    </div>);
}

export default TodoList;
