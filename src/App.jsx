// npm run dev

import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Nav from "./Nav";
import ShoppingTrip from "./ShoppingTrip";
import Settings from "./Settings";
import { stores } from "./data.js";
import { grocerylistItems } from "./data.js";

function App() {
  const [shoppingList, setShoppingList] = useState(
    () => JSON.parse(localStorage.getItem("shoppingList")) ?? grocerylistItems
  );

  const handleItemClick = id => {
    setShoppingList(prev =>
      prev.map(item => {
        if (item.id === id) {
          return { ...item, isSelected: !item.isSelected };
        } else return item;
      })
    );
  };

  const saveList = () => {
    localStorage.setItem("shoppingList", JSON.stringify(shoppingList));
  };

  return (
    <BrowserRouter>
      <Nav />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <>
                {" "}
                <div className="whiteBG">
                  <button id="save-button" onClick={saveList}>
                    Save List
                  </button>
                </div>
                <h1>Modify List Items</h1>
                {stores[0].order.map(dept => (
                  <>
                    <h2 key={dept}>{dept}</h2>
                    <ul>
                      {shoppingList
                        .filter(item => item.dept === dept)
                        .map(product => (
                          <li
                            key={product.id}
                            style={{
                              fontWeight: product.isSelected ? "bold" : "",
                              color: product.isSelected ? "red" : "black",
                            }}
                            onClick={() => handleItemClick(product.id)}
                          >
                            {product.name}
                          </li>
                        ))}
                    </ul>
                  </>
                ))}
              </>
            }
          />
          <Route
            path="/shop"
            element={<ShoppingTrip shoppingList={shoppingList} setShoppingList={setShoppingList} />}
          />
          <Route
            path="/settings"
            element={<Settings shoppingList={shoppingList} setShoppingList={setShoppingList} />}
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
