import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ShoppingTrip({ shoppingList, setShoppingList }) {
  const [currentList, setCurrentList] = useState([]);
  const [store, setStore] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentList(shoppingList.filter(item => item.isSelected));
    setStore(aldiSE);
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

  const handleItemClick = id => {
    setCurrentList(prev =>
      prev.map(item => {
        if (item.id === id) return { ...item, isSelected: !item.isSelected };
        else return item;
      })
    );
  };

  const handleFinishShopping = () => {
    for (let category in shoppingList) {
      if (currentList[category].length > 0) {
        shoppingList[category] = shoppingList[category].map(item => {
          for (let listItem of currentList[category]) {
            if (listItem.id === item.id) {
              return listItem;
            }
          }
          return item;
        });
      }
    }
    navigate("/");
  };

  return (
    <>
      <button onClick={() => handleStoreClick(aldiSE)}>Aldi</button>
      <button onClick={() => handleStoreClick(meijerSE)}>Meijer</button>
      {!store && <p>Select the store you&apos;re shopping at</p>}
      <ul>
        {store &&
          store.map(item =>
            currentList
              .filter(product => product.dept === item)
              .map(product => (
                <li
                  key={product.id}
                  className={product.isSelected ? "not-shopped" : "shopped"}
                  onClick={() => handleItemClick(product.id)}
                >
                  {product.name}
                  {product.id}
                </li>
              ))
          )}
      </ul>
      <button onClick={handleFinishShopping}>Finish Shopping</button>
    </>
  );
}
