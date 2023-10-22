import { useState } from "react";

import groceryListItems from "./groceryListItems";
import deptList from "./deptList";

export default function Settings() {
  const [groceries, setGroceries] = useState(groceryListItems);

  const handleItemClick = id => {
    setGroceries(prev =>
      prev.map(item => {
        if (item.id === id) {
          return { ...item, isSelected: !item.isSelected };
        } else return item;
      })
    );
  };

  return (
    <>
      <h1>Modify List Items</h1>
      {deptList.map(dept => (
        <>
          <h2 key={dept}>{dept}</h2>
          <ul>
            {groceries
              .filter(item => item.dept === dept)
              .map(product => (
                <li
                  key={product.id}
                  style={{ fontWeight: product.isSelected ? "bold" : "", color: product.isSelected ? "red" : "black" }}
                  onClick={() => handleItemClick(product.id)}
                >
                  {product.name}
                </li>
              ))}
          </ul>
        </>
      ))}
    </>
  );
}
