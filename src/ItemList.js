
import LineItem from './LineItem'

const ItemList = ({items,handleCheck,handleDelete,handleEdit,handleUpdate}) => {
  return (
   
       <ul>  
        {
            items.map((item)=>(

              <LineItem 
              key={item.id}
              item ={item}
              handleCheck={handleCheck}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              handleUpdate = {handleUpdate}
              />
        
            ))
        }
      </ul>
      
   
  )
}

export default ItemList
