import React, {useState} from 'react';

type PropTypes={
  addItem:(val:string)=>(e:React.KeyboardEvent)=>void
}

const NewTodo:React.FC<PropTypes>=(props)=>{
  const [value,setValue]=useState('');
  return(
    <div className="w-full p-2 mt-2 mb-2">
      <input
      type="text"
      placeholder="what needs to be done?"
      className="w-full px-4 py-4 border-2 border-gray-200 rounded-md text-md font-bold text-indigo-700 blur:bg-gray-300 focus:outline-none placeholder-indigo-700"
      onChange={(e:React.ChangeEvent)=>setValue((e.target! as HTMLInputElement).value)}
      value={value}
      onKeyPress={(e:React.KeyboardEvent)=>{
        props.addItem(value)(e);
        if(e.key==='Enter') setValue('');
      }}
      />
    </div>
  )
}

export default NewTodo;
