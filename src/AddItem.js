import React from "react";
import { FaPlus } from "react-icons/fa";
import { useRef } from "react";

/* "hooks" generally refer to functions provided by the React library that allow functional components to use state, lifecycle methods, and other React features that were traditionally available only in class components. Examples include useState, useEffect, useContext, and useReducer.
 */

/*
 In HTML, the for attribute in the <label> element is used to associate the label with a specific form element. This association is typically done by matching the for attribute value with the id attribute of the form element.

The purpose of this association is to improve the user experience and accessibility of web forms. When a user clicks on a <label>, it should activate or focus on the associated form element. This makes it easier for users to interact with form controls, especially when dealing with checkboxes, radio buttons, and text input fields.

Using proper associations between labels and form elements is especially important for accessibility. Screen readers and other assistive technologies use these associations to provide a better experience for users with disabilities. It allows users to understand the purpose of each form element and navigate through the form more effectively.

 */

const AddItem = ({
  newItem,
  setNewItem,
  handleSubmit,
  firstValue,
  setfirstValue,
}) => {
  const inputRef = useRef();

  return (
    /* The onSubmit attribute in React is used to specify a function that will be called when a form is submitted.  */

    <form className="addForm" onSubmit={handleSubmit}>
      <label htmlFor="addItem">Add Item</label>
      <input
        type="text"
        autoFocus
        ref={inputRef}
        id="addItem"
        placeholder={firstValue}
        required
        value={newItem}
        onChange={(e) => {
          setNewItem(e.target.value);
          setfirstValue(`Last Item Added : ${e.target.value}`);
        }}
      />

      <button
        type="submit"
        aria-label="Add Item"
        onClick={() => inputRef.current.focus()}
      >
        <FaPlus />
      </button>
    </form>
  );
};

export default AddItem;
