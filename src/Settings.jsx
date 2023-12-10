import { useState, useEffect } from "react";

import { stores } from "./data.js";
import ItemInput from "./ItemInput";

export default function Settings({ shoppingList, setShoppingList }) {
  const [groceries, setGroceries] = useState(shoppingList);
  const [addItem, setAddItem] = useState(null);
  const [idNumber, setIdNumber] = useState(136);

  useEffect(() => {
    setGroceries(shoppingList);
  }, [shoppingList]);

  const handleItemClick = id => {
    setGroceries(prev =>
      prev.map(item => {
        if (item.id === id) {
          return { ...item, isSelected: !item.isSelected };
        } else return item;
      })
    );
  };

  const handleAddItem = dept => {
    setAddItem(dept);
  };

  const handleRemoveItem = id => {
    setShoppingList(prev => prev.filter(item => item.id !== id));
  };
  return (
    <>
      <h1>Modify List Items</h1>
      {stores[0].order.map(dept => (
        <div style={{ textAlign: "left" }} key={dept}>
          <button id="add-button" onClick={() => handleAddItem(dept)}>
            +
          </button>
          <h2 id="h2-button" key={dept}>
            {dept}
          </h2>
          {addItem === dept && (
            <ItemInput
              shoppingList={shoppingList}
              setShoppingList={setShoppingList}
              dept={dept}
              setDept={setAddItem}
              idNumber={idNumber}
              setIdNumber={setIdNumber}
            />
          )}
          <ul style={{ textAlign: "left", marginTop: "-10px" }}>
            {groceries
              .filter(item => item.dept === dept)
              .map(product => (
                <li
                  key={product.id}
                  style={{ fontWeight: product.isSelected ? "bold" : "", color: product.isSelected ? "red" : "black" }}
                  onClick={() => handleItemClick(product.id)}
                >
                  <button id="remove-button" onClick={() => handleRemoveItem(product.id)}>
                    —
                  </button>
                  {product.name}
                </li>
              ))}
          </ul>
        </div>
      ))}
    </>
  );
}
