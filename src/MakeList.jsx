export default function MakeList(props) {
  return (
    <>
      <h1 style={{ fontSize: "14px" }}>Make Shopping List</h1>
      <ul>
        {props.depts.map(dept => (
          <>
            <li key={dept} style={{ fontSize: "1.5rem" }}>
              <strong>{dept}</strong>
            </li>
            <ul>{props.subList(dept)}</ul>
          </>
        ))}
      </ul>
      <button onClick={props.saveList}>SAVE LIST</button>
    </>
  );
}
