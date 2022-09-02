import React, { useReducer, useRef } from "react";

function Test() {
  const inputRef = useRef();
  const [items, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "add":
        return [
          ...state,
          {
            id: state.length,
            name: action.name
          }
        ];
      case "remove":
        // keep every item except the one we want to remove
        return state.filter((_, index) => index !== action.index);
      case "clear":
        return [];
      default:
        return state;
    }
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    dispatch({
      type: "add",
      name: inputRef.current.value
    });
    inputRef.current.value = "";
  }

  return (
    <div className="bg-white shadow-md col-span-12 md:col-span-8 lg:col-span-6
      md:col-start-3 lg:col-start-4 md:p-6 p-4"
    >
      <h1 className="text-xl md:text-2xl font-bold">Task List</h1>
      <form onSubmit={handleSubmit}>
        <input ref={inputRef} 
          className="bg-gray-50 border border-gray-300 text-gray-900
          block w-60 my-2 p-1.5 disabled:opacity-50" 
        />
      </form>
      <button onClick={() => dispatch({ type: "clear" })}
        className="text-white bg-slate-500 hover:bg-slate-600
        font-medium text-sm px-3 mr-2 py-1 text-center"
      >
        Clear All
      </button>
      <button onClick={handleSubmit}
        className="text-white bg-heroblue-500 hover:bg-heroblue-600
        font-medium text-sm px-3 py-1 text-center"
      >
        Add Task
      </button>
      <ul className="mt-3">
        {items.map((item, index) => (
          <li key={item.id} className="my-1">
            {item.name}{" "}
            <button onClick={() => dispatch({ type: "remove", index })}
              className="text-white bg-slate-500 hover:bg-slate-600
              font-medium text-sm px-2 py-1 text-center"
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Test;
