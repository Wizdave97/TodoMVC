import React from 'react';
import { Status } from '../App';
type PropTypes={
  todo:{title:string,status:number,id:number};
  deleteItem(id:number):void;
  toggleStatus(id:number):void;
  editItem(id:number,title:string):void;
}
let spanRef=React.createRef<HTMLSpanElement>();
const TodoItem:React.FC<PropTypes>=props=>{
  return(
    <li
    className="w-full flex flex-row flex-no-wrap items-center  p-3 border-2 border-gray-200 rounded-sm  bg-gray-100  mt-2 mb-2">
    <span className="self-center flex items-center mx-4"><input type="checkbox" defaultChecked={Status.COMPLETED===props.todo.status} className="h-4 w-4 my-auto" onClick={()=>props.toggleStatus(props.todo.id)}/></span>
    <span
      className="flex-grow capitalize text-xl font-normal text-indigo-600"
      ref={spanRef}
      onDoubleClick={(event:React.MouseEvent)=>{
         event.preventDefault();
         (event.target! as HTMLSpanElement).setAttribute('contenteditable','true');
         (event.target! as HTMLSpanElement).classList.add('outline-none','border-2','border-gray-400');
       }
      }
      onKeyPress={(event:React.KeyboardEvent)=>{
        if(event.key==='Enter'){
          props.editItem(props.todo.id,(spanRef.current! as HTMLElement).textContent as string);
          (spanRef.current! as HTMLElement).classList.remove('outline-none','border-2','border-gray-400');
          (spanRef.current! as HTMLElement).setAttribute('contenteditable','false');
        }
      }}
      onBlur={(event:React.FocusEvent)=>{
        (spanRef.current! as HTMLElement).classList.remove('outline-none','border-2','border-gray-400');
        (spanRef.current! as HTMLElement).setAttribute('contenteditable','false');
        props.editItem(props.todo.id,(spanRef.current! as HTMLElement).textContent as string);
      }}
      >{props.todo.title}</span>
    <span className="text-red-800" onClick={()=>props.deleteItem(props.todo.id)}>
      <svg className="h-6 w-6 fill-current text-red-800" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path  d="M4.93 19.07A10 10 0 1 1 19.07 4.93 10 10 0 0 1 4.93 19.07zm1.41-1.41A8 8 0 1 0 17.66 6.34 8 8 0 0 0 6.34 17.66zM13.41 12l1.42 1.41a1 1 0 1 1-1.42 1.42L12 13.4l-1.41 1.42a1 1 0 1 1-1.42-1.42L10.6 12l-1.42-1.41a1 1 0 1 1 1.42-1.42L12 10.6l1.41-1.42a1 1 0 1 1 1.42 1.42L13.4 12z"/>
      </svg>
    </span>
    </li>
  )
}
export default TodoItem;
