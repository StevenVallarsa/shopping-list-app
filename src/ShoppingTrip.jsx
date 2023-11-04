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
    for (let item of currentList) {
      // delete one and done shopped items
      if (!item.isSelected && item.deleteAfterUse)
        shoppingList = shoppingList.filter(grocery => grocery.id !== item.id);
      // deselect shopped items from main list
      shoppingList = shoppingList.map(grocery => {
        if (item.id !== grocery.id || item.isSelected) return grocery;
        return { ...grocery, isSelected: false };
      });
    }
    setShoppingList(shoppingList);
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
                </li>
              ))
          )}
      </ul>
      <button id="finish-shopping" onClick={handleFinishShopping}>
        Finish Shopping
      </button>
    </>
  );
}
