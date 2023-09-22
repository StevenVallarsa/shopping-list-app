// npm run dev

import { useState } from "react";
import "./App.css";
import listItems from "./ListItems";

function App() {
  const [shoppingList, setShoppingList] = useState(() => JSON.parse(localStorage.getItem("shoppingList")) ?? listItems);
  /**
   * This variable is used to force shadow DOM to refresh due to
   * "shoppingList" change from onClick being a deep change
   */
  const [, setChanged] = useState(true);

  const depts = [
    "Miscellaneous",
    "Bakery",
    "Breakfast",
    "Canned & Boxed",
    "Dairy",
    "Drinks",
    "Ethnic",
    "Frozen",
    "Household",
    "Meat",
    "Pharmacy",
    "Produce",
    "Snacks",
  ];

  const handleItemClick = (id, dept) => {
    setShoppingList(prev => {
      prev[dept] = prev[dept].map(item => (item.id === id ? { ...item, isSelected: !item.isSelected } : item));
      setChanged(prev => !prev);
      return prev;
    });
  };

  const subList = dept =>
    shoppingList[dept]
      ? shoppingList[dept].map(item => (
          <li
            style={{
              color: `${item.isSelected ? "red" : "black"}`,
              fontWeight: `${item.isSelected ? "bold" : "normal"}`,
            }}
            key={item.id}
            onClick={() => handleItemClick(item.id, dept)}
          >
            {item.name}
          </li>
        ))
      : "";

  const saveList = () => {
    localStorage.setItem("shoppingList", JSON.stringify(shoppingList));
  };

  return (
    <>
      <h1>Shopping</h1>
      <ul>
        {depts.map(dept => (
          <>
            <li key={dept} style={{ fontSize: "1.5rem" }}>
              <strong>{dept}</strong>
            </li>
            <ul>{subList(dept)}</ul>
          </>
        ))}
      </ul>
      <button onClick={saveList}>SAVE LIST</button>
    </>
  );
}

export default App;
