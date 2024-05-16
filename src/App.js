import Header from "./Header";
import SearchItem from "./SearchItem";
import Content from "./Content";
import AddItem from "./AddItem";
import Footer from "./Footer";
import { useState, useEffect } from "react";
import apiRequest from "./apiRequest";

// cd dave09-crud-operation

// --save-prod is use to move package from dev to production dependencies

/* React Hooks are functions provided by the React library that enable you to use state and other React features in functional components. These functions are provided by React as part of its API and are designed to be composable and reusable across different components.

Hooks like useState, useEffect, useContext, useReducer, useCallback, useMemo, and useRef are all functions provided by React that you can import from the 'react' package and use in your functional components. Each hook serves a specific purpose, such as managing state, performing side effects, accessing context, or optimizing performance.

By using these hooks, you can write functional components that have the same capabilities as class components, making it easier to share logic between components and reducing the need for class components in your codebase. This approach promotes cleaner and more modular code. */

/*
response.json() is a method that reads the response body and parses it as JSON. This method returns a promise that resolves with the result of parsing the JSON body text.

Parsing a response as JSON means taking the raw JSON text received from the server and converting it into a JavaScript object, so it can be easily manipulated and used in your code.
*/

function App() {
  const API_URL = "http://localhost:8000/items";

  const [items, setItems] = useState([]);

  const [newItem, setNewItem] = useState("");
  const [firstValue, setfirstValue] = useState("Add Item");
  const [search, setSearch] = useState("");
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw Error("Did not receive expected data");
        }
        const listItems = await response.json();
      
        setItems(listItems);
        setFetchError(null);
      } catch (err) {
        setFetchError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    setTimeout(() => {
      fetchItems();
    }, 1000);
  }, []);

  const addItem = async (item) => {
    const id = items.length ? parseInt(items[items.length - 1].id) + 1 : "1";
    const myNewItem = { id:id.toString(), checked: false,isEditing:false,item };
    const listItems = [...items, myNewItem];
    setItems(listItems);

    const postOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(myNewItem),
    };

    const result = await apiRequest(API_URL, postOptions);
    if (result) setFetchError(result);
  };

  const handleCheck = async (id) => {
   
    const listItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );

    setItems(listItems);

    const myItem = listItems.filter((item) => item.id === id);

    const updateOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ checked: myItem[0].checked }),
    };
  
    const reqUrl = `${API_URL}/${id}`;
    

    const result = await apiRequest(reqUrl, updateOptions);

    if (result) setFetchError(result);
  };

  const handleEdit = async (id) => {
   
    const listItems = items.map((item) =>
      item.id === id ? { ...item, isEditing: !item.isEditing} : item
    );
  
    setItems(listItems);

    const myItem = listItems.filter((item) => item.id === id);
  
    const updateOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isEditing: myItem[0].isEditing }),
    };

    const reqUrl = `${API_URL}/${id}`;

    const result = await apiRequest(reqUrl, updateOptions);

    if (result) setFetchError(result);
   
  };


  const handleUpdate = async (id,editedItem) => {
   
    const listItems = items.map((item) =>
      item.id === id ? { ...item,item:editedItem,isEditing: !item.isEditing} : item
    );
  
    setItems(listItems);

    const myItem = listItems.filter((item) => item.id === id);

    const updateOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isEditing: myItem[0].isEditing ,item:myItem[0].item})
    };
  

    const reqUrl = `${API_URL}/${id}`;
  
    const result = await apiRequest(reqUrl, updateOptions);

    if (result) setFetchError(result);
   
  };

  
 
  /*
  In JavaScript, [...Array] is a syntax that uses the spread syntax (...) to create a shallow copy of an array. 
  */

  const handleDelete = async (id) => {
    const listItems = items.filter((item) => item.id !== id);
    setItems(listItems);
    const deleteOptions = { method: "DELETE" };
    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, deleteOptions);

    if (result) setFetchError(result);
  };

  /* e.preventDefault(); is a JavaScript method commonly used in event handling to prevent the default behavior associated with a particular event. The e typically represents the event object, and preventDefault() is a method of that object. */

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!newItem) return;

    addItem(newItem);

    setNewItem("");
  };

  return (
    <div className="App">
      {/*   {'Groceries List'}  */}

      <Header title={"Groceries"} />

      <AddItem
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
        firstValue={firstValue}
        setfirstValue={setfirstValue}
      />

      <SearchItem search={search} setSearch={setSearch} />

      {/* The includes() method is a JavaScript string method used to check if a particular substring is present within another string. It returns true if the substring is found, and false otherwise.

const mainString = "Hello, World!";
const substring = "World";

const includesSubstring = mainString.includes(substring);

console.log(includesSubstring); // Output: true 

If the substring is an empty string, the includes() method will always return true because an empty string is considered to be present in any other string at every position.

*/}
      <main>
        {isLoading && <p className="loading">Loading Items...</p>}

        {fetchError && (
          <p
            style={{ color: "red", marginTop: "30%" }}
          >{`Error:${fetchError}`}</p>
        )}

        {!fetchError && !isLoading && (
          <Content
            items={items.filter((item) =>
              item.item.toLowerCase().includes(search.toLocaleLowerCase())
            )}
            handleCheck={handleCheck}
            handleDelete={handleDelete}
            handleEdit ={handleEdit}
            handleUpdate ={handleUpdate}
          />
        )}
      </main>
      <Footer length={items.length} />
    </div>
  );
}

export default App;
