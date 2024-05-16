
import {FaTrashAlt} from 'react-icons/fa';
import {FaPenSquare} from 'react-icons/fa'
import EditData from './EditData';

function LineItem({item,handleCheck,handleDelete,handleEdit,handleUpdate}) {
  return (
    
    <li className="item">
      { !item.isEditing ?
   <>
    <input type="checkbox" onChange={()=>handleCheck(item.id)} checked={
       item.checked
    }/>
{/* In the JSX syntax used in React, the checked attribute in the <input> element is set dynamically by using curly braces {} to enclose a JavaScript expression. This allows you to conditionally set the checked attribute based on the value of the item.checked property. */}
    <label
     style={(item.checked) ? {textDecoration:'line-through'}: null}

    onDoubleClick={()=>handleCheck(item.id)}
    
    >{item.item}</label>
    

     <FaPenSquare className='pen_square svg_style' onClick={()=>handleEdit(item.id)}/>
    <FaTrashAlt
    className='svg_style'
    onClick={() => handleDelete(item.id)}

     role='button' //role='button': The role attribute is used to specify the purpose or type of an element. In this case, it indicates that the element has the role of a button, suggesting it might be used for user interaction.
     tabIndex="0" //tabIndex="0": The tabIndex attribute is used to specify the order in which elements receive focus when the user navigates through the page using the keyboard. A tabIndex of 0 means that the element will be included in the natural tab order.
   
    aria-label={`Delete ${item.item}`}
     /* 
    The entire expression is used as the aria-label attribute in JSX. The aria-label attribute is used to provide accessibility information to assistive technologies. In this case, it's providing a label for a "Delete" action, and it includes the specific item's name. */

    />
    </>
    : <EditData 
   
    id = {item.id}
    item = {item}
    handleUpdate ={handleUpdate}
    
    />}
</li>

  )
}

export default LineItem
