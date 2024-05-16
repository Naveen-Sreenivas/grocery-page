
import ItemList from './ItemList';

/* # $ @ !*/
/* import a module or component named ItemList from a file named ItemList located in the same directory as the file where this import statement is written. */
const Content = ({items,handleCheck,handleDelete,handleEdit,handleUpdate}) => {
const emptyRow = {marginTop:'2rem',backgroundColor:'blue',padding:'1rem',borderRadius:'1rem',color:'white'}
  return (
   <>

{items.length ? (

     <ItemList items={items}
        handleCheck={handleCheck}
        handleDelete={handleDelete}
        handleEdit ={handleEdit}
        handleUpdate ={handleUpdate}
        />
): (
    <p style={emptyRow}>Your list is empty</p>
)}
   </>
  )
}
export default Content
