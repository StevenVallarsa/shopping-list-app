// npm run dev

import { useState, useEffect } from "react";
import "./App.css";

const listItems = {
  Miscellaneous: [],
  Bakery: [
    {
      id: 100,
      isSelected: true,
      name: "Bread",
    },
    {
      id: 101,
      isSelected: false,
      name: "Cookies",
    },
  ],
  Breakfast: [
    {
      id: 107,
      isSelected: false,
      name: "Cereal",
    },
    {
      id: 108,
      isSelected: false,
      name: "Oatmeal",
    },
    {
      id: 109,
      isSelected: false,
      name: "Pop Tarts",
    },
  ],
  "Canned & Boxed": [],
  Dairy: [
    {
      id: 102,
      isSelected: false,
      name: "Milk",
    },
    {
      id: 103,
      isSelected: false,
      name: "Creamer",
    },
    {
      id: 104,
      isSelected: false,
      name: "Yogurt",
    },
    {
      id: 105,
      isSelected: false,
      name: "Cheese Slices",
    },
    {
      id: 106,
      isSelected: false,
      name: "Cheese Block",
    },
  ],
  Ethnic: [],
  Frozen: [],
  Household: [],
  Meat: [],
  Pharmacy: [],
  Produce: [],
  Snacks: [],
};

function App() {
  const [shoppingList, setShoppingList] = useState(listItems);
  /**
   * This variable is used to force shadow DOM to refresh due to
   * "shoppingList" change from onClick being a deep change
   */
  const [changed, setChanged] = useState(true);

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
      <button onClick={() => console.log(shoppingList)}>TESTING </button>
    </>
  );
}

export default App;
