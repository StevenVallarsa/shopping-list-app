// npm run dev

import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Nav from "./Nav";
import ShoppingTrip from "./ShoppingTrip";
import Settings from "./Settings";
import deptList from "./deptList";
import grocerylistItems from "./groceryListItems";

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
              // <MakeList
              //   shoppingList={shoppingList}
              //   subList={subList}
              //   saveList={saveList}
              //   onItemClick={handleItemClick}
              //   depts={depts}
              // />
              <>
                <h1>Modify List Items</h1>
                {deptList.map(dept => (
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
                <button onClick={saveList}>Save List</button>
              </>
            }
          />
          <Route
            path="/shop"
            element={<ShoppingTrip shoppingList={shoppingList} setShoppingList={setShoppingList} />}
          />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
