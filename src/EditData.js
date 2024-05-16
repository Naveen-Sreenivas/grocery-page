import React from 'react'
import { FaPlus } from 'react-icons/fa6'
import { useState } from 'react';
const EditData = ({id,item,handleUpdate}) => {
 const [editValue,setEditValue] = useState(item.item)

 const handleSubmit = (e)=>{
  e.preventDefault();
   if(!editValue) return;
  handleUpdate(id,editValue);
 }
  return (
    <form className='addForm' onSubmit={handleSubmit}>
      <label  htmlFor='addItem'>Add</label>
      <input type="text" 
      autoFocus
      required
      id='addItem'
      value={editValue}
      onChange={(e)=>setEditValue(e.target.value)}

      />
      <button type='submit' className='plus_btn'> <FaPlus /></button>
    </form>
  )
}

export default EditData
