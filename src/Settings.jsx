import { useState, useEffect } from "react";

import deptList from "./deptList";
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

  return (
    <>
      <h1>Modify List Items</h1>
      {deptList.map(dept => (
        <>
          <h2 id="h2-button" key={dept}>
            {dept}
          </h2>
          <button onClick={() => handleAddItem(dept)}>+</button>
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
          <ul>
            {groceries
              .filter(item => item.dept === dept)
              .map(product => (
                <li
                  key={product.id}
                  style={{ fontWeight: product.isSelected ? "bold" : "", color: product.isSelected ? "red" : "black" }}
                  onClick={() => handleItemClick(product.id)}
                >
                  {product.name} {product.id}
                </li>
              ))}
          </ul>
        </>
      ))}
    </>
  );
}
