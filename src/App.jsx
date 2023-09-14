// npm run dev

import { useState } from "react";
import "./App.css";

function App() {
  const depts = [
    "Miscellaneous",
    "Bakery",
    "Breakfast",
    "Canned & Boxed",
    "Dairy",
    "Drinks",
    "Ethnic",
    "Frozen",
    "Household",
    "Meat",
    "Pharmacy",
    "Produce",
    "Snacks",
  ];
  const listItems = {
    Miscellaneous: [],
    Bakery: [
      {
        id: 100,
        name: "Bread",
      },
      {
        id: 101,
        name: "Cookies",
      },
    ],
  };

  const abc = "Bakery";

  const subList = dept => (listItems[dept] ? listItems[dept].map(item => <li key={item.id}>{item.name}</li>) : "");

  return (
    <>
      <h1>Shopping</h1>
      <ul>
        {depts.map(dept => (
          <>
            <li key={dept}>
              <strong>{dept}</strong>
            </li>
            <ul>{subList(dept)}</ul>
          </>
        ))}
      </ul>
    </>
  );
}

export default App;
