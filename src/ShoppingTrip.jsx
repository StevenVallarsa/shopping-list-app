import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { stores } from "./data";

export default function ShoppingTrip({ shoppingList, setShoppingList }) {
  const [currentList, setCurrentList] = useState([]);
  const [store, setStore] = useState(null);
  const [locations, setLocations] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentList(shoppingList.filter(item => item.isSelected));
    stores.forEach(store => {
      console.log(store);
      if (store.defaultStore) setStore(store.order);
    });
    setLocations(stores);
  }, []);

  const handleStoreClick = store => {
    setLocations(prev =>
      prev.map(s => {
        if (s.name === store) {
          s.isSelected = true;
          return s;
        } else {
          s.isSelected = false;
          return s;
        }
      })
    );
    setStore(stores.filter(s => s.name === store)[0].order);
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
      {stores.map(store => (
        <button
          key={store.name}
          className={store.isSelected ? "store-selected" : ""}
          onClick={() => handleStoreClick(store.name)}
        >
          {store.name}
        </button>
      ))}
      {/* <button onClick={() => handleStoreClick(aldiSE)}>Aldi</button>
      <button onClick={() => handleStoreClick(meijerSE)}>Meijer</button> */}
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
