// npm run dev

import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import MakeList from "./MakeList";
import listItems from "./ListItems";
import Nav from "./Nav";
import ShoppingTrip from "./ShoppingTrip";
import Settings from "./Settings";

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
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route
          path="/"
          element={
            <MakeList
              shoppingList={shoppingList}
              subList={subList}
              saveList={saveList}
              onItemClick={handleItemClick}
              depts={depts}
            />
          }
        />
        <Route path="/shop" element={<ShoppingTrip shoppingList={shoppingList} />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
