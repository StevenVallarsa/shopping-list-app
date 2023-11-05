import { useState, useEffect, useRef } from "react";

export default function ItemInput({ shoppingList, setShoppingList, dept, setDept }) {
  const [idNumber, setIdNumber] = useState(() => JSON.parse(localStorage.getItem("groceryItemIdNumber")) ?? 136);
  const [itemName, setItemName] = useState("");
  const [checked, setChecked] = useState(true);
  const ref = useRef();

  useEffect(() => {
    ref.current.focus();
  }, []);

  const handleItemInputChange = e => {
    setItemName(e.target.value);
  };

  const handleCheckboxChange = () => {
    setChecked(prev => !prev);
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    setShoppingList(prev => [
      ...prev,
      {
        id: idNumber,
        name: itemName,
        isSelected: true,
        dept: dept,
        deleteAfterUse: true,
      },
    ]);
    localStorage.setItem("groceryItemIdNumber", idNumber + 1);
    setIdNumber(prev => prev + 1);

    setChecked(true);
    setDept(null);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input ref={ref} type="text" placeholder="Enter Your Item" value={itemName} onChange={handleItemInputChange} />
      <br />
      <label htmlFor="oneAndDone">Delete After Shopped</label>{" "}
      <input id="oneAndDone" type="checkbox" checked={checked} onChange={handleCheckboxChange} />
      <input type="submit" value="Add Item" />
    </form>
  );
}
