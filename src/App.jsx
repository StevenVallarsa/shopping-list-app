// npm run dev

import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
// import MakeList from "./MakeList";
// import listItems from "./listItems";
import Nav from "./Nav";
import ShoppingTrip from "./ShoppingTrip";
import Settings from "./Settings";
import deptList from "./deptList";
import grocerylistItems from "./groceryListItems";

function App() {
  const [shoppingList, setShoppingList] = useState(
    () => JSON.parse(localStorage.getItem("shoppingList")) ?? grocerylistItems
  );
  /**
   * This variable is used to force shadow DOM to refresh due to
   * "shoppingList" change from onClick being a deep change
   */
  // const [, setChanged] = useState(true);

  // const depts = [
  //   "Miscellaneous",
  //   "Bakery",
  //   "Breakfast",
  //   "Canned & Boxed",
  //   "Dairy",
  //   "Drinks",
  //   "Ethnic",
  //   "Frozen",
  //   "Household",
  //   "Meat",
  //   "Pharmacy",
  //   "Produce",
  //   "Snacks",
  // ];

  // const handleItemClick = (id, dept) => {
  //   setShoppingList(prev => {
  //     prev[dept] = prev[dept].map(item => (item.id === id ? { ...item, isSelected: !item.isSelected } : item));
  //     setChanged(prev => !prev);
  //     return prev;
  //   });
  // };

  const handleItemClick = id => {
    setShoppingList(prev =>
      prev.map(item => {
        if (item.id === id) {
          return { ...item, isSelected: !item.isSelected };
        } else return item;
      })
    );
  };

  // const subList = dept =>
  //   shoppingList[dept]
  //     ? shoppingList[dept].map(item => (
  //         <li
  //           style={{
  //             color: `${item.isSelected ? "red" : "black"}`,
  //             fontWeight: `${item.isSelected ? "bold" : "normal"}`,
  //           }}
  //           key={item.id}
  //           onClick={() => handleItemClick(item.id, dept)}
  //         >
  //           {item.name}
  //         </li>
  //       ))
  //     : "";

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
                    <h2 style={{ paddingBottom: "0px", marginBottom: "-20px" }} key={dept}>
                      {dept}
                    </h2>
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
