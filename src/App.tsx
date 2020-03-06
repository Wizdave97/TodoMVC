import React, {useState,useEffect} from 'react';
import TodoList from './components/TodoList';
import NewTodo from './components/NewTodo';

export enum Status{ALL,ACTIVE,COMPLETED}
export type todos={title:string,id:number,status:number}[]

const App:React.FC=(props):JSX.Element=>{
  const [todos,setTodos]=useState<todos>([])
  const [view,setView]=useState<number>(Status.ALL)
  const addItem=(item:string)=>(e:React.KeyboardEvent):void=>{
    switch(e.key! as string){
      case 'Enter':
        let todoObj={title:item,id:todos.length,status:Status.ACTIVE}
        let todosCopy=[...todos,todoObj];
        setTodos(todosCopy);
        break;
    }
  }
  const deleteItem=(id:number):void=>{
    let filteredList=todos.filter(todo=>{
      return todo.id!==id
    })
    setTodos(filteredList)
  }
  const editItem=(id:number,title:string):void=>{
    let todosCopy=[...todos]
    let item=todosCopy[id];
    item.title=title;
    setTodos(todosCopy);
  }

  const switchView=(newView:number):void=>{
    setView(newView)
  }
  const toggleStatus=(id:number):void=>{
    let newTodos=todos.map(todo=>{
      if(todo.id===id){
        todo.status === Status.ACTIVE ? todo.status=Status.COMPLETED:todo.status=Status.ACTIVE;
      }
      return todo
    })
    setTodos(newTodos);
  }
  useEffect(()=>{
    window.document.title="React | TodoMVC"
    window.document.body.classList.add("bg-gray-100")
  },[])

  let viewingTodos=todos.filter(todo=>(todo.status===view))
  switch(view){
    case Status.ALL:
      viewingTodos=[...todos];
      break;
  }
  const viewSwitchButtonStyles="text-gray-600 font-bold text-sm p-1 rounded-md mx-4 border-2 border-gray-300 hover:bg-indigo-300 hover:text-white focus:shadow-outline"
  const viewSwitchButtonActive="text-white bg-indigo-400 font-bold text-sm p-1 rounded-md mx-4 border-2 border-gray-300 hover:bg-indigo-300 hover:text-white focus:shadow-outline"
  return (
    <div className="w-full h-full mx-auto sm:shadow-xl sm:max-w-sm md:max-w-xl">
      <header className="w-full p-3 mt-2 mb-2 text-center">
        <h1 className="text-xl text-red-300 font-extrabold ">Todos</h1>
      </header>
      <NewTodo addItem={addItem}/>
      <TodoList todos={viewingTodos} deleteItem={deleteItem} editItem={editItem} toggleStatus={toggleStatus}/>
      <nav className="w-full flex flex-no-wrap py-2 px-4 border-top-2 border-gray-200">
        <span className="text-gray-600 p-1 rounded-md mx-4">{todos.filter(todo=>(todo.status===Status.ACTIVE)).length} Items Left</span>
        <span onClick={()=>switchView(Status.ALL)} role="button"
          className={view===Status.ALL?viewSwitchButtonActive:viewSwitchButtonStyles} >All</span>
        <span onClick={()=>switchView(Status.ACTIVE)} role="button"
          className={view===Status.ACTIVE?viewSwitchButtonActive:viewSwitchButtonStyles}>Active</span>
        <span onClick={()=>switchView(Status.COMPLETED)} role="button"
          className={view===Status.COMPLETED?viewSwitchButtonActive:viewSwitchButtonStyles}>Completed</span>
      </nav>
    </div>
  );
}

export default App;
