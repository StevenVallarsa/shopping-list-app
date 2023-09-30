import { useState } from "react";

export default function ShoppingTrip({ shoppingList }) {
  const [currentList, setCurrentList] = useState(shoppingList);
  const [store, setStore] = useState(null);

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

  const handleItemClick = (id, dept) => {
    setCurrentList(prev => {
      prev[dept] = prev[dept].map(item => (item.id === id ? { ...item, isSelected: !item.isSelected } : item));
      setChanged(prev => !prev);
      return prev;
    });
  };

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

  return (
    <>
      <button onClick={() => handleStoreClick("alidSE")}>Aldi</button>
      <button onClick={() => handleStoreClick("meijerSE")}>Meijer</button>
      {!store && <p>Select the store you&apos;re shopping at</p>}
      {store && <p>You&apos;re shopping at {store}</p>}
    </>
  );
}
