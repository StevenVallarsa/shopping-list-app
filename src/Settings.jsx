import groceryListItems from "./groceryListItems";
import deptList from "./deptList";

export default function Settings() {
  return (
    <>
      <h1>Modify List Items</h1>
      {deptList.map(dept => (
        <>
          <h2 key={dept}>{dept}</h2>
          <ul>
            {groceryListItems
              .filter(item => item.dept === dept)
              .map(product => (
                <li key={product.id}>{product.name}</li>
              ))}
          </ul>
        </>
      ))}
    </>
  );
}
