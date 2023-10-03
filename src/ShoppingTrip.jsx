import { useState, useEffect } from "react";

export default function ShoppingTrip({ shoppingList }) {
  const [currentList, setCurrentList] = useState({});
  const [store, setStore] = useState(null);
  const [, setChanged] = useState(false);

  useEffect(() => {
    const temp = { ...shoppingList };
    for (let cat in temp) {
      temp[cat] = temp[cat].filter(item => item.isSelected);
    }
    setCurrentList(temp);
  }, []);

  const aldiSE = [
    "Miscellaneous",
    "Bakery",
    "Produce",
    "Meat",
    "Snacks",
    "Canned & Boxed",
    "Ethnic",
    "Household",
    "Pharmacy",
    "Breakfast",
    "Dairy",
    "Drinks",
    "Frozen",
  ];

  const meijerSE = [
    "Miscellaneous",
    "Pharmacy",
    "Household",
    "Snacks",
    "Canned & Boxed",
    "Ethnic",
    "Drinks",
    "Breakfast",
    "Frozen",
    "Dairy",
    "Meat",
    "Bakery",
    "Produce",
  ];

  // const handleItemClick = (id, dept) => {
  //   setCurrentList(prev => {
  //     prev[dept] = prev[dept].map(item => (item.id === id ? { ...item, isSelected: !item.isSelected } : item));
  //     setChanged(prev => !prev);
  //     return prev;
  //   });
  // };

  // const subList = dept =>
  //   currentList[dept]
  //     ? currentList[dept].map(item => (
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

  const handleStoreClick = store => {
    setStore(store);
  };

  const handleItemClick = (cat, id) => {
    currentList[cat] = currentList[cat].map(item => {
      if (item.id === id) {
        return { ...item, isSelected: !item.isSelected };
      } else {
        return item;
      }
    });
    setChanged(prev => !prev);
  };

  return (
    <>
      <button onClick={() => handleStoreClick(aldiSE)}>Aldi</button>
      <button onClick={() => handleStoreClick(meijerSE)}>Meijer</button>
      {!store && <p>Select the store you&apos;re shopping at</p>}
      <ul>
        {store &&
          store.map(item =>
            currentList[item].map(product => (
              <li
                key={product.id}
                style={{
                  textDecoration: product.isSelected ? "none" : "line-through",
                  fontWeight: product.isSelected ? "bold" : "normal",
                }}
                onClick={() => handleItemClick(item, product.id)}
              >
                {product.name}
              </li>
            ))
          )}
      </ul>
    </>
  );
}
